import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const FireSafetyCourse = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyCourse"));
const FireSafetyModule1 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule1"));
const FireSafetyModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule1Section1"));
const FireSafetyModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule1Section2"));
const FireSafetyModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule1Section3"));
const FireSafetyModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule1Section4"));
const FireSafetyModule2 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule2"));
const FireSafetyModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule2Section1"));
const FireSafetyModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule2Section2"));
const FireSafetyModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule2Section3"));
const FireSafetyModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule2Section4"));
const FireSafetyModule3 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule3"));
const FireSafetyModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule3Section1"));
const FireSafetyModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule3Section2"));
const FireSafetyModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule3Section3"));
const FireSafetyModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule3Section4"));
const FireSafetyModule4 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule4"));
const FireSafetyModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule4Section1"));
const FireSafetyModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule4Section2"));
const FireSafetyModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule4Section3"));
const FireSafetyModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule4Section4"));
const FireSafetyModule5 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule5"));
const FireSafetyModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule5Section1"));
const FireSafetyModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule5Section2"));
const FireSafetyModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule5Section3"));
const FireSafetyModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule5Section4"));
const FireSafetyModule6 = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyModule6"));
const FireSafetyMockExam = lazyWithRetry(() => import("@/pages/study-centre/fire-safety/FireSafetyMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const fireSafetyRoutes = (
  <>
    <Route path="fire-safety-course" element={<S><FireSafetyCourse /></S>} />
    <Route path="fire-safety-module-1" element={<S><FireSafetyModule1 /></S>} />
    <Route path="fire-safety-module-1-section-1" element={<S><FireSafetyModule1Section1 /></S>} />
    <Route path="fire-safety-module-1-section-2" element={<S><FireSafetyModule1Section2 /></S>} />
    <Route path="fire-safety-module-1-section-3" element={<S><FireSafetyModule1Section3 /></S>} />
    <Route path="fire-safety-module-1-section-4" element={<S><FireSafetyModule1Section4 /></S>} />
    <Route path="fire-safety-module-2" element={<S><FireSafetyModule2 /></S>} />
    <Route path="fire-safety-module-2-section-1" element={<S><FireSafetyModule2Section1 /></S>} />
    <Route path="fire-safety-module-2-section-2" element={<S><FireSafetyModule2Section2 /></S>} />
    <Route path="fire-safety-module-2-section-3" element={<S><FireSafetyModule2Section3 /></S>} />
    <Route path="fire-safety-module-2-section-4" element={<S><FireSafetyModule2Section4 /></S>} />
    <Route path="fire-safety-module-3" element={<S><FireSafetyModule3 /></S>} />
    <Route path="fire-safety-module-3-section-1" element={<S><FireSafetyModule3Section1 /></S>} />
    <Route path="fire-safety-module-3-section-2" element={<S><FireSafetyModule3Section2 /></S>} />
    <Route path="fire-safety-module-3-section-3" element={<S><FireSafetyModule3Section3 /></S>} />
    <Route path="fire-safety-module-3-section-4" element={<S><FireSafetyModule3Section4 /></S>} />
    <Route path="fire-safety-module-4" element={<S><FireSafetyModule4 /></S>} />
    <Route path="fire-safety-module-4-section-1" element={<S><FireSafetyModule4Section1 /></S>} />
    <Route path="fire-safety-module-4-section-2" element={<S><FireSafetyModule4Section2 /></S>} />
    <Route path="fire-safety-module-4-section-3" element={<S><FireSafetyModule4Section3 /></S>} />
    <Route path="fire-safety-module-4-section-4" element={<S><FireSafetyModule4Section4 /></S>} />
    <Route path="fire-safety-module-5" element={<S><FireSafetyModule5 /></S>} />
    <Route path="fire-safety-module-5-section-1" element={<S><FireSafetyModule5Section1 /></S>} />
    <Route path="fire-safety-module-5-section-2" element={<S><FireSafetyModule5Section2 /></S>} />
    <Route path="fire-safety-module-5-section-3" element={<S><FireSafetyModule5Section3 /></S>} />
    <Route path="fire-safety-module-5-section-4" element={<S><FireSafetyModule5Section4 /></S>} />
    <Route path="fire-safety-module-6" element={<S><FireSafetyModule6 /></S>} />
    <Route path="fire-safety-mock-exam" element={<S><FireSafetyMockExam /></S>} />
  </>
);
