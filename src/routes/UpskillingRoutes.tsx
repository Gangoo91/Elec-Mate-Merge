import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { isStudyContentPath, studyTitleFromDocument } from '@/lib/studyContentPath';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

// Import sub-route files
import { bmsRoutes } from './upskilling/bmsRoutes';
import { bs7671Routes } from './upskilling/bs7671Routes';
import { fireAlarmRoutes } from './upskilling/fireAlarmRoutes';
import { industrialDataRoutes } from './upskilling/industrialDataRoutes';
import { inspectionTestingRoutes } from './upskilling/inspectionTestingRoutes';
import { patTestingRoutes } from './upskilling/patTestingRoutes';
import { renewableEnergyRoutes } from './upskilling/renewableEnergyRoutes';
import { specialisedCoursesRoutes } from './upskilling/specialisedCoursesRoutes';

// Lazy load with retry for chunk failures
const UpskillingIndex = lazyWithRetry(() => import('@/pages/upskilling/Index'));

const LoadingFallback = CourseSkeleton;

// Study location tracker component - tracks all upskilling page visits
function UpskillingTracker() {
  const location = useLocation();
  const { updateLastLocation } = useLastStudyLocation();

  useEffect(() => {
    // Content pages only. Skipping just the index was not enough — every course
    // and module landing page still overwrote the lesson the learner was on.
    if (!isStudyContentPath(location.pathname)) return;

    // Short delay so the page has set its own title before we read it.
    const timer = setTimeout(() => {
      updateLastLocation(location.pathname, studyTitleFromDocument('Upskilling course'));
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, updateLastLocation]);

  return null;
}

export default function UpskillingRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UpskillingTracker />
      <Routes>
        {/* Main upskilling index */}
        <Route index element={<UpskillingIndex />} />

        {/* BMS Course Routes */}
        {bmsRoutes}

        {/* BS7671 Course Routes */}
        {bs7671Routes}

        {/* Fire Alarm Course Routes */}
        {fireAlarmRoutes}

        {/* Industrial & Data Routes */}
        {industrialDataRoutes}

        {/* Inspection & Testing Routes */}
        {inspectionTestingRoutes}

        {/* PAT Testing Routes */}
        {patTestingRoutes}

        {/* Renewable Energy Routes */}
        {renewableEnergyRoutes}

        {/* Specialised Courses Routes */}
        {specialisedCoursesRoutes}
      </Routes>
    </Suspense>
  );
}
