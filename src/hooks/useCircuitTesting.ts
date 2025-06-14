
import { useState, useCallback } from 'react';
import { CircuitTestSession, CircuitTestResult } from '@/types/circuit-testing';
import { comprehensiveCircuitTestFlow } from '@/data/inspection-testing/circuitTestFlow';

interface UseCircuitTestingReturn {
  session: CircuitTestSession | null;
  startSession: (installationDetails: any, technician: any) => void;
  recordResult: (stepId: string, result: Omit<CircuitTestResult, 'stepId' | 'timestamp'>) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeSession: () => void;
}

export const useCircuitTesting = (): UseCircuitTestingReturn => {
  const [session, setSession] = useState<CircuitTestSession | null>(null);

  const startSession = useCallback((installationDetails: any, technician: any) => {
    console.log('Starting circuit testing session...');
    
    const newSession: CircuitTestSession = {
      id: `circuit-session-${Date.now()}`,
      flowId: comprehensiveCircuitTestFlow.id,
      startTime: new Date(),
      steps: comprehensiveCircuitTestFlow.steps,
      results: [],
      currentStepIndex: 0,
      status: 'in-progress',
      installationDetails: {
        location: installationDetails?.location || 'Not specified',
        installationType: installationDetails?.type || 'Domestic',
        description: installationDetails?.description || 'Circuit testing'
      },
      technician: {
        name: technician?.name || 'Technician',
        qualifications: technician?.qualifications || 'Qualified Electrician',
        company: technician?.company || 'Electrical Company'
      }
    };

    setSession(newSession);
    console.log('Circuit testing session started:', newSession);
  }, []);

  const recordResult = useCallback((stepId: string, result: Omit<CircuitTestResult, 'stepId' | 'timestamp'>) => {
    if (!session) {
      console.warn('No active session to record result');
      return;
    }

    console.log('Recording result for step:', stepId, result);

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
  }, [session]);

  const nextStep = useCallback(() => {
    if (!session) return;

    setSession(prev => {
      if (!prev || prev.currentStepIndex >= prev.steps.length - 1) return prev;
      
      return {
        ...prev,
        currentStepIndex: prev.currentStepIndex + 1
      };
    });
  }, [session]);

  const previousStep = useCallback(() => {
    if (!session) return;

    setSession(prev => {
      if (!prev || prev.currentStepIndex <= 0) return prev;
      
      return {
        ...prev,
        currentStepIndex: prev.currentStepIndex - 1
      };
    });
  }, [session]);

  const completeSession = useCallback(() => {
    if (!session) return;

    console.log('Completing circuit testing session');
    
    setSession(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        endTime: new Date(),
        status: 'completed'
      };
    });
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
