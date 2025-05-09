
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Leaderboards from "@/pages/Leaderboards";
import Subscriptions from "@/pages/Subscriptions";
import VideoLessons from "@/pages/VideoLessons";
import Messenger from "@/pages/Messenger";
import NotFound from "@/pages/NotFound";
import PaymentSuccess from "@/pages/PaymentSuccess";

// Admin
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminSettings from "@/pages/admin/Settings";
import AdminLayout from "@/components/admin/AdminLayout";

// Electrician
import ElectricalHub from "@/pages/ElectricalHub";
import ElectricalMaterials from "@/pages/electrician/ElectricalMaterials";
import SupplierMaterials from "@/pages/electrician/SupplierMaterials";
import LivePricing from "@/pages/electrician/LivePricing";
import JobVacancies from "@/pages/electrician/JobVacancies";
import ElectricalChat from "@/pages/electrician/ElectricalChat";
import ElectricalTools from "@/pages/electrician/ElectricalTools";
import ElectricalToolboxTalk from "@/pages/electrician/ElectricalToolboxTalk";
import ElectricianMentalHealth from "@/pages/electrician/ElectricianMentalHealth";
import MentorConnect from "@/pages/electrician/MentorConnect";
import SafetyShares from "@/pages/electrician/SafetyShares";
import SafetyAlerts from "@/pages/electrician/safety-shares/SafetyAlerts";
import IndustryNews from "@/pages/electrician/safety-shares/IndustryNews";
import LearningFromExperience from "@/pages/electrician/safety-shares/LearningFromExperience";
import MajorProjects from "@/pages/electrician/safety-shares/MajorProjects";
import SafetyResources from "@/pages/electrician/safety-shares/SafetyResources";
import ElectricianWorkLifeBalance from "@/pages/electrician/mental-health/WorkLifeBalance";

// Electrician Tools
import ElectricianTools from "@/pages/electrician-tools/Calculations";
import ProjectManagement from "@/pages/electrician-tools/ProjectManagement";
import AITooling from "@/pages/electrician-tools/AITooling";
import Admin from "@/pages/electrician-tools/Admin";
import Calculations from "@/pages/electrician-tools/Calculations";

// Apprentice
import ApprenticeHub from "@/pages/ApprenticeHub";
import ApprenticeStudy from "@/pages/apprentice/ApprenticeStudy";
import EALCourses from "@/pages/apprentice/EALCourses";
import EALLevel3Courses from "@/pages/apprentice/EALLevel3Courses";
import CityGuildsCourses from "@/pages/apprentice/CityGuildsCourses";
import CourseDetail from "@/pages/apprentice/CourseDetail";
import ApprenticeChat from "@/pages/apprentice/ApprenticeChat";
import ApprenticeOJT from "@/pages/apprentice/ApprenticeOJT";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import ApprenticeToolbox from "@/pages/apprentice/ApprenticeToolbox";
import ToolsGuide from "@/pages/apprentice/ToolsGuide";
import ApprenticeAITools from "@/pages/apprentice/ApprenticeAITools";
import CareerProgression from "@/pages/apprentice/CareerProgression";
import OnJobTools from "@/pages/apprentice/OnJobTools";
import OnJobCalculations from "@/pages/apprentice/OnJobCalculations";
import OnJobDocuments from "@/pages/apprentice/OnJobDocuments";
import OnJobAssessment from "@/pages/apprentice/OnJobAssessment";

// Mental Health
import CrisisResources from "@/pages/apprentice/mental-health/CrisisResources";
import StressManagement from "@/pages/apprentice/mental-health/StressManagement";
import SupportNetwork from "@/pages/apprentice/mental-health/SupportNetwork";
import WorkLifeBalance from "@/pages/apprentice/mental-health/WorkLifeBalance";

