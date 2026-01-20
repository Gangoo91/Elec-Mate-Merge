
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';

interface AfddCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const AfddCellComponent: React.FC<AfddCellProps> = ({ result, onUpdate }) => {
  return (
    <TableCell className="p-0 h-8 align-middle">
      <Select
        value={result.afddTest || ''}
        onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
      >
        <SelectTrigger className="h-8 text-sm px-2 bg-transparent border-0 rounded-md hover:bg-muted/20 focus:bg-muted/30 focus:ring-1 focus:ring-elec-yellow/30">
          <SelectValue placeholder="Manual test" />
        </SelectTrigger>
        <SelectContent className="bg-background border border-border rounded-md z-[100]">
          <SelectItem value="✓" className="text-xs text-green-400 font-medium hover:text-green-300">✓ Pass</SelectItem>
          <SelectItem value="✗" className="text-xs text-red-400 font-medium hover:text-red-300">✗ Fail</SelectItem>
          <SelectItem value="N/A" className="text-xs text-neutral-100">N/A</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export const AfddCell = React.memo(AfddCellComponent);
