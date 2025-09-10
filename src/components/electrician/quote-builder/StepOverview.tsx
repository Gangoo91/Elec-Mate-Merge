import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Check, AlertCircle, User, Settings, FileText, Calculator, Building2, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const stepIcons = [Building2, User, Briefcase, FileText, Settings, Calculator];

interface StepOverviewProps {
  currentStep: number;
  stepLabels: string[];
  completedSteps: boolean[];
  stepSummaries: (string | null)[];
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const StepOverview = ({
  currentStep,
  stepLabels,
  completedSteps,
  stepSummaries,
  onStepClick,
  className
}: StepOverviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className={cn("mb-6", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quote Progress Overview
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {completedSteps.filter(Boolean).length} of {stepLabels.length} completed
                </span>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-3">
            {stepLabels.map((label, index) => {
              const Icon = stepIcons[index];
              const isCompleted = completedSteps[index];
              const isCurrent = index === currentStep;
              const canNavigate = isCompleted && onStepClick;
              const summary = stepSummaries[index];

              return (
                <div
                  key={index}
                  className={cn(
                    "p-3 rounded-lg border transition-all duration-200",
                    isCurrent && "bg-primary/5 border-primary/20",
                    isCompleted && !isCurrent && "bg-green-50 border-green-200",
                    !isCompleted && !isCurrent && "bg-muted/30 border-muted"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 flex-shrink-0",
                      isCompleted
                        ? "bg-green-600 border-green-600 text-white"
                        : isCurrent
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-muted text-muted-foreground"
                    )}>
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={cn(
                          "font-medium",
                          isCurrent && "text-primary",
                          isCompleted && "text-green-700"
                        )}>
                          {label}
                        </h4>
                        {canNavigate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onStepClick(index)}
                            className="ml-2 h-auto p-1 text-xs"
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                      
                      {summary ? (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {summary}
                        </p>
                      ) : isCurrent ? (
                        <p className="text-sm text-primary mt-1">
                          Currently completing this step
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">
                          Not yet completed
                        </p>
                      )}
                      
                      {!isCompleted && !isCurrent && (
                        <div className="flex items-center gap-1 mt-2">
                          <AlertCircle className="h-3 w-3 text-amber-600" />
                          <span className="text-xs text-amber-600">
                            Pending completion
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};