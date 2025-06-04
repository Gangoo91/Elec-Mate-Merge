
import { useState, useCallback, useEffect } from 'react';
import { TestFlow, TestSession, TestResult, TestStatus } from '@/types/inspection-testing';

interface TestFlowEngineHook {
  session: TestSession | null;
  currentStep: any;
  currentStepIndex: number;
  currentStepResult: TestResult | undefined;
  progress: number;
  isLastStep: boolean;
  isFirstStep: boolean;
  isSessionActive: boolean;
  startSession: (installationDetails: any, technician: any) => void;
  recordResult: (stepId: string, result: Omit<TestResult, 'stepId' | 'timestamp'>) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeSession: () => TestSession | null;
  pauseSession: () => void;
  resumeSession: () => void;
}

export const useTestFlowEngine = (testFlow: TestFlow | null): TestFlowEngineHook => {
  const [session, setSession] = useState<TestSession | null>(null);
  const [filteredSteps, setFilteredSteps] = useState<any[]>([]);

  // Update filtered steps when session changes
  useEffect(() => {
    if (!testFlow || !session) {
      setFilteredSteps(testFlow?.steps || []);
      return;
    }

    // For comprehensive testing, filter steps based on supply type selection
    if (testFlow.isComprehensive) {
      const supplyTypeResult = session.results.find(r => r.stepId === 'safe-isolation-selection');
      
      if (supplyTypeResult?.notes === 'single-phase') {
        // Filter out three-phase isolation step
        const filtered = testFlow.steps.filter(step => step.id !== 'safe-isolation-three-phase');
        setFilteredSteps(filtered);
      } else if (supplyTypeResult?.notes === 'three-phase') {
        // Filter out single-phase isolation step
        const filtered = testFlow.steps.filter(step => step.id !== 'safe-isolation-single-phase');
        setFilteredSteps(filtered);
      } else {
        // No selection made yet, show all steps
        setFilteredSteps(testFlow.steps);
      }
    } else {
      setFilteredSteps(testFlow.steps);
    }
  }, [testFlow, session]);

  const currentStep = filteredSteps[session?.currentStepIndex || 0];
  const currentStepIndex = session?.currentStepIndex || 0;
  const totalSteps = filteredSteps.length;
  
  const currentStepResult = session?.results.find(
    result => result.stepId === currentStep?.id
  );

  const progress = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const isFirstStep = currentStepIndex === 0;
  const isSessionActive = session?.status === 'in-progress';

  const startSession = useCallback((installationDetails: any, technician: any) => {
    if (!testFlow) return;

    const newSession: TestSession = {
      id: `session-${Date.now()}`,
      flowId: testFlow.id,
      installationDetails,
      technician,
      currentStepIndex: 0,
      results: [],
      startTime: new Date(),
      status: 'in-progress',
      isComprehensive: testFlow.isComprehensive
    };

    setSession(newSession);
    console.log('Session started:', newSession);
  }, [testFlow]);

  const recordResult = useCallback((stepId: string, result: Omit<TestResult, 'stepId' | 'timestamp'>) => {
    if (!session) return;

    const newResult: TestResult = {
      ...result,
      stepId,
      timestamp: new Date()
    };

    setSession(prev => {
      if (!prev) return null;

      const existingIndex = prev.results.findIndex(r => r.stepId === stepId);
      const updatedResults = [...prev.results];

      if (existingIndex >= 0) {
        updatedResults[existingIndex] = newResult;
      } else {
        updatedResults.push(newResult);
      }

      return {
        ...prev,
        results: updatedResults
      };
    });

    console.log('Result recorded:', newResult);
  }, [session]);

  const nextStep = useCallback(() => {
    if (!session || isLastStep) return;

    setSession(prev => {
      if (!prev) return null;
      
      let nextIndex = prev.currentStepIndex + 1;

      // For comprehensive testing with supply type selection
      if (testFlow?.isComprehensive && prev.currentStepIndex === 0) {
        const supplyTypeResult = prev.results.find(r => r.stepId === 'safe-isolation-selection');
        
        if (supplyTypeResult?.notes === 'single-phase') {
          // Skip to single-phase isolation (step index 1)
          nextIndex = 1;
        } else if (supplyTypeResult?.notes === 'three-phase') {
          // Skip to three-phase isolation (step index 2)  
          nextIndex = 2;
        }
      }

      return {
        ...prev,
        currentStepIndex: Math.min(nextIndex, filteredSteps.length - 1)
      };
    });
  }, [session, isLastStep, testFlow, filteredSteps]);

  const previousStep = useCallback(() => {
    if (!session || isFirstStep) return;

    setSession(prev => {
      if (!prev) return null;

      let prevIndex = prev.currentStepIndex - 1;

      // Handle going back from isolation steps to selection
      if (testFlow?.isComprehensive && (
        filteredSteps[prev.currentStepIndex]?.id === 'safe-isolation-single-phase' ||
        filteredSteps[prev.currentStepIndex]?.id === 'safe-isolation-three-phase'
      )) {
        prevIndex = 0; // Go back to selection step
      }

      return {
        ...prev,
        currentStepIndex: Math.max(prevIndex, 0)
      };
    });
  }, [session, isFirstStep, testFlow, filteredSteps]);

  const completeSession = useCallback(() => {
    if (!session) return null;

    const completedSession = {
      ...session,
      endTime: new Date(),
      status: 'completed' as TestStatus
    };

    setSession(completedSession);
    console.log('Session completed:', completedSession);
    return completedSession;
  }, [session]);

  const pauseSession = useCallback(() => {
    if (!session) return;

    setSession(prev => prev ? { ...prev, status: 'pending' as TestStatus } : null);
  }, [session]);

  const resumeSession = useCallback(() => {
    if (!session) return;

    setSession(prev => prev ? { ...prev, status: 'in-progress' as TestStatus } : null);
  }, [session]);

  return {
    session,
    currentStep,
    currentStepIndex,
    currentStepResult,
    progress,
    isLastStep,
    isFirstStep,
    isSessionActive,
    startSession,
    recordResult,
    nextStep,
    previousStep,
    completeSession,
    pauseSession,
    resumeSession
  };
};
