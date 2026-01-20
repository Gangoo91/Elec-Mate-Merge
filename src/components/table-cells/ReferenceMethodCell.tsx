import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';

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
        <SelectContent className="max-h-60 bg-background border border-border rounded-md z-[100]">
          <SelectItem value="A1" className="text-xs text-neutral-100">A1</SelectItem>
          <SelectItem value="A2" className="text-xs text-neutral-100">A2</SelectItem>
          <SelectItem value="B1" className="text-xs text-neutral-100">B1</SelectItem>
          <SelectItem value="B2" className="text-xs text-neutral-100">B2</SelectItem>
          <SelectItem value="C" className="text-xs text-neutral-100">C</SelectItem>
          <SelectItem value="D1" className="text-xs text-neutral-100">D1</SelectItem>
          <SelectItem value="D2" className="text-xs text-neutral-100">D2</SelectItem>
          <SelectItem value="E" className="text-xs text-neutral-100">E</SelectItem>
          <SelectItem value="F" className="text-xs text-neutral-100">F</SelectItem>
          <SelectItem value="G" className="text-xs text-neutral-100">G</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};
