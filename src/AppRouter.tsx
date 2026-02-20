import { lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LazyRoute } from '@/components/LazyRoute';
import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { getSEORoutes } from '@/routes/SEORoutes';

// Core components that should load immediately (small, critical path)
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
const CollegeGuard = lazy(() => import('@/components/auth/CollegeGuard'));

// Critical pages use lazyWithRetry for automatic retry on chunk failures
const Walkthrough = lazyWithRetry(() => import('@/pages/Walkthrough'));
const LandingPage = lazyWithRetry(() => import('@/pages/LandingPage'));
const Index = lazyWithRetry(() => import('@/pages/Index'));
const SignIn = lazyWithRetry(() => import('@/pages/auth/SignIn'));
const SignUp = lazyWithRetry(() => import('@/pages/auth/SignUp'));
const ForgotPassword = lazyWithRetry(() => import('@/pages/auth/ForgotPassword'));
const ResetPassword = lazyWithRetry(() => import('@/pages/auth/ResetPassword'));
const ConfirmEmail = lazyWithRetry(() => import('@/pages/auth/ConfirmEmail'));
const CheckEmail = lazyWithRetry(() => import('@/pages/auth/CheckEmail'));
const CompleteProfile = lazyWithRetry(() => import('@/pages/auth/CompleteProfile'));
const CheckoutTrial = lazyWithRetry(() => import('@/pages/auth/CheckoutTrial'));
const Dashboard = lazyWithRetry(() => import('@/pages/Dashboard'));
const Profile = lazyWithRetry(() => import('@/pages/Profile'));
const Settings = lazyWithRetry(() => import('@/pages/Settings'));
const Subscriptions = lazyWithRetry(() => import('@/pages/Subscriptions'));
const PaymentSuccess = lazyWithRetry(() => import('@/pages/PaymentSuccess'));
const InvoicePaymentSuccess = lazyWithRetry(() => import('@/pages/InvoicePaymentSuccess'));
const NotFound = lazyWithRetry(() => import('@/pages/NotFound'));
const ApprenticeMentalHealth = lazy(() => import('@/pages/apprentice/ApprenticeMentalHealth'));
const RightsAndPay = lazy(() => import('@/pages/apprentice/RightsAndPay'));
const NotificationsPage = lazy(() => import('@/pages/NotificationsPage'));
const PublicQuote = lazy(() => import('@/pages/PublicQuote'));
const PublicSignature = lazy(() => import('@/pages/PublicSignature'));
const BriefingSignOff = lazy(() => import('@/pages/BriefingSignOff'));
const PublicBriefingSign = lazy(() => import('@/pages/PublicBriefingSign'));
const ClientPortalView = lazy(() => import('@/pages/public/ClientPortalView'));
const PublicElecIdView = lazy(() => import('@/pages/public/PublicElecIdView'));
const SupervisorVerificationPage = lazy(() => import('@/pages/public/SupervisorVerificationPage'));
const PhotoSharePage = lazy(() => import('@/pages/public/PhotoSharePage'));
const ScopeSharePage = lazy(() => import('@/pages/public/ScopeSharePage'));
const CompletionSignOffPage = lazy(() => import('@/pages/public/CompletionSignOffPage'));
const SharedPortfolioView = lazy(() => import('@/pages/public/SharedPortfolioView'));
const LaTeXPDFGeneratorPage = lazy(() => import('@/pages/LaTeXPDFGeneratorPage'));
const InvoiceQuoteBuilder = lazy(() => import('@/pages/electrician/InvoiceQuoteBuilder'));
const InvoiceViewPage = lazy(() => import('@/pages/electrician/InvoiceViewPage'));
const QuoteViewPage = lazy(() => import('@/pages/electrician/QuoteViewPage'));
const AdminRAGProcessor = lazy(() => import('@/pages/AdminRAGProcessor'));
const ConsultationResults = lazy(() =>
  import('@/components/install-planner-v2/ConsultationResults').then((m) => ({
    default: m.ConsultationResults,
  }))
);
const ProcessOnsiteGuide = lazy(() => import('@/pages/ProcessOnsiteGuide'));
const AutoProcessOnsite = lazy(() => import('@/pages/AutoProcessOnsite'));
const KnowledgeUploader = lazy(() => import('@/pages/Admin/KnowledgeUploader'));
const LearningReview = lazy(() => import('@/pages/Admin/LearningReview'));
const CircuitDesigner = lazy(() => import('@/pages/electrician-tools/CircuitDesigner'));
const EnrichmentMonitor = lazy(() => import('@/pages/Admin/EnrichmentMonitor'));
const AdminPanel = lazy(() => import('@/pages/Admin/AdminPanel'));
const AdminDashboard = lazy(() => import('@/pages/Admin/AdminDashboard'));
const AdminUsers = lazy(() => import('@/pages/Admin/AdminUsers'));
const AdminOffers = lazy(() => import('@/pages/Admin/AdminOffers'));
const AdminElecIds = lazy(() => import('@/pages/Admin/AdminElecIds'));
const AdminSubscriptions = lazy(() => import('@/pages/Admin/AdminSubscriptions'));
const AdminConversations = lazy(() => import('@/pages/Admin/AdminConversations'));
const AdminSystem = lazy(() => import('@/pages/Admin/AdminSystem'));
const AdminAnnouncements = lazy(() => import('@/pages/Admin/AdminAnnouncements'));
const AdminSupport = lazy(() => import('@/pages/Admin/AdminSupport'));
const AdminUserMessages = lazy(() => import('@/pages/Admin/AdminUserMessages'));
const AdminAuditLogs = lazy(() => import('@/pages/Admin/AdminAuditLogs'));
const AdminFeatureFlags = lazy(() => import('@/pages/Admin/AdminFeatureFlags'));
const AdminSettings = lazy(() => import('@/pages/Admin/AdminSettings'));
const AdminAnalytics = lazy(() => import('@/pages/Admin/AdminAnalytics'));
const AdminVerificationQueue = lazy(() => import('@/pages/Admin/AdminVerificationQueue'));
const AdminRevenue = lazy(() => import('@/pages/Admin/AdminRevenue'));
const AdminEmailLogs = lazy(() => import('@/pages/Admin/AdminEmailLogs'));
const AdminEmployerModeration = lazy(() => import('@/pages/Admin/AdminEmployerModeration'));
const AdminDataExport = lazy(() => import('@/pages/Admin/AdminDataExport'));
const AdminPricingModeration = lazy(() => import('@/pages/Admin/AdminPricingModeration'));
const AdminDocumentReview = lazy(() => import('@/pages/Admin/AdminDocumentReview'));
const AdminFounders = lazy(() => import('@/pages/Admin/AdminFounders'));
const AdminEarlyAccess = lazy(() => import('@/pages/Admin/AdminEarlyAccess'));
const AdminTrials = lazy(() => import('@/pages/Admin/AdminTrials'));
const AdminWinback = lazy(() => import('@/pages/Admin/AdminWinback'));
const AdminIncompleteSignup = lazy(() => import('@/pages/Admin/AdminIncompleteSignup'));
const AdminApprenticeCampaigns = lazy(() => import('@/pages/Admin/AdminApprenticeCampaigns'));
const AdminOutreach = lazy(() => import('@/pages/Admin/AdminOutreach'));
const TrainingPhotoUpload = lazy(() => import('@/pages/Admin/TrainingPhotoUpload'));
const FounderClaim = lazyWithRetry(() => import('@/pages/founder/FounderClaim'));
const FounderSignup = lazyWithRetry(() => import('@/pages/founder/FounderSignup'));
const FounderSuccess = lazyWithRetry(() => import('@/pages/founder/FounderSuccess'));
const CustomersPage = lazy(() => import('@/pages/CustomersPage'));
const CustomerDetailPage = lazy(() => import('@/pages/CustomerDetailPage'));
const CertificateExpiryPage = lazy(() => import('@/pages/CertificateExpiryPage'));
const EmployerDashboard = lazy(() => import('@/pages/employer/EmployerDashboard'));
const CollegeDashboard = lazy(() => import('@/pages/college/CollegeDashboard'));
const ElecIdPage = lazyWithRetry(() => import('@/pages/ElecIdPage'));
const PrivacyPolicy = lazy(() => import('@/pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/legal/TermsOfService'));
const CookiePolicy = lazy(() => import('@/pages/legal/CookiePolicy'));
const AcceptableUse = lazy(() => import('@/pages/legal/AcceptableUse'));
const DataProcessingAgreement = lazy(() => import('@/pages/legal/DataProcessingAgreement'));
const RegulationSearchPage = lazy(() => import('@/pages/tools/RegulationSearchPage'));
const QuizPage = lazy(() => import('@/pages/QuizPage'));

