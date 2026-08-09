import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Global activity tracker - tracks page views, session time, and feature usage
// This runs in the background and logs to user_events table

const SESSION_HEARTBEAT_MS = 30000; // Update session time every 30 seconds
const PAGE_VIEW_DEBOUNCE_MS = 2000;

/*
 * How long without a keystroke, click, scroll or touch before we stop calling
 * it "using the app".
 *
 * Time is counted as heartbeats × 30s, so anything that keeps the interval
 * alive becomes recorded usage. Pausing on a hidden tab fixes the overnight
 * case; this fixes the other one — a visible page nobody is looking at, which
 * on a job site is the normal state of a phone left on a worktop.
 *
 * Two minutes is deliberately short. It undercounts a long read rather than
 * overcounting an abandoned tab, and reading pages still fire scroll events.
 */
const IDLE_TIMEOUT_MS = 120000;
const ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'wheel'] as const;
const lastPageView: Record<string, number> = {};

export function ActivityTracker() {
  const { user, profile, isSubscribed } = useAuth();
  const location = useLocation();
  const sessionStartTime = useRef<number | null>(null);
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);
  const sessionId = useRef<string | null>(null);
  const currentPath = useRef(location.pathname);

  // Whether the user can get past the subscription gate. Without this flag,
  // a user stuck at the TrialExpiredPaywall emits the same heartbeats and
  // page views as a paying user — which made 98 locked-out trial users look
  // like active freeloaders in the admin engagement data (ELE-1269).
  const hasAccess =
    isSubscribed || profile?.subscribed || profile?.free_access_granted || false;
  const hasAccessRef = useRef(hasAccess);
  hasAccessRef.current = hasAccess;

  // Track page views
  useEffect(() => {
    if (!user?.id) return;

    const key = `${user.id}-${location.pathname}`;
    const now = Date.now();

    // Always update the current path ref for heartbeats
    currentPath.current = location.pathname;

    // Debounce rapid page views
    if (lastPageView[key] && now - lastPageView[key] < PAGE_VIEW_DEBOUNCE_MS) {
      return;
    }
    lastPageView[key] = now;

    // Log page view
    (async () => {
      try {
        await supabase.from('user_events').insert({
          user_id: user.id,
          event_type: 'page_view',
          page_path: location.pathname,
          event_data: { timestamp: new Date().toISOString(), access: hasAccessRef.current },
        });
        console.debug('[Activity] Page view:', location.pathname);
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
        await supabase.from('user_events').insert({
          user_id: user.id,
          event_type: 'session_start',
          page_path: location.pathname,
          event_data: {
            session_id: sessionId.current,
            started_at: new Date().toISOString(),
            access: hasAccessRef.current,
          },
        });
      } catch {
        // Silently fail
      }
    })();

    /*
     * Heartbeat — one every 30 seconds, and ONLY while the tab is in front.
     *
     * `user_engagement_by_area` computes time as
     * `count(session_heartbeat) * 30`, so every beat is thirty seconds of
     * recorded "usage". This interval ran for as long as the component was
     * mounted: `visibilitychange` logged a `tab_hidden` event but never
     * cleared it. A tab left open overnight therefore fired ~960 beats and
     * booked eight hours of use nobody performed.
     *
     * The damage was visible everywhere it mattered — one user showing 348
     * hours in a 30-day window, 25 over 24 hours, a signup with "4h 39m on
     * Dashboard" from a single page view — and it inflated the engagement
     * score for exactly the people who left a tab open rather than the ones
     * who used the thing.
     */
    const beat = async () => {
      if (!sessionStartTime.current || !user?.id) return;
      if (document.hidden) return; // belt and braces if a beat is in flight
      if (Date.now() - lastInteraction > IDLE_TIMEOUT_MS) {
        // Nobody has touched anything since the last beat — stop counting
        // until they do. `onInteraction` restarts the interval.
        stopHeartbeat();
        return;
      }

      const durationSeconds = Math.floor((Date.now() - sessionStartTime.current) / 1000);

      try {
        await supabase.from('user_events').insert({
          user_id: user.id,
          event_type: 'session_heartbeat',
          page_path: currentPath.current,
          event_data: {
            session_id: sessionId.current,
            duration_seconds: durationSeconds,
            access: hasAccessRef.current,
          },
        });
      } catch {
        // Silently fail
      }
    };

    const startHeartbeat = () => {
      if (heartbeatInterval.current) return;
      heartbeatInterval.current = setInterval(beat, SESSION_HEARTBEAT_MS);
    };
    const stopHeartbeat = () => {
      if (!heartbeatInterval.current) return;
      clearInterval(heartbeatInterval.current);
      heartbeatInterval.current = null;
    };

    /*
     * Idle handling.
     *
     * `lastInteraction` is bumped by any real input. A beat that finds the
     * page untouched for longer than IDLE_TIMEOUT_MS stops the interval
     * rather than recording another thirty seconds; the next interaction
     * starts it again. Net effect: recorded time is time somebody was
     * actually doing something.
     */
    let lastInteraction = Date.now();

    const onVisibility = () => {
      if (document.hidden) {
        stopHeartbeat();
      } else {
        // Coming back to the tab counts as interaction — otherwise the first
        // beat after a long absence would immediately judge them idle.
        lastInteraction = Date.now();
        startHeartbeat();
      }
    };

    const onInteraction = () => {
      lastInteraction = Date.now();
      if (!document.hidden) startHeartbeat();
    };

    document.addEventListener('visibilitychange', onVisibility);
    for (const evt of ACTIVITY_EVENTS) {
      // Passive: these are read-only observers and must never delay a scroll.
      window.addEventListener(evt, onInteraction, { passive: true });
    }
    if (!document.hidden) startHeartbeat();

    // Cleanup on unmount or user change
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      for (const evt of ACTIVITY_EVENTS) window.removeEventListener(evt, onInteraction);
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
        heartbeatInterval.current = null;
      }

      // Log session end
      if (sessionStartTime.current && user?.id) {
        const durationSeconds = Math.floor((Date.now() - sessionStartTime.current) / 1000);

        // Try to log session end
        (async () => {
          try {
            await supabase.from('user_events').insert({
              user_id: user.id,
              event_type: 'session_end',
              page_path: window.location.pathname,
              event_data: {
                session_id: sessionId.current,
                duration_seconds: durationSeconds,
                access: hasAccessRef.current,
              },
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
          await supabase.from('user_events').insert({
            user_id: user.id,
            event_type: 'tab_hidden',
            page_path: location.pathname,
            event_data: { session_id: sessionId.current, access: hasAccessRef.current },
          });
        } else {
          // User returned to tab
          await supabase.from('user_events').insert({
            user_id: user.id,
            event_type: 'tab_visible',
            page_path: location.pathname,
            event_data: { session_id: sessionId.current, access: hasAccessRef.current },
          });
        }
      } catch {
        // Silently fail
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [user?.id, location.pathname]);

  // Track login (once per session)
  useEffect(() => {
    if (!user?.id) return;

    const lastLoginTrack = sessionStorage.getItem('last-login-track');
    if (lastLoginTrack !== user.id) {
      (async () => {
        try {
          await supabase.from('user_events').insert({
            user_id: user.id,
            event_type: 'login',
            page_path: location.pathname,
            event_data: { timestamp: new Date().toISOString(), access: hasAccessRef.current },
          });
          sessionStorage.setItem('last-login-track', user.id);
          console.debug('[Activity] Login tracked');
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
    await supabase.from('user_events').insert({
      user_id: userId,
      event_type: 'feature_use',
      event_name: featureName,
      event_data: data || {},
      page_path: window.location.pathname,
    });
  } catch {
    // Silently fail
  }
}
