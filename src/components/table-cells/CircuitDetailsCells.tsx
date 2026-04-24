import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { referenceMethodOptions } from '@/types/cableTypes';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';
import { getSpareCircuitFields } from '@/utils/spareCircuitFields';

interface CircuitDetailsCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  /** Optional bulk update — enables the "type 'spare' to cascade N/A" shortcut. */
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
}

const CircuitDetailsCellsComponent: React.FC<CircuitDetailsCellsProps> = ({
  result,
  onUpdate,
  onBulkUpdate,
}) => {
  // When the user types "spare" (any case, trimmed) in the description and
  // commits it (blur / enter), cascade N/A across every test + detail field
  // so they don't have to find the right-hand "Spare" button on a 30-col table.
  const handleDescriptionCommit = React.useCallback(
    (value: string) => {
      const normalised = (value || '').trim().toLowerCase();
      if (normalised !== 'spare' && normalised !== 'spare way') return;
      if (!onBulkUpdate) return;
      onBulkUpdate(result.id, getSpareCircuitFields() as Partial<TestResult>);
    },
    [result.id, onBulkUpdate]
  );

  return (
    <TableCell className="sticky left-[96px] z-40 p-0 h-8 align-middle w-55 min-w-[150px] sm:min-w-[220px] max-w-[150px] sm:max-w-[220px] bg-card">
      <EnhancedValidatedInput
        value={result.circuitDescription}
        onChange={(value) => onUpdate(result.id, 'circuitDescription', value)}
        onCommit={handleDescriptionCommit}
        placeholder="e.g. Kitchen Ring, Upstairs Lighting (type 'spare' to N/A all)"
        className="h-8 text-sm px-0 w-full bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
        disabled={!!result.sourceCircuitId}
      />
    </TableCell>
  );
};

export const CircuitDetailsCells = React.memo(CircuitDetailsCellsComponent);
