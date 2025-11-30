import { useState, useEffect, useCallback } from 'react';

export interface TestProgress {
  stepId: string;
  testName: string;
  measuredValue?: string;
  unit?: string;
  passed?: boolean;
  notes?: string;
  timestamp?: string;
  photoUrl?: string;
}

export interface CommissioningProgressData {
  sessionId: string;
  projectName: string;
  location: string;
  installationDate: string;
  installationType: string;
  testResults: TestProgress[];
  visualChecks: { index: number; completed: boolean; notes?: string }[];
  lastSaved: string;
  completionPercentage: number;
}

const STORAGE_KEY = 'commissioning_progress';

export const useCommissioningProgress = (
  projectName: string,
  location: string,
  installationDate: string,
  installationType: string
) => {
  const [progress, setProgress] = useState<CommissioningProgressData | null>(null);
  const [hasExistingSession, setHasExistingSession] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored) as CommissioningProgressData;
        
        // Validate and fix data structure to prevent crashes
        if (!Array.isArray(data.testResults)) {
          console.warn('Invalid testResults array, resetting to empty array');
          data.testResults = [];
        }
        if (!Array.isArray(data.visualChecks)) {
          console.warn('Invalid visualChecks array, resetting to empty array');
          data.visualChecks = [];
        }
        
        setProgress(data);
        setHasExistingSession(true);
      } catch (error) {
        console.error('Failed to parse stored progress:', error);
      }
    }
  }, []);

  // Auto-save progress whenever it changes
  useEffect(() => {
    if (progress) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const initializeSession = useCallback(() => {
    const newSession: CommissioningProgressData = {
      sessionId: `session-${Date.now()}`,
      projectName,
      location,
      installationDate,
      installationType,
      testResults: [],
      visualChecks: [],
      lastSaved: new Date().toISOString(),
      completionPercentage: 0,
    };
    setProgress(newSession);
    setHasExistingSession(false);
  }, [projectName, location, installationDate, installationType]);

  const resumeSession = useCallback(() => {
    setHasExistingSession(false);
  }, []);

  const recordTestResult = useCallback((result: TestProgress) => {
    setProgress((prev) => {
      if (!prev) return prev;

      const existingIndex = prev.testResults.findIndex(
        (r) => r.stepId === result.stepId
      );

      const updatedResults = [...prev.testResults];
      if (existingIndex >= 0) {
        updatedResults[existingIndex] = {
          ...updatedResults[existingIndex],
          ...result,
          timestamp: new Date().toISOString(),
        };
      } else {
        updatedResults.push({
          ...result,
          timestamp: new Date().toISOString(),
        });
      }

      return {
        ...prev,
        testResults: updatedResults,
        lastSaved: new Date().toISOString(),
      };
    });
  }, []);

  const recordVisualCheck = useCallback((index: number, completed: boolean, notes?: string) => {
    setProgress((prev) => {
      if (!prev) return prev;

      const existingIndex = prev.visualChecks.findIndex((c) => c.index === index);
      const updatedChecks = [...prev.visualChecks];

      if (existingIndex >= 0) {
        updatedChecks[existingIndex] = { index, completed, notes };
      } else {
        updatedChecks.push({ index, completed, notes });
      }

      return {
        ...prev,
        visualChecks: updatedChecks,
        lastSaved: new Date().toISOString(),
      };
    });
  }, []);

  const updateCompletionPercentage = useCallback((percentage: number) => {
    setProgress((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        completionPercentage: percentage,
        lastSaved: new Date().toISOString(),
      };
    });
  }, []);

  const clearProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(null);
    setHasExistingSession(false);
  }, []);

  const exportProgress = useCallback(() => {
    if (!progress) return null;
    return JSON.stringify(progress, null, 2);
  }, [progress]);

  const getTestResult = useCallback(
    (stepId: string): TestProgress | undefined => {
      return progress?.testResults.find((r) => r.stepId === stepId);
    },
    [progress]
  );

  const getVisualCheck = useCallback(
    (index: number) => {
      return progress?.visualChecks.find((c) => c.index === index);
    },
    [progress]
  );

  return {
    progress,
    hasExistingSession,
    initializeSession,
    resumeSession,
    recordTestResult,
    recordVisualCheck,
    updateCompletionPercentage,
    clearProgress,
    exportProgress,
    getTestResult,
    getVisualCheck,
  };
};
