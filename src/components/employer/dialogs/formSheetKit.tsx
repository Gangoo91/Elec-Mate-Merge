import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { storageGetJSONSync, storageRemoveSync, storageSetJSONSync } from '@/utils/storage';

/* ==========================================================================
   Form-sheet kit for the Employer Hub's multi-step create sheets (ELE-1818).

   - Drafts: a half-typed New Job / New Job Pack lives in localStorage per
     user + form, so a stray tap outside the sheet, the Android back button or
     the app being evicted never loses it. Cleared on a successful save.
   - StepTabs: tabbed steps with per-step ticks (CLAUDE.md multi-step forms).
   - KeepDraftPrompt: the in-sheet action sheet shown when a dirty form is
     dismissed — thumb-reachable, never a centred modal on top of a sheet.
   - ResumeDraftChip: the "Resume draft" entry point on the list pages.
   ========================================================================== */

export type DraftForm = 'new-job' | 'new-job-pack';

export interface StoredDraft<T> {
  v: T;
  step: number;
  savedAt: number;
}

const DRAFT_EVENT = 'employer-draft-change';

const draftKey = (form: DraftForm, userId: string) => `employer-draft:${form}:${userId}`;

export function readDraft<T>(form: DraftForm, userId: string | null | undefined): StoredDraft<T> | null {
  if (!userId) return null;
  try {
    const stored = storageGetJSONSync<StoredDraft<T> | null>(draftKey(form, userId), null);
    return stored && typeof stored.savedAt === 'number' && stored.v ? stored : null;
  } catch {
    return null;
  }
}

export function writeDraft<T>(form: DraftForm, userId: string, v: T, step: number): number | null {
  try {
    const savedAt = Date.now();
    const ok = storageSetJSONSync(draftKey(form, userId), { v, step, savedAt } satisfies StoredDraft<T>);
    if (!ok) return null;
    window.dispatchEvent(new CustomEvent(DRAFT_EVENT, { detail: form }));
    return savedAt;
  } catch {
    return null;
  }
}

export function clearDraft(form: DraftForm, userId: string | null | undefined) {
  if (!userId) return;
  try {
    storageRemoveSync(draftKey(form, userId));
    window.dispatchEvent(new CustomEvent(DRAFT_EVENT, { detail: form }));
  } catch {
    /* storage unavailable — nothing to clear */
  }
}

/** Live view of a saved draft, for the "Resume draft" chip on a list page. */
export function useSavedDraft<T>(form: DraftForm, userId: string | null | undefined) {
  const [draft, setDraft] = useState<StoredDraft<T> | null>(() => readDraft<T>(form, userId));
  useEffect(() => {
    setDraft(readDraft<T>(form, userId));
    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail === form) setDraft(readDraft<T>(form, userId));
    };
    window.addEventListener(DRAFT_EVENT, onChange);
    return () => window.removeEventListener(DRAFT_EVENT, onChange);
  }, [form, userId]);
  return draft;
}

/**
 * Mirrors a form into its draft slot on a short debounce while `active`
 * (sheet open and the form has real input). Returns when it last hit disk.
 */
export function useDraftWriter<T>(
  form: DraftForm,
  userId: string | null | undefined,
  value: T,
  step: number,
  active: boolean
) {
  const [savedAt, setSavedAt] = useState<number | null>(null);
  useEffect(() => {
    if (!active || !userId) return;
    const t = window.setTimeout(() => {
      const at = writeDraft(form, userId, value, step);
      if (at) setSavedAt(at);
    }, 400);
    return () => window.clearTimeout(t);
  }, [form, userId, value, step, active]);
  const reset = useCallback(() => setSavedAt(null), []);
  return { savedAt, reset };
}

