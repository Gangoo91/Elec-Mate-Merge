import type { TestResult } from '@/types/testResult';

/**
 * Spare ways and bulk fill — ELE-1477 follow-up.
 *
 * A spare way is an empty position in the board. There is no circuit in it, so
 * there is nothing to measure: no insulation resistance, no polarity to verify,
 * nothing to functionally test. "N/A" is the only honest entry.
 *
 * The board scanner already gets this right — `EICRForm.tsx:209` writes 'N/A'
 * into every test field of a spare on import. Bulk fill then walked straight
 * over it: `fillAll` mapped `testResults` with no spare check, so one tap on
 * "Fill all" for insulation resistance replaced the correct N/A with a reading.
 *
 * Found in production: of 461 spare ways on completed EICRs, 87 carried an
 * insulation reading and 72 were marked polarity "Correct" AND functional "✓",
 * across 28 certificates. Those are three test results asserted against a
 * position with no circuit in it — and unlike an untested circuit, no GN3
 * sampling argument covers it, because a spare is not a circuit that could have
 * been sampled.
 *
 * Bulk fill is a genuinely useful control on a board of similar circuits, so
 * this excludes spares rather than restricting the feature.
 */

/**
 * "Spare" on its own, or with a way/circuit number: "Spare", "spare way",
 * "Spare circuit 3", "Spare 8".
 */
const SPARE_ONLY = /^\s*spare\s*(?:way|circuit)?\s*\d*\s*$/i;
/** "Spare" followed by a note: "Spare - future use", "Spare: not used". */
const SPARE_WITH_NOTE = /^\s*spare\s*[-–—:,]/i;

/**
 * True when this row is a spare way.
 *
 * Checks the description as well as the flag, because `isSpare` is only set by
 * the board scanner — a way the electrician typed "Spare" into by hand would
 * otherwise still be filled.
 *
 * The description test is deliberately anchored rather than a loose /\bspare\b/.
 * "Spare room sockets" is a REAL circuit, and a loose match would silently skip
 * it during a bulk fill — trading the bug we are fixing for a worse one, since
 * a skipped real circuit just stays empty and nobody is told which row it was.
 */
export const isSpareCircuit = (result: Pick<TestResult, 'circuitDescription'> & {
  isSpare?: boolean;
}): boolean => {
  if (result?.isSpare === true) return true;
  const d = String(result?.circuitDescription ?? '');
  return SPARE_ONLY.test(d) || SPARE_WITH_NOTE.test(d);
};

export interface SpareSplit {
  /** Rows a bulk fill may write to. */
  fillable: TestResult[];
  /** Spare ways that were skipped — surfaced in the confirmation toast. */
  skipped: TestResult[];
}

/** Split a set of circuits into the ones a bulk fill should touch and the spares. */
export const partitionSpares = (results: TestResult[]): SpareSplit => {
  const fillable: TestResult[] = [];
  const skipped: TestResult[] = [];
  for (const r of results) {
    (isSpareCircuit(r) ? skipped : fillable).push(r);
  }
  return { fillable, skipped };
};

/**
 * Wording for the post-fill toast, e.g. "Filled 9 circuits · skipped 3 spare ways".
 * Naming the skip is deliberate — it teaches the rule instead of silently
 * doing something different from what the button said.
 */
export const describeBulkFill = (filledCount: number, skippedCount: number): string => {
  const filled = `Filled ${filledCount} circuit${filledCount === 1 ? '' : 's'}`;
  if (skippedCount === 0) return filled;
  return `${filled} · skipped ${skippedCount} spare way${skippedCount === 1 ? '' : 's'}`;
};
