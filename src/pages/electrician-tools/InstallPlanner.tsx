
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
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
      component: DesignModeSelector
    },
    { 
      id: 2, 
      title: "Installation Type", 
      subtitle: "Environment & Load Type",
      component: InstallationTypeStep
    },
    { 
      id: 3, 
      title: "Load Details", 
      subtitle: "Power & Electrical Specs",
      component: LoadDetailsStep
    },
    { 
      id: 4, 
      title: "Cable Run", 
      subtitle: "Installation Method & Route",
      component: CableRunStep
    },
    { 
      id: 5, 
      title: "Environment", 
      subtitle: "Conditions & Protection",
      component: EnvironmentStep
    },
    { 
      id: 6, 
      title: "Results", 
      subtitle: "Recommendations & Compliance",
      component: ResultsStep
    }
  ];

  const getMultiCircuitSteps = () => [
    { 
      id: 1, 
      title: "Design Mode", 
      subtitle: "Single or Multi-Circuit",
      component: DesignModeSelector
    },
    { 
      id: 2, 
      title: "Installation Type", 
      subtitle: "Environment & System Type",
      component: InstallationTypeStep
    },
    { 
      id: 3, 
      title: "Circuit Design", 
      subtitle: "Define Multiple Circuits",
      component: MultiCircuitManager
    },
    { 
      id: 4, 
      title: "Environment", 
      subtitle: "Conditions & Protection",
      component: EnvironmentStep
    },
    { 
      id: 5, 
      title: "Results", 
      subtitle: "System Analysis & Compliance",
      component: MultiCircuitResults
    }
  ];

  const steps = planData.designMode === "multi" ? getMultiCircuitSteps() : getSingleCircuitSteps();
  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

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

  const getValidationMessages = () => {
    const missing: string[] = [];
    
    switch (currentStep) {
      case 4: // Environment step
        if (planData.designMode === "multi") {
          console.log('Validating Environment step for multi-circuit mode:', planData.environmentalSettings);
          
          if (!planData.environmentalSettings?.earthingSystem) {
            missing.push("Earthing System");
          }
          if (!planData.environmentalSettings?.ambientTemperature) {
            missing.push("Ambient Temperature");
          }
          if (!planData.environmentalSettings?.environmentalConditions) {
            missing.push("Environmental Conditions");
          }
          if (!planData.environmentalSettings?.ze) {
            missing.push("Ze Value");
          }
        }
        break;
      case 5: // Environment step for single circuit mode
        if (planData.designMode === "single") {
          console.log('Validating Environment step for single-circuit mode:', planData.environmentalSettings);
          
          if (!planData.environmentalSettings?.earthingSystem) {
            missing.push("Earthing System");
          }
          if (!planData.environmentalSettings?.ambientTemperature) {
            missing.push("Ambient Temperature");
          }
          if (!planData.environmentalSettings?.environmentalConditions) {
            missing.push("Environmental Conditions");
          }
          if (!planData.environmentalSettings?.ze) {
            missing.push("Ze Value");
          }
        }
        break;
    }
    
    return missing;
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
          // Environment step validation for multi-circuit
          return planData.environmentalSettings && 
                 planData.environmentalSettings.earthingSystem &&
                 planData.environmentalSettings.ambientTemperature &&
                 planData.environmentalSettings.environmentalConditions &&
                 planData.environmentalSettings.ze;
        }
        // Cable Run step - only require length and installation method (cable type auto-selected)
        return planData.cableLength > 0 && planData.installationMethod;
      case 5:
        if (planData.designMode === "multi") {
          return true; // Results step
        }
        // Environment step validation for single circuit  
        return planData.environmentalSettings && 
               planData.environmentalSettings.earthingSystem &&
               planData.environmentalSettings.ambientTemperature &&
               planData.environmentalSettings.environmentalConditions &&
               planData.environmentalSettings.ze;
      default:
        return true;
    }
  };


  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          {/* Header Section - Optimized for mobile */}
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center">
                Professional Installation Planner
              </h1>
            </div>
            
            {/* Action buttons - Mobile-first design */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                variant="outline" 
                onClick={resetPlan}
                className="flex items-center justify-center gap-2 h-12 sm:h-10 text-base font-medium touch-manipulation"
              >
                <RotateCcw className="h-5 w-5" /> 
                Reset Plan
              </Button>
              <Link to="/electrician" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2 w-full h-12 sm:h-10 text-base font-medium touch-manipulation"
                >
                  <ArrowLeft className="h-5 w-5" /> 
                  Back to Electrical Hub
                </Button>
              </Link>
            </div>
          </div>

          {/* Step Content - Mobile-optimized */}
          <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
            <CardContent className="p-6 sm:p-8 lg:p-10 min-h-[400px] sm:min-h-[500px]">
              {CurrentStepComponent && (
                <div className="w-full max-w-none space-y-6">
                  <CurrentStepComponent
                    planData={planData}
                    updatePlanData={updatePlanData}
                  />
                  
                  {/* Navigation moved inside content area */}
                  <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:items-center pt-6 border-t border-elec-yellow/10 gap-3">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className={`flex items-center justify-center gap-2 h-12 sm:h-11 text-base font-medium touch-manipulation ${
                        currentStep === 1 ? 'opacity-50' : ''
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                      Previous
                    </Button>

                    {/* Progress indicator - Enhanced for mobile */}
                    <div className="flex items-center justify-center gap-2 order-first sm:order-none mb-2 sm:mb-0">
                      <div className={`text-sm px-4 py-2 rounded-full border font-medium ${
                        canProceed() ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-amber-400 bg-amber-400/10 border-amber-400/30'
                      }`}>
                        {canProceed() ? '✓ Ready' : 
                         (() => {
                           const missing = getValidationMessages();
                           return missing.length > 0 ? `⚠ Missing: ${missing.join(', ')}` : '⚠ Complete fields';
                         })()}
                      </div>
                    </div>

                    {currentStep < steps.length ? (
                      <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={`bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center justify-center gap-2 h-12 sm:h-11 text-base font-medium touch-manipulation ${
                          !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Next
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    ) : (
                      <Button
                        onClick={resetPlan}
                        className="bg-green-600 hover:bg-green-700 text-white h-12 sm:h-11 text-base font-medium touch-manipulation"
                      >
                        <RotateCcw className="h-5 w-5 mr-2" />
                        New Plan
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>


          {/* Mobile completion summary - Enhanced for touch */}
          {currentStep === steps.length && (
            <Card className="border-green-500/30 bg-green-500/5 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center space-y-4">
                  <div className="text-4xl sm:text-5xl mb-4">🎉</div>
                  <h3 className="font-bold text-green-400 text-xl sm:text-2xl">Installation Plan Complete!</h3>
                  <p className="text-base sm:text-lg text-green-300 leading-relaxed">
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
