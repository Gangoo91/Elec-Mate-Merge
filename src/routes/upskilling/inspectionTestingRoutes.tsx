import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { withTimeout, trackImport } from '@/lib/lazy';

// Course landing page
const InspectionTesting = lazy(() => withTimeout(() => trackImport('InspectionTesting', () => import('@/pages/upskilling/InspectionTesting'))));

// Module 1: Introduction to Inspection & Testing (5 sections)
const InspectionTestingModule1 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule1', () => import('@/pages/upskilling/InspectionTestingModule1'))));
const InspectionTestingModule1Section1 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule1Section1', () => import('@/pages/upskilling/InspectionTestingModule1Section1'))));
const InspectionTestingModule1Section2 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule1Section2', () => import('@/pages/upskilling/InspectionTestingModule1Section2'))));
const InspectionTestingModule1Section3 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule1Section3', () => import('@/pages/upskilling/InspectionTestingModule1Section3'))));
const InspectionTestingModule1Section4 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule1Section4', () => import('@/pages/upskilling/InspectionTestingModule1Section4'))));
const InspectionTestingModule1Section5 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule1Section5', () => import('@/pages/upskilling/InspectionTestingModule1Section5'))));

// Module 2: Safe Isolation Procedures (6 sections)
const InspectionTestingModule2 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule2', () => import('@/pages/upskilling/InspectionTestingModule2'))));
const InspectionTestingModule2Section1 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule2Section1', () => import('@/pages/upskilling/InspectionTestingModule2Section1'))));
const InspectionTestingModule2Section2 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule2Section2', () => import('@/pages/upskilling/InspectionTestingModule2Section2'))));
const InspectionTestingModule2Section3 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule2Section3', () => import('@/pages/upskilling/InspectionTestingModule2Section3'))));
const InspectionTestingModule2Section4 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule2Section4', () => import('@/pages/upskilling/InspectionTestingModule2Section4'))));
const InspectionTestingModule2Section5 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule2Section5', () => import('@/pages/upskilling/InspectionTestingModule2Section5'))));
const InspectionTestingModule2Section6 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule2Section6', () => import('@/pages/upskilling/InspectionTestingModule2Section6'))));

// Module 3: Continuity Testing (6 sections)
const InspectionTestingModule3 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule3', () => import('@/pages/upskilling/InspectionTestingModule3'))));
const InspectionTestingModule3Section1 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule3Section1', () => import('@/pages/upskilling/InspectionTestingModule3Section1'))));
const InspectionTestingModule3Section2 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule3Section2', () => import('@/pages/upskilling/InspectionTestingModule3Section2'))));
const InspectionTestingModule3Section3 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule3Section3', () => import('@/pages/upskilling/InspectionTestingModule3Section3'))));
const InspectionTestingModule3Section4 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule3Section4', () => import('@/pages/upskilling/InspectionTestingModule3Section4'))));
const InspectionTestingModule3Section5 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule3Section5', () => import('@/pages/upskilling/InspectionTestingModule3Section5'))));
const InspectionTestingModule3Section6 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule3Section6', () => import('@/pages/upskilling/InspectionTestingModule3Section6'))));

// Module 4: Insulation Resistance Testing (6 sections)
const InspectionTestingModule4 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule4', () => import('@/pages/upskilling/InspectionTestingModule4'))));
const InspectionTestingModule4Section1 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule4Section1', () => import('@/pages/upskilling/InspectionTestingModule4Section1'))));
const InspectionTestingModule4Section2 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule4Section2', () => import('@/pages/upskilling/InspectionTestingModule4Section2'))));
const InspectionTestingModule4Section3 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule4Section3', () => import('@/pages/upskilling/InspectionTestingModule4Section3'))));
const InspectionTestingModule4Section4 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule4Section4', () => import('@/pages/upskilling/InspectionTestingModule4Section4'))));
const InspectionTestingModule4Section5 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule4Section5', () => import('@/pages/upskilling/InspectionTestingModule4Section5'))));
const InspectionTestingModule4Section6 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule4Section6', () => import('@/pages/upskilling/InspectionTestingModule4Section6'))));

