import React, { memo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AM2LearningOutcomesProps {
  outcomes: string[];
  collapsible?: boolean;
  initialVisibleCount?: number;
  className?: string;
}

/**
 * AM2LearningOutcomes - Learning outcomes list component
 * Features checkmark icons with stagger animation,
 * collapsible on mobile (show first 3, expand to see all).
 */
export const AM2LearningOutcomes = memo(function AM2LearningOutcomes({
  outcomes,
  collapsible = true,
  initialVisibleCount = 3,
  className,
}: AM2LearningOutcomesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowExpandButton = collapsible && outcomes.length > initialVisibleCount;
  const visibleOutcomes =
    shouldShowExpandButton && !isExpanded
      ? outcomes.slice(0, initialVisibleCount)
      : outcomes;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Section Title */}
      <h3 className="text-ios-headline text-white">Learning Outcomes</h3>

      {/* Outcomes List */}
      <ul className="space-y-3">
        {visibleOutcomes.map((outcome, index) => (
          <li
            key={index}
            className={cn(
              'flex items-start gap-3',
              'ios-animate-in-delayed'
            )}
            style={{ '--ios-delay': `${index * 50}ms` } as React.CSSProperties}
          >
            {/* Checkmark Icon */}
            <div className={cn(
              'flex-shrink-0 mt-0.5',
              'w-5 h-5 rounded-full',
              'bg-emerald-500/20 border border-emerald-500/40',
              'flex items-center justify-center'
            )}>
              <Check className="w-3 h-3 text-emerald-400" />
            </div>

            {/* Outcome Text */}
            <span className="text-ios-body text-white/80 leading-relaxed flex-1">
              {outcome}
            </span>
          </li>
        ))}
      </ul>

      {/* Expand/Collapse Button */}
      {shouldShowExpandButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'w-full sm:w-auto min-h-[44px] px-4',
            'text-white/60 hover:text-white hover:bg-white/5',
            'ios-pressable transition-all duration-ios-normal ease-ios-ease',
            'touch-manipulation'
          )}
        >
          <span className="text-ios-subhead">
            {isExpanded
              ? 'Show less'
              : `Show ${outcomes.length - initialVisibleCount} more`}
          </span>
          <ChevronDown
            className={cn(
              'w-4 h-4 ml-1.5 transition-transform duration-ios-normal ease-ios-ease',
              isExpanded && 'rotate-180'
            )}
          />
        </Button>
      )}

      {/* Hidden count indicator (when collapsed) */}
      {shouldShowExpandButton && !isExpanded && (
        <p className="text-ios-footnote text-white/40 pl-8">
          + {outcomes.length - initialVisibleCount} more outcomes
        </p>
      )}
    </div>
  );
});

export default AM2LearningOutcomes;
