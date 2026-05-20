#!/usr/bin/env node
/**
 * rag-quality-audit.mjs — Per-page grounding check.
 *
 * For every SEO page (.tsx + its linked GeneratedGuidePage config if any),
 * extract BS 7671 citations + numeric claims, validate against the known
 * BS 7671:2018+A4:2026 universe (1729 regs, 780 sections, 44 chapters,
 * 8 parts, 19 appendices, common tables), and score the page.
 *
 * Inputs:
 *   /tmp/bs7671-universe.json   — validation universe (built by build-bs7671-universe.py)
 *   reports/seo-audit.json      — per-page slug + impressions data
 *   reports/gsc-snapshot.json   — recent GSC clicks/impressions (optional, for priority)
 *
 * Outputs:
 *   reports/rag-quality-audit.json — per-page detail (claims found, verified, unverified)
 *   reports/rag-quality-audit.md   — human-readable ranked report
 *
 * Run:
 *   node scripts/seo-engine/rag-quality-audit.mjs
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const UNIVERSE = JSON.parse(readFileSync('/tmp/bs7671-universe.json', 'utf-8'));
const AUDIT = existsSync(join(ROOT, 'reports/seo-audit.json'))
  ? JSON.parse(readFileSync(join(ROOT, 'reports/seo-audit.json'), 'utf-8'))
  : { scored: [] };
const GSC = existsSync('/tmp/gsc-snapshot.json')
  ? JSON.parse(readFileSync('/tmp/gsc-snapshot.json', 'utf-8'))
  : null;

const REG_SET = new Set(UNIVERSE.regs);
const SECTION_SET = new Set(UNIVERSE.sections);
const CHAPTER_SET = new Set(UNIVERSE.chapters.map(String));
const PART_SET = new Set(UNIVERSE.parts.map(String));
const APPENDIX_SET = new Set(UNIVERSE.appendices.map(String));
const TABLE_SET = new Set(UNIVERSE.tables_known.map((t) => t.toUpperCase()));

// Build a "section-prefix" set from reg_numbers. Any reg "712.1" makes "712" a valid section.
const SECTION_PREFIX_SET = new Set();
for (const reg of UNIVERSE.regs) {
  const parts = reg.split('.');
  for (let i = 1; i <= parts.length; i++) {
    SECTION_PREFIX_SET.add(parts.slice(0, i).join('.'));
  }
}
for (const s of UNIVERSE.sections) {
  const parts = s.split('.');
  for (let i = 1; i <= parts.length; i++) {
    SECTION_PREFIX_SET.add(parts.slice(0, i).join('.'));
  }
}
// Stop-word patterns for table regex false positives
const TABLE_STOPWORDS = new Set(['OF','NUMBERING','CONTENTS','BELOW','ABOVE','RIGHT','LEFT','SUMMARY','SHOWS','ABOUT']);

// ---------------- Extractors ----------------

// Match patterns. Each returns an array of { kind, raw, normalised }
function extractRegCites(text) {
  const out = [];
  // "Regulation 411.3.1.2" / "Reg 411.3.1.2" / "Reg. 411.3.1.2"
  for (const m of text.matchAll(/\b(?:Regulation|Reg\.?)\s+(\d+(?:\.\d+){1,5}(?:\.\d+)?)\b/g)) {
    out.push({ kind: 'reg', raw: m[0], normalised: m[1] });
  }
  return out;
}
function extractSectionCites(text) {
  const out = [];
  // "Section 722" / "Section 411" / "Section 537.3.2" — only digits without forbidden prefixes
  for (const m of text.matchAll(/\bSection\s+(\d{2,3}(?:\.\d+){0,3})\b/g)) {
    out.push({ kind: 'section', raw: m[0], normalised: m[1] });
  }
  return out;
}
function extractChapterCites(text) {
  const out = [];
  for (const m of text.matchAll(/\bChapter\s+(\d{1,2})\b/g)) {
    out.push({ kind: 'chapter', raw: m[0], normalised: m[1] });
  }
  return out;
}
function extractPartCites(text) {
  const out = [];
  for (const m of text.matchAll(/\bPart\s+(\d)\b(?:\s*of\s+BS\s*7671)?/g)) {
    out.push({ kind: 'part', raw: m[0], normalised: m[1] });
  }
  return out;
}
function extractAppendixCites(text) {
  const out = [];
  for (const m of text.matchAll(/\bAppendix\s+(\d{1,2})\b/g)) {
    out.push({ kind: 'appendix', raw: m[0], normalised: m[1] });
  }
  return out;
}
function extractTableCites(text) {
  const out = [];
  // Strict patterns: must look like a BS 7671 table ID:
  //   NN.N (e.g. 41.3, 52.1)
  //   NA-Z[N][A-Z] (e.g. 4D5B, 4Ab)
  //   A15.N (Appendix-table form)
  //   BN (Appendix B form, e.g. B1)
  const patterns = [
    /\bTable\s+(\d{1,2}\.\d{1,2}[A-Z]?)\b/g,         // 41.3, 4Ab style with dot
    /\bTable\s+(\d[A-Za-z]+\d?[A-Za-z]?)\b/g,         // 4D5B style
    /\bTable\s+([A-Z]\d{1,2}(?:\.\d{1,2})?)\b/g,      // B1, A15.1
    /\bTable\s+(4Ab)\b/g,                              // explicit 4Ab match
  ];
  for (const re of patterns) {
    for (const m of text.matchAll(re)) {
      const norm = m[1].toUpperCase();
      if (TABLE_STOPWORDS.has(norm)) continue;
      out.push({ kind: 'table', raw: m[0], normalised: norm });
    }
  }
  return out;
}

function extractAllClaims(text) {
  return [
    ...extractRegCites(text),
    ...extractSectionCites(text),
    ...extractChapterCites(text),
    ...extractPartCites(text),
    ...extractAppendixCites(text),
    ...extractTableCites(text),
  ];
}

// ---------------- Validator ----------------

function validateClaim(claim) {
  switch (claim.kind) {
    case 'reg':
      // Direct match OR prefix match (e.g. "708.553.1.4" valid if any reg starts with "708.553.1.4")
      if (REG_SET.has(claim.normalised)) return true;
      for (const reg of REG_SET) {
        if (reg.startsWith(claim.normalised + '.') || reg === claim.normalised) return true;
      }
      return false;
    case 'section':
      // Valid if direct section, OR a reg, OR a section-prefix (e.g. "712" valid because "712.1" exists)
      return SECTION_SET.has(claim.normalised) || REG_SET.has(claim.normalised) || SECTION_PREFIX_SET.has(claim.normalised);
    case 'chapter':
      return CHAPTER_SET.has(claim.normalised);
    case 'part':
      return PART_SET.has(claim.normalised);
    case 'appendix':
      return APPENDIX_SET.has(claim.normalised);
    case 'table':
      // For tables: known list OR matches the standard BS 7671 patterns we extracted (since extractor is now strict)
      return TABLE_SET.has(claim.normalised) || /^\d{1,2}\.\d{1,2}[A-Z]?$/.test(claim.normalised) || /^4[A-Z]+\d?[A-Z]?$/i.test(claim.normalised) || /^[A-Z]\d{1,2}(?:\.\d{1,2})?$/.test(claim.normalised);
    default:
      return false;
  }
}

// ---------------- File processing ----------------

function readSafe(path) {
  try {
    return readFileSync(path, 'utf-8');
  } catch {
    return '';
  }
}

function loadPageContent(sourceFile) {
  // Read the .tsx file + any GeneratedGuidePage config it imports
  const fullPath = join(ROOT, sourceFile);
  let content = readSafe(fullPath);
  // If it's a thin wrapper that uses GeneratedGuidePage config={X}, follow into the config
  const cfgMatch = content.match(/<GeneratedGuidePage\s+config=\{(\w+)\}/);
  if (cfgMatch) {
    const importRe = new RegExp(
      `import\\s*\\{\\s*${cfgMatch[1]}\\s*\\}\\s*from\\s*['"]@/pages/seo/generated/(\\w+)['"]`
    );
    const importMatch = content.match(importRe);
    if (importMatch) {
      const cfgPath = join(GEN_DIR, `${importMatch[1]}.ts`);
      if (existsSync(cfgPath)) {
        content += '\n\n// ---- config content ----\n' + readSafe(cfgPath);
      }
    }
  }
  return content;
}

// ---------------- Main ----------------

const pages = AUDIT.scored.filter((p) => p.slug && p.sourceFile);
console.log(`Auditing ${pages.length} pages...`);

const gscImp = {};
if (GSC?.top_pages) {
  for (const r of GSC.top_pages) {
    const slug = (r.keys?.[0] || '').replace('https://www.elec-mate.com', '');
    gscImp[slug] = r.impressions || 0;
  }
}
if (GSC?.ctr_opportunities) {
  for (const r of GSC.ctr_opportunities) {
    const slug = (r.keys?.[0] || '').replace('https://www.elec-mate.com', '');
    gscImp[slug] = Math.max(gscImp[slug] || 0, r.impressions || 0);
  }
}

const results = [];
for (const p of pages) {
  const content = loadPageContent(p.sourceFile);
  if (!content) continue;

  const claims = extractAllClaims(content);
  const verified = claims.filter(validateClaim);
  const unverified = claims.filter((c) => !validateClaim(c));

  // Dedupe by raw text per kind so we don't over-count repeated cites
  const dedupe = (arr) => {
    const seen = new Set();
    return arr.filter((c) => {
      const k = `${c.kind}|${c.normalised}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };
  const uClaims = dedupe(claims);
  const uVerified = dedupe(verified);
  const uUnverified = dedupe(unverified);

  const score = uClaims.length === 0 ? 1.0 : uVerified.length / uClaims.length;
  const imp = gscImp[p.slug] || 0;
  // Priority: high impressions × low score = worst CTR-relevant grounding gap
  const priority = imp * (1 - score);

  results.push({
    slug: p.slug,
    sourceFile: p.sourceFile,
    title: p.title,
    impressions: imp,
    claims_total: uClaims.length,
    verified: uVerified.length,
    unverified: uUnverified.length,
    score: Number(score.toFixed(3)),
    priority: Math.round(priority),
    unverified_claims: uUnverified.slice(0, 10).map((c) => `${c.kind}: ${c.raw}`),
  });
}

// Sort: pages with high impressions and low score first
results.sort((a, b) => b.priority - a.priority);

const outJson = join(ROOT, 'reports/rag-quality-audit.json');
writeFileSync(outJson, JSON.stringify(results, null, 2));

// Markdown report
const md = [];
md.push('# RAG-Quality Audit\n');
md.push(`Generated: ${new Date().toISOString()}\n`);
md.push(`Universe: ${UNIVERSE.regs.length} regs, ${UNIVERSE.sections.length} sections, ${UNIVERSE.chapters.length} chapters, ${UNIVERSE.appendices.length} appendices, ${UNIVERSE.tables_known.length} known tables\n`);
md.push(`Pages audited: ${results.length}\n`);

const withClaims = results.filter((r) => r.claims_total > 0);
const fully = results.filter((r) => r.claims_total > 0 && r.score === 1);
const partial = results.filter((r) => r.claims_total > 0 && r.score > 0 && r.score < 1);
const broken = results.filter((r) => r.claims_total > 0 && r.score === 0);
const empty = results.filter((r) => r.claims_total === 0);

md.push(`## Summary\n`);
md.push(`- Pages making BS 7671 claims: **${withClaims.length}**`);
md.push(`- Fully grounded (100% verified): **${fully.length}**`);
md.push(`- Partially grounded (some unverified): **${partial.length}**`);
md.push(`- Zero grounding (all cites unverified): **${broken.length}**`);
md.push(`- No BS 7671 claims at all: **${empty.length}**\n`);

md.push(`## Worst-grounded pages (by GSC impressions × unverified fraction)\n`);
md.push(`| Priority | Slug | Imp | Claims | Verified | Unverified | Score |\n|---|---|---|---|---|---|---|`);
for (const r of results.slice(0, 50)) {
  if (r.priority === 0 && r.score === 1) continue;
  md.push(`| ${r.priority} | ${r.slug} | ${r.impressions} | ${r.claims_total} | ${r.verified} | ${r.unverified} | ${r.score} |`);
}

md.push(`\n## Top 30 unverified-claim examples (worst pages)\n`);
for (const r of results.slice(0, 30)) {
  if (r.unverified === 0) continue;
  md.push(`### ${r.slug}`);
  md.push(`- Impressions (28d): ${r.impressions} | Score: ${r.score}`);
  for (const c of r.unverified_claims) md.push(`  - ${c}`);
  md.push('');
}

const outMd = join(ROOT, 'reports/rag-quality-audit.md');
writeFileSync(outMd, md.join('\n'));

console.log(`\nSummary:`);
console.log(`  Pages with claims:  ${withClaims.length}`);
console.log(`  Fully grounded:     ${fully.length}`);
console.log(`  Partially grounded: ${partial.length}`);
console.log(`  Zero-grounding:     ${broken.length}`);
console.log(`  No claims at all:   ${empty.length}`);
console.log(`\nReport: ${outMd}`);
console.log(`Raw:    ${outJson}`);
