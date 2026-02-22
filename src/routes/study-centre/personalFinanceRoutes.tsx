import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const PFCourse = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PersonalFinanceCourse')
);
const PFModule1 = lazyWithRetry(() => import('@/pages/study-centre/personal-finance/PFModule1'));
const PFModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule1Section1')
);
const PFModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule1Section2')
);
const PFModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule1Section3')
);
const PFModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule1Section4')
);
const PFModule2 = lazyWithRetry(() => import('@/pages/study-centre/personal-finance/PFModule2'));
const PFModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule2Section1')
);
const PFModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule2Section2')
);
const PFModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule2Section3')
);
const PFModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule2Section4')
);
const PFModule3 = lazyWithRetry(() => import('@/pages/study-centre/personal-finance/PFModule3'));
const PFModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule3Section1')
);
const PFModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule3Section2')
);
const PFModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule3Section3')
);
const PFModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule3Section4')
);
const PFModule4 = lazyWithRetry(() => import('@/pages/study-centre/personal-finance/PFModule4'));
const PFModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule4Section1')
);
const PFModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule4Section2')
);
const PFModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule4Section3')
);
const PFModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule4Section4')
);
const PFModule5 = lazyWithRetry(() => import('@/pages/study-centre/personal-finance/PFModule5'));
const PFModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule5Section1')
);
const PFModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule5Section2')
);
const PFModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule5Section3')
);
const PFModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/personal-finance/PFModule5Section4')
);
const PFModule6 = lazyWithRetry(() => import('@/pages/study-centre/personal-finance/PFModule6'));
const PFMockExam = lazyWithRetry(() => import('@/pages/study-centre/personal-finance/PFMockExam'));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const personalFinanceRoutes = (
  <>
    <Route
      path="personal-finance"
      element={
        <S>
          <PFCourse />
        </S>
      }
    />
    <Route
      path="pf-module-1"
      element={
        <S>
          <PFModule1 />
        </S>
      }
    />
    <Route
      path="pf-module-1-section-1"
      element={
        <S>
          <PFModule1Section1 />
        </S>
      }
    />
    <Route
      path="pf-module-1-section-2"
      element={
        <S>
          <PFModule1Section2 />
        </S>
      }
    />
    <Route
      path="pf-module-1-section-3"
      element={
        <S>
          <PFModule1Section3 />
        </S>
      }
    />
    <Route
      path="pf-module-1-section-4"
      element={
        <S>
          <PFModule1Section4 />
        </S>
      }
    />
    <Route
      path="pf-module-2"
      element={
        <S>
          <PFModule2 />
        </S>
      }
    />
    <Route
      path="pf-module-2-section-1"
      element={
        <S>
          <PFModule2Section1 />
        </S>
      }
    />
    <Route
      path="pf-module-2-section-2"
      element={
        <S>
          <PFModule2Section2 />
        </S>
      }
    />
    <Route
      path="pf-module-2-section-3"
      element={
        <S>
          <PFModule2Section3 />
        </S>
      }
    />
    <Route
      path="pf-module-2-section-4"
      element={
        <S>
          <PFModule2Section4 />
        </S>
      }
    />
    <Route
      path="pf-module-3"
      element={
        <S>
          <PFModule3 />
        </S>
      }
    />
    <Route
      path="pf-module-3-section-1"
      element={
        <S>
          <PFModule3Section1 />
        </S>
      }
    />
    <Route
      path="pf-module-3-section-2"
      element={
        <S>
          <PFModule3Section2 />
        </S>
      }
    />
    <Route
      path="pf-module-3-section-3"
      element={
        <S>
          <PFModule3Section3 />
        </S>
      }
    />
    <Route
      path="pf-module-3-section-4"
      element={
        <S>
          <PFModule3Section4 />
        </S>
      }
    />
    <Route
      path="pf-module-4"
      element={
        <S>
          <PFModule4 />
        </S>
      }
    />
    <Route
      path="pf-module-4-section-1"
      element={
        <S>
          <PFModule4Section1 />
        </S>
      }
    />
    <Route
      path="pf-module-4-section-2"
      element={
        <S>
          <PFModule4Section2 />
        </S>
      }
    />
    <Route
      path="pf-module-4-section-3"
      element={
        <S>
          <PFModule4Section3 />
        </S>
      }
    />
    <Route
      path="pf-module-4-section-4"
      element={
        <S>
          <PFModule4Section4 />
        </S>
      }
    />
    <Route
      path="pf-module-5"
      element={
        <S>
          <PFModule5 />
        </S>
      }
    />
    <Route
      path="pf-module-5-section-1"
      element={
        <S>
          <PFModule5Section1 />
        </S>
      }
    />
    <Route
      path="pf-module-5-section-2"
      element={
        <S>
          <PFModule5Section2 />
        </S>
      }
    />
    <Route
      path="pf-module-5-section-3"
      element={
        <S>
          <PFModule5Section3 />
        </S>
      }
    />
    <Route
      path="pf-module-5-section-4"
      element={
        <S>
          <PFModule5Section4 />
        </S>
      }
    />
    <Route
      path="pf-module-6"
      element={
        <S>
          <PFModule6 />
        </S>
      }
    />
    <Route
      path="pf-mock-exam"
      element={
        <S>
          <PFMockExam />
        </S>
      }
    />
  </>
);
