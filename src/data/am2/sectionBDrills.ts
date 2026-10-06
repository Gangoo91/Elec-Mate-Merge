/**
 * Section B drills — short, focused practice built from a learner's mistakes.
 *
 * AM2 plan, Phase 2 (6 Oct 2026). Every question is generated from the rig
 * data and the same limits the simulator marks against, so a drill can never
 * disagree with the rig:
 *   - insulation resistance ≥ 1.0 MΩ at 500 V (Table 64)
 *   - measured Zs ≤ 0.8 × Table 41.3 (Appendix 3)
 *   - RCD ≤ 300 ms at IΔn, general type (Reg 643.8); 0° and 180°, longer recorded (GN3)
 *   - r₁ and rₙ read the same (GN3 2.6.6)
 *   - dead tests before live (Reg 643.1)
 */

import { INSPECTION_ITEMS } from '@/data/am2/sectionBInspection';
import { AM2_RIG_CIRCUITS } from '@/data/am2RigCircuits';
import { getMcbZsLimit } from '@/data/zsLimits';
import { isLiveTest, naCols, type MistakeTag } from '@/data/am2/sectionBRules';
import { SAFE_ISOLATION_SCENARIOS, type IsolationTag } from '@/data/am2/safeIsolationScenarios';
import { FAULT_SCENARIOS } from '@/data/am2-fault-scenarios';

export type DrillKind =
  | 'limits'
  | 'zs'
  | 'columns'
  | 'na'
  | 'order'
  | 'method'
  | 'inspect'
  | 'bonding'
  // Section C
  | 'isoTester'
  | 'isoSwitch'
  | 'isoOrder'
  | 'isoPairs'
  | 'isoTwist'
  // Section D
  | 'faultRead';

export const DRILLS: Record<DrillKind, { title: string; blurb: string; section: 'B' | 'C' | 'D' }> =
  {
    limits: {
      title: 'Is this reading OK?',
      blurb: 'Spot readings outside the limit',
      section: 'B',
    },
    zs: {
      title: 'Zs limits',
      blurb: 'The measured limit for a device — 0.8 × Table 41.3',
      section: 'B',
    },
    columns: {
      title: 'Which column?',
      blurb: 'Where each reading goes on the schedule',
      section: 'B',
    },
    na: {
      title: 'When to write N/A',
      blurb: 'Columns that don’t apply to a circuit',
      section: 'B',
    },
    order: {
      title: 'Test order',
      blurb: 'What comes next, and when the board goes live',
      section: 'B',
    },
    method: {
      title: 'Doing the test right',
      blurb: 'Nulling, loop test choice, RCD half-cycles',
      section: 'B',
    },
    bonding: {
      title: 'Main bonding',
      blurb: 'Clamp readings, Table 54.8 sizes, where the clamp goes',
      section: 'B',
    },
    inspect: {
      title: 'Visual inspection',
      blurb: 'Acceptable or a defect — and the regulation',
      section: 'B',
    },
    isoTester: {
      title: 'Proving dead',
      blurb: 'The right instrument, proved before and after',
      section: 'C',
    },
    isoSwitch: {
      title: 'Is that isolation?',
      blurb: 'Local, control and wrong-point switching',
      section: 'C',
    },
    isoOrder: { title: 'Isolation order', blurb: 'What has to come before what', section: 'C' },
    isoPairs: { title: 'Every pair', blurb: 'Which combinations must read 0 V', section: 'C' },
    isoTwist: {
      title: 'When something’s wrong',
      blurb: 'A live reading, a failed re-prove',
      section: 'C',
    },
    faultRead: {
      title: 'What does this reading tell you?',
      blurb: 'Real readings from the fault circuits',
      section: 'D',
    },
  };

/** Section D: every missed fault type is drilled by reading interpretation. */
export const FAULT_LABEL: Record<string, string> = {
  missed_open_circuit: 'Missed an open circuit',
  missed_short_circuit: 'Missed a short circuit',
  missed_high_resistance: 'Missed a high-resistance joint',
  missed_reversed_polarity: 'Missed a mis-connection',
  // Section D's written record, part by part (6 Oct 2026).
  wrong_location: 'Fault location not pinned to two points and a conductor',
  wrong_rectification: 'Wrong repair for the fault',
  wrong_proving_test: 'Wrong tests to prove the repair',
};
export const FAULT_DRILL_FOR: Record<string, DrillKind> = {
  missed_open_circuit: 'faultRead',
  missed_short_circuit: 'faultRead',
  missed_high_resistance: 'faultRead',
  missed_reversed_polarity: 'faultRead',
  wrong_location: 'faultRead',
};

/** Which drill fixes which Section C mistake. */
export const ISO_DRILL_FOR: Record<IsolationTag, DrillKind> = {
  unsafe_tester: 'isoTester',
  key: 'isoSwitch',
  local_switch: 'isoSwitch',
  wrong_point: 'isoSwitch',
  too_early: 'isoOrder',
  missed_pair: 'isoPairs',
  live_reading: 'isoTwist',
  prove_after: 'isoTwist',
  prove_before: 'isoTester',
  not_informed: 'isoOrder',
};

