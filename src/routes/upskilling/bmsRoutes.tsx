import { Route } from 'react-router-dom';
import { lazy } from 'react';
import { withTimeout, trackImport } from '@/lib/lazy';

const BMSCourse = lazy(() => withTimeout(() => trackImport('BMSCourse', () => import('@/pages/upskilling/BMSCourse'))));
const BMSModule1 = lazy(() => withTimeout(() => trackImport('BMSModule1', () => import('@/pages/upskilling/BMSModule1'))));
const BMSModule1Section1 = lazy(() => withTimeout(() => trackImport('BMSModule1Section1', () => import('@/pages/upskilling/BMSModule1Section1'))));
const BMSModule1Section2 = lazy(() => withTimeout(() => trackImport('BMSModule1Section2', () => import('@/pages/upskilling/BMSModule1Section2'))));
const BMSModule1Section3 = lazy(() => withTimeout(() => trackImport('BMSModule1Section3', () => import('@/pages/upskilling/BMSModule1Section3'))));
const BMSModule1Section4 = lazy(() => withTimeout(() => trackImport('BMSModule1Section4', () => import('@/pages/upskilling/BMSModule1Section4'))));
const BMSModule1Section5 = lazy(() => withTimeout(() => trackImport('BMSModule1Section5', () => import('@/pages/upskilling/BMSModule1Section5'))));
const BMSModule1Section6 = lazy(() => withTimeout(() => trackImport('BMSModule1Section6', () => import('@/pages/upskilling/BMSModule1Section6'))));
const BMSModule2 = lazy(() => withTimeout(() => trackImport('BMSModule2', () => import('@/pages/upskilling/BMSModule2'))));
const BMSModule2Section1 = lazy(() => withTimeout(() => trackImport('BMSModule2Section1', () => import('@/pages/upskilling/BMSModule2Section1'))));
const BMSModule2Section2 = lazy(() => withTimeout(() => trackImport('BMSModule2Section2', () => import('@/pages/upskilling/BMSModule2Section2'))));
const BMSModule2Section3 = lazy(() => withTimeout(() => trackImport('BMSModule2Section3', () => import('@/pages/upskilling/BMSModule2Section3'))));
const BMSModule2Section4 = lazy(() => withTimeout(() => trackImport('BMSModule2Section4', () => import('@/pages/upskilling/BMSModule2Section4'))));
const BMSModule2Section5 = lazy(() => withTimeout(() => trackImport('BMSModule2Section5', () => import('@/pages/upskilling/BMSModule2Section5'))));
const BMSModule2Section6 = lazy(() => withTimeout(() => trackImport('BMSModule2Section6', () => import('@/pages/upskilling/BMSModule2Section6'))));
const BMSModule3 = lazy(() => withTimeout(() => trackImport('BMSModule3', () => import('@/pages/upskilling/BMSModule3'))));
const BMSModule3Section1 = lazy(() => withTimeout(() => trackImport('BMSModule3Section1', () => import('@/pages/upskilling/BMSModule3Section1'))));
const BMSModule3Section2 = lazy(() => withTimeout(() => trackImport('BMSModule3Section2', () => import('@/pages/upskilling/BMSModule3Section2'))));
const BMSModule3Section3 = lazy(() => withTimeout(() => trackImport('BMSModule3Section3', () => import('@/pages/upskilling/BMSModule3Section3'))));
const BMSModule3Section4 = lazy(() => withTimeout(() => trackImport('BMSModule3Section4', () => import('@/pages/upskilling/BMSModule3Section4'))));
const BMSModule3Section5 = lazy(() => withTimeout(() => trackImport('BMSModule3Section5', () => import('@/pages/upskilling/BMSModule3Section5'))));
const BMSModule3Section6 = lazy(() => withTimeout(() => trackImport('BMSModule3Section6', () => import('@/pages/upskilling/BMSModule3Section6'))));
const BMSModule4 = lazy(() => withTimeout(() => trackImport('BMSModule4', () => import('@/pages/upskilling/BMSModule4'))));
const BMSModule4Section1 = lazy(() => withTimeout(() => trackImport('BMSModule4Section1', () => import('@/pages/upskilling/BMSModule4Section1'))));
const BMSModule4Section2 = lazy(() => withTimeout(() => trackImport('BMSModule4Section2', () => import('@/pages/upskilling/BMSModule4Section2'))));
const BMSModule4Section3 = lazy(() => withTimeout(() => trackImport('BMSModule4Section3', () => import('@/pages/upskilling/BMSModule4Section3'))));
const BMSModule4Section4 = lazy(() => withTimeout(() => trackImport('BMSModule4Section4', () => import('@/pages/upskilling/BMSModule4Section4'))));
const BMSModule4Section5 = lazy(() => withTimeout(() => trackImport('BMSModule4Section5', () => import('@/pages/upskilling/BMSModule4Section5'))));
const BMSModule5 = lazy(() => withTimeout(() => trackImport('BMSModule5', () => import('@/pages/upskilling/BMSModule5'))));
const BMSModule5Section1 = lazy(() => withTimeout(() => trackImport('BMSModule5Section1', () => import('@/pages/upskilling/BMSModule5Section1'))));
const BMSModule5Section2 = lazy(() => withTimeout(() => trackImport('BMSModule5Section2', () => import('@/pages/upskilling/BMSModule5Section2'))));
const BMSModule5Section3 = lazy(() => withTimeout(() => trackImport('BMSModule5Section3', () => import('@/pages/upskilling/BMSModule5Section3'))));
const BMSModule5Section4 = lazy(() => withTimeout(() => trackImport('BMSModule5Section4', () => import('@/pages/upskilling/BMSModule5Section4'))));
const BMSModule5Section5 = lazy(() => withTimeout(() => trackImport('BMSModule5Section5', () => import('@/pages/upskilling/BMSModule5Section5'))));
const BMSModule5Section6 = lazy(() => withTimeout(() => trackImport('BMSModule5Section6', () => import('@/pages/upskilling/BMSModule5Section6'))));
const BMSModule6 = lazy(() => withTimeout(() => trackImport('BMSModule6', () => import('@/pages/upskilling/BMSModule6'))));
const BMSModule6Section1 = lazy(() => withTimeout(() => trackImport('BMSModule6Section1', () => import('@/pages/upskilling/BMSModule6Section1'))));
const BMSModule6Section2 = lazy(() => withTimeout(() => trackImport('BMSModule6Section2', () => import('@/pages/upskilling/BMSModule6Section2'))));
const BMSModule6Section3 = lazy(() => withTimeout(() => trackImport('BMSModule6Section3', () => import('@/pages/upskilling/BMSModule6Section3'))));
const BMSModule6Section4 = lazy(() => withTimeout(() => trackImport('BMSModule6Section4', () => import('@/pages/upskilling/BMSModule6Section4'))));
const BMSModule6Section5 = lazy(() => withTimeout(() => trackImport('BMSModule6Section5', () => import('@/pages/upskilling/BMSModule6Section5'))));
const BMSModule6Section6 = lazy(() => withTimeout(() => trackImport('BMSModule6Section6', () => import('@/pages/upskilling/BMSModule6Section6'))));
const BMSModule7 = lazy(() => withTimeout(() => trackImport('BMSModule7', () => import('@/pages/upskilling/BMSModule7'))));
const BMSModule7Section1 = lazy(() => withTimeout(() => trackImport('BMSModule7Section1', () => import('@/pages/upskilling/BMSModule7Section1'))));
const BMSModule7Section2 = lazy(() => withTimeout(() => trackImport('BMSModule7Section2', () => import('@/pages/upskilling/BMSModule7Section2'))));
const BMSModule7Section3 = lazy(() => withTimeout(() => trackImport('BMSModule7Section3', () => import('@/pages/upskilling/BMSModule7Section3'))));
const BMSModule7Section4 = lazy(() => withTimeout(() => trackImport('BMSModule7Section4', () => import('@/pages/upskilling/BMSModule7Section4'))));
const BMSModule7Section5 = lazy(() => withTimeout(() => trackImport('BMSModule7Section5', () => import('@/pages/upskilling/BMSModule7Section5'))));
const BMSModule7Section6 = lazy(() => withTimeout(() => trackImport('BMSModule7Section6', () => import('@/pages/upskilling/BMSModule7Section6'))));
const BMSMockExam = lazy(() => withTimeout(() => trackImport('BMSMockExam', () => import('@/pages/upskilling/BMSMockExam'))));

