import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useLocalStorageMigration } from '@/hooks/useLocalStorageMigration';

// Lazy load with retry for chunk failures
const StudyCentreIndex = lazyWithRetry(() => import('@/pages/study-centre/StudyCentreIndex'));
const LeaderboardPage = lazyWithRetry(() => import('@/pages/study-centre/LeaderboardPage'));
const LearningVideos = lazyWithRetry(() => import('@/pages/apprentice/LearningVideos'));

// Import nested route components with retry
const ApprenticeCourseRoutes = lazyWithRetry(() => import('@/routes/ApprenticeCourseRoutes'));
const UpskillingRoutes = lazyWithRetry(() => import('@/routes/UpskillingRoutes'));
const BusinessFundamentalsRoutes = lazyWithRetry(
  () => import('@/routes/study-centre/BusinessFundamentalsRoutes')
);
const ConstructionAwarenessRoutes = lazyWithRetry(
  () => import('@/routes/study-centre/ConstructionAwarenessRoutes')
);
const CybersecurityRoutes = lazyWithRetry(
  () => import('@/routes/study-centre/CybersecurityRoutes')
);
const EmergingTechRoutes = lazyWithRetry(() => import('@/routes/study-centre/EmergingTechRoutes'));
const GeneralUpskillingRoutes = lazyWithRetry(
  () => import('@/routes/study-centre/GeneralUpskillingRoutes')
);
const MultiTradeRoutes = lazyWithRetry(() => import('@/routes/study-centre/MultiTradeRoutes'));
const PersonalDevelopmentRoutes = lazyWithRetry(
  () => import('@/routes/study-centre/PersonalDevelopmentRoutes')
);

const LoadingFallback = CourseSkeleton;

/**
 * Global study tracker — runs on EVERY study centre page.
 * 1. Saves last study location for "Continue where you left off"
 * 2. Records course progress from URL path (zero per-page edits)
 * 3. Auto-completes previous section when user navigates forward (10s+ engagement)
 * 4. Measures ACTIVE study time per section and logs it as a study_module
 *    activity with real minutes. This feeds OTJ hours, so it must be measured
 *    (foreground + recent interaction), never estimated.
 */
/**
 * Extract the real course name and section from a study centre URL path segment.
 * Handles category-prefixed routes like general-upskilling/fire-safety-module-1-section-2.
 */
const CATEGORY_PREFIXES = ['general-upskilling', 'personal-development', 'upskilling'];

function extractCourseAndSection(parts: string[]): { courseKey: string; sectionKey: string } {
  const category = parts[0] || '';
  const rest = parts.length > 1 ? parts.slice(1).join('/') : '';

  // If first segment is a category prefix, extract the real course from the second segment
  if (CATEGORY_PREFIXES.includes(category) && rest) {
    // e.g. rest = "fire-safety-module-1-section-2" → courseKey = "fire-safety", sectionKey = "module-1-section-2"
    // or rest = "fire-safety/module-1/section-2" → courseKey = "fire-safety", sectionKey = "module-1/section-2"
    const subParts = rest.split('/');
    const firstSeg = subParts[0];
    // Try to split on -module- pattern: "fire-safety-module-1-section-2" → ["fire-safety", "module-1-section-2"]
    const moduleMatch = firstSeg.match(/^(.+?)-(module-\d+.*)$/);
    if (moduleMatch) {
      return { courseKey: moduleMatch[1], sectionKey: moduleMatch[2] + (subParts.length > 1 ? '/' + subParts.slice(1).join('/') : '') };
    }
    // No module pattern — first sub-segment is the course, rest is the section
    return { courseKey: subParts[0], sectionKey: subParts.slice(1).join('/') };
  }

  // Direct course route: e.g. /study-centre/apprentice/module-1/section-2
  return { courseKey: category, sectionKey: rest };
}

// ─── Active-time measurement constants ──────────────────────────
// Each interaction (touch/scroll/key) buys AT MOST this much credited time.
// Time only accumulates inside these interaction-anchored windows, so neither
// an open tab nor an occasional keep-alive tap can bank idle minutes — a tap
// every 10 minutes credits ~2 minutes per tap, not the 10-minute gaps.
const IDLE_GRACE_MS = 120_000;
// Sections engaged for under a minute aren't worth an OTJ row.
const MIN_LOG_SECONDS = 60;
// Per-section credit cap. A hard server-side clamp lands with the
// log_study_activity RPC; this keeps the client honest in the meantime.
const MAX_LOG_MINUTES = 30;
// When the app is backgrounded with at least this much banked, flush —
// on Capacitor the process can be killed without pagehide ever firing.
const BACKGROUND_FLUSH_SECONDS = 300;

