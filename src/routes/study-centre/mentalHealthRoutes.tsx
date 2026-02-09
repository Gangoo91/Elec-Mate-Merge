import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const MentalHealthCourse = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthCourse"));
const MentalHealthModule1 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule1"));
const MentalHealthModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule1Section1"));
const MentalHealthModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule1Section2"));
const MentalHealthModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule1Section3"));
const MentalHealthModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule1Section4"));
const MentalHealthModule2 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule2"));
const MentalHealthModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule2Section1"));
const MentalHealthModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule2Section2"));
const MentalHealthModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule2Section3"));
const MentalHealthModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule2Section4"));
const MentalHealthModule3 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule3"));
const MentalHealthModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule3Section1"));
const MentalHealthModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule3Section2"));
const MentalHealthModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule3Section3"));
const MentalHealthModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule3Section4"));
const MentalHealthModule4 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule4"));
const MentalHealthModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule4Section1"));
const MentalHealthModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule4Section2"));
const MentalHealthModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule4Section3"));
const MentalHealthModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule4Section4"));
const MentalHealthModule5 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule5"));
const MentalHealthModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule5Section1"));
const MentalHealthModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule5Section2"));
const MentalHealthModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule5Section3"));
const MentalHealthModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule5Section4"));
const MentalHealthModule6 = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthModule6"));
const MentalHealthMockExam = lazyWithRetry(() => import("@/pages/study-centre/mental-health/MentalHealthMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const mentalHealthRoutes = (
  <>
    <Route path="mental-health-course" element={<S><MentalHealthCourse /></S>} />
    <Route path="mental-health-module-1" element={<S><MentalHealthModule1 /></S>} />
    <Route path="mental-health-module-1-section-1" element={<S><MentalHealthModule1Section1 /></S>} />
    <Route path="mental-health-module-1-section-2" element={<S><MentalHealthModule1Section2 /></S>} />
    <Route path="mental-health-module-1-section-3" element={<S><MentalHealthModule1Section3 /></S>} />
    <Route path="mental-health-module-1-section-4" element={<S><MentalHealthModule1Section4 /></S>} />
    <Route path="mental-health-module-2" element={<S><MentalHealthModule2 /></S>} />
    <Route path="mental-health-module-2-section-1" element={<S><MentalHealthModule2Section1 /></S>} />
    <Route path="mental-health-module-2-section-2" element={<S><MentalHealthModule2Section2 /></S>} />
    <Route path="mental-health-module-2-section-3" element={<S><MentalHealthModule2Section3 /></S>} />
    <Route path="mental-health-module-2-section-4" element={<S><MentalHealthModule2Section4 /></S>} />
    <Route path="mental-health-module-3" element={<S><MentalHealthModule3 /></S>} />
    <Route path="mental-health-module-3-section-1" element={<S><MentalHealthModule3Section1 /></S>} />
    <Route path="mental-health-module-3-section-2" element={<S><MentalHealthModule3Section2 /></S>} />
    <Route path="mental-health-module-3-section-3" element={<S><MentalHealthModule3Section3 /></S>} />
    <Route path="mental-health-module-3-section-4" element={<S><MentalHealthModule3Section4 /></S>} />
    <Route path="mental-health-module-4" element={<S><MentalHealthModule4 /></S>} />
    <Route path="mental-health-module-4-section-1" element={<S><MentalHealthModule4Section1 /></S>} />
    <Route path="mental-health-module-4-section-2" element={<S><MentalHealthModule4Section2 /></S>} />
    <Route path="mental-health-module-4-section-3" element={<S><MentalHealthModule4Section3 /></S>} />
    <Route path="mental-health-module-4-section-4" element={<S><MentalHealthModule4Section4 /></S>} />
    <Route path="mental-health-module-5" element={<S><MentalHealthModule5 /></S>} />
    <Route path="mental-health-module-5-section-1" element={<S><MentalHealthModule5Section1 /></S>} />
    <Route path="mental-health-module-5-section-2" element={<S><MentalHealthModule5Section2 /></S>} />
    <Route path="mental-health-module-5-section-3" element={<S><MentalHealthModule5Section3 /></S>} />
    <Route path="mental-health-module-5-section-4" element={<S><MentalHealthModule5Section4 /></S>} />
    <Route path="mental-health-module-6" element={<S><MentalHealthModule6 /></S>} />
    <Route path="mental-health-mock-exam" element={<S><MentalHealthMockExam /></S>} />
  </>
);
