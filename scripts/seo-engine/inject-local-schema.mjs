#!/usr/bin/env node
/**
 * inject-local-schema.mjs — Add `localArea="CityName"` prop to every
 * /electricians/[city] page so GuideTemplate emits Service schema with
 * areaServed.
 *
 * City name extraction: from the second breadcrumb label, e.g.
 *   { label: 'Electrician in Swindon', href: '/electricians/swindon' }
 *                 -----------------> "Swindon"
 *
 * Idempotent: if `localArea=` is already present, skip.
 *
 * Usage:
 *   node scripts/seo-engine/inject-local-schema.mjs           # dry run
 *   node scripts/seo-engine/inject-local-schema.mjs --apply   # write
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const APPLY = process.argv.includes('--apply');

const files = readdirSync(SEO_DIR).filter(
  (f) => /^Electrician[A-Z][A-Za-z]+Page\.tsx$/.test(f),
);

let applied = 0;
let skippedPresent = 0;
let skippedNoData = 0;

for (const file of files) {
  const path = join(SEO_DIR, file);
  const src = readFileSync(path, 'utf-8');

  if (/\blocalArea\s*=/.test(src)) {
    skippedPresent++;
    continue;
  }

  // Restrict slug extraction to the breadcrumbs block only — related pages
  // also reference other /electricians/ URLs and would pollute the match.
  const breadcrumbsBlock = src.match(/const\s+breadcrumbs\s*=\s*\[([\s\S]*?)\]/);
  if (!breadcrumbsBlock) {
    skippedNoData++;
    continue;
  }
  const slugMatches = [...breadcrumbsBlock[1].matchAll(/href:\s*['"](?:\/electricians\/|\/guides\/electrician-)([a-z0-9-]+)['"]/gi)];
  if (slugMatches.length === 0) {
    skippedNoData++;
    continue;
  }
  const citySlug = slugMatches[slugMatches.length - 1][1];
  // Exclude non-city slugs that share the URL pattern
  const NON_CITY_SLUGS = new Set([
    'near-me','tool-insurance','van-setup','van-setup-guide','tool-list',
    'working-abroad','working-abroad-uk','day-rates','salary-uk',
    'salary-benchmarking','salary','rights-pay','flashcards','mental-health',
    'mental-health-uk','toolbox-guide','safety-cases','workplace-culture',
    'assessment-guide','course-uk','registration-cost',
  ]);
  if (NON_CITY_SLUGS.has(citySlug)) {
    skippedNoData++;
    continue;
  }
  // Slug to display name: "south-london" → "South London", "stoke-on-trent" → "Stoke On Trent"
  const cityName = citySlug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  // Find the <GuideTemplate ... > opening + insert localArea prop before
  // closing `>` or `/>`. Match the FIRST GuideTemplate render in the file.
  // We add the prop immediately after `title=` since title is required and
  // always present.
  const titlePropRe = /(<GuideTemplate[\s\S]*?title=)/;
  const m = src.match(/<GuideTemplate\b/);
  if (!m) {
    console.log(`  SKIP ${file} — no <GuideTemplate render`);
    skippedNoData++;
    continue;
  }

  // Insert `localArea="..."` on its own line right after `<GuideTemplate`
  const updated = src.replace(
    /<GuideTemplate\b/,
    `<GuideTemplate\n      localArea="${cityName.replace(/"/g, '\\"')}"`,
  );

  if (updated === src) {
    console.log(`  SKIP ${file} — no change made`);
    skippedNoData++;
    continue;
  }

  if (APPLY) writeFileSync(path, updated);
  applied++;
  console.log(`  ${APPLY ? 'APPLIED' : 'WOULD_APPLY'} ${file} → localArea="${cityName}"`);
}

console.log(`\n${APPLY ? 'APPLIED' : 'DRY-RUN'} — applied=${applied}, alreadyPresent=${skippedPresent}, noData=${skippedNoData}`);
if (!APPLY) console.log('Run with --apply to write changes.');
