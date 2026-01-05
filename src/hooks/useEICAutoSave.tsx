
import { useEffect, useRef, useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { offlineStorage } from '@/utils/offlineStorage';

interface EICAutoSaveOptions {
  formData: any;
  interval?: number; // Auto-save interval in seconds
  onSave?: (data: any) => Promise<void> | void;
  enabled?: boolean;
  reportType?: 'eic' | 'eicr' | 'minor-works'; // Type of report for IndexedDB key
}

export const useEICAutoSave = ({ formData, interval = 30, onSave, enabled = true, reportType = 'eic' }: EICAutoSaveOptions) => {
  const { toast } = useToast();
  const lastSavedData = useRef<string>('');
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Save to IndexedDB
  const saveToIndexedDB = useCallback(async (data: any) => {
    try {
      await offlineStorage.saveDraft(reportType, data);
    } catch (error) {
      console.error('Failed to save to IndexedDB:', error);
    }
  }, [reportType]);

  // Load from IndexedDB
  const loadFromIndexedDB = useCallback(async () => {
    try {
      const saved = await offlineStorage.getDraft(reportType);
      if (saved) {
        return {
          formData: saved,
          timestamp: new Date(),
          version: '1.0'
        };
      }
    } catch (error) {
      console.error('Failed to load from IndexedDB:', error);
    }
    return null;
  }, [reportType]);

  // Clear auto-save data
  const clearAutoSave = useCallback(async () => {
    try {
      await offlineStorage.clearDraft(reportType);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to clear auto-save:', error);
    }
  }, [reportType]);

  // Perform save operation
  const performSave = useCallback(async (data: any, showToast = false) => {
    if (!enabled) return;

    setIsSaving(true);
    
    try {
      // Save to IndexedDB first (immediate)
      await saveToIndexedDB(data);
      
      // Call custom save function if provided
      if (onSave) {
        await onSave(data);
      }
      
      lastSavedData.current = JSON.stringify(data);
      setLastSaveTime(new Date());
      setHasUnsavedChanges(false);
      
      if (showToast) {
        toast({
          title: "EIC Saved",
          description: `Auto-saved at ${new Date().toLocaleTimeString('en-GB')}`,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Save failed:', error);
      if (showToast) {
        toast({
          title: "Save Failed",
          description: "There was an error saving your EIC. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
    }
  }, [enabled, saveToIndexedDB, onSave, toast]);

  // Manual save function
  const manualSave = useCallback(async () => {
    await performSave(formData, true);
  }, [formData, performSave]);

  // Check for changes and schedule auto-save
  useEffect(() => {
    if (!enabled) return;

    const currentData = JSON.stringify(formData);
    const hasChanges = currentData !== lastSavedData.current;
    
    setHasUnsavedChanges(hasChanges);

    if (hasChanges) {
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Schedule auto-save
      saveTimeoutRef.current = setTimeout(() => {
        performSave(formData, false);
      }, interval * 1000);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData, interval, enabled, performSave]);

  // Save before page unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        // Perform async save to IndexedDB (best effort)
        saveToIndexedDB(formData);
        
        // Show warning dialog
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges, formData, saveToIndexedDB]);

  return {
    isSaving,
    lastSaveTime,
    hasUnsavedChanges,
    manualSave,
    loadFromLocalStorage: loadFromIndexedDB,
    clearAutoSave,
    saveToLocalStorage: saveToIndexedDB
  };
};
