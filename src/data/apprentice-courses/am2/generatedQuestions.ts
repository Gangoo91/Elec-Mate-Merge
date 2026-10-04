/**
 * AM2 Section E — generated question families (ELE-1808).
 *
 * WHY THIS EXISTS
 * A learner sitting the AM2 mock twice saw "a lot of the same questions over
 * and over". The fixed bank is 356 questions, but the paper drew the same few
 * Fault Finding and Safe Isolation items every time, and most "advanced"
 * questions were recall with a throwaway wrong answer. The real Section E is
 * open book: the candidate is expected to look things up in BS 7671, GN3 and
 * the On-Site Guide and work numbers out. A fixed question cannot test that
 * twice — once seen, the answer is remembered, not worked.
 *
 * A family is a question TEMPLATE. Each sitting draws fresh numbers, works the
 * answer out here in code from the repo's verified table data, and builds the
 * wrong answers from the mistakes candidates actually make (÷2 instead of ÷4,
 * doubling the length "for the return", the 0.8 factor applied twice, the
 * wrong curve column). So the paper never repeats, and a wrong answer can only
 * be reached by making a real mistake.
 *
 * RULES FOR EDITING
 * - Every number a question shows is ROUNDED FIRST and the answer is worked
 *   from the rounded figures, so the candidate's arithmetic and ours agree.
 * - options[0] is the key and options[1..3] are the slips IN A FIXED ORDER.
 *   The renderer shuffles (shuffleAllQuestionOptions) and records the bank
 *   position picked, so per-question stats say WHICH slip people make.
 *   Never render a generated question without shuffling it.
 * - Every slip is named in the explanation, with its number.
 * - Every fact was checked against the RAG, or where the RAG does not hold the
 *   numbers (Tables 4B1, 4C1, 4D5), against the printed BS 7671:2018+A4:2026
 *   (Desktop/05 Trade Reference/BS7671_ocr.pdf, read 4 Oct 2026). The frozen
 *   values are RAG_CHECKED in __checks__/am2Generated.check.ts. A family whose
 *   numbers nobody has confirmed is marked `verified: false` and is never put
 *   on a paper. Do not add a figure from memory.
 * - check:am2-generated generates thousands of each family and re-derives the
 *   key independently; run it after any change here.
 */
import type { AM2Question } from './questionBank';
import { MCB_RCBO_ZS_LIMITS, ZS_TEMP_FACTOR_GN3 } from '@/data/zsLimits';
import { conductorResistance } from '@/data/conductorResistance';
import { voltageDropFlatTwinEarth } from '@/lib/calculators/bs7671-data/voltageDropTables';
import { getCableCapacity } from '@/lib/calculators/bs7671-data/cableCapacities';
import {
  ambientTemperatureFactors,
  groupingFactorsTable4C1,
} from '@/lib/calculators/bs7671-data/temperatureFactors';

export type Rng = () => number;

/** Small seeded PRNG so a sitting can be reproduced in tests. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T>(r: Rng, items: readonly T[]): T => items[Math.floor(r() * items.length)];
/** Integer in [min, max]. */
const int = (r: Rng, min: number, max: number) => min + Math.floor(r() * (max - min + 1));
/** Number in [min, max] on a step grid. */
const step = (r: Rng, min: number, max: number, by: number) =>
  round(min + Math.floor(r() * (Math.round((max - min) / by) + 1)) * by, 4);
const round = (v: number, dp: number) => {
  const f = 10 ** dp;
  return Math.round(v * f) / f;
};
const r2 = (v: number) => round(v, 2);
/** Fixed two decimals, the way an instrument displays ohms. */
const f2 = (v: number) => v.toFixed(2);
const f1 = (v: number) => v.toFixed(1);

/** A family asks for a fresh draw by throwing this. */
class Redraw extends Error {}

export type AM2Category = AM2Question['category'];

interface Built {
  question: string;
  /** [key, slip, slip, slip] — order matters, see the header. */
  options: [string, string, string, string];
  explanation: string;
  reference: string;
}

export interface AM2Family {
  /** Stable id for stats and the revision pile. 9001+, clear of the fixed bank. */
  id: number;
  key: string;
  category: AM2Category;
  topic: string;
  difficulty: AM2Question['difficulty'];
  /**
   * false = the RAG could not confirm the table values this family reads, so
   * it stays off every paper until they are checked against the printed book.
   */
  verified: boolean;
  build: (r: Rng) => Built;
}

// ---------------------------------------------------------------------------
// Shared tables
// ---------------------------------------------------------------------------

/** Table 41.3, 0.4 s column. */
const maxZs = (curve: 'B' | 'C' | 'D', rating: number): number => {
  const table = MCB_RCBO_ZS_LIMITS[`type${curve}` as const]['0.4s'] as Record<number, number>;
  const v = table[rating];
  if (v === undefined) throw new Error(`No Table 41.3 value for ${curve}${rating}`);
  return v;
};

/** Flat twin and earth, line / cpc sizes as made. */
const TE_PAIRS = [
  { line: 1.0, cpc: 1.0 },
  { line: 1.5, cpc: 1.0 },
  { line: 2.5, cpc: 1.5 },
  { line: 4, cpc: 1.5 },
  { line: 6, cpc: 2.5 },
  { line: 10, cpc: 4 },
  { line: 16, cpc: 6 },
] as const;
// Written the way the trade writes it: 1.5/1.0, 2.5/1.5, 10/4.
const mm = (v: number) => (v < 2 ? v.toFixed(1) : String(v));
const teName = (p: { line: number; cpc: number }) => `${mm(p.line)}/${mm(p.cpc)} mm²`;
const r1r2PerMetre = (p: { line: number; cpc: number }) =>
  conductorResistance(p.line) + conductorResistance(p.cpc);

const teMvAm = (size: number): number => {
  const e = voltageDropFlatTwinEarth.find((x) => x.size === size);
  if (!e) throw new Error(`No Table 4D5 mV/A/m for ${size} mm²`);
  return e.twoCoreAc;
};
const teMethodC = (size: number): number => {
  const c = getCableCapacity('pvc-twin-earth', size)?.capacities?.C;
  if (typeof c !== 'number') throw new Error(`No Table 4D5 Method C rating for ${size} mm²`);
  return c;
};
const TE_SIZES = [1.5, 2.5, 4, 6, 10, 16] as const;
const smallestTeFor = (amps: number): number | null =>
  TE_SIZES.find((s) => teMethodC(s) >= amps - 1e-9) ?? null;

const caFor = (ambient: number): number => {
  const row = ambientTemperatureFactors.find((t) => t.ambientTemp === ambient);
  if (!row) throw new Error(`No Table 4B1 row for ${ambient} °C`);
  return row.factor70C;
};
const cgFor = (circuits: number): number => {
  const row = groupingFactorsTable4C1.find((g) => g.circuitsOrCables === circuits);
  if (!row) throw new Error(`No Table 4C1 row for ${circuits} circuits`);
  return row.singleLayerWall;
};

/** BS EN 60898 ratings used on the paper. */
const DEVICE_RATINGS = [6, 10, 16, 20, 25, 32, 40, 50, 63] as const;
const deviceAtLeast = (amps: number) => DEVICE_RATINGS.find((d) => d >= amps - 1e-9) ?? null;
const deviceBelow = (amps: number) => [...DEVICE_RATINGS].reverse().find((d) => d < amps) ?? null;

