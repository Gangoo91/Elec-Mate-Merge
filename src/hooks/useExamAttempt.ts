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
 * Storage goes through `@/utils/storage`, which is quota-aware, survives
 * blocked localStorage, and clears corrupted payloads by itself.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  storageGetJSONSync,
  storageKeysSync,
  storageRemoveSync,
  storageSetJSONSync,
} from '@/utils/storage';

const PREFIX = 'mockExam:attempt:';
const VERSION = 1;

export const examAttemptKey = (examId: string) => `${PREFIX}${examId}`;

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
}

interface StoredAttempt<Q> extends ExamAttemptSnapshot<Q> {
  v: number;
  userId: string | null;
}

interface UseExamAttemptOptions<Q> {
  /** Stable per paper. Keep it the same as the telemetry `examSlug`. */
  examId: string;
  /** Whoever is sitting it, or null when signed out. */
  userId?: string | null;
  /** Save while true — i.e. started, not yet submitted. */
  active: boolean;
  /** Current state, or null when there is nothing to save. */
  snapshot: ExamAttemptSnapshot<Q> | null;
  /**
   * Called at most once, on mount, with a still-live saved attempt.
   * `secondsRemaining` is derived from the stored deadline.
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
    const saved = storageGetJSONSync<{ deadline?: number } | null>(key, null);
    if (!saved || typeof saved.deadline !== 'number' || saved.deadline <= now) {
      storageRemoveSync(key);
    }
  }
}

export function useExamAttempt<Q>({
  examId,
  userId = null,
  active,
  snapshot,
  onRestore,
}: UseExamAttemptOptions<Q>) {
  const [resumed, setResumed] = useState(false);
  const restoreRef = useRef(onRestore);
  restoreRef.current = onRestore;
  const triedRef = useRef(false);

  const clearSaved = useCallback(() => {
    storageRemoveSync(examAttemptKey(examId));
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

    // Another account's attempt on a shared device — see note 5.
    if (saved.userId && userId && saved.userId !== userId) {
      storageRemoveSync(examAttemptKey(examId));
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

  // Persist while the attempt is live. Not throttled: the writes are small and
  // only fire when an answer, the position or a flag changes — and losing the
  // last answer before a crash is precisely what this exists to prevent.
  useEffect(() => {
    if (!active || !snapshot || !snapshot.questions.length) return;
    storageSetJSONSync<StoredAttempt<Q>>(examAttemptKey(examId), {
      ...snapshot,
      v: VERSION,
      userId,
    });
  }, [active, snapshot, examId, userId]);

  return { resumed, clearSaved };
}
