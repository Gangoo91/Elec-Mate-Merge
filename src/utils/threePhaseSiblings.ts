import type { TestResult } from '@/types/testResult';
import { isSpareCircuit } from '@/utils/spareWays';
import { hasReading, isDeliberatelyNotMeasured } from '@/utils/validation/applicability';

/**
 * Three-phase circuits and the two ways they also occupy — ELE-1770.
 *
 * Mark Glowacki, 22 Sep 2026: "circuit 10 is an EV charger 3P — should
 * circuits 10, 11 and 12 be filled in the same as it's a 3-phase RCD?"
 *
 * Yes for the specification, no for the measurements, and the distinction is
 * the whole of this file.
 *
 * A three-pole device occupies three ways in the board. The DESIGN of those
 * three ways is one decision made once: it is one device, of one BS standard,
 * one rating, one breaking capacity, one RCD, fed by one cable of one csa
 * through one wiring method. Re-typing that three times is pure transcription,
 * and it is what he was doing.
 *
 * The READINGS are not one decision. R1+R2, insulation resistance, Zs and the
 * RCD disconnection time are measured per line and genuinely differ between
 * them — that is much of the point of testing a three-phase circuit at all.
 * Copying L1's reading onto L2 and L3 would manufacture two measurements that
 * were never taken, which is the same class of defect as the spare-way bulk
 * fill in `spareWays.ts` (87 spares carrying an insulation reading) and the
 * phantom off-the-job hours in ELE-1724. So nothing measured is ever copied.
 *
 * `insulationTestVoltage` is the one apparent exception, and it is not a
 * reading: it is the setting the tester was put on, chosen once for the
 * circuit.
 */

/** Fields that are one decision for the whole three-pole device. */
const SPECIFICATION_FIELDS = [
  // Circuit
  'typeOfWiring',
  'referenceMethod',
  'pointsServed',
  'circuitType',
  // Conductors
  'liveSize',
  'cpcSize',
  // Overcurrent protective device
  'bsStandard',
  'protectiveDeviceType',
  'protectiveDeviceCurve',
  'protectiveDeviceRating',
  'protectiveDeviceKaRating',
  'maxZs',
  // RCD details (the spec, not the test)
  'rcdBsStandard',
  'rcdType',
  'rcdRating',
  'rcdRatingA',
  // An instrument setting, not a measurement
  'insulationTestVoltage',
] as const satisfies readonly (keyof TestResult)[];

/**
 * Every field carrying something the electrician measured or observed on site.
 * Listed explicitly, and asserted against in the check script, so that adding
 * a new reading to `TestResult` cannot quietly make it copyable.
 */
export const MEASURED_FIELDS = [
  'r1r2',
  'r2',
  'ringContinuityLive',
  'ringContinuityNeutral',
  'ringR1',
  'ringRn',
  'ringR2',
  'insulationLiveNeutral',
  'insulationLiveEarth',
  'insulationResistance',
  'insulationNeutralEarth',
  'polarity',
  'zs',
  'pfc',
  'pfcLiveNeutral',
  'pfcLiveEarth',
  'rcdOneX',
  'rcdHalfX',
  'rcdFiveX',
  'rcdTestButton',
  'afddTest',
  'functionalTesting',
] as const satisfies readonly (keyof TestResult)[];

/**
 * A row is free to become L2/L3 of the circuit above it.
 *
 * The reading check comes before the spare check on purpose. 461 spare ways on
 * completed EICRs, 87 of them carrying an insulation reading (`spareWays.ts`):
 * absorbing one of those into a three-phase circuit would inherit a
 * measurement that was never taken for it. A spare with a real reading on it
 * is ambiguous, so it is left alone rather than quietly adopted. `hasReading`
 * already treats "N/A" as absent, so an ordinary scanned spare still passes.
 */
const isClaimable = (row: TestResult): boolean => {
  if (row.isDeviceRow) return false;
  if (MEASURED_FIELDS.some((f) => hasReading(row[f]))) return false;
  if (isSpareCircuit(row)) return true;
  // Anything carrying a description is somebody else's circuit.
  return String(row.circuitDescription ?? '').trim().length === 0;
};

