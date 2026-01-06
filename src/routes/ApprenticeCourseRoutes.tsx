import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { withTimeout, trackImport } from "@/lib/lazy";

// Import Level2Routes for nested routing
const Level2Routes = lazy(() => import("@/routes/Level2Routes"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-elec-dark">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elec-yellow mx-auto mb-4" />
      <p className="text-gray-400">Loading course content...</p>
    </div>
  </div>
);

const AM2 = lazy(() => withTimeout(() => trackImport('AM2', () => import('@/pages/apprentice-courses/AM2'))));
const AM2Module1 = lazy(() => withTimeout(() => trackImport('AM2Module1', () => import('@/pages/apprentice-courses/AM2Module1'))));
const AM2Module1Section1 = lazy(() => withTimeout(() => trackImport('AM2Module1Section1', () => import('@/pages/apprentice-courses/AM2Module1Section1'))));
const AM2Module1Section2 = lazy(() => withTimeout(() => trackImport('AM2Module1Section2', () => import('@/pages/apprentice-courses/AM2Module1Section2'))));
const AM2Module1Section3 = lazy(() => withTimeout(() => trackImport('AM2Module1Section3', () => import('@/pages/apprentice-courses/AM2Module1Section3'))));
const AM2Module1Section4 = lazy(() => withTimeout(() => trackImport('AM2Module1Section4', () => import('@/pages/apprentice-courses/AM2Module1Section4'))));
const AM2Module2 = lazy(() => withTimeout(() => trackImport('AM2Module2', () => import('@/pages/apprentice-courses/AM2Module2'))));
const AM2Module2Section1 = lazy(() => withTimeout(() => trackImport('AM2Module2Section1', () => import('@/pages/apprentice-courses/AM2Module2Section1'))));
const AM2Module2Section2 = lazy(() => withTimeout(() => trackImport('AM2Module2Section2', () => import('@/pages/apprentice-courses/AM2Module2Section2'))));
const AM2Module2Section3 = lazy(() => withTimeout(() => trackImport('AM2Module2Section3', () => import('@/pages/apprentice-courses/AM2Module2Section3'))));
const AM2Module2Section4 = lazy(() => withTimeout(() => trackImport('AM2Module2Section4', () => import('@/pages/apprentice-courses/AM2Module2Section4'))));
const AM2Module2Section5 = lazy(() => withTimeout(() => trackImport('AM2Module2Section5', () => import('@/pages/apprentice-courses/AM2Module2Section5'))));
const AM2Module3 = lazy(() => withTimeout(() => trackImport('AM2Module3', () => import('@/pages/apprentice-courses/AM2Module3'))));
const AM2Module3Section1 = lazy(() => withTimeout(() => trackImport('AM2Module3Section1', () => import('@/pages/apprentice-courses/AM2Module3Section1'))));
const AM2Module3Section2 = lazy(() => withTimeout(() => trackImport('AM2Module3Section2', () => import('@/pages/apprentice-courses/AM2Module3Section2'))));
const AM2Module3Section3 = lazy(() => withTimeout(() => trackImport('AM2Module3Section3', () => import('@/pages/apprentice-courses/AM2Module3Section3'))));
const AM2Module3Section4 = lazy(() => withTimeout(() => trackImport('AM2Module3Section4', () => import('@/pages/apprentice-courses/AM2Module3Section4'))));
const AM2Module3Section5 = lazy(() => withTimeout(() => trackImport('AM2Module3Section5', () => import('@/pages/apprentice-courses/AM2Module3Section5'))));
const AM2Module3Section6 = lazy(() => withTimeout(() => trackImport('AM2Module3Section6', () => import('@/pages/apprentice-courses/AM2Module3Section6'))));
const AM2Module4 = lazy(() => withTimeout(() => trackImport('AM2Module4', () => import('@/pages/apprentice-courses/AM2Module4'))));
const AM2Module4Section1 = lazy(() => withTimeout(() => trackImport('AM2Module4Section1', () => import('@/pages/apprentice-courses/AM2Module4Section1'))));
const AM2Module4Section2 = lazy(() => withTimeout(() => trackImport('AM2Module4Section2', () => import('@/pages/apprentice-courses/AM2Module4Section2'))));
const AM2Module4Section3 = lazy(() => withTimeout(() => trackImport('AM2Module4Section3', () => import('@/pages/apprentice-courses/AM2Module4Section3'))));
const AM2Module4Section4 = lazy(() => withTimeout(() => trackImport('AM2Module4Section4', () => import('@/pages/apprentice-courses/AM2Module4Section4'))));
const AM2Module4Section5 = lazy(() => withTimeout(() => trackImport('AM2Module4Section5', () => import('@/pages/apprentice-courses/AM2Module4Section5'))));
const AM2Module4Section6 = lazy(() => withTimeout(() => trackImport('AM2Module4Section6', () => import('@/pages/apprentice-courses/AM2Module4Section6'))));
const AM2Module5 = lazy(() => withTimeout(() => trackImport('AM2Module5', () => import('@/pages/apprentice-courses/AM2Module5'))));
const AM2Module5Section1 = lazy(() => withTimeout(() => trackImport('AM2Module5Section1', () => import('@/pages/apprentice-courses/AM2Module5Section1'))));
const AM2Module5Section2 = lazy(() => withTimeout(() => trackImport('AM2Module5Section2', () => import('@/pages/apprentice-courses/AM2Module5Section2'))));
const AM2Module5Section3 = lazy(() => withTimeout(() => trackImport('AM2Module5Section3', () => import('@/pages/apprentice-courses/AM2Module5Section3'))));
const AM2Module5Section4 = lazy(() => withTimeout(() => trackImport('AM2Module5Section4', () => import('@/pages/apprentice-courses/AM2Module5Section4'))));
const AM2Module5Section5 = lazy(() => withTimeout(() => trackImport('AM2Module5Section5', () => import('@/pages/apprentice-courses/AM2Module5Section5'))));
const AM2Module5Section6 = lazy(() => withTimeout(() => trackImport('AM2Module5Section6', () => import('@/pages/apprentice-courses/AM2Module5Section6'))));
const AM2Module6 = lazy(() => withTimeout(() => trackImport('AM2Module6', () => import('@/pages/apprentice-courses/AM2Module6'))));
const AM2Module6Section1 = lazy(() => withTimeout(() => trackImport('AM2Module6Section1', () => import('@/pages/apprentice-courses/AM2Module6Section1'))));
const AM2Module6Section2 = lazy(() => withTimeout(() => trackImport('AM2Module6Section2', () => import('@/pages/apprentice-courses/AM2Module6Section2'))));
const AM2Module6Section3 = lazy(() => withTimeout(() => trackImport('AM2Module6Section3', () => import('@/pages/apprentice-courses/AM2Module6Section3'))));
const AM2Module6Section4 = lazy(() => withTimeout(() => trackImport('AM2Module6Section4', () => import('@/pages/apprentice-courses/AM2Module6Section4'))));
const AM2Module7 = lazy(() => withTimeout(() => trackImport('AM2Module7', () => import('@/pages/apprentice-courses/AM2Module7'))));
const AM2Module7Section1 = lazy(() => withTimeout(() => trackImport('AM2Module7Section1', () => import('@/pages/apprentice-courses/AM2Module7Section1'))));
const AM2Module7Section2 = lazy(() => withTimeout(() => trackImport('AM2Module7Section2', () => import('@/pages/apprentice-courses/AM2Module7Section2'))));
const AM2Module7Section3 = lazy(() => withTimeout(() => trackImport('AM2Module7Section3', () => import('@/pages/apprentice-courses/AM2Module7Section3'))));
const AM2Module7Section4 = lazy(() => withTimeout(() => trackImport('AM2Module7Section4', () => import('@/pages/apprentice-courses/AM2Module7Section4'))));
const AM2Module8 = lazy(() => withTimeout(() => trackImport('AM2Module8', () => import('@/pages/apprentice-courses/AM2Module8'))));
const FunctionalSkills = lazy(() => withTimeout(() => trackImport('FunctionalSkills', () => import('@/pages/apprentice-courses/FunctionalSkills'))));
const HNC = lazy(() => withTimeout(() => trackImport('HNC', () => import('@/pages/apprentice-courses/HNC'))));
const HNCModule1 = lazy(() => withTimeout(() => trackImport('HNCModule1', () => import('@/pages/apprentice-courses/HNCModule1'))));
const HNCModule1Section1 = lazy(() => withTimeout(() => trackImport('HNCModule1Section1', () => import('@/pages/apprentice-courses/HNCModule1Section1'))));
const HNCModule1Section2 = lazy(() => withTimeout(() => trackImport('HNCModule1Section2', () => import('@/pages/apprentice-courses/HNCModule1Section2'))));
const HNCModule1Section3 = lazy(() => withTimeout(() => trackImport('HNCModule1Section3', () => import('@/pages/apprentice-courses/HNCModule1Section3'))));
const HNCModule1Section4 = lazy(() => withTimeout(() => trackImport('HNCModule1Section4', () => import('@/pages/apprentice-courses/HNCModule1Section4'))));
const HNCModule2 = lazy(() => withTimeout(() => trackImport('HNCModule2', () => import('@/pages/apprentice-courses/HNCModule2'))));
const HNCModule2Section1 = lazy(() => withTimeout(() => trackImport('HNCModule2Section1', () => import('@/pages/apprentice-courses/HNCModule2Section1'))));
const HNCModule2Section1_1 = lazy(() => withTimeout(() => trackImport('HNCModule2Section1_1', () => import('@/pages/apprentice-courses/HNCModule2Section1_1'))));
const HNCModule2Section1_2 = lazy(() => withTimeout(() => trackImport('HNCModule2Section1_2', () => import('@/pages/apprentice-courses/HNCModule2Section1_2'))));
const HNCModule2Section1_3 = lazy(() => withTimeout(() => trackImport('HNCModule2Section1_3', () => import('@/pages/apprentice-courses/HNCModule2Section1_3'))));
const HNCModule2Section1_4 = lazy(() => withTimeout(() => trackImport('HNCModule2Section1_4', () => import('@/pages/apprentice-courses/HNCModule2Section1_4'))));
const HNCModule2Section1_5 = lazy(() => withTimeout(() => trackImport('HNCModule2Section1_5', () => import('@/pages/apprentice-courses/HNCModule2Section1_5'))));
const HNCModule2Section1_6 = lazy(() => withTimeout(() => trackImport('HNCModule2Section1_6', () => import('@/pages/apprentice-courses/HNCModule2Section1_6'))));
const HNCModule2Section1_7 = lazy(() => withTimeout(() => trackImport('HNCModule2Section1_7', () => import('@/pages/apprentice-courses/HNCModule2Section1_7'))));
const HNCModule2Section2 = lazy(() => withTimeout(() => trackImport('HNCModule2Section2', () => import('@/pages/apprentice-courses/HNCModule2Section2'))));
const HNCModule2Section2_1 = lazy(() => withTimeout(() => trackImport('HNCModule2Section2_1', () => import('@/pages/apprentice-courses/HNCModule2Section2_1'))));
const HNCModule2Section2_2 = lazy(() => withTimeout(() => trackImport('HNCModule2Section2_2', () => import('@/pages/apprentice-courses/HNCModule2Section2_2'))));
const HNCModule2Section2_3 = lazy(() => withTimeout(() => trackImport('HNCModule2Section2_3', () => import('@/pages/apprentice-courses/HNCModule2Section2_3'))));
const HNCModule2Section2_4 = lazy(() => withTimeout(() => trackImport('HNCModule2Section2_4', () => import('@/pages/apprentice-courses/HNCModule2Section2_4'))));
const HNCModule2Section2_5 = lazy(() => withTimeout(() => trackImport('HNCModule2Section2_5', () => import('@/pages/apprentice-courses/HNCModule2Section2_5'))));
const HNCModule2Section2_6 = lazy(() => withTimeout(() => trackImport('HNCModule2Section2_6', () => import('@/pages/apprentice-courses/HNCModule2Section2_6'))));
const HNCModule2Section2_7 = lazy(() => withTimeout(() => trackImport('HNCModule2Section2_7', () => import('@/pages/apprentice-courses/HNCModule2Section2_7'))));
const HNCModule2Section3 = lazy(() => withTimeout(() => trackImport('HNCModule2Section3', () => import('@/pages/apprentice-courses/HNCModule2Section3'))));
const HNCModule2Section3_1 = lazy(() => withTimeout(() => trackImport('HNCModule2Section3_1', () => import('@/pages/apprentice-courses/HNCModule2Section3_1'))));
const HNCModule2Section3_2 = lazy(() => withTimeout(() => trackImport('HNCModule2Section3_2', () => import('@/pages/apprentice-courses/HNCModule2Section3_2'))));
const HNCModule2Section3_3 = lazy(() => withTimeout(() => trackImport('HNCModule2Section3_3', () => import('@/pages/apprentice-courses/HNCModule2Section3_3'))));
const HNCModule2Section3_4 = lazy(() => withTimeout(() => trackImport('HNCModule2Section3_4', () => import('@/pages/apprentice-courses/HNCModule2Section3_4'))));
const HNCModule2Section3_5 = lazy(() => withTimeout(() => trackImport('HNCModule2Section3_5', () => import('@/pages/apprentice-courses/HNCModule2Section3_5'))));
const HNCModule2Section3_6 = lazy(() => withTimeout(() => trackImport('HNCModule2Section3_6', () => import('@/pages/apprentice-courses/HNCModule2Section3_6'))));
const HNCModule2Section4 = lazy(() => withTimeout(() => trackImport('HNCModule2Section4', () => import('@/pages/apprentice-courses/HNCModule2Section4'))));
const HNCModule2Section4_1 = lazy(() => withTimeout(() => trackImport('HNCModule2Section4_1', () => import('@/pages/apprentice-courses/HNCModule2Section4_1'))));
const HNCModule2Section4_2 = lazy(() => withTimeout(() => trackImport('HNCModule2Section4_2', () => import('@/pages/apprentice-courses/HNCModule2Section4_2'))));
const HNCModule2Section4_3 = lazy(() => withTimeout(() => trackImport('HNCModule2Section4_3', () => import('@/pages/apprentice-courses/HNCModule2Section4_3'))));
const HNCModule2Section4_4 = lazy(() => withTimeout(() => trackImport('HNCModule2Section4_4', () => import('@/pages/apprentice-courses/HNCModule2Section4_4'))));
const HNCModule2Section4_5 = lazy(() => withTimeout(() => trackImport('HNCModule2Section4_5', () => import('@/pages/apprentice-courses/HNCModule2Section4_5'))));
const HNCModule2Section4_6 = lazy(() => withTimeout(() => trackImport('HNCModule2Section4_6', () => import('@/pages/apprentice-courses/HNCModule2Section4_6'))));
const HNCModule2Section4_7 = lazy(() => withTimeout(() => trackImport('HNCModule2Section4_7', () => import('@/pages/apprentice-courses/HNCModule2Section4_7'))));
const HNCModule2Section5 = lazy(() => withTimeout(() => trackImport('HNCModule2Section5', () => import('@/pages/apprentice-courses/HNCModule2Section5'))));
const HNCModule2Section5_1 = lazy(() => withTimeout(() => trackImport('HNCModule2Section5_1', () => import('@/pages/apprentice-courses/HNCModule2Section5_1'))));
const HNCModule2Section6 = lazy(() => withTimeout(() => trackImport('HNCModule2Section6', () => import('@/pages/apprentice-courses/HNCModule2Section6'))));
const HNCModule3 = lazy(() => withTimeout(() => trackImport('HNCModule3', () => import('@/pages/apprentice-courses/HNCModule3'))));
const HNCModule3Section1 = lazy(() => withTimeout(() => trackImport('HNCModule3Section1', () => import('@/pages/apprentice-courses/HNCModule3Section1'))));
const HNCModule3Section1_1 = lazy(() => withTimeout(() => trackImport('HNCModule3Section1_1', () => import('@/pages/apprentice-courses/HNCModule3Section1_1'))));
const HNCModule3Section1_2 = lazy(() => withTimeout(() => trackImport('HNCModule3Section1_2', () => import('@/pages/apprentice-courses/HNCModule3Section1_2'))));
const HNCModule3Section1_3 = lazy(() => withTimeout(() => trackImport('HNCModule3Section1_3', () => import('@/pages/apprentice-courses/HNCModule3Section1_3'))));
const HNCModule3Section1_4 = lazy(() => withTimeout(() => trackImport('HNCModule3Section1_4', () => import('@/pages/apprentice-courses/HNCModule3Section1_4'))));
const HNCModule3Section1_5 = lazy(() => withTimeout(() => trackImport('HNCModule3Section1_5', () => import('@/pages/apprentice-courses/HNCModule3Section1_5'))));
const HNCModule3Section1_6 = lazy(() => withTimeout(() => trackImport('HNCModule3Section1_6', () => import('@/pages/apprentice-courses/HNCModule3Section1_6'))));
const HNCModule3Section1_7 = lazy(() => withTimeout(() => trackImport('HNCModule3Section1_7', () => import('@/pages/apprentice-courses/HNCModule3Section1_7'))));
const HNCModule3Section2 = lazy(() => withTimeout(() => trackImport('HNCModule3Section2', () => import('@/pages/apprentice-courses/HNCModule3Section2'))));
const HNCModule3Section2_1 = lazy(() => withTimeout(() => trackImport('HNCModule3Section2_1', () => import('@/pages/apprentice-courses/HNCModule3Section2_1'))));
const HNCModule3Section2_2 = lazy(() => withTimeout(() => trackImport('HNCModule3Section2_2', () => import('@/pages/apprentice-courses/HNCModule3Section2_2'))));
const HNCModule3Section2_3 = lazy(() => withTimeout(() => trackImport('HNCModule3Section2_3', () => import('@/pages/apprentice-courses/HNCModule3Section2_3'))));
const HNCModule3Section2_4 = lazy(() => withTimeout(() => trackImport('HNCModule3Section2_4', () => import('@/pages/apprentice-courses/HNCModule3Section2_4'))));
const HNCModule3Section2_5 = lazy(() => withTimeout(() => trackImport('HNCModule3Section2_5', () => import('@/pages/apprentice-courses/HNCModule3Section2_5'))));
const HNCModule3Section2_6 = lazy(() => withTimeout(() => trackImport('HNCModule3Section2_6', () => import('@/pages/apprentice-courses/HNCModule3Section2_6'))));
const HNCModule3Section2_7 = lazy(() => withTimeout(() => trackImport('HNCModule3Section2_7', () => import('@/pages/apprentice-courses/HNCModule3Section2_7'))));
const HNCModule3Section3 = lazy(() => withTimeout(() => trackImport('HNCModule3Section3', () => import('@/pages/apprentice-courses/HNCModule3Section3'))));
const HNCModule3Section3_1 = lazy(() => withTimeout(() => trackImport('HNCModule3Section3_1', () => import('@/pages/apprentice-courses/HNCModule3Section3_1'))));
const HNCModule3Section3_2 = lazy(() => withTimeout(() => trackImport('HNCModule3Section3_2', () => import('@/pages/apprentice-courses/HNCModule3Section3_2'))));
const HNCModule3Section3_3 = lazy(() => withTimeout(() => trackImport('HNCModule3Section3_3', () => import('@/pages/apprentice-courses/HNCModule3Section3_3'))));
const HNCModule3Section3_4 = lazy(() => withTimeout(() => trackImport('HNCModule3Section3_4', () => import('@/pages/apprentice-courses/HNCModule3Section3_4'))));
const HNCModule3Section3_5 = lazy(() => withTimeout(() => trackImport('HNCModule3Section3_5', () => import('@/pages/apprentice-courses/HNCModule3Section3_5'))));
const HNCModule3Section3_6 = lazy(() => withTimeout(() => trackImport('HNCModule3Section3_6', () => import('@/pages/apprentice-courses/HNCModule3Section3_6'))));
const HNCModule3Section3_7 = lazy(() => withTimeout(() => trackImport('HNCModule3Section3_7', () => import('@/pages/apprentice-courses/HNCModule3Section3_7'))));
const HNCModule3Section4 = lazy(() => withTimeout(() => trackImport('HNCModule3Section4', () => import('@/pages/apprentice-courses/HNCModule3Section4'))));
const HNCModule3Section4_1 = lazy(() => withTimeout(() => trackImport('HNCModule3Section4_1', () => import('@/pages/apprentice-courses/HNCModule3Section4_1'))));
const HNCModule3Section4_2 = lazy(() => withTimeout(() => trackImport('HNCModule3Section4_2', () => import('@/pages/apprentice-courses/HNCModule3Section4_2'))));
const HNCModule3Section4_3 = lazy(() => withTimeout(() => trackImport('HNCModule3Section4_3', () => import('@/pages/apprentice-courses/HNCModule3Section4_3'))));
const HNCModule3Section4_4 = lazy(() => withTimeout(() => trackImport('HNCModule3Section4_4', () => import('@/pages/apprentice-courses/HNCModule3Section4_4'))));
const HNCModule3Section4_5 = lazy(() => withTimeout(() => trackImport('HNCModule3Section4_5', () => import('@/pages/apprentice-courses/HNCModule3Section4_5'))));
const HNCModule3Section4_6 = lazy(() => withTimeout(() => trackImport('HNCModule3Section4_6', () => import('@/pages/apprentice-courses/HNCModule3Section4_6'))));
const HNCModule3Section4_7 = lazy(() => withTimeout(() => trackImport('HNCModule3Section4_7', () => import('@/pages/apprentice-courses/HNCModule3Section4_7'))));
const HNCModule3Section4_8 = lazy(() => withTimeout(() => trackImport('HNCModule3Section4_8', () => import('@/pages/apprentice-courses/HNCModule3Section4_8'))));
const HNCModule3Section5 = lazy(() => withTimeout(() => trackImport('HNCModule3Section5', () => import('@/pages/apprentice-courses/HNCModule3Section5'))));
const HNCModule3Section5_1 = lazy(() => withTimeout(() => trackImport('HNCModule3Section5_1', () => import('@/pages/apprentice-courses/HNCModule3Section5_1'))));
const HNCModule3Section5_2 = lazy(() => withTimeout(() => trackImport('HNCModule3Section5_2', () => import('@/pages/apprentice-courses/HNCModule3Section5_2'))));
const HNCModule3Section5_3 = lazy(() => withTimeout(() => trackImport('HNCModule3Section5_3', () => import('@/pages/apprentice-courses/HNCModule3Section5_3'))));
const HNCModule3Section5_4 = lazy(() => withTimeout(() => trackImport('HNCModule3Section5_4', () => import('@/pages/apprentice-courses/HNCModule3Section5_4'))));
const HNCModule3Section5_5 = lazy(() => withTimeout(() => trackImport('HNCModule3Section5_5', () => import('@/pages/apprentice-courses/HNCModule3Section5_5'))));
const HNCModule3Section5_6 = lazy(() => withTimeout(() => trackImport('HNCModule3Section5_6', () => import('@/pages/apprentice-courses/HNCModule3Section5_6'))));
const HNCModule3Section5_7 = lazy(() => withTimeout(() => trackImport('HNCModule3Section5_7', () => import('@/pages/apprentice-courses/HNCModule3Section5_7'))));
const HNCModule3Section5_8 = lazy(() => withTimeout(() => trackImport('HNCModule3Section5_8', () => import('@/pages/apprentice-courses/HNCModule3Section5_8'))));
const HNCModule3Section6 = lazy(() => withTimeout(() => trackImport('HNCModule3Section6', () => import('@/pages/apprentice-courses/HNCModule3Section6'))));
const HNCModule3Section6_1 = lazy(() => withTimeout(() => trackImport('HNCModule3Section6_1', () => import('@/pages/apprentice-courses/HNCModule3Section6_1'))));
const HNCModule3Section6_2 = lazy(() => withTimeout(() => trackImport('HNCModule3Section6_2', () => import('@/pages/apprentice-courses/HNCModule3Section6_2'))));
const HNCModule3Section6_3 = lazy(() => withTimeout(() => trackImport('HNCModule3Section6_3', () => import('@/pages/apprentice-courses/HNCModule3Section6_3'))));
const HNCModule3Section6_4 = lazy(() => withTimeout(() => trackImport('HNCModule3Section6_4', () => import('@/pages/apprentice-courses/HNCModule3Section6_4'))));
const HNCModule3Section6_5 = lazy(() => withTimeout(() => trackImport('HNCModule3Section6_5', () => import('@/pages/apprentice-courses/HNCModule3Section6_5'))));
const HNCModule3Section6_6 = lazy(() => withTimeout(() => trackImport('HNCModule3Section6_6', () => import('@/pages/apprentice-courses/HNCModule3Section6_6'))));
const HNCModule3Section6_7 = lazy(() => withTimeout(() => trackImport('HNCModule3Section6_7', () => import('@/pages/apprentice-courses/HNCModule3Section6_7'))));
const Index = lazy(() => withTimeout(() => trackImport('Index', () => import('@/pages/apprentice-courses/Index'))));
const Level2 = lazy(() => withTimeout(() => trackImport('Level2', () => import('@/pages/apprentice-courses/Level2'))));
const Level2Module6Section6_1 = lazy(() => withTimeout(() => trackImport('Level2Module6Section6_1', () => import('@/pages/apprentice-courses/Level2Module6Section6_1'))));
const Level2Module6Section6_2 = lazy(() => withTimeout(() => trackImport('Level2Module6Section6_2', () => import('@/pages/apprentice-courses/Level2Module6Section6_2'))));
const Level2Module6Section6_3 = lazy(() => withTimeout(() => trackImport('Level2Module6Section6_3', () => import('@/pages/apprentice-courses/Level2Module6Section6_3'))));
const Level2Module6Section6_4 = lazy(() => withTimeout(() => trackImport('Level2Module6Section6_4', () => import('@/pages/apprentice-courses/Level2Module6Section6_4'))));
const Level2Module6Section6_5 = lazy(() => withTimeout(() => trackImport('Level2Module6Section6_5', () => import('@/pages/apprentice-courses/Level2Module6Section6_5'))));
const Level2Module7MockExam7 = lazy(() => withTimeout(() => trackImport('Level2Module7MockExam7', () => import('@/pages/apprentice-courses/Level2Module7MockExam7'))));
const Level2Module8MockExam1 = lazy(() => withTimeout(() => trackImport('Level2Module8MockExam1', () => import('@/pages/apprentice-courses/Level2Module8MockExam1'))));
const Level2Module8MockExam2 = lazy(() => withTimeout(() => trackImport('Level2Module8MockExam2', () => import('@/pages/apprentice-courses/Level2Module8MockExam2'))));
const Level2Module8MockExam3 = lazy(() => withTimeout(() => trackImport('Level2Module8MockExam3', () => import('@/pages/apprentice-courses/Level2Module8MockExam3'))));
const Level2Module8MockExam4 = lazy(() => withTimeout(() => trackImport('Level2Module8MockExam4', () => import('@/pages/apprentice-courses/Level2Module8MockExam4'))));
const Level2Module8MockExam5 = lazy(() => withTimeout(() => trackImport('Level2Module8MockExam5', () => import('@/pages/apprentice-courses/Level2Module8MockExam5'))));
const Level2Module8MockExam6 = lazy(() => withTimeout(() => trackImport('Level2Module8MockExam6', () => import('@/pages/apprentice-courses/Level2Module8MockExam6'))));
const Level2Module8MockExam8 = lazy(() => withTimeout(() => trackImport('Level2Module8MockExam8', () => import('@/pages/apprentice-courses/Level2Module8MockExam8'))));
const Level2Module8Section1 = lazy(() => withTimeout(() => trackImport('Level2Module8Section1', () => import('@/pages/apprentice-courses/Level2Module8Section1'))));
const Level2Module8Section2 = lazy(() => withTimeout(() => trackImport('Level2Module8Section2', () => import('@/pages/apprentice-courses/Level2Module8Section2'))));
const Level2Module8Section2Section1 = lazy(() => withTimeout(() => trackImport('Level2Module8Section2Section1', () => import('@/pages/apprentice-courses/Level2Module8Section2Section1'))));
const Level2Module8Section2Section2 = lazy(() => withTimeout(() => trackImport('Level2Module8Section2Section2', () => import('@/pages/apprentice-courses/Level2Module8Section2Section2'))));
const Level2Module8Section2Section3 = lazy(() => withTimeout(() => trackImport('Level2Module8Section2Section3', () => import('@/pages/apprentice-courses/Level2Module8Section2Section3'))));
const Level2Module8Section2Section4 = lazy(() => withTimeout(() => trackImport('Level2Module8Section2Section4', () => import('@/pages/apprentice-courses/Level2Module8Section2Section4'))));
const Level3 = lazy(() => withTimeout(() => trackImport('Level3', () => import('@/pages/apprentice-courses/Level3'))));
const Level3Module1 = lazy(() => withTimeout(() => trackImport('Level3Module1', () => import('@/pages/apprentice-courses/Level3Module1'))));
const Level3Module1Section1 = lazy(() => withTimeout(() => trackImport('Level3Module1Section1', () => import('@/pages/apprentice-courses/Level3Module1Section1'))));
const Level3Module1Section2 = lazy(() => withTimeout(() => trackImport('Level3Module1Section2', () => import('@/pages/apprentice-courses/Level3Module1Section2'))));
const Level3Module1Section3 = lazy(() => withTimeout(() => trackImport('Level3Module1Section3', () => import('@/pages/apprentice-courses/Level3Module1Section3'))));
const Level3Module1Section4 = lazy(() => withTimeout(() => trackImport('Level3Module1Section4', () => import('@/pages/apprentice-courses/Level3Module1Section4'))));
const Level3Module1Section5 = lazy(() => withTimeout(() => trackImport('Level3Module1Section5', () => import('@/pages/apprentice-courses/Level3Module1Section5'))));
const Level3Module1Section6 = lazy(() => withTimeout(() => trackImport('Level3Module1Section6', () => import('@/pages/apprentice-courses/Level3Module1Section6'))));
const Level3Module1Section1_1 = lazy(() => withTimeout(() => trackImport('Level3Module1Section1_1', () => import('@/pages/apprentice-courses/Level3Module1Section1_1'))));
const Level3Module1Section1_2 = lazy(() => withTimeout(() => trackImport('Level3Module1Section1_2', () => import('@/pages/apprentice-courses/Level3Module1Section1_2'))));
const Level3Module1Section1_3 = lazy(() => withTimeout(() => trackImport('Level3Module1Section1_3', () => import('@/pages/apprentice-courses/Level3Module1Section1_3'))));
const Level3Module1Section1_4 = lazy(() => withTimeout(() => trackImport('Level3Module1Section1_4', () => import('@/pages/apprentice-courses/Level3Module1Section1_4'))));
const Level3Module1Section1_5 = lazy(() => withTimeout(() => trackImport('Level3Module1Section1_5', () => import('@/pages/apprentice-courses/Level3Module1Section1_5'))));
const Level3Module1Section1_6 = lazy(() => withTimeout(() => trackImport('Level3Module1Section1_6', () => import('@/pages/apprentice-courses/Level3Module1Section1_6'))));
const Level3Module1Section1_7 = lazy(() => withTimeout(() => trackImport('Level3Module1Section1_7', () => import('@/pages/apprentice-courses/Level3Module1Section1_7'))));
const Level3Module1Section2_1 = lazy(() => withTimeout(() => trackImport('Level3Module1Section2_1', () => import('@/pages/apprentice-courses/Level3Module1Section2_1'))));
const Level3Module1Section2_2 = lazy(() => withTimeout(() => trackImport('Level3Module1Section2_2', () => import('@/pages/apprentice-courses/Level3Module1Section2_2'))));
const Level3Module1Section2_3 = lazy(() => withTimeout(() => trackImport('Level3Module1Section2_3', () => import('@/pages/apprentice-courses/Level3Module1Section2_3'))));
const Level3Module1Section2_4 = lazy(() => withTimeout(() => trackImport('Level3Module1Section2_4', () => import('@/pages/apprentice-courses/Level3Module1Section2_4'))));
const Level3Module1Section2_5 = lazy(() => withTimeout(() => trackImport('Level3Module1Section2_5', () => import('@/pages/apprentice-courses/Level3Module1Section2_5'))));
const Level3Module1Section3_1 = lazy(() => withTimeout(() => trackImport('Level3Module1Section3_1', () => import('@/pages/apprentice-courses/Level3Module1Section3_1'))));
const Level3Module1Section3_2 = lazy(() => withTimeout(() => trackImport('Level3Module1Section3_2', () => import('@/pages/apprentice-courses/Level3Module1Section3_2'))));
const Level3Module1Section3_3 = lazy(() => withTimeout(() => trackImport('Level3Module1Section3_3', () => import('@/pages/apprentice-courses/Level3Module1Section3_3'))));
const Level3Module1Section3_4 = lazy(() => withTimeout(() => trackImport('Level3Module1Section3_4', () => import('@/pages/apprentice-courses/Level3Module1Section3_4'))));
const Level3Module1Section3_5 = lazy(() => withTimeout(() => trackImport('Level3Module1Section3_5', () => import('@/pages/apprentice-courses/Level3Module1Section3_5'))));
const Level3Module1Section3_6 = lazy(() => withTimeout(() => trackImport('Level3Module1Section3_6', () => import('@/pages/apprentice-courses/Level3Module1Section3_6'))));
const Level3Module1Section4_1 = lazy(() => withTimeout(() => trackImport('Level3Module1Section4_1', () => import('@/pages/apprentice-courses/Level3Module1Section4_1'))));
const Level3Module1Section4_2 = lazy(() => withTimeout(() => trackImport('Level3Module1Section4_2', () => import('@/pages/apprentice-courses/Level3Module1Section4_2'))));
const Level3Module1Section4_3 = lazy(() => withTimeout(() => trackImport('Level3Module1Section4_3', () => import('@/pages/apprentice-courses/Level3Module1Section4_3'))));
const Level3Module1Section4_4 = lazy(() => withTimeout(() => trackImport('Level3Module1Section4_4', () => import('@/pages/apprentice-courses/Level3Module1Section4_4'))));
const Level3Module1Section4_5 = lazy(() => withTimeout(() => trackImport('Level3Module1Section4_5', () => import('@/pages/apprentice-courses/Level3Module1Section4_5'))));
const Level3Module1Section4_6 = lazy(() => withTimeout(() => trackImport('Level3Module1Section4_6', () => import('@/pages/apprentice-courses/Level3Module1Section4_6'))));
const Level3Module1Section5_1 = lazy(() => withTimeout(() => trackImport('Level3Module1Section5_1', () => import('@/pages/apprentice-courses/Level3Module1Section5_1'))));
const Level3Module1Section5_2 = lazy(() => withTimeout(() => trackImport('Level3Module1Section5_2', () => import('@/pages/apprentice-courses/Level3Module1Section5_2'))));
const Level3Module1Section5_3 = lazy(() => withTimeout(() => trackImport('Level3Module1Section5_3', () => import('@/pages/apprentice-courses/Level3Module1Section5_3'))));
const Level3Module1Section5_4 = lazy(() => withTimeout(() => trackImport('Level3Module1Section5_4', () => import('@/pages/apprentice-courses/Level3Module1Section5_4'))));
const Level3Module1Section5_5 = lazy(() => withTimeout(() => trackImport('Level3Module1Section5_5', () => import('@/pages/apprentice-courses/Level3Module1Section5_5'))));
const Level3Module1Section5_6 = lazy(() => withTimeout(() => trackImport('Level3Module1Section5_6', () => import('@/pages/apprentice-courses/Level3Module1Section5_6'))));
const Level3Module1Section6_1 = lazy(() => withTimeout(() => trackImport('Level3Module1Section6_1', () => import('@/pages/apprentice-courses/Level3Module1Section6_1'))));
const Level3Module1Section6_2 = lazy(() => withTimeout(() => trackImport('Level3Module1Section6_2', () => import('@/pages/apprentice-courses/Level3Module1Section6_2'))));
const Level3Module1Section6_3 = lazy(() => withTimeout(() => trackImport('Level3Module1Section6_3', () => import('@/pages/apprentice-courses/Level3Module1Section6_3'))));
const Level3Module1Section6_4 = lazy(() => withTimeout(() => trackImport('Level3Module1Section6_4', () => import('@/pages/apprentice-courses/Level3Module1Section6_4'))));
const Level3Module1Section6_5 = lazy(() => withTimeout(() => trackImport('Level3Module1Section6_5', () => import('@/pages/apprentice-courses/Level3Module1Section6_5'))));
const Level3Module1Section6_6 = lazy(() => withTimeout(() => trackImport('Level3Module1Section6_6', () => import('@/pages/apprentice-courses/Level3Module1Section6_6'))));
const Level3Module2 = lazy(() => withTimeout(() => trackImport('Level3Module2', () => import('@/pages/apprentice-courses/Level3Module2'))));
const Level3Module2Section1 = lazy(() => withTimeout(() => trackImport('Level3Module2Section1', () => import('@/pages/apprentice-courses/Level3Module2Section1'))));
const Level3Module2Section2 = lazy(() => withTimeout(() => trackImport('Level3Module2Section2', () => import('@/pages/apprentice-courses/Level3Module2Section2'))));
const Level3Module2Section3 = lazy(() => withTimeout(() => trackImport('Level3Module2Section3', () => import('@/pages/apprentice-courses/Level3Module2Section3'))));
const Level3Module2Section4 = lazy(() => withTimeout(() => trackImport('Level3Module2Section4', () => import('@/pages/apprentice-courses/Level3Module2Section4'))));
const Level3Module2Section5 = lazy(() => withTimeout(() => trackImport('Level3Module2Section5', () => import('@/pages/apprentice-courses/Level3Module2Section5'))));
const Level3Module2Section6 = lazy(() => withTimeout(() => trackImport('Level3Module2Section6', () => import('@/pages/apprentice-courses/Level3Module2Section6'))));
const Level3Module2Section1_1 = lazy(() => withTimeout(() => trackImport('Level3Module2Section1_1', () => import('@/pages/apprentice-courses/Level3Module2Section1_1'))));
const Level3Module2Section1_2 = lazy(() => withTimeout(() => trackImport('Level3Module2Section1_2', () => import('@/pages/apprentice-courses/Level3Module2Section1_2'))));
const Level3Module2Section1_3 = lazy(() => withTimeout(() => trackImport('Level3Module2Section1_3', () => import('@/pages/apprentice-courses/Level3Module2Section1_3'))));
const Level3Module2Section1_4 = lazy(() => withTimeout(() => trackImport('Level3Module2Section1_4', () => import('@/pages/apprentice-courses/Level3Module2Section1_4'))));
const Level3Module2Section1_5 = lazy(() => withTimeout(() => trackImport('Level3Module2Section1_5', () => import('@/pages/apprentice-courses/Level3Module2Section1_5'))));
const Level3Module2Section2_1 = lazy(() => withTimeout(() => trackImport('Level3Module2Section2_1', () => import('@/pages/apprentice-courses/Level3Module2Section2_1'))));
const Level3Module2Section2_2 = lazy(() => withTimeout(() => trackImport('Level3Module2Section2_2', () => import('@/pages/apprentice-courses/Level3Module2Section2_2'))));
const Level3Module2Section2_3 = lazy(() => withTimeout(() => trackImport('Level3Module2Section2_3', () => import('@/pages/apprentice-courses/Level3Module2Section2_3'))));
const Level3Module2Section2_4 = lazy(() => withTimeout(() => trackImport('Level3Module2Section2_4', () => import('@/pages/apprentice-courses/Level3Module2Section2_4'))));
const Level3Module2Section2_5 = lazy(() => withTimeout(() => trackImport('Level3Module2Section2_5', () => import('@/pages/apprentice-courses/Level3Module2Section2_5'))));
const Level3Module2Section3_1 = lazy(() => withTimeout(() => trackImport('Level3Module2Section3_1', () => import('@/pages/apprentice-courses/Level3Module2Section3_1'))));
const Level3Module2Section3_2 = lazy(() => withTimeout(() => trackImport('Level3Module2Section3_2', () => import('@/pages/apprentice-courses/Level3Module2Section3_2'))));
const Level3Module2Section3_3 = lazy(() => withTimeout(() => trackImport('Level3Module2Section3_3', () => import('@/pages/apprentice-courses/Level3Module2Section3_3'))));
const Level3Module2Section3_4 = lazy(() => withTimeout(() => trackImport('Level3Module2Section3_4', () => import('@/pages/apprentice-courses/Level3Module2Section3_4'))));
const Level3Module2Section3_5 = lazy(() => withTimeout(() => trackImport('Level3Module2Section3_5', () => import('@/pages/apprentice-courses/Level3Module2Section3_5'))));
const Level3Module2Section4_1 = lazy(() => withTimeout(() => trackImport('Level3Module2Section4_1', () => import('@/pages/apprentice-courses/Level3Module2Section4_1'))));
const Level3Module2Section4_2 = lazy(() => withTimeout(() => trackImport('Level3Module2Section4_2', () => import('@/pages/apprentice-courses/Level3Module2Section4_2'))));
const Level3Module2Section4_3 = lazy(() => withTimeout(() => trackImport('Level3Module2Section4_3', () => import('@/pages/apprentice-courses/Level3Module2Section4_3'))));
const Level3Module2Section4_4 = lazy(() => withTimeout(() => trackImport('Level3Module2Section4_4', () => import('@/pages/apprentice-courses/Level3Module2Section4_4'))));
const Level3Module2Section4_5 = lazy(() => withTimeout(() => trackImport('Level3Module2Section4_5', () => import('@/pages/apprentice-courses/Level3Module2Section4_5'))));
const Level3Module2Section5_1 = lazy(() => withTimeout(() => trackImport('Level3Module2Section5_1', () => import('@/pages/apprentice-courses/Level3Module2Section5_1'))));
const Level3Module2Section5_2 = lazy(() => withTimeout(() => trackImport('Level3Module2Section5_2', () => import('@/pages/apprentice-courses/Level3Module2Section5_2'))));
const Level3Module2Section5_3 = lazy(() => withTimeout(() => trackImport('Level3Module2Section5_3', () => import('@/pages/apprentice-courses/Level3Module2Section5_3'))));
const Level3Module2Section5_4 = lazy(() => withTimeout(() => trackImport('Level3Module2Section5_4', () => import('@/pages/apprentice-courses/Level3Module2Section5_4'))));
const Level3Module2Section5_5 = lazy(() => withTimeout(() => trackImport('Level3Module2Section5_5', () => import('@/pages/apprentice-courses/Level3Module2Section5_5'))));
const Level3Module2Section6_1 = lazy(() => withTimeout(() => trackImport('Level3Module2Section6_1', () => import('@/pages/apprentice-courses/Level3Module2Section6_1'))));
const Level3Module2Section6_2 = lazy(() => withTimeout(() => trackImport('Level3Module2Section6_2', () => import('@/pages/apprentice-courses/Level3Module2Section6_2'))));
const Level3Module2Section6_3 = lazy(() => withTimeout(() => trackImport('Level3Module2Section6_3', () => import('@/pages/apprentice-courses/Level3Module2Section6_3'))));
const Level3Module2Section6_4 = lazy(() => withTimeout(() => trackImport('Level3Module2Section6_4', () => import('@/pages/apprentice-courses/Level3Module2Section6_4'))));
const Level3Module2Section6_5 = lazy(() => withTimeout(() => trackImport('Level3Module2Section6_5', () => import('@/pages/apprentice-courses/Level3Module2Section6_5'))));
const Level3Module3 = lazy(() => withTimeout(() => trackImport('Level3Module3', () => import('@/pages/apprentice-courses/Level3Module3'))));
const Level3Module3Section1 = lazy(() => withTimeout(() => trackImport('Level3Module3Section1', () => import('@/pages/apprentice-courses/Level3Module3Section1'))));
const Level3Module3Section1_1 = lazy(() => withTimeout(() => trackImport('Level3Module3Section1_1', () => import('@/pages/apprentice-courses/Level3Module3Section1_1'))));
const Level3Module3Section1_2 = lazy(() => withTimeout(() => trackImport('Level3Module3Section1_2', () => import('@/pages/apprentice-courses/Level3Module3Section1_2'))));
const Level3Module3Section1_3 = lazy(() => withTimeout(() => trackImport('Level3Module3Section1_3', () => import('@/pages/apprentice-courses/Level3Module3Section1_3'))));
const Level3Module3Section1_4 = lazy(() => withTimeout(() => trackImport('Level3Module3Section1_4', () => import('@/pages/apprentice-courses/Level3Module3Section1_4'))));
const Level3Module3Section1_5 = lazy(() => withTimeout(() => trackImport('Level3Module3Section1_5', () => import('@/pages/apprentice-courses/Level3Module3Section1_5'))));
const Level3Module3Section2 = lazy(() => withTimeout(() => trackImport('Level3Module3Section2', () => import('@/pages/apprentice-courses/Level3Module3Section2'))));
const Level3Module3Section2_1 = lazy(() => withTimeout(() => trackImport('Level3Module3Section2_1', () => import('@/pages/apprentice-courses/Level3Module3Section2_1'))));
const Level3Module3Section2_2 = lazy(() => withTimeout(() => trackImport('Level3Module3Section2_2', () => import('@/pages/apprentice-courses/Level3Module3Section2_2'))));
const Level3Module3Section2_3 = lazy(() => withTimeout(() => trackImport('Level3Module3Section2_3', () => import('@/pages/apprentice-courses/Level3Module3Section2_3'))));
const Level3Module3Section2_4 = lazy(() => withTimeout(() => trackImport('Level3Module3Section2_4', () => import('@/pages/apprentice-courses/Level3Module3Section2_4'))));
const Level3Module3Section2_5 = lazy(() => withTimeout(() => trackImport('Level3Module3Section2_5', () => import('@/pages/apprentice-courses/Level3Module3Section2_5'))));
const Level3Module3Section2_6 = lazy(() => withTimeout(() => trackImport('Level3Module3Section2_6', () => import('@/pages/apprentice-courses/Level3Module3Section2_6'))));
const Level3Module3Section3 = lazy(() => withTimeout(() => trackImport('Level3Module3Section3', () => import('@/pages/apprentice-courses/Level3Module3Section3'))));
const Level3Module3Section3_1 = lazy(() => withTimeout(() => trackImport('Level3Module3Section3_1', () => import('@/pages/apprentice-courses/Level3Module3Section3_1'))));
const Level3Module3Section3_2 = lazy(() => withTimeout(() => trackImport('Level3Module3Section3_2', () => import('@/pages/apprentice-courses/Level3Module3Section3_2'))));
const Level3Module3Section3_3 = lazy(() => withTimeout(() => trackImport('Level3Module3Section3_3', () => import('@/pages/apprentice-courses/Level3Module3Section3_3'))));
const Level3Module3Section3_4 = lazy(() => withTimeout(() => trackImport('Level3Module3Section3_4', () => import('@/pages/apprentice-courses/Level3Module3Section3_4'))));
const Level3Module3Section3_5 = lazy(() => withTimeout(() => trackImport('Level3Module3Section3_5', () => import('@/pages/apprentice-courses/Level3Module3Section3_5'))));
const Level3Module3Section4 = lazy(() => withTimeout(() => trackImport('Level3Module3Section4', () => import('@/pages/apprentice-courses/Level3Module3Section4'))));
const Level3Module3Section4_1 = lazy(() => withTimeout(() => trackImport('Level3Module3Section4_1', () => import('@/pages/apprentice-courses/Level3Module3Section4_1'))));
const Level3Module3Section4_2 = lazy(() => withTimeout(() => trackImport('Level3Module3Section4_2', () => import('@/pages/apprentice-courses/Level3Module3Section4_2'))));
const Level3Module3Section4_3 = lazy(() => withTimeout(() => trackImport('Level3Module3Section4_3', () => import('@/pages/apprentice-courses/Level3Module3Section4_3'))));
const Level3Module3Section4_4 = lazy(() => withTimeout(() => trackImport('Level3Module3Section4_4', () => import('@/pages/apprentice-courses/Level3Module3Section4_4'))));
const Level3Module3Section4_5 = lazy(() => withTimeout(() => trackImport('Level3Module3Section4_5', () => import('@/pages/apprentice-courses/Level3Module3Section4_5'))));
const Level3Module3Section4_6 = lazy(() => withTimeout(() => trackImport('Level3Module3Section4_6', () => import('@/pages/apprentice-courses/Level3Module3Section4_6'))));
const Level3Module3Section5 = lazy(() => withTimeout(() => trackImport('Level3Module3Section5', () => import('@/pages/apprentice-courses/Level3Module3Section5'))));
const Level3Module3Section5_1 = lazy(() => withTimeout(() => trackImport('Level3Module3Section5_1', () => import('@/pages/apprentice-courses/Level3Module3Section5_1'))));
const Level3Module3Section5_2 = lazy(() => withTimeout(() => trackImport('Level3Module3Section5_2', () => import('@/pages/apprentice-courses/Level3Module3Section5_2'))));
const Level3Module3Section5_3 = lazy(() => withTimeout(() => trackImport('Level3Module3Section5_3', () => import('@/pages/apprentice-courses/Level3Module3Section5_3'))));
const Level3Module3Section5_4 = lazy(() => withTimeout(() => trackImport('Level3Module3Section5_4', () => import('@/pages/apprentice-courses/Level3Module3Section5_4'))));
const Level3Module3Section6 = lazy(() => withTimeout(() => trackImport('Level3Module3Section6', () => import('@/pages/apprentice-courses/Level3Module3Section6'))));
const Level3Module3Section6_1 = lazy(() => withTimeout(() => trackImport('Level3Module3Section6_1', () => import('@/pages/apprentice-courses/Level3Module3Section6_1'))));
const Level3Module3Section6_2 = lazy(() => withTimeout(() => trackImport('Level3Module3Section6_2', () => import('@/pages/apprentice-courses/Level3Module3Section6_2'))));
const Level3Module3Section6_3 = lazy(() => withTimeout(() => trackImport('Level3Module3Section6_3', () => import('@/pages/apprentice-courses/Level3Module3Section6_3'))));
const Level3Module3Section6_4 = lazy(() => withTimeout(() => trackImport('Level3Module3Section6_4', () => import('@/pages/apprentice-courses/Level3Module3Section6_4'))));
const Level3Module3Section6_5 = lazy(() => withTimeout(() => trackImport('Level3Module3Section6_5', () => import('@/pages/apprentice-courses/Level3Module3Section6_5'))));
const Level3Module4 = lazy(() => withTimeout(() => trackImport('Level3Module4', () => import('@/pages/apprentice-courses/Level3Module4'))));
const Level3Module4Section1 = lazy(() => withTimeout(() => trackImport('Level3Module4Section1', () => import('@/pages/apprentice-courses/Level3Module4Section1'))));
const Level3Module4Section1_1 = lazy(() => withTimeout(() => trackImport('Level3Module4Section1_1', () => import('@/pages/apprentice-courses/Level3Module4Section1_1'))));
const Level3Module4Section1_2 = lazy(() => withTimeout(() => trackImport('Level3Module4Section1_2', () => import('@/pages/apprentice-courses/Level3Module4Section1_2'))));
const Level3Module4Section1_3 = lazy(() => withTimeout(() => trackImport('Level3Module4Section1_3', () => import('@/pages/apprentice-courses/Level3Module4Section1_3'))));
const Level3Module4Section1_4 = lazy(() => withTimeout(() => trackImport('Level3Module4Section1_4', () => import('@/pages/apprentice-courses/Level3Module4Section1_4'))));
const Level3Module4Section1_5 = lazy(() => withTimeout(() => trackImport('Level3Module4Section1_5', () => import('@/pages/apprentice-courses/Level3Module4Section1_5'))));
const Level3Module4Section2 = lazy(() => withTimeout(() => trackImport('Level3Module4Section2', () => import('@/pages/apprentice-courses/Level3Module4Section2'))));
const Level3Module4Section2_1 = lazy(() => withTimeout(() => trackImport('Level3Module4Section2_1', () => import('@/pages/apprentice-courses/Level3Module4Section2_1'))));
const Level3Module4Section2_2 = lazy(() => withTimeout(() => trackImport('Level3Module4Section2_2', () => import('@/pages/apprentice-courses/Level3Module4Section2_2'))));
const Level3Module4Section2_3 = lazy(() => withTimeout(() => trackImport('Level3Module4Section2_3', () => import('@/pages/apprentice-courses/Level3Module4Section2_3'))));
const Level3Module4Section2_4 = lazy(() => withTimeout(() => trackImport('Level3Module4Section2_4', () => import('@/pages/apprentice-courses/Level3Module4Section2_4'))));
const Level3Module4Section3 = lazy(() => withTimeout(() => trackImport('Level3Module4Section3', () => import('@/pages/apprentice-courses/Level3Module4Section3'))));
const Level3Module4Section3_1 = lazy(() => withTimeout(() => trackImport('Level3Module4Section3_1', () => import('@/pages/apprentice-courses/Level3Module4Section3_1'))));
const Level3Module4Section3_2 = lazy(() => withTimeout(() => trackImport('Level3Module4Section3_2', () => import('@/pages/apprentice-courses/Level3Module4Section3_2'))));
const Level3Module4Section3_3 = lazy(() => withTimeout(() => trackImport('Level3Module4Section3_3', () => import('@/pages/apprentice-courses/Level3Module4Section3_3'))));
const Level3Module4Section3_4 = lazy(() => withTimeout(() => trackImport('Level3Module4Section3_4', () => import('@/pages/apprentice-courses/Level3Module4Section3_4'))));
const Level3Module4Section3_5 = lazy(() => withTimeout(() => trackImport('Level3Module4Section3_5', () => import('@/pages/apprentice-courses/Level3Module4Section3_5'))));
const Level3Module4Section3_6 = lazy(() => withTimeout(() => trackImport('Level3Module4Section3_6', () => import('@/pages/apprentice-courses/Level3Module4Section3_6'))));
const Level3Module4Section4 = lazy(() => withTimeout(() => trackImport('Level3Module4Section4', () => import('@/pages/apprentice-courses/Level3Module4Section4'))));
const Level3Module4Section4_1 = lazy(() => withTimeout(() => trackImport('Level3Module4Section4_1', () => import('@/pages/apprentice-courses/Level3Module4Section4_1'))));
const Level3Module4Section4_2 = lazy(() => withTimeout(() => trackImport('Level3Module4Section4_2', () => import('@/pages/apprentice-courses/Level3Module4Section4_2'))));
const Level3Module4Section4_3 = lazy(() => withTimeout(() => trackImport('Level3Module4Section4_3', () => import('@/pages/apprentice-courses/Level3Module4Section4_3'))));
const Level3Module4Section4_4 = lazy(() => withTimeout(() => trackImport('Level3Module4Section4_4', () => import('@/pages/apprentice-courses/Level3Module4Section4_4'))));
const Level3Module4Section4_5 = lazy(() => withTimeout(() => trackImport('Level3Module4Section4_5', () => import('@/pages/apprentice-courses/Level3Module4Section4_5'))));
const Level3Module4Section5 = lazy(() => withTimeout(() => trackImport('Level3Module4Section5', () => import('@/pages/apprentice-courses/Level3Module4Section5'))));
const Level3Module4Section5_1 = lazy(() => withTimeout(() => trackImport('Level3Module4Section5_1', () => import('@/pages/apprentice-courses/Level3Module4Section5_1'))));
const Level3Module4Section5_2 = lazy(() => withTimeout(() => trackImport('Level3Module4Section5_2', () => import('@/pages/apprentice-courses/Level3Module4Section5_2'))));
const Level3Module4Section5_3 = lazy(() => withTimeout(() => trackImport('Level3Module4Section5_3', () => import('@/pages/apprentice-courses/Level3Module4Section5_3'))));
const Level3Module4Section5_4 = lazy(() => withTimeout(() => trackImport('Level3Module4Section5_4', () => import('@/pages/apprentice-courses/Level3Module4Section5_4'))));
const Level3Module4Section5_5 = lazy(() => withTimeout(() => trackImport('Level3Module4Section5_5', () => import('@/pages/apprentice-courses/Level3Module4Section5_5'))));
const Level3Module4Section6 = lazy(() => withTimeout(() => trackImport('Level3Module4Section6', () => import('@/pages/apprentice-courses/Level3Module4Section6'))));
const Level3Module4Section6_1 = lazy(() => withTimeout(() => trackImport('Level3Module4Section6_1', () => import('@/pages/apprentice-courses/Level3Module4Section6_1'))));
const Level3Module4Section6_2 = lazy(() => withTimeout(() => trackImport('Level3Module4Section6_2', () => import('@/pages/apprentice-courses/Level3Module4Section6_2'))));
const Level3Module4Section6_3 = lazy(() => withTimeout(() => trackImport('Level3Module4Section6_3', () => import('@/pages/apprentice-courses/Level3Module4Section6_3'))));
const Level3Module4Section6_4 = lazy(() => withTimeout(() => trackImport('Level3Module4Section6_4', () => import('@/pages/apprentice-courses/Level3Module4Section6_4'))));
const Level3Module5 = lazy(() => withTimeout(() => trackImport('Level3Module5', () => import('@/pages/apprentice-courses/Level3Module5'))));
const Level3Module5Section1 = lazy(() => withTimeout(() => trackImport('Level3Module5Section1', () => import('@/pages/apprentice-courses/Level3Module5Section1'))));
const Level3Module5Section1_1 = lazy(() => withTimeout(() => trackImport('Level3Module5Section1_1', () => import('@/pages/apprentice-courses/Level3Module5Section1_1'))));
const Level3Module5Section1_2 = lazy(() => withTimeout(() => trackImport('Level3Module5Section1_2', () => import('@/pages/apprentice-courses/Level3Module5Section1_2'))));
const Level3Module5Section1_3 = lazy(() => withTimeout(() => trackImport('Level3Module5Section1_3', () => import('@/pages/apprentice-courses/Level3Module5Section1_3'))));
const Level3Module5Section1_4 = lazy(() => withTimeout(() => trackImport('Level3Module5Section1_4', () => import('@/pages/apprentice-courses/Level3Module5Section1_4'))));
const Level3Module5Section1_5 = lazy(() => withTimeout(() => trackImport('Level3Module5Section1_5', () => import('@/pages/apprentice-courses/Level3Module5Section1_5'))));
const Level3Module5Section2 = lazy(() => withTimeout(() => trackImport('Level3Module5Section2', () => import('@/pages/apprentice-courses/Level3Module5Section2'))));
const Level3Module5Section2_1 = lazy(() => withTimeout(() => trackImport('Level3Module5Section2_1', () => import('@/pages/apprentice-courses/Level3Module5Section2_1'))));
const Level3Module5Section2_2 = lazy(() => withTimeout(() => trackImport('Level3Module5Section2_2', () => import('@/pages/apprentice-courses/Level3Module5Section2_2'))));
const Level3Module5Section2_3 = lazy(() => withTimeout(() => trackImport('Level3Module5Section2_3', () => import('@/pages/apprentice-courses/Level3Module5Section2_3'))));
const Level3Module5Section2_4 = lazy(() => withTimeout(() => trackImport('Level3Module5Section2_4', () => import('@/pages/apprentice-courses/Level3Module5Section2_4'))));
const Level3Module5Section3 = lazy(() => withTimeout(() => trackImport('Level3Module5Section3', () => import('@/pages/apprentice-courses/Level3Module5Section3'))));
const Level3Module5Section3_1 = lazy(() => withTimeout(() => trackImport('Level3Module5Section3_1', () => import('@/pages/apprentice-courses/Level3Module5Section3_1'))));
const Level3Module5Section3_2 = lazy(() => withTimeout(() => trackImport('Level3Module5Section3_2', () => import('@/pages/apprentice-courses/Level3Module5Section3_2'))));
const Level3Module5Section3_3 = lazy(() => withTimeout(() => trackImport('Level3Module5Section3_3', () => import('@/pages/apprentice-courses/Level3Module5Section3_3'))));
const Level3Module5Section3_4 = lazy(() => withTimeout(() => trackImport('Level3Module5Section3_4', () => import('@/pages/apprentice-courses/Level3Module5Section3_4'))));
const Level3Module5Section3_5 = lazy(() => withTimeout(() => trackImport('Level3Module5Section3_5', () => import('@/pages/apprentice-courses/Level3Module5Section3_5'))));
const Level3Module5Section3_6 = lazy(() => withTimeout(() => trackImport('Level3Module5Section3_6', () => import('@/pages/apprentice-courses/Level3Module5Section3_6'))));
const Level3Module5Section4 = lazy(() => withTimeout(() => trackImport('Level3Module5Section4', () => import('@/pages/apprentice-courses/Level3Module5Section4'))));
const Level3Module5Section4_1 = lazy(() => withTimeout(() => trackImport('Level3Module5Section4_1', () => import('@/pages/apprentice-courses/Level3Module5Section4_1'))));
const Level3Module5Section4_2 = lazy(() => withTimeout(() => trackImport('Level3Module5Section4_2', () => import('@/pages/apprentice-courses/Level3Module5Section4_2'))));
const Level3Module5Section4_3 = lazy(() => withTimeout(() => trackImport('Level3Module5Section4_3', () => import('@/pages/apprentice-courses/Level3Module5Section4_3'))));
const Level3Module5Section4_4 = lazy(() => withTimeout(() => trackImport('Level3Module5Section4_4', () => import('@/pages/apprentice-courses/Level3Module5Section4_4'))));
const Level3Module5Section4_5 = lazy(() => withTimeout(() => trackImport('Level3Module5Section4_5', () => import('@/pages/apprentice-courses/Level3Module5Section4_5'))));
const Level3Module5Section5 = lazy(() => withTimeout(() => trackImport('Level3Module5Section5', () => import('@/pages/apprentice-courses/Level3Module5Section5'))));
const Level3Module5Section5_1 = lazy(() => withTimeout(() => trackImport('Level3Module5Section5_1', () => import('@/pages/apprentice-courses/Level3Module5Section5_1'))));
const Level3Module5Section5_2 = lazy(() => withTimeout(() => trackImport('Level3Module5Section5_2', () => import('@/pages/apprentice-courses/Level3Module5Section5_2'))));
const Level3Module5Section5_3 = lazy(() => withTimeout(() => trackImport('Level3Module5Section5_3', () => import('@/pages/apprentice-courses/Level3Module5Section5_3'))));
const Level3Module5Section5_4 = lazy(() => withTimeout(() => trackImport('Level3Module5Section5_4', () => import('@/pages/apprentice-courses/Level3Module5Section5_4'))));
const Level3Module5Section5_5 = lazy(() => withTimeout(() => trackImport('Level3Module5Section5_5', () => import('@/pages/apprentice-courses/Level3Module5Section5_5'))));
const Level3Module5Section6 = lazy(() => withTimeout(() => trackImport('Level3Module5Section6', () => import('@/pages/apprentice-courses/Level3Module5Section6'))));
const Level3Module5Section6_1 = lazy(() => withTimeout(() => trackImport('Level3Module5Section6_1', () => import('@/pages/apprentice-courses/Level3Module5Section6_1'))));
const Level3Module5Section6_2 = lazy(() => withTimeout(() => trackImport('Level3Module5Section6_2', () => import('@/pages/apprentice-courses/Level3Module5Section6_2'))));
const Level3Module5Section6_3 = lazy(() => withTimeout(() => trackImport('Level3Module5Section6_3', () => import('@/pages/apprentice-courses/Level3Module5Section6_3'))));
const Level3Module5Section6_4 = lazy(() => withTimeout(() => trackImport('Level3Module5Section6_4', () => import('@/pages/apprentice-courses/Level3Module5Section6_4'))));
const Level3Module6 = lazy(() => withTimeout(() => trackImport('Level3Module6', () => import('@/pages/apprentice-courses/Level3Module6'))));
const Level3Module6Section1 = lazy(() => withTimeout(() => trackImport('Level3Module6Section1', () => import('@/pages/apprentice-courses/Level3Module6Section1'))));
const Level3Module6Section1_1 = lazy(() => withTimeout(() => trackImport('Level3Module6Section1_1', () => import('@/pages/apprentice-courses/Level3Module6Section1_1'))));
const Level3Module6Section1_2 = lazy(() => withTimeout(() => trackImport('Level3Module6Section1_2', () => import('@/pages/apprentice-courses/Level3Module6Section1_2'))));
const Level3Module6Section1_3 = lazy(() => withTimeout(() => trackImport('Level3Module6Section1_3', () => import('@/pages/apprentice-courses/Level3Module6Section1_3'))));
const Level3Module6Section1_4 = lazy(() => withTimeout(() => trackImport('Level3Module6Section1_4', () => import('@/pages/apprentice-courses/Level3Module6Section1_4'))));
const Level3Module6Section1_5 = lazy(() => withTimeout(() => trackImport('Level3Module6Section1_5', () => import('@/pages/apprentice-courses/Level3Module6Section1_5'))));
const Level3Module6Section2 = lazy(() => withTimeout(() => trackImport('Level3Module6Section2', () => import('@/pages/apprentice-courses/Level3Module6Section2'))));
const Level3Module6Section2_2 = lazy(() => withTimeout(() => trackImport('Level3Module6Section2_2', () => import('@/pages/apprentice-courses/Level3Module6Section2_2'))));
const Level3Module6Section2_3 = lazy(() => withTimeout(() => trackImport('Level3Module6Section2_3', () => import('@/pages/apprentice-courses/Level3Module6Section2_3'))));
const Level3Module6Section2_4 = lazy(() => withTimeout(() => trackImport('Level3Module6Section2_4', () => import('@/pages/apprentice-courses/Level3Module6Section2_4'))));
const Level3Module6Section2_5 = lazy(() => withTimeout(() => trackImport('Level3Module6Section2_5', () => import('@/pages/apprentice-courses/Level3Module6Section2_5'))));
const Level3Module6Section2_6 = lazy(() => withTimeout(() => trackImport('Level3Module6Section2_6', () => import('@/pages/apprentice-courses/Level3Module6Section2_6'))));
const Level3Module6Section3 = lazy(() => withTimeout(() => trackImport('Level3Module6Section3', () => import('@/pages/apprentice-courses/Level3Module6Section3'))));
const Level3Module6Section3_1 = lazy(() => withTimeout(() => trackImport('Level3Module6Section3_1', () => import('@/pages/apprentice-courses/Level3Module6Section3_1'))));
const Level3Module6Section3_2 = lazy(() => withTimeout(() => trackImport('Level3Module6Section3_2', () => import('@/pages/apprentice-courses/Level3Module6Section3_2'))));
const Level3Module6Section3_3 = lazy(() => withTimeout(() => trackImport('Level3Module6Section3_3', () => import('@/pages/apprentice-courses/Level3Module6Section3_3'))));
const Level3Module6Section3_4 = lazy(() => withTimeout(() => trackImport('Level3Module6Section3_4', () => import('@/pages/apprentice-courses/Level3Module6Section3_4'))));
const Level3Module6Section3_5 = lazy(() => withTimeout(() => trackImport('Level3Module6Section3_5', () => import('@/pages/apprentice-courses/Level3Module6Section3_5'))));
const Level3Module6Section4 = lazy(() => withTimeout(() => trackImport('Level3Module6Section4', () => import('@/pages/apprentice-courses/Level3Module6Section4'))));
const Level3Module6Section4_1 = lazy(() => withTimeout(() => trackImport('Level3Module6Section4_1', () => import('@/pages/apprentice-courses/Level3Module6Section4_1'))));
const Level3Module6Section4_2 = lazy(() => withTimeout(() => trackImport('Level3Module6Section4_2', () => import('@/pages/apprentice-courses/Level3Module6Section4_2'))));
const Level3Module6Section4_3 = lazy(() => withTimeout(() => trackImport('Level3Module6Section4_3', () => import('@/pages/apprentice-courses/Level3Module6Section4_3'))));
const Level3Module6Section4_4 = lazy(() => withTimeout(() => trackImport('Level3Module6Section4_4', () => import('@/pages/apprentice-courses/Level3Module6Section4_4'))));
const Level3Module6Section4_5 = lazy(() => withTimeout(() => trackImport('Level3Module6Section4_5', () => import('@/pages/apprentice-courses/Level3Module6Section4_5'))));
const Level3Module6Section4_6 = lazy(() => withTimeout(() => trackImport('Level3Module6Section4_6', () => import('@/pages/apprentice-courses/Level3Module6Section4_6'))));
const Level3Module6Section5 = lazy(() => withTimeout(() => trackImport('Level3Module6Section5', () => import('@/pages/apprentice-courses/Level3Module6Section5'))));
const Level3Module6Section5_1 = lazy(() => withTimeout(() => trackImport('Level3Module6Section5_1', () => import('@/pages/apprentice-courses/Level3Module6Section5_1'))));
const Level3Module6Section5_2 = lazy(() => withTimeout(() => trackImport('Level3Module6Section5_2', () => import('@/pages/apprentice-courses/Level3Module6Section5_2'))));
const Level3Module6Section5_3 = lazy(() => withTimeout(() => trackImport('Level3Module6Section5_3', () => import('@/pages/apprentice-courses/Level3Module6Section5_3'))));
const Level3Module6Section5_4 = lazy(() => withTimeout(() => trackImport('Level3Module6Section5_4', () => import('@/pages/apprentice-courses/Level3Module6Section5_4'))));
const Level3Module6Section6 = lazy(() => withTimeout(() => trackImport('Level3Module6Section6', () => import('@/pages/apprentice-courses/Level3Module6Section6'))));
const Level3Module6Section6_1 = lazy(() => withTimeout(() => trackImport('Level3Module6Section6_1', () => import('@/pages/apprentice-courses/Level3Module6Section6_1'))));
const Level3Module6Section6_2 = lazy(() => withTimeout(() => trackImport('Level3Module6Section6_2', () => import('@/pages/apprentice-courses/Level3Module6Section6_2'))));
const Level3Module6Section6_3 = lazy(() => withTimeout(() => trackImport('Level3Module6Section6_3', () => import('@/pages/apprentice-courses/Level3Module6Section6_3'))));
const Level3Module6Section6_4 = lazy(() => withTimeout(() => trackImport('Level3Module6Section6_4', () => import('@/pages/apprentice-courses/Level3Module6Section6_4'))));
const Level3Module6Section6_5 = lazy(() => withTimeout(() => trackImport('Level3Module6Section6_5', () => import('@/pages/apprentice-courses/Level3Module6Section6_5'))));
const Level3Module7 = lazy(() => withTimeout(() => trackImport('Level3Module7', () => import('@/pages/apprentice-courses/Level3Module7'))));
const Level3Module7Section1 = lazy(() => withTimeout(() => trackImport('Level3Module7Section1', () => import('@/pages/apprentice-courses/Level3Module7Section1'))));
const Level3Module7Section1_1 = lazy(() => withTimeout(() => trackImport('Level3Module7Section1_1', () => import('@/pages/apprentice-courses/Level3Module7Section1_1'))));
const Level3Module7Section1_2 = lazy(() => withTimeout(() => trackImport('Level3Module7Section1_2', () => import('@/pages/apprentice-courses/Level3Module7Section1_2'))));
const Level3Module7Section1_3 = lazy(() => withTimeout(() => trackImport('Level3Module7Section1_3', () => import('@/pages/apprentice-courses/Level3Module7Section1_3'))));
const Level3Module7Section1_4 = lazy(() => withTimeout(() => trackImport('Level3Module7Section1_4', () => import('@/pages/apprentice-courses/Level3Module7Section1_4'))));
const Level3Module7Section1_5 = lazy(() => withTimeout(() => trackImport('Level3Module7Section1_5', () => import('@/pages/apprentice-courses/Level3Module7Section1_5'))));
const Level3Module7Section2 = lazy(() => withTimeout(() => trackImport('Level3Module7Section2', () => import('@/pages/apprentice-courses/Level3Module7Section2'))));
const Level3Module7Section2_1 = lazy(() => withTimeout(() => trackImport('Level3Module7Section2_1', () => import('@/pages/apprentice-courses/Level3Module7Section2_1'))));
const Level3Module7Section2_2 = lazy(() => withTimeout(() => trackImport('Level3Module7Section2_2', () => import('@/pages/apprentice-courses/Level3Module7Section2_2'))));
const Level3Module7Section2_3 = lazy(() => withTimeout(() => trackImport('Level3Module7Section2_3', () => import('@/pages/apprentice-courses/Level3Module7Section2_3'))));
const Level3Module7Section2_4 = lazy(() => withTimeout(() => trackImport('Level3Module7Section2_4', () => import('@/pages/apprentice-courses/Level3Module7Section2_4'))));
const Level3Module7Section3 = lazy(() => withTimeout(() => trackImport('Level3Module7Section3', () => import('@/pages/apprentice-courses/Level3Module7Section3'))));
const Level3Module7Section3_1 = lazy(() => withTimeout(() => trackImport('Level3Module7Section3_1', () => import('@/pages/apprentice-courses/Level3Module7Section3_1'))));
const Level3Module7Section3_2 = lazy(() => withTimeout(() => trackImport('Level3Module7Section3_2', () => import('@/pages/apprentice-courses/Level3Module7Section3_2'))));
const Level3Module7Section3_3 = lazy(() => withTimeout(() => trackImport('Level3Module7Section3_3', () => import('@/pages/apprentice-courses/Level3Module7Section3_3'))));
const Level3Module7Section3_4 = lazy(() => withTimeout(() => trackImport('Level3Module7Section3_4', () => import('@/pages/apprentice-courses/Level3Module7Section3_4'))));
const Level3Module7Section3_5 = lazy(() => withTimeout(() => trackImport('Level3Module7Section3_5', () => import('@/pages/apprentice-courses/Level3Module7Section3_5'))));
const Level3Module7Section4 = lazy(() => withTimeout(() => trackImport('Level3Module7Section4', () => import('@/pages/apprentice-courses/Level3Module7Section4'))));
const Level3Module7Section4_1 = lazy(() => withTimeout(() => trackImport('Level3Module7Section4_1', () => import('@/pages/apprentice-courses/Level3Module7Section4_1'))));
const Level3Module7Section4_2 = lazy(() => withTimeout(() => trackImport('Level3Module7Section4_2', () => import('@/pages/apprentice-courses/Level3Module7Section4_2'))));
const Level3Module7Section4_3 = lazy(() => withTimeout(() => trackImport('Level3Module7Section4_3', () => import('@/pages/apprentice-courses/Level3Module7Section4_3'))));
const Level3Module7Section4_4 = lazy(() => withTimeout(() => trackImport('Level3Module7Section4_4', () => import('@/pages/apprentice-courses/Level3Module7Section4_4'))));
const Level3Module7Section4_5 = lazy(() => withTimeout(() => trackImport('Level3Module7Section4_5', () => import('@/pages/apprentice-courses/Level3Module7Section4_5'))));
const Level3Module7Section5 = lazy(() => withTimeout(() => trackImport('Level3Module7Section5', () => import('@/pages/apprentice-courses/Level3Module7Section5'))));
const Level3Module7Section5_1 = lazy(() => withTimeout(() => trackImport('Level3Module7Section5_1', () => import('@/pages/apprentice-courses/Level3Module7Section5_1'))));
const Level3Module7Section5_2 = lazy(() => withTimeout(() => trackImport('Level3Module7Section5_2', () => import('@/pages/apprentice-courses/Level3Module7Section5_2'))));
const Level3Module7Section5_3 = lazy(() => withTimeout(() => trackImport('Level3Module7Section5_3', () => import('@/pages/apprentice-courses/Level3Module7Section5_3'))));
const Level3Module7Section5_4 = lazy(() => withTimeout(() => trackImport('Level3Module7Section5_4', () => import('@/pages/apprentice-courses/Level3Module7Section5_4'))));
const Level3Module7Section5_5 = lazy(() => withTimeout(() => trackImport('Level3Module7Section5_5', () => import('@/pages/apprentice-courses/Level3Module7Section5_5'))));
const Level3Module7Section5_6 = lazy(() => withTimeout(() => trackImport('Level3Module7Section5_6', () => import('@/pages/apprentice-courses/Level3Module7Section5_6'))));
const Level3Module8 = lazy(() => withTimeout(() => trackImport('Level3Module8', () => import('@/pages/apprentice-courses/Level3Module8'))));
const Level3Module8Section1 = lazy(() => withTimeout(() => trackImport('Level3Module8Section1', () => import('@/pages/apprentice-courses/Level3Module8Section1'))));
const Level3Module8Section1_1 = lazy(() => withTimeout(() => trackImport('Level3Module8Section1_1', () => import('@/pages/apprentice-courses/Level3Module8Section1_1'))));
const Level3Module8Section1_2 = lazy(() => withTimeout(() => trackImport('Level3Module8Section1_2', () => import('@/pages/apprentice-courses/Level3Module8Section1_2'))));
const Level3Module8Section1_3 = lazy(() => withTimeout(() => trackImport('Level3Module8Section1_3', () => import('@/pages/apprentice-courses/Level3Module8Section1_3'))));
const Level3Module8Section1_4 = lazy(() => withTimeout(() => trackImport('Level3Module8Section1_4', () => import('@/pages/apprentice-courses/Level3Module8Section1_4'))));
const Level3Module8Section2 = lazy(() => withTimeout(() => trackImport('Level3Module8Section2', () => import('@/pages/apprentice-courses/Level3Module8Section2'))));
const Level3Module8Section2_1 = lazy(() => withTimeout(() => trackImport('Level3Module8Section2_1', () => import('@/pages/apprentice-courses/Level3Module8Section2_1'))));
const Level3Module8Section2_2 = lazy(() => withTimeout(() => trackImport('Level3Module8Section2_2', () => import('@/pages/apprentice-courses/Level3Module8Section2_2'))));
const Level3Module8Section2_3 = lazy(() => withTimeout(() => trackImport('Level3Module8Section2_3', () => import('@/pages/apprentice-courses/Level3Module8Section2_3'))));
const Level3Module8Section2_4 = lazy(() => withTimeout(() => trackImport('Level3Module8Section2_4', () => import('@/pages/apprentice-courses/Level3Module8Section2_4'))));
const Level3Module8Section3 = lazy(() => withTimeout(() => trackImport('Level3Module8Section3', () => import('@/pages/apprentice-courses/Level3Module8Section3'))));
const Level3Module8Section3_1 = lazy(() => withTimeout(() => trackImport('Level3Module8Section3_1', () => import('@/pages/apprentice-courses/Level3Module8Section3_1'))));
const Level3Module8Section3_2 = lazy(() => withTimeout(() => trackImport('Level3Module8Section3_2', () => import('@/pages/apprentice-courses/Level3Module8Section3_2'))));
const Level3Module8Section3_3 = lazy(() => withTimeout(() => trackImport('Level3Module8Section3_3', () => import('@/pages/apprentice-courses/Level3Module8Section3_3'))));
const Level3Module8Section3_4 = lazy(() => withTimeout(() => trackImport('Level3Module8Section3_4', () => import('@/pages/apprentice-courses/Level3Module8Section3_4'))));
const Level3Module8Section4 = lazy(() => withTimeout(() => trackImport('Level3Module8Section4', () => import('@/pages/apprentice-courses/Level3Module8Section4'))));
const Level3Module8Section4_1 = lazy(() => withTimeout(() => trackImport('Level3Module8Section4_1', () => import('@/pages/apprentice-courses/Level3Module8Section4_1'))));
const Level3Module8Section4_2 = lazy(() => withTimeout(() => trackImport('Level3Module8Section4_2', () => import('@/pages/apprentice-courses/Level3Module8Section4_2'))));
const Level3Module8Section4_3 = lazy(() => withTimeout(() => trackImport('Level3Module8Section4_3', () => import('@/pages/apprentice-courses/Level3Module8Section4_3'))));
const Level3Module8Section4_4 = lazy(() => withTimeout(() => trackImport('Level3Module8Section4_4', () => import('@/pages/apprentice-courses/Level3Module8Section4_4'))));
const Level3Module8MockExam1 = lazy(() => withTimeout(() => trackImport('Level3Module8MockExam1', () => import('@/pages/apprentice-courses/Level3Module8MockExam1'))));
const Level3Module8MockExam2 = lazy(() => withTimeout(() => trackImport('Level3Module8MockExam2', () => import('@/pages/apprentice-courses/Level3Module8MockExam2'))));
const Level3Module8MockExam3 = lazy(() => withTimeout(() => trackImport('Level3Module8MockExam3', () => import('@/pages/apprentice-courses/Level3Module8MockExam3'))));
const Level3Module8MockExam4 = lazy(() => withTimeout(() => trackImport('Level3Module8MockExam4', () => import('@/pages/apprentice-courses/Level3Module8MockExam4'))));
const Level3Module8MockExam5 = lazy(() => withTimeout(() => trackImport('Level3Module8MockExam5', () => import('@/pages/apprentice-courses/Level3Module8MockExam5'))));
const Level3Module8MockExam6 = lazy(() => withTimeout(() => trackImport('Level3Module8MockExam6', () => import('@/pages/apprentice-courses/Level3Module8MockExam6'))));
const Level3Module8MockExam7 = lazy(() => withTimeout(() => trackImport('Level3Module8MockExam7', () => import('@/pages/apprentice-courses/Level3Module8MockExam7'))));
const Level3Module8MockExam8 = lazy(() => withTimeout(() => trackImport('Level3Module8MockExam8', () => import('@/pages/apprentice-courses/Level3Module8MockExam8'))));
const Module1 = lazy(() => withTimeout(() => trackImport('Module1', () => import('@/pages/apprentice-courses/Module1'))));
const Module1Section5_4 = lazy(() => withTimeout(() => trackImport('Module1Section5_4', () => import('@/pages/apprentice-courses/Module1Section5_4'))));
const Module2 = lazy(() => withTimeout(() => trackImport('Module2', () => import('@/pages/apprentice-courses/Module2'))));
const Module2Section1_1 = lazy(() => withTimeout(() => trackImport('Module2Section1_1', () => import('@/pages/apprentice-courses/Module2Section1_1'))));
const Module2Section1_2 = lazy(() => withTimeout(() => trackImport('Module2Section1_2', () => import('@/pages/apprentice-courses/Module2Section1_2'))));
const Module2Section1_3 = lazy(() => withTimeout(() => trackImport('Module2Section1_3', () => import('@/pages/apprentice-courses/Module2Section1_3'))));
const Module2Section1_4 = lazy(() => withTimeout(() => trackImport('Module2Section1_4', () => import('@/pages/apprentice-courses/Module2Section1_4'))));
const Module2Section1_5 = lazy(() => withTimeout(() => trackImport('Module2Section1_5', () => import('@/pages/apprentice-courses/Module2Section1_5'))));
const Module2Section2_1 = lazy(() => withTimeout(() => trackImport('Module2Section2_1', () => import('@/pages/apprentice-courses/Module2Section2_1'))));
const Module2Section2_2 = lazy(() => withTimeout(() => trackImport('Module2Section2_2', () => import('@/pages/apprentice-courses/Module2Section2_2'))));
const Module2Section2_3 = lazy(() => withTimeout(() => trackImport('Module2Section2_3', () => import('@/pages/apprentice-courses/Module2Section2_3'))));
const Module2Section2_4 = lazy(() => withTimeout(() => trackImport('Module2Section2_4', () => import('@/pages/apprentice-courses/Module2Section2_4'))));
const Module2Section2_5 = lazy(() => withTimeout(() => trackImport('Module2Section2_5', () => import('@/pages/apprentice-courses/Module2Section2_5'))));
const Module2Section2_6 = lazy(() => withTimeout(() => trackImport('Module2Section2_6', () => import('@/pages/apprentice-courses/Module2Section2_6'))));
const Module2Section2_Intro = lazy(() => withTimeout(() => trackImport('Module2Section2_Intro', () => import('@/pages/apprentice-courses/Module2Section2_Intro'))));
const Module2Section3_1 = lazy(() => withTimeout(() => trackImport('Module2Section3_1', () => import('@/pages/apprentice-courses/Module2Section3_1'))));
const Module2Section3_2 = lazy(() => withTimeout(() => trackImport('Module2Section3_2', () => import('@/pages/apprentice-courses/Module2Section3_2'))));
const Module2Section3_3 = lazy(() => withTimeout(() => trackImport('Module2Section3_3', () => import('@/pages/apprentice-courses/Module2Section3_3'))));
const Module2Section3_4 = lazy(() => withTimeout(() => trackImport('Module2Section3_4', () => import('@/pages/apprentice-courses/Module2Section3_4'))));
const Module2Section3_5 = lazy(() => withTimeout(() => trackImport('Module2Section3_5', () => import('@/pages/apprentice-courses/Module2Section3_5'))));
const Module2Section3_6 = lazy(() => withTimeout(() => trackImport('Module2Section3_6', () => import('@/pages/apprentice-courses/Module2Section3_6'))));
const Module2Section4_1 = lazy(() => withTimeout(() => trackImport('Module2Section4_1', () => import('@/pages/apprentice-courses/Module2Section4_1'))));
const Module2Section4_2 = lazy(() => withTimeout(() => trackImport('Module2Section4_2', () => import('@/pages/apprentice-courses/Module2Section4_2'))));
const Module2Section4_3 = lazy(() => withTimeout(() => trackImport('Module2Section4_3', () => import('@/pages/apprentice-courses/Module2Section4_3'))));
const Module2Section4_4 = lazy(() => withTimeout(() => trackImport('Module2Section4_4', () => import('@/pages/apprentice-courses/Module2Section4_4'))));
const Module2Section4_5 = lazy(() => withTimeout(() => trackImport('Module2Section4_5', () => import('@/pages/apprentice-courses/Module2Section4_5'))));
const Module2Section4_6 = lazy(() => withTimeout(() => trackImport('Module2Section4_6', () => import('@/pages/apprentice-courses/Module2Section4_6'))));
const Module2Section5_1 = lazy(() => withTimeout(() => trackImport('Module2Section5_1', () => import('@/pages/apprentice-courses/Module2Section5_1'))));
const Module2Section5_2 = lazy(() => withTimeout(() => trackImport('Module2Section5_2', () => import('@/pages/apprentice-courses/Module2Section5_2'))));
const Module2Section5_3 = lazy(() => withTimeout(() => trackImport('Module2Section5_3', () => import('@/pages/apprentice-courses/Module2Section5_3'))));
const Module2Section5_4 = lazy(() => withTimeout(() => trackImport('Module2Section5_4', () => import('@/pages/apprentice-courses/Module2Section5_4'))));
const Module2Section5_5 = lazy(() => withTimeout(() => trackImport('Module2Section5_5', () => import('@/pages/apprentice-courses/Module2Section5_5'))));
const Module2Section5_6 = lazy(() => withTimeout(() => trackImport('Module2Section5_6', () => import('@/pages/apprentice-courses/Module2Section5_6'))));
const Module2Section6_1 = lazy(() => withTimeout(() => trackImport('Module2Section6_1', () => import('@/pages/apprentice-courses/Module2Section6_1'))));
const Module2Section6_2 = lazy(() => withTimeout(() => trackImport('Module2Section6_2', () => import('@/pages/apprentice-courses/Module2Section6_2'))));
const Module2Section6_3 = lazy(() => withTimeout(() => trackImport('Module2Section6_3', () => import('@/pages/apprentice-courses/Module2Section6_3'))));
const Module2Section6_4 = lazy(() => withTimeout(() => trackImport('Module2Section6_4', () => import('@/pages/apprentice-courses/Module2Section6_4'))));
const Module2Section6_5 = lazy(() => withTimeout(() => trackImport('Module2Section6_5', () => import('@/pages/apprentice-courses/Module2Section6_5'))));
const Module2Section6_6 = lazy(() => withTimeout(() => trackImport('Module2Section6_6', () => import('@/pages/apprentice-courses/Module2Section6_6'))));
const Module3 = lazy(() => withTimeout(() => trackImport('Module3', () => import('@/pages/apprentice-courses/Module3'))));
const Module3Section1 = lazy(() => withTimeout(() => trackImport('Module3Section1', () => import('@/pages/apprentice-courses/Module3Section1'))));
const Module3Section1_1 = lazy(() => withTimeout(() => trackImport('Module3Section1_1', () => import('@/pages/apprentice-courses/Module3Section1_1'))));
const Module3Section1_2 = lazy(() => withTimeout(() => trackImport('Module3Section1_2', () => import('@/pages/apprentice-courses/Module3Section1_2'))));
const Module3Section1_3 = lazy(() => withTimeout(() => trackImport('Module3Section1_3', () => import('@/pages/apprentice-courses/Module3Section1_3'))));
const Module3Section1_4 = lazy(() => withTimeout(() => trackImport('Module3Section1_4', () => import('@/pages/apprentice-courses/Module3Section1_4'))));
const Module3Section1_5 = lazy(() => withTimeout(() => trackImport('Module3Section1_5', () => import('@/pages/apprentice-courses/Module3Section1_5'))));
const Module3Section1_6 = lazy(() => withTimeout(() => trackImport('Module3Section1_6', () => import('@/pages/apprentice-courses/Module3Section1_6'))));
const Module3Section1_7 = lazy(() => withTimeout(() => trackImport('Module3Section1_7', () => import('@/pages/apprentice-courses/Module3Section1_7'))));
const Module3Section2 = lazy(() => withTimeout(() => trackImport('Module3Section2', () => import('@/pages/apprentice-courses/Module3Section2'))));
const Module3Section2_1 = lazy(() => withTimeout(() => trackImport('Module3Section2_1', () => import('@/pages/apprentice-courses/Module3Section2_1'))));
const Module3Section2_2 = lazy(() => withTimeout(() => trackImport('Module3Section2_2', () => import('@/pages/apprentice-courses/Module3Section2_2'))));
const Module3Section2_3 = lazy(() => withTimeout(() => trackImport('Module3Section2_3', () => import('@/pages/apprentice-courses/Module3Section2_3'))));
const Module3Section2_4 = lazy(() => withTimeout(() => trackImport('Module3Section2_4', () => import('@/pages/apprentice-courses/Module3Section2_4'))));
const Module3Section2_5 = lazy(() => withTimeout(() => trackImport('Module3Section2_5', () => import('@/pages/apprentice-courses/Module3Section2_5'))));
const Module3Section2_6 = lazy(() => withTimeout(() => trackImport('Module3Section2_6', () => import('@/pages/apprentice-courses/Module3Section2_6'))));
const Module3Section2_7 = lazy(() => withTimeout(() => trackImport('Module3Section2_7', () => import('@/pages/apprentice-courses/Module3Section2_7'))));
const Module3Section3 = lazy(() => withTimeout(() => trackImport('Module3Section3', () => import('@/pages/apprentice-courses/Module3Section3'))));
const Module3Section3_1 = lazy(() => withTimeout(() => trackImport('Module3Section3_1', () => import('@/pages/apprentice-courses/Module3Section3_1'))));
const Module3Section3_2 = lazy(() => withTimeout(() => trackImport('Module3Section3_2', () => import('@/pages/apprentice-courses/Module3Section3_2'))));
const Module3Section3_3 = lazy(() => withTimeout(() => trackImport('Module3Section3_3', () => import('@/pages/apprentice-courses/Module3Section3_3'))));
const Module3Section3_4 = lazy(() => withTimeout(() => trackImport('Module3Section3_4', () => import('@/pages/apprentice-courses/Module3Section3_4'))));
const Module3Section3_5 = lazy(() => withTimeout(() => trackImport('Module3Section3_5', () => import('@/pages/apprentice-courses/Module3Section3_5'))));
const Module3Section3_6 = lazy(() => withTimeout(() => trackImport('Module3Section3_6', () => import('@/pages/apprentice-courses/Module3Section3_6'))));
const Module3Section4 = lazy(() => withTimeout(() => trackImport('Module3Section4', () => import('@/pages/apprentice-courses/Module3Section4'))));
const Module3Section4_1 = lazy(() => withTimeout(() => trackImport('Module3Section4_1', () => import('@/pages/apprentice-courses/Module3Section4_1'))));
const Module3Section4_2 = lazy(() => withTimeout(() => trackImport('Module3Section4_2', () => import('@/pages/apprentice-courses/Module3Section4_2'))));
const Module3Section4_3 = lazy(() => withTimeout(() => trackImport('Module3Section4_3', () => import('@/pages/apprentice-courses/Module3Section4_3'))));
const Module3Section4_4 = lazy(() => withTimeout(() => trackImport('Module3Section4_4', () => import('@/pages/apprentice-courses/Module3Section4_4'))));
const Module3Section4_5 = lazy(() => withTimeout(() => trackImport('Module3Section4_5', () => import('@/pages/apprentice-courses/Module3Section4_5'))));
const Module3Section4_6 = lazy(() => withTimeout(() => trackImport('Module3Section4_6', () => import('@/pages/apprentice-courses/Module3Section4_6'))));
const Module3Section5 = lazy(() => withTimeout(() => trackImport('Module3Section5', () => import('@/pages/apprentice-courses/Module3Section5'))));
const Module3Section5_1 = lazy(() => withTimeout(() => trackImport('Module3Section5_1', () => import('@/pages/apprentice-courses/Module3Section5_1'))));
const Module3Section5_2 = lazy(() => withTimeout(() => trackImport('Module3Section5_2', () => import('@/pages/apprentice-courses/Module3Section5_2'))));
const Module3Section5_3 = lazy(() => withTimeout(() => trackImport('Module3Section5_3', () => import('@/pages/apprentice-courses/Module3Section5_3'))));
const Module3Section5_4 = lazy(() => withTimeout(() => trackImport('Module3Section5_4', () => import('@/pages/apprentice-courses/Module3Section5_4'))));
const Module3Section5_5 = lazy(() => withTimeout(() => trackImport('Module3Section5_5', () => import('@/pages/apprentice-courses/Module3Section5_5'))));
const Module3Section6 = lazy(() => withTimeout(() => trackImport('Module3Section6', () => import('@/pages/apprentice-courses/Module3Section6'))));
const Module3Section6_1 = lazy(() => withTimeout(() => trackImport('Module3Section6_1', () => import('@/pages/apprentice-courses/Module3Section6_1'))));
const Module3Section6_2 = lazy(() => withTimeout(() => trackImport('Module3Section6_2', () => import('@/pages/apprentice-courses/Module3Section6_2'))));
const Module3Section6_3 = lazy(() => withTimeout(() => trackImport('Module3Section6_3', () => import('@/pages/apprentice-courses/Module3Section6_3'))));
const Module3Section6_4 = lazy(() => withTimeout(() => trackImport('Module3Section6_4', () => import('@/pages/apprentice-courses/Module3Section6_4'))));
const Module3Section6_5 = lazy(() => withTimeout(() => trackImport('Module3Section6_5', () => import('@/pages/apprentice-courses/Module3Section6_5'))));
const Module3Section6_6 = lazy(() => withTimeout(() => trackImport('Module3Section6_6', () => import('@/pages/apprentice-courses/Module3Section6_6'))));
const Module4 = lazy(() => withTimeout(() => trackImport('Module4', () => import('@/pages/apprentice-courses/Module4'))));
const Module4Section1 = lazy(() => withTimeout(() => trackImport('Module4Section1', () => import('@/pages/apprentice-courses/Module4Section1'))));
const Module4Section1_1 = lazy(() => withTimeout(() => trackImport('Module4Section1_1', () => import('@/pages/apprentice-courses/Module4Section1_1'))));
const Module4Section1_2 = lazy(() => withTimeout(() => trackImport('Module4Section1_2', () => import('@/pages/apprentice-courses/Module4Section1_2'))));
const Module4Section1_3 = lazy(() => withTimeout(() => trackImport('Module4Section1_3', () => import('@/pages/apprentice-courses/Module4Section1_3'))));
const Module4Section1_4 = lazy(() => withTimeout(() => trackImport('Module4Section1_4', () => import('@/pages/apprentice-courses/Module4Section1_4'))));
const Module4Section1_5 = lazy(() => withTimeout(() => trackImport('Module4Section1_5', () => import('@/pages/apprentice-courses/Module4Section1_5'))));
const Module4Section2 = lazy(() => withTimeout(() => trackImport('Module4Section2', () => import('@/pages/apprentice-courses/Module4Section2'))));
const Module4Section2_1 = lazy(() => withTimeout(() => trackImport('Module4Section2_1', () => import('@/pages/apprentice-courses/Module4Section2_1'))));
const Module4Section2_2 = lazy(() => withTimeout(() => trackImport('Module4Section2_2', () => import('@/pages/apprentice-courses/Module4Section2_2'))));
const Module4Section2_3 = lazy(() => withTimeout(() => trackImport('Module4Section2_3', () => import('@/pages/apprentice-courses/Module4Section2_3'))));
const Module4Section2_4 = lazy(() => withTimeout(() => trackImport('Module4Section2_4', () => import('@/pages/apprentice-courses/Module4Section2_4'))));
const Module4Section3 = lazy(() => withTimeout(() => trackImport('Module4Section3', () => import('@/pages/apprentice-courses/Module4Section3'))));
const Module4Section3_1 = lazy(() => withTimeout(() => trackImport('Module4Section3_1', () => import('@/pages/apprentice-courses/Module4Section3_1'))));
const Module4Section3_2 = lazy(() => withTimeout(() => trackImport('Module4Section3_2', () => import('@/pages/apprentice-courses/Module4Section3_2'))));
const Module4Section3_3 = lazy(() => withTimeout(() => trackImport('Module4Section3_3', () => import('@/pages/apprentice-courses/Module4Section3_3'))));
const Module4Section3_4 = lazy(() => withTimeout(() => trackImport('Module4Section3_4', () => import('@/pages/apprentice-courses/Module4Section3_4'))));
const Module4Section3_5 = lazy(() => withTimeout(() => trackImport('Module4Section3_5', () => import('@/pages/apprentice-courses/Module4Section3_5'))));
const Module4Section4 = lazy(() => withTimeout(() => trackImport('Module4Section4', () => import('@/pages/apprentice-courses/Module4Section4'))));
const Module4Section4_1 = lazy(() => withTimeout(() => trackImport('Module4Section4_1', () => import('@/pages/apprentice-courses/Module4Section4_1'))));
const Module4Section4_2 = lazy(() => withTimeout(() => trackImport('Module4Section4_2', () => import('@/pages/apprentice-courses/Module4Section4_2'))));
const Module4Section4_3 = lazy(() => withTimeout(() => trackImport('Module4Section4_3', () => import('@/pages/apprentice-courses/Module4Section4_3'))));
const Module4Section4_4 = lazy(() => withTimeout(() => trackImport('Module4Section4_4', () => import('@/pages/apprentice-courses/Module4Section4_4'))));
const Module4Section4_5 = lazy(() => withTimeout(() => trackImport('Module4Section4_5', () => import('@/pages/apprentice-courses/Module4Section4_5'))));
const Module4Section4_6 = lazy(() => withTimeout(() => trackImport('Module4Section4_6', () => import('@/pages/apprentice-courses/Module4Section4_6'))));
const Module4Section4_7 = lazy(() => withTimeout(() => trackImport('Module4Section4_7', () => import('@/pages/apprentice-courses/Module4Section4_7'))));
const Module4Section5 = lazy(() => withTimeout(() => trackImport('Module4Section5', () => import('@/pages/apprentice-courses/Module4Section5'))));
const Module4Section5_1 = lazy(() => withTimeout(() => trackImport('Module4Section5_1', () => import('@/pages/apprentice-courses/Module4Section5_1'))));
const Module4Section5_2 = lazy(() => withTimeout(() => trackImport('Module4Section5_2', () => import('@/pages/apprentice-courses/Module4Section5_2'))));
const Module4Section5_3 = lazy(() => withTimeout(() => trackImport('Module4Section5_3', () => import('@/pages/apprentice-courses/Module4Section5_3'))));
const Module4Section5_4 = lazy(() => withTimeout(() => trackImport('Module4Section5_4', () => import('@/pages/apprentice-courses/Module4Section5_4'))));
const Module4Section5_5 = lazy(() => withTimeout(() => trackImport('Module4Section5_5', () => import('@/pages/apprentice-courses/Module4Section5_5'))));
const Module4Section5_6 = lazy(() => withTimeout(() => trackImport('Module4Section5_6', () => import('@/pages/apprentice-courses/Module4Section5_6'))));
const Module4Section5_7 = lazy(() => withTimeout(() => trackImport('Module4Section5_7', () => import('@/pages/apprentice-courses/Module4Section5_7'))));
const Module4Section5_8 = lazy(() => withTimeout(() => trackImport('Module4Section5_8', () => import('@/pages/apprentice-courses/Module4Section5_8'))));
const Module4Section6 = lazy(() => withTimeout(() => trackImport('Module4Section6', () => import('@/pages/apprentice-courses/Module4Section6'))));
const Module4Section6_1 = lazy(() => withTimeout(() => trackImport('Module4Section6_1', () => import('@/pages/apprentice-courses/Module4Section6_1'))));
const Module4Section6_2 = lazy(() => withTimeout(() => trackImport('Module4Section6_2', () => import('@/pages/apprentice-courses/Module4Section6_2'))));
const Module4Section6_3 = lazy(() => withTimeout(() => trackImport('Module4Section6_3', () => import('@/pages/apprentice-courses/Module4Section6_3'))));
const Module4Section6_4 = lazy(() => withTimeout(() => trackImport('Module4Section6_4', () => import('@/pages/apprentice-courses/Module4Section6_4'))));
const Module4Section6_5 = lazy(() => withTimeout(() => trackImport('Module4Section6_5', () => import('@/pages/apprentice-courses/Module4Section6_5'))));
const Module4Section6_6 = lazy(() => withTimeout(() => trackImport('Module4Section6_6', () => import('@/pages/apprentice-courses/Module4Section6_6'))));
const Module4Section7 = lazy(() => withTimeout(() => trackImport('Module4Section7', () => import('@/pages/apprentice-courses/Module4Section7'))));
const Module4Section7_1 = lazy(() => withTimeout(() => trackImport('Module4Section7_1', () => import('@/pages/apprentice-courses/Module4Section7_1'))));
const Module4Section7_2 = lazy(() => withTimeout(() => trackImport('Module4Section7_2', () => import('@/pages/apprentice-courses/Module4Section7_2'))));
const Module4Section7_3 = lazy(() => withTimeout(() => trackImport('Module4Section7_3', () => import('@/pages/apprentice-courses/Module4Section7_3'))));
const Module4Section7_4 = lazy(() => withTimeout(() => trackImport('Module4Section7_4', () => import('@/pages/apprentice-courses/Module4Section7_4'))));
const Module4Section7_5 = lazy(() => withTimeout(() => trackImport('Module4Section7_5', () => import('@/pages/apprentice-courses/Module4Section7_5'))));
const Module5 = lazy(() => withTimeout(() => trackImport('Module5', () => import('@/pages/apprentice-courses/Module5'))));
const Module5Section1 = lazy(() => withTimeout(() => trackImport('Module5Section1', () => import('@/pages/apprentice-courses/Module5Section1'))));
const Module5Section1_1 = lazy(() => withTimeout(() => trackImport('Module5Section1_1', () => import('@/pages/apprentice-courses/Module5Section1_1'))));
const Module5Section1_2 = lazy(() => withTimeout(() => trackImport('Module5Section1_2', () => import('@/pages/apprentice-courses/Module5Section1_2'))));
const Module5Section1_3 = lazy(() => withTimeout(() => trackImport('Module5Section1_3', () => import('@/pages/apprentice-courses/Module5Section1_3'))));
const Module5Section1_4 = lazy(() => withTimeout(() => trackImport('Module5Section1_4', () => import('@/pages/apprentice-courses/Module5Section1_4'))));
const Module5Section1_5 = lazy(() => withTimeout(() => trackImport('Module5Section1_5', () => import('@/pages/apprentice-courses/Module5Section1_5'))));
const Module5Section1_6 = lazy(() => withTimeout(() => trackImport('Module5Section1_6', () => import('@/pages/apprentice-courses/Module5Section1_6'))));
const Module5Section2 = lazy(() => withTimeout(() => trackImport('Module5Section2', () => import('@/pages/apprentice-courses/Module5Section2'))));
const Module5Section2_1 = lazy(() => withTimeout(() => trackImport('Module5Section2_1', () => import('@/pages/apprentice-courses/Module5Section2_1'))));
const Module5Section2_2 = lazy(() => withTimeout(() => trackImport('Module5Section2_2', () => import('@/pages/apprentice-courses/Module5Section2_2'))));
const Module5Section2_3 = lazy(() => withTimeout(() => trackImport('Module5Section2_3', () => import('@/pages/apprentice-courses/Module5Section2_3'))));
const Module5Section2_4 = lazy(() => withTimeout(() => trackImport('Module5Section2_4', () => import('@/pages/apprentice-courses/Module5Section2_4'))));
const Module5Section2_5 = lazy(() => withTimeout(() => trackImport('Module5Section2_5', () => import('@/pages/apprentice-courses/Module5Section2_5'))));
const Module5Section3 = lazy(() => withTimeout(() => trackImport('Module5Section3', () => import('@/pages/apprentice-courses/Module5Section3'))));
const Module5Section3_1 = lazy(() => withTimeout(() => trackImport('Module5Section3_1', () => import('@/pages/apprentice-courses/Module5Section3_1'))));
const Module5Section3_2 = lazy(() => withTimeout(() => trackImport('Module5Section3_2', () => import('@/pages/apprentice-courses/Module5Section3_2'))));
const Module5Section3_3 = lazy(() => withTimeout(() => trackImport('Module5Section3_3', () => import('@/pages/apprentice-courses/Module5Section3_3'))));
const Module5Section3_4 = lazy(() => withTimeout(() => trackImport('Module5Section3_4', () => import('@/pages/apprentice-courses/Module5Section3_4'))));
const Module5Section3_5 = lazy(() => withTimeout(() => trackImport('Module5Section3_5', () => import('@/pages/apprentice-courses/Module5Section3_5'))));
const Module5Section3_6 = lazy(() => withTimeout(() => trackImport('Module5Section3_6', () => import('@/pages/apprentice-courses/Module5Section3_6'))));
const Module5Section4 = lazy(() => withTimeout(() => trackImport('Module5Section4', () => import('@/pages/apprentice-courses/Module5Section4'))));
const Module5Section4_1 = lazy(() => withTimeout(() => trackImport('Module5Section4_1', () => import('@/pages/apprentice-courses/Module5Section4_1'))));
const Module5Section4_2 = lazy(() => withTimeout(() => trackImport('Module5Section4_2', () => import('@/pages/apprentice-courses/Module5Section4_2'))));
const Module5Section4_3 = lazy(() => withTimeout(() => trackImport('Module5Section4_3', () => import('@/pages/apprentice-courses/Module5Section4_3'))));
const Module5Section4_4 = lazy(() => withTimeout(() => trackImport('Module5Section4_4', () => import('@/pages/apprentice-courses/Module5Section4_4'))));
const Module5Section4_5 = lazy(() => withTimeout(() => trackImport('Module5Section4_5', () => import('@/pages/apprentice-courses/Module5Section4_5'))));
const Module5Section5 = lazy(() => withTimeout(() => trackImport('Module5Section5', () => import('@/pages/apprentice-courses/Module5Section5'))));
const Module5Section5_1 = lazy(() => withTimeout(() => trackImport('Module5Section5_1', () => import('@/pages/apprentice-courses/Module5Section5_1'))));
const Module5Section5_2 = lazy(() => withTimeout(() => trackImport('Module5Section5_2', () => import('@/pages/apprentice-courses/Module5Section5_2'))));
const Module5Section5_3 = lazy(() => withTimeout(() => trackImport('Module5Section5_3', () => import('@/pages/apprentice-courses/Module5Section5_3'))));
const Module5Section5_4 = lazy(() => withTimeout(() => trackImport('Module5Section5_4', () => import('@/pages/apprentice-courses/Module5Section5_4'))));
const Module5Section5_5 = lazy(() => withTimeout(() => trackImport('Module5Section5_5', () => import('@/pages/apprentice-courses/Module5Section5_5'))));
const Module5Section6 = lazy(() => withTimeout(() => trackImport('Module5Section6', () => import('@/pages/apprentice-courses/Module5Section6'))));
const Module5Section6_1 = lazy(() => withTimeout(() => trackImport('Module5Section6_1', () => import('@/pages/apprentice-courses/Module5Section6_1'))));
const Module5Section6_2 = lazy(() => withTimeout(() => trackImport('Module5Section6_2', () => import('@/pages/apprentice-courses/Module5Section6_2'))));
const Module5Section6_3 = lazy(() => withTimeout(() => trackImport('Module5Section6_3', () => import('@/pages/apprentice-courses/Module5Section6_3'))));
const Module5Section6_4 = lazy(() => withTimeout(() => trackImport('Module5Section6_4', () => import('@/pages/apprentice-courses/Module5Section6_4'))));
const Module5Section7 = lazy(() => withTimeout(() => trackImport('Module5Section7', () => import('@/pages/apprentice-courses/Module5Section7'))));
const Module5Section7_1 = lazy(() => withTimeout(() => trackImport('Module5Section7_1', () => import('@/pages/apprentice-courses/Module5Section7_1'))));
const Module5Section7_2 = lazy(() => withTimeout(() => trackImport('Module5Section7_2', () => import('@/pages/apprentice-courses/Module5Section7_2'))));
const Module5Section7_3 = lazy(() => withTimeout(() => trackImport('Module5Section7_3', () => import('@/pages/apprentice-courses/Module5Section7_3'))));
const Module5Section7_4 = lazy(() => withTimeout(() => trackImport('Module5Section7_4', () => import('@/pages/apprentice-courses/Module5Section7_4'))));
const Module5Section7_5 = lazy(() => withTimeout(() => trackImport('Module5Section7_5', () => import('@/pages/apprentice-courses/Module5Section7_5'))));
const Module6 = lazy(() => withTimeout(() => trackImport('Module6', () => import('@/pages/apprentice-courses/Module6'))));
const Module6Section1 = lazy(() => withTimeout(() => trackImport('Module6Section1', () => import('@/pages/apprentice-courses/Module6Section1'))));
const Module6Section1_1 = lazy(() => withTimeout(() => trackImport('Module6Section1_1', () => import('@/pages/apprentice-courses/Module6Section1_1'))));
const Module6Section1_2 = lazy(() => withTimeout(() => trackImport('Module6Section1_2', () => import('@/pages/apprentice-courses/Module6Section1_2'))));
const Module6Section1_3 = lazy(() => withTimeout(() => trackImport('Module6Section1_3', () => import('@/pages/apprentice-courses/Module6Section1_3'))));
const Module6Section1_4 = lazy(() => withTimeout(() => trackImport('Module6Section1_4', () => import('@/pages/apprentice-courses/Module6Section1_4'))));
const Module6Section1_5 = lazy(() => withTimeout(() => trackImport('Module6Section1_5', () => import('@/pages/apprentice-courses/Module6Section1_5'))));
const Module6Section2 = lazy(() => withTimeout(() => trackImport('Module6Section2', () => import('@/pages/apprentice-courses/Module6Section2'))));
const Module6Section2_1 = lazy(() => withTimeout(() => trackImport('Module6Section2_1', () => import('@/pages/apprentice-courses/Module6Section2_1'))));
const Module6Section2_2 = lazy(() => withTimeout(() => trackImport('Module6Section2_2', () => import('@/pages/apprentice-courses/Module6Section2_2'))));
const Module6Section2_3 = lazy(() => withTimeout(() => trackImport('Module6Section2_3', () => import('@/pages/apprentice-courses/Module6Section2_3'))));
const Module6Section2_4 = lazy(() => withTimeout(() => trackImport('Module6Section2_4', () => import('@/pages/apprentice-courses/Module6Section2_4'))));
const Module6Section2_5 = lazy(() => withTimeout(() => trackImport('Module6Section2_5', () => import('@/pages/apprentice-courses/Module6Section2_5'))));
const Module6Section2_6 = lazy(() => withTimeout(() => trackImport('Module6Section2_6', () => import('@/pages/apprentice-courses/Module6Section2_6'))));
const Module6Section3 = lazy(() => withTimeout(() => trackImport('Module6Section3', () => import('@/pages/apprentice-courses/Module6Section3'))));
const Module6Section3_1 = lazy(() => withTimeout(() => trackImport('Module6Section3_1', () => import('@/pages/apprentice-courses/Module6Section3_1'))));
const Module6Section3_2 = lazy(() => withTimeout(() => trackImport('Module6Section3_2', () => import('@/pages/apprentice-courses/Module6Section3_2'))));
const Module6Section3_3 = lazy(() => withTimeout(() => trackImport('Module6Section3_3', () => import('@/pages/apprentice-courses/Module6Section3_3'))));
const Module6Section3_4 = lazy(() => withTimeout(() => trackImport('Module6Section3_4', () => import('@/pages/apprentice-courses/Module6Section3_4'))));
const Module6Section3_5 = lazy(() => withTimeout(() => trackImport('Module6Section3_5', () => import('@/pages/apprentice-courses/Module6Section3_5'))));
const Module6Section3_6 = lazy(() => withTimeout(() => trackImport('Module6Section3_6', () => import('@/pages/apprentice-courses/Module6Section3_6'))));
const Module6Section4 = lazy(() => withTimeout(() => trackImport('Module6Section4', () => import('@/pages/apprentice-courses/Module6Section4'))));
const Module6Section4_1 = lazy(() => withTimeout(() => trackImport('Module6Section4_1', () => import('@/pages/apprentice-courses/Module6Section4_1'))));
const Module6Section4_2 = lazy(() => withTimeout(() => trackImport('Module6Section4_2', () => import('@/pages/apprentice-courses/Module6Section4_2'))));
const Module6Section4_3 = lazy(() => withTimeout(() => trackImport('Module6Section4_3', () => import('@/pages/apprentice-courses/Module6Section4_3'))));
const Module6Section4_4 = lazy(() => withTimeout(() => trackImport('Module6Section4_4', () => import('@/pages/apprentice-courses/Module6Section4_4'))));
const Module6Section4_5 = lazy(() => withTimeout(() => trackImport('Module6Section4_5', () => import('@/pages/apprentice-courses/Module6Section4_5'))));
const Module6Section5 = lazy(() => withTimeout(() => trackImport('Module6Section5', () => import('@/pages/apprentice-courses/Module6Section5'))));
const Module6Section5_1 = lazy(() => withTimeout(() => trackImport('Module6Section5_1', () => import('@/pages/apprentice-courses/Module6Section5_1'))));
const Module6Section5_2 = lazy(() => withTimeout(() => trackImport('Module6Section5_2', () => import('@/pages/apprentice-courses/Module6Section5_2'))));
const Module6Section5_3 = lazy(() => withTimeout(() => trackImport('Module6Section5_3', () => import('@/pages/apprentice-courses/Module6Section5_3'))));
const Module6Section5_4 = lazy(() => withTimeout(() => trackImport('Module6Section5_4', () => import('@/pages/apprentice-courses/Module6Section5_4'))));
const Module6Section6 = lazy(() => withTimeout(() => trackImport('Module6Section6', () => import('@/pages/apprentice-courses/Module6Section6'))));
const Module6Section7 = lazy(() => withTimeout(() => trackImport('Module6Section7', () => import('@/pages/apprentice-courses/Module6Section7'))));
const Module6Section7_1 = lazy(() => withTimeout(() => trackImport('Module6Section7_1', () => import('@/pages/apprentice-courses/Module6Section7_1'))));
const Module6Section7_2 = lazy(() => withTimeout(() => trackImport('Module6Section7_2', () => import('@/pages/apprentice-courses/Module6Section7_2'))));
const Module6Section7_3 = lazy(() => withTimeout(() => trackImport('Module6Section7_3', () => import('@/pages/apprentice-courses/Module6Section7_3'))));
const Module6Section7_4 = lazy(() => withTimeout(() => trackImport('Module6Section7_4', () => import('@/pages/apprentice-courses/Module6Section7_4'))));
const Module7 = lazy(() => withTimeout(() => trackImport('Module7', () => import('@/pages/apprentice-courses/Module7'))));
const Module7Section1 = lazy(() => withTimeout(() => trackImport('Module7Section1', () => import('@/pages/apprentice-courses/Module7Section1'))));
const Module7Section1_1 = lazy(() => withTimeout(() => trackImport('Module7Section1_1', () => import('@/pages/apprentice-courses/Module7Section1_1'))));
const Module7Section1_2 = lazy(() => withTimeout(() => trackImport('Module7Section1_2', () => import('@/pages/apprentice-courses/Module7Section1_2'))));
const Module7Section1_3 = lazy(() => withTimeout(() => trackImport('Module7Section1_3', () => import('@/pages/apprentice-courses/Module7Section1_3'))));
const Module7Section1_4 = lazy(() => withTimeout(() => trackImport('Module7Section1_4', () => import('@/pages/apprentice-courses/Module7Section1_4'))));
const Module7Section1_5 = lazy(() => withTimeout(() => trackImport('Module7Section1_5', () => import('@/pages/apprentice-courses/Module7Section1_5'))));
const Module7Section2 = lazy(() => withTimeout(() => trackImport('Module7Section2', () => import('@/pages/apprentice-courses/Module7Section2'))));
const Module7Section2_1 = lazy(() => withTimeout(() => trackImport('Module7Section2_1', () => import('@/pages/apprentice-courses/Module7Section2_1'))));
const Module7Section2_2 = lazy(() => withTimeout(() => trackImport('Module7Section2_2', () => import('@/pages/apprentice-courses/Module7Section2_2'))));
const Module7Section2_3 = lazy(() => withTimeout(() => trackImport('Module7Section2_3', () => import('@/pages/apprentice-courses/Module7Section2_3'))));
const Module7Section2_4 = lazy(() => withTimeout(() => trackImport('Module7Section2_4', () => import('@/pages/apprentice-courses/Module7Section2_4'))));
const Module7Section2_5 = lazy(() => withTimeout(() => trackImport('Module7Section2_5', () => import('@/pages/apprentice-courses/Module7Section2_5'))));
const Module7Section2_6 = lazy(() => withTimeout(() => trackImport('Module7Section2_6', () => import('@/pages/apprentice-courses/Module7Section2_6'))));
const Module7Section3 = lazy(() => withTimeout(() => trackImport('Module7Section3', () => import('@/pages/apprentice-courses/Module7Section3'))));
const Module7Section3_1 = lazy(() => withTimeout(() => trackImport('Module7Section3_1', () => import('@/pages/apprentice-courses/Module7Section3_1'))));
const Module7Section3_2 = lazy(() => withTimeout(() => trackImport('Module7Section3_2', () => import('@/pages/apprentice-courses/Module7Section3_2'))));
const Module7Section3_3 = lazy(() => withTimeout(() => trackImport('Module7Section3_3', () => import('@/pages/apprentice-courses/Module7Section3_3'))));
const Module7Section3_4 = lazy(() => withTimeout(() => trackImport('Module7Section3_4', () => import('@/pages/apprentice-courses/Module7Section3_4'))));
const Module7Section3_5 = lazy(() => withTimeout(() => trackImport('Module7Section3_5', () => import('@/pages/apprentice-courses/Module7Section3_5'))));
const Module7Section4 = lazy(() => withTimeout(() => trackImport('Module7Section4', () => import('@/pages/apprentice-courses/Module7Section4'))));
const Module7Section4_1 = lazy(() => withTimeout(() => trackImport('Module7Section4_1', () => import('@/pages/apprentice-courses/Module7Section4_1'))));
const Module7Section4_2 = lazy(() => withTimeout(() => trackImport('Module7Section4_2', () => import('@/pages/apprentice-courses/Module7Section4_2'))));
const Module7Section4_3 = lazy(() => withTimeout(() => trackImport('Module7Section4_3', () => import('@/pages/apprentice-courses/Module7Section4_3'))));
const Module7Section4_4 = lazy(() => withTimeout(() => trackImport('Module7Section4_4', () => import('@/pages/apprentice-courses/Module7Section4_4'))));
const Module7Section4_5 = lazy(() => withTimeout(() => trackImport('Module7Section4_5', () => import('@/pages/apprentice-courses/Module7Section4_5'))));
const Module7Section4_6 = lazy(() => withTimeout(() => trackImport('Module7Section4_6', () => import('@/pages/apprentice-courses/Module7Section4_6'))));
const Module7Section5 = lazy(() => withTimeout(() => trackImport('Module7Section5', () => import('@/pages/apprentice-courses/Module7Section5'))));
const Module7Section5_1 = lazy(() => withTimeout(() => trackImport('Module7Section5_1', () => import('@/pages/apprentice-courses/Module7Section5_1'))));
const Module7Section5_2 = lazy(() => withTimeout(() => trackImport('Module7Section5_2', () => import('@/pages/apprentice-courses/Module7Section5_2'))));
const Module7Section5_3 = lazy(() => withTimeout(() => trackImport('Module7Section5_3', () => import('@/pages/apprentice-courses/Module7Section5_3'))));
const Module7Section5_4 = lazy(() => withTimeout(() => trackImport('Module7Section5_4', () => import('@/pages/apprentice-courses/Module7Section5_4'))));
const Module7Section5_5 = lazy(() => withTimeout(() => trackImport('Module7Section5_5', () => import('@/pages/apprentice-courses/Module7Section5_5'))));
const Module7Section6 = lazy(() => withTimeout(() => trackImport('Module7Section6', () => import('@/pages/apprentice-courses/Module7Section6'))));
const Module7Section6_1 = lazy(() => withTimeout(() => trackImport('Module7Section6_1', () => import('@/pages/apprentice-courses/Module7Section6_1'))));
const Module7Section6_2 = lazy(() => withTimeout(() => trackImport('Module7Section6_2', () => import('@/pages/apprentice-courses/Module7Section6_2'))));
const Module7Section6_3 = lazy(() => withTimeout(() => trackImport('Module7Section6_3', () => import('@/pages/apprentice-courses/Module7Section6_3'))));
const Module7Section6_4 = lazy(() => withTimeout(() => trackImport('Module7Section6_4', () => import('@/pages/apprentice-courses/Module7Section6_4'))));
const Module7Section6_5 = lazy(() => withTimeout(() => trackImport('Module7Section6_5', () => import('@/pages/apprentice-courses/Module7Section6_5'))));
const Module8 = lazy(() => withTimeout(() => trackImport('Module8', () => import('@/pages/apprentice-courses/Module8'))));
const MOET = lazy(() => withTimeout(() => trackImport('MOET', () => import('@/pages/apprentice-courses/MOET'))));
const MOETModule1 = lazy(() => withTimeout(() => trackImport('MOETModule1', () => import('@/pages/apprentice-courses/MOETModule1'))));
const MOETModule1Section1 = lazy(() => withTimeout(() => trackImport('MOETModule1Section1', () => import('@/pages/apprentice-courses/MOETModule1Section1'))));
const MOETModule1Section1_1 = lazy(() => withTimeout(() => trackImport('MOETModule1Section1_1', () => import('@/pages/apprentice-courses/MOETModule1Section1_1'))));
const MOETModule1Section2 = lazy(() => withTimeout(() => trackImport('MOETModule1Section2', () => import('@/pages/apprentice-courses/MOETModule1Section2'))));
const MOETModule1Section3 = lazy(() => withTimeout(() => trackImport('MOETModule1Section3', () => import('@/pages/apprentice-courses/MOETModule1Section3'))));
const MOETModule1Section4 = lazy(() => withTimeout(() => trackImport('MOETModule1Section4', () => import('@/pages/apprentice-courses/MOETModule1Section4'))));
const MOETModule1Section5 = lazy(() => withTimeout(() => trackImport('MOETModule1Section5', () => import('@/pages/apprentice-courses/MOETModule1Section5'))));
const MOETModule1Section6 = lazy(() => withTimeout(() => trackImport('MOETModule1Section6', () => import('@/pages/apprentice-courses/MOETModule1Section6'))));
const MOETModule2 = lazy(() => withTimeout(() => trackImport('MOETModule2', () => import('@/pages/apprentice-courses/MOETModule2'))));
const MOETModule2Section1 = lazy(() => withTimeout(() => trackImport('MOETModule2Section1', () => import('@/pages/apprentice-courses/MOETModule2Section1'))));
const MOETModule2Section1_1 = lazy(() => withTimeout(() => trackImport('MOETModule2Section1_1', () => import('@/pages/apprentice-courses/MOETModule2Section1_1'))));
const MOETModule2Section2 = lazy(() => withTimeout(() => trackImport('MOETModule2Section2', () => import('@/pages/apprentice-courses/MOETModule2Section2'))));
const MOETModule2Section3 = lazy(() => withTimeout(() => trackImport('MOETModule2Section3', () => import('@/pages/apprentice-courses/MOETModule2Section3'))));
const MOETModule2Section4 = lazy(() => withTimeout(() => trackImport('MOETModule2Section4', () => import('@/pages/apprentice-courses/MOETModule2Section4'))));
const MOETModule2Section5 = lazy(() => withTimeout(() => trackImport('MOETModule2Section5', () => import('@/pages/apprentice-courses/MOETModule2Section5'))));
const MOETModule3 = lazy(() => withTimeout(() => trackImport('MOETModule3', () => import('@/pages/apprentice-courses/MOETModule3'))));
const MOETModule3Section1 = lazy(() => withTimeout(() => trackImport('MOETModule3Section1', () => import('@/pages/apprentice-courses/MOETModule3Section1'))));
const MOETModule3Section1_1 = lazy(() => withTimeout(() => trackImport('MOETModule3Section1_1', () => import('@/pages/apprentice-courses/MOETModule3Section1_1'))));
const MOETModule3Section2 = lazy(() => withTimeout(() => trackImport('MOETModule3Section2', () => import('@/pages/apprentice-courses/MOETModule3Section2'))));
const MOETModule3Section3 = lazy(() => withTimeout(() => trackImport('MOETModule3Section3', () => import('@/pages/apprentice-courses/MOETModule3Section3'))));
const MOETModule3Section4 = lazy(() => withTimeout(() => trackImport('MOETModule3Section4', () => import('@/pages/apprentice-courses/MOETModule3Section4'))));
const MOETModule3Section5 = lazy(() => withTimeout(() => trackImport('MOETModule3Section5', () => import('@/pages/apprentice-courses/MOETModule3Section5'))));
const MOETModule3Section6 = lazy(() => withTimeout(() => trackImport('MOETModule3Section6', () => import('@/pages/apprentice-courses/MOETModule3Section6'))));
const MOETModule4 = lazy(() => withTimeout(() => trackImport('MOETModule4', () => import('@/pages/apprentice-courses/MOETModule4'))));
const MOETModule4Section1 = lazy(() => withTimeout(() => trackImport('MOETModule4Section1', () => import('@/pages/apprentice-courses/MOETModule4Section1'))));
const MOETModule4Section1_1 = lazy(() => withTimeout(() => trackImport('MOETModule4Section1_1', () => import('@/pages/apprentice-courses/MOETModule4Section1_1'))));
const MOETModule4Section2 = lazy(() => withTimeout(() => trackImport('MOETModule4Section2', () => import('@/pages/apprentice-courses/MOETModule4Section2'))));
const MOETModule4Section3 = lazy(() => withTimeout(() => trackImport('MOETModule4Section3', () => import('@/pages/apprentice-courses/MOETModule4Section3'))));
const MOETModule4Section4 = lazy(() => withTimeout(() => trackImport('MOETModule4Section4', () => import('@/pages/apprentice-courses/MOETModule4Section4'))));
const MOETModule4Section5 = lazy(() => withTimeout(() => trackImport('MOETModule4Section5', () => import('@/pages/apprentice-courses/MOETModule4Section5'))));
const MOETModule4Section6 = lazy(() => withTimeout(() => trackImport('MOETModule4Section6', () => import('@/pages/apprentice-courses/MOETModule4Section6'))));
const MOETModule4Section7 = lazy(() => withTimeout(() => trackImport('MOETModule4Section7', () => import('@/pages/apprentice-courses/MOETModule4Section7'))));
const MOETModule5 = lazy(() => withTimeout(() => trackImport('MOETModule5', () => import('@/pages/apprentice-courses/MOETModule5'))));
const MOETModule5Section1 = lazy(() => withTimeout(() => trackImport('MOETModule5Section1', () => import('@/pages/apprentice-courses/MOETModule5Section1'))));
const MOETModule5Section1_1 = lazy(() => withTimeout(() => trackImport('MOETModule5Section1_1', () => import('@/pages/apprentice-courses/MOETModule5Section1_1'))));
const MOETModule5Section2 = lazy(() => withTimeout(() => trackImport('MOETModule5Section2', () => import('@/pages/apprentice-courses/MOETModule5Section2'))));
const MOETModule5Section3 = lazy(() => withTimeout(() => trackImport('MOETModule5Section3', () => import('@/pages/apprentice-courses/MOETModule5Section3'))));
const MOETModule5Section4 = lazy(() => withTimeout(() => trackImport('MOETModule5Section4', () => import('@/pages/apprentice-courses/MOETModule5Section4'))));
const MOETModule5Section5 = lazy(() => withTimeout(() => trackImport('MOETModule5Section5', () => import('@/pages/apprentice-courses/MOETModule5Section5'))));
const MOETModule5Section6 = lazy(() => withTimeout(() => trackImport('MOETModule5Section6', () => import('@/pages/apprentice-courses/MOETModule5Section6'))));
const MOETModule6 = lazy(() => withTimeout(() => trackImport('MOETModule6', () => import('@/pages/apprentice-courses/MOETModule6'))));
const MOETModule6Section1 = lazy(() => withTimeout(() => trackImport('MOETModule6Section1', () => import('@/pages/apprentice-courses/MOETModule6Section1'))));
const MOETModule6Section1_1 = lazy(() => withTimeout(() => trackImport('MOETModule6Section1_1', () => import('@/pages/apprentice-courses/MOETModule6Section1_1'))));
const MOETModule6Section1_2 = lazy(() => withTimeout(() => trackImport('MOETModule6Section1_2', () => import('@/pages/apprentice-courses/MOETModule6Section1_2'))));
const MOETModule6Section2 = lazy(() => withTimeout(() => trackImport('MOETModule6Section2', () => import('@/pages/apprentice-courses/MOETModule6Section2'))));
const MOETModule6Section3 = lazy(() => withTimeout(() => trackImport('MOETModule6Section3', () => import('@/pages/apprentice-courses/MOETModule6Section3'))));
const MOETModule6Section4 = lazy(() => withTimeout(() => trackImport('MOETModule6Section4', () => import('@/pages/apprentice-courses/MOETModule6Section4'))));
const MOETModule7 = lazy(() => withTimeout(() => trackImport('MOETModule7', () => import('@/pages/apprentice-courses/MOETModule7'))));
const MOETModule7Section1 = lazy(() => withTimeout(() => trackImport('MOETModule7Section1', () => import('@/pages/apprentice-courses/MOETModule7Section1'))));
const MOETModule7Section1_1 = lazy(() => withTimeout(() => trackImport('MOETModule7Section1_1', () => import('@/pages/apprentice-courses/MOETModule7Section1_1'))));
const MOETModule7Section2 = lazy(() => withTimeout(() => trackImport('MOETModule7Section2', () => import('@/pages/apprentice-courses/MOETModule7Section2'))));
const MOETModule7Section3 = lazy(() => withTimeout(() => trackImport('MOETModule7Section3', () => import('@/pages/apprentice-courses/MOETModule7Section3'))));
const MOETModule7Section4 = lazy(() => withTimeout(() => trackImport('MOETModule7Section4', () => import('@/pages/apprentice-courses/MOETModule7Section4'))));
const MOETModule7Section5 = lazy(() => withTimeout(() => trackImport('MOETModule7Section5', () => import('@/pages/apprentice-courses/MOETModule7Section5'))));
const NotFound = lazy(() => withTimeout(() => trackImport('NotFound', () => import('@/pages/apprentice-courses/NotFound'))));
const Section1 = lazy(() => withTimeout(() => trackImport('Section1', () => import('@/pages/apprentice-courses/Section1'))));
const Section2 = lazy(() => withTimeout(() => trackImport('Section2', () => import('@/pages/apprentice-courses/Section2'))));
const Section2_1_ElectricShock = lazy(() => withTimeout(() => trackImport('Section2_1_ElectricShock', () => import('@/pages/apprentice-courses/Section2_1_ElectricShock'))));
const Section3 = lazy(() => withTimeout(() => trackImport('Section3', () => import('@/pages/apprentice-courses/Section3'))));
const Section4 = lazy(() => withTimeout(() => trackImport('Section4', () => import('@/pages/apprentice-courses/Section4'))));
const Section5 = lazy(() => withTimeout(() => trackImport('Section5', () => import('@/pages/apprentice-courses/Section5'))));
const Section6 = lazy(() => withTimeout(() => trackImport('Section6', () => import('@/pages/apprentice-courses/Section6'))));
const subsection1 = lazy(() => withTimeout(() => trackImport('subsection1', () => import('@/pages/apprentice-courses/subsection1'))));
const subsection10 = lazy(() => withTimeout(() => trackImport('subsection10', () => import('@/pages/apprentice-courses/subsection10'))));
const subsection11 = lazy(() => withTimeout(() => trackImport('subsection11', () => import('@/pages/apprentice-courses/subsection11'))));
const subsection12 = lazy(() => withTimeout(() => trackImport('subsection12', () => import('@/pages/apprentice-courses/subsection12'))));
const subsection13 = lazy(() => withTimeout(() => trackImport('subsection13', () => import('@/pages/apprentice-courses/subsection13'))));
const subsection14 = lazy(() => withTimeout(() => trackImport('subsection14', () => import('@/pages/apprentice-courses/subsection14'))));
const subsection15 = lazy(() => withTimeout(() => trackImport('subsection15', () => import('@/pages/apprentice-courses/subsection15'))));
const subsection16 = lazy(() => withTimeout(() => trackImport('subsection16', () => import('@/pages/apprentice-courses/subsection16'))));
const subsection17 = lazy(() => withTimeout(() => trackImport('subsection17', () => import('@/pages/apprentice-courses/subsection17'))));
const subsection18 = lazy(() => withTimeout(() => trackImport('subsection18', () => import('@/pages/apprentice-courses/subsection18'))));
const subsection19 = lazy(() => withTimeout(() => trackImport('subsection19', () => import('@/pages/apprentice-courses/subsection19'))));
const subsection2 = lazy(() => withTimeout(() => trackImport('subsection2', () => import('@/pages/apprentice-courses/subsection2'))));
const subsection20 = lazy(() => withTimeout(() => trackImport('subsection20', () => import('@/pages/apprentice-courses/subsection20'))));
const subsection21 = lazy(() => withTimeout(() => trackImport('subsection21', () => import('@/pages/apprentice-courses/subsection21'))));
const subsection22 = lazy(() => withTimeout(() => trackImport('subsection22', () => import('@/pages/apprentice-courses/subsection22'))));
const subsection23 = lazy(() => withTimeout(() => trackImport('subsection23', () => import('@/pages/apprentice-courses/subsection23'))));
const subsection24 = lazy(() => withTimeout(() => trackImport('subsection24', () => import('@/pages/apprentice-courses/subsection24'))));
const subsection25 = lazy(() => withTimeout(() => trackImport('subsection25', () => import('@/pages/apprentice-courses/subsection25'))));
const subsection26 = lazy(() => withTimeout(() => trackImport('subsection26', () => import('@/pages/apprentice-courses/subsection26'))));
const subsection27 = lazy(() => withTimeout(() => trackImport('subsection27', () => import('@/pages/apprentice-courses/subsection27'))));
const subsection28 = lazy(() => withTimeout(() => trackImport('subsection28', () => import('@/pages/apprentice-courses/subsection28'))));
const subsection29 = lazy(() => withTimeout(() => trackImport('subsection29', () => import('@/pages/apprentice-courses/subsection29'))));
const subsection3 = lazy(() => withTimeout(() => trackImport('subsection3', () => import('@/pages/apprentice-courses/subsection3'))));
const subsection30 = lazy(() => withTimeout(() => trackImport('subsection30', () => import('@/pages/apprentice-courses/subsection30'))));
const subsection31 = lazy(() => withTimeout(() => trackImport('subsection31', () => import('@/pages/apprentice-courses/subsection31'))));
const subsection32 = lazy(() => withTimeout(() => trackImport('subsection32', () => import('@/pages/apprentice-courses/subsection32'))));
const subsection33 = lazy(() => withTimeout(() => trackImport('subsection33', () => import('@/pages/apprentice-courses/subsection33'))));
const subsection34 = lazy(() => withTimeout(() => trackImport('subsection34', () => import('@/pages/apprentice-courses/subsection34'))));
const subsection4 = lazy(() => withTimeout(() => trackImport('subsection4', () => import('@/pages/apprentice-courses/subsection4'))));
const subsection5 = lazy(() => withTimeout(() => trackImport('subsection5', () => import('@/pages/apprentice-courses/subsection5'))));
const subsection6 = lazy(() => withTimeout(() => trackImport('subsection6', () => import('@/pages/apprentice-courses/subsection6'))));
const subsection7 = lazy(() => withTimeout(() => trackImport('subsection7', () => import('@/pages/apprentice-courses/subsection7'))));
const subsection8 = lazy(() => withTimeout(() => trackImport('subsection8', () => import('@/pages/apprentice-courses/subsection8'))));
const subsection9 = lazy(() => withTimeout(() => trackImport('subsection9', () => import('@/pages/apprentice-courses/subsection9'))));

export default function ApprenticeCourseRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="am2" element={<AM2 />} />
        {/* AM2 Module 1 */}
        <Route path="am2/module1" element={<AM2Module1 />} />
        <Route path="am2/module1/section1" element={<AM2Module1Section1 />} />
        <Route path="am2/module1/section2" element={<AM2Module1Section2 />} />
        <Route path="am2/module1/section3" element={<AM2Module1Section3 />} />
        <Route path="am2/module1/section4" element={<AM2Module1Section4 />} />
        {/* AM2 Module 2 */}
        <Route path="am2/module2" element={<AM2Module2 />} />
        <Route path="am2/module2/section1" element={<AM2Module2Section1 />} />
        <Route path="am2/module2/section2" element={<AM2Module2Section2 />} />
        <Route path="am2/module2/section3" element={<AM2Module2Section3 />} />
        <Route path="am2/module2/section4" element={<AM2Module2Section4 />} />
        <Route path="am2/module2/section5" element={<AM2Module2Section5 />} />
        {/* AM2 Module 3 */}
        <Route path="am2/module3" element={<AM2Module3 />} />
        <Route path="am2/module3/section1" element={<AM2Module3Section1 />} />
        <Route path="am2/module3/section2" element={<AM2Module3Section2 />} />
        <Route path="am2/module3/section3" element={<AM2Module3Section3 />} />
        <Route path="am2/module3/section4" element={<AM2Module3Section4 />} />
        <Route path="am2/module3/section5" element={<AM2Module3Section5 />} />
        <Route path="am2/module3/section6" element={<AM2Module3Section6 />} />
        {/* AM2 Module 4 */}
        <Route path="am2/module4" element={<AM2Module4 />} />
        <Route path="am2/module4/section1" element={<AM2Module4Section1 />} />
        <Route path="am2/module4/section2" element={<AM2Module4Section2 />} />
        <Route path="am2/module4/section3" element={<AM2Module4Section3 />} />
        <Route path="am2/module4/section4" element={<AM2Module4Section4 />} />
        <Route path="am2/module4/section5" element={<AM2Module4Section5 />} />
        <Route path="am2/module4/section6" element={<AM2Module4Section6 />} />
        {/* AM2 Module 5 */}
        <Route path="am2/module5" element={<AM2Module5 />} />
        <Route path="am2/module5/section1" element={<AM2Module5Section1 />} />
        <Route path="am2/module5/section2" element={<AM2Module5Section2 />} />
        <Route path="am2/module5/section3" element={<AM2Module5Section3 />} />
        <Route path="am2/module5/section4" element={<AM2Module5Section4 />} />
        <Route path="am2/module5/section5" element={<AM2Module5Section5 />} />
        <Route path="am2/module5/section6" element={<AM2Module5Section6 />} />
        {/* AM2 Module 6 */}
        <Route path="am2/module6" element={<AM2Module6 />} />
        <Route path="am2/module6/section1" element={<AM2Module6Section1 />} />
        <Route path="am2/module6/section2" element={<AM2Module6Section2 />} />
        <Route path="am2/module6/section3" element={<AM2Module6Section3 />} />
        <Route path="am2/module6/section4" element={<AM2Module6Section4 />} />
        {/* AM2 Module 7 */}
        <Route path="am2/module7" element={<AM2Module7 />} />
        <Route path="am2/module7/section1" element={<AM2Module7Section1 />} />
        <Route path="am2/module7/section2" element={<AM2Module7Section2 />} />
        <Route path="am2/module7/section3" element={<AM2Module7Section3 />} />
        <Route path="am2/module7/section4" element={<AM2Module7Section4 />} />
        {/* AM2 Module 8 */}
        <Route path="am2/module8" element={<AM2Module8 />} />
        <Route path="functional-skills" element={<FunctionalSkills />} />
        <Route path="hnc" element={<HNC />} />
        <Route path="h-n-c-module1" element={<HNCModule1 />} />
        <Route path="h-n-c-module1-section1" element={<HNCModule1Section1 />} />
        <Route path="h-n-c-module1-section2" element={<HNCModule1Section2 />} />
        <Route path="h-n-c-module1-section3" element={<HNCModule1Section3 />} />
        <Route path="h-n-c-module1-section4" element={<HNCModule1Section4 />} />
        <Route path="h-n-c-module2" element={<HNCModule2 />} />
        <Route path="h-n-c-module2-section1" element={<HNCModule2Section1 />} />
        <Route path="h-n-c-module2-section1-1" element={<HNCModule2Section1_1 />} />
        <Route path="h-n-c-module2-section1-2" element={<HNCModule2Section1_2 />} />
        <Route path="h-n-c-module2-section1-3" element={<HNCModule2Section1_3 />} />
        <Route path="h-n-c-module2-section1-4" element={<HNCModule2Section1_4 />} />
        <Route path="h-n-c-module2-section1-5" element={<HNCModule2Section1_5 />} />
        <Route path="h-n-c-module2-section1-6" element={<HNCModule2Section1_6 />} />
        <Route path="h-n-c-module2-section1-7" element={<HNCModule2Section1_7 />} />
        <Route path="h-n-c-module2-section2" element={<HNCModule2Section2 />} />
        <Route path="h-n-c-module2-section2-1" element={<HNCModule2Section2_1 />} />
        <Route path="h-n-c-module2-section2-2" element={<HNCModule2Section2_2 />} />
        <Route path="h-n-c-module2-section2-3" element={<HNCModule2Section2_3 />} />
        <Route path="h-n-c-module2-section2-4" element={<HNCModule2Section2_4 />} />
        <Route path="h-n-c-module2-section2-5" element={<HNCModule2Section2_5 />} />
        <Route path="h-n-c-module2-section2-6" element={<HNCModule2Section2_6 />} />
        <Route path="h-n-c-module2-section2-7" element={<HNCModule2Section2_7 />} />
        <Route path="h-n-c-module2-section3" element={<HNCModule2Section3 />} />
        <Route path="h-n-c-module2-section3-1" element={<HNCModule2Section3_1 />} />
        <Route path="h-n-c-module2-section3-2" element={<HNCModule2Section3_2 />} />
        <Route path="h-n-c-module2-section3-3" element={<HNCModule2Section3_3 />} />
        <Route path="h-n-c-module2-section3-4" element={<HNCModule2Section3_4 />} />
        <Route path="h-n-c-module2-section3-5" element={<HNCModule2Section3_5 />} />
        <Route path="h-n-c-module2-section3-6" element={<HNCModule2Section3_6 />} />
        <Route path="h-n-c-module2-section4" element={<HNCModule2Section4 />} />
        <Route path="h-n-c-module2-section4-1" element={<HNCModule2Section4_1 />} />
        <Route path="h-n-c-module2-section4-2" element={<HNCModule2Section4_2 />} />
        <Route path="h-n-c-module2-section4-3" element={<HNCModule2Section4_3 />} />
        <Route path="h-n-c-module2-section4-4" element={<HNCModule2Section4_4 />} />
        <Route path="h-n-c-module2-section4-5" element={<HNCModule2Section4_5 />} />
        <Route path="h-n-c-module2-section4-6" element={<HNCModule2Section4_6 />} />
        <Route path="h-n-c-module2-section4-7" element={<HNCModule2Section4_7 />} />
        <Route path="h-n-c-module2-section5" element={<HNCModule2Section5 />} />
        <Route path="h-n-c-module2-section5-1" element={<HNCModule2Section5_1 />} />
        <Route path="h-n-c-module2-section6" element={<HNCModule2Section6 />} />
        <Route path="h-n-c-module3" element={<HNCModule3 />} />
        <Route path="h-n-c-module3-section1" element={<HNCModule3Section1 />} />
        <Route path="h-n-c-module3-section1-1" element={<HNCModule3Section1_1 />} />
        <Route path="h-n-c-module3-section1-2" element={<HNCModule3Section1_2 />} />
        <Route path="h-n-c-module3-section1-3" element={<HNCModule3Section1_3 />} />
        <Route path="h-n-c-module3-section1-4" element={<HNCModule3Section1_4 />} />
        <Route path="h-n-c-module3-section1-5" element={<HNCModule3Section1_5 />} />
        <Route path="h-n-c-module3-section1-6" element={<HNCModule3Section1_6 />} />
        <Route path="h-n-c-module3-section1-7" element={<HNCModule3Section1_7 />} />
        <Route path="h-n-c-module3-section2" element={<HNCModule3Section2 />} />
        <Route path="h-n-c-module3-section2-1" element={<HNCModule3Section2_1 />} />
        <Route path="h-n-c-module3-section2-2" element={<HNCModule3Section2_2 />} />
        <Route path="h-n-c-module3-section2-3" element={<HNCModule3Section2_3 />} />
        <Route path="h-n-c-module3-section2-4" element={<HNCModule3Section2_4 />} />
        <Route path="h-n-c-module3-section2-5" element={<HNCModule3Section2_5 />} />
        <Route path="h-n-c-module3-section2-6" element={<HNCModule3Section2_6 />} />
        <Route path="h-n-c-module3-section2-7" element={<HNCModule3Section2_7 />} />
        <Route path="h-n-c-module3-section3" element={<HNCModule3Section3 />} />
        <Route path="h-n-c-module3-section3-1" element={<HNCModule3Section3_1 />} />
        <Route path="h-n-c-module3-section3-2" element={<HNCModule3Section3_2 />} />
        <Route path="h-n-c-module3-section3-3" element={<HNCModule3Section3_3 />} />
        <Route path="h-n-c-module3-section3-4" element={<HNCModule3Section3_4 />} />
        <Route path="h-n-c-module3-section3-5" element={<HNCModule3Section3_5 />} />
        <Route path="h-n-c-module3-section3-6" element={<HNCModule3Section3_6 />} />
        <Route path="h-n-c-module3-section3-7" element={<HNCModule3Section3_7 />} />
        <Route path="h-n-c-module3-section4" element={<HNCModule3Section4 />} />
        <Route path="h-n-c-module3-section4-1" element={<HNCModule3Section4_1 />} />
        <Route path="h-n-c-module3-section4-2" element={<HNCModule3Section4_2 />} />
        <Route path="h-n-c-module3-section4-3" element={<HNCModule3Section4_3 />} />
        <Route path="h-n-c-module3-section4-4" element={<HNCModule3Section4_4 />} />
        <Route path="h-n-c-module3-section4-5" element={<HNCModule3Section4_5 />} />
        <Route path="h-n-c-module3-section4-6" element={<HNCModule3Section4_6 />} />
        <Route path="h-n-c-module3-section4-7" element={<HNCModule3Section4_7 />} />
        <Route path="h-n-c-module3-section4-8" element={<HNCModule3Section4_8 />} />
        <Route path="h-n-c-module3-section5" element={<HNCModule3Section5 />} />
        <Route path="h-n-c-module3-section5-1" element={<HNCModule3Section5_1 />} />
        <Route path="h-n-c-module3-section5-2" element={<HNCModule3Section5_2 />} />
        <Route path="h-n-c-module3-section5-3" element={<HNCModule3Section5_3 />} />
        <Route path="h-n-c-module3-section5-4" element={<HNCModule3Section5_4 />} />
        <Route path="h-n-c-module3-section5-5" element={<HNCModule3Section5_5 />} />
        <Route path="h-n-c-module3-section5-6" element={<HNCModule3Section5_6 />} />
        <Route path="h-n-c-module3-section5-7" element={<HNCModule3Section5_7 />} />
        <Route path="h-n-c-module3-section5-8" element={<HNCModule3Section5_8 />} />
        <Route path="h-n-c-module3-section6" element={<HNCModule3Section6 />} />
        <Route path="h-n-c-module3-section6-1" element={<HNCModule3Section6_1 />} />
        <Route path="h-n-c-module3-section6-2" element={<HNCModule3Section6_2 />} />
        <Route path="h-n-c-module3-section6-3" element={<HNCModule3Section6_3 />} />
        <Route path="h-n-c-module3-section6-4" element={<HNCModule3Section6_4 />} />
        <Route path="h-n-c-module3-section6-5" element={<HNCModule3Section6_5 />} />
        <Route path="h-n-c-module3-section6-6" element={<HNCModule3Section6_6 />} />
        <Route path="h-n-c-module3-section6-7" element={<HNCModule3Section6_7 />} />
        <Route index element={<Index />} />
        <Route path="level2/*" element={<Level2Routes />} />
        <Route path="level2-module6-section6-1" element={<Level2Module6Section6_1 />} />
        <Route path="level2-module6-section6-2" element={<Level2Module6Section6_2 />} />
        <Route path="level2-module6-section6-3" element={<Level2Module6Section6_3 />} />
        <Route path="level2-module6-section6-4" element={<Level2Module6Section6_4 />} />
        <Route path="level2-module6-section6-5" element={<Level2Module6Section6_5 />} />
        <Route path="level2-module7-mock-exam7" element={<Level2Module7MockExam7 />} />
        <Route path="level2-module8-mock-exam1" element={<Level2Module8MockExam1 />} />
        <Route path="level2-module8-mock-exam2" element={<Level2Module8MockExam2 />} />
        <Route path="level2-module8-mock-exam3" element={<Level2Module8MockExam3 />} />
        <Route path="level2-module8-mock-exam4" element={<Level2Module8MockExam4 />} />
        <Route path="level2-module8-mock-exam5" element={<Level2Module8MockExam5 />} />
        <Route path="level2-module8-mock-exam6" element={<Level2Module8MockExam6 />} />
        <Route path="level2-module8-mock-exam8" element={<Level2Module8MockExam8 />} />
        <Route path="level2-module8-section1" element={<Level2Module8Section1 />} />
        <Route path="level2-module8-section2" element={<Level2Module8Section2 />} />
        <Route path="level2-module8-section2-section1" element={<Level2Module8Section2Section1 />} />
        <Route path="level2-module8-section2-section2" element={<Level2Module8Section2Section2 />} />
        <Route path="level2-module8-section2-section3" element={<Level2Module8Section2Section3 />} />
        <Route path="level2-module8-section2-section4" element={<Level2Module8Section2Section4 />} />
        <Route path="level3" element={<Level3 />} />
        <Route path="level3-module1" element={<Level3Module1 />} />
        <Route path="level3-module1-section1" element={<Level3Module1Section1 />} />
        <Route path="level3-module1-section2" element={<Level3Module1Section2 />} />
        <Route path="level3-module1-section3" element={<Level3Module1Section3 />} />
        <Route path="level3-module1-section4" element={<Level3Module1Section4 />} />
        <Route path="level3-module1-section5" element={<Level3Module1Section5 />} />
        <Route path="level3-module1-section6" element={<Level3Module1Section6 />} />
        <Route path="level3-module1-section1-1" element={<Level3Module1Section1_1 />} />
        <Route path="level3-module1-section1-2" element={<Level3Module1Section1_2 />} />
        <Route path="level3-module1-section1-3" element={<Level3Module1Section1_3 />} />
        <Route path="level3-module1-section1-4" element={<Level3Module1Section1_4 />} />
        <Route path="level3-module1-section1-5" element={<Level3Module1Section1_5 />} />
        <Route path="level3-module1-section1-6" element={<Level3Module1Section1_6 />} />
        <Route path="level3-module1-section1-7" element={<Level3Module1Section1_7 />} />
        <Route path="level3-module1-section2-1" element={<Level3Module1Section2_1 />} />
        <Route path="level3-module1-section2-2" element={<Level3Module1Section2_2 />} />
        <Route path="level3-module1-section2-3" element={<Level3Module1Section2_3 />} />
        <Route path="level3-module1-section2-4" element={<Level3Module1Section2_4 />} />
        <Route path="level3-module1-section2-5" element={<Level3Module1Section2_5 />} />
        <Route path="level3-module1-section3-1" element={<Level3Module1Section3_1 />} />
        <Route path="level3-module1-section3-2" element={<Level3Module1Section3_2 />} />
        <Route path="level3-module1-section3-3" element={<Level3Module1Section3_3 />} />
        <Route path="level3-module1-section3-4" element={<Level3Module1Section3_4 />} />
        <Route path="level3-module1-section3-5" element={<Level3Module1Section3_5 />} />
        <Route path="level3-module1-section3-6" element={<Level3Module1Section3_6 />} />
        <Route path="level3-module1-section4-1" element={<Level3Module1Section4_1 />} />
        <Route path="level3-module1-section4-2" element={<Level3Module1Section4_2 />} />
        <Route path="level3-module1-section4-3" element={<Level3Module1Section4_3 />} />
        <Route path="level3-module1-section4-4" element={<Level3Module1Section4_4 />} />
        <Route path="level3-module1-section4-5" element={<Level3Module1Section4_5 />} />
        <Route path="level3-module1-section4-6" element={<Level3Module1Section4_6 />} />
        <Route path="level3-module1-section5-1" element={<Level3Module1Section5_1 />} />
        <Route path="level3-module1-section5-2" element={<Level3Module1Section5_2 />} />
        <Route path="level3-module1-section5-3" element={<Level3Module1Section5_3 />} />
        <Route path="level3-module1-section5-4" element={<Level3Module1Section5_4 />} />
        <Route path="level3-module1-section5-5" element={<Level3Module1Section5_5 />} />
        <Route path="level3-module1-section5-6" element={<Level3Module1Section5_6 />} />
        <Route path="level3-module1-section6-1" element={<Level3Module1Section6_1 />} />
        <Route path="level3-module1-section6-2" element={<Level3Module1Section6_2 />} />
        <Route path="level3-module1-section6-3" element={<Level3Module1Section6_3 />} />
        <Route path="level3-module1-section6-4" element={<Level3Module1Section6_4 />} />
        <Route path="level3-module1-section6-5" element={<Level3Module1Section6_5 />} />
        <Route path="level3-module1-section6-6" element={<Level3Module1Section6_6 />} />
        <Route path="level3-module2" element={<Level3Module2 />} />
        <Route path="level3-module2-section1" element={<Level3Module2Section1 />} />
        <Route path="level3-module2-section2" element={<Level3Module2Section2 />} />
        <Route path="level3-module2-section3" element={<Level3Module2Section3 />} />
        <Route path="level3-module2-section4" element={<Level3Module2Section4 />} />
        <Route path="level3-module2-section5" element={<Level3Module2Section5 />} />
        <Route path="level3-module2-section6" element={<Level3Module2Section6 />} />
        <Route path="level3-module2-section1-1" element={<Level3Module2Section1_1 />} />
        <Route path="level3-module2-section1-2" element={<Level3Module2Section1_2 />} />
        <Route path="level3-module2-section1-3" element={<Level3Module2Section1_3 />} />
        <Route path="level3-module2-section1-4" element={<Level3Module2Section1_4 />} />
        <Route path="level3-module2-section1-5" element={<Level3Module2Section1_5 />} />
        <Route path="level3-module2-section2-1" element={<Level3Module2Section2_1 />} />
        <Route path="level3-module2-section2-2" element={<Level3Module2Section2_2 />} />
        <Route path="level3-module2-section2-3" element={<Level3Module2Section2_3 />} />
        <Route path="level3-module2-section2-4" element={<Level3Module2Section2_4 />} />
        <Route path="level3-module2-section2-5" element={<Level3Module2Section2_5 />} />
        <Route path="level3-module2-section3-1" element={<Level3Module2Section3_1 />} />
        <Route path="level3-module2-section3-2" element={<Level3Module2Section3_2 />} />
        <Route path="level3-module2-section3-3" element={<Level3Module2Section3_3 />} />
        <Route path="level3-module2-section3-4" element={<Level3Module2Section3_4 />} />
        <Route path="level3-module2-section3-5" element={<Level3Module2Section3_5 />} />
        <Route path="level3-module2-section4-1" element={<Level3Module2Section4_1 />} />
        <Route path="level3-module2-section4-2" element={<Level3Module2Section4_2 />} />
        <Route path="level3-module2-section4-3" element={<Level3Module2Section4_3 />} />
        <Route path="level3-module2-section4-4" element={<Level3Module2Section4_4 />} />
        <Route path="level3-module2-section4-5" element={<Level3Module2Section4_5 />} />
        <Route path="level3-module2-section5-1" element={<Level3Module2Section5_1 />} />
        <Route path="level3-module2-section5-2" element={<Level3Module2Section5_2 />} />
        <Route path="level3-module2-section5-3" element={<Level3Module2Section5_3 />} />
        <Route path="level3-module2-section5-4" element={<Level3Module2Section5_4 />} />
        <Route path="level3-module2-section5-5" element={<Level3Module2Section5_5 />} />
        <Route path="level3-module2-section6-1" element={<Level3Module2Section6_1 />} />
        <Route path="level3-module2-section6-2" element={<Level3Module2Section6_2 />} />
        <Route path="level3-module2-section6-3" element={<Level3Module2Section6_3 />} />
        <Route path="level3-module2-section6-4" element={<Level3Module2Section6_4 />} />
        <Route path="level3-module2-section6-5" element={<Level3Module2Section6_5 />} />
        <Route path="level3-module3" element={<Level3Module3 />} />
        <Route path="level3-module3-section1" element={<Level3Module3Section1 />} />
        <Route path="level3-module3-section1-1" element={<Level3Module3Section1_1 />} />
        <Route path="level3-module3-section1-2" element={<Level3Module3Section1_2 />} />
        <Route path="level3-module3-section1-3" element={<Level3Module3Section1_3 />} />
        <Route path="level3-module3-section1-4" element={<Level3Module3Section1_4 />} />
        <Route path="level3-module3-section1-5" element={<Level3Module3Section1_5 />} />
        <Route path="level3-module3-section2" element={<Level3Module3Section2 />} />
        <Route path="level3-module3-section2-1" element={<Level3Module3Section2_1 />} />
        <Route path="level3-module3-section2-2" element={<Level3Module3Section2_2 />} />
        <Route path="level3-module3-section2-3" element={<Level3Module3Section2_3 />} />
        <Route path="level3-module3-section2-4" element={<Level3Module3Section2_4 />} />
        <Route path="level3-module3-section2-5" element={<Level3Module3Section2_5 />} />
        <Route path="level3-module3-section2-6" element={<Level3Module3Section2_6 />} />
        <Route path="level3-module3-section3" element={<Level3Module3Section3 />} />
        <Route path="level3-module3-section3-1" element={<Level3Module3Section3_1 />} />
        <Route path="level3-module3-section3-2" element={<Level3Module3Section3_2 />} />
        <Route path="level3-module3-section3-3" element={<Level3Module3Section3_3 />} />
        <Route path="level3-module3-section3-4" element={<Level3Module3Section3_4 />} />
        <Route path="level3-module3-section3-5" element={<Level3Module3Section3_5 />} />
        <Route path="level3-module3-section4" element={<Level3Module3Section4 />} />
        <Route path="level3-module3-section4-1" element={<Level3Module3Section4_1 />} />
        <Route path="level3-module3-section4-2" element={<Level3Module3Section4_2 />} />
        <Route path="level3-module3-section4-3" element={<Level3Module3Section4_3 />} />
        <Route path="level3-module3-section4-4" element={<Level3Module3Section4_4 />} />
        <Route path="level3-module3-section4-5" element={<Level3Module3Section4_5 />} />
        <Route path="level3-module3-section4-6" element={<Level3Module3Section4_6 />} />
        <Route path="level3-module3-section5" element={<Level3Module3Section5 />} />
        <Route path="level3-module3-section5-1" element={<Level3Module3Section5_1 />} />
        <Route path="level3-module3-section5-2" element={<Level3Module3Section5_2 />} />
        <Route path="level3-module3-section5-3" element={<Level3Module3Section5_3 />} />
        <Route path="level3-module3-section5-4" element={<Level3Module3Section5_4 />} />
        <Route path="level3-module3-section6" element={<Level3Module3Section6 />} />
        <Route path="level3-module3-section6-1" element={<Level3Module3Section6_1 />} />
        <Route path="level3-module3-section6-2" element={<Level3Module3Section6_2 />} />
        <Route path="level3-module3-section6-3" element={<Level3Module3Section6_3 />} />
        <Route path="level3-module3-section6-4" element={<Level3Module3Section6_4 />} />
        <Route path="level3-module3-section6-5" element={<Level3Module3Section6_5 />} />
        <Route path="level3-module4" element={<Level3Module4 />} />
        <Route path="level3-module4-section1" element={<Level3Module4Section1 />} />
        <Route path="level3-module4-section1-1" element={<Level3Module4Section1_1 />} />
        <Route path="level3-module4-section1-2" element={<Level3Module4Section1_2 />} />
        <Route path="level3-module4-section1-3" element={<Level3Module4Section1_3 />} />
        <Route path="level3-module4-section1-4" element={<Level3Module4Section1_4 />} />
        <Route path="level3-module4-section1-5" element={<Level3Module4Section1_5 />} />
        <Route path="level3-module4-section2" element={<Level3Module4Section2 />} />
        <Route path="level3-module4-section2-1" element={<Level3Module4Section2_1 />} />
        <Route path="level3-module4-section2-2" element={<Level3Module4Section2_2 />} />
        <Route path="level3-module4-section2-3" element={<Level3Module4Section2_3 />} />
        <Route path="level3-module4-section2-4" element={<Level3Module4Section2_4 />} />
        <Route path="level3-module4-section3" element={<Level3Module4Section3 />} />
        <Route path="level3-module4-section3-1" element={<Level3Module4Section3_1 />} />
        <Route path="level3-module4-section3-2" element={<Level3Module4Section3_2 />} />
        <Route path="level3-module4-section3-3" element={<Level3Module4Section3_3 />} />
        <Route path="level3-module4-section3-4" element={<Level3Module4Section3_4 />} />
        <Route path="level3-module4-section3-5" element={<Level3Module4Section3_5 />} />
        <Route path="level3-module4-section3-6" element={<Level3Module4Section3_6 />} />
        <Route path="level3-module4-section4" element={<Level3Module4Section4 />} />
        <Route path="level3-module4-section4-1" element={<Level3Module4Section4_1 />} />
        <Route path="level3-module4-section4-2" element={<Level3Module4Section4_2 />} />
        <Route path="level3-module4-section4-3" element={<Level3Module4Section4_3 />} />
        <Route path="level3-module4-section4-4" element={<Level3Module4Section4_4 />} />
        <Route path="level3-module4-section4-5" element={<Level3Module4Section4_5 />} />
        <Route path="level3-module4-section5" element={<Level3Module4Section5 />} />
        <Route path="level3-module4-section5-1" element={<Level3Module4Section5_1 />} />
        <Route path="level3-module4-section5-2" element={<Level3Module4Section5_2 />} />
        <Route path="level3-module4-section5-3" element={<Level3Module4Section5_3 />} />
        <Route path="level3-module4-section5-4" element={<Level3Module4Section5_4 />} />
        <Route path="level3-module4-section5-5" element={<Level3Module4Section5_5 />} />
        <Route path="level3-module4-section6" element={<Level3Module4Section6 />} />
        <Route path="level3-module4-section6-1" element={<Level3Module4Section6_1 />} />
        <Route path="level3-module4-section6-2" element={<Level3Module4Section6_2 />} />
        <Route path="level3-module4-section6-3" element={<Level3Module4Section6_3 />} />
        <Route path="level3-module4-section6-4" element={<Level3Module4Section6_4 />} />
        <Route path="level3-module5" element={<Level3Module5 />} />
        <Route path="level3-module5-section1" element={<Level3Module5Section1 />} />
        <Route path="level3-module5-section1-1" element={<Level3Module5Section1_1 />} />
        <Route path="level3-module5-section1-2" element={<Level3Module5Section1_2 />} />
        <Route path="level3-module5-section1-3" element={<Level3Module5Section1_3 />} />
        <Route path="level3-module5-section1-4" element={<Level3Module5Section1_4 />} />
        <Route path="level3-module5-section1-5" element={<Level3Module5Section1_5 />} />
        <Route path="level3-module5-section2" element={<Level3Module5Section2 />} />
        <Route path="level3-module5-section2-1" element={<Level3Module5Section2_1 />} />
        <Route path="level3-module5-section2-2" element={<Level3Module5Section2_2 />} />
        <Route path="level3-module5-section2-3" element={<Level3Module5Section2_3 />} />
        <Route path="level3-module5-section2-4" element={<Level3Module5Section2_4 />} />
        <Route path="level3-module5-section3" element={<Level3Module5Section3 />} />
        <Route path="level3-module5-section3-1" element={<Level3Module5Section3_1 />} />
        <Route path="level3-module5-section3-2" element={<Level3Module5Section3_2 />} />
        <Route path="level3-module5-section3-3" element={<Level3Module5Section3_3 />} />
        <Route path="level3-module5-section3-4" element={<Level3Module5Section3_4 />} />
        <Route path="level3-module5-section3-5" element={<Level3Module5Section3_5 />} />
        <Route path="level3-module5-section3-6" element={<Level3Module5Section3_6 />} />
        <Route path="level3-module5-section4" element={<Level3Module5Section4 />} />
        <Route path="level3-module5-section4-1" element={<Level3Module5Section4_1 />} />
        <Route path="level3-module5-section4-2" element={<Level3Module5Section4_2 />} />
        <Route path="level3-module5-section4-3" element={<Level3Module5Section4_3 />} />
        <Route path="level3-module5-section4-4" element={<Level3Module5Section4_4 />} />
        <Route path="level3-module5-section4-5" element={<Level3Module5Section4_5 />} />
        <Route path="level3-module5-section5" element={<Level3Module5Section5 />} />
        <Route path="level3-module5-section5-1" element={<Level3Module5Section5_1 />} />
        <Route path="level3-module5-section5-2" element={<Level3Module5Section5_2 />} />
        <Route path="level3-module5-section5-3" element={<Level3Module5Section5_3 />} />
        <Route path="level3-module5-section5-4" element={<Level3Module5Section5_4 />} />
        <Route path="level3-module5-section5-5" element={<Level3Module5Section5_5 />} />
        <Route path="level3-module5-section6" element={<Level3Module5Section6 />} />
        <Route path="level3-module5-section6-1" element={<Level3Module5Section6_1 />} />
        <Route path="level3-module5-section6-2" element={<Level3Module5Section6_2 />} />
        <Route path="level3-module5-section6-3" element={<Level3Module5Section6_3 />} />
        <Route path="level3-module5-section6-4" element={<Level3Module5Section6_4 />} />
        <Route path="level3-module6" element={<Level3Module6 />} />
        <Route path="level3-module6-section1" element={<Level3Module6Section1 />} />
        <Route path="level3-module6-section1-1" element={<Level3Module6Section1_1 />} />
        <Route path="level3-module6-section1-2" element={<Level3Module6Section1_2 />} />
        <Route path="level3-module6-section1-3" element={<Level3Module6Section1_3 />} />
        <Route path="level3-module6-section1-4" element={<Level3Module6Section1_4 />} />
        <Route path="level3-module6-section1-5" element={<Level3Module6Section1_5 />} />
        <Route path="level3-module6-section2" element={<Level3Module6Section2 />} />
        <Route path="level3-module6-section2-2" element={<Level3Module6Section2_2 />} />
        <Route path="level3-module6-section2-3" element={<Level3Module6Section2_3 />} />
        <Route path="level3-module6-section2-4" element={<Level3Module6Section2_4 />} />
        <Route path="level3-module6-section2-5" element={<Level3Module6Section2_5 />} />
        <Route path="level3-module6-section2-6" element={<Level3Module6Section2_6 />} />
        <Route path="level3-module6-section3" element={<Level3Module6Section3 />} />
        <Route path="level3-module6-section3-1" element={<Level3Module6Section3_1 />} />
        <Route path="level3-module6-section3-2" element={<Level3Module6Section3_2 />} />
        <Route path="level3-module6-section3-3" element={<Level3Module6Section3_3 />} />
        <Route path="level3-module6-section3-4" element={<Level3Module6Section3_4 />} />
        <Route path="level3-module6-section3-5" element={<Level3Module6Section3_5 />} />
        <Route path="level3-module6-section4" element={<Level3Module6Section4 />} />
        <Route path="level3-module6-section4-1" element={<Level3Module6Section4_1 />} />
        <Route path="level3-module6-section4-2" element={<Level3Module6Section4_2 />} />
        <Route path="level3-module6-section4-3" element={<Level3Module6Section4_3 />} />
        <Route path="level3-module6-section4-4" element={<Level3Module6Section4_4 />} />
        <Route path="level3-module6-section4-5" element={<Level3Module6Section4_5 />} />
        <Route path="level3-module6-section4-6" element={<Level3Module6Section4_6 />} />
        <Route path="level3-module6-section5" element={<Level3Module6Section5 />} />
        <Route path="level3-module6-section5-1" element={<Level3Module6Section5_1 />} />
        <Route path="level3-module6-section5-2" element={<Level3Module6Section5_2 />} />
        <Route path="level3-module6-section5-3" element={<Level3Module6Section5_3 />} />
        <Route path="level3-module6-section5-4" element={<Level3Module6Section5_4 />} />
        <Route path="level3-module6-section6" element={<Level3Module6Section6 />} />
        <Route path="level3-module6-section6-1" element={<Level3Module6Section6_1 />} />
        <Route path="level3-module6-section6-2" element={<Level3Module6Section6_2 />} />
        <Route path="level3-module6-section6-3" element={<Level3Module6Section6_3 />} />
        <Route path="level3-module6-section6-4" element={<Level3Module6Section6_4 />} />
        <Route path="level3-module6-section6-5" element={<Level3Module6Section6_5 />} />
        <Route path="level3-module7" element={<Level3Module7 />} />
        <Route path="level3-module7-section1" element={<Level3Module7Section1 />} />
        <Route path="level3-module7-section1-1" element={<Level3Module7Section1_1 />} />
        <Route path="level3-module7-section1-2" element={<Level3Module7Section1_2 />} />
        <Route path="level3-module7-section1-3" element={<Level3Module7Section1_3 />} />
        <Route path="level3-module7-section1-4" element={<Level3Module7Section1_4 />} />
        <Route path="level3-module7-section1-5" element={<Level3Module7Section1_5 />} />
        <Route path="level3-module7-section2" element={<Level3Module7Section2 />} />
        <Route path="level3-module7-section2-1" element={<Level3Module7Section2_1 />} />
        <Route path="level3-module7-section2-2" element={<Level3Module7Section2_2 />} />
        <Route path="level3-module7-section2-3" element={<Level3Module7Section2_3 />} />
        <Route path="level3-module7-section2-4" element={<Level3Module7Section2_4 />} />
        <Route path="level3-module7-section3" element={<Level3Module7Section3 />} />
        <Route path="level3-module7-section3-1" element={<Level3Module7Section3_1 />} />
        <Route path="level3-module7-section3-2" element={<Level3Module7Section3_2 />} />
        <Route path="level3-module7-section3-3" element={<Level3Module7Section3_3 />} />
        <Route path="level3-module7-section3-4" element={<Level3Module7Section3_4 />} />
        <Route path="level3-module7-section3-5" element={<Level3Module7Section3_5 />} />
        <Route path="level3-module7-section4" element={<Level3Module7Section4 />} />
        <Route path="level3-module7-section4-1" element={<Level3Module7Section4_1 />} />
        <Route path="level3-module7-section4-2" element={<Level3Module7Section4_2 />} />
        <Route path="level3-module7-section4-3" element={<Level3Module7Section4_3 />} />
        <Route path="level3-module7-section4-4" element={<Level3Module7Section4_4 />} />
        <Route path="level3-module7-section4-5" element={<Level3Module7Section4_5 />} />
        <Route path="level3-module7-section5" element={<Level3Module7Section5 />} />
        <Route path="level3-module7-section5-1" element={<Level3Module7Section5_1 />} />
        <Route path="level3-module7-section5-2" element={<Level3Module7Section5_2 />} />
        <Route path="level3-module7-section5-3" element={<Level3Module7Section5_3 />} />
        <Route path="level3-module7-section5-4" element={<Level3Module7Section5_4 />} />
        <Route path="level3-module7-section5-5" element={<Level3Module7Section5_5 />} />
        <Route path="level3-module7-section5-6" element={<Level3Module7Section5_6 />} />
        <Route path="level3-module8" element={<Level3Module8 />} />
        <Route path="level3-module8-section1" element={<Level3Module8Section1 />} />
        <Route path="level3-module8-section1-1" element={<Level3Module8Section1_1 />} />
        <Route path="level3-module8-section1-2" element={<Level3Module8Section1_2 />} />
        <Route path="level3-module8-section1-3" element={<Level3Module8Section1_3 />} />
        <Route path="level3-module8-section1-4" element={<Level3Module8Section1_4 />} />
        <Route path="level3-module8-section2" element={<Level3Module8Section2 />} />
        <Route path="level3-module8-section2-1" element={<Level3Module8Section2_1 />} />
        <Route path="level3-module8-section2-2" element={<Level3Module8Section2_2 />} />
        <Route path="level3-module8-section2-3" element={<Level3Module8Section2_3 />} />
        <Route path="level3-module8-section2-4" element={<Level3Module8Section2_4 />} />
        <Route path="level3-module8-section3" element={<Level3Module8Section3 />} />
        <Route path="level3-module8-section3-1" element={<Level3Module8Section3_1 />} />
        <Route path="level3-module8-section3-2" element={<Level3Module8Section3_2 />} />
        <Route path="level3-module8-section3-3" element={<Level3Module8Section3_3 />} />
        <Route path="level3-module8-section3-4" element={<Level3Module8Section3_4 />} />
        <Route path="level3-module8-section4" element={<Level3Module8Section4 />} />
        <Route path="level3-module8-section4-1" element={<Level3Module8Section4_1 />} />
        <Route path="level3-module8-section4-2" element={<Level3Module8Section4_2 />} />
        <Route path="level3-module8-section4-3" element={<Level3Module8Section4_3 />} />
        <Route path="level3-module8-section4-4" element={<Level3Module8Section4_4 />} />
        <Route path="level3-module8-mock-exam1" element={<Level3Module8MockExam1 />} />
        <Route path="level3-module8-mock-exam2" element={<Level3Module8MockExam2 />} />
        <Route path="level3-module8-mock-exam3" element={<Level3Module8MockExam3 />} />
        <Route path="level3-module8-mock-exam4" element={<Level3Module8MockExam4 />} />
        <Route path="level3-module8-mock-exam5" element={<Level3Module8MockExam5 />} />
        <Route path="level3-module8-mock-exam6" element={<Level3Module8MockExam6 />} />
        <Route path="level3-module8-mock-exam7" element={<Level3Module8MockExam7 />} />
        <Route path="level3-module8-mock-exam8" element={<Level3Module8MockExam8 />} />
        <Route path="module1" element={<Module1 />} />
        <Route path="module1-section5-4" element={<Module1Section5_4 />} />
        <Route path="module2" element={<Module2 />} />
        <Route path="module2-section1-1" element={<Module2Section1_1 />} />
        <Route path="module2-section1-2" element={<Module2Section1_2 />} />
        <Route path="module2-section1-3" element={<Module2Section1_3 />} />
        <Route path="module2-section1-4" element={<Module2Section1_4 />} />
        <Route path="module2-section1-5" element={<Module2Section1_5 />} />
        <Route path="module2-section2-1" element={<Module2Section2_1 />} />
        <Route path="module2-section2-2" element={<Module2Section2_2 />} />
        <Route path="module2-section2-3" element={<Module2Section2_3 />} />
        <Route path="module2-section2-4" element={<Module2Section2_4 />} />
        <Route path="module2-section2-5" element={<Module2Section2_5 />} />
        <Route path="module2-section2-6" element={<Module2Section2_6 />} />
        <Route path="module2-section2--intro" element={<Module2Section2_Intro />} />
        <Route path="module2-section3-1" element={<Module2Section3_1 />} />
        <Route path="module2-section3-2" element={<Module2Section3_2 />} />
        <Route path="module2-section3-3" element={<Module2Section3_3 />} />
        <Route path="module2-section3-4" element={<Module2Section3_4 />} />
        <Route path="module2-section3-5" element={<Module2Section3_5 />} />
        <Route path="module2-section3-6" element={<Module2Section3_6 />} />
        <Route path="module2-section4-1" element={<Module2Section4_1 />} />
        <Route path="module2-section4-2" element={<Module2Section4_2 />} />
        <Route path="module2-section4-3" element={<Module2Section4_3 />} />
        <Route path="module2-section4-4" element={<Module2Section4_4 />} />
        <Route path="module2-section4-5" element={<Module2Section4_5 />} />
        <Route path="module2-section4-6" element={<Module2Section4_6 />} />
        <Route path="module2-section5-1" element={<Module2Section5_1 />} />
        <Route path="module2-section5-2" element={<Module2Section5_2 />} />
        <Route path="module2-section5-3" element={<Module2Section5_3 />} />
        <Route path="module2-section5-4" element={<Module2Section5_4 />} />
        <Route path="module2-section5-5" element={<Module2Section5_5 />} />
        <Route path="module2-section5-6" element={<Module2Section5_6 />} />
        <Route path="module2-section6-1" element={<Module2Section6_1 />} />
        <Route path="module2-section6-2" element={<Module2Section6_2 />} />
        <Route path="module2-section6-3" element={<Module2Section6_3 />} />
        <Route path="module2-section6-4" element={<Module2Section6_4 />} />
        <Route path="module2-section6-5" element={<Module2Section6_5 />} />
        <Route path="module2-section6-6" element={<Module2Section6_6 />} />
        <Route path="module3" element={<Module3 />} />
        <Route path="module3-section1" element={<Module3Section1 />} />
        <Route path="module3-section1-1" element={<Module3Section1_1 />} />
        <Route path="module3-section1-2" element={<Module3Section1_2 />} />
        <Route path="module3-section1-3" element={<Module3Section1_3 />} />
        <Route path="module3-section1-4" element={<Module3Section1_4 />} />
        <Route path="module3-section1-5" element={<Module3Section1_5 />} />
        <Route path="module3-section1-6" element={<Module3Section1_6 />} />
        <Route path="module3-section1-7" element={<Module3Section1_7 />} />
        <Route path="module3-section2" element={<Module3Section2 />} />
        <Route path="module3-section2-1" element={<Module3Section2_1 />} />
        <Route path="module3-section2-2" element={<Module3Section2_2 />} />
        <Route path="module3-section2-3" element={<Module3Section2_3 />} />
        <Route path="module3-section2-4" element={<Module3Section2_4 />} />
        <Route path="module3-section2-5" element={<Module3Section2_5 />} />
        <Route path="module3-section2-6" element={<Module3Section2_6 />} />
        <Route path="module3-section2-7" element={<Module3Section2_7 />} />
        <Route path="module3-section3" element={<Module3Section3 />} />
        <Route path="module3-section3-1" element={<Module3Section3_1 />} />
        <Route path="module3-section3-2" element={<Module3Section3_2 />} />
        <Route path="module3-section3-3" element={<Module3Section3_3 />} />
        <Route path="module3-section3-4" element={<Module3Section3_4 />} />
        <Route path="module3-section3-5" element={<Module3Section3_5 />} />
        <Route path="module3-section3-6" element={<Module3Section3_6 />} />
        <Route path="module3-section4" element={<Module3Section4 />} />
        <Route path="module3-section4-1" element={<Module3Section4_1 />} />
        <Route path="module3-section4-2" element={<Module3Section4_2 />} />
        <Route path="module3-section4-3" element={<Module3Section4_3 />} />
        <Route path="module3-section4-4" element={<Module3Section4_4 />} />
        <Route path="module3-section4-5" element={<Module3Section4_5 />} />
        <Route path="module3-section4-6" element={<Module3Section4_6 />} />
        <Route path="module3-section5" element={<Module3Section5 />} />
        <Route path="module3-section5-1" element={<Module3Section5_1 />} />
        <Route path="module3-section5-2" element={<Module3Section5_2 />} />
        <Route path="module3-section5-3" element={<Module3Section5_3 />} />
        <Route path="module3-section5-4" element={<Module3Section5_4 />} />
        <Route path="module3-section5-5" element={<Module3Section5_5 />} />
        <Route path="module3-section6" element={<Module3Section6 />} />
        <Route path="module3-section6-1" element={<Module3Section6_1 />} />
        <Route path="module3-section6-2" element={<Module3Section6_2 />} />
        <Route path="module3-section6-3" element={<Module3Section6_3 />} />
        <Route path="module3-section6-4" element={<Module3Section6_4 />} />
        <Route path="module3-section6-5" element={<Module3Section6_5 />} />
        <Route path="module3-section6-6" element={<Module3Section6_6 />} />
        <Route path="module4" element={<Module4 />} />
        <Route path="module4-section1" element={<Module4Section1 />} />
        <Route path="module4-section1-1" element={<Module4Section1_1 />} />
        <Route path="module4-section1-2" element={<Module4Section1_2 />} />
        <Route path="module4-section1-3" element={<Module4Section1_3 />} />
        <Route path="module4-section1-4" element={<Module4Section1_4 />} />
        <Route path="module4-section1-5" element={<Module4Section1_5 />} />
        <Route path="module4-section2" element={<Module4Section2 />} />
        <Route path="module4-section2-1" element={<Module4Section2_1 />} />
        <Route path="module4-section2-2" element={<Module4Section2_2 />} />
        <Route path="module4-section2-3" element={<Module4Section2_3 />} />
        <Route path="module4-section2-4" element={<Module4Section2_4 />} />
        <Route path="module4-section3" element={<Module4Section3 />} />
        <Route path="module4-section3-1" element={<Module4Section3_1 />} />
        <Route path="module4-section3-2" element={<Module4Section3_2 />} />
        <Route path="module4-section3-3" element={<Module4Section3_3 />} />
        <Route path="module4-section3-4" element={<Module4Section3_4 />} />
        <Route path="module4-section3-5" element={<Module4Section3_5 />} />
        <Route path="module4-section4" element={<Module4Section4 />} />
        <Route path="module4-section4-1" element={<Module4Section4_1 />} />
        <Route path="module4-section4-2" element={<Module4Section4_2 />} />
        <Route path="module4-section4-3" element={<Module4Section4_3 />} />
        <Route path="module4-section4-4" element={<Module4Section4_4 />} />
        <Route path="module4-section4-5" element={<Module4Section4_5 />} />
        <Route path="module4-section4-6" element={<Module4Section4_6 />} />
        <Route path="module4-section4-7" element={<Module4Section4_7 />} />
        <Route path="module4-section5" element={<Module4Section5 />} />
        <Route path="module4-section5-1" element={<Module4Section5_1 />} />
        <Route path="module4-section5-2" element={<Module4Section5_2 />} />
        <Route path="module4-section5-3" element={<Module4Section5_3 />} />
        <Route path="module4-section5-4" element={<Module4Section5_4 />} />
        <Route path="module4-section5-5" element={<Module4Section5_5 />} />
        <Route path="module4-section5-6" element={<Module4Section5_6 />} />
        <Route path="module4-section5-7" element={<Module4Section5_7 />} />
        <Route path="module4-section5-8" element={<Module4Section5_8 />} />
        <Route path="module4-section6" element={<Module4Section6 />} />
        <Route path="module4-section6-1" element={<Module4Section6_1 />} />
        <Route path="module4-section6-2" element={<Module4Section6_2 />} />
        <Route path="module4-section6-3" element={<Module4Section6_3 />} />
        <Route path="module4-section6-4" element={<Module4Section6_4 />} />
        <Route path="module4-section6-5" element={<Module4Section6_5 />} />
        <Route path="module4-section6-6" element={<Module4Section6_6 />} />
        <Route path="module4-section7" element={<Module4Section7 />} />
        <Route path="module4-section7-1" element={<Module4Section7_1 />} />
        <Route path="module4-section7-2" element={<Module4Section7_2 />} />
        <Route path="module4-section7-3" element={<Module4Section7_3 />} />
        <Route path="module4-section7-4" element={<Module4Section7_4 />} />
        <Route path="module4-section7-5" element={<Module4Section7_5 />} />
        <Route path="module5" element={<Module5 />} />
        <Route path="module5-section1" element={<Module5Section1 />} />
        <Route path="module5-section1-1" element={<Module5Section1_1 />} />
        <Route path="module5-section1-2" element={<Module5Section1_2 />} />
        <Route path="module5-section1-3" element={<Module5Section1_3 />} />
        <Route path="module5-section1-4" element={<Module5Section1_4 />} />
        <Route path="module5-section1-5" element={<Module5Section1_5 />} />
        <Route path="module5-section1-6" element={<Module5Section1_6 />} />
        <Route path="module5-section2" element={<Module5Section2 />} />
        <Route path="module5-section2-1" element={<Module5Section2_1 />} />
        <Route path="module5-section2-2" element={<Module5Section2_2 />} />
        <Route path="module5-section2-3" element={<Module5Section2_3 />} />
        <Route path="module5-section2-4" element={<Module5Section2_4 />} />
        <Route path="module5-section2-5" element={<Module5Section2_5 />} />
        <Route path="module5-section3" element={<Module5Section3 />} />
        <Route path="module5-section3-1" element={<Module5Section3_1 />} />
        <Route path="module5-section3-2" element={<Module5Section3_2 />} />
        <Route path="module5-section3-3" element={<Module5Section3_3 />} />
        <Route path="module5-section3-4" element={<Module5Section3_4 />} />
        <Route path="module5-section3-5" element={<Module5Section3_5 />} />
        <Route path="module5-section3-6" element={<Module5Section3_6 />} />
        <Route path="module5-section4" element={<Module5Section4 />} />
        <Route path="module5-section4-1" element={<Module5Section4_1 />} />
        <Route path="module5-section4-2" element={<Module5Section4_2 />} />
        <Route path="module5-section4-3" element={<Module5Section4_3 />} />
        <Route path="module5-section4-4" element={<Module5Section4_4 />} />
        <Route path="module5-section4-5" element={<Module5Section4_5 />} />
        <Route path="module5-section5" element={<Module5Section5 />} />
        <Route path="module5-section5-1" element={<Module5Section5_1 />} />
        <Route path="module5-section5-2" element={<Module5Section5_2 />} />
        <Route path="module5-section5-3" element={<Module5Section5_3 />} />
        <Route path="module5-section5-4" element={<Module5Section5_4 />} />
        <Route path="module5-section5-5" element={<Module5Section5_5 />} />
        <Route path="module5-section6" element={<Module5Section6 />} />
        <Route path="module5-section6-1" element={<Module5Section6_1 />} />
        <Route path="module5-section6-2" element={<Module5Section6_2 />} />
        <Route path="module5-section6-3" element={<Module5Section6_3 />} />
        <Route path="module5-section6-4" element={<Module5Section6_4 />} />
        <Route path="module5-section7" element={<Module5Section7 />} />
        <Route path="module5-section7-1" element={<Module5Section7_1 />} />
        <Route path="module5-section7-2" element={<Module5Section7_2 />} />
        <Route path="module5-section7-3" element={<Module5Section7_3 />} />
        <Route path="module5-section7-4" element={<Module5Section7_4 />} />
        <Route path="module5-section7-5" element={<Module5Section7_5 />} />
        <Route path="module6" element={<Module6 />} />
        <Route path="module6-section1" element={<Module6Section1 />} />
        <Route path="module6-section1-1" element={<Module6Section1_1 />} />
        <Route path="module6-section1-2" element={<Module6Section1_2 />} />
        <Route path="module6-section1-3" element={<Module6Section1_3 />} />
        <Route path="module6-section1-4" element={<Module6Section1_4 />} />
        <Route path="module6-section1-5" element={<Module6Section1_5 />} />
        <Route path="module6-section2" element={<Module6Section2 />} />
        <Route path="module6-section2-1" element={<Module6Section2_1 />} />
        <Route path="module6-section2-2" element={<Module6Section2_2 />} />
        <Route path="module6-section2-3" element={<Module6Section2_3 />} />
        <Route path="module6-section2-4" element={<Module6Section2_4 />} />
        <Route path="module6-section2-5" element={<Module6Section2_5 />} />
        <Route path="module6-section2-6" element={<Module6Section2_6 />} />
        <Route path="module6-section3" element={<Module6Section3 />} />
        <Route path="module6-section3-1" element={<Module6Section3_1 />} />
        <Route path="module6-section3-2" element={<Module6Section3_2 />} />
        <Route path="module6-section3-3" element={<Module6Section3_3 />} />
        <Route path="module6-section3-4" element={<Module6Section3_4 />} />
        <Route path="module6-section3-5" element={<Module6Section3_5 />} />
        <Route path="module6-section3-6" element={<Module6Section3_6 />} />
        <Route path="module6-section4" element={<Module6Section4 />} />
        <Route path="module6-section4-1" element={<Module6Section4_1 />} />
        <Route path="module6-section4-2" element={<Module6Section4_2 />} />
        <Route path="module6-section4-3" element={<Module6Section4_3 />} />
        <Route path="module6-section4-4" element={<Module6Section4_4 />} />
        <Route path="module6-section4-5" element={<Module6Section4_5 />} />
        <Route path="module6-section5" element={<Module6Section5 />} />
        <Route path="module6-section5-1" element={<Module6Section5_1 />} />
        <Route path="module6-section5-2" element={<Module6Section5_2 />} />
        <Route path="module6-section5-3" element={<Module6Section5_3 />} />
        <Route path="module6-section5-4" element={<Module6Section5_4 />} />
        <Route path="module6-section6" element={<Module6Section6 />} />
        <Route path="module6-section7" element={<Module6Section7 />} />
        <Route path="module6-section7-1" element={<Module6Section7_1 />} />
        <Route path="module6-section7-2" element={<Module6Section7_2 />} />
        <Route path="module6-section7-3" element={<Module6Section7_3 />} />
        <Route path="module6-section7-4" element={<Module6Section7_4 />} />
        <Route path="module7" element={<Module7 />} />
        <Route path="module7-section1" element={<Module7Section1 />} />
        <Route path="module7-section1-1" element={<Module7Section1_1 />} />
        <Route path="module7-section1-2" element={<Module7Section1_2 />} />
        <Route path="module7-section1-3" element={<Module7Section1_3 />} />
        <Route path="module7-section1-4" element={<Module7Section1_4 />} />
        <Route path="module7-section1-5" element={<Module7Section1_5 />} />
        <Route path="module7-section2" element={<Module7Section2 />} />
        <Route path="module7-section2-1" element={<Module7Section2_1 />} />
        <Route path="module7-section2-2" element={<Module7Section2_2 />} />
        <Route path="module7-section2-3" element={<Module7Section2_3 />} />
        <Route path="module7-section2-4" element={<Module7Section2_4 />} />
        <Route path="module7-section2-5" element={<Module7Section2_5 />} />
        <Route path="module7-section2-6" element={<Module7Section2_6 />} />
        <Route path="module7-section3" element={<Module7Section3 />} />
        <Route path="module7-section3-1" element={<Module7Section3_1 />} />
        <Route path="module7-section3-2" element={<Module7Section3_2 />} />
        <Route path="module7-section3-3" element={<Module7Section3_3 />} />
        <Route path="module7-section3-4" element={<Module7Section3_4 />} />
        <Route path="module7-section3-5" element={<Module7Section3_5 />} />
        <Route path="module7-section4" element={<Module7Section4 />} />
        <Route path="module7-section4-1" element={<Module7Section4_1 />} />
        <Route path="module7-section4-2" element={<Module7Section4_2 />} />
        <Route path="module7-section4-3" element={<Module7Section4_3 />} />
        <Route path="module7-section4-4" element={<Module7Section4_4 />} />
        <Route path="module7-section4-5" element={<Module7Section4_5 />} />
        <Route path="module7-section4-6" element={<Module7Section4_6 />} />
        <Route path="module7-section5" element={<Module7Section5 />} />
        <Route path="module7-section5-1" element={<Module7Section5_1 />} />
        <Route path="module7-section5-2" element={<Module7Section5_2 />} />
        <Route path="module7-section5-3" element={<Module7Section5_3 />} />
        <Route path="module7-section5-4" element={<Module7Section5_4 />} />
        <Route path="module7-section5-5" element={<Module7Section5_5 />} />
        <Route path="module7-section6" element={<Module7Section6 />} />
        <Route path="module7-section6-1" element={<Module7Section6_1 />} />
        <Route path="module7-section6-2" element={<Module7Section6_2 />} />
        <Route path="module7-section6-3" element={<Module7Section6_3 />} />
        <Route path="module7-section6-4" element={<Module7Section6_4 />} />
        <Route path="module7-section6-5" element={<Module7Section6_5 />} />
        <Route path="module8" element={<Module8 />} />
        <Route path="moet" element={<MOET />} />
        <Route path="m-o-e-t-module1" element={<MOETModule1 />} />
        <Route path="m-o-e-t-module1-section1" element={<MOETModule1Section1 />} />
        <Route path="m-o-e-t-module1-section1-1" element={<MOETModule1Section1_1 />} />
        <Route path="m-o-e-t-module1-section2" element={<MOETModule1Section2 />} />
        <Route path="m-o-e-t-module1-section3" element={<MOETModule1Section3 />} />
        <Route path="m-o-e-t-module1-section4" element={<MOETModule1Section4 />} />
        <Route path="m-o-e-t-module1-section5" element={<MOETModule1Section5 />} />
        <Route path="m-o-e-t-module1-section6" element={<MOETModule1Section6 />} />
        <Route path="m-o-e-t-module2" element={<MOETModule2 />} />
        <Route path="m-o-e-t-module2-section1" element={<MOETModule2Section1 />} />
        <Route path="m-o-e-t-module2-section1-1" element={<MOETModule2Section1_1 />} />
        <Route path="m-o-e-t-module2-section2" element={<MOETModule2Section2 />} />
        <Route path="m-o-e-t-module2-section3" element={<MOETModule2Section3 />} />
        <Route path="m-o-e-t-module2-section4" element={<MOETModule2Section4 />} />
        <Route path="m-o-e-t-module2-section5" element={<MOETModule2Section5 />} />
        <Route path="m-o-e-t-module3" element={<MOETModule3 />} />
        <Route path="m-o-e-t-module3-section1" element={<MOETModule3Section1 />} />
        <Route path="m-o-e-t-module3-section1-1" element={<MOETModule3Section1_1 />} />
        <Route path="m-o-e-t-module3-section2" element={<MOETModule3Section2 />} />
        <Route path="m-o-e-t-module3-section3" element={<MOETModule3Section3 />} />
        <Route path="m-o-e-t-module3-section4" element={<MOETModule3Section4 />} />
        <Route path="m-o-e-t-module3-section5" element={<MOETModule3Section5 />} />
        <Route path="m-o-e-t-module3-section6" element={<MOETModule3Section6 />} />
        <Route path="m-o-e-t-module4" element={<MOETModule4 />} />
        <Route path="m-o-e-t-module4-section1" element={<MOETModule4Section1 />} />
        <Route path="m-o-e-t-module4-section1-1" element={<MOETModule4Section1_1 />} />
        <Route path="m-o-e-t-module4-section2" element={<MOETModule4Section2 />} />
        <Route path="m-o-e-t-module4-section3" element={<MOETModule4Section3 />} />
        <Route path="m-o-e-t-module4-section4" element={<MOETModule4Section4 />} />
        <Route path="m-o-e-t-module4-section5" element={<MOETModule4Section5 />} />
        <Route path="m-o-e-t-module4-section6" element={<MOETModule4Section6 />} />
        <Route path="m-o-e-t-module4-section7" element={<MOETModule4Section7 />} />
        <Route path="m-o-e-t-module5" element={<MOETModule5 />} />
        <Route path="m-o-e-t-module5-section1" element={<MOETModule5Section1 />} />
        <Route path="m-o-e-t-module5-section1-1" element={<MOETModule5Section1_1 />} />
        <Route path="m-o-e-t-module5-section2" element={<MOETModule5Section2 />} />
        <Route path="m-o-e-t-module5-section3" element={<MOETModule5Section3 />} />
        <Route path="m-o-e-t-module5-section4" element={<MOETModule5Section4 />} />
        <Route path="m-o-e-t-module5-section5" element={<MOETModule5Section5 />} />
        <Route path="m-o-e-t-module5-section6" element={<MOETModule5Section6 />} />
        <Route path="m-o-e-t-module6" element={<MOETModule6 />} />
        <Route path="m-o-e-t-module6-section1" element={<MOETModule6Section1 />} />
        <Route path="m-o-e-t-module6-section1-1" element={<MOETModule6Section1_1 />} />
        <Route path="m-o-e-t-module6-section1-2" element={<MOETModule6Section1_2 />} />
        <Route path="m-o-e-t-module6-section2" element={<MOETModule6Section2 />} />
        <Route path="m-o-e-t-module6-section3" element={<MOETModule6Section3 />} />
        <Route path="m-o-e-t-module6-section4" element={<MOETModule6Section4 />} />
        <Route path="m-o-e-t-module7" element={<MOETModule7 />} />
        <Route path="m-o-e-t-module7-section1" element={<MOETModule7Section1 />} />
        <Route path="m-o-e-t-module7-section1-1" element={<MOETModule7Section1_1 />} />
        <Route path="m-o-e-t-module7-section2" element={<MOETModule7Section2 />} />
        <Route path="m-o-e-t-module7-section3" element={<MOETModule7Section3 />} />
        <Route path="m-o-e-t-module7-section4" element={<MOETModule7Section4 />} />
        <Route path="m-o-e-t-module7-section5" element={<MOETModule7Section5 />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="section1" element={<Section1 />} />
        <Route path="section2" element={<Section2 />} />
        <Route path="section2-1--electric-shock" element={<Section2_1_ElectricShock />} />
        <Route path="section3" element={<Section3 />} />
        <Route path="section4" element={<Section4 />} />
        <Route path="section5" element={<Section5 />} />
        <Route path="section6" element={<Section6 />} />
        <Route path="subsection1" element={<subsection1 />} />
        <Route path="subsection10" element={<subsection10 />} />
        <Route path="subsection11" element={<subsection11 />} />
        <Route path="subsection12" element={<subsection12 />} />
        <Route path="subsection13" element={<subsection13 />} />
        <Route path="subsection14" element={<subsection14 />} />
        <Route path="subsection15" element={<subsection15 />} />
        <Route path="subsection16" element={<subsection16 />} />
        <Route path="subsection17" element={<subsection17 />} />
        <Route path="subsection18" element={<subsection18 />} />
        <Route path="subsection19" element={<subsection19 />} />
        <Route path="subsection2" element={<subsection2 />} />
        <Route path="subsection20" element={<subsection20 />} />
        <Route path="subsection21" element={<subsection21 />} />
        <Route path="subsection22" element={<subsection22 />} />
        <Route path="subsection23" element={<subsection23 />} />
        <Route path="subsection24" element={<subsection24 />} />
        <Route path="subsection25" element={<subsection25 />} />
        <Route path="subsection26" element={<subsection26 />} />
        <Route path="subsection27" element={<subsection27 />} />
        <Route path="subsection28" element={<subsection28 />} />
        <Route path="subsection29" element={<subsection29 />} />
        <Route path="subsection3" element={<subsection3 />} />
        <Route path="subsection30" element={<subsection30 />} />
        <Route path="subsection31" element={<subsection31 />} />
        <Route path="subsection32" element={<subsection32 />} />
        <Route path="subsection33" element={<subsection33 />} />
        <Route path="subsection34" element={<subsection34 />} />
        <Route path="subsection4" element={<subsection4 />} />
        <Route path="subsection5" element={<subsection5 />} />
        <Route path="subsection6" element={<subsection6 />} />
        <Route path="subsection7" element={<subsection7 />} />
        <Route path="subsection8" element={<subsection8 />} />
        <Route path="subsection9" element={<subsection9 />} />
      </Routes>
    </Suspense>
  );
}
