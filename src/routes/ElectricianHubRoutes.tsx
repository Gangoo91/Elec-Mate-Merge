
import { Route, Routes } from "react-router-dom";
import ElectricalHub from "@/pages/ElectricalHub";
import ElectricalToolboxTalk from "@/pages/electrician/ElectricalToolboxTalk";
import MentorConnect from "@/pages/electrician/MentorConnect";
import ElectricalChat from "@/pages/electrician/ElectricalChat";
import JobVacancies from "@/pages/electrician/JobVacancies";
import ElectricalMaterials from "@/pages/electrician/ElectricalMaterials";
import SupplierMaterials from "@/pages/electrician/SupplierMaterials";
import ElectricalTools from "@/pages/electrician/ElectricalTools";
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
import BusinessDevelopment from "@/pages/electrician/BusinessDevelopment";

const ElectricianHubRoutes = () => {
  return (
    <Routes>
      <Route index element={<ElectricalHub />} />
      <Route path="toolbox-talk" element={<ElectricalToolboxTalk />} />
      <Route path="mentor-connect" element={<MentorConnect />} />
      <Route path="chat" element={<ElectricalChat />} />
      <Route path="job-vacancies" element={<JobVacancies />} />
      <Route path="materials" element={<ElectricalMaterials />} />
      <Route path="suppliers/:supplierSlug" element={<SupplierMaterials />} />
      <Route path="tools" element={<ElectricalTools />} />
      <Route path="safety-shares" element={<SafetyShares />} />
      <Route path="safety-shares/alerts" element={<SafetyAlerts />} />
      <Route path="safety-shares/lfe" element={<LearningFromExperience />} />
      <Route path="safety-shares/projects" element={<MajorProjects />} />
      <Route path="safety-shares/news" element={<IndustryNews />} />
      <Route path="safety-shares/resources" element={<SafetyResources />} />
      <Route path="live-pricing" element={<LivePricing />} />
      <Route path="mental-health" element={<ElectricianMentalHealth />} />
      <Route path="mental-health/stress-management" element={<StressManagement />} />
      <Route path="mental-health/support-network" element={<SupportNetwork />} />
      <Route path="mental-health/work-life-balance" element={<WorkLifeBalance />} />
      <Route path="mental-health/crisis-resources" element={<CrisisResources />} />
      <Route path="business-development" element={<BusinessDevelopment />} />
    </Routes>
  );
};

export default ElectricianHubRoutes;