function StudyCentreTracker() {
  const location = useLocation();
  const { updateLastLocation } = useLastStudyLocation();
  const { recordProgress } = useCourseProgress();
  const { logActivity } = useLearningXP();

  // Always-fresh callbacks via refs — for two different reasons:
  // - logActivity: the old code captured it in a mount-time closure; auth
  //   hadn't resolved on first mount, so `user` inside it stayed null forever
  //   and no study_module activity was ever written (0 rows against ~2,900
  //   section completions).
  // - recordProgress/updateLastLocation: react-query's useMutation returns a
  //   fresh object every render, so having them in the route effect's deps
  //   re-ran it after EVERY render — re-arming the progress timer in a
  //   self-sustaining loop and zeroing the active-time clock before it could
  //   ever reach the 60s logging threshold.
  const logActivityRef = useRef(logActivity);
  logActivityRef.current = logActivity;
  const recordProgressRef = useRef(recordProgress);
  recordProgressRef.current = recordProgress;
  const updateLastLocationRef = useRef(updateLastLocation);
  updateLastLocationRef.current = updateLastLocation;

  const prevContentPathRef = useRef(''); // Last CONTENT page (not landing pages)
  const prevTitleRef = useRef('');
  const pageEntryRef = useRef(Date.now());

  // Active-time accumulator for the current content section. An "engaged
  // span" runs from an interaction until IDLE_GRACE past the most recent
  // interaction; only engaged spans are credited.
  const activeSecondsRef = useRef(0);
  const spanStartRef = useRef<number | null>(
    typeof document !== 'undefined' && document.visibilityState === 'visible' ? Date.now() : null
  );
  const engagedUntilRef = useRef(Date.now() + IDLE_GRACE_MS);

  // One-time migration of localStorage completion data to DB
  useLocalStorageMigration();

  const closeSegment = useCallback(() => {
    const start = spanStartRef.current;
    if (start == null) return;
    spanStartRef.current = null;
    const end = Math.min(Date.now(), engagedUntilRef.current);
    activeSecondsRef.current += Math.max(0, (end - start) / 1000);
  }, []);

  /** Log measured study time for a section (XP + OTJ), then reset the clock. */
  const flushSection = useCallback(
    (path: string, title: string) => {
      closeSegment();
      const seconds = Math.round(activeSecondsRef.current);
      activeSecondsRef.current = 0;
      if (seconds < MIN_LOG_SECONDS) return;

      const parts = path.replace('/study-centre/', '').split('/');
      const { courseKey, sectionKey } = extractCourseAndSection(parts);
      if (!courseKey || !sectionKey) return;

      const sourceTitle = title || `${courseKey} — ${sectionKey}`;
      const minutes = Math.min(MAX_LOG_MINUTES, Math.max(1, Math.round(seconds / 60)));

      void (async () => {
        // Trusted path: the RPC owns the log row and enforces per-entry,
        // per-section-per-day and daily caps server-side.
        const { data, error } = await supabase.rpc('log_study_activity' as never, {
          p_course: courseKey,
          p_section: sectionKey,
          p_title: sourceTitle,
          p_active_seconds: seconds,
        } as never);

        if (error) {
          // Fall back to the direct insert ONLY when the RPC doesn't exist yet
          // (pre-migration deploy). On transient errors (network etc.) we must
          // NOT fall back — the server may have committed, and the direct path
          // has no caps, so a retry here could double-credit.
          const code = (error as { code?: string }).code;
          if (code === 'PGRST202' || code === '42883') {
            logActivityRef.current({
              activityType: 'study_module',
              sourceId: `${courseKey}/${sectionKey}`,
              sourceTitle,
              actualMinutes: minutes,
              metadata: { course: courseKey, section: sectionKey, active_seconds: seconds, measured: true },
            });
          } else {
            console.warn('[StudyCentreTracker] study log failed:', error.message);
          }
          return;
        }

        const credited = (data as { credited_minutes?: number } | null)?.credited_minutes ?? 0;
        if (credited > 0) {
          // XP + streak only — the RPC already wrote the log row.
          logActivityRef.current({
            activityType: 'study_module',
            sourceId: `${courseKey}/${sectionKey}`,
            sourceTitle,
            actualMinutes: credited,
            skipLogRow: true,
          });
        }
      })();
    },
    [closeSegment]
  );

  // Engagement + lifecycle listeners (mounted once).
  useEffect(() => {
    const markInteraction = () => {
      const now = Date.now();
      if (spanStartRef.current == null) {
        // Engagement resuming (was idle or just became visible).
        spanStartRef.current = now;
      } else if (now > engagedUntilRef.current) {
        // Engagement lapsed mid-span — bank the old span up to where it
        // expired and start fresh, so the idle gap is never credited.
        activeSecondsRef.current += Math.max(
          0,
          (engagedUntilRef.current - spanStartRef.current) / 1000
        );
        spanStartRef.current = now;
      }
      engagedUntilRef.current = now + IDLE_GRACE_MS;
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        closeSegment();
        if (activeSecondsRef.current >= BACKGROUND_FLUSH_SECONDS && prevContentPathRef.current) {
          flushSection(prevContentPathRef.current, prevTitleRef.current);
        }
      } else {
        const now = Date.now();
        spanStartRef.current = now;
        engagedUntilRef.current = now + IDLE_GRACE_MS;
      }
    };
    const onPageHide = () => {
      // Best effort — the insert may not complete if the page is torn down,
      // but on mobile the visibilitychange flush above usually got there first.
      if (prevContentPathRef.current) {
        flushSection(prevContentPathRef.current, prevTitleRef.current);
      }
    };

    window.addEventListener('pointerdown', markInteraction, { passive: true });
    window.addEventListener('keydown', markInteraction);
    // capture: scroll doesn't bubble, so a window listener would miss
    // scrolling inside nested containers and make slow readers look idle.
    window.addEventListener('scroll', markInteraction, { passive: true, capture: true });
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    return () => {
      window.removeEventListener('pointerdown', markInteraction);
      window.removeEventListener('keydown', markInteraction);
      window.removeEventListener('scroll', markInteraction, { capture: true } as EventListenerOptions);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      // The tracker unmounts whenever the user leaves /study-centre/* (e.g.
      // section → back to the hub) — flush the banked time or it's lost.
      if (prevContentPathRef.current) {
        flushSection(prevContentPathRef.current, prevTitleRef.current);
      }
    };
  }, [closeSegment, flushSection]);

  useEffect(() => {
    const path = location.pathname;
    const isIndex = path === '/study-centre' || path === '/study-centre/';

    // Leaving a content page — to another section, a landing page or the index.
    if (prevContentPathRef.current && prevContentPathRef.current !== path) {
      const prevParts = prevContentPathRef.current.replace('/study-centre/', '').split('/');
      const { courseKey: prevCourse, sectionKey: prevSection } = extractCourseAndSection(prevParts);

      if (prevCourse && prevSection) {
        const timeOnPage = Date.now() - pageEntryRef.current;
        if (timeOnPage > 10000) {
          // recordProgress is mutateAsync — rejects on Supabase timeout. Without
          // .catch() the rejection bubbles to window.onunhandledrejection and
          // Sentry captures it as a PostgrestError-shaped UnhandledRejection.
          recordProgressRef.current(prevCourse, prevSection, 100, true).catch((err) => {
            console.warn('[StudyCentreTracker] auto-complete failed:', err);
          });
        }
        // Log measured study time for the section we just left (XP + OTJ).
        flushSection(prevContentPathRef.current, prevTitleRef.current);
      }
      prevContentPathRef.current = '';
    }

    if (isIndex) {
      pageEntryRef.current = Date.now();
      return;
    }

    // Parse course and section from URL with smart extraction
    const parts = path.replace('/study-centre/', '').split('/');
    const { courseKey, sectionKey } = extractCourseAndSection(parts);

    // Only track content pages (have a sectionKey), not course landing pages
    // This prevents "Continue where you left off" from pointing to a course index
    if (courseKey && sectionKey) {
      const timer = setTimeout(() => {
        recordProgressRef.current(courseKey, sectionKey, 50).catch((err) => {
          console.warn('[StudyCentreTracker] record-progress failed:', err);
        });
      }, 1000); // 1s delay to avoid recording bounces

      // Update last study location — only for actual content pages
      const title = document.title?.split('|')[0]?.trim() || 'Study Centre';
      updateLastLocationRef.current(path, title);

      prevContentPathRef.current = path; // Remember this content page
      prevTitleRef.current = title;
      pageEntryRef.current = Date.now();
      // Start the active-time clock for this section — navigating here is
      // itself an interaction, so open one engaged window from now.
      activeSecondsRef.current = 0;
      spanStartRef.current = document.visibilityState === 'visible' ? Date.now() : null;
      engagedUntilRef.current = Date.now() + IDLE_GRACE_MS;

      return () => clearTimeout(timer);
    }

    // Course landing pages — DON'T update lastLocation or content ref
    pageEntryRef.current = Date.now();
    // deps: pathname only (plus the stable flushSection). recordProgress /
    // updateLastLocation are intentionally consumed via refs — see above.
  }, [location.pathname, flushSection]);

  return null;
}

export default function StudyCentreRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <StudyCentreTracker />
      <Routes>
        <Route index element={<StudyCentreIndex />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="videos" element={<LearningVideos backTo="/study-centre" />} />
        <Route path="apprentice/*" element={<ApprenticeCourseRoutes />} />
        <Route path="upskilling/*" element={<UpskillingRoutes />} />
        <Route path="business-fundamentals/*" element={<BusinessFundamentalsRoutes />} />
        <Route path="construction-awareness/*" element={<ConstructionAwarenessRoutes />} />
        <Route path="cybersecurity/*" element={<CybersecurityRoutes />} />
        <Route path="emerging-tech/*" element={<EmergingTechRoutes />} />
        <Route path="general-upskilling/*" element={<GeneralUpskillingRoutes />} />
        <Route path="multi-trade/*" element={<MultiTradeRoutes />} />
        <Route path="personal-development/*" element={<PersonalDevelopmentRoutes />} />
      </Routes>
    </Suspense>
  );
}
