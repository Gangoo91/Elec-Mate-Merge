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
    <TableCell className="border-r-2 border-border px-2 py-0 bg-indigo-50/30 h-7 align-middle">
      <Select
        value={result.afddTest || ''}
        onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
      >
        <SelectTrigger className="h-7 text-sm border border-input bg-transparent px-4 text-center">
          <SelectValue placeholder="AFDD" />
        </SelectTrigger>
        <SelectContent className="bg-elec-gray border-elec-gray text-foreground shadow-lg z-[60]">
          <SelectItem value="✓" className="text-sm text-green-600 font-medium">✓ Pass</SelectItem>
          <SelectItem value="✗" className="text-sm text-red-600 font-medium">✗ Fail</SelectItem>
          <SelectItem value="N/A" className="text-sm text-white/70">N/A</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};