const U0 = 230;
const GN3_FACTOR = ZS_TEMP_FACTOR_GN3; // 0.8
const HOT_MULTIPLIER = 1.2; // OSG Table I3, 70 °C thermoplastic

// ---------------------------------------------------------------------------
// Ring final circuits
// ---------------------------------------------------------------------------

/** End-to-end readings of a healthy 2.5/1.5 ring, as an instrument shows them. */
const ringReadings = (r: Rng) => {
  const length = int(r, 38, 96);
  const r1 = r2((conductorResistance(2.5) * length) / 1000);
  const rn = r2(r1 + pick(r, [-0.01, 0, 0, 0.01]));
  const rcpc = r2((conductorResistance(1.5) * length) / 1000);
  return { r1, rn, rcpc };
};
const RING_REF = 'GN3 — ring final circuit continuity test (end-to-end, then cross-connected)';

const ringLineCpc: AM2Family = {
  id: 9001,
  key: 'ring-step3-r1r2',
  category: 'BS 7671 Inspection & Testing',
  topic: 'Ring final circuits',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    const { r1, rn, rcpc } = ringReadings(r);
    const key = r2((r1 + rcpc) / 4);
    const half = r2((r1 + rcpc) / 2);
    const sum = r2(r1 + rcpc);
    const ln = r2((r1 + rn) / 4);
    return {
      question: `A ring final circuit in 2.5/1.5 mm² flat twin and earth gives end-to-end readings of r1 = ${f2(r1)} Ω, rn = ${f2(rn)} Ω and r2 = ${f2(rcpc)} Ω. The line and cpc are then cross-connected at the board. If the ring is correct, what should each socket-outlet read between line and cpc?`,
      options: [`${f2(key)} Ω`, `${f2(half)} Ω`, `${f2(sum)} Ω`, `${f2(ln)} Ω`],
      explanation: `With line and cpc cross-connected, every socket on a correct ring reads (r1 + r2) ÷ 4 = (${f2(r1)} + ${f2(rcpc)}) ÷ 4 = ${f2(key)} Ω, and that figure is the circuit's R1 + R2 for the schedule. ${f2(half)} Ω divides by 2 instead of 4. ${f2(sum)} Ω is r1 + r2 with no division at all. ${f2(ln)} Ω is (r1 + rn) ÷ 4, which is the line–neutral reading from the previous step, not the line–cpc one.`,
      reference: `${RING_REF}; R1 + R2 = (r1 + r2) ÷ 4`,
    };
  },
};

const ringLineNeutral: AM2Family = {
  id: 9002,
  key: 'ring-step2-ln',
  category: 'BS 7671 Inspection & Testing',
  topic: 'Ring final circuits',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    const { r1, rn, rcpc } = ringReadings(r);
    const key = r2((r1 + rn) / 4);
    const half = r2((r1 + rn) / 2);
    const sum = r2(r1 + rn);
    const cpc = r2((r1 + rcpc) / 4);
    return {
      question: `End-to-end readings on a 2.5/1.5 mm² ring final circuit are r1 = ${f2(r1)} Ω, rn = ${f2(rn)} Ω and r2 = ${f2(rcpc)} Ω. The line and neutral are cross-connected at the board. If the ring is correct, what should each socket-outlet read between line and neutral?`,
      options: [`${f2(key)} Ω`, `${f2(half)} Ω`, `${f2(sum)} Ω`, `${f2(cpc)} Ω`],
      explanation: `With line and neutral cross-connected, every socket on a correct ring reads (r1 + rn) ÷ 4 = (${f2(r1)} + ${f2(rn)}) ÷ 4 = ${f2(key)} Ω, and it should be substantially the same at each one. ${f2(half)} Ω divides by 2 instead of 4. ${f2(sum)} Ω is r1 + rn undivided. ${f2(cpc)} Ω is (r1 + r2) ÷ 4, the line–cpc figure from the next step.`,
      reference: `${RING_REF}; line–neutral reading = (r1 + rn) ÷ 4`,
    };
  },
};

const ringCpcRatio: AM2Family = {
  id: 9003,
  key: 'ring-r2-ratio',
  category: 'BS 7671 Inspection & Testing',
  topic: 'Ring final circuits',
  difficulty: 'basic',
  verified: true,
  build: (r) => {
    const r1 = r2((conductorResistance(2.5) * int(r, 38, 96)) / 1000);
    const key = r2(r1 * 1.67);
    const inverted = r2(r1 / 1.67);
    const same = r1;
    const bySize = r2(r1 * 1.5);
    return {
      question: `The end-to-end reading of the line conductor of a ring final circuit in 2.5/1.5 mm² flat twin and earth is r1 = ${f2(r1)} Ω. Roughly what end-to-end reading would you expect for the cpc, r2?`,
      options: [`${f2(key)} Ω`, `${f2(inverted)} Ω`, `${f2(same)} Ω`, `${f2(bySize)} Ω`],
      explanation: `The 1.5 mm² cpc has less copper than the 2.5 mm² line, so its resistance is higher in the ratio 2.5 ÷ 1.5 ≈ 1.67: ${f2(r1)} × 1.67 = ${f2(key)} Ω. ${f2(inverted)} Ω divides by 1.67, which would make the thinner conductor the better one. ${f2(same)} Ω is what you would expect of the neutral, which is the same size as the line, not of the cpc. ${f2(bySize)} Ω multiplies by the cpc's size, 1.5, instead of the ratio of the two sizes.`,
      reference: 'GN3 — ring final circuit test; 2.5/1.5 mm² cpc reads about 1.67 × r1',
    };
  },
};

const RING_FAULTS = {
  ok: 'The ring is continuous on all three conductors; go on to the cross-connected tests',
  cpcOpen: 'The cpc ring is open somewhere along its length',
  lineOpen: 'The line conductor ring is open somewhere along its length',
  neutralHrj: 'There is a high-resistance joint somewhere in the neutral ring',
} as const;

const ringDiagnosis: AM2Family = {
  id: 9004,
  key: 'ring-end-to-end-diagnosis',
  category: 'Fault Finding',
  topic: 'Ring final circuits',
  difficulty: 'advanced',
  verified: true,
  build: (r) => {
    const { r1, rn, rcpc } = ringReadings(r);
    const fault = pick(r, ['ok', 'cpcOpen', 'lineOpen', 'neutralHrj'] as const);
    const OL = 'OL (over range)';
    let shown = { r1: f2(r1) + ' Ω', rn: f2(rn) + ' Ω', r2: f2(rcpc) + ' Ω' };
    if (fault === 'cpcOpen') shown = { ...shown, r2: OL };
    if (fault === 'lineOpen') shown = { ...shown, r1: OL };
    if (fault === 'neutralHrj')
      shown = { ...shown, rn: f2(r2(rn + step(r, 0.3, 0.6, 0.01))) + ' Ω' };
    const others = (Object.keys(RING_FAULTS) as (keyof typeof RING_FAULTS)[]).filter(
      (k) => k !== fault
    );
    const why: Record<keyof typeof RING_FAULTS, string> = {
      ok: `r1 and rn are the same size of conductor and read alike, and r2 is about 1.67 times r1 as a 1.5 mm² cpc should, so all three rings are continuous.`,
      cpcOpen: `r2 reads over range while r1 and rn are normal, so the cpc ring is broken: one leg of it does not return to the board.`,
      lineOpen: `r1 reads over range while rn and r2 are normal, so the line ring is broken somewhere.`,
      neutralHrj: `r1 and rn are the same size of conductor and should read alike; rn reads well above r1, which points to a high-resistance joint in the neutral ring rather than a break.`,
    };
    const notWhy: Record<keyof typeof RING_FAULTS, string> = {
      ok: 'The ring is not healthy: one reading is out of line with the others.',
      cpcOpen: 'An open cpc would read over range on r2, and it does not.',
      lineOpen: 'An open line conductor would read over range on r1, and it does not.',
      neutralHrj: 'A neutral high-resistance joint would show rn well above r1, and it does not.',
    };
    return {
      question: `End-to-end readings on a 2.5/1.5 mm² ring final circuit are: r1 = ${shown.r1}, rn = ${shown.rn}, r2 = ${shown.r2}. What do they show?`,
      options: [RING_FAULTS[fault], ...others.map((k) => RING_FAULTS[k])] as Built['options'],
      explanation: `${why[fault]} ${others.map((k) => notWhy[k]).join(' ')}`,
      reference: `${RING_REF}, step 1`,
    };
  },
};

