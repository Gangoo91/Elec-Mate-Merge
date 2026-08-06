#!/usr/bin/env node
/**
 * check-question-quality — measures giveaway "tells" in the public mock exam banks.
 *
 * WHY THIS EXISTS
 * ---------------
 * Measured 2026-08-06 across 7,641 questions in the public banks: the correct
 * answer was the LONGEST option 68.5% of the time, against 25% by chance. A
 * candidate who always picks the longest option scores ~68% without reading a
 * single question — and the pass mark is 70%. Combined with the answer-position
 * bias fixed earlier (see src/utils/shuffleOptions.ts), the exams were far
 * easier to game than to pass honestly.
 *
 * Position bias is already handled at render time by shuffleOptions.ts. Option
 * LENGTH survives shuffling, so it has to be fixed in the banks themselves.
 *
 * WHAT IT CHECKS
 *   1. longest-answer tell  — correct option is the longest
 *   2. "Only ..." tell      — 2+ distractors begin "Only", making them absurd
 *   3. throwaway distractor — "Ignore it", "Do nothing", "None of the above"
 *   4. position bias        — correct answer clustered on one index in a bank
 *
 * USAGE
 *   node scripts/check-question-quality.mjs              # summary + worst banks
 *   node scripts/check-question-quality.mjs --bank=coshh # per-question detail
 *   node scripts/check-question-quality.mjs --ci         # exit 1 if over budget
 *
 * The --ci budget is deliberately set at the CURRENT measured level, not at the
 * ideal. It is a ratchet: it stops things getting worse while the banks are
 * rewritten. Lower LONGEST_BUDGET as banks improve. The target is ~30%.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LONGEST_BUDGET = 70; // % raw longest — kept for continuity
const EXPLOITABLE_BUDGET = 12; // % longer by >20 chars — the metric that actually matters
const POSITION_BUDGET = 45; // % on any single index within a bank

const OPT_RE = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g;
const THROWAWAY = /^(ignore|do nothing|reset it repeatedly|guess|none of the above|all of the above)/i;

/**
 * HAZARD WHEN SHORTENING A VERBOSE CORRECT ANSWER
 * ------------------------------------------------
 * Trimming a long key at a semicolon is usually safe: the explanation field carries the
 * reasoning, so nothing is lost. But NOT on comparison questions. On 2026-08-06 a trim
 * turned "A restraint system prevents the wearer reaching the edge; a fall arrest system
 * stops a fall in progress" into just the first half — on a question asking for the
 * DIFFERENCE between the two. The key became wrong AND the visible odd one out.
 *
 * An automated guard for this was written and then deliberately removed: every heuristic
 * flagged 18-22 keys that were perfectly correct (short acronyms such as EIC / RCD defeat
 * word-length filters), and a check with a 100% false-positive rate only teaches people to
 * ignore it. So this is a human rule instead: when you shorten a key, read the question
 * stem. If it asks for the difference between X and Y, the key must still cover both.
 */

/** Banks referenced by any public mock exam page. */
function discoverBanks() {
  const dir = join(ROOT, 'src/pages/mock-exams');
  const banks = new Set();
  if (!existsSync(dir)) return banks;
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.tsx'))) {
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/from '(@\/data\/[^']+)'/g)) {
      banks.add(join(ROOT, m[1].replace('@/data', 'src/data') + '.ts'));
    }
  }
  return banks;
}

