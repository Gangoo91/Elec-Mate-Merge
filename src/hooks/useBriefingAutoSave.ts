import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { storageGetSync, storageSetSync, storageRemoveSync, storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const AUTO_SAVE_KEY = 'briefing_auto_save';
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export interface AutoSaveData {
  formData: any;
  timestamp: number;
  step: number;
}

export const useBriefingAutoSave = (formData: any, step: number, isEditing: boolean) => {
  const { toast } = useToast();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const saveTimer = useRef<NodeJS.Timeout>();
  const lastFormData = useRef<string>('');

  // Load saved data on mount
  const loadSavedData = (): AutoSaveData | null => {
    if (isEditing) return null; // Don't load auto-save for editing

    try {
      const data = storageGetJSONSync<AutoSaveData | null>(AUTO_SAVE_KEY, null);
      if (!data) return null;

      const ageInMinutes = (Date.now() - data.timestamp) / 1000 / 60;

      // Only return if less than 24 hours old
      if (ageInMinutes < 1440) {
        return data;
      } else {
        storageRemoveSync(AUTO_SAVE_KEY);
        return null;
      }
    } catch (error) {
      console.error('Failed to load auto-save:', error);
      return null;
    }
  };

  // Save data to localStorage
  const saveData = (showNotification = false) => {
    try {
      const dataToSave: AutoSaveData = {
        formData,
        timestamp: Date.now(),
        step,
      };

      storageSetJSONSync(AUTO_SAVE_KEY, dataToSave);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);

      if (showNotification) {
        toast({
          title: 'Progress Saved',
          description: 'Your briefing has been auto-saved.',
        });
      }
    } catch (error) {
      console.error('Failed to auto-save:', error);
    }
  };

  // Clear saved data
  const clearSavedData = () => {
    storageRemoveSync(AUTO_SAVE_KEY);
    setLastSaved(null);
    setHasUnsavedChanges(false);
  };

  // Manual save
  const manualSave = () => {
    saveData(true);
  };

  // Auto-save effect
  useEffect(() => {
    if (isEditing) return; // Don't auto-save when editing existing briefing

    const currentData = JSON.stringify(formData);

    // Check if data has changed
    if (currentData !== lastFormData.current) {
      setHasUnsavedChanges(true);
      lastFormData.current = currentData;

      // Clear existing timer
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }

      // Set new timer
      saveTimer.current = setTimeout(() => {
        saveData(false);
      }, AUTO_SAVE_INTERVAL);
    }

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [formData, step, isEditing]);

  // Get time since last save
  const getTimeSinceLastSave = (): string | null => {
    if (!lastSaved) return null;

    const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return 'over a day ago';
  };

  return {
    loadSavedData,
    saveData: manualSave,
    clearSavedData,
    lastSaved,
    hasUnsavedChanges,
    timeSinceLastSave: getTimeSinceLastSave(),
  };
};
