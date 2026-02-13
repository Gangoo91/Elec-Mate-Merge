import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft, ArrowRight, CheckCircle, AlertTriangle,
} from "lucide-react";
import HazardIdentificationMatrix from "./risk-assessment/HazardIdentificationMatrix";
import RiskCalculationMatrix from "./risk-assessment/RiskCalculationMatrix";
import ControlMeasuresGenerator from "./risk-assessment/ControlMeasuresGenerator";
import RiskOutcomeGuidance from "./risk-assessment/RiskOutcomeGuidance";
import RiskDocumentation from "./risk-assessment/RiskDocumentation";
import type { useAssessmentProgress } from "./hooks/useAssessmentProgress";

interface RiskAssessment {
  id: string;
  hazard: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  riskLevel: string;
  controlMeasures: string[];
  timestamp: string;
  assessor: string;
  location: string;
}

interface RiskAssessmentFlowProps {
  progress: ReturnType<typeof useAssessmentProgress>;
}

const steps = [
  { number: 1, label: 'Hazard' },
  { number: 2, label: 'Risk' },
  { number: 3, label: 'Controls' },
  { number: 4, label: 'Guidance' },
  { number: 5, label: 'Export' },
];

const calculateRiskLevel = (score: number): string => {
  if (score >= 15) return "Very High";
  if (score >= 10) return "High";
  if (score >= 6) return "Medium";
  if (score >= 3) return "Low";
  return "Very Low";
};

const RiskAssessmentFlow = ({ progress }: RiskAssessmentFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedHazard, setSelectedHazard] = useState("");
  const [currentAssessment, setCurrentAssessment] = useState<RiskAssessment | null>(null);

  const canGoNext = () => {
    switch (currentStep) {
      case 1: return selectedHazard !== "";
      case 2: return currentAssessment !== null;
      case 3: return currentAssessment !== null && currentAssessment.controlMeasures.length > 0;
      case 4: return currentAssessment !== null;
      case 5: return true;
      default: return false;
    }
  };

  const handleHazardSelected = (hazard: string) => {
    setSelectedHazard(hazard);
    setCurrentAssessment(null);
  };

  const handleRiskCalculated = (likelihood: number, severity: number) => {
    if (!selectedHazard) return;
    const riskScore = likelihood * severity;
    const riskLevel = calculateRiskLevel(riskScore);
    const newAssessment: RiskAssessment = {
      id: `RA-${Date.now()}`,
      hazard: selectedHazard,
      likelihood,
      severity,
      riskScore,
      riskLevel,
      controlMeasures: [],
      timestamp: new Date().toISOString(),
      assessor: "Current User",
      location: "Site Location",
    };
    setCurrentAssessment(newAssessment);
    setCurrentStep(3);
  };

  const handleControlMeasuresAdded = (controlMeasures: string[]) => {
    if (currentAssessment) {
      const updated = { ...currentAssessment, controlMeasures };
      setCurrentAssessment(updated);
      // Save to localStorage
      progress.saveRiskAssessment({
        hazard: updated.hazard,
        likelihood: updated.likelihood,
        severity: updated.severity,
        riskScore: updated.riskScore,
        riskLevel: updated.riskLevel,
        controlMeasures: updated.controlMeasures,
        location: updated.location,
      });
      setCurrentStep(4);
    }
  };

  const handleStartNew = () => {
    setCurrentStep(1);
    setSelectedHazard("");
    setCurrentAssessment(null);
  };

  const getStepColor = (stepNum: number) => {
    if (stepNum < currentStep) return 'bg-green-500 text-white';
    if (stepNum === currentStep) return 'bg-elec-yellow text-black';
    return 'bg-white/10 text-white';
  };

  return (
    <div className="space-y-4">
      {/* Step indicator */}
      <div className="flex items-center justify-between px-2">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${getStepColor(step.number)}`}>
                {step.number < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>
              <span className="text-xs text-white mt-1 hidden sm:block">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-6 sm:w-10 h-0.5 mx-1 ${step.number < currentStep ? 'bg-green-500' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Previous assessments count */}
      {progress.riskAssessments.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/30">
          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
          <span className="text-sm text-white">
            {progress.riskAssessments.length} assessment{progress.riskAssessments.length !== 1 ? 's' : ''} saved
          </span>
        </div>
      )}

      {/* Step content */}
      <div className="space-y-4">
        {currentStep === 1 && (
          <>
            <HazardIdentificationMatrix onHazardSelected={handleHazardSelected} />
            {selectedHazard && (
              <Card className="bg-gradient-to-r from-elec-yellow/10 via-elec-yellow/5 to-transparent border-elec-yellow/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-elec-yellow mb-1">Selected Hazard</div>
                      <div className="text-sm text-white">{selectedHazard}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {currentStep === 2 && (
          <RiskCalculationMatrix onRiskCalculated={handleRiskCalculated} />
        )}

        {currentStep === 3 && (
          <ControlMeasuresGenerator onControlMeasuresAdded={handleControlMeasuresAdded} />
        )}

        {currentStep === 4 && currentAssessment && (
          <RiskOutcomeGuidance
            riskLevel={currentAssessment.riskLevel}
            riskScore={currentAssessment.riskScore}
          />
        )}

        {currentStep === 5 && (
          <>
            <RiskDocumentation assessment={currentAssessment} />
            <Button
              onClick={handleStartNew}
              className="w-full h-11 bg-green-500 hover:bg-green-500/90 text-white font-semibold touch-manipulation active:scale-95 transition-all"
            >
              Start New Assessment
            </Button>
          </>
        )}
      </div>

      {/* Navigation buttons */}
      {currentStep < 5 && (
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              onClick={() => setCurrentStep(prev => prev - 1)}
              variant="outline"
              className="flex-1 h-11 border-white/20 hover:bg-white/5 touch-manipulation active:scale-95 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {/* Steps 2 and 3 auto-advance on action, but still show Next for step 1 and 4 */}
          {(currentStep === 1 || currentStep === 4) && (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canGoNext()}
              className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-95 transition-all disabled:opacity-30"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentFlow;
