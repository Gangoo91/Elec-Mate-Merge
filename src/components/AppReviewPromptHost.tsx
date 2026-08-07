/**
 * AppReviewPromptHost — mounts the review prompt sheet once, at the app root.
 *
 * Every `recordPositiveAction()` call site shares this single sheet, so a win
 * recorded from an invoice list row, a dropdown, or a certificate page all
 * surface the same prompt. See useAppReview.ts for why this isn't per-component.
 */

import { useCallback, useEffect, useState } from 'react';
import AppReviewPromptSheet from '@/components/AppReviewPromptSheet';
import {
  subscribeToReviewPrompt,
  markPromptShown,
  requestNativeReview,
} from '@/hooks/useAppReview';

const AppReviewPromptHost = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => subscribeToReviewPrompt(() => setOpen(true)), []);

  // Sheet closes first so the native dialog isn't stacked on top of it.
  const handleRate = useCallback(async () => {
    setOpen(false);
    await requestNativeReview();
    await markPromptShown();
  }, []);

  const handleDismiss = useCallback(async () => {
    setOpen(false);
    await markPromptShown();
  }, []);

  return <AppReviewPromptSheet open={open} onRate={handleRate} onDismiss={handleDismiss} />;
};

export default AppReviewPromptHost;
