import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DesignInputs, CircuitInput } from '@/types/installation-design';
import { ProjectInfoStep } from './ProjectInfoStep';
import { SupplyDetailsStep } from './SupplyDetailsStep';
import { CircuitBuilderStep } from './CircuitBuilderStep';
import { InstallationDetailsStep } from './InstallationDetailsStep';
import { PreCalculationStep } from './PreCalculationStep';
import { ReviewStep } from './ReviewStep';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { clearDesignCache } from '@/utils/clearDesignCache';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import {
  calculateDesignCurrent,
  suggestMCBRating,
  calculateDiversityFactor,
  estimateCableSize,
  validateCircuit,
} from '@/utils/circuit-calculations';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';

interface StructuredDesignWizardProps {
  onGenerate: (inputs: DesignInputs) => Promise<void>;
  isProcessing: boolean;
  initialData?: Partial<DesignInputs>;
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
}

const STEPS = [
  { id: 'project', label: 'Project', description: 'Basic details' },
  { id: 'supply', label: 'Supply', description: 'Electrical characteristics' },
  { id: 'circuits', label: 'Circuits', description: 'Add your circuits' },
  { id: 'install', label: 'Install', description: 'Per-circuit setup' },
  { id: 'validate', label: 'Validate', description: 'Pre-flight check' },
  { id: 'review', label: 'Review', description: 'Final check' },
] as const;

// Animation variants for step transitions
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0,
  }),
};

