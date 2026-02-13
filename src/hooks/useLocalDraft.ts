import { useEffect, useRef, useCallback, useState } from "react";

interface UseLocalDraftOptions<T> {
  /** Unique key for this draft (e.g. 'coshh-draft', 'permit-draft') */
  key: string;
  /** Current form data to persist */
  data: T;
  /** Whether auto-save is active */
  enabled?: boolean;
  /** Max age in hours before draft is discarded (default 24) */
  maxAgeHours?: number;
}

interface DraftEnvelope<T> {
  data: T;
  timestamp: number;
}

type SaveStatus = "idle" | "saved" | "recovered";

/**
 * useLocalDraft — Persist form data to localStorage for draft recovery.
 *
 * Saves on every change (debounced 2s) + beforeunload safety net.
 * Recovers draft automatically on mount if < maxAgeHours old.
 *
 * @example
 * const { status, clearDraft, recoveredData } = useLocalDraft({
 *   key: 'coshh-draft',
 *   data: formData,
 *   enabled: isFormOpen,
 * });
 */
export function useLocalDraft<T>({
  key,
  data,
  enabled = true,
  maxAgeHours = 24,
}: UseLocalDraftOptions<T>) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [recoveredData, setRecoveredData] = useState<T | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dataRef = useRef(data);

  // Keep ref in sync
  dataRef.current = data;

  const storageKey = `safety-draft-${key}`;

  // Write to localStorage
  const saveDraft = useCallback(() => {
    if (!enabled) return;
    try {
      const envelope: DraftEnvelope<T> = {
        data: dataRef.current,
        timestamp: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(envelope));
      setStatus("saved");
    } catch {
      // localStorage full or unavailable — best effort
    }
  }, [storageKey, enabled]);

  // Clear draft (call on successful submit)
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // noop
    }
    setStatus("idle");
    setRecoveredData(null);
  }, [storageKey]);

  // Dismiss recovered draft without applying
  const dismissRecovery = useCallback(() => {
    setRecoveredData(null);
    clearDraft();
  }, [clearDraft]);

  // Recover draft on mount
  useEffect(() => {
    if (!enabled) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const envelope: DraftEnvelope<T> = JSON.parse(raw);
      const ageHours = (Date.now() - envelope.timestamp) / (1000 * 60 * 60);
      if (ageHours < maxAgeHours && envelope.data) {
        setRecoveredData(envelope.data);
        setStatus("recovered");
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch {
      // Corrupt data — discard
      localStorage.removeItem(storageKey);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced save on data change (2s)
  useEffect(() => {
    if (!enabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(saveDraft, 2000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, saveDraft, enabled]);

  // beforeunload safety net
  useEffect(() => {
    if (!enabled) return;
    const handler = () => saveDraft();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [saveDraft, enabled]);

  return {
    /** Current save status */
    status,
    /** Recovered draft data (null if none) */
    recoveredData,
    /** Call on successful submit to clear the draft */
    clearDraft,
    /** Call to dismiss recovery without applying */
    dismissRecovery,
    /** Force an immediate save */
    saveNow: saveDraft,
  };
}
