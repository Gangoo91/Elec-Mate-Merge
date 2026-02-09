import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const EmergingTechIndex = lazyWithRetry(() => import('@/pages/study-centre/emerging-tech/Index'));

const LoadingFallback = CourseSkeleton;

export default function EmergingTechRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<EmergingTechIndex />} />
      </Routes>
    </Suspense>
  );
}
