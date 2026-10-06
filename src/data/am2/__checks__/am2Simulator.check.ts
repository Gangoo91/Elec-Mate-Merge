/**
 * AM2 simulator — rig data, guides, marking and drills (AM2 plan, Phase 5).
 *
 *   npm run check:am2-simulator
 *
 * The rig data drifted from the book before (6 A Type B at 7.67 Ω, 40 A Type B
 * at 1.04 Ω, a 4 mm² cooker with a 2.5 mm² cpc, a ring with no RCD, a "Cat 6"
 * circuit tested like a mains one). This fails the build if anything like that
 * comes back.
 *
 *  1. Rig: every max Zs equals Table 41.3; every expected Zs = Ze + R₁+R₂;
 *     twin-and-earth cpc sizes are the ones the cable has; sockets ≤ 32 A
 *     have 30 mA RCD protection (Reg 411.3.3); every test point a test uses
 *     offers that range.
 *  2. Every required test has a "How to do it" guide and a one-line pass.
 *  3. Marking: a perfect run scores 100; an empty schedule doesn't.
 *  4. Drills: every kind builds questions with one right answer and no
 *     repeated options.
 *  5. Fault scenarios: a short circuit's abnormal insulation reading is low
 *     enough to explain a device tripping (≤ 0.01 MΩ ≈ 23 mA at 230 V).
 */
import { ASSESSMENT_BOARD_ISOLATION } from '@/data/am2/safeIsolationScenarios';
import { PRACTICE_BAY, markRisk, type RiskAnswer } from '@/data/am2/safeWorking';
import { AM2_SECTIONS, buildSections } from '@/hooks/am2/useAM2Sections';
import { acState, buildEpaReadiness, epaRouteFor, parsePortfolioAcRef } from '@/lib/epa/readiness';
import { AM2_RIG_CIRCUITS } from '@/data/am2RigCircuits';
import { getMcbZsLimit } from '@/data/zsLimits';
import { getTestGuide, passShort } from '@/data/am2TestLearning';
import { generateReading } from '@/data/mftReadingEngine';
import {
  REMARKS,
  REMARK_OPTIONS,
  adjustForRingPosition,
  answerKey,
  applyProblem,
  boxFor,
  markRun,
  matchTest,
  seedProblems,
} from '@/data/am2/sectionBRules';
import { DRILLS, buildDrill, type DrillKind } from '@/data/am2/sectionBDrills';
import { INSPECTION_ITEMS, seedInspection } from '@/data/am2/sectionBInspection';
import {
  BONDING_CSA,
  BONDS,
  BOND_OK_MAX,
  bondReading,
  bondSound,
  seedBonding,
  type BondFault,
} from '@/data/am2/sectionBBonding';
import { FAULT_SCENARIOS, pickSessionFaults } from '@/data/am2-fault-scenarios';
import { buildAM2Paper } from '@/data/apprentice-courses/am2/am2Paper';
import { SAFE_ISOLATION_SCENARIOS } from '@/data/am2/safeIsolationScenarios';
import type { EICTestResult, TestReading } from '@/types/am2-testing-simulator';
import { FIX_OPTIONS, resolveFix, type FixRecord } from '@/data/am2/sectionBRectify';
import {
  EMPTY_ORIGIN,
  SEQ_RIGHT,
  ipfFrom,
  pfcReading,
  seqReading,
  zeReading,
} from '@/data/am2/sectionBOrigin';
import { EMPTY_FUNCTIONAL, FUNC_ITEMS, funcSound } from '@/data/am2/sectionBFunctional';
import { CERT_FIELDS, DETAIL_GROUPS, certKey, detailsKey } from '@/data/am2/sectionBDetails';
import { conductorResistance } from '@/data/conductorResistance';
import { INITIAL_STATE, reducer } from '@/hooks/am2/useTestingSimulator';
import type { TestingSimulatorState } from '@/types/am2-testing-simulator';

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};
const ok = (msg: string) => console.log(`  ✓ ${msg}`);

