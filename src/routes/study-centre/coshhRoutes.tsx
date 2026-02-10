import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const CoshhAwarenessCourse = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessCourse"));
const CoshhAwarenessModule1 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule1"));
const CoshhAwarenessModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule1Section1"));
const CoshhAwarenessModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule1Section2"));
const CoshhAwarenessModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule1Section3"));
const CoshhAwarenessModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule1Section4"));
const CoshhAwarenessModule2 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule2"));
const CoshhAwarenessModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule2Section1"));
const CoshhAwarenessModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule2Section2"));
const CoshhAwarenessModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule2Section3"));
const CoshhAwarenessModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule2Section4"));
const CoshhAwarenessModule3 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule3"));
const CoshhAwarenessModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule3Section1"));
const CoshhAwarenessModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule3Section2"));
const CoshhAwarenessModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule3Section3"));
const CoshhAwarenessModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule3Section4"));
const CoshhAwarenessModule4 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule4"));
const CoshhAwarenessModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule4Section1"));
const CoshhAwarenessModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule4Section2"));
const CoshhAwarenessModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule4Section3"));
const CoshhAwarenessModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule4Section4"));
const CoshhAwarenessModule5 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule5"));
const CoshhAwarenessModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule5Section1"));
const CoshhAwarenessModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule5Section2"));
const CoshhAwarenessModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule5Section3"));
const CoshhAwarenessModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule5Section4"));
const CoshhAwarenessModule6 = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessModule6"));
const CoshhAwarenessMockExam = lazyWithRetry(() => import("@/pages/study-centre/coshh-awareness/CoshhAwarenessMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const coshhRoutes = (
  <>
    <Route path="coshh-awareness-course" element={<S><CoshhAwarenessCourse /></S>} />
    <Route path="coshh-awareness-module-1" element={<S><CoshhAwarenessModule1 /></S>} />
    <Route path="coshh-awareness-module-1-section-1" element={<S><CoshhAwarenessModule1Section1 /></S>} />
    <Route path="coshh-awareness-module-1-section-2" element={<S><CoshhAwarenessModule1Section2 /></S>} />
    <Route path="coshh-awareness-module-1-section-3" element={<S><CoshhAwarenessModule1Section3 /></S>} />
    <Route path="coshh-awareness-module-1-section-4" element={<S><CoshhAwarenessModule1Section4 /></S>} />
    <Route path="coshh-awareness-module-2" element={<S><CoshhAwarenessModule2 /></S>} />
    <Route path="coshh-awareness-module-2-section-1" element={<S><CoshhAwarenessModule2Section1 /></S>} />
    <Route path="coshh-awareness-module-2-section-2" element={<S><CoshhAwarenessModule2Section2 /></S>} />
    <Route path="coshh-awareness-module-2-section-3" element={<S><CoshhAwarenessModule2Section3 /></S>} />
    <Route path="coshh-awareness-module-2-section-4" element={<S><CoshhAwarenessModule2Section4 /></S>} />
    <Route path="coshh-awareness-module-3" element={<S><CoshhAwarenessModule3 /></S>} />
    <Route path="coshh-awareness-module-3-section-1" element={<S><CoshhAwarenessModule3Section1 /></S>} />
    <Route path="coshh-awareness-module-3-section-2" element={<S><CoshhAwarenessModule3Section2 /></S>} />
    <Route path="coshh-awareness-module-3-section-3" element={<S><CoshhAwarenessModule3Section3 /></S>} />
    <Route path="coshh-awareness-module-3-section-4" element={<S><CoshhAwarenessModule3Section4 /></S>} />
    <Route path="coshh-awareness-module-4" element={<S><CoshhAwarenessModule4 /></S>} />
    <Route path="coshh-awareness-module-4-section-1" element={<S><CoshhAwarenessModule4Section1 /></S>} />
    <Route path="coshh-awareness-module-4-section-2" element={<S><CoshhAwarenessModule4Section2 /></S>} />
    <Route path="coshh-awareness-module-4-section-3" element={<S><CoshhAwarenessModule4Section3 /></S>} />
    <Route path="coshh-awareness-module-4-section-4" element={<S><CoshhAwarenessModule4Section4 /></S>} />
    <Route path="coshh-awareness-module-5" element={<S><CoshhAwarenessModule5 /></S>} />
    <Route path="coshh-awareness-module-5-section-1" element={<S><CoshhAwarenessModule5Section1 /></S>} />
    <Route path="coshh-awareness-module-5-section-2" element={<S><CoshhAwarenessModule5Section2 /></S>} />
    <Route path="coshh-awareness-module-5-section-3" element={<S><CoshhAwarenessModule5Section3 /></S>} />
    <Route path="coshh-awareness-module-5-section-4" element={<S><CoshhAwarenessModule5Section4 /></S>} />
    <Route path="coshh-awareness-module-6" element={<S><CoshhAwarenessModule6 /></S>} />
    <Route path="coshh-awareness-mock-exam" element={<S><CoshhAwarenessMockExam /></S>} />
  </>
);
