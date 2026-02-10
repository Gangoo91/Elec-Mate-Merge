import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const CdmRegulationsCourse = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsCourse"));
const CdmRegulationsModule1 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule1"));
const CdmRegulationsModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule1Section1"));
const CdmRegulationsModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule1Section2"));
const CdmRegulationsModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule1Section3"));
const CdmRegulationsModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule1Section4"));
const CdmRegulationsModule2 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule2"));
const CdmRegulationsModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule2Section1"));
const CdmRegulationsModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule2Section2"));
const CdmRegulationsModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule2Section3"));
const CdmRegulationsModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule2Section4"));
const CdmRegulationsModule3 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule3"));
const CdmRegulationsModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule3Section1"));
const CdmRegulationsModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule3Section2"));
const CdmRegulationsModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule3Section3"));
const CdmRegulationsModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule3Section4"));
const CdmRegulationsModule4 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule4"));
const CdmRegulationsModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule4Section1"));
const CdmRegulationsModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule4Section2"));
const CdmRegulationsModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule4Section3"));
const CdmRegulationsModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule4Section4"));
const CdmRegulationsModule5 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule5"));
const CdmRegulationsModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule5Section1"));
const CdmRegulationsModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule5Section2"));
const CdmRegulationsModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule5Section3"));
const CdmRegulationsModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule5Section4"));
const CdmRegulationsModule6 = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsModule6"));
const CdmRegulationsMockExam = lazyWithRetry(() => import("@/pages/study-centre/cdm-regulations/CdmRegulationsMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const cdmRegulationsRoutes = (
  <>
    <Route path="cdm-regulations-course" element={<S><CdmRegulationsCourse /></S>} />
    <Route path="cdm-regulations-module-1" element={<S><CdmRegulationsModule1 /></S>} />
    <Route path="cdm-regulations-module-1-section-1" element={<S><CdmRegulationsModule1Section1 /></S>} />
    <Route path="cdm-regulations-module-1-section-2" element={<S><CdmRegulationsModule1Section2 /></S>} />
    <Route path="cdm-regulations-module-1-section-3" element={<S><CdmRegulationsModule1Section3 /></S>} />
    <Route path="cdm-regulations-module-1-section-4" element={<S><CdmRegulationsModule1Section4 /></S>} />
    <Route path="cdm-regulations-module-2" element={<S><CdmRegulationsModule2 /></S>} />
    <Route path="cdm-regulations-module-2-section-1" element={<S><CdmRegulationsModule2Section1 /></S>} />
    <Route path="cdm-regulations-module-2-section-2" element={<S><CdmRegulationsModule2Section2 /></S>} />
    <Route path="cdm-regulations-module-2-section-3" element={<S><CdmRegulationsModule2Section3 /></S>} />
    <Route path="cdm-regulations-module-2-section-4" element={<S><CdmRegulationsModule2Section4 /></S>} />
    <Route path="cdm-regulations-module-3" element={<S><CdmRegulationsModule3 /></S>} />
    <Route path="cdm-regulations-module-3-section-1" element={<S><CdmRegulationsModule3Section1 /></S>} />
    <Route path="cdm-regulations-module-3-section-2" element={<S><CdmRegulationsModule3Section2 /></S>} />
    <Route path="cdm-regulations-module-3-section-3" element={<S><CdmRegulationsModule3Section3 /></S>} />
    <Route path="cdm-regulations-module-3-section-4" element={<S><CdmRegulationsModule3Section4 /></S>} />
    <Route path="cdm-regulations-module-4" element={<S><CdmRegulationsModule4 /></S>} />
    <Route path="cdm-regulations-module-4-section-1" element={<S><CdmRegulationsModule4Section1 /></S>} />
    <Route path="cdm-regulations-module-4-section-2" element={<S><CdmRegulationsModule4Section2 /></S>} />
    <Route path="cdm-regulations-module-4-section-3" element={<S><CdmRegulationsModule4Section3 /></S>} />
    <Route path="cdm-regulations-module-4-section-4" element={<S><CdmRegulationsModule4Section4 /></S>} />
    <Route path="cdm-regulations-module-5" element={<S><CdmRegulationsModule5 /></S>} />
    <Route path="cdm-regulations-module-5-section-1" element={<S><CdmRegulationsModule5Section1 /></S>} />
    <Route path="cdm-regulations-module-5-section-2" element={<S><CdmRegulationsModule5Section2 /></S>} />
    <Route path="cdm-regulations-module-5-section-3" element={<S><CdmRegulationsModule5Section3 /></S>} />
    <Route path="cdm-regulations-module-5-section-4" element={<S><CdmRegulationsModule5Section4 /></S>} />
    <Route path="cdm-regulations-module-6" element={<S><CdmRegulationsModule6 /></S>} />
    <Route path="cdm-regulations-mock-exam" element={<S><CdmRegulationsMockExam /></S>} />
  </>
);
