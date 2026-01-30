/**
 * Sentry error tracking for Supabase Edge Functions
 * Uses Sentry HTTP API directly (no SDK required for Deno)
 */

interface SentryEventContext {
  functionName: string;
  userId?: string;
  email?: string;
  requestUrl?: string;
  requestMethod?: string;
  extra?: Record<string, unknown>;
}

interface SentryEvent {
  event_id: string;
  timestamp: number;
  platform: string;
  level: 'error' | 'warning' | 'info';
  logger: string;
  transaction?: string;
  server_name: string;
  release?: string;
  environment: string;
  message?: { formatted: string };
  exception?: {
    values: Array<{
      type: string;
      value: string;
      stacktrace?: {
        frames: Array<{
          filename?: string;
          function?: string;
          lineno?: number;
          colno?: number;
          in_app: boolean;
        }>;
      };
    }>;
  };
  user?: {
    id?: string;
    email?: string;
  };
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
  request?: {
    url?: string;
    method?: string;
  };
}

function generateEventId(): string {
  return crypto.randomUUID().replace(/-/g, '');
}

function parseStackTrace(stack: string | undefined): Array<{
  filename?: string;
  function?: string;
  lineno?: number;
  colno?: number;
  in_app: boolean;
}> {
  if (!stack) return [];

  const frames: Array<{
    filename?: string;
    function?: string;
    lineno?: number;
    colno?: number;
    in_app: boolean;
  }> = [];

  const lines = stack.split('\n');
  for (const line of lines) {
    // Match patterns like "at functionName (file:line:col)" or "at file:line:col"
    const match = line.match(/at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?/);
    if (match) {
      frames.push({
        function: match[1] || '<anonymous>',
        filename: match[2],
        lineno: parseInt(match[3], 10),
        colno: parseInt(match[4], 10),
        in_app: !match[2]?.includes('node_modules') && !match[2]?.includes('deno'),
      });
    }
  }

  return frames.reverse(); // Sentry expects oldest frame first
}

/**
 * Capture an error and send it to Sentry
 */
export async function captureException(
  error: Error | unknown,
  context: SentryEventContext
): Promise<void> {
  const dsn = Deno.env.get('SENTRY_DSN');

  if (!dsn) {
    console.error(`[Sentry] No DSN configured - logging error locally: ${context.functionName}`, error);
    return;
  }

  try {
    // Parse DSN: https://<public_key>@<host>/<project_id>
    const dsnMatch = dsn.match(/https:\/\/(.+?)@(.+?)\/(\d+)/);
    if (!dsnMatch) {
      console.error('[Sentry] Invalid DSN format');
      return;
    }

    const [, publicKey, host, projectId] = dsnMatch;
    const endpoint = `https://${host}/api/${projectId}/envelope/`;

    const err = error instanceof Error ? error : new Error(String(error));
    const eventId = generateEventId();
    const timestamp = Date.now() / 1000;

    const event: SentryEvent = {
      event_id: eventId,
      timestamp,
      platform: 'node', // Use 'node' for Deno compatibility
      level: 'error',
      logger: 'edge-function',
      transaction: context.functionName,
      server_name: 'supabase-edge',
      release: Deno.env.get('SENTRY_RELEASE') || 'edge-functions@1.0.0',
      environment: Deno.env.get('SENTRY_ENVIRONMENT') || 'production',
      exception: {
        values: [{
          type: err.name || 'Error',
          value: err.message,
          stacktrace: {
            frames: parseStackTrace(err.stack),
          },
        }],
      },
      tags: {
        'function.name': context.functionName,
        'runtime': 'deno',
      },
      extra: {
        ...context.extra,
      },
      request: context.requestUrl ? {
        url: context.requestUrl,
        method: context.requestMethod,
      } : undefined,
    };

    if (context.userId || context.email) {
      event.user = {
        id: context.userId,
        email: context.email,
      };
    }

    // Build envelope format
    const envelope = [
      JSON.stringify({ event_id: eventId, dsn }),
      JSON.stringify({ type: 'event', content_type: 'application/json' }),
      JSON.stringify(event),
    ].join('\n');

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-sentry-envelope',
        'X-Sentry-Auth': `Sentry sentry_version=7, sentry_client=edge-function/1.0.0, sentry_key=${publicKey}`,
      },
      body: envelope,
    });

    if (!response.ok) {
      console.error(`[Sentry] Failed to send event: ${response.status} ${response.statusText}`);
    }
  } catch (sentryError) {
    // Don't let Sentry errors break the function
    console.error('[Sentry] Error sending to Sentry:', sentryError);
  }
}

/**
 * Capture a message (non-error) to Sentry
 */
export async function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context: Partial<SentryEventContext> & { functionName: string }
): Promise<void> {
  const dsn = Deno.env.get('SENTRY_DSN');

  if (!dsn) {
    console.log(`[Sentry] ${level}: ${message}`);
    return;
  }

  try {
    const dsnMatch = dsn.match(/https:\/\/(.+?)@(.+?)\/(\d+)/);
    if (!dsnMatch) return;

    const [, publicKey, host, projectId] = dsnMatch;
    const endpoint = `https://${host}/api/${projectId}/envelope/`;

    const eventId = generateEventId();
    const timestamp = Date.now() / 1000;

    const event: SentryEvent = {
      event_id: eventId,
      timestamp,
      platform: 'node',
      level,
      logger: 'edge-function',
      transaction: context.functionName,
      server_name: 'supabase-edge',
      release: Deno.env.get('SENTRY_RELEASE') || 'edge-functions@1.0.0',
      environment: Deno.env.get('SENTRY_ENVIRONMENT') || 'production',
      message: { formatted: message },
      tags: {
        'function.name': context.functionName,
        'runtime': 'deno',
      },
      extra: context.extra,
    };

    if (context.userId || context.email) {
      event.user = {
        id: context.userId,
        email: context.email,
      };
    }

    const envelope = [
      JSON.stringify({ event_id: eventId, dsn }),
      JSON.stringify({ type: 'event', content_type: 'application/json' }),
      JSON.stringify(event),
    ].join('\n');

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-sentry-envelope',
        'X-Sentry-Auth': `Sentry sentry_version=7, sentry_client=edge-function/1.0.0, sentry_key=${publicKey}`,
      },
      body: envelope,
    });
  } catch (sentryError) {
    console.error('[Sentry] Error sending message:', sentryError);
  }
}

/**
 * Wrapper to capture errors from edge function handlers
 */
export function withSentry<T extends (...args: unknown[]) => Promise<Response>>(
  functionName: string,
  handler: T
): T {
  return (async (...args: unknown[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      const req = args[0] as Request | undefined;
      await captureException(error, {
        functionName,
        requestUrl: req?.url,
        requestMethod: req?.method,
      });
      throw error; // Re-throw to maintain original behavior
    }
  }) as T;
}
