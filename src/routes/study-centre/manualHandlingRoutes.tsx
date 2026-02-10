import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const ManualHandlingCourse = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingCourse"));
const ManualHandlingModule1 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule1"));
const ManualHandlingModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule1Section1"));
const ManualHandlingModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule1Section2"));
const ManualHandlingModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule1Section3"));
const ManualHandlingModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule1Section4"));
const ManualHandlingModule2 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule2"));
const ManualHandlingModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule2Section1"));
const ManualHandlingModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule2Section2"));
const ManualHandlingModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule2Section3"));
const ManualHandlingModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule2Section4"));
const ManualHandlingModule3 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule3"));
const ManualHandlingModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule3Section1"));
const ManualHandlingModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule3Section2"));
const ManualHandlingModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule3Section3"));
const ManualHandlingModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule3Section4"));
const ManualHandlingModule4 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule4"));
const ManualHandlingModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule4Section1"));
const ManualHandlingModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule4Section2"));
const ManualHandlingModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule4Section3"));
const ManualHandlingModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule4Section4"));
const ManualHandlingModule5 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule5"));
const ManualHandlingModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule5Section1"));
const ManualHandlingModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule5Section2"));
const ManualHandlingModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule5Section3"));
const ManualHandlingModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule5Section4"));
const ManualHandlingModule6 = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingModule6"));
const ManualHandlingMockExam = lazyWithRetry(() => import("@/pages/study-centre/manual-handling/ManualHandlingMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const manualHandlingRoutes = (
  <>
    <Route path="manual-handling-course" element={<S><ManualHandlingCourse /></S>} />
    <Route path="manual-handling-module-1" element={<S><ManualHandlingModule1 /></S>} />
    <Route path="manual-handling-module-1-section-1" element={<S><ManualHandlingModule1Section1 /></S>} />
    <Route path="manual-handling-module-1-section-2" element={<S><ManualHandlingModule1Section2 /></S>} />
    <Route path="manual-handling-module-1-section-3" element={<S><ManualHandlingModule1Section3 /></S>} />
    <Route path="manual-handling-module-1-section-4" element={<S><ManualHandlingModule1Section4 /></S>} />
    <Route path="manual-handling-module-2" element={<S><ManualHandlingModule2 /></S>} />
    <Route path="manual-handling-module-2-section-1" element={<S><ManualHandlingModule2Section1 /></S>} />
    <Route path="manual-handling-module-2-section-2" element={<S><ManualHandlingModule2Section2 /></S>} />
    <Route path="manual-handling-module-2-section-3" element={<S><ManualHandlingModule2Section3 /></S>} />
    <Route path="manual-handling-module-2-section-4" element={<S><ManualHandlingModule2Section4 /></S>} />
    <Route path="manual-handling-module-3" element={<S><ManualHandlingModule3 /></S>} />
    <Route path="manual-handling-module-3-section-1" element={<S><ManualHandlingModule3Section1 /></S>} />
    <Route path="manual-handling-module-3-section-2" element={<S><ManualHandlingModule3Section2 /></S>} />
    <Route path="manual-handling-module-3-section-3" element={<S><ManualHandlingModule3Section3 /></S>} />
    <Route path="manual-handling-module-3-section-4" element={<S><ManualHandlingModule3Section4 /></S>} />
    <Route path="manual-handling-module-4" element={<S><ManualHandlingModule4 /></S>} />
    <Route path="manual-handling-module-4-section-1" element={<S><ManualHandlingModule4Section1 /></S>} />
    <Route path="manual-handling-module-4-section-2" element={<S><ManualHandlingModule4Section2 /></S>} />
    <Route path="manual-handling-module-4-section-3" element={<S><ManualHandlingModule4Section3 /></S>} />
    <Route path="manual-handling-module-4-section-4" element={<S><ManualHandlingModule4Section4 /></S>} />
    <Route path="manual-handling-module-5" element={<S><ManualHandlingModule5 /></S>} />
    <Route path="manual-handling-module-5-section-1" element={<S><ManualHandlingModule5Section1 /></S>} />
    <Route path="manual-handling-module-5-section-2" element={<S><ManualHandlingModule5Section2 /></S>} />
    <Route path="manual-handling-module-5-section-3" element={<S><ManualHandlingModule5Section3 /></S>} />
    <Route path="manual-handling-module-5-section-4" element={<S><ManualHandlingModule5Section4 /></S>} />
    <Route path="manual-handling-module-6" element={<S><ManualHandlingModule6 /></S>} />
    <Route path="manual-handling-mock-exam" element={<S><ManualHandlingMockExam /></S>} />
  </>
);
