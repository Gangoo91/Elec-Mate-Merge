import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LazyRoute } from '@/components/LazyRoute';
import { ApprenticeTabBar } from '@/components/apprentice-hub/ApprenticeTabBar';

// Lazy-loaded pages
const ApprenticeHub = lazyWithRetry(() => import('@/pages/ApprenticeHub'));
const TodayPage = lazyWithRetry(() => import('@/pages/apprentice/TodayPage'));
const RevisionSessionPage = lazyWithRetry(() => import('@/pages/apprentice/RevisionSessionPage'));
const ApprenticeMentalHealth = lazyWithRetry(() => import('@/pages/MentalHealthHub'));
const RightsAndPay = lazyWithRetry(() => import('@/pages/apprentice/RightsAndPay'));
const MyCollegePlanPage = lazyWithRetry(() => import('@/pages/apprentice/MyCollegePlanPage'));
const MyCollegeSectionPage = lazyWithRetry(() => import('@/pages/apprentice/MyCollegeSectionPage'));
const VoiceSurveyPage = lazyWithRetry(() => import('@/pages/apprentice/VoiceSurveyPage'));
const CollegeAiPage = lazyWithRetry(() => import('@/pages/apprentice/CollegeAiPage'));
const RightsWages = lazyWithRetry(() => import('@/pages/apprentice/rights-guide/WagesPage'));
const RightsYourRights = lazyWithRetry(() => import('@/pages/apprentice/rights-guide/RightsPage'));
const RightsSupport = lazyWithRetry(() => import('@/pages/apprentice/rights-guide/SupportPage'));
const RightsTools = lazyWithRetry(() => import('@/pages/apprentice/rights-guide/ToolsPage'));
const OnJobTools = lazyWithRetry(() => import('@/pages/apprentice/OnJobTools'));
const OnJobCalculations = lazyWithRetry(() => import('@/pages/apprentice/OnJobCalculations'));
const OnJobSafetyCases = lazyWithRetry(() => import('@/pages/apprentice/OnJobSafetyCases'));
const OnJobWorkplaceCulture = lazyWithRetry(() => import('@/pages/apprentice/OnJobWorkplaceCulture'));
const TestingProcedures = lazyWithRetry(() => import('@/pages/apprentice/TestingProcedures'));
const OnJobAssessment = lazyWithRetry(() => import('@/pages/apprentice/OnJobAssessment'));
const OnJobBS7671RunThrough = lazyWithRetry(() => import('@/pages/apprentice/OnJobBS7671RunThrough'));
const OnJobSupervisorKnowledge = lazyWithRetry(() => import('@/pages/apprentice/OnJobSupervisorKnowledge'));
const OnJobFlashcards = lazyWithRetry(() => import('@/pages/apprentice/OnJobFlashcards'));
const ApprenticeToolbox = lazyWithRetry(() => import('@/pages/apprentice/ApprenticeToolbox'));
const ProfessionalDevelopment = lazyWithRetry(() => import('@/pages/apprentice/ProfessionalDevelopment'));
const CareerPathwaysPage = lazyWithRetry(
  () => import('@/pages/apprentice/professional-development/CareerPathways')
);
const CertificationsPage = lazyWithRetry(
  () => import('@/pages/apprentice/professional-development/Certifications')
);
const ProfessionalSkillsPage = lazyWithRetry(
  () => import('@/pages/apprentice/professional-development/ProfessionalSkills')
);
const ContinuingEducationPage = lazyWithRetry(
  () => import('@/pages/apprentice/professional-development/ContinuingEducation')
);
const IndustryNetworkingPage = lazyWithRetry(
  () => import('@/pages/apprentice/professional-development/IndustryNetworking')
);
const AdvancedHelp = lazyWithRetry(() => import('@/pages/apprentice/AdvancedHelp'));
const ProfessionalToolGuide = lazyWithRetry(() => import('@/pages/apprentice/ProfessionalToolGuide'));
const PortfolioBuilding = lazyWithRetry(() => import('@/pages/apprentice/toolbox/PortfolioBuilding'));
const ToolsGuide = lazyWithRetry(() => import('@/pages/apprentice/toolbox/ToolsGuide'));
const ElectricalInstallationGuides = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/ElectricalInstallationGuides')
);
const CommercialInstallations = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/CommercialInstallations')
);
const IndustrialInstallations = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/IndustrialInstallations')
);
const DomesticInstallations = lazyWithRetry(() => import('@/pages/apprentice/DomesticInstallations'));
const SpecialistInstallations = lazyWithRetry(() => import('@/pages/apprentice/SpecialistInstallations'));
const CommunicationSkills = lazyWithRetry(() => import('@/pages/apprentice/toolbox/CommunicationSkills'));
const CommsWorkplace = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/communication-guide/WorkplacePage')
);
const CommsProfessionalSkills = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/communication-guide/ProfessionalSkillsPage')
);
const CommsDifficultSituations = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/communication-guide/DifficultSituationsPage')
);
const CommsToolsTips = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/communication-guide/ToolsTipsPage')
);
const StudyTips = lazyWithRetry(() => import('@/pages/apprentice/toolbox/StudyTips'));
const StudyFundamentals = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/study-guide/FundamentalsPage')
);
const StudyExamStrategies = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/study-guide/ExamStrategiesPage')
);
const StudyRevision = lazyWithRetry(() => import('@/pages/apprentice/toolbox/study-guide/RevisionPage'));
const StudyTime = lazyWithRetry(() => import('@/pages/apprentice/toolbox/study-guide/StudyTimePage'));
const StudyResources = lazyWithRetry(() => import('@/pages/apprentice/toolbox/study-guide/ResourcesPage'));
const StudyPsychology = lazyWithRetry(() => import('@/pages/apprentice/toolbox/study-guide/PsychologyPage'));
const LearningFromMistakes = lazyWithRetry(() => import('@/pages/apprentice/toolbox/LearningFromMistakes'));
const MistakeCategories = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/CategoriesPage')
);
const MistakeRecovery = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/RecoveryPage')
);
const MistakeResilience = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/ResiliencePage')
);
const MistakeCaseStudies = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/CaseStudiesPage')
);
const MistakePrevention = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/mistakes-guide/PreventionPage')
);
const MistakeSupport = lazyWithRetry(() => import('@/pages/apprentice/toolbox/mistakes-guide/SupportPage'));
const TimeManagement = lazyWithRetry(() => import('@/pages/apprentice/toolbox/TimeManagement'));
const TimeFundamentals = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/time-guide/FundamentalsPage')
);
const TimeScheduling = lazyWithRetry(() => import('@/pages/apprentice/toolbox/time-guide/SchedulingPage'));
const TimeStress = lazyWithRetry(() => import('@/pages/apprentice/toolbox/time-guide/StressPage'));
const TimeBalance = lazyWithRetry(() => import('@/pages/apprentice/toolbox/time-guide/BalancePage'));
const TimeProductivity = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/time-guide/ProductivityPage')
);
const TimeInteractive = lazyWithRetry(() => import('@/pages/apprentice/toolbox/time-guide/InteractivePage'));
const ApprenticeshipExpectations = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/ApprenticeshipExpectations')
);
const OffJobTrainingGuide = lazyWithRetry(() => import('@/pages/apprentice/toolbox/OffJobTrainingGuide'));
const OJTWhatCounts = lazyWithRetry(() => import('@/pages/apprentice/toolbox/ojt-guide/WhatCountsPage'));
const OJTEvidence = lazyWithRetry(() => import('@/pages/apprentice/toolbox/ojt-guide/EvidencePage'));
const OJTPlanning = lazyWithRetry(() => import('@/pages/apprentice/toolbox/ojt-guide/PlanningPage'));
const OJTDelivery = lazyWithRetry(() => import('@/pages/apprentice/toolbox/ojt-guide/DeliveryPage'));
const OJTRights = lazyWithRetry(() => import('@/pages/apprentice/toolbox/ojt-guide/RightsPage'));
const OJTAssessment = lazyWithRetry(() => import('@/pages/apprentice/toolbox/ojt-guide/AssessmentPage'));
const OJTFAQs = lazyWithRetry(() => import('@/pages/apprentice/toolbox/ojt-guide/FAQsPage'));
const SiteJargon = lazyWithRetry(() => import('@/pages/apprentice/toolbox/SiteJargon'));
const JargonCategory = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/jargon-guide/JargonCategoryPage')
);
const JargonStudy = lazyWithRetry(() => import('@/pages/apprentice/toolbox/jargon-guide/JargonStudyPage'));
const ApprenticeshipFunding = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/ApprenticeshipFunding')
);
const FundingModels = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/funding-guide/FundingModelsPage')
);
const FundingGrants = lazyWithRetry(() => import('@/pages/apprentice/toolbox/funding-guide/GrantsPage'));
const FundingEmployerInfo = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/funding-guide/EmployerInfoPage')
);
const FundingYourRights = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/funding-guide/YourRightsPage')
);
const FundingFAQs = lazyWithRetry(() => import('@/pages/apprentice/toolbox/funding-guide/FundingFAQsPage'));
const PortfolioGettingStarted = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/GettingStartedPage')
);
const PortfolioStructure = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/StructurePage')
);
const PortfolioEvidence = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/EvidencePage')
);
const PortfolioReflective = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/ReflectivePracticePage')
);
const PortfolioIndustry = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/portfolio-guide/IndustryGuidancePage')
);
const EndPointAssessment = lazyWithRetry(() => import('@/pages/apprentice/toolbox/EndPointAssessment'));
const EPAComponents = lazyWithRetry(() => import('@/pages/apprentice/toolbox/epa-guide/ComponentsPage'));
const EPAGrading = lazyWithRetry(() => import('@/pages/apprentice/toolbox/epa-guide/GradingPage'));
const EPAPreparation = lazyWithRetry(() => import('@/pages/apprentice/toolbox/epa-guide/PreparationPage'));
const EPAGateway = lazyWithRetry(() => import('@/pages/apprentice/toolbox/epa-guide/GatewayPage'));
const EPAMistakesAndTips = lazyWithRetry(
  () => import('@/pages/apprentice/toolbox/epa-guide/MistakesAndTipsPage')
);
const Year1 = lazyWithRetry(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year1'));
const Year2 = lazyWithRetry(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year2'));
const Year3 = lazyWithRetry(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year3'));
const Year4 = lazyWithRetry(() => import('@/pages/apprentice/toolbox/apprenticeship-expectations/Year4'));
const SafetyFundamentals = lazyWithRetry(() => import('@/pages/apprentice/SafetyFundamentals'));
const SafeIsolation = lazyWithRetry(() => import('@/pages/apprentice/safety-guide/SafeIsolationPage'));
const PPEEquipment = lazyWithRetry(() => import('@/pages/apprentice/safety-guide/PPEEquipmentPage'));
const WorkingAtHeight = lazyWithRetry(() => import('@/pages/apprentice/safety-guide/WorkingAtHeightPage'));
const EmergencyProcedures = lazyWithRetry(
  () => import('@/pages/apprentice/safety-guide/EmergencyProceduresPage')
);
const RiskAssessment = lazyWithRetry(() => import('@/pages/apprentice/safety-guide/RiskAssessmentPage'));
const SiteSafetyRules = lazyWithRetry(() => import('@/pages/apprentice/safety-guide/SiteSafetyRulesPage'));
const InspectionTesting = lazyWithRetry(() => import('@/pages/apprentice/InspectionTesting'));
const InspectionTestingHubPage = lazyWithRetry(() => import('@/pages/apprentice/LearningHubPage'));
const UnifiedApprenticeHub = lazyWithRetry(() => import('@/pages/apprentice/UnifiedApprenticeHub'));
// Retired: /apprentice/portfolio-hub now redirects to /apprentice/hub.
// The unified workspace at /apprentice/hub (UnifiedApprenticeHub) is the
// single source of truth for portfolio work — keeps deep links pointing
// to the right place.
const OJTHub = lazyWithRetry(() => import('@/pages/apprentice/ojt-hub/OJTHub'));
const LearningVideos = lazyWithRetry(() => import('@/pages/apprentice/LearningVideos'));
const SiteDiary = lazyWithRetry(() => import('@/pages/apprentice/SiteDiary'));
const EPASimulator = lazyWithRetry(() => import('@/pages/apprentice/epa/EPASimulator'));
const AM2Simulator = lazyWithRetry(() => import('@/pages/apprentice/am2/AM2Simulator'));
const TakeQuizPage = lazyWithRetry(() => import('@/pages/apprentice/TakeQuizPage'));

const ApprenticeRoutes = () => (
  <>
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
        path="today"
        element={
          <LazyRoute>
            <TodayPage />
          </LazyRoute>
        }
      />
      <Route
        path="revision"
        element={
          <LazyRoute>
            <RevisionSessionPage />
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
      {/* Retired — the standalone time_entries OJT page is superseded by the
        college-hub-integrated OJT hub at /apprentice/ojt-hub. Goals &
        Assessments were migrated into that hub; evidence consolidated onto the
        portfolio workspace. Redirect keeps old deep links + tips working. */}
      <Route path="ojt" element={<Navigate to="/apprentice/ojt-hub" replace />} />
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
      {/* Legacy sub-pages — the unified hub owns this content now */}
      <Route
        path="mental-health/work-life-balance"
        element={<Navigate to="/mental-health?section=resources" replace />}
      />
      <Route
        path="mental-health/resources"
        element={<Navigate to="/mental-health?section=resources" replace />}
      />
      <Route
        path="mental-health/stress-management"
        element={<Navigate to="/mental-health?section=tools" replace />}
      />
      <Route
        path="mental-health/crisis-resources"
        element={<Navigate to="/mental-health?section=crisis" replace />}
      />
      <Route
        path="mental-health/support-network"
        element={<Navigate to="/mental-health?section=support" replace />}
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
        path="college-plan"
        element={
          <LazyRoute>
            <MyCollegePlanPage />
          </LazyRoute>
        }
      />
      <Route
        path="college/:section"
        element={
          <LazyRoute>
            <MyCollegeSectionPage />
          </LazyRoute>
        }
      />
      <Route
        path="voice-survey"
        element={
          <LazyRoute>
            <VoiceSurveyPage />
          </LazyRoute>
        }
      />
      <Route
        path="college-ai"
        element={
          <LazyRoute>
            <CollegeAiPage />
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
      {/* Retired — redirects all /apprentice/portfolio-hub/* deep-links into the
        unified workspace at /apprentice/hub. */}
      <Route path="portfolio-hub/*" element={<Navigate to="/apprentice/hub" replace />} />
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
      <Route
        path="college/quiz/:id"
        element={
          <LazyRoute>
            <TakeQuizPage />
          </LazyRoute>
        }
      />
    </Routes>

    {/* Primary apprentice navigation — role-gated inside the component
        (renders null for non-apprentices). It renders its own in-flow h-20
        spacer before the fixed bar, so page content is never hidden behind
        it without forcing a wrapper div around <Routes>. */}
    <ApprenticeTabBar />
  </>
);

export default ApprenticeRoutes;
