
import { Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { mainRoutes } from "./mainRoutes";
import { apprenticeRoutes } from "./apprenticeRoutes";
import { electricianRoutes } from "./electricianRoutes";
import { authRoutes } from "./authRoutes";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LandingPage from "@/pages/LandingPage";
import Index from "@/pages/Index";

/**
 * Root routes component that combines all route modules
 */
export const AppRoutes = () => {
  return (
    <>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/index" element={<Index />} />
      
      {/* Auth Routes */}
      {authRoutes}
      
      {/* Protected Routes with Layout */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        {/* Main Routes */}
        {mainRoutes}
        
        {/* Electrician Routes */}
        {electricianRoutes}
        
        {/* Apprentice Routes */}
        {apprenticeRoutes}
      </Route>
    </>
  );
};
