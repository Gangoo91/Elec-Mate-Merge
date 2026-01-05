import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { withTimeout, trackImport } from '@/lib/lazy';

const InspectionTesting = lazy(() => withTimeout(() => trackImport('InspectionTesting', () => import('@/pages/upskilling/InspectionTesting'))));
const Module1 = lazy(() => withTimeout(() => trackImport('Module1', () => import('@/pages/upskilling/Module1'))));
const Module1Section1 = lazy(() => withTimeout(() => trackImport('Module1Section1', () => import('@/pages/upskilling/Module1Section1'))));
const Module1Section2 = lazy(() => withTimeout(() => trackImport('Module1Section2', () => import('@/pages/upskilling/Module1Section2'))));
const Module1Section3 = lazy(() => withTimeout(() => trackImport('Module1Section3', () => import('@/pages/upskilling/Module1Section3'))));
const Module1Section4 = lazy(() => withTimeout(() => trackImport('Module1Section4', () => import('@/pages/upskilling/Module1Section4'))));
const Module1Section5 = lazy(() => withTimeout(() => trackImport('Module1Section5', () => import('@/pages/upskilling/Module1Section5'))));
const Module1Section6 = lazy(() => withTimeout(() => trackImport('Module1Section6', () => import('@/pages/upskilling/Module1Section6'))));
const Module1Section7 = lazy(() => withTimeout(() => trackImport('Module1Section7', () => import('@/pages/upskilling/Module1Section7'))));
const Module1Section8 = lazy(() => withTimeout(() => trackImport('Module1Section8', () => import('@/pages/upskilling/Module1Section8'))));
const Module2 = lazy(() => withTimeout(() => trackImport('Module2', () => import('@/pages/upskilling/Module2'))));
const Module2Section1 = lazy(() => withTimeout(() => trackImport('Module2Section1', () => import('@/pages/upskilling/Module2Section1'))));
const Module2Section2 = lazy(() => withTimeout(() => trackImport('Module2Section2', () => import('@/pages/upskilling/Module2Section2'))));
const Module2Section3 = lazy(() => withTimeout(() => trackImport('Module2Section3', () => import('@/pages/upskilling/Module2Section3'))));
const Module2Section4 = lazy(() => withTimeout(() => trackImport('Module2Section4', () => import('@/pages/upskilling/Module2Section4'))));
const Module2Section5 = lazy(() => withTimeout(() => trackImport('Module2Section5', () => import('@/pages/upskilling/Module2Section5'))));
const Module2Section6 = lazy(() => withTimeout(() => trackImport('Module2Section6', () => import('@/pages/upskilling/Module2Section6'))));
const Module2Section7 = lazy(() => withTimeout(() => trackImport('Module2Section7', () => import('@/pages/upskilling/Module2Section7'))));
const Module3 = lazy(() => withTimeout(() => trackImport('Module3', () => import('@/pages/upskilling/Module3'))));
const Module3Section1 = lazy(() => withTimeout(() => trackImport('Module3Section1', () => import('@/pages/upskilling/Module3Section1'))));
const Module3Section2 = lazy(() => withTimeout(() => trackImport('Module3Section2', () => import('@/pages/upskilling/Module3Section2'))));
const Module3Section3 = lazy(() => withTimeout(() => trackImport('Module3Section3', () => import('@/pages/upskilling/Module3Section3'))));
const Module3Section4 = lazy(() => withTimeout(() => trackImport('Module3Section4', () => import('@/pages/upskilling/Module3Section4'))));
const Module3Section5 = lazy(() => withTimeout(() => trackImport('Module3Section5', () => import('@/pages/upskilling/Module3Section5'))));
const Module3Section6 = lazy(() => withTimeout(() => trackImport('Module3Section6', () => import('@/pages/upskilling/Module3Section6'))));
const Module4 = lazy(() => withTimeout(() => trackImport('Module4', () => import('@/pages/upskilling/Module4'))));
const Module4Section1 = lazy(() => withTimeout(() => trackImport('Module4Section1', () => import('@/pages/upskilling/Module4Section1'))));
const Module4Section2 = lazy(() => withTimeout(() => trackImport('Module4Section2', () => import('@/pages/upskilling/Module4Section2'))));
const Module4Section3 = lazy(() => withTimeout(() => trackImport('Module4Section3', () => import('@/pages/upskilling/Module4Section3'))));
const Module4Section4 = lazy(() => withTimeout(() => trackImport('Module4Section4', () => import('@/pages/upskilling/Module4Section4'))));
const Module4Section5 = lazy(() => withTimeout(() => trackImport('Module4Section5', () => import('@/pages/upskilling/Module4Section5'))));
const Module4Section6 = lazy(() => withTimeout(() => trackImport('Module4Section6', () => import('@/pages/upskilling/Module4Section6'))));
const Module4Section7 = lazy(() => withTimeout(() => trackImport('Module4Section7', () => import('@/pages/upskilling/Module4Section7'))));
const Module5 = lazy(() => withTimeout(() => trackImport('Module5', () => import('@/pages/upskilling/Module5'))));
const Module5Section1 = lazy(() => withTimeout(() => trackImport('Module5Section1', () => import('@/pages/upskilling/Module5Section1'))));
const Module5Section2 = lazy(() => withTimeout(() => trackImport('Module5Section2', () => import('@/pages/upskilling/Module5Section2'))));
const Module5Section3 = lazy(() => withTimeout(() => trackImport('Module5Section3', () => import('@/pages/upskilling/Module5Section3'))));
const Module5Section4 = lazy(() => withTimeout(() => trackImport('Module5Section4', () => import('@/pages/upskilling/Module5Section4'))));
const Module5Section5 = lazy(() => withTimeout(() => trackImport('Module5Section5', () => import('@/pages/upskilling/Module5Section5'))));
const Module5Section6 = lazy(() => withTimeout(() => trackImport('Module5Section6', () => import('@/pages/upskilling/Module5Section6'))));
const Module5Section7 = lazy(() => withTimeout(() => trackImport('Module5Section7', () => import('@/pages/upskilling/Module5Section7'))));
const Module6 = lazy(() => withTimeout(() => trackImport('Module6', () => import('@/pages/upskilling/Module6'))));
const Module6Section1 = lazy(() => withTimeout(() => trackImport('Module6Section1', () => import('@/pages/upskilling/Module6Section1'))));
const Module6Section2 = lazy(() => withTimeout(() => trackImport('Module6Section2', () => import('@/pages/upskilling/Module6Section2'))));
const Module6Section3 = lazy(() => withTimeout(() => trackImport('Module6Section3', () => import('@/pages/upskilling/Module6Section3'))));
const Module6Section4 = lazy(() => withTimeout(() => trackImport('Module6Section4', () => import('@/pages/upskilling/Module6Section4'))));
const Module6Section5 = lazy(() => withTimeout(() => trackImport('Module6Section5', () => import('@/pages/upskilling/Module6Section5'))));
const Module6Section6 = lazy(() => withTimeout(() => trackImport('Module6Section6', () => import('@/pages/upskilling/Module6Section6'))));
const Module7 = lazy(() => withTimeout(() => trackImport('Module7', () => import('@/pages/upskilling/Module7'))));
const Module7Section1 = lazy(() => withTimeout(() => trackImport('Module7Section1', () => import('@/pages/upskilling/Module7Section1'))));
const Module7Section2 = lazy(() => withTimeout(() => trackImport('Module7Section2', () => import('@/pages/upskilling/Module7Section2'))));
const Module7Section3 = lazy(() => withTimeout(() => trackImport('Module7Section3', () => import('@/pages/upskilling/Module7Section3'))));
const Module7Section4 = lazy(() => withTimeout(() => trackImport('Module7Section4', () => import('@/pages/upskilling/Module7Section4'))));
const Module7Section5 = lazy(() => withTimeout(() => trackImport('Module7Section5', () => import('@/pages/upskilling/Module7Section5'))));
const Module7Section6 = lazy(() => withTimeout(() => trackImport('Module7Section6', () => import('@/pages/upskilling/Module7Section6'))));
const Module8 = lazy(() => withTimeout(() => trackImport('Module8', () => import('@/pages/upskilling/Module8'))));
const Module8Section1 = lazy(() => withTimeout(() => trackImport('Module8Section1', () => import('@/pages/upskilling/Module8Section1'))));
const Module8Section2 = lazy(() => withTimeout(() => trackImport('Module8Section2', () => import('@/pages/upskilling/Module8Section2'))));
const Module8Section2Part1 = lazy(() => withTimeout(() => trackImport('Module8Section2Part1', () => import('@/pages/upskilling/Module8Section2Part1'))));
const Module8Section2Part2 = lazy(() => withTimeout(() => trackImport('Module8Section2Part2', () => import('@/pages/upskilling/Module8Section2Part2'))));
const Module8Section2Part3 = lazy(() => withTimeout(() => trackImport('Module8Section2Part3', () => import('@/pages/upskilling/Module8Section2Part3'))));
const Module8Section2Part4 = lazy(() => withTimeout(() => trackImport('Module8Section2Part4', () => import('@/pages/upskilling/Module8Section2Part4'))));
const Module8Section2Part5 = lazy(() => withTimeout(() => trackImport('Module8Section2Part5', () => import('@/pages/upskilling/Module8Section2Part5'))));
const Module8Section3 = lazy(() => withTimeout(() => trackImport('Module8Section3', () => import('@/pages/upskilling/Module8Section3'))));
const VisualInspectionGuide = lazy(() => withTimeout(() => trackImport('VisualInspectionGuide', () => import('@/pages/upskilling/VisualInspectionGuide'))));
const SafeIsolationGuide = lazy(() => withTimeout(() => trackImport('SafeIsolationGuide', () => import('@/pages/upskilling/SafeIsolationGuide'))));
const CPCContinuityGuide = lazy(() => withTimeout(() => trackImport('CPCContinuityGuide', () => import('@/pages/upskilling/CPCContinuityGuide'))));
const RingFinalContinuityGuide = lazy(() => withTimeout(() => trackImport('RingFinalContinuityGuide', () => import('@/pages/upskilling/RingFinalContinuityGuide'))));
const InsulationResistanceGuide = lazy(() => withTimeout(() => trackImport('InsulationResistanceGuide', () => import('@/pages/upskilling/InsulationResistanceGuide'))));
const PolarityTestingGuide = lazy(() => withTimeout(() => trackImport('PolarityTestingGuide', () => import('@/pages/upskilling/PolarityTestingGuide'))));
const EarthFaultLoopGuide = lazy(() => withTimeout(() => trackImport('EarthFaultLoopGuide', () => import('@/pages/upskilling/EarthFaultLoopGuide'))));
const RCDTestingGuide = lazy(() => withTimeout(() => trackImport('RCDTestingGuide', () => import('@/pages/upskilling/RCDTestingGuide'))));
const FunctionalTestingGuide = lazy(() => withTimeout(() => trackImport('FunctionalTestingGuide', () => import('@/pages/upskilling/FunctionalTestingGuide'))));
const DocumentationGuide = lazy(() => withTimeout(() => trackImport('DocumentationGuide', () => import('@/pages/upskilling/DocumentationGuide'))));

