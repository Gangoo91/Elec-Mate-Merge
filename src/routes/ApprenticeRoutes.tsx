
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
import ApprenticeToolbox from "@/pages/apprentice/ApprenticeToolbox";
import ProfessionalDevelopment from "@/pages/apprentice/ProfessionalDevelopment";
import CareerPathways from "@/pages/apprentice/professional-development/CareerPathways";
import Certifications from "@/pages/apprentice/professional-development/Certifications";
import ContinuingEducation from "@/pages/apprentice/professional-development/ContinuingEducation";
import IndustryNetworking from "@/pages/apprentice/professional-development/IndustryNetworking";
import ToolsGuide from "@/pages/apprentice/toolbox/ToolsGuide";
import ElectricalInstallationGuides from "@/pages/apprentice/toolbox/ElectricalInstallationGuides";
import ApprenticeshipExpectations from "@/pages/apprentice/toolbox/ApprenticeshipExpectations";
import OffJobTrainingGuide from "@/pages/apprentice/toolbox/OffJobTrainingGuide";
import SiteJargon from "@/pages/apprentice/toolbox/SiteJargon";
import PortfolioBuilding from "@/pages/apprentice/toolbox/PortfolioBuilding";
import CommunicationSkills from "@/pages/apprentice/toolbox/CommunicationSkills";
import StudyTips from "@/pages/apprentice/toolbox/StudyTips";
import LearningFromMistakes from "@/pages/apprentice/toolbox/LearningFromMistakes";
import SafetyFundamentals from "@/pages/apprentice/toolbox/SafetyFundamentals";
import DomesticInstallations from "@/pages/apprentice/DomesticInstallations";
import CommercialInstallations from "@/pages/apprentice/toolbox/CommercialInstallations";
import IndustrialInstallations from "@/pages/apprentice/toolbox/IndustrialInstallations";
import OutdoorInstallations from "@/pages/apprentice/toolbox/OutdoorInstallations";

const ApprenticeRoutes = () => (
  <Routes>
    <Route index element={<ApprenticeHub />} />
    <Route path="mental-health" element={<ApprenticeMentalHealth />} />
    <Route path="mental-health/work-life-balance" element={<WorkLifeBalance />} />
    <Route path="mental-health/resources" element={<MentalHealthResources />} />
    <Route path="mentor" element={<ApprenticeMentor />} />
    <Route path="rights-and-pay" element={<RightsAndPay />} />
    <Route path="toolbox" element={<ApprenticeToolbox />} />
    <Route path="toolbox/tools-guide" element={<ToolsGuide />} />
    <Route path="toolbox/electrical-installation-guides" element={<ElectricalInstallationGuides />} />
    <Route path="toolbox/electrical-installation-guides/domestic" element={<DomesticInstallations />} />
    <Route path="toolbox/electrical-installation-guides/commercial" element={<CommercialInstallations />} />
    <Route path="toolbox/electrical-installation-guides/industrial" element={<IndustrialInstallations />} />
    <Route path="toolbox/electrical-installation-guides/outdoor" element={<OutdoorInstallations />} />
    <Route path="toolbox/apprenticeship-expectations" element={<ApprenticeshipExpectations />} />
    <Route path="toolbox/off-job-training-guide" element={<OffJobTrainingGuide />} />
    <Route path="toolbox/site-jargon" element={<SiteJargon />} />
    <Route path="toolbox/portfolio-building" element={<PortfolioBuilding />} />
    <Route path="toolbox/communication-skills" element={<CommunicationSkills />} />
    <Route path="toolbox/study-tips" element={<StudyTips />} />
    <Route path="toolbox/learning-from-mistakes" element={<LearningFromMistakes />} />
    <Route path="toolbox/safety-fundamentals" element={<SafetyFundamentals />} />
    <Route path="professional-development" element={<ProfessionalDevelopment />} />
    <Route path="professional-development/career-pathways" element={<CareerPathways />} />
    <Route path="professional-development/certifications" element={<Certifications />} />
    <Route path="professional-development/continuing-education" element={<ContinuingEducation />} />
    <Route path="professional-development/industry-networking" element={<IndustryNetworking />} />
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
