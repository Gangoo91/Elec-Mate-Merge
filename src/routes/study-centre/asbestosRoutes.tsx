import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const AsbestosCourse = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosCourse"));
const AsbestosModule1 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule1"));
const AsbestosModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule1Section1"));
const AsbestosModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule1Section2"));
const AsbestosModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule1Section3"));
const AsbestosModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule1Section4"));
const AsbestosModule2 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule2"));
const AsbestosModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule2Section1"));
const AsbestosModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule2Section2"));
const AsbestosModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule2Section3"));
const AsbestosModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule2Section4"));
const AsbestosModule3 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule3"));
const AsbestosModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule3Section1"));
const AsbestosModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule3Section2"));
const AsbestosModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule3Section3"));
const AsbestosModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule3Section4"));
const AsbestosModule4 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule4"));
const AsbestosModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule4Section1"));
const AsbestosModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule4Section2"));
const AsbestosModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule4Section3"));
const AsbestosModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule4Section4"));
const AsbestosModule5 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule5"));
const AsbestosModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule5Section1"));
const AsbestosModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule5Section2"));
const AsbestosModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule5Section3"));
const AsbestosModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule5Section4"));
const AsbestosModule6 = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosModule6"));
const AsbestosMockExam = lazyWithRetry(() => import("@/pages/study-centre/asbestos/AsbestosMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const asbestosRoutes = (
  <>
    <Route path="asbestos-awareness-course" element={<S><AsbestosCourse /></S>} />
    <Route path="asbestos-awareness-module-1" element={<S><AsbestosModule1 /></S>} />
    <Route path="asbestos-awareness-module-1-section-1" element={<S><AsbestosModule1Section1 /></S>} />
    <Route path="asbestos-awareness-module-1-section-2" element={<S><AsbestosModule1Section2 /></S>} />
    <Route path="asbestos-awareness-module-1-section-3" element={<S><AsbestosModule1Section3 /></S>} />
    <Route path="asbestos-awareness-module-1-section-4" element={<S><AsbestosModule1Section4 /></S>} />
    <Route path="asbestos-awareness-module-2" element={<S><AsbestosModule2 /></S>} />
    <Route path="asbestos-awareness-module-2-section-1" element={<S><AsbestosModule2Section1 /></S>} />
    <Route path="asbestos-awareness-module-2-section-2" element={<S><AsbestosModule2Section2 /></S>} />
    <Route path="asbestos-awareness-module-2-section-3" element={<S><AsbestosModule2Section3 /></S>} />
    <Route path="asbestos-awareness-module-2-section-4" element={<S><AsbestosModule2Section4 /></S>} />
    <Route path="asbestos-awareness-module-3" element={<S><AsbestosModule3 /></S>} />
    <Route path="asbestos-awareness-module-3-section-1" element={<S><AsbestosModule3Section1 /></S>} />
    <Route path="asbestos-awareness-module-3-section-2" element={<S><AsbestosModule3Section2 /></S>} />
    <Route path="asbestos-awareness-module-3-section-3" element={<S><AsbestosModule3Section3 /></S>} />
    <Route path="asbestos-awareness-module-3-section-4" element={<S><AsbestosModule3Section4 /></S>} />
    <Route path="asbestos-awareness-module-4" element={<S><AsbestosModule4 /></S>} />
    <Route path="asbestos-awareness-module-4-section-1" element={<S><AsbestosModule4Section1 /></S>} />
    <Route path="asbestos-awareness-module-4-section-2" element={<S><AsbestosModule4Section2 /></S>} />
    <Route path="asbestos-awareness-module-4-section-3" element={<S><AsbestosModule4Section3 /></S>} />
    <Route path="asbestos-awareness-module-4-section-4" element={<S><AsbestosModule4Section4 /></S>} />
    <Route path="asbestos-awareness-module-5" element={<S><AsbestosModule5 /></S>} />
    <Route path="asbestos-awareness-module-5-section-1" element={<S><AsbestosModule5Section1 /></S>} />
    <Route path="asbestos-awareness-module-5-section-2" element={<S><AsbestosModule5Section2 /></S>} />
    <Route path="asbestos-awareness-module-5-section-3" element={<S><AsbestosModule5Section3 /></S>} />
    <Route path="asbestos-awareness-module-5-section-4" element={<S><AsbestosModule5Section4 /></S>} />
    <Route path="asbestos-awareness-module-6" element={<S><AsbestosModule6 /></S>} />
    <Route path="asbestos-awareness-mock-exam" element={<S><AsbestosMockExam /></S>} />
  </>
);
