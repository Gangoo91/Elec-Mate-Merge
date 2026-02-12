/**
 * useEICSchedule
 *
 * Manages EIC form state, auto-population from readings,
 * and validation against BS 7671.
 */

import { useMemo } from 'react';
import type { EICScheduleState, EICTestResult } from '@/types/am2-testing-simulator';
import { AM2_RIG_CIRCUITS } from '@/data/am2RigCircuits';

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
    if (!isNaN(zsVal) && zsVal > circuit.maxZs) return 'failed';
  }

  if ((columnKey === 'irLiveLive' || columnKey === 'irLiveEarth') && value !== '') {
    const irStr = value.replace('>', '').trim();
    const irVal = parseFloat(irStr);
    if (!isNaN(irVal) && irVal < 1.0) return 'failed';
  }

  if (columnKey === 'polarity' && value === 'FAIL') return 'failed';

  if (columnKey === 'rcdDisconnectionTime' && value !== '') {
    const rcdVal = parseFloat(value);
    if (!isNaN(rcdVal) && rcdVal > 300) return 'failed';
  }

  return 'filled';
}

/** Key test result fields that should be filled */
const KEY_FIELDS: (keyof EICTestResult)[] = [
  'r1r2',
  'irTestVoltage',
  'irLiveLive',
  'irLiveEarth',
  'maxMeasuredZs',
];

/** Additional fields for ring circuits */
const RING_FIELDS: (keyof EICTestResult)[] = ['ringR1', 'ringRn', 'ringR2'];

/** Additional fields for RCD circuits */
const RCD_FIELDS: (keyof EICTestResult)[] = ['rcdDisconnectionTime', 'rcdTestButton'];

export function useEICSchedule(eic: EICScheduleState) {
  const validations = useMemo<EICValidation[]>(() => {
    return eic.testResults.map((result) => {
      const circuitId = parseInt(result.circuitNumber);
      const circuit = AM2_RIG_CIRCUITS.find((c) => c.id === circuitId);

      // Determine which fields are relevant for this circuit
      const relevantFields = [...KEY_FIELDS];
      if (circuit?.diagramLayout === 'ring') {
        relevantFields.push(...RING_FIELDS);
      }
      if (circuit?.hasRcd) {
        relevantFields.push(...RCD_FIELDS);
      }

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
