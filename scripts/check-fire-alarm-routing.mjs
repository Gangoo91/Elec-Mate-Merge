#!/usr/bin/env node
/**
 * Fire alarm questions must route to BS 5839-1, and electrical ones must not.
 *
 *   npm run check:fire-alarm-routing
 *
 * WHY THIS EXISTS
 * BS 5839-1:2025 lives in the same `bs7671_facets` corpus as BS 7671, GN3 and
 * OSG. Which book wins a query is decided by ONE thing: whether the query
 * understanding layer tags it `fire`. That tag feeds `bookBoost()` in
 * `_shared/bs7671-facet-retrieval.ts`, which lifts BS 5839 to 1.6 on a fire
 * topic and pushes it to 0.6 otherwise.
 *
 * Both halves matter:
 *   - miss the tag and a detector-spacing question competes ~12k fire alarm
 *     facets against 33.5k BS 7671 ones on raw similarity, and loses;
 *   - drop the penalty and a cable-sizing or Zs question starts pulling fire
 *     alarm cable clauses purely on lexical overlap.
 *
 * The tag is plain substring matching, which is easy to get subtly wrong. The
 * original vocabulary was four phrases and one of them was 'smoke detection' —
 * which does NOT match "smoke detectors", the single most common phrasing of
 * the most common question. That is the class of bug this guards.
 *
 * The vocabulary is read out of the source file rather than duplicated here,
 * so the test cannot drift away from what actually ships.
 */
import { readFileSync } from 'node:fs';

const SRC = 'supabase/functions/_shared/bs7671-query-understanding.ts';

const src = readFileSync(SRC, 'utf8');
const block = src.match(/fire: \[([\s\S]*?)\],\n/);
if (!block) {
  console.error(`✖ could not find the \`fire\` topic vocabulary in ${SRC}`);
  process.exit(1);
}
const phrases = [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
const tagsFire = (q) => phrases.some((p) => q.toLowerCase().includes(p));

/** Real questions an electrician types. These must reach BS 5839-1. */
const MUST_ROUTE = [
  'how far apart can smoke detectors be',
  'what height should a manual call point be mounted at',
  'minimum sound level for fire alarm sounders',
  'maximum floor area of a detection zone',
  'do I need heat detectors in a kitchen',
  'how often must a fire alarm be serviced',
  'what is a category L2 system',
  'cause and effect testing on commissioning',
  'beam detector spacing on a high ceiling',
  'how do I reduce false alarms',
  'fire alarm log book requirements',
];

/**
 * Electrical questions. These must NOT be pulled toward the fire alarm book.
 * "fire resistant cable" is the deliberate trap: it contains the word fire but
 * is a BS 7671 topic, which is why bare 'fire' must never be in the vocabulary.
 */
const MUST_NOT_ROUTE = [
  'maximum Zs for a 32A type B MCB',
  'cable sizing for a 10mm twin and earth',
  'RCD disconnection time for a TT system',
  'what size CPC for a 6mm radial',
  'fire resistant cable for a lighting circuit',
  'bathroom zone 1 IP rating',
];

const failures = [];
for (const q of MUST_ROUTE) {
  if (!tagsFire(q)) failures.push({ q, want: 'fire', got: 'not tagged' });
}
for (const q of MUST_NOT_ROUTE) {
  if (tagsFire(q)) {
    const hit = phrases.find((p) => q.toLowerCase().includes(p));
    failures.push({ q, want: 'not fire', got: `matched '${hit}'` });
  }
}

if (failures.length === 0) {
  console.log(
    `✔ fire alarm routing correct — ${MUST_ROUTE.length + MUST_NOT_ROUTE.length} queries checked against ${phrases.length} phrases`
  );
  process.exit(0);
}

console.error(`\n✖ ${failures.length} query/queries route to the wrong book\n`);
for (const f of failures) {
  console.error(`  "${f.q}"\n    expected: ${f.want}\n    actual:   ${f.got}\n`);
}
console.error(`  Vocabulary lives in ${SRC} (the \`fire\` entry of TOPIC_VOCAB).`);
process.exit(1);
