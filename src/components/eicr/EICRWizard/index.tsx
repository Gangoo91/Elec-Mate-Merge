/**
 * EICRWizard - Progressive Disclosure Certificate Creation
 *
 * Multi-step wizard replacing tabs for better mobile UX
 * Key features:
 * - AI board scanning as hero step
 * - Progressive disclosure of fields
 * - Touch-optimized navigation
 * - State persistence
 */

import React, { useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ProgressSteps, Step } from '@/components/ui/ProgressSteps';
import { useWizardState, WizardStep } from './hooks/useWizardState';
import { useOrientation } from '@/hooks/useOrientation';
import { ChevronLeft, ChevronRight, Check, Camera, User, Building, Zap, ClipboardCheck, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Step components
import { ClientStep } from './steps/ClientStep';
import { InstallationStep } from './steps/InstallationStep';
import { BoardScanStep } from './steps/BoardScanStep';
import { CircuitsStep } from './steps/CircuitsStep';
import { InspectionsStep } from './steps/InspectionsStep';
import { ReviewStep } from './steps/ReviewStep';
import { FaultFinderSheet } from './FaultFinderSheet';

interface EICRWizardProps {
  /** Initial form data */
  initialData?: any;
  /** Save handler */
  onSave: (data: any) => void;
  /** Complete handler */
  onComplete: (data: any) => void;
  /** Cancel handler */
  onCancel?: () => void;
  /** Certificate ID for persistence */
  certificateId?: string;
}

// Define wizard steps
const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'client',
    label: 'Client & Property',
    description: 'Enter client and property details',
    validate: (data) => !!(data.clientName && data.propertyAddress),
  },
  {
    id: 'installation',
    label: 'Installation Type',
    description: 'Specify installation characteristics',
    validate: (data) => !!(data.supplyType && data.earthingArrangement),
  },
  {
    id: 'board-scan',
    label: 'Board Scan',
    description: 'AI-powered circuit detection',
    isOptional: true,
  },
  {
    id: 'circuits',
    label: 'Circuits & Testing',
    description: 'Test results for each circuit',
    validate: (data) => data.circuits?.length > 0,
  },
  {
    id: 'inspections',
    label: 'Inspections',
    description: 'BS7671 inspection checklist',
    validate: (data) => {
      // Check if at least 50% of inspection items have been reviewed
      const items = data.inspectionItems || [];
      const completed = items.filter((i: any) => i.outcome && i.outcome !== '').length;
      return items.length > 0 && completed >= items.length * 0.5;
    },
  },
  {
    id: 'review',
    label: 'Review & Sign',
    description: 'Final review and signature',
    validate: (data) => !!data.inspectorSignature,
  },
];

// Map step IDs to icons
const STEP_ICONS: Record<string, typeof User> = {
  client: User,
  installation: Building,
  'board-scan': Camera,
  circuits: Zap,
  inspections: Search,
  review: ClipboardCheck,
};

/**
 * Main EICR Wizard Component
 */
