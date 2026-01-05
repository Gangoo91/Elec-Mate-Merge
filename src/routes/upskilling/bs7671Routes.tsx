import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { withTimeout, trackImport } from '@/lib/lazy';

const BS7671Course = lazy(() => withTimeout(() => trackImport('BS7671Course', () => import('@/pages/upskilling/BS7671Course'))));
const BS7671Module1 = lazy(() => withTimeout(() => trackImport('BS7671Module1', () => import('@/pages/upskilling/BS7671Module1'))));
const BS7671Module1Section1 = lazy(() => withTimeout(() => trackImport('BS7671Module1Section1', () => import('@/pages/upskilling/BS7671Module1Section1'))));
const BS7671Module1Section2 = lazy(() => withTimeout(() => trackImport('BS7671Module1Section2', () => import('@/pages/upskilling/BS7671Module1Section2'))));
const BS7671Module1Section3 = lazy(() => withTimeout(() => trackImport('BS7671Module1Section3', () => import('@/pages/upskilling/BS7671Module1Section3'))));
const BS7671Module1Section4 = lazy(() => withTimeout(() => trackImport('BS7671Module1Section4', () => import('@/pages/upskilling/BS7671Module1Section4'))));
const BS7671Module2 = lazy(() => withTimeout(() => trackImport('BS7671Module2', () => import('@/pages/upskilling/BS7671Module2'))));
const BS7671Module2Section1 = lazy(() => withTimeout(() => trackImport('BS7671Module2Section1', () => import('@/pages/upskilling/BS7671Module2Section1'))));
const BS7671Module2Section2 = lazy(() => withTimeout(() => trackImport('BS7671Module2Section2', () => import('@/pages/upskilling/BS7671Module2Section2'))));
const BS7671Module2Section3 = lazy(() => withTimeout(() => trackImport('BS7671Module2Section3', () => import('@/pages/upskilling/BS7671Module2Section3'))));
const BS7671Module2Section4 = lazy(() => withTimeout(() => trackImport('BS7671Module2Section4', () => import('@/pages/upskilling/BS7671Module2Section4'))));
const BS7671Module3 = lazy(() => withTimeout(() => trackImport('BS7671Module3', () => import('@/pages/upskilling/BS7671Module3'))));
const BS7671Module3Section1 = lazy(() => withTimeout(() => trackImport('BS7671Module3Section1', () => import('@/pages/upskilling/BS7671Module3Section1'))));
const BS7671Module3Section2 = lazy(() => withTimeout(() => trackImport('BS7671Module3Section2', () => import('@/pages/upskilling/BS7671Module3Section2'))));
const BS7671Module3Section3 = lazy(() => withTimeout(() => trackImport('BS7671Module3Section3', () => import('@/pages/upskilling/BS7671Module3Section3'))));
const BS7671Module3Section4 = lazy(() => withTimeout(() => trackImport('BS7671Module3Section4', () => import('@/pages/upskilling/BS7671Module3Section4'))));
const BS7671Module3Section5 = lazy(() => withTimeout(() => trackImport('BS7671Module3Section5', () => import('@/pages/upskilling/BS7671Module3Section5'))));
const BS7671Module4 = lazy(() => withTimeout(() => trackImport('BS7671Module4', () => import('@/pages/upskilling/BS7671Module4'))));
const BS7671Module4Section1 = lazy(() => withTimeout(() => trackImport('BS7671Module4Section1', () => import('@/pages/upskilling/BS7671Module4Section1'))));
const BS7671Module4Section2 = lazy(() => withTimeout(() => trackImport('BS7671Module4Section2', () => import('@/pages/upskilling/BS7671Module4Section2'))));
const BS7671Module4Section3 = lazy(() => withTimeout(() => trackImport('BS7671Module4Section3', () => import('@/pages/upskilling/BS7671Module4Section3'))));
const BS7671Module4Section4 = lazy(() => withTimeout(() => trackImport('BS7671Module4Section4', () => import('@/pages/upskilling/BS7671Module4Section4'))));
const BS7671Module4Section5 = lazy(() => withTimeout(() => trackImport('BS7671Module4Section5', () => import('@/pages/upskilling/BS7671Module4Section5'))));
const BS7671Module4Section6 = lazy(() => withTimeout(() => trackImport('BS7671Module4Section6', () => import('@/pages/upskilling/BS7671Module4Section6'))));
const BS7671Module4Section7 = lazy(() => withTimeout(() => trackImport('BS7671Module4Section7', () => import('@/pages/upskilling/BS7671Module4Section7'))));
const BS7671Module5 = lazy(() => withTimeout(() => trackImport('BS7671Module5', () => import('@/pages/upskilling/BS7671Module5'))));
const BS7671Module5Section1 = lazy(() => withTimeout(() => trackImport('BS7671Module5Section1', () => import('@/pages/upskilling/BS7671Module5Section1'))));
const BS7671Module5Section2 = lazy(() => withTimeout(() => trackImport('BS7671Module5Section2', () => import('@/pages/upskilling/BS7671Module5Section2'))));
const BS7671Module5Section3 = lazy(() => withTimeout(() => trackImport('BS7671Module5Section3', () => import('@/pages/upskilling/BS7671Module5Section3'))));
const BS7671Module5Section4 = lazy(() => withTimeout(() => trackImport('BS7671Module5Section4', () => import('@/pages/upskilling/BS7671Module5Section4'))));
const BS7671Module5Section5 = lazy(() => withTimeout(() => trackImport('BS7671Module5Section5', () => import('@/pages/upskilling/BS7671Module5Section5'))));
const BS7671Module5Section6 = lazy(() => withTimeout(() => trackImport('BS7671Module5Section6', () => import('@/pages/upskilling/BS7671Module5Section6'))));
const BS7671Module6 = lazy(() => withTimeout(() => trackImport('BS7671Module6', () => import('@/pages/upskilling/BS7671Module6'))));
const BS7671Module6Section1 = lazy(() => withTimeout(() => trackImport('BS7671Module6Section1', () => import('@/pages/upskilling/BS7671Module6Section1'))));
const BS7671Module6Section2 = lazy(() => withTimeout(() => trackImport('BS7671Module6Section2', () => import('@/pages/upskilling/BS7671Module6Section2'))));
const BS7671Module6Section3 = lazy(() => withTimeout(() => trackImport('BS7671Module6Section3', () => import('@/pages/upskilling/BS7671Module6Section3'))));
const BS7671Module6Section4 = lazy(() => withTimeout(() => trackImport('BS7671Module6Section4', () => import('@/pages/upskilling/BS7671Module6Section4'))));
const BS7671Module6Section5 = lazy(() => withTimeout(() => trackImport('BS7671Module6Section5', () => import('@/pages/upskilling/BS7671Module6Section5'))));
const BS7671Module6Section6 = lazy(() => withTimeout(() => trackImport('BS7671Module6Section6', () => import('@/pages/upskilling/BS7671Module6Section6'))));
const BS7671Module7 = lazy(() => withTimeout(() => trackImport('BS7671Module7', () => import('@/pages/upskilling/BS7671Module7'))));
const BS7671Module7Section1 = lazy(() => withTimeout(() => trackImport('BS7671Module7Section1', () => import('@/pages/upskilling/BS7671Module7Section1'))));
const BS7671Module7Section2 = lazy(() => withTimeout(() => trackImport('BS7671Module7Section2', () => import('@/pages/upskilling/BS7671Module7Section2'))));
const BS7671Module7Section3 = lazy(() => withTimeout(() => trackImport('BS7671Module7Section3', () => import('@/pages/upskilling/BS7671Module7Section3'))));
const BS7671Module7Section4 = lazy(() => withTimeout(() => trackImport('BS7671Module7Section4', () => import('@/pages/upskilling/BS7671Module7Section4'))));
const BS7671Module7Section5 = lazy(() => withTimeout(() => trackImport('BS7671Module7Section5', () => import('@/pages/upskilling/BS7671Module7Section5'))));
const BS7671Module8 = lazy(() => withTimeout(() => trackImport('BS7671Module8', () => import('@/pages/upskilling/BS7671Module8'))));
const BS7671Module8Section1 = lazy(() => withTimeout(() => trackImport('BS7671Module8Section1', () => import('@/pages/upskilling/BS7671Module8Section1'))));
const BS7671Module8Section2 = lazy(() => withTimeout(() => trackImport('BS7671Module8Section2', () => import('@/pages/upskilling/BS7671Module8Section2'))));
const BS7671Module8Section3 = lazy(() => withTimeout(() => trackImport('BS7671Module8Section3', () => import('@/pages/upskilling/BS7671Module8Section3'))));
const BS7671Module9 = lazy(() => withTimeout(() => trackImport('BS7671Module9', () => import('@/pages/upskilling/BS7671Module9'))));
const BS7671ExamGuide = lazy(() => withTimeout(() => trackImport('BS7671ExamGuide', () => import('@/pages/upskilling/BS7671ExamGuide'))));
const BS7671MockExam = lazy(() => withTimeout(() => trackImport('BS7671MockExam', () => import('@/components/upskilling/BS7671MockExam'))));

