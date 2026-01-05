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
      className="h-4 text-xs text-center px-0 w-full bg-transparent border-0 rounded-none focus-visible:ring-0 focus:bg-blue-50"
      disabled={!!result.sourceCircuitId}
    />
  );
};

export const CircuitNumberCell = React.memo(CircuitNumberCellComponent);
