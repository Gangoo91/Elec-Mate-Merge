
import { Card, CardContent } from "@/components/ui/card";
import StepNavigation from "../../StepNavigation";
import CommonIssuesCard from "../../CommonIssuesCard";
import { useState } from "react";
import R1R2Step1 from "./Step1";
import R1R2Step2 from "./Step2";
import R1R2Step3 from "./Step3";
import { Info } from "lucide-react";

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
    <div className="space-y-6 max-w-full overflow-hidden">
      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">R1+R2 Testing (Continuity of Protective Conductors)</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Tests the continuity of the circuit protective conductors, main and supplementary bonding conductors.
            </p>
          </div>
          
          <div className="p-4 border border-blue-500/30 bg-blue-950/30 rounded-md mb-6 overflow-hidden">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-blue-300 font-medium text-sm">Purpose of R1+R2 Testing</h3>
                <p className="text-sm text-blue-100/80 mt-1">
                  R1+R2 testing verifies that protective conductors are continuous and have sufficiently low resistance to carry fault currents. This ensures that protective devices operate correctly in the event of a fault, providing safety from electric shock.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 pb-4 overflow-hidden">
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
