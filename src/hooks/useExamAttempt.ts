/**
 * Resume an unfinished mock exam attempt after a reload.
 *
 * 🔴 WHY THIS EXISTS. Every in-app paper kept the whole live attempt in
 * `useState` and nowhere else, so ANY reload lost the lot — every answer, the
 * flags and the clock — with no warning. That is not hypothetical:
 *
 *   - the stale-chunk error boundary deliberately force-reloads the page to
 *     recover from a bad chunk;
 *   - iOS evicts backgrounded tabs routinely;
 *   - a phone call, a low-memory kill or a fat-fingered refresh all do it too.
 *
 * A 60-question timed paper could vanish at question 55. On a paper someone is
 * filming, or sitting for real, that is the worst bug in the product.
 *
 * ── Design decisions, and why ─────────────────────────────────────────────
 *
 * 1. THE DRAWN QUESTIONS ARE STORED, not just the answers. Papers draw a
 *    random subset AND reshuffle each question's options with a per-attempt
 *    salt. Redrawing on resume would hand back a different paper, and every
 *    stored answer index would then point at the wrong option — silently
 *    marking correct answers wrong. The questions ARE the attempt.
 *
 * 2. A WALL-CLOCK `deadline`, never "seconds remaining". Storing the remaining
 *    seconds lets anyone top the clock back up by refreshing, which makes a
 *    timed paper meaningless. The trade-off is deliberate and stated to the
 *    learner: leave for longer than the time limit and the attempt is gone.
 *
 * 3. AN EXPIRED ATTEMPT IS DISCARDED, NOT AUTO-SUBMITTED. Silently posting a
 *    score for a paper someone walked away from would write a bogus row into
 *    the attempt telemetry and drag down the pass-rate calibration the exam
 *    difficulty work depends on. A paper nobody finished is not a fail.
 *
 * 4. `v` IS CHECKED. An old payload from a previous shape is dropped rather
 *    than half-read into the new one.
 *
 * 5. THE USER ID TRAVELS IN THE PAYLOAD, not the key. Auth resolves after the
 *    first render, so a user-scoped key would miss on mount and silently fail
 *    to restore. Storing it inside lets us compare once the value is known and
 *    discard another account's attempt on a shared device.
 *
 * 6. THE FINISHED PAPER IS KEPT TOO, for this tab only. Andrzej (7 Oct): the
 *    page reloaded an hour after he submitted — a deploy — and his results and
 *    review were gone, because only the LIVE attempt was ever saved. A
 *    submitted paper now stays saved (`finished`) and a reload reopens its
 *    results. Only in the same tab (a sessionStorage marker), so coming back
 *    to the paper tomorrow starts a fresh one rather than replaying old
 *    results; the attempt itself is in Mock exam history either way.
 *
 * Storage goes through `@/utils/storage`, which is quota-aware, survives
 * blocked localStorage, and clears corrupted payloads by itself.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useHoldReloads } from '@/lib/reloadGuard';

import {
  getLastSavedAttempt,
  restoreLastSavedAttempt,
  subscribeLastSavedAttempt,
} from '@/lib/mockExamTelemetry';
import {
  storageGetJSONSync,
  storageKeysSync,
  storageRemoveSync,
  storageSetJSONSync,
} from '@/utils/storage';

const PREFIX = 'mockExam:attempt:';
const VERSION = 1;
/** A finished paper is kept this long (and only reopened in the same tab). */
const FINISHED_TTL_MS = 12 * 60 * 60 * 1000;

export const examAttemptKey = (examId: string) => `${PREFIX}${examId}`;
const finishedHereKey = (examId: string) => `mockExam:finishedHere:${examId}`;

function sessionGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
function sessionSet(key: string, value: string | null) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    /* blocked storage: the finished paper just won't reopen */
  }
}

export interface ExamAttemptSnapshot<Q> {
  /** The questions AS DRAWN AND SHUFFLED — see note 1 above. */
  questions: Q[];
  /** Aligned to `questions`. `-1`/`undefined` means unanswered. */
  answers: (number | undefined)[];
  /** Index of the question the learner was on. */
  current: number;
  /** Flagged question indices. A Set does not survive JSON. */
  flagged: number[];
  /** Epoch ms the attempt began. */
  startedAt: number;
  /** Epoch ms the attempt runs out. See note 2. */
  deadline: number;
  /** Submitted — reopen on the results screen. See note 6. */
  finished?: boolean;
}

