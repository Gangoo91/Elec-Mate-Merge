import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calculator } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { TestValidationResults } from '@/utils/testValidation';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';
import R1R2Calculator from '@/components/R1R2Calculator';

interface ContinuityCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  validation: TestValidationResults;
}

const ContinuityCellsComponent: React.FC<ContinuityCellsProps> = ({
  result,
  onUpdate,
  validation,
}) => {
  return (
    <>
      {/* Column 16: r₁ (line) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          value={result.ringR1 || ''}
          onChange={(value) => onUpdate(result.id, 'ringR1', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="—"
        />
      </TableCell>

      {/* Column 17: rₙ (neutral) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          value={result.ringRn || ''}
          onChange={(value) => onUpdate(result.id, 'ringRn', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="—"
        />
      </TableCell>

      {/* Column 18: r₂ (cpc) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          value={result.ringR2 || ''}
          onChange={(value) => onUpdate(result.id, 'ringR2', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="—"
        />
      </TableCell>

      {/* Column 19: (R₁ + R₂) or R₂ — with inline R1+R2 calculator (ELE-1181) */}
      <TableCell className="p-0 h-8 align-middle w-32 min-w-[132px] max-w-[132px]">
        <div className="flex items-center h-8 pl-0.5">
          <EnhancedValidatedInput
            value={result.r1r2 || ''}
            onChange={(value) => onUpdate(result.id, 'r1r2', value)}
            validation={validation?.r1r2}
            className="h-8 text-sm text-center pl-1 pr-5 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30 min-w-0 flex-1"
            placeholder="—"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-5 shrink-0 text-muted-foreground hover:text-elec-yellow touch-manipulation"
                title="R1+R2 calculator"
                aria-label="Open R1+R2 calculator"
                onClick={(e) => e.stopPropagation()}
              >
                <Calculator className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 border-0 bg-transparent shadow-none">
              <R1R2Calculator
                result={result}
                onUpdate={(field, value) => onUpdate(result.id, field, value)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </TableCell>

      {/* Column 20: R₂ - Using ringContinuityLive as temporary field */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          value={result.ringContinuityLive || ''}
          onChange={(value) => onUpdate(result.id, 'ringContinuityLive', value)}
          validation={validation?.ringContinuityLive}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
          placeholder="—"
        />
      </TableCell>
    </>
  );
};

export const ContinuityCells = React.memo(ContinuityCellsComponent);
