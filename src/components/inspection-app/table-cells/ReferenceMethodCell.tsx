import React from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';

interface ReferenceMethodCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

export const ReferenceMethodCell: React.FC<ReferenceMethodCellProps> = ({ result, onUpdate }) => {
  return (
    <TableCell className="p-0 h-8 align-middle w-20 min-w-[70px] max-w-[70px]">
      <MobileSelectPicker
        value={result.referenceMethod || ''}
        onValueChange={(value) => onUpdate(result.id, 'referenceMethod', value)}
        options={[
          { value: 'A1', label: 'A1' },
          { value: 'A2', label: 'A2' },
          { value: 'B1', label: 'B1' },
          { value: 'B2', label: 'B2' },
          { value: 'C', label: 'C' },
          { value: 'D1', label: 'D1' },
          { value: 'D2', label: 'D2' },
          { value: 'E', label: 'E' },
          { value: 'F', label: 'F' },
          { value: 'G', label: 'G' },
        ]}
        placeholder="Ref"
        title="Reference Method"
        triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
      />
    </TableCell>
  );
};