/** Which drill fixes which mistake. */
export const DRILL_FOR: Record<MistakeTag, DrillKind> = {
  missed_problem: 'limits',
  wrong_remark: 'limits',
  wrong_box: 'columns',
  empty_box: 'columns',
  missed_na: 'na',
  out_of_order: 'order',
  live_before_dead: 'order',
  not_a_test: 'method',
  wrong_point: 'method',
  tripped_rcd: 'method',
  leads_not_nulled: 'method',
  one_half_cycle: 'method',
  missed_defect: 'inspect',
  false_defect: 'inspect',
  inspect_first: 'inspect',
  bonding_wrong: 'bonding',
  not_inspected: 'inspect',
  tests_not_done: 'order',
  ze_method: 'method',
  earth_left_off: 'method',
  phase_wrong: 'method',
  functional_wrong: 'method',
  not_rectified: 'limits',
  not_retested: 'order',
  wrong_fix: 'limits',
  details_wrong: 'columns',
  certificate_wrong: 'columns',
};

export interface DrillQuestion {
  kind: DrillKind;
  prompt: string;
  options: string[];
  answer: number;
  why: string;
}

type Rng = () => number;
const pick = <T>(a: T[], rng: Rng) => a[Math.floor(rng() * a.length)];
const ohm = (n: number) => `${n.toFixed(2)} Ω`;

function shuffleIn(correct: string, wrong: string[], rng: Rng) {
  const opts = [correct, ...Array.from(new Set(wrong.filter((w) => w !== correct))).slice(0, 3)];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return { options: opts, answer: opts.indexOf(correct) };
}

const OK = 'Acceptable — record it';
const NOT_OK = 'Outside the limit — record it and write a remark';

function limitsQ(rng: Rng): DrillQuestion {
  const kind = pick(['ir', 'irFire', 'bond', 'zs', 'rcd', 'ring'], rng);
  if (kind === 'bond') {
    // Main bonding, lead nulled: sound reads a few hundredths; a bad clamp or a break doesn't.
    const v = pick(['0.02', '0.03', '0.04', '0.56', '0.91', 'OL'], rng);
    const ok = v !== 'OL' && Number(v) <= 0.05;
    return {
      kind: 'limits',
      prompt: `Main bonding continuity, MET to the gas pipe clamp, long lead nulled, reads ${v === 'OL' ? 'OL' : `${v} Ω`}.`,
      options: ['Sound — continuity confirmed', 'Fault — record it'],
      answer: ok ? 0 : 1,
      why: ok
        ? 'A few hundredths of an ohm is what a short bonding conductor and a good clamp give. GN3: the clamp joint itself should approach 0.05 Ω.'
        : v === 'OL'
          ? 'OL is a break: GN3 says the results should first and foremost show no discontinuity.'
          : `Tenths of an ohm means a loose or corroded clamp. GN3: across a clamp joint, readings should approach 0.05 Ω.`,
    };
  }
  if (kind === 'irFire') {
    // Passes Table 64 but not BS 5839-1 — the trap is judging it against 1.0.
    const v = pick([1.2, 1.5, 1.8, 2.4, 150], rng);
    const ok = v >= 2.0;
    return {
      kind: 'limits',
      prompt: `Insulation resistance on the fire alarm panel supply (FP200), tested at 500 V, reads ${v} MΩ.`,
      options: [OK, NOT_OK],
      answer: ok ? 0 : 1,
      why: `Reg 643.3.2's note points fire alarm wiring to BS 5839-1, where the figure is 2.0 MΩ at 500 V — stricter than Table 64's 1.0 MΩ. ${v} MΩ is ${ok ? 'above' : 'below'} 2.0.`,
    };
  }
  if (kind === 'ir') {
    const v = pick([0.4, 0.6, 0.8, 0.9, 45, 120, 200, 299], rng);
    const ok = v >= 1.0;
    return {
      kind: 'limits',
      prompt: `Insulation resistance live to earth on a 230 V circuit, tested at 500 V, reads ${v} MΩ.`,
      options: [OK, NOT_OK],
      answer: ok ? 0 : 1,
      why: `Table 64: at least 1.0 MΩ at 500 V for circuits up to 500 V. ${v} MΩ is ${ok ? 'above' : 'below'} that.`,
    };
  }
  if (kind === 'zs') {
    const c = pick(AM2_RIG_CIRCUITS, rng);
    const lim = Math.round(c.maxZs * 0.8 * 100) / 100;
    const band = pick(['under', 'between', 'over'], rng);
    const v =
      band === 'under'
        ? Math.round(lim * (0.5 + rng() * 0.35) * 100) / 100
        : band === 'between'
          ? Math.round((lim + 0.02 + rng() * (c.maxZs - lim - 0.04)) * 100) / 100
          : Math.round(c.maxZs * (1.05 + rng() * 0.2) * 100) / 100;
    const ok = v <= lim;
    return {
      kind: 'limits',
      prompt: `${c.name}: ${c.mcbRating} A Type ${c.mcbType}. Measured Zs at the far point is ${ohm(v)}.`,
      options: [OK, NOT_OK],
      answer: ok ? 0 : 1,
      why: `Table 41.3 gives ${ohm(c.maxZs)}; a measured reading must be no more than 0.8 × that = ${ohm(lim)} (Appendix 3).${
        band === 'between' ? ' Passing the table figure isn’t enough.' : ''
      }`,
    };
  }
  if (kind === 'rcd') {
    const t = pick([16, 22, 28, 180, 290, 310, 340], rng);
    const ok = t <= 300;
    return {
      kind: 'limits',
      prompt: `A 30 mA general-type RCD tested at IΔn: the longer of the two half-cycles is ${t} ms.`,
      options: [OK, NOT_OK],
      answer: ok ? 0 : 1,
      why: 'Reg 643.8: a general non-delay RCD must disconnect within 300 ms at its rated residual current.',
    };
  }
  const r1 = pick([0.48, 0.52, 0.61], rng);
  // Either within the instrument's allowance or clearly higher — GN3 gives no
  // single figure, so nothing borderline is asked.
  const d = pick([0, 0.01, 0.02, 0.12, 0.18, 0.25], rng);
  const rn = Math.round((r1 + d) * 100) / 100;
  const ok = d <= 0.02;
  return {
    kind: 'limits',
    prompt: `Ring final, step 1: r₁ = ${ohm(r1)}, rₙ = ${ohm(rn)}.`,
    options: [OK, NOT_OK],
    answer: ok ? 0 : 1,
    why: ok
      ? 'GN3 2.6.6: line and neutral are the same size and length, so r₁ and rₙ should read the same, allowing a little for the instrument. These do.'
      : `GN3 2.6.6: line and neutral are the same size and length, so r₁ and rₙ should read the same. rₙ is ${d.toFixed(2)} Ω higher — a reading higher than expected suggests a poor termination.`,
  };
}

