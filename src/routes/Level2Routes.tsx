import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useLastStudyLocation } from "@/hooks/useLastStudyLocation";

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-elec-dark">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elec-yellow mx-auto mb-4" />
      <p className="text-gray-400">Loading course content...</p>
    </div>
  </div>
);

// Study location tracker component - tracks all Level 2 page visits
function Level2Tracker() {
  const location = useLocation();
  const { updateLastLocation } = useLastStudyLocation();

  useEffect(() => {
    // Get title from document after a short delay (to let page set title)
    const timer = setTimeout(() => {
      const title = document.title?.split('|')[0]?.trim() || 'Level 2 Course';
      updateLastLocation(location.pathname, title);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, updateLastLocation]);

  return null;
}

// Level 2 main page
const Level2 = lazy(() => import('@/pages/apprentice-courses/Level2'));

// Module pages (8 modules)
const Module1 = lazy(() => import('@/pages/apprentice-courses/Module1'));
const Module2 = lazy(() => import('@/pages/apprentice-courses/Module2'));
const Module3 = lazy(() => import('@/pages/apprentice-courses/Module3'));
const Module4 = lazy(() => import('@/pages/apprentice-courses/Module4'));
const Module5 = lazy(() => import('@/pages/apprentice-courses/Module5'));
const Module6 = lazy(() => import('@/pages/apprentice-courses/Module6'));
const Module7 = lazy(() => import('@/pages/apprentice-courses/Module7'));
const Module8 = lazy(() => import('@/pages/apprentice-courses/Module8'));

// Module 1 Section pages
const Section1 = lazy(() => import('@/pages/apprentice-courses/Section1'));
const Section2 = lazy(() => import('@/pages/apprentice-courses/Section2'));
const Section3 = lazy(() => import('@/pages/apprentice-courses/Section3'));
const Section4 = lazy(() => import('@/pages/apprentice-courses/Section4'));
const Section5 = lazy(() => import('@/pages/apprentice-courses/Section5'));
const Section6 = lazy(() => import('@/pages/apprentice-courses/Section6'));

// Module 1 Subsection (content) pages - Section 1
const Subsection1 = lazy(() => import('@/pages/apprentice-courses/subsection1'));
const Subsection2 = lazy(() => import('@/pages/apprentice-courses/subsection2'));
const Subsection3 = lazy(() => import('@/pages/apprentice-courses/subsection3'));
const Subsection4 = lazy(() => import('@/pages/apprentice-courses/subsection4'));

// Module 1 Subsection pages - Section 2
const Section2_1_ElectricShock = lazy(() => import('@/pages/apprentice-courses/Section2_1_ElectricShock'));
const Subsection6 = lazy(() => import('@/pages/apprentice-courses/subsection6'));
const Subsection7 = lazy(() => import('@/pages/apprentice-courses/subsection7'));
const Subsection8 = lazy(() => import('@/pages/apprentice-courses/subsection8'));
const Subsection9 = lazy(() => import('@/pages/apprentice-courses/subsection9'));

// Module 1 Subsection pages - Section 3
const Subsection10 = lazy(() => import('@/pages/apprentice-courses/subsection10'));
const Subsection11 = lazy(() => import('@/pages/apprentice-courses/subsection11'));
const Subsection12 = lazy(() => import('@/pages/apprentice-courses/subsection12'));
const Subsection13 = lazy(() => import('@/pages/apprentice-courses/subsection13'));

// Module 1 Subsection pages - Section 4
const Subsection14 = lazy(() => import('@/pages/apprentice-courses/subsection14'));
const Subsection15 = lazy(() => import('@/pages/apprentice-courses/subsection15'));
const Subsection16 = lazy(() => import('@/pages/apprentice-courses/subsection16'));
const Subsection17 = lazy(() => import('@/pages/apprentice-courses/subsection17'));

// Module 1 Subsection pages - Section 5
const Subsection18 = lazy(() => import('@/pages/apprentice-courses/subsection18'));
const Subsection19 = lazy(() => import('@/pages/apprentice-courses/subsection19'));
const Subsection20 = lazy(() => import('@/pages/apprentice-courses/subsection20'));
const Subsection21 = lazy(() => import('@/pages/apprentice-courses/subsection21'));
const Subsection22 = lazy(() => import('@/pages/apprentice-courses/subsection22'));

// Module 1 Subsection pages - Section 6
const Subsection23 = lazy(() => import('@/pages/apprentice-courses/subsection23'));
const Subsection24 = lazy(() => import('@/pages/apprentice-courses/subsection24'));
const Subsection25 = lazy(() => import('@/pages/apprentice-courses/subsection25'));
const Subsection26 = lazy(() => import('@/pages/apprentice-courses/subsection26'));
const Subsection27 = lazy(() => import('@/pages/apprentice-courses/subsection27'));
const Subsection28 = lazy(() => import('@/pages/apprentice-courses/subsection28'));

// Module 2 Section pages (used as section listing pages)
const Subsection29 = lazy(() => import('@/pages/apprentice-courses/subsection29')); // Section 6
const Subsection30 = lazy(() => import('@/pages/apprentice-courses/subsection30')); // Section 1
const Subsection31 = lazy(() => import('@/pages/apprentice-courses/subsection31')); // Section 2
const Subsection32 = lazy(() => import('@/pages/apprentice-courses/subsection32')); // Section 3
const Subsection33 = lazy(() => import('@/pages/apprentice-courses/subsection33')); // Section 4
const Subsection34 = lazy(() => import('@/pages/apprentice-courses/subsection34')); // Section 5

// Module 2 Content pages
const Module2Section1_1 = lazy(() => import('@/pages/apprentice-courses/Module2Section1_1'));
const Module2Section1_2 = lazy(() => import('@/pages/apprentice-courses/Module2Section1_2'));
const Module2Section1_3 = lazy(() => import('@/pages/apprentice-courses/Module2Section1_3'));
const Module2Section1_4 = lazy(() => import('@/pages/apprentice-courses/Module2Section1_4'));
const Module2Section1_5 = lazy(() => import('@/pages/apprentice-courses/Module2Section1_5'));
const Module2Section2_1 = lazy(() => import('@/pages/apprentice-courses/Module2Section2_1'));
const Module2Section2_2 = lazy(() => import('@/pages/apprentice-courses/Module2Section2_2'));
const Module2Section2_3 = lazy(() => import('@/pages/apprentice-courses/Module2Section2_3'));
const Module2Section2_4 = lazy(() => import('@/pages/apprentice-courses/Module2Section2_4'));
const Module2Section2_5 = lazy(() => import('@/pages/apprentice-courses/Module2Section2_5'));
const Module2Section2_6 = lazy(() => import('@/pages/apprentice-courses/Module2Section2_6'));
const Module2Section3_1 = lazy(() => import('@/pages/apprentice-courses/Module2Section3_1'));
const Module2Section3_2 = lazy(() => import('@/pages/apprentice-courses/Module2Section3_2'));
const Module2Section3_3 = lazy(() => import('@/pages/apprentice-courses/Module2Section3_3'));
const Module2Section3_4 = lazy(() => import('@/pages/apprentice-courses/Module2Section3_4'));
const Module2Section3_5 = lazy(() => import('@/pages/apprentice-courses/Module2Section3_5'));
const Module2Section3_6 = lazy(() => import('@/pages/apprentice-courses/Module2Section3_6'));
const Module2Section4_1 = lazy(() => import('@/pages/apprentice-courses/Module2Section4_1'));
const Module2Section4_2 = lazy(() => import('@/pages/apprentice-courses/Module2Section4_2'));
const Module2Section4_3 = lazy(() => import('@/pages/apprentice-courses/Module2Section4_3'));
const Module2Section4_4 = lazy(() => import('@/pages/apprentice-courses/Module2Section4_4'));
const Module2Section4_5 = lazy(() => import('@/pages/apprentice-courses/Module2Section4_5'));
const Module2Section4_6 = lazy(() => import('@/pages/apprentice-courses/Module2Section4_6'));
const Module2Section5_1 = lazy(() => import('@/pages/apprentice-courses/Module2Section5_1'));
const Module2Section5_2 = lazy(() => import('@/pages/apprentice-courses/Module2Section5_2'));
const Module2Section5_3 = lazy(() => import('@/pages/apprentice-courses/Module2Section5_3'));
const Module2Section5_4 = lazy(() => import('@/pages/apprentice-courses/Module2Section5_4'));
const Module2Section5_5 = lazy(() => import('@/pages/apprentice-courses/Module2Section5_5'));
const Module2Section5_6 = lazy(() => import('@/pages/apprentice-courses/Module2Section5_6'));
const Module2Section6_1 = lazy(() => import('@/pages/apprentice-courses/Module2Section6_1'));
const Module2Section6_2 = lazy(() => import('@/pages/apprentice-courses/Module2Section6_2'));
const Module2Section6_3 = lazy(() => import('@/pages/apprentice-courses/Module2Section6_3'));
const Module2Section6_4 = lazy(() => import('@/pages/apprentice-courses/Module2Section6_4'));
const Module2Section6_5 = lazy(() => import('@/pages/apprentice-courses/Module2Section6_5'));
const Module2Section6_6 = lazy(() => import('@/pages/apprentice-courses/Module2Section6_6'));

// Module 3 pages
const Module3Section1 = lazy(() => import('@/pages/apprentice-courses/Module3Section1'));
const Module3Section1_1 = lazy(() => import('@/pages/apprentice-courses/Module3Section1_1'));
const Module3Section1_2 = lazy(() => import('@/pages/apprentice-courses/Module3Section1_2'));
const Module3Section1_3 = lazy(() => import('@/pages/apprentice-courses/Module3Section1_3'));
const Module3Section1_4 = lazy(() => import('@/pages/apprentice-courses/Module3Section1_4'));
const Module3Section1_5 = lazy(() => import('@/pages/apprentice-courses/Module3Section1_5'));
const Module3Section1_6 = lazy(() => import('@/pages/apprentice-courses/Module3Section1_6'));
const Module3Section1_7 = lazy(() => import('@/pages/apprentice-courses/Module3Section1_7'));
const Module3Section2 = lazy(() => import('@/pages/apprentice-courses/Module3Section2'));
const Module3Section2_1 = lazy(() => import('@/pages/apprentice-courses/Module3Section2_1'));
const Module3Section2_2 = lazy(() => import('@/pages/apprentice-courses/Module3Section2_2'));
const Module3Section2_3 = lazy(() => import('@/pages/apprentice-courses/Module3Section2_3'));
const Module3Section2_4 = lazy(() => import('@/pages/apprentice-courses/Module3Section2_4'));
const Module3Section2_5 = lazy(() => import('@/pages/apprentice-courses/Module3Section2_5'));
const Module3Section2_6 = lazy(() => import('@/pages/apprentice-courses/Module3Section2_6'));
const Module3Section2_7 = lazy(() => import('@/pages/apprentice-courses/Module3Section2_7'));
const Module3Section3 = lazy(() => import('@/pages/apprentice-courses/Module3Section3'));
const Module3Section3_1 = lazy(() => import('@/pages/apprentice-courses/Module3Section3_1'));
const Module3Section3_2 = lazy(() => import('@/pages/apprentice-courses/Module3Section3_2'));
const Module3Section3_3 = lazy(() => import('@/pages/apprentice-courses/Module3Section3_3'));
const Module3Section3_4 = lazy(() => import('@/pages/apprentice-courses/Module3Section3_4'));
const Module3Section3_5 = lazy(() => import('@/pages/apprentice-courses/Module3Section3_5'));
const Module3Section3_6 = lazy(() => import('@/pages/apprentice-courses/Module3Section3_6'));
const Module3Section4 = lazy(() => import('@/pages/apprentice-courses/Module3Section4'));
const Module3Section4_1 = lazy(() => import('@/pages/apprentice-courses/Module3Section4_1'));
const Module3Section4_2 = lazy(() => import('@/pages/apprentice-courses/Module3Section4_2'));
const Module3Section4_3 = lazy(() => import('@/pages/apprentice-courses/Module3Section4_3'));
const Module3Section4_4 = lazy(() => import('@/pages/apprentice-courses/Module3Section4_4'));
const Module3Section4_5 = lazy(() => import('@/pages/apprentice-courses/Module3Section4_5'));
const Module3Section4_6 = lazy(() => import('@/pages/apprentice-courses/Module3Section4_6'));
const Module3Section5 = lazy(() => import('@/pages/apprentice-courses/Module3Section5'));
const Module3Section5_1 = lazy(() => import('@/pages/apprentice-courses/Module3Section5_1'));
const Module3Section5_2 = lazy(() => import('@/pages/apprentice-courses/Module3Section5_2'));
const Module3Section5_3 = lazy(() => import('@/pages/apprentice-courses/Module3Section5_3'));
const Module3Section5_4 = lazy(() => import('@/pages/apprentice-courses/Module3Section5_4'));
const Module3Section5_5 = lazy(() => import('@/pages/apprentice-courses/Module3Section5_5'));
const Module3Section6 = lazy(() => import('@/pages/apprentice-courses/Module3Section6'));
const Module3Section6_1 = lazy(() => import('@/pages/apprentice-courses/Module3Section6_1'));
const Module3Section6_2 = lazy(() => import('@/pages/apprentice-courses/Module3Section6_2'));
const Module3Section6_3 = lazy(() => import('@/pages/apprentice-courses/Module3Section6_3'));
const Module3Section6_4 = lazy(() => import('@/pages/apprentice-courses/Module3Section6_4'));
const Module3Section6_5 = lazy(() => import('@/pages/apprentice-courses/Module3Section6_5'));
const Module3Section6_6 = lazy(() => import('@/pages/apprentice-courses/Module3Section6_6'));

// Module 4 pages
const Module4Section1 = lazy(() => import('@/pages/apprentice-courses/Module4Section1'));
const Module4Section1_1 = lazy(() => import('@/pages/apprentice-courses/Module4Section1_1'));
const Module4Section1_2 = lazy(() => import('@/pages/apprentice-courses/Module4Section1_2'));
const Module4Section1_3 = lazy(() => import('@/pages/apprentice-courses/Module4Section1_3'));
const Module4Section1_4 = lazy(() => import('@/pages/apprentice-courses/Module4Section1_4'));
const Module4Section1_5 = lazy(() => import('@/pages/apprentice-courses/Module4Section1_5'));
const Module4Section2 = lazy(() => import('@/pages/apprentice-courses/Module4Section2'));
const Module4Section2_1 = lazy(() => import('@/pages/apprentice-courses/Module4Section2_1'));
const Module4Section2_2 = lazy(() => import('@/pages/apprentice-courses/Module4Section2_2'));
const Module4Section2_3 = lazy(() => import('@/pages/apprentice-courses/Module4Section2_3'));
const Module4Section2_4 = lazy(() => import('@/pages/apprentice-courses/Module4Section2_4'));
const Module4Section3 = lazy(() => import('@/pages/apprentice-courses/Module4Section3'));
const Module4Section3_1 = lazy(() => import('@/pages/apprentice-courses/Module4Section3_1'));
const Module4Section3_2 = lazy(() => import('@/pages/apprentice-courses/Module4Section3_2'));
const Module4Section3_3 = lazy(() => import('@/pages/apprentice-courses/Module4Section3_3'));
const Module4Section3_4 = lazy(() => import('@/pages/apprentice-courses/Module4Section3_4'));
const Module4Section3_5 = lazy(() => import('@/pages/apprentice-courses/Module4Section3_5'));
const Module4Section4 = lazy(() => import('@/pages/apprentice-courses/Module4Section4'));
const Module4Section4_1 = lazy(() => import('@/pages/apprentice-courses/Module4Section4_1'));
const Module4Section4_2 = lazy(() => import('@/pages/apprentice-courses/Module4Section4_2'));
const Module4Section4_3 = lazy(() => import('@/pages/apprentice-courses/Module4Section4_3'));
const Module4Section4_4 = lazy(() => import('@/pages/apprentice-courses/Module4Section4_4'));
const Module4Section4_5 = lazy(() => import('@/pages/apprentice-courses/Module4Section4_5'));
const Module4Section4_6 = lazy(() => import('@/pages/apprentice-courses/Module4Section4_6'));
const Module4Section4_7 = lazy(() => import('@/pages/apprentice-courses/Module4Section4_7'));
const Module4Section5 = lazy(() => import('@/pages/apprentice-courses/Module4Section5'));
const Module4Section5_1 = lazy(() => import('@/pages/apprentice-courses/Module4Section5_1'));
const Module4Section5_2 = lazy(() => import('@/pages/apprentice-courses/Module4Section5_2'));
const Module4Section5_3 = lazy(() => import('@/pages/apprentice-courses/Module4Section5_3'));
const Module4Section5_4 = lazy(() => import('@/pages/apprentice-courses/Module4Section5_4'));
const Module4Section5_5 = lazy(() => import('@/pages/apprentice-courses/Module4Section5_5'));
const Module4Section5_6 = lazy(() => import('@/pages/apprentice-courses/Module4Section5_6'));
const Module4Section5_7 = lazy(() => import('@/pages/apprentice-courses/Module4Section5_7'));
const Module4Section5_8 = lazy(() => import('@/pages/apprentice-courses/Module4Section5_8'));
const Module4Section6 = lazy(() => import('@/pages/apprentice-courses/Module4Section6'));
const Module4Section6_1 = lazy(() => import('@/pages/apprentice-courses/Module4Section6_1'));
const Module4Section6_2 = lazy(() => import('@/pages/apprentice-courses/Module4Section6_2'));
const Module4Section6_3 = lazy(() => import('@/pages/apprentice-courses/Module4Section6_3'));
const Module4Section6_4 = lazy(() => import('@/pages/apprentice-courses/Module4Section6_4'));
const Module4Section6_5 = lazy(() => import('@/pages/apprentice-courses/Module4Section6_5'));
const Module4Section6_6 = lazy(() => import('@/pages/apprentice-courses/Module4Section6_6'));
const Module4Section7 = lazy(() => import('@/pages/apprentice-courses/Module4Section7'));
const Module4Section7_1 = lazy(() => import('@/pages/apprentice-courses/Module4Section7_1'));
const Module4Section7_2 = lazy(() => import('@/pages/apprentice-courses/Module4Section7_2'));
const Module4Section7_3 = lazy(() => import('@/pages/apprentice-courses/Module4Section7_3'));
const Module4Section7_4 = lazy(() => import('@/pages/apprentice-courses/Module4Section7_4'));
const Module4Section7_5 = lazy(() => import('@/pages/apprentice-courses/Module4Section7_5'));

// Module 5 pages
const Module5Section1 = lazy(() => import('@/pages/apprentice-courses/Module5Section1'));
const Module5Section1_1 = lazy(() => import('@/pages/apprentice-courses/Module5Section1_1'));
const Module5Section1_2 = lazy(() => import('@/pages/apprentice-courses/Module5Section1_2'));
const Module5Section1_3 = lazy(() => import('@/pages/apprentice-courses/Module5Section1_3'));
const Module5Section1_4 = lazy(() => import('@/pages/apprentice-courses/Module5Section1_4'));
const Module5Section1_5 = lazy(() => import('@/pages/apprentice-courses/Module5Section1_5'));
const Module5Section1_6 = lazy(() => import('@/pages/apprentice-courses/Module5Section1_6'));
const Module5Section2 = lazy(() => import('@/pages/apprentice-courses/Module5Section2'));
const Module5Section2_1 = lazy(() => import('@/pages/apprentice-courses/Module5Section2_1'));
const Module5Section2_2 = lazy(() => import('@/pages/apprentice-courses/Module5Section2_2'));
const Module5Section2_3 = lazy(() => import('@/pages/apprentice-courses/Module5Section2_3'));
const Module5Section2_4 = lazy(() => import('@/pages/apprentice-courses/Module5Section2_4'));
const Module5Section2_5 = lazy(() => import('@/pages/apprentice-courses/Module5Section2_5'));
const Module5Section3 = lazy(() => import('@/pages/apprentice-courses/Module5Section3'));
const Module5Section3_1 = lazy(() => import('@/pages/apprentice-courses/Module5Section3_1'));
const Module5Section3_2 = lazy(() => import('@/pages/apprentice-courses/Module5Section3_2'));
const Module5Section3_3 = lazy(() => import('@/pages/apprentice-courses/Module5Section3_3'));
const Module5Section3_4 = lazy(() => import('@/pages/apprentice-courses/Module5Section3_4'));
const Module5Section3_5 = lazy(() => import('@/pages/apprentice-courses/Module5Section3_5'));
const Module5Section3_6 = lazy(() => import('@/pages/apprentice-courses/Module5Section3_6'));
const Module5Section4 = lazy(() => import('@/pages/apprentice-courses/Module5Section4'));
const Module5Section4_1 = lazy(() => import('@/pages/apprentice-courses/Module5Section4_1'));
const Module5Section4_2 = lazy(() => import('@/pages/apprentice-courses/Module5Section4_2'));
const Module5Section4_3 = lazy(() => import('@/pages/apprentice-courses/Module5Section4_3'));
const Module5Section4_4 = lazy(() => import('@/pages/apprentice-courses/Module5Section4_4'));
const Module5Section4_5 = lazy(() => import('@/pages/apprentice-courses/Module5Section4_5'));
const Module5Section5 = lazy(() => import('@/pages/apprentice-courses/Module5Section5'));
const Module5Section5_1 = lazy(() => import('@/pages/apprentice-courses/Module5Section5_1'));
const Module5Section5_2 = lazy(() => import('@/pages/apprentice-courses/Module5Section5_2'));
const Module5Section5_3 = lazy(() => import('@/pages/apprentice-courses/Module5Section5_3'));
const Module5Section5_4 = lazy(() => import('@/pages/apprentice-courses/Module5Section5_4'));
const Module5Section5_5 = lazy(() => import('@/pages/apprentice-courses/Module5Section5_5'));
const Module5Section6 = lazy(() => import('@/pages/apprentice-courses/Module5Section6'));
const Module5Section6_1 = lazy(() => import('@/pages/apprentice-courses/Module5Section6_1'));
const Module5Section6_2 = lazy(() => import('@/pages/apprentice-courses/Module5Section6_2'));
const Module5Section6_3 = lazy(() => import('@/pages/apprentice-courses/Module5Section6_3'));
const Module5Section6_4 = lazy(() => import('@/pages/apprentice-courses/Module5Section6_4'));
const Module5Section7 = lazy(() => import('@/pages/apprentice-courses/Module5Section7'));
const Module5Section7_1 = lazy(() => import('@/pages/apprentice-courses/Module5Section7_1'));
const Module5Section7_2 = lazy(() => import('@/pages/apprentice-courses/Module5Section7_2'));
const Module5Section7_3 = lazy(() => import('@/pages/apprentice-courses/Module5Section7_3'));
const Module5Section7_4 = lazy(() => import('@/pages/apprentice-courses/Module5Section7_4'));
const Module5Section7_5 = lazy(() => import('@/pages/apprentice-courses/Module5Section7_5'));

// Module 6 pages
const Module6Section1 = lazy(() => import('@/pages/apprentice-courses/Module6Section1'));
const Module6Section1_1 = lazy(() => import('@/pages/apprentice-courses/Module6Section1_1'));
const Module6Section1_2 = lazy(() => import('@/pages/apprentice-courses/Module6Section1_2'));
const Module6Section1_3 = lazy(() => import('@/pages/apprentice-courses/Module6Section1_3'));
const Module6Section1_4 = lazy(() => import('@/pages/apprentice-courses/Module6Section1_4'));
const Module6Section1_5 = lazy(() => import('@/pages/apprentice-courses/Module6Section1_5'));
const Module6Section2 = lazy(() => import('@/pages/apprentice-courses/Module6Section2'));
const Module6Section2_1 = lazy(() => import('@/pages/apprentice-courses/Module6Section2_1'));
const Module6Section2_2 = lazy(() => import('@/pages/apprentice-courses/Module6Section2_2'));
const Module6Section2_3 = lazy(() => import('@/pages/apprentice-courses/Module6Section2_3'));
const Module6Section2_4 = lazy(() => import('@/pages/apprentice-courses/Module6Section2_4'));
const Module6Section2_5 = lazy(() => import('@/pages/apprentice-courses/Module6Section2_5'));
const Module6Section2_6 = lazy(() => import('@/pages/apprentice-courses/Module6Section2_6'));
const Module6Section3 = lazy(() => import('@/pages/apprentice-courses/Module6Section3'));
const Module6Section3_1 = lazy(() => import('@/pages/apprentice-courses/Module6Section3_1'));
const Module6Section3_2 = lazy(() => import('@/pages/apprentice-courses/Module6Section3_2'));
const Module6Section3_3 = lazy(() => import('@/pages/apprentice-courses/Module6Section3_3'));
const Module6Section3_4 = lazy(() => import('@/pages/apprentice-courses/Module6Section3_4'));
const Module6Section3_5 = lazy(() => import('@/pages/apprentice-courses/Module6Section3_5'));
const Module6Section3_6 = lazy(() => import('@/pages/apprentice-courses/Module6Section3_6'));
const Module6Section4 = lazy(() => import('@/pages/apprentice-courses/Module6Section4'));
const Module6Section4_1 = lazy(() => import('@/pages/apprentice-courses/Module6Section4_1'));
const Module6Section4_2 = lazy(() => import('@/pages/apprentice-courses/Module6Section4_2'));
const Module6Section4_3 = lazy(() => import('@/pages/apprentice-courses/Module6Section4_3'));
const Module6Section4_4 = lazy(() => import('@/pages/apprentice-courses/Module6Section4_4'));
const Module6Section4_5 = lazy(() => import('@/pages/apprentice-courses/Module6Section4_5'));
const Module6Section5 = lazy(() => import('@/pages/apprentice-courses/Module6Section5'));
const Module6Section5_1 = lazy(() => import('@/pages/apprentice-courses/Module6Section5_1'));
const Module6Section5_2 = lazy(() => import('@/pages/apprentice-courses/Module6Section5_2'));
const Module6Section5_3 = lazy(() => import('@/pages/apprentice-courses/Module6Section5_3'));
const Module6Section5_4 = lazy(() => import('@/pages/apprentice-courses/Module6Section5_4'));
const Module6Section6 = lazy(() => import('@/pages/apprentice-courses/Module6Section6'));
const Level2Module6Section6_1 = lazy(() => import('@/pages/apprentice-courses/Level2Module6Section6_1'));
const Level2Module6Section6_2 = lazy(() => import('@/pages/apprentice-courses/Level2Module6Section6_2'));
const Level2Module6Section6_3 = lazy(() => import('@/pages/apprentice-courses/Level2Module6Section6_3'));
const Level2Module6Section6_4 = lazy(() => import('@/pages/apprentice-courses/Level2Module6Section6_4'));
const Level2Module6Section6_5 = lazy(() => import('@/pages/apprentice-courses/Level2Module6Section6_5'));
const Module6Section7 = lazy(() => import('@/pages/apprentice-courses/Module6Section7'));
const Module6Section7_1 = lazy(() => import('@/pages/apprentice-courses/Module6Section7_1'));
const Module6Section7_2 = lazy(() => import('@/pages/apprentice-courses/Module6Section7_2'));
const Module6Section7_3 = lazy(() => import('@/pages/apprentice-courses/Module6Section7_3'));
const Module6Section7_4 = lazy(() => import('@/pages/apprentice-courses/Module6Section7_4'));

// Module 7 pages
const Module7Section1 = lazy(() => import('@/pages/apprentice-courses/Module7Section1'));
const Module7Section1_1 = lazy(() => import('@/pages/apprentice-courses/Module7Section1_1'));
const Module7Section1_2 = lazy(() => import('@/pages/apprentice-courses/Module7Section1_2'));
const Module7Section1_3 = lazy(() => import('@/pages/apprentice-courses/Module7Section1_3'));
const Module7Section1_4 = lazy(() => import('@/pages/apprentice-courses/Module7Section1_4'));
const Module7Section1_5 = lazy(() => import('@/pages/apprentice-courses/Module7Section1_5'));
const Module7Section2 = lazy(() => import('@/pages/apprentice-courses/Module7Section2'));
const Module7Section2_1 = lazy(() => import('@/pages/apprentice-courses/Module7Section2_1'));
const Module7Section2_2 = lazy(() => import('@/pages/apprentice-courses/Module7Section2_2'));
const Module7Section2_3 = lazy(() => import('@/pages/apprentice-courses/Module7Section2_3'));
const Module7Section2_4 = lazy(() => import('@/pages/apprentice-courses/Module7Section2_4'));
const Module7Section2_5 = lazy(() => import('@/pages/apprentice-courses/Module7Section2_5'));
const Module7Section2_6 = lazy(() => import('@/pages/apprentice-courses/Module7Section2_6'));
const Module7Section3 = lazy(() => import('@/pages/apprentice-courses/Module7Section3'));
const Module7Section3_1 = lazy(() => import('@/pages/apprentice-courses/Module7Section3_1'));
const Module7Section3_2 = lazy(() => import('@/pages/apprentice-courses/Module7Section3_2'));
const Module7Section3_3 = lazy(() => import('@/pages/apprentice-courses/Module7Section3_3'));
const Module7Section3_4 = lazy(() => import('@/pages/apprentice-courses/Module7Section3_4'));
const Module7Section3_5 = lazy(() => import('@/pages/apprentice-courses/Module7Section3_5'));
const Module7Section4 = lazy(() => import('@/pages/apprentice-courses/Module7Section4'));
const Module7Section4_1 = lazy(() => import('@/pages/apprentice-courses/Module7Section4_1'));
const Module7Section4_2 = lazy(() => import('@/pages/apprentice-courses/Module7Section4_2'));
const Module7Section4_3 = lazy(() => import('@/pages/apprentice-courses/Module7Section4_3'));
const Module7Section4_4 = lazy(() => import('@/pages/apprentice-courses/Module7Section4_4'));
const Module7Section4_5 = lazy(() => import('@/pages/apprentice-courses/Module7Section4_5'));
const Module7Section4_6 = lazy(() => import('@/pages/apprentice-courses/Module7Section4_6'));
const Module7Section5 = lazy(() => import('@/pages/apprentice-courses/Module7Section5'));
const Module7Section5_1 = lazy(() => import('@/pages/apprentice-courses/Module7Section5_1'));
const Module7Section5_2 = lazy(() => import('@/pages/apprentice-courses/Module7Section5_2'));
const Module7Section5_3 = lazy(() => import('@/pages/apprentice-courses/Module7Section5_3'));
const Module7Section5_4 = lazy(() => import('@/pages/apprentice-courses/Module7Section5_4'));
const Module7Section5_5 = lazy(() => import('@/pages/apprentice-courses/Module7Section5_5'));
const Module7Section6 = lazy(() => import('@/pages/apprentice-courses/Module7Section6'));
const Module7Section6_1 = lazy(() => import('@/pages/apprentice-courses/Module7Section6_1'));
const Module7Section6_2 = lazy(() => import('@/pages/apprentice-courses/Module7Section6_2'));
const Module7Section6_3 = lazy(() => import('@/pages/apprentice-courses/Module7Section6_3'));
const Module7Section6_4 = lazy(() => import('@/pages/apprentice-courses/Module7Section6_4'));
const Module7Section6_5 = lazy(() => import('@/pages/apprentice-courses/Module7Section6_5'));
const Level2Module7MockExam7 = lazy(() => import('@/pages/apprentice-courses/Level2Module7MockExam7'));

// Module 8 pages (Mock Exams)
const Level2Module8Section1 = lazy(() => import('@/pages/apprentice-courses/Level2Module8Section1'));
const Level2Module8Section2 = lazy(() => import('@/pages/apprentice-courses/Level2Module8Section2'));
const Level2Module8Section2Section1 = lazy(() => import('@/pages/apprentice-courses/Level2Module8Section2Section1'));
const Level2Module8Section2Section2 = lazy(() => import('@/pages/apprentice-courses/Level2Module8Section2Section2'));
const Level2Module8Section2Section3 = lazy(() => import('@/pages/apprentice-courses/Level2Module8Section2Section3'));
const Level2Module8Section2Section4 = lazy(() => import('@/pages/apprentice-courses/Level2Module8Section2Section4'));
const Level2Module8MockExam1 = lazy(() => import('@/pages/apprentice-courses/Level2Module8MockExam1'));
const Level2Module8MockExam2 = lazy(() => import('@/pages/apprentice-courses/Level2Module8MockExam2'));
const Level2Module8MockExam3 = lazy(() => import('@/pages/apprentice-courses/Level2Module8MockExam3'));
const Level2Module8MockExam4 = lazy(() => import('@/pages/apprentice-courses/Level2Module8MockExam4'));
const Level2Module8MockExam5 = lazy(() => import('@/pages/apprentice-courses/Level2Module8MockExam5'));
const Level2Module8MockExam6 = lazy(() => import('@/pages/apprentice-courses/Level2Module8MockExam6'));
const Level2Module8MockExam8 = lazy(() => import('@/pages/apprentice-courses/Level2Module8MockExam8'));

export default function Level2Routes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Level2Tracker />
      <Routes>
        {/* Level 2 main page */}
        <Route index element={<Level2 />} />

        {/* Module 1: Health & Safety */}
        <Route path="module1" element={<Module1 />} />
        <Route path="module1/section1" element={<Section1 />} />
        <Route path="module1/section1/1-1" element={<Subsection1 />} />
        <Route path="module1/section1/1-2" element={<Subsection2 />} />
        <Route path="module1/section1/1-3" element={<Subsection3 />} />
        <Route path="module1/section1/1-4" element={<Subsection4 />} />
        <Route path="module1/section2" element={<Section2 />} />
        <Route path="module1/section2/2-1" element={<Section2_1_ElectricShock />} />
        <Route path="module1/section2/2-2" element={<Subsection6 />} />
        <Route path="module1/section2/2-3" element={<Subsection7 />} />
        <Route path="module1/section2/2-4" element={<Subsection8 />} />
        <Route path="module1/section2/2-5" element={<Subsection9 />} />
        <Route path="module1/section3" element={<Section3 />} />
        <Route path="module1/section3/3-1" element={<Subsection10 />} />
        <Route path="module1/section3/3-2" element={<Subsection11 />} />
        <Route path="module1/section3/3-3" element={<Subsection12 />} />
        <Route path="module1/section3/3-4" element={<Subsection13 />} />
        <Route path="module1/section4" element={<Section4 />} />
        <Route path="module1/section4/4-1" element={<Subsection14 />} />
        <Route path="module1/section4/4-2" element={<Subsection15 />} />
        <Route path="module1/section4/4-3" element={<Subsection16 />} />
        <Route path="module1/section4/4-4" element={<Subsection17 />} />
        <Route path="module1/section5" element={<Section5 />} />
        <Route path="module1/section5/5-1" element={<Subsection18 />} />
        <Route path="module1/section5/5-2" element={<Subsection19 />} />
        <Route path="module1/section5/5-3" element={<Subsection20 />} />
        <Route path="module1/section5/5-4" element={<Subsection21 />} />
        <Route path="module1/section5/5-5" element={<Subsection22 />} />
        <Route path="module1/section6" element={<Section6 />} />
        <Route path="module1/section6/6-1" element={<Subsection23 />} />
        <Route path="module1/section6/6-2" element={<Subsection24 />} />
        <Route path="module1/section6/6-3" element={<Subsection25 />} />
        <Route path="module1/section6/6-4" element={<Subsection26 />} />
        <Route path="module1/section6/6-5" element={<Subsection27 />} />
        <Route path="module1/section6/6-6" element={<Subsection28 />} />

        {/* Module 2: Electrical Science */}
        <Route path="module2" element={<Module2 />} />
        <Route path="module2/section1" element={<Subsection30 />} />
        <Route path="module2/section1/1-1" element={<Module2Section1_1 />} />
        <Route path="module2/section1/1-2" element={<Module2Section1_2 />} />
        <Route path="module2/section1/1-3" element={<Module2Section1_3 />} />
        <Route path="module2/section1/1-4" element={<Module2Section1_4 />} />
        <Route path="module2/section1/1-5" element={<Module2Section1_5 />} />
        <Route path="module2/section2" element={<Subsection31 />} />
        <Route path="module2/section2/2-1" element={<Module2Section2_1 />} />
        <Route path="module2/section2/2-2" element={<Module2Section2_2 />} />
        <Route path="module2/section2/2-3" element={<Module2Section2_3 />} />
        <Route path="module2/section2/2-4" element={<Module2Section2_4 />} />
        <Route path="module2/section2/2-5" element={<Module2Section2_5 />} />
        <Route path="module2/section2/2-6" element={<Module2Section2_6 />} />
        <Route path="module2/section3" element={<Subsection32 />} />
        <Route path="module2/section3/3-1" element={<Module2Section3_1 />} />
        <Route path="module2/section3/3-2" element={<Module2Section3_2 />} />
        <Route path="module2/section3/3-3" element={<Module2Section3_3 />} />
        <Route path="module2/section3/3-4" element={<Module2Section3_4 />} />
        <Route path="module2/section3/3-5" element={<Module2Section3_5 />} />
        <Route path="module2/section3/3-6" element={<Module2Section3_6 />} />
        <Route path="module2/section4" element={<Subsection33 />} />
        <Route path="module2/section4/4-1" element={<Module2Section4_1 />} />
        <Route path="module2/section4/4-2" element={<Module2Section4_2 />} />
        <Route path="module2/section4/4-3" element={<Module2Section4_3 />} />
        <Route path="module2/section4/4-4" element={<Module2Section4_4 />} />
        <Route path="module2/section4/4-5" element={<Module2Section4_5 />} />
        <Route path="module2/section4/4-6" element={<Module2Section4_6 />} />
        <Route path="module2/section5" element={<Subsection34 />} />
        <Route path="module2/section5/5-1" element={<Module2Section5_1 />} />
        <Route path="module2/section5/5-2" element={<Module2Section5_2 />} />
        <Route path="module2/section5/5-3" element={<Module2Section5_3 />} />
        <Route path="module2/section5/5-4" element={<Module2Section5_4 />} />
        <Route path="module2/section5/5-5" element={<Module2Section5_5 />} />
        <Route path="module2/section5/5-6" element={<Module2Section5_6 />} />
        <Route path="module2/section6" element={<Subsection29 />} />
        <Route path="module2/section6/6-1" element={<Module2Section6_1 />} />
        <Route path="module2/section6/6-2" element={<Module2Section6_2 />} />
        <Route path="module2/section6/6-3" element={<Module2Section6_3 />} />
        <Route path="module2/section6/6-4" element={<Module2Section6_4 />} />
        <Route path="module2/section6/6-5" element={<Module2Section6_5 />} />
        <Route path="module2/section6/6-6" element={<Module2Section6_6 />} />

        {/* Module 3: Installation Methods */}
        <Route path="module3" element={<Module3 />} />
        <Route path="module3/section1" element={<Module3Section1 />} />
        <Route path="module3/section1/1-1" element={<Module3Section1_1 />} />
        <Route path="module3/section1/1-2" element={<Module3Section1_2 />} />
        <Route path="module3/section1/1-3" element={<Module3Section1_3 />} />
        <Route path="module3/section1/1-4" element={<Module3Section1_4 />} />
        <Route path="module3/section1/1-5" element={<Module3Section1_5 />} />
        <Route path="module3/section1/1-6" element={<Module3Section1_6 />} />
        <Route path="module3/section1/1-7" element={<Module3Section1_7 />} />
        <Route path="module3/section2" element={<Module3Section2 />} />
        <Route path="module3/section2/2-1" element={<Module3Section2_1 />} />
        <Route path="module3/section2/2-2" element={<Module3Section2_2 />} />
        <Route path="module3/section2/2-3" element={<Module3Section2_3 />} />
        <Route path="module3/section2/2-4" element={<Module3Section2_4 />} />
        <Route path="module3/section2/2-5" element={<Module3Section2_5 />} />
        <Route path="module3/section2/2-6" element={<Module3Section2_6 />} />
        <Route path="module3/section2/2-7" element={<Module3Section2_7 />} />
        <Route path="module3/section3" element={<Module3Section3 />} />
        <Route path="module3/section3/3-1" element={<Module3Section3_1 />} />
        <Route path="module3/section3/3-2" element={<Module3Section3_2 />} />
        <Route path="module3/section3/3-3" element={<Module3Section3_3 />} />
        <Route path="module3/section3/3-4" element={<Module3Section3_4 />} />
        <Route path="module3/section3/3-5" element={<Module3Section3_5 />} />
        <Route path="module3/section3/3-6" element={<Module3Section3_6 />} />
        <Route path="module3/section4" element={<Module3Section4 />} />
        <Route path="module3/section4/4-1" element={<Module3Section4_1 />} />
        <Route path="module3/section4/4-2" element={<Module3Section4_2 />} />
        <Route path="module3/section4/4-3" element={<Module3Section4_3 />} />
        <Route path="module3/section4/4-4" element={<Module3Section4_4 />} />
        <Route path="module3/section4/4-5" element={<Module3Section4_5 />} />
        <Route path="module3/section4/4-6" element={<Module3Section4_6 />} />
        <Route path="module3/section5" element={<Module3Section5 />} />
        <Route path="module3/section5/5-1" element={<Module3Section5_1 />} />
        <Route path="module3/section5/5-2" element={<Module3Section5_2 />} />
        <Route path="module3/section5/5-3" element={<Module3Section5_3 />} />
        <Route path="module3/section5/5-4" element={<Module3Section5_4 />} />
        <Route path="module3/section5/5-5" element={<Module3Section5_5 />} />
        <Route path="module3/section6" element={<Module3Section6 />} />
        <Route path="module3/section6/6-1" element={<Module3Section6_1 />} />
        <Route path="module3/section6/6-2" element={<Module3Section6_2 />} />
        <Route path="module3/section6/6-3" element={<Module3Section6_3 />} />
        <Route path="module3/section6/6-4" element={<Module3Section6_4 />} />
        <Route path="module3/section6/6-5" element={<Module3Section6_5 />} />
        <Route path="module3/section6/6-6" element={<Module3Section6_6 />} />

        {/* Module 4: Wiring Systems */}
        <Route path="module4" element={<Module4 />} />
        <Route path="module4/section1" element={<Module4Section1 />} />
        <Route path="module4/section1/1-1" element={<Module4Section1_1 />} />
        <Route path="module4/section1/1-2" element={<Module4Section1_2 />} />
        <Route path="module4/section1/1-3" element={<Module4Section1_3 />} />
        <Route path="module4/section1/1-4" element={<Module4Section1_4 />} />
        <Route path="module4/section1/1-5" element={<Module4Section1_5 />} />
        <Route path="module4/section2" element={<Module4Section2 />} />
        <Route path="module4/section2/2-1" element={<Module4Section2_1 />} />
        <Route path="module4/section2/2-2" element={<Module4Section2_2 />} />
        <Route path="module4/section2/2-3" element={<Module4Section2_3 />} />
        <Route path="module4/section2/2-4" element={<Module4Section2_4 />} />
        <Route path="module4/section3" element={<Module4Section3 />} />
        <Route path="module4/section3/3-1" element={<Module4Section3_1 />} />
        <Route path="module4/section3/3-2" element={<Module4Section3_2 />} />
        <Route path="module4/section3/3-3" element={<Module4Section3_3 />} />
        <Route path="module4/section3/3-4" element={<Module4Section3_4 />} />
        <Route path="module4/section3/3-5" element={<Module4Section3_5 />} />
        <Route path="module4/section4" element={<Module4Section4 />} />
        <Route path="module4/section4/4-1" element={<Module4Section4_1 />} />
        <Route path="module4/section4/4-2" element={<Module4Section4_2 />} />
        <Route path="module4/section4/4-3" element={<Module4Section4_3 />} />
        <Route path="module4/section4/4-4" element={<Module4Section4_4 />} />
        <Route path="module4/section4/4-5" element={<Module4Section4_5 />} />
        <Route path="module4/section4/4-6" element={<Module4Section4_6 />} />
        <Route path="module4/section4/4-7" element={<Module4Section4_7 />} />
        <Route path="module4/section5" element={<Module4Section5 />} />
        <Route path="module4/section5/5-1" element={<Module4Section5_1 />} />
        <Route path="module4/section5/5-2" element={<Module4Section5_2 />} />
        <Route path="module4/section5/5-3" element={<Module4Section5_3 />} />
        <Route path="module4/section5/5-4" element={<Module4Section5_4 />} />
        <Route path="module4/section5/5-5" element={<Module4Section5_5 />} />
        <Route path="module4/section5/5-6" element={<Module4Section5_6 />} />
        <Route path="module4/section5/5-7" element={<Module4Section5_7 />} />
        <Route path="module4/section5/5-8" element={<Module4Section5_8 />} />
        <Route path="module4/section6" element={<Module4Section6 />} />
        <Route path="module4/section6/6-1" element={<Module4Section6_1 />} />
        <Route path="module4/section6/6-2" element={<Module4Section6_2 />} />
        <Route path="module4/section6/6-3" element={<Module4Section6_3 />} />
        <Route path="module4/section6/6-4" element={<Module4Section6_4 />} />
        <Route path="module4/section6/6-5" element={<Module4Section6_5 />} />
        <Route path="module4/section6/6-6" element={<Module4Section6_6 />} />
        <Route path="module4/section7" element={<Module4Section7 />} />
        <Route path="module4/section7/7-1" element={<Module4Section7_1 />} />
        <Route path="module4/section7/7-2" element={<Module4Section7_2 />} />
        <Route path="module4/section7/7-3" element={<Module4Section7_3 />} />
        <Route path="module4/section7/7-4" element={<Module4Section7_4 />} />
        <Route path="module4/section7/7-5" element={<Module4Section7_5 />} />

        {/* Module 5: Design & Planning */}
        <Route path="module5" element={<Module5 />} />
        <Route path="module5/section1" element={<Module5Section1 />} />
        <Route path="module5/section1/1-1" element={<Module5Section1_1 />} />
        <Route path="module5/section1/1-2" element={<Module5Section1_2 />} />
        <Route path="module5/section1/1-3" element={<Module5Section1_3 />} />
        <Route path="module5/section1/1-4" element={<Module5Section1_4 />} />
        <Route path="module5/section1/1-5" element={<Module5Section1_5 />} />
        <Route path="module5/section1/1-6" element={<Module5Section1_6 />} />
        <Route path="module5/section2" element={<Module5Section2 />} />
        <Route path="module5/section2/2-1" element={<Module5Section2_1 />} />
        <Route path="module5/section2/2-2" element={<Module5Section2_2 />} />
        <Route path="module5/section2/2-3" element={<Module5Section2_3 />} />
        <Route path="module5/section2/2-4" element={<Module5Section2_4 />} />
        <Route path="module5/section2/2-5" element={<Module5Section2_5 />} />
        <Route path="module5/section3" element={<Module5Section3 />} />
        <Route path="module5/section3/3-1" element={<Module5Section3_1 />} />
        <Route path="module5/section3/3-2" element={<Module5Section3_2 />} />
        <Route path="module5/section3/3-3" element={<Module5Section3_3 />} />
        <Route path="module5/section3/3-4" element={<Module5Section3_4 />} />
        <Route path="module5/section3/3-5" element={<Module5Section3_5 />} />
        <Route path="module5/section3/3-6" element={<Module5Section3_6 />} />
        <Route path="module5/section4" element={<Module5Section4 />} />
        <Route path="module5/section4/4-1" element={<Module5Section4_1 />} />
        <Route path="module5/section4/4-2" element={<Module5Section4_2 />} />
        <Route path="module5/section4/4-3" element={<Module5Section4_3 />} />
        <Route path="module5/section4/4-4" element={<Module5Section4_4 />} />
        <Route path="module5/section4/4-5" element={<Module5Section4_5 />} />
        <Route path="module5/section5" element={<Module5Section5 />} />
        <Route path="module5/section5/5-1" element={<Module5Section5_1 />} />
        <Route path="module5/section5/5-2" element={<Module5Section5_2 />} />
        <Route path="module5/section5/5-3" element={<Module5Section5_3 />} />
        <Route path="module5/section5/5-4" element={<Module5Section5_4 />} />
        <Route path="module5/section5/5-5" element={<Module5Section5_5 />} />
        <Route path="module5/section6" element={<Module5Section6 />} />
        <Route path="module5/section6/6-1" element={<Module5Section6_1 />} />
        <Route path="module5/section6/6-2" element={<Module5Section6_2 />} />
        <Route path="module5/section6/6-3" element={<Module5Section6_3 />} />
        <Route path="module5/section6/6-4" element={<Module5Section6_4 />} />
        <Route path="module5/section7" element={<Module5Section7 />} />
        <Route path="module5/section7/7-1" element={<Module5Section7_1 />} />
        <Route path="module5/section7/7-2" element={<Module5Section7_2 />} />
        <Route path="module5/section7/7-3" element={<Module5Section7_3 />} />
        <Route path="module5/section7/7-4" element={<Module5Section7_4 />} />
        <Route path="module5/section7/7-5" element={<Module5Section7_5 />} />

        {/* Module 6: Inspection & Testing */}
        <Route path="module6" element={<Module6 />} />
        <Route path="module6/section1" element={<Module6Section1 />} />
        <Route path="module6/section1/1-1" element={<Module6Section1_1 />} />
        <Route path="module6/section1/1-2" element={<Module6Section1_2 />} />
        <Route path="module6/section1/1-3" element={<Module6Section1_3 />} />
        <Route path="module6/section1/1-4" element={<Module6Section1_4 />} />
        <Route path="module6/section1/1-5" element={<Module6Section1_5 />} />
        <Route path="module6/section2" element={<Module6Section2 />} />
        <Route path="module6/section2/2-1" element={<Module6Section2_1 />} />
        <Route path="module6/section2/2-2" element={<Module6Section2_2 />} />
        <Route path="module6/section2/2-3" element={<Module6Section2_3 />} />
        <Route path="module6/section2/2-4" element={<Module6Section2_4 />} />
        <Route path="module6/section2/2-5" element={<Module6Section2_5 />} />
        <Route path="module6/section2/2-6" element={<Module6Section2_6 />} />
        <Route path="module6/section3" element={<Module6Section3 />} />
        <Route path="module6/section3/3-1" element={<Module6Section3_1 />} />
        <Route path="module6/section3/3-2" element={<Module6Section3_2 />} />
        <Route path="module6/section3/3-3" element={<Module6Section3_3 />} />
        <Route path="module6/section3/3-4" element={<Module6Section3_4 />} />
        <Route path="module6/section3/3-5" element={<Module6Section3_5 />} />
        <Route path="module6/section3/3-6" element={<Module6Section3_6 />} />
        <Route path="module6/section4" element={<Module6Section4 />} />
        <Route path="module6/section4/4-1" element={<Module6Section4_1 />} />
        <Route path="module6/section4/4-2" element={<Module6Section4_2 />} />
        <Route path="module6/section4/4-3" element={<Module6Section4_3 />} />
        <Route path="module6/section4/4-4" element={<Module6Section4_4 />} />
        <Route path="module6/section4/4-5" element={<Module6Section4_5 />} />
        <Route path="module6/section5" element={<Module6Section5 />} />
        <Route path="module6/section5/5-1" element={<Module6Section5_1 />} />
        <Route path="module6/section5/5-2" element={<Module6Section5_2 />} />
        <Route path="module6/section5/5-3" element={<Module6Section5_3 />} />
        <Route path="module6/section5/5-4" element={<Module6Section5_4 />} />
        <Route path="module6/section6" element={<Module6Section6 />} />
        <Route path="module6/section6/6-1" element={<Level2Module6Section6_1 />} />
        <Route path="module6/section6/6-2" element={<Level2Module6Section6_2 />} />
        <Route path="module6/section6/6-3" element={<Level2Module6Section6_3 />} />
        <Route path="module6/section6/6-4" element={<Level2Module6Section6_4 />} />
        <Route path="module6/section6/6-5" element={<Level2Module6Section6_5 />} />
        <Route path="module6/section7" element={<Module6Section7 />} />
        <Route path="module6/section7/7-1" element={<Module6Section7_1 />} />
        <Route path="module6/section7/7-2" element={<Module6Section7_2 />} />
        <Route path="module6/section7/7-3" element={<Module6Section7_3 />} />
        <Route path="module6/section7/7-4" element={<Module6Section7_4 />} />

        {/* Module 7: Fault Finding */}
        <Route path="module7" element={<Module7 />} />
        <Route path="module7/section1" element={<Module7Section1 />} />
        <Route path="module7/section1/1-1" element={<Module7Section1_1 />} />
        <Route path="module7/section1/1-2" element={<Module7Section1_2 />} />
        <Route path="module7/section1/1-3" element={<Module7Section1_3 />} />
        <Route path="module7/section1/1-4" element={<Module7Section1_4 />} />
        <Route path="module7/section1/1-5" element={<Module7Section1_5 />} />
        <Route path="module7/section2" element={<Module7Section2 />} />
        <Route path="module7/section2/2-1" element={<Module7Section2_1 />} />
        <Route path="module7/section2/2-2" element={<Module7Section2_2 />} />
        <Route path="module7/section2/2-3" element={<Module7Section2_3 />} />
        <Route path="module7/section2/2-4" element={<Module7Section2_4 />} />
        <Route path="module7/section2/2-5" element={<Module7Section2_5 />} />
        <Route path="module7/section2/2-6" element={<Module7Section2_6 />} />
        <Route path="module7/section3" element={<Module7Section3 />} />
        <Route path="module7/section3/3-1" element={<Module7Section3_1 />} />
        <Route path="module7/section3/3-2" element={<Module7Section3_2 />} />
        <Route path="module7/section3/3-3" element={<Module7Section3_3 />} />
        <Route path="module7/section3/3-4" element={<Module7Section3_4 />} />
        <Route path="module7/section3/3-5" element={<Module7Section3_5 />} />
        <Route path="module7/section4" element={<Module7Section4 />} />
        <Route path="module7/section4/4-1" element={<Module7Section4_1 />} />
        <Route path="module7/section4/4-2" element={<Module7Section4_2 />} />
        <Route path="module7/section4/4-3" element={<Module7Section4_3 />} />
        <Route path="module7/section4/4-4" element={<Module7Section4_4 />} />
        <Route path="module7/section4/4-5" element={<Module7Section4_5 />} />
        <Route path="module7/section4/4-6" element={<Module7Section4_6 />} />
        <Route path="module7/section5" element={<Module7Section5 />} />
        <Route path="module7/section5/5-1" element={<Module7Section5_1 />} />
        <Route path="module7/section5/5-2" element={<Module7Section5_2 />} />
        <Route path="module7/section5/5-3" element={<Module7Section5_3 />} />
        <Route path="module7/section5/5-4" element={<Module7Section5_4 />} />
        <Route path="module7/section5/5-5" element={<Module7Section5_5 />} />
        <Route path="module7/section6" element={<Module7Section6 />} />
        <Route path="module7/section6/6-1" element={<Module7Section6_1 />} />
        <Route path="module7/section6/6-2" element={<Module7Section6_2 />} />
        <Route path="module7/section6/6-3" element={<Module7Section6_3 />} />
        <Route path="module7/section6/6-4" element={<Module7Section6_4 />} />
        <Route path="module7/section6/6-5" element={<Module7Section6_5 />} />
        <Route path="module7/mock-exam-7" element={<Level2Module7MockExam7 />} />

        {/* Module 8: Mock Exams */}
        <Route path="module8" element={<Module8 />} />
        <Route path="module8/section1" element={<Level2Module8Section1 />} />
        <Route path="module8/section1/mock1" element={<Level2Module8MockExam1 />} />
        <Route path="module8/section1/mock2" element={<Level2Module8MockExam2 />} />
        <Route path="module8/section1/mock3" element={<Level2Module8MockExam3 />} />
        <Route path="module8/section1/mock4" element={<Level2Module8MockExam4 />} />
        <Route path="module8/section1/mock5" element={<Level2Module8MockExam5 />} />
        <Route path="module8/section1/mock6" element={<Level2Module8MockExam6 />} />
        <Route path="module8/section1/mock8" element={<Level2Module8MockExam8 />} />
        <Route path="module8/section2" element={<Level2Module8Section2 />} />
        <Route path="module8/section2/section1" element={<Level2Module8Section2Section1 />} />
        <Route path="module8/section2/section2" element={<Level2Module8Section2Section2 />} />
        <Route path="module8/section2/section3" element={<Level2Module8Section2Section3 />} />
        <Route path="module8/section2/section4" element={<Level2Module8Section2Section4 />} />
      </Routes>
    </Suspense>
  );
}
