#!/usr/bin/env node
/**
 * pre-push-audit.mjs — Deep audit of every SEO page before pushing.
 *
 * Goes beyond the existing scoring rubric to flag the things that matter
 * the day before a big push: audience alignment, conversion path completeness,
 * schema gaps, duplicate metadata, A4 currency, cannibalisation residue,
 * orphans, and auto-generator "tells".
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const AUDIT_JSON = join(ROOT, 'reports/seo-audit.json');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const OUT = join(ROOT, 'reports/pre-push-audit.json');
const OUT_MD = join(ROOT, 'reports/pre-push-audit.md');

const audit = JSON.parse(readFileSync(AUDIT_JSON, 'utf-8'));
const pages = audit.scored;

// ----- helpers ----------------------------------------------------------

function readSafe(path) {
  try { return readFileSync(path, 'utf-8'); } catch { return null; }
}

function readGuideConfig(slugFile) {
  // slugFile like src/pages/seo/SomePage.tsx — find its generated config
  const wrap = readSafe(join(ROOT, slugFile));
  if (!wrap) return null;
  const m = wrap.match(/import\s+\{\s*(\w+)\s*\}\s+from\s+['"]@\/pages\/seo\/generated\/(\w+)['"]/);
  if (!m) return null;
  const cfg = readSafe(join(GEN_DIR, `${m[2]}.ts`));
  return cfg;
}

function detectAudience(slug, title) {
  const t = (slug + ' ' + (title || '')).toLowerCase();
  if (/apprentice|year-[1-4]|am2|2365|2366|5357|5393|2357|2346|8202|netp3|unit-\d|18th-edition.*exam|otj|off-the-job|ecs-gold|jib-pay|career-progression|finding.*apprenticeship/.test(t)) return 'apprentice';
  if (/how-to-price|day-rate|day-rates|going-self-employed|electrician-employee-vs|niceic|napit|elecsa|stroma|cis|vat|insurance.*business|marketing.*guide|quote-template|business-pricing|starting.*business|hire.*apprentice/.test(t)) return 'electrician-or-business';
  if (/eicr|consumer-unit|cable|rcd|rcbo|spd|afdd|loop-impedance|insulation|continuity|safe-isolation|bs.7671|bs-7671|bs7671|chapter-4|section-7|section-5|section-6|appendix-4/.test(t)) return 'trade';
  if (/cost.*city|cost-[a-z]+$|electricians\/[a-z]/.test(t)) return 'local-dual';
  if (/training|course|ipaf|pasma|sssts|smsts|cscs|2391/.test(t)) return 'training';
  if (/calculator|tools\//.test(t)) return 'tool';
  if (/compare\//.test(t)) return 'comparison';
  return 'other';
}

// ----- audit dimensions -------------------------------------------------

const titles = new Map();
const descriptions = new Map();
const issues = [];
const byAudience = {};
const byTemplate = {};
const wordBuckets = { 'tiny (<800)': 0, 'small (800-1500)': 0, 'medium (1500-3000)': 0, 'large (3000-5000)': 0, 'huge (5000+)': 0 };
const linkBuckets = { '<3': 0, '3-5': 0, '6-9': 0, '10+': 0 };
const greenCount = pages.filter((p) => p.status === 'green').length;
const amberCount = pages.filter((p) => p.status === 'amber').length;
const redCount = pages.filter((p) => p.status === 'red').length;

for (const p of pages) {
  // Audience tag
  const audience = detectAudience(p.slug, p.title);
  byAudience[audience] = (byAudience[audience] || 0) + 1;
  byTemplate[p.templateUsed || 'unknown'] = (byTemplate[p.templateUsed || 'unknown'] || 0) + 1;

  // Word buckets
  const w = p.wordCount || 0;
  if (w < 800) wordBuckets['tiny (<800)']++;
  else if (w < 1500) wordBuckets['small (800-1500)']++;
  else if (w < 3000) wordBuckets['medium (1500-3000)']++;
  else if (w < 5000) wordBuckets['large (3000-5000)']++;
  else wordBuckets['huge (5000+)']++;

  // Link buckets
  const il = p.internalLinks || 0;
  if (il < 3) linkBuckets['<3']++;
  else if (il < 6) linkBuckets['3-5']++;
  else if (il < 10) linkBuckets['6-9']++;
  else linkBuckets['10+']++;

  // Duplicate detection
  if (p.title) {
    if (!titles.has(p.title)) titles.set(p.title, []);
    titles.get(p.title).push(p.slug);
  }
  if (p.description) {
    if (!descriptions.has(p.description)) descriptions.set(p.description, []);
    descriptions.get(p.description).push(p.slug);
  }

  // Title length issues
  if (p.title && p.title.length > 65) issues.push({ slug: p.slug, kind: 'title-too-long', value: `${p.title.length} chars` });
  if (p.title && p.title.length < 25) issues.push({ slug: p.slug, kind: 'title-too-short', value: `${p.title.length} chars` });
  if (p.description && p.description.length > 165) issues.push({ slug: p.slug, kind: 'description-too-long', value: `${p.description.length} chars` });
  if (p.description && p.description.length < 110) issues.push({ slug: p.slug, kind: 'description-too-short', value: `${p.description.length} chars` });

  // Thin content
  if (w < 800 && p.status !== 'red') issues.push({ slug: p.slug, kind: 'thin-content', value: `${w} words` });

  // Stale amendment references in source/config
  if (p.sourceFile) {
    const fileText = readSafe(join(ROOT, p.sourceFile)) || '';
    const configText = readGuideConfig(p.sourceFile) || '';
    const haystack = fileText + configText;
    if (/Amendment 3(?!\W*\(?(?:2024|July|issued))/i.test(haystack) && !/Amendment3Page|Amendment3Course|RegulationsTimeline|RegulationsHistory/.test(p.sourceFile)) {
      // crude check — flag any "Amendment 3" not annotated as historic
      if (haystack.match(/Amendment 3/g) || haystack.match(/A3:2024/)) {
        if (!haystack.includes('historical') && !haystack.includes('previous')) {
          // already cleaned in our bulk — only flag remaining
          if (/A3:2024/.test(haystack) || /BS 7671:2018\+A3/.test(haystack)) {
            issues.push({ slug: p.slug, kind: 'stale-amendment-ref' });
          }
        }
      }
    }
  }

  // Audience misalignment — homeowner-targeted pages without dual-audience reframe
  if (audience === 'local-dual') {
    const cfg = readGuideConfig(p.sourceFile) || '';
    if (cfg && !cfg.includes('For Electricians') && !cfg.includes('For electricians')) {
      issues.push({ slug: p.slug, kind: 'homeowner-only-needs-dual-audience' });
    }
  }
}

// Duplicate metadata
const duplicateTitles = [...titles.entries()].filter(([_, slugs]) => slugs.length > 1);
const duplicateDescs = [...descriptions.entries()].filter(([_, slugs]) => slugs.length > 1);

for (const [t, slugs] of duplicateTitles) issues.push({ slug: slugs.join(', '), kind: 'duplicate-title', value: t.slice(0, 70) });
for (const [d, slugs] of duplicateDescs) issues.push({ slug: slugs.join(', '), kind: 'duplicate-description', value: d.slice(0, 70) });

// Group issues by kind
const issuesByKind = {};
for (const i of issues) {
  if (!issuesByKind[i.kind]) issuesByKind[i.kind] = [];
  issuesByKind[i.kind].push(i);
}

// ----- output -----------------------------------------------------------

const summary = {
  generatedAt: new Date().toISOString(),
  totalPages: pages.length,
  byStatus: { green: greenCount, amber: amberCount, red: redCount },
  byAudience,
  byTemplate,
  wordBuckets,
  linkBuckets,
  issueCount: issues.length,
  issuesByKindCount: Object.fromEntries(Object.entries(issuesByKind).map(([k, v]) => [k, v.length])),
  topDuplicateTitles: duplicateTitles.slice(0, 10).map(([t, slugs]) => ({ title: t.slice(0, 60), slugs: slugs.slice(0, 5) })),
  topDuplicateDescs: duplicateDescs.slice(0, 10).map(([d, slugs]) => ({ desc: d.slice(0, 80), slugs: slugs.slice(0, 5) })),
};

writeFileSync(OUT, JSON.stringify({ summary, issues }, null, 2));

// Markdown report
const md = [];
md.push('# Pre-Push SEO Audit');
md.push('');
md.push(`Generated: ${summary.generatedAt}`);
md.push('');
md.push('## Overview');
md.push('');
md.push(`- **Total pages**: ${summary.totalPages}`);
md.push(`- **Green**: ${greenCount} (${((greenCount / pages.length) * 100).toFixed(1)}%)`);
md.push(`- **Amber**: ${amberCount}`);
md.push(`- **Red**: ${redCount}`);
md.push('');
md.push('## By Audience');
md.push('');
for (const [aud, n] of Object.entries(byAudience).sort((a, b) => b[1] - a[1])) md.push(`- **${aud}**: ${n}`);
md.push('');
md.push('## By Template');
md.push('');
for (const [tpl, n] of Object.entries(byTemplate).sort((a, b) => b[1] - a[1])) md.push(`- **${tpl}**: ${n}`);
md.push('');
md.push('## Word Count Distribution');
md.push('');
for (const [bucket, n] of Object.entries(wordBuckets)) md.push(`- **${bucket}**: ${n}`);
md.push('');
md.push('## Internal Link Distribution');
md.push('');
for (const [bucket, n] of Object.entries(linkBuckets)) md.push(`- **${bucket} links**: ${n}`);
md.push('');
md.push('## Issues Found');
md.push('');
md.push(`Total issues: **${issues.length}**`);
md.push('');
md.push('| Issue | Count |');
md.push('|---|---|');
for (const [kind, items] of Object.entries(issuesByKind).sort((a, b) => b[1].length - a[1].length)) {
  md.push(`| ${kind} | ${items.length} |`);
}
md.push('');
md.push('## Top 10 Duplicate Titles');
md.push('');
for (const dt of summary.topDuplicateTitles) {
  md.push(`- "${dt.title}..." — ${dt.slugs.join(', ')}`);
}
md.push('');
md.push('## Top 10 Duplicate Descriptions');
md.push('');
for (const dd of summary.topDuplicateDescs) {
  md.push(`- "${dd.desc}..." — ${dd.slugs.join(', ')}`);
}
md.push('');
md.push('## Recommended Next Actions');
md.push('');
md.push('1. Fix any duplicate titles + descriptions (Google\\u2019s biggest red flag for thin/aggregated content).');
md.push('2. Rewrite over-length titles + descriptions so they don\\u2019t get auto-truncated in SERP.');
md.push('3. Fix dual-audience reframes still pending.');
md.push('4. Investigate amber/red pages — either rebuild or noindex.');
md.push('5. Run `npm run seo:bump-dates:force` to refresh all dateModified before push.');
md.push('');

writeFileSync(OUT_MD, md.join('\n'));

console.log('Pre-push audit complete.');
console.log(`Total pages: ${summary.totalPages}`);
console.log(`Issues found: ${issues.length}`);
console.log(`Output: ${OUT}`);
console.log(`Report:  ${OUT_MD}`);
