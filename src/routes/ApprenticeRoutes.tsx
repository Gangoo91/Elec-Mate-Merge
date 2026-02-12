import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LazyRoute } from '@/components/LazyRoute';

// Lazy-loaded pages
const ApprenticeHub = lazy(() => import('@/pages/ApprenticeHub'));
const ApprenticeMentalHealth = lazy(() => import('@/pages/apprentice/ApprenticeMentalHealth'));
const RightsAndPay = lazy(() => import('@/pages/apprentice/RightsAndPay'));
const WorkLifeBalance = lazy(() => import('@/pages/apprentice/mental-health/WorkLifeBalance'));
const MentalHealthResources = lazy(
  () => import('@/pages/apprentice/mental-health/MentalHealthResources')
);
const StressManagement = lazy(() => import('@/pages/apprentice/mental-health/StressManagement'));
const CrisisResources = lazy(() => import('@/pages/apprentice/mental-health/CrisisResources'));
const SupportNetwork = lazy(() => import('@/pages/apprentice/mental-health/SupportNetwork'));
const OnJobTools = lazy(() => import('@/pages/apprentice/OnJobTools'));
const OnJobCalculations = lazy(() => import('@/pages/apprentice/OnJobCalculations'));
const OnJobSafetyCases = lazy(() => import('@/pages/apprentice/OnJobSafetyCases'));
const OnJobWorkplaceCulture = lazy(() => import('@/pages/apprentice/OnJobWorkplaceCulture'));
const TestingProcedures = lazy(() => import('@/pages/apprentice/TestingProcedures'));
const OnJobAssessment = lazy(() => import('@/pages/apprentice/OnJobAssessment'));
const OnJobBS7671RunThrough = lazy(() => import('@/pages/apprentice/OnJobBS7671RunThrough'));
const OnJobSupervisorKnowledge = lazy(() => import('@/pages/apprentice/OnJobSupervisorKnowledge'));
const OnJobFlashcards = lazy(() => import('@/pages/apprentice/OnJobFlashcards'));
const ApprenticeToolbox = lazy(() => import('@/pages/apprentice/ApprenticeToolbox'));
const ProfessionalDevelopment = lazy(() => import('@/pages/apprentice/ProfessionalDevelopment'));
const ApprenticeOJT = lazy(() => import('@/pages/apprentice/ApprenticeOJT'));
const AdvancedHelp = lazy(() => import('@/pages/apprentice/AdvancedHelp'));
const ProfessionalToolGuide = lazy(() => import('@/pages/apprentice/ProfessionalToolGuide'));
const PortfolioBuilding = lazy(() => import('@/pages/apprentice/toolbox/PortfolioBuilding'));
const ToolsGuide = lazy(() => import('@/pages/apprentice/toolbox/ToolsGuide'));
const ElectricalInstallationGuides = lazy(
  () => import('@/pages/apprentice/toolbox/ElectricalInstallationGuides')
);
const CommercialInstallations = lazy(
  () => import('@/pages/apprentice/toolbox/CommercialInstallations')
);
const IndustrialInstallations = lazy(
  () => import('@/pages/apprentice/toolbox/IndustrialInstallations')
);
const OutdoorInstallations = lazy(() => import('@/pages/apprentice/toolbox/OutdoorInstallations'));
const DomesticInstallations = lazy(() => import('@/pages/apprentice/DomesticInstallations'));
const SpecialistInstallations = lazy(() => import('@/pages/apprentice/SpecialistInstallations'));
const CommunicationSkills = lazy(() => import('@/pages/apprentice/toolbox/CommunicationSkills'));
const StudyTips = lazy(() => import('@/pages/apprentice/toolbox/StudyTips'));
const LearningFromMistakes = lazy(() => import('@/pages/apprentice/toolbox/LearningFromMistakes'));
const TimeManagement = lazy(() => import('@/pages/apprentice/toolbox/TimeManagement'));
const ApprenticeshipExpectations = lazy(
  () => import('@/pages/apprentice/toolbox/ApprenticeshipExpectations')
);
const OffJobTrainingGuide = lazy(() => import('@/pages/apprentice/toolbox/OffJobTrainingGuide'));
const SiteJargon = lazy(() => import('@/pages/apprentice/toolbox/SiteJargon'));
const ApprenticeshipFunding = lazy(
  () => import('@/pages/apprentice/toolbox/ApprenticeshipFunding')
);
const EndPointAssessment = lazy(() => import('@/pages/apprentice/toolbox/EndPointAssessment'));
const Year1 = lazy(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year1'));
const Year2 = lazy(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year2'));
const Year3 = lazy(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year3'));
const Year4 = lazy(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year4'));
const InspectionTesting = lazy(() => import('@/pages/apprentice/InspectionTesting'));
const InspectionTestingHubPage = lazy(() => import('@/pages/apprentice/LearningHubPage'));
const UnifiedApprenticeHub = lazy(() => import('@/pages/apprentice/UnifiedApprenticeHub'));
const PortfolioHub = lazy(() => import('@/pages/apprentice/portfolio-hub/PortfolioHub'));
const OJTHub = lazy(() => import('@/pages/apprentice/ojt-hub/OJTHub'));
const LearningVideos = lazy(() => import('@/pages/apprentice/LearningVideos'));
const SiteDiary = lazy(() => import('@/pages/apprentice/SiteDiary'));
const EPASimulator = lazy(() => import('@/pages/apprentice/epa/EPASimulator'));
const AM2Simulator = lazy(() => import('@/pages/apprentice/am2/AM2Simulator'));

const ApprenticeRoutes = () => (
  <Routes>
    <Route
      index
      element={
        <LazyRoute>
          <ApprenticeHub />
        </LazyRoute>
      }
    />
    <Route
      path="calculators"
      element={
        <LazyRoute>
          <OnJobCalculations />
        </LazyRoute>
      }
    />
    <Route
      path="ojt"
      element={
        <LazyRoute>
          <ApprenticeOJT />
        </LazyRoute>
      }
    />
    <Route
      path="advanced-help"
      element={
        <LazyRoute>
          <AdvancedHelp />
        </LazyRoute>
      }
    />
    <Route
      path="bs7671-inspection-testing"
      element={
        <LazyRoute>
          <OnJobBS7671RunThrough />
        </LazyRoute>
      }
    />
    <Route
      path="mental-health"
      element={
        <LazyRoute>
          <ApprenticeMentalHealth />
        </LazyRoute>
      }
    />
    <Route
      path="mental-health/work-life-balance"
      element={
        <LazyRoute>
          <WorkLifeBalance />
        </LazyRoute>
      }
    />
    <Route
      path="mental-health/resources"
      element={
        <LazyRoute>
          <MentalHealthResources />
        </LazyRoute>
      }
    />
    <Route
      path="mental-health/stress-management"
      element={
        <LazyRoute>
          <StressManagement />
        </LazyRoute>
      }
    />
    <Route
      path="mental-health/crisis-resources"
      element={
        <LazyRoute>
          <CrisisResources />
        </LazyRoute>
      }
    />
    <Route
      path="mental-health/support-network"
      element={
        <LazyRoute>
          <SupportNetwork />
        </LazyRoute>
      }
    />

    <Route
      path="rights-and-pay"
      element={
        <LazyRoute>
          <RightsAndPay />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox"
      element={
        <LazyRoute>
          <ApprenticeToolbox />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-expectations"
      element={
        <LazyRoute>
          <ApprenticeshipExpectations />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-expectations/year-1"
      element={
        <LazyRoute>
          <Year1 />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-expectations/year-2"
      element={
        <LazyRoute>
          <Year2 />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-expectations/year-3"
      element={
        <LazyRoute>
          <Year3 />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-expectations/year-4"
      element={
        <LazyRoute>
          <Year4 />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/off-job-training-guide"
      element={
        <LazyRoute>
          <OffJobTrainingGuide />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/site-jargon"
      element={
        <LazyRoute>
          <SiteJargon />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/portfolio-building"
      element={
        <LazyRoute>
          <PortfolioBuilding />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/communication-skills"
      element={
        <LazyRoute>
          <CommunicationSkills />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/study-tips"
      element={
        <LazyRoute>
          <StudyTips />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/learning-from-mistakes"
      element={
        <LazyRoute>
          <LearningFromMistakes />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/time-management"
      element={
        <LazyRoute>
          <TimeManagement />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-funding"
      element={
        <LazyRoute>
          <ApprenticeshipFunding />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/end-point-assessment"
      element={
        <LazyRoute>
          <EndPointAssessment />
        </LazyRoute>
      }
    />
    <Route
      path="professional-development"
      element={
        <LazyRoute>
          <ProfessionalDevelopment />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/professional-tool-guide"
      element={
        <LazyRoute>
          <ProfessionalToolGuide />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools"
      element={
        <LazyRoute>
          <OnJobTools />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/tools-guide"
      element={
        <LazyRoute>
          <ToolsGuide />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/electrical-installation-guides"
      element={
        <LazyRoute>
          <ElectricalInstallationGuides />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/electrical-installation-guides/commercial"
      element={
        <LazyRoute>
          <CommercialInstallations />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/electrical-installation-guides/industrial"
      element={
        <LazyRoute>
          <IndustrialInstallations />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/electrical-installation-guides/outdoor"
      element={
        <LazyRoute>
          <OutdoorInstallations />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/electrical-installation-guides/domestic"
      element={
        <LazyRoute>
          <DomesticInstallations />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/electrical-installation-guides/specialist"
      element={
        <LazyRoute>
          <SpecialistInstallations />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/calculations"
      element={
        <LazyRoute>
          <OnJobCalculations />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/assessment"
      element={
        <LazyRoute>
          <OnJobAssessment />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/safety-cases"
      element={
        <LazyRoute>
          <OnJobSafetyCases />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/workplace-culture"
      element={
        <LazyRoute>
          <OnJobWorkplaceCulture />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/testing-procedures"
      element={
        <LazyRoute>
          <TestingProcedures />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/bs7671-runthrough"
      element={
        <LazyRoute>
          <OnJobBS7671RunThrough />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/supervisor-knowledge"
      element={
        <LazyRoute>
          <OnJobSupervisorKnowledge />
        </LazyRoute>
      }
    />
    <Route
      path="on-job-tools/flashcards"
      element={
        <LazyRoute>
          <OnJobFlashcards />
        </LazyRoute>
      }
    />
    <Route
      path="inspection-testing"
      element={
        <LazyRoute>
          <InspectionTesting />
        </LazyRoute>
      }
    />
    <Route
      path="inspection-testing-hub"
      element={
        <LazyRoute>
          <InspectionTestingHubPage />
        </LazyRoute>
      }
    />
    <Route
      path="hub"
      element={
        <LazyRoute>
          <UnifiedApprenticeHub />
        </LazyRoute>
      }
    />
    <Route
      path="portfolio-hub/*"
      element={
        <LazyRoute>
          <PortfolioHub />
        </LazyRoute>
      }
    />
    <Route
      path="ojt-hub/*"
      element={
        <LazyRoute>
          <OJTHub />
        </LazyRoute>
      }
    />
    <Route
      path="learning-videos"
      element={
        <LazyRoute>
          <LearningVideos />
        </LazyRoute>
      }
    />
    <Route
      path="site-diary"
      element={
        <LazyRoute>
          <SiteDiary />
        </LazyRoute>
      }
    />
    <Route
      path="epa-simulator"
      element={
        <LazyRoute>
          <EPASimulator />
        </LazyRoute>
      }
    />
    <Route
      path="am2-simulator"
      element={
        <LazyRoute>
          <AM2Simulator />
        </LazyRoute>
      }
    />
  </Routes>
);

export default ApprenticeRoutes;