// ---------------------------------------------------------------------------
// Continuity, loop impedance, fault current
// ---------------------------------------------------------------------------

const radialR1R2: AM2Family = {
  id: 9005,
  key: 'radial-r1r2-from-length',
  category: 'BS 7671 Inspection & Testing',
  topic: 'Continuity testing',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    const pair = pick(
      r,
      TE_PAIRS.filter((p) => p.line !== p.cpc)
    );
    const length = int(r, 8, 45);
    const rl = conductorResistance(pair.line);
    const rc = conductorResistance(pair.cpc);
    const key = r2(((rl + rc) * length) / 1000);
    const lineOnly = r2((rl * length) / 1000);
    const lineTwice = r2((2 * rl * length) / 1000);
    const hot = r2(key * HOT_MULTIPLIER);
    return {
      question: `A radial circuit is wired in ${teName(pair)} flat twin and earth and is ${length} m long. Using the conductor resistances in BS 7671 Appendix 9, what (R1 + R2) would you expect to measure at about 20 °C?`,
      options: [`${f2(key)} Ω`, `${f2(lineOnly)} Ω`, `${f2(lineTwice)} Ω`, `${f2(hot)} Ω`],
      explanation: `Table 9A gives ${rl} mΩ/m for ${pair.line} mm² and ${rc} mΩ/m for ${pair.cpc} mm², so (r1 + r2) = ${round(rl + rc, 3)} mΩ/m. × ${length} m ÷ 1000 = ${f2(key)} Ω. ${f2(lineOnly)} Ω is the line conductor alone. ${f2(lineTwice)} Ω treats the cpc as if it were the same size as the line. ${f2(hot)} Ω applies the 1.20 multiplier for 70 °C, which is for design calculations, not a reading taken cold.`,
      reference:
        'BS 7671 Appendix 9 Table 9A (mΩ/m at 20 °C); GN3 — × 1.20 for 70 °C operating temperature',
    };
  },
};

/** Line / cpc pair a circuit of this rating would typically use. */
const pairForRating = (rating: number) =>
  rating <= 10
    ? TE_PAIRS[1] // 1.5/1.0
    : rating <= 20
      ? TE_PAIRS[2] // 2.5/1.5
      : rating <= 32
        ? TE_PAIRS[3] // 4/1.5
        : TE_PAIRS[4]; // 6/2.5

const designZs: AM2Family = {
  id: 9006,
  key: 'design-zs-verdict',
  category: 'BS 7671 Selection & Erection',
  topic: 'Earth fault loop impedance',
  difficulty: 'advanced',
  verified: true,
  build: (r) => {
    const curve = pick(r, ['B', 'C'] as const);
    const rating = pick(r, [6, 10, 16, 20, 32, 40] as const);
    const pair = pairForRating(rating);
    const ze = step(r, 0.2, 0.8, 0.05);
    const length = int(r, 10, curve === 'C' ? 45 : 110);
    const cold = r2((r1r2PerMetre(pair) * length) / 1000);
    const hotR = r2(cold * HOT_MULTIPLIER);
    const zs = r2(ze + hotR);
    const max = maxZs(curve, rating);
    const site = r2(max * GN3_FACTOR);
    const verdict = (v: number, limit: number) =>
      `${f2(v)} Ω — ${v <= limit ? 'complies with' : 'exceeds'} the ${f2(limit)} Ω maximum`;
    const noHot = r2(ze + cold);
    // A design within a whisker of the limit turns on rounding; redraw it.
    if (Math.abs(zs - max) < 0.02 || Math.abs(noHot - max) < 0.02) throw new Redraw();
    return {
      question: `A ${rating} A Type ${curve} circuit-breaker protects a ${length} m radial in ${teName(pair)} flat twin and earth. Ze is ${f2(ze)} Ω. Using Table 9A, the 1.20 multiplier for 70 °C and Table 41.3, what is the design Zs and does it comply?`,
      options: [verdict(zs, max), verdict(noHot, max), verdict(zs, site), verdict(hotR, max)],
      explanation: `(R1 + R2) = ${round(r1r2PerMetre(pair), 3)} mΩ/m × ${length} m ÷ 1000 = ${f2(cold)} Ω at 20 °C; × 1.20 for 70 °C = ${f2(hotR)} Ω. Zs = ${f2(ze)} + ${f2(hotR)} = ${f2(zs)} Ω against the Table 41.3 maximum of ${f2(max)} Ω for a Type ${curve} ${rating} A. ${f2(noHot)} Ω leaves out the 1.20 multiplier, so it is the cold figure. The ${f2(site)} Ω limit is 0.8 × ${f2(max)}, the GN3 check for a MEASURED reading; a design value at 70 °C is compared with the table itself. ${f2(hotR)} Ω leaves out Ze.`,
      reference:
        'BS 7671 Table 41.3 (Reg 411.4.204) and Appendix 9 Table 9A; GN3 — Zs = Ze + 1.20 × (R1 + R2)',
    };
  },
};

const OTHER_CURVE = { B: 'C', C: 'D' } as const;