// Module 5: Earth Fault Loop Impedance (6 sections)
const InspectionTestingModule5 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule5', () => import('@/pages/upskilling/InspectionTestingModule5'))));
const InspectionTestingModule5Section1 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule5Section1', () => import('@/pages/upskilling/InspectionTestingModule5Section1'))));
const InspectionTestingModule5Section2 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule5Section2', () => import('@/pages/upskilling/InspectionTestingModule5Section2'))));
const InspectionTestingModule5Section3 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule5Section3', () => import('@/pages/upskilling/InspectionTestingModule5Section3'))));
const InspectionTestingModule5Section4 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule5Section4', () => import('@/pages/upskilling/InspectionTestingModule5Section4'))));
const InspectionTestingModule5Section5 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule5Section5', () => import('@/pages/upskilling/InspectionTestingModule5Section5'))));
const InspectionTestingModule5Section6 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule5Section6', () => import('@/pages/upskilling/InspectionTestingModule5Section6'))));

// Module 6: RCD Testing (5 sections)
const InspectionTestingModule6 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule6', () => import('@/pages/upskilling/InspectionTestingModule6'))));
const InspectionTestingModule6Section1 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule6Section1', () => import('@/pages/upskilling/InspectionTestingModule6Section1'))));
const InspectionTestingModule6Section2 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule6Section2', () => import('@/pages/upskilling/InspectionTestingModule6Section2'))));
const InspectionTestingModule6Section3 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule6Section3', () => import('@/pages/upskilling/InspectionTestingModule6Section3'))));
const InspectionTestingModule6Section4 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule6Section4', () => import('@/pages/upskilling/InspectionTestingModule6Section4'))));
const InspectionTestingModule6Section5 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule6Section5', () => import('@/pages/upskilling/InspectionTestingModule6Section5'))));

// Module 7: Polarity and Functional Testing (5 sections)
const InspectionTestingModule7 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule7', () => import('@/pages/upskilling/InspectionTestingModule7'))));
const InspectionTestingModule7Section1 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule7Section1', () => import('@/pages/upskilling/InspectionTestingModule7Section1'))));
const InspectionTestingModule7Section2 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule7Section2', () => import('@/pages/upskilling/InspectionTestingModule7Section2'))));
const InspectionTestingModule7Section3 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule7Section3', () => import('@/pages/upskilling/InspectionTestingModule7Section3'))));
const InspectionTestingModule7Section4 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule7Section4', () => import('@/pages/upskilling/InspectionTestingModule7Section4'))));
const InspectionTestingModule7Section5 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule7Section5', () => import('@/pages/upskilling/InspectionTestingModule7Section5'))));

// Module 8: Visual Inspection & Documentation (5 sections)
const InspectionTestingModule8 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule8', () => import('@/pages/upskilling/InspectionTestingModule8'))));
const InspectionTestingModule8Section1 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule8Section1', () => import('@/pages/upskilling/InspectionTestingModule8Section1'))));
const InspectionTestingModule8Section2 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule8Section2', () => import('@/pages/upskilling/InspectionTestingModule8Section2'))));
const InspectionTestingModule8Section3 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule8Section3', () => import('@/pages/upskilling/InspectionTestingModule8Section3'))));
const InspectionTestingModule8Section4 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule8Section4', () => import('@/pages/upskilling/InspectionTestingModule8Section4'))));
const InspectionTestingModule8Section5 = lazy(() => withTimeout(() => trackImport('InspectionTestingModule8Section5', () => import('@/pages/upskilling/InspectionTestingModule8Section5'))));

