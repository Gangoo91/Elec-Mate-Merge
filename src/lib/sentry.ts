import * as Sentry from "@sentry/react";

export function initSentry() {
  // Only initialize in production or if explicitly enabled
  if (import.meta.env.PROD || import.meta.env.VITE_SENTRY_DEV === "true") {
    const dsn = import.meta.env.VITE_SENTRY_DSN;

    if (!dsn) {
      console.warn("[Sentry] No DSN configured - error tracking disabled");
      return;
    }

    Sentry.init({
      dsn,
      environment: import.meta.env.PROD ? "production" : "development",

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

      // Filter out noisy errors
      ignoreErrors: [
        // Browser extensions
        /extensions\//i,
        /^chrome-extension:\/\//,
        // Network errors that aren't actionable
        "Network request failed",
        "Failed to fetch",
        "Load failed",
        // User cancelled
        "AbortError",
      ],

      // Don't send PII
      beforeSend(event) {
        // Remove user IP
        if (event.user) {
          delete event.user.ip_address;
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

// Export Sentry for custom spans if needed later
// Usage: Sentry.startSpan({ op: "ui.click", name: "Button Click" }, () => { ... })
export { Sentry };
