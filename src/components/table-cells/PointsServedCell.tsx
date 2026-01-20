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
    <TableCell className="p-0 h-8 align-middle w-16 min-w-[64px] max-w-[64px]">
      <ValidatedInput
        value={result.pointsServed}
        onChange={(value) => onUpdate(result.id, 'pointsServed', value)}
        className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
        placeholder="0"
      />
    </TableCell>
  );
};

export const PointsServedCell = React.memo(PointsServedCellComponent);
