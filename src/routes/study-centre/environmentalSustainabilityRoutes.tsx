import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const EnvironmentalSustainabilityCourse = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityCourse"));
const EnvironmentalSustainabilityModule1 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule1"));
const EnvironmentalSustainabilityModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule1Section1"));
const EnvironmentalSustainabilityModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule1Section2"));
const EnvironmentalSustainabilityModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule1Section3"));
const EnvironmentalSustainabilityModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule1Section4"));
const EnvironmentalSustainabilityModule2 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule2"));
const EnvironmentalSustainabilityModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule2Section1"));
const EnvironmentalSustainabilityModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule2Section2"));
const EnvironmentalSustainabilityModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule2Section3"));
const EnvironmentalSustainabilityModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule2Section4"));
const EnvironmentalSustainabilityModule3 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule3"));
const EnvironmentalSustainabilityModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule3Section1"));
const EnvironmentalSustainabilityModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule3Section2"));
const EnvironmentalSustainabilityModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule3Section3"));
const EnvironmentalSustainabilityModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule3Section4"));
const EnvironmentalSustainabilityModule4 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule4"));
const EnvironmentalSustainabilityModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule4Section1"));
const EnvironmentalSustainabilityModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule4Section2"));
const EnvironmentalSustainabilityModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule4Section3"));
const EnvironmentalSustainabilityModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule4Section4"));
const EnvironmentalSustainabilityModule5 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule5"));
const EnvironmentalSustainabilityModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule5Section1"));
const EnvironmentalSustainabilityModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule5Section2"));
const EnvironmentalSustainabilityModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule5Section3"));
const EnvironmentalSustainabilityModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule5Section4"));
const EnvironmentalSustainabilityModule6 = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityModule6"));
const EnvironmentalSustainabilityMockExam = lazyWithRetry(() => import("@/pages/study-centre/environmental-sustainability/EnvironmentalSustainabilityMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const environmentalSustainabilityRoutes = (
  <>
    <Route path="environmental-sustainability-course" element={<S><EnvironmentalSustainabilityCourse /></S>} />
    <Route path="environmental-sustainability-module-1" element={<S><EnvironmentalSustainabilityModule1 /></S>} />
    <Route path="environmental-sustainability-module-1-section-1" element={<S><EnvironmentalSustainabilityModule1Section1 /></S>} />
    <Route path="environmental-sustainability-module-1-section-2" element={<S><EnvironmentalSustainabilityModule1Section2 /></S>} />
    <Route path="environmental-sustainability-module-1-section-3" element={<S><EnvironmentalSustainabilityModule1Section3 /></S>} />
    <Route path="environmental-sustainability-module-1-section-4" element={<S><EnvironmentalSustainabilityModule1Section4 /></S>} />
    <Route path="environmental-sustainability-module-2" element={<S><EnvironmentalSustainabilityModule2 /></S>} />
    <Route path="environmental-sustainability-module-2-section-1" element={<S><EnvironmentalSustainabilityModule2Section1 /></S>} />
    <Route path="environmental-sustainability-module-2-section-2" element={<S><EnvironmentalSustainabilityModule2Section2 /></S>} />
    <Route path="environmental-sustainability-module-2-section-3" element={<S><EnvironmentalSustainabilityModule2Section3 /></S>} />
    <Route path="environmental-sustainability-module-2-section-4" element={<S><EnvironmentalSustainabilityModule2Section4 /></S>} />
    <Route path="environmental-sustainability-module-3" element={<S><EnvironmentalSustainabilityModule3 /></S>} />
    <Route path="environmental-sustainability-module-3-section-1" element={<S><EnvironmentalSustainabilityModule3Section1 /></S>} />
    <Route path="environmental-sustainability-module-3-section-2" element={<S><EnvironmentalSustainabilityModule3Section2 /></S>} />
    <Route path="environmental-sustainability-module-3-section-3" element={<S><EnvironmentalSustainabilityModule3Section3 /></S>} />
    <Route path="environmental-sustainability-module-3-section-4" element={<S><EnvironmentalSustainabilityModule3Section4 /></S>} />
    <Route path="environmental-sustainability-module-4" element={<S><EnvironmentalSustainabilityModule4 /></S>} />
    <Route path="environmental-sustainability-module-4-section-1" element={<S><EnvironmentalSustainabilityModule4Section1 /></S>} />
    <Route path="environmental-sustainability-module-4-section-2" element={<S><EnvironmentalSustainabilityModule4Section2 /></S>} />
    <Route path="environmental-sustainability-module-4-section-3" element={<S><EnvironmentalSustainabilityModule4Section3 /></S>} />
    <Route path="environmental-sustainability-module-4-section-4" element={<S><EnvironmentalSustainabilityModule4Section4 /></S>} />
    <Route path="environmental-sustainability-module-5" element={<S><EnvironmentalSustainabilityModule5 /></S>} />
    <Route path="environmental-sustainability-module-5-section-1" element={<S><EnvironmentalSustainabilityModule5Section1 /></S>} />
    <Route path="environmental-sustainability-module-5-section-2" element={<S><EnvironmentalSustainabilityModule5Section2 /></S>} />
    <Route path="environmental-sustainability-module-5-section-3" element={<S><EnvironmentalSustainabilityModule5Section3 /></S>} />
    <Route path="environmental-sustainability-module-5-section-4" element={<S><EnvironmentalSustainabilityModule5Section4 /></S>} />
    <Route path="environmental-sustainability-module-6" element={<S><EnvironmentalSustainabilityModule6 /></S>} />
    <Route path="environmental-sustainability-mock-exam" element={<S><EnvironmentalSustainabilityMockExam /></S>} />
  </>
);
