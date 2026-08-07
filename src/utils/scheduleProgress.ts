/**
 * One definition of "how much of this schedule is done" — ELE-1501.
 *
 * Two problems, both fixed here by having a single answer rather than three.
 *
 * **1. A board with a spare way could never be complete.**
 *
 * Both counters in `EICRScheduleOfTests` divided by `circuits.length`, which
 * includes spare ways and device rows. A spare has nothing to measure — "N/A"
 * is the only honest entry (see `spareWays.ts`) — so it can never enter the
 * numerator while still sitting in the denominator. `isComplete` was therefore
 * unreachable on any board with one:
 *
 *   12 ways, 6 spares, every real circuit tested  ->  50%, "in progress"
 *
 * 182 of 579 production certificates (31%) carry at least one spare way, 622
 * spare ways in total. Roughly a third of certificates could not show as
 * finished no matter how thoroughly they were tested. The same reasoning
 * already excludes these rows from the Validate count (ELE-1487), so a board of
 * mostly spares does not read as a board of faults; the progress counter simply
 * never got the same treatment.
 *
 * **2. "Tested" meant something different in each place it was asked.**
 *
 * The certificate-level and per-board counters had the rule copy-pasted, which
 * is how they would have drifted next. It is defined once, here.
 *
 * Note this deliberately does not touch `MobileTestTypeCard` /
 * `MobileTestTypeSection`. Those track a guided test-by-test wizard through a
 * `completedTests` set, which is a different question from "does this row hold
 * its results" — sharing a helper between them would conflate the two.
 */
import { TestResult } from '@/types/testResult';
import { isRealCircuit } from '@/utils/validation/applicability';

/**
 * True when a row is something that can be tested at all.
 *
 * Excludes spare ways (nothing connected) and device rows — an incoming RCD,
 * SPD or main switch, which protects several ways and is not a circuit.
 */
export const isTestableRow = (circuit: TestResult): boolean => isRealCircuit(circuit);

/**
 * True when a circuit carries its core test results.
 *
 * Zs, polarity and an insulation reading. Insulation is recorded under two
 * different keys depending on which surface filled the row, so either counts —
 * this mirrors the rule both original counters used, so no certificate's
 * reported progress moves except by the spare-way fix above.
 *
 * A deliberate "N/A" or "LIM" counts as recorded. The electrician has answered
 * the question; a limitation is a result, not a gap.
 */
export const isCircuitTested = (circuit: TestResult): boolean =>
  Boolean(
    circuit.zs && circuit.polarity && (circuit.insulationLiveEarth || circuit.insulationResistance)
  );

export interface ScheduleProgress {
  /** Rows that can be tested — the denominator. */
  circuits: number;
  tested: number;
  /** Testable rows still without results. */
  remaining: number;
  /** 0–100, over testable rows. 100 only when every one of them is done. */
  percent: number;
  /** Spare ways and device rows, reported rather than silently dropped. */
  excluded: number;
  isComplete: boolean;
}

/**
 * Progress over a set of rows.
 *
 * A board of nothing but spares returns 0 circuits and `isComplete: false` —
 * there is no work to do, but claiming completion for a board nobody has looked
 * at would be worse than saying nothing.
 */
export const getScheduleProgress = (rows: TestResult[]): ScheduleProgress => {
  const testable = rows.filter(isTestableRow);
  const tested = testable.filter(isCircuitTested).length;
  const circuits = testable.length;

  return {
    circuits,
    tested,
    remaining: circuits - tested,
    percent: circuits > 0 ? Math.round((tested / circuits) * 100) : 0,
    excluded: rows.length - circuits,
    isComplete: circuits > 0 && tested === circuits,
  };
};

/**
 * The toolbar label — "23 circuits · 0 tested".
 *
 * Reads as the question actually asked at a consumer unit: how many have I got,
 * and how many have I still to do. A percentage does not answer that on a board
 * of 23.
 */
export const describeProgress = (progress: ScheduleProgress): string =>
  `${progress.circuits} ${progress.circuits === 1 ? 'circuit' : 'circuits'} · ${progress.tested} tested`;
