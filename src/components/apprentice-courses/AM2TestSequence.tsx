import React, { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestStep {
  title: string;
  description?: string;
}

interface AM2TestSequenceProps {
  steps: TestStep[];
  className?: string;
}

/**
 * AM2TestSequence - Numbered step sequence component
 * Features step indicators with connecting lines, animated entrance (stagger),
 * and expandable detail text per step.
 */
export const AM2TestSequence = memo(function AM2TestSequence({
  steps,
  className,
}: AM2TestSequenceProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn('space-y-0', className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isExpanded = expandedSteps.has(index);
        const hasDescription = !!step.description;

        return (
          <div
            key={index}
            className={cn(
              'relative',
              'ios-animate-in-delayed'
            )}
            style={{ '--ios-delay': `${index * 75}ms` } as React.CSSProperties}
          >
            <div className="flex gap-4">
              {/* Step Indicator Column */}
              <div className="flex flex-col items-center">
                {/* Step Number Circle */}
                <div
                  className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-full',
                    'flex items-center justify-center',
                    'bg-elec-yellow/15 border-2 border-elec-yellow/40',
                    'text-elec-yellow font-bold text-ios-subhead',
                    'transition-all duration-ios-normal ease-ios-ease',
                    'shadow-[0_0_20px_-5px_hsl(47_100%_50%/0.3)]'
                  )}
                >
                  {index + 1}
                </div>

                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={cn(
                      'w-0.5 flex-1 min-h-[24px]',
                      'bg-gradient-to-b from-elec-yellow/40 to-elec-yellow/10'
                    )}
                  />
                )}
              </div>

              {/* Step Content */}
              <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
                {/* Step Header - Clickable if has description */}
                <div
                  className={cn(
                    'flex items-center justify-between gap-2 min-h-[40px]',
                    hasDescription && [
                      'cursor-pointer',
                      'ios-pressable',
                      '-ml-2 pl-2 pr-2 -mr-2 rounded-xl',
                      'hover:bg-white/5',
                      'transition-all duration-ios-normal ease-ios-ease',
                    ]
                  )}
                  onClick={hasDescription ? () => toggleStep(index) : undefined}
                  role={hasDescription ? 'button' : undefined}
                  tabIndex={hasDescription ? 0 : undefined}
                  onKeyDown={
                    hasDescription
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleStep(index);
                          }
                        }
                      : undefined
                  }
                  aria-expanded={hasDescription ? isExpanded : undefined}
                >
                  {/* Step Title */}
                  <h4 className="text-ios-body text-white font-medium leading-tight">
                    {step.title}
                  </h4>

                  {/* Expand/Collapse Icon */}
                  {hasDescription && (
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-white/40 flex-shrink-0',
                        'transition-transform duration-ios-normal ease-ios-ease',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  )}
                </div>

                {/* Expandable Description */}
                {hasDescription && (
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-ios-normal ease-ios-ease',
                      isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className={cn(
                      'pt-2 pb-1',
                      'text-ios-subhead text-white/60 leading-relaxed'
                    )}>
                      {step.description}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default AM2TestSequence;