export const inspectionTestingRoutes = (
  <>
    <Route path="inspection-testing" element={<InspectionTesting />} />
    <Route path="module-1" element={<Module1 />} />
    <Route path="module-1/section-1" element={<Module1Section1 />} />
    <Route path="module-1/section-2" element={<Module1Section2 />} />
    <Route path="module-1/section-3" element={<Module1Section3 />} />
    <Route path="module-1/section-4" element={<Module1Section4 />} />
    <Route path="module-1/section-5" element={<Module1Section5 />} />
    <Route path="module-1/section-6" element={<Module1Section6 />} />
    <Route path="module-1/section-7" element={<Module1Section7 />} />
    <Route path="module-1/section-8" element={<Module1Section8 />} />
    <Route path="module-2" element={<Module2 />} />
    <Route path="module-2/section-1" element={<Module2Section1 />} />
    <Route path="module-2/section-2" element={<Module2Section2 />} />
    <Route path="module-2/section-3" element={<Module2Section3 />} />
    <Route path="module-2/section-4" element={<Module2Section4 />} />
    <Route path="module-2/section-5" element={<Module2Section5 />} />
    <Route path="module-2/section-6" element={<Module2Section6 />} />
    <Route path="module-2/section-7" element={<Module2Section7 />} />
    <Route path="module-3" element={<Module3 />} />
    <Route path="module-3/section-1" element={<Module3Section1 />} />
    <Route path="module-3/section-2" element={<Module3Section2 />} />
    <Route path="module-3/section-3" element={<Module3Section3 />} />
    <Route path="module-3/section-4" element={<Module3Section4 />} />
    <Route path="module-3/section-5" element={<Module3Section5 />} />
    <Route path="module-3/section-6" element={<Module3Section6 />} />
    <Route path="module-4" element={<Module4 />} />
    <Route path="module-4/section-1" element={<Module4Section1 />} />
    <Route path="module-4/section-2" element={<Module4Section2 />} />
    <Route path="module-4/section-3" element={<Module4Section3 />} />
    <Route path="module-4/section-4" element={<Module4Section4 />} />
    <Route path="module-4/section-5" element={<Module4Section5 />} />
    <Route path="module-4/section-6" element={<Module4Section6 />} />
    <Route path="module-4/section-7" element={<Module4Section7 />} />
    <Route path="module-5" element={<Module5 />} />
    <Route path="module-5/section-1" element={<Module5Section1 />} />
    <Route path="module-5/section-2" element={<Module5Section2 />} />
    <Route path="module-5/section-3" element={<Module5Section3 />} />
    <Route path="module-5/section-4" element={<Module5Section4 />} />
    <Route path="module-5/section-5" element={<Module5Section5 />} />
    <Route path="module-5/section-6" element={<Module5Section6 />} />
    <Route path="module-5/section-7" element={<Module5Section7 />} />
    <Route path="module-6" element={<Module6 />} />
    <Route path="module-6/section-1" element={<Module6Section1 />} />
    <Route path="module-6/section-2" element={<Module6Section2 />} />
    <Route path="module-6/section-3" element={<Module6Section3 />} />
    <Route path="module-6/section-4" element={<Module6Section4 />} />
    <Route path="module-6/section-5" element={<Module6Section5 />} />
    <Route path="module-6/section-6" element={<Module6Section6 />} />
    <Route path="module-7" element={<Module7 />} />
    <Route path="module-7/section-1" element={<Module7Section1 />} />
    <Route path="module-7/section-2" element={<Module7Section2 />} />
    <Route path="module-7/section-3" element={<Module7Section3 />} />
    <Route path="module-7/section-4" element={<Module7Section4 />} />
    <Route path="module-7/section-5" element={<Module7Section5 />} />
    <Route path="module-7/section-6" element={<Module7Section6 />} />
    <Route path="module-8" element={<Module8 />} />
    <Route path="module-8/section-1" element={<Module8Section1 />} />
    <Route path="module-8/section-2" element={<Module8Section2 />} />
    <Route path="module-8/section-2/part-1" element={<Module8Section2Part1 />} />
    <Route path="module-8/section-2/part-2" element={<Module8Section2Part2 />} />
    <Route path="module-8/section-2/part-3" element={<Module8Section2Part3 />} />
    <Route path="module-8/section-2/part-4" element={<Module8Section2Part4 />} />
    <Route path="module-8/section-2/part-5" element={<Module8Section2Part5 />} />
    <Route path="module-8/section-3" element={<Module8Section3 />} />
    <Route path="visual-inspection-guide" element={<VisualInspectionGuide />} />
    <Route path="safe-isolation-guide" element={<SafeIsolationGuide />} />
    <Route path="cpc-continuity-guide" element={<CPCContinuityGuide />} />
    <Route path="ring-final-continuity-guide" element={<RingFinalContinuityGuide />} />
    <Route path="insulation-resistance-guide" element={<InsulationResistanceGuide />} />
    <Route path="polarity-testing-guide" element={<PolarityTestingGuide />} />
    <Route path="earth-fault-loop-guide" element={<EarthFaultLoopGuide />} />
    <Route path="rcd-testing-guide" element={<RCDTestingGuide />} />
    <Route path="functional-testing-guide" element={<FunctionalTestingGuide />} />
    <Route path="documentation-guide" element={<DocumentationGuide />} />
  </>
);
