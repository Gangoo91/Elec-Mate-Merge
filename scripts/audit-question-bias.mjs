#!/usr/bin/env node
/**
 * audit-question-bias.mjs
 *
 * Scans every question bank under src/data/ and src/pages/mock-exams/ +
 * src/components/seo/ and reports two biases per file + globally:
 *
 *   1. POSITION BIAS — % of correct answers at each index (A/B/C/D)
 *   2. LENGTH BIAS — rank of the correct answer when options are sorted
 *      by length (rank 0 = correct is the longest, rank 3 = shortest)
 *
 * Also emits a JSONL "flagged questions" file listing every question where
 * `length(correct) > 1.4 × mean(length(distractors))`. That file is the
 * input to the rebalancer in Phase 2.
 *
 * Run:
 *   node scripts/audit-question-bias.mjs               # summary only
 *   node scripts/audit-question-bias.mjs --emit-flags  # also writes flagged-questions.jsonl
 *
 * No deps. Plain Node + a regex-based parser tuned for the project's
 * question-object shape — robust enough for the 167 files we ship.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SEARCH_DIRS = [
  'src/data/apprentice-courses',
  'src/data/apprentice',
  'src/data/upskilling',
  'src/data/general-upskilling',
  'src/data/learning-hub-quiz',
  'src/pages/mock-exams',
  'src/components/seo',
  // 2026-05-25: many apprentice section quizzes (HNC, Level 2/3, AM2) keep
  // their question arrays inline in the page TSX rather than under data/.
  // Scan those too — ~20k additional questions live here.
  'src/pages/apprentice-courses',
];
const FLAG_RATIO = 1.4; // correct.length > 1.4 × mean(distractor.length) → flag
const EMIT_FLAGS = process.argv.includes('--emit-flags');

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

// Pull options + correctAnswer (or correctIndex — used by InlineCheck-style
// inline section quizzes) from each question object. Handles both orderings
// (options-then-correct, correct-then-options) and tolerates other keys
// between them. Captures up to 600 chars between markers — long
// explanations occasionally sit between the two fields in some banks.
const CA = /(?:correctAnswer|correctIndex)/.source;
const RE_OPTS_FIRST = new RegExp(`options\\s*:\\s*\\[([\\s\\S]*?)\\][\\s\\S]{0,600}?${CA}\\s*:\\s*(\\d+)`, 'g');
const RE_CORRECT_FIRST = new RegExp(`${CA}\\s*:\\s*(\\d+)[\\s\\S]{0,600}?options\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'g');
// Pull a nearby id field within ~1200 chars on either side so flagged-
// questions.jsonl can point back to the exact question without us having
// to AST-parse the file.
const RE_NEARBY_ID = /id\s*:\s*(\d+|['"`][^'"`]+['"`])/;

function parseStringList(raw) {
  // Walk the captured [ ... ] body and extract each top-level string
  // literal. Tolerates escapes, ignores commas inside strings.
  const out = [];
  let i = 0;
  while (i < raw.length) {
    const c = raw[i];
    if (c === '"' || c === "'" || c === '`') {
      const quote = c;
      let buf = '';
      let j = i + 1;
      while (j < raw.length) {
        const ch = raw[j];
        if (ch === '\\') {
          // Keep the escaped char as-is (length-equivalent for our use)
          buf += raw[j + 1] ?? '';
          j += 2;
          continue;
        }
        if (ch === quote) { out.push(buf); j++; break; }
        buf += ch;
        j++;
      }
      i = j;
    } else {
      i++;
    }
  }
  return out;
}

function processMatch(opts, correctIdxStr, file, position, flagged) {
  if (opts.length !== 4) return null; // skip non-4-option questions (true/false, MCQ-3)
  const correctIdx = parseInt(correctIdxStr, 10);
  if (!Number.isInteger(correctIdx) || correctIdx < 0 || correctIdx > 3) return null;
  const correctLen = opts[correctIdx].length;
  const distractorMean = (opts.reduce((s, o) => s + o.length, 0) - correctLen) / 3;
  const ratio = distractorMean > 0 ? correctLen / distractorMean : Infinity;
  const sortedByLen = opts
    .map((o, idx) => ({ idx, len: o.length }))
    .sort((a, b) => b.len - a.len);
  const lengthRank = sortedByLen.findIndex((x) => x.idx === correctIdx);

  if (ratio > FLAG_RATIO && flagged) {
    flagged.push({
      file,
      position,
      correctIdx,
      ratio: Number(ratio.toFixed(2)),
      lengthRank,
      options: opts,
    });
  }

  return { correctIdx, lengthRank, ratio };
}

const ALL_FILES = SEARCH_DIRS.flatMap((d) => walk(join(ROOT, d)));
const flagged = EMIT_FLAGS ? [] : null;

const globalPos = [0, 0, 0, 0];
const globalRank = [0, 0, 0, 0];
let globalTotal = 0;

const perFile = [];

for (const f of ALL_FILES) {
  let txt;
  try { txt = readFileSync(f, 'utf8'); } catch { continue; }

  const rel = relative(ROOT, f);
  const pos = [0, 0, 0, 0];
  const rank = [0, 0, 0, 0];
  let n = 0;
  let flaggedInFile = 0;

  // Use both regexes so we catch questions in either field order. Track
  // start offsets to avoid double-counting if both regexes match the same
  // span — unlikely but cheap to guard.
  const seen = new Set();

  for (const m of txt.matchAll(RE_OPTS_FIRST)) {
    if (seen.has(m.index)) continue;
    seen.add(m.index);
    const opts = parseStringList(m[1]);
    const r = processMatch(opts, m[2], rel, m.index, flagged);
    if (r) {
      pos[r.correctIdx]++;
      rank[r.lengthRank]++;
      n++;
      if (r.ratio > FLAG_RATIO) flaggedInFile++;
    }
  }
  for (const m of txt.matchAll(RE_CORRECT_FIRST)) {
    if (seen.has(m.index)) continue;
    seen.add(m.index);
    const opts = parseStringList(m[2]);
    const r = processMatch(opts, m[1], rel, m.index, flagged);
    if (r) {
      pos[r.correctIdx]++;
      rank[r.lengthRank]++;
      n++;
      if (r.ratio > FLAG_RATIO) flaggedInFile++;
    }
  }

  if (n > 0) {
    for (let i = 0; i < 4; i++) {
      globalPos[i] += pos[i];
      globalRank[i] += rank[i];
    }
    globalTotal += n;
    perFile.push({ file: rel, n, pos, rank, flaggedInFile });
  }
}

function pct(num, den) { return den ? `${((num / den) * 100).toFixed(1)}%` : '0%'; }

console.log(`Audited ${ALL_FILES.length} files, parsed ${globalTotal} 4-option questions in ${perFile.length} files.\n`);
console.log('=== POSITION BIAS (which letter is the correct answer) ===');
const letters = ['A', 'B', 'C', 'D'];
for (let i = 0; i < 4; i++) {
  console.log(`  ${letters[i]}: ${globalPos[i].toLocaleString().padStart(7)}  ${pct(globalPos[i], globalTotal)}`);
}

console.log('\n=== LENGTH BIAS (rank of correct option when sorted by length) ===');
console.log(`  rank 0 (correct = LONGEST):  ${globalRank[0].toLocaleString().padStart(7)}  ${pct(globalRank[0], globalTotal)}`);
console.log(`  rank 1:                       ${globalRank[1].toLocaleString().padStart(7)}  ${pct(globalRank[1], globalTotal)}`);
console.log(`  rank 2:                       ${globalRank[2].toLocaleString().padStart(7)}  ${pct(globalRank[2], globalTotal)}`);
console.log(`  rank 3 (correct = SHORTEST): ${globalRank[3].toLocaleString().padStart(7)}  ${pct(globalRank[3], globalTotal)}`);

const totalFlagged = flagged ? flagged.length : perFile.reduce((s, f) => s + f.flaggedInFile, 0);
console.log(`\n=== LENGTH-TELL FLAGGED (correct > ${FLAG_RATIO}× mean distractor) ===`);
console.log(`  ${totalFlagged.toLocaleString()} of ${globalTotal.toLocaleString()} questions  ${pct(totalFlagged, globalTotal)}\n`);

console.log('=== TOP 20 FILES BY % LENGTH-TELL FLAGGED ===');
const worst = perFile
  .filter((f) => f.n >= 20)
  .map((f) => ({ ...f, flagPct: f.flaggedInFile / f.n }))
  .sort((a, b) => b.flagPct - a.flagPct)
  .slice(0, 20);
for (const w of worst) {
  const Bpct = ((w.pos[1] / w.n) * 100).toFixed(0).padStart(3);
  const flagPctStr = ((w.flagPct) * 100).toFixed(0).padStart(3);
  console.log(`  ${flagPctStr}% flagged, B-correct ${Bpct}%, n=${String(w.n).padStart(4)}  ${w.file}`);
}

if (EMIT_FLAGS && flagged) {
  const outPath = join(ROOT, 'scripts/flagged-questions.jsonl');
  writeFileSync(outPath, flagged.map((q) => JSON.stringify(q)).join('\n') + '\n');
  console.log(`\nWrote ${flagged.length} flagged questions to ${relative(ROOT, outPath)}`);
}
