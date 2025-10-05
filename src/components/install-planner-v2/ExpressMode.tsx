import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, ArrowRight, Check } from "lucide-react";
import { InstallPlanDataV2, CalculationResult } from "./types";
import { QuickSetupStep } from "./express/QuickSetupStep";
import { SmartEnvironmentStep } from "./express/SmartEnvironmentStep";
import { ResultsStep } from "./express/ResultsStep";
import { calculateCableSelection } from "./CalculationEngine";

interface ExpressModeProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
  onReset: () => void;
}

export const ExpressMode = ({ planData, updatePlanData, onReset }: ExpressModeProps) => {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const steps = [
    { num: 1, title: "Quick Setup", component: QuickSetupStep },
    { num: 2, title: "Environment", component: SmartEnvironmentStep },
    { num: 3, title: "Results", component: ResultsStep }
  ];

  const currentStepData = steps.find(s => s.num === step);
  const CurrentComponent = currentStepData?.component;

  const canProceed = () => {
    if (step === 1) {
      return planData.loadType && planData.totalLoad > 0 && planData.cableLength > 0;
    }
    if (step === 2) {
      return planData.environmentalProfile.finalApplied.ambientTemp > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 2) {
      // Calculate results before moving to step 3
      const calcResult = calculateCableSelection(planData);
      setResult(calcResult);
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-center gap-1 md:gap-3">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center">
            <div className={`flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 rounded-full transition-all ${
              step === s.num ? 'bg-primary text-primary-foreground' :
              step > s.num ? 'bg-green-500 text-white' :
              'bg-muted text-muted-foreground'
            }`}>
              {step > s.num ? <Check className="h-3 w-3 md:h-4 md:w-4" /> : <span className="font-bold text-sm md:text-base">{s.num}</span>}
              <span className="font-medium text-sm md:text-base hidden md:inline">{s.title}</span>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight className={`h-4 w-4 md:h-5 md:w-5 mx-1 md:mx-2 ${step > s.num ? 'text-green-500' : 'text-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-foreground">
            {currentStepData?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px] md:min-h-[400px]">
          {step === 1 && <QuickSetupStep planData={planData} updatePlanData={updatePlanData} />}
          {step === 2 && <SmartEnvironmentStep planData={planData} updatePlanData={updatePlanData} />}
          {step === 3 && <ResultsStep planData={planData} updatePlanData={updatePlanData} result={result} />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-0">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={step === 1}
          className="gap-2 w-full md:w-auto"
        >
          Previous
        </Button>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            onClick={onReset}
            className="gap-2 w-full md:w-auto"
          >
            <RotateCcw className="h-4 w-4" /> Start Over
          </Button>

          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2 w-full md:w-auto"
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={onReset}
              className="gap-2 bg-green-500 hover:bg-green-600 w-full md:w-auto"
            >
              New Calculation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