// ── 1. Rig ──────────────────────────────────────────────────
console.log('Rig data');
const TE_CPC: Record<string, string> = {
  '1.5': '1.0',
  '2.5': '1.5',
  '4': '1.5',
  '6': '2.5',
  '10': '4',
};
for (const c of AM2_RIG_CIRCUITS) {
  const table = getMcbZsLimit(c.mcbType === 'B' ? 'typeB' : 'typeC', c.mcbRating)?.maxZs;
  if (table !== c.maxZs) fail(`circuit ${c.id}: max Zs ${c.maxZs} ≠ Table 41.3 ${table}`);
  const expect = Math.round((c.nominalValues.ze + c.nominalValues.r1r2) * 100) / 100;
  if (Math.abs(expect - c.nominalValues.zs) > 0.01)
    fail(`circuit ${c.id}: nominal Zs ${c.nominalValues.zs} ≠ Ze + R₁+R₂ = ${expect}`);
  if (c.cableType.includes('T&E') && TE_CPC[c.liveMm2] && TE_CPC[c.liveMm2] !== c.cpcMm2)
    fail(
      `circuit ${c.id}: ${c.liveMm2} mm² T&E has a ${TE_CPC[c.liveMm2]} mm² cpc, data says ${c.cpcMm2}`
    );
  if (c.cableType.includes('FP200') && c.cpcMm2 !== c.liveMm2)
    fail(`circuit ${c.id}: FP200 has a full-size cpc (${c.liveMm2} mm²), data says ${c.cpcMm2}`);
  if (c.testPoints.some((p) => p.type === 'fire_panel') && (c.irMin ?? 1) < 2)
    fail(`circuit ${c.id}: fire alarm wiring needs 2.0 MΩ (BS 5839-1 36.1), set ${c.irMin ?? 1}`);
  // R₂ must sit in the cable's own line:cpc ratio — catches figures worked
  // for one cable landing on another circuit (it happened, 6 Oct).
  const ohmKm: Record<string, number> = {
    '1.0': 18.1,
    '1.5': 12.1,
    '2.5': 7.41,
    '4': 4.61,
    '6': 3.08,
  };
  const rl = ohmKm[c.liveMm2];
  const rc = ohmKm[c.cpcMm2];
  if (rl && rc && c.diagramLayout !== 'ring' && c.nominalValues.r2 != null) {
    const want = c.nominalValues.r1r2 * (rc / (rl + rc));
    if (Math.abs(want - c.nominalValues.r2) > 0.03)
      fail(
        `circuit ${c.id}: R₂ ${c.nominalValues.r2} doesn't fit ${c.liveMm2}/${c.cpcMm2} (expected ≈ ${want.toFixed(2)} from R₁+R₂ ${c.nominalValues.r1r2})`
      );
  }
  const sockets = c.testPoints.some((p) => p.type === 'socket');
  if (sockets && c.mcbRating <= 32 && !(c.hasRcd && (c.rcdRating ?? 99) <= 30))
    fail(`circuit ${c.id}: socket-outlets ≤ 32 A without 30 mA RCD protection (Reg 411.3.3)`);
  for (const t of c.requiredTests) {
    const pt = c.testPoints.find((p) => p.id === t.testPointId);
    if (!pt?.availableTests.includes(t.dialPosition))
      fail(
        `circuit ${c.id}: ${t.id} needs ${t.dialPosition} at ${t.testPointId}, not offered there`
      );
  }
}
ok(`${AM2_RIG_CIRCUITS.length} circuits checked`);

// ── 2. Guides ───────────────────────────────────────────────
console.log('Guides');
let guides = 0;
for (const c of AM2_RIG_CIRCUITS)
  for (const t of c.requiredTests) {
    if (!getTestGuide(c, t)) fail(`no guide for ${t.id}`);
    if (!passShort(c, t)) fail(`no pass line for ${t.id}`);
    guides++;
  }
ok(`${guides} tests have a guide and a pass line`);

// ── 3. Marking ──────────────────────────────────────────────
console.log('Marking');
let seed = 7;
const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const seeded = seedProblems('assessment', rng);
const completed: Record<number, string[]> = {};
const readings: Record<number, TestReading[]> = {};
for (const c of AM2_RIG_CIRCUITS) {
  completed[c.id] = [];
  readings[c.id] = [];
  for (const t of [...c.requiredTests].sort((a, b) => a.gn3Step - b.gn3Step)) {
    const subs: (string | undefined)[] = [t.subTest];
    for (const sub of subs) {
      const r = generateReading({
        circuit: c,
        testPointId: t.testPointId,
        dialPosition: t.dialPosition,
        subTest: sub,
      }) as TestReading;
      readings[c.id].push(applyProblem({ ...r, circuitId: c.id, subTest: sub }, c, seeded));
    }
    completed[c.id].push(t.id);
  }
}
const blank = (id: number): EICTestResult => ({
  circuitNumber: String(id),
  ringR1: '',
  ringRn: '',
  ringR2: '',
  r1r2: '',
  r2: '',
  irTestVoltage: '',
  irLiveLive: '',
  irLiveEarth: '',
  polarity: '',
  maxMeasuredZs: '',
  rcdDisconnectionTime: '',
  rcdTestButton: '',
  afddTest: '',
  remarks: '',
});
// Remark-only: every planted problem recorded, none put right.
const remarkOnly = AM2_RIG_CIRCUITS.map((c) => {
  const row = { ...blank(c.id), ...answerKey(c, readings[c.id]) } as EICTestResult;
  const p = seeded.find((s) => s.circuitId === c.id);
  if (p) row.remarks = REMARKS[p.kind];
  return row;
});
const m1r = markRun({
  mode: 'assessment',
  completed,
  readings,
  sheet: remarkOnly,
  seeded,
  runMistakes: [],
});
if (m1r.problems.got !== seeded.length)
  fail(`remark-only: problems ${m1r.problems.got}/${m1r.problems.of}, expected one each`);
if (m1r.mistakes.filter((m) => m.tag === 'not_rectified').length !== seeded.length)
  fail('remark-only: each problem left unrepaired should be a not_rectified mistake (644.1.1)');

// The perfect run: each problem put right (643.1 stale tests retaken), no remark needed.
const fixedSeeded = seeded.map((p) => ({ ...p, fixedAt: 1 }));
const fixes: FixRecord[] = [];
const fixedReadings: Record<number, TestReading[]> = {};
for (const c of AM2_RIG_CIRCUITS) {
  fixedReadings[c.id] = [...readings[c.id]];
  const p = seeded.find((x) => x.circuitId === c.id);
  if (!p) continue;
  const opt = FIX_OPTIONS.find((o) => o.cures === p.kind)!;
  const r = resolveFix(c, opt.id, seeded, EMPTY_ORIGIN, EMPTY_FUNCTIONAL);
  if (r.target !== `problem:${p.testId}`)
    fail(`${opt.id} didn't resolve to circuit ${c.id}'s ${p.kind}`);
  if (!r.stale.includes(p.testId))
    fail(`${p.kind}: the failed test itself isn't made stale (643.1)`);
  fixes.push({
    circuitId: c.id,
    optionId: opt.id,
    right: true,
    target: r.target,
    at: 1,
    stale: r.stale,
  });
  fixedReadings[c.id] = fixedReadings[c.id].map((x) =>
    r.stale.includes(matchTest(c, x)?.id ?? '') ? { ...x, stale: true } : x
  );
  for (const id of r.stale) {
    const t = c.requiredTests.find((x) => x.id === id)!;
    const g = generateReading({
      circuit: c,
      testPointId: t.testPointId,
      dialPosition: t.dialPosition,
      subTest: t.subTest,
    }) as TestReading;
    fixedReadings[c.id].push(applyProblem({ ...g, circuitId: c.id }, c, fixedSeeded));
  }
}
const perfect = AM2_RIG_CIRCUITS.map(
  (c) => ({ ...blank(c.id), ...answerKey(c, fixedReadings[c.id]) }) as EICTestResult
);
const m1 = markRun({
  mode: 'assessment',
  completed,
  readings: fixedReadings,
  sheet: perfect,
  seeded: fixedSeeded,
  runMistakes: [],
  fixes,
});
if (m1.overall !== 100)
  fail(`perfect run scored ${m1.overall}% (${m1.mistakes.map((m) => m.tag).join(', ')})`);
