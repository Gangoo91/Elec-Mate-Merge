#!/usr/bin/env node

/**
 * Remove kill_301 URLs from public/sitemap-seo.xml so Google stops trying
 * to crawl them. The 301 redirects in public/_redirects already route any
 * traffic to the canonical winners.
 *
 * Combined effect:
 *   - sitemap removal: "don't crawl this URL again"
 *   - 301 redirect: "if anyone hits this URL, send them to the canonical"
 *   - canonical winner gets traffic + link equity consolidated.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const REPORT = join(ROOT, 'reports', 'seo-audit.json');
const SITEMAP = join(ROOT, 'public', 'sitemap-seo.xml');
const DRY_RUN = process.argv.includes('--dry-run');

if (!existsSync(REPORT)) {
  console.error(`No audit at ${REPORT}.`);
  process.exit(1);
}
if (!existsSync(SITEMAP)) {
  console.error(`No sitemap at ${SITEMAP}.`);
  process.exit(1);
}

const { scored } = JSON.parse(readFileSync(REPORT, 'utf-8'));
const killSlugs = new Set(
  scored.filter((p) => p.suggestedAction === 'kill_301' && p.slug).map((p) => p.slug),
);
console.log(`[sitemap-clean] ${killSlugs.size} kill_301 slugs to remove from sitemap-seo.xml`);

const original = readFileSync(SITEMAP, 'utf-8');

// Match every <url>...</url> block and decide whether to keep it.
// Conservative regex: each block is delimited by <url> and </url>.
const urlBlockRe = /<url>[\s\S]*?<\/url>/g;
let removed = 0;
let kept = 0;

const patched = original.replace(urlBlockRe, (block) => {
  const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
  if (!locMatch) return block;
  const fullUrl = locMatch[1].trim();
  // Convert https://www.elec-mate.com/foo → /foo for comparison
  const slug = fullUrl.replace(/^https?:\/\/[^/]+/, '') || '/';
  if (killSlugs.has(slug)) {
    removed++;
    return ''; // Drop the block entirely
  }
  kept++;
  return block;
});

// Normalise double-blank lines that result from removed blocks
const cleaned = patched.replace(/\n{3,}/g, '\n\n');

console.log(`[sitemap-clean] kept ${kept} URLs, removed ${removed}`);

if (!DRY_RUN) {
  writeFileSync(SITEMAP, cleaned, 'utf-8');
  console.log(`[sitemap-clean] wrote ${SITEMAP}`);
} else {
  console.log(`[sitemap-clean] (dry run — no write)`);
}
