import React from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PhaseTypeCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

/**
 * PhaseTypeCell - Inline dropdown for selecting circuit phase type (1P/3P)
 * Displays in the circuit testing table for each circuit
 */
export const PhaseTypeCell: React.FC<PhaseTypeCellProps> = ({ result, onUpdate }) => {
  const handlePhaseChange = (value: string) => {
    onUpdate(result.id, 'phaseType', value);
  };

  return (
    <TableCell className="p-0 h-8 align-middle w-16 min-w-[60px] max-w-[60px]" style={{ backgroundColor: 'inherit' }}>
      <Select
        value={result.phaseType || '1P'}
        onValueChange={handlePhaseChange}
      >
        <SelectTrigger
          className="h-8 w-full text-sm bg-transparent border-0 rounded-md hover:bg-muted/20 focus:bg-muted/30 focus:ring-1 focus:ring-elec-yellow/30"
        >
          <SelectValue placeholder="1P" />
        </SelectTrigger>
        <SelectContent className="bg-background border border-border rounded-md z-[100]">
          <SelectItem value="1P" className="text-sm">
            <span className="font-medium">1P</span>
          </SelectItem>
          <SelectItem value="3P" className="text-sm">
            <span className="font-medium text-amber-400">3P</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export default PhaseTypeCell;
