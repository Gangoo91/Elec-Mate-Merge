#!/usr/bin/env node

/**
 * Apply `noindex: true` to every SEO page flagged kill_301 by the audit.
 *
 * These pages are cannibalisation losers or genuinely thin pages. The 301
 * redirects in public/_redirects route traffic. The noindex meta tells
 * Google to drop them from the index faster — the 301 handles users; the
 * noindex handles search index hygiene.
 *
 * Hooks into useSEO({ noindex: true }) or template prop where applicable.
 * Reads reports/seo-audit.json for the kill list.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const REPORT = join(ROOT, 'reports', 'seo-audit.json');
const DRY_RUN = process.argv.includes('--dry-run');

if (!existsSync(REPORT)) {
  console.error(`No audit report at ${REPORT}. Run scripts/seo-audit/run.mjs first.`);
  process.exit(1);
}

const { scored } = JSON.parse(readFileSync(REPORT, 'utf-8'));
// Target ALL cannibalisation losers + kill_301 candidates. Anything with a
// 301 redirect waiting shouldn't be in Google's index.
const killList = scored.filter(
  (p) =>
    p.suggestedAction === 'kill_301' ||
    p.suggestedAction === 'merge' ||
    p.cannibalisationRole === 'redirect_source',
);

console.log(`[noindex] ${killList.length} pages to flag (kill_301 + merge + redirect_source)`);

const stats = { patched: [], alreadyNoindex: [], unmatched: [], errored: [] };

for (const page of killList) {
  const filePath = join(ROOT, page.sourceFile);
  if (!existsSync(filePath)) {
    stats.errored.push({ file: page.sourceFile, reason: 'file not found' });
    continue;
  }

  const original = readFileSync(filePath, 'utf-8');

  // Already has noindex
  if (/noindex\s*:\s*true/.test(original)) {
    stats.alreadyNoindex.push(page.sourceFile);
    continue;
  }

  let patched = null;

  // Pattern A: <GuideTemplate ... /> — inject noindex={true} prop
  for (const tmpl of ['GuideTemplate', 'ToolTemplate', 'ComparisonTemplate', 'CourseTemplate', 'BusinessTemplate']) {
    if (patched) break;
    const re = new RegExp(`<${tmpl}([\\s\\S]*?)\\/>`);
    const m = re.exec(original);
    if (!m) continue;
    if (/\bnoindex\s*=\s*\{/.test(m[0])) continue;
    const propsBlock = m[1];
    const lines = propsBlock.split('\n');
    let indent = '      ';
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim().length > 0) {
        indent = lines[i].match(/^(\s*)/)[1] || indent;
        break;
      }
    }
    const newProp = `\n${indent}noindex={true}`;
    const insertAt = m.index + m[0].length - 2;
    patched =
      original.slice(0, insertAt) + newProp + '\n' + indent.slice(0, -2) + original.slice(insertAt);
  }

  // Pattern B: useSEO({ ... }) — inject noindex: true into the options object
  if (!patched) {
    const useSeoMatch = original.match(/useSEO\(\s*\{([\s\S]*?)\}\s*\)/);
    if (useSeoMatch) {
      const optsBody = useSeoMatch[1];
      const trimmedBody = optsBody.replace(/\s*$/, '');
      const sep = trimmedBody.endsWith(',') ? '' : ',';
      const newBody = `${trimmedBody}${sep}\n    noindex: true,\n  `;
      patched =
        original.slice(0, useSeoMatch.index) +
        `useSEO({${newBody}})` +
        original.slice(useSeoMatch.index + useSeoMatch[0].length);
    }
  }

  // Pattern C: <Helmet> direct injection — last-resort fallback
  if (!patched) {
    if (/<Helmet>/.test(original) && !/noindex/.test(original)) {
      patched = original.replace(
        /<Helmet>/,
        `<Helmet>\n        <meta name="robots" content="noindex,follow" />`,
      );
    }
  }

  if (!patched) {
    stats.unmatched.push(page.sourceFile);
    continue;
  }

  if (!DRY_RUN) writeFileSync(filePath, patched, 'utf-8');
  stats.patched.push(page.slug || page.sourceFile);
}

console.log(`\n=== noindex kill_301 pages ${DRY_RUN ? '(DRY RUN)' : ''} ===`);
console.log(`Patched:           ${stats.patched.length}`);
console.log(`Already noindex:   ${stats.alreadyNoindex.length}`);
console.log(`Unmatched:         ${stats.unmatched.length}`);
console.log(`Errored:           ${stats.errored.length}`);
if (stats.patched.length > 0 && stats.patched.length <= 60) {
  console.log(`\nPatched:`);
  stats.patched.forEach((s) => console.log(`  ${s}`));
}
if (stats.unmatched.length > 0) {
  console.log(`\nCould not patch (need manual review):`);
  stats.unmatched.forEach((s) => console.log(`  ${s}`));
}
