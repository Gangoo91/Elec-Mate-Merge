import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

// Import sub-route files
import { bmsRoutes } from './upskilling/bmsRoutes';
import { bs7671Routes } from './upskilling/bs7671Routes';
import { fireAlarmRoutes } from './upskilling/fireAlarmRoutes';
import { industrialDataRoutes } from './upskilling/industrialDataRoutes';
import { inspectionTestingRoutes } from './upskilling/inspectionTestingRoutes';
import { patTestingRoutes } from './upskilling/patTestingRoutes';
import { specialisedCoursesRoutes } from './upskilling/specialisedCoursesRoutes';

// Lazy load with retry for chunk failures
const UpskillingIndex = lazyWithRetry(() => import('@/pages/upskilling/Index'));

const LoadingFallback = CourseSkeleton;

// Study location tracker component - tracks all upskilling page visits
function UpskillingTracker() {
  const location = useLocation();
  const { updateLastLocation } = useLastStudyLocation();

  useEffect(() => {
    // Don't track the index page itself
    if (
      location.pathname === '/electrician/upskilling' ||
      location.pathname === '/electrician/upskilling/'
    ) {
      return;
    }

    // Get title from document after a short delay (to let page set title)
    const timer = setTimeout(() => {
      const title = document.title?.split('|')[0]?.trim() || 'Upskilling Course';
      updateLastLocation(location.pathname, title);
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

        {/* Specialised Courses Routes */}
        {specialisedCoursesRoutes}
      </Routes>
    </Suspense>
  );
}
