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
    <TableCell className="border-r-2 border-border px-2 py-0 bg-indigo-50/30 h-7 align-middle">
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
      />
    </TableCell>
  );
};
