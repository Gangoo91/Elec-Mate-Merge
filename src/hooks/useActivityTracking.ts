import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Simple activity tracking hook that logs events to Supabase
// This gives us REAL user activity data we can query in the admin panel

type EventType = "login" | "page_view" | "feature_use" | "session_start" | "session_end";

interface TrackEventOptions {
  eventName?: string;
  eventData?: Record<string, any>;
  pagePath?: string;
}

// Debounce page views to avoid spamming
const PAGE_VIEW_DEBOUNCE_MS = 2000;
const lastPageView: Record<string, number> = {};

export function useActivityTracking() {
  const { user } = useAuth();
  const location = useLocation();
  const sessionStarted = useRef(false);

  // Track an event
  const trackEvent = useCallback(
    async (eventType: EventType, options: TrackEventOptions = {}) => {
      if (!user?.id) return;

      // Debounce page views
      if (eventType === "page_view") {
        const key = `${user.id}-${options.pagePath || location.pathname}`;
        const now = Date.now();
        if (lastPageView[key] && now - lastPageView[key] < PAGE_VIEW_DEBOUNCE_MS) {
          return; // Skip duplicate page view
        }
        lastPageView[key] = now;
      }

      try {
        await supabase.from("user_events").insert({
          user_id: user.id,
          event_type: eventType,
          event_name: options.eventName || null,
          event_data: options.eventData || {},
          page_path: options.pagePath || location.pathname,
        });
      } catch (error) {
        // Silently fail - don't break the app for tracking issues
        console.debug("[Activity] Failed to track event:", error);
      }
    },
    [user?.id, location.pathname]
  );

  // Track page views automatically
  useEffect(() => {
    if (user?.id) {
      trackEvent("page_view", { pagePath: location.pathname });
    }
  }, [location.pathname, user?.id, trackEvent]);

  // Track session start on mount (once per session)
  useEffect(() => {
    if (user?.id && !sessionStarted.current) {
      sessionStarted.current = true;
      trackEvent("session_start");

      // Track session end on unload
      const handleUnload = () => {
        // Use sendBeacon for reliable tracking on page close
        if (navigator.sendBeacon) {
          const payload = JSON.stringify({
            user_id: user.id,
            event_type: "session_end",
            page_path: location.pathname,
          });
          navigator.sendBeacon(
            `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/user_events`,
            payload
          );
        }
      };

      window.addEventListener("beforeunload", handleUnload);
      return () => window.removeEventListener("beforeunload", handleUnload);
    }
  }, [user?.id]);

  // Track login when user signs in
  useEffect(() => {
    if (user?.id) {
      // Check if this is a fresh login (not a page refresh)
      const lastLoginTrack = sessionStorage.getItem("last-login-track");
      if (lastLoginTrack !== user.id) {
        trackEvent("login");
        sessionStorage.setItem("last-login-track", user.id);
      }
    }
  }, [user?.id, trackEvent]);

  // Return a function to track feature usage manually
  const trackFeatureUse = useCallback(
    (featureName: string, data?: Record<string, any>) => {
      trackEvent("feature_use", {
        eventName: featureName,
        eventData: data,
      });
    },
    [trackEvent]
  );

  return { trackEvent, trackFeatureUse };
}

// Standalone function for tracking outside of React components
export async function trackUserEvent(
  userId: string,
  eventType: EventType,
  options: TrackEventOptions = {}
) {
  try {
    await supabase.from("user_events").insert({
      user_id: userId,
      event_type: eventType,
      event_name: options.eventName || null,
      event_data: options.eventData || {},
      page_path: options.pagePath || window.location.pathname,
    });
  } catch (error) {
    console.debug("[Activity] Failed to track event:", error);
  }
}
