import React from 'react';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calculator } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import type { CellWarning } from '@/utils/cellWarnings';
import { TestValidationResults } from '@/utils/testValidation';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';
import R1R2Calculator from '@/components/R1R2Calculator';

interface ContinuityCellsProps {
  /** BS 7671 findings that name a cell in this group, keyed by field. */
  cellWarnings?: Partial<Record<keyof TestResult, CellWarning>>;
  /** Opens the finding in the Validate sheet. */
  onOpenWarning?: () => void;
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  validation: TestValidationResults;
}

const ContinuityCellsComponent: React.FC<ContinuityCellsProps> = ({
  result,
  onUpdate,
  validation,
  cellWarnings,
  onOpenWarning,
}) => {
  return (
    <>
      {/* Column 16: r₁ (line) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          regulationWarning={cellWarnings?.ringR1}
          onOpenWarning={onOpenWarning}
          value={result.ringR1 || ''}
          onChange={(value) => onUpdate(result.id, 'ringR1', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow focus:shadow-none hover:bg-white/[0.04] focus:bg-transparent"
          placeholder="—"
        />
      </TableCell>

      {/* Column 17: rₙ (neutral) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          regulationWarning={cellWarnings?.ringRn}
          onOpenWarning={onOpenWarning}
          value={result.ringRn || ''}
          onChange={(value) => onUpdate(result.id, 'ringRn', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow focus:shadow-none hover:bg-white/[0.04] focus:bg-transparent"
          placeholder="—"
        />
      </TableCell>

      {/* Column 18: r₂ (cpc) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[75px] max-w-[75px]">
        <EnhancedValidatedInput
          regulationWarning={cellWarnings?.ringR2}
          onOpenWarning={onOpenWarning}
          value={result.ringR2 || ''}
          onChange={(value) => onUpdate(result.id, 'ringR2', value)}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow focus:shadow-none hover:bg-white/[0.04] focus:bg-transparent"
          placeholder="—"
        />
      </TableCell>

      {/* Column 19: (R₁ + R₂) or R₂ — with inline R1+R2 calculator (ELE-1181) */}
      <TableCell className="p-0 h-8 align-middle w-32 min-w-[132px] max-w-[132px]">
        <div className="flex items-center h-8 pl-0.5">
          <EnhancedValidatedInput
          regulationWarning={cellWarnings?.r1r2}
          onOpenWarning={onOpenWarning}
            value={result.r1r2 || ''}
            onChange={(value) => onUpdate(result.id, 'r1r2', value)}
            validation={validation?.r1r2}
            className="h-8 text-sm text-center pl-1 pr-5 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow focus:shadow-none hover:bg-white/[0.04] focus:bg-transparent min-w-0 flex-1"
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
          regulationWarning={cellWarnings?.ringContinuityLive}
          onOpenWarning={onOpenWarning}
          value={result.ringContinuityLive || ''}
          onChange={(value) => onUpdate(result.id, 'ringContinuityLive', value)}
          validation={validation?.ringContinuityLive}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow focus:shadow-none hover:bg-white/[0.04] focus:bg-transparent"
          placeholder="—"
        />
      </TableCell>
    </>
  );
};

export const ContinuityCells = React.memo(ContinuityCellsComponent);
