/**
 * Structured Logging Framework
 * Provides consistent, searchable logs across all edge functions
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogMetadata {
  [key: string]: unknown;
  requestId?: string;
  userId?: string;
  agentName?: string;
  duration?: number;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  metadata?: LogMetadata;
  timestamp: string;
  function?: string;
}

/**
 * Create a structured log entry
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  metadata?: LogMetadata
): LogEntry {
  return {
    level,
    message,
    metadata,
    timestamp: new Date().toISOString(),
    function: Deno.env.get('FUNCTION_NAME'),
  };
}

/**
 * Format log entry for output
 */
function formatLog(entry: LogEntry): string {
  const { level, message, metadata, timestamp, function: fnName } = entry;
  const metaStr = metadata ? ` - ${JSON.stringify(metadata)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] [${fnName || 'unknown'}] ${message}${metaStr}`;
}

/**
 * Logger class with request context
 */
export class Logger {
  private requestId?: string;
  private baseMetadata: LogMetadata = {};

  constructor(requestId?: string, baseMetadata?: LogMetadata) {
    this.requestId = requestId;
    this.baseMetadata = baseMetadata || {};
  }

  private log(level: LogLevel, message: string, metadata?: LogMetadata) {
    const fullMetadata = {
      ...this.baseMetadata,
      ...metadata,
      requestId: this.requestId,
    };

    const entry = createLogEntry(level, message, fullMetadata);
    const formatted = formatLog(entry);

    switch (level) {
      case 'debug':
        console.debug(formatted);
        break;
      case 'info':
        console.info(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'error':
        console.error(formatted);
        break;
    }
  }

  debug(message: string, metadata?: LogMetadata) {
    this.log('debug', message, metadata);
  }

  info(message: string, metadata?: LogMetadata) {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: LogMetadata) {
    this.log('warn', message, metadata);
  }

  error(message: string, metadata?: LogMetadata) {
    this.log('error', message, metadata);
  }

  /**
   * Create a child logger with additional context
   */
  child(metadata: LogMetadata): Logger {
    return new Logger(this.requestId, {
      ...this.baseMetadata,
      ...metadata,
    });
  }

  /**
   * Time an operation and log duration
   */
  async time<T>(
    operation: string,
    fn: () => Promise<T>,
    metadata?: LogMetadata
  ): Promise<T> {
    const start = Date.now();
    this.debug(`Starting ${operation}`, metadata);

    try {
      const result = await fn();
      const duration = Date.now() - start;
      this.info(`Completed ${operation}`, {
        ...metadata,
        duration,
        success: true,
      });
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.error(`Failed ${operation}`, {
        ...metadata,
        duration,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }
}

/**
 * Create a logger instance for a request
 */
export function createLogger(requestId?: string, metadata?: LogMetadata): Logger {
  return new Logger(requestId, metadata);
}

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
