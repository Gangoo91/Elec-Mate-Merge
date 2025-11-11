
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Index from "@/pages/Index";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Subscriptions from "@/pages/Subscriptions";
import PaymentSuccess from "@/pages/PaymentSuccess";
import NotFound from "@/pages/NotFound";
import ApprenticeRoutes from "@/routes/ApprenticeRoutes";
import ElectricianHubRoutes from "@/routes/ElectricianHubRoutes";
import ElectricianRoutes from "@/routes/ElectricianRoutes";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import RightsAndPay from "@/pages/apprentice/RightsAndPay";
import NotificationsPage from "@/pages/NotificationsPage";
import PublicQuote from "@/pages/PublicQuote";
import LaTeXPDFGeneratorPage from "@/pages/LaTeXPDFGeneratorPage";
import InvoiceQuoteBuilder from "@/pages/electrician/InvoiceQuoteBuilder";
import InvoiceViewPage from "@/pages/electrician/InvoiceViewPage";
import QuoteViewPage from "@/pages/electrician/QuoteViewPage";
import AdminRAGProcessor from "@/pages/AdminRAGProcessor";
import { ConsultationResults } from "@/components/install-planner-v2/ConsultationResults";
import ProcessOnsiteGuide from "@/pages/ProcessOnsiteGuide";
import AutoProcessOnsite from "@/pages/AutoProcessOnsite";
import KnowledgeUploader from "@/pages/Admin/KnowledgeUploader";
import LearningReview from "@/pages/admin/LearningReview";
import CircuitDesigner from "@/pages/electrician-tools/CircuitDesigner";
import EnrichmentMonitor from "@/pages/Admin/EnrichmentMonitor";
import TrueRateCalculatorPage from "@/pages/electrician-tools/TrueRateCalculatorPage";

const LegacyRedirect = ({ from, to }: { from: string; to: string }) => {
  const location = useLocation();
  const suffix = location.pathname.startsWith(from) ? location.pathname.slice(from.length) : "";
  const newPath = `${to}${suffix}${location.search}${location.hash}`;
  return <Navigate to={newPath} replace />;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/process-onsite-now" element={<AutoProcessOnsite />} />
      <Route path="/index" element={<Index />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/quote/:token" element={<PublicQuote />} />
      <Route path="/public-quote/:token" element={<PublicQuote />} />
      <Route path="/pdf-generator" element={<LaTeXPDFGeneratorPage />} />
      
      {/* Legacy/Direct Access Routes - Redirect to proper paths */}
      <Route path="/rights-and-pay" element={<Navigate to="/apprentice/rights-and-pay" replace />} />
      
      {/* Main Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="admin/rag-processor" element={<AdminRAGProcessor />} />
        <Route path="admin/process-onsite-guide" element={<ProcessOnsiteGuide />} />
        <Route path="admin/knowledge-uploader" element={<KnowledgeUploader />} />
        <Route path="admin/learning-review" element={<LearningReview />} />
        <Route path="admin/enrichment" element={<EnrichmentMonitor />} />
        
        {/* Top level routes for shared features */}
        <Route path="mental-health" element={<ApprenticeMentalHealth />} />
        
        {/* Electrician Tools Routes */}
        <Route path="electrician-tools" element={<Navigate to="/electrician" replace />} />
        <Route path="electrician-tools/*" element={<ElectricianRoutes />} />
        <Route path="electrician/circuit-designer" element={<CircuitDesigner />} />
        <Route path="electrician/true-rate-calculator" element={<TrueRateCalculatorPage />} />
        <Route path="install-planner/results/:conversationId" element={<ConsultationResults />} />
        
        {/* Legacy Materials Routes -> Redirect to canonical electrician paths */}
        <Route path="materials" element={<LegacyRedirect from="/materials" to="/electrician/materials" />} />
        <Route path="materials/*" element={<LegacyRedirect from="/materials" to="/electrician/materials" />} />
        
        {/* Electrical Hub Routes (legacy -> redirect) */}
        <Route path="electrical-hub" element={<LegacyRedirect from="/electrical-hub" to="/electrician" />} />
        <Route path="electrical-hub/*" element={<LegacyRedirect from="/electrical-hub" to="/electrician" />} />
        {/* Canonical Electrician Hub */}
        <Route path="electrician/invoice-quote-builder/:quoteId" element={<InvoiceQuoteBuilder />} />
        <Route path="electrician/invoices/:id/view" element={<InvoiceViewPage />} />
        <Route path="electrician/quotes/view/:id" element={<QuoteViewPage />} />
        <Route path="electrician/*" element={<ElectricianHubRoutes />} />
        
        {/* Apprentice Routes */}
        <Route path="apprentice/*" element={<ApprenticeRoutes />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
