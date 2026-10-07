/**
 * "Don't reload me now" — for screens where a reload costs the learner work.
 *
 * Andrzej (7 Oct 2026): his page reloaded itself about an hour after he
 * finished a Level 3 paper, while he was going through the questions he got
 * wrong. Two things in the app reload the page on their own:
 *
 *   1. a new version going live (the service worker update), and
 *   2. the stale-chunk handlers (index.html, main.tsx), which wipe the caches
 *      and reload as soon as an old build fails to fetch a file.
 *
 * Both now check here first. While a hold is on they leave the page alone and
 * raise `STALE_BUILD_EVENT` instead, and <PWAUpdatePrompt> offers a Reload
 * button the learner presses when THEY are ready.
 *
 * Held while: a mock paper is being sat or its results are open
 * (useExamAttempt), a revision round is running, or anything sets the
 * `exam-active` body class (every paper does while it is being sat). The
 * inline handler in index.html can't import this file, so the count also lives
 * on `window.__elecMateReloadHolds` — keep the two in step.
 */
import { useEffect } from 'react';

declare global {
  interface Window {
    __elecMateReloadHolds?: number;
  }
}

export const STALE_BUILD_EVENT = 'elecmate:stale-build';

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

export function isReloadHeld(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    (window.__elecMateReloadHolds ?? 0) > 0 ||
    document.body?.classList.contains('exam-active') === true
  );
}

/** Take a hold; call the returned function to release it. */
export function holdReloads(): () => void {
  window.__elecMateReloadHolds = (window.__elecMateReloadHolds ?? 0) + 1;
  notify();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    window.__elecMateReloadHolds = Math.max(0, (window.__elecMateReloadHolds ?? 1) - 1);
    notify();
  };
}

// Papers outside useExamAttempt only set the `exam-active` body class; watch it
// so the update prompt hides for them too.
let bodyObserver: MutationObserver | null = null;

export function subscribeReloadHold(fn: () => void): () => void {
  listeners.add(fn);
  if (!bodyObserver && typeof MutationObserver !== 'undefined' && document.body) {
    bodyObserver = new MutationObserver(notify);
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0 && bodyObserver) {
      bodyObserver.disconnect();
      bodyObserver = null;
    }
  };
}

/** Hold reloads while `when` is true. */
export function useHoldReloads(when: boolean) {
  useEffect(() => {
    if (!when) return;
    return holdReloads();
  }, [when]);
}

/** Tell the page a newer build is out (we didn't reload because of a hold). */
export function announceStaleBuild() {
  try {
    window.dispatchEvent(new CustomEvent(STALE_BUILD_EVENT));
  } catch {
    /* very old browsers: the next launch picks the new build up anyway */
  }
}
