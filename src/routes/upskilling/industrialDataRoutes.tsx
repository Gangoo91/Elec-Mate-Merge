import React from 'react';
import { Route } from 'react-router-dom';
import { withTimeout, trackImport } from '@/lib/lazy';

// Lazy load all route components with timeout protection
const IndustrialElectricalCourse = React.lazy(() => withTimeout(() => trackImport('IndustrialElectricalCourse', () => import('@/pages/upskilling/IndustrialElectricalCourse'))));
const IndustrialElectricalModule1 = React.lazy(() => import('@/pages/upskilling/IndustrialElectricalModule1'));
const IndustrialElectricalModule1Section1 = React.lazy(() => import('@/pages/upskilling/IndustrialElectricalModule1Section1'));
const IndustrialElectricalModule2 = React.lazy(() => import('@/pages/upskilling/IndustrialElectricalModule2'));
const IndustrialElectricalModule3 = React.lazy(() => import('@/pages/upskilling/IndustrialElectricalModule3'));
const IndustrialElectricalModule4 = React.lazy(() => import('@/pages/upskilling/IndustrialElectricalModule4'));
const DataCablingCourse = React.lazy(() => import('@/pages/upskilling/DataCablingCourse'));
const DataCablingModule1 = React.lazy(() => import('@/pages/upskilling/DataCablingModule1'));
const DataCablingModule1Section1 = React.lazy(() => import('@/pages/upskilling/DataCablingModule1Section1'));
const DataCablingModule1Section2 = React.lazy(() => import('@/pages/upskilling/DataCablingModule1Section2'));
const DataCablingModule1Section3 = React.lazy(() => import('@/pages/upskilling/DataCablingModule1Section3'));
const DataCablingModule1Section4 = React.lazy(() => import('@/pages/upskilling/DataCablingModule1Section4'));
const DataCablingModule2 = React.lazy(() => import('@/pages/upskilling/DataCablingModule2'));
const DataCablingModule2Section1 = React.lazy(() => import('@/pages/upskilling/DataCablingModule2Section1'));
const DataCablingModule2Section2 = React.lazy(() => import('@/pages/upskilling/DataCablingModule2Section2'));
const DataCablingModule2Section3 = React.lazy(() => import('@/pages/upskilling/DataCablingModule2Section3'));
const DataCablingModule2Section4 = React.lazy(() => import('@/pages/upskilling/DataCablingModule2Section4'));
const DataCablingModule2Section5 = React.lazy(() => import('@/pages/upskilling/DataCablingModule2Section5'));
const DataCablingModule3Section1 = React.lazy(() => import('@/pages/upskilling/DataCablingModule3Section1'));
const DataCablingModule3Section2 = React.lazy(() => import('@/pages/upskilling/DataCablingModule3Section2'));
const DataCablingModule3Section3 = React.lazy(() => import('@/pages/upskilling/DataCablingModule3Section3'));
const DataCablingModule3Section4 = React.lazy(() => import('@/pages/upskilling/DataCablingModule3Section4'));
const DataCablingModule3Section5 = React.lazy(() => import('@/pages/upskilling/DataCablingModule3Section5'));
const DataCablingModule3Section6 = React.lazy(() => import('@/pages/upskilling/DataCablingModule3Section6'));
const DataCablingModule3 = React.lazy(() => import('@/pages/upskilling/DataCablingModule3'));
const DataCablingModule4 = React.lazy(() => import('@/pages/upskilling/DataCablingModule4'));
const DataCablingModule4Section1 = React.lazy(() => import('@/pages/upskilling/DataCablingModule4Section1'));
const DataCablingModule4Section2 = React.lazy(() => import('@/pages/upskilling/DataCablingModule4Section2'));
const DataCablingModule4Section3 = React.lazy(() => import('@/pages/upskilling/DataCablingModule4Section3'));
const DataCablingModule4Section4 = React.lazy(() => import('@/pages/upskilling/DataCablingModule4Section4'));
const DataCablingModule4Section5 = React.lazy(() => import('@/pages/upskilling/DataCablingModule4Section5'));
const DataCablingModule5 = React.lazy(() => import('@/pages/upskilling/DataCablingModule5'));
const DataCablingModule5Section1 = React.lazy(() => import('@/pages/upskilling/DataCablingModule5Section1'));
const DataCablingModule5Section2 = React.lazy(() => import('@/pages/upskilling/DataCablingModule5Section2'));
const DataCablingModule5Section3 = React.lazy(() => import('@/pages/upskilling/DataCablingModule5Section3'));
const DataCablingModule5Section4 = React.lazy(() => import('@/pages/upskilling/DataCablingModule5Section4'));
const DataCablingModule5Section5 = React.lazy(() => import('@/pages/upskilling/DataCablingModule5Section5'));
const DataCablingModule6 = React.lazy(() => import('@/pages/upskilling/DataCablingModule6'));
const DataCablingModule6Section1 = React.lazy(() => import('@/pages/upskilling/DataCablingModule6Section1'));
const DataCablingModule6Section2 = React.lazy(() => import('@/pages/upskilling/DataCablingModule6Section2'));
const DataCablingModule6Section3 = React.lazy(() => import('@/pages/upskilling/DataCablingModule6Section3'));
const DataCablingModule6Section4 = React.lazy(() => import('@/pages/upskilling/DataCablingModule6Section4'));
const DataCablingMockExam = React.lazy(() => import('@/pages/upskilling/DataCablingMockExam'));
const EmergencyLightingCourse = React.lazy(() => import('@/pages/upskilling/EmergencyLightingCourse'));
const EmergencyLightingModule1 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule1'));
const EmergencyLightingModule1Section1 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule1Section1'));
const EmergencyLightingModule1Section2 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule1Section2'));
const EmergencyLightingModule1Section3 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule1Section3'));
const EmergencyLightingModule1Section4 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule1Section4'));
const EmergencyLightingModule2 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule2'));
const EmergencyLightingModule2Section1 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule2Section1'));
const EmergencyLightingModule2Section2 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule2Section2'));
const EmergencyLightingModule2Section3 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule2Section3'));
const EmergencyLightingModule2Section4 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule2Section4'));
const EmergencyLightingModule2Section5 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule2Section5'));
const EmergencyLightingModule2Section6 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule2Section6'));
const EmergencyLightingModule3 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule3'));
const EmergencyLightingModule3Section1 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule3Section1'));
const EmergencyLightingModule3Section2 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule3Section2'));
const EmergencyLightingModule3Section3 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule3Section3'));
const EmergencyLightingModule3Section4 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule3Section4'));
const EmergencyLightingModule3Section5 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule3Section5'));
const EmergencyLightingModule3Section6 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule3Section6'));
// Emergency Lighting Module 4
const EmergencyLightingModule4 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule4'));
const EmergencyLightingModule4Section1 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule4Section1'));
const EmergencyLightingModule4Section2 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule4Section2'));
const EmergencyLightingModule4Section3 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule4Section3'));
const EmergencyLightingModule4Section4 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule4Section4'));
const EmergencyLightingModule4Section5 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule4Section5'));
const EmergencyLightingModule5 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule5'));
const EmergencyLightingModule5Section1 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule5Section1'));
const EmergencyLightingModule5Section2 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule5Section2'));
const EmergencyLightingModule5Section3 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule5Section3'));
const EmergencyLightingModule5Section4 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule5Section4'));
const EmergencyLightingModule5Section5 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule5Section5'));
const EmergencyLightingModule5Section6 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule5Section6'));
const EmergencyLightingModule6 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule6'));
const EmergencyLightingModule6Section1 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule6Section1'));
const EmergencyLightingModule6Section2 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule6Section2'));
const EmergencyLightingModule6Section3 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule6Section3'));
const EmergencyLightingModule6Section4 = React.lazy(() => import('@/pages/upskilling/EmergencyLightingModule6Section4'));
const FiberOpticsCourse = React.lazy(() => import('@/pages/upskilling/FiberOpticsCourse'));
const FiberOpticsModule1 = React.lazy(() => import('@/pages/upskilling/FiberOpticsModule1'));
const FiberOpticsModule2 = React.lazy(() => import('@/pages/upskilling/FiberOpticsModule2'));
const FiberOpticsModule3 = React.lazy(() => import('@/pages/upskilling/FiberOpticsModule3'));
const FiberOpticsModule4 = React.lazy(() => import('@/pages/upskilling/FiberOpticsModule4'));
const FiberOpticsModule5 = React.lazy(() => import('@/pages/upskilling/FiberOpticsModule5'));
const FiberOpticsModule6 = React.lazy(() => import('@/pages/upskilling/FiberOpticsModule6'));
const FiberOpticsModule7 = React.lazy(() => import('@/pages/upskilling/FiberOpticsModule7'));
const EmergencyLightingMockExam = React.lazy(() => import('@/pages/upskilling/EmergencyLightingMockExam'));

