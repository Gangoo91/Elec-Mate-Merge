import React from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';

interface CircuitNumberCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const CircuitNumberCellComponent: React.FC<CircuitNumberCellProps> = ({ result, onUpdate }) => {
  return (
    <EnhancedValidatedInput
      value={result.circuitDesignation}
      onChange={(value) => onUpdate(result.id, 'circuitDesignation', value)}
      className="h-8 text-sm text-center px-1 w-full"
      disabled={!!result.sourceCircuitId}
    />
  );
};

export const CircuitNumberCell = React.memo(CircuitNumberCellComponent);
