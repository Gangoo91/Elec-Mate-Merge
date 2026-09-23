/**
 * Welsh Level 3 — Building Services Engineering: Electrotechnical Installation.
 *
 * Four routes serve the whole course. Every other apprentice course declares one
 * `<Route>` and one lazy import per page — 288 of each for Level 3 — because its
 * pages are hand-written files. This course is generated from the qualification
 * handbook, so the unit, outcome and criterion are URL params read out of
 * `welshLevel3.ts` and the route table stays four lines long however many pages
 * the course grows to.
 *
 *   /study-centre/apprentice/welsh-level3                  course
 *   /study-centre/apprentice/welsh-level3/319e             unit
 *   /study-centre/apprentice/welsh-level3/319e/lo2         learning outcome
 *   /study-centre/apprentice/welsh-level3/319e/lo2/2-3     criterion
 *
 * The shape matters: `isStudyContentPath` treats a trailing `<n>-<n>` as a
 * lesson and everything above it as a menu, so the resume point, the study-time
 * log and the progress record all land correctly without a per-page edit.
 *
 * 🔴 CLOSED WHILE IN DEVELOPMENT. The course is listed in the Study Centre so
 * Welsh learners and their tutors can see it is coming, but only an Elec-Mate
 * admin gets past this file — everyone else lands on `WelshInDevelopment` at
 * every depth. The content is not written; 202 empty criteria in front of a
 * paying learner is worse than no course at all. Lift the gate by deleting the
 * `isAdmin` branch below, and not before the units are worth reading.
 */

import { Route, Routes, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { isStudyContentPath, studyTitleFromDocument } from '@/lib/studyContentPath';
import { useAuth } from '@/contexts/AuthContext';

const WelshLevel3 = lazyWithRetry(
  () => import('@/pages/apprentice-courses/welsh-level3/WelshLevel3')
);
const WelshUnitPage = lazyWithRetry(
  () => import('@/pages/apprentice-courses/welsh-level3/WelshUnitPage')
);
const WelshSectionPage = lazyWithRetry(
  () => import('@/pages/apprentice-courses/welsh-level3/WelshSectionPage')
);
const WelshLessonPage = lazyWithRetry(
  () => import('@/pages/apprentice-courses/welsh-level3/WelshLessonPage')
);
const WelshInDevelopment = lazyWithRetry(
  () => import('@/pages/apprentice-courses/welsh-level3/WelshInDevelopment')
);

/** Records the resume point, on lesson pages only — menus would overwrite it. */
function WelshLevel3Tracker() {
  const location = useLocation();
  const { updateLastLocation } = useLastStudyLocation();

  useEffect(() => {
    if (!isStudyContentPath(location.pathname)) return;
    // Short delay so the page has set its own title before we read it.
    const timer = setTimeout(() => {
      updateLastLocation(location.pathname, studyTitleFromDocument('Welsh Level 3'));
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname, updateLastLocation]);

  return null;
}

export default function WelshLevel3Routes() {
  const { profile, isLoading } = useAuth();
  const isAdmin = profile?.admin_role === 'super_admin' || profile?.admin_role === 'admin';

  // Hold the skeleton rather than flashing the closed door at an admin while
  // the profile loads — and rather than flashing the course at everyone else.
  if (isLoading) return <CourseSkeleton />;

  if (!isAdmin) {
    return (
      <Suspense fallback={<CourseSkeleton />}>
        <Routes>
          <Route path="*" element={<WelshInDevelopment />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <WelshLevel3Tracker />
      <Suspense fallback={<CourseSkeleton />}>
        <Routes>
          <Route index element={<WelshLevel3 />} />
          <Route path=":unitSlug" element={<WelshUnitPage />} />
          <Route path=":unitSlug/:sectionSlug" element={<WelshSectionPage />} />
          <Route path=":unitSlug/:sectionSlug/:subSlug" element={<WelshLessonPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
