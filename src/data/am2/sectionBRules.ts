/**
 * Section B rules — modes, the dead-before-live rule, planted problems,
 * the answer key for the schedule, and the marking.
 *
 * Phase 1 of the AM2 plan (6 Oct 2026). Pure functions only, so the
 * reducer, the screens and the check script all use the same rules.
 *
 * Every limit used here is from BS 7671:2018+A4:2026 or GN3, checked this week:
 *   - r₁ and rₙ the same (GN3 2.6.6, step 1: compare with the expected resistance)
 *   - insulation resistance at least 1.0 MΩ at 500 V (Table 64)
 *   - measured Zs no more than 0.8 × Table 41.3 (Appendix 3)
 *   - RCD within 300 ms at IΔn, general non-delay type (Reg 643.8)
 *   - dead tests 643.2–643.6 in order before energising (Reg 643.1)
 */

import type {
  AM2RigCircuit,
  DialPosition,
  EICCircuitDetail,
  EICTestResult,
  RequiredTest,
  TestReading,
} from '@/types/am2-testing-simulator';
import { AM2_RIG_CIRCUITS, irMinFor, measuredZsMax } from '@/data/am2RigCircuits';
import { INSPECTION_ITEMS, type InspectionState } from '@/data/am2/sectionBInspection';
import { BONDING_CSA, BONDS, bondSound, type BondingState } from '@/data/am2/sectionBBonding';
import { SEQ_POINTS, SEQ_RIGHT, phaseFixed, type OriginState } from '@/data/am2/sectionBOrigin';
import {
  FUNC_ITEMS,
  funcFixed,
  funcSound,
  type FunctionalState,
} from '@/data/am2/sectionBFunctional';
import { FIX_OPTIONS, BOND_FIX_OPTIONS, type FixRecord } from '@/data/am2/sectionBRectify';
import {
  CERT_FIELDS,
  DETAIL_GROUPS,
  certKey,
  detailsKey,
  sameCert,
  sameEntry,
} from '@/data/am2/sectionBDetails';

// ── Modes ────────────────────────────────────────────────────

export type SimMode = 'learn' | 'practise' | 'assessment';

export const MODES: Record<
  SimMode,
  { label: string; blurb: string; points: string[]; counts: boolean }
> = {
  learn: {
    label: 'Learn',
    blurb: 'Every step prompted. The schedule fills itself in.',
    points: [
      'Range, leads and order shown',
      '"How to do it" on every test',
      'Scored so you can see how it went — not counted towards "ready"',
    ],
    counts: false,
  },
  practise: {
    label: 'Practise',
    blurb: 'No prompts. You choose, you fill in the schedule.',
    points: [
      'You pick the range, leads and order',
      'Some readings will be outside the limit — put them right and retest',
      'Guide still one tap away',
    ],
    counts: false,
  },
  assessment: {
    label: 'Assessment',
    blurb: 'No help, on the clock, marked at the end.',
    points: [
      'No prompts, no guide, no pass/fail on readings',
      'You judge every reading',
      'Counts towards "ready"',
    ],
    counts: true,
  },
};

// ── Live and dead ────────────────────────────────────────────

const LIVE: DialPosition[] = ['LOOP_ZS', 'RCD_30', 'RCD_100', 'RCD_300', 'PFC'];
export const isLiveDial = (d: DialPosition) => LIVE.includes(d);
export const isLiveTest = (t: RequiredTest) => isLiveDial(t.dialPosition);

/** Every dead test on every circuit done — the board can be energised. */
export function allDeadDone(completed: Record<number, string[]>): boolean {
  return AM2_RIG_CIRCUITS.every((c) =>
    c.requiredTests.filter((t) => !isLiveTest(t)).every((t) => completed[c.id]?.includes(t.id))
  );
}

export function deadDoneOn(c: AM2RigCircuit, completed: string[]): boolean {
  return c.requiredTests.filter((t) => !isLiveTest(t)).every((t) => completed.includes(t.id));
}

/** The next test this circuit can take, respecting dead-before-live. */
export function nextTestFor(
  c: AM2RigCircuit,
  completed: string[],
  energised: boolean
): RequiredTest | null {
  const sorted = [...c.requiredTests].sort((a, b) => a.gn3Step - b.gn3Step);
  return sorted.find((t) => !completed.includes(t.id) && (energised || !isLiveTest(t))) ?? null;
}

// ── Which leads / which test ─────────────────────────────────

export interface Connection {
  value: string; // subTest, '' for none
  label: string;
}

/** What you can connect for this range on this circuit. */
export function connectionsFor(c: AM2RigCircuit, dial: DialPosition): Connection[] {
  const ring = c.diagramLayout === 'ring';
  switch (dial) {
    case 'CONTINUITY':
      return [
        ...(ring
          ? [
              { value: 'r1', label: 'Line ends · r₁' },
              { value: 'rn', label: 'Neutral ends · rₙ' },
              { value: 'r2', label: 'cpc ends · r₂' },
              { value: 'ln', label: 'Line to neutral · cross-connected' },
            ]
          : []),
        { value: 'r1r2', label: 'Line to cpc · R₁+R₂' },
        // Offered on every circuit: listing it only where the circuit has its
        // own polarity test told the learner which ones did. Elsewhere R₁+R₂
        // proves polarity (column 26's tick); an extra check isn't marked.
        { value: 'polarity', label: 'Polarity' },
      ];
    case 'IR_250V':
    case 'IR_500V':
      // Three-phase with no neutral: each pair of lines (GN3 — between all
      // live conductors), and the lines joined to earth.
      return c.phaseType === '3P'
        ? [
            { value: 'L-E', label: 'Live to earth' },
            { value: 'L1-L2', label: 'L1 to L2' },
            { value: 'L2-L3', label: 'L2 to L3' },
            { value: 'L3-L1', label: 'L3 to L1' },
          ]
        : [
            { value: 'L-E', label: 'Live to earth' },
            { value: 'L-L', label: 'Live to live' },
          ];
    case 'RCD_30':
    case 'RCD_100':
    case 'RCD_300':
      return [
        { value: '', label: 'Trip test · 0°' },
        { value: 'rcd180', label: 'Trip test · 180°' },
        { value: 'test_button', label: 'Test button' },
      ];
    case 'LOOP_ZS':
      return [
        { value: 'hi', label: 'Two-wire · high current' },
        { value: 'notrip', label: 'Three-wire · no-trip' },
      ];
    default:
      return [];
  }
}

