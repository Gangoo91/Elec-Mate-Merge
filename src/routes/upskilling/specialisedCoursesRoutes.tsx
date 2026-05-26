import React from 'react';
import { Route } from 'react-router-dom';
import { withTimeout, trackImport } from '@/lib/lazy';

// Lazy load all route components with timeout protection
const InstrumentationCourse = React.lazy(() =>
  withTimeout(() =>
    trackImport('InstrumentationCourse', () => import('@/pages/upskilling/InstrumentationCourse'))
  )
);
const InstrumentationModule1 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule1')
);
const InstrumentationModule1Section1 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule1Section1')
);
const InstrumentationModule1Section2 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule1Section2')
);
const InstrumentationModule1Section3 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule1Section3')
);
const InstrumentationModule1Section4 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule1Section4')
);
const InstrumentationModule2 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule2')
);
const InstrumentationModule2Section1 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule2Section1')
);
const InstrumentationModule2Section2 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule2Section2')
);
const InstrumentationModule2Section3 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule2Section3')
);
const InstrumentationModule2Section4 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule2Section4')
);
const InstrumentationModule2Section5 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule2Section5')
);
const InstrumentationModule2Section6 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule2Section6')
);
const InstrumentationModule3 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule3')
);
const InstrumentationModule3Section1 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule3Section1')
);
const InstrumentationModule3Section2 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule3Section2')
);
const InstrumentationModule3Section3 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule3Section3')
);
const InstrumentationModule3Section4 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule3Section4')
);
const InstrumentationModule3Section5 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule3Section5')
);
const InstrumentationModule4 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule4')
);
const InstrumentationModule4Section1 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule4Section1')
);
const InstrumentationModule4Section2 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule4Section2')
);
const InstrumentationModule4Section3 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule4Section3')
);
const InstrumentationModule4Section4 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule4Section4')
);
const InstrumentationModule4Section5 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule4Section5')
);
const InstrumentationModule5 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule5')
);
const InstrumentationModule5Section1 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule5Section1')
);
const InstrumentationModule5Section2 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule5Section2')
);
const InstrumentationModule5Section3 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule5Section3')
);
const InstrumentationModule5Section4 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule5Section4')
);
const InstrumentationModule5Section5 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule5Section5')
);
const InstrumentationModule5Section6 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule5Section6')
);
const InstrumentationModule6 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule6')
);
const InstrumentationModule6Section1 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule6Section1')
);
const InstrumentationModule6Section2 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule6Section2')
);
const InstrumentationModule6Section3 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule6Section3')
);
const InstrumentationModule6Section4 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule6Section4')
);
const InstrumentationModule6Section5 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule6Section5')
);
const InstrumentationModule6Section6 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule6Section6')
);
const InstrumentationModule7 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule7')
);
const InstrumentationModule7Section1 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule7Section1')
);
const InstrumentationModule7Section2 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule7Section2')
);
const InstrumentationModule7Section3 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule7Section3')
);
const InstrumentationModule7Section4 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule7Section4')
);
const InstrumentationModule7Section5 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule7Section5')
);
const InstrumentationModule7Section6 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule7Section6')
);
const InstrumentationModule7Section7 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule7Section7')
);
const InstrumentationModule8 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule8')
);
const InstrumentationModule8Section1 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule8Section1')
);
const InstrumentationModule8Section2 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule8Section2')
);
const InstrumentationModule8Section3 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule8Section3')
);
const InstrumentationModule8Section4 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule8Section4')
);
const InstrumentationModule8Section5 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule8Section5')
);
const InstrumentationModule8Section6 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule8Section6')
);
const InstrumentationModule9 = React.lazy(
  () => import('@/pages/upskilling/InstrumentationModule9')
);
const SmartHomeCourse = React.lazy(() => import('@/pages/upskilling/SmartHomeCourse'));
const SmartHomeModule1 = React.lazy(() => import('@/pages/upskilling/SmartHomeModule1'));
const SmartHomeModule2 = React.lazy(() => import('@/pages/upskilling/SmartHomeModule2'));
const SmartHomeModule3 = React.lazy(() => import('@/pages/upskilling/SmartHomeModule3'));
const SmartHomeModule4 = React.lazy(() => import('@/pages/upskilling/SmartHomeModule4'));
const SmartHomeModule5 = React.lazy(() => import('@/pages/upskilling/SmartHomeModule5'));
const SmartHomeModule6 = React.lazy(() => import('@/pages/upskilling/SmartHomeModule6'));
const SmartHomeModule7 = React.lazy(() => import('@/pages/upskilling/SmartHomeModule7'));
const SmartHomeModule8 = React.lazy(() => import('@/pages/upskilling/SmartHomeModule8'));
const SmartHomeMockExam = React.lazy(() => import('@/pages/upskilling/SmartHomeMockExam'));
const SmartHomeModule7Section1 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule7Section1')
);
const SmartHomeModule7Section2 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule7Section2')
);
const SmartHomeModule7Section3 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule7Section3')
);
const SmartHomeModule7Section4 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule7Section4')
);
const SmartHomeModule7Section5 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule7Section5')
);
const SmartHomeModule7Section6 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule7Section6')
);
const SmartHomeModule1Section1 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule1Section1')
);
const SmartHomeModule1Section2 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule1Section2')
);
const SmartHomeModule1Section3 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule1Section3')
);
const SmartHomeModule1Section4 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule1Section4')
);
const SmartHomeModule1Section5 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule1Section5')
);
const SmartHomeModule2Section1 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule2Section1')
);
const SmartHomeModule2Section2 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule2Section2')
);
const SmartHomeModule2Section3 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule2Section3')
);
const SmartHomeModule2Section4 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule2Section4')
);
const SmartHomeModule2Section5 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule2Section5')
);
const SmartHomeModule2Section6 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule2Section6')
);
const SmartHomeModule3Section1 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule3Section1')
);
const SmartHomeModule3Section2 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule3Section2')
);
const SmartHomeModule3Section3 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule3Section3')
);
const SmartHomeModule3Section4 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule3Section4')
);
const SmartHomeModule3Section5 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule3Section5')
);
const SmartHomeModule4Section1 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule4Section1')
);
const SmartHomeModule4Section2 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule4Section2')
);
const SmartHomeModule4Section3 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule4Section3')
);
const SmartHomeModule4Section4 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule4Section4')
);
const SmartHomeModule4Section5 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule4Section5')
);
const SmartHomeModule4Section6 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule4Section6')
);
const SmartHomeModule5Section1 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule5Section1')
);
const SmartHomeModule5Section2 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule5Section2')
);
const SmartHomeModule5Section3 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule5Section3')
);
const SmartHomeModule5Section4 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule5Section4')
);
const SmartHomeModule5Section5 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule5Section5')
);
const SmartHomeModule5Section6 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule5Section6')
);
const SmartHomeModule6Section1 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule6Section1')
);
const SmartHomeModule6Section2 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule6Section2')
);
const SmartHomeModule6Section3 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule6Section3')
);
const SmartHomeModule6Section4 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule6Section4')
);
const SmartHomeModule6Section5 = React.lazy(
  () => import('@/pages/upskilling/SmartHomeModule6Section5')
);
const EVChargingCourse = React.lazy(() => import('@/pages/upskilling/EVChargingCourse'));
const EVChargingModule1 = React.lazy(() => import('@/pages/upskilling/EVChargingModule1'));
const EVChargingModule2 = React.lazy(() => import('@/pages/upskilling/EVChargingModule2'));
const EVChargingModule3 = React.lazy(() => import('@/pages/upskilling/EVChargingModule3'));
const EVChargingModule3Section1 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule3Section1')
);
const EVChargingModule3Section2 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule3Section2')
);
const EVChargingModule3Section3 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule3Section3')
);
const EVChargingModule3Section4 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule3Section4')
);
const EVChargingModule3Section5 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule3Section5')
);
const EVChargingModule4Section1 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule4Section1')
);
const EVChargingModule4Section2 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule4Section2')
);
const EVChargingModule4Section3 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule4Section3')
);
const EVChargingModule4Section4 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule4Section4')
);
const EVChargingModule4Section5 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule4Section5')
);
const EVChargingModule4 = React.lazy(() => import('@/pages/upskilling/EVChargingModule4'));
const EVChargingModule5 = React.lazy(() => import('@/pages/upskilling/EVChargingModule5'));
const EVChargingModule5Section1 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule5Section1')
);
const EVChargingModule5Section2 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule5Section2')
);
const EVChargingModule5Section3 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule5Section3')
);
const EVChargingModule5Section4 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule5Section4')
);
const EVChargingModule5Section5 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule5Section5')
);
const EVChargingModule6 = React.lazy(() => import('@/pages/upskilling/EVChargingModule6'));
const EVChargingModule6Section1 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule6Section1')
);
const EVChargingModule6Section2 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule6Section2')
);
const EVChargingModule6Section3 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule6Section3')
);
const EVChargingModule6Section4 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule6Section4')
);
const EVChargingModule6Section5 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule6Section5')
);
const EVChargingModule6Section6 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule6Section6')
);
const EVChargingModule7 = React.lazy(() => import('@/pages/upskilling/EVChargingModule7'));
const EVChargingModule7Section1 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule7Section1')
);
const EVChargingModule7Section2 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule7Section2')
);
const EVChargingModule7Section3 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule7Section3')
);
const EVChargingModule7Section4 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule7Section4')
);
const EVChargingMockExam = React.lazy(() => import('@/pages/upskilling/EVChargingMockExam'));
const EVChargingModule1Section1 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule1Section1')
);
const EVChargingModule1Section2 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule1Section2')
);
const EVChargingModule1Section3 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule1Section3')
);
const EVChargingModule1Section4 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule1Section4')
);
const EVChargingModule1Section5 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule1Section5')
);
const EVChargingModule2Section1 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule2Section1')
);
const EVChargingModule2Section2 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule2Section2')
);
const EVChargingModule2Section3 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule2Section3')
);
const EVChargingModule2Section4 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule2Section4')
);
const EVChargingModule2Section5 = React.lazy(
  () => import('@/pages/upskilling/EVChargingModule2Section5')
);
const EnergyEfficiencyCourse = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyCourse')
);
const EnergyEfficiencyModule1 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule1')
);
const EnergyEfficiencyModule1Section1 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule1Section1')
);
const EnergyEfficiencyModule1Section2 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule1Section2')
);
const EnergyEfficiencyModule1Section3 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule1Section3')
);
const EnergyEfficiencyModule1Section4 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule1Section4')
);
const EnergyEfficiencyModule2 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule2')
);
const EnergyEfficiencyModule2Section1 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule2Section1')
);
const EnergyEfficiencyModule2Section2 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule2Section2')
);
const EnergyEfficiencyModule2Section3 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule2Section3')
);
const EnergyEfficiencyModule2Section4 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule2Section4')
);
const EnergyEfficiencyModule2Section5 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule2Section5')
);
const EnergyEfficiencyModule3 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule3')
);
const EnergyEfficiencyModule3Section1 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule3Section1')
);
const EnergyEfficiencyModule3Section2 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule3Section2')
);
const EnergyEfficiencyModule3Section3 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule3Section3')
);
const EnergyEfficiencyModule3Section4 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule3Section4')
);
const EnergyEfficiencyModule3Section5 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule3Section5')
);
const EnergyEfficiencyModule4 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule4')
);
const EnergyEfficiencyModule4Section1 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule4Section1')
);
const EnergyEfficiencyModule4Section2 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule4Section2')
);
const EnergyEfficiencyModule4Section3 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule4Section3')
);
const EnergyEfficiencyModule4Section4 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule4Section4')
);
const EnergyEfficiencyModule4Section5 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule4Section5')
);
const EnergyEfficiencyModule5 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule5')
);
const EnergyEfficiencyModule5Section1 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule5Section1')
);
const EnergyEfficiencyModule5Section2 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule5Section2')
);
const EnergyEfficiencyModule5Section3 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule5Section3')
);
const EnergyEfficiencyModule5Section4 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule5Section4')
);
const EnergyEfficiencyModule5Section5 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule5Section5')
);
const EnergyEfficiencyModule6 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule6')
);
const EnergyEfficiencyModule6Section1 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule6Section1')
);
const EnergyEfficiencyModule6Section2 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule6Section2')
);
const EnergyEfficiencyModule6Section3 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule6Section3')
);
const EnergyEfficiencyModule6Section4 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule6Section4')
);
const EnergyEfficiencyModule6Section5 = React.lazy(
  () => import('@/pages/upskilling/EnergyEfficiencyModule6Section5')
);

