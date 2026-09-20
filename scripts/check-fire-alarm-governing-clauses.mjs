#!/usr/bin/env node
/**
 * Every fire alarm course section cites the clause that actually governs it.
 *
 * THE DEFECT THIS EXISTS FOR
 * ──────────────────────────
 * The course makes ~840 BS 5839-1 citations across 36 sections and they are, as
 * far as `check-fire-alarm-citations` can tell, all real clause numbers. But
 * when the 48 top-level clauses were mapped against what each section cites,
 * fourteen clauses turned out never to be cited anywhere — and thirteen of them
 * were topics the course already teaches at length:
 *
 *   Clause  4  Categories of system          ← the whole of Module 1
 *   Clause 32  Design process for limitation of false alarms  ← M2S5
 *   Clause 34  Responsibility of installer   ← M5S1
 *   Clause 35  Installation practices and workmanship  ← M5S3, M5S4
 *   Clause 37  Commissioning                 ← M5S5
 *   Clause 39  Certification                 ← M6S5
 *   Clause 40  Handover                      ← M5S6, M6S6
 *   Clause 41  Verification                  ← M6S5
 *   Clause 42  Routine testing               ← M6S1
 *
 * M5S5 is four hundred lines on commissioning that cited 14.17, 29.6 and 30 —
 * every one of them correct — and never Clause 37, which is the clause called
 * "Commissioning". Module 1 is four sections about system categories that never
 * cited Clause 4, "Categories of system".
 *
 * That is the fingerprint of content written from memory before the standard
 * was held, then corrected clause-by-clause afterwards: the citations that got
 * checked became right, and the one nobody thought to look up — the obvious one,
 * the clause the section is *about* — stayed missing.
 *
 * A learner cannot look up what is not cited. Anchoring each section to its
 * governing clause is what makes the rest of its citations navigable.
 *
 * WHAT THIS DOES NOT CHECK
 * ────────────────────────
 * That the teaching is correct — `check-fire-alarm-facts` holds known-wrong
 * figures, `check-fire-alarm-quotes` catches invented quotations, and
 * `check-fire-alarm-citations` proves a cited number exists. This one proves the
 * section cites the clause it is about. Four different questions.
 *
 * Clause titles below are the standard's own, verified against the 2025 text.
 */
import { readFileSync, existsSync } from 'node:fs';

const DIR = 'src/pages/upskilling';

/** BS 5839-1:2025 top-level clause titles, for readable failure messages. */
const CLAUSE_TITLES = {
  4: 'Categories of system',
  7: 'Relationship between system category and protected areas',
  8: 'Actuation of other fire protection systems or safety facilities',
  10: 'System components',
  11: 'Monitoring, integrity and reliability of circuits',
  12: 'Fire detection zones',
  13: 'Alarm zones',
  15: 'Audible alarm signals',
  16: 'Visual alarm signals',
  17: 'Fire alarm warnings for people who are Deaf or have a hearing loss',
  18: 'Staged fire alarms',
  19: 'Manual call points',
  20: 'Types of fire detector and their selection',
  21: 'Siting and spacing of automatic fire detectors',
  22: 'Control and indicating equipment',
  23: 'Networked systems',
  24: 'Power supplies',
  25: 'Cables, wiring and other interconnections',
  28: 'Electrical earthing',
  30: 'Categories and causes of false alarms',
  32: 'Design process for limitation of false alarms',
  33: 'Measures to limit false alarms',
  34: 'Responsibility of installer',
  35: 'Installation practices and workmanship',
  36: 'Inspection and testing of wiring',
  37: 'Commissioning',
  38: 'Documentation',
  39: 'Certification',
  40: 'Handover',
  41: 'Verification',
  42: 'Routine testing',
  43: 'Inspection and servicing',
  44: 'Non-routine attention',
  47: 'Premises management',
  48: 'Logbook',
};

/*
 * Section → the clause(s) that govern it. `any` means at least one must be
 * cited, not all of them: M2S4 covers audible, visual and Deaf/hearing-loss
 * warnings, and a section legitimately leads on one of the three.
 *
 * Module 7 sections 1, 2 and 4 are deliberately absent: they cover the RRO,
 * the Building Regulations and BS 5839-6 respectively, none of which is a
 * clause of BS 5839-1. Requiring a citation there would invite a fake one.
 */
