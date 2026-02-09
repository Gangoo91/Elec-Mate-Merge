import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const FirstAidCourse = lazyWithRetry(() => import('@/pages/study-centre/first-aid/FirstAidCourse'));
const FirstAidModule1 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule1')
);
const FirstAidModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule1Section1')
);
const FirstAidModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule1Section2')
);
const FirstAidModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule1Section3')
);
const FirstAidModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule1Section4')
);
const FirstAidModule2 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule2')
);
const FirstAidModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule2Section1')
);
const FirstAidModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule2Section2')
);
const FirstAidModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule2Section3')
);
const FirstAidModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule2Section4')
);
const FirstAidModule3 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule3')
);
const FirstAidModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule3Section1')
);
const FirstAidModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule3Section2')
);
const FirstAidModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule3Section3')
);
const FirstAidModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule3Section4')
);
const FirstAidModule4 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule4')
);
const FirstAidModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule4Section1')
);
const FirstAidModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule4Section2')
);
const FirstAidModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule4Section3')
);
const FirstAidModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule4Section4')
);
const FirstAidModule5 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule5')
);
const FirstAidModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule5Section1')
);
const FirstAidModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule5Section2')
);
const FirstAidModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule5Section3')
);
const FirstAidModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule5Section4')
);
const FirstAidModule6 = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidModule6')
);
const FirstAidMockExam = lazyWithRetry(
  () => import('@/pages/study-centre/first-aid/FirstAidMockExam')
);

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const firstAidRoutes = (
  <>
    <Route
      path="first-aid-course"
      element={
        <S>
          <FirstAidCourse />
        </S>
      }
    />
    <Route
      path="first-aid-module-1"
      element={
        <S>
          <FirstAidModule1 />
        </S>
      }
    />
    <Route
      path="first-aid-module-1-section-1"
      element={
        <S>
          <FirstAidModule1Section1 />
        </S>
      }
    />
    <Route
      path="first-aid-module-1-section-2"
      element={
        <S>
          <FirstAidModule1Section2 />
        </S>
      }
    />
    <Route
      path="first-aid-module-1-section-3"
      element={
        <S>
          <FirstAidModule1Section3 />
        </S>
      }
    />
    <Route
      path="first-aid-module-1-section-4"
      element={
        <S>
          <FirstAidModule1Section4 />
        </S>
      }
    />
    <Route
      path="first-aid-module-2"
      element={
        <S>
          <FirstAidModule2 />
        </S>
      }
    />
    <Route
      path="first-aid-module-2-section-1"
      element={
        <S>
          <FirstAidModule2Section1 />
        </S>
      }
    />
    <Route
      path="first-aid-module-2-section-2"
      element={
        <S>
          <FirstAidModule2Section2 />
        </S>
      }
    />
    <Route
      path="first-aid-module-2-section-3"
      element={
        <S>
          <FirstAidModule2Section3 />
        </S>
      }
    />
    <Route
      path="first-aid-module-2-section-4"
      element={
        <S>
          <FirstAidModule2Section4 />
        </S>
      }
    />
    <Route
      path="first-aid-module-3"
      element={
        <S>
          <FirstAidModule3 />
        </S>
      }
    />
    <Route
      path="first-aid-module-3-section-1"
      element={
        <S>
          <FirstAidModule3Section1 />
        </S>
      }
    />
    <Route
      path="first-aid-module-3-section-2"
      element={
        <S>
          <FirstAidModule3Section2 />
        </S>
      }
    />
    <Route
      path="first-aid-module-3-section-3"
      element={
        <S>
          <FirstAidModule3Section3 />
        </S>
      }
    />
    <Route
      path="first-aid-module-3-section-4"
      element={
        <S>
          <FirstAidModule3Section4 />
        </S>
      }
    />
    <Route
      path="first-aid-module-4"
      element={
        <S>
          <FirstAidModule4 />
        </S>
      }
    />
    <Route
      path="first-aid-module-4-section-1"
      element={
        <S>
          <FirstAidModule4Section1 />
        </S>
      }
    />
    <Route
      path="first-aid-module-4-section-2"
      element={
        <S>
          <FirstAidModule4Section2 />
        </S>
      }
    />
    <Route
      path="first-aid-module-4-section-3"
      element={
        <S>
          <FirstAidModule4Section3 />
        </S>
      }
    />
    <Route
      path="first-aid-module-4-section-4"
      element={
        <S>
          <FirstAidModule4Section4 />
        </S>
      }
    />
    <Route
      path="first-aid-module-5"
      element={
        <S>
          <FirstAidModule5 />
        </S>
      }
    />
    <Route
      path="first-aid-module-5-section-1"
      element={
        <S>
          <FirstAidModule5Section1 />
        </S>
      }
    />
    <Route
      path="first-aid-module-5-section-2"
      element={
        <S>
          <FirstAidModule5Section2 />
        </S>
      }
    />
    <Route
      path="first-aid-module-5-section-3"
      element={
        <S>
          <FirstAidModule5Section3 />
        </S>
      }
    />
    <Route
      path="first-aid-module-5-section-4"
      element={
        <S>
          <FirstAidModule5Section4 />
        </S>
      }
    />
    <Route
      path="first-aid-module-6"
      element={
        <S>
          <FirstAidModule6 />
        </S>
      }
    />
    <Route
      path="first-aid-mock-exam"
      element={
        <S>
          <FirstAidMockExam />
        </S>
      }
    />
  </>
);
