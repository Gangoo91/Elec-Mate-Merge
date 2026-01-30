import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Global activity tracker - tracks page views, session time, and feature usage
// This runs in the background and logs to user_events table

const SESSION_HEARTBEAT_MS = 30000; // Update session time every 30 seconds
const PAGE_VIEW_DEBOUNCE_MS = 2000;
const lastPageView: Record<string, number> = {};

export function ActivityTracker() {
  const { user } = useAuth();
  const location = useLocation();
  const sessionStartTime = useRef<number | null>(null);
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);
  const sessionId = useRef<string | null>(null);

  // Track page views
  useEffect(() => {
    if (!user?.id) return;

    const key = `${user.id}-${location.pathname}`;
    const now = Date.now();

    // Debounce rapid page views
    if (lastPageView[key] && now - lastPageView[key] < PAGE_VIEW_DEBOUNCE_MS) {
      return;
    }
    lastPageView[key] = now;

    // Log page view
    (async () => {
      try {
        await supabase.from("user_events").insert({
          user_id: user.id,
          event_type: "page_view",
          page_path: location.pathname,
          event_data: { timestamp: new Date().toISOString() }
        });
        console.debug("[Activity] Page view:", location.pathname);
      } catch {
        // Silently fail
      }
    })();
  }, [user?.id, location.pathname]);

  // Session tracking with heartbeat
  useEffect(() => {
    if (!user?.id) return;

    // Generate unique session ID
    sessionId.current = `${user.id}-${Date.now()}`;
    sessionStartTime.current = Date.now();

    // Log session start
    (async () => {
      try {
        await supabase.from("user_events").insert({
          user_id: user.id,
          event_type: "session_start",
          page_path: location.pathname,
          event_data: {
            session_id: sessionId.current,
            started_at: new Date().toISOString()
          }
        });
      } catch {
        // Silently fail
      }
    })();

    // Heartbeat - update session duration every 30 seconds
    heartbeatInterval.current = setInterval(async () => {
      if (!sessionStartTime.current || !user?.id) return;

      const durationSeconds = Math.floor((Date.now() - sessionStartTime.current) / 1000);

      try {
        await supabase.from("user_events").insert({
          user_id: user.id,
          event_type: "session_heartbeat",
          page_path: location.pathname,
          event_data: {
            session_id: sessionId.current,
            duration_seconds: durationSeconds
          }
        });
      } catch {
        // Silently fail
      }
    }, SESSION_HEARTBEAT_MS);

    // Cleanup on unmount or user change
    return () => {
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }

      // Log session end
      if (sessionStartTime.current && user?.id) {
        const durationSeconds = Math.floor((Date.now() - sessionStartTime.current) / 1000);

        // Try to log session end
        (async () => {
          try {
            await supabase.from("user_events").insert({
              user_id: user.id,
              event_type: "session_end",
              page_path: window.location.pathname,
              event_data: {
                session_id: sessionId.current,
                duration_seconds: durationSeconds
              }
            });
          } catch {
            // Silently fail
          }
        })();
      }
    };
  }, [user?.id]);

  // Track when user leaves/returns to tab (visibility change)
  useEffect(() => {
    if (!user?.id) return;

    const handleVisibilityChange = async () => {
      try {
        if (document.hidden) {
          // User left the tab
          await supabase.from("user_events").insert({
            user_id: user.id,
            event_type: "tab_hidden",
            page_path: location.pathname,
            event_data: { session_id: sessionId.current }
          });
        } else {
          // User returned to tab
          await supabase.from("user_events").insert({
            user_id: user.id,
            event_type: "tab_visible",
            page_path: location.pathname,
            event_data: { session_id: sessionId.current }
          });
        }
      } catch {
        // Silently fail
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [user?.id, location.pathname]);

  // Track login (once per session)
  useEffect(() => {
    if (!user?.id) return;

    const lastLoginTrack = sessionStorage.getItem("last-login-track");
    if (lastLoginTrack !== user.id) {
      (async () => {
        try {
          await supabase.from("user_events").insert({
            user_id: user.id,
            event_type: "login",
            page_path: location.pathname,
            event_data: { timestamp: new Date().toISOString() }
          });
          sessionStorage.setItem("last-login-track", user.id);
          console.debug("[Activity] Login tracked");
        } catch {
          // Silently fail
        }
      })();
    }
  }, [user?.id]);

  return null; // This component doesn't render anything
}

// Helper function to track feature usage from anywhere in the app
export async function trackFeatureUse(
  userId: string,
  featureName: string,
  data?: Record<string, unknown>
) {
  try {
    await supabase.from("user_events").insert({
      user_id: userId,
      event_type: "feature_use",
      event_name: featureName,
      event_data: data || {},
      page_path: window.location.pathname
    });
  } catch {
    // Silently fail
  }
}
