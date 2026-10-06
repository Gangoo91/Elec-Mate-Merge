/**
 * Section B — putting a fault right, and what then has to be tested again.
 *
 * AM2 plan, round 6 (6 Oct 2026). NET's AM2S manual: "During and within the
 * time allowed for this section, you may correct any part of your installation
 * that you decide is incorrect or faulty", and "If you remember something and
 * need to go back and repeat a test that is fine. You may then need to repeat
 * any other test that is dependent on the test you have just repeated."
 *
 * Printed BS 7671:2018+A4:2026:
 *   - Reg 643.1: "If any test indicates a failure to comply, that test and any
 *     preceding test, the results of which may have been influenced by the
 *     fault indicated, shall be repeated after the fault has been rectified."
 *   - Reg 644.1.1: "For a new installation, any defect or omission revealed
 *     during the inspection and testing shall be corrected before the
 *     Certificate is issued."
 * So on this rig — a new installation — a fault found is put right and
 * retested; a remark alone no longer earns full marks.
 *
 * The options are the same list on every circuit they could apply to, so the
 * list doesn't tell the learner which circuit has the fault. Choosing a repair
 * where there was no such fault is a wrong fix.
 *
 * Which tests a repair makes stale is our reading of 643.1 for each fault
 * (the test that failed, and earlier tests the fault could have affected).
 */
import type { AM2RigCircuit } from '@/types/am2-testing-simulator';
import type { ProblemKind, SeededProblem } from '@/data/am2/sectionBRules';
import type { FuncFault, FunctionalState } from '@/data/am2/sectionBFunctional';
import { phaseFixed, type OriginState } from '@/data/am2/sectionBOrigin';

type Cure = ProblemKind | 'phase' | FuncFault;

export interface FixOption {
  id: string;
  label: string;
  /** The circuits it is offered on. */
  on: (c: AM2RigCircuit) => boolean;
  /** The fault it cures; none for the wrong answers. */
  cures?: Cure;
}

const any = () => true;

export const FIX_OPTIONS: FixOption[] = [
  {
    id: 'remake_neutral',
    label: 'Remake the loose neutral termination on the ring',
    on: (c) => c.diagramLayout === 'ring',
    cures: 'rn_mismatch',
  },
  {
    id: 'repair_insulation',
    label: 'Find the damaged cable and repair or replace it',
    on: any,
    cures: 'low_ir',
  },
  {
    id: 'remake_cpc',
    label: 'Find and remake the high-resistance joint in the protective conductor',
    on: any,
    cures: 'zs_over',
  },
  {
    id: 'replace_rcd',
    label: 'Replace the RCD (or RCBO) protecting the circuit',
    on: (c) => c.hasRcd,
    cures: 'rcd_slow',
  },
  {
    id: 'swap_lines',
    label: 'Swap two line conductors at the isolator’s outgoing terminals',
    on: (c) => c.phaseType === '3P',
    cures: 'phase',
  },
  {
    id: 'fix_twoway',
    label: 'Re-terminate switch 2 — the common and a strapper are on each other’s terminals',
    on: (c) => c.id === 3,
    cures: 'twoWay',
  },
  {
    id: 'fix_stop',
    label: 'Rewire the stop button through its normally-closed contact',
    on: (c) => c.id === 4,
    cures: 'dol',
  },
  // Wrong answers, offered everywhere.
  { id: 'bigger_device', label: 'Fit a higher-rated protective device', on: any },
  { id: 'swap_ln_board', label: 'Swap line and neutral at the board', on: any },
  { id: 'retest_250', label: 'Retest insulation at 250 V and record that instead', on: any },
];

/** The options for a circuit, in a fixed alphabetical order (no tell in the order). */
export const fixOptionsFor = (c: AM2RigCircuit) =>
  FIX_OPTIONS.filter((o) => o.on(c)).sort((a, b) => a.label.localeCompare(b.label));