export const bmsRoutes = (
  <>
    <Route path="bms-course" element={<BMSCourse />} />
    <Route path="bms-mock-exam" element={<BMSMockExam />} />
    <Route path="bms-module-1" element={<BMSModule1 />} />
    <Route path="bms-module-1-section-1" element={<BMSModule1Section1 />} />
    <Route path="bms-module-1-section-2" element={<BMSModule1Section2 />} />
    <Route path="bms-module-1-section-3" element={<BMSModule1Section3 />} />
    <Route path="bms-module-1-section-4" element={<BMSModule1Section4 />} />
    <Route path="bms-module-1-section-5" element={<BMSModule1Section5 />} />
    <Route path="bms-module-1-section-6" element={<BMSModule1Section6 />} />
    <Route path="bms-module-2" element={<BMSModule2 />} />
    <Route path="bms-module-2-section-1" element={<BMSModule2Section1 />} />
    <Route path="bms-module-2-section-2" element={<BMSModule2Section2 />} />
    <Route path="bms-module-2-section-3" element={<BMSModule2Section3 />} />
    <Route path="bms-module-2-section-4" element={<BMSModule2Section4 />} />
    <Route path="bms-module-2-section-5" element={<BMSModule2Section5 />} />
    <Route path="bms-module-2-section-6" element={<BMSModule2Section6 />} />
    <Route path="bms-module-3" element={<BMSModule3 />} />
    <Route path="bms-module-3-section-1" element={<BMSModule3Section1 />} />
    <Route path="bms-module-3-section-2" element={<BMSModule3Section2 />} />
    <Route path="bms-module-3-section-3" element={<BMSModule3Section3 />} />
    <Route path="bms-module-3-section-4" element={<BMSModule3Section4 />} />
    <Route path="bms-module-3-section-5" element={<BMSModule3Section5 />} />
    <Route path="bms-module-3-section-6" element={<BMSModule3Section6 />} />
    <Route path="bms-module-4" element={<BMSModule4 />} />
    <Route path="bms-module-4-section-1" element={<BMSModule4Section1 />} />
    <Route path="bms-module-4-section-2" element={<BMSModule4Section2 />} />
    <Route path="bms-module-4-section-3" element={<BMSModule4Section3 />} />
    <Route path="bms-module-4-section-4" element={<BMSModule4Section4 />} />
    <Route path="bms-module-4-section-5" element={<BMSModule4Section5 />} />
    <Route path="bms-module-5" element={<BMSModule5 />} />
    <Route path="bms-module-5-section-1" element={<BMSModule5Section1 />} />
    <Route path="bms-module-5-section-2" element={<BMSModule5Section2 />} />
    <Route path="bms-module-5-section-3" element={<BMSModule5Section3 />} />
    <Route path="bms-module-5-section-4" element={<BMSModule5Section4 />} />
    <Route path="bms-module-5-section-5" element={<BMSModule5Section5 />} />
    <Route path="bms-module-5-section-6" element={<BMSModule5Section6 />} />
    <Route path="bms-module-6" element={<BMSModule6 />} />
    <Route path="bms-module-6-section-1" element={<BMSModule6Section1 />} />
    <Route path="bms-module-6-section-2" element={<BMSModule6Section2 />} />
    <Route path="bms-module-6-section-3" element={<BMSModule6Section3 />} />
    <Route path="bms-module-6-section-4" element={<BMSModule6Section4 />} />
    <Route path="bms-module-6-section-5" element={<BMSModule6Section5 />} />
    <Route path="bms-module-6-section-6" element={<BMSModule6Section6 />} />
    <Route path="bms-module-7" element={<BMSModule7 />} />
    <Route path="bms-module-7-section-1" element={<BMSModule7Section1 />} />
    <Route path="bms-module-7-section-2" element={<BMSModule7Section2 />} />
    <Route path="bms-module-7-section-3" element={<BMSModule7Section3 />} />
    <Route path="bms-module-7-section-4" element={<BMSModule7Section4 />} />
    <Route path="bms-module-7-section-5" element={<BMSModule7Section5 />} />
    <Route path="bms-module-7-section-6" element={<BMSModule7Section6 />} />
  </>
);
