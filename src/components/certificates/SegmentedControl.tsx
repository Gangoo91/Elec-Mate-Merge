import React from 'react';
import { cn } from '@/lib/utils';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  /** Show counts next to labels */
  showCounts?: boolean;
}

/**
 * iOS-style segmented control component
 * Native mobile app feel with smooth transitions
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  showCounts = false,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        'flex rounded-lg bg-card/50 p-1 border border-border/50',
        className
      )}
      role="tablist"
      aria-label="Filter options"
    >
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              navigator.vibrate?.(10);
              onChange(option.value);
            }}
            className={cn(
              'flex-1 py-2.5 px-3 text-sm font-medium rounded-md',
              'transition-all duration-200 ease-out',
              'touch-manipulation min-h-[44px]',
              'flex items-center justify-center gap-1.5',
              isActive
                ? 'bg-elec-yellow text-black shadow-sm'
                : 'text-muted-foreground hover:text-foreground active:bg-white/5'
            )}
          >
            <span className="truncate">{option.label}</span>
            {showCounts && option.count !== undefined && (
              <span
                className={cn(
                  'text-xs font-semibold min-w-[18px]',
                  isActive ? 'text-black/70' : 'text-muted-foreground'
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