const SECTIONS = [
  ['FireAlarmModule1Section1.tsx', 'M1S1 L category systems', [4, 7]],
  ['FireAlarmModule1Section2.tsx', 'M1S2 P category systems', [4, 7]],
  ['FireAlarmModule1Section3.tsx', 'M1S3 M category systems', [4]],
  ['FireAlarmModule1Section4.tsx', 'M1S4 Category selection', [4, 7]],
  ['FireAlarmModule2Section1.tsx', 'M2S1 Detector technologies', [20]],
  ['FireAlarmModule2Section2.tsx', 'M2S2 Detector siting and coverage', [21]],
  ['FireAlarmModule2Section3.tsx', 'M2S3 Manual call points', [19]],
  ['FireAlarmModule2Section4.tsx', 'M2S4 Sounders and VADs', [15, 16, 17]],
  ['FireAlarmModule2Section5.tsx', 'M2S5 False alarm management', [30, 32, 33]],
  ['FireAlarmModule3Section1.tsx', 'M3S1 Zone design principles', [12, 13]],
  ['FireAlarmModule3Section2.tsx', 'M3S2 Addressable vs conventional', [10, 11]],
  ['FireAlarmModule3Section3.tsx', 'M3S3 Cause and effect programming', [8, 18]],
  ['FireAlarmModule3Section4.tsx', 'M3S4 Interface design', [8]],
  ['FireAlarmModule3Section5.tsx', 'M3S5 Network and multi-panel systems', [23]],
  ['FireAlarmModule3Section6.tsx', 'M3S6 Design documentation', [38]],
  ['FireAlarmModule4Section1.tsx', 'M4S1 Primary power supplies', [24]],
  ['FireAlarmModule4Section2.tsx', 'M4S2 Secondary power and battery sizing', [24]],
  ['FireAlarmModule4Section3.tsx', 'M4S3 Cable types and fire resistance', [25]],
  ['FireAlarmModule4Section4.tsx', 'M4S4 Wiring methods and protection', [25]],
  ['FireAlarmModule4Section5.tsx', 'M4S5 Earth fault monitoring', [28]],
  ['FireAlarmModule5Section1.tsx', 'M5S1 Pre-installation planning', [34]],
  ['FireAlarmModule5Section2.tsx', 'M5S2 Control panel installation', [22]],
  ['FireAlarmModule5Section3.tsx', 'M5S3 Device installation', [35]],
  ['FireAlarmModule5Section4.tsx', 'M5S4 Wiring and terminations', [35, 36]],
  ['FireAlarmModule5Section5.tsx', 'M5S5 Commissioning procedures', [37]],
  ['FireAlarmModule5Section6.tsx', 'M5S6 Handover and documentation', [38, 40]],
  ['FireAlarmModule6Section1.tsx', 'M6S1 Routine testing requirements', [42]],
  ['FireAlarmModule6Section2.tsx', 'M6S2 Servicing and maintenance', [43]],
  ['FireAlarmModule6Section3.tsx', 'M6S3 Fault finding techniques', [44]],
  ['FireAlarmModule6Section4.tsx', 'M6S4 Record keeping and logbooks', [48]],
  ['FireAlarmModule6Section5.tsx', 'M6S5 Verification and certification', [39, 41]],
  ['FireAlarmModule6Section6.tsx', 'M6S6 Handover and client training', [40, 47]],
];

/*
 * `Clause 37` or `clause 37.4`. Deliberately requires the word "clause": a bare
 * "37" matches a sound level, a cable size, a page number and a year, and a
 * guard that accepts those would pass on a course that cites nothing at all.
 * The trailing guard stops `Clause 4` matching `Clause 43`.
 */
function citesClause(src, n) {
  return new RegExp(`[Cc]lause\\s+${n}(?:\\.\\d+)*(?![\\d.])`).test(src);
}

const problems = [];

for (const [file, label, clauses] of SECTIONS) {
  const path = `${DIR}/${file}`;
  if (!existsSync(path)) {
    problems.push(`${label}: ${path} is missing — renamed or removed?`);
    continue;
  }
  const src = readFileSync(path, 'utf8');
  const hit = clauses.find((n) => citesClause(src, n));
  if (!hit) {
    const list = clauses.map((n) => `Clause ${n} (${CLAUSE_TITLES[n]})`).join(' or ');
    problems.push(`${label}: never cites ${list}`);
  }
}

/*
 * Two clauses had no coverage at all and had content written for them. They are
 * pinned to the file that teaches them, NOT merely to "somewhere in the course".
 *
 * The first version of this check asked whether the clause was cited anywhere,
 * and Clause 27 passed the moment an unrelated section quoted 28.4 — which
 * happens to contain the words "in accordance with Clause 27". A citation
 * inside someone else's quotation is not teaching, and a guard satisfied by one
 * is worse than no guard, because it reports the gap as closed.
 *
 * Clause 9 is the other trap: the course is full of "zone 1" and "zone 2", but
 * those are fire DETECTION zones. Hazardous-area zones are a different meaning
 * of the same word, which is exactly why the gap survived so long unnoticed.
 */
const TOPIC_CLAUSES = [
  [9, 'FireAlarmModule5Section3.tsx', 'explosive gas or dust atmospheres', /60079-14/],
  [27, 'FireAlarmModule4Section4.tsx', 'electromagnetic compatibility', /35 m in aggregate/],
];

for (const [n, file, why, evidence] of TOPIC_CLAUSES) {
  const path = `${DIR}/${file}`;
  if (!existsSync(path)) {
    problems.push(`Clause ${n} (${why}): ${path} is missing`);
    continue;
  }
  const src = readFileSync(path, 'utf8');
  if (!citesClause(src, n)) {
    problems.push(`Clause ${n} (${CLAUSE_TITLES[n] ?? why}) is not cited in ${file}`);
  } else if (!evidence.test(src)) {
    // Cited but the substance went — a rename or a trim took the teaching out.
    problems.push(
      `Clause ${n} (${CLAUSE_TITLES[n] ?? why}) is cited in ${file} but its content ` +
        `(expected to match ${evidence}) has gone`
    );
  }
}

if (problems.length) {
  console.error('✘ Fire alarm sections not anchored to their governing clause:\n');
  for (const p of problems) console.error(`  • ${p}`);
  console.error(
    '\nEach section should cite the BS 5839-1:2025 clause it is about, not only the\n' +
      'clauses it mentions in passing. A learner cannot look up what is never cited.'
  );
  process.exit(1);
}

console.log(
  `✔ ${SECTIONS.length} fire alarm sections each cite their governing BS 5839-1:2025 clause`
);
