#!/usr/bin/env node
/**
 * check-bank-categories — catches questions that can never be drawn into a paper.
 *
 * WHY THIS EXISTS
 * ---------------
 * getRandomQuestionsBalanced (src/utils/questionSelection.ts) builds a paper by
 * iterating the categories array the bank exports and pulling questions whose
 * `category` matches EXACTLY:
 *
 *     categories.forEach((category) => {
 *       const categoryQuestions = questions.filter((q) => q.category === category);
 *
 * A question whose category is not in that exported list is therefore invisible
 * to the selector. There is a global backfill at the end of the function, but it
 * only fires when the per-category pass fails to reach `count` — and with banks
 * of 200+ questions that never happens. The question sits in the file, passes
 * every other gate, and is never once shown to a candidate.
 *
 * Measured 2026-08-24: 801 questions across 19 banks were unreachable this way,
 * every one of them added during the bank-expansion work. Nothing failed. The
 * banks simply got bigger without the papers getting any deeper. This is the
 * "exists but unwired" failure again — the code is present and correct, and the
 * thing that would have used it never refers to it.
 *
 * WHAT IT CHECKS
 *   every `category:` value in a bank appears in that bank's exported categories
 *
 * Adding a question with a new category is fine — but the category has to be
 * added to the exported list too, or the question is dead weight.
 *
 * Usage: node scripts/check-bank-categories.mjs [--ci]
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ci = process.argv.includes('--ci');
const DIRS = ['src/data/general-upskilling', 'src/data/upskilling'];

const CATEGORIES_DECL = /export const \w*[Cc]ategories\s*(?::\s*[^=]+)?=\s*\[(.*?)\];/s;
const QUOTED = /'([^']+)'/g;
const CATEGORY_USE = /category: '([^']+)'/g;

const banks = DIRS.flatMap((dir) =>
  readdirSync(dir)
    .filter((f) => f.endsWith('MockExamData.ts'))
    .map((f) => join(dir, f))
);

let checked = 0;
let orphanTotal = 0;
const offenders = [];

for (const file of banks) {
  const src = readFileSync(file, 'utf8');

  const decl = src.match(CATEGORIES_DECL);
  // A bank with no exported categories array does not use the balanced selector.
  if (!decl) continue;
  checked++;

  const declared = new Set([...decl[1].matchAll(QUOTED)].map((m) => m[1]));

  const used = new Map();
  for (const m of src.matchAll(CATEGORY_USE)) {
    used.set(m[1], (used.get(m[1]) ?? 0) + 1);
  }

  const orphans = [...used.entries()].filter(([cat]) => !declared.has(cat));
  if (!orphans.length) continue;

  const n = orphans.reduce((sum, [, count]) => sum + count, 0);
  orphanTotal += n;
  offenders.push({ file, orphans: orphans.sort((a, b) => b[1] - a[1]), n, declared });
}

if (offenders.length) {
  for (const { file, orphans, n, declared } of offenders) {
    console.log(`\n✗ ${file}`);
    console.log(`  ${n} question${n === 1 ? '' : 's'} can never be drawn into a paper.`);
    for (const [cat, count] of orphans) {
      console.log(`    category '${cat}' × ${count}  — not in the exported categories array`);
    }
    console.log(`  exported categories: ${[...declared].sort().join(', ')}`);
  }
  console.log(
    `\n  Fix by either remapping these questions onto the bank's existing categories,` +
      `\n  or adding the new categories to the exported array. Note the exported list is` +
      `\n  also the paper's blueprint — the selector splits the question count evenly` +
      `\n  across it, so adding categories makes the paper shallower per topic.`
  );
}

console.log(
  `\n${orphanTotal === 0 ? '✓ PASS' : '✗ FAIL'}  ${orphanTotal} undrawable question${orphanTotal === 1 ? '' : 's'} across ${checked} banks`
);

if (ci) process.exit(orphanTotal === 0 ? 0 : 1);
