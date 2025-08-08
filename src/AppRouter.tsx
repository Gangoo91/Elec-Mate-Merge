
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
import ElectricianTools from "@/pages/ElectricianTools";

import Calculations from "@/pages/electrician-tools/Calculations";
import Admin from "@/pages/electrician-tools/Admin";
import ApprenticeRoutes from "@/routes/ApprenticeRoutes";
import ElectricianHubRoutes from "@/routes/ElectricianHubRoutes";
import ElectricianRoutes from "@/routes/ElectricianRoutes";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import RightsAndPay from "@/pages/apprentice/RightsAndPay";
import NotificationsPage from "@/pages/NotificationsPage";

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
      <Route path="/index" element={<Index />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      
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
        
        {/* Top level routes for shared features */}
        <Route path="mental-health" element={<ApprenticeMentalHealth />} />
        
        {/* Electrician Tools Routes */}
        <Route path="electrician-tools" element={<ElectricianTools />} />
        <Route path="electrician-tools/*" element={<ElectricianRoutes />} />
        
        {/* Legacy Materials Routes -> Redirect to canonical electrician paths */}
        <Route path="materials" element={<LegacyRedirect from="/materials" to="/electrician/materials" />} />
        <Route path="materials/*" element={<LegacyRedirect from="/materials" to="/electrician/materials" />} />
        
        {/* Electrical Hub Routes (legacy -> redirect) */}
        <Route path="electrical-hub" element={<LegacyRedirect from="/electrical-hub" to="/electrician" />} />
        <Route path="electrical-hub/*" element={<LegacyRedirect from="/electrical-hub" to="/electrician" />} />
        {/* Canonical Electrician Hub */}
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