const measuredZs: AM2Family = {
  id: 9007,
  key: 'measured-zs-verdict',
  category: 'BS 7671 Inspection & Testing',
  topic: 'Earth fault loop impedance',
  difficulty: 'advanced',
  verified: true,
  build: (r) => {
    const curve = pick(r, ['B', 'C'] as const);
    const rating = pick(r, [6, 10, 16, 20, 32, 40] as const);
    const max = maxZs(curve, rating);
    const site = r2(max * GN3_FACTOR);
    const accept = r() < 0.5;
    const target = accept ? max * step(r, 0.68, 0.78, 0.01) : max * step(r, 0.83, 0.94, 0.01);
    const ze = r2(target * step(r, 0.3, 0.6, 0.05));
    const r1r2 = r2(target - ze);
    const zs = r2(ze + r1r2);
    if (
      accept
        ? !(zs <= site && zs * 1.2 > site && zs > r2(site * GN3_FACTOR))
        : !(zs > site && zs < max && r2(zs / 1.2) <= site && r1r2 <= site)
    )
      throw new Redraw();
    const stem = `A Type ${curve} ${rating} A circuit-breaker protects a final circuit. Tested at about 20 °C, Ze is ${f2(ze)} Ω and (R1 + R2) is ${f2(r1r2)} Ω. What should you conclude about Zs?`;
    const base = `Zs = Ze + (R1 + R2) = ${f2(ze)} + ${f2(r1r2)} = ${f2(zs)} Ω. Table 41.3 gives ${f2(max)} Ω for a Type ${curve} ${rating} A, but that is at conductor operating temperature; GN3 accepts a reading taken cold when it is no more than 0.8 × ${f2(max)} = ${f2(site)} Ω.`;
    if (accept) {
      const other = OTHER_CURVE[curve];
      const otherSite = r2(maxZs(other, rating) * GN3_FACTOR);
      const twice = r2(site * GN3_FACTOR);
      const hot = r2(zs * HOT_MULTIPLIER);
      return {
        question: stem,
        options: [
          `Satisfactory — ${f2(zs)} Ω is within 0.8 × ${f2(max)} = ${f2(site)} Ω`,
          `Unsatisfactory — ${f2(zs)} × 1.20 = ${f2(hot)} Ω exceeds ${f2(site)} Ω`,
          `Unsatisfactory — ${f2(zs)} Ω exceeds 0.8 × ${f2(site)} = ${f2(twice)} Ω`,
          `Unsatisfactory — ${f2(zs)} Ω exceeds 0.8 × ${f2(maxZs(other, rating))} = ${f2(otherSite)} Ω`,
        ],
        explanation: `${base} ${f2(zs)} Ω is within it. Multiplying the reading by 1.20 (${f2(hot)} Ω) mixes two methods: the 0.8 factor already allows for the conductors warming up. ${f2(twice)} Ω applies 0.8 twice. ${f2(otherSite)} Ω is the figure for a Type ${other} device, read from the wrong column.`,
        reference:
          'BS 7671 Table 41.3 (Reg 411.4.204); GN3 Appendix 3 — measured Zs ≤ 0.8 × tabulated maximum',
      };
    }
    const cooled = r2(zs / HOT_MULTIPLIER);
    return {
      question: stem,
      options: [
        `Unsatisfactory — ${f2(zs)} Ω exceeds 0.8 × ${f2(max)} = ${f2(site)} Ω`,
        `Satisfactory — ${f2(zs)} Ω is within the Table 41.3 maximum of ${f2(max)} Ω`,
        `Satisfactory — ${f2(zs)} ÷ 1.20 = ${f2(cooled)} Ω is within ${f2(site)} Ω`,
        `Satisfactory — (R1 + R2) of ${f2(r1r2)} Ω is within 0.8 × ${f2(max)} = ${f2(site)} Ω`,
      ],
      explanation: `${base} ${f2(zs)} Ω is over it, so the circuit is not shown to disconnect in time. Comparing with ${f2(max)} Ω directly ignores that the conductors are cold when tested. Dividing by 1.20 (${f2(cooled)} Ω) corrects in the wrong direction. Comparing (R1 + R2) alone leaves out Ze, which is part of every earth fault loop.`,
      reference:
        'BS 7671 Table 41.3 (Reg 411.4.204); GN3 Appendix 3 — measured Zs ≤ 0.8 × tabulated maximum',
    };
  },
};

const maxMeasuredZs: AM2Family = {
  id: 9008,
  key: 'max-measured-zs',
  category: 'BS 7671 Inspection & Testing',
  topic: 'Earth fault loop impedance',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    const curve = pick(r, ['B', 'C'] as const);
    const rating = pick(r, [6, 10, 16, 20, 25, 32, 40, 50] as const);
    const max = maxZs(curve, rating);
    const key = r2(max * GN3_FACTOR);
    const divided = r2(max / GN3_FACTOR);
    const other = OTHER_CURVE[curve];
    const wrongColumn = r2(maxZs(other, rating) * GN3_FACTOR);
    return {
      question: `You are testing a final circuit protected by a ${rating} A Type ${curve} circuit-breaker, at about 20 °C. What is the highest measured Zs that GN3 would accept?`,
      options: [`${f2(key)} Ω`, `${f2(max)} Ω`, `${f2(divided)} Ω`, `${f2(wrongColumn)} Ω`],
      explanation: `Table 41.3 gives ${f2(max)} Ω for a Type ${curve} ${rating} A. Those values hold at the conductors' operating temperature, so a cold reading must not exceed 0.8 × ${f2(max)} = ${f2(key)} Ω. ${f2(max)} Ω is the table value with no correction. ${f2(divided)} Ω divides by 0.8, allowing more than the table instead of less. ${f2(wrongColumn)} Ω is 0.8 × the Type ${other} value, the wrong curve.`,
      reference:
        'BS 7671 Table 41.3 (Reg 411.4.204); GN3 Appendix 3 — measured Zs ≤ 0.8 × tabulated maximum',
    };
  },
};

const faultCurrent: AM2Family = {
  id: 9009,
  key: 'earth-fault-current-far-end',
  category: 'BS 7671 Inspection & Testing',
  topic: 'Prospective fault current',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    const ze = step(r, 0.15, 0.8, 0.01);
    const r1r2 = step(r, 0.2, 1.2, 0.01);
    const zs = r2(ze + r1r2);
    const amps = (z: number, u = U0) => Math.round(u / z);
    const key = amps(zs);
    const atOrigin = amps(ze);
    const circuitOnly = amps(r1r2);
    const lineToLine = amps(zs, 400);
    if (new Set([key, atOrigin, circuitOnly, lineToLine]).size < 4) throw new Redraw();
    return {
      question: `Ze at the origin is ${f2(ze)} Ω and the (R1 + R2) of a final circuit is ${f2(r1r2)} Ω. With U0 = 230 V, estimate the earth fault current for a fault at the far end of the circuit.`,
      options: [`${key} A`, `${atOrigin} A`, `${circuitOnly} A`, `${lineToLine} A`],
      explanation: `GN3 estimates fault current as the nominal voltage divided by the loop impedance, and the loop is the whole of it: Zs = ${f2(ze)} + ${f2(r1r2)} = ${f2(zs)} Ω, and I = U0 ÷ Zs = 230 ÷ ${f2(zs)} ≈ ${key} A. ${atOrigin} A uses Ze alone, which is the fault current at the origin, not at the far end. ${circuitOnly} A uses (R1 + R2) alone and ignores the supply's part of the loop. ${lineToLine} A uses 400 V, the line-to-line voltage; an earth fault is driven by the 230 V line-to-earth voltage.`,
      reference: 'GN3 1.8 — prospective fault current ≈ nominal voltage ÷ Zs',
    };
  },
};

// ---------------------------------------------------------------------------
// Design: voltage drop, cable sizing, device selection
// ---------------------------------------------------------------------------

const VD_CIRCUITS = [
  { what: 'lighting circuit', size: 1.0, rating: 6, ib: [2, 5], len: [20, 60], lighting: true },
  { what: 'lighting circuit', size: 1.5, rating: 10, ib: [3, 8], len: [25, 70], lighting: true },
  {
    what: 'radial socket-outlet circuit',
    size: 2.5,
    rating: 20,
    ib: [12, 19],
    len: [18, 40],
    lighting: false,
  },
  {
    what: 'radial circuit to a workshop',
    size: 4,
    rating: 32,
    ib: [20, 30],
    len: [25, 55],
    lighting: false,
  },
  { what: 'shower circuit', size: 6, rating: 40, ib: [30, 39], len: [12, 40], lighting: false },
  { what: 'shower circuit', size: 10, rating: 50, ib: [40, 48], len: [18, 45], lighting: false },
] as const;
const vdLimit = (lighting: boolean) => (lighting ? 6.9 : 11.5);

