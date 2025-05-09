
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
import ApprenticeChat from "./pages/apprentice/ApprenticeChat";
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
import ElectricianMentalHealth from "./pages/electrician/ElectricianMentalHealth";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ElectricianTools from "./pages/ElectricianTools";
import ProjectManagement from "./pages/electrician-tools/ProjectManagement";
import AITooling from "./pages/electrician-tools/AITooling";
import Calculations from "./pages/electrician-tools/Calculations";
import Admin from "./pages/electrician-tools/Admin";
import ElectricalHub from "./pages/ElectricalHub";
import ElectricalToolboxTalk from "./pages/electrician/ElectricalToolboxTalk";
import ElectricalChat from "./pages/electrician/ElectricalChat";
import JobVacancies from "./pages/electrician/JobVacancies";
import ElectricalMaterials from "./pages/electrician/ElectricalMaterials";
import SupplierMaterials from "./pages/electrician/SupplierMaterials";
import ElectricalTools from "./pages/electrician/ElectricalTools";
import MentorConnect from "./pages/electrician/MentorConnect";
import SafetyShares from "./pages/electrician/SafetyShares";
import SafetyAlerts from "./pages/electrician/safety-shares/SafetyAlerts";
import LearningFromExperience from "./pages/electrician/safety-shares/LearningFromExperience";
import MajorProjects from "./pages/electrician/safety-shares/MajorProjects";
import IndustryNews from "./pages/electrician/safety-shares/IndustryNews";
import SafetyResources from "./pages/electrician/safety-shares/SafetyResources";
import LivePricing from "./pages/electrician/LivePricing";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { NotificationProvider } from "@/components/notifications/NotificationProvider";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Messenger from "./pages/Messenger";
import Index from "./pages/Index";
import ToolsGuide from "./pages/apprentice/ToolsGuide";

// Component imports
import QuizContent from "./components/apprentice/QuizContent";
import SectionContent from "./pages/apprentice/SectionContent";
import SubsectionContent from "./pages/apprentice/SubsectionContent";
import InstallationMethodContent from "./pages/apprentice/InstallationMethodContent";

// New craft skills content components
import CraftSkillsContent from "./pages/apprentice/CraftSkillsContent";
import CraftSkillsSubsection from "./pages/apprentice/CraftSkillsSubsection";

// Import resource pages
import CommunicationStructures from "./components/apprentice/resources/CommunicationStructures";
import CommunicationMethods from "./components/apprentice/resources/CommunicationMethods";
import SafetyMeetings from "./components/apprentice/resources/SafetyMeetings";
import DocumentationSystems from "./components/apprentice/resources/DocumentationSystems";
import InspectionTypes from "./components/apprentice/resources/InspectionTypes";
import InspectionAreas from "./components/apprentice/resources/InspectionAreas";
import InspectionDocumentation from "./components/apprentice/resources/InspectionDocumentation";
import InspectionRegulations from "./components/apprentice/resources/InspectionRegulations";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/index" element={<Index />} />
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
                <Route path="electrician-tools/project-management" element={<ProjectManagement />} />
                <Route path="electrician-tools/project-management/project/:projectId" element={<ProjectManagement />} />
                <Route path="electrician-tools/ai-tooling" element={<AITooling />} />
                <Route path="electrician-tools/calculations" element={<Calculations />} />
                <Route path="electrician-tools/admin" element={<Admin />} />
                <Route path="electrical-hub" element={<ElectricalHub />} />
                <Route path="electrician" element={<Navigate to="/electrical-hub" replace />} />
                <Route path="electrician/toolbox-talk" element={<ElectricalToolboxTalk />} />
                <Route path="electrician/mentor-connect" element={<MentorConnect />} />
                <Route path="electrician/chat" element={<ElectricalChat />} />
                <Route path="electrician/job-vacancies" element={<JobVacancies />} />
                <Route path="electrician/materials" element={<ElectricalMaterials />} />
                <Route path="electrician/suppliers/:supplierSlug" element={<SupplierMaterials />} />
                <Route path="electrician/tools" element={<ElectricalTools />} />
                <Route path="electrician/safety-shares" element={<SafetyShares />} />
                <Route path="electrician/safety-shares/alerts" element={<SafetyAlerts />} />
                <Route path="electrician/safety-shares/lfe" element={<LearningFromExperience />} />
                <Route path="electrician/safety-shares/projects" element={<MajorProjects />} />
                <Route path="electrician/safety-shares/news" element={<IndustryNews />} />
                <Route path="electrician/safety-shares/resources" element={<SafetyResources />} />
                <Route path="electrician/live-pricing" element={<LivePricing />} />
                
                {/* Electrician Mental Health routes */}
                <Route path="electrician/mental-health" element={<ElectricianMentalHealth />} />
                <Route path="electrician/mental-health/stress-management" element={<StressManagement />} />
                <Route path="electrician/mental-health/support-network" element={<SupportNetwork />} />
                <Route path="electrician/mental-health/work-life-balance" element={<WorkLifeBalance />} />
                <Route path="electrician/mental-health/crisis-resources" element={<CrisisResources />} />
                
                <Route path="video-lessons" element={<VideoLessons />} />
                <Route path="leaderboards" element={<Leaderboards />} />
                <Route path="apprentice">
                  <Route index element={<Navigate to="/apprentice/hub" replace />} />
                  <Route path="hub" element={<ApprenticeHub />} />
                  <Route path="chat" element={<ApprenticeChat />} />
                  <Route path="ai-tools" element={<ApprenticeAITools />} />
                  <Route path="mentor" element={<ApprenticeMentor />} />
                  <Route path="ojt" element={<ApprenticeOJT />} />
                  <Route path="toolbox" element={<ApprenticeToolbox />} />
                  <Route path="tools-guide" element={<ToolsGuide />} />
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
                    
                    {/* Resource pages for Subsection 2.3 */}
                    <Route path="resources/communication-structures" element={<CommunicationStructures />} />
                    <Route path="resources/communication-methods" element={<CommunicationMethods />} />
                    <Route path="resources/safety-meetings" element={<SafetyMeetings />} />
                    <Route path="resources/documentation-systems" element={<DocumentationSystems />} />
                    
                    {/* Resource pages for Subsection 2.1 */}
                    <Route path="resources/inspection-types" element={<InspectionTypes />} />
                    <Route path="resources/inspection-areas" element={<InspectionAreas />} />
                    <Route path="resources/inspection-documentation" element={<InspectionDocumentation />} />
                    <Route path="resources/inspection-regulations" element={<InspectionRegulations />} />
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