// SEO Landing Pages (public, outside ProtectedRoute)
const EICRCertificatePage = lazy(() => import('@/pages/seo/EICRCertificatePage'));
const CableSizingCalculatorPage = lazy(() => import('@/pages/seo/CableSizingCalculatorPage'));
const VoltageDropCalculatorPage = lazy(() => import('@/pages/seo/VoltageDropCalculatorPage'));
const MinorWorksCertificatePage = lazy(() => import('@/pages/seo/MinorWorksCertificatePage'));
const ElectricalTestingCalculatorsPage = lazy(
  () => import('@/pages/seo/ElectricalTestingCalculatorsPage')
);
const AIElectricianToolsPage = lazy(() => import('@/pages/seo/AIElectricianToolsPage'));
const EighteenthEditionCoursePage = lazy(() => import('@/pages/seo/EighteenthEditionCoursePage'));
const ApprenticeTrainingPage = lazy(() => import('@/pages/seo/ApprenticeTrainingPage'));

// SEO Landing Pages (public, outside ProtectedRoute)
const EarthLoopImpedanceCalculatorPage = lazy(
  () => import('@/pages/seo/EarthLoopImpedanceCalculatorPage')
);
const MaxDemandCalculatorPage = lazy(() => import('@/pages/seo/MaxDemandCalculatorPage'));
const ConduitFillCalculatorPage = lazy(() => import('@/pages/seo/ConduitFillCalculatorPage'));
const RCDTestingGuidePage = lazy(() => import('@/pages/seo/RCDTestingGuidePage'));
const EICCertificatePage = lazy(() => import('@/pages/seo/EICCertificatePage'));
const PATTestingPage = lazy(() => import('@/pages/seo/PATTestingPage'));
const EVChargerCertificatePage = lazy(() => import('@/pages/seo/EVChargerCertificatePage'));
const AM2ExamPreparationPage = lazy(() => import('@/pages/seo/AM2ExamPreparationPage'));
const InspectionTestingCoursePage = lazy(() => import('@/pages/seo/InspectionTestingCoursePage'));
const BS7671ObservationCodesPage = lazy(() => import('@/pages/seo/BS7671ObservationCodesPage'));
const BestElectricianAppPage = lazy(() => import('@/pages/seo/BestElectricianAppPage'));
const ElecMateVsICertifiPage = lazy(() => import('@/pages/seo/ElecMateVsICertifiPage'));
const ElecMateVsCertsAppPage = lazy(() => import('@/pages/seo/ElecMateVsCertsAppPage'));
const ElecMateVsSimplyEICRPage = lazy(() => import('@/pages/seo/ElecMateVsSimplyEICRPage'));
const BestInvoiceAppPage = lazy(() => import('@/pages/seo/BestInvoiceAppPage'));
const BestAIToolElectriciansPage = lazy(() => import('@/pages/seo/BestAIToolElectriciansPage'));
const ElecMateVsElectricalOMPage = lazy(() => import('@/pages/seo/ElecMateVsElectricalOMPage'));