/** Two rows belong to the same board when neither names a different one. */
const sameBoard = (a: TestResult, b: TestResult): boolean =>
  (a.boardId ?? '') === (b.boardId ?? '');

export interface SiblingLink {
  id: string;
  line: 'L2' | 'L3';
  updates: Partial<TestResult>;
}

/** Why no ways were filled — so the UI can say so instead of doing nothing. */
export type DeclineReason = 'no-room' | 'occupied' | 'other-board';

export interface SiblingPlan {
  links: SiblingLink[];
  declined: DeclineReason | null;
}

export const DECLINE_MESSAGE: Record<DeclineReason, string> = {
  'no-room': 'There are not two ways below this one to carry L2 and L3.',
  occupied: 'The next two ways already hold circuits, so nothing was changed.',
  'other-board': 'The next two ways are on a different board, so nothing was changed.',
};

/**
 * The two ways a three-pole circuit at `index` also occupies.
 *
 * Fills nothing unless BOTH following rows are claimable and on the same
 * board. A board where the next way holds a different circuit is not laid out
 * three-in-a-row, and guessing where the other two poles landed would be
 * worse than leaving it to the electrician — so it declines, and says why.
 */
export const planThreePhaseSiblings = (
  results: TestResult[],
  index: number
): SiblingPlan => {
  const source = results[index];
  if (!source) return { links: [], declined: 'no-room' };

  const next = results.slice(index + 1, index + 3);
  if (next.length < 2) return { links: [], declined: 'no-room' };
  // Board first: on a multi-board installation the rows below may belong to a
  // different board entirely, and its way 1 is not this circuit's L2.
  if (!next.every((row) => sameBoard(source, row))) {
    return { links: [], declined: 'other-board' };
  }
  if (!next.every(isClaimable)) return { links: [], declined: 'occupied' };

  const lines: Array<'L2' | 'L3'> = ['L2', 'L3'];
  const description = String(source.circuitDescription ?? '').trim();

  const links = next.map((row, i) => {
    const line = lines[i];
    const updates: Partial<TestResult> = {
      phaseType: '3P',
      phaseAssignment: line,
    };

    /*
     * A spare way that turns out to be the second or third pole of a
     * three-phase circuit is not a spare any more, and three things the board
     * scanner wrote into it are now wrong rather than merely stale.
     *
     * `EICRForm.tsx:227` fills every test field of a spare with "N/A" —
     * honest for an empty position, a false statement the moment a live line
     * runs through it. "No insulation test applicable" against a conductor
     * that must be tested is exactly the assertion `spareWays.ts` exists to
     * stop us making. So the markers are cleared, leaving blanks the
     * electrician is prompted to fill.
     *
     * It also writes `insulationTestVoltage: 'N/A'`, which is not blank — so
     * without this the way would refuse the real 500 V it should inherit and
     * keep claiming the voltage is not applicable.
     *
     * And its description still says "Spare". Left alone, the certificate
     * prints a spare way carrying a circuit.
     */
    const wasSpare = isSpareCircuit(row);
    if (wasSpare) {
      updates.isSpare = false;
      for (const field of MEASURED_FIELDS) {
        if (isDeliberatelyNotMeasured(row[field])) {
          (updates as Record<string, unknown>)[field] = '';
        }
      }
    }

    /** What the row effectively holds — a reclaimed spare's "N/A" is nothing. */
    const heldValue = (field: keyof TestResult): string => {
      if (wasSpare && isDeliberatelyNotMeasured(row[field])) return '';
      return String(row[field] ?? '').trim();
    };

    // Only ever fill a blank. Matches the smart RCD fill: what the electrician
    // has already put in wins.
    for (const field of SPECIFICATION_FIELDS) {
      const incoming = String(source[field] ?? '').trim();
      if (heldValue(field).length === 0 && incoming.length > 0) {
        (updates as Record<string, unknown>)[field] = source[field];
      }
    }

    const heldDescription = wasSpare ? '' : String(row.circuitDescription ?? '').trim();
    if (description.length > 0 && heldDescription.length === 0) {
      updates.circuitDescription = `${description} (${line})`;
    }

    return { id: row.id, line, updates };
  });

  return { links, declined: null };
};