const voltageDrop: AM2Family = {
  id: 9010,
  key: 'voltage-drop-verdict',
  category: 'BS 7671 Selection & Erection',
  topic: 'Voltage drop',
  difficulty: 'intermediate',
  // Table 4Ab (3% / 5%) from the RAG; Table 4D5 mV/A/m read off the printed
  // book (p. 484), 4 Oct 2026.
  verified: true,
  build: (r) => {
    const c = pick(r, VD_CIRCUITS);
    const ib = int(r, c.ib[0], c.ib[1]);
    const length = int(r, c.len[0], c.len[1]);
    const mv = teMvAm(c.size);
    const vd = r2((mv * ib * length) / 1000);
    const doubled = r2(vd * 2);
    const onRating = r2((mv * c.rating * length) / 1000);
    const limit = vdLimit(c.lighting);
    const wrongLimit = vdLimit(!c.lighting);
    if (Math.abs(vd - limit) < 0.1) throw new Redraw();
    const verdict = (v: number, l: number) =>
      `${f2(v)} V — ${v <= l ? 'within' : 'over'} the ${f1(l)} V limit`;
    return {
      question: `A ${c.what} supplied from the public network is wired in ${c.size} mm² flat twin and earth, ${length} m long. The design current is ${ib} A and the circuit-breaker is rated ${c.rating} A. What is the voltage drop, and is it within the limit in Appendix 4?`,
      options: [
        verdict(vd, limit),
        verdict(doubled, limit),
        verdict(onRating, limit),
        verdict(vd, wrongLimit),
      ],
      explanation: `Table 4D5 gives ${mv} mV/A/m for ${c.size} mm². Voltage drop = ${mv} × ${ib} A × ${length} m ÷ 1000 = ${f2(vd)} V. For ${c.lighting ? 'lighting' : 'a circuit other than lighting'}, Table 4Ab allows ${c.lighting ? '3' : '5'}% of 230 V = ${f1(limit)} V. ${f2(doubled)} V doubles the length "for the return": the mV/A/m figure already covers both conductors. ${f2(onRating)} V uses the ${c.rating} A device rating; voltage drop is worked on the design current Ib. The ${f1(wrongLimit)} V limit is the ${c.lighting ? '5% figure for other circuits' : '3% figure for lighting'}.`,
      reference: 'BS 7671 Appendix 4 Table 4D5 (mV/A/m) and Table 4Ab (3% lighting, 5% other uses)',
    };
  },
};

const cableSizing: AM2Family = {
  id: 9011,
  key: 'cable-size-correction-factors',
  category: 'BS 7671 Selection & Erection',
  topic: 'Cable selection',
  difficulty: 'advanced',
  // Tables 4B1, 4C1 and 4D5 hold no numeric rows in the RAG (its only T&E
  // rating rows are mislabelled "4D1A" and wrong), so they were read off the
  // printed book, 4 Oct 2026, with Appendix 4 §5.1.2 Equation 2.
  verified: true,
  build: (r) => {
    const rating = pick(r, [16, 20, 32, 40] as const);
    const ib = rating - int(r, 2, 6);
    const ambient = pick(r, [25, 30, 35, 40, 45] as const);
    const circuits = int(r, 2, 6);
    const ca = caFor(ambient);
    const cg = cgFor(circuits);
    const it = round(rating / (ca * cg), 1);
    const multiplied = round(rating * ca * cg, 1);
    const onIb = round(ib / (ca * cg), 1);
    const noGroup = round(rating / ca, 1);
    const sizes = [it, multiplied, onIb, noGroup].map(smallestTeFor);
    if (sizes.some((s) => s === null)) throw new Redraw();
    const opt = (amps: number, size: number | null) => `It ≥ ${f1(amps)} A — ${size} mm²`;
    return {
      question: `A circuit with a design current of ${ib} A is protected by a ${rating} A circuit-breaker. It is to be wired in flat twin and earth, clipped direct, touching ${circuits - 1} other circuit${circuits > 2 ? 's' : ''} in a single layer on a wall, where the ambient temperature is ${ambient} °C. The circuits in the group may be overloaded at the same time. What tabulated current-carrying capacity is needed, and what is the smallest cable that provides it?`,
      options: [
        opt(it, sizes[0]),
        opt(multiplied, sizes[1]),
        opt(onIb, sizes[2]),
        opt(noGroup, sizes[3]),
      ],
      explanation: `Ca for ${ambient} °C (Table 4B1, 70 °C thermoplastic) is ${ca}; Cg for ${circuits} circuits in a single layer on a wall (Table 4C1) is ${cg}. It ≥ In ÷ (Ca × Cg) = ${rating} ÷ (${ca} × ${cg}) = ${f1(it)} A, and Table 4D5 Method C gives ${sizes[0]} mm² at ${teMethodC(sizes[0]!)} A as the smallest that meets it. ${f1(multiplied)} A multiplies by the factors instead of dividing. ${f1(onIb)} A sizes on the design current: Appendix 4 only lets Ib in through its Equations 3 and 4, for a group not liable to simultaneous overload, and even then not on its own. ${f1(noGroup)} A leaves out the grouping factor. Voltage drop and Zs still have to be checked separately.`,
      reference:
        'BS 7671 Appendix 4 §5.1.2 Equation 2 (It ≥ In ÷ (Ca × Cg)); Tables 4B1, 4C1, 4D5 Method C; Reg 433.1.1',
    };
  },
};

const LOADS = [
  { what: 'an electric shower rated', kw: [7.5, 10.5] },
  { what: 'an instantaneous water heater rated', kw: [6, 9] },
  { what: 'a 3 kW immersion heater', kw: [3, 3] },
  { what: 'a fixed heater rated', kw: [2, 4] },
] as const;

const deviceSelection: AM2Family = {
  id: 9012,
  key: 'design-current-and-device',
  category: 'BS 7671 Selection & Erection',
  topic: 'Protective devices',
  difficulty: 'basic',
  verified: true,
  build: (r) => {
    const load = pick(r, LOADS);
    const kw = step(r, load.kw[0], load.kw[1], 0.5);
    const ib = round((kw * 1000) / U0, 1);
    const at240 = round((kw * 1000) / 240, 1);
    const at400 = round((kw * 1000) / 400, 1);
    const key = deviceAtLeast(ib);
    const under = deviceBelow(ib);
    const d240 = deviceAtLeast(at240);
    const d400 = deviceAtLeast(at400);
    if (!key || !under || !d240 || !d400 || Math.abs(ib - key) < 0.05) throw new Redraw();
    const opt = (amps: number, dev: number) => `Ib = ${f1(amps)} A — ${dev} A device`;
    const desc = load.kw[0] === load.kw[1] ? load.what : `${load.what} ${kw} kW`;
    return {
      question: `A single-phase circuit supplies ${desc} at 230 V. What is the design current, and what is the smallest standard circuit-breaker rating that satisfies Ib ≤ In?`,
      options: [opt(ib, key), opt(ib, under), opt(at240, d240), opt(at400, d400)],
      explanation: `Ib = P ÷ U = ${kw * 1000} W ÷ 230 V = ${f1(ib)} A, so the device must be rated at least that: ${key} A is the smallest standard rating that is. ${under} A is the nearest rating, but it is below Ib, so it would trip on normal load. ${f1(at240)} A uses 240 V; the nominal voltage is 230 V. ${f1(at400)} A uses 400 V, the line-to-line voltage of a three-phase supply. The cable then needs Iz ≥ In.`,
      reference:
        'BS 7671 Reg 433.1.1(a) device rating ≥ design current, (b) ≤ cable capacity; P = U × I',
    };
  },
};

