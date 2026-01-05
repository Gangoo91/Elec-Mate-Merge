import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { withTimeout, trackImport } from '@/lib/lazy';

const FireAlarmCourse = lazy(() => withTimeout(() => trackImport('FireAlarmCourse', () => import('@/pages/upskilling/FireAlarmCourse'))));
const FireAlarmModule1 = lazy(() => withTimeout(() => trackImport('FireAlarmModule1', () => import('@/pages/upskilling/FireAlarmModule1'))));
const FireAlarmModule1Section1 = lazy(() => withTimeout(() => trackImport('FireAlarmModule1Section1', () => import('@/pages/upskilling/FireAlarmModule1Section1'))));
const FireAlarmModule1Section2 = lazy(() => withTimeout(() => trackImport('FireAlarmModule1Section2', () => import('@/pages/upskilling/FireAlarmModule1Section2'))));
const FireAlarmModule1Section3 = lazy(() => withTimeout(() => trackImport('FireAlarmModule1Section3', () => import('@/pages/upskilling/FireAlarmModule1Section3'))));
const FireAlarmModule1Section4 = lazy(() => withTimeout(() => trackImport('FireAlarmModule1Section4', () => import('@/pages/upskilling/FireAlarmModule1Section4'))));
const FireAlarmModule2 = lazy(() => withTimeout(() => trackImport('FireAlarmModule2', () => import('@/pages/upskilling/FireAlarmModule2'))));
const FireAlarmModule2Section1 = lazy(() => withTimeout(() => trackImport('FireAlarmModule2Section1', () => import('@/pages/upskilling/FireAlarmModule2Section1'))));
const FireAlarmModule2Section2 = lazy(() => withTimeout(() => trackImport('FireAlarmModule2Section2', () => import('@/pages/upskilling/FireAlarmModule2Section2'))));
const FireAlarmModule2Section3 = lazy(() => withTimeout(() => trackImport('FireAlarmModule2Section3', () => import('@/pages/upskilling/FireAlarmModule2Section3'))));
const FireAlarmModule2Section4 = lazy(() => withTimeout(() => trackImport('FireAlarmModule2Section4', () => import('@/pages/upskilling/FireAlarmModule2Section4'))));
const FireAlarmModule2Section5 = lazy(() => withTimeout(() => trackImport('FireAlarmModule2Section5', () => import('@/pages/upskilling/FireAlarmModule2Section5'))));
const FireAlarmModule3 = lazy(() => withTimeout(() => trackImport('FireAlarmModule3', () => import('@/pages/upskilling/FireAlarmModule3'))));
const FireAlarmModule3Section1 = lazy(() => withTimeout(() => trackImport('FireAlarmModule3Section1', () => import('@/pages/upskilling/FireAlarmModule3Section1'))));
const FireAlarmModule3Section2 = lazy(() => withTimeout(() => trackImport('FireAlarmModule3Section2', () => import('@/pages/upskilling/FireAlarmModule3Section2'))));
const FireAlarmModule3Section3 = lazy(() => withTimeout(() => trackImport('FireAlarmModule3Section3', () => import('@/pages/upskilling/FireAlarmModule3Section3'))));
const FireAlarmModule3Section4 = lazy(() => withTimeout(() => trackImport('FireAlarmModule3Section4', () => import('@/pages/upskilling/FireAlarmModule3Section4'))));
const FireAlarmModule3Section5 = lazy(() => withTimeout(() => trackImport('FireAlarmModule3Section5', () => import('@/pages/upskilling/FireAlarmModule3Section5'))));
const FireAlarmModule3Section6 = lazy(() => withTimeout(() => trackImport('FireAlarmModule3Section6', () => import('@/pages/upskilling/FireAlarmModule3Section6'))));
const FireAlarmModule4 = lazy(() => withTimeout(() => trackImport('FireAlarmModule4', () => import('@/pages/upskilling/FireAlarmModule4'))));
const FireAlarmModule4Section1 = lazy(() => withTimeout(() => trackImport('FireAlarmModule4Section1', () => import('@/pages/upskilling/FireAlarmModule4Section1'))));
const FireAlarmModule4Section2 = lazy(() => withTimeout(() => trackImport('FireAlarmModule4Section2', () => import('@/pages/upskilling/FireAlarmModule4Section2'))));
const FireAlarmModule4Section3 = lazy(() => withTimeout(() => trackImport('FireAlarmModule4Section3', () => import('@/pages/upskilling/FireAlarmModule4Section3'))));
const FireAlarmModule4Section4 = lazy(() => withTimeout(() => trackImport('FireAlarmModule4Section4', () => import('@/pages/upskilling/FireAlarmModule4Section4'))));
const FireAlarmModule4Section5 = lazy(() => withTimeout(() => trackImport('FireAlarmModule4Section5', () => import('@/pages/upskilling/FireAlarmModule4Section5'))));
const FireAlarmModule5 = lazy(() => withTimeout(() => trackImport('FireAlarmModule5', () => import('@/pages/upskilling/FireAlarmModule5'))));
const FireAlarmModule5Section1 = lazy(() => withTimeout(() => trackImport('FireAlarmModule5Section1', () => import('@/pages/upskilling/FireAlarmModule5Section1'))));
const FireAlarmModule5Section2 = lazy(() => withTimeout(() => trackImport('FireAlarmModule5Section2', () => import('@/pages/upskilling/FireAlarmModule5Section2'))));
const FireAlarmModule5Section3 = lazy(() => withTimeout(() => trackImport('FireAlarmModule5Section3', () => import('@/pages/upskilling/FireAlarmModule5Section3'))));
const FireAlarmModule5Section4 = lazy(() => withTimeout(() => trackImport('FireAlarmModule5Section4', () => import('@/pages/upskilling/FireAlarmModule5Section4'))));
const FireAlarmModule5Section5 = lazy(() => withTimeout(() => trackImport('FireAlarmModule5Section5', () => import('@/pages/upskilling/FireAlarmModule5Section5'))));
const FireAlarmModule5Section6 = lazy(() => withTimeout(() => trackImport('FireAlarmModule5Section6', () => import('@/pages/upskilling/FireAlarmModule5Section6'))));
const FireAlarmModule6 = lazy(() => withTimeout(() => trackImport('FireAlarmModule6', () => import('@/pages/upskilling/FireAlarmModule6'))));
const FireAlarmModule6Section1 = lazy(() => withTimeout(() => trackImport('FireAlarmModule6Section1', () => import('@/pages/upskilling/FireAlarmModule6Section1'))));
const FireAlarmModule6Section2 = lazy(() => withTimeout(() => trackImport('FireAlarmModule6Section2', () => import('@/pages/upskilling/FireAlarmModule6Section2'))));
const FireAlarmModule6Section3 = lazy(() => withTimeout(() => trackImport('FireAlarmModule6Section3', () => import('@/pages/upskilling/FireAlarmModule6Section3'))));
const FireAlarmModule6Section4 = lazy(() => withTimeout(() => trackImport('FireAlarmModule6Section4', () => import('@/pages/upskilling/FireAlarmModule6Section4'))));
const FireAlarmModule6Section5 = lazy(() => withTimeout(() => trackImport('FireAlarmModule6Section5', () => import('@/pages/upskilling/FireAlarmModule6Section5'))));
const FireAlarmModule6Section6 = lazy(() => withTimeout(() => trackImport('FireAlarmModule6Section6', () => import('@/pages/upskilling/FireAlarmModule6Section6'))));
const FireAlarmModule7 = lazy(() => withTimeout(() => trackImport('FireAlarmModule7', () => import('@/pages/upskilling/FireAlarmModule7'))));
const FireAlarmModule7Section1 = lazy(() => withTimeout(() => trackImport('FireAlarmModule7Section1', () => import('@/pages/upskilling/FireAlarmModule7Section1'))));
const FireAlarmModule7Section2 = lazy(() => withTimeout(() => trackImport('FireAlarmModule7Section2', () => import('@/pages/upskilling/FireAlarmModule7Section2'))));
const FireAlarmModule7Section3 = lazy(() => withTimeout(() => trackImport('FireAlarmModule7Section3', () => import('@/pages/upskilling/FireAlarmModule7Section3'))));
const FireAlarmModule7Section4 = lazy(() => withTimeout(() => trackImport('FireAlarmModule7Section4', () => import('@/pages/upskilling/FireAlarmModule7Section4'))));
const FireAlarmMockExam = lazy(() => withTimeout(() => trackImport('FireAlarmMockExam', () => import('@/pages/upskilling/FireAlarmMockExam'))));

