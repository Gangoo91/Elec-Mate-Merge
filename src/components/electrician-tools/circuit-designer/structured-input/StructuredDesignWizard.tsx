import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DesignInputs, CircuitInput } from "@/types/installation-design";
import { ProjectInfoStep } from "./ProjectInfoStep";
import { SupplyDetailsStep } from "./SupplyDetailsStep";
import { CircuitBuilderStep } from "./CircuitBuilderStep";
import { InstallationDetailsStep } from "./InstallationDetailsStep";
import { PreCalculationStep } from "./PreCalculationStep";
import { ReviewStep } from "./ReviewStep";
import { ArrowLeft, ArrowRight, Sparkles, Trash2 } from "lucide-react";
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

interface StructuredDesignWizardProps {
  onGenerate: (inputs: DesignInputs) => Promise<void>;
  isProcessing: boolean;
}

const STEPS = [
  { id: 'project', label: 'Project Info', description: 'Basic details' },
  { id: 'supply', label: 'Supply Details', description: 'Electrical characteristics' },
  { id: 'circuits', label: 'Build Circuits', description: 'Add your circuits' },
  { id: 'install', label: 'Installation Details', description: 'Per-circuit setup' },
  { id: 'validate', label: 'Pre-Flight Check', description: 'Validate & estimate' },
  { id: 'review', label: 'Review', description: 'Final check' }
] as const;

export const StructuredDesignWizard = ({ onGenerate, isProcessing }: StructuredDesignWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
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
        if (!circuit.loadPower) return circuit; // Allow calculations even without cable length
        
        // Calculate Ib (design current)
        const Ib = calculateDesignCurrent(circuit.loadPower, voltage, circuit.phases);
        
        // Suggest MCB rating
        const mcbRating = suggestMCBRating(Ib);
        
        // Calculate diversity factor
        const diversity = circuit.diversityOverride || calculateDiversityFactor(circuit.loadType);
        
        // Estimate cable size (use default 25m if not specified)
        const cableSize = circuit.cableLength 
          ? estimateCableSize(Ib, circuit.cableLength)
          : estimateCableSize(Ib, 25); // Default assumption for estimation
        
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
  }, [voltage]); // Only recalculate when voltage changes

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Project Info
        return projectName.trim() !== '' && location.trim() !== '';
      case 1: // Supply Details
        return voltage > 0 && ze > 0;
      case 2: // Circuits
        return circuits.length > 0 && circuits.every(c => c.name && c.loadPower); // cableLength is optional
      case 3: // Installation Details
        return true; // Optional step - can skip
      case 4: // Pre-Calculation
        // Check for validation errors
        const hasErrors = circuits.some(c => {
          const validation = validateCircuit(c, voltage, earthingSystem);
          return !validation.isValid;
        });
        return !hasErrors;
      case 5: // Review
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error('Please complete all required fields');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
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
        toast.error('Failed to clear cache', {
          description: result.error
        });
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

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* Step Content */}
      <Card className="p-2.5 sm:p-4 md:p-6">
        {currentStep === 0 && (
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
        )}

        {currentStep === 1 && (
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
        )}

        {currentStep === 2 && (
          <CircuitBuilderStep
            circuits={circuits}
            setCircuits={setCircuits}
            installationType={installationType}
          />
        )}

        {/* Step 4: Installation Details */}
        {currentStep === 3 && (
          <InstallationDetailsStep 
            circuits={circuits}
            onUpdate={setCircuits}
          />
        )}

        {/* Step 5: Pre-Calculation & Validation */}
        {currentStep === 4 && (
          <PreCalculationStep 
            circuits={circuits}
            voltage={voltage}
            earthingSystem={earthingSystem}
          />
        )}

        {/* Step 6: Review */}
        {currentStep === 5 && (
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
        )}
      </Card>

      {/* Navigation */}
      <div className="mt-6 pb-safe">
        <Card className="p-2.5 sm:p-4 shadow-sm border-t-2 border-primary/20 sticky bottom-0 sm:static">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isProcessing}
              className="gap-2 touch-manipulation min-h-[44px] sm:min-h-[40px]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            
            <div className="hidden sm:flex flex-1 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground w-full">
                Step {currentStep + 1} of {STEPS.length}
              </p>
            </div>

            {currentStep < STEPS.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isProcessing}
                className="gap-1.5 sm:gap-2 touch-manipulation min-h-[44px] sm:min-h-[40px] text-sm sm:text-base"
              >
                <span className="hidden sm:inline">
                  {currentStep === 2 ? 'Configure Installation' : currentStep === 3 ? 'Validate Design' : 'Next'}
                </span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleGenerate}
                disabled={!canProceed() || isProcessing}
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 touch-manipulation min-h-[44px] w-full sm:w-auto"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span className="hidden sm:inline">Generating Design...</span>
                    <span className="sm:hidden">Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span className="hidden sm:inline">Generate Optimized Design ⚡</span>
                    <span className="sm:hidden">Generate ⚡</span>
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