/** The required test this reading satisfies, if any. Loop method isn't part of the match. */
/** On a ring, the step 2 (L–N) and step 3 (R₁+R₂) readings and Zs are taken
 *  at EVERY socket — so any socket satisfies those tests. */
function ringSocketTest(
  c: AM2RigCircuit,
  r: Pick<TestReading, 'testPointId' | 'dialPosition' | 'subTest'>
) {
  if (c.diagramLayout !== 'ring') return null;
  const pt = c.testPoints.find((p) => p.id === r.testPointId);
  if (pt?.type !== 'socket') return null;
  if (r.dialPosition === 'LOOP_ZS')
    return c.requiredTests.find((t) => t.dialPosition === 'LOOP_ZS') ?? null;
  if (r.dialPosition === 'CONTINUITY' && (r.subTest === 'r1r2' || r.subTest === 'ln'))
    return c.requiredTests.find((t) => t.subTest === r.subTest) ?? null;
  return null;
}

/** How a reading at a ring socket differs from the mid-point (GN3 2.6.6):
 *  - step 2, line and neutral cross-connected (same size): the same at every socket;
 *  - step 3, line and cpc cross-connected in 2.5/1.5 cable: rises from about
 *    r₁r₂ ÷ (r₁ + r₂) near the board to about (r₁ + r₂) ÷ 4 at the mid-point;
 *  - live, Zs rises to a peak at the mid-point too. */
export function adjustForRingPosition(c: AM2RigCircuit, r: TestReading): TestReading {
  if (c.diagramLayout !== 'ring' || !ringSocketTest(c, r)) return r;
  const sockets = c.testPoints.filter((p) => p.type === 'socket');
  const k = sockets.findIndex((p) => p.id === r.testPointId) + 1;
  const x = k / (sockets.length + 1);
  const along = 4 * x * (1 - x); // 1 at the mid-point, lower towards the ends
  // Zs at a socket is Ze plus that socket's own R₁+R₂ — the step 3 curve —
  // so it never reads below Ze + R₁+R₂ (the guide's cross-check).
  const r1 = c.nominalValues.ringR1 ?? 0;
  const r2 = c.nominalValues.ringR2 ?? 0;
  const end = r1 + r2 ? (r1 * r2) / (r1 + r2) : c.nominalValues.r1r2;
  if (r.dialPosition === 'LOOP_ZS') {
    const r1r2Here = end + (c.nominalValues.r1r2 - end) * along;
    const v =
      Math.round((c.nominalValues.ze + r1r2Here + (r.value - c.nominalValues.zs)) * 100) / 100;
    return { ...r, value: v, displayValue: v.toFixed(2) };
  }
  if (r.dialPosition === 'CONTINUITY' && r.subTest === 'r1r2') {
    const v = Math.round((end + (r.value - end) * along) * 100) / 100;
    return { ...r, value: v, displayValue: v.toFixed(2) };
  }
  return r;
}

export function matchTest(
  c: AM2RigCircuit,
  r: Pick<TestReading, 'testPointId' | 'dialPosition' | 'subTest'>
) {
  const ringMatch = ringSocketTest(c, r);
  if (ringMatch) return ringMatch;
  // Loop method isn't part of which test it is. (The RCD's 180° trip is its
  // own required test — GN3 asks for both half-cycles.)
  const sub = r.dialPosition === 'LOOP_ZS' ? undefined : r.subTest || undefined;
  // R₁+R₂ and polarity can be taken at any point out on the circuit — the
  // guides say "at each point, ending at the furthest" — so any point beyond
  // the board counts for them. answerKey keeps the highest R₁+R₂.
  if (r.dialPosition === 'CONTINUITY' && (sub === 'r1r2' || sub === 'polarity')) {
    const pt = c.testPoints.find((p) => p.id === r.testPointId);
    if (pt && pt.type !== 'db') {
      const t = c.requiredTests.find((x) => x.dialPosition === 'CONTINUITY' && x.subTest === sub);
      if (t) return t;
    }
  }
  return (
    c.requiredTests.find(
      (t) =>
        t.testPointId === r.testPointId &&
        t.dialPosition === r.dialPosition &&
        (t.subTest ?? undefined) === sub
    ) ?? null
  );
}

// ── Planted problems ─────────────────────────────────────────

export type ProblemKind = 'rn_mismatch' | 'low_ir' | 'zs_over' | 'rcd_slow';

export interface SeededProblem {
  kind: ProblemKind;
  circuitId: number;
  testId: string;
  value: number;
  displayValue: string;
  /** When it was put right (Reg 643.1, 644.1.1). Readings after this are sound. */
  fixedAt?: number;
}

/** What goes in Remarks (column 31) for each problem. Worded plainly — no
 *  method or limit in the wording, which would hand over the answer. */
export const REMARKS: Record<ProblemKind, string> = {
  rn_mismatch: 'Ring r₁ and rₙ don’t match',
  low_ir: 'Insulation resistance below the minimum',
  zs_over: 'Zs above the maximum permitted',
  rcd_slow: 'RCD disconnection time too long',
};

/** The remarks a learner can pick from: the four that can be planted, mixed
 *  in with others that can't, so the list doesn't tell you what to look for. */
export const REMARK_OPTIONS: string[] = [
  ...Object.values(REMARKS),
  'Polarity incorrect',
  'R₁ + R₂ higher than expected',
  'Ring r₂ (cpc) open circuit',
  'RCD didn’t trip on its test button',
  'Prospective fault current above the device’s breaking capacity',
].sort((x, y) => x.localeCompare(y));

export const PROBLEM_UNIT: Record<ProblemKind, string> = {
  rn_mismatch: 'Ω',
  low_ir: 'MΩ',
  zs_over: 'Ω',
  rcd_slow: 'ms',
};

export const PROBLEM_WHY: Record<ProblemKind, string> = {
  rn_mismatch:
    'GN3 2.6.6: line and neutral are the same size and length, so r₁ and rₙ should read the same. A reading higher than expected suggests a poor termination.',
  low_ir: 'Table 64: at least 1.0 MΩ at 500 V for circuits up to 500 V.',
  zs_over: 'Appendix 3: a measured Zs must be no more than 0.8 × the Table 41.3 value.',
  rcd_slow: 'Reg 643.8: a general non-delay RCD must disconnect within 300 ms at IΔn.',
};

