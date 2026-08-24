/**
 * Which cells a column fill is allowed to write — ELE-1605.
 *
 * This is a pure function on purpose. The rules it encodes are the only thing
 * standing between "fill the N/A column" and "overwrite a measured Zs on a
 * signed certificate", and rules that live inside a component cannot be
 * asserted. `npm run check:eicr` exercises this directly.
 *
 * Three rules, in order:
 *
 *  1. **Scope.** Only circuits whose ids were passed in. The schedule holds
 *     every board's circuits in one flat array and the desktop table renders
 *     one board at a time — an unscoped fill silently rewrites the consumer
 *     unit you are not looking at.
 *  2. **Spare ways.** An empty position has nothing to measure. The board
 *     scanner marks these 'N/A' and a fill must not replace that with a
 *     reading (see `utils/spareWays`).
 *  3. **Existing readings.** In `blank` mode a cell that already holds a value
 *     is left alone. Overwriting is available, but only as an explicit choice,
 *     and the caller is handed the count so it can say what it did.
 */
import { isBlankReading } from '@/utils/irDefaults';
import { isSpareCircuit } from '@/utils/spareWays';

export type ColumnFillMode = 'blank' | 'overwrite';

export interface ColumnFillPlan {
  /** Ids to write to. */
  fillIds: string[];
  /** Left alone because they already hold a reading (blank mode only). */
  kept: number;
  /** Left alone because the row is a spare way. */
  skipped: number;
}

/**
 * Generic over the circuit shape rather than typed to a local interface: an
 * interface carrying an index signature is not assignable FROM `TestResult`
 * (TypeScript will not widen a declared interface into one), so every caller
 * would have needed a cast — and a cast at each call site is how the wrong
 * array eventually gets passed.
 */
interface FillableCircuit {
  id: string;
  circuitDescription?: string;
}

export const planColumnFill = <T extends FillableCircuit>(
  circuits: readonly T[],
  field: string,
  mode: ColumnFillMode,
  /** Ids in scope — omit to consider every circuit passed in. */
  circuitIds?: readonly string[]
): ColumnFillPlan => {
  const scope = circuitIds ? new Set(circuitIds) : null;
  const fillIds: string[] = [];
  let kept = 0;
  let skipped = 0;

  for (const circuit of circuits) {
    if (scope && !scope.has(circuit.id)) continue;
    if (isSpareCircuit(circuit as Parameters<typeof isSpareCircuit>[0])) {
      skipped += 1;
      continue;
    }
    if (mode === 'blank' && !isBlankReading((circuit as Record<string, unknown>)[field])) {
      kept += 1;
      continue;
    }
    fillIds.push(circuit.id);
  }

  return { fillIds, kept, skipped };
};

/**
 * What to tell the user. Always mentions anything left untouched — a fill that
 * writes 4 of 12 cells reads as a fill that wrote all 12, and nobody goes back
 * to check a job they believe is done.
 */
export const describeColumnFill = (plan: ColumnFillPlan, value: string): string => {
  const { fillIds, kept, skipped } = plan;
  const n = fillIds.length;
  const head = `Filled ${n} ${n === 1 ? 'cell' : 'cells'} with ${value}`;
  const notes: string[] = [];
  if (kept > 0)
    notes.push(`${kept} existing ${kept === 1 ? 'reading' : 'readings'} left unchanged`);
  if (skipped > 0) notes.push(`${skipped} spare ${skipped === 1 ? 'way' : 'ways'} skipped`);
  return notes.length ? `${head} — ${notes.join(', ')}` : head;
};
