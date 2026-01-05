// Lazy loading utilities for route components

const LAZY_TIMEOUT = 10000; // 10 seconds

/**
 * Wraps a dynamic import with a timeout
 */
export function withTimeout<T>(
  importFn: () => Promise<T>,
  timeout: number = LAZY_TIMEOUT
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Component loading timed out after ${timeout}ms`));
    }, timeout);

    importFn()
      .then((module) => {
        clearTimeout(timer);
        resolve(module);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
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