/** Why a planted problem is outside its limit — for the circuit it's on. */
export function problemWhy(p: SeededProblem): string {
  const c = AM2_RIG_CIRCUITS.find((x) => x.id === p.circuitId);
  if (p.kind === 'low_ir' && c && irMinFor(c) > 1)
    return `Fire alarm cables: ${irMinFor(c).toFixed(1)} MΩ at 500 V — Reg 643.3.2's note points fire alarm wiring to BS 5839-1, stricter than Table 64’s 1.0 MΩ.`;
  return PROBLEM_WHY[p.kind];
}

/** A test of this kind on a circuit, if the circuit has one. */
function testOn(c: AM2RigCircuit, kind: ProblemKind) {
  return c.requiredTests.find((t) =>
    kind === 'rn_mismatch'
      ? t.subTest === 'rn'
      : kind === 'low_ir'
        ? t.dialPosition.startsWith('IR') && t.subTest === 'L-E'
        : kind === 'zs_over'
          ? t.dialPosition === 'LOOP_ZS'
          : t.dialPosition.startsWith('RCD') && t.subTest !== 'test_button'
  );
}

/** Plant one problem of this kind on a circuit that hasn't got one yet —
 *  never two on a circuit, which has only one remarks box. Spread across
 *  every circuit that can carry it, so the places can't be learnt. */
function make(kind: ProblemKind, rng: () => number, taken: Set<number>): SeededProblem | null {
  const pool = AM2_RIG_CIRCUITS.filter((c) => !taken.has(c.id) && testOn(c, kind));
  if (!pool.length) return null;
  const c = pool[Math.floor(rng() * pool.length)];
  const t = testOn(c, kind)!;
  let v: number;
  let shown: string;
  switch (kind) {
    case 'rn_mismatch':
      v = Math.round(((c.nominalValues.ringRn ?? 0.52) + 0.12 + rng() * 0.08) * 100) / 100;
      shown = v.toFixed(2);
      break;
    case 'low_ir':
      // Fire alarm: 1.2–1.8 MΩ, which passes Table 64 but not BS 5839-1's
      // 2 MΩ — the trap is judging it against 1.0. Elsewhere 0.4–0.8 MΩ.
      v =
        irMinFor(c) > 1
          ? Math.round((1.2 + rng() * 0.6) * 10) / 10
          : Math.round((0.4 + rng() * 0.45) * 10) / 10;
      shown = v.toFixed(1);
      break;
    case 'zs_over': {
      // Over the measured limit (0.8 × Table 41.3) but under the table value —
      // the trap is passing it against the table.
      const lo = c.maxZs * 0.8 + 0.03;
      v = Math.round((lo + rng() * Math.max(0.01, c.maxZs - 0.04 - lo)) * 100) / 100;
      shown = v.toFixed(2);
      break;
    }
    default:
      v = 312 + Math.floor(rng() * 60);
      shown = String(v);
  }
  taken.add(c.id);
  return { kind, circuitId: c.id, testId: t.id, value: v, displayValue: shown };
}

export function seedProblems(mode: SimMode, rng: () => number = Math.random): SeededProblem[] {
  if (mode === 'learn') return [];
  const kinds: ProblemKind[] = ['rn_mismatch', 'low_ir', 'zs_over', 'rcd_slow'];
  for (let i = kinds.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [kinds[i], kinds[j]] = [kinds[j], kinds[i]];
  }
  const n = mode === 'assessment' ? 2 + Math.floor(rng() * 2) : 2;
  const taken = new Set<number>();
  const out: SeededProblem[] = [];
  for (const k of kinds) {
    if (out.length >= n) break;
    const p = make(k, rng, taken);
    if (p) out.push(p);
  }
  return out;
}

/** Apply a planted problem to a reading that hits its test. */
export function applyProblem(
  reading: TestReading,
  c: AM2RigCircuit,
  seeded: SeededProblem[]
): TestReading {
  const t = matchTest(c, reading);
  // A high rₙ also lifts the step 2 (L–N) readings: about a quarter of the rise.
  if (t?.subTest === 'ln') {
    const rn = seeded.find(
      (s) => s.circuitId === c.id && s.kind === 'rn_mismatch' && s.fixedAt == null
    );
    if (!rn) return reading;
    const v =
      Math.round((reading.value + (rn.value - (c.nominalValues.ringRn ?? rn.value)) / 4) * 100) /
      100;
    return { ...reading, value: v, displayValue: v.toFixed(2) };
  }
  const p = t && seeded.find((s) => s.testId === t.id && s.fixedAt == null);
  if (!p) return reading;
  return { ...reading, value: p.value, displayValue: p.displayValue, compliant: false };
}

/** Un-nulled leads add their own resistance to every continuity reading. */
export const LEAD_RESISTANCE = 0.2;

// ── Mistakes ─────────────────────────────────────────────────

export type MistakeTag =
  | 'wrong_point'
  | 'not_a_test'
  | 'out_of_order'
  | 'live_before_dead'
  | 'leads_not_nulled'
  | 'tripped_rcd'
  | 'one_half_cycle'
  | 'wrong_box'
  | 'empty_box'
  | 'missed_na'
  | 'missed_problem'
  | 'wrong_remark'
  | 'missed_defect'
  | 'false_defect'
  | 'inspect_first'
  | 'bonding_wrong'
  | 'not_inspected'
  | 'tests_not_done'
  | 'ze_method'
  | 'earth_left_off'
  | 'phase_wrong'
  | 'functional_wrong'
  | 'not_rectified'
  | 'not_retested'
  | 'wrong_fix'
  | 'details_wrong'
  | 'certificate_wrong';

export interface SimMistake {
  tag: MistakeTag;
  circuitId?: number;
  what: string;
  fix: string;
}

