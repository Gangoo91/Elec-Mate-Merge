import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { referenceMethodOptions } from '@/types/cableTypes';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';


interface CircuitDetailsCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const CircuitDetailsCellsComponent: React.FC<CircuitDetailsCellsProps> = ({ result, onUpdate }) => {
  return (
    <TableCell className="sticky left-[96px] z-40 p-0 h-8 align-middle w-55 min-w-[150px] sm:min-w-[220px] max-w-[150px] sm:max-w-[220px] bg-card">
      <EnhancedValidatedInput
        value={result.circuitDescription}
        onChange={(value) => onUpdate(result.id, 'circuitDescription', value)}
        placeholder="e.g. Kitchen Ring, Upstairs Lighting"
        className="h-8 text-sm px-0 w-full bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
        disabled={!!result.sourceCircuitId}
      />
    </TableCell>
  );
};

export const CircuitDetailsCells = React.memo(CircuitDetailsCellsComponent);
