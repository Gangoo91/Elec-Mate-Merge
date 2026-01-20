import React from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import ValidatedInput from '../ValidatedInput';

interface PfcCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const PfcCellComponent: React.FC<PfcCellProps> = ({ result, onUpdate }) => {
  // Use consolidated field, fall back to legacy fields for backward compatibility
  const pfcValue = result.pfc || result.pfcLiveNeutral || '';
  
  return (
    <TableCell className="p-0 h-8 align-middle">
      <ValidatedInput
        value={pfcValue}
        onChange={(value) => {
          onUpdate(result.id, 'pfc', value);
          // Also update legacy field for backward compatibility
          onUpdate(result.id, 'pfcLiveNeutral', value);
        }}
        className="h-8 text-sm text-center px-0 border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30 bg-transparent"
        placeholder="kA"
      />
    </TableCell>
  );
};

export const PfcCell = React.memo(PfcCellComponent);
