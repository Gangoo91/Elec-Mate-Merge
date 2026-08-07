#!/usr/bin/env node
/**
 * Re-does the arithmetic in every calculator worked example.
 *
 * The worked examples are what an apprentice copies into a portfolio, so a step
 * that doesn't add up is worse than no example at all. Ohm's Law shipped with:
 *
 *   P = V × I = 230 × 12.1 = 2783 W
 *   (check) P = V² ÷ R = 230² ÷ 19 = 2784 W ✓
 *
 * — a cross-check ticked as passing while disagreeing with the line above it,
 * because the first line fed the *displayed* 12.1 A back in instead of 12.105.
 *
 * This walks `steps:` in every content file, evaluates each arithmetic segment
 * of each `a = b = c` chain, and reports segments that disagree by more than
 * the displayed precision can explain.
 *
 * Deliberately conservative — it only evaluates segments made purely of digits
 * and operators. Anything with a symbol it doesn't understand is skipped and
 * counted, so the summary says how much was actually checked rather than
 * implying a clean run means every line was verified.
 *
 *   node scripts/check-calculator-content.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Overridable so the detector itself can be tested against a fixture — a green
// run means nothing if the checker is broken.
const DIR = process.env.CALC_CONTENT_DIR || 'src/components/apprentice/calculators/content';

/** Units and decoration that may trail a value. Longest first — 'kW' before 'W'. */
const UNITS = [
  'kVAr', 'kVA', 'kWh', 'mm²', 'MΩ', 'kΩ', 'mΩ', 'kW', 'kV', 'kA', 'mV', 'mA', 'ms',
  '°C', 'm²', 'Ω/km', 'mV/A/m', 'Ω', 'A', 'V', 'W', 'J', 'F', 'H', 'K', 's', 'm', '%',
];

/** Shared clean-up: prose label, currency, thousands spaces, stray whitespace. */
function normalise(raw) {
  let s = raw.trim();
  // "Design for continuous load: 32.2 × 1.25" -> "32.2 × 1.25"
  if (/:/.test(s) && /\d/.test(s.split(':').pop())) s = s.split(':').pop().trim();
  s = s.replace(/[£$€]/g, '');
  // "26 640" (thin or normal space thousands separator) -> "26640"
  s = s.replace(/(\d)[\s\u202f\u00a0](\d{3})\b/g, '$1$2');
  s = s.replace(/^[≈~]\s*/, '');
  return s.trim();
}

/** Strip a trailing unit, repeatedly — "2.78 kW", "488 mΩ". */
function stripUnit(s) {
  let out = s.trim();
  for (let i = 0; i < 3; i++) {
    let hit = false;
    for (const u of UNITS) {
      if (out.endsWith(u)) {
        out = out.slice(0, -u.length).trim();
        hit = true;
        break;
      }
    }
    if (!hit) break;
  }
  return out;
}

