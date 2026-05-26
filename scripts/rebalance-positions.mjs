#!/usr/bin/env node
/**
 * rebalance-positions.mjs
 *
 * Source-level companion to `rebalance-distractors.mjs`. Where the
 * distractor rebalancer fixes the LENGTH tell, this script fixes the
 * POSITION tell at the data layer:
 *
 *   - For each 4-option question, generate a deterministic permutation
 *     of [0,1,2,3] seeded by the question's id (or hash of its text)
 *   - Reorder `options` according to that permutation
 *   - Update `correctAnswer` to the new index of the original correct
 *
 * Runtime <ShuffleOptions> already randomises positions per-attempt, so
 * this is defence-in-depth: it makes the SOURCE data uniform too, so a
 * future runtime regression can't expose the 74%-B tell, and the CI
 * guardrail can run tight thresholds.
 *
 * Deterministic per question, so re-running is a no-op (idempotent) for
 * questions that have already been shuffled — the same id always maps to
 * the same permutation.
 *
 * Skips:
 *   - questions with options.length !== 4
 *   - questions where correctAnswer is non-numeric or out of range
 *
 * Run:
 *   node scripts/rebalance-positions.mjs                # all banks
 *   node scripts/rebalance-positions.mjs --file <path>  # one file
 *   node scripts/rebalance-positions.mjs --dry-run
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
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

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const ONE_FILE = (() => { const i = argv.indexOf('--file'); return i >= 0 ? argv[i + 1] : null; })();

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
      return null;
    }
  }
  return out;
}

function emitOptionsBody(items, indent) {
  return (
    '\n' +
    items.map((it) => `${indent}  ${it.quote}${escapeFor(it.quote, it.value)}${it.quote},`).join('\n') +
    `\n${indent}`
  );
}

function escapeFor(q, s) {
  return s.replace(/\\/g, '\\\\').replace(new RegExp(q, 'g'), '\\' + q);
}

function detectIndent(text, bodyStart) {
  let i = bodyStart - 1;
  while (i >= 0 && text[i] !== '\n') i--;
  let j = i + 1;
  while (j < text.length && (text[j] === ' ' || text[j] === '\t')) j++;
  return text.slice(i + 1, j);
}

// Match each whole question block to know where the `id` field is + the
// `options` body + the `correctAnswer` literal. We need to rewrite the
// `correctAnswer: N` line too, so we capture its exact offset.
// Pattern: `{ ... id: <num|str> ... options: [<body>] ... correctAnswer: <N> ... }`
// or with correctAnswer before options. Captured as separate edit pairs.

function findQuestions(text) {
  const out = [];
  // We look for both orderings as in the audit / rebalance scripts, but
  // we also need the correctAnswer literal's offset to swap it.
  //
  // Strategy: find every `correctAnswer:\s*(\d+)` or `correctIndex:\s*(\d+)`
  // literal, then look up to ~1000 chars in each direction for the matching
  // `options: [ ... ]` and `id: <x>` from the same object. Inline section
  // quizzes use `correctIndex` rather than `correctAnswer`.
  const reCorrect = /(?:correctAnswer|correctIndex)\s*:\s*(\d+)/g;
  for (const m of text.matchAll(reCorrect)) {
    const literalStart = m.index + m[0].indexOf(m[1]);
    const literalEnd = literalStart + m[1].length;
    const correctIdx = parseInt(m[1], 10);
    if (correctIdx < 0 || correctIdx > 3) continue;

    // Look up to 6000 chars in each direction for options + id. Section
    // quizzes occasionally have 4 multi-paragraph option strings that
    // push the `options: [` opener well past the original 1500-char
    // window — caught a regression on Level 2 module4/section1 quizzes.
    const ctxStart = Math.max(0, m.index - 6000);
    const ctxEnd = Math.min(text.length, m.index + 6000);
    const ctx = text.slice(ctxStart, ctxEnd);

    // Find the closest options[...] block. Try the one that comes BEFORE
    // correctAnswer (most common pattern), then the one AFTER.
    const relIdx = m.index - ctxStart;
    const before = ctx.slice(0, relIdx);
    const after = ctx.slice(relIdx);

    let optMatch = null;
    let optMatchOffsetInText = null;

    // Closest preceding options block
    const beforeMatches = [...before.matchAll(/options\s*:\s*\[([\s\S]*?)\]/g)];
    if (beforeMatches.length > 0) {
      const last = beforeMatches[beforeMatches.length - 1];
      optMatch = last;
      optMatchOffsetInText = ctxStart + last.index;
    } else {
      const afterMatch = after.match(/options\s*:\s*\[([\s\S]*?)\]/);
      if (afterMatch) {
        optMatch = afterMatch;
        optMatchOffsetInText = m.index + afterMatch.index;
      }
    }
    if (!optMatch) continue;

    // The body is inside the [...]
    const fullMatch = optMatch[0];
    const bodyStart = optMatchOffsetInText + fullMatch.indexOf('[') + 1;
    const bodyEnd = bodyStart + optMatch[1].length;

    // Find an id from this same object — search nearest preceding `id:`
    // up to 1200 chars before options.
    const idCtxStart = Math.max(0, optMatchOffsetInText - 1200);
    const idCtx = text.slice(idCtxStart, optMatchOffsetInText);
    const idMatch = [...idCtx.matchAll(/id\s*:\s*(\d+|['"`][^'"`]+['"`])/g)].pop();
    let seedKey;
    if (idMatch) {
      const raw = idMatch[1].replace(/^['"`]|['"`]$/g, '');
      const asNum = parseInt(raw, 10);
      seedKey = Number.isFinite(asNum) ? asNum : hashString(raw);
    } else {
      seedKey = hashString(optMatch[1].slice(0, 80));
    }

    out.push({
      correctLiteralStart: literalStart,
      correctLiteralEnd: literalEnd,
      correctIdx,
      bodyStart,
      bodyEnd,
      bodyText: optMatch[1],
      seedKey,
    });
  }
  // Sort + dedupe (some files trigger the regex twice for the same q).
  out.sort((a, b) => a.bodyStart - b.bodyStart);
  const dedup = [];
  for (const q of out) {
    if (dedup.length === 0 || dedup[dedup.length - 1].bodyStart !== q.bodyStart) dedup.push(q);
  }
  return dedup;
}

function processFile(file) {
  const text = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);
  const questions = findQuestions(text);
  if (questions.length === 0) return { rel, shuffled: 0, skipped: 0 };

  // Build a list of edits — both the options body AND the correctAnswer
  // literal — then apply in reverse offset order to keep offsets valid.
  //
  // IDEMPOTENT design (corrected 2026-05-25): for each question, derive
  // a deterministic TARGET index in [0,3] from the question id. If the
  // correct answer is already at the target, skip. Otherwise SWAP the
  // correct option into the target position (leave the other two
  // distractors where they sit). Re-runs are no-ops.
  //
  // We don't need full distractor reshuffling at source — Phase 1
  // runtime shuffle randomises per-attempt anyway. Source-level goal is
  // just an even spread of correctAnswer across A/B/C/D.
  const edits = [];
  let shuffled = 0;
  let skipped = 0;
  for (const q of questions) {
    const items = parseOptionsBody(q.bodyText);
    if (!items || items.length !== 4) { skipped++; continue; }

    const targetIdx = q.seedKey % 4;
    if (targetIdx === q.correctIdx) {
      continue; // already at target — idempotent no-op
    }

    const newItems = items.slice();
    [newItems[targetIdx], newItems[q.correctIdx]] = [newItems[q.correctIdx], newItems[targetIdx]];

    const indent = detectIndent(text, q.bodyStart);
    edits.push({ start: q.bodyStart, end: q.bodyEnd, body: emitOptionsBody(newItems, indent) });
    edits.push({
      start: q.correctLiteralStart,
      end: q.correctLiteralEnd,
      body: String(targetIdx),
    });
    shuffled++;
  }

  if (edits.length === 0) return { rel, shuffled: 0, skipped };

  edits.sort((a, b) => b.start - a.start);
  let out = text;
  for (const e of edits) {
    out = out.slice(0, e.start) + e.body + out.slice(e.end);
  }

  if (!DRY) writeFileSync(file, out);
  return { rel, shuffled, skipped };
}

let files;
if (ONE_FILE) {
  files = [join(ROOT, ONE_FILE)];
} else {
  files = SEARCH_DIRS.flatMap((d) => walk(join(ROOT, d)));
}

let total = 0;
let totalSkipped = 0;
const fileResults = [];
for (const f of files) {
  const r = processFile(f);
  total += r.shuffled;
  totalSkipped += r.skipped;
  if (r.shuffled > 0 || r.skipped > 0) fileResults.push(r);
}

console.log(`${DRY ? '[DRY RUN] ' : ''}Processed ${files.length} files.`);
console.log(`  Questions shuffled (source-level): ${total.toLocaleString()}`);
console.log(`  Skipped:                            ${totalSkipped.toLocaleString()}`);
