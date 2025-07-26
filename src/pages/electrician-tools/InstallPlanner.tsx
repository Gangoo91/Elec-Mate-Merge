
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, ChevronRight, ChevronLeft, RotateCcw, Target, Home, Zap, Cable, Shield, BarChart3, CheckCircle } from "lucide-react";
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
    designMode: undefined,
    
    // Initialize environmental settings
    environmentalSettings: {
      ambientTemperature: 30,
      environmentalConditions: "Indoor dry locations",
      earthingSystem: "TN-S",
      ze: 0.35,
      globalGroupingFactor: 1,
      specialRequirements: [],
      installationZones: []
    },
    
    // Legacy fields for backward compatibility
    ambientTemperature: 30,
    groupingFactor: 1,
    derating: 1,
    protectiveDevice: "",
    earthingSystem: "TN-S",
    ze: 0.35
  });

  // Define steps based on design mode
  const getSingleCircuitSteps = () => [
    { 
      id: 1, 
      title: "Design Mode", 
      subtitle: "Single or Multi-Circuit",
      component: DesignModeSelector,
      icon: Target
    },
    { 
      id: 2, 
      title: "Installation Type", 
      subtitle: "Environment & Load Type",
      component: InstallationTypeStep,
      icon: Home
    },
    { 
      id: 3, 
      title: "Load Details", 
      subtitle: "Power & Electrical Specs",
      component: LoadDetailsStep,
      icon: Zap
    },
    { 
      id: 4, 
      title: "Cable Run", 
      subtitle: "Installation Method & Route",
      component: CableRunStep,
      icon: Cable
    },
    { 
      id: 5, 
      title: "Environment", 
      subtitle: "Conditions & Protection",
      component: EnvironmentStep,
      icon: Shield
    },
    { 
      id: 6, 
      title: "Results", 
      subtitle: "Recommendations & Compliance",
      component: ResultsStep,
      icon: BarChart3
    }
  ];

  const getMultiCircuitSteps = () => [
    { 
      id: 1, 
      title: "Design Mode", 
      subtitle: "Single or Multi-Circuit",
      component: DesignModeSelector,
      icon: Target
    },
    { 
      id: 2, 
      title: "Installation Type", 
      subtitle: "Environment & System Type",
      component: InstallationTypeStep,
      icon: Home
    },
    { 
      id: 3, 
      title: "Circuit Design", 
      subtitle: "Define Multiple Circuits",
      component: MultiCircuitManager,
      icon: Zap
    },
    { 
      id: 4, 
      title: "Environment", 
      subtitle: "Conditions & Protection",
      component: EnvironmentStep,
      icon: Shield
    },
    { 
      id: 5, 
      title: "Results", 
      subtitle: "System Analysis & Compliance",
      component: MultiCircuitResults,
      icon: BarChart3
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
      designMode: undefined,
      
      environmentalSettings: {
        ambientTemperature: 30,
        environmentalConditions: "Indoor dry locations",
        earthingSystem: "TN-S",
        ze: 0.35,
        globalGroupingFactor: 1,
        specialRequirements: [],
        installationZones: []
      },
      
      ambientTemperature: 30,
      groupingFactor: 1,
      derating: 1,
      protectiveDevice: "",
      earthingSystem: "TN-S",
      ze: 0.35
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
          return planData.environmentalSettings && planData.environmentalSettings.earthingSystem;
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-6xl">
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Header Section - Improved mobile layout */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex-1 space-y-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex items-start gap-3">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-elec-yellow flex-shrink-0 mt-1" />
                  <span className="leading-tight">Professional Installation Planner</span>
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {planData.designMode === "multi" 
                    ? "Design multi-circuit electrical installations with comprehensive system analysis, environmental zones, and BS 7671 compliance."
                    : "Design electrical installations with professional guidance, visual circuit diagrams, and BS 7671 compliance checking."
                  }
                </p>
              </div>
              
              {/* Action buttons - Better mobile layout */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button 
                  variant="outline" 
                  onClick={resetPlan}
                  className="flex items-center justify-center gap-2 h-10 sm:h-9"
                >
                  <RotateCcw className="h-4 w-4" /> 
                  Reset Plan
                </Button>
                <Link to="/electrician-tools" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center gap-2 w-full h-10 sm:h-9"
                  >
                    <ArrowLeft className="h-4 w-4" /> 
                    Back to Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Progress Section - Mobile optimized */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3 px-4 sm:px-6">
              <div className="space-y-4">
                {/* Current Step Info - Improved mobile layout */}
                  <div className="space-y-3 sm:space-y-0 sm:flex sm:justify-between sm:items-start">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-elec-yellow/20 rounded-lg flex-shrink-0">
                        {currentStepData?.icon && <currentStepData.icon className="h-5 w-5 text-elec-yellow" />}
                      </div>
                      <div className="min-w-0 flex-1">
                      <CardTitle className="text-base sm:text-lg lg:text-xl leading-tight">
                        Step {currentStep} of {steps.length}: {currentStepData?.title}
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                        {currentStepData?.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Badges - Better mobile wrapping */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className="border-elec-yellow/30 text-elec-yellow text-xs whitespace-nowrap"
                    >
                      {Math.round(progress)}% Complete
                    </Badge>
                    {planData.designMode && (
                      <Badge 
                        variant="outline" 
                        className="border-blue-400/30 text-blue-400 text-xs whitespace-nowrap"
                      >
                        {planData.designMode === "multi" ? "Multi-Circuit" : "Single Circuit"}
                      </Badge>
                    )}
                    {planData.environmentalSettings?.installationZones && planData.environmentalSettings.installationZones.length > 0 && (
                      <Badge 
                        variant="outline" 
                        className="border-green-400/30 text-green-400 text-xs whitespace-nowrap"
                      >
                        {planData.environmentalSettings.installationZones.length} Zones
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <Progress value={progress} className="h-2 sm:h-2.5" />
                  
                  {/* Step Indicators - Hidden on mobile, enhanced for tablet+ */}
                  <div className="hidden md:flex justify-between text-xs">
                    {steps.map((step) => {
                      const status = getStepStatus(step.id);
                      return (
                        <div
                          key={step.id}
                          className={`flex flex-col items-center cursor-pointer transition-colors min-w-0 ${
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
                          <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 flex items-center justify-center mb-2 ${
                            status === "completed" ? "border-green-400 bg-green-400/20" :
                            status === "current" ? "border-elec-yellow bg-elec-yellow/20" :
                            "border-muted-foreground/30"
                          }`}>
                            {status === "completed" ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <step.icon className="h-4 w-4" />
                            )}
                          </div>
                          <span className="text-center max-w-16 lg:max-w-20 leading-tight truncate">{step.title}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile step indicator */}
                  <div className="md:hidden flex justify-center">
                    <div className="flex items-center gap-2">
                      {steps.map((step) => {
                        const status = getStepStatus(step.id);
                        return (
                          <div
                            key={step.id}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              status === "completed" ? "bg-green-400" :
                              status === "current" ? "bg-elec-yellow" :
                              "bg-muted-foreground/30"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Step Content - Enhanced mobile padding */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4 sm:p-6 lg:p-8 min-h-[400px] sm:min-h-[500px]">
              {CurrentStepComponent && (
                <CurrentStepComponent
                  planData={planData}
                  updatePlanData={updatePlanData}
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation Section - Improved mobile layout */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center justify-center gap-2 h-11 sm:h-10 ${
                currentStep === 1 ? 'opacity-50' : ''
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Step
            </Button>

            {/* Progress indicator for mobile navigation */}
            <div className="flex items-center justify-center gap-2 order-first sm:order-none">
              <div className={`text-xs px-3 py-1.5 rounded-full border ${
                canProceed() ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-amber-400 bg-amber-400/10 border-amber-400/30'
              }`}>
                {canProceed() ? '✓ Ready to continue' : '⚠ Complete required fields'}
              </div>
            </div>

            {currentStep < steps.length ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center justify-center gap-2 h-11 sm:h-10 ${
                  !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next Step
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={resetPlan}
                className="bg-green-600 hover:bg-green-700 text-white h-11 sm:h-10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                New Installation Plan
              </Button>
            )}
          </div>

          {/* Mobile completion summary - Enhanced */}
          {currentStep === steps.length && (
            <Card className="border-green-500/30 bg-green-500/5">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl mb-2">🎉</div>
                  <h3 className="font-bold text-green-400 text-lg sm:text-xl">Installation Plan Complete!</h3>
                  <p className="text-sm sm:text-base text-green-300 leading-relaxed">
                    {planData.designMode === "multi" 
                      ? `Multi-circuit ${planData.installationType} installation with ${planData.circuits?.filter(c => c.enabled).length || 0} circuits across ${planData.environmentalSettings?.installationZones?.length || 0} zones`
                      : `${planData.installationType} installation for ${planData.loadType} load`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallPlanner;
