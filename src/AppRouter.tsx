
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Index from "@/pages/Index";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Messenger from "@/pages/Messenger";
import Subscriptions from "@/pages/Subscriptions";
import PaymentSuccess from "@/pages/PaymentSuccess";
import NotFound from "@/pages/NotFound";
import VideoLessons from "@/pages/VideoLessons";
import Leaderboards from "@/pages/Leaderboards";
import ElectricianTools from "@/pages/ElectricianTools";
import Calculations from "@/pages/electrician-tools/Calculations";
import Admin from "@/pages/electrician-tools/Admin";
import ApprenticeRoutes from "@/routes/ApprenticeRoutes";
import ElectricianHubRoutes from "@/routes/ElectricianHubRoutes";
import ElectricianRoutes from "@/routes/ElectricianRoutes";
import ToolboxTalk from "@/pages/apprentice/ToolboxTalk";
import OnJobTools from "@/pages/apprentice/OnJobTools";
import ApprenticeStudy from "@/pages/apprentice/ApprenticeStudy";
import ApprenticeMentorHub from "@/pages/apprentice/ApprenticeMentor";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import Chat from "@/pages/Chat";
import NotificationsPage from "@/pages/NotificationsPage";
import ApprenticeHub from "@/pages/ApprenticeHub";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/index" element={<Index />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      
      {/* Main Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="messages" element={<Messenger />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        
        {/* Top level routes for shared features */}
        <Route path="chat" element={<Chat />} />
        <Route path="mental-health" element={<ApprenticeMentalHealth />} />
        <Route path="mentor" element={<ApprenticeMentorHub />} />
        
        {/* Video Lessons and Leaderboards */}
        <Route path="videos" element={<VideoLessons />} />
        <Route path="leaderboards" element={<Leaderboards />} />
        
        {/* Electrician Routes */}
        <Route path="electrician-tools" element={<ElectricianTools />} />
        <Route path="electrician-tools/*" element={<ElectricianRoutes />} />
        <Route path="electrical-hub/*" element={<ElectricianHubRoutes />} />
        <Route path="electrician/*" element={<ElectricianHubRoutes />} />
        
        {/* Apprentice Routes */}
        <Route path="apprentice" element={<ApprenticeHub />} />
        <Route path="apprentice/*" element={<ApprenticeRoutes />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
