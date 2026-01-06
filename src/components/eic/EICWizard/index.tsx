/**
 * EICWizard - Progressive Disclosure Wizard for Electrical Installation Certificate
 *
 * Mobile-first, best-in-class multi-step form with AI features
 * Follows same pattern as EICR wizard for consistency
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Zap,
  Camera,
  ClipboardList,
  FileCheck,
  PenTool,
  CheckCircle,
  Check,
  Save,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEICWizardState, EICWizardStep } from './hooks/useEICWizardState';

// Step components
import { ClientStep } from './steps/ClientStep';
import { InstallationStep } from './steps/InstallationStep';
import { BoardScanStep } from './steps/BoardScanStep';
import { CircuitsStep } from './steps/CircuitsStep';
import { InspectionsStep } from './steps/InspectionsStep';
import { DeclarationsStep } from './steps/DeclarationsStep';
import { ReviewStep } from './steps/ReviewStep';

interface EICWizardProps {
  certificateId?: string;
  initialData?: any;
  onSave?: (data: any) => void;
  onComplete?: (data: any) => void;
  onClose?: () => void;
}

// Step definitions - Inspections before Testing per BS7671 workflow
const WIZARD_STEPS: EICWizardStep[] = [
  {
    id: 'client',
    label: 'Client',
    description: 'Client & property details',
    validate: (data) => Boolean(data.clientName && data.installationAddress),
  },
  {
    id: 'installation',
    label: 'Installation',
    description: 'Supply & earthing details',
    validate: (data) => Boolean(data.phases && data.earthingArrangement),
  },
  {
    id: 'inspections',
    label: 'Inspections',
    description: 'BS7671 inspection checklist',
  },
  {
    id: 'board-scan',
    label: 'Board Scan',
    description: 'AI-powered circuit detection',
    isOptional: true,
  },
  {
    id: 'circuits',
    label: 'Testing',
    description: 'Schedule of test results',
    validate: (data) => data.circuits?.length > 0,
  },
  {
    id: 'declarations',
    label: 'Declarations',
    description: 'Signatures & certification',
    validate: (data) =>
      Boolean(data.designerSignature && data.constructorSignature && data.inspectorSignature),
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Review & complete',
  },
];

// Step icons
const STEP_ICONS: Record<string, React.ElementType> = {
  client: User,
  installation: Zap,
  'board-scan': Camera,
  circuits: ClipboardList,
  inspections: FileCheck,
  declarations: PenTool,
  review: CheckCircle,
};

// Step indicator component
const StepIndicator: React.FC<{
  steps: EICWizardStep[];
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick?: (step: number) => void;
  isMobile?: boolean;
}> = ({ steps, currentStep, completedSteps, onStepClick, isMobile }) => {
  if (isMobile) {
    // Mobile: Compact dot indicators
    return (
      <div className="flex items-center justify-center gap-1.5 py-2">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.has(index);
          return (
            <button
              key={step.id}
              onClick={() => onStepClick?.(index)}
              className={cn(
                'h-2 rounded-full transition-all touch-manipulation',
                isActive ? 'w-6 bg-elec-yellow' : 'w-2',
                isCompleted && !isActive && 'bg-green-500',
                !isCompleted && !isActive && 'bg-muted-foreground/30'
              )}
            />
          );
        })}
      </div>
    );
  }

  // Desktop: Full step labels
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {steps.map((step, index) => {
        const Icon = STEP_ICONS[step.id] || Zap;
        const isActive = index === currentStep;
        const isCompleted = completedSteps.has(index);
        return (
          <button
            key={step.id}
            onClick={() => onStepClick?.(index)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap',
              'hover:bg-muted/50 touch-manipulation',
              isActive && 'bg-elec-yellow/10 text-elec-yellow',
              isCompleted && !isActive && 'text-green-500',
              !isCompleted && !isActive && 'text-muted-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{step.label}</span>
            {isCompleted && <CheckCircle className="h-3.5 w-3.5" />}
          </button>
        );
      })}
    </div>
  );
};

export const EICWizard: React.FC<EICWizardProps> = ({
  certificateId,
  initialData,
  onSave,
  onComplete,
  onClose,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize wizard state with persistence
  const {
    currentStep,
    currentStepConfig,
    data,
    completedSteps,
    isCurrentStepValid,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    skipStep,
    updateData,
    progress,
    complete,
    reset,
  } = useEICWizardState({
    steps: WIZARD_STEPS,
    persistKey: certificateId ? `eic-wizard-${certificateId}` : 'eic-wizard-new',
    onComplete: (finalData) => {
      onComplete?.(finalData);
    },
  });

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      updateData(initialData);
    }
  }, [initialData]);

  // Handle close with confirmation
  const handleClose = useCallback(() => {
    if (Object.keys(data).length > 0) {
      setShowExitDialog(true);
    } else {
      onClose?.();
      navigate(-1);
    }
  }, [data, onClose, navigate]);

  // Handle save
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    haptic.medium();
    try {
      await onSave?.(data);
      haptic.success();
    } catch (error) {
      console.error('Save failed:', error);
      haptic.warning();
    } finally {
      setIsSaving(false);
    }
  }, [data, onSave, haptic]);

  // Handle next with haptic
  const handleNext = useCallback(() => {
    haptic.light();
    nextStep();
  }, [nextStep, haptic]);

  // Handle prev with haptic
  const handlePrev = useCallback(() => {
    haptic.light();
    prevStep();
  }, [prevStep, haptic]);

  // Handle complete
  const handleComplete = useCallback(() => {
    haptic.success();
    complete();
  }, [complete, haptic]);

  // Render current step content
  const renderStepContent = () => {
    const stepProps = {
      data,
      onChange: updateData,
      isMobile,
    };

    switch (currentStepConfig?.id) {
      case 'client':
        return <ClientStep {...stepProps} />;
      case 'installation':
        return <InstallationStep {...stepProps} />;
      case 'board-scan':
        return <BoardScanStep {...stepProps} onSkip={skipStep} />;
      case 'circuits':
        return <CircuitsStep {...stepProps} />;
      case 'inspections':
        return <InspectionsStep {...stepProps} />;
      case 'declarations':
        return <DeclarationsStep {...stepProps} />;
      case 'review':
        return (
          <ReviewStep
            {...stepProps}
            onGoToStep={goToStep}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  // Check if current step needs full-page layout (no container)
  const isFullPageStep = currentStepConfig?.id === 'inspections' || currentStepConfig?.id === 'circuits';

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex flex-col bg-background",
      !isFullPageStep && "overflow-hidden"
    )}>
      {/* Header - Ultra compact for full-page steps */}
      <header className={cn(
        "z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0",
        isFullPageStep ? "border-b-0" : "border-b border-border"
      )}>
        {isFullPageStep ? (
          /* Minimal header for full-page steps */
          <div className="px-2 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {WIZARD_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx === currentStep && "w-6 bg-elec-yellow",
                    completedSteps.has(idx) && idx !== currentStep && "bg-green-500",
                    !completedSteps.has(idx) && idx !== currentStep && "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {currentStepConfig?.label}
            </span>
          </div>
        ) : (
          /* Full header for other steps */
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="gap-1 -ml-2"
              >
                <X className="h-4 w-4" />
                {!isMobile && <span>Close</span>}
              </Button>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-normal">
                  <Zap className="h-3 w-3 mr-1 text-elec-yellow" />
                  EIC
                </Badge>
                {!isFirstStep && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="gap-1"
                  >
                    <Save className="h-4 w-4" />
                    {!isMobile && (isSaving ? 'Saving...' : 'Save')}
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{currentStepConfig?.label}</span>
                <span className="text-muted-foreground">
                  Step {progress.current} of {progress.total}
                </span>
              </div>
              <Progress value={progress.percentage} className="h-1.5" />
            </div>

            <StepIndicator
              steps={WIZARD_STEPS}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={goToStep}
              isMobile={isMobile}
            />
          </div>
        )}
      </header>

      {/* Step content */}
      <main className={cn(
        "flex-1 min-h-0",
        isFullPageStep ? "flex flex-col" : "overflow-y-auto"
      )}>
        {isFullPageStep ? (
          /* Full-width steps: inspections and circuits (no container, edge-to-edge) */
          renderStepContent()
        ) : (
          /* Other steps: constrained width */
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-foreground">
                {currentStepConfig?.label}
              </h2>
              {currentStepConfig?.description && (
                <p className="text-sm text-muted-foreground">
                  {currentStepConfig.description}
                </p>
              )}
            </div>
            {renderStepContent()}
          </div>
        )}
      </main>

      {/* Navigation footer - ultra-compact for full-page steps */}
      {currentStepConfig?.id !== 'review' && (
        <footer className={cn(
          "z-30 pb-safe shrink-0",
          isFullPageStep
            ? "fixed bottom-2 left-2 right-2"
            : "sticky bottom-0 border-t border-border bg-background/95 backdrop-blur"
        )}>
          {isFullPageStep ? (
            /* Floating pill navigation for full-page steps */
            <div className="flex items-center justify-between gap-2 max-w-md mx-auto bg-background/95 backdrop-blur border border-border rounded-full px-2 py-1.5 shadow-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={isFirstStep}
                className={cn(
                  'h-8 w-8 p-0 rounded-full',
                  isFirstStep && 'invisible'
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="text-xs text-muted-foreground font-medium">
                {progress.current}/{progress.total}
              </span>

              {isLastStep ? (
                <Button
                  size="sm"
                  onClick={handleComplete}
                  className="h-8 px-4 rounded-full gap-1 bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-3 w-3" />
                  Done
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="h-8 px-4 rounded-full gap-1"
                >
                  Next
                  <ChevronRight className="h-3 w-3" />
                </Button>
              )}
            </div>
          ) : (
            /* Standard footer for other steps */
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={isFirstStep}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {!isMobile && 'Back'}
                </Button>

                <div className="flex items-center gap-2">
                  {currentStepConfig?.isOptional && (
                    <Button variant="ghost" onClick={skipStep} className="text-muted-foreground">
                      Skip
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    {!isMobile && (isLastStep ? 'Review' : 'Next')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </footer>
      )}

      {/* Exit confirmation dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Do you want to save before leaving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                reset();
                onClose?.();
                navigate(-1);
              }}
            >
              Discard
            </AlertDialogAction>
            <AlertDialogAction
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={async () => {
                await handleSave();
                onClose?.();
                navigate(-1);
              }}
            >
              Save & Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EICWizard;
