import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const EmotionalIntelligenceCourse = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EmotionalIntelligenceCourse')
);
const EIModule1 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule1')
);
const EIModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule1Section1')
);
const EIModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule1Section2')
);
const EIModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule1Section3')
);
const EIModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule1Section4')
);
const EIModule2 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule2')
);
const EIModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule2Section1')
);
const EIModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule2Section2')
);
const EIModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule2Section3')
);
const EIModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule2Section4')
);
const EIModule3 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule3')
);
const EIModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule3Section1')
);
const EIModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule3Section2')
);
const EIModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule3Section3')
);
const EIModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule3Section4')
);
const EIModule4 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule4')
);
const EIModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule4Section1')
);
const EIModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule4Section2')
);
const EIModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule4Section3')
);
const EIModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule4Section4')
);
const EIModule5 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule5')
);
const EIModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule5Section1')
);
const EIModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule5Section2')
);
const EIModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule5Section3')
);
const EIModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule5Section4')
);
const EIModule6 = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIModule6')
);
const EIMockExam = lazyWithRetry(
  () => import('@/pages/study-centre/emotional-intelligence/EIMockExam')
);

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const emotionalIntelligenceRoutes = (
  <>
    <Route
      path="emotional-intelligence"
      element={
        <S>
          <EmotionalIntelligenceCourse />
        </S>
      }
    />
    <Route
      path="ei-module-1"
      element={
        <S>
          <EIModule1 />
        </S>
      }
    />
    <Route
      path="ei-module-1-section-1"
      element={
        <S>
          <EIModule1Section1 />
        </S>
      }
    />
    <Route
      path="ei-module-1-section-2"
      element={
        <S>
          <EIModule1Section2 />
        </S>
      }
    />
    <Route
      path="ei-module-1-section-3"
      element={
        <S>
          <EIModule1Section3 />
        </S>
      }
    />
    <Route
      path="ei-module-1-section-4"
      element={
        <S>
          <EIModule1Section4 />
        </S>
      }
    />
    <Route
      path="ei-module-2"
      element={
        <S>
          <EIModule2 />
        </S>
      }
    />
    <Route
      path="ei-module-2-section-1"
      element={
        <S>
          <EIModule2Section1 />
        </S>
      }
    />
    <Route
      path="ei-module-2-section-2"
      element={
        <S>
          <EIModule2Section2 />
        </S>
      }
    />
    <Route
      path="ei-module-2-section-3"
      element={
        <S>
          <EIModule2Section3 />
        </S>
      }
    />
    <Route
      path="ei-module-2-section-4"
      element={
        <S>
          <EIModule2Section4 />
        </S>
      }
    />
    <Route
      path="ei-module-3"
      element={
        <S>
          <EIModule3 />
        </S>
      }
    />
    <Route
      path="ei-module-3-section-1"
      element={
        <S>
          <EIModule3Section1 />
        </S>
      }
    />
    <Route
      path="ei-module-3-section-2"
      element={
        <S>
          <EIModule3Section2 />
        </S>
      }
    />
    <Route
      path="ei-module-3-section-3"
      element={
        <S>
          <EIModule3Section3 />
        </S>
      }
    />
    <Route
      path="ei-module-3-section-4"
      element={
        <S>
          <EIModule3Section4 />
        </S>
      }
    />
    <Route
      path="ei-module-4"
      element={
        <S>
          <EIModule4 />
        </S>
      }
    />
    <Route
      path="ei-module-4-section-1"
      element={
        <S>
          <EIModule4Section1 />
        </S>
      }
    />
    <Route
      path="ei-module-4-section-2"
      element={
        <S>
          <EIModule4Section2 />
        </S>
      }
    />
    <Route
      path="ei-module-4-section-3"
      element={
        <S>
          <EIModule4Section3 />
        </S>
      }
    />
    <Route
      path="ei-module-4-section-4"
      element={
        <S>
          <EIModule4Section4 />
        </S>
      }
    />
    <Route
      path="ei-module-5"
      element={
        <S>
          <EIModule5 />
        </S>
      }
    />
    <Route
      path="ei-module-5-section-1"
      element={
        <S>
          <EIModule5Section1 />
        </S>
      }
    />
    <Route
      path="ei-module-5-section-2"
      element={
        <S>
          <EIModule5Section2 />
        </S>
      }
    />
    <Route
      path="ei-module-5-section-3"
      element={
        <S>
          <EIModule5Section3 />
        </S>
      }
    />
    <Route
      path="ei-module-5-section-4"
      element={
        <S>
          <EIModule5Section4 />
        </S>
      }
    />
    <Route
      path="ei-module-6"
      element={
        <S>
          <EIModule6 />
        </S>
      }
    />
    <Route
      path="ei-mock-exam"
      element={
        <S>
          <EIMockExam />
        </S>
      }
    />
  </>
);
