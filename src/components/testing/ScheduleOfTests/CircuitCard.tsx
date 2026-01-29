import React, { useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { TestResult } from '@/types/testResult';
import {
  Trash2,
  Zap,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptics } from '@/hooks/useHaptics';

interface CircuitCardProps {
  circuit: TestResult;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddPhoto?: () => void;
  onQuickEdit?: (field: string) => void;
  compact?: boolean;
  enableSwipe?: boolean;
  className?: string;
}

/**
 * Best-in-class mobile circuit card
 * Visual excellence with tappable value tiles
 * Memoized to prevent re-renders during scroll
 */
const CircuitCardInner = ({
  circuit,
  onEdit,
  onDelete,
  onAddPhoto,
  onQuickEdit,
  compact = false,
  enableSwipe = true,
  className = '',
}: CircuitCardProps) => {
  const haptics = useHaptics();

  // Haptic feedback handlers - pass circuit id to callbacks
  const handleEdit = useCallback(() => {
    haptics.tap();
    onEdit(circuit.id);
  }, [haptics, onEdit, circuit.id]);

  const handleDelete = useCallback(() => {
    haptics.impact();
    onDelete(circuit.id);
  }, [haptics, onDelete, circuit.id]);
  // Calculate circuit status and validation
  const { status, hasRcd, rcdOk, validations } = useMemo(() => {
    const hasZs = circuit.zs && circuit.maxZs;
    const zsOk = hasZs ? parseFloat(circuit.zs) <= parseFloat(circuit.maxZs) : null;
    const hasInsulation = circuit.insulationResistance || circuit.insulationLiveNeutral;
    const insulationValue = circuit.insulationResistance || circuit.insulationLiveNeutral;
    const insulationOk = insulationValue ?
      (insulationValue.startsWith('>') || parseFloat(insulationValue.replace('>', '')) >= 1) : null;
    const hasPolarity = circuit.polarity;
    const polarityOk = hasPolarity ?
      (circuit.polarity === 'Correct' || circuit.polarity === 'Satisfactory' || circuit.polarity === '✓') : null;
    const hasR1R2 = circuit.r1r2;

    // RCD checks
    const hasRcd = !!(circuit.rcdRating || circuit.rcdOneX || circuit.protectiveDeviceType?.includes('RCD') || circuit.protectiveDeviceType?.includes('RCBO'));
    const rcdOk = circuit.rcdOneX ? parseFloat(circuit.rcdOneX) < 300 : null;

    // Validations for each field
    const validations = {
      r1r2: hasR1R2 ? 'pass' : 'empty',
      zs: zsOk === null ? 'empty' : zsOk ? 'pass' : 'fail',
      insulation: insulationOk === null ? 'empty' : insulationOk ? 'pass' : 'fail',
      polarity: polarityOk === null ? 'empty' : polarityOk ? 'pass' : 'fail',
      rcd: rcdOk === null ? 'empty' : rcdOk ? 'pass' : 'fail',
    };

    // Count completed tests
    const completedTests = [hasR1R2, hasInsulation, hasZs, hasPolarity].filter(Boolean).length;
    const hasFail = zsOk === false || insulationOk === false || polarityOk === false || rcdOk === false;

    // Determine status
    let statusLevel: 'success' | 'warning' | 'error' | 'pending';
    let statusLabel: string;

    if (hasFail) {
      statusLevel = 'error';
      statusLabel = zsOk === false ? 'Zs Fail' : rcdOk === false ? 'RCD Fail' :
                   insulationOk === false ? 'Ir Fail' : 'Fail';
    } else if (completedTests === 4) {
      statusLevel = 'success';
      statusLabel = 'Complete';
    } else if (completedTests > 0) {
      statusLevel = 'warning';
      statusLabel = 'In Progress';
    } else {
      statusLevel = 'pending';
      statusLabel = 'Not Started';
    }

    return {
      status: {
        level: statusLevel,
        label: statusLabel,
        completionPercent: (completedTests / 4) * 100,
      },
      hasRcd,
      rcdOk,
      validations,
    };
  }, [circuit]);

  const StatusIcon = {
    success: CheckCircle,
    warning: AlertCircle,
    error: AlertTriangle,
    pending: Zap,
  }[status.level];

  // Badge colors based on status
  const badgeColors = {
    success: 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-400',
    warning: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-400',
    error: 'bg-gradient-to-br from-red-500 to-red-600 text-white border-red-400',
    pending: 'bg-gradient-to-br from-muted to-muted-foreground/20 text-foreground border-border',
  };

  // Progress bar gradient colors
  const progressColors = {
    success: 'from-green-400 to-green-500',
    warning: 'from-amber-400 to-amber-500',
    error: 'from-red-400 to-red-500',
    pending: 'from-muted-foreground/50 to-muted-foreground/30',
  };

  const cardContent = (
    <Card
      className={cn(
        'border border-border/50 bg-card overflow-hidden rounded-2xl',
        'shadow-sm',
        status.level === 'error' && 'border-red-500/30 bg-red-500/5',
        className
      )}
      style={{ contain: 'layout style paint' }}
      onClick={handleEdit}
    >
      {/* Header Section */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-start justify-between gap-3">
          {/* Circuit Badge - Large, status-colored */}
          <div
            className={cn(
              'flex items-center justify-center min-w-[56px] h-14 px-3 rounded-xl font-bold text-lg border-2',
              badgeColors[status.level]
            )}
          >
            {circuit.circuitDesignation || `C${circuit.circuitNumber || '?'}`}
          </div>

          {/* Circuit Info */}
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="font-semibold text-base text-foreground line-clamp-1 sm:truncate leading-tight max-w-[150px] sm:max-w-none break-words">
              {circuit.circuitDescription || 'Unnamed Circuit'}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {/* Protection Device Badge */}
              <Badge variant="secondary" className="h-5 px-2 text-[11px] font-medium bg-muted/80">
                {circuit.protectiveDeviceType || 'MCB'} {circuit.protectiveDeviceCurve || ''}{circuit.protectiveDeviceRating || '--'}A
              </Badge>
              {/* RCD Indicator */}
              {hasRcd && (
                <Badge
                  variant="outline"
                  className={cn(
                    'h-5 px-1.5 text-[10px] font-medium gap-0.5',
                    rcdOk === true && 'bg-green-500/10 text-green-500 border-green-500/30',
                    rcdOk === false && 'bg-red-500/10 text-red-500 border-red-500/30',
                    rcdOk === null && 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  )}
                >
                  <Shield className="h-2.5 w-2.5" />
                  {circuit.rcdRating || '30'}mA
                </Badge>
              )}
            </div>
          </div>

          {/* Edit Arrow */}
          <ChevronRight className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
        </div>
      </div>

      {/* Test Value Tiles */}
      <div className="px-3 pb-2">
        <div className="grid grid-cols-4 gap-2">
          <ValueTile
            label="R1+R2"
            value={circuit.r1r2}
            unit="Ω"
            validation={validations.r1r2}
            onTap={onQuickEdit ? () => onQuickEdit('r1r2') : undefined}
          />
          <ValueTile
            label="Zs"
            value={circuit.zs}
            unit="Ω"
            subValue={circuit.maxZs ? `≤${circuit.maxZs}` : undefined}
            validation={validations.zs}
            onTap={onQuickEdit ? () => onQuickEdit('zs') : undefined}
          />
          <ValueTile
            label="Ir"
            value={circuit.insulationResistance || circuit.insulationLiveNeutral}
            unit="MΩ"
            validation={validations.insulation}
            onTap={onQuickEdit ? () => onQuickEdit('insulation') : undefined}
          />
          <ValueTile
            label="Polarity"
            value={circuit.polarity === 'Correct' || circuit.polarity === 'Satisfactory' ? '✓' : circuit.polarity}
            validation={validations.polarity}
            isStatus
            onTap={onQuickEdit ? () => onQuickEdit('polarity') : undefined}
          />
        </div>

        {/* RCD Row - Only if RCD protected */}
        {hasRcd && (
          <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-border/30">
            <ValueTile
              label="RCD Type"
              value={circuit.rcdType || '--'}
              compact
            />
            <ValueTile
              label="Trip"
              value={circuit.rcdOneX}
              unit="ms"
              validation={validations.rcd}
              compact
            />
            <ValueTile
              label="Test Btn"
              value={circuit.rcdTestButton === 'Pass' || circuit.rcdTestButton === '✓' ? '✓' : circuit.rcdTestButton}
              isStatus
              compact
            />
            <ValueTile
              label="Cable"
              value={circuit.liveSize ? `${circuit.liveSize}/${circuit.cpcSize || '-'}` : '--'}
              unit="mm²"
              compact
            />
          </div>
        )}
      </div>

      {/* Progress Bar - Full Width */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <Badge
            variant="outline"
            className={cn(
              'h-6 gap-1 text-xs font-medium shrink-0',
              status.level === 'success' && 'text-green-500 bg-green-500/10 border-green-500/30',
              status.level === 'warning' && 'text-amber-500 bg-amber-500/10 border-amber-500/30',
              status.level === 'error' && 'text-red-500 bg-red-500/10 border-red-500/30',
              status.level === 'pending' && 'text-muted-foreground bg-muted/50 border-border'
            )}
          >
            <StatusIcon className="h-3 w-3" />
            {status.label}
          </Badge>

          {/* Progress Bar */}
          <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out',
                progressColors[status.level]
              )}
              style={{ width: `${status.completionPercent}%` }}
            />
          </div>

          {/* Percentage */}
          <span className="text-xs font-medium text-muted-foreground w-8 text-right">
            {Math.round(status.completionPercent)}%
          </span>
        </div>
      </div>
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
        onAction: handleDelete,
        label: 'Delete',
      }}
      rightAction={
        onAddPhoto
          ? {
              icon: <Zap className="h-5 w-5" />,
              bgColor: 'bg-blue-500',
              onAction: onAddPhoto,
              label: 'Quick',
            }
          : undefined
      }
      className="mb-0"
    >
      {cardContent}
    </SwipeableCard>
  );
};

