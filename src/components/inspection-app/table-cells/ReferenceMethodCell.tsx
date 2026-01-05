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
    <TableCell className="p-0 bg-black h-5 align-middle">
      <Select
        value={result.referenceMethod || ''}
        onValueChange={(value) => onUpdate(result.id, 'referenceMethod', value)}
      >
        <SelectTrigger className="h-4 text-xs px-0 bg-transparent border-0 rounded-none focus:ring-0">
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
