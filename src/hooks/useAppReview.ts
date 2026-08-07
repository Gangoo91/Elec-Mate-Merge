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
 *   - Invoice sent / marked paid
 *
 * The sheet is mounted ONCE at the app root by <AppReviewPromptHost>, and this
 * hook signals it through the module-level listener below.
 *
 * Why not per-component state: the sheet used to live in each caller's own
 * `useState`, so a win recorded in a component that didn't also render
 * <AppReviewPromptSheet> counted towards the gates but could never show the
 * prompt — six of the nine call sites were in exactly that state. It also
 * could never have worked in InvoiceSendDropdown, which renders once per row
 * in the invoice list and would have mounted one sheet per invoice.
 *
 * State persisted via @capacitor/preferences (survives WKWebView cache clears).
 */

import { useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { InAppReview } from '@capacitor-community/in-app-review';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const STORAGE_KEY = 'elec_mate_app_review';
// Gates loosened 2026-05-23. Previous (3 actions / 7 days first-use / 90 day
// cooldown) was too conservative — only 5 App Store reviews accumulated.
// New gates strike at first success (peak satisfaction) but still respect
// Apple's hard cap of 3 prompts per 365-day window.
const MIN_ACTIONS_BEFORE_PROMPT = 1;
const MIN_DAYS_BETWEEN_PROMPTS = 60;
const MAX_PROMPTS_PER_YEAR = 3;
const MIN_DAYS_SINCE_FIRST_USE = 2;

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

type PromptListener = () => void;

// Module-level rather than context: the host is mounted once at the root, and
// call sites are scattered deep in the tree (list rows, dropdowns, cert pages).
let promptListener: PromptListener | null = null;

/** Called by <AppReviewPromptHost>. Returns an unsubscribe function. */
export function subscribeToReviewPrompt(listener: PromptListener): () => void {
  promptListener = listener;
  return () => {
    if (promptListener === listener) promptListener = null;
  };
}

// Fallback deep links, used only when the native in-app flow can't run. The
// itms-apps:// and market:// schemes open the store APP directly rather than a
// web page — an https:// App Store link would open in SFSafariViewController,
// where the user can't actually leave a rating.
const STORE_REVIEW_URLS: Record<string, string> = {
  // App ID 6758948665 / bundle com.elecmate.app
  ios: 'itms-apps://itunes.apple.com/app/id6758948665?action=write-review',
  android: 'market://details?id=com.elecmate.app',
};

/**
 * Trigger the store review flow. Never throws.
 *
 * Prefers the native in-app sheet (SKStoreReviewController on iOS, Play
 * In-App Review on Android) — the user rates without leaving the app, which
 * converts far better. The plugin picks the correct store per platform.
 *
 * If that fails, fall back to the store's own review page so tapping
 * "Sure, happy to" always does something. Previously a failure was swallowed
 * and the button silently did nothing.
 */
export async function requestNativeReview(): Promise<void> {
  try {
    await InAppReview.requestReview();
    return;
  } catch (err) {
    console.warn('[AppReview] in-app review unavailable, opening store:', err);
  }

  const url = STORE_REVIEW_URLS[Capacitor.getPlatform()];
  if (!url) return;

  try {
    window.location.href = url;
  } catch (err) {
    console.warn('[AppReview] store deep link failed (non-fatal):', err);
  }
}

/**
 * Record that a prompt was shown — starts the cooldown and resets the action
 * count. Called whether the user rated or dismissed; a dismissal still counts
 * towards Apple's 3-per-year cap because the native dialog may have consumed one.
 */
export async function markPromptShown(): Promise<void> {
  const state = await getState();
  state.lastPromptedAt = Date.now();
  state.totalPrompts += 1;
  state.positiveActionCount = 0;
  await saveState(state);
}

export function useAppReview() {
  const recordPositiveAction = useCallback(async () => {
    if (!Capacitor.isNativePlatform()) return;

    const state = await getState();

    // Track first ever action timestamp
    if (!state.firstActionAt) {
      state.firstActionAt = Date.now();
    }

    state.positiveActionCount += 1;

    if (shouldShowSheet(state)) {
      promptListener?.();
    }

    await saveState(state);
  }, []);

  return { recordPositiveAction };
}
