
import React from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';

interface AfddCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const AfddCellComponent: React.FC<AfddCellProps> = ({ result, onUpdate }) => {
  return (
    <TableCell className="p-0 bg-black h-5 align-middle">
      <MobileSelectPicker
        value={result.afddTest || ''}
        onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
        options={[
          { value: '✓', label: '✓ Pass' },
          { value: '✗', label: '✗ Fail' },
          { value: 'N/A', label: 'N/A' },
        ]}
        placeholder="Manual test"
        title="AFDD Test"
      />
    </TableCell>
  );
};

export const AfddCell = React.memo(AfddCellComponent);