export const MISTAKE_LABEL: Record<MistakeTag, string> = {
  wrong_point: 'Range not available at that point',
  not_a_test: 'Test that isn’t on the schedule',
  out_of_order: 'Tests out of order',
  live_before_dead: 'Live and dead tests mixed up',
  leads_not_nulled: 'Leads not nulled',
  tripped_rcd: 'Tripped the RCD on a loop test',
  one_half_cycle: 'RCD tested on one half-cycle only',
  wrong_box: 'Reading in the wrong box',
  empty_box: 'Box left empty',
  missed_na: 'N/A not written',
  missed_problem: 'Problem not recorded',
  wrong_remark: 'Wrong remark',
  missed_defect: 'Defect missed on inspection',
  false_defect: 'Sound work called a defect',
  inspect_first: 'Tested before inspecting',
  bonding_wrong: 'Main bonding not tested or recorded right',
  not_inspected: 'Inspection not done',
  tests_not_done: 'Tests not done',
  ze_method: 'Ze measured the wrong way',
  earth_left_off: 'Main earthing conductor left off',
  phase_wrong: 'Phase sequence misjudged',
  functional_wrong: 'Functional check misjudged',
  not_rectified: 'Fault recorded but not put right',
  not_retested: 'Not retested after a repair',
  wrong_fix: 'Wrong repair',
  details_wrong: 'Circuit details wrong',
  certificate_wrong: 'Certificate details wrong',
};

// ── The schedule: answer key and marking ─────────────────────

type Key = keyof EICTestResult;

export const RESULT_COLS: { key: Key; col: number; label: string }[] = [
  { key: 'ringR1', col: 18, label: 'r₁' },
  { key: 'ringRn', col: 19, label: 'rₙ' },
  { key: 'ringR2', col: 20, label: 'r₂' },
  { key: 'r1r2', col: 21, label: 'R₁ + R₂' },
  { key: 'irTestVoltage', col: 23, label: 'IR test voltage' },
  { key: 'irLiveLive', col: 24, label: 'IR live–live' },
  { key: 'irLiveEarth', col: 25, label: 'IR live–earth' },
  { key: 'polarity', col: 26, label: 'Polarity' },
  { key: 'maxMeasuredZs', col: 27, label: 'Max Zs' },
  { key: 'rcdDisconnectionTime', col: 28, label: 'RCD time' },
  { key: 'rcdTestButton', col: 29, label: 'RCD button' },
];

/** Columns that are N/A on this circuit. */
export function naCols(c: AM2RigCircuit): Key[] {
  const out: Key[] = [];
  if (c.diagramLayout !== 'ring') out.push('ringR1', 'ringRn', 'ringR2');
  if (!c.hasRcd) out.push('rcdDisconnectionTime', 'rcdTestButton');
  return out;
}

/** Where a reading belongs on the schedule. */
export function boxFor(c: AM2RigCircuit, r: TestReading): Key | null {
  const t = matchTest(c, r);
  if (!t) return null;
  switch (t.dialPosition) {
    case 'CONTINUITY':
      // Step 2 of the ring test proves the ring; it has no column.
      if (t.subTest === 'ln') return null;
      return t.subTest === 'r1'
        ? 'ringR1'
        : t.subTest === 'rn'
          ? 'ringRn'
          : t.subTest === 'r2'
            ? 'ringR2'
            : t.subTest === 'polarity'
              ? 'polarity'
              : 'r1r2';
    case 'IR_250V':
    case 'IR_500V':
      return t.subTest === 'L-E' ? 'irLiveEarth' : 'irLiveLive';
    case 'LOOP_ZS':
      return 'maxMeasuredZs';
    case 'RCD_30':
    case 'RCD_100':
    case 'RCD_300':
      return t.subTest === 'test_button' ? 'rcdTestButton' : 'rcdDisconnectionTime';
    default:
      return null;
  }
}

/** What each box should say, from the readings actually taken. */
export function answerKey(c: AM2RigCircuit, readings: TestReading[]): Partial<Record<Key, string>> {
  const key: Partial<Record<Key, string>> = {};
  for (const k of naCols(c)) key[k] = 'N/A';
  const irNum = (v: string) => (v.startsWith('>') ? Number(v.slice(1)) + 0.1 : Number(v));
  // A reading taken before a repair that could have changed it doesn't count.
  for (const r of readings.filter((x) => !x.stale)) {
    const box = boxFor(c, r);
    if (!box) continue;
    if (box === 'polarity') key.polarity = '✓';
    else if (box === 'rcdTestButton') key.rcdTestButton = '✓';
    else if (box === 'r1r2' || box === 'maxMeasuredZs') {
      // Tested at more than one point (every socket on a ring): the highest is recorded.
      const prev = key[box];
      if (!prev || Number(r.displayValue) > Number(prev)) key[box] = r.displayValue;
    } else if (box === 'rcdDisconnectionTime') {
      // GN3: test at 0° and 180° and record the longer time.
      const prev = Number(key.rcdDisconnectionTime);
      if (!key.rcdDisconnectionTime || Number(r.displayValue) > prev)
        key.rcdDisconnectionTime = r.displayValue;
    } else if (box === 'irLiveLive' || box === 'irLiveEarth') {
      // Three-phase: one box for three line-to-line tests — the lowest goes in.
      const prev = key[box];
      if (!prev || irNum(r.displayValue) < irNum(prev)) key[box] = r.displayValue;
    } else key[box] = r.displayValue;
    if (box === 'irLiveEarth' || box === 'irLiveLive')
      key.irTestVoltage = r.dialPosition === 'IR_250V' ? '250' : '500';
  }
  // R₁+R₂ at each point with the link at the board is the polarity check (GN3).
  if (!key.polarity && key.r1r2 && !c.requiredTests.some((t) => t.subTest === 'polarity')) {
    key.polarity = '✓';
  }
  return key;
}

/** One box on the schedule, as marked — what the debrief shows box by box. */
export interface MarkedBox {
  circuitId: number;
  key: Key;
  col: number;
  label: string;
  /** What the learner wrote. */
  have: string;
  /** What belonged there: the reading taken, or N/A. Empty if never tested. */
  want: string;
  status: 'right' | 'wrong' | 'empty' | 'untested';
  /** The limit this box is judged against, in words, where there is one. */
  limit?: string;
  /** The reading was outside that limit, so the circuit needed a remark. */
  outside?: boolean;
}

