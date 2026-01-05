import React, { useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { referenceMethodOptions } from '@/types/cableTypes';

interface RefMethodCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const RefMethodCellComponent: React.FC<RefMethodCellProps> = ({ result, onUpdate }) => {
  const handleChange = useCallback((value: string) => {
    onUpdate(result.id, 'referenceMethod', value);
  }, [result.id, onUpdate]);

  return (
    <TableCell className="p-0 bg-black h-5 align-middle min-w-[100px] max-w-[100px]">
      <Select
        name={`referenceMethod-${result.id}`}
        value={result.referenceMethod || ''}
        onValueChange={handleChange}
      >
        <SelectTrigger className="h-4 text-xs w-full px-0 bg-transparent border-0 rounded-none focus:ring-0">
          <SelectValue placeholder="Ref" />
        </SelectTrigger>
        <SelectContent key={`referenceMethod-content-${result.id}`} className="max-h-60 bg-background border border-border rounded-md z-[9999]">
          {referenceMethodOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-xs text-neutral-100">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export const RefMethodCell = React.memo(RefMethodCellComponent);
