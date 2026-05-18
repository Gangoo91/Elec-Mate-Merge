#!/usr/bin/env node
/**
 * auto-trim-meta.mjs — Smart-trim over-length titles + meta descriptions
 * across every SEO page source file.
 *
 * Rules:
 *  - Title: 60 char hard cap. Trim at last word boundary; remove trailing
 *    "—" / "|" / "-" separators left dangling.
 *  - Description: 155 char target (Google truncates around 158-160).
 *    Trim at the last sentence boundary (.) or clause (, ; :) before 155.
 *    If trimming mid-sentence, add a clean trailing "…".
 *
 * Scans:
 *  - src/pages/seo/*.tsx — JSX props `title="..."` / `description="..."`
 *  - src/pages/seo/generated/*.ts — object literal `title: '...'` / `description: '...'`
 *
 * Idempotent: only writes when the value would change.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const TITLE_MAX = 60;
const DESC_MAX = 155;

function trimTitle(t) {
  if (!t || t.length <= TITLE_MAX) return t;
  // Trim at last word boundary under TITLE_MAX
  let cut = t.slice(0, TITLE_MAX);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > TITLE_MAX * 0.5) cut = cut.slice(0, lastSpace);
  // Strip dangling separator + whitespace
  return cut.replace(/\s*[—|\-:]\s*$/, '').trim();
}

function trimDescription(d) {
  if (!d || d.length <= DESC_MAX) return d;
  // Find last sentence boundary (. or !? followed by a space) before DESC_MAX
  const sentenceEnd = (() => {
    const window = d.slice(0, DESC_MAX);
    let lastEnd = -1;
    const re = /[.!?]\s/g;
    let m;
    while ((m = re.exec(window)) !== null) lastEnd = m.index + 1;
    return lastEnd;
  })();
  if (sentenceEnd >= DESC_MAX * 0.6) return d.slice(0, sentenceEnd).trim();
  // Otherwise trim at last clause separator
  const clauseEnd = (() => {
    const window = d.slice(0, DESC_MAX - 1); // reserve 1 for ellipsis
    let lastEnd = -1;
    const re = /[,;:]\s/g;
    let m;
    while ((m = re.exec(window)) !== null) lastEnd = m.index;
    return lastEnd;
  })();
  if (clauseEnd >= DESC_MAX * 0.5) return d.slice(0, clauseEnd).trim() + '\u2026';
  // Fall back to last word break
  const cut = d.slice(0, DESC_MAX - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > DESC_MAX * 0.5 ? cut.slice(0, lastSpace) : cut).trim() + '\u2026';
}

// ----- file walk + rewrite ----------------------------------------------

function walkSourceFiles() {
  const files = [];
  for (const dir of [SEO_DIR, GEN_DIR]) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (entry.endsWith('.tsx') || entry.endsWith('.ts')) files.push(full);
    }
  }
  return files;
}

function rewriteFile(path) {
  const src = readFileSync(path, 'utf-8');
  let next = src;
  let titleChanges = 0;
  let descChanges = 0;

  // JSX prop form: title="..."  /  description="..."
  next = next.replace(/(\btitle=)"([^"]+)"/g, (m, prefix, value) => {
    if (value.length <= TITLE_MAX) return m;
    const trimmed = trimTitle(value);
    if (trimmed === value) return m;
    titleChanges++;
    return `${prefix}"${trimmed}"`;
  });
  next = next.replace(/(\bdescription=)"([^"]+)"/g, (m, prefix, value) => {
    if (value.length <= DESC_MAX) return m;
    const trimmed = trimDescription(value);
    if (trimmed === value) return m;
    descChanges++;
    return `${prefix}"${trimmed}"`;
  });

  // Object literal form: title: '...'  /  description: '...'
  next = next.replace(/(\btitle:\s*)'([^']+)'/g, (m, prefix, value) => {
    if (value.length <= TITLE_MAX) return m;
    const trimmed = trimTitle(value);
    if (trimmed === value) return m;
    titleChanges++;
    return `${prefix}'${trimmed.replace(/'/g, "\\'")}'`;
  });
  next = next.replace(/(\bdescription:\s*)'([^']+)'/g, (m, prefix, value) => {
    if (value.length <= DESC_MAX) return m;
    const trimmed = trimDescription(value);
    if (trimmed === value) return m;
    descChanges++;
    return `${prefix}'${trimmed.replace(/'/g, "\\'")}'`;
  });

  if (next !== src) writeFileSync(path, next);
  return { titleChanges, descChanges };
}

const files = walkSourceFiles();
let totalTitle = 0;
let totalDesc = 0;
let filesTouched = 0;

for (const f of files) {
  const { titleChanges, descChanges } = rewriteFile(f);
  if (titleChanges || descChanges) {
    filesTouched++;
    totalTitle += titleChanges;
    totalDesc += descChanges;
  }
}

console.log(`Auto-trim complete.`);
console.log(`Files touched: ${filesTouched}`);
console.log(`Titles trimmed: ${totalTitle}`);
console.log(`Descriptions trimmed: ${totalDesc}`);
