import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DesignInputs, CircuitInput } from "@/types/installation-design";
import { ProjectInfoStep } from "./ProjectInfoStep";
import { SupplyDetailsStep } from "./SupplyDetailsStep";
import { CircuitBuilderStep } from "./CircuitBuilderStep";
import { InstallationDetailsStep } from "./InstallationDetailsStep";
import { PreCalculationStep } from "./PreCalculationStep";
import { ReviewStep } from "./ReviewStep";
import { ArrowLeft, ArrowRight, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { clearDesignCache } from "@/utils/clearDesignCache";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import {
  calculateDesignCurrent,
  suggestMCBRating,
  calculateDiversityFactor,
  estimateCableSize,
  validateCircuit
} from "@/utils/circuit-calculations";
import { cn } from "@/lib/utils";

interface StructuredDesignWizardProps {
  onGenerate: (inputs: DesignInputs) => Promise<void>;
  isProcessing: boolean;
}

const STEPS = [
  { id: 'project', label: 'Project', description: 'Basic details' },
  { id: 'supply', label: 'Supply', description: 'Electrical characteristics' },
  { id: 'circuits', label: 'Circuits', description: 'Add your circuits' },
  { id: 'install', label: 'Install', description: 'Per-circuit setup' },
  { id: 'validate', label: 'Validate', description: 'Pre-flight check' },
  { id: 'review', label: 'Review', description: 'Final check' }
] as const;

// Animation variants for step transitions
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0
  })
};

