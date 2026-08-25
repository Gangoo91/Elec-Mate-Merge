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
 *   0. STRATEGY SCORE       — what "always pick the longest" and "always pick the
 *                             shortest" actually score. This is the verdict; the
 *                             rest are diagnosis. (added 2026-08-24)
 *   1. longest-answer tell  — correct option is the longest
 *   2. "Only ..." tell      — 2+ distractors begin "Only", making them absurd
 *   3. throwaway distractor — "Ignore it", "Do nothing", "None of the above"
 *   4. position bias        — correct answer clustered on one index in a bank
 *   5. inverse tell         — key visibly the SHORTEST (added 2026-08-06)
 *   6. grammatical-form     — key is the only option that reads with the stem
 *   7. recycled distractors — same phrase wrong 4+ times, never right (bank-level)
 *
 * READ THIS BEFORE TRUSTING A GREEN RUN
 * -------------------------------------
 * For eighteen days this script gated solely on check 1 measured at >20 characters,
 * and its own header called that "the one that matters". It was wrong, and the
 * wrongness was invisible: banks reported 0.0% exploitable while a candidate who
 * never read a question passed them. The gap threshold measured whether a tell was
 * visible on ONE question; it said nothing about whether it was decisive across
 * sixty. A rewrite pass aimed at that threshold then made things worse, because
 * "keep distractors within 20 characters BELOW the key" satisfies the gate while
 * leaving the key longest every single time.
 *
 * The lesson is general: gate on the exploit, not on a proxy for it. Check 0 is
 * the exploit. If you add a metric here, ask what a candidate would DO with it.
 *
 * 5-7 were all added while fixing 1: each is a way the answer stays findable
 * without knowing the subject, and closing one can open another. 6 was
 * introduced BY a rewrite that fixed 1, which is why they are measured
 * together rather than one at a time.
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
/**
 * Ratcheted 12 -> 0.5 on 2026-08-07, after the corpus sweep took the exploitable
 * tell from 18.0% to 0.0% across 7,727 questions. 0.5% is ~38 questions: tight
 * enough that a whole bank imported in the old style fails the build, loose
 * enough that one awkward question does not. Do NOT raise it to make a build
 * pass — that is the ratchet failing at its only job.
 */
const EXPLOITABLE_BUDGET = 0.5; // % longer by >20 chars — blatant cases only
/**
 * Ceiling on what the always-pick-longest strategy may score. Chance is 25%.
 * 35% leaves room for the natural tendency of correct answers to be a shade
 * fuller, while staying far below any pass mark. See strategyScore below for
 * why a per-question gap threshold was not enough on its own.
 */
const STRATEGY_BUDGET = 35;
const POSITION_BUDGET = 45; // % on any single index within a bank

const OPT_RE = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g;
/**
 * A throwaway is an option with no CONTENT — nobody would pick it, so it wastes
 * a slot and narrows the real choice to three.
 *
 * The trailing `(\b|$)` and the length guard matter. The bare pattern flagged
 * "Ignore it until existing installations require rewiring" (2026-08-24), which
 * is a perfectly good distractor: it names a specific wrong condition and a
 * candidate could believe it. Only the contentless form is the defect, so
 * require the option to stop at the throwaway phrase or stay very short.
 */
const THROWAWAY_PHRASE =
  /^(ignore it|ignore them|ignore the \w+|do nothing|reset it repeatedly|guess|none of the above|all of the above)\b/i;
const THROWAWAY = { test: (o) => THROWAWAY_PHRASE.test(o) && o.trim().length <= 28 };

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

/**
 * Every question bank on disk, whether a public mock exam page imports it or not.
 *
 * WHY THIS IS SEPARATE FROM discoverBanks()
 * -----------------------------------------
 * discoverBanks() walks src/pages/mock-exams, so it only ever saw the banks behind
 * the public SEO exams — 22 banks, all long since driven to 0.0%. Measured
 * 2026-08-24: another 105 banks totalling 3,402 questions are reachable only from
 * inside the app (upskilling modules, HNC, functional skills) and had therefore
 * never been measured at all. Several sit above 35% exploitable — worse than the
 * 68.5% starting point that caused this script to be written, and entirely
 * invisible because the report said 0.0% across everything it looked at.
 *
 * In-app banks are not lower stakes than public ones. A paying apprentice sitting
 * an HNC paper is the customer; the SEO exam is the advert.
 *
 * Kept behind --all rather than folded into the default so the CI budget still
 * describes the banks that are actually clean. Flip the default once the backlog
 * this flag exposes has been cleared.
 */
