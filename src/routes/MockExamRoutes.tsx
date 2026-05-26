/**
 * MockExamRoutes — public SEO mock exam routes.
 *
 * 1 hub + 25 individual mock exam pages, all unauthenticated.
 * Mounted under "mock-exams/*" from AppRouter.tsx (Public section).
 */
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LazyRoute } from '@/components/LazyRoute';

const MockExamsHubPage = lazy(() => import('@/pages/mock-exams/MockExamsHubPage'));

// Trade certifications
const FirstAidMockExamPage = lazy(() => import('@/pages/mock-exams/FirstAidMockExamPage'));
const CSCSCardMockExamPage = lazy(() => import('@/pages/mock-exams/CSCSCardMockExamPage'));
const IPAFMockExamPage = lazy(() => import('@/pages/mock-exams/IPAFMockExamPage'));
const PASMAMockExamPage = lazy(() => import('@/pages/mock-exams/PASMAMockExamPage'));
const AsbestosAwarenessMockExamPage = lazy(
  () => import('@/pages/mock-exams/AsbestosAwarenessMockExamPage')
);
const WorkingAtHeightMockExamPage = lazy(
  () => import('@/pages/mock-exams/WorkingAtHeightMockExamPage')
);
const ManualHandlingMockExamPage = lazy(
  () => import('@/pages/mock-exams/ManualHandlingMockExamPage')
);
const CoshhMockExamPage = lazy(() => import('@/pages/mock-exams/CoshhMockExamPage'));
const FireSafetyMockExamPage = lazy(() => import('@/pages/mock-exams/FireSafetyMockExamPage'));
const ConfinedSpacesMockExamPage = lazy(
  () => import('@/pages/mock-exams/ConfinedSpacesMockExamPage')
);

// Electrical exams
const EighteenthEditionMockExamPage = lazy(
  () => import('@/pages/mock-exams/EighteenthEditionMockExamPage')
);
const C2391MockExamPage = lazy(() => import('@/pages/mock-exams/C2391MockExamPage'));
const AM2OnlineMockExamPage = lazy(() => import('@/pages/mock-exams/AM2OnlineMockExamPage'));

// Level 2
const L2HealthSafetyMockExamPage = lazy(
  () => import('@/pages/mock-exams/L2HealthSafetyMockExamPage')
);
const L2ElectricalPrinciplesMockExamPage = lazy(
  () => import('@/pages/mock-exams/L2ElectricalPrinciplesMockExamPage')
);
const L2InstallationTheoryMockExamPage = lazy(
  () => import('@/pages/mock-exams/L2InstallationTheoryMockExamPage')
);
const L2InstallationPracticeMockExamPage = lazy(
  () => import('@/pages/mock-exams/L2InstallationPracticeMockExamPage')
);
const L2CommsCareerMockExamPage = lazy(
  () => import('@/pages/mock-exams/L2CommsCareerMockExamPage')
);

// Level 3
const L3HealthSafetyMockExamPage = lazy(
  () => import('@/pages/mock-exams/L3HealthSafetyMockExamPage')
);
const L3EnvironmentalTechMockExamPage = lazy(
  () => import('@/pages/mock-exams/L3EnvironmentalTechMockExamPage')
);
const L3ElectricalScienceMockExamPage = lazy(
  () => import('@/pages/mock-exams/L3ElectricalScienceMockExamPage')
);
const L3FaultDiagnosisMockExamPage = lazy(
  () => import('@/pages/mock-exams/L3FaultDiagnosisMockExamPage')
);
const L3InspectionTestingMockExamPage = lazy(
  () => import('@/pages/mock-exams/L3InspectionTestingMockExamPage')
);
const L3SystemsDesignMockExamPage = lazy(
  () => import('@/pages/mock-exams/L3SystemsDesignMockExamPage')
);
const L3CareerDevelopmentMockExamPage = lazy(
  () => import('@/pages/mock-exams/L3CareerDevelopmentMockExamPage')
);

// Dynamic topic landings — /mock-exams/:examSlug/:topicSlug
const MockExamTopicPage = lazy(() => import('@/pages/mock-exams/MockExamTopicPage'));

const wrap = (El: React.ComponentType) => (
  <LazyRoute>
    <El />
  </LazyRoute>
);

const MockExamRoutes = () => (
  <Routes>
    <Route index element={wrap(MockExamsHubPage)} />

    {/* Trade certifications */}
    <Route path="first-aid" element={wrap(FirstAidMockExamPage)} />
    <Route path="cscs-card" element={wrap(CSCSCardMockExamPage)} />
    <Route path="ipaf" element={wrap(IPAFMockExamPage)} />
    <Route path="pasma" element={wrap(PASMAMockExamPage)} />
    <Route path="asbestos-awareness" element={wrap(AsbestosAwarenessMockExamPage)} />
    <Route path="working-at-height" element={wrap(WorkingAtHeightMockExamPage)} />
    <Route path="manual-handling" element={wrap(ManualHandlingMockExamPage)} />
    <Route path="coshh" element={wrap(CoshhMockExamPage)} />
    <Route path="fire-safety" element={wrap(FireSafetyMockExamPage)} />
    <Route path="confined-spaces" element={wrap(ConfinedSpacesMockExamPage)} />

    {/* Electrical exams */}
    <Route path="18th-edition-bs-7671" element={wrap(EighteenthEditionMockExamPage)} />
    <Route path="2391-inspection-testing" element={wrap(C2391MockExamPage)} />
    <Route path="am2-online-knowledge-test" element={wrap(AM2OnlineMockExamPage)} />

    {/* Level 2 */}
    <Route path="level-2-electrical-health-safety" element={wrap(L2HealthSafetyMockExamPage)} />
    <Route
      path="level-2-electrical-principles"
      element={wrap(L2ElectricalPrinciplesMockExamPage)}
    />
    <Route path="level-2-installation-theory" element={wrap(L2InstallationTheoryMockExamPage)} />
    <Route
      path="level-2-installation-practice"
      element={wrap(L2InstallationPracticeMockExamPage)}
    />
    <Route path="level-2-communications-career" element={wrap(L2CommsCareerMockExamPage)} />

    {/* Level 3 */}
    <Route path="level-3-electrical-health-safety" element={wrap(L3HealthSafetyMockExamPage)} />
    <Route
      path="level-3-environmental-technologies"
      element={wrap(L3EnvironmentalTechMockExamPage)}
    />
    <Route path="level-3-electrical-science" element={wrap(L3ElectricalScienceMockExamPage)} />
    <Route path="level-3-fault-diagnosis" element={wrap(L3FaultDiagnosisMockExamPage)} />
    <Route path="level-3-inspection-testing" element={wrap(L3InspectionTestingMockExamPage)} />
    <Route path="level-3-systems-design" element={wrap(L3SystemsDesignMockExamPage)} />
    <Route path="level-3-career-development" element={wrap(L3CareerDevelopmentMockExamPage)} />

    {/* Dynamic topic landings — resolved at runtime against the topic
        registry. Falls back to /mock-exams/<exam> if the topic slug
        doesn't match a known category. Must come LAST so it doesn't
        shadow the static routes above. */}
    <Route path=":examSlug/:topicSlug" element={wrap(MockExamTopicPage)} />
  </Routes>
);

export default MockExamRoutes;
