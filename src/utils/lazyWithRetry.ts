import { lazy, ComponentType } from 'react';

/**
 * Wrapper around React.lazy that retries failed dynamic imports.
 * Handles chunk loading failures after deployments by retrying with cache-busting.
 *
 * @param importFn - The dynamic import function, e.g., () => import('./MyComponent')
 * @param retries - Number of retry attempts (default: 2)
 * @returns A lazy-loaded component
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  retries = 2
): React.LazyExoticComponent<T> {
  return lazy(() => importWithRetry(importFn, retries));
}

/**
 * The same recovery, for a dynamic import that is NOT a React component.
 * ────────────────────────────────────────────────────────────────────────
 * ELE-1750. Craig Soper could not issue a Minor Works certificate:
 *
 *   "Failed to fetch dynamically imported module:
 *    https://www.elec-mate.com/assets/IqsReviewPdf-C2wOb7K7.js"
 *
 * That chunk returns 404. His browser was running a build from before a
 * deploy, asking for an asset hash that no longer exists — and the import sat
 * in `minorWorksJsonFormatter`, which is a plain `await import()`, not a lazy
 * component. So none of the recovery above applied and the certificate simply
 * failed.
 *
 * `lazyWithRetry` only ever protected React route components. There are ~249
 * bare `await import()` calls in the codebase and every one of them can fail
 * this way for anyone with the app open across a deploy — which is every
 * deploy, for someone.
 *
 * Deliberately the SAME function rather than a second copy: the comment above
 * ends "Keep all four in step", and a fifth path that drifts is how the
 * service-worker case got missed the first time.
 */
export function importWithRetry<T>(importFn: () => Promise<T>, retries = 2): Promise<T> {
  return (async () => {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // On retry, add cache-busting query param to force fresh fetch
        if (attempt > 0) {
          // Clear module cache and wait briefly before retry
          await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
          console.log(`[lazyWithRetry] Retry attempt ${attempt} for module`);
        }

        return await importFn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        const isChunkError =
          lastError.message.includes('Failed to fetch') ||
          lastError.message.includes('dynamically imported module') ||
          lastError.message.includes('Loading chunk') ||
          lastError.message.includes('Importing a module script failed');

        // Only retry on chunk/network errors, not other errors
        if (!isChunkError) {
          throw error;
        }

        // On last retry, clear caches AND unregister the service worker.
        //
        // ELE-1437: clearing Cache Storage alone is not enough. `sw.ts`
        // registers a Workbox NavigationRoute that serves the PRECACHED
        // index.html for every navigation, so a still-registered worker can
        // answer the retry with the very same stale HTML — pointing at the
        // same missing chunk — and fail identically. The inline handler in
        // index.html, `handleChunkError` in main.tsx and ErrorBoundary all
        // unregister; this path was the last one that did not. Keep all four
        // in step.
        if (attempt === retries - 1) {
          try {
            if ('serviceWorker' in navigator) {
              const regs = await navigator.serviceWorker.getRegistrations();
              await Promise.all(regs.map((r) => r.unregister()));
            }
            if ('caches' in window) {
              const keys = await caches.keys();
              await Promise.all(keys.map((k) => caches.delete(k)));
            }
            console.log('[lazyWithRetry] Cleared caches + unregistered SW before final retry');
          } catch {
            // Ignore cleanup errors — the reload below is the real fallback
          }
        }
      }
    }

    // All retries failed - force page reload for stale chunks
    // This happens when deployment renamed chunks and user has old bundle
    console.error('[lazyWithRetry] All retries failed, forcing page reload');

    /*
     * Loop guard — one reload per INCIDENT, not one per session.
     *
     * The timestamp written below was never read: the check was
     * `if (!sessionStorage.getItem(key))`, so any session that had reloaded
     * once stayed unprotected for the rest of its life. A reload fetches a
     * fresh index.html and a complete new set of chunks, so a second failure
     * minutes later is a NEW deploy, not the same loop — and refusing to
     * recover from it is how someone ends up unable to issue a certificate
     * (ELE-1750).
     *
     * That mattered less when only route components could reach this. It now
     * backs `importWithRetry` as well, so every dynamic import in the app
     * shares this guard and one stale flag would silence all of them.
     *
     * A genuine loop reloads within seconds, so anything older than the
     * window is treated as a fresh incident.
     */
    const reloadKey = 'lazyRetry_reloaded';
    const RELOAD_LOOP_WINDOW_MS = 30_000;
    const previousReload = Number(sessionStorage.getItem(reloadKey) ?? '');
    const hasReloaded =
      Number.isFinite(previousReload) &&
      previousReload > 0 &&
      Date.now() - previousReload < RELOAD_LOOP_WINDOW_MS;

    if (!hasReloaded) {
      sessionStorage.setItem(reloadKey, Date.now().toString());
      // Cache-busting URL reload — plain reload() can serve the same stale
      // HTML from disk cache (Firefox on Windows especially), re-pointing us
      // at the same missing chunk and looping forever.
      const sep = window.location.href.includes('?') ? '&' : '?';
      window.location.href = window.location.href + sep + '_cb=' + Date.now();
      // Throw (not a pending-forever promise) so the Suspense boundary's
      // ErrorBoundary catches immediately and shows a recoverable UI if the
      // navigation doesn't complete fast enough.
      throw lastError;
    }

    // Already reloaded once - clear flag and throw error
    sessionStorage.removeItem(reloadKey);
    throw lastError;
  })();
}

/**
 * Helper to create a lazy component with named export support and retry logic.
 *
 * @example
 * const MyComponent = lazyWithRetryNamed(
 *   () => import('./MyModule'),
 *   'MyComponent'
 * );
 */
export function lazyWithRetryNamed<
  M extends Record<string, ComponentType<unknown>>,
  K extends keyof M,
>(importFn: () => Promise<M>, exportName: K, retries = 2): React.LazyExoticComponent<M[K]> {
  return lazyWithRetry(
    () => importFn().then((module) => ({ default: module[exportName] })),
    retries
  );
}
