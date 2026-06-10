/**
 * Designer state persistence — a closed app or a wrong back-swipe on site
 * must not lose a half-finished design. Debounced autosave into the same
 * draftStorage the certificates use; silently resumed on return.
 *
 * Resume is skipped when the page arrives with an AI proposal (that IS the
 * fresh state) and the draft is cleared by the designer's "Start a new
 * design" action via the returned `clearDraft`.
 */

import { useEffect, useRef } from 'react';
import { draftStorage } from '@/utils/draftStorage';

export function useDesignDraft<T extends object>(
  key: string,
  state: T,
  resume: (saved: T) => void,
  skipResume: boolean
) {
  const ready = useRef(false);
  const suppressNextSave = useRef(false);

  useEffect(() => {
    if (!skipResume) {
      const d = draftStorage.loadDraft(key, null);
      if (d?.data) resume(d.data as T);
    }
    ready.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    if (suppressNextSave.current) {
      // The state change that triggered this effect was a reset-to-defaults —
      // re-saving it would silently undo clearDraft.
      suppressNextSave.current = false;
      return;
    }
    const t = setTimeout(() => {
      draftStorage.saveDraft(key, null, state as Record<string, unknown>);
    }, 1500);
    return () => clearTimeout(t);
  }, [key, state]);

  return {
    clearDraft: () => {
      suppressNextSave.current = true;
      draftStorage.clearDraft(key, null);
    },
  };
}