// ---------------------------------------------------------------------------
// Insulation resistance
// ---------------------------------------------------------------------------

const IR_CIRCUITS = [
  { what: '230 V lighting final circuit', volts: 500, min: 1.0 },
  { what: '230 V radial socket-outlet circuit', volts: 500, min: 1.0 },
  { what: '400 V three-phase motor circuit', volts: 500, min: 1.0 },
  { what: '12 V SELV lighting circuit', volts: 250, min: 0.5 },
] as const;
const IR_ROWS = [
  { volts: 250, min: 0.5 },
  { volts: 500, min: 1.0 },
  { volts: 1000, min: 1.0 },
] as const;

const irVerdict: AM2Family = {
  id: 9013,
  key: 'insulation-resistance-verdict',
  category: 'BS 7671 Inspection & Testing',
  topic: 'Insulation resistance',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    const c = pick(r, IR_CIRCUITS);
    const reading = c.min === 1.0 ? step(r, 0.55, 1.9, 0.05) : step(r, 0.25, 0.95, 0.05);
    if (Math.abs(reading - c.min) < 0.05) throw new Redraw();
    const opt = (volts: number, min: number, pass: boolean) =>
      `${volts} V d.c., ${f1(min)} MΩ minimum — ${pass ? 'passes' : 'fails'}`;
    const keyPass = reading >= c.min;
    const others = IR_ROWS.filter((row) => row.volts !== c.volts);
    return {
      question: `An insulation resistance test on a ${c.what} reads ${reading.toFixed(2)} MΩ. What test voltage and minimum value apply, and does the circuit pass?`,
      options: [
        opt(c.volts, c.min, keyPass),
        opt(c.volts, c.min, !keyPass),
        opt(others[0].volts, others[0].min, reading >= others[0].min),
        opt(others[1].volts, others[1].min, reading >= others[1].min),
      ],
      explanation: `Table 64 sets 250 V d.c. and 0.5 MΩ for SELV and PELV circuits, 500 V and 1.0 MΩ for other circuits up to and including 500 V, and 1000 V and 1.0 MΩ above 500 V. A ${c.what} is tested at ${c.volts} V with a ${f1(c.min)} MΩ minimum, so ${reading.toFixed(2)} MΩ ${keyPass ? 'passes' : 'fails'}. ${c.what.startsWith('400') ? 'At 400 V the circuit is still not above 500 V, so the 1000 V row does not apply. ' : ''}The other options use the wrong row of the table or misread the minimum.`,
      reference: 'BS 7671 Table 64',
    };
  },
};

const irParallel: AM2Family = {
  id: 9014,
  key: 'insulation-resistance-parallel',
  category: 'BS 7671 Inspection & Testing',
  topic: 'Insulation resistance',
  difficulty: 'advanced',
  verified: true,
  build: (r) => {
    const n = int(r, 3, 4);
    const pool = [20, 25, 40, 50, 60, 80, 100, 120, 150, 200];
    const readings: number[] = [];
    while (readings.length < n) {
      const v = pick(r, pool);
      if (!readings.includes(v)) readings.push(v);
    }
    const key = round(1 / readings.reduce((s, v) => s + 1 / v, 0), 1);
    const sum = readings.reduce((s, v) => s + v, 0);
    const mean = round(sum / n, 1);
    const lowest = Math.min(...readings);
    return {
      question: `Tested one at a time, ${n} circuits on a board read ${readings.slice(0, -1).join(' MΩ, ')} MΩ and ${readings[n - 1]} MΩ between live conductors and earth. Roughly what would one test of all ${n} together read?`,
      options: [`${f1(key)} MΩ`, `${sum} MΩ`, `${f1(mean)} MΩ`, `${lowest} MΩ`],
      explanation: `The circuits' insulation forms paths to earth in parallel, so testing them together always reads lower than the lowest one on its own: 1 ÷ (${readings.map((v) => `1/${v}`).join(' + ')}) = ${f1(key)} MΩ. ${sum} MΩ adds them as if they were in series. ${f1(mean)} MΩ is their average. ${lowest} MΩ is the lowest circuit alone; the others still add paths. This is why a whole-board reading can look low when every circuit is healthy.`,
      reference: 'Resistances in parallel: 1/R = 1/R1 + 1/R2 + …; BS 7671 Table 64',
    };
  },
};

const IR_FAULTS = {
  ln: 'A short circuit between line and neutral',
  le: 'A fault between line and earth',
  ne: 'A fault between neutral and earth',
} as const;

const irDiagnosis: AM2Family = {
  id: 9015,
  key: 'insulation-resistance-diagnosis',
  category: 'Fault Finding',
  topic: 'Insulation resistance',
  difficulty: 'advanced',
  verified: true,
  build: (r) => {
    const lampsIn = r() < 0.25;
    const fault = lampsIn ? null : pick(r, ['ln', 'le', 'ne'] as const);
    const low = `${step(r, 0.0, 0.08, 0.01).toFixed(2)} MΩ`;
    const high = '>299 MΩ';
    const reading = (pair: 'ln' | 'le' | 'ne') =>
      fault === pair || (lampsIn && pair === 'ln') ? low : high;
    const lamps =
      'No fault shown yet: the line–neutral reading is through the lamps, which must be removed before retesting';
    const openCpc = 'An open circuit in the cpc somewhere along the circuit';
    const setup = lampsIn
      ? 'The lamps are still in their lampholders and the switches are on.'
      : 'All lamps have been removed and the switches are on.';
    const readings = `L–N ${reading('ln')}, L–E ${reading('le')}, N–E ${reading('ne')}`;
    if (lampsIn) {
      return {
        question: `An insulation resistance test at 500 V on a lighting circuit reads: ${readings}. ${setup} What do the readings show?`,
        options: [lamps, IR_FAULTS.ln, IR_FAULTS.le, IR_FAULTS.ne],
        explanation: `GN3 sets up this test with the lamps removed and the switches on. With lamps in place, the test between line and neutral passes through the lamp loads, so a near-zero L–N reading is expected and proves nothing. L–E and N–E are both high, so there is no fault to earth. Remove the lamps (or test line and neutral together to earth) and retest before calling a short circuit.`,
        reference: 'GN3 2.24 — remove GLS lamps, switches on, before insulation resistance testing',
      };
    }
    const others = (['ln', 'le', 'ne'] as const).filter((k) => k !== fault);
    return {
      question: `An insulation resistance test at 500 V on a lighting circuit reads: ${readings}. ${setup} What do the readings show?`,
      options: [IR_FAULTS[fault!], IR_FAULTS[others[0]], IR_FAULTS[others[1]], openCpc],
      explanation: `Only the ${fault!.toUpperCase().split('').join('–')} reading is low (${low}); the other two are high. With the loads removed, that points to ${IR_FAULTS[fault!].toLowerCase()}. The other fault types would show up as a low reading on their own pair. An insulation resistance test cannot find an open cpc; that needs a continuity test.`,
      reference: 'BS 7671 Table 64; GN3 2.24 — test set-up for lighting circuits',
    };
  },
};

// ---------------------------------------------------------------------------
// RCDs
// ---------------------------------------------------------------------------

