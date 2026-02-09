import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';
import { ipafRoutes } from '@/routes/study-centre/ipafRoutes';
import { pasmaRoutes } from '@/routes/study-centre/pasmaRoutes';
import { mewpRoutes } from '@/routes/study-centre/mewpRoutes';
import { firstAidRoutes } from '@/routes/study-centre/firstAidRoutes';

const GeneralUpskillingIndex = lazyWithRetry(
  () => import('@/pages/study-centre/general-upskilling/Index')
);

const LoadingFallback = CourseSkeleton;

export default function GeneralUpskillingRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<GeneralUpskillingIndex />} />
        {ipafRoutes}
        {pasmaRoutes}
        {mewpRoutes}
        {firstAidRoutes}
      </Routes>
    </Suspense>
  );
}
