/**
 * Section B — functional testing.
 *
 * AM2 plan, round 6 (6 Oct 2026). NET's AM2S manual lists "functional testing"
 * among the Section B tests, and among its common errors: "Candidates do not
 * verify that the installed circuits and equipment function as intended", and
 * "remember on lighting circuits to operate switches; on other circuits,
 * operate isolators or contactors".
 *
 * Reg 643.10 (printed BS 7671:2018+A4:2026): equipment shall be subjected to
 * functional testing, as appropriate, to verify that it is properly mounted,
 * adjusted and installed and operates correctly — examples include switchgear
 * and controlgear assemblies, drives, controls and interlocks. The RCD test
 * facility is verified too; on this rig that is the RCD test-button test on
 * the schedule (column 29), so it isn't repeated here.
 *
 * Every item needs the board energised. A run in Practise or Assessment may
 * plant one fault across this station and the phase sequence (one "extra"
 * fault): two-way switching mis-terminated, the DOL stop button not stopping
 * the motor, or two lines crossed at the motor isolator (which also shows here:
 * the motor runs the wrong way). These are scenario faults, not figures.
 */
import type { SimMode } from '@/data/am2/sectionBRules';
import { phaseFixed, type OriginState } from '@/data/am2/sectionBOrigin';

export type FuncId = 'mainSwitch' | 'twoWay' | 'isolator' | 'dol' | 'cookerSwitch';
export type FuncFault = 'twoWay' | 'dol';
/** The one extra fault a run may carry. */
export type ExtraFault = FuncFault | 'phase';

export interface FuncItem {
  id: FuncId;
  circuitId?: number;
  label: string;
  /** What you do. */
  how: string;
  /** What happens when it's right. */
  okSeen: string;
}

export const FUNC_ITEMS: FuncItem[] = [
  {
    id: 'mainSwitch',
    label: 'Main switch',
    how: 'Operate the main switch off and on.',
    okSeen: 'Off: every circuit goes dead. On: they come back.',
  },
  {
    id: 'twoWay',
    circuitId: 3,
    label: 'Two-way lighting',
    how: 'Operate each switch in turn, with the other in each of its positions.',
    okSeen: 'The lamp changes state from either switch, whatever position the other is in.',
  },
  {
    id: 'isolator',
    circuitId: 4,
    label: 'Motor isolator',
    how: 'Open the TP&N isolator, then try to start the motor.',
    okSeen: 'With the isolator open the motor won’t start; closed, it will.',
  },
  {
    id: 'dol',
    circuitId: 4,
    label: 'DOL starter — start and stop',
    how: 'Press start, watch the motor, then press stop.',
    okSeen: 'Start runs the motor in its marked direction; stop stops it.',
  },
  {
    id: 'cookerSwitch',
    circuitId: 2,
    label: 'Cooker control unit switch',
    how: 'Operate the cooker switch off and on.',
    okSeen: 'Off isolates the cooker outlet; on restores it.',
  },
];

export interface FunctionalState {
  fault: FuncFault | null;
  /** When the planted fault was put right, if it was. */
  fixedAt?: number;
  /** When each item was last operated. */
  operated: Partial<Record<FuncId, number>>;
  verdicts: Partial<Record<FuncId, 'ok' | 'fault'>>;
  done: boolean;
}

export const EMPTY_FUNCTIONAL: FunctionalState = {
  fault: null,
  operated: {},
  verdicts: {},
  done: false,
};

/** Practise and Assessment: about half of runs carry one extra fault. */
export function seedExtraFault(mode: SimMode, rng: () => number = Math.random): ExtraFault | null {
  if (mode === 'learn' || rng() < 0.5) return null;
  const all: ExtraFault[] = ['phase', 'twoWay', 'dol'];
  return all[Math.floor(rng() * all.length)];
}

export const funcFixed = (f: FunctionalState) => !f.fault || f.fixedAt != null;

/** Does this item work as intended right now? */
export function funcSound(id: FuncId, f: FunctionalState, o: OriginState): boolean {
  if (id === 'twoWay') return !(f.fault === 'twoWay' && !funcFixed(f));
  if (id === 'dol') return !(f.fault === 'dol' && !funcFixed(f)) && phaseFixed(o);
  return true;
}

/** What you see when you operate it. */
export function funcOutcome(id: FuncId, f: FunctionalState, o: OriginState): string {
  const item = FUNC_ITEMS.find((i) => i.id === id)!;
  if (id === 'twoWay' && !funcSound(id, f, o))
    return 'Switch 1 works the lamp. From switch 2, the lamp only changes when switch 1 is in one of its positions.';
  if (id === 'dol' && f.fault === 'dol' && !funcFixed(f))
    return 'Start runs the motor. Pressing stop does nothing — it only stops when the isolator is opened.';
  if (id === 'dol' && !phaseFixed(o))
    return 'Start and stop work — but the motor turns against the direction arrow on its casing.';
  return item.okSeen;
}
