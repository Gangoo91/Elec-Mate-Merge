import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';
import { TestValidationResults } from '@/utils/testValidation';

interface ZsCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  validation: TestValidationResults;
}

const ZsCellsComponent: React.FC<ZsCellsProps> = ({ result, onUpdate, validation }) => {
  return (
    <>
      {/* Column 24: Polarity# */}
      <TableCell className="p-0 bg-black h-5 align-middle w-28 min-w-[100px] max-w-[100px]">
        <Select
          value={result.polarity || ''}
          onValueChange={(value) => onUpdate(result.id, 'polarity', value)}
        >
          <SelectTrigger className="h-4 text-xs px-0 bg-transparent border-0 rounded-none focus:ring-0">
            <SelectValue placeholder="Polarity" className="truncate" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border rounded-md z-[100]">
            <SelectItem value="Correct" className="text-xs text-neutral-100">Correct</SelectItem>
            <SelectItem value="Incorrect" className="text-xs text-red-400 hover:text-red-300">Incorrect</SelectItem>
            <SelectItem value="N/A" className="text-xs text-neutral-100">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* Column 25: Maximum measured (Zs) */}
      <TableCell className="p-0 bg-black h-5 align-middle w-24 min-w-[85px] max-w-[85px]">
        <EnhancedValidatedInput
          value={result.zs || ''}
          onChange={(value) => onUpdate(result.id, 'zs', value)}
          validation={validation?.zs}
          className="h-4 text-xs text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-0 focus:bg-blue-50"
          placeholder="Ω"
        />
      </TableCell>
    </>
  );
};

export const ZsCells = React.memo(ZsCellsComponent);
