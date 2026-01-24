// useEICAutoSave - Compatibility wrapper
// Auto-save is now handled by useReportSync internally
// This wrapper provides backwards compatibility for existing components

import { useState, useEffect, useRef, useCallback } from 'react';
import { draftStorage } from '@/utils/draftStorage';

interface UseEICAutoSaveOptions {
  formData: any;
  interval?: number;
  reportType?: 'eicr' | 'eic' | 'minor-works';
  onSave?: (data: any) => Promise<void>;
  enabled?: boolean;
}

/**
 * Compatibility wrapper for the old useEICAutoSave hook
 * Auto-save is now handled by useReportSync, but this maintains
 * the old API for components that still use it
 */
export const useEICAutoSave = ({
  formData,
  interval = 30,
  reportType = 'eicr',
  onSave,
  enabled = true,
}: UseEICAutoSaveOptions) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const lastDataRef = useRef<string>('');

  // Track changes
  useEffect(() => {
    const currentData = JSON.stringify(formData);
    if (currentData !== lastDataRef.current) {
      setHasUnsavedChanges(true);
    }
  }, [formData]);

  // Save initial draft on mount (so cert appears in recent certs immediately)
  useEffect(() => {
    if (!enabled) return;
    // Save immediately with a draft created timestamp
    draftStorage.saveDraft(reportType, null, {
      ...formData,
      _draftCreatedAt: new Date().toISOString(),
    });
    lastDataRef.current = JSON.stringify(formData);
    setLastSaveTime(new Date());
    console.log('[useEICAutoSave] Initial draft saved for', reportType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Auto-save to local draft storage
  useEffect(() => {
    if (!enabled) return;

    const saveInterval = setInterval(async () => {
      const currentData = JSON.stringify(formData);
      if (currentData !== lastDataRef.current) {
        // Check if form has meaningful data
        const hasData =
          formData.clientName ||
          formData.installationAddress ||
          formData.propertyAddress ||
          (formData.circuits && formData.circuits.length > 0) ||
          (formData.scheduleOfTests && formData.scheduleOfTests.length > 0);

        if (hasData) {
          setIsSaving(true);

          // Save to local draft storage
          draftStorage.saveDraft(reportType, null, formData);

          // Call onSave if provided (for cloud sync)
          if (onSave) {
            try {
              await onSave(formData);
            } catch (error) {
              console.error('[useEICAutoSave] onSave failed:', error);
            }
          }

          lastDataRef.current = currentData;
          setLastSaveTime(new Date());
          setHasUnsavedChanges(false);
          setIsSaving(false);
        }
      }
    }, interval * 1000);

    return () => clearInterval(saveInterval);
  }, [formData, interval, reportType, onSave, enabled]);

  // Manual save function
  const manualSave = useCallback(async () => {
    setIsSaving(true);

    // Save to local draft storage
    draftStorage.saveDraft(reportType, null, formData);

    // Call onSave if provided
    if (onSave) {
      try {
        await onSave(formData);
      } catch (error) {
        console.error('[useEICAutoSave] manualSave failed:', error);
      }
    }

    lastDataRef.current = JSON.stringify(formData);
    setLastSaveTime(new Date());
    setHasUnsavedChanges(false);
    setIsSaving(false);
  }, [formData, reportType, onSave]);

  // Load from local storage
  const loadFromLocalStorage = useCallback(async () => {
    const draft = draftStorage.loadDraft(reportType);
    if (draft) {
      return { formData: draft.data };
    }
    return null;
  }, [reportType]);

  // Clear auto-save data
  const clearAutoSave = useCallback(() => {
    draftStorage.clearDraft(reportType);
    setHasUnsavedChanges(false);
  }, [reportType]);

  return {
    isSaving,
    lastSaveTime,
    hasUnsavedChanges,
    manualSave,
    loadFromLocalStorage,
    clearAutoSave,
  };
};
