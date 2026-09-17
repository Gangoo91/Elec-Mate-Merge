#!/usr/bin/env node
/**
 * Stops a schedule-of-tests cell displaying a prompt as if it were a reading.
 *
 *   npm run check:test-placeholders
 *
 * WHY THIS EXISTS
 * ELE-1747. An EICR was issued showing `>200` insulation readings on screen
 * that printed `N/A`, because the mobile test grid rendered each tile's input
 * prompt **as the tile's value**. Every column's prompt is a plausible passing
 * result — `>200` for IR, `0.00` for R1+R2 and Zs, `✓` for polarity, `<300`
 * for the RCD — so an untouched schedule of test results read as a complete
 * and passing one. 107 issued EICRs across 38 users carry at least one blank
 * IR field.
 *
 * It had been survivable. The empty state was `text-white/30`, a faint ghost.
 * Commit 4960e8c5b ("App-wide audit — grey text", 7 Apr 2026) applied the house
 * rule that there is no grey text and rewrote it to
 * `value ? 'text-white' : 'text-white'` — both branches identical. The ghost
 * became solid, indistinguishable from a measurement, and stood for five
 * months. tsc and eslint were clean throughout, which is the point: nothing
 * about this is a type error or a lint error. It is a rendering decision that
 * only a rule like this one can hold.
 *
 * The desktop cells already got this right — every `ComboboxCell` call site
 * passes `—`. This keeps the mobile grid honest too, and catches the next
 * well-meaning styling sweep before it reaches a certificate.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

/**
 * Everywhere a reading can be entered against a certificate. Narrower than
 * this missed the point once already: the defect was found in `testing/`, but
 * the emergency-lighting and EIC forms take readings too, and a guard that
 * only watches the screen that already burned us is not a guard.
 */
const ROOTS = [
  'src/components/testing',
  'src/components/table-cells',
  'src/components/inspection',
  'src/components/eicr',
  'src/components/eic',
  'src/components/minor-works',
  'src/components/mobile',
];
/** Call sites can live anywhere, so rule 3 sweeps the whole tree. */
const CALL_SITE_ROOT = 'src';

/**
 * Comments describe these defects — this file's own header quotes the dead
 * ternary verbatim — so they must come out before anything is matched, or the
 * guard reports the explanation of a bug as the bug.
 */
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '');

const problems = [];
const fail = (file, rule, detail) => problems.push({ file, rule, detail });

/** Every .tsx under the given roots. */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (extname(p) === '.tsx') out.push(p);
  }
  return out;
}

/**
 * A prompt that could be mistaken for a test result: anything opening with a
 * digit, a comparison against a number, or a tick. `—`, `–`, `Tap`, `Select…`
 * and the like are fine — they cannot be read as a measurement.
 */
const LOOKS_LIKE_A_READING = /^\s*(?:[<>]=?\s*)?\d|^\s*[✓✔]/;

const files = ROOTS.flatMap((r) => walk(r));

/** Components that put a prompt in the value position, by component name. */
const rendersPromptAsValue = new Set();

