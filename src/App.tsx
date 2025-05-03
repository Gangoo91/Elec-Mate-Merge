
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import ElectricianTools from "@/pages/ElectricianTools";
import LandingPage from "@/pages/LandingPage";
import VideoLessons from "@/pages/VideoLessons";
import Leaderboards from "@/pages/Leaderboards";
import ApprenticeHub from "@/pages/ApprenticeHub";
import ApprenticeAITools from "@/pages/apprentice/ApprenticeAITools";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import ApprenticeOJT from "@/pages/apprentice/ApprenticeOJT";
import ApprenticeStudy from "@/pages/apprentice/ApprenticeStudy";
import ApprenticeToolbox from "@/pages/apprentice/ApprenticeToolbox";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import CourseDetail from "@/pages/apprentice/CourseDetail";
import EALCourses from "@/pages/apprentice/EALCourses";
import NotFound from "@/pages/NotFound";
import Subscriptions from "@/pages/Subscriptions";

// Auth pages
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Component imports
import QuizContent from "@/components/apprentice/QuizContent";
import SectionContent from "@/pages/apprentice/SectionContent";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="electrician-tools" element={<ElectricianTools />} />
              <Route path="video-lessons" element={<VideoLessons />} />
              <Route path="leaderboards" element={<Leaderboards />} />
              <Route path="apprentice">
                <Route index element={<Navigate to="/apprentice/hub" replace />} />
                <Route path="hub" element={<ApprenticeHub />} />
                <Route path="ai-tools" element={<ApprenticeAITools />} />
                <Route path="mentor" element={<ApprenticeMentor />} />
                <Route path="ojt" element={<ApprenticeOJT />} />
                <Route path="toolbox" element={<ApprenticeToolbox />} />
                <Route path="mental-health" element={<ApprenticeMentalHealth />} />
                <Route path="study">
                  <Route index element={<ApprenticeStudy />} />
                  <Route path="eal" element={<EALCourses />} />
                  <Route path="eal/:courseSlug" element={<CourseDetail />} />
                  <Route path="eal/:courseSlug/unit/:unitSlug" element={<CourseDetail />} />
                  <Route path="eal/:courseSlug/unit/:unitSlug/quiz" element={<QuizContent />} />
                  <Route path="eal/:courseSlug/unit/:unitSlug/section/:sectionId" element={<SectionContent />} />
                </Route>
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
