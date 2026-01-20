import React from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';
import { TestValidationResults } from '@/utils/testValidation';

interface ZsCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  validation: TestValidationResults;
}

const ZsCellsComponent: React.FC<ZsCellsProps> = ({ result, onUpdate, validation }) => {
  return (
    <>
      {/* Column 24: Polarity# */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[100px] max-w-[100px]">
        <MobileSelectPicker
          value={result.polarity || ''}
          onValueChange={(value) => onUpdate(result.id, 'polarity', value)}
          options={[
            { value: 'Correct', label: 'Correct' },
            { value: 'Incorrect', label: 'Incorrect' },
            { value: 'N/A', label: 'N/A' },
          ]}
          placeholder="Polarity"
          title="Polarity"
          triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
        />
      </TableCell>

      {/* Column 25: Maximum measured (Zs) */}
      <TableCell className="p-0 h-8 align-middle w-24 min-w-[85px] max-w-[85px]">
        <EnhancedValidatedInput
          value={result.zs || ''}
          onChange={(value) => onUpdate(result.id, 'zs', value)}
          validation={validation?.zs}
          className="h-8 text-sm text-center px-1"
          placeholder="Ω"
        />
      </TableCell>
    </>
  );
};

export const ZsCells = React.memo(ZsCellsComponent);
