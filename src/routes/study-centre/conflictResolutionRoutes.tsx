import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const CRCourse = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/ConflictResolutionCourse')
);
const CRModule1 = lazyWithRetry(() => import('@/pages/study-centre/conflict-resolution/CRModule1'));
const CRModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule1Section1')
);
const CRModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule1Section2')
);
const CRModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule1Section3')
);
const CRModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule1Section4')
);
const CRModule2 = lazyWithRetry(() => import('@/pages/study-centre/conflict-resolution/CRModule2'));
const CRModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule2Section1')
);
const CRModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule2Section2')
);
const CRModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule2Section3')
);
const CRModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule2Section4')
);
const CRModule3 = lazyWithRetry(() => import('@/pages/study-centre/conflict-resolution/CRModule3'));
const CRModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule3Section1')
);
const CRModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule3Section2')
);
const CRModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule3Section3')
);
const CRModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule3Section4')
);
const CRModule4 = lazyWithRetry(() => import('@/pages/study-centre/conflict-resolution/CRModule4'));
const CRModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule4Section1')
);
const CRModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule4Section2')
);
const CRModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule4Section3')
);
const CRModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule4Section4')
);
const CRModule5 = lazyWithRetry(() => import('@/pages/study-centre/conflict-resolution/CRModule5'));
const CRModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule5Section1')
);
const CRModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule5Section2')
);
const CRModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule5Section3')
);
const CRModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRModule5Section4')
);
const CRModule6 = lazyWithRetry(() => import('@/pages/study-centre/conflict-resolution/CRModule6'));
const CRMockExam = lazyWithRetry(
  () => import('@/pages/study-centre/conflict-resolution/CRMockExam')
);

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const conflictResolutionRoutes = (
  <>
    <Route
      path="conflict-resolution"
      element={
        <S>
          <CRCourse />
        </S>
      }
    />
    <Route
      path="cr-module-1"
      element={
        <S>
          <CRModule1 />
        </S>
      }
    />
    <Route
      path="cr-module-1-section-1"
      element={
        <S>
          <CRModule1Section1 />
        </S>
      }
    />
    <Route
      path="cr-module-1-section-2"
      element={
        <S>
          <CRModule1Section2 />
        </S>
      }
    />
    <Route
      path="cr-module-1-section-3"
      element={
        <S>
          <CRModule1Section3 />
        </S>
      }
    />
    <Route
      path="cr-module-1-section-4"
      element={
        <S>
          <CRModule1Section4 />
        </S>
      }
    />
    <Route
      path="cr-module-2"
      element={
        <S>
          <CRModule2 />
        </S>
      }
    />
    <Route
      path="cr-module-2-section-1"
      element={
        <S>
          <CRModule2Section1 />
        </S>
      }
    />
    <Route
      path="cr-module-2-section-2"
      element={
        <S>
          <CRModule2Section2 />
        </S>
      }
    />
    <Route
      path="cr-module-2-section-3"
      element={
        <S>
          <CRModule2Section3 />
        </S>
      }
    />
    <Route
      path="cr-module-2-section-4"
      element={
        <S>
          <CRModule2Section4 />
        </S>
      }
    />
    <Route
      path="cr-module-3"
      element={
        <S>
          <CRModule3 />
        </S>
      }
    />
    <Route
      path="cr-module-3-section-1"
      element={
        <S>
          <CRModule3Section1 />
        </S>
      }
    />
    <Route
      path="cr-module-3-section-2"
      element={
        <S>
          <CRModule3Section2 />
        </S>
      }
    />
    <Route
      path="cr-module-3-section-3"
      element={
        <S>
          <CRModule3Section3 />
        </S>
      }
    />
    <Route
      path="cr-module-3-section-4"
      element={
        <S>
          <CRModule3Section4 />
        </S>
      }
    />
    <Route
      path="cr-module-4"
      element={
        <S>
          <CRModule4 />
        </S>
      }
    />
    <Route
      path="cr-module-4-section-1"
      element={
        <S>
          <CRModule4Section1 />
        </S>
      }
    />
    <Route
      path="cr-module-4-section-2"
      element={
        <S>
          <CRModule4Section2 />
        </S>
      }
    />
    <Route
      path="cr-module-4-section-3"
      element={
        <S>
          <CRModule4Section3 />
        </S>
      }
    />
    <Route
      path="cr-module-4-section-4"
      element={
        <S>
          <CRModule4Section4 />
        </S>
      }
    />
    <Route
      path="cr-module-5"
      element={
        <S>
          <CRModule5 />
        </S>
      }
    />
    <Route
      path="cr-module-5-section-1"
      element={
        <S>
          <CRModule5Section1 />
        </S>
      }
    />
    <Route
      path="cr-module-5-section-2"
      element={
        <S>
          <CRModule5Section2 />
        </S>
      }
    />
    <Route
      path="cr-module-5-section-3"
      element={
        <S>
          <CRModule5Section3 />
        </S>
      }
    />
    <Route
      path="cr-module-5-section-4"
      element={
        <S>
          <CRModule5Section4 />
        </S>
      }
    />
    <Route
      path="cr-module-6"
      element={
        <S>
          <CRModule6 />
        </S>
      }
    />
    <Route
      path="cr-mock-exam"
      element={
        <S>
          <CRMockExam />
        </S>
      }
    />
  </>
);
