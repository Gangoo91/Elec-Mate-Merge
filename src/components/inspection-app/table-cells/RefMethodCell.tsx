import React, { useCallback } from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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
    <TableCell className="p-0 h-8 align-middle min-w-[100px] max-w-[100px]">
      <MobileSelectPicker
        value={result.referenceMethod || ''}
        onValueChange={handleChange}
        options={referenceMethodOptions}
        placeholder="Ref"
        title="Reference Method"
        triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
      />
    </TableCell>
  );
};

export const RefMethodCell = React.memo(RefMethodCellComponent);