export const fireAlarmRoutes = (
  <>
  <Route path="fire-alarm-course" element={<FireAlarmCourse />} />,
  <Route path="fire-alarm-module-1" element={<FireAlarmModule1 />} />,
  <Route path="fire-alarm-module-1-section-1" element={<FireAlarmModule1Section1 />} />,
  <Route path="fire-alarm-module-1-section-2" element={<FireAlarmModule1Section2 />} />,
  <Route path="fire-alarm-module-1-section-3" element={<FireAlarmModule1Section3 />} />,
  <Route path="fire-alarm-module-1-section-4" element={<FireAlarmModule1Section4 />} />,
  <Route path="fire-alarm-module-2" element={<FireAlarmModule2 />} />,
  <Route path="fire-alarm-module-2-section-1" element={<FireAlarmModule2Section1 />} />,
  <Route path="fire-alarm-module-2-section-2" element={<FireAlarmModule2Section2 />} />,
  <Route path="fire-alarm-module-2-section-3" element={<FireAlarmModule2Section3 />} />,
  <Route path="fire-alarm-module-2-section-4" element={<FireAlarmModule2Section4 />} />,
  <Route path="fire-alarm-module-2-section-5" element={<FireAlarmModule2Section5 />} />,
  <Route path="fire-alarm-module-3" element={<FireAlarmModule3 />} />,
  <Route path="fire-alarm-module-3-section-1" element={<FireAlarmModule3Section1 />} />,
  <Route path="fire-alarm-module-3-section-2" element={<FireAlarmModule3Section2 />} />,
  <Route path="fire-alarm-module-3-section-3" element={<FireAlarmModule3Section3 />} />,
  <Route path="fire-alarm-module-3-section-4" element={<FireAlarmModule3Section4 />} />,
  <Route path="fire-alarm-module-3-section-5" element={<FireAlarmModule3Section5 />} />,
  <Route path="fire-alarm-module-3-section-6" element={<FireAlarmModule3Section6 />} />,
  <Route path="fire-alarm-module-4" element={<FireAlarmModule4 />} />,
  <Route path="fire-alarm-module-4-section-1" element={<FireAlarmModule4Section1 />} />,
  <Route path="fire-alarm-module-4-section-2" element={<FireAlarmModule4Section2 />} />,
  <Route path="fire-alarm-module-4-section-3" element={<FireAlarmModule4Section3 />} />,
  <Route path="fire-alarm-module-4-section-4" element={<FireAlarmModule4Section4 />} />,
  <Route path="fire-alarm-module-4-section-5" element={<FireAlarmModule4Section5 />} />,
  <Route path="fire-alarm-module-5" element={<FireAlarmModule5 />} />,
  <Route path="fire-alarm-module-5-section-1" element={<FireAlarmModule5Section1 />} />,
  <Route path="fire-alarm-module-5-section-2" element={<FireAlarmModule5Section2 />} />,
  <Route path="fire-alarm-module-5-section-3" element={<FireAlarmModule5Section3 />} />,
  <Route path="fire-alarm-module-5-section-4" element={<FireAlarmModule5Section4 />} />,
  <Route path="fire-alarm-module-5-section-5" element={<FireAlarmModule5Section5 />} />,
  <Route path="fire-alarm-module-5-section-6" element={<FireAlarmModule5Section6 />} />,
  <Route path="fire-alarm-module-6" element={<FireAlarmModule6 />} />,
  <Route path="fire-alarm-module-6-section-1" element={<FireAlarmModule6Section1 />} />,
  <Route path="fire-alarm-module-6-section-2" element={<FireAlarmModule6Section2 />} />,
  <Route path="fire-alarm-module-6-section-3" element={<FireAlarmModule6Section3 />} />,
  <Route path="fire-alarm-module-6-section-4" element={<FireAlarmModule6Section4 />} />,
  <Route path="fire-alarm-module-6-section-5" element={<FireAlarmModule6Section5 />} />,
  <Route path="fire-alarm-module-6-section-6" element={<FireAlarmModule6Section6 />} />,
  <Route path="fire-alarm-module-7" element={<FireAlarmModule7 />} />,
  <Route path="fire-alarm-module-7-section-1" element={<FireAlarmModule7Section1 />} />,
  <Route path="fire-alarm-module-7-section-2" element={<FireAlarmModule7Section2 />} />,
  <Route path="fire-alarm-module-7-section-3" element={<FireAlarmModule7Section3 />} />,
  <Route path="fire-alarm-module-7-section-4" element={<FireAlarmModule7Section4 />} />,
  <Route path="fire-alarm-mock-exam" element={<FireAlarmMockExam />} />
  </>
);
