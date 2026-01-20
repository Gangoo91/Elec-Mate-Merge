import React from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';

interface RcdTestCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const RcdTestCellsComponent: React.FC<RcdTestCellsProps> = ({ result, onUpdate }) => {
  return (
    <>
      {/* Column 26: Disconnection time (ms)* - RCD test at 1×IΔn */}
      <TableCell className="p-0 h-8 align-middle w-24 min-w-[90px] max-w-[90px]">
        <EnhancedValidatedInput
          value={result.rcdOneX || ''}
          onChange={(value) => onUpdate(result.id, 'rcdOneX', value)}
          className="h-8 text-sm text-center px-1"
          placeholder="ms"
        />
      </TableCell>

      {/* Column 27: Test button operation */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[100px] max-w-[100px]">
        <MobileSelectPicker
          value={result.rcdTestButton || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdTestButton', value)}
          options={[
            { value: '✓', label: '✓ Pass' },
            { value: '✗', label: '✗ Fail' },
            { value: 'N/A', label: 'N/A' },
          ]}
          placeholder="Test button"
          title="RCD Test Button"
          triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
        />
      </TableCell>
    </>
  );
};

export const RcdTestCells = React.memo(RcdTestCellsComponent);
