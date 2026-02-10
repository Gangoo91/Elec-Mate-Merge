import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const CscsCardCourse = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardCourse"));
const CscsCardModule1 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule1"));
const CscsCardModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule1Section1"));
const CscsCardModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule1Section2"));
const CscsCardModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule1Section3"));
const CscsCardModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule1Section4"));
const CscsCardModule2 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule2"));
const CscsCardModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule2Section1"));
const CscsCardModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule2Section2"));
const CscsCardModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule2Section3"));
const CscsCardModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule2Section4"));
const CscsCardModule3 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule3"));
const CscsCardModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule3Section1"));
const CscsCardModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule3Section2"));
const CscsCardModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule3Section3"));
const CscsCardModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule3Section4"));
const CscsCardModule4 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule4"));
const CscsCardModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule4Section1"));
const CscsCardModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule4Section2"));
const CscsCardModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule4Section3"));
const CscsCardModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule4Section4"));
const CscsCardModule5 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule5"));
const CscsCardModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule5Section1"));
const CscsCardModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule5Section2"));
const CscsCardModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule5Section3"));
const CscsCardModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule5Section4"));
const CscsCardModule6 = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardModule6"));
const CscsCardMockExam = lazyWithRetry(() => import("@/pages/study-centre/cscs-card/CscsCardMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const cscsCardRoutes = (
  <>
    <Route path="cscs-card-course" element={<S><CscsCardCourse /></S>} />
    <Route path="cscs-card-module-1" element={<S><CscsCardModule1 /></S>} />
    <Route path="cscs-card-module-1-section-1" element={<S><CscsCardModule1Section1 /></S>} />
    <Route path="cscs-card-module-1-section-2" element={<S><CscsCardModule1Section2 /></S>} />
    <Route path="cscs-card-module-1-section-3" element={<S><CscsCardModule1Section3 /></S>} />
    <Route path="cscs-card-module-1-section-4" element={<S><CscsCardModule1Section4 /></S>} />
    <Route path="cscs-card-module-2" element={<S><CscsCardModule2 /></S>} />
    <Route path="cscs-card-module-2-section-1" element={<S><CscsCardModule2Section1 /></S>} />
    <Route path="cscs-card-module-2-section-2" element={<S><CscsCardModule2Section2 /></S>} />
    <Route path="cscs-card-module-2-section-3" element={<S><CscsCardModule2Section3 /></S>} />
    <Route path="cscs-card-module-2-section-4" element={<S><CscsCardModule2Section4 /></S>} />
    <Route path="cscs-card-module-3" element={<S><CscsCardModule3 /></S>} />
    <Route path="cscs-card-module-3-section-1" element={<S><CscsCardModule3Section1 /></S>} />
    <Route path="cscs-card-module-3-section-2" element={<S><CscsCardModule3Section2 /></S>} />
    <Route path="cscs-card-module-3-section-3" element={<S><CscsCardModule3Section3 /></S>} />
    <Route path="cscs-card-module-3-section-4" element={<S><CscsCardModule3Section4 /></S>} />
    <Route path="cscs-card-module-4" element={<S><CscsCardModule4 /></S>} />
    <Route path="cscs-card-module-4-section-1" element={<S><CscsCardModule4Section1 /></S>} />
    <Route path="cscs-card-module-4-section-2" element={<S><CscsCardModule4Section2 /></S>} />
    <Route path="cscs-card-module-4-section-3" element={<S><CscsCardModule4Section3 /></S>} />
    <Route path="cscs-card-module-4-section-4" element={<S><CscsCardModule4Section4 /></S>} />
    <Route path="cscs-card-module-5" element={<S><CscsCardModule5 /></S>} />
    <Route path="cscs-card-module-5-section-1" element={<S><CscsCardModule5Section1 /></S>} />
    <Route path="cscs-card-module-5-section-2" element={<S><CscsCardModule5Section2 /></S>} />
    <Route path="cscs-card-module-5-section-3" element={<S><CscsCardModule5Section3 /></S>} />
    <Route path="cscs-card-module-5-section-4" element={<S><CscsCardModule5Section4 /></S>} />
    <Route path="cscs-card-module-6" element={<S><CscsCardModule6 /></S>} />
    <Route path="cscs-card-mock-exam" element={<S><CscsCardMockExam /></S>} />
  </>
);
