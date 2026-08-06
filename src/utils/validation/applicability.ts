/**
 * One definition of "is this row a circuit we should be judging".
 *
 * Today this decision is made three times, differently. `regulationChecker`
 * learned about device rows in ELE-1484; `testValidation` has never heard of
 * them — or of spare ways — so an RCD row is exempt from regulation warnings
 * while still showing "R1+R2 value required" in its cells, and every spare way
 * on every certificate carries the same phantom errors.
 *
 * Defined once here so a rule cannot be written that forgets.
 */
import { TestResult } from '@/types/testResult';
import { isDeviceRow } from '@/utils/circuitNumbering';
import { isSpareCircuit } from '@/utils/spareWays';

/** Values an electrician writes to mean "deliberately not measured". */
const NOT_APPLICABLE = /^(?:n\/?a|n\/?v|lim|—|–|-{1,2})$/i;

/**
 * True when a field has been deliberately marked as not applicable, not
 * verified, or limited — as opposed to simply being blank.
 *
 * These are first-class values on our schedule (ELE-849), and a rule must not
 * treat "the electrician recorded a limitation" as "the electrician forgot".
 */
export const isDeliberatelyNotMeasured = (value: unknown): boolean =>
  NOT_APPLICABLE.test(String(value ?? '').trim());

/** True when a value is present and is not a limitation marker. */
export const hasReading = (value: unknown): boolean => {
  const s = String(value ?? '').trim();
  return s.length > 0 && !NOT_APPLICABLE.test(s);
};

/** Parse a measured figure, tolerating a leading `>` or `<` from the meter. */
export const readNumber = (value: unknown): number | null => {
  if (!hasReading(value)) return null;
  const n = parseFloat(String(value).replace(/[<>]/g, '').trim());
  return Number.isFinite(n) ? n : null;
};

/**
 * True when the row represents an actual circuit to be judged.
 *
 * Excludes spare ways (nothing connected) and device rows — an incoming RCD,
 * SPD or main switch, which protects several ways and is not a circuit.
 */
export const isRealCircuit = (circuit: TestResult): boolean =>
  !isDeviceRow(circuit) && !isSpareCircuit(circuit);

/** Why a row was skipped, for the `skip` outcome. */
export const skipReason = (circuit: TestResult): string =>
  isDeviceRow(circuit) ? 'Device row — not a circuit' : 'Spare way';