function zsQ(rng: Rng): DrillQuestion {
  const curve = pick<'B' | 'C'>(['B', 'C'], rng);
  const rating = pick(curve === 'B' ? [6, 10, 16, 20, 32, 40] : [6, 10, 16, 20, 32], rng);
  const table = getMcbZsLimit(curve === 'B' ? 'typeB' : 'typeC', rating)!.maxZs;
  const other = getMcbZsLimit(curve === 'B' ? 'typeC' : 'typeB', rating)?.maxZs ?? table * 2;
  const right = ohm(Math.round(table * 0.8 * 100) / 100);
  const { options, answer } = shuffleIn(
    right,
    [
      ohm(table),
      ohm(Math.round(other * 0.8 * 100) / 100),
      ohm(Math.round(table * 0.6 * 100) / 100),
    ],
    rng
  );
  return {
    kind: 'zs',
    prompt: `What is the most a MEASURED Zs can be on a circuit protected by a ${rating} A Type ${curve} circuit-breaker?`,
    options,
    answer,
    why: `Table 41.3 gives ${ohm(table)} for ${rating} A Type ${curve}. Appendix 3: a measured value must be no more than 0.8 × that, ${right}.`,
  };
}

const COLUMN_FOR: { what: string; col: string }[] = [
  { what: 'the ring’s line conductor end to end (r₁)', col: '18 — r₁' },
  { what: 'the ring’s neutral end to end (rₙ)', col: '19 — rₙ' },
  { what: 'the ring’s cpc end to end (r₂)', col: '20 — r₂' },
  { what: 'R₁+R₂ with line and cpc linked at the board', col: '21 — R₁ + R₂' },
  { what: 'the voltage you set for insulation resistance', col: '23 — IR test voltage' },
  { what: 'insulation resistance between live conductors', col: '24 — IR live–live' },
  { what: 'insulation resistance live to earth', col: '25 — IR live–earth' },
  { what: 'that the switches are in the line conductor', col: '26 — Polarity' },
  { what: 'Zs at the furthest point', col: '27 — Maximum measured Zs' },
  { what: 'the RCD’s disconnection time at IΔn', col: '28 — RCD time' },
  { what: 'that the RCD trips on its own test button', col: '29 — RCD test button' },
];

function columnsQ(rng: Rng): DrillQuestion {
  const q = pick(COLUMN_FOR, rng);
  const { options, answer } = shuffleIn(
    q.col,
    COLUMN_FOR.filter((x) => x !== q)
      .sort(() => rng() - 0.5)
      .map((x) => x.col),
    rng
  );
  return {
    kind: 'columns',
    prompt: `You’ve just recorded ${q.what}. Which column of the schedule of test results is it?`,
    options,
    answer,
    why: `On the schedule of test results it goes in column ${q.col}.`,
  };
}