// Testing Guides
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
    {/* Course Landing Page */}
    <Route path="inspection-testing" element={<InspectionTesting />} />

    {/* Module 1: Introduction to Inspection & Testing (5 sections) */}
    <Route path="inspection-testing/module-1" element={<InspectionTestingModule1 />} />
    <Route path="inspection-testing/module-1/section-1" element={<InspectionTestingModule1Section1 />} />
    <Route path="inspection-testing/module-1/section-2" element={<InspectionTestingModule1Section2 />} />
    <Route path="inspection-testing/module-1/section-3" element={<InspectionTestingModule1Section3 />} />
    <Route path="inspection-testing/module-1/section-4" element={<InspectionTestingModule1Section4 />} />
    <Route path="inspection-testing/module-1/section-5" element={<InspectionTestingModule1Section5 />} />

    {/* Module 2: Safe Isolation Procedures (6 sections) */}
    <Route path="inspection-testing/module-2" element={<InspectionTestingModule2 />} />
    <Route path="inspection-testing/module-2/section-1" element={<InspectionTestingModule2Section1 />} />
    <Route path="inspection-testing/module-2/section-2" element={<InspectionTestingModule2Section2 />} />
    <Route path="inspection-testing/module-2/section-3" element={<InspectionTestingModule2Section3 />} />
    <Route path="inspection-testing/module-2/section-4" element={<InspectionTestingModule2Section4 />} />
    <Route path="inspection-testing/module-2/section-5" element={<InspectionTestingModule2Section5 />} />
    <Route path="inspection-testing/module-2/section-6" element={<InspectionTestingModule2Section6 />} />

    {/* Module 3: Continuity Testing (6 sections) */}
    <Route path="inspection-testing/module-3" element={<InspectionTestingModule3 />} />
    <Route path="inspection-testing/module-3/section-1" element={<InspectionTestingModule3Section1 />} />
    <Route path="inspection-testing/module-3/section-2" element={<InspectionTestingModule3Section2 />} />
    <Route path="inspection-testing/module-3/section-3" element={<InspectionTestingModule3Section3 />} />
    <Route path="inspection-testing/module-3/section-4" element={<InspectionTestingModule3Section4 />} />
    <Route path="inspection-testing/module-3/section-5" element={<InspectionTestingModule3Section5 />} />
    <Route path="inspection-testing/module-3/section-6" element={<InspectionTestingModule3Section6 />} />

    {/* Module 4: Insulation Resistance Testing (6 sections) */}
    <Route path="inspection-testing/module-4" element={<InspectionTestingModule4 />} />
    <Route path="inspection-testing/module-4/section-1" element={<InspectionTestingModule4Section1 />} />
    <Route path="inspection-testing/module-4/section-2" element={<InspectionTestingModule4Section2 />} />
    <Route path="inspection-testing/module-4/section-3" element={<InspectionTestingModule4Section3 />} />
    <Route path="inspection-testing/module-4/section-4" element={<InspectionTestingModule4Section4 />} />
    <Route path="inspection-testing/module-4/section-5" element={<InspectionTestingModule4Section5 />} />
    <Route path="inspection-testing/module-4/section-6" element={<InspectionTestingModule4Section6 />} />

    {/* Module 5: Earth Fault Loop Impedance (6 sections) */}
    <Route path="inspection-testing/module-5" element={<InspectionTestingModule5 />} />
    <Route path="inspection-testing/module-5/section-1" element={<InspectionTestingModule5Section1 />} />
    <Route path="inspection-testing/module-5/section-2" element={<InspectionTestingModule5Section2 />} />
    <Route path="inspection-testing/module-5/section-3" element={<InspectionTestingModule5Section3 />} />
    <Route path="inspection-testing/module-5/section-4" element={<InspectionTestingModule5Section4 />} />
    <Route path="inspection-testing/module-5/section-5" element={<InspectionTestingModule5Section5 />} />
    <Route path="inspection-testing/module-5/section-6" element={<InspectionTestingModule5Section6 />} />

    {/* Module 6: RCD Testing (5 sections) */}
    <Route path="inspection-testing/module-6" element={<InspectionTestingModule6 />} />
    <Route path="inspection-testing/module-6/section-1" element={<InspectionTestingModule6Section1 />} />
    <Route path="inspection-testing/module-6/section-2" element={<InspectionTestingModule6Section2 />} />
    <Route path="inspection-testing/module-6/section-3" element={<InspectionTestingModule6Section3 />} />
    <Route path="inspection-testing/module-6/section-4" element={<InspectionTestingModule6Section4 />} />
    <Route path="inspection-testing/module-6/section-5" element={<InspectionTestingModule6Section5 />} />

    {/* Module 7: Polarity and Functional Testing (5 sections) */}
    <Route path="inspection-testing/module-7" element={<InspectionTestingModule7 />} />
    <Route path="inspection-testing/module-7/section-1" element={<InspectionTestingModule7Section1 />} />
    <Route path="inspection-testing/module-7/section-2" element={<InspectionTestingModule7Section2 />} />
    <Route path="inspection-testing/module-7/section-3" element={<InspectionTestingModule7Section3 />} />
    <Route path="inspection-testing/module-7/section-4" element={<InspectionTestingModule7Section4 />} />
    <Route path="inspection-testing/module-7/section-5" element={<InspectionTestingModule7Section5 />} />

    {/* Module 8: Visual Inspection & Documentation (5 sections) */}
    <Route path="inspection-testing/module-8" element={<InspectionTestingModule8 />} />
    <Route path="inspection-testing/module-8/section-1" element={<InspectionTestingModule8Section1 />} />
    <Route path="inspection-testing/module-8/section-2" element={<InspectionTestingModule8Section2 />} />
    <Route path="inspection-testing/module-8/section-3" element={<InspectionTestingModule8Section3 />} />
    <Route path="inspection-testing/module-8/section-4" element={<InspectionTestingModule8Section4 />} />
    <Route path="inspection-testing/module-8/section-5" element={<InspectionTestingModule8Section5 />} />

    {/* Testing Guides */}
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
