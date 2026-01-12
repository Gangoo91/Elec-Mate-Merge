/**
 * useEICWizardState - State management for EIC Wizard
 *
 * Handles multi-step navigation, validation, and persistence
 * for the Electrical Installation Certificate wizard.
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { DistributionBoard } from '@/types/distributionBoard';

export interface EICWizardStep {
  id: string;
  label: string;
  description?: string;
  isOptional?: boolean;
  validate?: (data: any) => boolean;
}

interface UseEICWizardStateOptions {
  steps: EICWizardStep[];
  persistKey?: string;
  onComplete?: (data: any) => void;
}

interface EICWizardData {
  // Client Details
  clientName?: string;
  clientAddress?: string;
  clientPhone?: string;
  clientEmail?: string;

  // Installation Details
  installationAddress?: string;
  installationPostcode?: string;
  installationDate?: string;
  installationType?: string;
  constructionDate?: string;
  occupier?: string;
  description?: string;

  // Supply Characteristics
  supplyType?: string;
  supplyVoltage?: string;
  supplyFrequency?: string;
  phases?: string;
  earthingArrangement?: string;

  // Supply Details
  mainProtectiveDevice?: string;
  mainSwitchRating?: string;
  mainSwitchBsEn?: string;
  mainSwitchLocation?: string;
  distributionBoardLocation?: string;  // Legacy field for single board
  externalLoopImpedance?: string;
  prospectiveFaultCurrent?: string;

  // Distribution Boards (multi-board support)
  distributionBoards?: DistributionBoard[];

  // Earthing Details
  earthElectrodeType?: string;
  earthElectrodeResistance?: string;
  mainEarthingConductor?: string;
  mainEarthingConductorSize?: string;
  mainBondingConductor?: string;
  mainBondingConductorSize?: string;

  // Circuits (Schedule of Test Results)
  circuits?: any[];

  // Schedule of Inspections
  inspectionItems?: any[];
  inspectionSections?: Record<string, boolean>;

  // Observations
  observations?: any[];

  // Declarations
  designerName?: string;
  designerQualifications?: string;
  designerCompany?: string;
  designerDate?: string;
  designerSignature?: string;

  constructorName?: string;
  constructorQualifications?: string;
  constructorCompany?: string;
  constructorDate?: string;
  constructorSignature?: string;

  inspectorName?: string;
  inspectorQualifications?: string;
  inspectorCompany?: string;
  inspectorDate?: string;
  inspectorSignature?: string;

  // Certificate details
  certificateNumber?: string;
  nextInspectionDate?: string;

  // Meta
  status?: string;
  createdAt?: string;
  updatedAt?: string;

  [key: string]: any;
}

export function useEICWizardState(options: UseEICWizardStateOptions) {
  const { steps, persistKey, onComplete } = options;

  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<EICWizardData>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [skippedSteps, setSkippedSteps] = useState<Set<number>>(new Set());

  // Load persisted state
  useEffect(() => {
    if (persistKey) {
      try {
        const saved = localStorage.getItem(persistKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setData(parsed.data || {});
          setCurrentStep(parsed.currentStep || 0);
          setCompletedSteps(new Set(parsed.completedSteps || []));
          setSkippedSteps(new Set(parsed.skippedSteps || []));
        }
      } catch (e) {
        console.warn('Failed to load wizard state:', e);
      }
    }
  }, [persistKey]);

  // Persist state changes
  useEffect(() => {
    if (persistKey) {
      try {
        localStorage.setItem(persistKey, JSON.stringify({
          data,
          currentStep,
          completedSteps: Array.from(completedSteps),
          skippedSteps: Array.from(skippedSteps),
        }));
      } catch (e) {
        console.warn('Failed to persist wizard state:', e);
      }
    }
  }, [data, currentStep, completedSteps, skippedSteps, persistKey]);

  // Current step config
  const currentStepConfig = useMemo(() => steps[currentStep], [steps, currentStep]);

  // Validation
  const isCurrentStepValid = useMemo(() => {
    const step = steps[currentStep];
    if (!step?.validate) return true;
    return step.validate(data);
  }, [steps, currentStep, data]);

  // Navigation
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      // Mark current as completed if valid
      if (isCurrentStepValid) {
        setCompletedSteps(prev => new Set([...prev, currentStep]));
      }
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length, isCurrentStepValid]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  const skipStep = useCallback(() => {
    if (currentStepConfig?.isOptional) {
      setSkippedSteps(prev => new Set([...prev, currentStep]));
      nextStep();
    }
  }, [currentStep, currentStepConfig, nextStep]);

  // Data updates
  const updateData = useCallback((updates: Partial<EICWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const updateField = useCallback((field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Progress calculation
  const progress = useMemo(() => ({
    current: currentStep + 1,
    total: steps.length,
    percentage: Math.round(((currentStep + 1) / steps.length) * 100),
    completedCount: completedSteps.size,
  }), [currentStep, steps.length, completedSteps.size]);

  // Complete wizard
  const complete = useCallback(() => {
    if (onComplete) {
      onComplete(data);
    }
    // Clear persistence
    if (persistKey) {
      localStorage.removeItem(persistKey);
    }
  }, [data, onComplete, persistKey]);

  // Reset wizard
  const reset = useCallback(() => {
    setCurrentStep(0);
    setData({});
    setCompletedSteps(new Set());
    setSkippedSteps(new Set());
    if (persistKey) {
      localStorage.removeItem(persistKey);
    }
  }, [persistKey]);

  return {
    // State
    currentStep,
    currentStepConfig,
    data,
    completedSteps,
    skippedSteps,

    // Validation
    isCurrentStepValid,

    // Navigation
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    skipStep,

    // Data
    updateData,
    updateField,

    // Progress
    progress,

    // Actions
    complete,
    reset,
  };
}

export default useEICWizardState;
