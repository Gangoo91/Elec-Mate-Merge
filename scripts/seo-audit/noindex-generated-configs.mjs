#!/usr/bin/env node

/**
 * Add `noindex: true` to GeneratedGuidePage config files for every
 * kill_301 page in the audit. The wrapper page (a 9-line file) renders
 * <GeneratedGuidePage config={...} /> — the config now carries the noindex
 * flag which forwards to GuideTemplate → useSEO → <meta name=robots>.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const REPORT = join(ROOT, 'reports', 'seo-audit.json');
const CONFIG_DIR = join(ROOT, 'src/pages/seo/generated');
const DRY_RUN = process.argv.includes('--dry-run');

if (!existsSync(REPORT)) {
  console.error(`No audit at ${REPORT}.`);
  process.exit(1);
}

const { scored } = JSON.parse(readFileSync(REPORT, 'utf-8'));
// Target ALL cannibalisation losers + kill_301 candidates. Either way,
// these pages have a 301 redirect waiting and shouldn't be in Google's index.
const killSlugs = new Set(
  scored
    .filter(
      (p) =>
        p.slug &&
        (p.suggestedAction === 'kill_301' ||
          p.suggestedAction === 'merge' ||
          p.cannibalisationRole === 'redirect_source'),
    )
    .map((p) => p.slug),
);
console.log(`[noindex-cfg] ${killSlugs.size} pages to noindex (kill_301 + merge + redirect_source)`);

// Find every TypeScript config file in the generated directory
const configFiles = readdirSync(CONFIG_DIR).filter(
  (f) => f.endsWith('.ts') && !f.endsWith('.tsx') && f !== 'wave1GuideConfigs.ts',
);

const stats = { patched: [], alreadyNoindex: [], noMatch: [], notKilled: [] };

for (const file of configFiles) {
  const filePath = join(CONFIG_DIR, file);
  const original = readFileSync(filePath, 'utf-8');

  // Extract the pagePath value
  const pagePathMatch = original.match(/pagePath:\s*['"]([^'"]+)['"]/);
  if (!pagePathMatch) {
    stats.noMatch.push(file);
    continue;
  }
  const slug = pagePathMatch[1];

  if (!killSlugs.has(slug)) {
    stats.notKilled.push({ file, slug });
    continue;
  }

  if (/\bnoindex:\s*true\b/.test(original)) {
    stats.alreadyNoindex.push(file);
    continue;
  }

  // Inject noindex: true after `: GeneratedGuideConfig = {` opener
  const opener = original.match(/:\s*GeneratedGuideConfig\s*=\s*\{/);
  if (!opener) {
    stats.noMatch.push(file);
    continue;
  }
  const insertAt = opener.index + opener[0].length;
  const patched =
    original.slice(0, insertAt) +
    '\n  noindex: true,' +
    original.slice(insertAt);

  if (!DRY_RUN) writeFileSync(filePath, patched, 'utf-8');
  stats.patched.push({ file, slug });
}

console.log(`\n=== noindex generated configs ${DRY_RUN ? '(DRY RUN)' : ''} ===`);
console.log(`Patched:           ${stats.patched.length}`);
console.log(`Already noindex:   ${stats.alreadyNoindex.length}`);
console.log(`Not in kill list:  ${stats.notKilled.length}`);
console.log(`No pagePath match: ${stats.noMatch.length}`);

if (stats.patched.length > 0) {
  console.log(`\nPatched:`);
  stats.patched.forEach((p) => console.log(`  ${p.slug}  (${p.file})`));
}
