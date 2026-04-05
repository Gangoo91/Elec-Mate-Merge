/**
 * useAppReview — Native iOS/Android app store review prompt.
 *
 * Two-step approach:
 * 1. Custom bottom sheet asks "Enjoying Elec-Mate?" (respectful, not pushy)
 * 2. If user taps "Sure" → triggers native SKStoreReviewController / Google Play review
 *
 * Call `recordPositiveAction()` after meaningful user wins:
 *   - Certificate generated/saved
 *   - Quote sent to client
 *   - RAMS generated
 *
 * Conditions to show the custom sheet:
 *   - Native platform only (iOS/Android via Capacitor)
 *   - User registered 7+ days ago (based on first action timestamp)
 *   - 3+ positive actions completed
 *   - At least 90 days since last prompt
 *   - Max 3 total prompts per year
 *
 * State persisted via @capacitor/preferences (survives WKWebView cache clears).
 */

import { useState, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { InAppReview } from '@capacitor-community/in-app-review';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const STORAGE_KEY = 'elec_mate_app_review';
const MIN_ACTIONS_BEFORE_PROMPT = 3;
const MIN_DAYS_BETWEEN_PROMPTS = 90;
const MAX_PROMPTS_PER_YEAR = 3;
const MIN_DAYS_SINCE_FIRST_USE = 7;

interface ReviewState {
  positiveActionCount: number;
  lastPromptedAt: number | null;
  totalPrompts: number;
  firstActionAt: number | null;
}

const DEFAULT_STATE: ReviewState = {
  positiveActionCount: 0,
  lastPromptedAt: null,
  totalPrompts: 0,
  firstActionAt: null,
};

async function getState(): Promise<ReviewState> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      if (value) return { ...DEFAULT_STATE, ...JSON.parse(value) };
    } else {
      const stored = storageGetJSONSync<ReviewState | null>(STORAGE_KEY, null);
      if (stored) return { ...DEFAULT_STATE, ...stored };
    }
  } catch {
    // ignore parse/storage errors
  }
  return { ...DEFAULT_STATE };
}

async function saveState(state: ReviewState): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    try {
      await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(state) });
    } catch {
      // ignore storage errors
    }
  } else {
    storageSetJSONSync(STORAGE_KEY, state);
  }
}

function shouldShowSheet(state: ReviewState): boolean {
  if (state.totalPrompts >= MAX_PROMPTS_PER_YEAR) return false;
  if (state.positiveActionCount < MIN_ACTIONS_BEFORE_PROMPT) return false;

  // Don't show too soon after first use
  if (state.firstActionAt) {
    const daysSinceFirst = (Date.now() - state.firstActionAt) / (1000 * 60 * 60 * 24);
    if (daysSinceFirst < MIN_DAYS_SINCE_FIRST_USE) return false;
  }

  // Respect cooldown between prompts
  if (state.lastPromptedAt) {
    const daysSince = (Date.now() - state.lastPromptedAt) / (1000 * 60 * 60 * 24);
    if (daysSince < MIN_DAYS_BETWEEN_PROMPTS) return false;
  }

  return true;
}

export function useAppReview() {
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);

  const recordPositiveAction = useCallback(async () => {
    if (!Capacitor.isNativePlatform()) return;

    const state = await getState();

    // Track first ever action timestamp
    if (!state.firstActionAt) {
      state.firstActionAt = Date.now();
    }

    state.positiveActionCount += 1;

    if (shouldShowSheet(state)) {
      setShowReviewPrompt(true);
    }

    await saveState(state);
  }, []);

  // User tapped "Sure, happy to" → trigger native review dialog
  const handleRate = useCallback(async () => {
    setShowReviewPrompt(false);

    try {
      await InAppReview.requestReview();
    } catch (err) {
      console.warn('[AppReview] requestReview failed (non-fatal):', err);
    }

    const state = await getState();
    state.lastPromptedAt = Date.now();
    state.totalPrompts += 1;
    state.positiveActionCount = 0;
    await saveState(state);
  }, []);

  // User tapped "Not Now" → dismiss, still count as a prompt for cooldown
  const handleDismiss = useCallback(async () => {
    setShowReviewPrompt(false);

    const state = await getState();
    state.lastPromptedAt = Date.now();
    state.totalPrompts += 1;
    state.positiveActionCount = 0;
    await saveState(state);
  }, []);

  return {
    showReviewPrompt,
    recordPositiveAction,
    handleRate,
    handleDismiss,
  };
}
