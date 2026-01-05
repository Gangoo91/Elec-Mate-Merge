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
    <TableCell className="p-0 bg-black h-5 align-middle">
      <ValidatedInput
        value={pfcValue}
        onChange={(value) => {
          onUpdate(result.id, 'pfc', value);
          // Also update legacy field for backward compatibility
          onUpdate(result.id, 'pfcLiveNeutral', value);
        }}
        className="h-4 text-xs text-center px-0 border-0 rounded-none focus-visible:ring-0 focus:bg-blue-50 bg-transparent"
        placeholder="kA"
      />
    </TableCell>
  );
};

export const PfcCell = React.memo(PfcCellComponent);
