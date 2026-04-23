import React, { useCallback } from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { wiringTypeOptions } from '@/types/wiringTypes';
import ComboboxCell from './ComboboxCell';

interface TypeOfWiringCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const TypeOfWiringCellComponent: React.FC<TypeOfWiringCellProps> = ({ result, onUpdate }) => {
  const handleChange = useCallback(
    (value: string) => {
      onUpdate(result.id, 'typeOfWiring', value);
    },
    [result.id, onUpdate]
  );

  return (
    <TableCell className="p-0 h-8 align-middle min-w-[140px] max-w-[140px]">
      <ComboboxCell
        value={result.typeOfWiring || ''}
        onChange={handleChange}
        options={wiringTypeOptions}
        placeholder="—"
        compact
      />
    </TableCell>
  );
};

export const TypeOfWiringCell = React.memo(TypeOfWiringCellComponent);
