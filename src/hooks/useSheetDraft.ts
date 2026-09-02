import { useCallback, useEffect, useRef, useState } from 'react';
import { storageGetJSONSync, storageRemoveSync, storageSetJSONSync } from '@/utils/storage';

/* ==========================================================================
   useSheetDraft — keep a form's state alive across a pocketed phone.

   Apprentice forms save on submit only, so a half-written reflection or a
   quiz answer is lost the moment the app is backgrounded and evicted. This
   mirrors `value` into localStorage on a short debounce and hands back
   whatever was there when the sheet last opened, so the caller can offer
   "Pick up where you left off?" — restoring is always the user's choice.

   Not `useAutoSave` (it closes over `onSave` once at mount; a 30s cloud
   debounce is the wrong shape for a sheet) and not `useReportSync` (cert
   grade, needs a report id). A draft is local, cheap and per device.

   `key` should include the user id and the sheet name, e.g.
   `reflection:${uid}`; pass null while the id is unknown and nothing is
   written. `clear()` after a successful submit.
   ========================================================================== */

interface Stored<T> {
  v: T;
  savedAt: number;
}

export function useSheetDraft<T>(
  key: string | null,
  value: T,
  opts: { enabled?: boolean; delay?: number; isEmpty?: (v: T) => boolean } = {}
) {
  const { enabled = true, delay = 800, isEmpty } = opts;
  const storageKey = key ? `sheet-draft:${key}` : null;

  // What was on disk when the key was first seen — the restore candidate.
  const [draft, setDraft] = useState<Stored<T> | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const timer = useRef<number | null>(null);
  // Callers pass `isEmpty` inline; reading it through a ref keeps a new
  // function identity from re-arming the write timer on every render.
  const isEmptyRef = useRef(isEmpty);
  isEmptyRef.current = isEmpty;

  // Read the restore candidate whenever the sheet (re)opens on a key — a
  // sheet that stays mounted between opens would otherwise never see a draft
  // written during its previous open.
  useEffect(() => {
    if (!storageKey || !enabled) return;
    const stored = storageGetJSONSync<Stored<T> | null>(storageKey, null);
    setDraft(stored && typeof stored.savedAt === 'number' ? stored : null);
  }, [storageKey, enabled]);

  useEffect(() => {
    if (!storageKey || !enabled) return;
    const empty = isEmptyRef.current;
    if (empty ? empty(value) : value == null) return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const at = Date.now();
      if (storageSetJSONSync(storageKey, { v: value, savedAt: at } satisfies Stored<T>)) {
        setSavedAt(at);
      }
    }, delay);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [storageKey, enabled, value, delay]);

  const clear = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    if (storageKey) storageRemoveSync(storageKey);
    setDraft(null);
    setSavedAt(null);
  }, [storageKey]);

  return {
    /** The value found on open, or null. Present until `clear()` or `dismiss()`. */
    draft: draft?.v ?? null,
    draftSavedAt: draft?.savedAt ?? null,
    hasDraft: draft !== null,
    /** When the CURRENT value last hit disk (drives a "Draft saved" word). */
    savedAt,
    clear,
    /** Forget the restore candidate without touching what is being written now. */
    dismiss: () => setDraft(null),
  };
}

export default useSheetDraft;
