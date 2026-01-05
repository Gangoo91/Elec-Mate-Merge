import React, { useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { wiringTypeOptions } from '@/types/wiringTypes';

interface TypeOfWiringCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const TypeOfWiringCellComponent: React.FC<TypeOfWiringCellProps> = ({ result, onUpdate }) => {
  const handleChange = useCallback((value: string) => {
    onUpdate(result.id, 'typeOfWiring', value);
  }, [result.id, onUpdate]);

  return (
    <TableCell className="p-0 bg-black h-5 align-middle min-w-[120px] max-w-[120px]">
      <Select
        name={`typeOfWiring-${result.id}`}
        value={result.typeOfWiring || ''}
        onValueChange={handleChange}
      >
        <SelectTrigger className="h-4 text-xs px-0 bg-transparent border-0 rounded-none focus:ring-0">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent key={`typeOfWiring-content-${result.id}`} className="max-h-60 max-w-[calc(100vw-2rem)] w-auto bg-background border border-border rounded-md z-[9999]">
          {wiringTypeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-xs text-neutral-100 whitespace-normal break-words">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export const TypeOfWiringCell = React.memo(TypeOfWiringCellComponent);
