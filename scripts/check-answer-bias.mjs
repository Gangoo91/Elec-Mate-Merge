#!/usr/bin/env node
/**
 * check-answer-bias.mjs — CI guardrail.
 *
 * Fails (exits 1) if any question bank file under src/data/ regresses on
 * either of the biases fixed in ELE-998 / ELE-992:
 *
 *  - POSITION BIAS:  >MAX_B_PCT of correct answers at index 1 ("B").
 *    Runtime shuffle in <StandardMockExam>/<SEOMockExam>/quiz components
 *    masks this for users, but a 100% B source file is a smell.
 *
 *  - LENGTH-TELL:    >MAX_FLAG_PCT of questions where the correct option
 *    is more than FLAG_RATIO × the mean distractor length. This is the
 *    tell that a test-wise candidate spots in seconds.
 *
 * Tuning (see top of file) is intentionally generous — we want to catch
 * regressions, not flag the small residual that can't be fixed via
 * sibling substitution (e.g. value-answer questions like "230 V"
 * surrounded by long explanatory distractors).
 *
 * Run locally:
 *   node scripts/check-answer-bias.mjs
 *
 * Run in CI (recommended pre-build step):
 *   "lint:bias": "node scripts/check-answer-bias.mjs"
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SEARCH_DIRS = [
  'src/data/apprentice-courses',
  'src/data/apprentice',
  'src/data/upskilling',
  'src/data/general-upskilling',
  'src/data/learning-hub-quiz',
  // 2026-05-25: inline section-quiz questions in apprentice page TSX files.
  'src/pages/apprentice-courses',
];

// Thresholds — only fire on real regressions, not the irreducible tail.
const MIN_QUESTIONS_TO_CHECK = 20; // ignore tiny banks (true/false section quizzes etc.)
const MAX_B_PCT = 50;              // > 50% correct=B in a single file = regression
const MAX_FLAG_PCT = 35;           // > 35% length-tell flagged = regression
const FLAG_RATIO = 1.4;            // matches audit-question-bias.mjs

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e);
    let s;
    try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e)) out.push(p);
  }
  return out;
}

// Match both `correctAnswer:` (most banks) and `correctIndex:` (inline
// section quizzes consumed by InlineCheck) — see audit-question-bias.mjs.
const CA = /(?:correctAnswer|correctIndex)/.source;
const RE_OPTS_FIRST = new RegExp(`options\\s*:\\s*\\[([\\s\\S]*?)\\][\\s\\S]{0,600}?${CA}\\s*:\\s*(\\d+)`, 'g');
const RE_CORRECT_FIRST = new RegExp(`${CA}\\s*:\\s*(\\d+)[\\s\\S]{0,600}?options\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'g');

function parseOpts(raw) {
  const out = [];
  let i = 0;
  while (i < raw.length) {
    const c = raw[i];
    if (c === '"' || c === "'" || c === '`') {
      const q = c; let j = i + 1; let buf = '';
      while (j < raw.length) {
        if (raw[j] === '\\') { buf += raw[j + 1] || ''; j += 2; continue; }
        if (raw[j] === q) { out.push(buf); j++; break; }
        buf += raw[j]; j++;
      }
      i = j;
    } else i++;
  }
  return out;
}

const violations = [];

for (const f of SEARCH_DIRS.flatMap((d) => walk(join(ROOT, d)))) {
  let txt;
  try { txt = readFileSync(f, 'utf8'); } catch { continue; }
  const rel = relative(ROOT, f);

  let n = 0;
  let bCount = 0;
  let flagged = 0;
  const seen = new Set();

  function handle(opts, correctIdx) {
    if (opts.length !== 4) return;
    if (correctIdx < 0 || correctIdx > 3) return;
    n++;
    if (correctIdx === 1) bCount++;
    const correctLen = opts[correctIdx].length;
    const distractorMean = (opts.reduce((s, o) => s + o.length, 0) - correctLen) / 3;
    if (distractorMean > 0 && correctLen / distractorMean > FLAG_RATIO) flagged++;
  }

  for (const m of txt.matchAll(RE_OPTS_FIRST)) {
    if (seen.has(m.index)) continue;
    seen.add(m.index);
    handle(parseOpts(m[1]), parseInt(m[2], 10));
  }
  for (const m of txt.matchAll(RE_CORRECT_FIRST)) {
    if (seen.has(m.index)) continue;
    seen.add(m.index);
    handle(parseOpts(m[2]), parseInt(m[1], 10));
  }

  if (n < MIN_QUESTIONS_TO_CHECK) continue;

  const bPct = (bCount / n) * 100;
  const flagPct = (flagged / n) * 100;
  if (bPct > MAX_B_PCT || flagPct > MAX_FLAG_PCT) {
    violations.push({ rel, n, bPct, flagPct });
  }
}

if (violations.length === 0) {
  console.log(`[check-answer-bias] All ${SEARCH_DIRS.length} question-bank trees within thresholds.`);
  console.log(`  Limits: ≤${MAX_B_PCT}% correct=B per file, ≤${MAX_FLAG_PCT}% length-tell flagged.`);
  process.exit(0);
}

console.error(`[check-answer-bias] ${violations.length} file(s) over thresholds:\n`);
console.error(`  Limits: ≤${MAX_B_PCT}% correct=B, ≤${MAX_FLAG_PCT}% length-tell flagged.\n`);
for (const v of violations) {
  const flags = [];
  if (v.bPct > MAX_B_PCT) flags.push(`B-correct ${v.bPct.toFixed(0)}%`);
  if (v.flagPct > MAX_FLAG_PCT) flags.push(`length-tell ${v.flagPct.toFixed(0)}%`);
  console.error(`  ${v.rel}  (n=${v.n}, ${flags.join(', ')})`);
}
console.error(`\nFix: run \`node scripts/rebalance-distractors.mjs --file <path>\` for length-tell,`);
console.error(`     or manually distribute correctAnswer across A/B/C/D when authoring new banks.`);
console.error(`     See scripts/rebalance-progress.md for context.`);
process.exit(1);
