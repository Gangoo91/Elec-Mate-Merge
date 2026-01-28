import * as Sentry from "@sentry/react";

export function initSentry() {
  // Only initialize in production or if explicitly enabled
  if (import.meta.env.PROD || import.meta.env.VITE_SENTRY_DEV === "true") {
    const dsn = import.meta.env.VITE_SENTRY_DSN;

    if (!dsn) {
      console.warn("[Sentry] No DSN configured - error tracking disabled");
      return;
    }

    // Generate release version from build time or use env variable
    const release = import.meta.env.VITE_SENTRY_RELEASE ||
      `elec-mate@${new Date().toISOString().split('T')[0]}`;

    Sentry.init({
      dsn,
      environment: import.meta.env.PROD ? "production" : "development",
      release,

      // Only send errors from your domains
      allowUrls: [
        "elec-mate.com",
        "www.elec-mate.com",
        /https?:\/\/(www\.)?elec-mate\.com/,
        /localhost/,
      ],

      // Enable structured logging
      _experiments: {
        enableLogs: true,
      },

      // Performance monitoring
      tracesSampleRate: 0.1, // 10% of transactions for performance

      // Session replay for debugging user issues
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

      // Filter out noisy errors - be conservative, let real errors through
      ignoreErrors: [
        // Browser extensions - not our code
        /extensions\//i,
        /^chrome-extension:\/\//,
        /^moz-extension:\/\//,

        // User-initiated cancellations
        "AbortError",
        "The user aborted a request",

        // Expected auth errors - user input issues, not bugs
        "User already registered",
        "Invalid login credentials",
        "New password should be different from the old password",
        "Email not confirmed",
        "Invalid email or password",
        "Password should be at least",
        "Unable to validate email address",
        /AuthWeakPasswordError/i,
        /weak.*password/i,
        /password.*weak/i,

        // Network errors - user's connection, not our bug
        /AuthRetryableFetchError/i,
        /Load failed.*supabase/i,
        "Failed to fetch",

        // Chunk loading errors (deployment cache) - handled by auto-refresh
        /dynamically imported module/i,
        /importing a module script failed/i,
        /Loading chunk .* failed/i,
        /Loading CSS chunk .* failed/i,
        /is not a valid JavaScript MIME type/,
        "ChunkLoadError",

        // Safari-specific noise
        /cancelled/i,

        // ResizeObserver noise (browser bug, not actionable)
        "ResizeObserver loop",
      ],

      // Process events before sending
      beforeSend(event, hint) {
        // Remove user IP for privacy
        if (event.user) {
          delete event.user.ip_address;
        }

        // Add page context
        event.tags = {
          ...event.tags,
          page_url: window.location.pathname,
          page_search: window.location.search ? 'has_params' : 'no_params',
        };

        // Filter out AuthApiError if it somehow got through
        const error = hint?.originalException;
        if (error && typeof error === 'object' && 'name' in error) {
          if ((error as Error).name === 'AuthApiError') {
            return null;
          }
        }

        return event;
      },

      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          // Mask all text and inputs for privacy
          maskAllText: false,
          maskAllInputs: true,
          blockAllMedia: false,
        }),
        // Capture console.error and console.warn automatically
        Sentry.consoleLoggingIntegration({ levels: ["error", "warn"] }),
      ],
    });

    console.log("[Sentry] Initialized");
  }
}

// Helper to identify users (call after login)
export function identifySentryUser(user: { id: string; email?: string; role?: string }) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    role: user.role,
  });
}

// Helper to clear user on logout
export function clearSentryUser() {
  Sentry.setUser(null);
}

// Helper to capture custom errors with context
export function captureError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

// Helper to add breadcrumb for debugging
export function addBreadcrumb(message: string, category: string, data?: Record<string, unknown>) {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: "info",
  });
}

// ============================================
// USER JOURNEY TRACKING
// ============================================

// Track key user journeys with transactions
export function startJourney(name: string, data?: Record<string, unknown>) {
  return Sentry.startSpan(
    { op: 'user.journey', name, attributes: data },
    (span) => span
  );
}

// Pre-defined journeys for consistency
export const journeys = {
  signup: () => Sentry.startSpan({ op: 'user.journey', name: 'Signup Flow' }, (span) => span),
  login: () => Sentry.startSpan({ op: 'user.journey', name: 'Login Flow' }, (span) => span),
  createQuote: () => Sentry.startSpan({ op: 'user.journey', name: 'Create Quote' }, (span) => span),
  createInvoice: () => Sentry.startSpan({ op: 'user.journey', name: 'Create Invoice' }, (span) => span),
  payment: () => Sentry.startSpan({ op: 'user.journey', name: 'Payment Flow' }, (span) => span),
  aiTool: (toolName: string) => Sentry.startSpan({ op: 'user.journey', name: `AI Tool: ${toolName}` }, (span) => span),
};

// ============================================
// CRITICAL ERROR TRACKING
// ============================================

// Track critical errors that should trigger alerts
export function captureCriticalError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    level: 'fatal',
    tags: { critical: 'true' },
    extra: context,
  });
}

// Track payment-related errors (highest priority)
export function capturePaymentError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    level: 'fatal',
    tags: { category: 'payment', critical: 'true' },
    extra: context,
  });
}

// Track API errors with endpoint context
export function captureApiError(error: Error, endpoint: string, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    level: 'error',
    tags: { category: 'api', endpoint },
    extra: context,
  });
}

// Track Edge Function errors
export function captureEdgeFunctionError(error: Error, functionName: string, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    level: 'error',
    tags: { category: 'edge_function', function_name: functionName },
    extra: context,
  });
}

// ============================================
// FEATURE TRACKING
// ============================================

// Track feature usage for understanding what's important
export function trackFeatureUsed(featureName: string, data?: Record<string, unknown>) {
  Sentry.addBreadcrumb({
    message: `Feature used: ${featureName}`,
    category: 'feature',
    data,
    level: 'info',
  });
}

// Track when a user completes a key action
export function trackMilestone(milestone: string, data?: Record<string, unknown>) {
  Sentry.addBreadcrumb({
    message: `Milestone: ${milestone}`,
    category: 'milestone',
    data,
    level: 'info',
  });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Track slow operations
export function trackSlowOperation(operationName: string, durationMs: number, context?: Record<string, unknown>) {
  if (durationMs > 5000) { // Log operations over 5 seconds
    Sentry.addBreadcrumb({
      message: `Slow operation: ${operationName} (${durationMs}ms)`,
      category: 'performance',
      level: 'warning',
      data: { durationMs, ...context },
    });
  }
}

// Export Sentry for advanced usage
export { Sentry };
