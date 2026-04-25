import React, { memo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AM2CriticalWarningProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const AM2CriticalWarning = memo(function AM2CriticalWarning({
  title,
  children,
  className,
}: AM2CriticalWarningProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-red-500/25 bg-red-500/[0.06] p-5',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-red-500/70 via-rose-400/70 to-red-500/70 opacity-70" />

      <div className="flex items-start gap-3">
        <div className="shrink-0 h-8 w-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-red-300" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-red-300">
            Critical
          </div>
          <h3 className="mt-1 text-[15px] font-semibold text-white tracking-tight">{title}</h3>
          <div className="mt-2 text-[13px] text-red-100/85 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
});

export default AM2CriticalWarning;