/** Turn a display string into a number, or null if it isn't a plain value. */
function toNumber(raw) {
  let s = stripUnit(normalise(raw)).replace(/,/g, '').trim();
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);

  // A value may trail prose: "1.75 Ω, the Appendix 3 ambient-temperature value".
  // Only take the leading token when what follows is NOT arithmetic — otherwise
  // "0.8 × 2.19" would be read as 0.8 and checked against the wrong number.
  const s2 = normalise(raw);
  if (/[+\-*/×÷√]/.test(s2.replace(/^-/, ''))) return null;
  const m = s2.match(/^(-?\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

/**
 * Evaluate an arithmetic expression written the way the examples write it.
 * Returns null the moment it meets anything it does not fully understand —
 * a wrong answer from a half-parsed expression would be worse than a skip.
 */
function evaluateExpression(raw) {
  let s = normalise(raw);
  s = stripUnit(s);

  s = s
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/,/g, '');

  // A percentage INSIDE an expression is a fraction: "0 + 50% × (100 − 0)" is
  // 50, not 5000. Must run before the unit strip below, which would otherwise
  // delete the '%' and leave a bare 50.
  s = s.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1/100)');

  // Units written mid-expression: "2500 mOhm / 1000", "32.2 A * 1.25".
  for (const u of UNITS) {
    s = s.split(`${u} `).join(' ');
  }

  // Superscripts: 230² -> (230**2)
  s = s.replace(/(\d+(?:\.\d+)?)²/g, '($1**2)');
  s = s.replace(/(\d+(?:\.\d+)?)³/g, '($1**3)');

  // Roots, bracketed or bare: √(8**2 + 6**2) and √400000.
  s = s.replace(/√\s*\(/g, 'Math.sqrt(');
  s = s.replace(/√\s*(\d+(?:\.\d+)?)/g, 'Math.sqrt($1)');

  // Must now be digits, operators, brackets and Math.sqrt only.
  const bare = s.replace(/Math\.sqrt/g, '');
  if (!/^[\d\s.+\-*/()]*$/.test(bare)) return null;
  if (!/\d/.test(s)) return null;
  // A bare number is not an expression worth checking on its own.
  if (/^-?\d+(\.\d+)?$/.test(s.trim())) return null;
  if (!/[+\-*/]|Math\.sqrt/.test(s)) return null;

  try {
    const v = Function(`"use strict"; return (${s});`)();
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

/** Decimals shown in a value — sets how much rounding slack is legitimate. */
function decimalsOf(raw) {
  const m = raw.replace(/,/g, '').match(/\d+\.(\d+)/);
  return m ? m[1].length : 0;
}

/** Pull every string out of each `steps: [ ... ]` array. */
function extractSteps(src) {
  const out = [];
  const re = /steps:\s*\[([\s\S]*?)\]/g;
  let m;
  while ((m = re.exec(src))) {
    const body = m[1];
    const sre = /(?<!\\)'((?:[^'\\]|\\.)*)'/g;
    let s;
    while ((s = sre.exec(body))) out.push(s[1].replace(/\\'/g, "'"));
  }
  return out;
}

const files = readdirSync(DIR)
  .filter((f) => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts')
  .sort();

/** Does this segment carry digits and an operator? Then it should have parsed. */
function looksNumeric(seg) {
  return /\d/.test(seg) && /[+\-*/×÷√]/.test(seg);
}

let registryOk = true;
let checked = 0;
const symbolic = [];
const unparsed = [];
const problems = [];

/** Split an "a = b = c" chain, ignoring ≤ ≥ ≠ and ==. */
const splitChain = (step) =>
  step
    .split(/(?<![≤≥≠<>!])=(?![=<>])/)
    .map((p) => p.trim())
    .filter(Boolean);

for (const file of files) {
  const src = readFileSync(join(DIR, file), 'utf8');
  const steps = extractSteps(src);

  for (let si = 0; si < steps.length; si++) {
    const step = steps[si];
    const parts = splitChain(step);
    if (parts.length < 2) continue;

    // Adiabatic writes the answer on the NEXT line:
    //   'S = √400000 ÷ 115 = 632.5 ÷ 115'
    //   'S = 5.5 mm²'
    // so a chain ending in an expression is not unfinished — its result is the
    // next step, when that step restates the same symbol. Append it and the
    // normal pair-walk checks it.
    const tail = parts[parts.length - 1];
    if (evaluateExpression(tail) !== null) {
      const next = steps[si + 1];
      if (next) {
        const nextParts = splitChain(next);
        if (nextParts.length === 2 && nextParts[0].trim() === parts[0].trim()) {
          parts.push(nextParts[1]);
        }
      }
    }

    // Walk consecutive pairs: an expression followed by its stated value.
    for (let i = 0; i < parts.length - 1; i++) {
      const lhs = parts[i];
      const rhs = parts[i + 1];

      const expr = evaluateExpression(lhs);
      if (expr === null) {
        // A symbolic segment ("P", "V × I") is not a coverage hole — those
        // sides are definitionally uncheckable. A segment carrying digits and
        // an operator that still failed to parse IS one, so count it apart.
        (looksNumeric(lhs) ? unparsed : symbolic).push({ file, step, seg: lhs });
        continue;
      }
      // The stated value may carry a trailing note: "2784 W ✓" or "12.105 A (≈ 12.1 A)".
      const rhsClean = rhs.replace(/\s*\(.*?\)\s*$/, '').replace(/\s*[✓✗x]\s*$/, '');
      let stated = toNumber(rhsClean);
      if (stated === null) {
        (looksNumeric(rhs) ? unparsed : symbolic).push({ file, step, seg: rhs });
        continue;
      }

      checked++;

      // A percentage may be written either way round: the expression can carry
      // the ×100 itself ("(9 ÷ 230) × 100 = 3.9%") or leave it implied in the
      // unit ("(12 − 4) ÷ 16 = 50%"). Both are correct, so accept either.
      // Test the VALUE's own unit, not the end of the line — the line may trail
      // prose ("33.8% — within the 45% space factor").
      const isPercent = /^-?\d+(\.\d+)?\s*%/.test(normalise(rhsClean));
      const candidates = isPercent ? [stated, stated / 100] : [stated];

      const dp = decimalsOf(rhs);
      const agrees = candidates.some((c) => {
        // Slack: half a unit in the last displayed place, plus half again for a
        // legitimately rounded intermediate, or 0.5% — whichever is larger.
        // Not ×3: on a whole number that gives ±1.5, wide enough to wave
        // through "√100 = 11".
        const ulp = Math.pow(10, -(c === stated ? dp : dp + 2)) / 2;
        const tol = Math.max(ulp * 1.5, Math.abs(c) * 0.005);
        return Math.abs(expr - c) <= tol;
      });

      if (!agrees) {
        problems.push({ file, step, lhs, stated, actual: expr, diff: expr - stated });
      }
    }
  }
}

// ── Registry / component map ────────────────────────────────────────────
// `calculatorComponents.ts` claims in its own doc comment that a check script
// asserts it stays in step with `src/data/calculators.ts`. This is that script.
// A slug in one and not the other silently falls back to Ohm's Law — the user
// taps "Adiabatic" and gets a working calculator for a different thing.
const registrySrc = readFileSync('src/data/calculators.ts', 'utf8');
const componentSrc = readFileSync(
  'src/components/calculators/shared/calculatorComponents.ts',
  'utf8'
);

const registrySlugs = new Set(
  [...registrySrc.matchAll(/value:\s*'([^']+)'/g)].map((m) => m[1])
);
const componentSlugs = new Set(
  [...componentSrc.matchAll(/^\s*'([^']+)':\s*lazy\(/gm)].map((m) => m[1])
);

const missingComponent = [...registrySlugs].filter((s) => !componentSlugs.has(s));
const missingRegistry = [...componentSlugs].filter((s) => !registrySlugs.has(s));

console.log(`Calculator registry`);
console.log(`  registry:   ${registrySlugs.size} slugs`);
console.log(`  components: ${componentSlugs.size} slugs`);
if (missingComponent.length || missingRegistry.length) {
  if (missingComponent.length)
    console.log(`  ✗ in registry, no component: ${missingComponent.join(', ')}`);
  if (missingRegistry.length)
    console.log(`  ✗ has component, not in registry: ${missingRegistry.join(', ')}`);
  registryOk = false;
} else {
  console.log(`  ✓ in step`);
}
console.log('');

console.log(`Calculator worked-example arithmetic`);
console.log(`  files:    ${files.length}`);
console.log(`  checked:  ${checked} segments`);
console.log(`  symbolic: ${symbolic.length} segments (e.g. "P = V × I" — nothing to compute)`);
console.log(`  unparsed: ${unparsed.length} segments (HAVE numbers but this script could not read them — NOT verified)`);
console.log('');

if (process.env.SHOW_UNPARSED && unparsed.length) {
  console.log('Unparsed segments — coverage holes, check these by hand:');
  for (const u of unparsed) console.log(`  ${u.file}: "${u.seg}"   in: ${u.step}`);
  console.log('');
}

if (problems.length === 0) {
  console.log(`✓ every checkable segment agrees`);
  process.exit(registryOk ? 0 : 1);
}

console.log(`✗ ${problems.length} segment(s) disagree:\n`);
for (const p of problems) {
  console.log(`  ${p.file}`);
  console.log(`    step:   ${p.step}`);
  console.log(`    "${p.lhs}" = ${p.actual}`);
  console.log(`    stated: ${p.stated}   (out by ${p.diff.toPrecision(3)})`);
  console.log('');
}
process.exit(1);