function discoverAllBanks() {
  const banks = new Set(discoverBanks());
  const walk = (dir) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.ts') && !e.name.endsWith('.d.ts')) banks.add(p);
    }
  };
  for (const d of ['src/data/general-upskilling', 'src/data/upskilling', 'src/data/apprentice-courses'])
    walk(join(ROOT, d));
  return banks;
}

function analyse(file) {
  const src = readFileSync(file, 'utf8');
  const rows = [];
  // `as const` after the options array is legal TypeScript and three banks use
  // it. Requiring `],` immediately made 600 questions invisible to this gate —
  // all 200 in emotionalIntelligence, and 200 each in mentalHealth and
  // communicationConfidence, which were instead mis-parsed as two giant
  // "questions" with 2004 options. Measured and fixed 2026-08-25.
  for (const m of src.matchAll(
    /options:\s*\[(.*?)\]\s*(?:as const\s*)?,\s*correctAnswer:\s*(\d)/gs
  )) {
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
      // The MIRROR of the longest-answer tell. Trimming a verbose key to kill
      // the forward tell can overshoot and leave the key visibly the SHORTEST
      // option — "always pick the shortest" is just as gameable. Measured after
      // the 2026-08-06 pass so the cure cannot quietly become the disease.
      inverseTell: opts[ca].length - Math.max(...wrong.map((o) => o.length)) < -20,
      throwaway: wrong.some((o) => THROWAWAY.test(o.trim())),
      /**
       * GRAMMATICAL-FORM TELL. Where a stem ends "…you should:" and the key
       * opens with an imperative ("Allow the capacitors to discharge…") while
       * every distractor opens with a gerund ("Touching…", "Using…"), the key
       * is the only option that reads correctly with the stem. The candidate
       * does not need to know the subject.
       *
       * Found 2026-08-07 while spot-checking a distractor rewrite: closing the
       * LENGTH tell had introduced this one on two questions, because new
       * distractors were written in a different voice from the key left in
       * place. Mostly pre-existing elsewhere, but it has to be measured or the
       * next rewrite reintroduces it.
       *
       * Only fires when all three distractors agree and the key differs —
       * a mixed set is normal English, not a tell.
       */
      formTell: (() => {
        // Not every word ending in -ing is a gerund. "Anything a competent
        // person…" was flagged as a form mismatch on a question where nothing
        // was wrong — caught 2026-08-07 when an agent checked the heuristic
        // against its own pre-edit text rather than taking the flag on trust.
        const NOT_GERUND = /^(anything|nothing|everything|something|during|nothing)$/i;
        const form = (s) => {
          const w = (s.match(/^\s*([A-Za-z-]+)/) || [])[1] ?? '';
          return /ing$/i.test(w) && !NOT_GERUND.test(w) ? 'ing' : 'other';
        };
        const others = wrong.map(form);
        return others.length >= 2 && new Set(others).size === 1 && form(opts[ca]) !== others[0];
      })(),
      correct: opts[ca],
      wrong,
    });
  }
  return rows;
}

const only = process.argv.find((a) => a.startsWith('--bank='))?.split('=')[1];
const ci = process.argv.includes('--ci');
// --all widens the sweep to in-app banks no public exam page imports. See discoverAllBanks().
const scanAll = process.argv.includes('--all');