const rcdVerdict: AM2Family = {
  id: 9016,
  key: 'rcd-trip-time-verdict',
  category: 'BS 7671 Inspection & Testing',
  topic: 'RCD testing',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    const kase = pick(r, ['generalPass', 'generalFail', 'sPass', 'sTooFast'] as const);
    const ref =
      'BS 7671 Reg 643.8 NOTE — AC test at IΔn: 300 ms maximum for a general non-delay RCD. Type S window (130–500 ms): BS EN 61008-1 / BS EN 61009-1';
    const a4 =
      'The NOTE to Reg 643.8 deems an RCD verified by an AC test at IΔn, so there is no 40 ms limit and no further test at 5 × IΔn to pass (Table 3A was deleted by A2:2022). 0.4 s is the Chapter 41 disconnection time for automatic disconnection (Reg 411.3.2.2), not an RCD test limit.';
    if (kase === 'generalPass' || kase === 'generalFail') {
      const pass = kase === 'generalPass';
      const t = pass ? int(r, 45, 125) : int(r, 310, 395);
      const q = `A 30 mA general non-delay RCD is tested at its rated residual operating current, IΔn, and trips in ${t} ms. What is the result?`;
      if (pass) {
        return {
          question: q,
          options: [
            `Pass — ${t} ms is within the 300 ms maximum`,
            `Fail — ${t} ms is over the 40 ms maximum`,
            `Fail — ${t} ms is under the 130 ms minimum`,
            `Fail — it must also be tested at 5 × IΔn`,
          ],
          explanation: `At IΔn a general non-delay RCD must disconnect within 300 ms, so ${t} ms passes. ${a4} The 130 ms minimum applies only to a type S (time-delayed) RCD.`,
          reference: ref,
        };
      }
      return {
        question: q,
        options: [
          `Fail — ${t} ms is over the 300 ms maximum`,
          `Pass — ${t} ms is within the 500 ms maximum`,
          `Pass — ${t} ms is within the 0.4 s disconnection time`,
          `Pass — only a 5 × IΔn test has a time limit`,
        ],
        explanation: `At IΔn a general non-delay RCD must disconnect within 300 ms, so ${t} ms fails. 500 ms is the upper limit for a type S RCD, not this one. ${a4}`,
        reference: ref,
      };
    }
    const tooFast = kase === 'sTooFast';
    const t = tooFast ? int(r, 60, 120) : int(r, 410, 490);
    const q = `A 100 mA type S (time-delayed) RCD is tested at IΔn and trips in ${t} ms. What is the result?`;
    if (tooFast) {
      return {
        question: q,
        options: [
          `Fail — ${t} ms is under the 130 ms minimum`,
          `Pass — ${t} ms is within the 300 ms maximum`,
          `Pass — ${t} ms is within the 500 ms maximum`,
          `Pass — ${t} ms is within the 0.4 s disconnection time`,
        ],
        explanation: `A type S RCD is meant to be delayed so it discriminates with RCDs downstream: at IΔn its product standard (BS EN 61008-1 / 61009-1) requires between 130 ms and 500 ms. ${t} ms is too fast, so it would not discriminate. 300 ms is the limit for a general non-delay RCD. ${a4}`,
        reference: ref,
      };
    }
    return {
      question: q,
      options: [
        `Pass — ${t} ms is within 130 to 500 ms`,
        `Fail — ${t} ms is over the 300 ms maximum`,
        `Fail — ${t} ms is over the 0.4 s disconnection time`,
        `Fail — ${t} ms is over the 40 ms maximum`,
      ],
      explanation: `At IΔn its product standard requires a type S RCD to operate between 130 ms and 500 ms, so ${t} ms passes. 300 ms is the limit for a general non-delay RCD. ${a4}`,
      reference: ref,
    };
  },
};

// ---------------------------------------------------------------------------
// Safe isolation and fault location
// ---------------------------------------------------------------------------

/*
 * The order every source in the RAG agrees on (4 Oct 2026): the electrical H&S
 * procedure and HSE HSG85 paras 53–55 — take the load off, switch off and lock
 * off, prove the tester, prove dead between all conductors, re-prove. Warning
 * notices are left out ON PURPOSE: that procedure fits them after proving dead,
 * while common UK practice fits the caution notice with the lock, so a
 * "which comes next" question about them would have two defensible answers.
 */
const ISOLATION_STEPS = [
  'Take the load off the circuit',
  'Switch off the isolator and lock it off',
  'Prove the voltage indicator on a proving unit',
  'Test between all conductors to prove the circuit dead',
  'Prove the voltage indicator again on the proving unit',
] as const;

const isolationOrder: AM2Family = {
  id: 9017,
  key: 'safe-isolation-sequence',
  category: 'Safe Isolation',
  topic: 'Procedure',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    const after = r() < 0.5;
    // Every step except the first has one before it; every one except the last has one after.
    const at = after
      ? int(r, 0, ISOLATION_STEPS.length - 2)
      : int(r, 1, ISOLATION_STEPS.length - 1);
    const keyIndex = after ? at + 1 : at - 1;
    // Five steps: the anchor, the key, and the other three as distractors.
    const wrong = ISOLATION_STEPS.map((_, i) => i).filter((i) => i !== at && i !== keyIndex);
    const why: Record<number, string> = {
      0: 'Isolators are not meant to break load, so the load comes off first.',
      1: 'Locking off before any test means nobody can restore the supply while you work.',
      2: 'Proving the indicator first shows it can detect a voltage at all.',
      3: 'Every combination is tested — line–neutral, line–earth, neutral–earth on single phase — because any of them could be live.',
      4: 'Proving it again afterwards shows it did not fail during the test, so the dead reading was real.',
    };
    return {
      question: `In the safe isolation procedure, which step comes immediately ${after ? 'after' : 'before'} “${ISOLATION_STEPS[at]}”?`,
      options: [
        ISOLATION_STEPS[keyIndex],
        ...wrong.map((i) => ISOLATION_STEPS[i]),
      ] as Built['options'],
      explanation: `The sequence is: ${ISOLATION_STEPS.map((s, i) => `${i + 1}. ${s.toLowerCase()}`).join('; ')}. ${why[keyIndex]}`,
      reference: 'HSE HSG85 Electricity at work: safe working practices, paras 53–55; HSE GS38',
    };
  },
};

const continuityBreak: AM2Family = {
  id: 9018,
  key: 'continuity-break-location',
  category: 'Fault Finding',
  topic: 'Continuity',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    const n = int(r, 5, 6);
    const k = int(r, 1, n - 1); // last socket that still reads
    const first = step(r, 0.08, 0.2, 0.01);
    const inc = step(r, 0.05, 0.11, 0.01);
    const readings = Array.from({ length: n }, (_, i) =>
      i < k ? `socket ${i + 1}: ${f2(first + inc * i)} Ω` : `socket ${i + 1}: OL`
    );
    const seg = (a: number) =>
      a === 0 ? 'Between the board and socket 1' : `Between socket ${a} and socket ${a + 1}`;
    const key = seg(k);
    const candidates = Array.from({ length: n }, (_, a) => a).filter((a) => a !== k);
    candidates.sort((a, b) => Math.abs(a - k) - Math.abs(b - k) || a - b);
    const wrong = candidates.slice(0, 3).map(seg);
    return {
      question: `With line and cpc linked at the board, (R1 + R2) is measured at each socket on a radial circuit, working outwards: ${readings.join(', ')}. Where is the break?`,
      options: [key, ...wrong] as Built['options'],
      explanation: `The readings rise steadily with distance up to socket ${k} and then go open circuit, so the conductor is continuous to socket ${k} and broken before socket ${k + 1}: the fault is in the cable or terminations between socket ${k} and socket ${k + 1}. Every socket beyond the break reads OL too, which is why the first OL, not the last, locates it.`,
      reference:
        'GN3 — continuity of protective conductors; locating an open circuit by testing outwards',
    };
  },
};

