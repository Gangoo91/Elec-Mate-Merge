import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const GSCourse = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GoalSettingGrowthCourse')
);
const GSModule1 = lazyWithRetry(() => import('@/pages/study-centre/goal-setting-growth/GSModule1'));
const GSModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule1Section1')
);
const GSModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule1Section2')
);
const GSModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule1Section3')
);
const GSModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule1Section4')
);
const GSModule2 = lazyWithRetry(() => import('@/pages/study-centre/goal-setting-growth/GSModule2'));
const GSModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule2Section1')
);
const GSModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule2Section2')
);
const GSModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule2Section3')
);
const GSModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule2Section4')
);
const GSModule3 = lazyWithRetry(() => import('@/pages/study-centre/goal-setting-growth/GSModule3'));
const GSModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule3Section1')
);
const GSModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule3Section2')
);
const GSModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule3Section3')
);
const GSModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule3Section4')
);
const GSModule4 = lazyWithRetry(() => import('@/pages/study-centre/goal-setting-growth/GSModule4'));
const GSModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule4Section1')
);
const GSModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule4Section2')
);
const GSModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule4Section3')
);
const GSModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule4Section4')
);
const GSModule5 = lazyWithRetry(() => import('@/pages/study-centre/goal-setting-growth/GSModule5'));
const GSModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule5Section1')
);
const GSModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule5Section2')
);
const GSModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule5Section3')
);
const GSModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSModule5Section4')
);
const GSModule6 = lazyWithRetry(() => import('@/pages/study-centre/goal-setting-growth/GSModule6'));
const GSMockExam = lazyWithRetry(
  () => import('@/pages/study-centre/goal-setting-growth/GSMockExam')
);

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const goalSettingGrowthRoutes = (
  <>
    <Route
      path="goal-setting-growth"
      element={
        <S>
          <GSCourse />
        </S>
      }
    />
    <Route
      path="gs-module-1"
      element={
        <S>
          <GSModule1 />
        </S>
      }
    />
    <Route
      path="gs-module-1-section-1"
      element={
        <S>
          <GSModule1Section1 />
        </S>
      }
    />
    <Route
      path="gs-module-1-section-2"
      element={
        <S>
          <GSModule1Section2 />
        </S>
      }
    />
    <Route
      path="gs-module-1-section-3"
      element={
        <S>
          <GSModule1Section3 />
        </S>
      }
    />
    <Route
      path="gs-module-1-section-4"
      element={
        <S>
          <GSModule1Section4 />
        </S>
      }
    />
    <Route
      path="gs-module-2"
      element={
        <S>
          <GSModule2 />
        </S>
      }
    />
    <Route
      path="gs-module-2-section-1"
      element={
        <S>
          <GSModule2Section1 />
        </S>
      }
    />
    <Route
      path="gs-module-2-section-2"
      element={
        <S>
          <GSModule2Section2 />
        </S>
      }
    />
    <Route
      path="gs-module-2-section-3"
      element={
        <S>
          <GSModule2Section3 />
        </S>
      }
    />
    <Route
      path="gs-module-2-section-4"
      element={
        <S>
          <GSModule2Section4 />
        </S>
      }
    />
    <Route
      path="gs-module-3"
      element={
        <S>
          <GSModule3 />
        </S>
      }
    />
    <Route
      path="gs-module-3-section-1"
      element={
        <S>
          <GSModule3Section1 />
        </S>
      }
    />
    <Route
      path="gs-module-3-section-2"
      element={
        <S>
          <GSModule3Section2 />
        </S>
      }
    />
    <Route
      path="gs-module-3-section-3"
      element={
        <S>
          <GSModule3Section3 />
        </S>
      }
    />
    <Route
      path="gs-module-3-section-4"
      element={
        <S>
          <GSModule3Section4 />
        </S>
      }
    />
    <Route
      path="gs-module-4"
      element={
        <S>
          <GSModule4 />
        </S>
      }
    />
    <Route
      path="gs-module-4-section-1"
      element={
        <S>
          <GSModule4Section1 />
        </S>
      }
    />
    <Route
      path="gs-module-4-section-2"
      element={
        <S>
          <GSModule4Section2 />
        </S>
      }
    />
    <Route
      path="gs-module-4-section-3"
      element={
        <S>
          <GSModule4Section3 />
        </S>
      }
    />
    <Route
      path="gs-module-4-section-4"
      element={
        <S>
          <GSModule4Section4 />
        </S>
      }
    />
    <Route
      path="gs-module-5"
      element={
        <S>
          <GSModule5 />
        </S>
      }
    />
    <Route
      path="gs-module-5-section-1"
      element={
        <S>
          <GSModule5Section1 />
        </S>
      }
    />
    <Route
      path="gs-module-5-section-2"
      element={
        <S>
          <GSModule5Section2 />
        </S>
      }
    />
    <Route
      path="gs-module-5-section-3"
      element={
        <S>
          <GSModule5Section3 />
        </S>
      }
    />
    <Route
      path="gs-module-5-section-4"
      element={
        <S>
          <GSModule5Section4 />
        </S>
      }
    />
    <Route
      path="gs-module-6"
      element={
        <S>
          <GSModule6 />
        </S>
      }
    />
    <Route
      path="gs-mock-exam"
      element={
        <S>
          <GSMockExam />
        </S>
      }
    />
  </>
);
