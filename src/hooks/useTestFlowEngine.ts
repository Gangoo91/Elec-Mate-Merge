
import { useState, useCallback } from 'react';
import { TestFlow, TestSession, TestStep, TestResult } from '@/types/inspection-testing';

export const useTestFlowEngine = (testFlow: TestFlow) => {
  const [session, setSession] = useState<TestSession | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = session?.steps[currentStepIndex] || null;
  const currentStepResult = session?.results.find(r => r.stepId === currentStep?.id);
  const progress = session ? ((currentStepIndex + 1) / session.steps.length) * 100 : 0;
  const isLastStep = session ? currentStepIndex === session.steps.length - 1 : false;
  const isFirstStep = currentStepIndex === 0;
  const isSessionActive = session?.status === 'in-progress';

  const startSession = useCallback((installationDetails: any, technician: any) => {
    const newSession: TestSession = {
      id: `session-${Date.now()}`,
      flowId: testFlow.id,
      startTime: new Date(),
      steps: testFlow.steps,
      results: [],
      installationType: installationDetails.installationType || 'domestic',
      location: installationDetails.address || 'Unknown location',
      currentStepIndex: 0,
      status: 'in-progress',
      isComprehensive: testFlow.isComprehensive,
      installationDetails,
      technician
    };

    setSession(newSession);
    setCurrentStepIndex(0);
  }, [testFlow]);

  const recordResult = useCallback((stepId: string, result: Omit<TestResult, 'stepId' | 'timestamp'>) => {
    setSession(prev => {
      if (!prev) return prev;

      const newResult: TestResult = {
        ...result,
        stepId,
        timestamp: new Date()
      };

      const existingResultIndex = prev.results.findIndex(r => r.stepId === stepId);
      const newResults = [...prev.results];
      
      if (existingResultIndex >= 0) {
        newResults[existingResultIndex] = newResult;
      } else {
        newResults.push(newResult);
      }

      return {
        ...prev,
        results: newResults
      };
    });
  }, []);

  const nextStep = useCallback(() => {
    setSession(prev => {
      if (!prev || currentStepIndex >= prev.steps.length - 1) return prev;
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      return {
        ...prev,
        currentStepIndex: newIndex
      };
    });
  }, [currentStepIndex]);

  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      setSession(prev => prev ? { ...prev, currentStepIndex: newIndex } : prev);
    }
  }, [currentStepIndex]);

  const completeSession = useCallback(() => {
    setSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        status: 'completed',
        endTime: new Date()
      };
    });
    return session;
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
    completeSession
  };
};
