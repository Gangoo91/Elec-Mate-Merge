import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'elecmate-tool-config-progress';

interface ToolConfigProgress {
  configuredTools: Set<string>;
  lastToolIndex: number;
}

export function useToolConfigProgress() {
  const [configuredTools, setConfiguredTools] = useState<Set<string>>(new Set());
  const [lastToolIndex, setLastToolIndex] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConfiguredTools(new Set(parsed.configuredTools || []));
        setLastToolIndex(parsed.lastToolIndex || 0);
      }
    } catch (e) {
      console.error('Failed to load tool config progress:', e);
    }
  }, []);

  // Save to localStorage whenever state changes
  const saveProgress = useCallback((tools: Set<string>, index: number) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        configuredTools: Array.from(tools),
        lastToolIndex: index
      }));
    } catch (e) {
      console.error('Failed to save tool config progress:', e);
    }
  }, []);

  const markToolConfigured = useCallback((toolName: string) => {
    setConfiguredTools(prev => {
      const updated = new Set(prev);
      updated.add(toolName);
      saveProgress(updated, lastToolIndex);
      return updated;
    });
  }, [lastToolIndex, saveProgress]);

  const unmarkToolConfigured = useCallback((toolName: string) => {
    setConfiguredTools(prev => {
      const updated = new Set(prev);
      updated.delete(toolName);
      saveProgress(updated, lastToolIndex);
      return updated;
    });
  }, [lastToolIndex, saveProgress]);

  const toggleToolConfigured = useCallback((toolName: string) => {
    setConfiguredTools(prev => {
      const updated = new Set(prev);
      if (updated.has(toolName)) {
        updated.delete(toolName);
      } else {
        updated.add(toolName);
      }
      saveProgress(updated, lastToolIndex);
      return updated;
    });
  }, [lastToolIndex, saveProgress]);

  const updateLastToolIndex = useCallback((index: number) => {
    setLastToolIndex(index);
    saveProgress(configuredTools, index);
  }, [configuredTools, saveProgress]);

  const isToolConfigured = useCallback((toolName: string) => {
    return configuredTools.has(toolName);
  }, [configuredTools]);

  const getConfiguredCount = useCallback(() => {
    return configuredTools.size;
  }, [configuredTools]);

  const resetProgress = useCallback(() => {
    setConfiguredTools(new Set());
    setLastToolIndex(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    configuredTools,
    lastToolIndex,
    markToolConfigured,
    unmarkToolConfigured,
    toggleToolConfigured,
    updateLastToolIndex,
    isToolConfigured,
    getConfiguredCount,
    resetProgress
  };
}