interface StoredAttempt<Q> extends ExamAttemptSnapshot<Q> {
  v: number;
  userId: string | null;
  /** Epoch ms it was submitted. */
  finishedAt?: number;
  /** The seo_mock_attempts row, once saved — brings back "saved" + Drill. */
  attemptId?: string;
}

interface UseExamAttemptOptions<Q> {
  /** Stable per paper. Keep it the same as the telemetry `examSlug`. */
  examId: string;
  /** Whoever is sitting it, or null when signed out. */
  userId?: string | null;
  /** Save while true — i.e. started, not yet submitted. */
  active: boolean;
  /** Submitted and showing results. Kept so a reload reopens them (note 6). */
  finished?: boolean;
  /** Current state, or null when there is nothing to save. */
  snapshot: ExamAttemptSnapshot<Q> | null;
  /**
   * Called at most once, on mount, with a still-live saved attempt.
   * `secondsRemaining` is derived from the stored deadline. When
   * `snapshot.finished` is set the paper was already submitted (and its
   * attempt already recorded): show the results, don't record it again.
   */
  onRestore: (snapshot: ExamAttemptSnapshot<Q>, secondsRemaining: number) => void;
}

/**
 * Drop any attempt whose deadline has passed, for every paper.
 *
 * Without this, abandoned attempts accumulate against the ~5MB localStorage
 * quota — and a 60-question paper carries its full question text. Cheap: it
 * runs once per exam mount over the handful of keys with our prefix.
 */
function pruneExpired(now: number) {
  for (const key of storageKeysSync()) {
    if (!key.startsWith(PREFIX)) continue;
    const saved = storageGetJSONSync<{ deadline?: number; finishedAt?: number } | null>(key, null);
    const expired = !saved
      ? true
      : typeof saved.finishedAt === 'number'
        ? saved.finishedAt + FINISHED_TTL_MS <= now
        : typeof saved.deadline !== 'number' || saved.deadline <= now;
    if (expired) {
      storageRemoveSync(key);
    }
  }
}

