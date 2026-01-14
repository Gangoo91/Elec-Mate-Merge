
import { lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LazyRoute } from "@/components/LazyRoute";

// Core components that should load immediately (small, critical path)
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Lazy-loaded pages
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const Index = lazy(() => import("@/pages/Index"));
const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Profile = lazy(() => import("@/pages/Profile"));
const Settings = lazy(() => import("@/pages/Settings"));
const Subscriptions = lazy(() => import("@/pages/Subscriptions"));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ApprenticeMentalHealth = lazy(() => import("@/pages/apprentice/ApprenticeMentalHealth"));
const RightsAndPay = lazy(() => import("@/pages/apprentice/RightsAndPay"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const PublicQuote = lazy(() => import("@/pages/PublicQuote"));
const LaTeXPDFGeneratorPage = lazy(() => import("@/pages/LaTeXPDFGeneratorPage"));
const InvoiceQuoteBuilder = lazy(() => import("@/pages/electrician/InvoiceQuoteBuilder"));
const InvoiceViewPage = lazy(() => import("@/pages/electrician/InvoiceViewPage"));
const QuoteViewPage = lazy(() => import("@/pages/electrician/QuoteViewPage"));
const AdminRAGProcessor = lazy(() => import("@/pages/AdminRAGProcessor"));
const ConsultationResults = lazy(() => import("@/components/install-planner-v2/ConsultationResults").then(m => ({ default: m.ConsultationResults })));
const ProcessOnsiteGuide = lazy(() => import("@/pages/ProcessOnsiteGuide"));
const AutoProcessOnsite = lazy(() => import("@/pages/AutoProcessOnsite"));
const KnowledgeUploader = lazy(() => import("@/pages/Admin/KnowledgeUploader"));
const LearningReview = lazy(() => import("@/pages/admin/LearningReview"));
const CircuitDesigner = lazy(() => import("@/pages/electrician-tools/CircuitDesigner"));
const EnrichmentMonitor = lazy(() => import("@/pages/Admin/EnrichmentMonitor"));
const AdminPanel = lazy(() => import("@/pages/admin/AdminPanel"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminOffers = lazy(() => import("@/pages/admin/AdminOffers"));
const AdminElecIds = lazy(() => import("@/pages/admin/AdminElecIds"));
const AdminSubscriptions = lazy(() => import("@/pages/admin/AdminSubscriptions"));
const AdminConversations = lazy(() => import("@/pages/admin/AdminConversations"));
const AdminSystem = lazy(() => import("@/pages/admin/AdminSystem"));
const AdminAnnouncements = lazy(() => import("@/pages/admin/AdminAnnouncements"));
const AdminSupport = lazy(() => import("@/pages/admin/AdminSupport"));
const AdminAuditLogs = lazy(() => import("@/pages/admin/AdminAuditLogs"));
const AdminFeatureFlags = lazy(() => import("@/pages/admin/AdminFeatureFlags"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminAnalytics = lazy(() => import("@/pages/admin/AdminAnalytics"));
const AdminVerificationQueue = lazy(() => import("@/pages/admin/AdminVerificationQueue"));
const AdminRevenue = lazy(() => import("@/pages/admin/AdminRevenue"));
const AdminEmailLogs = lazy(() => import("@/pages/admin/AdminEmailLogs"));
const AdminEmployerModeration = lazy(() => import("@/pages/admin/AdminEmployerModeration"));
const AdminDataExport = lazy(() => import("@/pages/admin/AdminDataExport"));
const AdminPricingModeration = lazy(() => import("@/pages/admin/AdminPricingModeration"));
const CustomersPage = lazy(() => import("@/pages/CustomersPage"));
const CertificateExpiryPage = lazy(() => import("@/pages/CertificateExpiryPage"));
const EmployerDashboard = lazy(() => import("@/pages/employer/EmployerDashboard"));
const CollegeDashboard = lazy(() => import("@/pages/college/CollegeDashboard"));
const ElecIdPage = lazy(() => import("@/pages/ElecIdPage"));
const PrivacyPolicy = lazy(() => import("@/pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/legal/TermsOfService"));

// Lazy-loaded route modules
const ApprenticeRoutes = lazy(() => import("@/routes/ApprenticeRoutes"));
const ElectricianHubRoutes = lazy(() => import("@/routes/ElectricianHubRoutes"));
const ElectricianRoutes = lazy(() => import("@/routes/ElectricianRoutes"));
const InspectionRoutes = lazy(() => import("@/routes/InspectionRoutes"));
const StudyCentreRoutes = lazy(() => import("@/routes/StudyCentreRoutes"));
const UpskillingRoutes = lazy(() => import("@/routes/UpskillingRoutes"));

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
      <Route path="/privacy" element={<LazyRoute><PrivacyPolicy /></LazyRoute>} />
      <Route path="/terms" element={<LazyRoute><TermsOfService /></LazyRoute>} />
      <Route path="/quote/:token" element={<LazyRoute><PublicQuote /></LazyRoute>} />
      <Route path="/public-quote/:token" element={<LazyRoute><PublicQuote /></LazyRoute>} />
      <Route path="/pdf-generator" element={<LazyRoute><LaTeXPDFGeneratorPage /></LazyRoute>} />

      {/* Legacy/Direct Access Routes - Redirect to proper paths */}
      <Route path="/rights-and-pay" element={<Navigate to="/apprentice/rights-and-pay" replace />} />

      {/* Main Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<LazyRoute><Dashboard /></LazyRoute>} />
        <Route path="profile" element={<LazyRoute><Profile /></LazyRoute>} />
        <Route path="settings" element={<LazyRoute><Settings /></LazyRoute>} />
        <Route path="notifications" element={<LazyRoute><NotificationsPage /></LazyRoute>} />
        <Route path="customers" element={<LazyRoute><CustomersPage /></LazyRoute>} />
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
          <Route path="subscriptions" element={<LazyRoute><AdminSubscriptions /></LazyRoute>} />
          <Route path="conversations" element={<LazyRoute><AdminConversations /></LazyRoute>} />
          <Route path="announcements" element={<LazyRoute><AdminAnnouncements /></LazyRoute>} />
          <Route path="support" element={<LazyRoute><AdminSupport /></LazyRoute>} />
          <Route path="feature-flags" element={<LazyRoute><AdminFeatureFlags /></LazyRoute>} />
          <Route path="settings" element={<LazyRoute><AdminSettings /></LazyRoute>} />
          <Route path="audit" element={<LazyRoute><AdminAuditLogs /></LazyRoute>} />
          <Route path="emails" element={<LazyRoute><AdminEmailLogs /></LazyRoute>} />
          <Route path="export" element={<LazyRoute><AdminDataExport /></LazyRoute>} />
          <Route path="system" element={<LazyRoute><AdminSystem /></LazyRoute>} />
        </Route>

        {/* Top level routes for shared features */}
        <Route path="mental-health" element={<LazyRoute><ApprenticeMentalHealth /></LazyRoute>} />

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
