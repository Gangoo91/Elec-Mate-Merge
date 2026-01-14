import { useEffect } from "react";
import posthog from "posthog-js";
import { useAuth } from "@/contexts/AuthContext";

// PostHog configuration
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";

// Initialize PostHog
let isInitialized = false;

export function initPostHog() {
  if (isInitialized || !POSTHOG_KEY) {
    if (!POSTHOG_KEY) {
      console.log("[PostHog] No API key configured - analytics disabled");
    }
    return;
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
    // Respect Do Not Track
    respect_dnt: true,
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
  console.log("[PostHog] Initialized");
}

// React component to identify users
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();

  useEffect(() => {
    // Initialize PostHog on mount
    initPostHog();
  }, []);

  useEffect(() => {
    // Identify user when they log in
    if (user && profile && POSTHOG_KEY) {
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

  useEffect(() => {
    // Reset on logout
    if (!user && isInitialized && POSTHOG_KEY) {
      posthog.reset();
      console.log("[PostHog] User reset");
    }
  }, [user]);

  return <>{children}</>;
}

// Export posthog for manual event tracking
export { posthog };

// Helper hooks for common tracking
export function useTrackEvent() {
  return (eventName: string, properties?: Record<string, any>) => {
    if (POSTHOG_KEY) {
      posthog.capture(eventName, properties);
    }
  };
}

export function useTrackPageView() {
  return (pageName: string, properties?: Record<string, any>) => {
    if (POSTHOG_KEY) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
        page_name: pageName,
        ...properties,
      });
    }
  };
}
