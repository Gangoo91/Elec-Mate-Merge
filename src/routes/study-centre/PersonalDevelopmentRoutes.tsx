import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const PersonalDevelopmentIndex = lazyWithRetry(
  () => import('@/pages/study-centre/personal-development/Index')
);

const LoadingFallback = CourseSkeleton;

export default function PersonalDevelopmentRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<PersonalDevelopmentIndex />} />
      </Routes>
    </Suspense>
  );
}
