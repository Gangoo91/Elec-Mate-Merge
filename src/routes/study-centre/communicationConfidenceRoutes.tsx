import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const CommunicationConfidenceCourse = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CommunicationConfidenceCourse')
);
const CCModule1 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule1')
);
const CCModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule1Section1')
);
const CCModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule1Section2')
);
const CCModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule1Section3')
);
const CCModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule1Section4')
);
const CCModule2 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule2')
);
const CCModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule2Section1')
);
const CCModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule2Section2')
);
const CCModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule2Section3')
);
const CCModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule2Section4')
);
const CCModule3 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule3')
);
const CCModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule3Section1')
);
const CCModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule3Section2')
);
const CCModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule3Section3')
);
const CCModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule3Section4')
);
const CCModule4 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule4')
);
const CCModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule4Section1')
);
const CCModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule4Section2')
);
const CCModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule4Section3')
);
const CCModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule4Section4')
);
const CCModule5 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule5')
);
const CCModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule5Section1')
);
const CCModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule5Section2')
);
const CCModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule5Section3')
);
const CCModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule5Section4')
);
const CCModule6 = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCModule6')
);
const CCMockExam = lazyWithRetry(
  () => import('@/pages/study-centre/communication-confidence/CCMockExam')
);

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const communicationConfidenceRoutes = (
  <>
    <Route
      path="communication-confidence"
      element={
        <S>
          <CommunicationConfidenceCourse />
        </S>
      }
    />
    <Route
      path="cc-module-1"
      element={
        <S>
          <CCModule1 />
        </S>
      }
    />
    <Route
      path="cc-module-1-section-1"
      element={
        <S>
          <CCModule1Section1 />
        </S>
      }
    />
    <Route
      path="cc-module-1-section-2"
      element={
        <S>
          <CCModule1Section2 />
        </S>
      }
    />
    <Route
      path="cc-module-1-section-3"
      element={
        <S>
          <CCModule1Section3 />
        </S>
      }
    />
    <Route
      path="cc-module-1-section-4"
      element={
        <S>
          <CCModule1Section4 />
        </S>
      }
    />
    <Route
      path="cc-module-2"
      element={
        <S>
          <CCModule2 />
        </S>
      }
    />
    <Route
      path="cc-module-2-section-1"
      element={
        <S>
          <CCModule2Section1 />
        </S>
      }
    />
    <Route
      path="cc-module-2-section-2"
      element={
        <S>
          <CCModule2Section2 />
        </S>
      }
    />
    <Route
      path="cc-module-2-section-3"
      element={
        <S>
          <CCModule2Section3 />
        </S>
      }
    />
    <Route
      path="cc-module-2-section-4"
      element={
        <S>
          <CCModule2Section4 />
        </S>
      }
    />
    <Route
      path="cc-module-3"
      element={
        <S>
          <CCModule3 />
        </S>
      }
    />
    <Route
      path="cc-module-3-section-1"
      element={
        <S>
          <CCModule3Section1 />
        </S>
      }
    />
    <Route
      path="cc-module-3-section-2"
      element={
        <S>
          <CCModule3Section2 />
        </S>
      }
    />
    <Route
      path="cc-module-3-section-3"
      element={
        <S>
          <CCModule3Section3 />
        </S>
      }
    />
    <Route
      path="cc-module-3-section-4"
      element={
        <S>
          <CCModule3Section4 />
        </S>
      }
    />
    <Route
      path="cc-module-4"
      element={
        <S>
          <CCModule4 />
        </S>
      }
    />
    <Route
      path="cc-module-4-section-1"
      element={
        <S>
          <CCModule4Section1 />
        </S>
      }
    />
    <Route
      path="cc-module-4-section-2"
      element={
        <S>
          <CCModule4Section2 />
        </S>
      }
    />
    <Route
      path="cc-module-4-section-3"
      element={
        <S>
          <CCModule4Section3 />
        </S>
      }
    />
    <Route
      path="cc-module-4-section-4"
      element={
        <S>
          <CCModule4Section4 />
        </S>
      }
    />
    <Route
      path="cc-module-5"
      element={
        <S>
          <CCModule5 />
        </S>
      }
    />
    <Route
      path="cc-module-5-section-1"
      element={
        <S>
          <CCModule5Section1 />
        </S>
      }
    />
    <Route
      path="cc-module-5-section-2"
      element={
        <S>
          <CCModule5Section2 />
        </S>
      }
    />
    <Route
      path="cc-module-5-section-3"
      element={
        <S>
          <CCModule5Section3 />
        </S>
      }
    />
    <Route
      path="cc-module-5-section-4"
      element={
        <S>
          <CCModule5Section4 />
        </S>
      }
    />
    <Route
      path="cc-module-6"
      element={
        <S>
          <CCModule6 />
        </S>
      }
    />
    <Route
      path="cc-mock-exam"
      element={
        <S>
          <CCMockExam />
        </S>
      }
    />
  </>
);
