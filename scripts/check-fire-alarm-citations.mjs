#!/usr/bin/env node
/**
 * Every BS 5839-1 clause the fire alarm course cites must actually exist.
 *
 *   npm run check:fire-alarm-citations
 *
 * WHY THIS EXISTS
 * ELE-1754, second pass. The 46-page fire alarm course makes ~790 clause
 * citations. Checked against the real clause list for the first time (once the
 * standard was ingested), four of them named clauses that DO NOT EXIST:
 *
 *   clause 13.2.1  — Clause 13 (Alarm zones) has only 13.1 to 13.4
 *   clause 13.2.7  — same; the content was really 11.2.2
 *   clause 13.2.1.f — stairwells as a separate zone is 12.3 c)
 *   clause 22.5    — Clause 22 has 22.1.x / 22.2.x / 22.3.x only
 *
 * A learner cannot tell an invented clause number from a real one, and neither
 * can a reviewer without the standard open. This is the same failure the RAG
 * work was fixing on the AI side, in hand-written content.
 *
 * WHAT THIS CANNOT CATCH
 * Existence is not correctness. The same audit found six citations that name a
 * REAL clause for content belonging to a different one — "Clause 25" (cables)
 * quoted for standby battery capacity and for sound levels, "Clause 13.2"
 * (signals must not overlap) quoted for the zone definition and for search
 * distance, "Clause 12" quoted for call point travel distances. Those look
 * legitimate and only a human with the standard can spot them. This guard
 * raises the floor; it does not replace reading the clause.
 *
 * A deliberate reference to the superseded 2017 numbering is not a defect, so
 * lines that say so are skipped.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const CLAUSE_FILE = 'scripts/data/bs5839-clauses.txt';
const COURSE_DIR = 'src/pages/upskilling';

const real = new Set(
  readFileSync(CLAUSE_FILE, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
);

/** A bare parent heading is valid if any real clause sits beneath it. */
const exists = (c) => real.has(c) || [...real].some((r) => r.startsWith(c + '.'));

const CITE = /\b(?:clause|clauses|§)\s*([0-9]{1,2}(?:\.[0-9]+){0,3})\b/gi;

const files = readdirSync(COURSE_DIR)
  .filter((f) => /^FireAlarmModule\d+Section\d+\.tsx$/.test(f))
  .map((f) => join(COURSE_DIR, f));

const problems = [];
let checked = 0;

for (const file of files) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      // An explicit note about the old edition's numbering is intentional.
      if (/in 2017|2017 edition/.test(line)) return;
      for (const m of line.matchAll(CITE)) {
        checked++;
        if (exists(m[1])) continue;
        problems.push({
          file,
          line: i + 1,
          clause: m[1],
          text: line.trim().slice(0, 110),
        });
      }
    });
}

if (problems.length === 0) {
  console.log(
    `✔ ${checked} BS 5839-1 clause citations across ${files.length} course pages — all exist`
  );
  process.exit(0);
}

console.error(`\n✖ ${problems.length} citation(s) naming a clause that is not in BS 5839-1:2025\n`);
for (const p of problems) {
  console.error(`  ${p.file}:${p.line}  clause ${p.clause}`);
  console.error(`    ${p.text}\n`);
}
console.error(`  Valid clause numbers are listed in ${CLAUSE_FILE}.`);
process.exit(1);
