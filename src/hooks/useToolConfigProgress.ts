import { useState, useEffect, useCallback } from 'react';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';

const STORAGE_KEY = 'elecmate-tool-config-progress';

interface ToolConfigProgress {
  configuredTools: Set<string>;
  lastToolIndex: number;
}

export function useToolConfigProgress() {
  const [configuredTools, setConfiguredTools] = useState<Set<string>>(new Set());
  const [lastToolIndex, setLastToolIndex] = useState(0);

  // Load from storage on mount
  useEffect(() => {
    const parsed = storageGetJSONSync<{ configuredTools?: string[]; lastToolIndex?: number } | null>(STORAGE_KEY, null);
    if (parsed) {
      setConfiguredTools(new Set(parsed.configuredTools || []));
      setLastToolIndex(parsed.lastToolIndex || 0);
    }
  }, []);

  // Save to storage whenever state changes
  const saveProgress = useCallback((tools: Set<string>, index: number) => {
    storageSetJSONSync(STORAGE_KEY, {
      configuredTools: Array.from(tools),
      lastToolIndex: index,
    });
  }, []);

  const markToolConfigured = useCallback(
    (toolName: string) => {
      setConfiguredTools((prev) => {
        const updated = new Set(prev);
        updated.add(toolName);
        saveProgress(updated, lastToolIndex);
        return updated;
      });
    },
    [lastToolIndex, saveProgress]
  );

  const unmarkToolConfigured = useCallback(
    (toolName: string) => {
      setConfiguredTools((prev) => {
        const updated = new Set(prev);
        updated.delete(toolName);
        saveProgress(updated, lastToolIndex);
        return updated;
      });
    },
    [lastToolIndex, saveProgress]
  );

  const toggleToolConfigured = useCallback(
    (toolName: string) => {
      setConfiguredTools((prev) => {
        const updated = new Set(prev);
        if (updated.has(toolName)) {
          updated.delete(toolName);
        } else {
          updated.add(toolName);
        }
        saveProgress(updated, lastToolIndex);
        return updated;
      });
    },
    [lastToolIndex, saveProgress]
  );

  const updateLastToolIndex = useCallback(
    (index: number) => {
      setLastToolIndex(index);
      saveProgress(configuredTools, index);
    },
    [configuredTools, saveProgress]
  );

  const isToolConfigured = useCallback(
    (toolName: string) => {
      return configuredTools.has(toolName);
    },
    [configuredTools]
  );

  const getConfiguredCount = useCallback(() => {
    return configuredTools.size;
  }, [configuredTools]);

  const resetProgress = useCallback(() => {
    setConfiguredTools(new Set());
    setLastToolIndex(0);
    storageRemoveSync(STORAGE_KEY);
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
    resetProgress,
  };
}
