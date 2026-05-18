/**
 * useRegAttempts
 *
 * Write side of the AM2 adaptive drill loop. Every BS 7671 quiz answer
 * upserts a row into `am2_reg_attempts` keyed (user_id, regulation_id).
 * The upsert applies a small SM-2 variant — confidence × correctness
 * decides how far out the next review gets pushed.
 *
 * Why on the client (not edge function): the quiz is already client-only
 * and we want write latency under one render tick. RLS guarantees the
 * apprentice can only touch their own rows. If the write fails (offline,
 * RLS reject, etc.) the quiz still works — adaptive drill just loses a
 * data point.
 */

import { useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import type { Confidence } from '@/components/am2/confidence';

const db = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export interface RecordAttemptArgs {
  regulationId: string;
  regNumber: string;
  correct: boolean;
  confidence: Confidence | null;
}

/**
 * SM-2 variant tuned for confidence-aware MCQs. Returns the new scheduler
 * state given the previous row and this attempt's outcome.
 *
 *   right + certain  → interval × 2.5 (locked in)
 *   right + likely   → interval × 2.0
 *   right + guess    → interval × 1.5 (lucky — don't trust it)
 *   wrong            → interval = 1, incorrect_streak += 1
 *
 * Ease factor is a slowly-moving multiplier nudged by streaks. It floors
 * at 1.3 so a struggling apprentice never gets buried under a wall of
 * reviews — and caps at 3.5 so we don't push known regs into 2026.
 */
function nextSchedule(
  prev: {
    interval_days: number;
    ease_factor: number;
    correct_streak: number;
    incorrect_streak: number;
  } | null,
  correct: boolean,
  confidence: Confidence | null
): {
  interval_days: number;
  ease_factor: number;
  correct_streak: number;
  incorrect_streak: number;
  next_review_at: string;
} {
  const prevInterval = prev?.interval_days ?? 1;
  let ef = prev?.ease_factor ?? 2.5;
  let correctStreak = prev?.correct_streak ?? 0;
  let incorrectStreak = prev?.incorrect_streak ?? 0;
  let interval: number;

  if (!correct) {
    // Reset — wrong answer comes back tomorrow regardless of how confident.
    interval = 1;
    correctStreak = 0;
    incorrectStreak += 1;
    // Confident wrongs hurt the ease factor more — these are the dangerous
    // ones that masked themselves as known.
    ef = Math.max(1.3, ef - (confidence === 'certain' ? 0.25 : 0.1));
  } else {
    correctStreak += 1;
    incorrectStreak = 0;
    const multiplier =
      confidence === 'certain'
        ? 2.5
        : confidence === 'likely'
          ? 2.0
          : confidence === 'guess'
            ? 1.5
            : 2.0;
    interval = Math.max(1, Math.round(prevInterval * multiplier));
    // Slowly increase ease for well-answered cards.
    if (confidence === 'certain') ef = Math.min(3.5, ef + 0.1);
  }

  const next = new Date(Date.now() + interval * 86_400_000).toISOString();
  return {
    interval_days: interval,
    ease_factor: Math.round(ef * 100) / 100,
    correct_streak: correctStreak,
    incorrect_streak: incorrectStreak,
    next_review_at: next,
  };
}

export function useRegAttempts() {
  const { user } = useAuth();

  /**
   * Record a single attempt. Best-effort — never blocks the UI. Returns
   * void to signal "fire-and-forget"; callers shouldn't await.
   */
  const recordAttempt = useCallback(
    async ({ regulationId, regNumber, correct, confidence }: RecordAttemptArgs) => {
      if (!user?.id) return;
      try {
        // Read current row to compute new schedule. One round-trip — we
        // accept the small latency for correct SM-2 semantics.
        const { data: existing } = await db
          .from('am2_reg_attempts')
          .select('interval_days, ease_factor, correct_streak, incorrect_streak, attempt_count')
          .eq('user_id', user.id)
          .eq('regulation_id', regulationId)
          .maybeSingle();

        const schedule = nextSchedule(existing, correct, confidence);
        const attemptCount = (existing?.attempt_count ?? 0) + 1;

        await db
          .from('am2_reg_attempts')
          .upsert(
            {
              user_id: user.id,
              regulation_id: regulationId,
              reg_number: regNumber,
              last_correct: correct,
              last_confidence: confidence,
              last_asked_at: new Date().toISOString(),
              attempt_count: attemptCount,
              correct_streak: schedule.correct_streak,
              incorrect_streak: schedule.incorrect_streak,
              ease_factor: schedule.ease_factor,
              interval_days: schedule.interval_days,
              next_review_at: schedule.next_review_at,
            },
            { onConflict: 'user_id,regulation_id' }
          );
      } catch (e) {
        // Drill data is non-critical — swallow + log.
        console.warn('[useRegAttempts] record failed:', e);
      }
    },
    [user?.id]
  );

  return { recordAttempt };
}
