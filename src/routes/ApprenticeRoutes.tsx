
import { Route, Routes } from "react-router-dom";
import ApprenticeHub from "@/pages/ApprenticeHub";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import RightsAndPay from "@/pages/apprentice/RightsAndPay";
import WorkLifeBalance from "@/pages/apprentice/mental-health/WorkLifeBalance";
import MentalHealthResources from "@/pages/apprentice/mental-health/MentalHealthResources";
import OnJobTools from "@/pages/apprentice/OnJobTools";
import OnJobCalculations from "@/pages/apprentice/OnJobCalculations";
import OnJobDocuments from "@/pages/apprentice/OnJobDocuments";
import OnJobSafetyCases from "@/pages/apprentice/OnJobSafetyCases";
import OnJobWorkplaceCulture from "@/pages/apprentice/OnJobWorkplaceCulture";
import TestingProcedures from "@/pages/apprentice/TestingProcedures";
import OnJobAssessment from "@/pages/apprentice/OnJobAssessment";
import OnJobBS7671RunThrough from "@/pages/apprentice/OnJobBS7671RunThrough";
import OnJobSupervisorKnowledge from "@/pages/apprentice/OnJobSupervisorKnowledge";
import OnJobFlashcards from "@/pages/apprentice/OnJobFlashcards";
import OnJobIncidentLogging from "@/pages/apprentice/OnJobIncidentLogging";

const ApprenticeRoutes = () => (
  <Routes>
    <Route index element={<ApprenticeHub />} />
    <Route path="mental-health" element={<ApprenticeMentalHealth />} />
    <Route path="mental-health/work-life-balance" element={<WorkLifeBalance />} />
    <Route path="mental-health/resources" element={<MentalHealthResources />} />
    <Route path="mentor" element={<ApprenticeMentor />} />
    <Route path="rights-and-pay" element={<RightsAndPay />} />
    <Route path="on-job-tools" element={<OnJobTools />} />
    <Route path="on-job-tools/calculations" element={<OnJobCalculations />} />
    <Route path="on-job-tools/documents" element={<OnJobDocuments />} />
    <Route path="on-job-tools/assessment" element={<OnJobAssessment />} />
    <Route path="on-job-tools/safety-cases" element={<OnJobSafetyCases />} />
    <Route path="on-job-tools/workplace-culture" element={<OnJobWorkplaceCulture />} />
    <Route path="on-job-tools/testing-procedures" element={<TestingProcedures />} />
    <Route path="on-job-tools/bs7671-runthrough" element={<OnJobBS7671RunThrough />} />
    <Route path="on-job-tools/supervisor-knowledge" element={<OnJobSupervisorKnowledge />} />
    <Route path="on-job-tools/flashcards" element={<OnJobFlashcards />} />
    <Route path="on-job-tools/incident-logging" element={<OnJobIncidentLogging />} />
  </Routes>
);

export default ApprenticeRoutes;