let all = [];
const perBank = [];
for (const file of [...(scanAll ? discoverAllBanks() : discoverBanks())].sort()) {
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

  /**
   * RECYCLED DISTRACTORS — a tell that only shows up across a whole bank.
   *
   * If the same substantial option is used as a wrong answer in four or more
   * questions and is never the correct answer anywhere, a candidate who sits
   * two papers learns to eliminate it on sight without reading it. In
   * level3/module4 "An oversized protective device on the circuit" appeared as
   * a distractor 18 times and was never once right.
   *
   * Per-question checks are blind to this by construction, which is why it
   * survived the whole 2026-08-06 pass. Short options are excluded — "Section 7"
   * or "30 mA" recurring is normal for a subject, not a tell.
   */
  const wrongUses = new Map();
  const keySet = new Set(rows.map((r) => r.correct));
  for (const r of rows) {
    for (const w of r.wrong) {
      if (w.length <= 25) continue;
      wrongUses.set(w, (wrongUses.get(w) ?? 0) + 1);
    }
  }
  const recycled = [...wrongUses.entries()].filter(([w, c]) => c >= 4 && !keySet.has(w));

  perBank.push({
    name,
    n: rows.length,
    recycled: recycled.length,
    recycledWorst: recycled.sort((a, b) => b[1] - a[1])[0],
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

/**
 * THE METRIC THAT ACTUALLY MATTERS: what does a candidate score by picking the
 * longest option every time and never reading the question?
 *
 * WHY THIS WAS ADDED (2026-08-24)
 * -------------------------------
 * This script gated on `gap > 20` and called it "the one that matters", on the
 * reasoning that a 3-character edge is invisible so only a big gap is real.
 * That reasoning was wrong at the bank level. In the Level 2 Health & Safety
 * bank — the paper a 100k-subscriber electrician sat on video — exactly 0% of
 * questions exceeded 20 characters, so the report read 0.0% exploitable and
 * looked clean. But 41% of questions sat in the 10-to-20 character band, the
 * key was strictly the longest option in 69% of them, and simulating 2,000
 * sittings of the always-pick-longest strategy scored 71.9%, passing the 60%
 * mark 99% of the time.
 *
 * Per-question invisibility does not add up to per-paper safety. A tell too
 * small to notice on one question is decisive across sixty. So gate on the
 * strategy's expected score directly, and keep the gap histogram as diagnosis
 * rather than as the verdict.
 *
 * Expected score is exact, not sampled: on each question the strategy picks
 * uniformly among the joint-longest options, so it scores 1/k when the key is
 * one of k joint-longest, and 0 otherwise.
 */
const strategyOf = (pick) =>
  (100 *
    all.reduce((sum, r) => {
      const lens = [r.correct.length, ...r.wrong.map((o) => o.length)];
      const target = pick(lens);
      const joint = lens.filter((l) => l === target).length;
      return sum + (r.correct.length === target ? 1 / joint : 0);
    }, 0)) /
  all.length;

const strategyScore = strategyOf((l) => Math.max(...l));
/**
 * The mirror. Driving "always longest" down by making every distractor longer
 * than the key does not fix anything — it hands the candidate "always pick the
 * shortest" instead. Seen for real: a batch rewritten to kill the longest tell
 * came back scoring 52% on shortest. Both directions have to be gated, or each
 * fix just trades one exploit for the other.
 */
const shortestScore = strategyOf((l) => Math.min(...l));
const CHANCE = 25; // four options

/**
 * Longest and shortest are only two of four rank-based strategies. Measured
 * 2026-08-24 on a freshly authored set: driving "never longest" to 0% pushed the
 * key into SECOND-longest on 64 of 80 questions. "Pick the second longest" then
 * scored 80% — a worse exploit than the one being fixed, and invisible to a
 * check that only looks at the two extremes.
 *
 * So measure the whole profile. P(key at rank r) should be ~25% for every r;
 * the strongest available strategy is the maximum, and any rank far BELOW 25%
 * is worth knowing too, because a rank the key never occupies can simply be
 * eliminated — turning a 1-in-4 guess into a 1-in-3 for free.
 *
 * Ties share credit: options of equal length occupy the same rank, so the
 * strategy picks among them uniformly.
 */
/**
 * PUNCTUATION TELL. The correct answer gets written more carefully than the
 * distractors, so it picks up an acronym expansion, a parenthetical clarifier
 * or a joined clause that the throwaways never get. Measured 2026-08-25 across
 * 17,383 questions: on the 1,004 where only some options contain a bracket,
 * the key was the bracketed one 80.9% of the time. Semicolons: 70.0% over 287.
 * Chance is 25%.
 *
 * This is independent of length and survived the entire length-rebalancing
 * pass, because "XLPE (Cross-linked polyethylene)" is a tell about precision,
 * not about size. Same root cause as the length tell, different surface.
 */
const punctuationTell = (marker) => {
  let applies = 0;
  let hit = 0;
  for (const r of all) {
    const opts = [r.correct, ...r.wrong];
    const withMark = opts.filter((o) => o.includes(marker));
    if (!withMark.length || withMark.length === opts.length) continue; // no signal
    applies++;
    if (r.correct.includes(marker)) hit += 1 / withMark.length;
  }
  return { applies, pct: applies ? (100 * hit) / applies : 0 };
};

const rankProfile = (() => {
  const acc = [0, 0, 0, 0];
  for (const r of all) {
    const lens = [r.correct.length, ...r.wrong.map((o) => o.length)];
    const keyLen = r.correct.length;
    const order = [...lens].sort((a, b) => b - a);
    let i = 0;
    while (i < order.length) {
      let j = i;
      while (j + 1 < order.length && order[j + 1] === order[i]) j++;
      if (order[i] === keyLen) {
        const share = 1 / (j - i + 1);
        for (let k = i; k <= j; k++) acc[k] += share;
      }
      i = j + 1;
    }
  }
  return acc.map((x) => (100 * x) / all.length);
})();
const bestRankStrategy = Math.max(...rankProfile);
const weakestRank = Math.min(...rankProfile);

console.log(`\nQuestion quality — ${all.length} questions across ${perBank.length} banks\n`);
const exploitable = pct((r) => r.gap > 20);
const noticeable = pct((r) => r.gap > 5);
console.log(
  `  SCORE BY ALWAYS PICKING LONGEST   : ${strategyScore.toFixed(1)}%   <-- the one that matters (chance = ${CHANCE}%)`
);
console.log(`  SCORE BY ALWAYS PICKING SHORTEST  : ${shortestScore.toFixed(1)}%   <-- the mirror; just as gameable`);
console.log(
  `  BEST LENGTH-RANK STRATEGY        : ${bestRankStrategy.toFixed(1)}%   (profile ${rankProfile.map((x) => x.toFixed(0)).join(' / ')} — longest to shortest)`
);
if (weakestRank < 10)
  console.log(
    `  ...weakest rank is ${weakestRank.toFixed(1)}% — a rank the key never occupies can be eliminated for free`
  );
console.log(`  correct answer is longest option : ${longestPct.toFixed(1)}%   (raw — includes 1-char ties)`);
console.log(`  ...longer by >5 chars  (noticeable): ${noticeable.toFixed(1)}%`);
console.log(`  ...longer by >20 chars (blatant)  : ${exploitable.toFixed(1)}%`);
console.log(
  `  ...SHORTER by >20 chars (inverse) : ${pct((r) => r.inverseTell).toFixed(1)}%   <-- "pick the shortest" is gameable too`
);
console.log(`  2+ "Only ..." distractors        : ${pct((r) => r.onlyTell).toFixed(1)}%`);
for (const mk of ['(', ';']) {
  const t = punctuationTell(mk);
  if (t.applies >= 50)
    console.log(
      `  key is the "${mk}" option           : ${t.pct.toFixed(1)}%   over ${t.applies} questions where only some options have one`
    );
}
// Bank-level, so it cannot be expressed as a % of questions.
const recycledBanks = perBank.filter((b) => b.recycled > 0).sort((a, b) => b.recycled - a.recycled);
if (recycledBanks.length) {
  const total = recycledBanks.reduce((s, b) => s + b.recycled, 0);
  console.log(
    `  recycled distractors (>=4 uses, never a key): ${total} phrases across ${recycledBanks.length} banks`
  );
}
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
  const blatantFail = ex > EXPLOITABLE_BUDGET;
  // A candidate reading nothing should not beat chance by much. 25% is chance;
  // anything approaching a 60% pass mark means the paper is gameable outright.
  // bestRankStrategy subsumes longest and shortest — it is the strongest
  // strategy available from option length alone.
  const strategyFail = bestRankStrategy > STRATEGY_BUDGET;
  console.log(
    `\n  always-pick-longest  scores ${strategyScore.toFixed(1)}% vs budget ${STRATEGY_BUDGET}% (chance ${CHANCE}%)`
  );
  console.log(
    `  always-pick-shortest scores ${shortestScore.toFixed(1)}% vs budget ${STRATEGY_BUDGET}%`
  );
  console.log(
    `  best length-rank strategy  scores ${bestRankStrategy.toFixed(1)}% vs budget ${STRATEGY_BUDGET}%  (profile ${rankProfile.map((x) => x.toFixed(0)).join('/')})`
  );
  console.log(`  blatant (>20 char) length tell ${ex.toFixed(1)}% vs budget ${EXPLOITABLE_BUDGET}%`);
  const fail = blatantFail || strategyFail;
  console.log(`${fail ? '✗ FAIL' : '✓ PASS'}`);
  process.exit(fail ? 1 : 0);
}
console.log('');
