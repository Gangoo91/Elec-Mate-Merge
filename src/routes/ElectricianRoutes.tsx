
import { Route, Navigate } from "react-router-dom";
import { Fragment } from "react";
import ElectricianTools from "@/pages/ElectricianTools";
import ProjectManagement from "@/pages/electrician-tools/ProjectManagement";
import AITooling from "@/pages/electrician-tools/AITooling";
import Calculations from "@/pages/electrician-tools/Calculations";
import Admin from "@/pages/electrician-tools/Admin";
import ElectricalHub from "@/pages/ElectricalHub";
import ElectricalToolboxTalk from "@/pages/electrician/ElectricalToolboxTalk";
import ElectricalChat from "@/pages/electrician/ElectricalChat";
import JobVacancies from "@/pages/electrician/JobVacancies";
import ElectricalMaterials from "@/pages/electrician/ElectricalMaterials";
import SupplierMaterials from "@/pages/electrician/SupplierMaterials";
import ElectricalTools from "@/pages/electrician/ElectricalTools";
import MentorConnect from "@/pages/electrician/MentorConnect";
import SafetyShares from "@/pages/electrician/SafetyShares";
import SafetyAlerts from "@/pages/electrician/safety-shares/SafetyAlerts";
import LearningFromExperience from "@/pages/electrician/safety-shares/LearningFromExperience";
import MajorProjects from "@/pages/electrician/safety-shares/MajorProjects";
import IndustryNews from "@/pages/electrician/safety-shares/IndustryNews";
import SafetyResources from "@/pages/electrician/safety-shares/SafetyResources";
import LivePricing from "@/pages/electrician/LivePricing";
import ElectricianMentalHealth from "@/pages/electrician/ElectricianMentalHealth";
import StressManagement from "@/pages/apprentice/mental-health/StressManagement";
import SupportNetwork from "@/pages/apprentice/mental-health/SupportNetwork";
import WorkLifeBalance from "@/pages/apprentice/mental-health/WorkLifeBalance";
import CrisisResources from "@/pages/apprentice/mental-health/CrisisResources";

const ElectricianRoutes = () => {
  return (
    <Fragment>
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
      <Route path="electrician/mental-health" element={<ElectricianMentalHealth />} />
      <Route path="electrician/mental-health/stress-management" element={<StressManagement />} />
      <Route path="electrician/mental-health/support-network" element={<SupportNetwork />} />
      <Route path="electrician/mental-health/work-life-balance" element={<WorkLifeBalance />} />
      <Route path="electrician/mental-health/crisis-resources" element={<CrisisResources />} />
    </Fragment>
  );
};

export default ElectricianRoutes;