// Stale readings don't count: a retaken reading replaces the one before the repair.
for (const c of AM2_RIG_CIRCUITS)
  for (const k of Object.values(answerKey(c, fixedReadings[c.id])))
    if (
      fixedReadings[c.id].some(
        (x) =>
          x.stale &&
          x.displayValue === k &&
          !fixedReadings[c.id].some((y) => !y.stale && y.displayValue === k)
      )
    )
      fail(`circuit ${c.id}: the answer key used a reading taken before the repair`);
// Put right but not retested: half marks and a not_retested mistake.
const unretested = Object.fromEntries(
  AM2_RIG_CIRCUITS.map((c) => {
    const f = fixes.find((x) => x.circuitId === c.id);
    return [c.id, completed[c.id].filter((id) => !f?.stale.includes(id))];
  })
);
const m1u = markRun({
  mode: 'assessment',
  completed: unretested,
  readings: fixedReadings,
  sheet: perfect,
  seeded: fixedSeeded,
  runMistakes: [],
  fixes,
});
if (m1u.problems.got !== seeded.length || !m1u.mistakes.some((m) => m.tag === 'not_retested'))
  fail(`put right, not retested: problems ${m1u.problems.got}/${m1u.problems.of}`);
// A repair where there was no such fault costs a mark.
const clean = AM2_RIG_CIRCUITS.find((c) => !seeded.some((p) => p.circuitId === c.id))!;
const m1w = markRun({
  mode: 'assessment',
  completed,
  readings: fixedReadings,
  sheet: perfect,
  seeded: fixedSeeded,
  runMistakes: [],
  fixes: [
    ...fixes,
    { circuitId: clean.id, optionId: 'bigger_device', right: false, at: 2, stale: [] },
  ],
});
if (m1w.overall >= 100 || !m1w.mistakes.some((m) => m.tag === 'wrong_fix'))
  fail('a wrong repair cost nothing');
ok(
  `put right + retested ${m1.problems.got}/${m1.problems.of}; remark only ${m1r.problems.got}; not retested ${m1u.problems.got}; wrong repair costs a mark`
);
const m2 = markRun({
  mode: 'assessment',
  completed,
  readings,
  sheet: AM2_RIG_CIRCUITS.map((c) => blank(c.id)),
  seeded,
  runMistakes: [],
});
if (m2.overall >= 80) fail(`an empty schedule scored ${m2.overall}%`);
const notRight = m1.boxes.filter((b) => b.status !== 'right');
if (notRight.length)
  fail(
    `perfect run: review shows ${notRight.length} boxes not right (${notRight[0].circuitId}/${notRight[0].key})`
  );
if (m1.boxes.filter((b) => b.status === 'right').length !== m1.schedule.got)
  fail('review and schedule marks disagree on a perfect run');
if (m2.boxes.some((b) => b.status === 'right')) fail('empty schedule: review shows a box right');
const flagged = new Set(m1r.boxes.filter((b) => b.outside).map((b) => b.circuitId));
for (const p of seeded)
  if (!flagged.has(p.circuitId))
    fail(`planted ${p.kind} on circuit ${p.circuitId} not flagged outside its limit in the review`);
for (const id of flagged)
  if (!seeded.some((p) => p.circuitId === id))
    fail(`circuit ${id} flagged outside a limit in the review with nothing planted`);
ok(`perfect run ${m1.overall}%, empty schedule ${m2.overall}%, review matches the marks`);

// Inspection: judged right = full marks; passing everything loses one per defect.
const insp = seedInspection('assessment', rng);
const rightAnswers = Object.fromEntries(
  INSPECTION_ITEMS.map((i) => [i.id, insp.defects.includes(i.id) ? 'defect' : 'ok'] as const)
);
const allOk = Object.fromEntries(INSPECTION_ITEMS.map((i) => [i.id, 'ok'] as const));
const base = {
  mode: 'assessment' as const,
  completed,
  readings: fixedReadings,
  sheet: perfect,
  seeded: fixedSeeded,
  runMistakes: [],
  fixes,
};
const m3 = markRun({ ...base, inspection: { ...insp, answers: rightAnswers, done: true } });
const m4 = markRun({ ...base, inspection: { ...insp, answers: allOk, done: true } });
if (m3.overall !== 100) fail(`perfect run with a right inspection scored ${m3.overall}%`);
if (m4.inspection.got !== INSPECTION_ITEMS.length - insp.defects.length)
  fail(
    `passing every check scored ${m4.inspection.got}, expected ${INSPECTION_ITEMS.length - insp.defects.length}`
  );
if (m4.mistakes.filter((m) => m.tag === 'missed_defect').length !== insp.defects.length)
  fail('each missed defect should be one missed_defect mistake');
