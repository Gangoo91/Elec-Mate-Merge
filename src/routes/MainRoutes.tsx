
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import ElectricalHub from "@/pages/ElectricalHub";
import PaymentSuccess from "@/pages/PaymentSuccess";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminSettings from "@/pages/admin/Settings";
import AdminUsers from "@/pages/admin/Users";
import QuoteLibrary from "@/pages/admin/QuoteLibrary";

const ApprenticeRoutes = lazy(() => import("@/routes/ApprenticeRoutes"));
const ElectricianRoutes = lazy(() => import("@/routes/ElectricianRoutes"));

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />

    <Route path="/" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="electrical-hub" element={<ElectricalHub />} />
      <Route path="payment/success" element={<PaymentSuccess />} />

      {/* Admin Routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="quote-library" element={<QuoteLibrary />} />
      </Route>
      
      {/* Add direct access to quote library from electrician tools */}
      <Route path="electrician-tools/quote-library" element={<QuoteLibrary />} />

      <Route path="apprentice/*" element={<ApprenticeRoutes />} />
      <Route path="electrician-tools/*" element={<ElectricianRoutes />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default MainRoutes;
