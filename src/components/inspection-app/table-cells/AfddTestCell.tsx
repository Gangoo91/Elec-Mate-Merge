import React from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';

interface AfddTestCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

export const AfddTestCell: React.FC<AfddTestCellProps> = ({ result, onUpdate }) => {
  return (
    <TableCell className="p-0 h-8 align-middle w-28 min-w-[100px] max-w-[100px]">
      <MobileSelectPicker
        value={result.afddTest || ''}
        onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
        options={[
          { value: '✓', label: '✓ Pass' },
          { value: '✗', label: '✗ Fail' },
          { value: 'N/A', label: 'N/A' },
        ]}
        placeholder="AFDD"
        title="AFDD Test"
        triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
      />
    </TableCell>
  );
};
