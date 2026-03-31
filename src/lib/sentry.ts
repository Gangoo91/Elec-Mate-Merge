import * as Sentry from '@sentry/react';

declare const __SENTRY_RELEASE__: string;

export function initSentry() {
  if (import.meta.env.PROD || import.meta.env.VITE_SENTRY_DEV === 'true') {
    const dsn = import.meta.env.VITE_SENTRY_DSN;

    if (!dsn) {
      console.warn('[Sentry] No DSN configured - error tracking disabled');
      return;
    }

    // Use git commit hash injected at build time, fall back to date-based
    const release =
      import.meta.env.VITE_SENTRY_RELEASE ||
      (typeof __SENTRY_RELEASE__ !== 'undefined' ? __SENTRY_RELEASE__ : `elec-mate@${new Date().toISOString().split('T')[0]}`);

    Sentry.init({
      dsn,
      environment: import.meta.env.PROD ? 'production' : 'development',
      release,

      // ── FULL ERROR COVERAGE ──
      // 100% of errors — never miss a real bug
      sampleRate: 1.0,

      // Send errors from web, native iOS/Android (Capacitor), and dev
      allowUrls: [
        /https?:\/\/(www\.)?elec-mate\.com/,
        /capacitor:\/\/localhost/,
        /localhost/,
      ],

      // ── PERFORMANCE ──
      // 25% of transactions — enough for trends without burning quota
      tracesSampleRate: 0.25,

      // ── SESSION REPLAY ──
      replaysSessionSampleRate: 0.1, // 10% of normal sessions
      replaysOnErrorSampleRate: 1.0, // 100% of error sessions — always get replay for bugs

      // Enable structured logging
      _experiments: {
        enableLogs: true,
      },

      // ── SMART FILTERING ──
      // Only ignore things that CANNOT affect user experience
      ignoreErrors: [
        // Browser extensions — not our code, can't fix
        /extensions\//i,
        /^chrome-extension:\/\//,
        /^moz-extension:\/\//,

        // User cancelled an action — intentional, not a bug
        'AbortError',
        'The user aborted a request',

        // Auth INPUT errors — user typed wrong password etc, not a bug
        'User already registered',
        'Invalid login credentials',
        'New password should be different from the old password',
        'Email not confirmed',
        'Invalid email or password',
        'Password should be at least',
        'Unable to validate email address',
        /AuthWeakPasswordError/i,

        // Chunk loading — handled by auto-refresh in main.tsx
        /dynamically imported module/i,
        /importing a module script failed/i,
        /Loading chunk .* failed/i,
        /Loading CSS chunk .* failed/i,
        /is not a valid JavaScript MIME type/,
        'ChunkLoadError',

        // ResizeObserver — browser internal, never affects users
        'ResizeObserver loop',

        // Capacitor bridge in third-party WebViews (Facebook/Instagram in-app browser)
        /webkit\.messageHandlers/i,
        /Object Not Found Matching Id/i,
      ],

      // NOTE: We DO NOT ignore these anymore (they were filtered before):
      // - 'Failed to fetch' — could be our API down, users see broken features
      // - /cancelled/i — too broad, was hiding real Safari errors
      // - /AuthRetryableFetchError/i — could indicate Supabase outage
      // - /Load failed.*supabase/i — users can't load data

      beforeSend(event, hint) {
        // Strip user IP for GDPR
        if (event.user) {
          delete event.user.ip_address;
        }

        // Add useful context tags
        const isNative = window.location.protocol === 'capacitor:';
        event.tags = {
          ...event.tags,
          page_url: window.location.pathname,
          page_search: window.location.search ? 'has_params' : 'no_params',
          platform: isNative ? 'native' : 'web',
        };

        // Filter AuthApiError if it somehow gets through ignoreErrors
        const error = hint?.originalException;
        if (error && typeof error === 'object' && 'name' in error) {
          if ((error as Error).name === 'AuthApiError') return null;
        }

        // Downgrade network errors to 'warning' — still report but don't alert
        const message = event.exception?.values?.[0]?.value || '';
        if (/Failed to fetch|NetworkError|fetch failed|net::ERR_/i.test(message)) {
          event.level = 'warning';
          event.tags = { ...event.tags, category: 'network' };
        }

        return event;
      },

      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          maskAllInputs: true,
          blockAllMedia: false,
        }),
        Sentry.consoleLoggingIntegration({ levels: ['error'] }),
      ],
    });

    console.log('[Sentry] Initialized');
  }
}

