/**
 * Retry Logic with Exponential Backoff
 * Provides resilient external API calls with configurable retry behavior
 */

export interface RetryConfig {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
}

const DEFAULT_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 10000,
  shouldRetry: (error: unknown) => {
    // Retry on network errors, rate limits, and temporary server errors
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return message.includes('rate limit') || 
             message.includes('timeout') || 
             message.includes('network') ||
             message.includes('econnreset') ||
             message.includes('502') ||
             message.includes('503') ||
             message.includes('429');
    }
    return false;
  }
};

/**
 * Calculate delay with exponential backoff and jitter
 */
function calculateDelay(attempt: number, baseDelayMs: number, maxDelayMs: number): number {
  const exponentialDelay = baseDelayMs * Math.pow(2, attempt);
  const jitter = Math.random() * 0.3 * exponentialDelay; // 0-30% jitter
  return Math.min(exponentialDelay + jitter, maxDelayMs);
}

/**
 * Execute a function with retry logic
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const { maxRetries, baseDelayMs, maxDelayMs, shouldRetry } = {
    ...DEFAULT_CONFIG,
    ...config
  };

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry if we've exhausted attempts
      if (attempt === maxRetries) {
        break;
      }

      // Check if error is retryable
      if (!shouldRetry(error)) {
        console.error(`❌ Non-retryable error on attempt ${attempt + 1}:`, error);
        throw error;
      }

      // Calculate delay and wait
      const delay = calculateDelay(attempt, baseDelayMs, maxDelayMs);
      console.warn(
        `⚠️ Attempt ${attempt + 1}/${maxRetries + 1} failed, retrying in ${Math.round(delay)}ms...`,
        error
      );
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.error(`❌ All ${maxRetries + 1} attempts failed`);
  throw lastError;
}

/**
 * Retry configuration presets for common scenarios
 */
export const RetryPresets = {
  /** Fast retry for lightweight operations (3 attempts, 500ms base) */
  FAST: { maxRetries: 3, baseDelayMs: 500, maxDelayMs: 5000 } as RetryConfig,
  
  /** Standard retry for most API calls (3 attempts, 1s base) */
  STANDARD: { maxRetries: 3, baseDelayMs: 1000, maxDelayMs: 10000 } as RetryConfig,
  
  /** Aggressive retry for critical operations (5 attempts, 2s base) */
  AGGRESSIVE: { maxRetries: 5, baseDelayMs: 2000, maxDelayMs: 30000 } as RetryConfig,
};
