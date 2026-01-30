import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { useAuth } from "@/contexts/AuthContext";

// PostHog configuration
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";

// Cookie consent keys (must match CookieConsent.tsx)
const COOKIE_CONSENT_KEY = 'elec-mate-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'elec-mate-cookie-preferences';

// Check if analytics consent has been given
function hasAnalyticsConsent(): boolean {
  const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!hasConsented) return false;

  try {
    const preferences = JSON.parse(localStorage.getItem(COOKIE_PREFERENCES_KEY) || '{}');
    return preferences.analytics === true;
  } catch {
    return false;
  }
}

// Initialize PostHog
let isInitialized = false;

export function initPostHog() {
  // Don't initialize if no API key
  if (!POSTHOG_KEY) {
    console.log("[PostHog] No API key configured - analytics disabled");
    return false;
  }

  // CRITICAL: Check for analytics consent BEFORE initializing
  // This ensures we comply with PECR - analytics scripts are NOT loaded without consent
  if (!hasAnalyticsConsent()) {
    console.log("[PostHog] Analytics consent not given - not loading");
    return false;
  }

  // Already initialized
  if (isInitialized) {
    return true;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-ph-mask]",
    },
    // Respect Do Not Track browser setting
    respect_dnt: true,
    // Disable persistence until we confirm consent
    persistence: 'localStorage',
    // Only load in production or when explicitly enabled
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        // Disable in development unless explicitly enabled
        if (!import.meta.env.VITE_POSTHOG_DEV) {
          posthog.opt_out_capturing();
          console.log("[PostHog] Disabled in development");
        }
      }
    },
  });

  isInitialized = true;
  console.log("[PostHog] Initialized with user consent");
  return true;
}

// Shutdown PostHog when consent is withdrawn
export function shutdownPostHog() {
  if (isInitialized && POSTHOG_KEY) {
    posthog.opt_out_capturing();
    posthog.reset();
    isInitialized = false;
    console.log("[PostHog] Shutdown - consent withdrawn");
  }
}

// React component to manage PostHog based on consent
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const [hasConsent, setHasConsent] = useState(hasAnalyticsConsent);

  // Listen for cookie consent changes
  useEffect(() => {
    const handleConsentUpdate = (event: CustomEvent) => {
      const newConsent = event.detail?.analytics === true;
      console.log("[PostHog] Consent updated:", newConsent);
      setHasConsent(newConsent);

      if (newConsent) {
        // User gave consent - initialize PostHog
        initPostHog();
      } else {
        // User withdrew consent - shutdown PostHog
        shutdownPostHog();
      }
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);

    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    };
  }, []);

  // Initialize PostHog on mount IF consent already exists
  useEffect(() => {
    if (hasConsent) {
      initPostHog();
    }
  }, [hasConsent]);

  // Identify user when they log in (only if PostHog is initialized)
  useEffect(() => {
    if (user && profile && isInitialized && POSTHOG_KEY) {
      posthog.identify(user.id, {
        email: user.email,
        name: profile.full_name,
        role: profile.role,
        subscribed: profile.subscribed,
        subscription_tier: profile.subscription_tier,
        created_at: profile.created_at,
      });
      console.log("[PostHog] User identified:", user.id);
    }
  }, [user, profile]);

  // Reset on logout
  useEffect(() => {
    if (!user && isInitialized && POSTHOG_KEY) {
      posthog.reset();
      console.log("[PostHog] User reset");
    }
  }, [user]);

  return <>{children}</>;
}

// Export posthog for manual event tracking
export { posthog };

// Helper hooks for common tracking (these safely no-op if PostHog isn't loaded)
export function useTrackEvent() {
  return (eventName: string, properties?: Record<string, any>) => {
    if (POSTHOG_KEY && isInitialized && hasAnalyticsConsent()) {
      posthog.capture(eventName, properties);
    }
  };
}

export function useTrackPageView() {
  return (pageName: string, properties?: Record<string, any>) => {
    if (POSTHOG_KEY && isInitialized && hasAnalyticsConsent()) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
        page_name: pageName,
        ...properties,
      });
    }
  };
}

// Hook to check if analytics is enabled
export function useAnalyticsEnabled() {
  const [enabled, setEnabled] = useState(hasAnalyticsConsent);

  useEffect(() => {
    const handleConsentUpdate = (event: CustomEvent) => {
      setEnabled(event.detail?.analytics === true);
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    };
  }, []);

  return enabled;
}
