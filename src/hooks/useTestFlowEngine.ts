
import { useState, useCallback, useEffect } from 'react';
import { TestFlow, TestSession, TestResult, TestStatus } from '@/types/inspection-testing';
import { toast } from '@/hooks/use-toast';

export const useTestFlowEngine = (testFlow: TestFlow | null) => {
  const [session, setSession] = useState<TestSession | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const startSession = useCallback((installationDetails: TestSession['installationDetails'], technician: TestSession['technician']) => {
    if (!testFlow) return;

    const newSession: TestSession = {
      id: `session-${Date.now()}`,
      flowId: testFlow.id,
      installationDetails,
      currentStepIndex: 0,
      results: [],
      startTime: new Date(),
      status: 'in-progress',
      technician
    };

    setSession(newSession);
    setCurrentStepIndex(0);
    setIsSessionActive(true);
    
    toast({
      title: "Test Session Started",
      description: `Beginning ${testFlow.name} testing procedure`,
    });
  }, [testFlow]);

  const recordResult = useCallback((stepId: string, result: Omit<TestResult, 'stepId' | 'timestamp'>) => {
    if (!session) return;

    const newResult: TestResult = {
      stepId,
      timestamp: new Date(),
      ...result
    };

    setSession(prev => {
      if (!prev) return prev;
      
      const existingResultIndex = prev.results.findIndex(r => r.stepId === stepId);
      const updatedResults = [...prev.results];
      
      if (existingResultIndex >= 0) {
        updatedResults[existingResultIndex] = newResult;
      } else {
        updatedResults.push(newResult);
      }

      return {
        ...prev,
        results: updatedResults
      };
    });

    if (testFlow) {
      toast({
        title: "Result Recorded",
        description: `Test result saved for step: ${testFlow.steps.find(s => s.id === stepId)?.title}`,
      });
    }
  }, [session, testFlow]);

  const nextStep = useCallback(() => {
    if (!testFlow || currentStepIndex >= testFlow.steps.length - 1) return;
    
    setCurrentStepIndex(prev => prev + 1);
    setSession(prev => prev ? { ...prev, currentStepIndex: currentStepIndex + 1 } : prev);
  }, [currentStepIndex, testFlow]);

  const previousStep = useCallback(() => {
    if (currentStepIndex <= 0) return;
    
    setCurrentStepIndex(prev => prev - 1);
    setSession(prev => prev ? { ...prev, currentStepIndex: currentStepIndex - 1 } : prev);
  }, [currentStepIndex]);

  const completeSession = useCallback(() => {
    if (!session) return;

    const completedSession = {
      ...session,
      endTime: new Date(),
      status: 'completed' as TestStatus
    };

    setSession(completedSession);
    setIsSessionActive(false);

    toast({
      title: "Test Session Completed",
      description: "All tests have been completed successfully",
    });

    return completedSession;
  }, [session]);

  const pauseSession = useCallback(() => {
    setIsSessionActive(false);
    toast({
      title: "Session Paused",
      description: "Test session has been paused",
    });
  }, []);

  const resumeSession = useCallback(() => {
    setIsSessionActive(true);
    toast({
      title: "Session Resumed",
      description: "Test session has been resumed",
    });
  }, []);

  // Safe access to testFlow properties
  const currentStep = testFlow?.steps[currentStepIndex] || null;
  const currentStepResult = session?.results.find(r => r.stepId === currentStep?.id);
  const progress = testFlow ? ((currentStepIndex + 1) / testFlow.steps.length) * 100 : 0;
  const isLastStep = testFlow ? currentStepIndex === testFlow.steps.length - 1 : false;
  const isFirstStep = currentStepIndex === 0;

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
