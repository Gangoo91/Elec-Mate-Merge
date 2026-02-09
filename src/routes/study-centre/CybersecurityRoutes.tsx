import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const CybersecurityIndex = lazyWithRetry(() => import('@/pages/study-centre/cybersecurity/Index'));

const LoadingFallback = CourseSkeleton;

export default function CybersecurityRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<CybersecurityIndex />} />
      </Routes>
    </Suspense>
  );
}
