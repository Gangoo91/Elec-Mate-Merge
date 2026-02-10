import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const WorkingAtHeightCourse = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightCourse"));
const WorkingAtHeightModule1 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule1"));
const WorkingAtHeightModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule1Section1"));
const WorkingAtHeightModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule1Section2"));
const WorkingAtHeightModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule1Section3"));
const WorkingAtHeightModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule1Section4"));
const WorkingAtHeightModule2 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule2"));
const WorkingAtHeightModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule2Section1"));
const WorkingAtHeightModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule2Section2"));
const WorkingAtHeightModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule2Section3"));
const WorkingAtHeightModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule2Section4"));
const WorkingAtHeightModule3 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule3"));
const WorkingAtHeightModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule3Section1"));
const WorkingAtHeightModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule3Section2"));
const WorkingAtHeightModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule3Section3"));
const WorkingAtHeightModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule3Section4"));
const WorkingAtHeightModule4 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule4"));
const WorkingAtHeightModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule4Section1"));
const WorkingAtHeightModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule4Section2"));
const WorkingAtHeightModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule4Section3"));
const WorkingAtHeightModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule4Section4"));
const WorkingAtHeightModule5 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule5"));
const WorkingAtHeightModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule5Section1"));
const WorkingAtHeightModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule5Section2"));
const WorkingAtHeightModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule5Section3"));
const WorkingAtHeightModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule5Section4"));
const WorkingAtHeightModule6 = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightModule6"));
const WorkingAtHeightMockExam = lazyWithRetry(() => import("@/pages/study-centre/working-at-height/WorkingAtHeightMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const workingAtHeightRoutes = (
  <>
    <Route path="working-at-height-course" element={<S><WorkingAtHeightCourse /></S>} />
    <Route path="working-at-height-module-1" element={<S><WorkingAtHeightModule1 /></S>} />
    <Route path="working-at-height-module-1-section-1" element={<S><WorkingAtHeightModule1Section1 /></S>} />
    <Route path="working-at-height-module-1-section-2" element={<S><WorkingAtHeightModule1Section2 /></S>} />
    <Route path="working-at-height-module-1-section-3" element={<S><WorkingAtHeightModule1Section3 /></S>} />
    <Route path="working-at-height-module-1-section-4" element={<S><WorkingAtHeightModule1Section4 /></S>} />
    <Route path="working-at-height-module-2" element={<S><WorkingAtHeightModule2 /></S>} />
    <Route path="working-at-height-module-2-section-1" element={<S><WorkingAtHeightModule2Section1 /></S>} />
    <Route path="working-at-height-module-2-section-2" element={<S><WorkingAtHeightModule2Section2 /></S>} />
    <Route path="working-at-height-module-2-section-3" element={<S><WorkingAtHeightModule2Section3 /></S>} />
    <Route path="working-at-height-module-2-section-4" element={<S><WorkingAtHeightModule2Section4 /></S>} />
    <Route path="working-at-height-module-3" element={<S><WorkingAtHeightModule3 /></S>} />
    <Route path="working-at-height-module-3-section-1" element={<S><WorkingAtHeightModule3Section1 /></S>} />
    <Route path="working-at-height-module-3-section-2" element={<S><WorkingAtHeightModule3Section2 /></S>} />
    <Route path="working-at-height-module-3-section-3" element={<S><WorkingAtHeightModule3Section3 /></S>} />
    <Route path="working-at-height-module-3-section-4" element={<S><WorkingAtHeightModule3Section4 /></S>} />
    <Route path="working-at-height-module-4" element={<S><WorkingAtHeightModule4 /></S>} />
    <Route path="working-at-height-module-4-section-1" element={<S><WorkingAtHeightModule4Section1 /></S>} />
    <Route path="working-at-height-module-4-section-2" element={<S><WorkingAtHeightModule4Section2 /></S>} />
    <Route path="working-at-height-module-4-section-3" element={<S><WorkingAtHeightModule4Section3 /></S>} />
    <Route path="working-at-height-module-4-section-4" element={<S><WorkingAtHeightModule4Section4 /></S>} />
    <Route path="working-at-height-module-5" element={<S><WorkingAtHeightModule5 /></S>} />
    <Route path="working-at-height-module-5-section-1" element={<S><WorkingAtHeightModule5Section1 /></S>} />
    <Route path="working-at-height-module-5-section-2" element={<S><WorkingAtHeightModule5Section2 /></S>} />
    <Route path="working-at-height-module-5-section-3" element={<S><WorkingAtHeightModule5Section3 /></S>} />
    <Route path="working-at-height-module-5-section-4" element={<S><WorkingAtHeightModule5Section4 /></S>} />
    <Route path="working-at-height-module-6" element={<S><WorkingAtHeightModule6 /></S>} />
    <Route path="working-at-height-mock-exam" element={<S><WorkingAtHeightMockExam /></S>} />
  </>
);
