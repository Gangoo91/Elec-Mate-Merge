import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const MultiTradeIndex = lazyWithRetry(() => import('@/pages/study-centre/multi-trade/Index'));

const LoadingFallback = CourseSkeleton;

export default function MultiTradeRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<MultiTradeIndex />} />
      </Routes>
    </Suspense>
  );
}