/** Tests on the circuit a repair makes stale (643.1). */
export function staleTestsFor(c: AM2RigCircuit, cure: Cure): string[] {
  const ids = (f: (t: AM2RigCircuit['requiredTests'][number]) => boolean) =>
    c.requiredTests.filter(f).map((t) => t.id);
  switch (cure) {
    case 'rn_mismatch':
      // rₙ, and step 2 (L–N cross-connected), which carries rₙ.
      return ids((t) => t.subTest === 'rn' || t.subTest === 'ln');
    case 'low_ir':
      // A repaired or replaced cable: insulation, and the earlier continuity
      // and polarity tests that cable was part of (643.1, "any preceding test").
      return ids((t) => t.dialPosition.startsWith('IR') || t.dialPosition === 'CONTINUITY');
    case 'zs_over':
      // A cpc joint shows in R₁+R₂ (and r₂ on a ring) as well as Zs.
      return ids(
        (t) =>
          t.dialPosition === 'LOOP_ZS' ||
          (t.dialPosition === 'CONTINUITY' && (t.subTest === 'r1r2' || t.subTest === 'r2'))
      );
    case 'rcd_slow':
      return ids((t) => t.dialPosition.startsWith('RCD'));
    case 'twoWay':
      // Switch terminations: polarity and continuity through the switches.
      return ids((t) => t.subTest === 'polarity' || t.subTest === 'r1r2');
    default:
      // Crossed lines and the stop button: the phase sequence and the
      // functional check are repeated (handled on those stations).
      return [];
  }
}

/**
 * What a repair DISTURBS — the tests that must be taken again after it,
 * whether or not it cured anything. Applied the same way for right and wrong
 * repairs, so the screen never tells an Assessment candidate which was right
 * (a cure used to strike readings through and a wrong fix changed nothing).
 */
export function staleForOption(c: AM2RigCircuit, optionId: string): string[] {
  const ids = (f: (t: AM2RigCircuit['requiredTests'][number]) => boolean) =>
    c.requiredTests.filter(f).map((t) => t.id);
  const opt = FIX_OPTIONS.find((o) => o.id === optionId);
  if (!opt) return [];
  if (opt.cures) return staleTestsFor(c, opt.cures);
  switch (optionId) {
    case 'bigger_device':
      // A different device: its Zs limit, and an RCBO's trip times.
      return ids((t) => t.dialPosition === 'LOOP_ZS' || t.dialPosition.startsWith('RCD'));
    case 'swap_ln_board':
      // Terminations at the board moved: continuity, polarity and Zs.
      return ids(
        (t) =>
          t.dialPosition === 'CONTINUITY' ||
          t.subTest === 'polarity' ||
          t.dialPosition === 'LOOP_ZS'
      );
    case 'retest_250':
      return ids((t) => t.dialPosition.startsWith('IR'));
    default:
      return [];
  }
}

export interface FixRecord {
  circuitId: number | null;
  /** For a bonding repair. */
  bond?: string;
  optionId: string;
  /** It cured a real fault. */
  right: boolean;
  /** What it cured: 'problem:<testId>', 'phase', 'func:twoWay', 'func:dol', 'bond:<id>'. */
  target?: string;
  at: number;
  /** Required tests on the circuit made stale. */
  stale: string[];
}

/** What a repair on a circuit cures, if anything. */
export function resolveFix(
  c: AM2RigCircuit,
  optionId: string,
  seeded: SeededProblem[],
  origin: OriginState,
  functional: FunctionalState
): { target?: string; cure?: Cure; stale: string[] } {
  const opt = FIX_OPTIONS.find((o) => o.id === optionId);
  if (!opt?.cures || !opt.on(c)) return { stale: [] };
  const cure = opt.cures;
  if (cure === 'phase')
    return !phaseFixed(origin) && c.phaseType === '3P'
      ? { target: 'phase', cure, stale: [] }
      : { stale: [] };
  if (cure === 'twoWay' || cure === 'dol')
    return functional.fault === cure && functional.fixedAt == null
      ? { target: `func:${cure}`, cure, stale: staleTestsFor(c, cure) }
      : { stale: [] };
  const p = seeded.find((s) => s.circuitId === c.id && s.kind === cure && s.fixedAt == null);
  return p ? { target: `problem:${p.testId}`, cure, stale: staleTestsFor(c, cure) } : { stale: [] };
}

/** Bonding: the options for a bond judged faulty. */
export const BOND_FIX_OPTIONS: { id: string; label: string; right: boolean }[] = [
  {
    id: 'remake_bond',
    label: 'Clean the pipe back to bright metal, then remake the clamp and the conductor',
    right: true,
  },
  { id: 'second_clamp', label: 'Fit a second clamp alongside the first', right: false },
  { id: 'smaller_conductor', label: 'Replace the conductor with a 6 mm² one', right: false },
];
