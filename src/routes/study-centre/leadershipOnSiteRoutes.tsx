import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const LeadershipCourse = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipCourse"));
const LeadershipModule1 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule1"));
const LeadershipModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule1Section1"));
const LeadershipModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule1Section2"));
const LeadershipModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule1Section3"));
const LeadershipModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule1Section4"));
const LeadershipModule2 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule2"));
const LeadershipModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule2Section1"));
const LeadershipModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule2Section2"));
const LeadershipModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule2Section3"));
const LeadershipModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule2Section4"));
const LeadershipModule3 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule3"));
const LeadershipModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule3Section1"));
const LeadershipModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule3Section2"));
const LeadershipModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule3Section3"));
const LeadershipModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule3Section4"));
const LeadershipModule4 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule4"));
const LeadershipModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule4Section1"));
const LeadershipModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule4Section2"));
const LeadershipModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule4Section3"));
const LeadershipModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule4Section4"));
const LeadershipModule5 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule5"));
const LeadershipModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule5Section1"));
const LeadershipModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule5Section2"));
const LeadershipModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule5Section3"));
const LeadershipModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule5Section4"));
const LeadershipModule6 = lazyWithRetry(() => import("@/pages/study-centre/leadership-on-site/LeadershipModule6"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const leadershipOnSiteRoutes = (
  <>
    <Route path="leadership-on-site" element={<S><LeadershipCourse /></S>} />
    <Route path="leadership-module-1" element={<S><LeadershipModule1 /></S>} />
    <Route path="leadership-module-1-section-1" element={<S><LeadershipModule1Section1 /></S>} />
    <Route path="leadership-module-1-section-2" element={<S><LeadershipModule1Section2 /></S>} />
    <Route path="leadership-module-1-section-3" element={<S><LeadershipModule1Section3 /></S>} />
    <Route path="leadership-module-1-section-4" element={<S><LeadershipModule1Section4 /></S>} />
    <Route path="leadership-module-2" element={<S><LeadershipModule2 /></S>} />
    <Route path="leadership-module-2-section-1" element={<S><LeadershipModule2Section1 /></S>} />
    <Route path="leadership-module-2-section-2" element={<S><LeadershipModule2Section2 /></S>} />
    <Route path="leadership-module-2-section-3" element={<S><LeadershipModule2Section3 /></S>} />
    <Route path="leadership-module-2-section-4" element={<S><LeadershipModule2Section4 /></S>} />
    <Route path="leadership-module-3" element={<S><LeadershipModule3 /></S>} />
    <Route path="leadership-module-3-section-1" element={<S><LeadershipModule3Section1 /></S>} />
    <Route path="leadership-module-3-section-2" element={<S><LeadershipModule3Section2 /></S>} />
    <Route path="leadership-module-3-section-3" element={<S><LeadershipModule3Section3 /></S>} />
    <Route path="leadership-module-3-section-4" element={<S><LeadershipModule3Section4 /></S>} />
    <Route path="leadership-module-4" element={<S><LeadershipModule4 /></S>} />
    <Route path="leadership-module-4-section-1" element={<S><LeadershipModule4Section1 /></S>} />
    <Route path="leadership-module-4-section-2" element={<S><LeadershipModule4Section2 /></S>} />
    <Route path="leadership-module-4-section-3" element={<S><LeadershipModule4Section3 /></S>} />
    <Route path="leadership-module-4-section-4" element={<S><LeadershipModule4Section4 /></S>} />
    <Route path="leadership-module-5" element={<S><LeadershipModule5 /></S>} />
    <Route path="leadership-module-5-section-1" element={<S><LeadershipModule5Section1 /></S>} />
    <Route path="leadership-module-5-section-2" element={<S><LeadershipModule5Section2 /></S>} />
    <Route path="leadership-module-5-section-3" element={<S><LeadershipModule5Section3 /></S>} />
    <Route path="leadership-module-5-section-4" element={<S><LeadershipModule5Section4 /></S>} />
    <Route path="leadership-module-6" element={<S><LeadershipModule6 /></S>} />
  </>
);