if (insp.defects.length < 2 || insp.defects.length > 4)
  fail(`${insp.defects.length} defects planted`);
ok(
  `inspection: right ${m3.inspection.got}/${m3.inspection.of}, all-acceptable ${m4.inspection.got}/${m4.inspection.of}`
);

// Bonding: sound clamps read a few hundredths once nulled; a fault doesn't.
for (const fault of [
  null,
  { bond: 'gas', kind: 'high' },
  { bond: 'water', kind: 'open' },
] as BondFault[]) {
  for (const b of BONDS) {
    const r = bondReading(b.id, fault, true, rng);
    const sound = bondSound(b.id, fault);
    const v = r === 'OL' ? Infinity : Number(r);
    if (sound !== v <= BOND_OK_MAX) fail(`bonding ${b.id}: reading ${r} vs sound=${sound}`);
    if (!sound && v <= BOND_OK_MAX) fail(`bonding ${b.id}: fault reads ${r}, looks sound`);
  }
}
const bondRight = {
  ...seedBonding('assessment', () => 0.1),
  readings: { water: '0.03', gas: '0.04', supp: '0.02' },
  csa: BONDING_CSA,
  done: true,
};
bondRight.verdicts = Object.fromEntries(
  BONDS.map((b) => [b.id, bondSound(b.id, bondRight.fault) ? 'ok' : 'fault'])
);
const m5 = markRun({ ...base, bonding: bondRight });
if (m5.bonding.got !== m5.bonding.of || m5.overall !== 100)
  fail(`a right bonding run scored ${m5.bonding.got}/${m5.bonding.of}, overall ${m5.overall}%`);
ok(`bonding readings match their faults; right bonding ${m5.bonding.got}/${m5.bonding.of}`);

// A sound ring never shows r₁ and rₙ more than 0.05 Ω apart (GN3) — a learner
// who rightly remarked on one would otherwise be marked wrong.
const ring = AM2_RIG_CIRCUITS.find((c) => c.diagramLayout === 'ring')!;
let ringBad = 0;
for (let n = 0; n < 400; n++) {
  const r1 = generateReading({
    circuit: ring,
    testPointId: 'c1-db',
    dialPosition: 'CONTINUITY',
    subTest: 'r1',
  });
  const rn = generateReading({
    circuit: ring,
    testPointId: 'c1-db',
    dialPosition: 'CONTINUITY',
    subTest: 'rn',
  });
  if (Math.abs(r1.value - rn.value) > 0.05) ringBad++;
}
if (ringBad) fail(`${ringBad} of 400 sound rings read r₁ and rₙ more than 0.05 Ω apart`);

// Ring test (GN3 2.6.6): step 2 the same at every socket ≈ (r₁ + rₙ)/4; step 3
// in 2.5/1.5 rises to ≈ (r₁ + r₂)/4 at the mid-point; step 2 has no column.
{
  const nv = ring.nominalValues;
  const sockets = ring.testPoints.filter((p) => p.type === 'socket');
  const at = (sub: string, pt: string) =>
    adjustForRingPosition(ring, {
      ...(generateReading({
        circuit: ring,
        testPointId: pt,
        dialPosition: 'CONTINUITY',
        subTest: sub,
      }) as TestReading),
      circuitId: ring.id,
      subTest: sub,
    }).value;
  const step2 = sockets.map((p) => at('ln', p.id));
  const q2 = ((nv.ringR1 ?? 0) + (nv.ringRn ?? 0)) / 4;
  if (step2.some((v) => Math.abs(v - q2) > 0.02))
    fail(`ring step 2 not ≈ (r₁+rₙ)/4 = ${q2}: ${step2.join(', ')}`);
  const step3 = sockets.map((p) => at('r1r2', p.id));
  const mid = step3[Math.floor(step3.length / 2)];
  const q3 = ((nv.ringR1 ?? 0) + (nv.ringR2 ?? 0)) / 4;
  if (Math.abs(mid - q3) > 0.03)
    fail(`ring step 3 mid-point ${mid} not ≈ (r₁+r₂)/4 = ${q3.toFixed(3)}`);
  if (!(step3[0] < mid)) fail(`ring step 3 should rise towards the mid-point: ${step3.join(', ')}`);
  const lnTest = ring.requiredTests.find((t) => t.subTest === 'ln');
  if (!lnTest) fail('ring has no step 2 test');
  else if (
    boxFor(ring, {
      ...(generateReading({
        circuit: ring,
        testPointId: 'c1-s1',
        dialPosition: 'CONTINUITY',
        subTest: 'ln',
      }) as TestReading),
      circuitId: ring.id,
      subTest: 'ln',
    })
  )
    fail('ring step 2 was given a schedule box');
}
// Remarks: every plantable remark is offered, among others, no repeats.
for (const r of Object.values(REMARKS))
  if (!REMARK_OPTIONS.includes(r)) fail(`remark not offered: ${r}`);
if (new Set(REMARK_OPTIONS).size !== REMARK_OPTIONS.length) fail('repeated remark option');
if (REMARK_OPTIONS.length < Object.values(REMARKS).length + 4) fail('too few decoy remarks');

// Learn: inspection and bonding aren't marked; skipping them costs nothing.
const learnRun = markRun({
  ...base,
  mode: 'learn',
  inspection: { ...insp, answers: {} },
  bonding: bondRight,
});
if (
  learnRun.mistakes.some((m) =>
    ['not_inspected', 'missed_defect', 'false_defect', 'bonding_wrong'].includes(m.tag)
  )
)
  fail('a Learn run was marked on inspection or bonding');
