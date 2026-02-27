import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { referenceMethodOptions } from '@/types/cableTypes';

interface ReferenceMethodCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

export const ReferenceMethodCell: React.FC<ReferenceMethodCellProps> = ({ result, onUpdate }) => {
  return (
    <TableCell className="p-0 h-8 align-middle">
      <Select
        value={result.referenceMethod || ''}
        onValueChange={(value) => onUpdate(result.id, 'referenceMethod', value)}
      >
        <SelectTrigger className="h-8 text-sm px-2 bg-transparent border-0 rounded-md hover:bg-muted/20 focus:bg-muted/30 focus:ring-1 focus:ring-elec-yellow/30">
          <SelectValue placeholder="Ref" />
        </SelectTrigger>
        <SelectContent className="max-h-60 w-[320px] bg-background border border-border rounded-md z-[9999]">
          {referenceMethodOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-xs text-neutral-100 whitespace-normal break-words"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableCell>
  );
};
