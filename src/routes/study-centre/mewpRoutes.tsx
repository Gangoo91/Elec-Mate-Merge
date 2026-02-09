import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const MewpCourse = lazyWithRetry(() => import('@/pages/study-centre/mewp/MewpCourse'));
const MewpModule1 = lazyWithRetry(() => import('@/pages/study-centre/mewp/MewpModule1'));
const MewpModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule1Section1')
);
const MewpModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule1Section2')
);
const MewpModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule1Section3')
);
const MewpModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule1Section4')
);
const MewpModule2 = lazyWithRetry(() => import('@/pages/study-centre/mewp/MewpModule2'));
const MewpModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule2Section1')
);
const MewpModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule2Section2')
);
const MewpModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule2Section3')
);
const MewpModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule2Section4')
);
const MewpModule3 = lazyWithRetry(() => import('@/pages/study-centre/mewp/MewpModule3'));
const MewpModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule3Section1')
);
const MewpModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule3Section2')
);
const MewpModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule3Section3')
);
const MewpModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule3Section4')
);
const MewpModule4 = lazyWithRetry(() => import('@/pages/study-centre/mewp/MewpModule4'));
const MewpModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule4Section1')
);
const MewpModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule4Section2')
);
const MewpModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule4Section3')
);
const MewpModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule4Section4')
);
const MewpModule5 = lazyWithRetry(() => import('@/pages/study-centre/mewp/MewpModule5'));
const MewpModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule5Section1')
);
const MewpModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule5Section2')
);
const MewpModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule5Section3')
);
const MewpModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mewp/MewpModule5Section4')
);
const MewpModule6 = lazyWithRetry(() => import('@/pages/study-centre/mewp/MewpModule6'));
const MewpMockExam = lazyWithRetry(() => import('@/pages/study-centre/mewp/MewpMockExam'));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const mewpRoutes = (
  <>
    <Route
      path="mewp-course"
      element={
        <S>
          <MewpCourse />
        </S>
      }
    />
    <Route
      path="mewp-module-1"
      element={
        <S>
          <MewpModule1 />
        </S>
      }
    />
    <Route
      path="mewp-module-1-section-1"
      element={
        <S>
          <MewpModule1Section1 />
        </S>
      }
    />
    <Route
      path="mewp-module-1-section-2"
      element={
        <S>
          <MewpModule1Section2 />
        </S>
      }
    />
    <Route
      path="mewp-module-1-section-3"
      element={
        <S>
          <MewpModule1Section3 />
        </S>
      }
    />
    <Route
      path="mewp-module-1-section-4"
      element={
        <S>
          <MewpModule1Section4 />
        </S>
      }
    />
    <Route
      path="mewp-module-2"
      element={
        <S>
          <MewpModule2 />
        </S>
      }
    />
    <Route
      path="mewp-module-2-section-1"
      element={
        <S>
          <MewpModule2Section1 />
        </S>
      }
    />
    <Route
      path="mewp-module-2-section-2"
      element={
        <S>
          <MewpModule2Section2 />
        </S>
      }
    />
    <Route
      path="mewp-module-2-section-3"
      element={
        <S>
          <MewpModule2Section3 />
        </S>
      }
    />
    <Route
      path="mewp-module-2-section-4"
      element={
        <S>
          <MewpModule2Section4 />
        </S>
      }
    />
    <Route
      path="mewp-module-3"
      element={
        <S>
          <MewpModule3 />
        </S>
      }
    />
    <Route
      path="mewp-module-3-section-1"
      element={
        <S>
          <MewpModule3Section1 />
        </S>
      }
    />
    <Route
      path="mewp-module-3-section-2"
      element={
        <S>
          <MewpModule3Section2 />
        </S>
      }
    />
    <Route
      path="mewp-module-3-section-3"
      element={
        <S>
          <MewpModule3Section3 />
        </S>
      }
    />
    <Route
      path="mewp-module-3-section-4"
      element={
        <S>
          <MewpModule3Section4 />
        </S>
      }
    />
    <Route
      path="mewp-module-4"
      element={
        <S>
          <MewpModule4 />
        </S>
      }
    />
    <Route
      path="mewp-module-4-section-1"
      element={
        <S>
          <MewpModule4Section1 />
        </S>
      }
    />
    <Route
      path="mewp-module-4-section-2"
      element={
        <S>
          <MewpModule4Section2 />
        </S>
      }
    />
    <Route
      path="mewp-module-4-section-3"
      element={
        <S>
          <MewpModule4Section3 />
        </S>
      }
    />
    <Route
      path="mewp-module-4-section-4"
      element={
        <S>
          <MewpModule4Section4 />
        </S>
      }
    />
    <Route
      path="mewp-module-5"
      element={
        <S>
          <MewpModule5 />
        </S>
      }
    />
    <Route
      path="mewp-module-5-section-1"
      element={
        <S>
          <MewpModule5Section1 />
        </S>
      }
    />
    <Route
      path="mewp-module-5-section-2"
      element={
        <S>
          <MewpModule5Section2 />
        </S>
      }
    />
    <Route
      path="mewp-module-5-section-3"
      element={
        <S>
          <MewpModule5Section3 />
        </S>
      }
    />
    <Route
      path="mewp-module-5-section-4"
      element={
        <S>
          <MewpModule5Section4 />
        </S>
      }
    />
    <Route
      path="mewp-module-6"
      element={
        <S>
          <MewpModule6 />
        </S>
      }
    />
    <Route
      path="mewp-mock-exam"
      element={
        <S>
          <MewpMockExam />
        </S>
      }
    />
  </>
);
