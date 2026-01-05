import React from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import ValidatedInput from '../ValidatedInput';

interface PointsServedCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const PointsServedCellComponent: React.FC<PointsServedCellProps> = ({ result, onUpdate }) => {
  return (
    <TableCell className="p-0 bg-black h-5 align-middle w-16 min-w-[64px] max-w-[64px]">
      <ValidatedInput
        value={result.pointsServed}
        onChange={(value) => onUpdate(result.id, 'pointsServed', value)}
        className="h-4 text-xs text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-0 focus:bg-blue-50"
        placeholder="0"
      />
    </TableCell>
  );
};

export const PointsServedCell = React.memo(PointsServedCellComponent);