// SEO Landing Pages — Batch 2 (20 new pages)
const EmergencyLightingCertificatePage = lazy(
  () => import('@/pages/seo/EmergencyLightingCertificatePage')
);
const FireAlarmCertificatePage = lazy(() => import('@/pages/seo/FireAlarmCertificatePage'));
const SolarPVCertificatePage = lazy(() => import('@/pages/seo/SolarPVCertificatePage'));
const ProspectiveFaultCurrentCalculatorPage = lazy(
  () => import('@/pages/seo/ProspectiveFaultCurrentCalculatorPage')
);
const AdiabaticEquationCalculatorPage = lazy(
  () => import('@/pages/seo/AdiabaticEquationCalculatorPage')
);
const PowerFactorCalculatorPage = lazy(() => import('@/pages/seo/PowerFactorCalculatorPage'));
const RingCircuitCalculatorPage = lazy(() => import('@/pages/seo/RingCircuitCalculatorPage'));
const TrunkingFillCalculatorPage = lazy(() => import('@/pages/seo/TrunkingFillCalculatorPage'));
const ElectricalQuotingAppPage = lazy(() => import('@/pages/seo/ElectricalQuotingAppPage'));
const ElectricianInvoiceAppPage = lazy(() => import('@/pages/seo/ElectricianInvoiceAppPage'));
const CityGuilds2391Page = lazy(() => import('@/pages/seo/CityGuilds2391Page'));
const Level2ElectricalPage = lazy(() => import('@/pages/seo/Level2ElectricalPage'));
const Level3ElectricalPage = lazy(() => import('@/pages/seo/Level3ElectricalPage'));
const EPAPreparationPage = lazy(() => import('@/pages/seo/EPAPreparationPage'));
const ApprenticePortfolioGuidePage = lazy(() => import('@/pages/seo/ApprenticePortfolioGuidePage'));
const RAMSGeneratorPage = lazy(() => import('@/pages/seo/RAMSGeneratorPage'));
const PartPBuildingRegulationsPage = lazy(() => import('@/pages/seo/PartPBuildingRegulationsPage'));
const EarthingArrangementsPage = lazy(() => import('@/pages/seo/EarthingArrangementsPage'));
const ConsumerUnitRegulationsPage = lazy(() => import('@/pages/seo/ConsumerUnitRegulationsPage'));
const TestingSequenceGuidePage = lazy(() => import('@/pages/seo/TestingSequenceGuidePage'));
const HowToSizeCablesPage = lazy(() => import('@/pages/seo/HowToSizeCablesPage'));
const HowToFillInEICRPage = lazy(() => import('@/pages/seo/HowToFillInEICRPage'));
const HowToDoSafeIsolationPage = lazy(() => import('@/pages/seo/HowToDoSafeIsolationPage'));
const HowToTestInsulationResistancePage = lazy(
  () => import('@/pages/seo/HowToTestInsulationResistancePage')
);
const AICircuitDesignerPage = lazy(() => import('@/pages/seo/AICircuitDesignerPage'));
const AICostEngineerPage = lazy(() => import('@/pages/seo/AICostEngineerPage'));
const AIHealthSafetyAgentPage = lazy(() => import('@/pages/seo/AIHealthSafetyAgentPage'));
const BMSCoursePage = lazy(() => import('@/pages/seo/BMSCoursePage'));
const CashFlowPlannerPage = lazy(() => import('@/pages/seo/CashFlowPlannerPage'));
const DiversityFactorCalculatorPage = lazy(
  () => import('@/pages/seo/DiversityFactorCalculatorPage')
);
const IPAFTrainingPage = lazy(() => import('@/pages/seo/IPAFTrainingPage'));
const JobProfitabilityCalculatorPage = lazy(
  () => import('@/pages/seo/JobProfitabilityCalculatorPage')
);
const ManualHandlingCoursePage = lazy(() => import('@/pages/seo/ManualHandlingCoursePage'));
const PASMATrainingPage = lazy(() => import('@/pages/seo/PASMATrainingPage'));
const ThreePhasePowerCalculatorPage = lazy(
  () => import('@/pages/seo/ThreePhasePowerCalculatorPage')
);
const LoftConversionElectricsPage = lazy(() => import('@/pages/seo/LoftConversionElectricsPage'));
const GarageElectricsGuidePage = lazy(() => import('@/pages/seo/GarageElectricsGuidePage'));
const GardenOfficeElectricsPage = lazy(() => import('@/pages/seo/GardenOfficeElectricsPage'));
const BatteryStorageGuidePage = lazy(() => import('@/pages/seo/BatteryStorageGuidePage'));
const SmartHomeWiringPage = lazy(() => import('@/pages/seo/SmartHomeWiringPage'));
const OutdoorSocketsGuidePage = lazy(() => import('@/pages/seo/OutdoorSocketsGuidePage'));
const AIComponentIdentificationPage = lazy(
  () => import('@/pages/seo/AIComponentIdentificationPage')
);
const AIInstallationVerificationPage = lazy(
  () => import('@/pages/seo/AIInstallationVerificationPage')
);
const AIForElectricalApprenticesPage = lazy(
  () => import('@/pages/seo/AIForElectricalApprenticesPage')
);
const AIvsManualDesignPage = lazy(() => import('@/pages/seo/AIvsManualDesignPage'));
const AIElectricalFaultFindingPage = lazy(() => import('@/pages/seo/AIElectricalFaultFindingPage'));
const ExpensesManagerPage = lazy(() => import('@/pages/seo/ExpensesManagerPage'));
const StaffManagementToolPage = lazy(() => import('@/pages/seo/StaffManagementToolPage'));
const ScheduleManagerPage = lazy(() => import('@/pages/seo/ScheduleManagerPage'));
const EquipmentROICalculatorPage = lazy(() => import('@/pages/seo/EquipmentROICalculatorPage'));
const ElectricianVanSetupPage = lazy(() => import('@/pages/seo/ElectricianVanSetupPage'));
const ElectricianToolListPage = lazy(() => import('@/pages/seo/ElectricianToolListPage'));
const ElectricalSurveyCostPage = lazy(() => import('@/pages/seo/ElectricalSurveyCostPage'));
const ElectricalComplianceCertificatePage = lazy(
  () => import('@/pages/seo/ElectricalComplianceCertificatePage')
);
const PartialRewireGuidePage = lazy(() => import('@/pages/seo/PartialRewireGuidePage'));
const ElectricalWorkInBathroomPage = lazy(() => import('@/pages/seo/ElectricalWorkInBathroomPage'));
const HowToWireAPlugPage = lazy(() => import('@/pages/seo/HowToWireAPlugPage'));
const ElectricalSymbolsChartPage = lazy(() => import('@/pages/seo/ElectricalSymbolsChartPage'));

