import React, { useMemo } from 'react';
import { AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  calculatePhaseBalance,
  calculateNeutralCurrent,
  getPhaseBalanceColor,
  PhaseLoadData,
  PhaseBalanceResult,
  NeutralCurrentResult,
} from '@/utils/threePhaseCalculations';

interface PhaseBalanceIndicatorProps {
  /** Phase currents in Amps */
  loads: PhaseLoadData;
  /** Show compact badge only */
  compact?: boolean;
  /** Show neutral current estimate */
  showNeutral?: boolean;
  /** Show detailed breakdown */
  showDetails?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Visual indicator for three-phase balance compliance per BS7671
 * Shows imbalance percentage with color-coded status
 */
export const PhaseBalanceIndicator: React.FC<PhaseBalanceIndicatorProps> = ({
  loads,
  compact = false,
  showNeutral = true,
  showDetails = false,
  className = '',
}) => {
  const balanceResult = useMemo(() => {
    // Only calculate if we have at least 2 phases with values
    const hasValues = (loads.L1 > 0 ? 1 : 0) + (loads.L2 > 0 ? 1 : 0) + (loads.L3 > 0 ? 1 : 0);
    if (hasValues < 2) return null;
    return calculatePhaseBalance(loads);
  }, [loads.L1, loads.L2, loads.L3]);

  const neutralResult = useMemo(() => {
    if (loads.L1 === 0 && loads.L2 === 0 && loads.L3 === 0) return null;
    return calculateNeutralCurrent(loads);
  }, [loads.L1, loads.L2, loads.L3]);

  if (!balanceResult) {
    return (
      <div className={`flex items-center gap-1 text-muted-foreground text-xs ${className}`}>
        <Info className="h-3 w-3" />
        <span>Enter phase loads</span>
      </div>
    );
  }

  const colorClass = getPhaseBalanceColor(balanceResult.imbalancePercent);
  const StatusIcon = balanceResult.isCompliant ? CheckCircle : AlertTriangle;

  // Compact badge view
  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className={`${colorClass} cursor-help ${className}`}
            >
              <StatusIcon className="h-3 w-3 mr-1" />
              {balanceResult.imbalancePercent}%
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <PhaseBalanceTooltip
              balance={balanceResult}
              neutral={neutralResult}
              loads={loads}
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Full card view
  return (
    <div className={`rounded-lg border p-3 ${colorClass} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <span className="font-medium text-sm">Phase Balance</span>
        </div>
        <Badge variant="outline" className={colorClass}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {balanceResult.isCompliant ? 'Compliant' : 'Imbalanced'}
        </Badge>
      </div>

      {/* Phase bars visualization */}
      <div className="space-y-1.5 mb-3">
        <PhaseBar phase="L1" value={loads.L1} max={Math.max(loads.L1, loads.L2, loads.L3)} color="bg-red-500" />
        <PhaseBar phase="L2" value={loads.L2} max={Math.max(loads.L1, loads.L2, loads.L3)} color="bg-yellow-500" />
        <PhaseBar phase="L3" value={loads.L3} max={Math.max(loads.L1, loads.L2, loads.L3)} color="bg-blue-500" />
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs">
        <span>Imbalance: <strong>{balanceResult.imbalancePercent}%</strong></span>
        {showNeutral && neutralResult && (
          <span>Est. Neutral: <strong>{neutralResult.estimatedAmps}A</strong></span>
        )}
      </div>

      {/* Recommendation */}
      {showDetails && balanceResult.recommendation && (
        <div className="mt-2 p-2 rounded bg-amber-100/50 dark:bg-amber-900/20 text-xs">
          <AlertTriangle className="h-3 w-3 inline mr-1" />
          {balanceResult.recommendation}
        </div>
      )}
    </div>
  );
};

/**
 * Individual phase bar for visualization
 */
const PhaseBar: React.FC<{
  phase: string;
  value: number;
  max: number;
  color: string;
}> = ({ phase, value, max, color }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-6 font-medium">{phase}</span>
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-12 text-right">{value}A</span>
    </div>
  );
};

/**
 * Tooltip content with detailed phase balance info
 */
const PhaseBalanceTooltip: React.FC<{
  balance: PhaseBalanceResult;
  neutral: NeutralCurrentResult | null;
  loads: PhaseLoadData;
}> = ({ balance, neutral, loads }) => (
  <div className="text-xs space-y-1.5">
    <p className="font-semibold border-b pb-1">Phase Balance Analysis (BS7671)</p>

    <div className="grid grid-cols-3 gap-1">
      <span className="text-red-400">L1: {loads.L1}A</span>
      <span className="text-yellow-400">L2: {loads.L2}A</span>
      <span className="text-blue-400">L3: {loads.L3}A</span>
    </div>

    <div className="flex justify-between">
      <span>Imbalance:</span>
      <strong className={balance.isCompliant ? 'text-green-500' : 'text-red-500'}>
        {balance.imbalancePercent}%
      </strong>
    </div>

    <div className="flex justify-between">
      <span>Status:</span>
      <span>{balance.isCompliant ? '✓ OK (<10%)' : '⚠ High (>10%)'}</span>
    </div>

    <div className="flex justify-between text-muted-foreground">
      <span>Highest:</span>
      <span>{balance.highestPhase}</span>
    </div>

    <div className="flex justify-between text-muted-foreground">
      <span>Lowest:</span>
      <span>{balance.lowestPhase}</span>
    </div>

    {neutral && (
      <div className="flex justify-between border-t pt-1">
        <span>Est. Neutral:</span>
        <strong>{neutral.estimatedAmps}A</strong>
      </div>
    )}

    {balance.recommendation && (
      <div className="border-t pt-1 text-amber-500">
        {balance.recommendation}
      </div>
    )}
  </div>
);

export default PhaseBalanceIndicator;