function analyse(file) {
  const src = readFileSync(file, 'utf8');
  const rows = [];
  for (const m of src.matchAll(/options:\s*\[(.*?)\]\s*,\s*correctAnswer:\s*(\d)/gs)) {
    const opts = [...m[1].matchAll(OPT_RE)].map((o) => o[1] ?? o[2] ?? '');
    const ca = Number(m[2]);
    if (opts.length < 4 || !opts[ca]) continue;
    // A comparison question ("difference between X and Y") needs a key that covers
    // BOTH halves. Trimming one off leaves an answer that is both wrong and the odd
    // one out. Caught exactly this while shortening verbose keys on 2026-08-06.
    const maxLen = Math.max(...opts.map((o) => o.length));
    const wrong = opts.filter((_, i) => i !== ca);
    rows.push({
      ca,
      longest: opts[ca].length === maxLen,
      // A "longest answer" tell only matters if a candidate can SEE it. Measured
      // 2026-08-06: median gap over the longest wrong option is 3 characters, which
      // nobody can exploit. Gap is the honest metric; bare "is longest" is noise.
      gap: opts[ca].length - Math.max(...opts.filter((_, i) => i !== ca).map((o) => o.length)),
      onlyTell: wrong.filter((o) => /^only\b/i.test(o.trim())).length >= 2,
      throwaway: wrong.some((o) => THROWAWAY.test(o.trim())),
      correct: opts[ca],
    });
  }
  return rows;
}

const only = process.argv.find((a) => a.startsWith('--bank='))?.split('=')[1];
const ci = process.argv.includes('--ci');

let all = [];
const perBank = [];
for (const file of [...discoverBanks()].sort()) {
  if (!existsSync(file)) continue;
  const parts = file.split('/');
  const base = parts.pop().replace('.ts', '');
  // several banks are literally called questionBank.ts — qualify with the parent dirs
  const name = base === 'questionBank' ? parts.slice(-3).join('/') : base;
  if (only && !name.toLowerCase().includes(only.toLowerCase())) continue;
  const rows = analyse(file);
  if (!rows.length) continue;
  all = all.concat(rows);
  const pos = [0, 0, 0, 0];
  rows.forEach((r) => pos[r.ca]++);
  perBank.push({
    name,
    n: rows.length,
    longest: (100 * rows.filter((r) => r.longest).length) / rows.length,
    exploitable: (100 * rows.filter((r) => r.gap > 20).length) / rows.length,
    onlyTell: rows.filter((r) => r.onlyTell).length,
    throwaway: rows.filter((r) => r.throwaway).length,
    posMax: (100 * Math.max(...pos)) / rows.length,
  });
}

if (!all.length) {
  console.error('No question banks found.');
  process.exit(1);
}

const pct = (f) => (100 * all.filter(f).length) / all.length;
const longestPct = pct((r) => r.longest);

console.log(`\nQuestion quality — ${all.length} questions across ${perBank.length} banks\n`);
const exploitable = pct((r) => r.gap > 20);
const noticeable = pct((r) => r.gap > 5);
console.log(`  correct answer is longest option : ${longestPct.toFixed(1)}%   (raw — includes 1-char ties)`);
console.log(`  ...longer by >5 chars  (noticeable): ${noticeable.toFixed(1)}%`);
console.log(`  ...longer by >20 chars (EXPLOITABLE): ${exploitable.toFixed(1)}%   <-- the one that matters`);
console.log(`  2+ "Only ..." distractors        : ${pct((r) => r.onlyTell).toFixed(1)}%`);
console.log(`  throwaway distractor             : ${pct((r) => r.throwaway).toFixed(1)}%`);

console.log('\nWorst banks (EXPLOITABLE tell — correct answer >20 chars longer):');
for (const b of perBank.sort((a, b2) => b2.exploitable - a.exploitable).slice(0, 12)) {
  const flags = [
    b.posMax > POSITION_BUDGET ? `pos ${b.posMax.toFixed(0)}%` : '',
    b.onlyTell ? `${b.onlyTell} only-tell` : '',
    b.throwaway ? `${b.throwaway} throwaway` : '',
  ]
    .filter(Boolean)
    .join(', ');
  console.log(
    `  ${b.exploitable.toFixed(1).padStart(5)}% exploitable  (${String(b.n).padStart(4)} Qs)  ${b.name}${flags ? '  — ' + flags : ''}`
  );
}

if (ci) {
  const ex = pct((r) => r.gap > 20);
  const fail = ex > EXPLOITABLE_BUDGET;
  console.log(
    `\n${fail ? '✗ FAIL' : '✓ PASS'}  exploitable length tell ${ex.toFixed(1)}% vs budget ${EXPLOITABLE_BUDGET}%`
  );
  process.exit(fail ? 1 : 0);
}
console.log('');
