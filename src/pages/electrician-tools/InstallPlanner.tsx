
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import InstallationTypeStep from "@/components/install-planner/InstallationTypeStep";
import LoadDetailsStep from "@/components/install-planner/LoadDetailsStep";
import CableRunStep from "@/components/install-planner/CableRunStep";
import EnvironmentStep from "@/components/install-planner/EnvironmentStep";
import ResultsStep from "@/components/install-planner/ResultsStep";
import { InstallPlanData } from "@/components/install-planner/types";
import { useIsMobile } from "@/hooks/use-mobile";

const InstallPlanner = () => {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(1);
  const [planData, setPlanData] = useState<InstallPlanData>({
    installationType: "",
    loadType: "",
    totalLoad: 0,
    voltage: 230,
    phases: "single",
    cableLength: 0,
    installationMethod: "",
    cableType: "",
    ambientTemperature: 30,
    groupingFactor: 1,
    derating: 1,
    protectiveDevice: "",
    earthingSystem: "TN-S",
    ze: 0.35
  });

  const steps = [
    { id: 1, title: "Installation Type", component: InstallationTypeStep },
    { id: 2, title: "Load Details", component: LoadDetailsStep },
    { id: 3, title: "Cable Run", component: CableRunStep },
    { id: 4, title: "Environment", component: EnvironmentStep },
    { id: 5, title: "Results", component: ResultsStep }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePlanData = (updates: Partial<InstallPlanData>) => {
    setPlanData(prev => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return planData.installationType && planData.loadType;
      case 2:
        return planData.totalLoad > 0;
      case 3:
        return planData.cableLength > 0 && planData.installationMethod && planData.cableType;
      case 4:
        return planData.protectiveDevice && planData.earthingSystem;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in px-2 md:px-0">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <MapPin className="h-6 w-6 md:h-8 md:w-8 text-elec-yellow flex-shrink-0" />
              Installation Planner
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">
              Plan your electrical installation with professional guidance and calculations.
            </p>
          </div>
          <div className="flex justify-end">
            <Link to="/electrician-tools">
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> 
                <span className={isMobile ? "text-sm" : ""}>Back to Electrician Tools</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3 px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <CardTitle className="text-base md:text-lg">
              Step {currentStep} of {steps.length}: {currentStepData?.title}
            </CardTitle>
            <span className="text-xs md:text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4 md:p-6 min-h-[400px] md:min-h-[500px]">
          {CurrentStepComponent && (
            <CurrentStepComponent
              planData={planData}
              updatePlanData={updatePlanData}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation Section */}
      <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 px-2 md:px-0">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 ${isMobile ? 'w-full justify-center' : ''}`}
          size={isMobile ? "lg" : "default"}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2 ${isMobile ? 'w-full justify-center' : ''}`}
            size={isMobile ? "lg" : "default"}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentStep(1)}
            className={`bg-green-600 hover:bg-green-700 text-white ${isMobile ? 'w-full justify-center' : ''}`}
            size={isMobile ? "lg" : "default"}
          >
            Start New Plan
          </Button>
        )}
      </div>
    </div>
  );
};

export default InstallPlanner;
