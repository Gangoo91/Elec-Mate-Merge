/**
 * What counts as a recorded test reading — ELE-1610.
 *
 * The schedule of tests had **four** different answers to "is this circuit
 * tested", and they disagreed on screen:
 *
 * | where | rule |
 * | -- | -- |
 * | `useEICRValidation` (issue gate) | any of `zs`, `polarity`, `insulationResistance`, `insulationLiveEarth`, `r1r2` |
 * | `scheduleProgress.isCircuitTested` (Complete / Progress %) | `zs && polarity && (insulationLiveEarth ‖ insulationResistance)` |
 * | `TestAnalytics.completionPercentage` | `r1r2 && insulationLiveNeutral && polarity && zs && functionalTesting` |
 * | `TestAnalytics` PASS/WARN/FAIL | full BS 7671 compliance — a genuinely different question |
 *
 * So a user could tick every circuit on a board and be shown "Complete 9" of
 * 10, "Progress 100%", "TOTAL 10" and "1 Pass / 9 Warn" at the same time.
 *
 * 🔴 Two faults were common to all three completion rules:
 *
 *  1. **`insulationResistance` is a dead field.** It is the legacy consolidated
 *     column on `TestResult`; the grid writes `insulationTestVoltage`,
 *     `insulationLiveNeutral` and `insulationLiveEarth` (`InsulationCells`).
 *     Every rule that offered it as an alternative was really offering nothing.
 *  2. **They only recognised a fraction of the columns.** A ring final tested
 *     properly — r₁, rₙ, r₂, insulation L-L, RCD trip time — satisfied none of
 *     them, because they asked for Zs, polarity and L-E specifically.
 *
 * The columns are grouped by the test they belong to, so a reading anywhere in
 * a group answers that test. That is what makes a ring final count.
 *
 * ⚠️ A deliberate `N/A`, `LIM` or `N/V` counts as recorded throughout. The
 * electrician has answered the question — a recorded limitation is a result,
 * not a gap. Only a genuinely empty cell is missing (`isBlankReading`).
 */
import type { TestResult } from '@/types/testResult';
import { isBlankReading } from '@/utils/irDefaults';

/**
 * Every column of the schedule that can hold a reading, grouped by test.
 *
 * Keep this list in step with the schedule's cell components — it is the one
 * place the app decides what "a reading" is.
 */
export const READING_GROUPS = {
  /** Continuity of protective conductors, incl. the ring final measurements. */
  continuity: [
    'r1r2',
    'r2',
    'ringContinuityLive',
    'ringContinuityNeutral',
    'ringR1',
    'ringRn',
    'ringR2',
  ],
  /** Insulation resistance — L-L, L-E, N-E, and the test voltage applied. */
  insulation: [
    'insulationLiveNeutral',
    'insulationLiveEarth',
    'insulationNeutralEarth',
    'insulationTestVoltage',
    // Legacy consolidated field. Kept only so certificates written before the
    // split still register; nothing writes it today.
    'insulationResistance',
  ],
  /** Polarity. */
  polarity: ['polarity'],
  /** Earth fault loop impedance. */
  zs: ['zs'],
  /**
   * RCD / AFDD and functional testing. Not part of the core set — plenty of
   * circuits have no RCD and no AFDD, so requiring these would make those
   * circuits permanently incomplete.
   */
  devices: ['rcdOneX', 'rcdTestButton', 'afddTest', 'rcdHalfX', 'rcdFiveX', 'functionalTesting'],
  /** Prospective fault current. */
  pfc: ['pfc', 'pfcLiveNeutral', 'pfcLiveEarth'],
} as const;

/** Flat list of every reading column, in group order. */
export const READING_FIELDS: readonly string[] = Object.values(READING_GROUPS).flat();

/**
 * The tests every circuit on a schedule is expected to carry.
 *
 * Continuity, insulation, polarity and Zs. Deliberately NOT the RCD/AFDD or
 * functional columns — a lighting circuit on a board with no RCD would never
 * complete, which is the trap the old `TestAnalytics` rule fell into by
 * demanding `functionalTesting`.
 */
const CORE_GROUPS = ['continuity', 'insulation', 'polarity', 'zs'] as const;

const hasIn = (circuit: Partial<TestResult>, fields: readonly string[]): boolean =>
  fields.some((f) => !isBlankReading((circuit as Record<string, unknown>)[f]));

/**
 * Any reading at all, anywhere on the row.
 *
 * Used by the issue gate, which only needs to know whether a circuit has been
 * touched — missing readings warn there, they never block (ELE-1605 / Andrew,
 * 24 Aug: "some circuits won't be tested").
 */
export const hasAnyReading = (circuit: Partial<TestResult>): boolean =>
  hasIn(circuit, READING_FIELDS);

/**
 * Every core test has something recorded — the "Complete" rule.
 *
 * Stricter than `hasAnyReading` on purpose: progress that ticked over on a
 * single stray value would overstate how much of the board is done, which is
 * the opposite failure and just as misleading.
 */
export const hasCoreResults = (circuit: Partial<TestResult>): boolean =>
  CORE_GROUPS.every((g) => hasIn(circuit, READING_GROUPS[g]));

/** Which core tests are still missing — for telling the user what is left. */
export const missingCoreTests = (circuit: Partial<TestResult>): string[] =>
  CORE_GROUPS.filter((g) => !hasIn(circuit, READING_GROUPS[g]));
