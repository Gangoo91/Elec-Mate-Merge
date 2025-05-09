
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Leaderboards from "@/pages/Leaderboards";
import Subscriptions from "@/pages/Subscriptions";
import VideoLessons from "@/pages/VideoLessons";
import Messenger from "@/pages/Messenger";

export const MainRoutes = () => {
  return (
    <>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      
      <Route path="/leaderboards" element={
        <ProtectedRoute>
          <Leaderboards />
        </ProtectedRoute>
      } />
      
      <Route path="/subscriptions" element={
        <ProtectedRoute>
          <Subscriptions />
        </ProtectedRoute>
      } />
      
      <Route path="/video-lessons" element={
        <ProtectedRoute>
          <VideoLessons />
        </ProtectedRoute>
      } />
      
      <Route path="/messenger" element={
        <ProtectedRoute>
          <Messenger />
        </ProtectedRoute>
      } />
    </>
  );
};
