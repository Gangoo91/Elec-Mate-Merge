import React, { memo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AM2LearningOutcomesProps {
  outcomes: string[];
  collapsible?: boolean;
  initialVisibleCount?: number;
  className?: string;
}

export const AM2LearningOutcomes = memo(function AM2LearningOutcomes({
  outcomes,
  collapsible = true,
  initialVisibleCount = 3,
  className,
}: AM2LearningOutcomesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowExpandButton = collapsible && outcomes.length > initialVisibleCount;
  const visibleOutcomes =
    shouldShowExpandButton && !isExpanded ? outcomes.slice(0, initialVisibleCount) : outcomes;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 sm:p-6',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/70 via-emerald-400/70 to-green-400/70 opacity-70" />

      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white">
        Learning outcomes
      </div>

      <ul className="mt-3 divide-y divide-white/[0.05]">
        {visibleOutcomes.map((outcome, index) => (
          <li key={index} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3">
            <div className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center">
              <Check className="h-3 w-3 text-emerald-400" />
            </div>
            <span className="text-[13.5px] text-white leading-relaxed flex-1 min-w-0">
              {outcome}
            </span>
          </li>
        ))}
      </ul>

      {shouldShowExpandButton && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[12px] font-medium hover:bg-white/[0.08] transition-colors touch-manipulation"
        >
          <span>
            {isExpanded
              ? 'Show less'
              : `Show ${outcomes.length - initialVisibleCount} more`}
          </span>
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 transition-transform',
              isExpanded && 'rotate-180'
            )}
          />
        </button>
      )}
    </div>
  );
});

export default AM2LearningOutcomes;