export const EICRWizard: React.FC<EICRWizardProps> = ({
  initialData = {},
  onSave,
  onComplete,
  onCancel,
  certificateId,
}) => {
  const orientation = useOrientation();
  const isMobile = orientation.isMobile && !orientation.isLandscape;
  const [showFaultFinder, setShowFaultFinder] = React.useState(false);

  // Wizard state management
  const wizard = useWizardState({
    steps: WIZARD_STEPS,
    persistKey: certificateId ? `eicr-wizard-${certificateId}` : undefined,
    onComplete,
  });

  // Initialize with existing data
  React.useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      wizard.updateData(initialData);
    }
  }, []);

  // Auto-save on data changes
  React.useEffect(() => {
    const saveTimer = setTimeout(() => {
      onSave(wizard.data);
    }, 2000);
    return () => clearTimeout(saveTimer);
  }, [wizard.data, onSave]);

  // Progress steps with icons
  const progressSteps: Step[] = useMemo(
    () =>
      WIZARD_STEPS.map((step) => ({
        id: step.id,
        label: step.label,
        description: step.description,
        icon: STEP_ICONS[step.id],
      })),
    []
  );

  // Handle step click navigation
  const handleStepClick = useCallback(
    (index: number) => {
      wizard.goToStep(index);
    },
    [wizard]
  );

  // Render current step content
  const renderStepContent = () => {
    switch (wizard.currentStepConfig?.id) {
      case 'client':
        return (
          <ClientStep
            data={wizard.data}
            onChange={wizard.updateData}
            isMobile={isMobile}
          />
        );
      case 'installation':
        return (
          <InstallationStep
            data={wizard.data}
            onChange={wizard.updateData}
            isMobile={isMobile}
          />
        );
      case 'board-scan':
        return (
          <BoardScanStep
            data={wizard.data}
            onChange={wizard.updateData}
            onSkip={wizard.skipStep}
            isMobile={isMobile}
          />
        );
      case 'circuits':
        return (
          <CircuitsStep
            data={wizard.data}
            onChange={wizard.updateData}
            isMobile={isMobile}
          />
        );
      case 'inspections':
        return (
          <InspectionsStep
            data={wizard.data}
            onChange={wizard.updateData}
            isMobile={isMobile}
            onOpenFaultFinder={() => setShowFaultFinder(true)}
          />
        );
      case 'review':
        return (
          <ReviewStep
            data={wizard.data}
            onChange={wizard.updateData}
            onComplete={() => onComplete(wizard.data)}
            isMobile={isMobile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background overflow-hidden">
      {/* Header with progress */}
      <header className="shrink-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Mobile: Compact progress */}
          {isMobile ? (
            <ProgressSteps
              steps={progressSteps}
              currentStep={wizard.currentStep}
              completedSteps={wizard.completedSteps}
              compact
            />
          ) : (
            /* Desktop: Full progress */
            <ProgressSteps
              steps={progressSteps}
              currentStep={wizard.currentStep}
              completedSteps={wizard.completedSteps}
              onStepClick={handleStepClick}
            />
          )}
        </div>
      </header>

      {/* Step content */}
      <main className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
          {/* Step title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {wizard.currentStepConfig?.label}
            </h2>
            {wizard.currentStepConfig?.description && (
              <p className="text-muted-foreground mt-1">
                {wizard.currentStepConfig.description}
              </p>
            )}
          </div>

          {/* Step content */}
          {renderStepContent()}
        </div>
      </main>

      {/* Navigation footer */}
      <footer className="shrink-0 z-30 border-t border-border bg-background/95 backdrop-blur pb-safe">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Back button */}
            <Button
              variant="outline"
              onClick={wizard.prevStep}
              disabled={wizard.isFirstStep}
              className={cn(
                'h-12 gap-2',
                wizard.isFirstStep && 'invisible'
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            {/* Step indicator (mobile) */}
            {isMobile && (
              <span className="text-sm text-muted-foreground">
                {wizard.progress.current} / {wizard.progress.total}
              </span>
            )}

            {/* Next/Complete button */}
            {wizard.isLastStep ? (
              <Button
                onClick={() => onComplete(wizard.data)}
                disabled={!wizard.isCurrentStepValid}
                className="h-12 px-8 gap-2"
              >
                <Check className="h-4 w-4" />
                Complete Certificate
              </Button>
            ) : (
              <Button
                onClick={wizard.nextStep}
                disabled={!wizard.isCurrentStepValid && !wizard.currentStepConfig?.isOptional}
                className="h-12 gap-2"
              >
                <span className="hidden sm:inline">
                  {wizard.currentStepConfig?.isOptional ? 'Continue' : 'Next'}
                </span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Skip link for optional steps */}
          {wizard.currentStepConfig?.isOptional && (
            <div className="text-center mt-2">
              <button
                onClick={wizard.skipStep}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip this step
              </button>
            </div>
          )}
        </div>
      </footer>

      {/* AI Fault Finder Sheet */}
      <FaultFinderSheet
        open={showFaultFinder}
        onOpenChange={setShowFaultFinder}
      />
    </div>
  );
};

export default EICRWizard;
