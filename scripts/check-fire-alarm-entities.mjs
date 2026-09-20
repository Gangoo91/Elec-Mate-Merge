#!/usr/bin/env node
/**
 * No HTML entities inside JavaScript string props on the fire alarm course.
 *
 * THE BUG
 * ───────
 * `RegsCallout`, `ConceptBlock` and `CommonMistake` take most of their text as
 * plain string props — `meaning`, `plainEnglish`, `onSite`, `whatHappens`,
 * `doInstead` — and `learning.tsx` renders them straight as React children
 * (`<div …>{meaning}</div>`).
 *
 * React does not decode HTML entities in a JavaScript string. Inside JSX markup
 * `&rsquo;` becomes a curly apostrophe; inside a string prop it stays the eight
 * literal characters `&rsquo;`. So this:
 *
 *     meaning="Clause 36.1&rsquo;s NOTE explains why…"
 *
 * puts `Clause 36.1&rsquo;s NOTE explains why…` on the page, in front of a
 * learner, on a page about insulation resistance testing.
 *
 * Four of these were live in the course: two `&rsquo;` in M5S4 and three
 * `&amp;` in M3S6 that rendered every mention of the O&M manual as `O&amp;M`.
 *
 * WHY A GUARD AND NOT JUST A FIX
 * ──────────────────────────────
 * Nothing in the normal toolchain sees it. The file is valid TypeScript and
 * valid JSX, so `tsc` is happy; the string is a well-formed string literal, so
 * eslint is happy; `vite build` succeeds. It is only visible by rendering the
 * page and reading it — and it is easy to reintroduce, because writing
 * `&rsquo;` inside markup is correct and the habit carries into the props,
 * where it silently is not.
 *
 * Scoped to the fire alarm course because that is what has been audited against
 * the standard. The same bug class applies to every `learning.tsx` consumer —
 * roughly 2,300 RegsCallout uses across the study centre — so widening the glob
 * is the obvious next step, but it should be done with the output read rather
 * than assumed clean.
 */
import { readFileSync, readdirSync } from 'node:fs';

const DIR = 'src/pages/upskilling';
const FILES = readdirSync(DIR).filter((f) => /^FireAlarm.*\.tsx$/.test(f));

/** String props on learning.tsx components that are rendered as-is. */
const PROPS = [
  'meaning',
  'source',
  'plainEnglish',
  'onSite',
  'whatHappens',
  'doInstead',
  'title',
  'cite',
];

/*
 * Matches `prop="…&entity;…"`. Deliberately only named/numeric entities: a bare
 * `&` in a prop is fine and common ("R&D", "cause & effect"), and flagging it
 * would make this guard noisy enough to be switched off.
 */
const ENTITY_IN_PROP = new RegExp(`\\b(${PROPS.join('|')})="[^"]*&(#\\d+|[a-zA-Z][a-zA-Z0-9]+);`, 'g');

/*
 * …and the case the first version of this guard MISSED, which the headless
 * render harness caught instead: an entity inside any JS string literal.
 *
 * The quiz and inline-check data at the top of every section is arrays of
 * plain strings — `question`, `options`, `explanation`, `answer` — and those
 * reach the DOM through the same route as the props above. M6S1 had a duct
 * detector answer reading "the manufacturer&rsquo;s instructions" and four
 * more were live elsewhere. Checking only JSX props reported the course clean
 * while a learner could see the entity on screen.
 *
 * The lookbehind excludes `=` so a JSX attribute value is not matched twice,
 * and excludes a word character so an apostrophe inside prose (`don't`) does
 * not open a spurious string.
 */
const JS_STRING = /(?<![=\w])'((?:[^'\\]|\\.)*)'|(?<![=\w])"((?:[^"\\]|\\.)*)"/g;
const ENTITY = /&(?:#\d+|[a-zA-Z][a-zA-Z0-9]+);/g;

const problems = [];

for (const file of FILES) {
  const src = readFileSync(`${DIR}/${file}`, 'utf8');
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(ENTITY_IN_PROP)) {
      const entity = m[0].slice(m[0].lastIndexOf('&'));
      problems.push(`${file}:${i + 1}  ${m[1]}="…${entity}…"`);
    }
    if (!line.includes('&')) return;
    for (const s of line.matchAll(JS_STRING)) {
      const body = s[1] ?? s[2] ?? '';
      for (const e of body.match(ENTITY) ?? []) {
        problems.push(`${file}:${i + 1}  string literal "…${e}…"`);
      }
    }
  });
}

if (problems.length) {
  console.error('✘ HTML entities inside JavaScript string props — these render literally:\n');
  for (const p of problems) console.error(`  • ${p}`);
  console.error(
    '\nThese props are rendered as React children, and React does not decode entities\n' +
      'in a JS string. Use the real character (’ “ ” — …) instead. Entities are only\n' +
      'correct inside JSX markup, e.g. between <p> tags in a ConceptBlock body.'
  );
  process.exit(1);
}

console.log(
  `✔ ${FILES.length} fire alarm course files — no HTML entities in rendered string props`
);
