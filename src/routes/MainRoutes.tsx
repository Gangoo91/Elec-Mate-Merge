
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

import AppRouter from "@/AppRouter";

// This file is now just a wrapper around AppRouter for backward compatibility
const MainRoutes = () => (
  <AppRouter />
);

export default MainRoutes;