// Section and Subsection
import SectionContent from "@/pages/apprentice/SectionContent";
import SubsectionContent from "@/pages/apprentice/SubsectionContent";
import CraftSkillsContent from "@/pages/apprentice/CraftSkillsContent";
import CraftSkillsSubsection from "@/pages/apprentice/CraftSkillsSubsection";
import InstallationMethodContent from "@/pages/apprentice/InstallationMethodContent";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="elecforce-theme">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          
          {/* Main layout with protected routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/electrician" replace />} />
            
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
            
            {/* Electrician Routes */}
            <Route path="/electrician" element={
              <ProtectedRoute>
                <ElectricalHub />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/materials" element={
              <ProtectedRoute>
                <ElectricalMaterials />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/suppliers" element={
              <ProtectedRoute>
                <SupplierMaterials />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/pricing" element={
              <ProtectedRoute>
                <LivePricing />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/jobs" element={
              <ProtectedRoute>
                <JobVacancies />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/chat" element={
              <ProtectedRoute>
                <ElectricalChat />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/tools" element={
              <ProtectedRoute>
                <ElectricalTools />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/toolbox" element={
              <ProtectedRoute>
                <ElectricalToolboxTalk />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/mental-health" element={
              <ProtectedRoute>
                <ElectricianMentalHealth />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/mental-health/work-life-balance" element={
              <ProtectedRoute>
                <ElectricianWorkLifeBalance />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/mentor" element={
              <ProtectedRoute>
                <MentorConnect />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/safety" element={
              <ProtectedRoute>
                <SafetyShares />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/safety/alerts" element={
              <ProtectedRoute>
                <SafetyAlerts />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/safety/news" element={
              <ProtectedRoute>
                <IndustryNews />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/safety/learning" element={
              <ProtectedRoute>
                <LearningFromExperience />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/safety/projects" element={
              <ProtectedRoute>
                <MajorProjects />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician/safety/resources" element={
              <ProtectedRoute>
                <SafetyResources />
              </ProtectedRoute>
            } />
            
            {/* Electrician Tools Routes */}
            <Route path="/electrician-tools" element={
              <ProtectedRoute>
                <ElectricianTools />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician-tools/project-management" element={
              <ProtectedRoute>
                <ProjectManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician-tools/ai" element={
              <ProtectedRoute>
                <AITooling />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician-tools/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            
            <Route path="/electrician-tools/calculations" element={
              <ProtectedRoute>
                <Calculations />
              </ProtectedRoute>
            } />
            
            {/* Apprentice Routes */}
            <Route path="/apprentice" element={
              <ProtectedRoute>
                <ApprenticeHub />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/study" element={
              <ProtectedRoute>
                <ApprenticeStudy />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/study/eal" element={
              <ProtectedRoute>
                <EALCourses />
              </ProtectedRoute>
            } />

            <Route path="/apprentice/study/eal-level3" element={
              <ProtectedRoute>
                <EALLevel3Courses />
              </ProtectedRoute>
            } />

            <Route path="/apprentice/study/eal-level3/:courseId" element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            } />

            <Route path="/apprentice/study/cityGuilds" element={
              <ProtectedRoute>
                <CityGuildsCourses />
              </ProtectedRoute>
            } />

            <Route path="/apprentice/study/cityGuilds/:courseId" element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/study/:category/:courseId" element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/chat" element={
              <ProtectedRoute>
                <ApprenticeChat />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/ojt" element={
              <ProtectedRoute>
                <ApprenticeOJT />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/mental-health" element={
              <ProtectedRoute>
                <ApprenticeMentalHealth />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/mental-health/crisis" element={
              <ProtectedRoute>
                <CrisisResources />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/mental-health/stress" element={
              <ProtectedRoute>
                <StressManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/mental-health/support" element={
              <ProtectedRoute>
                <SupportNetwork />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/mental-health/work-life-balance" element={
              <ProtectedRoute>
                <WorkLifeBalance />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/mentor" element={
              <ProtectedRoute>
                <ApprenticeMentor />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/toolbox" element={
              <ProtectedRoute>
                <ApprenticeToolbox />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/tools-guide" element={
              <ProtectedRoute>
                <ToolsGuide />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/ai-tools" element={
              <ProtectedRoute>
                <ApprenticeAITools />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/career" element={
              <ProtectedRoute>
                <CareerProgression />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/job-tools" element={
              <ProtectedRoute>
                <OnJobTools />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/job-calculations" element={
              <ProtectedRoute>
                <OnJobCalculations />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/job-documents" element={
              <ProtectedRoute>
                <OnJobDocuments />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/job-assessment" element={
              <ProtectedRoute>
                <OnJobAssessment />
              </ProtectedRoute>
            } />
            
            {/* Section and Subsection Routes */}
            <Route path="/apprentice/section/:sectionId" element={
              <ProtectedRoute>
                <SectionContent />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/section/:sectionId/subsection/:subsectionId" element={
              <ProtectedRoute>
                <SubsectionContent />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/craft-skills/:unitId" element={
              <ProtectedRoute>
                <CraftSkillsContent />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/craft-skills/:unitId/subsection/:sectionId" element={
              <ProtectedRoute>
                <CraftSkillsSubsection />
              </ProtectedRoute>
            } />
            
            <Route path="/apprentice/installation-methods/:unitId" element={
              <ProtectedRoute>
                <InstallationMethodContent />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
