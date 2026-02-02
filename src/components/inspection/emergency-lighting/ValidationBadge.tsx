/**
 * ValidationBadge Component
 *
 * Displays PASS/FAIL/WARNING badges for BS 5266 compliance validation.
 * Used throughout the Emergency Lighting certificate for test results.
 */

import React from 'react';
import { Check, X, AlertTriangle, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type ValidationStatus = 'pass' | 'fail' | 'warning' | 'unknown';

interface ValidationBadgeProps {
  status: ValidationStatus;
  message?: string;
  reference?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: Record<ValidationStatus, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  classes: string;
}> = {
  pass: {
    label: 'PASS',
    icon: Check,
    classes: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  fail: {
    label: 'FAIL',
    icon: X,
    classes: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  warning: {
    label: 'WARNING',
    icon: AlertTriangle,
    classes: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  unknown: {
    label: '?',
    icon: HelpCircle,
    classes: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  },
};

const sizeClasses = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-xs px-2 py-1',
  lg: 'text-sm px-2.5 py-1',
};

const ValidationBadge: React.FC<ValidationBadgeProps> = ({
  status,
  message,
  reference,
  showIcon = true,
  size = 'md',
  className,
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  const badgeContent = (
    <Badge
      variant="outline"
      className={cn(
        "font-medium border",
        config.classes,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={cn("mr-1", size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />}
      {config.label}
    </Badge>
  );

  // If there's a message or reference, wrap in tooltip
  if (message || reference) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badgeContent}
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-1">
              {message && <p className="text-sm">{message}</p>}
              {reference && (
                <p className="text-xs text-muted-foreground">{reference}</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badgeContent;
};

/**
 * AutoFilledBadge Component
 *
 * Indicates that a field was auto-filled from the luminaire database.
 */
export const AutoFilledBadge: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "text-xs px-1.5 py-0.5 font-medium",
              "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
              className
            )}
          >
            Auto
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-sm">Auto-filled from luminaire database</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

/**
 * OverdueBadge Component
 *
 * Indicates that a test is overdue per BS 5266 schedule.
 */
export const OverdueBadge: React.FC<{
  daysOverdue: number;
  testType: 'monthly' | 'annual';
  className?: string;
}> = ({ daysOverdue, testType, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "text-xs px-1.5 py-0.5 font-medium",
              "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse",
              className
            )}
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            OVERDUE
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {testType === 'monthly' ? 'Monthly' : 'Annual'} test overdue
            </p>
            <p className="text-xs text-muted-foreground">
              {daysOverdue} days overdue per BS 5266-1
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

/**
 * BatteryConditionBadge Component
 *
 * Color-coded badge for battery condition.
 */
export const BatteryConditionBadge: React.FC<{
  condition: 'good' | 'fair' | 'poor' | string;
  className?: string;
}> = ({ condition, className }) => {
  const normalizedCondition = condition.toLowerCase();

  let classes = '';
  let label = condition;

  switch (normalizedCondition) {
    case 'good':
      classes = 'bg-green-500/20 text-green-400 border-green-500/30';
      label = 'Good';
      break;
    case 'fair':
      classes = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      label = 'Fair';
      break;
    case 'poor':
      classes = 'bg-red-500/20 text-red-400 border-red-500/30';
      label = 'Poor';
      break;
    default:
      classes = 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }

  return (
    <Badge
      variant="outline"
      className={cn("text-xs px-1.5 py-0.5 font-medium border", classes, className)}
    >
      {label}
    </Badge>
  );
};

/**
 * DurationBadge Component
 *
 * Shows the required duration with color based on premises type.
 */
export const DurationBadge: React.FC<{
  duration: 60 | 180;
  required?: boolean;
  className?: string;
}> = ({ duration, required = false, className }) => {
  const isThreeHour = duration === 180;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "text-xs px-1.5 py-0.5 font-medium border",
              isThreeHour
                ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                : "bg-blue-500/20 text-blue-400 border-blue-500/30",
              className
            )}
          >
            {duration === 180 ? '3hr' : '1hr'}
            {required && ' Required'}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-sm">
            {duration === 180
              ? 'Sleeping risk premises require 3-hour duration'
              : '1-hour minimum (3hr recommended for UK practice)'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ValidationBadge;
