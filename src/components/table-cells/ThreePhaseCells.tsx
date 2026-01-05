import React, { useMemo } from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import ValidatedInput from '../ValidatedInput';
import { Badge } from '@/components/ui/badge';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  calculatePhaseBalance,
  calculateNeutralCurrent,
  getPhaseBalanceColor
} from '@/utils/threePhaseCalculations';

interface ThreePhaseCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

export const ThreePhaseCells: React.FC<ThreePhaseCellsProps> = ({ result, onUpdate }) => {
  // Only show three-phase cells if circuit is marked as 3P
  const isThreePhase = result.phaseType === '3P';

  // Auto-calculate phase balance when all three phase values are entered
  const phaseBalanceResult = useMemo(() => {
    const L1 = parseFloat(result.phaseBalanceL1 || '0') || 0;
    const L2 = parseFloat(result.phaseBalanceL2 || '0') || 0;
    const L3 = parseFloat(result.phaseBalanceL3 || '0') || 0;

    // Only calculate if at least two phases have values
    if ((L1 > 0 ? 1 : 0) + (L2 > 0 ? 1 : 0) + (L3 > 0 ? 1 : 0) < 2) {
      return null;
    }

    return calculatePhaseBalance({ L1, L2, L3 });
  }, [result.phaseBalanceL1, result.phaseBalanceL2, result.phaseBalanceL3]);

  // Auto-calculate neutral current
  const neutralCurrentResult = useMemo(() => {
    const L1 = parseFloat(result.phaseBalanceL1 || '0') || 0;
    const L2 = parseFloat(result.phaseBalanceL2 || '0') || 0;
    const L3 = parseFloat(result.phaseBalanceL3 || '0') || 0;

    if (L1 === 0 && L2 === 0 && L3 === 0) {
      return null;
    }

    return calculateNeutralCurrent({ L1, L2, L3 });
  }, [result.phaseBalanceL1, result.phaseBalanceL2, result.phaseBalanceL3]);

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
          <Select
            value={result.phaseRotation || ''}
            onValueChange={(value) => onUpdate(result.id, 'phaseRotation', value)}
          >
            <SelectTrigger className="h-10 text-sm w-full px-4 bg-transparent">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border rounded-md z-[100]">
              <SelectItem value="✓" className="text-sm text-green-400 font-medium hover:text-green-300">✓ Correct</SelectItem>
              <SelectItem value="✗" className="text-sm text-red-400 font-medium hover:text-red-300">✗ Incorrect</SelectItem>
              <SelectItem value="L1-L2-L3" className="text-sm text-neutral-100">L1-L2-L3</SelectItem>
              <SelectItem value="L1-L3-L2" className="text-sm text-neutral-100">L1-L3-L2 (Reversed)</SelectItem>
              <SelectItem value="N/A" className="text-sm text-neutral-100">N/A</SelectItem>
            </SelectContent>
          </Select>
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

      {/* Phase Balance L3 + Auto-calculated Results */}
      <TableCell className="px-2 py-0 bg-purple-50/40 h-10 align-middle">
        <div className="flex items-center gap-1">
          <ValidatedInput
            value={result.phaseBalanceL3 || ''}
            onChange={(value) => onUpdate(result.id, 'phaseBalanceL3', value)}
            placeholder="A"
            className="h-10 text-sm text-center px-2 w-16"
          />
          {/* Phase Balance Indicator */}
          {phaseBalanceResult && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium ${getPhaseBalanceColor(phaseBalanceResult.imbalancePercent)}`}>
                    {phaseBalanceResult.isCompliant ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    <span>{phaseBalanceResult.imbalancePercent}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs z-50">
                  <div className="text-xs space-y-1">
                    <p className="font-semibold">Phase Balance Analysis (BS7671)</p>
                    <p>Imbalance: {phaseBalanceResult.imbalancePercent}%</p>
                    <p>Status: {phaseBalanceResult.isCompliant ? '✓ Compliant (<10%)' : '⚠ Non-compliant (>10%)'}</p>
                    <p>Highest: {phaseBalanceResult.highestPhase} | Lowest: {phaseBalanceResult.lowestPhase}</p>
                    {neutralCurrentResult && (
                      <p>Est. Neutral: {neutralCurrentResult.estimatedAmps}A</p>
                    )}
                    {phaseBalanceResult.recommendation && (
                      <p className="text-amber-600 dark:text-amber-400">{phaseBalanceResult.recommendation}</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
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
