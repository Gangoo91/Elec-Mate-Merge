#!/usr/bin/env node
/**
 * A block quoted as BS 5839-1 text must not use "shall".
 *
 *   npm run check:fire-alarm-quotes
 *
 * WHY THIS EXISTS
 * BS 5839-1:2025 is a CODE OF PRACTICE. Across its whole text it uses "should"
 * 923 times and "shall" exactly ZERO times. That single property turns out to
 * be a reliable detector for a fabricated quote, because someone writing a
 * plausible-sounding clause from memory reaches for "shall" — it is what a
 * requirement sounds like, and it is what the product standards (BS EN 54-x)
 * and BS 7671 actually use.
 *
 * Running this over the course found five `RegsCallout` blocks presented as
 * verbatim BS 5839-1 text that the standard does not contain:
 *
 *   - a dedicated-final-circuit clause adding "accessible only to authorised
 *     persons" and a warning-label requirement (24.1.3 says neither)
 *   - an entire compensating-measures regime bolted onto 44.2.4, which is one
 *     sentence about not concealing fault indications
 *   - "Manual call points shall trigger immediate full evacuation regardless of
 *     staging" — 18.2.6 says close to the reverse
 *   - a multi-CIE rule about "no single component failure compromising more
 *     than one zone" — 23.3 is about sub-panel links, and the single-fault
 *     limit (11.2.2) is by AREA and FLOOR, not by zone
 *   - a dual-source block mixing EN 54-13's "shall" with BS 5839-1
 *
 * None of those could be caught by the citation guard: every clause number
 * cited was real. The quoted words were the invention.
 *
 * WHAT THIS DELIBERATELY ALLOWS
 * Blocks sourced to a document that genuinely uses "shall" — BS 7671, the
 * Building Regulations, BS 8519, the BS EN 54 series. Those are legitimate and
 * common in this course, so the check keys on the SOURCE attribution, not on
 * the word alone.
 *
 * 🔴 KNOWN HOLE, stated rather than hidden: a block DUAL-sourced to BS 5839-1
 * AND a "shall" document is exempted, because from the text alone there is no
 * way to tell which document the sentence came from. Three of the five
 * fabrications found in the original sweep escaped exactly this way — e.g.
 * "BS 5839-1:2025 Clause 22 (Cause and effect) and BS 9999". Run against HEAD
 * this guard catches two of those five. Treat a dual-sourced quote as needing
 * a human read, not as cleared. The stronger habit is to keep one document per
 * quoted block, which is how those three were eventually fixed.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const COURSE_DIR = 'src/pages/upskilling';

/** Documents that legitimately use "shall". A block citing one is exempt. */
const SHALL_DOCS = /BS 7671|Building Regulations|BS 8519|BS EN|IEC |BS 9999|BS 9991|BS 5266|BS 7273/;

/** A RegsCallout: source="..." followed by clause={ ... }. */
const BLOCK = /source="([^"]{0,160})"[\s\S]{0,250}?clause=\{([\s\S]{0,2000}?)\n\s*\}/g;

const files = readdirSync(COURSE_DIR)
  .filter((f) => /^FireAlarmModule\d+Section\d+\.tsx$/.test(f))
  .map((f) => join(COURSE_DIR, f));

const problems = [];
let checked = 0;

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(BLOCK)) {
    const [, source, quoted] = m;
    if (!/5839/.test(source)) continue; // not presented as BS 5839-1 text
    checked++;
    if (SHALL_DOCS.test(source)) continue; // dual-sourced to a "shall" document
    if (!/\bshall\b/i.test(quoted)) continue;
    problems.push({
      file,
      line: src.slice(0, m.index).split('\n').length,
      source: source.slice(0, 90),
      text: quoted.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 130),
    });
  }
}

if (problems.length === 0) {
  console.log(
    `✔ ${checked} quoted BS 5839-1 blocks checked — none use "shall" (the standard never does)`
  );
  process.exit(0);
}

console.error(`\n✖ ${problems.length} block(s) quoted as BS 5839-1 text but using "shall"\n`);
for (const p of problems) {
  console.error(`  ${p.file}:${p.line}`);
  console.error(`    source: ${p.source}`);
  console.error(`    quoted: ${p.text}`);
  console.error(
    `    BS 5839-1 uses "should" throughout and "shall" nowhere. Either the wording is\n` +
      `    invented, or the block is really quoting another document — fix whichever it is.\n`
  );
}
process.exit(1);
