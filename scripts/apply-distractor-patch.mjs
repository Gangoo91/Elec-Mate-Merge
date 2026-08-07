#!/usr/bin/env node
/**
 * apply-distractor-patch — rewrite the `options` array of specific questions.
 *
 * The mock exam banks give the answer away by length: the correct option is the
 * only fully-formed one, so a candidate can score ~68% by always picking the
 * longest. The fix that works is levelling the DISTRACTORS up to match, never
 * trimming the key — trimming drops exam-relevant facts, and on a comparison
 * question it has already once made the key wrong (see project_mock_exam_quality).
 *
 * This script only moves text. It deliberately cannot decide what the new
 * distractors should say — that is written by hand, per question, and passed in
 * as JSON: { "<bankFile>": { "<id>": ["opt0","opt1","opt2","opt3"] } }
 *
 * SAFETY
 *  • refuses if the question id is not found, or appears more than once
 *  • refuses if the option count changes (that would move correctAnswer)
 *  • refuses if the option at correctAnswer index is not byte-identical to the
 *    existing key — this script must never edit the correct answer
 *  • prints a before/after length table so the effect is visible, not assumed
 *
 * Usage: node scripts/apply-distractor-patch.mjs <patch.json> [--dry]
 */
import { readFileSync, writeFileSync } from 'fs';

const [patchPath, ...flags] = process.argv.slice(2);
const dry = flags.includes('--dry');
if (!patchPath) {
  console.error('usage: apply-distractor-patch.mjs <patch.json> [--dry]');
  process.exit(2);
}

const patch = JSON.parse(readFileSync(patchPath, 'utf-8'));
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

let edited = 0;
for (const [file, questions] of Object.entries(patch)) {
  let src = readFileSync(file, 'utf-8');

  for (const [id, newOpts] of Object.entries(questions)) {
    // The whole question object, located by its id.
    const objRe = new RegExp(`(\\n\\s{2}\\{\\s*\\n\\s*id:\\s*${id},)([\\s\\S]*?)(\\n\\s{2}\\},)`, 'g');
    const found = [...src.matchAll(objRe)];
    if (found.length !== 1) {
      console.error(`✗ ${file} id ${id}: matched ${found.length} question objects, expected 1`);
      process.exit(1);
    }
    const [whole, head, body, tail] = found[0];

    const optsRe = /(options:\s*\[)([\s\S]*?)(\n?\s*\],)/;
    const om = body.match(optsRe);
    if (!om) {
      console.error(`✗ ${file} id ${id}: no options array`);
      process.exit(1);
    }
    const oldOpts = [...om[2].matchAll(/'((?:[^'\\]|\\.)*)'|"([^"]*)"/g)].map((m) =>
      (m[1] ?? m[2]).replace(/\\'/g, "'").replace(/\\\\/g, '\\')
    );
    if (oldOpts.length !== newOpts.length) {
      console.error(
        `✗ ${file} id ${id}: option count ${oldOpts.length} -> ${newOpts.length}; this would move correctAnswer`
      );
      process.exit(1);
    }

    const caM = body.match(/correctAnswer:\s*(\d+)/);
    if (!caM) {
      console.error(`✗ ${file} id ${id}: no correctAnswer`);
      process.exit(1);
    }
    const ca = Number(caM[1]);
    if (oldOpts[ca] !== newOpts[ca]) {
      console.error(`✗ ${file} id ${id}: the correct option was modified — refusing.`);
      console.error(`    was: ${oldOpts[ca]}`);
      console.error(`    now: ${newOpts[ca]}`);
      process.exit(1);
    }

    const rendered =
      '\n' + newOpts.map((o) => `      '${esc(o)}',`).join('\n') + '\n    ],';
    const newBody = body.replace(optsRe, (_m, open) => `${open}${rendered}`);
    src = src.replace(whole, `${head}${newBody}${tail}`);

    const before = oldOpts.map((o) => o.length);
    const after = newOpts.map((o) => o.length);
    const gapBefore = before[ca] - Math.max(...before.filter((_, i) => i !== ca));
    const gapAfter = after[ca] - Math.max(...after.filter((_, i) => i !== ca));
    console.log(
      `  id ${String(id).padStart(4)}  [${before.join(',')}] -> [${after.join(',')}]  gap ${gapBefore} -> ${gapAfter}`
    );
    edited++;
  }

  if (!dry) writeFileSync(file, src);
}
console.log(`${dry ? '[dry run] ' : ''}${edited} questions patched`);
