import React from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import ValidatedInput from '../ValidatedInput';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ThreePhaseCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

export const ThreePhaseCells: React.FC<ThreePhaseCellsProps> = ({ result, onUpdate }) => {
  // Only show three-phase cells if circuit is marked as 3P
  const isThreePhase = result.phaseType === '3P';
  
  if (!isThreePhase) {
    // Return N/A cells if not three-phase
    return (
      <>
        <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle text-center text-xs text-muted-foreground">
          N/A
        </TableCell>
        <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle text-center text-xs text-muted-foreground">
          N/A
        </TableCell>
        <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle text-center text-xs text-muted-foreground">
          N/A
        </TableCell>
        <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle text-center text-xs text-muted-foreground">
          N/A
        </TableCell>
        <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle text-center text-xs text-muted-foreground">
          N/A
        </TableCell>
      </>
    );
  }

  return (
    <>
      {/* Phase Rotation (L1-L2-L3 sequence) */}
      <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle">
        <div className="flex items-center gap-1">
          <MobileSelectPicker
            value={result.phaseRotation || ''}
            onValueChange={(value) => onUpdate(result.id, 'phaseRotation', value)}
            options={[
              { value: '✓', label: '✓ Correct' },
              { value: '✗', label: '✗ Incorrect' },
              { value: 'L1-L2-L3', label: 'L1-L2-L3' },
              { value: 'L1-L3-L2', label: 'L1-L3-L2 (Reversed)' },
              { value: 'N/A', label: 'N/A' },
            ]}
            placeholder="Select..."
            title="Phase Rotation"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 text-muted-foreground cursor-help flex-shrink-0" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs z-50">
                <p className="text-xs">
                  <strong>Phase Sequence Test (BS 7671 Reg 612.12)</strong><br />
                  Verify clockwise rotation L1→L2→L3 using phase rotation meter.<br />
                  Record as "Correct" or "Incorrect"
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>

      {/* Phase Balance L1 */}
      <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <ValidatedInput
                  value={result.phaseBalanceL1 || ''}
                  onChange={(value) => onUpdate(result.id, 'phaseBalanceL1', value)}
                  placeholder="A"
                  className="h-10 text-sm text-center px-4"
                />
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs">
                <strong>Load Balance L1 (Amps)</strong><br />
                Measure load current on phase L1. Should be balanced within 10% across all three phases.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      {/* Phase Balance L2 */}
      <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle">
        <ValidatedInput
          value={result.phaseBalanceL2 || ''}
          onChange={(value) => onUpdate(result.id, 'phaseBalanceL2', value)}
          placeholder="A"
          className="h-10 text-sm text-center px-4"
        />
      </TableCell>

      {/* Phase Balance L3 */}
      <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle">
        <ValidatedInput
          value={result.phaseBalanceL3 || ''}
          onChange={(value) => onUpdate(result.id, 'phaseBalanceL3', value)}
          placeholder="A"
          className="h-10 text-sm text-center px-4"
        />
      </TableCell>

      {/* Line-to-Line Voltage */}
      <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <ValidatedInput
                  value={result.lineToLineVoltage || ''}
                  onChange={(value) => onUpdate(result.id, 'lineToLineVoltage', value)}
                  placeholder="400V"
                  className="h-10 text-sm text-center px-4"
                />
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs">
                <strong>Line-to-Line Voltage</strong><br />
                Measure voltage between any two phases (L1-L2, L2-L3, L1-L3).<br />
                Nominal: 400V (±10% = 360-440V acceptable)
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </>
  );
};

// Phase type indicator badge component
export const PhaseTypeBadge: React.FC<{ phaseType?: '1P' | '3P' | '' }> = ({ phaseType }) => {
  if (!phaseType || phaseType === '1P') {
    return (
      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
        1P
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
      3P
    </Badge>
  );
};
