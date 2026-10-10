/**
 * Where each page was opened from, so Back can go back to it.
 *
 * Back buttons used to push a fixed parent address. Open a learner from the
 * Learners list, tap Back, and you landed on the Assessment hub; the browser's
 * own back then stepped forward into the learner again. Now:
 *
 *   - opened from another page in the app  → Back returns to exactly that page
 *     (same filters, same scroll position);
 *   - opened cold (a link, a new tab, a refresh with no history) → Back goes to
 *     the page's parent, replacing this entry so the browser's back never loops.
 *
 * ScrollToTop records every navigation here (it already sees them all), keyed
 * by the history entry's key, which survives a refresh. Scroll positions are
 * kept the same way so going back lands where you left the page.
 */
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Entry = { path: string; from: string | null; y: number };

const STORE = 'em-nav-history-v1';
const MAX = 200;

let entries: Record<string, Entry> | null = null;

function load(): Record<string, Entry> {
  if (entries) return entries;
  try {
    entries = JSON.parse(sessionStorage.getItem(STORE) || '{}') as Record<string, Entry>;
  } catch {
    entries = {};
  }
  return entries;
}

function save() {
  try {
    const all = load();
    const keys = Object.keys(all);
    if (keys.length > MAX) for (const k of keys.slice(0, keys.length - MAX)) delete all[k];
    sessionStorage.setItem(STORE, JSON.stringify(all));
  } catch {
    /* storage blocked: Back falls back to the parent page */
  }
}

/** The page's address as Back should compare it: path and query, no hash. */
export const pathOf = (l: { pathname: string; search: string }) => `${l.pathname}${l.search}`;

/** Record a navigation. `kind` is react-router's navigation type. */
export function recordNavigation(
  key: string,
  path: string,
  kind: 'PUSH' | 'REPLACE' | 'POP',
  previousKey: string | null
) {
  const all = load();
  if (kind === 'POP') {
    if (!all[key]) all[key] = { path, from: null, y: 0 };
  } else if (kind === 'PUSH') {
    all[key] = { path, from: previousKey ? (all[previousKey]?.path ?? null) : null, y: 0 };
  } else {
    // A replace keeps the entry's place in history, so it keeps where it came from.
    all[key] = { path, from: previousKey ? (all[previousKey]?.from ?? null) : null, y: 0 };
  }
  save();
}

export function rememberScroll(key: string, y: number) {
  const all = load();
  if (!all[key]) return;
  all[key].y = Math.max(0, Math.round(y));
  save();
}

export function savedScroll(key: string): number {
  return load()[key]?.y ?? 0;
}

/** Pages Back should never return to: sign-in and joining screens redirect on. */
const SKIP = /^\/(auth|login|signin|sign-in|signup|college\/join|college\/setup)\b/;

/** Where this history entry was opened from, if it was opened inside the app. */
export function openedFrom(key: string): string | null {
  const from = load()[key]?.from ?? null;
  return from && !SKIP.test(from) ? from : null;
}

/**
 * Back that returns to where you came from, else to `fallback`.
 *
 *   const back = useSmartBack();
 *   <button onClick={() => back('/college?section=peoplehub')}>Back</button>
 */
export function useSmartBack() {
  const navigate = useNavigate();
  const location = useLocation();
  return useCallback(
    (fallback: string) => {
      if (openedFrom(location.key)) navigate(-1);
      else navigate(fallback, { replace: true });
    },
    [navigate, location.key]
  );
}

/**
 * "Back to <a list>" from a page that finishes something (a quiz submitted,
 * a lesson delivered). If the page was opened from that list, step back to it
 * (same filters, same scroll); otherwise swap this page for the list, so the
 * list's own Back returns to where this page was opened from instead of into
 * the finished page.
 *
 *   const returnTo = useReturnTo();
 *   <button onClick={() => returnTo('/apprentice/college/activities')}>Back to your quizzes</button>
 */
export function useReturnTo() {
  const navigate = useNavigate();
  const location = useLocation();
  return useCallback(
    (path: string) => {
      const from = openedFrom(location.key);
      if (from && from.split('#')[0].split('?')[0] === path.split('#')[0].split('?')[0])
        navigate(-1);
      else navigate(path, { replace: true });
    },
    [navigate, location.key]
  );
}
