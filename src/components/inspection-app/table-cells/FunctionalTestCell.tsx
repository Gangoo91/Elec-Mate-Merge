import React, { useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';

interface FunctionalTestCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const FunctionalTestCellComponent: React.FC<FunctionalTestCellProps> = ({ result, onUpdate }) => {
  const handleChange = useCallback((value: string) => {
    onUpdate(result.id, 'functionalTesting', value);
  }, [result.id, onUpdate]);

  return (
    <TableCell className="p-0 bg-black h-5 align-middle">
      <Select
        name={`functionalTesting-${result.id}`}
        value={result.functionalTesting || ''}
        onValueChange={handleChange}
      >
        <SelectTrigger className="h-4 text-xs px-0 bg-transparent border-0 rounded-none focus:ring-0">
          <SelectValue placeholder="Func" />
        </SelectTrigger>
        <SelectContent key={`functionalTesting-content-${result.id}`} className="bg-background border border-border rounded-md z-[100]">
          <SelectItem value="✓" className="text-xs text-green-400 font-medium hover:text-green-300">✓ Satisfactory</SelectItem>
          <SelectItem value="✗" className="text-xs text-red-400 font-medium hover:text-red-300">✗ Unsatisfactory</SelectItem>
          <SelectItem value="N/A" className="text-xs text-neutral-100">N/A</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export const FunctionalTestCell = React.memo(FunctionalTestCellComponent);
