import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { TestResult } from '@/types/testResult';
import {
  Trash2,
  Camera,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Zap,
  Edit2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CircuitCardProps {
  circuit: TestResult;
  onEdit: () => void;
  onDelete: () => void;
  onAddPhoto?: () => void;
  /** Compact mode for list view */
  compact?: boolean;
  /** Show swipe actions */
  enableSwipe?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Mobile-optimized circuit card with swipe actions
 * Best-in-class mobile UX pattern
 */
export const CircuitCard: React.FC<CircuitCardProps> = ({
  circuit,
  onEdit,
  onDelete,
  onAddPhoto,
  compact = false,
  enableSwipe = true,
  className = '',
}) => {
  // Calculate circuit status
  const status = useMemo(() => {
    const hasZs = circuit.zs && circuit.maxZs;
    const zsOk = hasZs ? parseFloat(circuit.zs) <= parseFloat(circuit.maxZs) : null;
    const hasInsulation = circuit.insulationResistance || circuit.insulationLiveNeutral;
    const hasPolarity = circuit.polarity;
    const hasR1R2 = circuit.r1r2;

    // Count completed tests
    const completedTests = [
      hasR1R2,
      hasInsulation,
      hasZs,
      hasPolarity,
    ].filter(Boolean).length;

    // Check for failures
    if (zsOk === false) {
      return {
        level: 'error' as const,
        label: 'Zs Fail',
        completionPercent: (completedTests / 4) * 100,
      };
    }

    if (completedTests === 4) {
      return {
        level: 'success' as const,
        label: 'Complete',
        completionPercent: 100,
      };
    }

    if (completedTests > 0) {
      return {
        level: 'warning' as const,
        label: 'In Progress',
        completionPercent: (completedTests / 4) * 100,
      };
    }

    return {
      level: 'pending' as const,
      label: 'Not Started',
      completionPercent: 0,
    };
  }, [circuit]);

  const StatusIcon = {
    success: CheckCircle,
    warning: AlertCircle,
    error: AlertTriangle,
    pending: Zap,
  }[status.level];

  const statusColors = {
    success: 'text-green-500 bg-green-500/10 border-green-500/20',
    warning: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    error: 'text-red-500 bg-red-500/10 border-red-500/20',
    pending: 'text-muted-foreground bg-muted/50 border-border',
  };

  const cardContent = (
    <Card
      className={cn(
        'border border-border bg-card overflow-hidden',
        'active:bg-accent/50 transition-colors duration-100',
        className
      )}
      onClick={onEdit}
    >
      <CardHeader className="py-3 px-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          {/* Circuit badge and description */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Badge
              variant="outline"
              className={cn(
                'h-7 px-2.5 font-bold text-sm shrink-0',
                circuit.phaseType === '3P'
                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                  : 'bg-primary/10 text-primary border-primary/30'
              )}
            >
              {circuit.circuitDesignation || `C${circuit.circuitNumber}`}
            </Badge>
            <span className="font-medium text-sm text-foreground truncate">
              {circuit.circuitDescription || 'Unnamed Circuit'}
            </span>
          </div>

          {/* Rating badge */}
          <Badge variant="secondary" className="h-6 px-2 text-xs shrink-0">
            {circuit.protectiveDeviceRating || '--'}A
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-3 pt-0">
        {/* Key test results grid */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <TestStat
            label="R1+R2"
            value={circuit.r1r2}
            unit="Ω"
          />
          <TestStat
            label="Zs"
            value={circuit.zs}
            unit="Ω"
            maxValue={circuit.maxZs}
          />
          <TestStat
            label="Ir"
            value={circuit.insulationResistance || circuit.insulationLiveNeutral}
            unit="MΩ"
          />
          <TestStat
            label="Polarity"
            value={circuit.polarity === 'Satisfactory' ? '✓' : circuit.polarity}
            isStatus
          />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn('h-6 gap-1 text-xs font-medium', statusColors[status.level])}
            >
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </Badge>
            {/* Progress indicator */}
            <div className="flex items-center gap-1">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    status.level === 'success' && 'bg-green-500',
                    status.level === 'warning' && 'bg-amber-500',
                    status.level === 'error' && 'bg-red-500',
                    status.level === 'pending' && 'bg-muted-foreground'
                  )}
                  style={{ width: `${status.completionPercent}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {Math.round(status.completionPercent)}%
              </span>
            </div>
          </div>

          {/* Edit indicator */}
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );

  if (!enableSwipe) {
    return cardContent;
  }

  return (
    <SwipeableCard
      leftAction={{
        icon: <Trash2 className="h-5 w-5" />,
        bgColor: 'bg-red-500',
        onAction: onDelete,
        label: 'Delete',
      }}
      rightAction={
        onAddPhoto
          ? {
              icon: <Camera className="h-5 w-5" />,
              bgColor: 'bg-blue-500',
              onAction: onAddPhoto,
              label: 'Photo',
            }
          : undefined
      }
      className="mb-2"
    >
      {cardContent}
    </SwipeableCard>
  );
};

/**
 * Single test statistic display
 */
interface TestStatProps {
  label: string;
  value?: string;
  unit?: string;
  maxValue?: string;
  isStatus?: boolean;
}

const TestStat: React.FC<TestStatProps> = ({
  label,
  value,
  unit,
  maxValue,
  isStatus = false,
}) => {
  // Determine if value exceeds max
  const isOverLimit = useMemo(() => {
    if (!value || !maxValue) return false;
    return parseFloat(value) > parseFloat(maxValue);
  }, [value, maxValue]);

  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={cn(
          'text-sm font-medium',
          !value && 'text-muted-foreground',
          isOverLimit && 'text-red-500',
          isStatus && value === '✓' && 'text-green-500'
        )}
      >
        {value || '--'}
        {value && unit && (
          <span className="text-xs text-muted-foreground ml-0.5">{unit}</span>
        )}
      </span>
    </div>
  );
};

/**
 * Compact circuit card for dense lists
 */
export const CircuitCardCompact: React.FC<CircuitCardProps> = ({
  circuit,
  onEdit,
  onDelete,
  className = '',
}) => {
  const hasIssue = useMemo(() => {
    if (circuit.zs && circuit.maxZs) {
      return parseFloat(circuit.zs) > parseFloat(circuit.maxZs);
    }
    return false;
  }, [circuit.zs, circuit.maxZs]);

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg border border-border bg-card',
        'active:bg-accent/50 transition-colors',
        hasIssue && 'border-red-500/50',
        className
      )}
      onClick={onEdit}
    >
      {/* Circuit number */}
      <Badge
        variant="outline"
        className={cn(
          'h-8 w-10 justify-center font-bold',
          hasIssue
            ? 'bg-red-500/10 text-red-400 border-red-500/30'
            : 'bg-primary/10 text-primary border-primary/30'
        )}
      >
        {circuit.circuitDesignation || `C${circuit.circuitNumber}`}
      </Badge>

      {/* Description */}
      <span className="flex-1 font-medium text-sm truncate">
        {circuit.circuitDescription || 'Unnamed'}
      </span>

      {/* Rating */}
      <span className="text-sm text-muted-foreground shrink-0">
        {circuit.protectiveDeviceRating || '--'}A
      </span>

      {/* Status indicator */}
      {hasIssue ? (
        <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
      ) : (
        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
      )}
    </div>
  );
};

export default CircuitCard;