export const StructuredDesignWizard = ({
  onGenerate,
  isProcessing,
  initialData,
  customerId,
  onCustomerIdChange,
}: StructuredDesignWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showClearCacheDialog, setShowClearCacheDialog] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);

  // Project Info
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [electricianName, setElectricianName] = useState('');
  const [installationType, setInstallationType] = useState<
    'domestic' | 'commercial' | 'industrial'
  >('domestic');

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
  const [propertyAge, setPropertyAge] = useState<
    'new-build' | 'modern' | 'older' | 'very-old' | undefined
  >(undefined);

  // Circuits
  const [circuits, setCircuits] = useState<CircuitInput[]>([]);

  // Apply initial data when it changes (e.g., from imported context)
  useEffect(() => {
    if (initialData) {
      if (initialData.projectName) setProjectName(initialData.projectName);
      if (initialData.location) setLocation(initialData.location);
      if (initialData.clientName) setClientName(initialData.clientName);
      if (initialData.electricianName) setElectricianName(initialData.electricianName);
      if (initialData.propertyType) setInstallationType(initialData.propertyType);
      if (initialData.voltage) setVoltage(initialData.voltage);
      if (initialData.phases) setPhases(initialData.phases);
      if (initialData.ze) setZe(initialData.ze);
      if (initialData.earthingSystem) setEarthingSystem(initialData.earthingSystem);
      if (initialData.pscc) setPscc(initialData.pscc);
      if (initialData.ambientTemp) setAmbientTemp(initialData.ambientTemp);
      if (initialData.installationMethod) setInstallationMethod(initialData.installationMethod);
      if (initialData.groupingFactor) setGroupingFactor(initialData.groupingFactor);
      if (initialData.mainSwitchRating) setMainSwitchRating(initialData.mainSwitchRating);
      if (initialData.propertyAge) setPropertyAge(initialData.propertyAge);
      if (initialData.circuits && initialData.circuits.length > 0) {
        setCircuits(initialData.circuits);
      }
    }
  }, [initialData]);

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
      const updated = circuits.map((circuit) => {
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
      case 0:
        return projectName.trim() !== '' && location.trim() !== '';
      case 1:
        return voltage > 0 && ze > 0;
      case 2:
        return circuits.length > 0 && circuits.every((c) => c.name && c.loadPower);
      case 3:
        return true;
      case 4: {
        const hasErrors = circuits.some((c) => {
          const validation = validateCircuit(c, voltage, earthingSystem);
          return !validation.isValid;
        });
        return !hasErrors;
      }
      case 5:
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
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
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
          description: `Cleared ${result.cleared} cache table${result.cleared !== 1 ? 's' : ''}`,
        });
      } else {
        toast.error('Failed to clear cache', { description: result.error });
      }
    } catch (error) {
      toast.error('Cache clear failed', {
        description: error instanceof Error ? error.message : 'Unknown error',
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      installationMethod: installationMethod as any,
      groupingFactor,
      propertyAge,
      circuits,
      additionalPrompt: `Structured input design with ${circuits.length} circuits`,
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
            customerId={customerId}
            onCustomerIdChange={onCustomerIdChange}
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              installationMethod: installationMethod as any,
              groupingFactor,
              circuits,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Step Indicator */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <Eyebrow>
            STEP {String(currentStep + 1).padStart(2, '0')} · {STEPS[currentStep].label.toUpperCase()}
          </Eyebrow>
          <span className="text-[11px] text-white/50 tabular-nums">
            {currentStep + 1} of {STEPS.length}
          </span>
        </div>

        {/* Numbered step row — desktop/tablet */}
        <div className="hidden sm:grid grid-cols-6 gap-px bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isClickable = index < currentStep;
            return (
              <button
                key={step.id}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && handleStepClick(index)}
                className={cn(
                  'group relative bg-[hsl(0_0%_10%)] px-3 py-3 lg:px-4 lg:py-4 text-left touch-manipulation transition-all',
                  isClickable && 'hover:bg-elec-yellow/[0.04] active:scale-[0.99]',
                  isActive &&
                    'bg-gradient-to-br from-elec-yellow/[0.10] via-amber-500/[0.03] to-transparent'
                )}
              >
                <div
                  className={cn(
                    'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums',
                    isActive
                      ? 'text-elec-yellow'
                      : isCompleted
                        ? 'text-white/80'
                        : 'text-white/40'
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div
                  className={cn(
                    'mt-1 text-[12.5px] font-semibold leading-tight tracking-tight',
                    isActive
                      ? 'text-elec-yellow'
                      : isCompleted
                        ? 'text-white'
                        : 'text-white/40'
                  )}
                >
                  {step.label}
                </div>
                <div
                  className={cn(
                    'mt-0.5 text-[11px] leading-snug truncate',
                    isActive
                      ? 'text-white/85'
                      : isCompleted
                        ? 'text-white/60'
                        : 'text-white/30'
                  )}
                >
                  {step.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* Hairline progress */}
        <div className="h-px bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full bg-elec-yellow"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step Content — flat on mobile, editorial cell on tablet+ */}
      <div className="sm:bg-[hsl(0_0%_10%)] sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden">
        <div className="py-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Editorial Navigation — flat sticky on mobile, card on tablet+ */}
      <div className="pb-safe">
        <div className="sticky bottom-0 sm:static z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 sm:p-4 bg-elec-dark/95 backdrop-blur-sm sm:bg-[hsl(0_0%_10%)] sm:border sm:border-white/[0.08] sm:rounded-2xl border-t border-white/[0.06] sm:border-t">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0 || isProcessing}
              className={cn(
                'inline-flex items-center gap-2 h-11 px-4 rounded-xl text-[13px] font-medium',
                'bg-white/[0.03] border border-white/[0.08] text-white',
                'hover:bg-white/[0.06] hover:border-white/15 transition-colors',
                'disabled:opacity-30 disabled:cursor-not-allowed',
                'touch-manipulation'
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <div className="flex-1 flex justify-center">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/60 tabular-nums">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed() || isProcessing}
                className={cn(
                  'inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[13px] font-semibold',
                  'bg-elec-yellow text-black',
                  'hover:bg-elec-yellow/90 transition-colors',
                  'disabled:opacity-30 disabled:bg-white/[0.05] disabled:text-white/50 disabled:cursor-not-allowed',
                  'active:scale-[0.98] touch-manipulation'
                )}
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canProceed() || isProcessing}
                className={cn(
                  'inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[13px] font-semibold',
                  'bg-elec-yellow text-black',
                  'hover:bg-elec-yellow/90 transition-colors',
                  'disabled:opacity-30 disabled:bg-white/[0.05] disabled:text-white/50 disabled:cursor-not-allowed',
                  'active:scale-[0.98] touch-manipulation'
                )}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black/20 border-t-black" />
                    <span>Generating</span>
                  </>
                ) : (
                  <>
                    <span>Generate Design</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
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
