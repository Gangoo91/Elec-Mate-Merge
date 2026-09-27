/**
 * Welsh Level 3 — Building Services Engineering: Electrotechnical Installation.
 *
 * Four routes serve the whole course. Every other apprentice course declares one
 * `<Route>` and one lazy import per page — 288 of each for Level 3 — because its
 * pages are hand-written files. Here the module, section and lesson are URL
 * params read out of `welshLevel3Tree.ts`, so the route table stays four lines
 * long however many pages the course grows to.
 *
 *   /study-centre/apprentice/welsh-level3                          course
 *   /study-centre/apprentice/welsh-level3/module4                  module
 *   /study-centre/apprentice/welsh-level3/module4/section2         section
 *   /study-centre/apprentice/welsh-level3/module4/section2/319e-2-3  lesson
 *   /study-centre/apprentice/welsh-level3/mock-exam                 the paper
 *
 * The lesson slug is the qualification's own unit code and criterion number,
 * so the handbook reference survives in the URL even though the navigation
 * above it is our grouping rather than the handbook's.
 *
 * The shape matters: `isStudyContentPath` treats a bare `/moduleN` or
 * `/sectionN` tail as a menu and anything below it as a lesson, so the resume
 * point, the study-time log and the progress record all land correctly without
 * a per-page edit.
 *
 * OPEN. The course was held behind an admin gate while it was written; all 202
 * criteria now carry teaching, so the gate has been lifted and the course is
 * available to every learner. `WelshInDevelopment` is no longer routed to.
 */

import { Route, Routes, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { isStudyContentPath, studyTitleFromDocument } from '@/lib/studyContentPath';

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
const WelshMockExam = lazyWithRetry(
  () => import('@/pages/apprentice-courses/welsh-level3/WelshMockExam')
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
  return (
    <>
      <WelshLevel3Tracker />
      <Suspense fallback={<CourseSkeleton />}>
        <Routes>
          <Route index element={<WelshLevel3 />} />
          {/*
            Module 9 is the final paper and has no sections, so it is declared
            explicitly and ahead of the param routes — `:moduleSlug` would
            otherwise swallow `mock-exam` and send it to `findModule`, which
            knows only the eight teaching modules and would redirect home.

            There is no landing page in front of it. The Level 2 and Level 3
            papers open straight onto their start panel, which already states
            the paper's shape, and this one does the same.
          */}
          <Route path="mock-exam" element={<WelshMockExam />} />
          <Route path=":moduleSlug" element={<WelshUnitPage />} />
          <Route path=":moduleSlug/:sectionSlug" element={<WelshSectionPage />} />
          <Route path=":moduleSlug/:sectionSlug/:lessonSlug" element={<WelshLessonPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
