import React, { memo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AM2CriticalWarningProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * AM2CriticalWarning - Warning/alert component
 * Features red gradient background, AlertTriangle icon with pulse animation,
 * and iOS-style typography.
 */
export const AM2CriticalWarning = memo(function AM2CriticalWarning({
  title,
  children,
  className,
}: AM2CriticalWarningProps) {
  return (
    <div
      className={cn(
        // Base container with red gradient background
        'relative overflow-hidden rounded-2xl',
        'bg-red-500/10 border border-red-500/30',
        'p-4 sm:p-5',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative">
        {/* Header with Icon and Title */}
        <div className="flex items-start gap-3 mb-3">
          {/* Icon with Pulse Animation */}
          <div className={cn(
            'flex-shrink-0 p-2 rounded-xl',
            'bg-red-500/20 border border-red-500/30'
          )}>
            <AlertTriangle
              className={cn(
                'w-5 h-5 text-red-400',
                'animate-pulse'
              )}
              aria-hidden="true"
            />
          </div>

          {/* Title */}
          <h3 className="text-ios-headline text-red-300 pt-1.5">
            {title}
          </h3>
        </div>

        {/* Warning Content */}
        <div className="pl-[52px] text-ios-body text-red-200/80 leading-relaxed">
          {children}
        </div>
      </div>

      {/* Decorative left border accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/80 via-red-500/40 to-red-500/10" />
    </div>
  );
});

export default AM2CriticalWarning;
