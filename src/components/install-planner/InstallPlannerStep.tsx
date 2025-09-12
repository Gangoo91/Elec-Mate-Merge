import { useState, useEffect } from "react";
import { InstallPlanData } from "./types";
import LoadTypeSelectionStep from "./LoadTypeSelectionStep";
import LoadDetailsStep from "./LoadDetailsStep";
import CableRunStep from "./CableRunStep";
import InstallationTypeStep from "./InstallationTypeStep";
import EnvironmentalIntelligenceStep from "./EnvironmentalIntelligenceStep";
import ResultsStep from "./ResultsStep";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SIMPLIFIED_CIRCUIT_TEMPLATES } from "./SimplifiedCircuitDefaults";

interface InstallPlannerStepProps {
  initialData?: Partial<InstallPlanData>;
  onPlanUpdate?: (data: InstallPlanData) => void;
}

const InstallPlannerStep = ({ initialData, onPlanUpdate }: InstallPlannerStepProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [planData, setPlanData] = useState<InstallPlanData>({
    installationType: "domestic",
    loadType: "",
    totalLoad: 0,
    voltage: 230,
    phases: "single",
    powerFactor: 0.85,
    cableLength: 20,
    cableType: "pvc-twin-earth",
    installationMethod: "clipped-direct",
    ambientTemperature: 30,
    groupingFactor: 1.0,
    protectiveDevice: "mcb-b",
    environmentalSettings: {
      ambientTemperature: 30,
      environmentalConditions: "standard",
      earthingSystem: "tncs",
      ze: 0.35,
      globalGroupingFactor: 1.0,
      specialRequirements: []
    },
    ...initialData
  });

  const steps = [
    { 
      title: "Installation Type", 
      component: InstallationTypeStep,
      description: "Select the type of installation" 
    },
    { 
      title: "Load Type", 
      component: LoadTypeSelectionStep,
      description: "Choose the electrical load type" 
    },
    { 
      title: "Load Details", 
      component: LoadDetailsStep,
      description: "Configure load specifications" 
    },
    { 
      title: "Cable Run", 
      component: CableRunStep,
      description: "Define cable route and length" 
    },
    { 
      title: "Environment", 
      component: EnvironmentalIntelligenceStep,
      description: "Smart environmental analysis" 
    },
    { 
      title: "Results", 
      component: ResultsStep,
      description: "View calculations and recommendations" 
    }
  ];

  const updatePlanData = (updates: Partial<InstallPlanData>) => {
    const newData = { ...planData, ...updates };
    setPlanData(newData);
    onPlanUpdate?.(newData);
  };

  // Auto-apply template defaults when load type changes
  useEffect(() => {
    if (planData.loadType) {
      const template = SIMPLIFIED_CIRCUIT_TEMPLATES[planData.loadType];
      if (template) {
        updatePlanData({
          totalLoad: template.totalLoad,
          voltage: template.voltage,
          phases: template.phases,
          powerFactor: template.powerFactor || 0.85,
          cableType: template.recommendedCableType,
          installationMethod: template.recommendedInstallationMethod,
          protectiveDevice: template.recommendedProtectiveDevice
        });
      }
    }
  }, [planData.loadType]);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!planData.installationType;
      case 1:
        return !!planData.loadType;
      case 2:
        return !!(planData.totalLoad && planData.voltage && planData.phases);
      case 3:
        return !!(planData.cableLength && planData.cableType && planData.installationMethod);
      case 4:
        return !!(planData.ambientTemperature && planData.groupingFactor);
      case 5:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Header */}
      <Card className="p-6 bg-gradient-to-r from-elec-dark/80 to-elec-yellow/10 border-elec-yellow/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {steps[currentStep].title}
              </h1>
              <p className="text-elec-light/70 mt-1">
                {steps[currentStep].description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-elec-light/70">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="text-2xl font-bold text-elec-yellow">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      {/* Step Content */}
      <Card className="p-8 bg-elec-dark/50 border-elec-yellow/20">
        <CurrentStepComponent 
          planData={planData} 
          updatePlanData={updatePlanData} 
        />
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index <= currentStep 
                  ? "bg-elec-yellow" 
                  : "bg-elec-light/30"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextStep}
          disabled={!canProceed() || currentStep === steps.length - 1}
          className="flex items-center gap-2 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InstallPlannerStep;