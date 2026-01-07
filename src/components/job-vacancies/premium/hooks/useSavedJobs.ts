/**
 * useSavedJobs - Hook for managing saved job listings
 * Persists to localStorage for offline access
 */

import { useState, useEffect, useCallback } from "react";
import type { UnifiedJob } from "@/hooks/job-vacancies/useUnifiedJobSearch";

const STORAGE_KEY = "elecmate-saved-jobs";

interface SavedJobEntry {
  job: UnifiedJob;
  savedAt: string;
}

export const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJobEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedJobs(parsed);
      }
    } catch (error) {
      console.error("Error loading saved jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist to localStorage whenever savedJobs changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs));
      } catch (error) {
        console.error("Error saving jobs:", error);
      }
    }
  }, [savedJobs, isLoading]);

  // Check if a job is saved
  const isSaved = useCallback(
    (jobId: string) => {
      return savedJobs.some((entry) => entry.job.id === jobId);
    },
    [savedJobs]
  );

  // Toggle save status
  const toggleSave = useCallback(
    (job: UnifiedJob) => {
      setSavedJobs((prev) => {
        const existingIndex = prev.findIndex((entry) => entry.job.id === job.id);
        if (existingIndex >= 0) {
          // Remove if already saved
          return prev.filter((_, index) => index !== existingIndex);
        } else {
          // Add to saved
          return [
            {
              job,
              savedAt: new Date().toISOString(),
            },
            ...prev,
          ];
        }
      });
    },
    []
  );

  // Save a job
  const saveJob = useCallback(
    (job: UnifiedJob) => {
      if (!isSaved(job.id)) {
        setSavedJobs((prev) => [
          {
            job,
            savedAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    },
    [isSaved]
  );

  // Remove a saved job
  const removeJob = useCallback((jobId: string) => {
    setSavedJobs((prev) => prev.filter((entry) => entry.job.id !== jobId));
  }, []);

  // Clear all saved jobs
  const clearAll = useCallback(() => {
    setSavedJobs([]);
  }, []);

  // Get saved jobs list
  const getSavedJobsList = useCallback(() => {
    return savedJobs.map((entry) => entry.job);
  }, [savedJobs]);

  // Get saved job IDs
  const savedJobIds = savedJobs.map((entry) => entry.job.id);

  return {
    savedJobs,
    savedJobIds,
    savedCount: savedJobs.length,
    isLoading,
    isSaved,
    toggleSave,
    saveJob,
    removeJob,
    clearAll,
    getSavedJobsList,
  };
};
