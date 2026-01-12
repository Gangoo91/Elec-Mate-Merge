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
    <TableCell className="px-1 py-0 h-10 align-middle w-14">
      <Select
        value={result.phaseType || '1P'}
        onValueChange={handlePhaseChange}
      >
        <SelectTrigger
          className="h-7 w-full text-xs bg-transparent border-white/20 hover:border-white/40 focus:border-elec-yellow focus:ring-elec-yellow/20"
        >
          <SelectValue placeholder="1P" />
        </SelectTrigger>
        <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-[100]">
          <SelectItem value="1P" className="text-xs">
            <span className="font-medium">1P</span>
          </SelectItem>
          <SelectItem value="3P" className="text-xs">
            <span className="font-medium text-amber-400">3P</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export default PhaseTypeCell;
