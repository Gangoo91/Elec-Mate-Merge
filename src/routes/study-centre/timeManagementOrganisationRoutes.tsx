import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const TMOCourse = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TimeManagementOrganisationCourse')
);
const TMOModule1 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule1')
);
const TMOModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule1Section1')
);
const TMOModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule1Section2')
);
const TMOModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule1Section3')
);
const TMOModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule1Section4')
);
const TMOModule2 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule2')
);
const TMOModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule2Section1')
);
const TMOModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule2Section2')
);
const TMOModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule2Section3')
);
const TMOModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule2Section4')
);
const TMOModule3 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule3')
);
const TMOModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule3Section1')
);
const TMOModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule3Section2')
);
const TMOModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule3Section3')
);
const TMOModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule3Section4')
);
const TMOModule4 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule4')
);
const TMOModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule4Section1')
);
const TMOModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule4Section2')
);
const TMOModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule4Section3')
);
const TMOModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule4Section4')
);
const TMOModule5 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule5')
);
const TMOModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule5Section1')
);
const TMOModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule5Section2')
);
const TMOModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule5Section3')
);
const TMOModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule5Section4')
);
const TMOModule6 = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOModule6')
);
const TMOMockExam = lazyWithRetry(
  () => import('@/pages/study-centre/time-management-organisation/TMOMockExam')
);

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const timeManagementOrganisationRoutes = (
  <>
    <Route
      path="time-management-organisation"
      element={
        <S>
          <TMOCourse />
        </S>
      }
    />
    <Route
      path="tmo-module-1"
      element={
        <S>
          <TMOModule1 />
        </S>
      }
    />
    <Route
      path="tmo-module-1-section-1"
      element={
        <S>
          <TMOModule1Section1 />
        </S>
      }
    />
    <Route
      path="tmo-module-1-section-2"
      element={
        <S>
          <TMOModule1Section2 />
        </S>
      }
    />
    <Route
      path="tmo-module-1-section-3"
      element={
        <S>
          <TMOModule1Section3 />
        </S>
      }
    />
    <Route
      path="tmo-module-1-section-4"
      element={
        <S>
          <TMOModule1Section4 />
        </S>
      }
    />
    <Route
      path="tmo-module-2"
      element={
        <S>
          <TMOModule2 />
        </S>
      }
    />
    <Route
      path="tmo-module-2-section-1"
      element={
        <S>
          <TMOModule2Section1 />
        </S>
      }
    />
    <Route
      path="tmo-module-2-section-2"
      element={
        <S>
          <TMOModule2Section2 />
        </S>
      }
    />
    <Route
      path="tmo-module-2-section-3"
      element={
        <S>
          <TMOModule2Section3 />
        </S>
      }
    />
    <Route
      path="tmo-module-2-section-4"
      element={
        <S>
          <TMOModule2Section4 />
        </S>
      }
    />
    <Route
      path="tmo-module-3"
      element={
        <S>
          <TMOModule3 />
        </S>
      }
    />
    <Route
      path="tmo-module-3-section-1"
      element={
        <S>
          <TMOModule3Section1 />
        </S>
      }
    />
    <Route
      path="tmo-module-3-section-2"
      element={
        <S>
          <TMOModule3Section2 />
        </S>
      }
    />
    <Route
      path="tmo-module-3-section-3"
      element={
        <S>
          <TMOModule3Section3 />
        </S>
      }
    />
    <Route
      path="tmo-module-3-section-4"
      element={
        <S>
          <TMOModule3Section4 />
        </S>
      }
    />
    <Route
      path="tmo-module-4"
      element={
        <S>
          <TMOModule4 />
        </S>
      }
    />
    <Route
      path="tmo-module-4-section-1"
      element={
        <S>
          <TMOModule4Section1 />
        </S>
      }
    />
    <Route
      path="tmo-module-4-section-2"
      element={
        <S>
          <TMOModule4Section2 />
        </S>
      }
    />
    <Route
      path="tmo-module-4-section-3"
      element={
        <S>
          <TMOModule4Section3 />
        </S>
      }
    />
    <Route
      path="tmo-module-4-section-4"
      element={
        <S>
          <TMOModule4Section4 />
        </S>
      }
    />
    <Route
      path="tmo-module-5"
      element={
        <S>
          <TMOModule5 />
        </S>
      }
    />
    <Route
      path="tmo-module-5-section-1"
      element={
        <S>
          <TMOModule5Section1 />
        </S>
      }
    />
    <Route
      path="tmo-module-5-section-2"
      element={
        <S>
          <TMOModule5Section2 />
        </S>
      }
    />
    <Route
      path="tmo-module-5-section-3"
      element={
        <S>
          <TMOModule5Section3 />
        </S>
      }
    />
    <Route
      path="tmo-module-5-section-4"
      element={
        <S>
          <TMOModule5Section4 />
        </S>
      }
    />
    <Route
      path="tmo-module-6"
      element={
        <S>
          <TMOModule6 />
        </S>
      }
    />
    <Route
      path="tmo-mock-exam"
      element={
        <S>
          <TMOMockExam />
        </S>
      }
    />
  </>
);