// ── USER IDENTIFICATION ──

export function identifySentryUser(user: {
  id: string;
  email?: string;
  role?: string;
  subscriptionTier?: string | null;
  isSubscribed?: boolean;
}) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
  });
  // Set user context as tags for filtering in dashboard
  Sentry.setTag('user.role', user.role || 'unknown');
  Sentry.setTag('user.tier', user.subscriptionTier || 'free');
  Sentry.setTag('user.subscribed', String(user.isSubscribed ?? false));
}

export function clearSentryUser() {
  Sentry.setUser(null);
}

// ── ERROR CAPTURE ──

export function captureError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, { extra: context });
}

export function addBreadcrumb(message: string, category: string, data?: Record<string, unknown>) {
  Sentry.addBreadcrumb({ message, category, data, level: 'info' });
}

// ── USER JOURNEY TRACKING ──

export function startJourney(name: string, data?: Record<string, unknown>) {
  return Sentry.startSpan({ op: 'user.journey', name, attributes: data }, (span) => span);
}

export const journeys = {
  signup: () => Sentry.startSpan({ op: 'user.journey', name: 'Signup Flow' }, (span) => span),
  login: () => Sentry.startSpan({ op: 'user.journey', name: 'Login Flow' }, (span) => span),
  createQuote: () => Sentry.startSpan({ op: 'user.journey', name: 'Create Quote' }, (span) => span),
  createInvoice: () => Sentry.startSpan({ op: 'user.journey', name: 'Create Invoice' }, (span) => span),
  payment: () => Sentry.startSpan({ op: 'user.journey', name: 'Payment Flow' }, (span) => span),
  aiTool: (toolName: string) => Sentry.startSpan({ op: 'user.journey', name: `AI Tool: ${toolName}` }, (span) => span),
};

// ── CRITICAL ERROR TRACKING ──

export function captureCriticalError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    level: 'fatal',
    tags: { critical: 'true' },
    extra: context,
  });
}

export function capturePaymentError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    level: 'fatal',
    tags: { category: 'payment', critical: 'true' },
    extra: context,
  });
}

export function captureApiError(error: Error, endpoint: string, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    level: 'error',
    tags: { category: 'api', endpoint },
    extra: context,
  });
}

export function captureEdgeFunctionError(
  error: Error,
  functionName: string,
  context?: Record<string, unknown>
) {
  Sentry.captureException(error, {
    level: 'error',
    tags: { category: 'edge_function', function_name: functionName },
    extra: context,
  });
}

// ── FEATURE & PERFORMANCE TRACKING ──

export function trackFeatureUsed(featureName: string, data?: Record<string, unknown>) {
  Sentry.addBreadcrumb({ message: `Feature used: ${featureName}`, category: 'feature', data, level: 'info' });
}

export function trackMilestone(milestone: string, data?: Record<string, unknown>) {
  Sentry.addBreadcrumb({ message: `Milestone: ${milestone}`, category: 'milestone', data, level: 'info' });
}

export function trackSlowOperation(
  operationName: string,
  durationMs: number,
  context?: Record<string, unknown>
) {
  if (durationMs > 5000) {
    Sentry.addBreadcrumb({
      message: `Slow operation: ${operationName} (${durationMs}ms)`,
      category: 'performance',
      level: 'warning',
      data: { durationMs, ...context },
    });
  }
}

export { Sentry };
