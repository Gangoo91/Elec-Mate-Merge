/**
 * Timeout Protection for External API Calls
 * Prevents hanging requests from blocking edge functions
 */

export class TimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Operation timed out after ${timeoutMs}ms`);
    this.name = 'TimeoutError';
  }
}

/**
 * Wrap a promise with a timeout
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  operation?: string
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      const message = operation 
        ? `${operation} timed out after ${timeoutMs}ms`
        : `Operation timed out after ${timeoutMs}ms`;
      reject(new TimeoutError(timeoutMs));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.error(`⏱️ Timeout: ${operation || 'Operation'} exceeded ${timeoutMs}ms`);
    }
    throw error;
  }
}

/**
 * Timeout presets for common operations
 */
export const Timeouts = {
  /** Quick operations (5s) - health checks, cache reads */
  QUICK: 5000,
  
  /** Standard API calls (30s) - OpenAI, Lovable AI */
  STANDARD: 30000,
  
  /** Long-running operations (60s) - web scraping, embeddings */
  LONG: 60000,
  
  /** Extended operations (90s) - complex AI generation with RAG */
  EXTENDED: 90000,
  
  /** Critical timeout (2 minutes) - batch processing */
  CRITICAL: 120000,
  
  /** AI call timeout (30s) - Fast failure detection for Gemini/GPT */
  AI_CALL: 30000,
};

/**
 * Create a timeout-protected version of a function
 */
export function withTimeoutWrapper<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  timeoutMs: number,
  operation?: string
): T {
  return ((...args: Parameters<T>) => {
    return withTimeout(fn(...args), timeoutMs, operation);
  }) as T;
}
