/**
 * useReferralPrompt — fire `<ReferralShareSheet>` at peak satisfaction
 * moments so users actually share. Mirrors `useAppReview`'s pattern but
 * with different milestones + a separate counter so a single success
 * doesn't fire BOTH the review prompt and the share prompt at once.
 *
 * Background: only 17 of 939 users have ever tapped a referral share
 * button (verified 2026-05-23). The engine works mechanically (9/17 of
 * those shares became signups → 7 rewards paid). The gap is discoverability —
 * users never get prompted at the moment they'd actually advocate. This
 * hook fixes that.
 *
 * Call `recordPositiveAction()` after the same wins useAppReview tracks
 * (cert export, quote send, RAMS generated, invoice sent). The hook owns
 * the dedupe + cooldown logic.
 *
 * Conditions to show:
 *   - Native (iOS/Android) — web users have the BringAMate banner on dashboard
 *   - 5+ positive actions (user has actually USED the app — earned advocacy)
 *   - 60+ days since last share prompt (or never)
 *   - Max 3 share prompts per year (don't burn the user out)
 *
 * State persisted via @capacitor/preferences (survives WKWebView cache).
 */

import { useState, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const STORAGE_KEY = 'elec_mate_referral_prompt';
const MIN_ACTIONS_BEFORE_PROMPT = 5;
const MIN_DAYS_BETWEEN_PROMPTS = 60;
const MAX_PROMPTS_PER_YEAR = 3;

interface ReferralPromptState {
  positiveActionCount: number;
  lastPromptedAt: number | null;
  totalPrompts: number;
  promptsThisYear: number;
  yearAnchor: number | null;
}

const DEFAULT_STATE: ReferralPromptState = {
  positiveActionCount: 0,
  lastPromptedAt: null,
  totalPrompts: 0,
  promptsThisYear: 0,
  yearAnchor: null,
};

async function getState(): Promise<ReferralPromptState> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      if (value) return { ...DEFAULT_STATE, ...JSON.parse(value) };
    } else {
      const stored = storageGetJSONSync<ReferralPromptState | null>(STORAGE_KEY, null);
      if (stored) return { ...DEFAULT_STATE, ...stored };
    }
  } catch {
    /* ignore parse/storage errors */
  }
  return { ...DEFAULT_STATE };
}

async function saveState(state: ReferralPromptState): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    try {
      await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(state) });
    } catch {
      /* ignore */
    }
  } else {
    storageSetJSONSync(STORAGE_KEY, state);
  }
}

function rollYearIfNeeded(state: ReferralPromptState): ReferralPromptState {
  const now = Date.now();
  const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
  if (!state.yearAnchor) {
    return { ...state, yearAnchor: now };
  }
  if (now - state.yearAnchor > ONE_YEAR_MS) {
    return { ...state, yearAnchor: now, promptsThisYear: 0 };
  }
  return state;
}

function shouldShow(state: ReferralPromptState): boolean {
  if (state.promptsThisYear >= MAX_PROMPTS_PER_YEAR) return false;
  if (state.positiveActionCount < MIN_ACTIONS_BEFORE_PROMPT) return false;
  if (state.lastPromptedAt) {
    const daysSince = (Date.now() - state.lastPromptedAt) / (1000 * 60 * 60 * 24);
    if (daysSince < MIN_DAYS_BETWEEN_PROMPTS) return false;
  }
  return true;
}

export function useReferralPrompt() {
  const [showReferralPrompt, setShowReferralPrompt] = useState(false);

  const recordPositiveAction = useCallback(async () => {
    // Native only — web has the BringAMate dashboard banner instead, which
    // serves the same function without modal interruption.
    if (!Capacitor.isNativePlatform()) return;

    let state = await getState();
    state = rollYearIfNeeded(state);
    state.positiveActionCount += 1;

    if (shouldShow(state)) {
      setShowReferralPrompt(true);
    }

    await saveState(state);
  }, []);

  // Called when the share sheet closes (either after sharing or dismissing).
  // We don't distinguish — fact that we've prompted is what matters for
  // cooldown. Reset the action counter so the next prompt requires another
  // 5 wins.
  const handleClose = useCallback(async () => {
    setShowReferralPrompt(false);
    let state = await getState();
    state = rollYearIfNeeded(state);
    state.lastPromptedAt = Date.now();
    state.totalPrompts += 1;
    state.promptsThisYear += 1;
    state.positiveActionCount = 0;
    await saveState(state);
  }, []);

  return {
    showReferralPrompt,
    recordPositiveAction,
    handleClose,
  };
}
