import { useState, useCallback, useEffect } from 'react';

export interface WizardStep {
  id: string;
  label: string;
  description?: string;
  isOptional?: boolean;
  /** Validation function - returns true if step is complete */
  validate?: (data: any) => boolean;
}

interface UseWizardStateOptions {
  steps: WizardStep[];
  initialStep?: number;
  /** Persist state to localStorage */
  persistKey?: string;
  /** Callback when wizard completes */
  onComplete?: (data: any) => void;
}

interface WizardState {
  currentStep: number;
  completedSteps: Set<number>;
  visitedSteps: Set<number>;
  data: Record<string, any>;
}

/**
 * Custom hook for managing multi-step wizard state
 * Handles navigation, validation, and persistence
 */
export function useWizardState({
  steps,
  initialStep = 0,
  persistKey,
  onComplete,
}: UseWizardStateOptions) {
  // Initialize state from localStorage if persist key provided
  const getInitialState = (): WizardState => {
    if (persistKey && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(persistKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            completedSteps: new Set(parsed.completedSteps || []),
            visitedSteps: new Set(parsed.visitedSteps || []),
          };
        }
      } catch (e) {
        console.warn('Failed to load wizard state:', e);
      }
    }
    return {
      currentStep: initialStep,
      completedSteps: new Set<number>(),
      visitedSteps: new Set([initialStep]),
      data: {},
    };
  };

  const [state, setState] = useState<WizardState>(getInitialState);

  // Persist state changes
  useEffect(() => {
    if (persistKey && typeof window !== 'undefined') {
      const toSave = {
        ...state,
        completedSteps: Array.from(state.completedSteps),
        visitedSteps: Array.from(state.visitedSteps),
      };
      localStorage.setItem(persistKey, JSON.stringify(toSave));
    }
  }, [state, persistKey]);

  // Navigate to next step
  const nextStep = useCallback(() => {
    setState((prev) => {
      const currentStepConfig = steps[prev.currentStep];
      const isValid = currentStepConfig.validate
        ? currentStepConfig.validate(prev.data)
        : true;

      if (!isValid && !currentStepConfig.isOptional) {
        return prev;
      }

      const nextIndex = prev.currentStep + 1;
      if (nextIndex >= steps.length) {
        // Wizard complete
        onComplete?.(prev.data);
        return prev;
      }

      const newCompleted = new Set(prev.completedSteps);
      newCompleted.add(prev.currentStep);

      const newVisited = new Set(prev.visitedSteps);
      newVisited.add(nextIndex);

      return {
        ...prev,
        currentStep: nextIndex,
        completedSteps: newCompleted,
        visitedSteps: newVisited,
      };
    });
  }, [steps, onComplete]);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep <= 0) return prev;
      return {
        ...prev,
        currentStep: prev.currentStep - 1,
      };
    });
  }, []);

  // Go to specific step (only if visited or adjacent)
  const goToStep = useCallback(
    (stepIndex: number) => {
      setState((prev) => {
        // Can only navigate to visited steps or the next step
        if (
          !prev.visitedSteps.has(stepIndex) &&
          stepIndex !== prev.currentStep + 1
        ) {
          return prev;
        }

        const newVisited = new Set(prev.visitedSteps);
        newVisited.add(stepIndex);

        return {
          ...prev,
          currentStep: stepIndex,
          visitedSteps: newVisited,
        };
      });
    },
    []
  );

  // Update wizard data
  const updateData = useCallback(
    (updates: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => {
      setState((prev) => ({
        ...prev,
        data: typeof updates === 'function'
          ? updates(prev.data)
          : { ...prev.data, ...updates },
      }));
    },
    []
  );

  // Mark current step as complete
  const markStepComplete = useCallback((stepIndex?: number) => {
    setState((prev) => {
      const newCompleted = new Set(prev.completedSteps);
      newCompleted.add(stepIndex ?? prev.currentStep);
      return {
        ...prev,
        completedSteps: newCompleted,
      };
    });
  }, []);

  // Skip current step (for optional steps)
  const skipStep = useCallback(() => {
    const currentStepConfig = steps[state.currentStep];
    if (!currentStepConfig.isOptional) return;

    setState((prev) => {
      const nextIndex = prev.currentStep + 1;
      if (nextIndex >= steps.length) return prev;

      const newVisited = new Set(prev.visitedSteps);
      newVisited.add(nextIndex);

      return {
        ...prev,
        currentStep: nextIndex,
        visitedSteps: newVisited,
      };
    });
  }, [steps, state.currentStep]);

  // Reset wizard state
  const reset = useCallback(() => {
    setState({
      currentStep: 0,
      completedSteps: new Set(),
      visitedSteps: new Set([0]),
      data: {},
    });

    if (persistKey && typeof window !== 'undefined') {
      localStorage.removeItem(persistKey);
    }
  }, [persistKey]);

  // Calculate progress
  const progress = {
    current: state.currentStep + 1,
    total: steps.length,
    percent: ((state.currentStep + 1) / steps.length) * 100,
    completedCount: state.completedSteps.size,
  };

  // Navigation flags
  const canGoNext = state.currentStep < steps.length - 1;
  const canGoPrev = state.currentStep > 0;
  const isFirstStep = state.currentStep === 0;
  const isLastStep = state.currentStep === steps.length - 1;
  const currentStepConfig = steps[state.currentStep];

  // Check if step is valid
  const isCurrentStepValid = currentStepConfig?.validate
    ? currentStepConfig.validate(state.data)
    : true;

  return {
    // State
    currentStep: state.currentStep,
    currentStepConfig,
    data: state.data,
    completedSteps: state.completedSteps,
    visitedSteps: state.visitedSteps,
    progress,

    // Navigation
    nextStep,
    prevStep,
    goToStep,
    skipStep,
    reset,

    // Flags
    canGoNext,
    canGoPrev,
    isFirstStep,
    isLastStep,
    isCurrentStepValid,

    // Data management
    updateData,
    markStepComplete,
  };
}

export default useWizardState;
