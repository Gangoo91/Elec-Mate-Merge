
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import InstallationTypeStep from "@/components/install-planner/InstallationTypeStep";
import LoadDetailsStep from "@/components/install-planner/LoadDetailsStep";
import CableRunStep from "@/components/install-planner/CableRunStep";
import EnvironmentStep from "@/components/install-planner/EnvironmentStep";
import ResultsStep from "@/components/install-planner/ResultsStep";
import DesignModeSelector from "@/components/install-planner/DesignModeSelector";
import MultiCircuitManager from "@/components/install-planner/MultiCircuitManager";
import MultiCircuitResults from "@/components/install-planner/MultiCircuitResults";
import { InstallPlanData } from "@/components/install-planner/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

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
    ze: 0.35,
    designMode: undefined
  });

  // Define steps based on design mode
  const getSingleCircuitSteps = () => [
    { 
      id: 1, 
      title: "Design Mode", 
      subtitle: "Single or Multi-Circuit",
      component: DesignModeSelector,
      icon: "🎯"
    },
    { 
      id: 2, 
      title: "Installation Type", 
      subtitle: "Environment & Load Type",
      component: InstallationTypeStep,
      icon: "🏠"
    },
    { 
      id: 3, 
      title: "Load Details", 
      subtitle: "Power & Electrical Specs",
      component: LoadDetailsStep,
      icon: "⚡"
    },
    { 
      id: 4, 
      title: "Cable Run", 
      subtitle: "Installation Method & Route",
      component: CableRunStep,
      icon: "🔌"
    },
    { 
      id: 5, 
      title: "Environment", 
      subtitle: "Conditions & Protection",
      component: EnvironmentStep,
      icon: "🛡️"
    },
    { 
      id: 6, 
      title: "Results", 
      subtitle: "Recommendations & Compliance",
      component: ResultsStep,
      icon: "📊"
    }
  ];

  const getMultiCircuitSteps = () => [
    { 
      id: 1, 
      title: "Design Mode", 
      subtitle: "Single or Multi-Circuit",
      component: DesignModeSelector,
      icon: "🎯"
    },
    { 
      id: 2, 
      title: "Installation Type", 
      subtitle: "Environment & System Type",
      component: InstallationTypeStep,
      icon: "🏠"
    },
    { 
      id: 3, 
      title: "Circuit Design", 
      subtitle: "Define Multiple Circuits",
      component: MultiCircuitManager,
      icon: "⚡"
    },
    { 
      id: 4, 
      title: "Environment", 
      subtitle: "Conditions & Protection",
      component: EnvironmentStep,
      icon: "🛡️"
    },
    { 
      id: 5, 
      title: "Results", 
      subtitle: "System Analysis & Compliance",
      component: MultiCircuitResults,
      icon: "📊"
    }
  ];

  const steps = planData.designMode === "multi" ? getMultiCircuitSteps() : getSingleCircuitSteps();
  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const updatePlanData = (updates: Partial<InstallPlanData>) => {
    setPlanData(prev => {
      const newData = { ...prev, ...updates };
      
      // Reset step when changing design mode
      if (updates.designMode && updates.designMode !== prev.designMode) {
        setCurrentStep(2); // Go to installation type step
      }
      
      return newData;
    });
  };

  const resetPlan = () => {
    setPlanData({
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
      ze: 0.35,
      designMode: undefined
    });
    setCurrentStep(1);
    toast({
      title: "Plan Reset",
      description: "Installation plan has been reset to start fresh."
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return planData.designMode !== undefined;
      case 2:
        return planData.installationType && (planData.designMode === "multi" || planData.loadType);
      case 3:
        if (planData.designMode === "multi") {
          return planData.circuits && planData.circuits.length > 0 && planData.circuits.some(c => c.enabled);
        }
        return planData.totalLoad > 0;
      case 4:
        if (planData.designMode === "multi") {
          return planData.protectiveDevice && planData.earthingSystem;
        }
        return planData.cableLength > 0 && planData.installationMethod && planData.cableType;
      case 5:
        if (planData.designMode === "multi") {
          return true; // Results step
        }
        return planData.protectiveDevice && planData.earthingSystem;
      default:
        return true;
    }
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in px-2 md:px-0">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <MapPin className="h-6 w-6 md:h-8 md:w-8 text-elec-yellow flex-shrink-0" />
              Professional Installation Planner
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">
              {planData.designMode === "multi" 
                ? "Design multi-circuit electrical installations with comprehensive system analysis and BS 7671 compliance."
                : "Design electrical installations with professional guidance, visual circuit diagrams, and BS 7671 compliance checking."
              }
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"} 
              onClick={resetPlan}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" /> 
              Reset
            </Button>
            <Link to="/electrician-tools">
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> 
                <span className={isMobile ? "text-sm" : ""}>Back</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3 px-4 md:px-6">
          <div className="space-y-4">
            {/* Current Step Info */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{currentStepData?.icon}</div>
                <div>
                  <CardTitle className="text-base md:text-lg">
                    Step {currentStep} of {steps.length}: {currentStepData?.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {currentStepData?.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className="border-elec-yellow/30 text-elec-yellow"
                >
                  {Math.round(progress)}% Complete
                </Badge>
                {planData.designMode && (
                  <Badge 
                    variant="outline" 
                    className="border-blue-400/30 text-blue-400"
                  >
                    {planData.designMode === "multi" ? "Multi-Circuit" : "Single Circuit"}
                  </Badge>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              
              {/* Step Indicators - Hidden on mobile */}
              {!isMobile && (
                <div className="flex justify-between text-xs">
                  {steps.map((step) => {
                    const status = getStepStatus(step.id);
                    return (
                      <div
                        key={step.id}
                        className={`flex flex-col items-center cursor-pointer transition-colors ${
                          status === "completed" ? "text-green-400" :
                          status === "current" ? "text-elec-yellow" :
                          "text-muted-foreground"
                        }`}
                        onClick={() => {
                          if (step.id <= currentStep) {
                            setCurrentStep(step.id);
                          }
                        }}
                      >
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1 ${
                          status === "completed" ? "border-green-400 bg-green-400/20" :
                          status === "current" ? "border-elec-yellow bg-elec-yellow/20" :
                          "border-muted-foreground/30"
                        }`}>
                          {status === "completed" ? "✓" : step.id}
                        </div>
                        <span className="text-center max-w-16">{step.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
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
          className={`flex items-center gap-2 ${isMobile ? 'w-full justify-center' : ''} ${
            currentStep === 1 ? 'opacity-50' : ''
          }`}
          size={isMobile ? "lg" : "default"}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {currentStep < steps.length && (
            <div className={`text-xs px-2 py-1 rounded ${
              canProceed() ? 'text-green-400 bg-green-400/10' : 'text-amber-400 bg-amber-400/10'
            }`}>
              {canProceed() ? '✓ Ready to continue' : '⚠ Complete required fields'}
            </div>
          )}
        </div>

        {currentStep < steps.length ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2 ${
              isMobile ? 'w-full justify-center' : ''
            } ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
            size={isMobile ? "lg" : "default"}
          >
            Next Step
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={resetPlan}
            className={`bg-green-600 hover:bg-green-700 text-white ${isMobile ? 'w-full justify-center' : ''}`}
            size={isMobile ? "lg" : "default"}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            New Installation Plan
          </Button>
        )}
      </div>

      {/* Mobile completion summary */}
      {isMobile && currentStep === steps.length && (
        <Card className="border-green-500/30 bg-green-500/10">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-bold text-green-400 mb-2">Installation Plan Complete! 🎉</h3>
              <p className="text-sm text-green-300">
                {planData.designMode === "multi" 
                  ? `Multi-circuit ${planData.installationType} installation with ${planData.circuits?.filter(c => c.enabled).length || 0} circuits`
                  : `${planData.installationType} installation for ${planData.loadType} load`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InstallPlanner;
