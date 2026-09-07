import { captureError, addBreadcrumb } from '@/lib/sentry';

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

// Set the current log level - can be controlled by environment variable
const CURRENT_LOG_LEVEL = import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.WARN;

/**
 * Generate a unique request ID for tracing requests across frontend and edge functions
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

const ABORT_PATTERN = /AbortError|Fetch is aborted|signal timed out|Request was aborted|TimeoutError/i;

function abortReason(error: unknown): string {
  if (!error || typeof error !== 'object') return String(error ?? '');
  const e = error as { name?: string; message?: string; hint?: string; details?: string };
  return [e.name, e.message, e.hint, e.details].filter(Boolean).join(' | ');
}

/** True for the browser / Supabase abort and timeout shapes — see logger.api().error. */
export function isAbortLike(error: unknown): boolean {
  if (!error) return false;
  if (
    typeof DOMException !== 'undefined' &&
    error instanceof DOMException &&
    (error.name === 'AbortError' || error.name === 'TimeoutError')
  ) {
    return true;
  }
  return ABORT_PATTERN.test(abortReason(error));
}

/**
 * Logger utility for consistent logging across the application
 */
export const logger = {
  /**
   * Log debug information (only in development)
   */
  debug: (message: string, ...data: any[]) => {
    if (CURRENT_LOG_LEVEL <= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...data);
    }
  },

  /**
   * Log informational messages
   */
  info: (message: string, ...data: any[]) => {
    if (CURRENT_LOG_LEVEL <= LogLevel.INFO) {
      console.info(`[INFO] ${message}`, ...data);
    }
  },

  /**
   * Log warning messages
   */
  warn: (message: string, ...data: any[]) => {
    if (CURRENT_LOG_LEVEL <= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...data);
    }
  },

  /**
   * Log error messages and automatically capture to Sentry
   */
  error: (message: string, error?: any, context?: Record<string, unknown>) => {
    if (CURRENT_LOG_LEVEL <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, error, context);
    }
    // Auto-capture to Sentry for all errors
    if (error instanceof Error) {
      captureError(error, { message, ...context });
    } else if (error) {
      captureError(new Error(message), { originalError: error, ...context });
    }
  },

  /**
   * Log user actions as Sentry breadcrumbs for debugging user journeys
   */
  action: (action: string, category: string, data?: Record<string, unknown>) => {
    if (CURRENT_LOG_LEVEL <= LogLevel.INFO) {
      console.info(`[ACTION] ${category}: ${action}`, data);
    }
    addBreadcrumb(action, category, data);
  },

  /**
   * Structured API request logging with request ID correlation
   */
  api: (endpoint: string, requestId: string) => ({
    start: (data?: Record<string, unknown>) => {
      if (CURRENT_LOG_LEVEL <= LogLevel.INFO) {
        console.info(`[API] ${endpoint} started`, { requestId, ...data });
      }
      addBreadcrumb(`API call started: ${endpoint}`, 'api', { requestId, ...data });
    },
    success: (data?: Record<string, unknown>) => {
      if (CURRENT_LOG_LEVEL <= LogLevel.INFO) {
        console.info(`[API] ${endpoint} succeeded`, { requestId, ...data });
      }
      addBreadcrumb(`API call succeeded: ${endpoint}`, 'api', { requestId, ...data });
    },
    error: (error: any, context?: Record<string, unknown>) => {
      console.error(`[API] ${endpoint} failed`, { requestId, error, ...context });
      // The Supabase client aborts any request after 30s (client.ts) and the
      // browser aborts in-flight fetches on navigation or app backgrounding.
      // Those arrive here as a PostgrestError-shaped object whose message is
      // "AbortError: Fetch is aborted" — a dead connection on a phone, not a
      // server fault. Reporting them as exceptions made company_profiles/fetch
      // a 27-event, 10-user "error" (Sentry 58/A8) nobody could act on. The
      // Sentry beforeSend downgrade never saw them because the abort text sits
      // on the nested object, not on the exception message.
      if (isAbortLike(error)) {
        addBreadcrumb(`API call aborted: ${endpoint}`, 'api', {
          requestId,
          reason: abortReason(error),
          ...context,
        });
        return;
      }
      if (error instanceof Error) {
        captureError(error, { endpoint, requestId, ...context });
      } else {
        captureError(new Error(`API call failed: ${endpoint}`), {
          endpoint,
          requestId,
          originalError: error,
          ...context,
        });
      }
    },
  }),

  /**
   * Log performance metrics
   */
  perf: (label: string) => {
    if (CURRENT_LOG_LEVEL <= LogLevel.DEBUG) {
      console.time(`[PERF] ${label}`);
      return () => console.timeEnd(`[PERF] ${label}`);
    }
    return () => {};
  },
};
