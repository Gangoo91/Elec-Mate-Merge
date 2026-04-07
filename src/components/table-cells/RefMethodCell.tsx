import React, { useCallback } from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { referenceMethodOptions } from '@/types/cableTypes';
import ComboboxCell from './ComboboxCell';

interface RefMethodCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const RefMethodCellComponent: React.FC<RefMethodCellProps> = ({ result, onUpdate }) => {
  const handleChange = useCallback(
    (value: string) => {
      onUpdate(result.id, 'referenceMethod', value);
    },
    [result.id, onUpdate]
  );

  return (
    <TableCell className="p-0 h-8 align-middle min-w-[100px] max-w-[100px]">
      <ComboboxCell
        value={result.referenceMethod || ''}
        onChange={handleChange}
        options={referenceMethodOptions}
        placeholder="Ref"
      />
    </TableCell>
  );
};

export const RefMethodCell = React.memo(RefMethodCellComponent);