export const specialisedCoursesRoutes = (
  <>
    <Route path="instrumentation-course" element={<InstrumentationCourse />} />,
    <Route path="instrumentation-module-1" element={<InstrumentationModule1 />} />,
    <Route path="instrumentation-module-1-section-1" element={<InstrumentationModule1Section1 />} />
    ,
    <Route path="instrumentation-module-1-section-2" element={<InstrumentationModule1Section2 />} />
    ,
    <Route path="instrumentation-module-1-section-3" element={<InstrumentationModule1Section3 />} />
    ,
    <Route path="instrumentation-module-1-section-4" element={<InstrumentationModule1Section4 />} />
    ,
    <Route path="instrumentation-module-2" element={<InstrumentationModule2 />} />,
    <Route path="instrumentation-module-2-section-1" element={<InstrumentationModule2Section1 />} />
    ,
    <Route path="instrumentation-module-2-section-2" element={<InstrumentationModule2Section2 />} />
    ,
    <Route path="instrumentation-module-2-section-3" element={<InstrumentationModule2Section3 />} />
    ,
    <Route path="instrumentation-module-2-section-4" element={<InstrumentationModule2Section4 />} />
    ,
    <Route path="instrumentation-module-2-section-5" element={<InstrumentationModule2Section5 />} />
    ,
    <Route path="instrumentation-module-2-section-6" element={<InstrumentationModule2Section6 />} />
    ,
    <Route path="instrumentation-module-3" element={<InstrumentationModule3 />} />,
    <Route path="instrumentation-module-3-section-1" element={<InstrumentationModule3Section1 />} />
    ,
    <Route path="instrumentation-module-3-section-2" element={<InstrumentationModule3Section2 />} />
    ,
    <Route path="instrumentation-module-3-section-3" element={<InstrumentationModule3Section3 />} />
    ,
    <Route path="instrumentation-module-3-section-4" element={<InstrumentationModule3Section4 />} />
    ,
    <Route path="instrumentation-module-3-section-5" element={<InstrumentationModule3Section5 />} />
    ,
    <Route path="instrumentation-module-4" element={<InstrumentationModule4 />} />,
    <Route path="instrumentation-module-4-section-1" element={<InstrumentationModule4Section1 />} />
    ,
    <Route path="instrumentation-module-4-section-2" element={<InstrumentationModule4Section2 />} />
    ,
    <Route path="instrumentation-module-4-section-3" element={<InstrumentationModule4Section3 />} />
    ,
    <Route path="instrumentation-module-4-section-4" element={<InstrumentationModule4Section4 />} />
    ,
    <Route path="instrumentation-module-4-section-5" element={<InstrumentationModule4Section5 />} />
    ,
    <Route path="instrumentation-module-5" element={<InstrumentationModule5 />} />,
    <Route path="instrumentation-module-5-section-1" element={<InstrumentationModule5Section1 />} />
    ,
    <Route path="instrumentation-module-5-section-2" element={<InstrumentationModule5Section2 />} />
    ,
    <Route path="instrumentation-module-5-section-3" element={<InstrumentationModule5Section3 />} />
    ,
    <Route path="instrumentation-module-5-section-4" element={<InstrumentationModule5Section4 />} />
    ,
    <Route path="instrumentation-module-5-section-5" element={<InstrumentationModule5Section5 />} />
    ,
    <Route path="instrumentation-module-5-section-6" element={<InstrumentationModule5Section6 />} />
    ,
    <Route path="instrumentation-module-6" element={<InstrumentationModule6 />} />,
    <Route path="instrumentation-module-6-section-1" element={<InstrumentationModule6Section1 />} />
    ,
    <Route path="instrumentation-module-6-section-2" element={<InstrumentationModule6Section2 />} />
    ,
    <Route path="instrumentation-module-6-section-3" element={<InstrumentationModule6Section3 />} />
    ,
    <Route path="instrumentation-module-6-section-4" element={<InstrumentationModule6Section4 />} />
    ,
    <Route path="instrumentation-module-6-section-5" element={<InstrumentationModule6Section5 />} />
    ,
    <Route path="instrumentation-module-6-section-6" element={<InstrumentationModule6Section6 />} />
    ,
    <Route path="instrumentation-module-7" element={<InstrumentationModule7 />} />,
    <Route path="instrumentation-module-7-section-1" element={<InstrumentationModule7Section1 />} />
    ,
    <Route path="instrumentation-module-7-section-2" element={<InstrumentationModule7Section2 />} />
    ,
    <Route path="instrumentation-module-7-section-3" element={<InstrumentationModule7Section3 />} />
    ,
    <Route path="instrumentation-module-7-section-4" element={<InstrumentationModule7Section4 />} />
    ,
    <Route path="instrumentation-module-7-section-5" element={<InstrumentationModule7Section5 />} />
    ,
    <Route path="instrumentation-module-7-section-6" element={<InstrumentationModule7Section6 />} />
    ,
    <Route path="instrumentation-module-7-section-7" element={<InstrumentationModule7Section7 />} />
    ,
    <Route path="instrumentation-module-8" element={<InstrumentationModule8 />} />,
    <Route path="instrumentation-module-8-section-1" element={<InstrumentationModule8Section1 />} />
    ,
    <Route path="instrumentation-module-8-section-2" element={<InstrumentationModule8Section2 />} />
    ,
    <Route path="instrumentation-module-8-section-3" element={<InstrumentationModule8Section3 />} />
    ,
    <Route path="instrumentation-module-8-section-4" element={<InstrumentationModule8Section4 />} />
    ,
    <Route path="instrumentation-module-8-section-5" element={<InstrumentationModule8Section5 />} />
    ,
    <Route path="instrumentation-module-8-section-6" element={<InstrumentationModule8Section6 />} />
    ,
    <Route path="instrumentation-module-9" element={<InstrumentationModule9 />} />,
    <Route path="smart-home-course" element={<SmartHomeCourse />} />,
    <Route path="smart-home-module-1" element={<SmartHomeModule1 />} />,
    <Route path="smart-home-module-2" element={<SmartHomeModule2 />} />,
    <Route path="smart-home-module-3" element={<SmartHomeModule3 />} />,
    <Route path="smart-home-module-4" element={<SmartHomeModule4 />} />,
    <Route path="smart-home-module-5" element={<SmartHomeModule5 />} />,
    <Route path="smart-home-module-6" element={<SmartHomeModule6 />} />,
    <Route path="smart-home-module-7" element={<SmartHomeModule7 />} />,
    <Route path="smart-home-module-8" element={<SmartHomeModule8 />} />,
    <Route path="smart-home-module-7-section-1" element={<SmartHomeModule7Section1 />} />,
    <Route path="smart-home-module-7-section-2" element={<SmartHomeModule7Section2 />} />,
    <Route path="smart-home-module-7-section-3" element={<SmartHomeModule7Section3 />} />,
    <Route path="smart-home-module-7-section-4" element={<SmartHomeModule7Section4 />} />,
    <Route path="smart-home-module-7-section-5" element={<SmartHomeModule7Section5 />} />,
    <Route path="smart-home-module-7-section-6" element={<SmartHomeModule7Section6 />} />,
    <Route path="smart-home-module-1-section-1" element={<SmartHomeModule1Section1 />} />,
    <Route path="smart-home-module-1-section-2" element={<SmartHomeModule1Section2 />} />,
    <Route path="smart-home-module-1-section-3" element={<SmartHomeModule1Section3 />} />,
    <Route path="smart-home-module-1-section-4" element={<SmartHomeModule1Section4 />} />,
    <Route path="smart-home-module-1-section-5" element={<SmartHomeModule1Section5 />} />,
    <Route path="smart-home-module-2-section-1" element={<SmartHomeModule2Section1 />} />,
    <Route path="smart-home-module-2-section-2" element={<SmartHomeModule2Section2 />} />,
    <Route path="smart-home-module-2-section-3" element={<SmartHomeModule2Section3 />} />,
    <Route path="smart-home-module-2-section-4" element={<SmartHomeModule2Section4 />} />,
    <Route path="smart-home-module-2-section-5" element={<SmartHomeModule2Section5 />} />,
    <Route path="smart-home-module-2-section-6" element={<SmartHomeModule2Section6 />} />,
    <Route path="smart-home-module-3-section-1" element={<SmartHomeModule3Section1 />} />,
    <Route path="smart-home-module-3-section-2" element={<SmartHomeModule3Section2 />} />,
    <Route path="smart-home-module-3-section-3" element={<SmartHomeModule3Section3 />} />,
    <Route path="smart-home-module-3-section-4" element={<SmartHomeModule3Section4 />} />,
    <Route path="smart-home-module-3-section-5" element={<SmartHomeModule3Section5 />} />,
    <Route path="smart-home-module-4-section-1" element={<SmartHomeModule4Section1 />} />,
    <Route path="smart-home-module-4-section-2" element={<SmartHomeModule4Section2 />} />,
    <Route path="smart-home-module-4-section-3" element={<SmartHomeModule4Section3 />} />,
    <Route path="smart-home-module-4-section-4" element={<SmartHomeModule4Section4 />} />,
    <Route path="smart-home-module-4-section-5" element={<SmartHomeModule4Section5 />} />,
    <Route path="smart-home-module-4-section-6" element={<SmartHomeModule4Section6 />} />,
    <Route path="smart-home-module-5-section-1" element={<SmartHomeModule5Section1 />} />,
    <Route path="smart-home-module-5-section-2" element={<SmartHomeModule5Section2 />} />,
    <Route path="smart-home-module-5-section-3" element={<SmartHomeModule5Section3 />} />,
    <Route path="smart-home-module-5-section-4" element={<SmartHomeModule5Section4 />} />,
    <Route path="smart-home-module-5-section-5" element={<SmartHomeModule5Section5 />} />,
    <Route path="smart-home-module-5-section-6" element={<SmartHomeModule5Section6 />} />,
    <Route path="smart-home-module-6-section-1" element={<SmartHomeModule6Section1 />} />,
    <Route path="smart-home-module-6-section-2" element={<SmartHomeModule6Section2 />} />,
    <Route path="smart-home-module-6-section-3" element={<SmartHomeModule6Section3 />} />,
    <Route path="smart-home-module-6-section-4" element={<SmartHomeModule6Section4 />} />,
    <Route path="smart-home-module-6-section-5" element={<SmartHomeModule6Section5 />} />,
    <Route path="ev-charging-course" element={<EVChargingCourse />} />,
    <Route path="ev-charging-module-1" element={<EVChargingModule1 />} />,
    <Route path="ev-charging-module-2" element={<EVChargingModule2 />} />,
    <Route path="ev-charging-module-3" element={<EVChargingModule3 />} />,
    <Route path="ev-charging-module-3-section-1" element={<EVChargingModule3Section1 />} />,
    <Route path="ev-charging-module-3-section-2" element={<EVChargingModule3Section2 />} />,
    <Route path="ev-charging-module-3-section-3" element={<EVChargingModule3Section3 />} />,
    <Route path="ev-charging-module-3-section-4" element={<EVChargingModule3Section4 />} />,
    <Route path="ev-charging-module-3-section-5" element={<EVChargingModule3Section5 />} />,
    <Route path="ev-charging-module-4-section-1" element={<EVChargingModule4Section1 />} />,
    <Route path="ev-charging-module-4-section-2" element={<EVChargingModule4Section2 />} />,
    <Route path="ev-charging-module-4-section-3" element={<EVChargingModule4Section3 />} />,
    <Route path="ev-charging-module-4-section-4" element={<EVChargingModule4Section4 />} />,
    <Route path="ev-charging-module-4-section-5" element={<EVChargingModule4Section5 />} />,
    <Route path="ev-charging-module-4" element={<EVChargingModule4 />} />,
    <Route path="ev-charging-module-5" element={<EVChargingModule5 />} />,
    <Route path="ev-charging-module-5-section-1" element={<EVChargingModule5Section1 />} />,
    <Route path="ev-charging-module-5-section-2" element={<EVChargingModule5Section2 />} />,
    <Route path="ev-charging-module-5-section-3" element={<EVChargingModule5Section3 />} />,
    <Route path="ev-charging-module-5-section-4" element={<EVChargingModule5Section4 />} />,
    <Route path="ev-charging-module-5-section-5" element={<EVChargingModule5Section5 />} />,
    <Route path="ev-charging-module-6" element={<EVChargingModule6 />} />,
    <Route path="ev-charging-module-6-section-1" element={<EVChargingModule6Section1 />} />,
    <Route path="ev-charging-module-6-section-2" element={<EVChargingModule6Section2 />} />,
    <Route path="ev-charging-module-6-section-3" element={<EVChargingModule6Section3 />} />,
    <Route path="ev-charging-module-6-section-4" element={<EVChargingModule6Section4 />} />,
    <Route path="ev-charging-module-6-section-5" element={<EVChargingModule6Section5 />} />,
    <Route path="ev-charging-module-6-section-6" element={<EVChargingModule6Section6 />} />,
    <Route path="ev-charging-module-7" element={<EVChargingModule7 />} />,
    <Route path="ev-charging-module-7-section-1" element={<EVChargingModule7Section1 />} />,
    <Route path="ev-charging-module-7-section-2" element={<EVChargingModule7Section2 />} />,
    <Route path="ev-charging-module-7-section-3" element={<EVChargingModule7Section3 />} />,
    <Route path="ev-charging-module-7-section-4" element={<EVChargingModule7Section4 />} />,
    <Route path="ev-charging-module-1-section-1" element={<EVChargingModule1Section1 />} />,
    <Route path="ev-charging-module-1-section-2" element={<EVChargingModule1Section2 />} />,
    <Route path="ev-charging-module-1-section-3" element={<EVChargingModule1Section3 />} />,
    <Route path="ev-charging-module-1-section-4" element={<EVChargingModule1Section4 />} />,
    <Route path="ev-charging-module-1-section-5" element={<EVChargingModule1Section5 />} />,
    <Route path="ev-charging-module-2-section-1" element={<EVChargingModule2Section1 />} />,
    <Route path="ev-charging-module-2-section-2" element={<EVChargingModule2Section2 />} />,
    <Route path="ev-charging-module-2-section-3" element={<EVChargingModule2Section3 />} />,
    <Route path="ev-charging-module-2-section-4" element={<EVChargingModule2Section4 />} />,
    <Route path="ev-charging-module-2-section-5" element={<EVChargingModule2Section5 />} />,
    <Route path="ev-charging-mock-exam" element={<EVChargingMockExam />} />,
    <Route path="energy-efficiency-course" element={<EnergyEfficiencyCourse />} />,
    <Route path="energy-efficiency-module-1" element={<EnergyEfficiencyModule1 />} />,
    <Route
      path="energy-efficiency-module-1-section-1"
      element={<EnergyEfficiencyModule1Section1 />}
    />
    ,
    <Route
      path="energy-efficiency-module-1-section-2"
      element={<EnergyEfficiencyModule1Section2 />}
    />
    ,
    <Route
      path="energy-efficiency-module-1-section-3"
      element={<EnergyEfficiencyModule1Section3 />}
    />
    ,
    <Route
      path="energy-efficiency-module-1-section-4"
      element={<EnergyEfficiencyModule1Section4 />}
    />
    ,
    <Route path="energy-efficiency-module-2" element={<EnergyEfficiencyModule2 />} />,
    <Route
      path="energy-efficiency-module-2-section-1"
      element={<EnergyEfficiencyModule2Section1 />}
    />
    ,
    <Route
      path="energy-efficiency-module-2-section-2"
      element={<EnergyEfficiencyModule2Section2 />}
    />
    ,
    <Route
      path="energy-efficiency-module-2-section-3"
      element={<EnergyEfficiencyModule2Section3 />}
    />
    ,
    <Route
      path="energy-efficiency-module-2-section-4"
      element={<EnergyEfficiencyModule2Section4 />}
    />
    ,
    <Route
      path="energy-efficiency-module-2-section-5"
      element={<EnergyEfficiencyModule2Section5 />}
    />
    ,
    <Route path="energy-efficiency-module-3" element={<EnergyEfficiencyModule3 />} />,
    <Route
      path="energy-efficiency-module-3-section-1"
      element={<EnergyEfficiencyModule3Section1 />}
    />
    ,
    <Route
      path="energy-efficiency-module-3-section-2"
      element={<EnergyEfficiencyModule3Section2 />}
    />
    ,
    <Route
      path="energy-efficiency-module-3-section-3"
      element={<EnergyEfficiencyModule3Section3 />}
    />
    ,
    <Route
      path="energy-efficiency-module-3-section-4"
      element={<EnergyEfficiencyModule3Section4 />}
    />
    ,
    <Route
      path="energy-efficiency-module-3-section-5"
      element={<EnergyEfficiencyModule3Section5 />}
    />
    ,
    <Route path="energy-efficiency-module-4" element={<EnergyEfficiencyModule4 />} />,
    <Route
      path="energy-efficiency-module-4-section-1"
      element={<EnergyEfficiencyModule4Section1 />}
    />
    ,
    <Route
      path="energy-efficiency-module-4-section-2"
      element={<EnergyEfficiencyModule4Section2 />}
    />
    ,
    <Route
      path="energy-efficiency-module-4-section-3"
      element={<EnergyEfficiencyModule4Section3 />}
    />
    ,
    <Route
      path="energy-efficiency-module-4-section-4"
      element={<EnergyEfficiencyModule4Section4 />}
    />
    ,
    <Route
      path="energy-efficiency-module-4-section-5"
      element={<EnergyEfficiencyModule4Section5 />}
    />
    ,
    <Route path="energy-efficiency-module-5" element={<EnergyEfficiencyModule5 />} />,
    <Route
      path="energy-efficiency-module-5-section-1"
      element={<EnergyEfficiencyModule5Section1 />}
    />
    ,
    <Route
      path="energy-efficiency-module-5-section-2"
      element={<EnergyEfficiencyModule5Section2 />}
    />
    ,
    <Route
      path="energy-efficiency-module-5-section-3"
      element={<EnergyEfficiencyModule5Section3 />}
    />
    ,
    <Route
      path="energy-efficiency-module-5-section-4"
      element={<EnergyEfficiencyModule5Section4 />}
    />
    ,
    <Route
      path="energy-efficiency-module-5-section-5"
      element={<EnergyEfficiencyModule5Section5 />}
    />
    ,
    <Route path="energy-efficiency-module-6" element={<EnergyEfficiencyModule6 />} />,
    <Route
      path="energy-efficiency-module-6-section-1"
      element={<EnergyEfficiencyModule6Section1 />}
    />
    ,
    <Route
      path="energy-efficiency-module-6-section-2"
      element={<EnergyEfficiencyModule6Section2 />}
    />
    ,
    <Route
      path="energy-efficiency-module-6-section-3"
      element={<EnergyEfficiencyModule6Section3 />}
    />
    ,
    <Route
      path="energy-efficiency-module-6-section-4"
      element={<EnergyEfficiencyModule6Section4 />}
    />
    ,
    <Route
      path="energy-efficiency-module-6-section-5"
      element={<EnergyEfficiencyModule6Section5 />}
    />
    ,
    <Route path="smart-home-mock-exam" element={<SmartHomeMockExam />} />
  </>
);