// Memoized export to prevent re-renders during scroll
export const CircuitCard = React.memo(CircuitCardInner);
CircuitCard.displayName = 'CircuitCard';

/**
 * Tappable Value Tile Component
 * Shows test value with validation coloring
 */
interface ValueTileProps {
  label: string;
  value?: string;
  unit?: string;
  subValue?: string;
  validation?: 'pass' | 'fail' | 'warning' | 'empty';
  isStatus?: boolean;
  compact?: boolean;
  onTap?: () => void;
}

const ValueTile: React.FC<ValueTileProps> = ({
  label,
  value,
  unit,
  subValue,
  validation = 'empty',
  isStatus = false,
  compact = false,
  onTap,
}) => {
  // Determine tile colors based on validation
  const tileColors = {
    pass: 'bg-green-500/10 border-green-500/30',
    fail: 'bg-red-500/10 border-red-500/30',
    warning: 'bg-amber-500/10 border-amber-500/30',
    empty: 'bg-muted/30 border-border/50',
  };

  const valueColors = {
    pass: 'text-green-500',
    fail: 'text-red-500',
    warning: 'text-amber-500',
    empty: 'text-muted-foreground',
  };

  // Handle status display
  const displayValue = useMemo(() => {
    if (!value) return '--';
    if (isStatus) {
      if (value === '✓' || value === 'Pass' || value === 'Correct' || value === 'Satisfactory') {
        return '✓';
      }
      if (value === '✗' || value === 'Fail' || value === 'Incorrect') {
        return '✗';
      }
    }
    return value;
  }, [value, isStatus]);

  const statusValidation = useMemo(() => {
    if (isStatus && value) {
      if (value === '✓' || value === 'Pass' || value === 'Correct' || value === 'Satisfactory') {
        return 'pass';
      }
      if (value === '✗' || value === 'Fail' || value === 'Incorrect') {
        return 'fail';
      }
    }
    return validation;
  }, [value, isStatus, validation]);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border transition-transform duration-150',
        compact ? 'py-1.5 px-1' : 'py-2 px-2',
        tileColors[statusValidation],
        onTap && 'cursor-pointer active:scale-95'
      )}
      onClick={(e) => {
        if (onTap) {
          e.stopPropagation();
          onTap();
        }
      }}
    >
      {/* Label */}
      <span className={cn(
        'text-muted-foreground font-medium leading-none',
        compact ? 'text-[9px]' : 'text-[10px]'
      )}>
        {label}
      </span>

      {/* Value */}
      <span className={cn(
        'font-bold leading-tight mt-0.5',
        compact ? 'text-sm' : 'text-lg',
        valueColors[statusValidation],
        isStatus && displayValue === '✓' && 'text-green-500',
        isStatus && displayValue === '✗' && 'text-red-500'
      )}>
        {displayValue}
        {value && unit && !isStatus && (
          <span className={cn(
            'font-normal text-muted-foreground ml-0.5',
            compact ? 'text-[8px]' : 'text-[10px]'
          )}>
            {unit}
          </span>
        )}
      </span>

      {/* Sub Value (e.g., max Zs) */}
      {subValue && !compact && (
        <span className="text-[9px] text-muted-foreground leading-none mt-0.5">
          {subValue}
        </span>
      )}
    </div>
  );
};