// Lazy-loaded route modules (with retry for chunk failures)
const ApprenticeRoutes = lazyWithRetry(() => import('@/routes/ApprenticeRoutes'));
const ElectricianHubRoutes = lazyWithRetry(() => import('@/routes/ElectricianHubRoutes'));
const ElectricianRoutes = lazyWithRetry(() => import('@/routes/ElectricianRoutes'));
const InspectionRoutes = lazyWithRetry(() => import('@/routes/InspectionRoutes'));
const StudyCentreRoutes = lazyWithRetry(() => import('@/routes/StudyCentreRoutes'));
const UpskillingRoutes = lazyWithRetry(() => import('@/routes/UpskillingRoutes'));

const LegacyRedirect = ({ from, to }: { from: string; to: string }) => {
  const location = useLocation();
  const suffix = location.pathname.startsWith(from) ? location.pathname.slice(from.length) : '';
  const newPath = `${to}${suffix}${location.search}${location.hash}`;
  return <Navigate to={newPath} replace />;
};

const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Walkthrough (first launch only) */}
        <Route
          path="/walkthrough"
          element={
            <LazyRoute>
              <Walkthrough />
            </LazyRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <LazyRoute>
              <LandingPage />
            </LazyRoute>
          }
        />
        <Route
          path="/process-onsite-now"
          element={
            <LazyRoute>
              <AutoProcessOnsite />
            </LazyRoute>
          }
        />
        <Route
          path="/index"
          element={
            <LazyRoute>
              <Index />
            </LazyRoute>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <LazyRoute>
              <SignIn />
            </LazyRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <LazyRoute>
              <SignUp />
            </LazyRoute>
          }
        />
        <Route
          path="/auth/forgot-password"
          element={
            <LazyRoute>
              <ForgotPassword />
            </LazyRoute>
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            <LazyRoute>
              <ResetPassword />
            </LazyRoute>
          }
        />
        <Route
          path="/auth/confirm-email"
          element={
            <LazyRoute>
              <ConfirmEmail />
            </LazyRoute>
          }
        />
        <Route
          path="/auth/check-email"
          element={
            <LazyRoute>
              <CheckEmail />
            </LazyRoute>
          }
        />
        <Route
          path="/auth/complete-profile"
          element={
            <LazyRoute>
              <CompleteProfile />
            </LazyRoute>
          }
        />
        <Route
          path="/privacy"
          element={
            <LazyRoute>
              <PrivacyPolicy />
            </LazyRoute>
          }
        />
        <Route
          path="/terms"
          element={
            <LazyRoute>
              <TermsOfService />
            </LazyRoute>
          }
        />
        <Route
          path="/cookies"
          element={
            <LazyRoute>
              <CookiePolicy />
            </LazyRoute>
          }
        />
        <Route
          path="/acceptable-use"
          element={
            <LazyRoute>
              <AcceptableUse />
            </LazyRoute>
          }
        />
        <Route
          path="/dpa"
          element={
            <LazyRoute>
              <DataProcessingAgreement />
            </LazyRoute>
          }
        />
        <Route
          path="/quote/:token"
          element={
            <LazyRoute>
              <PublicQuote />
            </LazyRoute>
          }
        />
        <Route
          path="/public-quote/:token"
          element={
            <LazyRoute>
              <PublicQuote />
            </LazyRoute>
          }
        />
        <Route
          path="/sign/:token"
          element={
            <LazyRoute>
              <PublicSignature />
            </LazyRoute>
          }
        />
        <Route
          path="/briefing-signoff/:briefingId"
          element={
            <LazyRoute>
              <BriefingSignOff />
            </LazyRoute>
          }
        />
        <Route
          path="/briefing-sign/:token"
          element={
            <LazyRoute>
              <PublicBriefingSign />
            </LazyRoute>
          }
        />
        <Route
          path="/portal/:token"
          element={
            <LazyRoute>
              <ClientPortalView />
            </LazyRoute>
          }
        />
        <Route
          path="/verify/:elecIdNumber"
          element={
            <LazyRoute>
              <PublicElecIdView />
            </LazyRoute>
          }
        />
        <Route
          path="/share/:token"
          element={
            <LazyRoute>
              <PublicElecIdView />
            </LazyRoute>
          }
        />
        <Route
          path="/verify-evidence/:token"
          element={
            <LazyRoute>
              <SupervisorVerificationPage />
            </LazyRoute>
          }
        />
        <Route
          path="/photos/:token"
          element={
            <LazyRoute>
              <PhotoSharePage />
            </LazyRoute>
          }
        />
        <Route
          path="/scope/:token"
          element={
            <LazyRoute>
              <ScopeSharePage />
            </LazyRoute>
          }
        />
        <Route
          path="/completion/:token"
          element={
            <LazyRoute>
              <CompletionSignOffPage />
            </LazyRoute>
          }
        />
        <Route
          path="/view/:token"
          element={
            <LazyRoute>
              <SharedPortfolioView />
            </LazyRoute>
          }
        />
        <Route
          path="/pdf-generator"
          element={
            <LazyRoute>
              <LaTeXPDFGeneratorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/founder/claim"
          element={
            <LazyRoute>
              <FounderClaim />
            </LazyRoute>
          }
        />
        <Route
          path="/founder/signup"
          element={
            <LazyRoute>
              <FounderSignup />
            </LazyRoute>
          }
        />
        <Route
          path="/founder/success"
          element={
            <LazyRoute>
              <FounderSuccess />
            </LazyRoute>
          }
        />
        <Route
          path="/invoice-payment-success"
          element={
            <LazyRoute>
              <InvoicePaymentSuccess />
            </LazyRoute>
          }
        />

        {/* Public SEO Landing Pages (outside ProtectedRoute) */}
        <Route
          path="/tools/eicr-certificate"
          element={
            <LazyRoute>
              <EICRCertificatePage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/cable-sizing-calculator"
          element={
            <LazyRoute>
              <CableSizingCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/voltage-drop-calculator"
          element={
            <LazyRoute>
              <VoltageDropCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/minor-works-certificate"
          element={
            <LazyRoute>
              <MinorWorksCertificatePage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/electrical-testing-calculators"
          element={
            <LazyRoute>
              <ElectricalTestingCalculatorsPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/ai-electrician"
          element={
            <LazyRoute>
              <AIElectricianToolsPage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/18th-edition-course"
          element={
            <LazyRoute>
              <EighteenthEditionCoursePage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/electrical-apprentice"
          element={
            <LazyRoute>
              <ApprenticeTrainingPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/earth-loop-impedance-calculator"
          element={
            <LazyRoute>
              <EarthLoopImpedanceCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/max-demand-calculator"
          element={
            <LazyRoute>
              <MaxDemandCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/conduit-fill-calculator"
          element={
            <LazyRoute>
              <ConduitFillCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/rcd-testing-guide"
          element={
            <LazyRoute>
              <RCDTestingGuidePage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/eic-certificate"
          element={
            <LazyRoute>
              <EICCertificatePage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/pat-testing"
          element={
            <LazyRoute>
              <PATTestingPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/ev-charger-certificate"
          element={
            <LazyRoute>
              <EVChargerCertificatePage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/best-electrician-app-uk"
          element={
            <LazyRoute>
              <BestElectricianAppPage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/am2-exam-preparation"
          element={
            <LazyRoute>
              <AM2ExamPreparationPage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/inspection-and-testing"
          element={
            <LazyRoute>
              <InspectionTestingCoursePage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/bs7671-observation-codes"
          element={
            <LazyRoute>
              <BS7671ObservationCodesPage />
            </LazyRoute>
          }
        />
        <Route
          path="/compare/elec-mate-vs-icertifi"
          element={
            <LazyRoute>
              <ElecMateVsICertifiPage />
            </LazyRoute>
          }
        />
        <Route
          path="/compare/elec-mate-vs-certsapp"
          element={
            <LazyRoute>
              <ElecMateVsCertsAppPage />
            </LazyRoute>
          }
        />
        <Route
          path="/compare/elec-mate-vs-simply-eicr"
          element={
            <LazyRoute>
              <ElecMateVsSimplyEICRPage />
            </LazyRoute>
          }
        />
        <Route
          path="/compare/best-invoice-app-electricians"
          element={
            <LazyRoute>
              <BestInvoiceAppPage />
            </LazyRoute>
          }
        />
        <Route
          path="/compare/best-ai-tool-electricians"
          element={
            <LazyRoute>
              <BestAIToolElectriciansPage />
            </LazyRoute>
          }
        />
        <Route
          path="/compare/elec-mate-vs-electrical-om"
          element={
            <LazyRoute>
              <ElecMateVsElectricalOMPage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Certificates */}
        <Route
          path="/tools/emergency-lighting-certificate"
          element={
            <LazyRoute>
              <EmergencyLightingCertificatePage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/fire-alarm-certificate"
          element={
            <LazyRoute>
              <FireAlarmCertificatePage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/solar-pv-certificate"
          element={
            <LazyRoute>
              <SolarPVCertificatePage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Calculators */}
        <Route
          path="/tools/prospective-fault-current-calculator"
          element={
            <LazyRoute>
              <ProspectiveFaultCurrentCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/adiabatic-equation-calculator"
          element={
            <LazyRoute>
              <AdiabaticEquationCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/power-factor-calculator"
          element={
            <LazyRoute>
              <PowerFactorCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/ring-circuit-calculator"
          element={
            <LazyRoute>
              <RingCircuitCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/trunking-fill-calculator"
          element={
            <LazyRoute>
              <TrunkingFillCalculatorPage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Business Tools */}
        <Route
          path="/tools/electrical-quoting-app"
          element={
            <LazyRoute>
              <ElectricalQuotingAppPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/electrician-invoice-app"
          element={
            <LazyRoute>
              <ElectricianInvoiceAppPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/rams-generator"
          element={
            <LazyRoute>
              <RAMSGeneratorPage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Training */}
        <Route
          path="/training/city-guilds-2391"
          element={
            <LazyRoute>
              <CityGuilds2391Page />
            </LazyRoute>
          }
        />
        <Route
          path="/training/level-2-electrical"
          element={
            <LazyRoute>
              <Level2ElectricalPage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/level-3-electrical"
          element={
            <LazyRoute>
              <Level3ElectricalPage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/epa-preparation"
          element={
            <LazyRoute>
              <EPAPreparationPage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/apprentice-portfolio"
          element={
            <LazyRoute>
              <ApprenticePortfolioGuidePage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Guides */}
        <Route
          path="/guides/part-p-building-regulations"
          element={
            <LazyRoute>
              <PartPBuildingRegulationsPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/earthing-arrangements"
          element={
            <LazyRoute>
              <EarthingArrangementsPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/consumer-unit-regulations"
          element={
            <LazyRoute>
              <ConsumerUnitRegulationsPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/testing-sequence-guide"
          element={
            <LazyRoute>
              <TestingSequenceGuidePage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/how-to-size-cables-bs-7671"
          element={
            <LazyRoute>
              <HowToSizeCablesPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/how-to-fill-in-eicr"
          element={
            <LazyRoute>
              <HowToFillInEICRPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/how-to-do-safe-isolation"
          element={
            <LazyRoute>
              <HowToDoSafeIsolationPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/how-to-test-insulation-resistance"
          element={
            <LazyRoute>
              <HowToTestInsulationResistancePage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — AI Agents */}
        <Route
          path="/tools/ai-circuit-designer"
          element={
            <LazyRoute>
              <AICircuitDesignerPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/ai-cost-engineer"
          element={
            <LazyRoute>
              <AICostEngineerPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/ai-health-safety-agent"
          element={
            <LazyRoute>
              <AIHealthSafetyAgentPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/ai-component-identification"
          element={
            <LazyRoute>
              <AIComponentIdentificationPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/ai-installation-verification"
          element={
            <LazyRoute>
              <AIInstallationVerificationPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/ai-for-electrical-apprentices"
          element={
            <LazyRoute>
              <AIForElectricalApprenticesPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/ai-vs-manual-electrical-design"
          element={
            <LazyRoute>
              <AIvsManualDesignPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/ai-electrical-fault-finding"
          element={
            <LazyRoute>
              <AIElectricalFaultFindingPage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Additional Training */}
        <Route
          path="/training/bms-course"
          element={
            <LazyRoute>
              <BMSCoursePage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/ipaf-training"
          element={
            <LazyRoute>
              <IPAFTrainingPage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/manual-handling"
          element={
            <LazyRoute>
              <ManualHandlingCoursePage />
            </LazyRoute>
          }
        />
        <Route
          path="/training/pasma-training"
          element={
            <LazyRoute>
              <PASMATrainingPage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Additional Calculators */}
        <Route
          path="/tools/diversity-factor-calculator"
          element={
            <LazyRoute>
              <DiversityFactorCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/three-phase-power-calculator"
          element={
            <LazyRoute>
              <ThreePhasePowerCalculatorPage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Additional Business Tools */}
        <Route
          path="/tools/cash-flow-planner"
          element={
            <LazyRoute>
              <CashFlowPlannerPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/job-profitability-calculator"
          element={
            <LazyRoute>
              <JobProfitabilityCalculatorPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/expenses-manager-electrician"
          element={
            <LazyRoute>
              <ExpensesManagerPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/staff-management-electrician"
          element={
            <LazyRoute>
              <StaffManagementToolPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/schedule-manager-electrician"
          element={
            <LazyRoute>
              <ScheduleManagerPage />
            </LazyRoute>
          }
        />
        <Route
          path="/tools/equipment-roi-calculator"
          element={
            <LazyRoute>
              <EquipmentROICalculatorPage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Installation Guides */}
        <Route
          path="/guides/loft-conversion-electrics"
          element={
            <LazyRoute>
              <LoftConversionElectricsPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/garage-electrics"
          element={
            <LazyRoute>
              <GarageElectricsGuidePage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/garden-office-electrics"
          element={
            <LazyRoute>
              <GardenOfficeElectricsPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/battery-storage-installation"
          element={
            <LazyRoute>
              <BatteryStorageGuidePage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/smart-home-wiring"
          element={
            <LazyRoute>
              <SmartHomeWiringPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/outdoor-sockets-regulations"
          element={
            <LazyRoute>
              <OutdoorSocketsGuidePage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/electrician-van-setup"
          element={
            <LazyRoute>
              <ElectricianVanSetupPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/electrician-tool-list-uk"
          element={
            <LazyRoute>
              <ElectricianToolListPage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — New Guides */}
        <Route
          path="/guides/electrical-survey-cost"
          element={
            <LazyRoute>
              <ElectricalSurveyCostPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/electrical-compliance-certificate"
          element={
            <LazyRoute>
              <ElectricalComplianceCertificatePage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/partial-rewire-guide"
          element={
            <LazyRoute>
              <PartialRewireGuidePage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/electrical-work-in-bathroom"
          element={
            <LazyRoute>
              <ElectricalWorkInBathroomPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/how-to-wire-a-plug"
          element={
            <LazyRoute>
              <HowToWireAPlugPage />
            </LazyRoute>
          }
        />
        <Route
          path="/guides/electrical-symbols-chart"
          element={
            <LazyRoute>
              <ElectricalSymbolsChartPage />
            </LazyRoute>
          }
        />

        {/* SEO Pages — Additional (from SEORoutes.tsx) */}
        {getSEORoutes()}

        {/* Legacy/Direct Access Routes - Redirect to proper paths */}
        <Route
          path="/rights-and-pay"
          element={<Navigate to="/apprentice/rights-and-pay" replace />}
        />

        {/* Main Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="checkout-trial"
            element={
              <LazyRoute>
                <CheckoutTrial />
              </LazyRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <LazyRoute>
                <Dashboard />
              </LazyRoute>
            }
          />
          <Route
            path="profile"
            element={
              <LazyRoute>
                <Profile />
              </LazyRoute>
            }
          />
          <Route
            path="settings"
            element={
              <LazyRoute>
                <Settings />
              </LazyRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <LazyRoute>
                <NotificationsPage />
              </LazyRoute>
            }
          />
          <Route
            path="customers"
            element={
              <LazyRoute>
                <CustomersPage />
              </LazyRoute>
            }
          />
          <Route
            path="customers/:customerId"
            element={
              <LazyRoute>
                <CustomerDetailPage />
              </LazyRoute>
            }
          />
          <Route
            path="certificate-expiry"
            element={
              <LazyRoute>
                <CertificateExpiryPage />
              </LazyRoute>
            }
          />
          <Route
            path="subscriptions"
            element={
              <LazyRoute>
                <Subscriptions />
              </LazyRoute>
            }
          />
          <Route
            path="payment-success"
            element={
              <LazyRoute>
                <PaymentSuccess />
              </LazyRoute>
            }
          />
          <Route
            path="admin/rag-processor"
            element={
              <LazyRoute>
                <AdminRAGProcessor />
              </LazyRoute>
            }
          />
          <Route
            path="admin/process-onsite-guide"
            element={
              <LazyRoute>
                <ProcessOnsiteGuide />
              </LazyRoute>
            }
          />
          <Route
            path="admin/knowledge-uploader"
            element={
              <LazyRoute>
                <KnowledgeUploader />
              </LazyRoute>
            }
          />
          <Route
            path="admin/learning-review"
            element={
              <LazyRoute>
                <LearningReview />
              </LazyRoute>
            }
          />
          <Route
            path="admin/enrichment"
            element={
              <LazyRoute>
                <EnrichmentMonitor />
              </LazyRoute>
            }
          />

          {/* Admin Panel with nested routes */}
          <Route
            path="admin"
            element={
              <LazyRoute>
                <AdminPanel />
              </LazyRoute>
            }
          >
            <Route
              index
              element={
                <LazyRoute>
                  <AdminDashboard />
                </LazyRoute>
              }
            />
            <Route
              path="users"
              element={
                <LazyRoute>
                  <AdminUsers />
                </LazyRoute>
              }
            />
            <Route
              path="revenue"
              element={
                <LazyRoute>
                  <AdminRevenue />
                </LazyRoute>
              }
            />
            <Route
              path="analytics"
              element={
                <LazyRoute>
                  <AdminAnalytics />
                </LazyRoute>
              }
            />
            <Route
              path="offers"
              element={
                <LazyRoute>
                  <AdminOffers />
                </LazyRoute>
              }
            />
            <Route
              path="elec-ids"
              element={
                <LazyRoute>
                  <AdminElecIds />
                </LazyRoute>
              }
            />
            <Route
              path="verification"
              element={
                <LazyRoute>
                  <AdminVerificationQueue />
                </LazyRoute>
              }
            />
            <Route
              path="vacancies"
              element={
                <LazyRoute>
                  <AdminEmployerModeration />
                </LazyRoute>
              }
            />
            <Route
              path="pricing"
              element={
                <LazyRoute>
                  <AdminPricingModeration />
                </LazyRoute>
              }
            />
            <Route
              path="document-review"
              element={
                <LazyRoute>
                  <AdminDocumentReview />
                </LazyRoute>
              }
            />
            <Route
              path="subscriptions"
              element={
                <LazyRoute>
                  <AdminSubscriptions />
                </LazyRoute>
              }
            />
            <Route
              path="conversations"
              element={
                <LazyRoute>
                  <AdminConversations />
                </LazyRoute>
              }
            />
            <Route
              path="announcements"
              element={
                <LazyRoute>
                  <AdminAnnouncements />
                </LazyRoute>
              }
            />
            <Route
              path="support"
              element={
                <LazyRoute>
                  <AdminSupport />
                </LazyRoute>
              }
            />
            <Route
              path="user-messages"
              element={
                <LazyRoute>
                  <AdminUserMessages />
                </LazyRoute>
              }
            />
            <Route
              path="feature-flags"
              element={
                <LazyRoute>
                  <AdminFeatureFlags />
                </LazyRoute>
              }
            />
            <Route
              path="settings"
              element={
                <LazyRoute>
                  <AdminSettings />
                </LazyRoute>
              }
            />
            <Route
              path="audit"
              element={
                <LazyRoute>
                  <AdminAuditLogs />
                </LazyRoute>
              }
            />
            <Route
              path="emails"
              element={
                <LazyRoute>
                  <AdminEmailLogs />
                </LazyRoute>
              }
            />
            <Route
              path="export"
              element={
                <LazyRoute>
                  <AdminDataExport />
                </LazyRoute>
              }
            />
            <Route
              path="founders"
              element={
                <LazyRoute>
                  <AdminFounders />
                </LazyRoute>
              }
            />
            <Route
              path="early-access"
              element={
                <LazyRoute>
                  <AdminEarlyAccess />
                </LazyRoute>
              }
            />
            <Route
              path="trials"
              element={
                <LazyRoute>
                  <AdminTrials />
                </LazyRoute>
              }
            />
            <Route
              path="incomplete-signup"
              element={
                <LazyRoute>
                  <AdminIncompleteSignup />
                </LazyRoute>
              }
            />
            <Route
              path="winback"
              element={
                <LazyRoute>
                  <AdminWinback />
                </LazyRoute>
              }
            />
            <Route
              path="apprentice-campaigns"
              element={
                <LazyRoute>
                  <AdminApprenticeCampaigns />
                </LazyRoute>
              }
            />
            <Route
              path="outreach"
              element={
                <LazyRoute>
                  <AdminOutreach />
                </LazyRoute>
              }
            />
            <Route
              path="system"
              element={
                <LazyRoute>
                  <AdminSystem />
                </LazyRoute>
              }
            />
            <Route
              path="training-upload"
              element={
                <LazyRoute>
                  <TrainingPhotoUpload />
                </LazyRoute>
              }
            />
          </Route>

          {/* Top level routes for shared features */}
          <Route
            path="mental-health"
            element={
              <LazyRoute>
                <ApprenticeMentalHealth />
              </LazyRoute>
            }
          />

          {/* Tools Routes */}
          <Route
            path="tools/regulation-search"
            element={
              <LazyRoute>
                <RegulationSearchPage />
              </LazyRoute>
            }
          />

          {/* Quiz Route */}
          <Route
            path="quiz/:id"
            element={
              <LazyRoute>
                <QuizPage />
              </LazyRoute>
            }
          />

          {/* Electrician Tools Routes */}
          <Route path="electrician-tools" element={<Navigate to="/electrician" replace />} />
          <Route
            path="electrician-tools/*"
            element={
              <LazyRoute>
                <ElectricianRoutes />
              </LazyRoute>
            }
          />
          <Route
            path="electrician/circuit-designer"
            element={
              <LazyRoute>
                <CircuitDesigner />
              </LazyRoute>
            }
          />
          <Route
            path="install-planner/results/:conversationId"
            element={
              <LazyRoute>
                <ConsultationResults />
              </LazyRoute>
            }
          />

          {/* Legacy Materials Routes -> Redirect to canonical electrician paths */}
          <Route
            path="materials"
            element={<LegacyRedirect from="/materials" to="/electrician/materials" />}
          />
          <Route
            path="materials/*"
            element={<LegacyRedirect from="/materials" to="/electrician/materials" />}
          />

          {/* Electrical Hub Routes (legacy -> redirect) */}
          <Route
            path="electrical-hub"
            element={<LegacyRedirect from="/electrical-hub" to="/electrician" />}
          />
          <Route
            path="electrical-hub/*"
            element={<LegacyRedirect from="/electrical-hub" to="/electrician" />}
          />
          {/* Canonical Electrician Hub */}
          <Route
            path="electrician/invoice-quote-builder/:quoteId"
            element={
              <LazyRoute>
                <InvoiceQuoteBuilder />
              </LazyRoute>
            }
          />
          <Route
            path="electrician/invoices/:id/view"
            element={
              <LazyRoute>
                <InvoiceViewPage />
              </LazyRoute>
            }
          />
          <Route
            path="electrician/quotes/view/:id"
            element={
              <LazyRoute>
                <QuoteViewPage />
              </LazyRoute>
            }
          />
          <Route
            path="electrician/*"
            element={
              <LazyRoute>
                <ElectricianHubRoutes />
              </LazyRoute>
            }
          />

          {/* Employer Hub Routes */}

          {/* Inspection & Testing Routes */}
          <Route
            path="electrician/inspection-testing/*"
            element={
              <LazyRoute>
                <InspectionRoutes />
              </LazyRoute>
            }
          />

          {/* Study Centre Routes */}
          <Route
            path="study-centre/*"
            element={
              <LazyRoute>
                <StudyCentreRoutes />
              </LazyRoute>
            }
          />

          {/* Professional Upskilling Routes */}
          <Route
            path="electrician/upskilling/*"
            element={
              <LazyRoute>
                <UpskillingRoutes />
              </LazyRoute>
            }
          />
          <Route
            path="employer"
            element={
              <LazyRoute>
                <EmployerDashboard />
              </LazyRoute>
            }
          />

          {/* College Hub Routes — requires college_id on profile */}
          <Route
            path="college"
            element={
              <LazyRoute>
                <CollegeGuard>
                  <CollegeDashboard />
                </CollegeGuard>
              </LazyRoute>
            }
          />

          {/* Elec-ID Route */}
          <Route
            path="elec-id"
            element={
              <LazyRoute>
                <ElecIdPage />
              </LazyRoute>
            }
          />

          {/* Apprentice Routes */}
          <Route
            path="apprentice/*"
            element={
              <LazyRoute>
                <ApprenticeRoutes />
              </LazyRoute>
            }
          />

          {/* Catch-all route for 404 */}
          <Route
            path="*"
            element={
              <LazyRoute>
                <NotFound />
              </LazyRoute>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;
