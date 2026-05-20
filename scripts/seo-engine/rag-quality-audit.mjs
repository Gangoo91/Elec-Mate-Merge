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

// ---- Numeric claim extractors (the deeper audit) ----

// Type B/C/D MCB Zs values. Pattern matches like "B32 = 1.37Ω", "32A Type B 1.37 Ω", "Type B 32A: 1.37Ω".
function extractZsClaims(text) {
  const out = [];
  const patterns = [
    // "B32 = 1.37" or "B32=1.37"
    /\bB(\d{1,3})\s*=\s*(\d+\.\d+)\s*(?:Ω|ohms?)?/gi,
    /\bC(\d{1,3})\s*=\s*(\d+\.\d+)\s*(?:Ω|ohms?)?/gi,
    /\bD(\d{1,3})\s*=\s*(\d+\.\d+)\s*(?:Ω|ohms?)?/gi,
    // "32A Type B = 1.37 Ω" / "32 A Type B 1.37Ω" / "Type B MCB at 32A: 1.37Ω"
    /\b(\d{1,3})\s*A\s+(?:Type\s*)?([BCD])(?:\s*MCB)?[^.]{0,80}?(\d+\.\d+)\s*(?:Ω|ohms?)\b/gi,
    /\b(?:Type\s*)?([BCD])\s*MCB[^.]{0,30}?\b(\d{1,3})\s*A[^.]{0,30}?(\d+\.\d+)\s*(?:Ω|ohms?)\b/gi,
  ];
  // First two patterns: simpler (B|C|D + In + value)
  for (let i = 0; i < 3; i++) {
    const re = patterns[i];
    for (const m of text.matchAll(re)) {
      const type = re.source.charAt(2); // B/C/D
      const inA = parseInt(m[1], 10);
      const valOhm = parseFloat(m[2]);
      out.push({ kind: 'zs_mcb', type, in_a: inA, claimed_ohm: valOhm, raw: m[0] });
    }
  }
  // Pattern 3 + 4: extract type/in/value
  for (const m of text.matchAll(patterns[3])) {
    out.push({ kind: 'zs_mcb', type: m[2].toUpperCase(), in_a: parseInt(m[1], 10), claimed_ohm: parseFloat(m[3]), raw: m[0] });
  }
  for (const m of text.matchAll(patterns[4])) {
    out.push({ kind: 'zs_mcb', type: m[1].toUpperCase(), in_a: parseInt(m[2], 10), claimed_ohm: parseFloat(m[3]), raw: m[0] });
  }
  return out;
}

// Cmin assertions — flag any explicit Cmin = N.NN value that isn't 0.95
function extractCminClaims(text) {
  const out = [];
  for (const m of text.matchAll(/\bCmin\s*[=≈]\s*(\d+(?:\.\d+)?)/g)) {
    out.push({ kind: 'cmin', claimed: parseFloat(m[1]), raw: m[0] });
  }
  return out;
}

// Insulation resistance minimums — should be 1.0 MΩ (BS 7671 Table 64.1, formerly 61)
function extractIRClaims(text) {
  const out = [];
  // "minimum 1 MΩ", "1.0 MΩ minimum", "0.5 MΩ minimum" etc.
  for (const m of text.matchAll(/\b(?:minimum|min\.?)\s+(\d+(?:\.\d+)?)\s*MΩ\b/gi)) {
    out.push({ kind: 'ir_min', claimed_mohm: parseFloat(m[1]), raw: m[0] });
  }
  for (const m of text.matchAll(/\b(\d+(?:\.\d+)?)\s*MΩ\s+minimum\b/gi)) {
    out.push({ kind: 'ir_min', claimed_mohm: parseFloat(m[1]), raw: m[0] });
  }
  return out;
}

// Disconnection time claims — TN 0.4s ≤32A, 0.2s TT ≤32A, 5s TN >32A, 1s TT >32A
function extractDisconnectionTimeClaims(text) {
  const out = [];
  // "0.4s TN" / "TN disconnection 0.4 s" / "≤32A 0.4s"
  for (const m of text.matchAll(/\b(\d(?:\.\d+)?)\s*s(?:econds)?\b[^.]{0,40}\b(TN|TT)\b/gi)) {
    out.push({ kind: 'disc_time', time_s: parseFloat(m[1]), system: m[2].toUpperCase(), raw: m[0] });
  }
  for (const m of text.matchAll(/\b(TN|TT)\b[^.]{0,40}\b(\d(?:\.\d+)?)\s*s(?:econds)?\b/gi)) {
    out.push({ kind: 'disc_time', time_s: parseFloat(m[2]), system: m[1].toUpperCase(), raw: m[0] });
  }
  return out;
}

// RCD trip time claims at 1× / 5× IΔn (BS EN 61008/61009)
function extractRcdTripClaims(text) {
  const out = [];
  // "300ms at 1× rated", "40ms at 5× rated", "trips within 300 ms"
  for (const m of text.matchAll(/\b(\d+)\s*ms\b[^.]{0,40}(?:1\s*×|5\s*×|IΔn|rated)/gi)) {
    out.push({ kind: 'rcd_trip', time_ms: parseInt(m[1], 10), raw: m[0] });
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
    ...extractZsClaims(text),
    ...extractCminClaims(text),
    ...extractIRClaims(text),
    ...extractDisconnectionTimeClaims(text),
    ...extractRcdTripClaims(text),
  ];
}

// Expected values
const CMIN = 0.95;
const UO = 230;
const MCB_MULTIPLIER = { B: 5, C: 10, D: 20 };
function expectedZsOhm(type, inA) {
  const mult = MCB_MULTIPLIER[type];
  if (!mult) return null;
  const ia = mult * inA;
  return (UO * CMIN) / ia;
}

// ---------------- Validator ----------------

function validateClaim(claim) {
  switch (claim.kind) {
    case 'zs_mcb': {
      const expected = expectedZsOhm(claim.type, claim.in_a);
      if (expected === null) return false;
      // Allow 0.03 Ω tolerance (rounding)
      return Math.abs(claim.claimed_ohm - expected) <= 0.03;
    }
    case 'cmin':
      return Math.abs(claim.claimed - 0.95) <= 0.01;
    case 'ir_min':
      // BS 7671 Table 64.1: 1.0 MΩ minimum for LV. SELV/PELV uses 0.5 MΩ. Anything below 0.5 is suspect.
      return claim.claimed_mohm === 1 || claim.claimed_mohm === 1.0 || claim.claimed_mohm === 0.5;
    case 'disc_time':
      // Valid pairs per BS 7671 Table 41.1: TN { 0.4, 5 }, TT { 0.2, 1 }
      if (claim.system === 'TN') return [0.4, 5, 5.0].includes(claim.time_s);
      if (claim.system === 'TT') return [0.2, 1, 1.0].includes(claim.time_s);
      return false;
    case 'rcd_trip':
      // BS EN 61008/61009: 300ms at 1×, 40ms at 5× (for 30mA). Accept 40-300 range.
      return claim.time_ms === 300 || claim.time_ms === 40 || claim.time_ms === 150 || claim.time_ms === 200;
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
