
import { Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Messenger from "@/pages/Messenger";
import Subscriptions from "@/pages/Subscriptions";
import PaymentSuccess from "@/pages/PaymentSuccess";
import VideoLessons from "@/pages/VideoLessons";
import Leaderboards from "@/pages/Leaderboards";
import NotFound from "@/pages/NotFound";

/**
 * Main application routes
 */
export const mainRoutes = (
  <>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    <Route path="messages" element={<Messenger />} />
    <Route path="subscriptions" element={<Subscriptions />} />
    <Route path="payment-success" element={<PaymentSuccess />} />
    <Route path="video-lessons" element={<VideoLessons />} />
    <Route path="leaderboards" element={<Leaderboards />} />
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </>
);
