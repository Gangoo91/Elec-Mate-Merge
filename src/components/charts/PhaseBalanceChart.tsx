import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import {
  calculatePhaseBalance,
  calculateNeutralCurrent,
  PhaseLoadData,
} from '@/utils/threePhaseCalculations';

interface PhaseBalanceChartProps {
  /** Phase currents in Amps */
  loads: PhaseLoadData;
  /** Optional title override */
  title?: string;
  /** Show in compact mode */
  compact?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Visual chart showing three-phase load distribution
 * Uses SVG for lightweight rendering without chart library dependencies
 */
export const PhaseBalanceChart: React.FC<PhaseBalanceChartProps> = ({
  loads,
  title = 'Phase Load Distribution',
  compact = false,
  className = '',
}) => {
  const { L1, L2, L3 } = loads;
  const maxLoad = Math.max(L1, L2, L3, 1); // Avoid division by zero
  const total = L1 + L2 + L3;

  const balanceResult = useMemo(() => {
    if (total === 0) return null;
    return calculatePhaseBalance(loads);
  }, [L1, L2, L3, total]);

  const neutralResult = useMemo(() => {
    if (total === 0) return null;
    return calculateNeutralCurrent(loads);
  }, [L1, L2, L3, total]);

  // Calculate bar heights (percentage of max)
  const l1Height = (L1 / maxLoad) * 100;
  const l2Height = (L2 / maxLoad) * 100;
  const l3Height = (L3 / maxLoad) * 100;

  // Calculate ideal line (average)
  const average = total / 3;
  const idealLineY = maxLoad > 0 ? (1 - average / maxLoad) * 100 : 50;

  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <CompactBars l1Height={l1Height} l2Height={l2Height} l3Height={l3Height} />
        {balanceResult && (
          <div className="text-xs">
            <span className={balanceResult.isCompliant ? 'text-green-600' : 'text-red-600'}>
              {balanceResult.imbalancePercent}% imbalance
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-500" />
            {title}
          </CardTitle>
          {balanceResult && (
            <Badge
              variant="outline"
              className={balanceResult.isCompliant
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
              }
            >
              {balanceResult.isCompliant ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <AlertTriangle className="h-3 w-3 mr-1" />
              )}
              {balanceResult.imbalancePercent}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* SVG Bar Chart */}
        <div className="relative h-32 mb-4">
          <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            <line x1="30" y1="10" x2="190" y2="10" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
            <line x1="30" y1="35" x2="190" y2="35" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
            <line x1="30" y1="60" x2="190" y2="60" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
            <line x1="30" y1="85" x2="190" y2="85" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />

            {/* Y-axis labels */}
            <text x="25" y="13" textAnchor="end" fontSize="6" fill="currentColor" opacity="0.5">
              {Math.round(maxLoad)}A
            </text>
            <text x="25" y="38" textAnchor="end" fontSize="6" fill="currentColor" opacity="0.5">
              {Math.round(maxLoad * 0.75)}A
            </text>
            <text x="25" y="63" textAnchor="end" fontSize="6" fill="currentColor" opacity="0.5">
              {Math.round(maxLoad * 0.5)}A
            </text>
            <text x="25" y="88" textAnchor="end" fontSize="6" fill="currentColor" opacity="0.5">
              {Math.round(maxLoad * 0.25)}A
            </text>

            {/* Ideal balance line */}
            {total > 0 && (
              <>
                <line
                  x1="35"
                  y1={10 + (idealLineY * 0.75)}
                  x2="185"
                  y2={10 + (idealLineY * 0.75)}
                  stroke="#22c55e"
                  strokeWidth="1"
                  strokeDasharray="4,2"
                  opacity="0.6"
                />
                <text x="188" y={12 + (idealLineY * 0.75)} fontSize="5" fill="#22c55e">ideal</text>
              </>
            )}

            {/* L1 Bar (Red) */}
            <rect
              x="50"
              y={85 - (l1Height * 0.75)}
              width="30"
              height={l1Height * 0.75}
              fill="#ef4444"
              rx="2"
              className="transition-all duration-300"
            />
            <text x="65" y="95" textAnchor="middle" fontSize="7" fill="#ef4444" fontWeight="bold">
              L1
            </text>
            {L1 > 0 && (
              <text x="65" y={82 - (l1Height * 0.75)} textAnchor="middle" fontSize="6" fill="currentColor">
                {L1}A
              </text>
            )}

            {/* L2 Bar (Yellow) */}
            <rect
              x="95"
              y={85 - (l2Height * 0.75)}
              width="30"
              height={l2Height * 0.75}
              fill="#eab308"
              rx="2"
              className="transition-all duration-300"
            />
            <text x="110" y="95" textAnchor="middle" fontSize="7" fill="#eab308" fontWeight="bold">
              L2
            </text>
            {L2 > 0 && (
              <text x="110" y={82 - (l2Height * 0.75)} textAnchor="middle" fontSize="6" fill="currentColor">
                {L2}A
              </text>
            )}

            {/* L3 Bar (Blue) */}
            <rect
              x="140"
              y={85 - (l3Height * 0.75)}
              width="30"
              height={l3Height * 0.75}
              fill="#3b82f6"
              rx="2"
              className="transition-all duration-300"
            />
            <text x="155" y="95" textAnchor="middle" fontSize="7" fill="#3b82f6" fontWeight="bold">
              L3
            </text>
            {L3 > 0 && (
              <text x="155" y={82 - (l3Height * 0.75)} textAnchor="middle" fontSize="6" fill="currentColor">
                {L3}A
              </text>
            )}
          </svg>
        </div>

        {/* Stats footer */}
        <div className="grid grid-cols-3 gap-2 text-xs border-t pt-3">
          <div className="text-center">
            <p className="text-muted-foreground">Total Load</p>
            <p className="font-semibold">{total.toFixed(1)}A</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Average</p>
            <p className="font-semibold">{average.toFixed(1)}A</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Est. Neutral</p>
            <p className="font-semibold">
              {neutralResult ? `${neutralResult.estimatedAmps}A` : '-'}
            </p>
          </div>
        </div>

        {/* Recommendation */}
        {balanceResult && balanceResult.recommendation && (
          <div className="mt-3 p-2 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs">
            <AlertTriangle className="h-3 w-3 inline mr-1 text-amber-600" />
            <span className="text-amber-800 dark:text-amber-200">{balanceResult.recommendation}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Compact bar visualization for inline display
 */
const CompactBars: React.FC<{
  l1Height: number;
  l2Height: number;
  l3Height: number;
}> = ({ l1Height, l2Height, l3Height }) => (
  <div className="flex items-end gap-0.5 h-6">
    <div
      className="w-2 bg-red-500 rounded-t transition-all duration-300"
      style={{ height: `${Math.max(l1Height, 5)}%` }}
    />
    <div
      className="w-2 bg-yellow-500 rounded-t transition-all duration-300"
      style={{ height: `${Math.max(l2Height, 5)}%` }}
    />
    <div
      className="w-2 bg-blue-500 rounded-t transition-all duration-300"
      style={{ height: `${Math.max(l3Height, 5)}%` }}
    />
  </div>
);

/**
 * Pie chart alternative for phase distribution
 */
export const PhaseDistributionPie: React.FC<{
  loads: PhaseLoadData;
  size?: number;
}> = ({ loads, size = 80 }) => {
  const { L1, L2, L3 } = loads;
  const total = L1 + L2 + L3;

  if (total === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="8" />
        <text x="50" y="55" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5">
          No load
        </text>
      </svg>
    );
  }

  // Calculate angles for pie segments
  const l1Angle = (L1 / total) * 360;
  const l2Angle = (L2 / total) * 360;
  const l3Angle = (L3 / total) * 360;

  // Convert angles to arc paths
  const createArc = (startAngle: number, endAngle: number, color: string) => {
    const start = polarToCartesian(50, 50, 35, startAngle);
    const end = polarToCartesian(50, 50, 35, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return (
      <path
        d={`M 50 50 L ${start.x} ${start.y} A 35 35 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`}
        fill={color}
      />
    );
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {l1Angle > 0 && createArc(-90, -90 + l1Angle, '#ef4444')}
      {l2Angle > 0 && createArc(-90 + l1Angle, -90 + l1Angle + l2Angle, '#eab308')}
      {l3Angle > 0 && createArc(-90 + l1Angle + l2Angle, -90 + l1Angle + l2Angle + l3Angle, '#3b82f6')}
      <circle cx="50" cy="50" r="20" fill="white" className="dark:fill-gray-900" />
      <text x="50" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">
        {total.toFixed(0)}A
      </text>
    </svg>
  );
};

// Helper function for pie chart
function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

export default PhaseBalanceChart;
