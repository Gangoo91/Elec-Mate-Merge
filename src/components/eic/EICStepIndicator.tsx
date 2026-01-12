import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, FileText, Search, TestTube, PenTool, Award } from 'lucide-react';
import { EICTabValue } from '@/hooks/useEICTabs';

interface StepConfig {
  id: EICTabValue;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

const steps: StepConfig[] = [
  { id: 'details', label: 'Installation Details', shortLabel: 'Details', icon: <FileText className="h-4 w-4" /> },
  { id: 'inspection', label: 'Inspection', shortLabel: 'Inspect', icon: <Search className="h-4 w-4" /> },
  { id: 'testing', label: 'Testing', shortLabel: 'Testing', icon: <TestTube className="h-4 w-4" /> },
  { id: 'declarations', label: 'Declarations', shortLabel: 'Declare', icon: <PenTool className="h-4 w-4" /> },
  { id: 'certificate', label: 'Certificate', shortLabel: 'Cert', icon: <Award className="h-4 w-4" /> },
];

interface EICStepIndicatorProps {
  currentTab: EICTabValue;
  onTabChange: (tab: EICTabValue) => void;
  isTabComplete: (tab: EICTabValue) => boolean;
  className?: string;
}

const EICStepIndicator: React.FC<EICStepIndicatorProps> = ({
  currentTab,
  onTabChange,
  isTabComplete,
  className,
}) => {
  const currentIndex = steps.findIndex(s => s.id === currentTab);

  return (
    <>
      {/* Mobile: Horizontal scrollable pill buttons */}
      <div className={cn("lg:hidden", className)}>
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex items-center gap-2 py-2 min-w-max">
            {steps.map((step, index) => {
              const isActive = step.id === currentTab;
              const isComplete = isTabComplete(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => onTabChange(step.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 touch-manipulation whitespace-nowrap",
                    isActive && "eicr-step-pill-active",
                    !isActive && isComplete && "bg-green-500/15 text-green-400 border border-green-500/30",
                    !isActive && !isComplete && "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
                  )}
                >
                  {isComplete && !isActive ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <span className={cn(
                      "flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold",
                      isActive ? "bg-black/20 text-black" : "bg-white/10"
                    )}>
                      {index + 1}
                    </span>
                  )}
                  <span>{step.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop: Connected step indicators with lines */}
      <div className={cn("hidden lg:block", className)}>
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const isActive = step.id === currentTab;
            const isComplete = isTabComplete(step.id);
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={step.id}>
                {/* Step node */}
                <button
                  onClick={() => onTabChange(step.id)}
                  className="flex flex-col items-center gap-2 group touch-manipulation"
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "relative flex items-center justify-center h-12 w-12 rounded-full border-2 transition-all duration-300",
                      isActive && "bg-elec-yellow border-elec-yellow shadow-[0_0_20px_-4px_hsl(47_100%_50%_/_0.5)]",
                      isComplete && !isActive && "bg-green-500/20 border-green-500",
                      !isActive && !isComplete && "bg-white/5 border-white/20 group-hover:border-white/40 group-hover:bg-white/10"
                    )}
                  >
                    {isComplete && !isActive ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <span className={cn(
                        "text-sm font-bold",
                        isActive ? "text-black" : "text-white/60 group-hover:text-white/80"
                      )}>
                        {React.cloneElement(step.icon as React.ReactElement, {
                          className: cn(
                            "h-5 w-5",
                            isActive ? "text-black" : "text-white/60 group-hover:text-white/80"
                          )
                        })}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors duration-200 text-center max-w-[80px]",
                      isActive && "text-elec-yellow",
                      isComplete && !isActive && "text-green-400",
                      !isActive && !isComplete && "text-white/50 group-hover:text-white/70"
                    )}
                  >
                    {step.shortLabel}
                  </span>
                </button>

                {/* Connector line */}
                {!isLast && (
                  <div className="flex-1 h-0.5 mx-2 -mt-6">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        index < currentIndex ? "bg-green-500/50" : "bg-white/10"
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EICStepIndicator;
