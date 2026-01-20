import React, { useCallback } from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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
    <TableCell className="p-0 h-8 align-middle min-w-[120px] max-w-[120px]">
      <MobileSelectPicker
        value={result.typeOfWiring || ''}
        onValueChange={handleChange}
        options={wiringTypeOptions}
        placeholder="Type"
        title="Type of Wiring"
        triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
      />
    </TableCell>
  );
};

export const TypeOfWiringCell = React.memo(TypeOfWiringCellComponent);
