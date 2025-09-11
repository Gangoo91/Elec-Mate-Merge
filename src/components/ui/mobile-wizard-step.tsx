import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileWizardStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  nextDisabled?: boolean;
  className?: string;
}

export const MobileWizardStep: React.FC<MobileWizardStepProps> = ({
  title,
  description,
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  nextLabel = "Next",
  previousLabel = "Previous",
  nextDisabled = false,
  className
}) => {
  return (
    <Card className={cn("mobile-card", className)}>
      <CardHeader className="pb-4">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 w-8 rounded-full transition-colors",
                  i < currentStep 
                    ? "bg-elec-yellow" 
                    : i === currentStep 
                    ? "bg-elec-yellow/60" 
                    : "bg-elec-gray"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {totalSteps}
          </span>
        </div>
        
        <CardTitle className="mobile-heading">{title}</CardTitle>
        {description && (
          <p className="mobile-text text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      
      <CardContent className="mobile-input-spacing">
        {children}
        
        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/40">
          {onPrevious && currentStep > 0 && (
            <Button
              variant="outline"
              onClick={onPrevious}
              className="mobile-interactive flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {previousLabel}
            </Button>
          )}
          
          {onNext && (
            <Button
              onClick={onNext}
              disabled={nextDisabled}
              className="mobile-button-primary flex items-center gap-2"
            >
              {nextLabel}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};