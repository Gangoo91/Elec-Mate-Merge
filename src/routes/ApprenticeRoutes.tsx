
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
import CrisisResources from "@/pages/apprentice/mental-health/CrisisResources";
import StressManagement from "@/pages/apprentice/mental-health/StressManagement";
import SupportNetwork from "@/pages/apprentice/mental-health/SupportNetwork";
import WorkLifeBalance from "@/pages/apprentice/mental-health/WorkLifeBalance";
import SectionContent from "@/pages/apprentice/SectionContent";
import SubsectionContent from "@/pages/apprentice/SubsectionContent";
import CraftSkillsContent from "@/pages/apprentice/CraftSkillsContent";
import CraftSkillsSubsection from "@/pages/apprentice/CraftSkillsSubsection";
import InstallationMethodContent from "@/pages/apprentice/InstallationMethodContent";

export const ApprenticeRoutes = () => {
  return (
    <>
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
    </>
  );
};
