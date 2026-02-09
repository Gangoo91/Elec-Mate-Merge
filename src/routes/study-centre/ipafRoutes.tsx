import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const IpafCourse = lazyWithRetry(() => import('@/pages/study-centre/ipaf/IpafCourse'));
const IpafModule1 = lazyWithRetry(() => import('@/pages/study-centre/ipaf/IpafModule1'));
const IpafModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule1Section1')
);
const IpafModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule1Section2')
);
const IpafModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule1Section3')
);
const IpafModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule1Section4')
);
const IpafModule2 = lazyWithRetry(() => import('@/pages/study-centre/ipaf/IpafModule2'));
const IpafModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule2Section1')
);
const IpafModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule2Section2')
);
const IpafModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule2Section3')
);
const IpafModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule2Section4')
);
const IpafModule3 = lazyWithRetry(() => import('@/pages/study-centre/ipaf/IpafModule3'));
const IpafModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule3Section1')
);
const IpafModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule3Section2')
);
const IpafModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule3Section3')
);
const IpafModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule3Section4')
);
const IpafModule4 = lazyWithRetry(() => import('@/pages/study-centre/ipaf/IpafModule4'));
const IpafModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule4Section1')
);
const IpafModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule4Section2')
);
const IpafModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule4Section3')
);
const IpafModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule4Section4')
);
const IpafModule5 = lazyWithRetry(() => import('@/pages/study-centre/ipaf/IpafModule5'));
const IpafModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule5Section1')
);
const IpafModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule5Section2')
);
const IpafModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule5Section3')
);
const IpafModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/ipaf/IpafModule5Section4')
);
const IpafModule6 = lazyWithRetry(() => import('@/pages/study-centre/ipaf/IpafModule6'));
const IpafMockExam = lazyWithRetry(() => import('@/pages/study-centre/ipaf/IpafMockExam'));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const ipafRoutes = (
  <>
    <Route
      path="ipaf-course"
      element={
        <S>
          <IpafCourse />
        </S>
      }
    />
    <Route
      path="ipaf-module-1"
      element={
        <S>
          <IpafModule1 />
        </S>
      }
    />
    <Route
      path="ipaf-module-1-section-1"
      element={
        <S>
          <IpafModule1Section1 />
        </S>
      }
    />
    <Route
      path="ipaf-module-1-section-2"
      element={
        <S>
          <IpafModule1Section2 />
        </S>
      }
    />
    <Route
      path="ipaf-module-1-section-3"
      element={
        <S>
          <IpafModule1Section3 />
        </S>
      }
    />
    <Route
      path="ipaf-module-1-section-4"
      element={
        <S>
          <IpafModule1Section4 />
        </S>
      }
    />
    <Route
      path="ipaf-module-2"
      element={
        <S>
          <IpafModule2 />
        </S>
      }
    />
    <Route
      path="ipaf-module-2-section-1"
      element={
        <S>
          <IpafModule2Section1 />
        </S>
      }
    />
    <Route
      path="ipaf-module-2-section-2"
      element={
        <S>
          <IpafModule2Section2 />
        </S>
      }
    />
    <Route
      path="ipaf-module-2-section-3"
      element={
        <S>
          <IpafModule2Section3 />
        </S>
      }
    />
    <Route
      path="ipaf-module-2-section-4"
      element={
        <S>
          <IpafModule2Section4 />
        </S>
      }
    />
    <Route
      path="ipaf-module-3"
      element={
        <S>
          <IpafModule3 />
        </S>
      }
    />
    <Route
      path="ipaf-module-3-section-1"
      element={
        <S>
          <IpafModule3Section1 />
        </S>
      }
    />
    <Route
      path="ipaf-module-3-section-2"
      element={
        <S>
          <IpafModule3Section2 />
        </S>
      }
    />
    <Route
      path="ipaf-module-3-section-3"
      element={
        <S>
          <IpafModule3Section3 />
        </S>
      }
    />
    <Route
      path="ipaf-module-3-section-4"
      element={
        <S>
          <IpafModule3Section4 />
        </S>
      }
    />
    <Route
      path="ipaf-module-4"
      element={
        <S>
          <IpafModule4 />
        </S>
      }
    />
    <Route
      path="ipaf-module-4-section-1"
      element={
        <S>
          <IpafModule4Section1 />
        </S>
      }
    />
    <Route
      path="ipaf-module-4-section-2"
      element={
        <S>
          <IpafModule4Section2 />
        </S>
      }
    />
    <Route
      path="ipaf-module-4-section-3"
      element={
        <S>
          <IpafModule4Section3 />
        </S>
      }
    />
    <Route
      path="ipaf-module-4-section-4"
      element={
        <S>
          <IpafModule4Section4 />
        </S>
      }
    />
    <Route
      path="ipaf-module-5"
      element={
        <S>
          <IpafModule5 />
        </S>
      }
    />
    <Route
      path="ipaf-module-5-section-1"
      element={
        <S>
          <IpafModule5Section1 />
        </S>
      }
    />
    <Route
      path="ipaf-module-5-section-2"
      element={
        <S>
          <IpafModule5Section2 />
        </S>
      }
    />
    <Route
      path="ipaf-module-5-section-3"
      element={
        <S>
          <IpafModule5Section3 />
        </S>
      }
    />
    <Route
      path="ipaf-module-5-section-4"
      element={
        <S>
          <IpafModule5Section4 />
        </S>
      }
    />
    <Route
      path="ipaf-module-6"
      element={
        <S>
          <IpafModule6 />
        </S>
      }
    />
    <Route
      path="ipaf-mock-exam"
      element={
        <S>
          <IpafMockExam />
        </S>
      }
    />
  </>
);
