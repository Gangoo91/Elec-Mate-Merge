import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { withTimeout, trackImport } from '@/lib/lazy';

const PATTestingCourse = lazy(() => withTimeout(() => trackImport('PATTestingCourse', () => import('@/pages/upskilling/PATTestingCourse'))));
const PATTestingModule1 = lazy(() => withTimeout(() => trackImport('PATTestingModule1', () => import('@/pages/upskilling/PATTestingModule1'))));
const PATTestingModule2 = lazy(() => withTimeout(() => trackImport('PATTestingModule2', () => import('@/pages/upskilling/PATTestingModule2'))));
const PATTestingModule3 = lazy(() => withTimeout(() => trackImport('PATTestingModule3', () => import('@/pages/upskilling/PATTestingModule3'))));
const PATTestingModule4 = lazy(() => withTimeout(() => trackImport('PATTestingModule4', () => import('@/pages/upskilling/PATTestingModule4'))));
const PATTestingModule5 = lazy(() => withTimeout(() => trackImport('PATTestingModule5', () => import('@/pages/upskilling/PATTestingModule5'))));
const PATTestingModule1Section1 = lazy(() => withTimeout(() => trackImport('PATTestingModule1Section1', () => import('@/pages/upskilling/PATTestingModule1Section1'))));
const PATTestingModule1Section2 = lazy(() => withTimeout(() => trackImport('PATTestingModule1Section2', () => import('@/pages/upskilling/PATTestingModule1Section2'))));
const PATTestingModule1Section3 = lazy(() => withTimeout(() => trackImport('PATTestingModule1Section3', () => import('@/pages/upskilling/PATTestingModule1Section3'))));
const PATTestingModule1Section4 = lazy(() => withTimeout(() => trackImport('PATTestingModule1Section4', () => import('@/pages/upskilling/PATTestingModule1Section4'))));
const PATTestingModule1Section5 = lazy(() => withTimeout(() => trackImport('PATTestingModule1Section5', () => import('@/pages/upskilling/PATTestingModule1Section5'))));
const PATTestingModule2Section1 = lazy(() => withTimeout(() => trackImport('PATTestingModule2Section1', () => import('@/pages/upskilling/PATTestingModule2Section1'))));
const PATTestingModule2Section2 = lazy(() => withTimeout(() => trackImport('PATTestingModule2Section2', () => import('@/pages/upskilling/PATTestingModule2Section2'))));
const PATTestingModule2Section3 = lazy(() => withTimeout(() => trackImport('PATTestingModule2Section3', () => import('@/pages/upskilling/PATTestingModule2Section3'))));
const PATTestingModule2Section4 = lazy(() => withTimeout(() => trackImport('PATTestingModule2Section4', () => import('@/pages/upskilling/PATTestingModule2Section4'))));
const PATTestingModule2Section5 = lazy(() => withTimeout(() => trackImport('PATTestingModule2Section5', () => import('@/pages/upskilling/PATTestingModule2Section5'))));
const PATTestingModule3Section1 = lazy(() => withTimeout(() => trackImport('PATTestingModule3Section1', () => import('@/pages/upskilling/PATTestingModule3Section1'))));
const PATTestingModule3Section2 = lazy(() => withTimeout(() => trackImport('PATTestingModule3Section2', () => import('@/pages/upskilling/PATTestingModule3Section2'))));
const PATTestingModule3Section3 = lazy(() => withTimeout(() => trackImport('PATTestingModule3Section3', () => import('@/pages/upskilling/PATTestingModule3Section3'))));
const PATTestingModule3Section4 = lazy(() => withTimeout(() => trackImport('PATTestingModule3Section4', () => import('@/pages/upskilling/PATTestingModule3Section4'))));
const PATTestingModule3Section5 = lazy(() => withTimeout(() => trackImport('PATTestingModule3Section5', () => import('@/pages/upskilling/PATTestingModule3Section5'))));
const PATTestingModule4Section1 = lazy(() => withTimeout(() => trackImport('PATTestingModule4Section1', () => import('@/pages/upskilling/PATTestingModule4Section1'))));
const PATTestingModule4Section2 = lazy(() => withTimeout(() => trackImport('PATTestingModule4Section2', () => import('@/pages/upskilling/PATTestingModule4Section2'))));
const PATTestingModule4Section3 = lazy(() => withTimeout(() => trackImport('PATTestingModule4Section3', () => import('@/pages/upskilling/PATTestingModule4Section3'))));
const PATTestingModule4Section4 = lazy(() => withTimeout(() => trackImport('PATTestingModule4Section4', () => import('@/pages/upskilling/PATTestingModule4Section4'))));
const PATTestingModule4Section5 = lazy(() => withTimeout(() => trackImport('PATTestingModule4Section5', () => import('@/pages/upskilling/PATTestingModule4Section5'))));
const PATTestingModule4Section6 = lazy(() => withTimeout(() => trackImport('PATTestingModule4Section6', () => import('@/pages/upskilling/PATTestingModule4Section6'))));
const PATTestingModule5Section1 = lazy(() => withTimeout(() => trackImport('PATTestingModule5Section1', () => import('@/pages/upskilling/PATTestingModule5Section1'))));
const PATTestingModule5Section2 = lazy(() => withTimeout(() => trackImport('PATTestingModule5Section2', () => import('@/pages/upskilling/PATTestingModule5Section2'))));
const PATTestingModule5Section3 = lazy(() => withTimeout(() => trackImport('PATTestingModule5Section3', () => import('@/pages/upskilling/PATTestingModule5Section3'))));
const PATTestingModule5Section4 = lazy(() => withTimeout(() => trackImport('PATTestingModule5Section4', () => import('@/pages/upskilling/PATTestingModule5Section4'))));
const PATTestingModule5Section5 = lazy(() => withTimeout(() => trackImport('PATTestingModule5Section5', () => import('@/pages/upskilling/PATTestingModule5Section5'))));
const PATTestingMockExam = lazy(() => withTimeout(() => trackImport('PATTestingMockExam', () => import('@/components/upskilling/PATTestingMockExam'))));

