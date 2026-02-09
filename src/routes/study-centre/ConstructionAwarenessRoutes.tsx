import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const ConstructionAwarenessIndex = lazyWithRetry(
  () => import('@/pages/study-centre/construction-awareness/Index')
);

const LoadingFallback = CourseSkeleton;

export default function ConstructionAwarenessRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<ConstructionAwarenessIndex />} />
      </Routes>
    </Suspense>
  );
}
