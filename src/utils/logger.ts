
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// Set the current log level - can be controlled by environment variable
const CURRENT_LOG_LEVEL = import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.WARN;

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
   * Log error messages
   */
  error: (message: string, error?: any, ...data: any[]) => {
    if (CURRENT_LOG_LEVEL <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, error, ...data);
    }
  },

  /**
   * Log performance metrics
   */
  perf: (label: string) => {
    if (CURRENT_LOG_LEVEL <= LogLevel.DEBUG) {
      console.time(`[PERF] ${label}`);
      return () => console.timeEnd(`[PERF] ${label}`);
    }
    return () => {};
  }
};
