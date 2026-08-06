/**
 * Is this circuit a ring final, a radial, or do we not know?
 *
 * It matters more than it looks. A ring final supplying BS 1363 accessories is
 * assessed under Regulation 433.1.204, not 433.1.1 — the test is that the
 * cable's Iz is at least 20 A, not that the device rating fits inside Iz. Get
 * the classification wrong in either direction and the verdict is wrong:
 *
 *   ring judged as radial  → a legitimate 32 A ring on 2.5 mm² is failed
 *   radial judged as ring  → a 32 A radial on 2.5 mm² is passed
 *
 * The existing detector decides on the description text, plus a clause that
 * treats *any* 32 A circuit on 2.5/4/6 mm² as a ring. Measured against 5,009
 * real EICR circuit rows, the description mentions "ring" on 4.7% of them,
 * while ring test values are recorded on 38% — so the text is the weakest
 * evidence available and the one being relied on.
 *
 * This returns `unknown` rather than defaulting, so a rule can decline to give
 * a verdict it cannot support.
 */
import { TestResult } from '@/types/testResult';
import { hasReading } from './applicability';

export type CircuitTopology = 'ring' | 'radial' | 'unknown';

export interface TopologyVerdict {
  topology: CircuitTopology;
  /** What the classification rests on, for the UI to show if challenged. */
  basis: string;
}

const says = (value: unknown, needle: string): boolean =>
  String(value ?? '')
    .toLowerCase()
    .includes(needle);

/**
 * Ordered by how much the evidence is worth, strongest first.
 *
 * The ring-test values are treated as positive evidence because r1/rn/r2 is a
 * measurement you only take on a ring — recording all three is a deliberate act.
 * Their absence proves nothing: they may simply not have been done yet.
 */
export const detectTopology = (circuit: TestResult): TopologyVerdict => {
  // 1. The circuit type field, where an electrician has said so outright.
  if (says(circuit.circuitType, 'ring') || says(circuit.type, 'ring')) {
    return { topology: 'ring', basis: 'Circuit type recorded as a ring' };
  }
  if (says(circuit.circuitType, 'radial') || says(circuit.type, 'radial')) {
    return { topology: 'radial', basis: 'Circuit type recorded as a radial' };
  }

  // 2. Ring final test values present — r1, rn and r2 are only measured on a ring.
  if (hasReading(circuit.ringR1) && hasReading(circuit.ringRn) && hasReading(circuit.ringR2)) {
    return { topology: 'ring', basis: 'Ring final test values recorded (r1, rn, r2)' };
  }

  // 3. The description. Weak, but positive evidence when it is there.
  if (says(circuit.circuitDescription, 'ring')) {
    return { topology: 'ring', basis: 'Circuit description mentions a ring' };
  }

  // Deliberately no fallback. A 32 A device on 2.5 mm² is exactly as consistent
  // with a non-compliant radial as with a compliant ring, and guessing decides
  // the verdict rather than informing it.
  return { topology: 'unknown', basis: 'Not recorded' };
};