export const patTestingRoutes = (
  <>
  <Route path="pat-testing-course" element={<PATTestingCourse />} />,
  <Route path="pat-testing-module-1" element={<PATTestingModule1 />} />,
  <Route path="pat-testing-module-2" element={<PATTestingModule2 />} />,
  <Route path="pat-testing-module-3" element={<PATTestingModule3 />} />,
  <Route path="pat-testing-module-4" element={<PATTestingModule4 />} />,
  <Route path="pat-testing-module-5" element={<PATTestingModule5 />} />,
  <Route path="pat-testing-module-1-section-1" element={<PATTestingModule1Section1 />} />,
  <Route path="pat-testing-module-1-section-2" element={<PATTestingModule1Section2 />} />,
  <Route path="pat-testing-module-1-section-3" element={<PATTestingModule1Section3 />} />,
  <Route path="pat-testing-module-1-section-4" element={<PATTestingModule1Section4 />} />,
  <Route path="pat-testing-module-1-section-5" element={<PATTestingModule1Section5 />} />,
  <Route path="pat-testing-module-2-section-1" element={<PATTestingModule2Section1 />} />,
  <Route path="pat-testing-module-2-section-2" element={<PATTestingModule2Section2 />} />,
  <Route path="pat-testing-module-2-section-3" element={<PATTestingModule2Section3 />} />,
  <Route path="pat-testing-module-2-section-4" element={<PATTestingModule2Section4 />} />,
  <Route path="pat-testing-module-2-section-5" element={<PATTestingModule2Section5 />} />,
  <Route path="pat-testing-module-3-section-1" element={<PATTestingModule3Section1 />} />,
  <Route path="pat-testing-module-3-section-2" element={<PATTestingModule3Section2 />} />,
  <Route path="pat-testing-module-3-section-3" element={<PATTestingModule3Section3 />} />,
  <Route path="pat-testing-module-3-section-4" element={<PATTestingModule3Section4 />} />,
  <Route path="pat-testing-module-3-section-5" element={<PATTestingModule3Section5 />} />,
  <Route path="pat-testing-module-4-section-1" element={<PATTestingModule4Section1 />} />,
  <Route path="pat-testing-module-4-section-2" element={<PATTestingModule4Section2 />} />,
  <Route path="pat-testing-module-4-section-3" element={<PATTestingModule4Section3 />} />,
  <Route path="pat-testing-module-4-section-4" element={<PATTestingModule4Section4 />} />,
  <Route path="pat-testing-module-4-section-5" element={<PATTestingModule4Section5 />} />,
  <Route path="pat-testing-module-4-section-6" element={<PATTestingModule4Section6 />} />,
  <Route path="pat-testing-module-5-section-1" element={<PATTestingModule5Section1 />} />,
  <Route path="pat-testing-module-5-section-2" element={<PATTestingModule5Section2 />} />,
  <Route path="pat-testing-module-5-section-3" element={<PATTestingModule5Section3 />} />,
  <Route path="pat-testing-module-5-section-4" element={<PATTestingModule5Section4 />} />,
  <Route path="pat-testing-module-5-section-5" element={<PATTestingModule5Section5 />} />,
  <Route path="pat-testing-mock-exam" element={<PATTestingMockExam />} />
  </>
);
