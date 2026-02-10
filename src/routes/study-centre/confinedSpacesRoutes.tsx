import { Route } from "react-router-dom";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";
import { CourseSkeleton } from "@/components/ui/page-skeleton";

const ConfinedSpacesCourse = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesCourse"));
const ConfinedSpacesModule1 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule1"));
const ConfinedSpacesModule1Section1 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule1Section1"));
const ConfinedSpacesModule1Section2 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule1Section2"));
const ConfinedSpacesModule1Section3 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule1Section3"));
const ConfinedSpacesModule1Section4 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule1Section4"));
const ConfinedSpacesModule2 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule2"));
const ConfinedSpacesModule2Section1 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule2Section1"));
const ConfinedSpacesModule2Section2 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule2Section2"));
const ConfinedSpacesModule2Section3 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule2Section3"));
const ConfinedSpacesModule2Section4 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule2Section4"));
const ConfinedSpacesModule3 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule3"));
const ConfinedSpacesModule3Section1 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule3Section1"));
const ConfinedSpacesModule3Section2 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule3Section2"));
const ConfinedSpacesModule3Section3 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule3Section3"));
const ConfinedSpacesModule3Section4 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule3Section4"));
const ConfinedSpacesModule4 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule4"));
const ConfinedSpacesModule4Section1 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule4Section1"));
const ConfinedSpacesModule4Section2 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule4Section2"));
const ConfinedSpacesModule4Section3 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule4Section3"));
const ConfinedSpacesModule4Section4 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule4Section4"));
const ConfinedSpacesModule5 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule5"));
const ConfinedSpacesModule5Section1 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule5Section1"));
const ConfinedSpacesModule5Section2 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule5Section2"));
const ConfinedSpacesModule5Section3 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule5Section3"));
const ConfinedSpacesModule5Section4 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule5Section4"));
const ConfinedSpacesModule6 = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesModule6"));
const ConfinedSpacesMockExam = lazyWithRetry(() => import("@/pages/study-centre/confined-spaces/ConfinedSpacesMockExam"));

const Loader = CourseSkeleton;

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const confinedSpacesRoutes = (
  <>
    <Route path="confined-spaces-course" element={<S><ConfinedSpacesCourse /></S>} />
    <Route path="confined-spaces-module-1" element={<S><ConfinedSpacesModule1 /></S>} />
    <Route path="confined-spaces-module-1-section-1" element={<S><ConfinedSpacesModule1Section1 /></S>} />
    <Route path="confined-spaces-module-1-section-2" element={<S><ConfinedSpacesModule1Section2 /></S>} />
    <Route path="confined-spaces-module-1-section-3" element={<S><ConfinedSpacesModule1Section3 /></S>} />
    <Route path="confined-spaces-module-1-section-4" element={<S><ConfinedSpacesModule1Section4 /></S>} />
    <Route path="confined-spaces-module-2" element={<S><ConfinedSpacesModule2 /></S>} />
    <Route path="confined-spaces-module-2-section-1" element={<S><ConfinedSpacesModule2Section1 /></S>} />
    <Route path="confined-spaces-module-2-section-2" element={<S><ConfinedSpacesModule2Section2 /></S>} />
    <Route path="confined-spaces-module-2-section-3" element={<S><ConfinedSpacesModule2Section3 /></S>} />
    <Route path="confined-spaces-module-2-section-4" element={<S><ConfinedSpacesModule2Section4 /></S>} />
    <Route path="confined-spaces-module-3" element={<S><ConfinedSpacesModule3 /></S>} />
    <Route path="confined-spaces-module-3-section-1" element={<S><ConfinedSpacesModule3Section1 /></S>} />
    <Route path="confined-spaces-module-3-section-2" element={<S><ConfinedSpacesModule3Section2 /></S>} />
    <Route path="confined-spaces-module-3-section-3" element={<S><ConfinedSpacesModule3Section3 /></S>} />
    <Route path="confined-spaces-module-3-section-4" element={<S><ConfinedSpacesModule3Section4 /></S>} />
    <Route path="confined-spaces-module-4" element={<S><ConfinedSpacesModule4 /></S>} />
    <Route path="confined-spaces-module-4-section-1" element={<S><ConfinedSpacesModule4Section1 /></S>} />
    <Route path="confined-spaces-module-4-section-2" element={<S><ConfinedSpacesModule4Section2 /></S>} />
    <Route path="confined-spaces-module-4-section-3" element={<S><ConfinedSpacesModule4Section3 /></S>} />
    <Route path="confined-spaces-module-4-section-4" element={<S><ConfinedSpacesModule4Section4 /></S>} />
    <Route path="confined-spaces-module-5" element={<S><ConfinedSpacesModule5 /></S>} />
    <Route path="confined-spaces-module-5-section-1" element={<S><ConfinedSpacesModule5Section1 /></S>} />
    <Route path="confined-spaces-module-5-section-2" element={<S><ConfinedSpacesModule5Section2 /></S>} />
    <Route path="confined-spaces-module-5-section-3" element={<S><ConfinedSpacesModule5Section3 /></S>} />
    <Route path="confined-spaces-module-5-section-4" element={<S><ConfinedSpacesModule5Section4 /></S>} />
    <Route path="confined-spaces-module-6" element={<S><ConfinedSpacesModule6 /></S>} />
    <Route path="confined-spaces-mock-exam" element={<S><ConfinedSpacesMockExam /></S>} />
  </>
);