function naQ(rng: Rng): DrillQuestion {
  const c = pick(AM2_RIG_CIRCUITS, rng);
  const na = naCols(c);
  const ring = na.includes('ringR1');
  const rcd = na.includes('rcdDisconnectionTime');
  const label = (r: boolean, d: boolean) =>
    r && d
      ? '18–20 and 28–29'
      : r
        ? '18–20 only (ring continuity)'
        : d
          ? '28–29 only (RCD)'
          : 'Neither — 18–20 and 28–29 all apply';
  const right = label(ring, rcd);
  const { options, answer } = shuffleIn(
    right,
    [label(true, true), label(true, false), label(false, true), label(false, false)],
    rng
  );
  return {
    kind: 'na',
    prompt: `${c.name}: ${c.diagramLayout === 'ring' ? 'a ring' : 'a radial'}, ${
      c.hasRcd
        ? `with a ${c.rcdRating} mA ${c.rcdBsStandard === 'BS EN 61009' ? 'RCBO' : 'RCD'}`
        : 'no RCD'
    }. On the schedule of test results, which of columns 18–20 (ring continuity) and 28–29 (RCD) get N/A?`,
    options,
    answer,
    why: `Ring continuity (18–20) only applies to ring finals; the RCD columns (28–29) only where there is an RCD. So: ${right}.`,
  };
}

function orderQ(rng: Rng): DrillQuestion {
  if (rng() < 0.35) {
    const c = pick(
      AM2_RIG_CIRCUITS.filter((x) => x.requiredTests.some(isLiveTest)),
      rng
    );
    const right = 'No — every circuit’s dead tests first, then energise';
    const { options, answer } = shuffleIn(
      right,
      [
        'Yes — this circuit’s dead tests are done',
        'Yes, if you use the no-trip loop test',
        'Yes, as long as you test at the furthest point',
      ],
      rng
    );
    return {
      kind: 'order',
      prompt: `The dead tests on ${c.name.toLowerCase()} are done, but two other circuits haven’t been tested. Can you take Zs on ${c.name.toLowerCase()} now?`,
      options,
      answer,
      why: 'Reg 643.1: the tests of 643.2 to 643.6 are done, in order, before the installation is energised. Zs is a live test.',
    };
  }
  const c = pick(AM2_RIG_CIRCUITS, rng);
  const sorted = [...c.requiredTests]
    .sort((a, b) => a.gn3Step - b.gn3Step)
    .filter((t) => !isLiveTest(t));
  const i = Math.floor(rng() * (sorted.length - 1)) + 1;
  const done = sorted.slice(0, i).map((t) => t.description);
  const next = sorted[i].description;
  const { options, answer } = shuffleIn(
    next,
    // Tests on the same step (L–E/L–L, r₁/rₙ/r₂) are equally right — never offer them as wrong.
    [...sorted.slice(i + 1), ...c.requiredTests.filter(isLiveTest)]
      .filter((t) => t.gn3Step !== sorted[i].gn3Step)
      .map((t) => t.description),
    rng
  );
  return {
    kind: 'order',
    prompt: `${c.name}. Done so far: ${done.join(', ')}. What comes next?`,
    options: options.length > 1 ? options : [next, 'Energise the board'],
    answer: options.length > 1 ? answer : 0,
    why: 'Continuity first, then insulation resistance, then polarity — the order of Reg 643.2 to 643.6 — and the live tests after energising.',
  };
}

