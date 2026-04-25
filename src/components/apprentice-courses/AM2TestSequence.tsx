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

export const AM2TestSequence = memo(function AM2TestSequence({
  steps,
  className,
}: AM2TestSequenceProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5 sm:p-6',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />

      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white mb-4">
        Test sequence
      </div>

      <ol className="divide-y divide-white/[0.05]">
        {steps.map((step, index) => {
          const isExpanded = expandedSteps.has(index);
          const hasDescription = !!step.description;

          return (
            <li key={index} className="py-3 first:pt-0">
              <div className="flex gap-3">
                <div className="shrink-0 h-7 w-7 rounded-full bg-elec-yellow/15 border border-elec-yellow/35 flex items-center justify-center">
                  <span className="text-[12px] font-bold text-elec-yellow">{index + 1}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      'flex items-center justify-between gap-2 min-h-[28px]',
                      hasDescription && 'cursor-pointer'
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
                    <h4 className="text-[14px] text-white font-medium leading-tight">
                      {step.title}
                    </h4>
                    {hasDescription && (
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 text-white shrink-0 transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    )}
                  </div>

                  {hasDescription && isExpanded && (
                    <p className="mt-2 text-[13px] text-white leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
});

export default AM2TestSequence;
