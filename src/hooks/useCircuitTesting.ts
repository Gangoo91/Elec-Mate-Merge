
import { useState, useCallback } from 'react';
import { CircuitTestSession, CircuitTestResult } from '@/types/circuit-testing';
import { comprehensiveCircuitTestFlow } from '@/data/inspection-testing/circuitTestFlow';

export const useCircuitTesting = () => {
  const [session, setSession] = useState<CircuitTestSession | null>(null);

  const startSession = useCallback((installationDetails: any, technician: any) => {
    const newSession: CircuitTestSession = {
      id: `circuit-test-${Date.now()}`,
      flowId: comprehensiveCircuitTestFlow.id,
      startTime: new Date(),
      steps: comprehensiveCircuitTestFlow.steps,
      results: [],
      currentStepIndex: 0,
      status: 'in-progress',
      installationDetails,
      technician
    };

    setSession(newSession);
    console.log('Circuit testing session started:', newSession);
  }, []);

  const recordResult = useCallback((stepId: string, result: Omit<CircuitTestResult, 'stepId' | 'timestamp'>) => {
    if (!session) return;

    const newResult: CircuitTestResult = {
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

    console.log('Test result recorded:', newResult);
  }, [session]);

  const nextStep = useCallback(() => {
    if (!session) return;

    setSession(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        currentStepIndex: Math.min(prev.currentStepIndex + 1, prev.steps.length - 1)
      };
    });
  }, [session]);

  const previousStep = useCallback(() => {
    if (!session) return;

    setSession(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        currentStepIndex: Math.max(prev.currentStepIndex - 1, 0)
      };
    });
  }, [session]);

  const completeSession = useCallback(() => {
    if (!session) return;

    setSession(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        endTime: new Date(),
        status: 'completed'
      };
    });

    console.log('Circuit testing session completed');
  }, [session]);

  return {
    session,
    startSession,
    recordResult,
    nextStep,
    previousStep,
    completeSession
  };
};
