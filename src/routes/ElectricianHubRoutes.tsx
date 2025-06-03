import { Route, Routes, Navigate } from "react-router-dom";
import ElectricalChat from "@/pages/electrician/ElectricalChat";
import ElectricalMaterials from "@/pages/electrician/ElectricalMaterials";
import ElectricalTools from "@/pages/electrician/ElectricalTools";
import ElectricalToolboxTalk from "@/pages/electrician/ElectricalToolboxTalk";
import JobVacancies from "@/pages/electrician/JobVacancies";
import LivePricing from "@/pages/electrician/LivePricing";
import MentorConnect from "@/pages/electrician/MentorConnect";
import SafetyShares from "@/pages/electrician/SafetyShares";
import SupplierMaterials from "@/pages/electrician/SupplierMaterials";
import BusinessDevelopment from "@/pages/electrician/BusinessDevelopment";
import CareerProgression from "@/pages/electrician/CareerProgression";
import ElectricianMentalHealth from "@/pages/electrician/ElectricianMentalHealth";
import BusinessStartup from "@/pages/electrician/business-development/BusinessStartup";
import BusinessGrowth from "@/pages/electrician/business-development/BusinessGrowth";
import BusinessCustomers from "@/pages/electrician/business-development/BusinessCustomers";
import BusinessTemplates from "@/pages/electrician/business-development/BusinessTemplates";
import BusinessElectricians from "@/pages/electrician/business-development/BusinessElectricians";
import BusinessApprentices from "@/pages/electrician/business-development/BusinessApprentices";
import WorkLifeBalance from "@/pages/electrician/mental-health/WorkLifeBalance";

// Safety shares routes
import SafetyAlerts from "@/pages/electrician/safety-shares/SafetyAlerts";
import SafetyResources from "@/pages/electrician/safety-shares/SafetyResources";
import LearningFromExperience from "@/pages/electrician/safety-shares/LearningFromExperience";
import MajorProjects from "@/pages/electrician/safety-shares/MajorProjects";
import IndustryNews from "@/pages/electrician/safety-shares/IndustryNews";

// Safety shares detail views
import SafetyAlertDetail from "@/components/electrician/safety-shares/SafetyAlertDetail";
import LFEReportDetail from "@/components/electrician/safety-shares/LFEReportDetail";
import SafetyResourceDetail from "@/components/electrician/safety-shares/SafetyResourceDetail";
import IndustryNewsDetail from "@/components/electrician/safety-shares/IndustryNewsDetail";
import MajorProjectDetail from "@/components/electrician/safety-shares/MajorProjectDetail";

const ElectricianHubRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="toolbox-talk" replace />} />
      <Route path="chat" element={<ElectricalChat />} />
      <Route path="materials" element={<ElectricalMaterials />} />
      <Route path="tools" element={<ElectricalTools />} />
      <Route path="toolbox-talk" element={<ElectricalToolboxTalk />} />
      <Route path="job-vacancies" element={<JobVacancies />} />
      <Route path="live-pricing" element={<LivePricing />} />
      <Route path="mentor-connect" element={<MentorConnect />} />
      <Route path="safety-shares" element={<SafetyShares />} />
      <Route path="supplier-materials" element={<SupplierMaterials />} />
      <Route path="business-development" element={<BusinessDevelopment />} />
      <Route path="career-progression" element={<CareerProgression />} />
      <Route path="mental-health" element={<ElectricianMentalHealth />} />
      <Route path="business-development/startup" element={<BusinessStartup />} />
      <Route path="business-development/growth" element={<BusinessGrowth />} />
      <Route path="business-development/customers" element={<BusinessCustomers />} />
      <Route path="business-development/templates" element={<BusinessTemplates />} />
      <Route path="business-development/electricians" element={<BusinessElectricians />} />
      <Route path="business-development/apprentices" element={<BusinessApprentices />} />
      <Route path="mental-health/work-life-balance" element={<WorkLifeBalance />} />
      
      {/* Safety shares routes */}
      <Route path="safety-shares/alerts" element={<SafetyAlerts />} />
      <Route path="safety-shares/resources" element={<SafetyResources />} />
      <Route path="safety-shares/lfe" element={<LearningFromExperience />} />
      <Route path="safety-shares/projects" element={<MajorProjects />} />
      <Route path="safety-shares/news" element={<IndustryNews />} />
      
      {/* Safety shares detail views */}
      <Route path="safety-shares/alerts/:id" element={<SafetyAlertDetail />} />
      <Route path="safety-shares/lfe/:id" element={<LFEReportDetail />} />
      <Route path="safety-shares/resources/:id" element={<SafetyResourceDetail />} />
      <Route path="safety-shares/news/:id" element={<IndustryNewsDetail />} />
      <Route path="safety-shares/projects/:id" element={<MajorProjectDetail />} />
    </Routes>
  );
};

export default ElectricianHubRoutes;
