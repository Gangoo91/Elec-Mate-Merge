import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';
import { leadershipOnSiteRoutes } from './leadershipOnSiteRoutes';
import { mentalHealthAwarenessRoutes } from './mentalHealthAwarenessRoutes';
import { emotionalIntelligenceRoutes } from './emotionalIntelligenceRoutes';

const PersonalDevelopmentIndex = lazyWithRetry(
  () => import('@/pages/study-centre/personal-development/Index')
);

const LoadingFallback = CourseSkeleton;

export default function PersonalDevelopmentRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<PersonalDevelopmentIndex />} />
        {leadershipOnSiteRoutes}
        {mentalHealthAwarenessRoutes}
        {emotionalIntelligenceRoutes}
      </Routes>
    </Suspense>
  );
}
