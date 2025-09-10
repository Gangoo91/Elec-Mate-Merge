import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, User, Settings, FileText, Calculator, Building2, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const stepIcons = [Building2, User, Briefcase, FileText, Settings, Calculator];

interface QuoteProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  completedSteps: boolean[];
  onStepClick?: (stepIndex: number) => void;
}

export const QuoteProgressIndicator = ({
  currentStep,
  totalSteps,
  stepLabels,
  completedSteps,
  onStepClick
}: QuoteProgressIndicatorProps) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Card className="border-0 bg-gradient-to-r from-primary/5 to-secondary/5 mb-6">
      <CardContent className="p-4 sm:p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Progress
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="hidden sm:flex items-center justify-between space-x-2">
          {stepLabels.map((label, index) => {
            const Icon = stepIcons[index];
            const isCompleted = completedSteps[index];
            const isCurrent = index === currentStep;
            const canNavigate = isCompleted && onStepClick;

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <button
                  onClick={() => canNavigate && onStepClick(index)}
                  disabled={!canNavigate}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 transition-all duration-200",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground hover:bg-primary/90"
                      : isCurrent
                      ? "bg-background border-primary text-primary"
                      : "bg-background border-muted text-muted-foreground",
                    canNavigate && "cursor-pointer hover:scale-105",
                    !canNavigate && "cursor-default"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </button>
                <span
                  className={cn(
                    "text-xs text-center leading-tight max-w-16",
                    isCurrent ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Step Indicator */}
        <div className="sm:hidden">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              {stepLabels.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index < currentStep
                      ? "bg-primary"
                      : index === currentStep
                      ? "bg-primary w-6"
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-3">
            <span className="text-sm font-medium">
              Step {currentStep + 1} of {totalSteps}: {stepLabels[currentStep]}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};