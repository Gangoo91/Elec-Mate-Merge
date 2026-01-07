import React from 'react';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  color?: "primary" | "secondary" | "amber-500" | "green-500" | "blue-500" | "purple-500" | "orange-500" | "green-600";
  completionPercentage?: number;
  isComplete?: boolean;
}

export const SectionHeader = ({
  title,
  icon: Icon,
  isOpen,
  color = "primary",
  completionPercentage = 0,
  isComplete = false
}: SectionHeaderProps) => {
  return (
    <CollapsibleTrigger asChild>
      <button className="group w-full cursor-pointer touch-manipulation ios-pressable">
        {/* Golden accent line at top */}
        <div className={cn(
          "h-0.5 w-full transition-all duration-300",
          isComplete
            ? "eicr-section-accent-complete"
            : "eicr-section-accent"
        )} />

        {/* Header content */}
        <div className="flex items-center justify-between w-full p-4 transition-all duration-200 hover:bg-white/5 active:bg-white/10">
          <div className="flex items-center gap-3">
            {/* Icon container */}
            <div className={cn(
              "p-2.5 rounded-xl transition-all duration-200",
              isComplete
                ? "bg-green-500/15"
                : "bg-elec-yellow/10 group-hover:bg-elec-yellow/20"
            )}>
              {isComplete ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <Icon className="h-5 w-5 text-elec-yellow" />
              )}
            </div>

            {/* Title and status */}
            <div className="text-left">
              <h3 className={cn(
                "font-semibold text-base transition-colors duration-200",
                isComplete ? "text-green-400" : "text-white group-hover:text-elec-yellow"
              )}>
                {title}
              </h3>
              {!isComplete && completionPercentage > 0 && (
                <p className="text-xs text-white/50 mt-0.5">
                  {completionPercentage}% complete
                </p>
              )}
              {isComplete && (
                <p className="text-xs text-green-400/70 mt-0.5">
                  Section complete
                </p>
              )}
            </div>
          </div>

          {/* Chevron */}
          <div className="flex items-center gap-3">
            {!isComplete && completionPercentage > 0 && (
              <span className="text-xs font-medium text-elec-yellow hidden sm:inline">
                {completionPercentage}%
              </span>
            )}
            <div className={cn(
              "p-1.5 rounded-lg transition-all duration-200",
              "group-hover:bg-white/10"
            )}>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-white/50 transition-all duration-300",
                  isOpen && "rotate-180 text-elec-yellow"
                )}
              />
            </div>
          </div>
        </div>

        {/* Progress bar (below header) */}
        {!isComplete && completionPercentage > 0 && (
          <div className="px-4 pb-3">
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow transition-all duration-500 ease-out rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}
      </button>
    </CollapsibleTrigger>
  );
};
