
import { Route, Routes } from "react-router-dom";
import ApprenticeHub from "@/pages/ApprenticeHub";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import ApprenticeOJT from "@/pages/apprentice/ApprenticeOJT";
import ApprenticeStudy from "@/pages/apprentice/ApprenticeStudy";
import ApprenticeToolbox from "@/pages/apprentice/ApprenticeToolbox";
import ApprenticeChat from "@/pages/apprentice/ApprenticeChat";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import CareerProgression from "@/pages/apprentice/CareerProgression";
import EALCourses from "@/pages/apprentice/EALCourses";
import HigherLearningCourses from "@/pages/apprentice/HigherLearningCourses";
import CityGuildsCourses from "@/pages/apprentice/CityGuildsCourses";
import OnJobTools from "@/pages/apprentice/OnJobTools";
import OnJobCalculations from "@/pages/apprentice/OnJobCalculations";
import OnJobDocuments from "@/pages/apprentice/OnJobDocuments";
import OnJobAssessment from "@/pages/apprentice/OnJobAssessment";
import OnJobSafetyCases from "@/pages/apprentice/OnJobSafetyCases";
import OnJobWorkplaceCulture from "@/pages/apprentice/OnJobWorkplaceCulture";
import StressManagement from "@/pages/apprentice/mental-health/StressManagement";
import SupportNetwork from "@/pages/apprentice/mental-health/SupportNetwork";
import WorkLifeBalance from "@/pages/apprentice/mental-health/WorkLifeBalance";
import CrisisResources from "@/pages/apprentice/mental-health/CrisisResources";
import ToolsGuide from "@/pages/apprentice/ToolsGuide";
import CommunicationStructures from "@/components/apprentice/resources/CommunicationStructures";
import CommunicationMethods from "@/components/apprentice/resources/CommunicationMethods";
import SafetyMeetings from "@/components/apprentice/resources/SafetyMeetings";
import DocumentationSystems from "@/components/apprentice/resources/DocumentationSystems";
import InspectionTypes from "@/components/apprentice/resources/InspectionTypes";
import InspectionAreas from "@/components/apprentice/resources/InspectionAreas";
import InspectionDocumentation from "@/components/apprentice/resources/InspectionDocumentation";
import InspectionRegulations from "@/components/apprentice/resources/InspectionRegulations";
import AILearning from "@/pages/apprentice/AILearning";
import SafetyFundamentals from "@/pages/apprentice/SafetyFundamentals";
import MockExams from "@/pages/apprentice/MockExams";
import MockExamDetails from "@/pages/apprentice/MockExamDetails";

const ApprenticeRoutes = () => {
  return (
    <Routes>
      <Route index element={<ApprenticeHub />} />
      <Route path="hub" element={<ApprenticeHub />} />
      <Route path="chat" element={<ApprenticeChat />} />
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
      <Route path="on-job-tools/safety-cases" element={<OnJobSafetyCases />} />
      <Route path="on-job-tools/workplace-culture" element={<OnJobWorkplaceCulture />} />
      <Route path="safety-fundamentals" element={<SafetyFundamentals />} />
      
      <Route path="study">
        <Route index element={<ApprenticeStudy />} />
        <Route path="ai-learning" element={<AILearning />} />
        <Route path="mock-exams" element={<MockExams />} />
        <Route path="mock-exams/:examId" element={<MockExamDetails />} />
        <Route path="eal" element={<EALCourses />} />
        <Route path="cityGuilds" element={<CityGuildsCourses />} />
        <Route path="higher" element={<HigherLearningCourses />} />
        
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
    </Routes>
  );
};

export default ApprenticeRoutes;
