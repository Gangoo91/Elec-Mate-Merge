import { useState, useEffect } from 'react';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';

interface FaultProgressState {
  completedSteps: string[];
  lastUpdated: string;
}

export const useFaultDiagnosisProgress = (faultId?: string) => {
  const storageKey = faultId ? `fault-progress-${faultId}` : 'fault-progress-current';

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => {
    const parsed = storageGetJSONSync<FaultProgressState | null>(storageKey, null);
    if (parsed && Array.isArray(parsed.completedSteps)) {
      return new Set(parsed.completedSteps);
    }
    return new Set();
  });

  // Save to storage whenever completedSteps changes
  useEffect(() => {
    const state: FaultProgressState = {
      completedSteps: Array.from(completedSteps),
      lastUpdated: new Date().toISOString(),
    };
    storageSetJSONSync(storageKey, state);
  }, [completedSteps, storageKey]);

  const toggleStepComplete = (stepId: string, completed: boolean) => {
    setCompletedSteps((prev) => {
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
    storageRemoveSync(storageKey);
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
    getCompletionStats,
  };
};