export function useExamAttempt<Q>({
  examId,
  userId = null,
  active,
  finished = false,
  snapshot,
  onRestore,
}: UseExamAttemptOptions<Q>) {
  const [resumed, setResumed] = useState(false);
  // No automatic reloads (new version, stale-chunk recovery) mid-paper or on
  // its results — see lib/reloadGuard.
  useHoldReloads(active || finished);

  // Fetch the screens a learner goes to AFTER the paper (history, this
  // attempt, revise) while the build that's open is still the live one. An
  // hour later a deploy may have removed this build's files, and opening them
  // then fails (Andrzej, 7 Oct: "couldn't review incorrect questions").
  useEffect(() => {
    if (!active) return;
    void import('@/pages/study-centre/MockAttemptPage').catch(() => {});
    void import('@/pages/study-centre/MockRevisePage').catch(() => {});
    void import('@/pages/study-centre/MockHistoryPage').catch(() => {});
  }, [active]);

  const restoreRef = useRef(onRestore);
  restoreRef.current = onRestore;
  const triedRef = useRef(false);

  const clearSaved = useCallback(() => {
    storageRemoveSync(examAttemptKey(examId));
    sessionSet(finishedHereKey(examId), null);
    setResumed(false);
  }, [examId]);

  // Restore once, before the learner can interact.
  useEffect(() => {
    if (triedRef.current) return;
    triedRef.current = true;

    const now = Date.now();
    pruneExpired(now);

    const saved = storageGetJSONSync<StoredAttempt<Q> | null>(examAttemptKey(examId), null);
    if (!saved || saved.v !== VERSION || !saved.questions?.length) return;

    // JSON turns an unanswered `undefined` into `null`, and the papers treat
    // anything that isn't undefined/-1 as ANSWERED — so a resumed paper scored
    // its blanks as wrong answers and said "not passed" where it should say
    // "not completed". Back to undefined before any page sees them.
    saved.answers = (saved.answers ?? []).map((a) =>
      typeof a === 'number' && a >= 0 ? a : undefined
    );

    // Another account's attempt on a shared device — see note 5.
    if (saved.userId && userId && saved.userId !== userId) {
      storageRemoveSync(examAttemptKey(examId));
      return;
    }

    if (saved.finished) {
      // Results reopen only after a reload of THIS tab — note 6.
      if (sessionGet(finishedHereKey(examId)) !== '1') {
        storageRemoveSync(examAttemptKey(examId));
        return;
      }
      if (saved.attemptId) restoreLastSavedAttempt({ id: saved.attemptId, examSlug: examId });
      restoreRef.current(saved, 0);
      setResumed(true);
      toast.info('Your results are still here', {
        description: 'The page reloaded, so we put your results back.',
        duration: 5000,
      });
      return;
    }

    const secondsRemaining = Math.ceil((saved.deadline - now) / 1000);
    if (secondsRemaining <= 0) {
      storageRemoveSync(examAttemptKey(examId));
      return;
    }

    restoreRef.current(saved, secondsRemaining);
    setResumed(true);
  }, [examId, userId]);

  // A submitted (or reset) attempt is over: forget it. Every paper passes
  // `active = started && !submitted`, so live → not live is exactly that
  // moment. Without this the save outlived the submit, and coming back to the
  // paper within the hour dropped the learner straight back into the paper
  // they had just finished — answers and all — and resubmitting it recorded
  // the same sitting twice. Leaving the page mid-paper unmounts the hook
  // instead, so the save is kept and the resume still works.
  //
  // Submitting is the exception: `finished` keeps it (note 6), and the save is
  // dropped once neither is true — i.e. on Retake or leaving the results.
  const wasLiveRef = useRef(active || finished);
  useEffect(() => {
    const live = active || finished;
    if (wasLiveRef.current && !live) {
      storageRemoveSync(examAttemptKey(examId));
      sessionSet(finishedHereKey(examId), null);
    }
    wasLiveRef.current = live;
  }, [active, finished, examId]);

  // Leaving the results inside the app (Back, Exit, Drill) is done with them:
  // only a reload or a killed tab should bring them back. A reload never runs
  // this cleanup. Nor does it clear when the URL is unchanged: that's the error
  // boundary tearing the screen down to reload it, and the reload should find
  // the results.
  const finishedRef = useRef(finished);
  finishedRef.current = finished;
  useEffect(() => {
    const mountedAt = window.location.pathname;
    return () => {
      if (finishedRef.current && window.location.pathname !== mountedAt) {
        storageRemoveSync(examAttemptKey(examId));
        sessionSet(finishedHereKey(examId), null);
      }
    };
  }, [examId]);

  // Persist while the attempt is live. Not throttled: the writes are small and
  // only fire when an answer, the position or a flag changes — and losing the
  // last answer before a crash is precisely what this exists to prevent.
  useEffect(() => {
    if (!active || !snapshot || !snapshot.questions.length) return;
    storageSetJSONSync<StoredAttempt<Q>>(examAttemptKey(examId), {
      ...snapshot,
      finished: false,
      v: VERSION,
      userId,
    });
  }, [active, snapshot, examId, userId]);

  // The submitted paper: saved once as finished, then again when its attempt
  // row comes back from the server (so a reload brings back "saved" + Drill).
  const finishedAtRef = useRef<number | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  useEffect(() => {
    if (!finished) {
      finishedAtRef.current = null;
      setAttemptId(null);
      return;
    }
    const pick = () => {
      const s = getLastSavedAttempt();
      if (
        s &&
        s.examSlug === examId &&
        finishedAtRef.current &&
        s.at >= finishedAtRef.current - 5000
      )
        setAttemptId(s.id);
    };
    pick();
    const off = subscribeLastSavedAttempt(pick);
    return () => {
      off();
    };
  }, [finished, examId]);
  // Written when it's submitted and when the row id arrives — not on every
  // render (pages rebuild the snapshot each render).
  const snapshotRef = useRef(snapshot);
  snapshotRef.current = snapshot;
  const hasSnapshot = !!snapshot?.questions.length;
  useEffect(() => {
    const snapshot = snapshotRef.current;
    if (!finished || !snapshot || !snapshot.questions.length) return;
    if (finishedAtRef.current === null) {
      const prev = storageGetJSONSync<StoredAttempt<Q> | null>(examAttemptKey(examId), null);
      // A restored paper keeps its original submit time and attempt row.
      finishedAtRef.current = prev?.finished && prev.finishedAt ? prev.finishedAt : Date.now();
      if (prev?.finished && prev.attemptId) setAttemptId(prev.attemptId);
    }
    storageSetJSONSync<StoredAttempt<Q>>(examAttemptKey(examId), {
      ...snapshot,
      finished: true,
      finishedAt: finishedAtRef.current,
      attemptId: attemptId ?? undefined,
      v: VERSION,
      userId,
    });
    sessionSet(finishedHereKey(examId), '1');
  }, [finished, hasSnapshot, attemptId, examId, userId]);

  return { resumed, clearSaved };
}
