import { useState } from "react";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcedureStepperProps {
  steps: string[];
}

export const ProcedureStepper = ({ steps }: ProcedureStepperProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const isSafetyCritical = (step: string) => {
    const keywords = ['isolate', 'live', 'shock', 'danger', 'warning', 'ppe', 'lock out', 'lockout'];
    return keywords.some(keyword => step.toLowerCase().includes(keyword));
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.has(index);
        const isCritical = isSafetyCritical(step);
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="relative">
            {/* Connector Line */}
            {!isLast && (
              <div 
                className={cn(
                  "absolute left-4 top-10 w-0.5 h-full -ml-px",
                  isCompleted ? "bg-green-500/50" : "bg-border/40"
                )}
              />
            )}

            {/* Step Card */}
            <button
              onClick={() => toggleStep(index)}
              className={cn(
                "w-full flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all touch-manipulation",
                "hover:scale-[1.01] active:scale-[0.99]",
                isCompleted 
                  ? "bg-green-500/10 border-green-500/50" 
                  : isCritical
                  ? "bg-amber-500/10 border-amber-500/50"
                  : "bg-background/40 border-border/40 hover:border-border/60"
              )}
            >
              {/* Step Number / Checkbox */}
              <div className={cn(
                "shrink-0 mt-1",
                isCompleted ? "text-green-400" : isCritical ? "text-amber-400" : "text-muted-foreground"
              )}>
                {isCompleted ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <div className={cn(
                    "h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold",
                    isCritical 
                      ? "border-amber-400 text-amber-400" 
                      : "border-border text-muted-foreground"
                  )}>
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 space-y-1">
                <div className={cn(
                  "text-sm leading-relaxed",
                  isCompleted ? "text-white/80 line-through" : "text-white"
                )}>
                  {step}
                </div>
                {isCritical && !isCompleted && (
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                    <AlertTriangle className="h-3 w-3" />
                    Safety Critical
                  </div>
                )}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};