/** The limit a box is judged against, and whether a value is outside it. */
export function boxLimit(
  c: AM2RigCircuit,
  k: Key,
  value: string
): { limit: string; outside: boolean } | null {
  const v = Number(value.replace(/[<>]/g, ''));
  const has = value !== '' && !Number.isNaN(v);
  switch (k) {
    case 'irLiveLive':
    case 'irLiveEarth': {
      const min = irMinFor(c);
      return {
        limit:
          min > 1
            ? `At least ${min.toFixed(1)} MΩ (fire alarm cables, BS 5839-1)`
            : 'At least 1.0 MΩ (Table 64)',
        outside: has && v < min,
      };
    }
    case 'maxMeasuredZs': {
      const max = measuredZsMax(c);
      return {
        limit: `No more than ${max.toFixed(2)} Ω (0.8 × ${c.maxZs.toFixed(2)} Ω, Appendix 3)`,
        outside: has && v > max,
      };
    }
    case 'rcdDisconnectionTime':
      return { limit: 'Within 300 ms at IΔn (Reg 643.8)', outside: has && v > 300 };
    case 'ringRn':
      return { limit: 'r₁ and rₙ should read the same (GN3 2.6.6)', outside: false };
    default:
      return null;
  }
}

export interface Marking {
  /** The visual inspection: a mark per check judged right. */
  inspection: { got: number; of: number };
  /** Main bonding: a mark per clamp tested, per clamp judged right, and the size recorded. */
  bonding: { got: number; of: number };
  testing: { got: number; of: number };
  schedule: { got: number; of: number };
  problems: { got: number; of: number };
  /** Ze, PSCC/PEFC and phase sequence at the origin. */
  origin: { got: number; of: number };
  /** Functional testing (Reg 643.10). */
  functional: { got: number; of: number };
  /** Circuit details (columns 3–16) and the certificate's supply details. */
  paperwork: { got: number; of: number };
  overall: number;
  mistakes: SimMistake[];
  /** Each planted problem: put right and retested (full marks), or only remarked. */
  caught: {
    problem: SeededProblem;
    caught: boolean;
    fixed?: boolean;
    retested?: boolean;
    remarked?: boolean;
  }[];
  boxes: MarkedBox[];
  /** Remarks (column 31) per circuit: what was written and what belonged. */
  remarks: { circuitId: number; have: string; want: string; right: boolean }[];
}

const same = (a = '', b = '') =>
  a.trim().replace(/\s/g, '').toLowerCase() === b.trim().replace(/\s/g, '').toLowerCase();

