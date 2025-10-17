import { useEffect, useRef, useState, useCallback } from 'react';
import { debounce } from 'lodash';

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

export function useAutoSave<T>({
  data,
  onSave,
  delay = 30000, // 30 seconds default
  enabled = true
}: UseAutoSaveOptions<T>) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const previousDataRef = useRef<T>(data);

  // Debounced save function
  const debouncedSave = useRef(
    debounce(async (dataToSave: T) => {
      if (!enabled) return;

      setIsSaving(true);
      setError(undefined);

      try {
        await onSave(dataToSave);
        setLastSaved(new Date());
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Save failed'));
      } finally {
        setIsSaving(false);
      }
    }, delay)
  ).current;

  // Auto-save when data changes
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(previousDataRef.current)) {
      debouncedSave(data);
      previousDataRef.current = data;
    }
  }, [data, debouncedSave]);

  // Manual save function
  const saveNow = useCallback(async () => {
    debouncedSave.cancel(); // Cancel any pending debounced save
    
    setIsSaving(true);
    setError(undefined);

    try {
      await onSave(data);
      setLastSaved(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Save failed'));
    } finally {
      setIsSaving(false);
    }
  }, [data, onSave, debouncedSave]);

  return {
    isSaving,
    lastSaved,
    error,
    saveNow
  };
}
