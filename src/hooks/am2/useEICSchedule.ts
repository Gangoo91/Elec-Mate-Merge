/**
 * useEICSchedule
 *
 * Manages EIC form state, auto-population from readings,
 * and validation against BS 7671.
 */

import { useMemo } from 'react';
import type { EICScheduleState } from '@/types/am2-testing-simulator';
import { AM2_RIG_CIRCUITS, irMinFor, measuredZsMax } from '@/data/am2RigCircuits';
import { RESULT_COLS } from '@/data/am2/sectionBRules';

export type CellStatus = 'empty' | 'filled' | 'failed';

export interface EICValidation {
  circuitId: number;
  columnStatuses: Record<string, CellStatus>;
  overallComplete: boolean;
  filledCount: number;
  totalCount: number;
}

function getCellStatus(value: string, columnKey: string, circuitId: number): CellStatus {
  if (!value || value === '') return 'empty';

  const circuit = AM2_RIG_CIRCUITS.find((c) => c.id === circuitId);
  if (!circuit) return 'filled';

  // Check for failures
  if (columnKey === 'maxMeasuredZs' && value !== '') {
    const zsVal = parseFloat(value);
    if (!isNaN(zsVal) && zsVal > measuredZsMax(circuit)) return 'failed'; // Appendix 3
  }

  if ((columnKey === 'irLiveLive' || columnKey === 'irLiveEarth') && value !== '') {
    const irStr = value.replace('>', '').trim();
    const irVal = parseFloat(irStr);
    if (!isNaN(irVal) && irVal < irMinFor(circuit)) return 'failed';
  }

  if (columnKey === 'polarity' && value === 'FAIL') return 'failed';

  if (columnKey === 'rcdDisconnectionTime' && value !== '') {
    const rcdVal = parseFloat(value);
    if (!isNaN(rcdVal) && rcdVal > 300) return 'failed';
  }

  return 'filled';
}

export function useEICSchedule(eic: EICScheduleState) {
  const validations = useMemo<EICValidation[]>(() => {
    return eic.testResults.map((result) => {
      const circuitId = parseInt(result.circuitNumber);

      // Every box on the row counts, N/A and polarity included — the marking
      // checks all of them, and a count that skipped the N/A columns told an
      // Assessment learner which ones were N/A.
      const relevantFields = RESULT_COLS.map((c) => c.key);

      const columnStatuses: Record<string, CellStatus> = {};
      let filledCount = 0;

      for (const field of relevantFields) {
        const value = result[field];
        const status = getCellStatus(value, field, circuitId);
        columnStatuses[field] = status;
        if (status !== 'empty') filledCount++;
      }

      return {
        circuitId,
        columnStatuses,
        overallComplete: filledCount >= relevantFields.length,
        filledCount,
        totalCount: relevantFields.length,
      };
    });
  }, [eic.testResults]);

  const overallCompleteness = useMemo(() => {
    const total = validations.reduce((sum, v) => sum + v.totalCount, 0);
    const filled = validations.reduce((sum, v) => sum + v.filledCount, 0);
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  }, [validations]);

  return {
    validations,
    overallCompleteness,
  };
}