// Skipping the inspection is one mistake, not ten.
const skipped = markRun({ ...base, inspection: { ...insp, answers: {} } });
if (
  skipped.mistakes.filter((m) => ['not_inspected', 'missed_defect', 'false_defect'].includes(m.tag))
    .length !== 1
)
  fail('skipping the inspection should be exactly one mistake');
// A figure written for a test never done is a wrong box.
const invented = perfect.map((r) => ({ ...r }));
const noRcd = AM2_RIG_CIRCUITS.find((c) => !c.hasRcd)!;
const partial = { ...completed, [noRcd.id]: [] as string[] };
const partialReadings = { ...readings, [noRcd.id]: [] };
const m6 = markRun({ ...base, completed: partial, readings: partialReadings, sheet: invented });
if (!m6.boxes.some((b) => b.circuitId === noRcd.id && b.key === 'r1r2' && b.status === 'wrong'))
  fail('a reading written in for a test never done should be marked wrong');
ok(
  'sound rings stay within 0.05 Ω; Learn unmarked on inspection/bonding; invented readings marked wrong'
);

// Section C: every dead-test pair is made of two different conductors, and
// a job's pairs cover every combination of its conductors (NET: test all of
// them) — a pair with an unknown conductor once made a job impossible.
for (const sc of SAFE_ISOLATION_SCENARIOS) {
  const cond = [...new Set(sc.testPairs.flatMap((p) => p.split('–')))];
  for (const p of sc.testPairs) {
    const [a, b] = p.split('–');
    if (!a || !b || a === b) fail(`${sc.id}: bad pair ${p}`);
  }
  const combos = (cond.length * (cond.length - 1)) / 2;
  if (combos !== sc.testPairs.length)
    fail(
      `${sc.id}: ${sc.testPairs.length} pairs listed for ${cond.length} conductors (${combos} combinations)`
    );
}
ok(`${SAFE_ISOLATION_SCENARIOS.length} isolation jobs: every combination of conductors listed`);

// Section E papers: AM2S v1 is 45 questions, the AM2 is 30 (NET manuals).
for (const n of [30, 45]) {
  const paper = buildAM2Paper({ count: n });
  if (paper.length !== n) fail(`a ${n}-question paper came out at ${paper.length}`);
  if (new Set(paper.map((q) => q.id)).size !== paper.length)
    fail(`repeated question in a ${n}-question paper`);
}
ok('Section E papers: 30 and 45 questions, no repeats');

// ── 4. Drills ───────────────────────────────────────────────
// ── Round 6: origin, functional, paperwork, the motor ──────
console.log('Origin, functional, paperwork');
{
  // The motor's values come from its cable: 15 m of 2.5 mm² line + 2.5 mm² cpc core.
  const motor = AM2_RIG_CIRCUITS.find((c) => c.phaseType === '3P')!;
  const r1r2 = Math.round(15 * (conductorResistance(2.5) * 2)) / 1000;
  if (Math.abs(motor.nominalValues.r1r2 - Math.round(r1r2 * 100) / 100) > 0.001)
    fail(
      `motor R₁+R₂ ${motor.nominalValues.r1r2} Ω doesn't match its cable (${r1r2.toFixed(3)} Ω)`
    );
  if (
    Math.abs(motor.nominalValues.zs - (motor.nominalValues.ze + motor.nominalValues.r1r2)) > 0.005
  )
    fail('motor Zs isn’t Ze + R₁+R₂');
  const ll = motor.requiredTests.filter((t) =>
    ['L1-L2', 'L2-L3', 'L3-L1'].includes(t.subTest ?? '')
  );
  if (ll.length !== 3) fail(`motor has ${ll.length} line-to-line insulation tests, not 3`);
  if (AM2_RIG_CIRCUITS.some((c) => c.requiredTests.some((t) => t.dialPosition === 'PFC')))
    fail('a circuit still carries its own PFC test — it is measured at the origin now');

  // Nothing done at the origin or the functional station: named as not done.
  const none = markRun({ ...base, origin: EMPTY_ORIGIN, functional: EMPTY_FUNCTIONAL });
  if (none.origin.got !== 0 || none.origin.of < 6)
    fail(`empty origin scored ${none.origin.got}/${none.origin.of}`);
  if (!none.mistakes.some((m) => m.tag === 'tests_not_done' && m.what.includes('Ze')))
    fail('Ze not measured isn’t named');
  if (!none.mistakes.some((m) => m.tag === 'tests_not_done' && m.what.startsWith('Functional')))
    fail('functional testing not done isn’t named');

  // A right origin: Ze with the earth off and the board dead, both currents, sequences judged.
  const zeOff = zeReading(true, rng);
  const zeOn = zeReading(false, rng);
  if (Number(zeOn) >= Number(zeOff))
    fail(`Ze with the earthing still on (${zeOn}) should read low`);
  const pscc = pfcReading('pscc', rng);
  const pefc = pfcReading('pefc', rng);
  if (ipfFrom(pscc, pefc) !== Math.max(Number(pscc) * 2, Number(pefc)).toFixed(2))
    fail('Ipf isn’t the greater of L–N × 2 and the PEFC (Appendix 14)');
  const phaseFault = { ...EMPTY_ORIGIN, phaseFault: true };
  if (seqReading('motor', phaseFault) === SEQ_RIGHT) fail('crossed lines at the motor read right');
  if (funcSound('dol', EMPTY_FUNCTIONAL, phaseFault))
    fail('a motor on the wrong sequence passed its DOL check');
  const originRight = {
    ...EMPTY_ORIGIN,
    ze: zeOff,
    zeHow: { earthOff: true, isolated: true },
    pscc,
    pefc,
    seq: { origin: { shown: SEQ_RIGHT, at: 1 }, motor: { shown: SEQ_RIGHT, at: 1 } },
    verdicts: { origin: 'ok', motor: 'ok' } as const,
  };
  const funcRight = {
    ...EMPTY_FUNCTIONAL,
    operated: Object.fromEntries(FUNC_ITEMS.map((i) => [i.id, 1])),
    verdicts: Object.fromEntries(FUNC_ITEMS.map((i) => [i.id, 'ok' as const])),
  };
  const zeWrong = markRun({
    ...base,
    origin: { ...originRight, ze: zeOn, zeHow: { earthOff: false, isolated: true } },
    functional: funcRight,
  });
  if (!zeWrong.mistakes.some((m) => m.tag === 'ze_method'))
    fail('Ze with the earthing on wasn’t marked');

  // Paperwork: right details and certificate = full marks; blank = none.
  const details = AM2_RIG_CIRCUITS.map((c) => detailsKey(c));
  const certificate = { ...certKey(originRight) } as Record<string, string>;
  const all = markRun({
    ...base,
    origin: originRight,
    functional: funcRight,
    details,
    certificate,
  });
  if (all.overall !== 100)
    fail(
      `a run right in every part scored ${all.overall}% (${all.mistakes.map((m) => m.tag).join(', ')})`
    );
  if (all.paperwork.of !== AM2_RIG_CIRCUITS.length * DETAIL_GROUPS.length + CERT_FIELDS.length)
    fail(`paperwork out of ${all.paperwork.of}`);
  const blankDetails = details.map((d) => ({
    ...d,
    ...Object.fromEntries(DETAIL_GROUPS.flatMap((g) => g.fields.map((f) => [f.key, '']))),
  }));
  const blankRun = markRun({
    ...base,
    origin: originRight,
    functional: funcRight,
    details: blankDetails,
    certificate: {},
  });
  if (blankRun.paperwork.got !== 0) fail(`blank paperwork scored ${blankRun.paperwork.got}`);
  if (blankRun.mistakes.filter((m) => m.tag === 'details_wrong').length !== AM2_RIG_CIRCUITS.length)
    fail('blank circuit details should be one details_wrong per circuit');
  // "Type B" and "B", "1.0" and "1" are the same entry.
  const typed = markRun({
    ...base,
    origin: originRight,
    functional: funcRight,
    details: details.map((d) => ({
      ...d,
      ocpdType: `Type ${d.ocpdType}`,
      liveMm2: d.liveMm2 === '1.5' ? '1.50' : d.liveMm2,
    })),
    certificate: { ...certificate, earthingArrangement: 'TN-C-S (PME)' },
  });
  if (typed.paperwork.got !== typed.paperwork.of)
    fail('equivalent entries marked wrong on the paperwork');
  // Learn: paperwork, origin and functional aren't marked.
  const learnAll = markRun({
    ...base,
    mode: 'learn',
    origin: EMPTY_ORIGIN,
    functional: EMPTY_FUNCTIONAL,
    details: blankDetails,
    certificate: {},
  });
  if (learnAll.paperwork.of || learnAll.origin.of || learnAll.functional.of)
    fail('Learn marked the paperwork, origin or functional checks');
  ok(
    `motor R₁+R₂ ${motor.nominalValues.r1r2} Ω from its cable; origin ${all.origin.got}/${all.origin.of}, functional ${all.functional.got}/${all.functional.of}, paperwork ${all.paperwork.got}/${all.paperwork.of}; everything right = ${all.overall}%`
  );
}