/**
 * Compact circuit card for dense lists
 * Memoized to prevent re-renders during scroll
 */
const CircuitCardCompactInner = ({
  circuit,
  onEdit,
  onDelete,
  className = '',
}: CircuitCardProps) => {
  const hasIssue = useMemo(() => {
    if (circuit.zs && circuit.maxZs) {
      return parseFloat(circuit.zs) > parseFloat(circuit.maxZs);
    }
    return false;
  }, [circuit.zs, circuit.maxZs]);

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl border border-border bg-card',
        'active:scale-[0.98] transition-transform duration-150',
        hasIssue && 'border-red-500/50 bg-red-500/5',
        className
      )}
      onClick={onEdit}
    >
      {/* Circuit Badge */}
      <div
        className={cn(
          'flex items-center justify-center w-12 h-10 rounded-lg font-bold text-sm',
          hasIssue
            ? 'bg-red-500/10 text-red-400 border border-red-500/30'
            : 'bg-primary/10 text-primary border border-primary/30'
        )}
      >
        {circuit.circuitDesignation || `C${circuit.circuitNumber}`}
      </div>

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

// Memoized export
export const CircuitCardCompact = React.memo(CircuitCardCompactInner);
CircuitCardCompact.displayName = 'CircuitCardCompact';

export default CircuitCard;
