import { Capacitor } from '@capacitor/core';
import { InAppReview } from '@capacitor-community/in-app-review';

const STORAGE_KEY = 'elec_mate_app_review';
const MIN_ACTIONS_BEFORE_PROMPT = 3;   // user must complete 3 positive actions
const MIN_DAYS_BETWEEN_PROMPTS = 30;   // never prompt more than once per 30 days

interface ReviewState {
  positiveActionCount: number;
  lastPromptedAt: number | null; // unix timestamp ms
  totalPrompts: number;
}

function getState(): ReviewState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { positiveActionCount: 0, lastPromptedAt: null, totalPrompts: 0 };
}

function saveState(state: ReviewState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function shouldPrompt(state: ReviewState): boolean {
  // Apple allows 3 prompts per year — SKStoreReviewRequest handles rate limiting
  // but we also do our own check to be respectful
  if (state.totalPrompts >= 3) return false;
  if (state.positiveActionCount < MIN_ACTIONS_BEFORE_PROMPT) return false;
  if (state.lastPromptedAt) {
    const daysSince = (Date.now() - state.lastPromptedAt) / (1000 * 60 * 60 * 24);
    if (daysSince < MIN_DAYS_BETWEEN_PROMPTS) return false;
  }
  return true;
}

/**
 * useAppReview — Native iOS/Android app store review prompt.
 *
 * Call `recordPositiveAction()` after meaningful user wins:
 *   - Certificate saved
 *   - Quote sent
 *   - Subscription purchased
 *
 * The prompt only fires on native platforms, after enough positive actions,
 * and respects a 30-day cooldown. Apple's OS ultimately decides whether
 * to show the dialog (max 3 times per year).
 */
export function useAppReview() {
  const recordPositiveAction = async () => {
    if (!Capacitor.isNativePlatform()) return;

    const state = getState();
    state.positiveActionCount += 1;

    if (shouldPrompt(state)) {
      try {
        await InAppReview.requestReview();
        state.lastPromptedAt = Date.now();
        state.totalPrompts += 1;
        state.positiveActionCount = 0; // reset counter after prompting
      } catch (err) {
        console.warn('[AppReview] requestReview failed (non-fatal):', err);
      }
    }

    saveState(state);
  };

  return { recordPositiveAction };
}