// ── Round 6: the reducer — repair, stale tests, retest ──────
console.log('Repairs through the reducer');
{
  const ring = AM2_RIG_CIRCUITS.find((c) => c.diagramLayout === 'ring')!;
  const rn = ring.requiredTests.find((t) => t.subTest === 'rn')!;
  const planted = [
    {
      kind: 'rn_mismatch' as const,
      circuitId: ring.id,
      testId: rn.id,
      value: 0.7,
      displayValue: '0.70',
    },
  ];
  let st: TestingSimulatorState = reducer(INITIAL_STATE, {
    type: 'SET_MODE',
    mode: 'assessment',
    seeded: planted,
    inspection: { defects: [], answers: {}, done: false },
    bonding: {
      fault: { bond: 'gas', kind: 'high' },
      rangeSet: true,
      nulled: true,
      readings: {},
      verdicts: {},
      csa: '',
      done: false,
    },
    origin: { ...EMPTY_ORIGIN, phaseFault: true },
    functional: EMPTY_FUNCTIONAL,
  });
  const take = (s: TestingSimulatorState, testId: string) => {
    const t = ring.requiredTests.find((x) => x.id === testId)!;
    const g = generateReading({
      circuit: ring,
      testPointId: t.testPointId,
      dialPosition: t.dialPosition,
      subTest: t.subTest,
    }) as TestReading;
    return reducer(s, {
      type: 'COMPLETE_TEST',
      reading: applyProblem({ ...g, circuitId: ring.id }, ring, s.seeded),
    });
  };
  for (const t of ring.requiredTests) st = take(st, t.id);
  const before = st.circuitProgress[ring.id].readings.find(
    (r) => matchTest(ring, r)?.id === rn.id
  )!;
  if (before.displayValue !== '0.70') fail(`planted rₙ read ${before.displayValue}`);
  // Energised: a repair is refused (done dead).
  const live = { ...st, energised: true };
  if (reducer(live, { type: 'RECTIFY', circuitId: ring.id, optionId: 'remake_neutral' }) !== live)
    fail('a repair went ahead with the board energised');
  // A wrong repair: recorded once — and it disturbs its own tests just as a
  // right one does, so the screen doesn't tell an Assessment candidate which
  // repair was right (a cure used to be the only thing that changed anything).
  let w = reducer(st, { type: 'RECTIFY', circuitId: ring.id, optionId: 'bigger_device' });
  w = reducer(w, { type: 'RECTIFY', circuitId: ring.id, optionId: 'bigger_device' });
  if (w.fixes.filter((f) => !f.right).length !== 1) fail('a repeated wrong repair counted twice');
  if (!w.circuitProgress[ring.id].readings.some((r) => r.stale))
    fail('a wrong repair changed nothing visible — it tells the learner the repair was wrong');
  if (w.seeded[0].fixedAt != null) fail('a wrong repair cured the planted problem');
  else ok('B: a wrong repair looks like a repair (its tests go stale) but cures nothing');
  // The right repair: rₙ and L–N stale, out of completed, flagged in the log.
  st = reducer(st, { type: 'RECTIFY', circuitId: ring.id, optionId: 'remake_neutral' });
  const p = st.circuitProgress[ring.id];
  const staleIds = ring.requiredTests
    .filter((t) => t.subTest === 'rn' || t.subTest === 'ln')
    .map((t) => t.id);
  if (staleIds.some((id) => p.completedTests.includes(id)))
    fail('stale tests still counted as done');
  if (!p.readings.some((r) => r.stale)) fail('old readings not flagged stale');
  if (st.seeded[0].fixedAt == null) fail('the planted problem wasn’t cleared');
  st = take(st, rn.id);
  const after = st.circuitProgress[ring.id].readings.filter(
    (r) => !r.stale && matchTest(ring, r)?.id === rn.id
  );
  if (after.length !== 1 || after[0].displayValue === '0.70')
    fail('rₙ after the repair still reads the fault');
  // Not yet retested L–N → not_retested; then retest it → full marks.
  const markOf = (s: TestingSimulatorState) =>
    markRun({
      mode: 'assessment',
      completed: Object.fromEntries(
        Object.entries(s.circuitProgress).map(([id, x]) => [Number(id), x.completedTests])
      ),
      readings: Object.fromEntries(
        Object.entries(s.circuitProgress).map(([id, x]) => [Number(id), x.readings])
      ),
      sheet: s.eic.testResults,
      seeded: s.seeded,
      runMistakes: [],
      fixes: s.fixes,
    });
  if (markOf(st).problems.got !== 1)
    fail(`put right, L–N not retaken: ${markOf(st).problems.got}/2`);
  st = take(
    st,
    staleIds.find((id) => id !== rn.id)!
  );
  if (markOf(st).problems.got !== 2) fail(`put right and retested: ${markOf(st).problems.got}/2`);
  // Earth off: energising refused.
  const off = reducer({ ...st, origin: { ...st.origin, earthOff: true } }, { type: 'ENERGISE' });
  if (off.energised || !off.mistakes.some((m) => m.tag === 'earth_left_off'))
    fail('energised with the main earthing conductor off');
  // Phase fault: the swap clears it and asks for the motor check again.
  const motor = AM2_RIG_CIRCUITS.find((c) => c.phaseType === '3P')!;
  const ph = reducer(
    {
      ...st,
      origin: {
        ...st.origin,
        seq: { motor: { shown: 'L1-L3-L2', at: 1 } },
        verdicts: { motor: 'fault' },
      },
    },
    { type: 'RECTIFY', circuitId: motor.id, optionId: 'swap_lines' }
  );
  if (ph.origin.phaseFixedAt == null || ph.origin.seq.motor)
    fail('swapping lines didn’t clear the phase fault and its old check');
  // Bonding: right repair clears the fault and the old reading; then retested and judged = the repair mark.
  let b = reducer(
    { ...st, bonding: { ...st.bonding, readings: { gas: '0.71' }, verdicts: { gas: 'fault' } } },
    { type: 'RECTIFY_BOND', bond: 'gas', optionId: 'remake_bond' }
  );
  if (b.bonding.fault || !b.bonding.fixedFault || b.bonding.readings.gas)
    fail('bond repair didn’t clear it');
  b = {
    ...b,
    bonding: {
      ...b.bonding,
      readings: { water: '0.03', gas: '0.04', supp: '0.02' },
      verdicts: { water: 'ok', gas: 'ok', supp: 'ok' },
      csa: BONDING_CSA,
    },
  };
  const bm = markRun({ ...base, bonding: b.bonding });
  if (bm.bonding.got !== bm.bonding.of)
    fail(`bond put right and retested: ${bm.bonding.got}/${bm.bonding.of}`);
  ok(
    'repairs: refused live, wrong repair once, stale tests retaken, earth-off energise refused, phase and bond repairs'
  );
}

