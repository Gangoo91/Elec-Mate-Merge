/**
 * Section B — the tests at the origin: Ze, prospective fault current and
 * phase sequence.
 *
 * AM2 plan, round 6 (6 Oct 2026). NET's AM2S manual lists, among the Section B
 * tests, "earth fault loop impedance", "prospective fault current" and "check
 * of phase sequence". The rig had Ze typed in as 0.14 Ω, Ipf worked out for the
 * learner, and the phase sequence pre-filled as L1-L2-L3.
 *
 * Sources (wording read from the printed BS 7671:2018+A4:2026):
 *   - Reg 643.7.3.1 — the relevant impedances shall be measured, or determined
 *     by an alternative method.
 *   - Reg 643.7.3.201 — the prospective short-circuit current and prospective
 *     earth fault current shall be measured, calculated or determined by
 *     another method, at the origin and at other relevant points.
 *   - Appendix 14 — in a three-phase installation, an approximation of the
 *     fault current for a short circuit between all lines is the line–neutral
 *     measurement multiplied by 2; in a single-phase system the prospective
 *     fault current is the greater of the line–neutral and line–earth values.
 *   - Reg 643.9 — for polyphase circuits, the phase sequence is maintained at
 *     all relevant points throughout the installation.
 *   - Ze: measured at the origin between line and the means of earthing with
 *     the main switch open, and the means of earthing disconnected from the
 *     main bonding for the test so there are no parallel paths — then put back.
 *     (The method as taught; we hold no GN3 text on it in the RAG, so no GN3
 *     wording is quoted for it here.)
 *
 * The supply itself is this simulated rig's scenario: Ze 0.14 Ω (as before)
 * and a line–neutral loop of 0.11 Ω at the origin. They are scenario figures,
 * not values from a standard.
 */
import { AM2_ZE } from '@/data/am2RigCircuits';

/** The simulated supply at the origin. U₀ is the UK nominal 230 V. */
export const ORIGIN_SUPPLY = { ze: AM2_ZE, zLN: 0.11, u0: 230 };

/** Sequence a phase rotation instrument shows. */
export const SEQ_RIGHT = 'L1-L2-L3';
export const SEQ_WRONG = 'L1-L3-L2';

export type SeqPoint = 'origin' | 'motor';
export type SeqVerdict = 'ok' | 'fault';

export interface OriginState {
  /** The main earthing conductor taken off the MET for the Ze test. */
  earthOff: boolean;
  /** Ze as read, and how it was taken. */
  ze?: string;
  zeHow?: { earthOff: boolean; isolated: boolean };
  /** Prospective short-circuit (L–N) and earth fault (L–E) current, kA. */
  pscc?: string;
  pefc?: string;
  /** Phase rotation at the incoming terminals and at the motor isolator. */
  seq: Partial<Record<SeqPoint, { shown: string; at: number }>>;
  verdicts: Partial<Record<SeqPoint, SeqVerdict>>;
  /** Planted: two lines crossed at the motor isolator's outgoing terminals. */
  phaseFault: boolean;
  /** When the crossed lines were put right, if they were. */
  phaseFixedAt?: number;
}

export const EMPTY_ORIGIN: OriginState = {
  earthOff: false,
  seq: {},
  verdicts: {},
  phaseFault: false,
};

export function seedOrigin(phaseFault: boolean): OriginState {
  return { ...EMPTY_ORIGIN, phaseFault };
}

const jitter = (v: number, spread: number, rng: () => number) => v + (rng() * 2 - 1) * spread;

/** Ze as the meter shows it. With the earthing still connected the bonding
 *  gives parallel paths, so it reads low (simulated, not a figure from GN3). */
export function zeReading(earthOff: boolean, rng: () => number = Math.random): string {
  const v = earthOff
    ? jitter(ORIGIN_SUPPLY.ze, 0.005, rng)
    : jitter(ORIGIN_SUPPLY.ze * 0.62, 0.01, rng);
  return v.toFixed(2);
}

/** I = U₀ ÷ Z, in kA, as a loop/PFC instrument works it out. */
export function pfcReading(kind: 'pscc' | 'pefc', rng: () => number = Math.random): string {
  const z = kind === 'pscc' ? ORIGIN_SUPPLY.zLN : ORIGIN_SUPPLY.ze;
  const v = jitter(ORIGIN_SUPPLY.u0 / z / 1000, 0.02, rng);
  return v.toFixed(2);
}

/** The Ipf for the certificate from the two readings (Appendix 14): the rig is
 *  three-phase, so the line–neutral reading × 2, or the earth fault current if
 *  that were greater. */
export function ipfFrom(pscc?: string, pefc?: string): string {
  const a = Number(pscc);
  const b = Number(pefc);
  if (!pscc || !pefc || Number.isNaN(a) || Number.isNaN(b)) return '';
  return Math.max(a * 2, b).toFixed(2);
}

export const phaseFixed = (o: OriginState) => !o.phaseFault || o.phaseFixedAt != null;

export function seqReading(point: SeqPoint, o: OriginState): string {
  return point === 'motor' && !phaseFixed(o) ? SEQ_WRONG : SEQ_RIGHT;
}

/** What the certificate's phase sequence entry should say. */
export function seqWant(o: OriginState): string {
  const pts: SeqPoint[] = ['origin', 'motor'];
  if (pts.some((p) => !o.seq[p])) return '';
  return pts.every((p) => o.seq[p]!.shown === SEQ_RIGHT) ? 'Confirmed' : 'Not confirmed';
}

export const SEQ_POINTS: {
  id: SeqPoint;
  label: string;
  where: string;
  live: 'always' | 'board';
}[] = [
  {
    id: 'origin',
    label: 'At the origin',
    where: 'Incoming terminals of the main switch',
    live: 'always',
  },
  {
    id: 'motor',
    label: 'At the motor isolator',
    where: 'Outgoing terminals of the TP&N isolator for circuit 4',
    live: 'board',
  },
];
