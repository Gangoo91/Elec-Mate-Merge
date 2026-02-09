import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const BusinessFundamentalsIndex = lazyWithRetry(
  () => import('@/pages/study-centre/business-fundamentals/Index')
);

const LoadingFallback = CourseSkeleton;

export default function BusinessFundamentalsRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<BusinessFundamentalsIndex />} />
      </Routes>
    </Suspense>
  );
}
