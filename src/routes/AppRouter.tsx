
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import PaymentSuccess from "@/pages/PaymentSuccess";
import { MainRoutes } from "./MainRoutes";
import { ElectricianRoutes } from "./ElectricianRoutes";
import { ApprenticeRoutes } from "./ApprenticeRoutes";
import { ElectricianToolsRoutes } from "./ElectricianToolsRoutes";
import { AdminRoutes } from "./AdminRoutes";
import NotFound from "@/pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      
      {/* Protected routes with layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/electrician" replace />} />
        
        {/* Main routes */}
        <Route>
          <MainRoutes />
        </Route>
        
        {/* Electrician routes */}
        <Route>
          <ElectricianRoutes />
        </Route>
        
        {/* Electrician tools routes */}
        <Route>
          <ElectricianToolsRoutes />
        </Route>
        
        {/* Apprentice routes */}
        <Route>
          <ApprenticeRoutes />
        </Route>
        
        {/* Admin routes */}
        <Route>
          <AdminRoutes />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
