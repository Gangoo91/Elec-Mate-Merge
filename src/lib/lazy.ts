// Lazy loading utilities for route components

const LAZY_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;

/**
 * Check if an error is a chunk loading error
 */
function isChunkError(error: Error): boolean {
  const msg = error.message?.toLowerCase() || '';
  return (
    msg.includes('failed to fetch') ||
    msg.includes('dynamically imported module') ||
    msg.includes('loading chunk') ||
    msg.includes('importing a module script failed') ||
    msg.includes('failed to load module script')
  );
}

/**
 * Wraps a dynamic import with timeout and retry logic for chunk failures
 */
export function withTimeout<T>(
  importFn: () => Promise<T>,
  timeout: number = LAZY_TIMEOUT
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const attemptLoad = () => {
      const timer = setTimeout(() => {
        if (attempts < MAX_RETRIES) {
          attempts++;
          console.log(`[lazy] Timeout, retrying (attempt ${attempts + 1})`);
          attemptLoad();
        } else {
          reject(new Error(`Component loading timed out after ${timeout}ms`));
        }
      }, timeout);

      importFn()
        .then((module) => {
          clearTimeout(timer);
          resolve(module);
        })
        .catch((error) => {
          clearTimeout(timer);

          // Retry on chunk loading errors
          if (isChunkError(error) && attempts < MAX_RETRIES) {
            attempts++;
            console.log(`[lazy] Chunk error, retrying (attempt ${attempts + 1}):`, error.message);

            // Clear caches on last retry
            if (attempts === MAX_RETRIES && 'caches' in window) {
              caches.keys()
                .then(keys => Promise.all(keys.map(k => caches.delete(k))))
                .finally(() => setTimeout(attemptLoad, 500 * attempts));
            } else {
              setTimeout(attemptLoad, 500 * attempts);
            }
          } else {
            reject(error);
          }
        });
    };

    attemptLoad();
  });
}

/**
 * Tracks import for debugging purposes
 */
export function trackImport<T>(
  name: string,
  importFn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();

  return importFn().then((module) => {
    const loadTime = performance.now() - startTime;
    if (loadTime > 1000) {
      console.warn(`Slow component load: ${name} took ${loadTime.toFixed(0)}ms`);
    }
    return module;
  });
}
