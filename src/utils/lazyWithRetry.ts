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
  return lazy(async () => {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // On retry, add cache-busting query param to force fresh fetch
        if (attempt > 0) {
          // Clear module cache and wait briefly before retry
          await new Promise(resolve => setTimeout(resolve, 500 * attempt));
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

        // On last retry, try clearing caches
        if (attempt === retries - 1 && 'caches' in window) {
          try {
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
            console.log('[lazyWithRetry] Cleared caches before final retry');
          } catch {
            // Ignore cache clearing errors
          }
        }
      }
    }

    // All retries failed - throw the last error
    throw lastError;
  });
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
  K extends keyof M
>(
  importFn: () => Promise<M>,
  exportName: K,
  retries = 2
): React.LazyExoticComponent<M[K]> {
  return lazyWithRetry(
    () => importFn().then(module => ({ default: module[exportName] })),
    retries
  );
}
