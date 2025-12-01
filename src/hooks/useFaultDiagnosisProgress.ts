import { useState, useEffect } from 'react';

interface FaultProgressState {
  completedSteps: string[];
  lastUpdated: string;
}

export const useFaultDiagnosisProgress = (faultId?: string) => {
  const storageKey = faultId ? `fault-progress-${faultId}` : 'fault-progress-current';
  
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return new Set(Array.isArray(parsed.completedSteps) ? parsed.completedSteps : []);
      }
    } catch (error) {
      console.error('Failed to load fault progress:', error);
    }
    return new Set();
  });

  // Save to localStorage whenever completedSteps changes
  useEffect(() => {
    try {
      const state: FaultProgressState = {
        completedSteps: Array.from(completedSteps),
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save fault progress:', error);
    }
  }, [completedSteps, storageKey]);

  const toggleStepComplete = (stepId: string, completed: boolean) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (completed) {
        next.add(stepId);
      } else {
        next.delete(stepId);
      }
      return next;
    });
  };

  const isStepCompleted = (stepId: string) => {
    return completedSteps.has(stepId);
  };

  const clearProgress = () => {
    setCompletedSteps(new Set());
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Failed to clear fault progress:', error);
    }
  };

  const getCompletionStats = (totalSteps: number) => {
    const completed = completedSteps.size;
    const percentage = totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
    return { completed, total: totalSteps, percentage };
  };

  return {
    completedSteps,
    toggleStepComplete,
    isStepCompleted,
    clearProgress,
    getCompletionStats
  };
};
