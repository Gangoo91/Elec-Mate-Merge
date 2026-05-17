#!/usr/bin/env node

/**
 * Auto-patcher — applies the proven Adiabatic rebuild pattern to every page
 * in calc-map.json that's eligible.
 *
 * Patches applied per page:
 *   1. Strip fake hard-coded aggregateRating from inline SoftwareApplication
 *      schemas (Google's structured-data policy compliance).
 *   2. Refresh A3:2024 cite drift → A4:2026 across the file.
 *   3. Import the matched calculator component and add `import { RecentReviews }`.
 *   4. Inject a <section id="calculator"> block holding the live calculator
 *      directly after the page's hero section (first section containing <h1>).
 *   5. Inject a <RecentReviews /> section before the final SEOCTASection or
 *      at end-of-page if no CTA.
 *
 * Pages using <ToolTemplate>/<GuideTemplate>/<ComparisonTemplate>/
 * <CourseTemplate>/<BusinessTemplate> are skipped here — their templates
 * own the layout and need a separate patcher (next pass).
 *
 * Usage:
 *   node scripts/seo-audit/auto-patch.mjs                    # all eligible
 *   node scripts/seo-audit/auto-patch.mjs --dry-run          # preview only
 *   node scripts/seo-audit/auto-patch.mjs --confidence high  # high-conf only
 *   node scripts/seo-audit/auto-patch.mjs --slug /tools/X    # single page
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const CALC_MAP = join(ROOT, 'reports', 'seo-audit', 'calc-map.json');

const args = process.argv.slice(2);
const argv = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
};
const DRY_RUN = args.includes('--dry-run');
const ONLY_HIGH = argv('--confidence') === 'high';
const ONLY_SLUG = argv('--slug');

if (!existsSync(CALC_MAP)) {
  console.error(`No calc-map at ${CALC_MAP}. Run build-calc-map.mjs first.`);
  process.exit(1);
}
const { mappings } = JSON.parse(readFileSync(CALC_MAP, 'utf-8'));

const TEMPLATE_TAGS = /<(ToolTemplate|GuideTemplate|ComparisonTemplate|CourseTemplate|BusinessTemplate)\b/;
const TOOL_TEMPLATE_TAG = /<ToolTemplate\b/;
const GUIDE_TEMPLATE_TAG = /<GuideTemplate\b/;

// ---------------------------------------------------------------------------
// Per-patch helpers
// ---------------------------------------------------------------------------

function stripFakeAggregateRating(src) {
  // Drop the entire aggregateRating block (5-7 lines) from inline schemas.
  // Patterns observed: object literal aggregateRating: { ... } inside a
  // softwareAppSchema / SoftwareApplication object.
  const pattern =
    /,?\s*aggregateRating:\s*\{[^}]*'@type':\s*'AggregateRating'[^}]*\}\s*,?/g;
  return src.replace(pattern, '');
}

function refreshA4Cite(src) {
  // String replacements only — never touches code identifiers
  return src
    .replace(/BS\s*7671:2018\s*\+\s*A3:2024/g, 'BS 7671:2018+A4:2026')
    .replace(/Amendment\s*3\s*\(2024\)/gi, 'Amendment 4 (2026)')
    // Preserve historical/comparison pages by NOT touching variants like
    // "A3:2024 changes" or "Amendment 3 of 2024" headings — those are
    // intentionally historical.
    ;
}

function ensureImports(src, componentName, componentImportPath) {
  let patched = src;

  // Add calc import after the last import statement if not present
  if (!new RegExp(`\\bimport\\s+(default\\s+)?${componentName}\\b`).test(patched) &&
      !new RegExp(`\\b${componentName}\\b`).test(patched)) {
    const importLine = `import ${componentName} from '${componentImportPath}';\n`;
    // Insert after the last "import ... from ...;" line
    const importBlockMatch = patched.match(/(^import[\s\S]*?from\s+['"][^'"]+['"];\s*\n)+/);
    if (importBlockMatch) {
      const insertAt = importBlockMatch.index + importBlockMatch[0].length;
      patched = patched.slice(0, insertAt) + importLine + patched.slice(insertAt);
    }
  }

  // Add RecentReviews import if not present
  if (!/RecentReviews/.test(patched)) {
    const importLine = `import { RecentReviews } from '@/components/seo/RecentReviews';\n`;
    const importBlockMatch = patched.match(/(^import[\s\S]*?from\s+['"][^'"]+['"];\s*\n)+/);
    if (importBlockMatch) {
      const insertAt = importBlockMatch.index + importBlockMatch[0].length;
      patched = patched.slice(0, insertAt) + importLine + patched.slice(insertAt);
    }
  }

  return patched;
}

function injectCalculatorSection(src, componentName) {
  // Skip if a <ComponentName /> JSX is already rendered
  if (new RegExp(`<${componentName}\\s*[/>]`).test(src)) return src;

  // Find the first <section ...>...</section> block that contains <h1.
  // We then insert our calculator section directly after its closing </section>.
  const sectionRegex = /<section\b[^>]*>[\s\S]*?<\/section>/g;
  let match;
  while ((match = sectionRegex.exec(src)) !== null) {
    const block = match[0];
    if (/<h1\b/.test(block)) {
      const insertAt = match.index + block.length;
      const calcSection = `

      {/* Live calculator — free, no signup, BS 7671:2018+A4:2026 compliant */}
      <section id="calculator" className="px-5 pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <${componentName} />
        </div>
      </section>`;
      return src.slice(0, insertAt) + calcSection + src.slice(insertAt);
    }
  }

  return src; // No hero found — skip safely
}

function injectTemplateProp(src, componentName, templateName, propName) {
  // Skip if prop already passed
  if (new RegExp(`\\b${propName}\\s*=\\s*\\{`).test(src)) return src;

  // Find the <TemplateName ... /> JSX (typically self-closing).
  const re = new RegExp(`<${templateName}([\\s\\S]*?)\\/>`);
  const m = re.exec(src);
  if (!m) return src;

  const propsBlock = m[1];
  const lines = propsBlock.split('\n');
  let indent = '      ';
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim().length > 0) {
      indent = lines[i].match(/^(\s*)/)[1] || indent;
      break;
    }
  }

  const newProp = `\n${indent}${propName}={<${componentName} />}`;
  const insertAt = m.index + m[0].length - 2; // before `/>`
  return src.slice(0, insertAt) + newProp + '\n' + indent.slice(0, -2) + src.slice(insertAt);
}

function injectRecentReviews(src) {
  if (/<RecentReviews\b/.test(src)) return src;

  // Prefer inserting before <SEOCTASection — else before the final </PublicPageLayout> close
  const ctaMatch = src.match(/<SEOCTASection\b/);
  if (ctaMatch) {
    const block = `      {/* Verified App Store reviews — policy-safe SoftwareApplication aggregateRating */}
      <section className="px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <RecentReviews />
        </div>
      </section>

      `;
    return src.slice(0, ctaMatch.index) + block + src.slice(ctaMatch.index);
  }

  const layoutCloseMatch = src.match(/<\/PublicPageLayout>/);
  if (layoutCloseMatch) {
    const block = `      <section className="px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <RecentReviews />
        </div>
      </section>
    `;
    return src.slice(0, layoutCloseMatch.index) + block + src.slice(layoutCloseMatch.index);
  }

  return src;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
let candidates = mappings;
if (ONLY_HIGH) candidates = candidates.filter((m) => m.confidence === 'high');
if (ONLY_SLUG) candidates = candidates.filter((m) => m.slug === ONLY_SLUG);
candidates = candidates.filter((m) => !m.alreadyImported);

const stats = { patched: [], skippedTemplate: [], skippedNoHero: [], unchanged: [] };

for (const m of candidates) {
  const filePath = join(ROOT, m.sourceFile);
  const original = readFileSync(filePath, 'utf-8');

  const usesToolTemplate = TOOL_TEMPLATE_TAG.test(original);
  const usesGuideTemplate = GUIDE_TEMPLATE_TAG.test(original);
  const usesOtherTemplate =
    TEMPLATE_TAGS.test(original) && !usesToolTemplate && !usesGuideTemplate;
  if (usesOtherTemplate) {
    stats.skippedTemplate.push(m.slug || m.sourceFile);
    continue;
  }

  let patched = original;
  patched = stripFakeAggregateRating(patched);
  patched = refreshA4Cite(patched);
  patched = ensureImports(patched, m.componentName, m.componentImportPath);
  const beforeCalc = patched;

  if (usesToolTemplate) {
    patched = injectTemplateProp(patched, m.componentName, 'ToolTemplate', 'calculator');
  } else if (usesGuideTemplate) {
    patched = injectTemplateProp(patched, m.componentName, 'GuideTemplate', 'embeddedTool');
  } else {
    patched = injectCalculatorSection(patched, m.componentName);
    patched = injectRecentReviews(patched);
  }

  if (patched === original) {
    stats.unchanged.push(m.slug || m.sourceFile);
    continue;
  }

  if (patched === beforeCalc && !/<h1\b/.test(original)) {
    stats.skippedNoHero.push(m.slug || m.sourceFile);
    continue;
  }

  if (!DRY_RUN) writeFileSync(filePath, patched, 'utf-8');
  stats.patched.push({
    slug: m.slug,
    file: m.sourceFile,
    component: m.componentName,
    bytesAdded: patched.length - original.length,
  });
}

console.log(`\n=== Auto-patch ${DRY_RUN ? '(DRY RUN)' : ''} ===`);
console.log(`Patched:           ${stats.patched.length}`);
console.log(`Skipped (template): ${stats.skippedTemplate.length}`);
console.log(`Skipped (no hero):  ${stats.skippedNoHero.length}`);
console.log(`Unchanged:         ${stats.unchanged.length}`);
if (stats.patched.length > 0) {
  console.log('\nPatched pages:');
  stats.patched.forEach((p) =>
    console.log(`  ${p.slug || p.file}  ←  ${p.component}  (+${p.bytesAdded}B)`),
  );
}
if (stats.skippedTemplate.length > 0) {
  console.log('\nSkipped (use template — needs separate patcher):');
  stats.skippedTemplate.forEach((s) => console.log(`  ${s}`));
}
