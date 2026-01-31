/**
 * useFieldSync - Field-level state isolation for form performance
 *
 * Problem: setFormData() creates new object on every keystroke, causing 200+ field re-renders
 * Solution: Local state with debounced commits to parent
 *
 * Benefits:
 * - <20ms keystroke response (vs 200ms+)
 * - Only the focused input re-renders during typing
 * - Parent form only updates after debounce period
 */

import { useState, useRef, useCallback, useEffect } from 'react';

export function useFieldSync<T>(
  initialValue: T,
  onCommit: (value: T) => void,
  debounceMs = 500
): [T, (value: T) => void, () => void] {
  const [localValue, setLocalValue] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCommittedRef = useRef(initialValue);

  // Sync with external value changes (e.g., from loading a report)
  useEffect(() => {
    // Only update if the external value is different from what we last committed
    // This prevents overwriting local changes during debounce
    if (initialValue !== lastCommittedRef.current) {
      setLocalValue(initialValue);
      lastCommittedRef.current = initialValue;
    }
  }, [initialValue]);

  const handleChange = useCallback((value: T) => {
    setLocalValue(value);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new debounced commit
    timeoutRef.current = setTimeout(() => {
      onCommit(value);
      lastCommittedRef.current = value;
    }, debounceMs);
  }, [onCommit, debounceMs]);

  // Flush: immediately commit any pending changes
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (localValue !== lastCommittedRef.current) {
      onCommit(localValue);
      lastCommittedRef.current = localValue;
    }
  }, [localValue, onCommit]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [localValue, handleChange, flush];
}

/**
 * useMultiFieldSync - Manages multiple fields with a single hook
 *
 * Useful for sections with many related fields where you want
 * coordinated debouncing (all fields commit together)
 */
export function useMultiFieldSync<T extends Record<string, any>>(
  initialValues: T,
  onCommit: (values: Partial<T>) => void,
  debounceMs = 500
): {
  values: T;
  setValue: (field: keyof T, value: T[keyof T]) => void;
  setValues: (updates: Partial<T>) => void;
  flush: () => void;
} {
  const [localValues, setLocalValues] = useState<T>(initialValues);
  const pendingChangesRef = useRef<Partial<T>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCommittedRef = useRef<T>(initialValues);

  // Sync with external value changes
  useEffect(() => {
    const hasExternalChanges = Object.keys(initialValues).some(
      key => initialValues[key] !== lastCommittedRef.current[key]
    );

    if (hasExternalChanges) {
      setLocalValues(prev => ({
        ...prev,
        ...initialValues,
      }));
      lastCommittedRef.current = initialValues;
    }
  }, [initialValues]);

  const scheduleCommit = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (Object.keys(pendingChangesRef.current).length > 0) {
        onCommit(pendingChangesRef.current);
        // Update lastCommitted with pending changes
        lastCommittedRef.current = {
          ...lastCommittedRef.current,
          ...pendingChangesRef.current,
        } as T;
        pendingChangesRef.current = {};
      }
    }, debounceMs);
  }, [onCommit, debounceMs]);

  const setValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setLocalValues(prev => ({ ...prev, [field]: value }));
    pendingChangesRef.current[field] = value;
    scheduleCommit();
  }, [scheduleCommit]);

  const setValues = useCallback((updates: Partial<T>) => {
    setLocalValues(prev => ({ ...prev, ...updates }));
    pendingChangesRef.current = { ...pendingChangesRef.current, ...updates };
    scheduleCommit();
  }, [scheduleCommit]);

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (Object.keys(pendingChangesRef.current).length > 0) {
      onCommit(pendingChangesRef.current);
      lastCommittedRef.current = {
        ...lastCommittedRef.current,
        ...pendingChangesRef.current,
      } as T;
      pendingChangesRef.current = {};
    }
  }, [onCommit]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { values: localValues, setValue, setValues, flush };
}

export default useFieldSync;
