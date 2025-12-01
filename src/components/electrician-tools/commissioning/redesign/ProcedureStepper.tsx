import { useState } from "react";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcedureStepperProps {
  steps: string[];
}

export const ProcedureStepper = ({ steps }: ProcedureStepperProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const isSafetyCritical = (step: string | any) => {
    // Defensive: ensure step is a string
    const stepText = typeof step === 'string' ? step : JSON.stringify(step);
    const safetyKeywords = ['isolated', 'isolation', 'dead', 'lock off', 'safe', 'danger', 'warning', 'ppe'];
    return safetyKeywords.some(keyword => stepText.toLowerCase().includes(keyword));
  };

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        // Defensive: ensure step is a string for rendering
        const stepText = typeof step === 'string' ? step : 
          (typeof step === 'object' ? Object.values(step).join(' - ') : String(step));
        const isCompleted = completedSteps.has(index);
        const isSafety = isSafetyCritical(stepText);
        
        return (
          <button
            key={index}
            onClick={() => toggleStep(index)}
            className={cn(
              "w-full text-left p-3 rounded-lg border transition-all touch-manipulation",
              "hover:border-elec-yellow/40 active:scale-[0.99]",
              isCompleted 
                ? "bg-elec-yellow/10 border-elec-yellow/40" 
                : "bg-elec-dark/40 border-elec-yellow/20"
            )}
          >
            <div className="flex items-start gap-3">
              {/* Step Number / Checkbox */}
              <div className={cn(
                "shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm",
                isCompleted 
                  ? "bg-elec-yellow/30 text-elec-yellow" 
                  : isSafety 
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-elec-yellow/10 text-elec-yellow/70"
              )}>
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 space-y-2">
                <p className={cn(
                  "text-sm leading-relaxed",
                  isCompleted ? "text-white/60 line-through" : "text-white"
                )}>
                  {stepText}
                </p>
                
                {/* Safety Warning Badge */}
                {isSafety && !isCompleted && (
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs">
                    <AlertTriangle className="h-3 w-3" />
                    <span className="font-semibold">Safety Critical Step</span>
                  </div>
                )}
              </div>

              {/* Completion Indicator */}
              {!isCompleted && (
                <Circle className="h-5 w-5 text-white/30 shrink-0 mt-0.5" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
