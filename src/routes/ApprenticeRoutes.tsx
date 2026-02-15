import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LazyRoute } from '@/components/LazyRoute';

// Lazy-loaded pages
const ApprenticeHub = lazy(() => import('@/pages/ApprenticeHub'));
const ApprenticeMentalHealth = lazy(() => import('@/pages/apprentice/ApprenticeMentalHealth'));
const RightsAndPay = lazy(() => import('@/pages/apprentice/RightsAndPay'));
const RightsWages = lazy(() => import('@/pages/apprentice/rights-guide/WagesPage'));
const RightsYourRights = lazy(() => import('@/pages/apprentice/rights-guide/RightsPage'));
const RightsSupport = lazy(() => import('@/pages/apprentice/rights-guide/SupportPage'));
const RightsTools = lazy(() => import('@/pages/apprentice/rights-guide/ToolsPage'));
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
const CareerPathwaysPage = lazy(
  () => import('@/pages/apprentice/professional-development/CareerPathways')
);
const CertificationsPage = lazy(
  () => import('@/pages/apprentice/professional-development/Certifications')
);
const ProfessionalSkillsPage = lazy(
  () => import('@/pages/apprentice/professional-development/ProfessionalSkills')
);
const ContinuingEducationPage = lazy(
  () => import('@/pages/apprentice/professional-development/ContinuingEducation')
);
const IndustryNetworkingPage = lazy(
  () => import('@/pages/apprentice/professional-development/IndustryNetworking')
);
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
const DomesticInstallations = lazy(() => import('@/pages/apprentice/DomesticInstallations'));
const SpecialistInstallations = lazy(() => import('@/pages/apprentice/SpecialistInstallations'));
const CommunicationSkills = lazy(() => import('@/pages/apprentice/toolbox/CommunicationSkills'));
const CommsWorkplace = lazy(
  () => import('@/pages/apprentice/toolbox/communication-guide/WorkplacePage')
);
const CommsProfessionalSkills = lazy(
  () => import('@/pages/apprentice/toolbox/communication-guide/ProfessionalSkillsPage')
);
const CommsDifficultSituations = lazy(
  () => import('@/pages/apprentice/toolbox/communication-guide/DifficultSituationsPage')
);
const CommsToolsTips = lazy(
  () => import('@/pages/apprentice/toolbox/communication-guide/ToolsTipsPage')
);
const StudyTips = lazy(() => import('@/pages/apprentice/toolbox/StudyTips'));
const StudyFundamentals = lazy(
  () => import('@/pages/apprentice/toolbox/study-guide/FundamentalsPage')
);
const StudyExamStrategies = lazy(
  () => import('@/pages/apprentice/toolbox/study-guide/ExamStrategiesPage')
);
const StudyRevision = lazy(() => import('@/pages/apprentice/toolbox/study-guide/RevisionPage'));
const StudyTime = lazy(() => import('@/pages/apprentice/toolbox/study-guide/StudyTimePage'));
const StudyResources = lazy(() => import('@/pages/apprentice/toolbox/study-guide/ResourcesPage'));
const StudyPsychology = lazy(() => import('@/pages/apprentice/toolbox/study-guide/PsychologyPage'));
const LearningFromMistakes = lazy(() => import('@/pages/apprentice/toolbox/LearningFromMistakes'));
const MistakeCategories = lazy(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/CategoriesPage')
);
const MistakeRecovery = lazy(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/RecoveryPage')
);
const MistakeResilience = lazy(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/ResiliencePage')
);
const MistakeCaseStudies = lazy(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/CaseStudiesPage')
);
const MistakePrevention = lazy(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/PreventionPage')
);
const MistakeSupport = lazy(() => import('@/pages/apprentice/toolbox/mistakes-guide/SupportPage'));
const TimeManagement = lazy(() => import('@/pages/apprentice/toolbox/TimeManagement'));
const TimeFundamentals = lazy(
  () => import('@/pages/apprentice/toolbox/time-guide/FundamentalsPage')
);
const TimeScheduling = lazy(() => import('@/pages/apprentice/toolbox/time-guide/SchedulingPage'));
const TimeStress = lazy(() => import('@/pages/apprentice/toolbox/time-guide/StressPage'));
const TimeBalance = lazy(() => import('@/pages/apprentice/toolbox/time-guide/BalancePage'));
const TimeProductivity = lazy(
  () => import('@/pages/apprentice/toolbox/time-guide/ProductivityPage')
);
const TimeInteractive = lazy(() => import('@/pages/apprentice/toolbox/time-guide/InteractivePage'));
const ApprenticeshipExpectations = lazy(
  () => import('@/pages/apprentice/toolbox/ApprenticeshipExpectations')
);
const OffJobTrainingGuide = lazy(() => import('@/pages/apprentice/toolbox/OffJobTrainingGuide'));
const OJTWhatCounts = lazy(() => import('@/pages/apprentice/toolbox/ojt-guide/WhatCountsPage'));
const OJTEvidence = lazy(() => import('@/pages/apprentice/toolbox/ojt-guide/EvidencePage'));
const OJTPlanning = lazy(() => import('@/pages/apprentice/toolbox/ojt-guide/PlanningPage'));
const OJTDelivery = lazy(() => import('@/pages/apprentice/toolbox/ojt-guide/DeliveryPage'));
const OJTRights = lazy(() => import('@/pages/apprentice/toolbox/ojt-guide/RightsPage'));
const OJTAssessment = lazy(() => import('@/pages/apprentice/toolbox/ojt-guide/AssessmentPage'));
const OJTFAQs = lazy(() => import('@/pages/apprentice/toolbox/ojt-guide/FAQsPage'));
const SiteJargon = lazy(() => import('@/pages/apprentice/toolbox/SiteJargon'));
const JargonCategory = lazy(
  () => import('@/pages/apprentice/toolbox/jargon-guide/JargonCategoryPage')
);
const JargonStudy = lazy(() => import('@/pages/apprentice/toolbox/jargon-guide/JargonStudyPage'));
const ApprenticeshipFunding = lazy(
  () => import('@/pages/apprentice/toolbox/ApprenticeshipFunding')
);
const FundingModels = lazy(
  () => import('@/pages/apprentice/toolbox/funding-guide/FundingModelsPage')
);
const FundingGrants = lazy(() => import('@/pages/apprentice/toolbox/funding-guide/GrantsPage'));
const FundingEmployerInfo = lazy(
  () => import('@/pages/apprentice/toolbox/funding-guide/EmployerInfoPage')
);
const FundingYourRights = lazy(
  () => import('@/pages/apprentice/toolbox/funding-guide/YourRightsPage')
);
const FundingFAQs = lazy(() => import('@/pages/apprentice/toolbox/funding-guide/FundingFAQsPage'));
const PortfolioGettingStarted = lazy(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/GettingStartedPage')
);
const PortfolioStructure = lazy(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/StructurePage')
);
const PortfolioEvidence = lazy(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/EvidencePage')
);
const PortfolioReflective = lazy(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/ReflectivePracticePage')
);
const PortfolioIndustry = lazy(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/IndustryGuidancePage')
);
const EndPointAssessment = lazy(() => import('@/pages/apprentice/toolbox/EndPointAssessment'));
const EPAComponents = lazy(() => import('@/pages/apprentice/toolbox/epa-guide/ComponentsPage'));
const EPAGrading = lazy(() => import('@/pages/apprentice/toolbox/epa-guide/GradingPage'));
const EPAPreparation = lazy(() => import('@/pages/apprentice/toolbox/epa-guide/PreparationPage'));
const EPAGateway = lazy(() => import('@/pages/apprentice/toolbox/epa-guide/GatewayPage'));
const EPAMistakesAndTips = lazy(
  () => import('@/pages/apprentice/toolbox/epa-guide/MistakesAndTipsPage')
);
const Year1 = lazy(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year1'));
const Year2 = lazy(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year2'));
const Year3 = lazy(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year3'));
const Year4 = lazy(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year4'));
const SafetyFundamentals = lazy(() => import('@/pages/apprentice/SafetyFundamentals'));
const SafeIsolation = lazy(() => import('@/pages/apprentice/safety-guide/SafeIsolationPage'));
const PPEEquipment = lazy(() => import('@/pages/apprentice/safety-guide/PPEEquipmentPage'));
const WorkingAtHeight = lazy(() => import('@/pages/apprentice/safety-guide/WorkingAtHeightPage'));
const EmergencyProcedures = lazy(
  () => import('@/pages/apprentice/safety-guide/EmergencyProceduresPage')
);
const RiskAssessment = lazy(() => import('@/pages/apprentice/safety-guide/RiskAssessmentPage'));
const SiteSafetyRules = lazy(() => import('@/pages/apprentice/safety-guide/SiteSafetyRulesPage'));
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
      path="rights-and-pay/wages"
      element={
        <LazyRoute>
          <RightsWages />
        </LazyRoute>
      }
    />
    <Route
      path="rights-and-pay/your-rights"
      element={
        <LazyRoute>
          <RightsYourRights />
        </LazyRoute>
      }
    />
    <Route
      path="rights-and-pay/support"
      element={
        <LazyRoute>
          <RightsSupport />
        </LazyRoute>
      }
    />
    <Route
      path="rights-and-pay/tools"
      element={
        <LazyRoute>
          <RightsTools />
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
      path="toolbox/off-job-training-guide/what-counts"
      element={
        <LazyRoute>
          <OJTWhatCounts />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/off-job-training-guide/evidence"
      element={
        <LazyRoute>
          <OJTEvidence />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/off-job-training-guide/planning"
      element={
        <LazyRoute>
          <OJTPlanning />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/off-job-training-guide/delivery"
      element={
        <LazyRoute>
          <OJTDelivery />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/off-job-training-guide/rights"
      element={
        <LazyRoute>
          <OJTRights />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/off-job-training-guide/assessment"
      element={
        <LazyRoute>
          <OJTAssessment />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/off-job-training-guide/faqs"
      element={
        <LazyRoute>
          <OJTFAQs />
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
      path="toolbox/site-jargon/study"
      element={
        <LazyRoute>
          <JargonStudy />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/site-jargon/:categoryId"
      element={
        <LazyRoute>
          <JargonCategory />
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
      path="toolbox/portfolio-building/getting-started"
      element={
        <LazyRoute>
          <PortfolioGettingStarted />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/portfolio-building/structure"
      element={
        <LazyRoute>
          <PortfolioStructure />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/portfolio-building/evidence"
      element={
        <LazyRoute>
          <PortfolioEvidence />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/portfolio-building/reflective-practice"
      element={
        <LazyRoute>
          <PortfolioReflective />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/portfolio-building/industry-guidance"
      element={
        <LazyRoute>
          <PortfolioIndustry />
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
      path="toolbox/communication-skills/workplace"
      element={
        <LazyRoute>
          <CommsWorkplace />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/communication-skills/professional-skills"
      element={
        <LazyRoute>
          <CommsProfessionalSkills />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/communication-skills/difficult-situations"
      element={
        <LazyRoute>
          <CommsDifficultSituations />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/communication-skills/tools-tips"
      element={
        <LazyRoute>
          <CommsToolsTips />
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
      path="toolbox/study-tips/fundamentals"
      element={
        <LazyRoute>
          <StudyFundamentals />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/study-tips/exam-strategies"
      element={
        <LazyRoute>
          <StudyExamStrategies />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/study-tips/revision"
      element={
        <LazyRoute>
          <StudyRevision />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/study-tips/study-time"
      element={
        <LazyRoute>
          <StudyTime />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/study-tips/resources"
      element={
        <LazyRoute>
          <StudyResources />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/study-tips/psychology"
      element={
        <LazyRoute>
          <StudyPsychology />
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
      path="toolbox/learning-from-mistakes/categories"
      element={
        <LazyRoute>
          <MistakeCategories />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/learning-from-mistakes/recovery"
      element={
        <LazyRoute>
          <MistakeRecovery />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/learning-from-mistakes/resilience"
      element={
        <LazyRoute>
          <MistakeResilience />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/learning-from-mistakes/case-studies"
      element={
        <LazyRoute>
          <MistakeCaseStudies />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/learning-from-mistakes/prevention"
      element={
        <LazyRoute>
          <MistakePrevention />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/learning-from-mistakes/support"
      element={
        <LazyRoute>
          <MistakeSupport />
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
      path="toolbox/time-management/fundamentals"
      element={
        <LazyRoute>
          <TimeFundamentals />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/time-management/scheduling"
      element={
        <LazyRoute>
          <TimeScheduling />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/time-management/stress"
      element={
        <LazyRoute>
          <TimeStress />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/time-management/balance"
      element={
        <LazyRoute>
          <TimeBalance />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/time-management/productivity"
      element={
        <LazyRoute>
          <TimeProductivity />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/time-management/interactive"
      element={
        <LazyRoute>
          <TimeInteractive />
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
      path="toolbox/apprenticeship-funding/funding-models"
      element={
        <LazyRoute>
          <FundingModels />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-funding/grants"
      element={
        <LazyRoute>
          <FundingGrants />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-funding/employer-info"
      element={
        <LazyRoute>
          <FundingEmployerInfo />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-funding/your-rights"
      element={
        <LazyRoute>
          <FundingYourRights />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/apprenticeship-funding/faqs"
      element={
        <LazyRoute>
          <FundingFAQs />
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
      path="toolbox/end-point-assessment/components"
      element={
        <LazyRoute>
          <EPAComponents />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/end-point-assessment/grading"
      element={
        <LazyRoute>
          <EPAGrading />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/end-point-assessment/preparation"
      element={
        <LazyRoute>
          <EPAPreparation />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/end-point-assessment/gateway"
      element={
        <LazyRoute>
          <EPAGateway />
        </LazyRoute>
      }
    />
    <Route
      path="toolbox/end-point-assessment/tips"
      element={
        <LazyRoute>
          <EPAMistakesAndTips />
        </LazyRoute>
      }
    />
    <Route
      path="safety-fundamentals"
      element={
        <LazyRoute>
          <SafetyFundamentals />
        </LazyRoute>
      }
    />
    <Route
      path="safety-fundamentals/safe-isolation"
      element={
        <LazyRoute>
          <SafeIsolation />
        </LazyRoute>
      }
    />
    <Route
      path="safety-fundamentals/ppe-equipment"
      element={
        <LazyRoute>
          <PPEEquipment />
        </LazyRoute>
      }
    />
    <Route
      path="safety-fundamentals/working-at-height"
      element={
        <LazyRoute>
          <WorkingAtHeight />
        </LazyRoute>
      }
    />
    <Route
      path="safety-fundamentals/emergency-procedures"
      element={
        <LazyRoute>
          <EmergencyProcedures />
        </LazyRoute>
      }
    />
    <Route
      path="safety-fundamentals/risk-assessment"
      element={
        <LazyRoute>
          <RiskAssessment />
        </LazyRoute>
      }
    />
    <Route
      path="safety-fundamentals/site-safety-rules"
      element={
        <LazyRoute>
          <SiteSafetyRules />
        </LazyRoute>
      }
    />
    <Route
      path="professional-development/career-pathways"
      element={
        <LazyRoute>
          <CareerPathwaysPage />
        </LazyRoute>
      }
    />
    <Route
      path="professional-development/certifications"
      element={
        <LazyRoute>
          <CertificationsPage />
        </LazyRoute>
      }
    />
    <Route
      path="professional-development/professional-skills"
      element={
        <LazyRoute>
          <ProfessionalSkillsPage />
        </LazyRoute>
      }
    />
    <Route
      path="professional-development/continuing-education"
      element={
        <LazyRoute>
          <ContinuingEducationPage />
        </LazyRoute>
      }
    />
    <Route
      path="professional-development/industry-networking"
      element={
        <LazyRoute>
          <IndustryNetworkingPage />
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