export function timeAgoShort(ts: number | null | undefined) {
  if (!ts) return '';
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

/* ── Step tabs ─────────────────────────────────────────────────────────── */

export function StepTabs({
  steps,
  current,
  onSelect,
}: {
  steps: { label: string; done: boolean }[];
  current: number;
  onSelect: (index: number) => void;
}) {
  // Five tabs do not fit 390px with labels: on phones the current step shows
  // its name and the others shrink to their number (or a tick when done).
  const compact = steps.length > 3;
  return (
    <div role="tablist" aria-label="Steps" className="flex gap-1.5">
      {steps.map((s, i) => {
        const active = i === current;
        return (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={s.label}
            onClick={() => onSelect(i)}
            className={cn(
              'h-11 min-w-0 rounded-xl border px-2 flex items-center justify-center gap-1.5 text-[12.5px] font-semibold touch-manipulation transition-all',
              active && compact ? 'flex-[2.6] sm:flex-1' : 'flex-1',
              active
                ? 'border-elec-yellow bg-elec-yellow text-black'
                : 'border-white/[0.12] bg-white/[0.04] text-white'
            )}
          >
            {s.done && !active ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden />
            ) : (
              <span className="tabular-nums shrink-0">{i + 1}</span>
            )}
            <span className={cn('truncate', compact && !active && 'hidden sm:inline')}>
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Keep-draft action sheet ───────────────────────────────────────────── */

export function KeepDraftPrompt({
  open,
  what,
  onKeep,
  onDiscard,
  onCancel,
}: {
  open: boolean;
  /** e.g. 'Orchard Close rewire' or 'this job' */
  what: string;
  onKeep: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-end" role="alertdialog" aria-modal="true" aria-labelledby="keep-draft-title">
      <button
        type="button"
        aria-label="Keep editing"
        className="flex-1 bg-black/70 touch-manipulation"
        onClick={onCancel}
      />
      <div className="border-t border-white/[0.12] bg-[hsl(0_0%_10%)] px-4 pt-5 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-3 animate-in slide-in-from-bottom-4 duration-200">
        <div>
          <p id="keep-draft-title" className="text-[17px] font-semibold text-white">
            Keep this draft?
          </p>
          <p className="mt-1 text-[13px] text-white leading-snug">
            You've started {what}. Keep it and you can pick up exactly where you left off.
          </p>
        </div>
        <button
          type="button"
          onClick={onKeep}
          className="w-full h-12 rounded-full bg-elec-yellow text-black text-[14px] font-semibold touch-manipulation active:scale-[0.99]"
        >
          Keep draft and close
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full h-12 rounded-full border border-white/[0.14] bg-white/[0.06] text-white text-[14px] font-medium touch-manipulation active:scale-[0.99]"
        >
          Carry on editing
        </button>
        <button
          type="button"
          onClick={onDiscard}
          className="w-full h-11 rounded-full text-red-400 text-[13.5px] font-medium touch-manipulation"
        >
          Discard draft
        </button>
      </div>
    </div>
  );
}

/* ── Resume chip for list pages ────────────────────────────────────────── */

export function ResumeDraftChip({
  label,
  detail,
  onResume,
  onDiscard,
}: {
  label: string;
  detail?: ReactNode;
  onResume: () => void;
  onDiscard: () => void;
}) {
  // Discarding is confirmed with a second tap — a draft is never lost to one
  // stray touch, which is the whole point of keeping it.
  const [confirming, setConfirming] = useState(false);
  useEffect(() => {
    if (!confirming) return;
    const t = window.setTimeout(() => setConfirming(false), 4000);
    return () => window.clearTimeout(t);
  }, [confirming]);
  return (
    <div className="-mx-4 sm:mx-0 flex items-center gap-2 border-y sm:border sm:rounded-2xl border-elec-yellow/40 bg-white/[0.025] pl-4 pr-2 py-2">
      <button
        type="button"
        onClick={onResume}
        className="min-w-0 flex-1 min-h-[44px] text-left touch-manipulation"
      >
        <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
          Unsaved draft
        </span>
        <span className="block text-[13.5px] font-semibold text-white leading-snug line-clamp-2">
          {label}
        </span>
        {detail && <span className="block text-[12px] text-white truncate">{detail}</span>}
      </button>
      <button
        type="button"
        onClick={() => {
          if (confirming) {
            setConfirming(false);
            onDiscard();
          } else setConfirming(true);
        }}
        className={cn(
          'h-11 px-3 rounded-full text-[12.5px] font-medium touch-manipulation',
          confirming ? 'text-red-300 border border-red-500/40' : 'text-white'
        )}
      >
        {confirming ? 'Tap to discard' : 'Discard'}
      </button>
      <button
        type="button"
        onClick={onResume}
        className="h-11 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
      >
        Resume
      </button>
    </div>
  );
}