for (const file of files) {
  const src = stripComments(readFileSync(file, 'utf8'));

  // ── 1. which components render a prompt where a reading goes ────────────
  // `{value || tile.inputPlaceholder}`, `{displayValue || placeholder}`.
  // This shape is not a defect by itself — it is only dangerous when the
  // prompt could pass for a measurement, which rule 3 decides from the call
  // sites. Recorded here so rule 3 knows which components to chase.
  if (/\{\s*\w+\s*\|\|\s*[\w.]*placeholder\s*\}/i.test(src)) {
    rendersPromptAsValue.add(basename(file, '.tsx'));
  }

  // ── 2. the styling fingerprint that made it invisible ───────────────────
  // Both branches identical means a distinction that was meant to be drawn no
  // longer is. Two app-wide sweeps flattened 27 of these (4960e8c5b, then
  // c328af869 across 2,744 files and 42,506 opacity classes), so the pattern
  // is common — but only ONE of the survivors carried data meaning, and that
  // was this bug. The rest style step labels and tab headings, where an icon
  // or position still says which state you are in.
  //
  // So this fires only when the condition asks whether a VALUE IS THERE
  // (`value ?`, `!reading`, `x === null`) and not which step is active
  // (`isActive ?`, `i === step ?`). Flagging the cosmetic ones would make the
  // guard noisy, and a noisy guard is one someone eventually deletes.
  for (const m of src.matchAll(/([\w.!=\s'"()]{1,40}?)\?\s*(['"])([^'"]+)\2\s*:\s*(['"])([^'"]+)\4/g)) {
    if (m[3] !== m[5]) continue;
    const condition = m[1].trim();
    const asksWhetherAValueExists =
      /(?:===?\s*(?:null|undefined|''|""))|^!/.test(condition) ||
      (/^[\w.]+$/.test(condition) && !/^(?:is|has|can|should|was|did)[A-Z]/.test(condition));
    if (!asksWhetherAValueExists) continue;
    fail(
      file,
      'dead-ternary',
      `\`${condition} ? '${m[3]}' : '${m[5]}'\` — both branches are identical, ` +
        `so a cell with a value and one without are styled the same`
    );
  }

}

// ── 3. result-shaped prompts reaching those components ─────────────────────
// A real `<input placeholder>` is greyed by the browser and is fine; the danger
// is only a prompt that reaches the value position. A prompt gets there two
// ways, and an earlier version of this file checked one and then the other,
// passing both times while the original defect sat in front of it:
//
//   a) declared in the component's own file, like the mobile grid's TEST_TILES
//   b) passed in by a caller, like every <ComboboxCell placeholder="—">
//
// Both are checked. Note the element scan is done with indexOf and not a
// `<Name[^>]*>` regex: `>200` contains a `>`, so that pattern stops short of
// the very string this is looking for.

/**
 * Prompt literals inside one JSX element.
 *
 * The open tag is walked character by character rather than matched, for two
 * reasons that each produced a wrong answer first time round:
 *   - `<Name[^>]*>` stops at the `>` inside `placeholder=">200"`, missing the
 *     exact string this exists to find;
 *   - a fixed-size window runs past `/>` into the next element, which reported
 *     an honest `<Input placeholder="0">` as a ComboboxCell defect.
 * Quotes are tracked so a `>` inside an attribute value does not end the tag.
 */
function promptsInElements(src, name) {
  const out = [];
  for (let i = src.indexOf(`<${name}`); i !== -1; i = src.indexOf(`<${name}`, i + 1)) {
    let quote = null;
    let end = i;
    for (let j = i; j < src.length; j++) {
      const ch = src[j];
      if (quote) {
        if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (ch === '>') {
        end = j;
        break;
      }
    }
    if (end === i) continue;
    for (const m of src.slice(i, end).matchAll(/placeholder\s*=\s*(?:\{\s*)?(['"])([^'"]*)\1/gi)) {
      out.push(m[2]);
    }
  }
  return out;
}

// (a) prompts declared alongside the render site
for (const file of files) {
  if (!rendersPromptAsValue.has(basename(file, '.tsx'))) continue;
  const src = stripComments(readFileSync(file, 'utf8'));
  for (const m of src.matchAll(/(?:input)?placeholder\s*:\s*(['"])([^'"]*)\1/gi)) {
    if (LOOKS_LIKE_A_READING.test(m[2])) {
      fail(
        file,
        'reading-shaped-prompt',
        `prompt '${m[2]}' could be read as a measurement, and this component ` +
          `renders prompts in the value position`
      );
    }
  }
}

// (b) prompts passed in by callers, wherever those callers live
for (const file of walk(CALL_SITE_ROOT)) {
  const src = stripComments(readFileSync(file, 'utf8'));
  for (const name of rendersPromptAsValue) {
    if (!src.includes(`<${name}`)) continue;
    for (const prompt of promptsInElements(src, name)) {
      if (LOOKS_LIKE_A_READING.test(prompt)) {
        fail(
          file,
          'reading-shaped-prompt',
          `<${name} placeholder="${prompt}"> — ${name} renders its prompt in ` +
            `the value position, and '${prompt}' could be read as a measurement`
        );
      }
    }
  }
}

// ── report ─────────────────────────────────────────────────────────────────
if (problems.length === 0) {
  console.log(`✔ ${files.length} schedule cell components checked — no prompt is shown as a reading`);
  process.exit(0);
}

console.error(`\n✖ ${problems.length} problem(s) across ${files.length} components\n`);
const byRule = new Map();
for (const p of problems) byRule.set(p.rule, [...(byRule.get(p.rule) ?? []), p]);
for (const [rule, list] of byRule) {
  console.error(`  ${rule} (${list.length})`);
  for (const p of list) console.error(`    ${p.file}\n      ${p.detail}`);
  console.error('');
}
process.exit(1);
