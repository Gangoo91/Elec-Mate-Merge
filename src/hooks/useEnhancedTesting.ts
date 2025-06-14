
import { useState, useCallback } from 'react';
import { TestSession, TestFlow, TestResult } from '@/types/inspection-testing';

interface UseEnhancedTestingReturn {
  session: TestSession | null;
  startSession: (flow: TestFlow, installationDetails: any, technician: any) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  recordResult: (stepId: string, result: Omit<TestResult, 'stepId' | 'timestamp'>) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeSession: () => void;
  getCurrentStep: () => any;
  getStepProgress: () => { current: number; total: number; percentage: number };
}

export const useEnhancedTesting = (): UseEnhancedTestingReturn => {
  const [session, setSession] = useState<TestSession | null>(null);

  const startSession = useCallback((flow: TestFlow, installationDetails: any, technician: any) => {
    console.log('Starting enhanced testing session with flow:', flow.id);
    
    const newSession: TestSession = {
      id: `session-${Date.now()}`,
      flowId: flow.id,
      startTime: new Date(),
      steps: flow.steps,
      results: [],
      installationType: installationDetails?.type || 'Domestic',
      location: installationDetails?.location || 'Test Location',
      currentStepIndex: 0,
      status: 'in-progress',
      isComprehensive: flow.isComprehensive,
      installationDetails,
      technician
    };

    setSession(newSession);
    console.log('Enhanced testing session started:', newSession);
  }, []);

  const pauseSession = useCallback(() => {
    if (!session) return;
    
    console.log('Pausing testing session');
    setSession(prev => prev ? { ...prev, status: 'pending' } : null);
  }, [session]);

  const resumeSession = useCallback(() => {
    if (!session) return;
    
    console.log('Resuming testing session');
    setSession(prev => prev ? { ...prev, status: 'in-progress' } : null);
  }, [session]);

  const recordResult = useCallback((stepId: string, result: Omit<TestResult, 'stepId' | 'timestamp'>) => {
    if (!session) {
      console.warn('No active session to record result');
      return;
    }

    console.log('Recording result for step:', stepId, result);

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
  }, [session]);

  const nextStep = useCallback(() => {
    if (!session) return;

    setSession(prev => {
      if (!prev || (prev.currentStepIndex ?? 0) >= prev.steps.length - 1) return prev;
      
      return {
        ...prev,
        currentStepIndex: (prev.currentStepIndex ?? 0) + 1
      };
    });
  }, [session]);

  const previousStep = useCallback(() => {
    if (!session) return;

    setSession(prev => {
      if (!prev || (prev.currentStepIndex ?? 0) <= 0) return prev;
      
      return {
        ...prev,
        currentStepIndex: (prev.currentStepIndex ?? 0) - 1
      };
    });
  }, [session]);

  const completeSession = useCallback(() => {
    if (!session) return;

    console.log('Completing enhanced testing session');
    
    setSession(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        endTime: new Date(),
        status: 'completed'
      };
    });
  }, [session]);

  const getCurrentStep = useCallback(() => {
    if (!session || session.currentStepIndex === undefined) return null;
    return session.steps[session.currentStepIndex];
  }, [session]);

  const getStepProgress = useCallback(() => {
    if (!session) return { current: 0, total: 0, percentage: 0 };
    
    const current = (session.currentStepIndex ?? 0) + 1;
    const total = session.steps.length;
    const percentage = Math.round((current / total) * 100);
    
    return { current, total, percentage };
  }, [session]);

  return {
    session,
    startSession,
    pauseSession,
    resumeSession,
    recordResult,
    nextStep,
    previousStep,
    completeSession,
    getCurrentStep,
    getStepProgress
  };
};
