import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  completedSteps: boolean[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  completedSteps,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Card className="border-elec-yellow/20 bg-elec-card mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-elec-yellow font-medium">
                {currentStep}/{totalSteps} Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {stepLabels.map((label, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      completedSteps[index]
                        ? "bg-elec-yellow border-elec-yellow text-black"
                        : index === currentStep
                        ? "border-elec-yellow text-elec-yellow bg-elec-yellow/10"
                        : "border-muted text-muted-foreground"
                    }`}
                  >
                    {completedSteps[index] ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs text-center max-w-20 leading-tight ${
                      completedSteps[index] || index === currentStep
                        ? "text-elec-yellow"
                        : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {index < stepLabels.length - 1 && (
                  <ArrowRight
                    className={`h-4 w-4 mx-2 ${
                      completedSteps[index] ? "text-elec-yellow" : "text-muted-foreground"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Current Step Description */}
          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground">
              {currentStep < totalSteps
                ? `Complete ${stepLabels[currentStep]} to continue`
                : "All steps completed! Review your business plan."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator;