
import React from 'react';
import { Route, Navigate } from "react-router-dom";
import VideoLessons from "@/pages/VideoLessons";
import Leaderboards from "@/pages/Leaderboards";
import ApprenticeHub from "@/pages/ApprenticeHub";
import ApprenticeAITools from "@/pages/apprentice/ApprenticeAITools";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import ApprenticeOJT from "@/pages/apprentice/ApprenticeOJT";
import ApprenticeStudy from "@/pages/apprentice/ApprenticeStudy";
import ApprenticeToolbox from "@/pages/apprentice/ApprenticeToolbox";
import ApprenticeChat from "@/pages/apprentice/ApprenticeChat";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import CareerProgression from "@/pages/apprentice/CareerProgression";
import CourseDetail from "@/pages/apprentice/CourseDetail";
import EALCourses from "@/pages/apprentice/EALCourses";
import CityGuildsCourses from "@/pages/apprentice/CityGuildsCourses";
import OnJobTools from "@/pages/apprentice/OnJobTools";
import OnJobCalculations from "@/pages/apprentice/OnJobCalculations";
import OnJobDocuments from "@/pages/apprentice/OnJobDocuments";
import OnJobAssessment from "@/pages/apprentice/OnJobAssessment";
import StressManagement from "@/pages/apprentice/mental-health/StressManagement";
import SupportNetwork from "@/pages/apprentice/mental-health/SupportNetwork";
import WorkLifeBalance from "@/pages/apprentice/mental-health/WorkLifeBalance";
import CrisisResources from "@/pages/apprentice/mental-health/CrisisResources";
import ToolsGuide from "@/pages/apprentice/ToolsGuide";
import QuizContent from "@/components/apprentice/QuizContent";
import SectionContent from "@/pages/apprentice/SectionContent";
import SubsectionContent from "@/pages/apprentice/SubsectionContent";
import CraftSkillsContent from "@/pages/apprentice/CraftSkillsContent";
import CraftSkillsSubsection from "@/pages/apprentice/CraftSkillsSubsection";
import InstallationMethodContent from "@/pages/apprentice/InstallationMethodContent";

// Resource components
import CommunicationStructures from "@/components/apprentice/resources/CommunicationStructures";
import CommunicationMethods from "@/components/apprentice/resources/CommunicationMethods";
import SafetyMeetings from "@/components/apprentice/resources/SafetyMeetings";
import DocumentationSystems from "@/components/apprentice/resources/DocumentationSystems";
import InspectionTypes from "@/components/apprentice/resources/InspectionTypes";
import InspectionAreas from "@/components/apprentice/resources/InspectionAreas";
import InspectionDocumentation from "@/components/apprentice/resources/InspectionDocumentation";
import InspectionRegulations from "@/components/apprentice/resources/InspectionRegulations";

const ApprenticeRoutes = () => (
  <React.Fragment>
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
        <Route path="cityGuilds" element={<CityGuildsCourses />} />
        <Route path="eal/:courseSlug" element={<CourseDetail />} />
        <Route path="eal/:courseSlug/unit/:unitSlug" element={<CourseDetail />} />
        <Route path="eal/:courseSlug/unit/:unitSlug/quiz" element={<QuizContent />} />
        <Route path="cityGuilds/:courseSlug" element={<CourseDetail />} />
        
        {/* Section and subsection routes */}
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
        <Route path="resources/inspection-types" element={<InspectionTypes />} />
        <Route path="resources/inspection-areas" element={<InspectionAreas />} />
        <Route path="resources/inspection-documentation" element={<InspectionDocumentation />} />
        <Route path="resources/inspection-regulations" element={<InspectionRegulations />} />
      </Route>
    </Route>
  </React.Fragment>
);

export default ApprenticeRoutes;
