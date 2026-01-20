import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';

interface AfddTestCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

export const AfddTestCell: React.FC<AfddTestCellProps> = ({ result, onUpdate }) => {
  return (
    <TableCell className="p-0 h-8 align-middle w-28 min-w-[100px] max-w-[100px]">
      <Select
        value={result.afddTest || ''}
        onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
      >
        <SelectTrigger className="h-8 text-sm px-2 bg-transparent border-0 rounded-md hover:bg-muted/20 focus:bg-muted/30 focus:ring-1 focus:ring-elec-yellow/30">
          <SelectValue placeholder="AFDD" />
        </SelectTrigger>
        <SelectContent className="bg-background border border-border rounded-md z-[100]">
          <SelectItem value="✓" className="text-sm text-green-400 font-medium">✓ Pass</SelectItem>
          <SelectItem value="✗" className="text-sm text-red-400 font-medium">✗ Fail</SelectItem>
          <SelectItem value="N/A" className="text-sm">N/A</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};
