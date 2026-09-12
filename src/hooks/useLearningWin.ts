/**
 * useLearningWin — ask for a review or a referral after a learning win.
 *
 * Both prompts already existed and were well built. Neither had ever been
 * connected to the learning side of the app: every call site was a
 * certificate, a quote, an invoice or an EICR, so an apprentice could pass
 * every mock in the study centre and never once be asked what they thought of
 * it, or offered the free month for bringing a mate.
 *
 * The gate is the point. A review prompt after a failed mock is not a prompt,
 * it is a complaint invitation — so a win has to actually be a win before
 * either hook hears about it. The hooks own their own cooldowns and yearly
 * caps from there (Apple allows three prompts per 365 days and counts them
 * whether or not the sheet is shown).
 */

import { useCallback } from 'react';

import { useAppReview } from '@/hooks/useAppReview';
import { useReferralPrompt } from '@/hooks/useReferralPrompt';

/** Below this, a mock is not something to celebrate. Matches the pass mark. */
const PASS_MARK = 60;

export function useLearningWin() {
  const { recordPositiveAction: recordReviewAction } = useAppReview();
  const {
    recordPositiveAction: recordReferralAction,
    showReferralPrompt,
    handleClose: closeReferralPrompt,
  } = useReferralPrompt();

  /**
   * Call once when a learner finishes something worth finishing. Safe to call
   * on a fail — it simply does nothing, so callers do not need their own gate.
   */
  const recordWin = useCallback(
    (win: { kind: 'mock'; percentage: number } | { kind: 'course' | 'streak' }) => {
      if (win.kind === 'mock' && win.percentage < PASS_MARK) return;
      recordReviewAction();
      recordReferralAction();
    },
    [recordReviewAction, recordReferralAction]
  );

  return { recordWin, showReferralPrompt, closeReferralPrompt, PASS_MARK };
}

export default useLearningWin;
