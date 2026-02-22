import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const RSMCourse = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/ResilienceStressManagementCourse')
);
const RSMModule1 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule1')
);
const RSMModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule1Section1')
);
const RSMModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule1Section2')
);
const RSMModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule1Section3')
);
const RSMModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule1Section4')
);
const RSMModule2 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule2')
);
const RSMModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule2Section1')
);
const RSMModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule2Section2')
);
const RSMModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule2Section3')
);
const RSMModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule2Section4')
);
const RSMModule3 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule3')
);
const RSMModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule3Section1')
);
const RSMModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule3Section2')
);
const RSMModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule3Section3')
);
const RSMModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule3Section4')
);
const RSMModule4 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule4')
);
const RSMModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule4Section1')
);
const RSMModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule4Section2')
);
const RSMModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule4Section3')
);
const RSMModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule4Section4')
);
const RSMModule5 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule5')
);
const RSMModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule5Section1')
);
const RSMModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule5Section2')
);
const RSMModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule5Section3')
);
const RSMModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule5Section4')
);
const RSMModule6 = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMModule6')
);
const RSMMockExam = lazyWithRetry(
  () => import('@/pages/study-centre/resilience-stress-management/RSMMockExam')
);

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const resilienceStressManagementRoutes = (
  <>
    <Route
      path="resilience-stress-management"
      element={
        <S>
          <RSMCourse />
        </S>
      }
    />
    <Route
      path="rsm-module-1"
      element={
        <S>
          <RSMModule1 />
        </S>
      }
    />
    <Route
      path="rsm-module-1-section-1"
      element={
        <S>
          <RSMModule1Section1 />
        </S>
      }
    />
    <Route
      path="rsm-module-1-section-2"
      element={
        <S>
          <RSMModule1Section2 />
        </S>
      }
    />
    <Route
      path="rsm-module-1-section-3"
      element={
        <S>
          <RSMModule1Section3 />
        </S>
      }
    />
    <Route
      path="rsm-module-1-section-4"
      element={
        <S>
          <RSMModule1Section4 />
        </S>
      }
    />
    <Route
      path="rsm-module-2"
      element={
        <S>
          <RSMModule2 />
        </S>
      }
    />
    <Route
      path="rsm-module-2-section-1"
      element={
        <S>
          <RSMModule2Section1 />
        </S>
      }
    />
    <Route
      path="rsm-module-2-section-2"
      element={
        <S>
          <RSMModule2Section2 />
        </S>
      }
    />
    <Route
      path="rsm-module-2-section-3"
      element={
        <S>
          <RSMModule2Section3 />
        </S>
      }
    />
    <Route
      path="rsm-module-2-section-4"
      element={
        <S>
          <RSMModule2Section4 />
        </S>
      }
    />
    <Route
      path="rsm-module-3"
      element={
        <S>
          <RSMModule3 />
        </S>
      }
    />
    <Route
      path="rsm-module-3-section-1"
      element={
        <S>
          <RSMModule3Section1 />
        </S>
      }
    />
    <Route
      path="rsm-module-3-section-2"
      element={
        <S>
          <RSMModule3Section2 />
        </S>
      }
    />
    <Route
      path="rsm-module-3-section-3"
      element={
        <S>
          <RSMModule3Section3 />
        </S>
      }
    />
    <Route
      path="rsm-module-3-section-4"
      element={
        <S>
          <RSMModule3Section4 />
        </S>
      }
    />
    <Route
      path="rsm-module-4"
      element={
        <S>
          <RSMModule4 />
        </S>
      }
    />
    <Route
      path="rsm-module-4-section-1"
      element={
        <S>
          <RSMModule4Section1 />
        </S>
      }
    />
    <Route
      path="rsm-module-4-section-2"
      element={
        <S>
          <RSMModule4Section2 />
        </S>
      }
    />
    <Route
      path="rsm-module-4-section-3"
      element={
        <S>
          <RSMModule4Section3 />
        </S>
      }
    />
    <Route
      path="rsm-module-4-section-4"
      element={
        <S>
          <RSMModule4Section4 />
        </S>
      }
    />
    <Route
      path="rsm-module-5"
      element={
        <S>
          <RSMModule5 />
        </S>
      }
    />
    <Route
      path="rsm-module-5-section-1"
      element={
        <S>
          <RSMModule5Section1 />
        </S>
      }
    />
    <Route
      path="rsm-module-5-section-2"
      element={
        <S>
          <RSMModule5Section2 />
        </S>
      }
    />
    <Route
      path="rsm-module-5-section-3"
      element={
        <S>
          <RSMModule5Section3 />
        </S>
      }
    />
    <Route
      path="rsm-module-5-section-4"
      element={
        <S>
          <RSMModule5Section4 />
        </S>
      }
    />
    <Route
      path="rsm-module-6"
      element={
        <S>
          <RSMModule6 />
        </S>
      }
    />
    <Route
      path="rsm-mock-exam"
      element={
        <S>
          <RSMMockExam />
        </S>
      }
    />
  </>
);
