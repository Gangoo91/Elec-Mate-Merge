#!/usr/bin/env node
/**
 * rebalance-distractors.mjs
 *
 * Deterministic distractor rewriter for length-tell flagged questions.
 *
 * Approach: for each flagged question, replace the absolute-strawman
 * distractors ("Only X", "Just Y", "Never Z", etc.) with three siblings'
 * correct answers drawn from elsewhere in the same bank. Siblings are
 * filtered by:
 *
 *  - length within 0.7× — 1.3× the current question's correct answer
 *  - first significant token doesn't overlap the correct answer's first
 *    significant token (to avoid accidentally including a paraphrase)
 *  - simple keyword non-overlap (no shared multi-word phrases ≥3 chars)
 *
 * The correct answer's text stays at its current index (Phase 1 shuffles
 * positions at render time, so the source index doesn't matter for users).
 *
 * Files are processed in-place. The rewriter:
 *  - preserves the surrounding file structure (interface, exports, etc.)
 *  - only modifies the `options` array of flagged questions
 *  - skips questions whose options are not exactly 4 strings
 *  - skips files where no flagged questions can be safely rewritten
 *
 * Run:
 *   node scripts/rebalance-distractors.mjs                # all flagged
 *   node scripts/rebalance-distractors.mjs --file <path>  # one file
 *   node scripts/rebalance-distractors.mjs --dry-run      # no writes
 *
 * Pair with `node scripts/audit-question-bias.mjs` before + after to
 * confirm the flagged % drops.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
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
const FLAG_RATIO = 1.4;
const LEN_MIN = 0.7;
const LEN_MAX = 1.3;

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const ONE_FILE = (() => {
  const i = argv.indexOf('--file');
  return i >= 0 ? argv[i + 1] : null;
})();

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

// Walk the options array body and return the array of string literals
// (preserving order). Returns null if any non-string entry is found.
function parseOptionsBody(body) {
  const out = [];
  let i = 0;
  while (i < body.length) {
    const c = body[i];
    if (c === '"' || c === "'" || c === '`') {
      const q = c;
      let buf = '';
      let j = i + 1;
      while (j < body.length) {
        const ch = body[j];
        if (ch === '\\') { buf += ch + (body[j + 1] ?? ''); j += 2; continue; }
        if (ch === q) { out.push({ quote: q, value: buf }); j++; break; }
        buf += ch;
        j++;
      }
      if (j > body.length) return null;
      i = j;
    } else if (/\s|,/.test(c)) {
      i++;
    } else {
      // non-string entry (e.g. variable reference) — bail
      return null;
    }
  }
  return out;
}

// Re-emit an options array body keeping each entry on its own indented
// line, using the original quote style where available.
function emitOptionsBody(items, indent) {
  return (
    '\n' +
    items.map((it) => `${indent}  ${it.quote}${escapeFor(it.quote, it.value)}${it.quote},`).join('\n') +
    `\n${indent}`
  );
}

function escapeFor(q, s) {
  // We only need to escape the matching quote and backslashes. Strings
  // pulled from elsewhere in the SAME file are already valid; this is a
  // safety net for any synthesised text.
  return s.replace(/\\/g, '\\\\').replace(new RegExp(q, 'g'), '\\' + q);
}

// Returns a normalised lowercase token sequence for similarity checking.
function tokens(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 4);
}

function firstSignificant(s) {
  const t = tokens(s);
  return t[0] ?? '';
}

// Two strings are "too similar" if they share their first significant
// token OR a 3+ word phrase. Used to avoid picking a sibling whose
// content overlaps the correct answer.
function tooSimilar(a, b) {
  if (firstSignificant(a) && firstSignificant(a) === firstSignificant(b)) return true;
  const ta = tokens(a);
  const tb = new Set(tokens(b));
  let run = 0;
  for (const t of ta) {
    if (tb.has(t)) { run++; if (run >= 3) return true; } else run = 0;
  }
  return false;
}

function isStrawman(text, correctLen) {
  // Short absolute distractor — what we're trying to replace.
  if (text.length < correctLen * 0.55) return true;
  if (/^(only |just |never |no [a-z]|nothing |any )/i.test(text)) return true;
  if (/^(only|just|never|nothing|none)\b/i.test(text)) return true;
  return false;
}

// Per-question rewrite: returns new options array (4 entries) or null if
// we can't safely rewrite (e.g. correct answer is too unusual for the
// sibling pool).
function rewriteQuestion(options, correctIdx, siblingPool, rng) {
  if (options.length !== 4) return null;
  const correct = options[correctIdx].value;
  const correctLen = correct.length;
  if (correctLen < 25) return null; // too short to need this fix

  // Candidate pool = sibling correct answers within length window + not too similar.
  const pool = siblingPool.filter((s) => {
    if (s === correct) return false;
    if (s.length < correctLen * LEN_MIN) return false;
    if (s.length > correctLen * LEN_MAX) return false;
    if (tooSimilar(s, correct)) return false;
    return true;
  });
  if (pool.length < 3) return null;

  // Shuffle pool, take first 3 that also don't conflict with each other.
  const shuffled = pool.slice().sort(() => rng() - 0.5);
  const picks = [];
  for (const cand of shuffled) {
    if (picks.length === 3) break;
    if (picks.some((p) => tooSimilar(p, cand))) continue;
    picks.push(cand);
  }
  if (picks.length < 3) return null;

  // Build the new options array. Keep correct at the SAME index so the
  // surrounding `correctAnswer: N` line doesn't need updating.
  const fillerIdx = [0, 1, 2, 3].filter((i) => i !== correctIdx);
  const out = options.slice();
  const quote = options[correctIdx].quote;
  for (let k = 0; k < 3; k++) {
    out[fillerIdx[k]] = { quote, value: picks[k] };
  }
  return out;
}

// Deterministic per-file RNG so the script is reproducible.
function mulberry32(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Match each question object body and extract:
//   - the full match start/end offsets
//   - the options-array body offsets (so we can splice in a new body)
//   - the parsed options (with quote info)
//   - the correctAnswer index
// Tolerates options-before-correctAnswer and correctAnswer-before-options.
function findQuestions(text) {
  const out = [];
  // Inline section quizzes use `correctIndex:` rather than `correctAnswer:`
  // — same shape and semantics. Match both.
  const CA = `(?:correctAnswer|correctIndex)`;
  // pattern A: options ... correctAnswer (numeric)
  const reA = new RegExp(`(options\\s*:\\s*\\[)([\\s\\S]*?)(\\])([\\s\\S]{0,600}?${CA}\\s*:\\s*)(\\d+)`, 'g');
  // pattern B: correctAnswer (numeric) ... options
  const reB = new RegExp(`(${CA}\\s*:\\s*)(\\d+)([\\s\\S]{0,600}?options\\s*:\\s*\\[)([\\s\\S]*?)(\\])`, 'g');
  // pattern C: options ... correctAnswer (string-form). BMS / EmergencyLighting
  // section quizzes key by string instead of index.
  const reC = new RegExp(`(options\\s*:\\s*\\[)([\\s\\S]*?)(\\])([\\s\\S]{0,600}?${CA}\\s*:\\s*)['"\`]([^'"\`]+)['"\`]`, 'g');

  for (const m of text.matchAll(reA)) {
    const bodyStart = m.index + m[1].length;
    const bodyEnd = bodyStart + m[2].length;
    out.push({
      bodyStart,
      bodyEnd,
      bodyText: m[2],
      correctIdx: parseInt(m[5], 10),
    });
  }
  for (const m of text.matchAll(reB)) {
    const bodyStart = m.index + m[1].length + m[2].length + m[3].length;
    const bodyEnd = bodyStart + m[4].length;
    if (out.some((q) => q.bodyStart === bodyStart && q.bodyEnd === bodyEnd)) continue;
    out.push({
      bodyStart,
      bodyEnd,
      bodyText: m[4],
      correctIdx: parseInt(m[2], 10),
    });
  }
  for (const m of text.matchAll(reC)) {
    const bodyStart = m.index + m[1].length;
    const bodyEnd = bodyStart + m[2].length;
    if (out.some((q) => q.bodyStart === bodyStart && q.bodyEnd === bodyEnd)) continue;
    // resolve the string-form correct answer to its index in the options array.
    const items = parseOptionsBody(m[2]);
    if (!items) continue;
    const idx = items.findIndex((it) => it.value === m[5]);
    if (idx < 0) continue;
    out.push({
      bodyStart,
      bodyEnd,
      bodyText: m[2],
      correctIdx: idx,
    });
  }
  return out.sort((a, b) => a.bodyStart - b.bodyStart);
}

function detectIndent(text, bodyStart) {
  // Walk backward from bodyStart until newline; the line content up to
  // the first non-whitespace is the indent we should match for emission.
  let i = bodyStart - 1;
  while (i >= 0 && text[i] !== '\n') i--;
  let j = i + 1;
  while (j < text.length && (text[j] === ' ' || text[j] === '\t')) j++;
  return text.slice(i + 1, j);
}

function processFile(file, externalPool = null) {
  const text = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);
  const questions = findQuestions(text);
  if (questions.length === 0) return { rel, parsed: 0, rewritten: 0, skipped: 0 };

  // Parse all questions and collect this file's sibling pool, then merge
  // with an external (global) pool if supplied so tiny section quizzes
  // still get a deep pool of length-matched candidate distractors.
  const parsed = [];
  const localPool = [];
  for (const q of questions) {
    const items = parseOptionsBody(q.bodyText);
    if (!items || items.length !== 4) { parsed.push({ q, items: null }); continue; }
    if (q.correctIdx < 0 || q.correctIdx > 3) { parsed.push({ q, items: null }); continue; }
    parsed.push({ q, items });
    localPool.push(items[q.correctIdx].value);
  }

  // Prefer local pool (same topic) but fall back to external when local
  // is too thin — typical for section quizzes with <15 questions.
  const siblingPool = localPool.length >= 30 ? localPool : [...new Set([...localPool, ...(externalPool ?? [])])];

  if (siblingPool.length < 10) {
    return { rel, parsed: parsed.length, rewritten: 0, skipped: parsed.length };
  }

  const rng = mulberry32(hashString(rel));

  // Determine which questions are flagged + rewriteable; produce edits.
  const edits = [];
  let rewritten = 0;
  let skipped = 0;
  for (const { q, items } of parsed) {
    if (!items) { skipped++; continue; }
    const correctLen = items[q.correctIdx].value.length;
    const distractorMean =
      (items.reduce((s, it) => s + it.value.length, 0) - correctLen) / 3;
    const ratio = distractorMean > 0 ? correctLen / distractorMean : Infinity;
    if (ratio <= FLAG_RATIO) { continue; } // not flagged, leave alone

    // At least one distractor must look like a strawman OR the ratio is
    // extreme (>1.4) — try a rewrite.
    const hasStrawman = items.some(
      (it, i) => i !== q.correctIdx && isStrawman(it.value, correctLen)
    );
    if (!hasStrawman && ratio < 1.8) { skipped++; continue; }

    const newItems = rewriteQuestion(items, q.correctIdx, siblingPool, rng);
    if (!newItems) { skipped++; continue; }

    const indent = detectIndent(text, q.bodyStart);
    const newBody = emitOptionsBody(newItems, indent);
    edits.push({ start: q.bodyStart, end: q.bodyEnd, body: newBody });
    rewritten++;
  }

  if (edits.length === 0) return { rel, parsed: parsed.length, rewritten: 0, skipped };

  // Apply edits in reverse offset order so earlier offsets stay valid.
  edits.sort((a, b) => b.start - a.start);
  let out = text;
  for (const e of edits) {
    out = out.slice(0, e.start) + e.body + out.slice(e.end);
  }

  if (!DRY) writeFileSync(file, out);
  return { rel, parsed: parsed.length, rewritten, skipped };
}

// Build a GLOBAL sibling pool across every bank — small section quizzes
// (e.g. HNC/MOET inline questions) only have 10-15 correct answers each,
// which is too thin to source 3 length-matched, non-similar distractors.
// Pulling from the full corpus gives every question a 40k-deep pool.
function harvestGlobalPool() {
  const pool = new Set();
  for (const f of SEARCH_DIRS.flatMap((d) => walk(join(ROOT, d)))) {
    let txt;
    try { txt = readFileSync(f, 'utf8'); } catch { continue; }
    for (const q of findQuestions(txt)) {
      const items = parseOptionsBody(q.bodyText);
      if (!items || items.length !== 4) continue;
      if (q.correctIdx < 0 || q.correctIdx > 3) continue;
      const correct = items[q.correctIdx].value;
      if (correct.length >= 25) pool.add(correct);
    }
  }
  return [...pool];
}

let files;
if (ONE_FILE) {
  files = [join(ROOT, ONE_FILE)];
} else {
  files = SEARCH_DIRS.flatMap((d) => walk(join(ROOT, d)));
}

const GLOBAL_POOL = harvestGlobalPool();
console.log(`Built global sibling pool: ${GLOBAL_POOL.length.toLocaleString()} unique correct-answer strings.`);

let totalParsed = 0;
let totalRewritten = 0;
let totalSkipped = 0;
const fileResults = [];
for (const f of files) {
  const r = processFile(f, GLOBAL_POOL);
  totalParsed += r.parsed;
  totalRewritten += r.rewritten;
  totalSkipped += r.skipped;
  if (r.rewritten > 0 || r.skipped > 0) fileResults.push(r);
}

console.log(`${DRY ? '[DRY RUN] ' : ''}Processed ${files.length} files.`);
console.log(`  Questions parsed:     ${totalParsed.toLocaleString()}`);
console.log(`  Questions rewritten:  ${totalRewritten.toLocaleString()}`);
console.log(`  Questions skipped:    ${totalSkipped.toLocaleString()} (couldn't safely rewrite — usually too few siblings or pool conflicts)`);

const top = fileResults.sort((a, b) => b.rewritten - a.rewritten).slice(0, 15);
console.log('\nTop 15 files by rewrites:');
for (const r of top) {
  console.log(`  ${String(r.rewritten).padStart(4)} rewritten, ${String(r.skipped).padStart(4)} skipped — ${r.rel}`);
}
