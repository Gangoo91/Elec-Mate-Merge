/**
 * Schedule-of-tests auto-calculation — the (R1+R2) and Zs derivations.
 *
 * Why this exists: the ring derivation was gated on `circuitType` containing
 * "ring". It type-checked, it had no test, and it silently withheld (R1+R2) on
 * 795 of the 1,090 circuits in live data that carry real end-to-end readings —
 * they are typed "Sockets", "Other", or left blank. A user reported it as
 * "calculating R1+R2 from end to end results" not working.
 *
 * The cases below are the ones that actually went wrong on site, so they are
 * the ones worth holding still.
 */
import { applyScheduleAutoCalc, estimateRingR1R2 } from '@/utils/zsCalculations';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};

type Circuit = {
  r1r2?: string;
  ringR1?: string;
  ringRn?: string;
  ringR2?: string;
  zs?: string;
  circuitType?: string;
};

/** Type a value into one field, the way the schedule commits a keystroke. */
const type_ = (prev: Circuit, field: keyof Circuit, value: string, zRef: number | null = null) => {
  const updated: Circuit = { ...prev, [field]: value };
  applyScheduleAutoCalc(prev, updated, field, zRef);
  return updated;
};

console.log('\n1. the reported bug — readings entered, circuit NOT typed "ring"');
// Craig Soper's row: r₁ 0.32, rₙ 0.30, r₂ 0.49 -> (0.32 + 0.49) / 4 = 0.2025
for (const circuitType of ['', 'Other', 'Sockets', undefined]) {
  let c: Circuit = { circuitType };
  c = type_(c, 'ringR1', '0.32');
  c = type_(c, 'ringRn', '0.30');
  c = type_(c, 'ringR2', '0.49');
  check(`circuitType ${JSON.stringify(circuitType)} still derives (R1+R2)`, c.r1r2 === '0.20', c.r1r2);
}

console.log('\n2. a circuit that IS typed ring keeps working');
let ring: Circuit = { circuitType: 'Ring final' };
ring = type_(ring, 'ringR1', '0.32');
ring = type_(ring, 'ringR2', '0.49');
check('ring final derives (R1+R2)', ring.r1r2 === '0.20', ring.r1r2);

console.log('\n3. the formula is GN3 (r₁ + r₂) / 4 — rₙ is not in it');
check('estimateRingR1R2(0.32, 0.49) = 0.2025', estimateRingR1R2(0.32, 0.49) === 0.2025);
let noN: Circuit = {};
noN = type_(noN, 'ringR1', '0.80');
noN = type_(noN, 'ringR2', '0.80');
check('rₙ absent does not block the derivation', noN.r1r2 === '0.40', noN.r1r2);

console.log('\n4. a MANUALLY typed (R1+R2) is never overwritten');
let manual: Circuit = { r1r2: '0.99' };
manual = type_(manual, 'ringR1', '0.32');
manual = type_(manual, 'ringR2', '0.49');
check('manual 0.99 survives', manual.r1r2 === '0.99', manual.r1r2);

console.log('\n5. an N/A limitation is respected (ELE-1238)');
let na: Circuit = { r1r2: 'N/A' };
na = type_(na, 'ringR1', '0.32');
na = type_(na, 'ringR2', '0.49');
check('N/A is left alone', na.r1r2 === 'N/A', na.r1r2);

console.log('\n6. per-keystroke commits keep tracking, not freeze on the first prefix');
let k: Circuit = {};
k = type_(k, 'ringR1', '0.3');
k = type_(k, 'ringR2', '0.4');
const afterPrefix = k.r1r2;
k = type_(k, 'ringR2', '0.49');
check('re-derives as the reading is completed', k.r1r2 === '0.20', `${afterPrefix} -> ${k.r1r2}`);

console.log('\n7. clearing a reading clears a previously DERIVED value');
let clear: Circuit = {};
clear = type_(clear, 'ringR1', '0.32');
clear = type_(clear, 'ringR2', '0.49');
clear = type_(clear, 'ringR2', '');
check('derived value cleared, not left stale', clear.r1r2 === '', JSON.stringify(clear.r1r2));

console.log('\n8. Zs follows from (R1+R2) + Zdb, on an untyped circuit too');
let zs: Circuit = { circuitType: 'Sockets' };
zs = type_(zs, 'ringR1', '0.32', 0.35);
zs = type_(zs, 'ringR2', '0.49', 0.35);
check('(R1+R2) derived', zs.r1r2 === '0.20', zs.r1r2);
check('Zs = 0.35 + 0.20 = 0.55', zs.zs === '0.55', zs.zs);

console.log('\n9. a non-trigger field changes nothing');
const before: Circuit = { ringR1: '0.32', ringR2: '0.49' };
const after = type_(before, 'circuitType', 'Lighting');
check('untouched by an unrelated field', after.r1r2 === undefined, JSON.stringify(after.r1r2));

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}\n`);
process.exit(failures === 0 ? 0 : 1);
