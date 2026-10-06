/**
 * Section B — continuity of the main protective bonding conductors.
 *
 * AM2 plan, 6 Oct 2026. NET's AM2 pre-assessment manual lists "continuity of
 * protective conductors, including main and supplementary bonding" among the
 * Section B tests; Regulation 643.2.1 requires the continuity of protective
 * conductors, protective bonding conductors included, to be verified by
 * measuring resistance. The rig had no bonding at all.
 *
 * Sources (wording checked):
 *   - Reg 643.2.1 — continuity verified by a measurement of resistance.
 *   - GN3 (Expected test results, after the bonding-clamp test) — first and
 *     foremost, no discontinuity; a conductor's own resistance comes from
 *     Appendix B; across joints by earth clamps, readings should approach
 *     0.05 Ω. It is guidance, not a pass/fail limit: a sound MET-to-clamp
 *     reading here is a few hundredths of an ohm, a bad one tenths or OL.
 *   - Table 54.8 — PME supply, PEN conductor 35 mm² or less: main protective
 *     bonding at least 10 mm² copper. The rig's supply (below) is part of this
 *     simulated scenario, given to the learner as a candidate reads it from
 *     the supply details — not something the NET manual states.
 *   - Reg 544.1.2 — on the consumer's hard metal pipework, before any branch
 *     pipework, within 600 mm of the meter outlet union where practicable.
 *
 * The test: low-resistance ohms, null the long (wander) lead, then measure
 * from the main earthing terminal to each bonding clamp.
 *
 * Round 6: supplementary bonding. NET's AM2S manual lists "continuity of
 * protective conductors, including main and supplementary bonding". The rig's
 * scenario has one supplementary bond, at the shower: the shower circuit's cpc
 * to the clamp on the metal pipework beside it, tested end to end. The limit in
 * Reg 415.2.2 is R ≤ 50 V ÷ Iₐ, with Iₐ = IΔn for an RCD — 30 mA here, so
 * about 1,667 Ω: on a 30 mA circuit the test is really about continuity. It's
 * judged like the main bonds: a few hundredths sound, tenths or OL a fault.
 *
 * Round 6: a faulty bond can be put right (BOND_FIX_OPTIONS in
 * sectionBRectify.ts), then tested again.
 */
import type { SimMode } from '@/data/am2/sectionBRules';

export type BondId = 'water' | 'gas' | 'supp';

export const BONDS: { id: BondId; label: string; where: string }[] = [
  {
    id: 'water',
    label: 'Main bonding to the water pipe',
    where: 'MET to the clamp on the incoming water pipe',
  },
  {
    id: 'gas',
    label: 'Main bonding to the gas pipe',
    where: 'MET to the clamp on the gas pipe, after the meter',
  },
  {
    id: 'supp',
    label: 'Supplementary bonding at the shower',
    where: 'Shower circuit cpc at the shower to the clamp on the pipework beside it',
  },
];

/** Reg 415.2.2: R ≤ 50 V ÷ Iₐ (AC), Iₐ = IΔn for an RCD — the shower's 30 mA. */
export const SUPP_BOND_MAX = Math.round(50 / 0.03);

/** The simulated rig's supply, shown to the learner. */
export const RIG_SUPPLY = { system: 'TN-C-S (PME)', pen: '25 mm²' };

/** Table 54.8's minimum main bonding for that supply (PEN ≤ 35 mm²): 10 mm². */
export const BONDING_CSA = '10';
export const BONDING_CSA_OPTIONS = ['4', '6', '10', '16'];

/** A long wander lead that hasn't been nulled adds this to every reading. */
export const WANDER_LEAD_OHMS = 0.86;

/** The simulator's line between sound and faulty (GN3: across a clamp joint,
 *  readings should approach 0.05 Ω). Sound readings are a few hundredths,
 *  faults tenths or OL, so nothing lands near it. */
export const BOND_OK_MAX = 0.05;

export type BondFault = { bond: BondId; kind: 'high' | 'open' } | null;

export type BondVerdict = 'ok' | 'fault';

export interface BondingState {
  fault: BondFault;
  /** The low-resistance ohms range was chosen. */
  rangeSet: boolean;
  nulled: boolean;
  readings: Partial<Record<BondId, string>>;
  /** Whether the lead was nulled when each reading was taken. */
  nulledAt?: Partial<Record<BondId, boolean>>;
  verdicts: Partial<Record<BondId, BondVerdict>>;
  csa: string;
  done: boolean;
  /** The fault as planted, kept once it's put right (fault is then null). */
  fixedFault?: BondFault;
  fixedAt?: number;
}

export const EMPTY_BONDING: BondingState = {
  fault: null,
  rangeSet: false,
  nulled: false,
  readings: {},
  verdicts: {},
  csa: '',
  done: false,
};

/** Learn: no fault. Otherwise about half of runs have a bad clamp or a break. */
export function seedBonding(mode: SimMode, rng: () => number = Math.random): BondingState {
  if (mode === 'learn' || rng() < 0.5) return { ...EMPTY_BONDING };
  return {
    ...EMPTY_BONDING,
    fault: {
      bond: (['water', 'gas', 'supp'] as BondId[])[Math.floor(rng() * 3)],
      kind: rng() < 0.6 ? 'high' : 'open',
    },
  };
}

/** What the meter shows for a bond: the clamp, any fault, and an un-nulled lead. */
export function bondReading(
  b: BondId,
  fault: BondFault,
  nulled: boolean,
  rng: () => number = Math.random
): string {
  if (fault?.bond === b && fault.kind === 'open') return 'OL';
  const base =
    fault?.bond === b
      ? 0.48 + rng() * 0.7 // a loose or corroded clamp
      : (b === 'water' ? 0.02 : b === 'gas' ? 0.03 : 0.01) + rng() * 0.02;
  return (base + (nulled ? 0 : WANDER_LEAD_OHMS)).toFixed(2);
}

/** Is this bond actually sound? (What the learner should judge.) */
export const bondSound = (b: BondId, fault: BondFault) => fault?.bond !== b;