console.log('Drills');
for (const k of Object.keys(DRILLS) as DrillKind[]) {
  const qs = buildDrill([k], 25, rng);
  if (!qs.length) fail(`drill ${k} built no questions`);
  for (const q of qs) {
    if (q.answer < 0 || q.answer >= q.options.length)
      fail(`drill ${k}: answer out of range — ${q.prompt}`);
    if (new Set(q.options).size !== q.options.length)
      fail(`drill ${k}: repeated option — ${q.prompt}`);
    if (q.options.length < 2) fail(`drill ${k}: fewer than two options — ${q.prompt}`);
  }
}
ok(`${Object.keys(DRILLS).length} drill kinds`);

// ── 5. Fault scenarios ──────────────────────────────────────
console.log('Fault scenarios');
for (const f of FAULT_SCENARIOS.filter((x) => !x.retired && x.faultType === 'short_circuit')) {
  for (const p of f.testPoints)
    for (const t of p.tests)
      if (t.isAbnormal && t.mode === 'insulation' && parseFloat(t.reading) > 0.01)
        fail(`${f.id}: abnormal IR ${t.reading} MΩ is too high for "${f.symptom.slice(0, 60)}…"`);
}
ok(`${FAULT_SCENARIOS.filter((x) => !x.retired).length} live scenarios`);
// The right answer mustn't sit in a fixed place: in the data it was B in most
// scenarios and never D, so always tapping B scored ~58%.
{
  const at = [0, 0, 0, 0];
  for (let i = 0; i < 200; i++)
    for (const f of pickSessionFaults(7)) at[f.diagnosisOptions.findIndex((o) => o.isCorrect)]++;
  const total = at.reduce((a, b) => a + b, 0);
  if (at.some((n) => n / total > 0.4 || n / total < 0.1))
    fail(`D answer positions are lopsided: ${at.join(' / ')}`);
  else ok(`D answer positions spread: A–D ${at.join(' / ')}`);
}

