import React, { useCallback } from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import type { CellWarning } from '@/utils/cellWarnings';
import { referenceMethodOptions } from '@/types/cableTypes';
import ComboboxCell from './ComboboxCell';

interface RefMethodCellProps {
  cellWarnings?: Partial<Record<keyof TestResult, CellWarning>>;
  onOpenWarning?: () => void;
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const RefMethodCellComponent: React.FC<RefMethodCellProps> = ({ result, onUpdate, cellWarnings, onOpenWarning }) => {
  const handleChange = useCallback(
    (value: string) => {
      onUpdate(result.id, 'referenceMethod', value);
    },
    [result.id, onUpdate]
  );

  return (
    <TableCell className="p-0 h-8 align-middle min-w-[100px] max-w-[100px]">
      <ComboboxCell
          regulationWarning={cellWarnings?.referenceMethod}
          onOpenWarning={onOpenWarning}
        value={result.referenceMethod || ''}
        onChange={handleChange}
        options={referenceMethodOptions}
        placeholder="—"
        compact
      />
    </TableCell>
  );
};

export const RefMethodCell = React.memo(RefMethodCellComponent);
