
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import PaymentSuccess from "./pages/PaymentSuccess";
import LandingPage from "./pages/LandingPage";
import VideoLessons from "./pages/VideoLessons";
import Leaderboards from "./pages/Leaderboards";
import ApprenticeHub from "./pages/ApprenticeHub";
import ApprenticeAITools from "./pages/apprentice/ApprenticeAITools";
import ApprenticeMentor from "./pages/apprentice/ApprenticeMentor";
import ApprenticeOJT from "./pages/apprentice/ApprenticeOJT";
import ApprenticeStudy from "./pages/apprentice/ApprenticeStudy";
import ApprenticeToolbox from "./pages/apprentice/ApprenticeToolbox";
import ApprenticeMentalHealth from "./pages/apprentice/ApprenticeMentalHealth";
import CareerProgression from "./pages/apprentice/CareerProgression";
import CourseDetail from "./pages/apprentice/CourseDetail";
import EALCourses from "./pages/apprentice/EALCourses";
import OnJobTools from "./pages/apprentice/OnJobTools";
import OnJobCalculations from "./pages/apprentice/OnJobCalculations";
import OnJobDocuments from "./pages/apprentice/OnJobDocuments";
import OnJobAssessment from "./pages/apprentice/OnJobAssessment";
import StressManagement from "./pages/apprentice/mental-health/StressManagement";
import SupportNetwork from "./pages/apprentice/mental-health/SupportNetwork";
import WorkLifeBalance from "./pages/apprentice/mental-health/WorkLifeBalance";
import CrisisResources from "./pages/apprentice/mental-health/CrisisResources";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ElectricianTools from "./pages/ElectricianTools";
import ElectricalHub from "./pages/ElectricalHub";
import ElectricalToolboxTalk from "./pages/electrician/ElectricalToolboxTalk";
import ElectricalChat from "./pages/electrician/ElectricalChat";
import JobVacancies from "./pages/electrician/JobVacancies";
import ElectricalMaterials from "./pages/electrician/ElectricalMaterials";
import ElectricalTools from "./pages/electrician/ElectricalTools";
import SafetyShares from "./pages/electrician/SafetyShares";
import LivePricing from "./pages/electrician/LivePricing";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { NotificationProvider } from "@/components/notifications/NotificationProvider";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Messenger from "./pages/Messenger";

// Component imports
import QuizContent from "./components/apprentice/QuizContent";
import SectionContent from "./pages/apprentice/SectionContent";
import SubsectionContent from "./pages/apprentice/SubsectionContent";
import InstallationMethodContent from "./pages/apprentice/InstallationMethodContent";

// New craft skills content components
import CraftSkillsContent from "./pages/apprentice/CraftSkillsContent";
import CraftSkillsSubsection from "./pages/apprentice/CraftSkillsSubsection";

// Import new resource pages
import CommunicationStructures from "./components/apprentice/resources/CommunicationStructures";
import CommunicationMethods from "./components/apprentice/resources/CommunicationMethods";
import SafetyMeetings from "./components/apprentice/resources/SafetyMeetings";
import DocumentationSystems from "./components/apprentice/resources/DocumentationSystems";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="messages" element={<Messenger />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="payment-success" element={<PaymentSuccess />} />
                <Route path="electrician-tools" element={<ElectricianTools />} />
                <Route path="electrical-hub" element={<ElectricalHub />} />
                <Route path="electrician" element={<Navigate to="/electrical-hub" replace />} />
                <Route path="electrician/toolbox-talk" element={<ElectricalToolboxTalk />} />
                <Route path="electrician/chat" element={<ElectricalChat />} />
                <Route path="electrician/job-vacancies" element={<JobVacancies />} />
                <Route path="electrician/materials" element={<ElectricalMaterials />} />
                <Route path="electrician/tools" element={<ElectricalTools />} />
                <Route path="electrician/safety-shares" element={<SafetyShares />} />
                <Route path="electrician/live-pricing" element={<LivePricing />} />
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
                  <Route path="mental-health/stress-management" element={<StressManagement />} />
                  <Route path="mental-health/support-network" element={<SupportNetwork />} />
                  <Route path="mental-health/work-life-balance" element={<WorkLifeBalance />} />
                  <Route path="mental-health/crisis-resources" element={<CrisisResources />} />
                  <Route path="career-progression" element={<CareerProgression />} />
                  <Route path="on-job-tools" element={<OnJobTools />} />
                  <Route path="on-job-tools/calculations" element={<OnJobCalculations />} />
                  <Route path="on-job-tools/documents" element={<OnJobDocuments />} />
                  <Route path="on-job-tools/assessment" element={<OnJobAssessment />} />
                  <Route path="study">
                    <Route index element={<ApprenticeStudy />} />
                    <Route path="eal" element={<EALCourses />} />
                    <Route path="eal/:courseSlug" element={<CourseDetail />} />
                    <Route path="eal/:courseSlug/unit/:unitSlug" element={<CourseDetail />} />
                    <Route path="eal/:courseSlug/unit/:unitSlug/quiz" element={<QuizContent />} />
                    
                    {/* Updated route paths for electrical theory sections */}
                    <Route path="eal/:courseSlug/unit/:unitSlug/section/:sectionId" element={<SectionContent />} />
                    <Route path="eal/:courseSlug/unit/:unitSlug/section/:sectionId/subsection/:subsectionId" element={<SubsectionContent />} />
                    
                    {/* Installation method routes */}
                    <Route path="eal/:courseSlug/unit/:unitSlug/installation-method/:sectionId" element={<InstallationMethodContent />} />
                    <Route path="eal/:courseSlug/unit/:unitSlug/installation-method/:sectionId/subsection/:subsectionId" element={<SubsectionContent />} />
                    
                    {/* Craft skills routes */}
                    <Route path="eal/:courseSlug/unit/:unitSlug/craft-skills/:sectionId" element={<CraftSkillsContent />} />
                    <Route path="eal/:courseSlug/unit/:unitSlug/craft-skills/:sectionId/subsection/:subsectionId" element={<CraftSkillsSubsection />} />
                    
                    {/* Resource pages */}
                    <Route path="resources/communication-structures" element={<CommunicationStructures />} />
                    <Route path="resources/communication-methods" element={<CommunicationMethods />} />
                    <Route path="resources/safety-meetings" element={<SafetyMeetings />} />
                    <Route path="resources/documentation-systems" element={<DocumentationSystems />} />
                  </Route>
                </Route>

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Toaster />
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