// ── A1. Safe working practices and planning ─────────────────
console.log('Safe working (A1)');
{
  const b = ASSESSMENT_BOARD_ISOLATION;
  const net = ['L1–L2', 'L1–L3', 'L1–N', 'L1–E', 'L2–L3', 'L2–N', 'L2–E', 'L3–N', 'L3–E', 'N–E'];
  if (b.testPairs.join() !== net.join())
    fail('A1: board isolation is not NET’s 10 combinations in order');
  else ok('A1: 10-point test, NET’s order, outgoing side');
  if (SAFE_ISOLATION_SCENARIOS.some((x) => x.id === b.id))
    fail('A1 board job leaked into Section C');
  if (!b.traps.some((t) => t.id === 'supplySide')) fail('A1: no wrong-side-of-the-switch trap');
  for (const o of PRACTICE_BAY) {
    const right: RiskAnswer = o.hazard
      ? { hazard: true, who: [...o.hazard.who], precaution: o.hazard.precautions[0] }
      : { hazard: false, who: [] };
    if (!markRisk(o, right).right) fail(`A1 ${o.id}: its own answer marks wrong`);
    const flipped: RiskAnswer = { hazard: !o.hazard, who: [], precaution: undefined };
    if (markRisk(o, flipped).right) fail(`A1 ${o.id}: the opposite call marks right`);
    if (o.hazard && markRisk(o, { ...right, precaution: o.hazard.precautions[1] }).right)
      fail(`A1 ${o.id}: a wrong precaution marks right`);
  }
  ok(`A1: risk assessment — ${PRACTICE_BAY.length} items mark as keyed`);
  if (AM2_SECTIONS[0].key !== 'A1' || AM2_SECTIONS.length !== 5)
    fail('A1 is not first of five sections');
}

// ── EPA readiness model ─────────────────────────────────────
console.log('EPA readiness');
{
  const allReady = buildSections(
    AM2_SECTIONS.flatMap((d) =>
      [0, 1].map(() => ({
        session_type: d.sessionType,
        overall_score: 100,
        completed_at: new Date().toISOString(),
      }))
    )
  );
  const full = buildEpaReadiness(
    allReady,
    {
      portfolio_signed_off: true,
      ojt_hours_verified: true,
      english_level2_achieved: true,
      maths_level2_achieved: true,
      employer_satisfied: true,
      provider_satisfied: true,
    },
    '5357',
    { totalACs: 10, evidenced: 10, signedOff: 10 }
  );
  if (full.score !== 100 || full.status !== 'gateway_ready')
    fail(`EPA: everything done scores ${full.score} (${full.status}), not 100`);
  else ok('EPA: everything done = 100, sign-offs done');
  const none = buildEpaReadiness(buildSections([]), null, '5357', null);
  if (none.score !== 0 || none.status !== 'starting')
    fail(`EPA: nothing done scores ${none.score}`);
  if (
    epaRouteFor('2365-03').kind !== 'none' ||
    epaRouteFor('5357').kind !== 'am2s' ||
    epaRouteFor('2357').kind !== 'am2'
  )
    fail('EPA: route mapping is wrong');
  if (parsePortfolioAcRef('1.1', ['204']) !== null) fail('EPA: a bare AC ref was placed in a unit');
  if (parsePortfolioAcRef('ELTP06 (Unit 317) AC 2.2', ['317'])?.unit_code !== '317')
    fail('EPA: bracketed unit not parsed');
  ok('EPA: routes, AC parsing and the 0–100 range');
  // The route comes from the ENROLLED code: 603/5982/1 (experienced worker)
  // maps to the 601/7345/2 AC rows but ends in the AM2E, ungraded.
  const ew = buildEpaReadiness(buildSections([]), null, '601/7345/2', null, '603/5982/1');
  if (ew.route.kind !== 'am2e' || ew.route.graded) fail('EPA: enrolled code ignored for the route');
  if (
    acState({ status: 'evidenced', evidence_count: 3 }, { assessor_verdict: 'referred' }) !== null
  )
    fail('EPA: a referred AC still counted');
  if (acState(undefined, { iqa_verdict: 'confirmed' }) !== 'signed_off')
    fail('EPA: an IQA-confirmed AC not counted as signed off');
  ok('EPA: route from the enrolled code; one per-AC rule (referred counts nothing)');
  // 19+ at the start, employer says English and maths aren't needed: those
  // two items are done without the qualifications (they used to block 100).
  const waived = buildEpaReadiness(
    buildSections([]),
    { english_maths_not_required: true },
    '5357',
    null
  );
  const em = waived.gateway.items.filter((i) => i.key === 'english' || i.key === 'maths');
  if (em.length !== 2 || em.some((i) => !i.done)) fail('EPA: waived English and maths not done');
  else ok('EPA: English and maths recorded as not required count as done');
}

if (failures) {
  console.error(`\n${failures} problem${failures === 1 ? '' : 's'}`);
  process.exit(1);
}
console.log('\nAll AM2 simulator checks passed');
