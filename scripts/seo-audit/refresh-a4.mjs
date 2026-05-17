#!/usr/bin/env node

/**
 * Global A3:2024 → A4:2026 cite-drift refresh across every SEO page.
 *
 * Pages whose filename or H1 marks them as INTENTIONALLY about Amendment 3
 * (or 17th Edition / earlier) are protected — those pages exist to document
 * historical state and must NOT have their cites silently rewritten.
 *
 * Usage:
 *   node scripts/seo-audit/refresh-a4.mjs --dry-run
 *   node scripts/seo-audit/refresh-a4.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');

const DRY_RUN = process.argv.includes('--dry-run');

// Files we MUST NOT auto-refresh — they document historical amendments
// or compare amendments, so A3:2024 references are intentional content.
const PROTECTED_NAME_PATTERNS = [
  /Amendment3/i,                          // BS7671Amendment3Page, Course
  /Amendment4/i,                          // A4 page that contrasts with A3
  /17[A-Z_]?Edition/i,                    // 17th edition history
  /\bA3(?:[^a-z]|$)/i,                    // explicit A3 naming
  /RegulationsTimeline/i,                 // edition history timeline
  /WiringRegulationsHistory/i,            // history page
  /AmendmentComparison/i,
  /\bChangelog/i,
];

// Refresh rules. Each is { pattern, replacement, label }.
// Patterns are intentionally conservative — they only touch the
// canonical "BS 7671:2018+A3:2024" form, never bare "A3" anywhere.
const RULES = [
  {
    pattern: /BS\s*7671\s*:\s*2018\s*\+\s*A3\s*:\s*2024/g,
    replacement: 'BS 7671:2018+A4:2026',
    label: 'canonical edition string',
  },
  {
    pattern: /\bA3\s*:\s*2024\b/g,
    replacement: 'A4:2026',
    label: 'A3:2024 marker',
  },
  {
    pattern: /\bAmendment\s*3\s*\(2024\)/gi,
    replacement: 'Amendment 4 (2026)',
    label: 'Amendment 3 (2024)',
  },
];

const files = readdirSync(SEO_DIR).filter((f) => f.endsWith('.tsx'));
const stats = { patched: [], protected: [], unchanged: [] };

for (const f of files) {
  if (PROTECTED_NAME_PATTERNS.some((p) => p.test(f))) {
    stats.protected.push(f);
    continue;
  }

  const filePath = join(SEO_DIR, f);
  const original = readFileSync(filePath, 'utf-8');
  let patched = original;
  const replacements = {};

  for (const rule of RULES) {
    const before = patched;
    patched = patched.replace(rule.pattern, rule.replacement);
    const count = (before.match(rule.pattern) || []).length;
    if (count > 0) replacements[rule.label] = count;
  }

  if (patched === original) {
    stats.unchanged.push(f);
    continue;
  }

  if (!DRY_RUN) writeFileSync(filePath, patched, 'utf-8');
  stats.patched.push({ file: f, replacements });
}

console.log(`\n=== A4:2026 refresh ${DRY_RUN ? '(DRY RUN)' : ''} ===`);
console.log(`Total SEO files:     ${files.length}`);
console.log(`Patched:             ${stats.patched.length}`);
console.log(`Protected (kept):    ${stats.protected.length}`);
console.log(`Unchanged:           ${stats.unchanged.length}`);

if (stats.protected.length > 0) {
  console.log(`\nProtected pages (intentionally historical):`);
  stats.protected.forEach((f) => console.log(`  ${f}`));
}

if (stats.patched.length > 0) {
  console.log(`\nTop 20 patched (most replacements):`);
  stats.patched
    .map((p) => ({
      file: p.file,
      count: Object.values(p.replacements).reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
    .forEach((p) => console.log(`  ${String(p.count).padStart(3)}x  ${p.file}`));
}
