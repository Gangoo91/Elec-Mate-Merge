import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useRef } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useCourseProgress } from '@/hooks/useCourseProgress';

// Lazy load with retry for chunk failures
const StudyCentreIndex = lazyWithRetry(() => import('@/pages/study-centre/StudyCentreIndex'));
const LeaderboardPage = lazyWithRetry(() => import('@/pages/study-centre/LeaderboardPage'));

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
 */
function StudyCentreTracker() {
  const location = useLocation();
  const { updateLastLocation } = useLastStudyLocation();
  const { recordProgress } = useCourseProgress();
  const prevContentPathRef = useRef(''); // Last CONTENT page (not landing pages)
  const prevPathRef = useRef('');
  const pageEntryRef = useRef(Date.now());

  useEffect(() => {
    const path = location.pathname;
    // Don't track the index page itself
    if (path === '/study-centre' || path === '/study-centre/') return;

    // Parse course and section from URL
    // e.g. /study-centre/fire-safety/module-1/section-3 → courseKey: "fire-safety", sectionKey: "module-1/section-3"
    const parts = path.replace('/study-centre/', '').split('/');
    const courseKey = parts[0] || '';
    const sectionKey = parts.length > 1 ? parts.slice(1).join('/') : '';

    // Auto-complete previous CONTENT section if user navigated away after 10+ seconds
    if (prevContentPathRef.current && prevContentPathRef.current !== path) {
      const prevParts = prevContentPathRef.current.replace('/study-centre/', '').split('/');
      const prevCourse = prevParts[0] || '';
      const prevSection = prevParts.length > 1 ? prevParts.slice(1).join('/') : '';

      if (prevCourse && prevSection) {
        const timeOnPage = Date.now() - pageEntryRef.current;
        if (timeOnPage > 10000) {
          recordProgress(prevCourse, prevSection, 100, true);
        }
      }
    }

    // Only track content pages (have a sectionKey), not course landing pages
    // This prevents "Continue where you left off" from pointing to a course index
    if (courseKey && sectionKey) {
      const timer = setTimeout(() => {
        recordProgress(courseKey, sectionKey, 50);
      }, 1000); // 1s delay to avoid recording bounces

      // Update last study location — only for actual content pages
      const title = document.title?.split('|')[0]?.trim() || 'Study Centre';
      updateLastLocation(path, title);

      prevContentPathRef.current = path; // Remember this content page
      prevPathRef.current = path;
      pageEntryRef.current = Date.now();

      return () => clearTimeout(timer);
    }

    // Course landing pages — DON'T update lastLocation or content ref
    prevPathRef.current = path;
    pageEntryRef.current = Date.now();
  }, [location.pathname, updateLastLocation, recordProgress]);

  return null;
}

export default function StudyCentreRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <StudyCentreTracker />
      <Routes>
        <Route index element={<StudyCentreIndex />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
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
