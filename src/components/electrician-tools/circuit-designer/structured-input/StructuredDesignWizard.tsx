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
import { DesignVisionUpload, type VisionExtractionResult } from '../DesignVisionUpload';
import { floorPlanToCircuitSuggestions, scheduleToCircuits } from '../vision-to-wizard';

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

  // ── Vision input ─────────────────────────────────────────────────────
  // The vision picker (file upload + scope-paste) lives on the Circuits
  // step (step 3). This handler receives the extraction result from there
  // and pushes the right state into the wizard — installation type, supply
  // hints, location, and the suggested circuits list.
  const handleVisionExtracted = (result: VisionExtractionResult) => {
    const e: any = result.extraction ?? {};
    if (result.kind === 'floor-plan') {
      // Building type → installation type heuristic.
      const bt = String(e.buildingType ?? '').toLowerCase();
      if (
        /office|shop|reception|retail|kitchen|restaurant|cafe|bar|salon|clinic|gym|hotel|warehouse(?!.*industrial)/.test(
          bt
        )
      ) {
        setInstallationType('commercial');
      } else if (/factory|industrial|workshop|production/.test(bt)) {
        setInstallationType('industrial');
      } else if (/house|flat|residential|domestic|apartment|bungalow/.test(bt)) {
        setInstallationType('domestic');
      }
      // CU position → wizard location field if blank.
      const cuRoom = e?.cuPosition?.roomName;
      if (cuRoom && !location.trim()) setLocation(cuRoom);
      // Suggest circuits — appended to whatever's already in the list.
      const suggestions = floorPlanToCircuitSuggestions(e);
      if (suggestions.length > 0) {
        setCircuits([...circuits, ...suggestions]);
        toast.success(
          `${suggestions.length} circuit${suggestions.length === 1 ? '' : 's'} added from floor plan`,
          {
            description: 'Review each one and edit as needed before generating.',
            duration: 6000,
          }
        );
      }
      return;
    }

    if (result.kind === 'schedule') {
      // Schedule extractions carry supply hints — apply where present.
      if (typeof e.supplyVoltage === 'number') setVoltage(e.supplyVoltage);
      if (e.supplyPhases === 'single' || e.supplyPhases === 'three') setPhases(e.supplyPhases);
      if (typeof e.ze === 'number') setZe(e.ze);
      if (typeof e.mainSwitchRating === 'number') setMainSwitchRating(e.mainSwitchRating);
      // Map circuits 1:1 — appended to the existing list.
      const mapped = scheduleToCircuits(e);
      if (mapped.length > 0) {
        setCircuits([...circuits, ...mapped]);
        toast.success(
          `${mapped.length} circuit${mapped.length === 1 ? '' : 's'} imported from schedule`,
          {
            description: 'Verify cable + protection sizes before generating.',
            duration: 6000,
          }
        );
      }
      return;
    }

    if (result.kind === 'bom') {
      const items = Array.isArray(e.items) ? e.items.length : 0;
      toast.message('BoQ recorded', {
        description: `${items} line items extracted. These are reference for the cost engineer step. Add circuits manually below.`,
      });
      return;
    }

    if (result.kind === 'photo') {
      const findings = Array.isArray(e.findings) ? e.findings.length : 0;
      toast.message('Photo notes captured', {
        description: `${findings} finding${findings === 1 ? '' : 's'}. Informational only, no auto-fill applied.`,
      });
      return;
    }
  };

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
            onVisionExtracted={handleVisionExtracted}
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

  const totalKw =
    circuits.reduce((sum, c) => sum + (typeof c.loadPower === 'number' ? c.loadPower : 0), 0) /
    1000;
  const supplyLabel = phases === 'three' ? `${voltage}V three phase` : `${voltage}V single phase`;
  const summaryRows: { label: string; value: string; missing?: boolean }[] = [
    { label: 'Project', value: projectName.trim() || 'Not set', missing: !projectName.trim() },
    { label: 'Location', value: location.trim() || 'Not set', missing: !location.trim() },
    {
      label: 'Installation',
      value: installationType.charAt(0).toUpperCase() + installationType.slice(1),
    },
    { label: 'Supply', value: supplyLabel },
    { label: 'Earthing', value: `${earthingSystem}, Ze ${ze} Ω` },
    { label: 'Main switch', value: mainSwitchRating ? `${mainSwitchRating}A` : 'Auto' },
    {
      label: 'Circuits',
      value:
        circuits.length > 0
          ? `${circuits.length}${totalKw > 0 ? ` · ${totalKw.toFixed(2)} kW` : ''}`
          : 'None yet',
      missing: circuits.length === 0,
    },
  ];

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="space-y-6">
      {/* Step indicator: plain sentence plus a segmented bar. Earlier steps
          are tappable to go back. */}
      <nav aria-label="Design steps" className="space-y-2">
        <p className="text-[14px] text-white">
          <span className="font-semibold">
            Step {currentStep + 1} of {STEPS.length}
          </span>{' '}
          · {STEPS[currentStep].label}
        </p>
        <ol className="grid grid-cols-6 gap-1.5">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  disabled={!isCompleted}
                  onClick={() => isCompleted && handleStepClick(index)}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${index + 1}: ${step.label}${isCompleted ? ' (done)' : ''}`}
                  className={cn(
                    'group flex h-11 w-full flex-col justify-center gap-1.5 text-left touch-manipulation sm:h-auto sm:min-h-[44px] sm:justify-start sm:pt-1',
                    isCompleted ? 'cursor-pointer' : 'cursor-default'
                  )}
                >
                  <span
                    className={cn(
                      'block h-1 w-full rounded-full transition-colors',
                      isActive || isCompleted ? 'bg-elec-yellow' : 'bg-white/[0.12]',
                      isCompleted && 'group-hover:bg-elec-yellow/80'
                    )}
                  />
                  <span
                    className={cn(
                      'hidden truncate text-[13px] text-white sm:block',
                      isActive ? 'font-semibold' : 'font-normal'
                    )}
                  >
                    {step.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:gap-10">
        <div className="space-y-6 min-w-0">
          {/* Step content */}
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

          {/* Navigation: sticky on a phone so the primary action stays in reach */}
          <div className="pb-safe">
            <div className="sticky bottom-0 z-30 -mx-4 border-t border-white/[0.08] bg-elec-dark/95 px-4 py-3 backdrop-blur-sm sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pt-5 sm:backdrop-blur-none">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0 || isProcessing}
                  className={cn(
                    'inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4',
                    'text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08]',
                    'disabled:cursor-not-allowed disabled:opacity-40',
                    'touch-manipulation active:scale-[0.98]'
                  )}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <span className="text-[13px] tabular-nums text-white sm:hidden">
                  {currentStep + 1} of {STEPS.length}
                </span>

                {!isLastStep ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed() || isProcessing}
                    className={cn(
                      'inline-flex h-11 items-center gap-2 rounded-xl px-6',
                      'bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90',
                      'disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white',
                      'touch-manipulation active:scale-[0.98]'
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
                      'inline-flex h-11 items-center gap-2 rounded-xl px-6',
                      'bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90',
                      'disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white',
                      'touch-manipulation active:scale-[0.98]'
                    )}
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                        <span>Generating</span>
                      </>
                    ) : (
                      <>
                        <span>Generate design</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: what has been entered so far, and where each step stands */}
        <aside className="hidden lg:block lg:sticky lg:top-24">
          <div className="rounded-2xl border border-white/[0.10] bg-[hsl(0_0%_10%)] p-5">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">Design so far</h3>
            <dl className="mt-3 divide-y divide-white/[0.08]">
              {summaryRows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="shrink-0 text-[13px] text-white">{row.label}</dt>
                  <dd
                    className={cn(
                      'min-w-0 truncate text-right text-[14px] tabular-nums text-white',
                      row.missing ? 'font-normal' : 'font-medium'
                    )}
                    title={row.value}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">Steps</h3>
            <ol className="mt-2 divide-y divide-white/[0.08]">
              {STEPS.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      disabled={!isCompleted}
                      onClick={() => isCompleted && handleStepClick(index)}
                      className={cn(
                        'flex min-h-[44px] w-full items-center justify-between gap-3 text-left touch-manipulation',
                        isCompleted ? 'cursor-pointer hover:bg-white/[0.03]' : 'cursor-default'
                      )}
                    >
                      <span className="min-w-0">
                        <span
                          className={cn(
                            'block text-[14px] text-white',
                            isActive ? 'font-semibold' : 'font-normal'
                          )}
                        >
                          {step.label}
                        </span>
                        <span className="block text-[12px] text-white">{step.description}</span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-[13px] font-medium',
                          isCompleted
                            ? 'text-emerald-400'
                            : isActive
                              ? 'text-elec-yellow'
                              : 'text-white'
                        )}
                      >
                        {isCompleted ? 'Done' : isActive ? 'Now' : 'To do'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>
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