export const bs7671Routes = (
  <>
  <Route path="bs7671-course" element={<BS7671Course />} />,
  <Route path="bs7671-module-1" element={<BS7671Module1 />} />,
  <Route path="bs7671-module-1-section-1" element={<BS7671Module1Section1 />} />,
  <Route path="bs7671-module-1-section-2" element={<BS7671Module1Section2 />} />,
  <Route path="bs7671-module-1-section-3" element={<BS7671Module1Section3 />} />,
  <Route path="bs7671-module-1-section-4" element={<BS7671Module1Section4 />} />,
  <Route path="bs7671-module-2" element={<BS7671Module2 />} />,
  <Route path="bs7671-module-2-section-1" element={<BS7671Module2Section1 />} />,
  <Route path="bs7671-module-2-section-2" element={<BS7671Module2Section2 />} />,
  <Route path="bs7671-module-2-section-3" element={<BS7671Module2Section3 />} />,
  <Route path="bs7671-module-2-section-4" element={<BS7671Module2Section4 />} />,
  <Route path="bs7671-module-3" element={<BS7671Module3 />} />,
  <Route path="bs7671-module-3-section-1" element={<BS7671Module3Section1 />} />,
  <Route path="bs7671-module-3-section-2" element={<BS7671Module3Section2 />} />,
  <Route path="bs7671-module-3-section-3" element={<BS7671Module3Section3 />} />,
  <Route path="bs7671-module-3-section-4" element={<BS7671Module3Section4 />} />,
  <Route path="bs7671-module-3-section-5" element={<BS7671Module3Section5 />} />,
  <Route path="bs7671-module-4" element={<BS7671Module4 />} />,
  <Route path="bs7671-module-4-section-1" element={<BS7671Module4Section1 />} />,
  <Route path="bs7671-module-4-section-2" element={<BS7671Module4Section2 />} />,
  <Route path="bs7671-module-4-section-3" element={<BS7671Module4Section3 />} />,
  <Route path="bs7671-module-4-section-4" element={<BS7671Module4Section4 />} />,
  <Route path="bs7671-module-4-section-5" element={<BS7671Module4Section5 />} />,
  <Route path="bs7671-module-4-section-6" element={<BS7671Module4Section6 />} />,
  <Route path="bs7671-module-4-section-7" element={<BS7671Module4Section7 />} />,
  <Route path="bs7671-module-5" element={<BS7671Module5 />} />,
  <Route path="bs7671-module-5-section-1" element={<BS7671Module5Section1 />} />,
  <Route path="bs7671-module-5-section-2" element={<BS7671Module5Section2 />} />,
  <Route path="bs7671-module-5-section-3" element={<BS7671Module5Section3 />} />,
  <Route path="bs7671-module-5-section-4" element={<BS7671Module5Section4 />} />,
  <Route path="bs7671-module-5-section-5" element={<BS7671Module5Section5 />} />,
  <Route path="bs7671-module-5-section-6" element={<BS7671Module5Section6 />} />,
  <Route path="bs7671-module-6" element={<BS7671Module6 />} />,
  <Route path="bs7671-module-6-section-1" element={<BS7671Module6Section1 />} />,
  <Route path="bs7671-module-6-section-2" element={<BS7671Module6Section2 />} />,
  <Route path="bs7671-module-6-section-3" element={<BS7671Module6Section3 />} />,
  <Route path="bs7671-module-6-section-4" element={<BS7671Module6Section4 />} />,
  <Route path="bs7671-module-6-section-5" element={<BS7671Module6Section5 />} />,
  <Route path="bs7671-module-6-section-6" element={<BS7671Module6Section6 />} />,
  <Route path="bs7671-module-7" element={<BS7671Module7 />} />,
  <Route path="bs7671-module-7-section-1" element={<BS7671Module7Section1 />} />,
  <Route path="bs7671-module-7-section-2" element={<BS7671Module7Section2 />} />,
  <Route path="bs7671-module-7-section-3" element={<BS7671Module7Section3 />} />,
  <Route path="bs7671-module-7-section-4" element={<BS7671Module7Section4 />} />,
  <Route path="bs7671-module-7-section-5" element={<BS7671Module7Section5 />} />,
  <Route path="bs7671-module-8" element={<BS7671Module8 />} />,
  <Route path="bs7671-module-8-section-1" element={<BS7671Module8Section1 />} />,
  <Route path="bs7671-module-8-section-2" element={<BS7671Module8Section2 />} />,
  <Route path="bs7671-module-8-section-3" element={<BS7671Module8Section3 />} />,
  <Route path="bs7671-module-9" element={<BS7671Module9 />} />,
  <Route path="bs7671-mock-exam" element={<BS7671MockExam />} />,
  <Route path="bs7671-exam-guide" element={<BS7671ExamGuide />} />
  </>
);
