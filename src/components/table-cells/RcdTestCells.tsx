import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';

interface RcdTestCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const RcdTestCellsComponent: React.FC<RcdTestCellsProps> = ({ result, onUpdate }) => {
  return (
    <>
      {/* Column 26: Disconnection time (ms)* - RCD test at 1×IΔn */}
      <TableCell className="p-0 h-8 align-middle w-24 min-w-[90px] max-w-[90px]">
        <EnhancedValidatedInput
          value={result.rcdOneX || ''}
          onChange={(value) => onUpdate(result.id, 'rcdOneX', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="ms"
        />
      </TableCell>

      {/* Column 27: Test button operation */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[100px] max-w-[100px]">
        <Select
          value={result.rcdTestButton || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdTestButton', value)}
        >
          <SelectTrigger className="h-8 text-sm px-2 bg-transparent border-0 rounded-md hover:bg-muted/20 focus:bg-muted/30 focus:ring-1 focus:ring-elec-yellow/30">
            <SelectValue placeholder="Test button" className="truncate" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border rounded-md z-[100]">
            <SelectItem value="✓" className="text-xs text-green-400 font-medium hover:text-green-300">✓ Pass</SelectItem>
            <SelectItem value="✗" className="text-xs text-red-400 font-medium hover:text-red-300">✗ Fail</SelectItem>
            <SelectItem value="N/A" className="text-xs text-neutral-100">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
    </>
  );
};

export const RcdTestCells = React.memo(RcdTestCellsComponent);
