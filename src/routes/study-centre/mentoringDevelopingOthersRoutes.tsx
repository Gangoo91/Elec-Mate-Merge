import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const MentoringDevelopingOthersCourse = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MentoringDevelopingOthersCourse')
);
const MDModule1 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule1')
);
const MDModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule1Section1')
);
const MDModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule1Section2')
);
const MDModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule1Section3')
);
const MDModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule1Section4')
);
const MDModule2 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule2')
);
const MDModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule2Section1')
);
const MDModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule2Section2')
);
const MDModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule2Section3')
);
const MDModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule2Section4')
);
const MDModule3 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule3')
);
const MDModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule3Section1')
);
const MDModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule3Section2')
);
const MDModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule3Section3')
);
const MDModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule3Section4')
);
const MDModule4 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule4')
);
const MDModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule4Section1')
);
const MDModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule4Section2')
);
const MDModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule4Section3')
);
const MDModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule4Section4')
);
const MDModule5 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule5')
);
const MDModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule5Section1')
);
const MDModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule5Section2')
);
const MDModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule5Section3')
);
const MDModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule5Section4')
);
const MDModule6 = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDModule6')
);
const MDMockExam = lazyWithRetry(
  () => import('@/pages/study-centre/mentoring-developing-others/MDMockExam')
);

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const mentoringDevelopingOthersRoutes = (
  <>
    <Route
      path="mentoring-developing-others"
      element={
        <S>
          <MentoringDevelopingOthersCourse />
        </S>
      }
    />
    <Route
      path="md-module-1"
      element={
        <S>
          <MDModule1 />
        </S>
      }
    />
    <Route
      path="md-module-1-section-1"
      element={
        <S>
          <MDModule1Section1 />
        </S>
      }
    />
    <Route
      path="md-module-1-section-2"
      element={
        <S>
          <MDModule1Section2 />
        </S>
      }
    />
    <Route
      path="md-module-1-section-3"
      element={
        <S>
          <MDModule1Section3 />
        </S>
      }
    />
    <Route
      path="md-module-1-section-4"
      element={
        <S>
          <MDModule1Section4 />
        </S>
      }
    />
    <Route
      path="md-module-2"
      element={
        <S>
          <MDModule2 />
        </S>
      }
    />
    <Route
      path="md-module-2-section-1"
      element={
        <S>
          <MDModule2Section1 />
        </S>
      }
    />
    <Route
      path="md-module-2-section-2"
      element={
        <S>
          <MDModule2Section2 />
        </S>
      }
    />
    <Route
      path="md-module-2-section-3"
      element={
        <S>
          <MDModule2Section3 />
        </S>
      }
    />
    <Route
      path="md-module-2-section-4"
      element={
        <S>
          <MDModule2Section4 />
        </S>
      }
    />
    <Route
      path="md-module-3"
      element={
        <S>
          <MDModule3 />
        </S>
      }
    />
    <Route
      path="md-module-3-section-1"
      element={
        <S>
          <MDModule3Section1 />
        </S>
      }
    />
    <Route
      path="md-module-3-section-2"
      element={
        <S>
          <MDModule3Section2 />
        </S>
      }
    />
    <Route
      path="md-module-3-section-3"
      element={
        <S>
          <MDModule3Section3 />
        </S>
      }
    />
    <Route
      path="md-module-3-section-4"
      element={
        <S>
          <MDModule3Section4 />
        </S>
      }
    />
    <Route
      path="md-module-4"
      element={
        <S>
          <MDModule4 />
        </S>
      }
    />
    <Route
      path="md-module-4-section-1"
      element={
        <S>
          <MDModule4Section1 />
        </S>
      }
    />
    <Route
      path="md-module-4-section-2"
      element={
        <S>
          <MDModule4Section2 />
        </S>
      }
    />
    <Route
      path="md-module-4-section-3"
      element={
        <S>
          <MDModule4Section3 />
        </S>
      }
    />
    <Route
      path="md-module-4-section-4"
      element={
        <S>
          <MDModule4Section4 />
        </S>
      }
    />
    <Route
      path="md-module-5"
      element={
        <S>
          <MDModule5 />
        </S>
      }
    />
    <Route
      path="md-module-5-section-1"
      element={
        <S>
          <MDModule5Section1 />
        </S>
      }
    />
    <Route
      path="md-module-5-section-2"
      element={
        <S>
          <MDModule5Section2 />
        </S>
      }
    />
    <Route
      path="md-module-5-section-3"
      element={
        <S>
          <MDModule5Section3 />
        </S>
      }
    />
    <Route
      path="md-module-5-section-4"
      element={
        <S>
          <MDModule5Section4 />
        </S>
      }
    />
    <Route
      path="md-module-6"
      element={
        <S>
          <MDModule6 />
        </S>
      }
    />
    <Route
      path="md-mock-exam"
      element={
        <S>
          <MDMockExam />
        </S>
      }
    />
  </>
);