export const industrialDataRoutes = (
  <>
  <Route path="industrial-electrical-course" element={<IndustrialElectricalCourse />} />,
  <Route path="industrial-electrical-module-1" element={<IndustrialElectricalModule1 />} />,
  <Route path="industrial-electrical-module-1-section-1" element={<IndustrialElectricalModule1Section1 />} />,
  <Route path="industrial-electrical-module-2" element={<IndustrialElectricalModule2 />} />,
  <Route path="industrial-electrical-module-3" element={<IndustrialElectricalModule3 />} />,
  <Route path="industrial-electrical-module-4" element={<IndustrialElectricalModule4 />} />,
  <Route path="data-cabling-course" element={<DataCablingCourse />} />,
  <Route path="data-cabling-module-1" element={<DataCablingModule1 />} />,
  <Route path="data-cabling-module-1-section-1" element={<DataCablingModule1Section1 />} />,
  <Route path="data-cabling-module-1-section-2" element={<DataCablingModule1Section2 />} />,
  <Route path="data-cabling-module-1-section-3" element={<DataCablingModule1Section3 />} />,
  <Route path="data-cabling-module-1-section-4" element={<DataCablingModule1Section4 />} />,
  <Route path="data-cabling-module-2" element={<DataCablingModule2 />} />,
  <Route path="data-cabling-module-2-section-1" element={<DataCablingModule2Section1 />} />,
  <Route path="data-cabling-module-2-section-2" element={<DataCablingModule2Section2 />} />,
  <Route path="data-cabling-module-2-section-3" element={<DataCablingModule2Section3 />} />,
  <Route path="data-cabling-module-2-section-4" element={<DataCablingModule2Section4 />} />,
  <Route path="data-cabling-module-2-section-5" element={<DataCablingModule2Section5 />} />,
  <Route path="data-cabling-module-3-section-1" element={<DataCablingModule3Section1 />} />,
  <Route path="data-cabling-module-3-section-2" element={<DataCablingModule3Section2 />} />,
  <Route path="data-cabling-module-3-section-3" element={<DataCablingModule3Section3 />} />,
  <Route path="data-cabling-module-3-section-4" element={<DataCablingModule3Section4 />} />,
  <Route path="data-cabling-module-3-section-5" element={<DataCablingModule3Section5 />} />,
  <Route path="data-cabling-module-3-section-6" element={<DataCablingModule3Section6 />} />,
  <Route path="data-cabling-module-3" element={<DataCablingModule3 />} />,
  <Route path="data-cabling-module-4" element={<DataCablingModule4 />} />,
  <Route path="data-cabling-module-4-section-1" element={<DataCablingModule4Section1 />} />,
  <Route path="data-cabling-module-4-section-2" element={<DataCablingModule4Section2 />} />,
  <Route path="data-cabling-module-4-section-3" element={<DataCablingModule4Section3 />} />,
  <Route path="data-cabling-module-4-section-4" element={<DataCablingModule4Section4 />} />,
  <Route path="data-cabling-module-4-section-5" element={<DataCablingModule4Section5 />} />,
  <Route path="data-cabling-module-5" element={<DataCablingModule5 />} />,
  <Route path="data-cabling-module-5-section-1" element={<DataCablingModule5Section1 />} />,
  <Route path="data-cabling-module-5-section-2" element={<DataCablingModule5Section2 />} />,
  <Route path="data-cabling-module-5-section-3" element={<DataCablingModule5Section3 />} />,
  <Route path="data-cabling-module-5-section-4" element={<DataCablingModule5Section4 />} />,
  <Route path="data-cabling-module-5-section-5" element={<DataCablingModule5Section5 />} />,
  <Route path="data-cabling-module-6" element={<DataCablingModule6 />} />,
  <Route path="data-cabling-module-6-section-1" element={<DataCablingModule6Section1 />} />,
  <Route path="data-cabling-module-6-section-2" element={<DataCablingModule6Section2 />} />,
  <Route path="data-cabling-module-6-section-3" element={<DataCablingModule6Section3 />} />,
  <Route path="data-cabling-module-6-section-4" element={<DataCablingModule6Section4 />} />,
  <Route path="data-cabling-mock-exam" element={<DataCablingMockExam />} />,
  <Route path="emergency-lighting-course" element={<EmergencyLightingCourse />} />,
  <Route path="emergency-lighting-module-1" element={<EmergencyLightingModule1 />} />,
  <Route path="emergency-lighting-module-1-section-1" element={<EmergencyLightingModule1Section1 />} />,
  <Route path="emergency-lighting-module-1-section-2" element={<EmergencyLightingModule1Section2 />} />,
  <Route path="emergency-lighting-module-1-section-3" element={<EmergencyLightingModule1Section3 />} />,
  <Route path="emergency-lighting-module-1-section-4" element={<EmergencyLightingModule1Section4 />} />,
  
  <Route path="emergency-lighting-module-2" element={<EmergencyLightingModule2 />} />,
  // Emergency Lighting Module 2 Sections
  <Route path="emergency-lighting-module-2-section-1" element={<EmergencyLightingModule2Section1 />} />,
  <Route path="emergency-lighting-module-2-section-2" element={<EmergencyLightingModule2Section2 />} />,
  <Route path="emergency-lighting-module-2-section-3" element={<EmergencyLightingModule2Section3 />} />,
  <Route path="emergency-lighting-module-2-section-4" element={<EmergencyLightingModule2Section4 />} />,
  <Route path="emergency-lighting-module-2-section-5" element={<EmergencyLightingModule2Section5 />} />,
  <Route path="emergency-lighting-module-2-section-6" element={<EmergencyLightingModule2Section6 />} />,
  <Route path="emergency-lighting-module-3" element={<EmergencyLightingModule3 />} />,
  <Route path="emergency-lighting-module-3-section-1" element={<EmergencyLightingModule3Section1 />} />,
  <Route path="emergency-lighting-module-3-section-2" element={<EmergencyLightingModule3Section2 />} />,
  <Route path="emergency-lighting-module-3-section-3" element={<EmergencyLightingModule3Section3 />} />,
  <Route path="emergency-lighting-module-3-section-4" element={<EmergencyLightingModule3Section4 />} />,
  <Route path="emergency-lighting-module-3-section-5" element={<EmergencyLightingModule3Section5 />} />,
  <Route path="emergency-lighting-module-3-section-6" element={<EmergencyLightingModule3Section6 />} />,
  <Route path="emergency-lighting-module-4" element={<EmergencyLightingModule4 />} />,
  <Route path="emergency-lighting-module-4-section-1" element={<EmergencyLightingModule4Section1 />} />,
  <Route path="emergency-lighting-module-4-section-2" element={<EmergencyLightingModule4Section2 />} />,
  <Route path="emergency-lighting-module-4-section-3" element={<EmergencyLightingModule4Section3 />} />,
  <Route path="emergency-lighting-module-4-section-4" element={<EmergencyLightingModule4Section4 />} />,
  <Route path="emergency-lighting-module-4-section-5" element={<EmergencyLightingModule4Section5 />} />,
  <Route path="emergency-lighting-module-5" element={<EmergencyLightingModule5 />} />,
  <Route path="emergency-lighting-module-5-section-1" element={<EmergencyLightingModule5Section1 />} />,
  <Route path="emergency-lighting-module-5-section-2" element={<EmergencyLightingModule5Section2 />} />,
  <Route path="emergency-lighting-module-5-section-3" element={<EmergencyLightingModule5Section3 />} />,
  <Route path="emergency-lighting-module-5-section-4" element={<EmergencyLightingModule5Section4 />} />,
  <Route path="emergency-lighting-module-5-section-5" element={<EmergencyLightingModule5Section5 />} />,
  <Route path="emergency-lighting-module-5-section-6" element={<EmergencyLightingModule5Section6 />} />,
  <Route path="emergency-lighting-module-6" element={<EmergencyLightingModule6 />} />,
  <Route path="emergency-lighting-module-6-section-1" element={<EmergencyLightingModule6Section1 />} />,
  <Route path="emergency-lighting-module-6-section-2" element={<EmergencyLightingModule6Section2 />} />,
  <Route path="emergency-lighting-module-6-section-3" element={<EmergencyLightingModule6Section3 />} />,
  <Route path="emergency-lighting-module-6-section-4" element={<EmergencyLightingModule6Section4 />} />,
  <Route path="emergency-lighting-mock-exam" element={<EmergencyLightingMockExam />} />,
  <Route path="fiber-optics-course" element={<FiberOpticsCourse />} />,
  <Route path="fiber-optics-module-1" element={<FiberOpticsModule1 />} />,
  <Route path="fiber-optics-module-2" element={<FiberOpticsModule2 />} />,
  <Route path="fiber-optics-module-3" element={<FiberOpticsModule3 />} />,
  <Route path="fiber-optics-module-4" element={<FiberOpticsModule4 />} />,
  <Route path="fiber-optics-module-5" element={<FiberOpticsModule5 />} />,
  <Route path="fiber-optics-module-6" element={<FiberOpticsModule6 />} />,
  <Route path="fiber-optics-module-7" element={<FiberOpticsModule7 />} />
  </>
);