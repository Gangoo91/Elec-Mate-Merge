import React from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { TestValidationResults } from '@/utils/testValidation';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';

interface ContinuityCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  validation: TestValidationResults;
}

const ContinuityCellsComponent: React.FC<ContinuityCellsProps> = ({ result, onUpdate, validation }) => {
  return (
    <>
      {/* Column 16: r₁ (line) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          value={result.ringR1 || ''}
          onChange={(value) => onUpdate(result.id, 'ringR1', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="Ω"
        />
      </TableCell>

      {/* Column 17: rₙ (neutral) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          value={result.ringRn || ''}
          onChange={(value) => onUpdate(result.id, 'ringRn', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="Ω"
        />
      </TableCell>

      {/* Column 18: r₂ (cpc) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          value={result.ringR2 || ''}
          onChange={(value) => onUpdate(result.id, 'ringR2', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="Ω"
        />
      </TableCell>

      {/* Column 19: (R₁ + R₂) or R₂ */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          value={result.r1r2 || ''}
          onChange={(value) => onUpdate(result.id, 'r1r2', value)}
          validation={validation?.r1r2}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="Ω"
        />
      </TableCell>

      {/* Column 20: R₂ - Using ringContinuityLive as temporary field */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          value={result.ringContinuityLive || ''}
          onChange={(value) => onUpdate(result.id, 'ringContinuityLive', value)}
          validation={validation?.ringContinuityLive}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="Ω"
        />
      </TableCell>
    </>
  );
};

export const ContinuityCells = React.memo(ContinuityCellsComponent);
