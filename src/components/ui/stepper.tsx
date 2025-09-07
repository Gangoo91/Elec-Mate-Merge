import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: Array<{
    id: string;
    title: string;
    description?: string;
  }>;
  currentStep: string;
  completedSteps?: string[];
  className?: string;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, completedSteps = [], className, ...props }, ref) => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between w-full", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isUpcoming = index > currentIndex;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                    {
                      "border-primary bg-primary text-primary-foreground": isCompleted,
                      "border-primary bg-background text-primary": isCurrent,
                      "border-muted bg-muted text-muted-foreground": isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="text-center max-w-24">
                  <p
                    className={cn("text-sm font-medium", {
                      "text-primary": isCurrent || isCompleted,
                      "text-muted-foreground": isUpcoming,
                    })}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors",
                    index < currentIndex
                      ? "bg-primary"
                      : "bg-muted"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export { Stepper };