function methodQ(rng: Rng): DrillQuestion {
  const which = pick(['loop', 'null', 'rcd', 'where_zs', 'where_ir'], rng);
  if (which === 'loop') {
    const c = pick(
      AM2_RIG_CIRCUITS.filter((x) => x.hasRcd),
      rng
    );
    const right = 'Three-wire no-trip loop test';
    const { options, answer } = shuffleIn(
      right,
      [
        'Two-wire high-current loop test',
        'Either — they read the same',
        'No loop test on RCD circuits',
      ],
      rng
    );
    return {
      kind: 'method',
      prompt: `${c.name} is protected by a 30 mA ${c.rcdBsStandard === 'BS EN 61009' ? 'RCBO' : 'RCD'}. Which loop test do you use?`,
      options,
      answer,
      why: 'GN3: the two-wire high-current test is used unless there is an RCD or RCBO in the circuit — it would trip it. Use the three-wire no-trip test.',
    };
  }
  if (which === 'null') {
    const right = 'Null the test leads on the ohms range';
    const { options, answer } = shuffleIn(
      right,
      ['Select 500 V and test the leads', 'Energise the board', 'Press the RCD test button'],
      rng
    );
    return {
      kind: 'method',
      prompt: 'Before your first continuity reading, what do you do?',
      options,
      answer,
      why: 'Unnulled leads add their own resistance to every continuity reading, so R₁+R₂ and r₁, rₙ, r₂ all read high.',
    };
  }
  if (which === 'rcd') {
    const right = 'Test at 0° and 180°, record the longer time';
    const { options, answer } = shuffleIn(
      right,
      [
        'Test at 0° only',
        'Test at 0° and 180°, record the shorter time',
        'Test at 0° and 180°, record the average',
      ],
      rng
    );
    return {
      kind: 'method',
      prompt: 'RCD trip test at 1 × IΔn: what goes in column 28?',
      options,
      answer,
      why: 'GN3: the longest tripping time of the two tests (0° and 180°) is recorded in column 28.',
    };
  }
  // Not the ring for Zs: every socket is tested there and the highest recorded,
  // so no single socket is "the" answer.
  // For Zs, only circuits where the Zs point really is the far end on the rig
  // drawing — on the lighting and fire alarm circuits other points sit beyond
  // it, which made "the furthest point" contradict the answer.
  const zsAtFarEnd = (x: (typeof AM2_RIG_CIRCUITS)[number]) => {
    const zs = x.requiredTests.find((t) => t.dialPosition === 'LOOP_ZS');
    const pt = x.testPoints.find((p) => p.id === zs?.testPointId);
    return !!pt && x.testPoints.every((p) => p.xPct <= pt.xPct);
  };
  const c = pick(
    AM2_RIG_CIRCUITS.filter(
      (x) =>
        x.testPoints.length > 1 &&
        !(which === 'where_zs' && (x.diagramLayout === 'ring' || !zsAtFarEnd(x)))
    ),
    rng
  );
  const t = c.requiredTests.find((x) =>
    which === 'where_zs' ? x.dialPosition === 'LOOP_ZS' : x.dialPosition.startsWith('IR')
  );
  if (!t) return methodQ(rng);
  const right = c.testPoints.find((p) => p.id === t.testPointId)!.label;
  const { options, answer } = shuffleIn(
    right,
    c.testPoints.map((p) => p.label),
    rng
  );
  return {
    kind: 'method',
    prompt: `${c.name}: where do you take ${which === 'where_zs' ? 'Zs' : 'the insulation resistance test'}?`,
    options,
    answer,
    why:
      which === 'where_zs'
        ? 'Zs is taken at the furthest point of the circuit — that’s where it is highest.'
        : 'Insulation resistance is tested from the board, with the circuit isolated and equipment disconnected.',
  };
}

// ── Section C ────────────────────────────────────────────────

const ALL_TRAPS = SAFE_ISOLATION_SCENARIOS.flatMap((s) =>
  s.traps.map((t) => ({ ...t, job: s.title }))
);

function isoTesterQ(rng: Rng): DrillQuestion {
  const which = pick(['instrument', 'when', 'leads'], rng);
  if (which === 'when') {
    const right = 'Before the dead test and again after it';
    const { options, answer } = shuffleIn(
      right,
      ['Before the dead test only', 'After the dead test only', 'Once a day, before the first job'],
      rng
    );
    return {
      kind: 'isoTester',
      prompt: 'When do you prove your voltage indicator on the proving unit?',
      options,
      answer,
      why: 'Proving it before shows it works; proving it again after shows it was still working when it read 0 V.',
    };
  }
  if (which === 'leads') {
    const right = 'Shrouded probes with minimal exposed tip, fused or current-limited';
    const { options, answer } = shuffleIn(
      right,
      [
        'Any leads that fit the instrument',
        'Long bare probes so you can reach the terminals',
        'Crocodile clips so your hands are free',
      ],
      rng
    );
    return {
      kind: 'isoTester',
      prompt: 'What leads should your two-pole voltage indicator have?',
      options,
      answer,
      why: 'GN3: shrouded probes with little exposed metal. Some makers specify fused leads, others rely on protection built into the instrument — follow the manufacturer.',
    };
  }
  const right = 'A two-pole voltage indicator, proved on a proving unit before and after the test';
  const { options, answer } = shuffleIn(
    right,
    [
      'A non-contact voltage detector held against each conductor',
      'A multimeter on its AC volts range',
      'A plug-in socket tester — no lights means it’s dead',
    ],
    rng
  );
  return {
    kind: 'isoTester',
    prompt: 'Which of these can you rely on to prove a circuit dead?',
    options,
    answer,
    why: 'A non-contact detector can miss a live conductor, a multimeter can be on the wrong range, and a plug-in tester isn’t a dead test. Prove dead with a two-pole indicator proved before and after.',
  };
}

function isoSwitchQ(rng: Rng): DrillQuestion {
  const t = pick(
    ALL_TRAPS.filter((x) => x.tag === 'local_switch' || x.tag === 'wrong_point' || x.tag === 'key'),
    rng
  );
  const right = 'No — it isn’t safe isolation';
  const { options, answer } = shuffleIn(
    right,
    [
      'Yes — that’s enough to start work',
      'Yes, if you prove dead afterwards',
      'Yes, if you fit a notice',
    ],
    rng
  );
  return {
    kind: 'isoSwitch',
    prompt: `${t.job}: “${t.label}.” Is that safe isolation?`,
    options,
    answer,
    why: t.why,
  };
}