export const StructuredDesignWizard = ({ onGenerate, isProcessing }: StructuredDesignWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showClearCacheDialog, setShowClearCacheDialog] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);

  // Project Info
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [electricianName, setElectricianName] = useState('');
  const [installationType, setInstallationType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');

  // Supply Details
  const [voltage, setVoltage] = useState(230);
  const [phases, setPhases] = useState<'single' | 'three'>('single');
  const [ze, setZe] = useState(0.35);
  const [earthingSystem, setEarthingSystem] = useState<'TN-S' | 'TN-C-S' | 'TT'>('TN-C-S');
  const [pscc, setPscc] = useState<number | undefined>(undefined);
  const [ambientTemp, setAmbientTemp] = useState(25);
  const [installationMethod, setInstallationMethod] = useState('clipped-direct');
  const [groupingFactor, setGroupingFactor] = useState(1);
  const [mainSwitchRating, setMainSwitchRating] = useState<number | undefined>(undefined);
  const [propertyAge, setPropertyAge] = useState<'new-build' | 'modern' | 'older' | 'very-old' | undefined>(undefined);

  // Circuits
  const [circuits, setCircuits] = useState<CircuitInput[]>([]);

  // Update defaults when installation type or phases change
  useEffect(() => {
    if (installationType === 'industrial') {
      setPhases('three');
      setVoltage(400);
    } else {
      setPhases('single');
      setVoltage(230);
    }
  }, [installationType]);

  useEffect(() => {
    setVoltage(phases === 'single' ? 230 : 400);
  }, [phases]);

  // Auto-calculate circuit parameters when circuits change
  useEffect(() => {
    if (circuits.length > 0) {
      const updated = circuits.map(circuit => {
        if (!circuit.loadPower) return circuit;

        const Ib = calculateDesignCurrent(circuit.loadPower, voltage, circuit.phases);
        const mcbRating = suggestMCBRating(Ib);
        const diversity = circuit.diversityOverride || calculateDiversityFactor(circuit.loadType);
        const cableSize = circuit.cableLength
          ? estimateCableSize(Ib, circuit.cableLength)
          : estimateCableSize(Ib, 25);

        return {
          ...circuit,
          calculatedIb: Ib,
          suggestedMCB: mcbRating,
          calculatedDiversity: diversity,
          estimatedCableSize: cableSize,
        };
      });

      setCircuits(updated);
    }
  }, [voltage]);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return projectName.trim() !== '' && location.trim() !== '';
      case 1: return voltage > 0 && ze > 0;
      case 2: return circuits.length > 0 && circuits.every(c => c.name && c.loadPower);
      case 3: return true;
      case 4: {
        const hasErrors = circuits.some(c => {
          const validation = validateCircuit(c, voltage, earthingSystem);
          return !validation.isValid;
        });
        return !hasErrors;
      }
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error('Please complete all required fields');
      return;
    }
    setDirection(1);
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow clicking on completed steps or current step
    if (stepIndex < currentStep) {
      setDirection(stepIndex < currentStep ? -1 : 1);
      setCurrentStep(stepIndex);
    }
  };

  const handleClearCache = async () => {
    setClearingCache(true);
    try {
      const result = await clearDesignCache();
      if (result.success) {
        toast.success('Cache cleared successfully', {
          description: `Cleared ${result.cleared} cache table${result.cleared !== 1 ? 's' : ''}`
        });
      } else {
        toast.error('Failed to clear cache', { description: result.error });
      }
    } catch (error) {
      toast.error('Cache clear failed', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setClearingCache(false);
      setShowClearCacheDialog(false);
    }
  };

  const handleGenerate = async () => {
    if (!canProceed()) {
      toast.error('Please complete all required fields');
      return;
    }

    const inputs: DesignInputs = {
      projectName,
      location,
      clientName,
      electricianName,
      propertyType: installationType,
      voltage,
      phases,
      ze,
      earthingSystem,
      pscc,
      mainSwitchRating,
      ambientTemp,
      installationMethod: installationMethod as any,
      groupingFactor,
      propertyAge,
      circuits,
      additionalPrompt: `Structured input design with ${circuits.length} circuits`
    };

    await onGenerate(inputs);
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProjectInfoStep
            projectName={projectName}
            setProjectName={setProjectName}
            location={location}
            setLocation={setLocation}
            clientName={clientName}
            setClientName={setClientName}
            electricianName={electricianName}
            setElectricianName={setElectricianName}
            installationType={installationType}
            setInstallationType={setInstallationType}
          />
        );
      case 1:
        return (
          <SupplyDetailsStep
            voltage={voltage}
            setVoltage={setVoltage}
            phases={phases}
            setPhases={setPhases}
            ze={ze}
            setZe={setZe}
            earthingSystem={earthingSystem}
            setEarthingSystem={setEarthingSystem}
            pscc={pscc}
            setPscc={setPscc}
            ambientTemp={ambientTemp}
            setAmbientTemp={setAmbientTemp}
            installationMethod={installationMethod}
            setInstallationMethod={setInstallationMethod}
            groupingFactor={groupingFactor}
            setGroupingFactor={setGroupingFactor}
            installationType={installationType}
            mainSwitchRating={mainSwitchRating}
            setMainSwitchRating={setMainSwitchRating}
            propertyAge={propertyAge}
            setPropertyAge={setPropertyAge}
          />
        );
      case 2:
        return (
          <CircuitBuilderStep
            circuits={circuits}
            setCircuits={setCircuits}
            installationType={installationType}
          />
        );
      case 3:
        return (
          <InstallationDetailsStep
            circuits={circuits}
            onUpdate={setCircuits}
            installationType={installationType}
          />
        );
      case 4:
        return (
          <PreCalculationStep
            circuits={circuits}
            voltage={voltage}
            earthingSystem={earthingSystem}
          />
        );
      case 5:
        return (
          <ReviewStep
            inputs={{
              projectName,
              location,
              clientName,
              electricianName,
              propertyType: installationType,
              voltage,
              phases,
              ze,
              earthingSystem,
              pscc,
              ambientTemp,
              installationMethod: installationMethod as any,
              groupingFactor,
              circuits
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Premium Step Indicator */}
      <div className="px-2">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isClickable = index < currentStep;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex-1 flex flex-col items-center",
                  isClickable && "cursor-pointer"
                )}
                onClick={() => isClickable && handleStepClick(index)}
              >
                {/* Step circle */}
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center",
                    "text-xs sm:text-sm font-semibold",
                    "transition-all duration-ios-normal ease-ios-ease",
                    "border-2",
                    isActive && "bg-elec-yellow text-black border-elec-yellow shadow-[0_0_0_4px_hsl(var(--elec-yellow)/0.2)]",
                    isCompleted && "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40",
                    !isActive && !isCompleted && "bg-white/[0.03] text-white/40 border-white/[0.08]"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {/* Step label - show on larger screens */}
                <span
                  className={cn(
                    "hidden sm:block mt-2 text-xs font-medium text-center transition-colors duration-ios-fast",
                    isActive ? "text-elec-yellow" : isCompleted ? "text-white/60" : "text-white/30"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-elec-yellow to-elec-yellow/80 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step Content with animations */}
      <Card className="bg-white/[0.03] border-white/[0.08] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>

      {/* Premium Navigation */}
      <div className="pb-safe">
        <Card className="bg-white/[0.03] border-white/[0.08] rounded-xl p-3 sm:p-4 sticky bottom-0 sm:static shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0 || isProcessing}
              className={cn(
                "gap-2 h-12 px-4 rounded-xl",
                "bg-white/5 border border-white/[0.08]",
                "hover:bg-white/10 hover:border-white/15",
                "disabled:opacity-30",
                "transition-all duration-ios-fast",
                "touch-manipulation"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            {/* Step indicator for mobile */}
            <div className="flex-1 flex justify-center sm:hidden">
              <Badge variant="secondary" className="bg-white/5 text-white/80 border-0">
                {currentStep + 1} / {STEPS.length}
              </Badge>
            </div>

            {/* Progress percentage for desktop */}
            <div className="hidden sm:flex flex-1 justify-center">
              <Badge variant="secondary" className="bg-white/5 text-white/80 border-0 px-3 py-1">
                {Math.round(progressPercentage)}% Complete
              </Badge>
            </div>

            {currentStep < STEPS.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isProcessing}
                className={cn(
                  "gap-2 h-12 px-6 rounded-xl",
                  "bg-elec-yellow text-black font-semibold",
                  "hover:bg-elec-yellow/90",
                  "disabled:opacity-30 disabled:bg-white/5 disabled:text-white/40",
                  "shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
                  "active:scale-[0.98]",
                  "transition-all duration-ios-fast",
                  "touch-manipulation"
                )}
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleGenerate}
                disabled={!canProceed() || isProcessing}
                className={cn(
                  "gap-2 h-12 px-6 rounded-xl",
                  "bg-elec-yellow text-black font-semibold",
                  "hover:bg-elec-yellow/90",
                  "disabled:opacity-30 disabled:bg-white/5 disabled:text-white/40",
                  "shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
                  "active:scale-[0.98]",
                  "transition-all duration-ios-fast",
                  "touch-manipulation"
                )}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black/20 border-t-black" />
                    <span className="hidden sm:inline">Generating...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span className="hidden sm:inline">Generate Design</span>
                    <span className="sm:hidden">Generate</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Clear Cache Confirmation Dialog */}
      <ConfirmationDialog
        open={showClearCacheDialog}
        onOpenChange={setShowClearCacheDialog}
        title="Clear Design Cache?"
        description="This will clear all cached circuit designs. Fresh designs will be generated with the latest AI models and regulations. Continue?"
        confirmText="Clear Cache"
        cancelText="Cancel"
        onConfirm={handleClearCache}
        variant="destructive"
        loading={clearingCache}
      />
    </div>
  );
};
