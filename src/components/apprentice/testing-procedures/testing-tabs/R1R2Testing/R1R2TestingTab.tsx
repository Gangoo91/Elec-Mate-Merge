
import { Card, CardContent } from "@/components/ui/card";
import StepNavigation from "../../StepNavigation";
import CommonIssuesCard from "../../CommonIssuesCard";
import { useState } from "react";
import R1R2Step1 from "./Step1";
import R1R2Step2 from "./Step2";
import R1R2Step3 from "./Step3";

const R1R2TestingTab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">R1+R2 Testing (Continuity of Protective Conductors)</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Tests the continuity of the circuit protective conductors, main and supplementary bonding conductors.
            </p>
          </div>
          
          <div className="space-y-6 pb-4">
            {currentStep === 1 && <R1R2Step1 />}
            {currentStep === 2 && <R1R2Step2 />}
            {currentStep === 3 && <R1R2Step3 />}
            
            <StepNavigation 
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </div>
        </CardContent>
      </Card>
      
      <CommonIssuesCard />
    </div>
  );
};

export default R1R2TestingTab;
