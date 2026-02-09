import { Route } from 'react-router-dom';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Suspense } from 'react';
import { CourseSkeleton } from '@/components/ui/page-skeleton';

const PasmaCourse = lazyWithRetry(() => import('@/pages/study-centre/pasma/PasmaCourse'));
const PasmaModule1 = lazyWithRetry(() => import('@/pages/study-centre/pasma/PasmaModule1'));
const PasmaModule1Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule1Section1')
);
const PasmaModule1Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule1Section2')
);
const PasmaModule1Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule1Section3')
);
const PasmaModule1Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule1Section4')
);
const PasmaModule2 = lazyWithRetry(() => import('@/pages/study-centre/pasma/PasmaModule2'));
const PasmaModule2Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule2Section1')
);
const PasmaModule2Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule2Section2')
);
const PasmaModule2Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule2Section3')
);
const PasmaModule2Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule2Section4')
);
const PasmaModule3 = lazyWithRetry(() => import('@/pages/study-centre/pasma/PasmaModule3'));
const PasmaModule3Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule3Section1')
);
const PasmaModule3Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule3Section2')
);
const PasmaModule3Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule3Section3')
);
const PasmaModule3Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule3Section4')
);
const PasmaModule4 = lazyWithRetry(() => import('@/pages/study-centre/pasma/PasmaModule4'));
const PasmaModule4Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule4Section1')
);
const PasmaModule4Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule4Section2')
);
const PasmaModule4Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule4Section3')
);
const PasmaModule4Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule4Section4')
);
const PasmaModule5 = lazyWithRetry(() => import('@/pages/study-centre/pasma/PasmaModule5'));
const PasmaModule5Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule5Section1')
);
const PasmaModule5Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule5Section2')
);
const PasmaModule5Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule5Section3')
);
const PasmaModule5Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule5Section4')
);
const PasmaModule6 = lazyWithRetry(() => import('@/pages/study-centre/pasma/PasmaModule6'));
const PasmaModule6Section1 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule6Section1')
);
const PasmaModule6Section2 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule6Section2')
);
const PasmaModule6Section3 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule6Section3')
);
const PasmaModule6Section4 = lazyWithRetry(
  () => import('@/pages/study-centre/pasma/PasmaModule6Section4')
);
const PasmaModule7 = lazyWithRetry(() => import('@/pages/study-centre/pasma/PasmaModule7'));
const PasmaMockExam = lazyWithRetry(() => import('@/pages/study-centre/pasma/PasmaMockExam'));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const pasmaRoutes = (
  <>
    <Route
      path="pasma-course"
      element={
        <S>
          <PasmaCourse />
        </S>
      }
    />
    <Route
      path="pasma-module-1"
      element={
        <S>
          <PasmaModule1 />
        </S>
      }
    />
    <Route
      path="pasma-module-1-section-1"
      element={
        <S>
          <PasmaModule1Section1 />
        </S>
      }
    />
    <Route
      path="pasma-module-1-section-2"
      element={
        <S>
          <PasmaModule1Section2 />
        </S>
      }
    />
    <Route
      path="pasma-module-1-section-3"
      element={
        <S>
          <PasmaModule1Section3 />
        </S>
      }
    />
    <Route
      path="pasma-module-1-section-4"
      element={
        <S>
          <PasmaModule1Section4 />
        </S>
      }
    />
    <Route
      path="pasma-module-2"
      element={
        <S>
          <PasmaModule2 />
        </S>
      }
    />
    <Route
      path="pasma-module-2-section-1"
      element={
        <S>
          <PasmaModule2Section1 />
        </S>
      }
    />
    <Route
      path="pasma-module-2-section-2"
      element={
        <S>
          <PasmaModule2Section2 />
        </S>
      }
    />
    <Route
      path="pasma-module-2-section-3"
      element={
        <S>
          <PasmaModule2Section3 />
        </S>
      }
    />
    <Route
      path="pasma-module-2-section-4"
      element={
        <S>
          <PasmaModule2Section4 />
        </S>
      }
    />
    <Route
      path="pasma-module-3"
      element={
        <S>
          <PasmaModule3 />
        </S>
      }
    />
    <Route
      path="pasma-module-3-section-1"
      element={
        <S>
          <PasmaModule3Section1 />
        </S>
      }
    />
    <Route
      path="pasma-module-3-section-2"
      element={
        <S>
          <PasmaModule3Section2 />
        </S>
      }
    />
    <Route
      path="pasma-module-3-section-3"
      element={
        <S>
          <PasmaModule3Section3 />
        </S>
      }
    />
    <Route
      path="pasma-module-3-section-4"
      element={
        <S>
          <PasmaModule3Section4 />
        </S>
      }
    />
    <Route
      path="pasma-module-4"
      element={
        <S>
          <PasmaModule4 />
        </S>
      }
    />
    <Route
      path="pasma-module-4-section-1"
      element={
        <S>
          <PasmaModule4Section1 />
        </S>
      }
    />
    <Route
      path="pasma-module-4-section-2"
      element={
        <S>
          <PasmaModule4Section2 />
        </S>
      }
    />
    <Route
      path="pasma-module-4-section-3"
      element={
        <S>
          <PasmaModule4Section3 />
        </S>
      }
    />
    <Route
      path="pasma-module-4-section-4"
      element={
        <S>
          <PasmaModule4Section4 />
        </S>
      }
    />
    <Route
      path="pasma-module-5"
      element={
        <S>
          <PasmaModule5 />
        </S>
      }
    />
    <Route
      path="pasma-module-5-section-1"
      element={
        <S>
          <PasmaModule5Section1 />
        </S>
      }
    />
    <Route
      path="pasma-module-5-section-2"
      element={
        <S>
          <PasmaModule5Section2 />
        </S>
      }
    />
    <Route
      path="pasma-module-5-section-3"
      element={
        <S>
          <PasmaModule5Section3 />
        </S>
      }
    />
    <Route
      path="pasma-module-5-section-4"
      element={
        <S>
          <PasmaModule5Section4 />
        </S>
      }
    />
    <Route
      path="pasma-module-6"
      element={
        <S>
          <PasmaModule6 />
        </S>
      }
    />
    <Route
      path="pasma-module-6-section-1"
      element={
        <S>
          <PasmaModule6Section1 />
        </S>
      }
    />
    <Route
      path="pasma-module-6-section-2"
      element={
        <S>
          <PasmaModule6Section2 />
        </S>
      }
    />
    <Route
      path="pasma-module-6-section-3"
      element={
        <S>
          <PasmaModule6Section3 />
        </S>
      }
    />
    <Route
      path="pasma-module-6-section-4"
      element={
        <S>
          <PasmaModule6Section4 />
        </S>
      }
    />
    <Route
      path="pasma-module-7"
      element={
        <S>
          <PasmaModule7 />
        </S>
      }
    />
    <Route
      path="pasma-mock-exam"
      element={
        <S>
          <PasmaMockExam />
        </S>
      }
    />
  </>
);
