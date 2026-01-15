import React, { useCallback } from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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
      <MobileSelectPicker
        value={result.functionalTesting || ''}
        onValueChange={handleChange}
        options={[
          { value: '✓', label: '✓ Satisfactory' },
          { value: '✗', label: '✗ Unsatisfactory' },
          { value: 'N/A', label: 'N/A' },
        ]}
        placeholder="Func"
        title="Functional Testing"
      />
    </TableCell>
  );
};

export const FunctionalTestCell = React.memo(FunctionalTestCellComponent);