/*
 * Proving dead: the test combinations, as the electrical H&S procedure in the
 * RAG lists them (safety_facets, 4 Oct 2026): single-phase L–N, L–E, N–E;
 * three-phase every line to every line, every line to N, every line to E,
 * and N–E — ten in all.
 */
const THREE_PHASE_TESTS = [
  'L1–L2',
  'L1–L3',
  'L2–L3',
  'L1–N',
  'L2–N',
  'L3–N',
  'L1–E',
  'L2–E',
  'L3–E',
  'N–E',
] as const;

const provingDeadTests: AM2Family = {
  id: 9019,
  key: 'proving-dead-tests',
  category: 'Safe Isolation',
  topic: 'Proving Dead',
  difficulty: 'intermediate',
  verified: true,
  build: (r) => {
    if (r() < 0.5) {
      const three = r() < 0.7;
      if (three) {
        return {
          question:
            'A three-phase and neutral supply has been isolated. How many separate tests between conductors are needed to prove it dead?',
          options: ['10', '6', '9', '7'],
          explanation:
            'Test every line to every other line (L1–L2, L1–L3, L2–L3), every line to neutral (3), every line to earth (3), and neutral to earth: 10 tests. 6 leaves out the tests to earth. 9 leaves out neutral to earth, which can be live through a borrowed or faulty neutral. 7 tests line to line and line to neutral and then only neutral to earth, missing each line to earth.',
          reference:
            'HSE HSG85 para 53 (prove all supply conductors dead); electrical H&S safe isolation procedure',
        };
      }
      return {
        question:
          'A single-phase circuit has been isolated. How many separate tests between conductors are needed to prove it dead?',
        options: ['3', '1', '2', '4'],
        explanation:
          'Line to neutral, line to earth and neutral to earth: 3 tests. 1 (line to neutral only) misses a line that is live with respect to earth when the neutral is open. 2 leaves out neutral to earth. 4 counts a test that does not exist on a single-phase circuit.',
        reference: 'HSE HSG85 para 53; electrical H&S safe isolation procedure',
      };
    }
    const missing = pick(r, THREE_PHASE_TESTS);
    const done = THREE_PHASE_TESTS.filter((t) => t !== missing);
    // Shown in a scrambled order, as a record on site would be.
    const shown = [...done].sort(() => r() - 0.5);
    const wrong = [...done].sort(() => r() - 0.5).slice(0, 3);
    return {
      question: `To prove a three-phase and neutral supply dead, an electrician records these tests: ${shown.join(', ')}. Which test has been missed?`,
      options: [missing, ...wrong] as Built['options'],
      explanation: `Proving dead on three-phase and neutral takes 10 tests: L1–L2, L1–L3, L2–L3, each line to N, each line to E, and N–E. Only ${done.length} are recorded; ${missing} is missing. The other options are on the list already. Working through the combinations in a fixed order on site is what stops one being skipped.`,
      reference: 'HSE HSG85 para 53; electrical H&S safe isolation procedure',
    };
  },
};

const RING_PROFILES = {
  ok: 'The ring is correctly connected',
  spur: (k: number) => `Socket ${k} is fed by a spur off the ring`,
  misconnected: 'The ends are misconnected at the board; check the cross-connection',
  break: 'One leg of the ring is open, so it is behaving as a radial',
} as const;

const ringProfile: AM2Family = {
  id: 9020,
  key: 'ring-step3-profile',
  category: 'Fault Finding',
  topic: 'Ring final circuits',
  difficulty: 'advanced',
  verified: true,
  build: (r) => {
    const n = int(r, 6, 8);
    const base = step(r, 0.18, 0.4, 0.01);
    const kase = pick(r, ['ok', 'spur', 'misconnected'] as const);
    let readings = Array.from({ length: n }, () => r2(base + pick(r, [-0.01, 0, 0, 0.01])));
    let spurAt = int(r, 2, n - 1);
    if (kase === 'spur') readings[spurAt - 1] = r2(base + step(r, 0.08, 0.18, 0.01));
    if (kase === 'misconnected') {
      // Rises towards the middle of the ring, then falls (GN3 2.19).
      const lo = r2(base * 0.6);
      const hi = r2(base * 1.5);
      readings = readings.map((_, i) => r2(lo + (hi - lo) * (1 - Math.abs((2 * i) / (n - 1) - 1))));
    }
    if (kase !== 'spur') spurAt = readings.indexOf(Math.max(...readings)) + 1;
    const opts = {
      ok: RING_PROFILES.ok,
      spur: RING_PROFILES.spur(spurAt),
      misconnected: RING_PROFILES.misconnected,
      break: RING_PROFILES.break,
    };
    const why = {
      ok: 'The readings are substantially the same at every socket, which is what a correct ring gives.',
      spur: `Every socket reads about the same except socket ${spurAt}, which is higher on its own: GN3 notes that a socket wired as a spur reads higher because of the extra conductor.`,
      misconnected:
        'The readings climb towards the middle of the ring and fall again: GN3 gives that progressive rise and fall as the sign of a misconnection, unlike the single high reading of a spur.',
    }[kase];
    return {
      question: `After cross-connecting line and cpc at the board, a ring final circuit reads at each socket in turn: ${readings.map((v, i) => `${i + 1}: ${f2(v)} Ω`).join(', ')}. What does this show?`,
      options: [
        opts[kase],
        ...(['ok', 'spur', 'misconnected', 'break'] as const)
          .filter((k) => k !== kase)
          .map((k) => opts[k]),
      ] as Built['options'],
      explanation: `${why} An open leg would already have shown on the end-to-end readings at step 1, before any cross-connection.`,
      reference:
        'GN3 2.19 — interpreting ring readings: spurs read locally higher; misconnection rises then falls',
    };
  },
};

export const am2GeneratedFamilies: AM2Family[] = [
  ringLineCpc,
  ringLineNeutral,
  ringCpcRatio,
  ringDiagnosis,
  radialR1R2,
  designZs,
  measuredZs,
  maxMeasuredZs,
  faultCurrent,
  voltageDrop,
  cableSizing,
  deviceSelection,
  irVerdict,
  irParallel,
  irDiagnosis,
  rcdVerdict,
  isolationOrder,
  continuityBreak,
  provingDeadTests,
  ringProfile,
];

export const GENERATED_ID_MIN = 9000;
export const isGeneratedId = (id: number) => id >= GENERATED_ID_MIN;

/**
 * One question from a family. Options come back in BANK order — key first —
 * and must be shuffled by the renderer, which records which slip was picked.
 */
export function generateFamilyQuestion(family: AM2Family, rng: Rng = Math.random): AM2Question {
  for (let attempt = 0; attempt < 50; attempt++) {
    let built: Built;
    try {
      built = family.build(rng);
    } catch (e) {
      if (e instanceof Redraw) continue;
      throw e;
    }
    if (new Set(built.options).size !== 4) continue;
    return {
      id: family.id,
      question: built.question,
      options: [...built.options],
      correctAnswer: 0,
      explanation: built.explanation,
      section: family.topic,
      difficulty: family.difficulty,
      topic: family.topic,
      category: family.category,
      reference: built.reference,
      generated: true,
    };
  }
  throw new Error(`AM2 family ${family.key} could not draw a valid question`);
}

export const familiesFor = (category: AM2Category) =>
  am2GeneratedFamilies.filter((f) => f.category === category);
