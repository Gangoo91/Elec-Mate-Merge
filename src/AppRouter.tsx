
import { lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LazyRoute } from "@/components/LazyRoute";
import { lazyWithRetry } from "@/utils/lazyWithRetry";

// Core components that should load immediately (small, critical path)
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Critical pages use lazyWithRetry for automatic retry on chunk failures
const LandingPage = lazyWithRetry(() => import("@/pages/LandingPage"));
const Index = lazyWithRetry(() => import("@/pages/Index"));
const SignIn = lazyWithRetry(() => import("@/pages/auth/SignIn"));
const SignUp = lazyWithRetry(() => import("@/pages/auth/SignUp"));
const ForgotPassword = lazyWithRetry(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazyWithRetry(() => import("@/pages/auth/ResetPassword"));
const ConfirmEmail = lazyWithRetry(() => import("@/pages/auth/ConfirmEmail"));
const CheckEmail = lazyWithRetry(() => import("@/pages/auth/CheckEmail"));
const CompleteProfile = lazyWithRetry(() => import("@/pages/auth/CompleteProfile"));
const CheckoutTrial = lazyWithRetry(() => import("@/pages/auth/CheckoutTrial"));
const Dashboard = lazyWithRetry(() => import("@/pages/Dashboard"));
const Profile = lazyWithRetry(() => import("@/pages/Profile"));
const Settings = lazyWithRetry(() => import("@/pages/Settings"));
const Subscriptions = lazyWithRetry(() => import("@/pages/Subscriptions"));
const PaymentSuccess = lazyWithRetry(() => import("@/pages/PaymentSuccess"));
const InvoicePaymentSuccess = lazyWithRetry(() => import("@/pages/InvoicePaymentSuccess"));
const NotFound = lazyWithRetry(() => import("@/pages/NotFound"));
const ApprenticeMentalHealth = lazy(() => import("@/pages/apprentice/ApprenticeMentalHealth"));
const RightsAndPay = lazy(() => import("@/pages/apprentice/RightsAndPay"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const PublicQuote = lazy(() => import("@/pages/PublicQuote"));
const PublicSignature = lazy(() => import("@/pages/PublicSignature"));
const BriefingSignOff = lazy(() => import("@/pages/BriefingSignOff"));
const ClientPortalView = lazy(() => import("@/pages/public/ClientPortalView"));
const PublicElecIdView = lazy(() => import("@/pages/public/PublicElecIdView"));
const LaTeXPDFGeneratorPage = lazy(() => import("@/pages/LaTeXPDFGeneratorPage"));
const InvoiceQuoteBuilder = lazy(() => import("@/pages/electrician/InvoiceQuoteBuilder"));
const InvoiceViewPage = lazy(() => import("@/pages/electrician/InvoiceViewPage"));
const QuoteViewPage = lazy(() => import("@/pages/electrician/QuoteViewPage"));
const AdminRAGProcessor = lazy(() => import("@/pages/AdminRAGProcessor"));
const ConsultationResults = lazy(() => import("@/components/install-planner-v2/ConsultationResults").then(m => ({ default: m.ConsultationResults })));
const ProcessOnsiteGuide = lazy(() => import("@/pages/ProcessOnsiteGuide"));
const AutoProcessOnsite = lazy(() => import("@/pages/AutoProcessOnsite"));
const KnowledgeUploader = lazy(() => import("@/pages/Admin/KnowledgeUploader"));
const LearningReview = lazy(() => import("@/pages/Admin/LearningReview"));
const CircuitDesigner = lazy(() => import("@/pages/electrician-tools/CircuitDesigner"));
const EnrichmentMonitor = lazy(() => import("@/pages/Admin/EnrichmentMonitor"));
const AdminPanel = lazy(() => import("@/pages/Admin/AdminPanel"));
const AdminDashboard = lazy(() => import("@/pages/Admin/AdminDashboard"));
const AdminUsers = lazy(() => import("@/pages/Admin/AdminUsers"));
const AdminOffers = lazy(() => import("@/pages/Admin/AdminOffers"));
const AdminElecIds = lazy(() => import("@/pages/Admin/AdminElecIds"));
const AdminSubscriptions = lazy(() => import("@/pages/Admin/AdminSubscriptions"));
const AdminConversations = lazy(() => import("@/pages/Admin/AdminConversations"));
const AdminSystem = lazy(() => import("@/pages/Admin/AdminSystem"));
const AdminAnnouncements = lazy(() => import("@/pages/Admin/AdminAnnouncements"));
const AdminSupport = lazy(() => import("@/pages/Admin/AdminSupport"));
const AdminUserMessages = lazy(() => import("@/pages/Admin/AdminUserMessages"));
const AdminAuditLogs = lazy(() => import("@/pages/Admin/AdminAuditLogs"));
const AdminFeatureFlags = lazy(() => import("@/pages/Admin/AdminFeatureFlags"));
const AdminSettings = lazy(() => import("@/pages/Admin/AdminSettings"));
const AdminAnalytics = lazy(() => import("@/pages/Admin/AdminAnalytics"));
const AdminVerificationQueue = lazy(() => import("@/pages/Admin/AdminVerificationQueue"));
const AdminRevenue = lazy(() => import("@/pages/Admin/AdminRevenue"));
const AdminEmailLogs = lazy(() => import("@/pages/Admin/AdminEmailLogs"));
const AdminEmployerModeration = lazy(() => import("@/pages/Admin/AdminEmployerModeration"));
const AdminDataExport = lazy(() => import("@/pages/Admin/AdminDataExport"));
const AdminPricingModeration = lazy(() => import("@/pages/Admin/AdminPricingModeration"));
const AdminDocumentReview = lazy(() => import("@/pages/Admin/AdminDocumentReview"));
const AdminFounders = lazy(() => import("@/pages/Admin/AdminFounders"));
const AdminEarlyAccess = lazy(() => import("@/pages/Admin/AdminEarlyAccess"));
const AdminTrials = lazy(() => import("@/pages/Admin/AdminTrials"));
const AdminWinback = lazy(() => import("@/pages/Admin/AdminWinback"));
const TrainingPhotoUpload = lazy(() => import("@/pages/Admin/TrainingPhotoUpload"));
const FounderClaim = lazyWithRetry(() => import("@/pages/founder/FounderClaim"));
const FounderSignup = lazyWithRetry(() => import("@/pages/founder/FounderSignup"));
const FounderSuccess = lazyWithRetry(() => import("@/pages/founder/FounderSuccess"));
const CustomersPage = lazy(() => import("@/pages/CustomersPage"));
const CustomerDetailPage = lazy(() => import("@/pages/CustomerDetailPage"));
const CertificateExpiryPage = lazy(() => import("@/pages/CertificateExpiryPage"));
const EmployerDashboard = lazy(() => import("@/pages/employer/EmployerDashboard"));
const CollegeDashboard = lazy(() => import("@/pages/college/CollegeDashboard"));
const ElecIdPage = lazyWithRetry(() => import("@/pages/ElecIdPage"));
const PrivacyPolicy = lazy(() => import("@/pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/legal/TermsOfService"));
const CookiePolicy = lazy(() => import("@/pages/legal/CookiePolicy"));
const AcceptableUse = lazy(() => import("@/pages/legal/AcceptableUse"));
const DataProcessingAgreement = lazy(() => import("@/pages/legal/DataProcessingAgreement"));
const RegulationSearchPage = lazy(() => import("@/pages/tools/RegulationSearchPage"));
const QuizPage = lazy(() => import("@/pages/QuizPage"));

// Lazy-loaded route modules (with retry for chunk failures)
const ApprenticeRoutes = lazyWithRetry(() => import("@/routes/ApprenticeRoutes"));
const ElectricianHubRoutes = lazyWithRetry(() => import("@/routes/ElectricianHubRoutes"));
const ElectricianRoutes = lazyWithRetry(() => import("@/routes/ElectricianRoutes"));
const InspectionRoutes = lazyWithRetry(() => import("@/routes/InspectionRoutes"));
const StudyCentreRoutes = lazyWithRetry(() => import("@/routes/StudyCentreRoutes"));
const UpskillingRoutes = lazyWithRetry(() => import("@/routes/UpskillingRoutes"));

const LegacyRedirect = ({ from, to }: { from: string; to: string }) => {
  const location = useLocation();
  const suffix = location.pathname.startsWith(from) ? location.pathname.slice(from.length) : "";
  const newPath = `${to}${suffix}${location.search}${location.hash}`;
  return <Navigate to={newPath} replace />;
};

const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
      {/* Public Routes */}
      <Route path="/" element={<LazyRoute><LandingPage /></LazyRoute>} />
      <Route path="/process-onsite-now" element={<LazyRoute><AutoProcessOnsite /></LazyRoute>} />
      <Route path="/index" element={<LazyRoute><Index /></LazyRoute>} />
      <Route path="/auth/signin" element={<LazyRoute><SignIn /></LazyRoute>} />
      <Route path="/auth/signup" element={<LazyRoute><SignUp /></LazyRoute>} />
      <Route path="/auth/forgot-password" element={<LazyRoute><ForgotPassword /></LazyRoute>} />
      <Route path="/auth/reset-password" element={<LazyRoute><ResetPassword /></LazyRoute>} />
      <Route path="/auth/confirm-email" element={<LazyRoute><ConfirmEmail /></LazyRoute>} />
      <Route path="/auth/check-email" element={<LazyRoute><CheckEmail /></LazyRoute>} />
      <Route path="/auth/complete-profile" element={<LazyRoute><CompleteProfile /></LazyRoute>} />
      <Route path="/privacy" element={<LazyRoute><PrivacyPolicy /></LazyRoute>} />
      <Route path="/terms" element={<LazyRoute><TermsOfService /></LazyRoute>} />
      <Route path="/cookies" element={<LazyRoute><CookiePolicy /></LazyRoute>} />
      <Route path="/acceptable-use" element={<LazyRoute><AcceptableUse /></LazyRoute>} />
      <Route path="/dpa" element={<LazyRoute><DataProcessingAgreement /></LazyRoute>} />
      <Route path="/quote/:token" element={<LazyRoute><PublicQuote /></LazyRoute>} />
      <Route path="/public-quote/:token" element={<LazyRoute><PublicQuote /></LazyRoute>} />
      <Route path="/sign/:token" element={<LazyRoute><PublicSignature /></LazyRoute>} />
      <Route path="/briefing-signoff/:briefingId" element={<LazyRoute><BriefingSignOff /></LazyRoute>} />
      <Route path="/portal/:token" element={<LazyRoute><ClientPortalView /></LazyRoute>} />
      <Route path="/verify/:elecIdNumber" element={<LazyRoute><PublicElecIdView /></LazyRoute>} />
      <Route path="/share/:token" element={<LazyRoute><PublicElecIdView /></LazyRoute>} />
      <Route path="/pdf-generator" element={<LazyRoute><LaTeXPDFGeneratorPage /></LazyRoute>} />
      <Route path="/founder/claim" element={<LazyRoute><FounderClaim /></LazyRoute>} />
      <Route path="/founder/signup" element={<LazyRoute><FounderSignup /></LazyRoute>} />
      <Route path="/founder/success" element={<LazyRoute><FounderSuccess /></LazyRoute>} />
      <Route path="/invoice-payment-success" element={<LazyRoute><InvoicePaymentSuccess /></LazyRoute>} />

      {/* Legacy/Direct Access Routes - Redirect to proper paths */}
      <Route path="/rights-and-pay" element={<Navigate to="/apprentice/rights-and-pay" replace />} />

      {/* Main Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="checkout-trial" element={<LazyRoute><CheckoutTrial /></LazyRoute>} />
        <Route path="dashboard" element={<LazyRoute><Dashboard /></LazyRoute>} />
        <Route path="profile" element={<LazyRoute><Profile /></LazyRoute>} />
        <Route path="settings" element={<LazyRoute><Settings /></LazyRoute>} />
        <Route path="notifications" element={<LazyRoute><NotificationsPage /></LazyRoute>} />
        <Route path="customers" element={<LazyRoute><CustomersPage /></LazyRoute>} />
        <Route path="customers/:customerId" element={<LazyRoute><CustomerDetailPage /></LazyRoute>} />
        <Route path="certificate-expiry" element={<LazyRoute><CertificateExpiryPage /></LazyRoute>} />
        <Route path="subscriptions" element={<LazyRoute><Subscriptions /></LazyRoute>} />
        <Route path="payment-success" element={<LazyRoute><PaymentSuccess /></LazyRoute>} />
        <Route path="admin/rag-processor" element={<LazyRoute><AdminRAGProcessor /></LazyRoute>} />
        <Route path="admin/process-onsite-guide" element={<LazyRoute><ProcessOnsiteGuide /></LazyRoute>} />
        <Route path="admin/knowledge-uploader" element={<LazyRoute><KnowledgeUploader /></LazyRoute>} />
        <Route path="admin/learning-review" element={<LazyRoute><LearningReview /></LazyRoute>} />
        <Route path="admin/enrichment" element={<LazyRoute><EnrichmentMonitor /></LazyRoute>} />

        {/* Admin Panel with nested routes */}
        <Route path="admin" element={<LazyRoute><AdminPanel /></LazyRoute>}>
          <Route index element={<LazyRoute><AdminDashboard /></LazyRoute>} />
          <Route path="users" element={<LazyRoute><AdminUsers /></LazyRoute>} />
          <Route path="revenue" element={<LazyRoute><AdminRevenue /></LazyRoute>} />
          <Route path="analytics" element={<LazyRoute><AdminAnalytics /></LazyRoute>} />
          <Route path="offers" element={<LazyRoute><AdminOffers /></LazyRoute>} />
          <Route path="elec-ids" element={<LazyRoute><AdminElecIds /></LazyRoute>} />
          <Route path="verification" element={<LazyRoute><AdminVerificationQueue /></LazyRoute>} />
          <Route path="vacancies" element={<LazyRoute><AdminEmployerModeration /></LazyRoute>} />
          <Route path="pricing" element={<LazyRoute><AdminPricingModeration /></LazyRoute>} />
          <Route path="document-review" element={<LazyRoute><AdminDocumentReview /></LazyRoute>} />
          <Route path="subscriptions" element={<LazyRoute><AdminSubscriptions /></LazyRoute>} />
          <Route path="conversations" element={<LazyRoute><AdminConversations /></LazyRoute>} />
          <Route path="announcements" element={<LazyRoute><AdminAnnouncements /></LazyRoute>} />
          <Route path="support" element={<LazyRoute><AdminSupport /></LazyRoute>} />
          <Route path="user-messages" element={<LazyRoute><AdminUserMessages /></LazyRoute>} />
          <Route path="feature-flags" element={<LazyRoute><AdminFeatureFlags /></LazyRoute>} />
          <Route path="settings" element={<LazyRoute><AdminSettings /></LazyRoute>} />
          <Route path="audit" element={<LazyRoute><AdminAuditLogs /></LazyRoute>} />
          <Route path="emails" element={<LazyRoute><AdminEmailLogs /></LazyRoute>} />
          <Route path="export" element={<LazyRoute><AdminDataExport /></LazyRoute>} />
          <Route path="founders" element={<LazyRoute><AdminFounders /></LazyRoute>} />
          <Route path="early-access" element={<LazyRoute><AdminEarlyAccess /></LazyRoute>} />
          <Route path="trials" element={<LazyRoute><AdminTrials /></LazyRoute>} />
          <Route path="winback" element={<LazyRoute><AdminWinback /></LazyRoute>} />
          <Route path="system" element={<LazyRoute><AdminSystem /></LazyRoute>} />
          <Route path="training-upload" element={<LazyRoute><TrainingPhotoUpload /></LazyRoute>} />
        </Route>

        {/* Top level routes for shared features */}
        <Route path="mental-health" element={<LazyRoute><ApprenticeMentalHealth /></LazyRoute>} />

        {/* Tools Routes */}
        <Route path="tools/regulation-search" element={<LazyRoute><RegulationSearchPage /></LazyRoute>} />

        {/* Quiz Route */}
        <Route path="quiz/:id" element={<LazyRoute><QuizPage /></LazyRoute>} />

        {/* Electrician Tools Routes */}
        <Route path="electrician-tools" element={<Navigate to="/electrician" replace />} />
        <Route path="electrician-tools/*" element={<LazyRoute><ElectricianRoutes /></LazyRoute>} />
        <Route path="electrician/circuit-designer" element={<LazyRoute><CircuitDesigner /></LazyRoute>} />
        <Route path="install-planner/results/:conversationId" element={<LazyRoute><ConsultationResults /></LazyRoute>} />

        {/* Legacy Materials Routes -> Redirect to canonical electrician paths */}
        <Route path="materials" element={<LegacyRedirect from="/materials" to="/electrician/materials" />} />
        <Route path="materials/*" element={<LegacyRedirect from="/materials" to="/electrician/materials" />} />

        {/* Electrical Hub Routes (legacy -> redirect) */}
        <Route path="electrical-hub" element={<LegacyRedirect from="/electrical-hub" to="/electrician" />} />
        <Route path="electrical-hub/*" element={<LegacyRedirect from="/electrical-hub" to="/electrician" />} />
        {/* Canonical Electrician Hub */}
        <Route path="electrician/invoice-quote-builder/:quoteId" element={<LazyRoute><InvoiceQuoteBuilder /></LazyRoute>} />
        <Route path="electrician/invoices/:id/view" element={<LazyRoute><InvoiceViewPage /></LazyRoute>} />
        <Route path="electrician/quotes/view/:id" element={<LazyRoute><QuoteViewPage /></LazyRoute>} />
        <Route path="electrician/*" element={<LazyRoute><ElectricianHubRoutes /></LazyRoute>} />

        {/* Employer Hub Routes */}

        {/* Inspection & Testing Routes */}
        <Route path="electrician/inspection-testing/*" element={<LazyRoute><InspectionRoutes /></LazyRoute>} />

        {/* Study Centre Routes */}
        <Route path="study-centre/*" element={<LazyRoute><StudyCentreRoutes /></LazyRoute>} />

        {/* Professional Upskilling Routes */}
        <Route path="electrician/upskilling/*" element={<LazyRoute><UpskillingRoutes /></LazyRoute>} />
        <Route path="employer" element={<LazyRoute><EmployerDashboard /></LazyRoute>} />

        {/* College Hub Routes */}
        <Route path="college" element={<LazyRoute><CollegeDashboard /></LazyRoute>} />

        {/* Elec-ID Route */}
        <Route path="elec-id" element={<LazyRoute><ElecIdPage /></LazyRoute>} />

        {/* Apprentice Routes */}
        <Route path="apprentice/*" element={<LazyRoute><ApprenticeRoutes /></LazyRoute>} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
      </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;
