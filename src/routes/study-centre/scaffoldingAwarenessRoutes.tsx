import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const ScaffoldingAwarenessCourse = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessCourse"));
const ScaffoldingAwarenessModule1 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule1"));
const ScaffoldingAwarenessModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule1Section1"));
const ScaffoldingAwarenessModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule1Section2"));
const ScaffoldingAwarenessModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule1Section3"));
const ScaffoldingAwarenessModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule1Section4"));
const ScaffoldingAwarenessModule2 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule2"));
const ScaffoldingAwarenessModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule2Section1"));
const ScaffoldingAwarenessModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule2Section2"));
const ScaffoldingAwarenessModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule2Section3"));
const ScaffoldingAwarenessModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule2Section4"));
const ScaffoldingAwarenessModule3 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule3"));
const ScaffoldingAwarenessModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule3Section1"));
const ScaffoldingAwarenessModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule3Section2"));
const ScaffoldingAwarenessModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule3Section3"));
const ScaffoldingAwarenessModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule3Section4"));
const ScaffoldingAwarenessModule4 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule4"));
const ScaffoldingAwarenessModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule4Section1"));
const ScaffoldingAwarenessModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule4Section2"));
const ScaffoldingAwarenessModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule4Section3"));
const ScaffoldingAwarenessModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule4Section4"));
const ScaffoldingAwarenessModule5 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule5"));
const ScaffoldingAwarenessModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule5Section1"));
const ScaffoldingAwarenessModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule5Section2"));
const ScaffoldingAwarenessModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule5Section3"));
const ScaffoldingAwarenessModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule5Section4"));
const ScaffoldingAwarenessModule6 = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessModule6"));
const ScaffoldingAwarenessMockExam = lazyWithRetry(() => import("@/pages/study-centre/scaffolding-awareness/ScaffoldingAwarenessMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const scaffoldingAwarenessRoutes = (
  <>
    <Route path="scaffolding-awareness-course" element={<S><ScaffoldingAwarenessCourse /></S>} />
    <Route path="scaffolding-awareness-module-1" element={<S><ScaffoldingAwarenessModule1 /></S>} />
    <Route path="scaffolding-awareness-module-1-section-1" element={<S><ScaffoldingAwarenessModule1Section1 /></S>} />
    <Route path="scaffolding-awareness-module-1-section-2" element={<S><ScaffoldingAwarenessModule1Section2 /></S>} />
    <Route path="scaffolding-awareness-module-1-section-3" element={<S><ScaffoldingAwarenessModule1Section3 /></S>} />
    <Route path="scaffolding-awareness-module-1-section-4" element={<S><ScaffoldingAwarenessModule1Section4 /></S>} />
    <Route path="scaffolding-awareness-module-2" element={<S><ScaffoldingAwarenessModule2 /></S>} />
    <Route path="scaffolding-awareness-module-2-section-1" element={<S><ScaffoldingAwarenessModule2Section1 /></S>} />
    <Route path="scaffolding-awareness-module-2-section-2" element={<S><ScaffoldingAwarenessModule2Section2 /></S>} />
    <Route path="scaffolding-awareness-module-2-section-3" element={<S><ScaffoldingAwarenessModule2Section3 /></S>} />
    <Route path="scaffolding-awareness-module-2-section-4" element={<S><ScaffoldingAwarenessModule2Section4 /></S>} />
    <Route path="scaffolding-awareness-module-3" element={<S><ScaffoldingAwarenessModule3 /></S>} />
    <Route path="scaffolding-awareness-module-3-section-1" element={<S><ScaffoldingAwarenessModule3Section1 /></S>} />
    <Route path="scaffolding-awareness-module-3-section-2" element={<S><ScaffoldingAwarenessModule3Section2 /></S>} />
    <Route path="scaffolding-awareness-module-3-section-3" element={<S><ScaffoldingAwarenessModule3Section3 /></S>} />
    <Route path="scaffolding-awareness-module-3-section-4" element={<S><ScaffoldingAwarenessModule3Section4 /></S>} />
    <Route path="scaffolding-awareness-module-4" element={<S><ScaffoldingAwarenessModule4 /></S>} />
    <Route path="scaffolding-awareness-module-4-section-1" element={<S><ScaffoldingAwarenessModule4Section1 /></S>} />
    <Route path="scaffolding-awareness-module-4-section-2" element={<S><ScaffoldingAwarenessModule4Section2 /></S>} />
    <Route path="scaffolding-awareness-module-4-section-3" element={<S><ScaffoldingAwarenessModule4Section3 /></S>} />
    <Route path="scaffolding-awareness-module-4-section-4" element={<S><ScaffoldingAwarenessModule4Section4 /></S>} />
    <Route path="scaffolding-awareness-module-5" element={<S><ScaffoldingAwarenessModule5 /></S>} />
    <Route path="scaffolding-awareness-module-5-section-1" element={<S><ScaffoldingAwarenessModule5Section1 /></S>} />
    <Route path="scaffolding-awareness-module-5-section-2" element={<S><ScaffoldingAwarenessModule5Section2 /></S>} />
    <Route path="scaffolding-awareness-module-5-section-3" element={<S><ScaffoldingAwarenessModule5Section3 /></S>} />
    <Route path="scaffolding-awareness-module-5-section-4" element={<S><ScaffoldingAwarenessModule5Section4 /></S>} />
    <Route path="scaffolding-awareness-module-6" element={<S><ScaffoldingAwarenessModule6 /></S>} />
    <Route path="scaffolding-awareness-mock-exam" element={<S><ScaffoldingAwarenessMockExam /></S>} />
  </>
);
