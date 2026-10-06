/**
 * Section D's written record — the key is complete and self-consistent.
 *
 * AM2 plan, 6 Oct 2026. Section D asks for NET's record (type, where, fix,
 * proving test) instead of one pick from four. Run with:
 *   npm run check:am2-fault-record
 */
import {
  CONDUCTOR_OPTIONS,
  FAULT_RECORD,
  FAULT_SCENARIOS,
  allowedProving,
  markRecord,
  pickSessionFaults,
} from '@/data/am2-fault-scenarios';

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};
const ok = (msg: string) => console.log(`  ✓ ${msg}`);

const live = FAULT_SCENARIOS.filter((s) => !s.retired);

console.log('Record key');
for (const s of live) {
  const key = FAULT_RECORD[s.id];
  if (!key) {
    fail(`${s.id}: no record key`);
    continue;
  }
  const points = new Set(s.testPoints.map((p) => p.id));
  if (!key.at.length) fail(`${s.id}: no accepted location`);
  for (const at of key.at) {
    if (at.length < 1 || at.length > 2) fail(`${s.id}: a location must be one or two points`);
    for (const id of at) if (!points.has(id)) fail(`${s.id}: point "${id}" isn't on its diagram`);
  }
  const opts = CONDUCTOR_OPTIONS[s.circuitType];
  if (!opts) fail(`${s.id}: no conductor options for ${s.circuitType}`);
  if (!key.conductors.length) fail(`${s.id}: no accepted conductors`);
  for (const set of key.conductors)
    for (const c of set)
      if (!opts?.includes(c)) fail(`${s.id}: conductor "${c}" isn't offered for ${s.circuitType}`);
  if (!s.rectification.trim()) fail(`${s.id}: no rectification`);
  if (!key.required.length || key.required.some((g) => !g.length))
    fail(`${s.id}: empty proving set`);
  const allowed = allowedProving(s);
  for (const g of key.required)
    for (const t of g) if (!allowed.includes(t)) fail(`${s.id}: required "${t}" isn't allowed`);
  if (!key.why.trim()) fail(`${s.id}: no reason for the proving tests`);
}
for (const id of Object.keys(FAULT_RECORD))
  if (!live.some((s) => s.id === id)) fail(`record key "${id}" has no live scenario`);
ok(`${live.length} live scenarios keyed`);

console.log('Marking');
for (const s of live) {
  const key = FAULT_RECORD[s.id];
  if (!key) continue;
  const right = {
    type: s.correctFaultType,
    at: [...key.at[0]].reverse(), // order of taps doesn't matter
    conductors: key.conductors[0],
    fix: s.rectification,
    proving: key.required.map((g) => g[0]),
  };
  const m = markRecord(s, right);
  if (!m.type || !m.where || !m.fix || !m.proving)
    fail(`${s.id}: the key's own answer doesn't mark right (${JSON.stringify(m)})`);
  const blank = markRecord(s, null);
  if (blank.type || blank.where || blank.fix || blank.proving)
    fail(`${s.id}: no record marked right`);
  // A test that doesn't apply to the circuit makes the proving part wrong.
  const stray = (['continuity_ring', 'phase_sequence', 'insulation', 'voltage'] as const).find(
    (t) => !allowedProving(s).includes(t)
  );
  if (stray && markRecord(s, { ...right, proving: [...right.proving, stray] }).proving)
    fail(`${s.id}: "${stray}" doesn't apply but was accepted`);
  // The right point with the wrong conductor isn't the location.
  const wrongC = CONDUCTOR_OPTIONS[s.circuitType]?.find((c) => !key.conductors.flat().includes(c));
  if (wrongC && markRecord(s, { ...right, conductors: [wrongC] }).where)
    fail(`${s.id}: wrong conductor accepted`);
}
ok('the key marks right; blanks, wrong conductors and stray tests mark wrong');

console.log('Repair options');
{
  let sittings = 0;
  for (let i = 0; i < 300; i++)
    for (const s of pickSessionFaults(7)) {
      sittings++;
      const opts = s.rectificationOptions ?? [];
      if (opts.length !== 4) fail(`${s.id}: ${opts.length} repair options, not 4`);
      if (opts.filter((o) => o === s.rectification).length !== 1)
        fail(`${s.id}: the right repair isn't there exactly once`);
      if (new Set(opts).size !== opts.length) fail(`${s.id}: repeated repair option`);
      for (const o of opts) {
        if (o === s.rectification) continue;
        const from = FAULT_SCENARIOS.find((x) => x.rectification === o);
        if (from && from.correctFaultType === s.correctFaultType)
          fail(
            `${s.id}: distractor from ${from.id} is the same fault type — it could be right too`
          );
      }
    }
  ok(`${sittings} faults dealt: 4 repair options, one right, distractors of another fault type`);
}

if (failures) {
  console.error(`\n${failures} problem${failures === 1 ? '' : 's'}`);
  process.exit(1);
}
console.log('\nSection D record checks passed');
