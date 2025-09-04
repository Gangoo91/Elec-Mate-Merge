import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Settings, 
  FileText, 
  Calculator,
  CheckCircle2,
  Clock,
  Zap
} from "lucide-react";

interface QuoteWizardMobileProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  stepDescription: string;
  canProceed: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  children: React.ReactNode;
}

const steps = [
  { title: "Client", icon: User, description: "Customer details" },
  { title: "Items", icon: FileText, description: "Add services" },
  { title: "Settings", icon: Settings, description: "Pricing setup" },
  { title: "Review", icon: Calculator, description: "Final review" },
];

export const QuoteWizardMobile = ({
  currentStep,
  totalSteps,
  stepTitle,
  stepDescription,
  canProceed,
  onNext,
  onPrevious,
  onReset,
  children
}: QuoteWizardMobileProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="flex flex-col h-full max-w-md mx-auto">
      {/* Mobile Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-elec-gray/95 to-elec-card/95 backdrop-blur-sm border-b border-elec-yellow/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <span className="font-semibold text-sm">Quote Builder</span>
          </div>
          <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
            Step {currentStep + 1}/{totalSteps}
          </Badge>
        </div>
        
        <Progress value={progress} className="h-1.5 mb-3" />
        
        {/* Mobile Step Indicators */}
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`p-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-elec-yellow/20 text-elec-yellow' 
                    : isCompleted 
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-muted/50 text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <StepIcon className="h-4 w-4" />
                  )}
                </div>
                <span className="text-xs mt-1 text-center">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Current Step Info */}
          <div className="text-center space-y-2">
            <h2 className="text-lg font-semibold">{stepTitle}</h2>
            <p className="text-sm text-muted-foreground">{stepDescription}</p>
          </div>

          {/* Step Content */}
          <Card className="mobile-card border-elec-yellow/20">
            <CardContent className="p-4">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sticky bottom-0 bg-gradient-to-r from-elec-gray/95 to-elec-card/95 backdrop-blur-sm border-t border-elec-yellow/20 p-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="flex-1 border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {currentStep < totalSteps - 1 ? (
            <Button
              onClick={onNext}
              disabled={!canProceed}
              className="flex-2 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button className="flex-2 bg-gradient-to-r from-elec-yellow to-yellow-400 text-elec-dark hover:from-elec-yellow/90 hover:to-yellow-400/90">
              <Calculator className="h-4 w-4 mr-2" />
              Generate
            </Button>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          onClick={onReset}
          className="w-full mt-2 text-xs text-muted-foreground hover:text-destructive"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};