function isoOrderQ(rng: Rng): DrillQuestion {
  const s = pick(SAFE_ISOLATION_SCENARIOS, rng);
  // Walk the procedure: a valid sequence, stop part-way, ask for something allowed next.
  const done: string[] = [];
  const steps = Math.floor(rng() * 4) + 1;
  for (let k = 0; k < steps; k++) {
    const nxt = s.actions.find(
      (a) => !done.includes(a.id) && a.needs.every((n) => done.includes(n))
    );
    if (!nxt) break;
    done.push(nxt.id);
  }
  const allowed = s.actions.filter(
    (a) => !done.includes(a.id) && a.needs.every((n) => done.includes(n))
  );
  const blocked = s.actions.filter(
    (a) => !done.includes(a.id) && !a.needs.every((n) => done.includes(n))
  );
  if (!allowed.length || !blocked.length) return isoOrderQ(rng);
  // Half the time ask about a step that IS allowed — "not yet" can't be a safe guess.
  const allowedNow = rng() < 0.5;
  const target = allowedNow ? pick(allowed, rng) : pick(blocked, rng);
  const right = allowedNow ? 'Yes, it can be done now' : 'Not yet';
  const { options, answer } = shuffleIn(
    right,
    [allowedNow ? 'Not yet' : 'Yes, it can be done now'],
    rng
  );
  const doneLabels = s.actions.filter((a) => done.includes(a.id)).map((a) => a.label.toLowerCase());
  return {
    kind: 'isoOrder',
    prompt: `${s.title}. You have: ${doneLabels.join('; ')}. Can you now “${target.label.toLowerCase()}”?`,
    options,
    answer,
    why: allowedNow
      ? 'Yes — everything that step depends on is already done. Any safe order is fine.'
      : target.tooEarly,
  };
}

function isoPairsQ(rng: Rng): DrillQuestion {
  const s = pick(SAFE_ISOLATION_SCENARIOS, rng);
  const n = s.testPairs.length;
  const right = `${n} — ${s.testPairs.join(', ')}`;
  const wrong =
    n === 3
      ? ['1 — L–N', '2 — L–N, L–E', '4 — L–N, L–E, N–E, L–L']
      : n === 5
        ? ['3 — L–N, L–E, N–E', '2 — L–N, L–E', '4 — L–N, L–E, N–E, SL–N']
        : [
            '3 — L1–L2, L2–L3, L3–L1',
            '6 — every line to N and to E',
            '4 — each line to N, and N–E',
          ];
  const { options, answer } = shuffleIn(right, wrong, rng);
  return {
    kind: 'isoPairs',
    prompt: `${s.title}: how many conductor combinations must read 0 V at ${s.pointOfWork}?`,
    options,
    answer,
    why: 'Every combination is a separate test: line to line, line to neutral, line to earth and neutral to earth — and at a loop-in ceiling rose the switched line (SL) as well. Stopping early leaves one untested.',
  };
}

function isoTwistQ(rng: Rng): DrillQuestion {
  const withTwist = SAFE_ISOLATION_SCENARIOS.filter((s) => s.liveTwist || s.proveAfterFails);
  const s = pick(withTwist, rng);
  if (s.liveTwist && (!s.proveAfterFails || rng() < 0.5)) {
    const c = s.liveTwist.choices;
    const right = c.find((x) => x.correct)!;
    const { options, answer } = shuffleIn(
      right.label,
      c.filter((x) => !x.correct).map((x) => x.label),
      rng
    );
    return {
      kind: 'isoTwist',
      prompt: `${s.title}: your proved indicator reads ${s.liveTwist.reading} on ${s.liveTwist.pair} at ${s.pointOfWork}. What now?`,
      options,
      answer,
      why: right.why,
    };
  }
  const c = s.proveAfterFails!.choices;
  const right = c.find((x) => x.correct)!;
  const { options, answer } = shuffleIn(
    right.label,
    c.filter((x) => !x.correct).map((x) => x.label),
    rng
  );
  return {
    kind: 'isoTwist',
    prompt: `${s.title}: every pair read 0 V, but when you re-prove the indicator on the proving unit it doesn’t light. What now?`,
    options,
    answer,
    why: right.why,
  };
}

// ── Section D ────────────────────────────────────────────────

const READ_ANSWER = {
  normal: 'Normal — nothing wrong here',
  open: 'Open circuit — no continuity',
  short: 'Short circuit or insulation fault',
  high: 'High resistance — a poor joint or connection',
  crossed: 'A mis-connection — conductors crossed',
} as const;

/** Mis-connections need a PAIR of readings to show: each conductor arrives
 *  where the other should. One OL alone would look like an open circuit. */