export function markRun(args: {
  mode: SimMode;
  completed: Record<number, string[]>;
  readings: Record<number, TestReading[]>;
  sheet: EICTestResult[];
  seeded: SeededProblem[];
  runMistakes: SimMistake[];
  inspection?: InspectionState;
  bonding?: BondingState;
  origin?: OriginState;
  functional?: FunctionalState;
  fixes?: FixRecord[];
  /** Columns 1–16 as the learner wrote them (Practise and Assessment). */
  details?: EICCircuitDetail[];
  /** The certificate's supply details, phase sequence included. */
  certificate?: Partial<Record<string, string>>;
}): Marking {
  const { completed, readings, sheet, seeded, runMistakes } = args;
  const fixes = args.fixes ?? [];
  // Learn isn't marked and doesn't require the inspection or the bonding, so
  // neither is counted there — skipping them would otherwise fill the weak
  // spots with inspection "mistakes" from runs that never asked for it.
  const inspection = args.mode === 'learn' ? undefined : args.inspection;
  const bonding = args.mode === 'learn' ? undefined : args.bonding;
  const origin = args.mode === 'learn' ? undefined : args.origin;
  const functional = args.mode === 'learn' ? undefined : args.functional;
  // Learn fills the paperwork in for you, so it isn't marked there.
  const details = args.mode === 'learn' ? undefined : args.details;
  const certificate = args.mode === 'learn' ? undefined : args.certificate;
  const mistakes: SimMistake[] = [...runMistakes];

  // Main bonding: tested, judged, and the conductor size recorded.
  let bondingGot = 0;
  const bondingOf = bonding
    ? BONDS.length * 2 + 1 + ((bonding.fault ?? bonding.fixedFault) ? 1 : 0)
    : 0;
  for (const b of bonding ? BONDS : []) {
    const reading = bonding!.readings[b.id];
    const sound = bondSound(b.id, bonding!.fault);
    if (reading) bondingGot++;
    const said = bonding!.verdicts[b.id];
    if (said === (sound ? 'ok' : 'fault')) bondingGot++;
    else
      mistakes.push({
        tag: 'bonding_wrong',
        what: !reading
          ? `${b.label}: not tested.`
          : `${b.label}: read ${reading === 'OL' ? 'OL' : `${reading} Ω`} and you ${said === 'ok' ? 'passed it' : said === 'fault' ? 'failed it' : 'didn’t judge it'} — it was ${sound ? 'sound' : bonding!.fault?.kind === 'open' ? 'broken' : 'a high-resistance clamp'}.`,
        fix: sound
          ? !reading
            ? 'Bonding continuity is one of the dead tests (Reg 643.2.1) — test each clamp.'
            : 'Null the long lead first, or every reading carries its resistance. A sound bond reads a few hundredths of an ohm.'
          : 'GN3: first and foremost, no discontinuity — and across a clamp joint, readings should approach 0.05 Ω. Tenths of an ohm, or OL, is a fault to record.',
      });
  }
  // A faulty bond is put right and tested again (644.1.1, 643.1).
  const planted = bonding ? (bonding.fault ?? bonding.fixedFault ?? null) : null;
  if (bonding && planted) {
    const b = BONDS.find((x) => x.id === planted.bond)!;
    if (bonding.fixedFault && bonding.readings[b.id] && bonding.verdicts[b.id] === 'ok')
      bondingGot++;
    else if (bonding.fixedFault)
      mistakes.push({
        tag: 'not_retested',
        what: `${b.label}: put right, but not tested and judged again afterwards.`,
        fix: 'Reg 643.1: after a repair, repeat the test it failed.',
      });
    else if (bonding.verdicts[b.id] === 'fault')
      mistakes.push({
        tag: 'not_rectified',
        what: `${b.label}: found faulty but not put right.`,
        fix: 'Reg 644.1.1: on a new installation a defect is corrected before the certificate is issued. Remake it, then test it again.',
      });
  }
  if (bonding) {
    if (bonding.csa === BONDING_CSA) bondingGot++;
    else
      mistakes.push({
        tag: 'bonding_wrong',
        what: `Minimum main bonding size given as ${bonding.csa ? `${bonding.csa} mm²` : 'nothing'}; for this supply it’s ${BONDING_CSA} mm².`,
        fix: 'Table 54.8: on a PME supply with a PEN conductor of 35 mm² or less, the main protective bonding conductor must be at least 10 mm² copper.',
      });
  }

  // Inspection: a mark per check judged right. Checks never judged earn
  // nothing and are one mistake between them — not a "defect missed" or
  // "sound work called a defect" each, which they weren't.
  let inspectionGot = 0;
  const inspectionOf = inspection ? INSPECTION_ITEMS.length : 0;
  const unjudged = inspection ? INSPECTION_ITEMS.filter((i) => !inspection.answers[i.id]) : [];
  if (unjudged.length)
    mistakes.push({
      tag: 'not_inspected',
      what:
        unjudged.length === INSPECTION_ITEMS.length
          ? 'The visual inspection wasn’t done.'
          : `${unjudged.length} inspection check${unjudged.length === 1 ? ' wasn’t' : 's weren’t'} judged.`,
      fix: 'Reg 642.1: inspect the whole installation, before testing. Every check counts.',
    });
  for (const item of inspection ? INSPECTION_ITEMS : []) {
    const defect = inspection!.defects.includes(item.id);
    const said = inspection!.answers[item.id];
    if (said === (defect ? 'defect' : 'ok')) {
      inspectionGot++;
      continue;
    }
    if (!said) continue;
    mistakes.push(
      defect
        ? {
            tag: 'missed_defect',
            what: `${item.where}: ${item.defectSeen} You passed it.`,
            fix: `Reg ${item.reg}: ${item.why}`,
          }
        : {
            tag: 'false_defect',
            what: `${item.where}: ${item.okSeen} You called it a defect.`,
            fix: `Reg ${item.reg}: ${item.why} This one met it.`,
          }
    );
  }

  // Testing: a mark per required test done, less a mark per wrong attempt.
  const testsOf = AM2_RIG_CIRCUITS.reduce((n, c) => n + c.requiredTests.length, 0);
  const done = AM2_RIG_CIRCUITS.reduce((n, c) => n + (completed[c.id]?.length ?? 0), 0);
  const penalties = runMistakes.filter((m) =>
    [
      'wrong_point',
      'not_a_test',
      'out_of_order',
      'live_before_dead',
      'tripped_rcd',
      'leads_not_nulled',
      'inspect_first',
    ].includes(m.tag)
  ).length;
  // A repair where there was no such fault: a mistake and a mark each.
  const wrongFixes = fixes.filter((f) => !f.right);
  for (const f of wrongFixes) {
    const label =
      FIX_OPTIONS.find((o) => o.id === f.optionId)?.label ??
      BOND_FIX_OPTIONS.find((o) => o.id === f.optionId)?.label ??
      f.optionId;
    mistakes.push({
      tag: 'wrong_fix',
      circuitId: f.circuitId ?? undefined,
      what: `${f.circuitId ? `Circuit ${f.circuitId}` : 'Bonding'}: “${label}” — that wasn’t the fault there.`,
      fix: 'Find the fault from the readings before you change anything: which test failed, and on which conductors.',
    });
  }
  const testingGot = Math.max(0, done - penalties - wrongFixes.length);

  // Tests never taken cost their mark — and are named, so the debrief and the
  // weak spots say so rather than calling the run clean.
  for (const c of AM2_RIG_CIRCUITS) {
    const missing = c.requiredTests.filter((t) => !(completed[c.id] ?? []).includes(t.id));
    if (missing.length)
      mistakes.push({
        tag: 'tests_not_done',
        circuitId: c.id,
        what: `Circuit ${c.id}: ${missing.length === c.requiredTests.length ? 'not tested' : `${missing.length} test${missing.length === 1 ? '' : 's'} not done — ${missing.map((t) => t.description.toLowerCase()).join('; ')}`}.`,
        fix: 'Every circuit gets every test in the sequence. Keep an eye on the schedule — an empty box is a test still to do.',
      });
  }

  // Schedule: a mark per box that applies, checked against the key.
  let boxesOf = 0;
  let boxesGot = 0;
  const boxes: MarkedBox[] = [];
  for (const c of AM2_RIG_CIRCUITS) {
    const key = answerKey(c, readings[c.id] ?? []);
    const row = sheet.find((r) => r.circuitNumber === String(c.id));
    const na = naCols(c);
    for (const { key: k, label, col } of RESULT_COLS) {
      const want = key[k];
      const have = (row?.[k] as string | undefined) ?? '';
      const lim = want && !na.includes(k) ? boxLimit(c, k, want) : null;
      boxes.push({
        circuitId: c.id,
        key: k,
        col,
        label,
        have,
        want: na.includes(k) ? 'N/A' : (want ?? ''),
        status: na.includes(k)
          ? same(have, 'N/A')
            ? 'right'
            : have
              ? 'wrong'
              : 'empty'
          : !want
            ? // A figure written for a test that was never done is wrong.
              have
              ? 'wrong'
              : 'untested'
            : same(have, want)
              ? 'right'
              : have
                ? 'wrong'
                : 'empty',
        ...(lim
          ? {
              limit: lim.limit,
              outside:
                k === 'ringRn'
                  ? // Only a planted mismatch needs a remark — a gap from an
                    // un-nulled r₁ is the learner's own slip, not the ring's.
                    seeded.some((p) => p.circuitId === c.id && p.kind === 'rn_mismatch')
                  : lim.outside,
            }
          : {}),
      });
      if (na.includes(k)) {
        boxesOf++;
        if (same(have, 'N/A')) boxesGot++;
        else
          mistakes.push({
            tag: 'missed_na',
            circuitId: c.id,
            what: `Circuit ${c.id}, column ${col} (${label}) should say N/A.`,
            fix: 'Write N/A where a column doesn’t apply — ring columns on a radial, RCD columns with no RCD.',
          });
        continue;
      }
      if (!want) {
        // Not tested — counted under testing. But a figure written in for a
        // test never done is a box filled in wrongly.
        if (have) {
          boxesOf++;
          mistakes.push({
            tag: 'wrong_box',
            circuitId: c.id,
            what: `Circuit ${c.id}, column ${col} (${label}) says ${have}, but that test wasn’t done.`,
            fix: 'Only write in a reading you’ve taken.',
          });
        }
        continue;
      }
      boxesOf++;
      if (same(have, want)) boxesGot++;
      else if (!have)
        mistakes.push({
          tag: 'empty_box',
          circuitId: c.id,
          what: `Circuit ${c.id}, column ${col} (${label}) left empty — you measured ${want}.`,
          fix: 'Every reading you take goes on the schedule.',
        });
      else
        mistakes.push({
          tag: 'wrong_box',
          circuitId: c.id,
          what: `Circuit ${c.id}, column ${col} (${label}) says ${have}; the reading for that box was ${want}.`,
          fix: 'Check which test each reading came from before you write it in.',
        });
    }
  }

  // Problems: two marks each — put right and retested (Reg 644.1.1, 643.1).
  // A remark alone, with nothing put right, earns one.
  let problemsGot = 0;
  const caught = seeded.map((p) => {
    const row = sheet.find((r) => r.circuitNumber === String(p.circuitId));
    const remarked = same(row?.remarks ?? '', REMARKS[p.kind]);
    const fix = fixes.find((f) => f.right && f.target === `problem:${p.testId}`);
    const retested = !!fix && fix.stale.every((id) => (completed[p.circuitId] ?? []).includes(id));
    if (fix) {
      problemsGot += retested ? 2 : 1;
      if (!retested)
        mistakes.push({
          tag: 'not_retested',
          circuitId: p.circuitId,
          what: `Circuit ${p.circuitId}: put right, but not every test the fault could have affected was taken again.`,
          fix: 'Reg 643.1: after the fault is rectified, repeat that test and any earlier test whose result it may have influenced.',
        });
    } else if (remarked) {
      problemsGot += 1;
      mistakes.push({
        tag: 'not_rectified',
        circuitId: p.circuitId,
        what: `Circuit ${p.circuitId}: ${p.displayValue} ${PROBLEM_UNIT[p.kind]} recorded with a remark, but not put right.`,
        fix: `Reg 644.1.1: on a new installation a defect is corrected before the certificate is issued. ${problemWhy(p)}`,
      });
    } else
      mistakes.push({
        tag: row?.remarks ? 'wrong_remark' : 'missed_problem',
        circuitId: p.circuitId,
        what: (completed[p.circuitId] ?? []).includes(p.testId)
          ? `Circuit ${p.circuitId}: ${p.displayValue} was outside the limit and ${row?.remarks ? `the remark says “${row.remarks}”` : 'it was neither put right nor recorded'}.`
          : `Circuit ${p.circuitId}: the test that would have shown it wasn’t done. It would have read ${p.displayValue}, outside the limit.`,
        fix: `${problemWhy(p)} Put it right and retest — or, at the least, remark: “${REMARKS[p.kind]}”.`,
      });
    return {
      problem: p,
      caught: !!fix && retested,
      fixed: !!fix,
      retested,
      remarked,
    };
  });
  // A remark where nothing was outside a limit is a wrong remark — otherwise
  // guessing remarks everywhere would be free marks.
  let falseRemarks = 0;
  for (const row of sheet) {
    const id = Number(row.circuitNumber);
    if (row.remarks?.trim() && !seeded.some((p) => p.circuitId === id)) {
      falseRemarks++;
      mistakes.push({
        tag: 'wrong_remark',
        circuitId: id,
        what: `Circuit ${id}: remark “${row.remarks}”, but every reading on it was within the limits.`,
        fix: 'Only write a remark where a reading is outside its limit, and say which.',
      });
    }
  }
  problemsGot = Math.max(0, problemsGot - falseRemarks);

  // ── The origin: Ze, prospective fault current, phase sequence ──
  let originGot = 0;
  let originOf = 0;
  if (origin) {
    const missing: string[] = [];
    originOf += 4; // Ze taken, Ze method, PSCC, PEFC
    if (origin.ze) {
      originGot++;
      if (origin.zeHow?.earthOff && origin.zeHow.isolated) originGot++;
      else
        mistakes.push({
          tag: 'ze_method',
          what: `Ze read ${origin.ze} Ω ${
            !origin.zeHow?.isolated
              ? 'with the main switch closed'
              : 'with the main earthing conductor still connected — the bonding gave parallel paths, so it read low'
          }.`,
          fix: 'Ze: main switch open, the means of earthing disconnected from the bonding for the test, line to earth at the origin — then reconnect it.',
        });
    } else missing.push('Ze');
    if (origin.pscc) originGot++;
    else missing.push('prospective short-circuit current (L–N)');
    if (origin.pefc) originGot++;
    else missing.push('prospective earth fault current (L–E)');
    for (const pt of SEQ_POINTS) {
      originOf++;
      const r = origin.seq[pt.id];
      if (!r) {
        missing.push(`phase sequence ${pt.label.toLowerCase()}`);
        continue;
      }
      const want = r.shown === SEQ_RIGHT ? 'ok' : 'fault';
      if (origin.verdicts[pt.id] === want) originGot++;
      else
        mistakes.push({
          tag: 'phase_wrong',
          what: `Phase sequence ${pt.label.toLowerCase()} read ${r.shown} and you ${
            origin.verdicts[pt.id] === 'ok'
              ? 'passed it'
              : origin.verdicts[pt.id] === 'fault'
                ? 'failed it'
                : 'didn’t judge it'
          }.`,
          fix: `Reg 643.9: the phase sequence is maintained at all relevant points — ${SEQ_RIGHT} throughout.`,
        });
    }
    if (missing.length)
      mistakes.push({
        tag: 'tests_not_done',
        what: `At the origin: ${missing.join(', ')} not measured.`,
        fix: 'Reg 643.7.3.201: PSCC and PEFC at the origin; 643.7.3 loop impedance (Ze); 643.9 phase sequence.',
      });
    if (origin.zeHow?.earthOff || origin.earthOff) {
      originOf++;
      if (!origin.earthOff) originGot++;
      else
        mistakes.push({
          tag: 'earth_left_off',
          what: 'The main earthing conductor was left disconnected from the MET.',
          fix: 'Reconnect it as soon as the Ze reading is taken — the installation has no earth without it.',
        });
    }
    if (origin.phaseFault) {
      originOf++;
      const motor = origin.seq.motor;
      if (phaseFixed(origin)) {
        if (motor && motor.at > (origin.phaseFixedAt ?? 0) && origin.verdicts.motor === 'ok')
          originGot++;
        else
          mistakes.push({
            tag: 'not_retested',
            circuitId: 4,
            what: 'The crossed lines were put right, but the phase sequence at the motor wasn’t checked again.',
            fix: 'Reg 643.1: repeat the check after the repair.',
          });
      } else if (origin.verdicts.motor === 'fault')
        mistakes.push({
          tag: 'not_rectified',
          circuitId: 4,
          what: 'Wrong phase sequence at the motor found, but not put right.',
          fix: 'Reg 644.1.1: correct it before the certificate is issued — swap two lines at the isolator, then check it again.',
        });
    }
  }

  // ── Functional testing (Reg 643.10) ──
  let functionalGot = 0;
  let functionalOf = 0;
  if (functional && origin) {
    const notDone: string[] = [];
    for (const item of FUNC_ITEMS) {
      functionalOf++;
      const said = functional.verdicts[item.id];
      if (!functional.operated[item.id] || !said) {
        notDone.push(item.label.toLowerCase());
        continue;
      }
      const want = funcSound(item.id, functional, origin) ? 'ok' : 'fault';
      if (said === want) functionalGot++;
      else
        mistakes.push({
          tag: 'functional_wrong',
          circuitId: item.circuitId,
          what: `${item.label}: you said it ${said === 'ok' ? 'works as intended' : 'doesn’t'} — it ${want === 'ok' ? 'does' : 'doesn’t'}.`,
          fix: `Reg 643.10: operate it and check it does what it should. ${item.okSeen}`,
        });
    }
    if (notDone.length)
      mistakes.push({
        tag: 'tests_not_done',
        what: `Functional testing: ${notDone.join(', ')} not checked${
          functional.fixedAt ? ' (or not checked again after the repair)' : ''
        }.`,
        fix: 'Reg 643.10: operate switchgear, controls and isolators to check they work as intended. The NET manual: operate switches, isolators and contactors.',
      });
    if (functional.fault) {
      functionalOf++;
      if (funcFixed(functional)) functionalGot++;
      else if (functional.verdicts[functional.fault] === 'fault')
        mistakes.push({
          tag: 'not_rectified',
          circuitId: FUNC_ITEMS.find((i) => i.id === functional.fault)?.circuitId,
          what: `${FUNC_ITEMS.find((i) => i.id === functional.fault)?.label}: found not working, but not put right.`,
          fix: 'Reg 644.1.1: correct it before the certificate is issued, then check it again.',
        });
    }
  }

  // ── Paperwork: circuit details (cols 3–16) and the certificate ──
  let paperGot = 0;
  let paperOf = 0;
  if (details) {
    for (const c of AM2_RIG_CIRCUITS) {
      const want = detailsKey(c);
      const row = details.find((d) => d.circuitNumber === String(c.id));
      const wrong: string[] = [];
      for (const g of DETAIL_GROUPS) {
        paperOf++;
        const bad = g.fields.filter((f) => !sameEntry(row?.[f.key] ?? '', want[f.key]));
        if (!bad.length) paperGot++;
        else
          wrong.push(
            ...bad.map(
              (f) => `col ${f.col} ${row?.[f.key] ? `“${row[f.key]}”` : 'blank'} (${want[f.key]})`
            )
          );
      }
      if (wrong.length)
        mistakes.push({
          tag: 'details_wrong',
          circuitId: c.id,
          what: `Circuit ${c.id} details: ${wrong.join('; ')}.`,
          fix: 'Columns 3–16 come from the drawings and the board: cable, installation method, device, Table 41.3 maximum Zs, RCD — N/A where there is none.',
        });
    }
  }
  if (certificate && origin) {
    const want = certKey(origin);
    const wrong: string[] = [];
    for (const f of CERT_FIELDS) {
      const have = certificate[f.key] ?? '';
      const w = want[f.key];
      if (!w) {
        // Nothing to write until the test is done — counted under the origin.
        if (have)
          wrong.push(
            f.key === 'zeAtOrigin' && origin.ze && origin.zeHow && !origin.zeHow.earthOff
              ? `${f.label} written as ${have}, but Ze was only measured with the main earthing conductor still connected — parallel paths make that reading low`
              : `${f.label} written as ${have} but never measured`
          );
        continue;
      }
      paperOf++;
      if (sameCert(f.key, have, w)) paperGot++;
      else
        wrong.push(
          `${f.label}: ${have || 'blank'} (should be ${w}${f.unit ? ` ${f.unit}` : ''} — ${f.from.toLowerCase()})`
        );
    }
    if (wrong.length)
      mistakes.push({
        tag: 'certificate_wrong',
        what: `Certificate: ${wrong.join('; ')}.`,
        fix: 'The supply details come from your own readings at the origin and the drawings. Ipf: the line–neutral reading × 2 on a three-phase supply, or the earth fault current if greater (Appendix 14).',
      });
  }

  const extraProblemMarks = seeded.length * 2;
  const got =
    inspectionGot +
    bondingGot +
    testingGot +
    boxesGot +
    problemsGot +
    originGot +
    functionalGot +
    paperGot;
  const of =
    inspectionOf +
    bondingOf +
    testsOf +
    boxesOf +
    extraProblemMarks +
    originOf +
    functionalOf +
    paperOf;
  return {
    inspection: { got: inspectionGot, of: inspectionOf },
    bonding: { got: bondingGot, of: bondingOf },
    testing: { got: testingGot, of: testsOf },
    schedule: { got: boxesGot, of: boxesOf },
    problems: { got: problemsGot, of: seeded.length * 2 },
    origin: { got: originGot, of: originOf },
    functional: { got: functionalGot, of: functionalOf },
    paperwork: { got: paperGot, of: paperOf },
    overall: of ? Math.round((got / of) * 100) : 0,
    mistakes,
    caught,
    boxes,
    remarks: AM2_RIG_CIRCUITS.map((c) => {
      const have = sheet.find((r) => r.circuitNumber === String(c.id))?.remarks?.trim() ?? '';
      const p = seeded.find((x) => x.circuitId === c.id);
      // Put right: no remark is needed (a remark saying what was found is fine).
      const fixed = !!p && fixes.some((f) => f.right && f.target === `problem:${p.testId}`);
      const want = p && !fixed ? REMARKS[p.kind] : '';
      return {
        circuitId: c.id,
        have,
        want,
        right: same(have, want) || (fixed && same(have, REMARKS[p!.kind])),
      };
    }),
  };
}
