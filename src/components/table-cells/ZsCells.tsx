import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import type { CellWarning } from '@/utils/cellWarnings';
import { CellWarningMarker } from './CellWarningMarker';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';
import { TestValidationResults } from '@/utils/testValidation';

interface ZsCellsProps {
  /** BS 7671 findings that name a cell in this group, keyed by field. */
  cellWarnings?: Partial<Record<keyof TestResult, CellWarning>>;
  /** Opens the finding in the Validate sheet. */
  onOpenWarning?: () => void;
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  validation: TestValidationResults;
}

const ZsCellsComponent: React.FC<ZsCellsProps> = ({ result, onUpdate, validation, cellWarnings, onOpenWarning }) => {
  return (
    <>
      {/* Column 24: Polarity# */}
      <TableCell className="relative p-0 h-8 align-middle w-28 min-w-[100px] max-w-[100px]">
        <CellWarningMarker warning={cellWarnings?.polarity} onOpen={onOpenWarning} />
        <Select
          value={result.polarity || ''}
          onValueChange={(value) => onUpdate(result.id, 'polarity', value)}
        >
          <SelectTrigger className="h-8 text-sm px-1.5 gap-1 [&_svg]:h-3 [&_svg]:w-3 bg-transparent border border-transparent text-white rounded-md hover:bg-white/[0.04] focus:bg-transparent focus:ring-1 focus:ring-inset focus:ring-elec-yellow focus:shadow-none">
            <SelectValue placeholder="—" className="truncate" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border rounded-md z-[9999] min-w-[160px]">
            <SelectItem value="Correct" className="text-xs text-white">
              Correct
            </SelectItem>
            <SelectItem value="Incorrect" className="text-xs text-red-400 hover:text-red-300">
              Incorrect
            </SelectItem>
            <SelectItem value="N/A" className="text-xs text-white">
              N/A
            </SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* Column 25: Maximum measured (Zs) — format to 2 dp on blur for neat display */}
      <TableCell className="p-0 h-8 align-middle w-24 min-w-[85px] max-w-[85px]">
        <EnhancedValidatedInput
          regulationWarning={cellWarnings?.zs}
          onOpenWarning={onOpenWarning}
          value={result.zs || ''}
          onChange={(value) => onUpdate(result.id, 'zs', value)}
          onCommit={(value) => {
            const num = parseFloat(value);
            if (!Number.isFinite(num)) return;
            const formatted = num.toFixed(2);
            if (formatted !== value) onUpdate(result.id, 'zs', formatted);
          }}
          validation={validation?.zs}
          className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow focus:shadow-none hover:bg-white/[0.04] focus:bg-transparent"
          placeholder="—"
        />
      </TableCell>
    </>
  );
};

export const ZsCells = React.memo(ZsCellsComponent);