const CROSSED_PAIRS: { prompt: string; why: string }[] = [
  {
    prompt:
      'Socket outlet, supply isolated, continuity from the board: board L to the socket’s L terminal reads OL; board L to the socket’s N terminal reads 0.30 Ω; board N to the socket’s L terminal reads 0.30 Ω.',
    why: 'Line arrives at the neutral terminal — line and neutral are crossed at the socket (reversed polarity), not broken.',
  },
  {
    prompt:
      'Three-phase socket, isolated: board L1 to the socket’s L1 pin reads OL, but board L1 to the L3 pin reads 0.30 Ω, and board L3 to the L1 pin reads 0.30 Ω.',
    why: 'L1 and L3 have swapped places — a mis-connection (phase sequence reversed), not an open circuit.',
  },
  {
    prompt:
      'Fused connection unit, isolated: board L to the load-side L terminal reads OL; board L to the load-side N terminal reads 0.25 Ω; board N to the load-side L terminal reads 0.25 Ω.',
    why: 'Line and neutral are crossed on the load side of the FCU — a mis-connection.',
  },
];

/** Readings whose meaning is unambiguous on their own. Crossed-conductor
 *  readings are left out: one OL there looks exactly like an open circuit. */
// Data cabling isn't insulation-tested at 500 V on the rig, so it's left out.
// Ring readings are left out: a ring's r₂ or a leg reading only means
// something against the ring's own r₁ and length, which the question can't give.
const FAULT_READINGS = FAULT_SCENARIOS.filter(
  (f) => !f.retired && !f.circuitType.startsWith('data') && f.circuitType !== 'ring_main'
).flatMap((f) =>
  f.testPoints.flatMap((p) =>
    p.tests
      .map((t) => {
        // Only readings that mean one thing without knowing the test set-up:
        // a healthy or failed insulation reading, OL on continuity, and a
        // raised continuity reading on a high-resistance joint. (A low
        // continuity reading between two conductors is normal with the
        // ring cross-connected and a fault without — so it's left out.)
        let ans: keyof typeof READ_ANSWER | null = null;
        if (t.mode === 'insulation' && !t.isAbnormal) ans = 'normal';
        else if (t.mode === 'insulation' && f.faultType === 'short_circuit') ans = 'short';
        else if (t.isAbnormal && f.faultType === 'open_circuit' && t.reading === 'OL') ans = 'open';
        else if (
          t.isAbnormal &&
          f.faultType === 'high_resistance' &&
          t.mode === 'continuity' &&
          t.reading !== 'OL'
        )
          ans = 'high';
        return ans ? { f, p, t, ans } : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
  )
);

function faultReadQ(rng: Rng): DrillQuestion {
  if (rng() < 0.2) {
    const q = pick(CROSSED_PAIRS, rng);
    const { options, answer } = shuffleIn(READ_ANSWER.crossed, Object.values(READ_ANSWER), rng);
    return {
      kind: 'faultRead',
      prompt: `${q.prompt} What does it tell you?`,
      options,
      answer,
      why: q.why,
    };
  }
  // Abnormal readings are the point — pick one three times out of four.
  const pool =
    rng() < 0.75
      ? FAULT_READINGS.filter((x) => x.ans !== 'normal')
      : FAULT_READINGS.filter((x) => x.ans === 'normal');
  const { f, p, t, ans } = pick(pool, rng);
  const right = READ_ANSWER[ans];
  const { options, answer } = shuffleIn(right, Object.values(READ_ANSWER), rng);
  const value = t.reading === 'OL' ? 'OL' : `${t.reading} ${t.unit}`;
  return {
    kind: 'faultRead',
    prompt: `${f.circuitName}, ${p.location}: ${t.label} on ${t.mode === 'insulation' ? 'insulation resistance (500 V)' : 'continuity'} reads ${value}. What does it tell you?`,
    options,
    answer,
    why:
      ans === 'normal'
        ? 'That reading is what a healthy circuit gives at that point.'
        : ans === 'open'
          ? 'OL on continuity means no path at all — the conductor is broken or disconnected somewhere between your leads.'
          : ans === 'short'
            ? 'A near-zero reading where the insulation should hold (at least 1.0 MΩ at 500 V, Table 64) means conductors are touching or the insulation has failed.'
            : 'There is a path, but the resistance is far higher than the cable alone would give — a loose, corroded or poorly made joint.',
  };
}

const INSPECT_OK = 'Acceptable — nothing to record';
const INSPECT_DEFECT = 'A defect — record it';

function inspectQ(rng: Rng): DrillQuestion {
  // Now and then: what comes first at the rig.
  if (rng() < 0.15) {
    const opts = shuffleIn(
      'The visual inspection',
      [
        'Continuity of protective conductors',
        'Insulation resistance',
        'Earth fault loop impedance',
      ],
      rng
    );
    return {
      kind: 'inspect',
      prompt: 'You’re at the rig for Section B, supply off. What do you do first?',
      ...opts,
      why: 'Reg 642.1: inspection precedes testing, and is normally done with the installation disconnected from the supply.',
    };
  }
  const item = pick(INSPECTION_ITEMS, rng);
  const defect = rng() < 0.5;
  return {
    kind: 'inspect',
    prompt: `${item.where}: ${defect ? item.defectSeen : item.okSeen}`,
    options: [INSPECT_OK, INSPECT_DEFECT],
    answer: defect ? 1 : 0,
    why: `Reg ${item.reg}: ${item.why}`,
  };
}

/** Table 54.8: PEN conductor (copper equivalent) → minimum main bonding. */
const TABLE_54_8: { pen: string; min: string }[] = [
  { pen: '35 mm² or less', min: '10 mm²' },
  { pen: 'over 35 mm² up to 50 mm²', min: '16 mm²' },
  { pen: 'over 50 mm² up to 95 mm²', min: '25 mm²' },
  { pen: 'over 95 mm² up to 150 mm²', min: '35 mm²' },
  { pen: 'over 150 mm²', min: '50 mm²' },
];

function bondingQ(rng: Rng): DrillQuestion {
  const which = pick(['reading', 'size', 'where'], rng);
  if (which === 'size') {
    const row = pick(TABLE_54_8, rng);
    const { options, answer } = shuffleIn(
      row.min,
      TABLE_54_8.map((r) => r.min).concat(['6 mm²']),
      rng
    );
    return {
      kind: 'bonding',
      prompt: `PME supply, PEN conductor ${row.pen} (copper). Minimum main protective bonding conductor?`,
      options,
      answer,
      why: `Table 54.8: for a PEN conductor ${row.pen}, the main protective bonding conductor is at least ${row.min} copper equivalent. The distributor's network may need a larger one.`,
    };
  }
  if (which === 'where') {
    const right =
      'On the consumer’s hard metal pipework, before any branch, within 600 mm of the meter outlet union where practicable';
    const { options, answer } = shuffleIn(
      right,
      [
        'On the gas supplier’s pipe before the meter',
        'Anywhere on the gas pipework that is easy to reach',
        'On the first branch pipe after the meter',
      ],
      rng
    );
    return {
      kind: 'bonding',
      prompt: 'Where does the main bonding connect to the incoming gas pipe?',
      options,
      answer,
      why: 'Reg 544.1.2: to the consumer’s hard metal pipework, before any branch pipework, and where practicable within 600 mm of the meter outlet union (or at the point of entry if the meter is outside).',
    };
  }
  const v = pick(['0.02', '0.03', '0.04', '0.56', '0.91', 'OL'], rng);
  const ok = v !== 'OL' && Number(v) <= 0.05;
  return {
    kind: 'bonding',
    prompt: `Main bonding continuity, MET to the ${pick(['gas', 'water'], rng)} pipe clamp, long lead nulled, reads ${v === 'OL' ? 'OL' : `${v} Ω`}.`,
    options: ['Sound — continuity confirmed', 'Fault — record it'],
    answer: ok ? 0 : 1,
    why: ok
      ? 'A few hundredths of an ohm is sound. GN3: across a clamp joint, readings should approach 0.05 Ω.'
      : v === 'OL'
        ? 'OL is a break: GN3 says the results should first and foremost show no discontinuity.'
        : 'Tenths of an ohm means a loose or corroded clamp. GN3: across a clamp joint, readings should approach 0.05 Ω.',
  };
}

const GEN: Record<DrillKind, (rng: Rng) => DrillQuestion> = {
  inspect: inspectQ,
  bonding: bondingQ,
  limits: limitsQ,
  zs: zsQ,
  columns: columnsQ,
  na: naQ,
  order: orderQ,
  method: methodQ,
  isoTester: isoTesterQ,
  isoSwitch: isoSwitchQ,
  isoOrder: isoOrderQ,
  isoPairs: isoPairsQ,
  isoTwist: isoTwistQ,
  faultRead: faultReadQ,
};

/** A drill of `count` questions across the given kinds, no repeated prompts. */
export function buildDrill(kinds: DrillKind[], count = 6, rng: Rng = Math.random): DrillQuestion[] {
  const valid = kinds.filter((k) => k in GEN);
  const use: DrillKind[] = valid.length ? valid : ['limits'];
  const out: DrillQuestion[] = [];
  const seen = new Set<string>();
  // Prefer fresh questions; some kinds only have a handful, so after a few
  // tries allow a repeat rather than ending the drill short.
  for (let slot = 0; slot < count; slot++) {
    const kind = use[slot % use.length];
    let q = GEN[kind](rng);
    for (let tries = 0; tries < 30 && seen.has(q.prompt); tries++) q = GEN[kind](rng);
    seen.add(q.prompt);
    out.push(q);
  }
  return out;
}
