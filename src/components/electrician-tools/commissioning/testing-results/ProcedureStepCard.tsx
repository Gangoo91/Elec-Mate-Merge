import { Checkbox } from "@/components/ui/checkbox";
import { Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProcedureStepCardProps {
  step: string;
  stepNumber: number;
  duration?: string;
  safetyNote?: string;
  isExpanded?: boolean;
}

export const ProcedureStepCard = ({ 
  step, 
  stepNumber, 
  duration,
  safetyNote,
  isExpanded = false 
}: ProcedureStepCardProps) => {
  const [checked, setChecked] = useState(false);
  const [expanded, setExpanded] = useState(isExpanded);

  // Extract safety warnings from step text
  const hasSafetyKeywords = /danger|warning|caution|isolate|shock|live|electrical/i.test(step);
  const showSafetyIndicator = hasSafetyKeywords || safetyNote;

  return (
    <div 
      className={cn(
        "border-2 rounded-lg transition-all duration-200",
        checked 
          ? "border-green-500/40 bg-green-500/5" 
          : "border-border bg-elec-card hover:border-elec-yellow/40"
      )}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3">
          {/* Step Number Badge */}
          <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30">
            <span className="text-sm font-bold text-purple-300">{stepNumber}</span>
          </div>

          {/* Step Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className={cn(
                "text-sm sm:text-base text-foreground leading-relaxed",
                checked && "line-through opacity-60"
              )}>
                {step}
              </p>
              
              {/* Checkbox */}
              <Checkbox
                checked={checked}
                onCheckedChange={(value) => setChecked(value === true)}
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 min-w-[24px] min-h-[24px] touch-manipulation"
              />
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {/* Duration */}
              {duration && (
                <div className="flex items-center gap-1.5 text-xs text-foreground/60">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{duration}</span>
                </div>
              )}

              {/* Safety Indicator */}
              {showSafetyIndicator && (
                <div className="flex items-center gap-1.5 text-xs text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Safety Critical</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Safety Details */}
        {expanded && safetyNote && (
          <div className="mt-3 ml-11 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              Safety Note
            </div>
            <p className="text-xs text-foreground leading-relaxed">{safetyNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};
