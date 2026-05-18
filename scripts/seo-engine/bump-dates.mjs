#!/usr/bin/env node
/**
 * bump-dates.mjs — Update `dateModified` only on SEO pages whose content
 * actually changed since the last bump.
 *
 * State file: `reports/dateModified-state.json` — content-hash per file.
 *
 * How it works:
 *  1. Walk every SEO page (src/pages/seo/*.tsx, src/pages/seo/generated/*.ts).
 *  2. For each file: compute a content hash of the file with the dateModified
 *     line *stripped* (so the hash represents the editorial content, not the
 *     bump date itself).
 *  3. Compare the hash against the stored value in state.
 *  4. If different (or new file): rewrite dateModified to today's date and
 *     store the new hash.
 *  5. Save the state file.
 *
 * Usage:
 *   node scripts/seo-engine/bump-dates.mjs            # bump changed files
 *   node scripts/seo-engine/bump-dates.mjs --init     # initialise state from
 *                                                       current files without
 *                                                       touching their dates
 *   node scripts/seo-engine/bump-dates.mjs --dry-run  # show what would change
 *   node scripts/seo-engine/bump-dates.mjs --force    # bump everything
 *                                                       (e.g. fresh A4:2026 sweep)
 *
 * Add to package.json as `seo:bump-dates` and run before each git push.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const STATE_FILE = join(ROOT, 'reports/dateModified-state.json');

const INIT = process.argv.includes('--init');
const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

const TODAY = new Date().toISOString().slice(0, 10);

// ----- discovery --------------------------------------------------------

function walkSeoFiles() {
  const files = [];
  for (const dir of [SEO_DIR, GEN_DIR]) {
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stat = statSync(full);
      if (!stat.isFile()) continue;
      if (!entry.endsWith('.tsx') && !entry.endsWith('.ts')) continue;
      files.push(full);
    }
  }
  return files;
}

// Strip the dateModified line(s) before hashing — so editorial-content edits
// register as changes but bumping the date does not.
function contentHash(src) {
  const stripped = src
    .split('\n')
    .filter((line) => !/dateModified\s*[:=]\s*['"][0-9]{4}-[0-9]{2}-[0-9]{2}['"]/.test(line))
    .filter((line) => !/const\s+modified\s*=\s*['"][0-9]{4}-[0-9]{2}-[0-9]{2}['"]/.test(line))
    .filter((line) => !/dateModified\s*=\s*['"][0-9]{4}-[0-9]{2}-[0-9]{2}['"]/.test(line))
    .join('\n');
  return createHash('sha256').update(stripped).digest('hex');
}

function bumpDateInSource(src) {
  let updated = src;
  // Pattern 1: JSX prop `dateModified="YYYY-MM-DD"`
  updated = updated.replace(
    /dateModified="[0-9]{4}-[0-9]{2}-[0-9]{2}"/g,
    `dateModified="${TODAY}"`,
  );
  // Pattern 2: Object literal `dateModified: 'YYYY-MM-DD'`
  updated = updated.replace(
    /dateModified:\s*'[0-9]{4}-[0-9]{2}-[0-9]{2}'/g,
    `dateModified: '${TODAY}'`,
  );
  // Pattern 3: `const modified = 'YYYY-MM-DD'`
  updated = updated.replace(
    /const\s+modified\s*=\s*'[0-9]{4}-[0-9]{2}-[0-9]{2}'/g,
    `const modified = '${TODAY}'`,
  );
  return updated;
}

// ----- main -------------------------------------------------------------

mkdirSync(dirname(STATE_FILE), { recursive: true });
const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, 'utf-8')) : { hashes: {} };
if (!state.hashes) state.hashes = {};

const files = walkSeoFiles();
let bumped = 0;
let unchanged = 0;
let added = 0;

for (const path of files) {
  const rel = path.replace(ROOT + '/', '');
  const src = readFileSync(path, 'utf-8');
  const hash = contentHash(src);
  const previous = state.hashes[rel];

  if (INIT) {
    state.hashes[rel] = hash;
    added++;
    continue;
  }

  if (!FORCE && previous === hash) {
    unchanged++;
    continue;
  }

  if (previous === undefined) {
    // New file: record hash without touching the date (assumes the dev wrote
    // a sensible dateModified). On the NEXT real edit, the bump will fire.
    state.hashes[rel] = hash;
    added++;
    continue;
  }

  // Changed file: bump the date
  const updated = bumpDateInSource(src);
  if (!DRY) {
    writeFileSync(path, updated);
    // Re-hash AFTER the bump so future runs see "unchanged" until the next
    // real edit. (The hash function ignores the date line.)
    state.hashes[rel] = hash;
  }
  bumped++;
  if (DRY) console.log(`  WOULD_BUMP ${rel}`);
  else if (bumped <= 10) console.log(`  BUMPED ${rel}`);
}

if (!DRY) writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));

console.log(`\n${INIT ? 'INIT' : DRY ? 'DRY-RUN' : FORCE ? 'FORCE-BUMP' : 'BUMP'} complete.`);
console.log(`Bumped:     ${bumped}`);
console.log(`Unchanged:  ${unchanged}`);
console.log(`New tracked: ${added}`);
console.log(`Total files: ${files.length}`);
if (!INIT && !DRY) console.log(`State saved: ${STATE_FILE}`);
