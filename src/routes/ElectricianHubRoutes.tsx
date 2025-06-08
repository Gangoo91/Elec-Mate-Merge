
import { Route, Routes } from "react-router-dom";
import TradeEssentials from "@/pages/electrician/TradeEssentials";
import SafetyShares from "@/pages/electrician/SafetyShares";
import MajorProjects from "@/pages/electrician/safety-shares/MajorProjects";
import Chat from "@/pages/Chat";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import JobVacancies from "@/pages/electrician/JobVacancies";
import ElectricalMaterials from "@/pages/electrician/ElectricalMaterials";
import ElectricalTools from "@/pages/electrician/ElectricalTools";
import LivePricing from "@/pages/electrician/LivePricing";
import ElectricalHub from "@/pages/ElectricalHub";
import CareerProgression from "@/pages/electrician/CareerProgression";
import BusinessDevelopment from "@/pages/electrician/BusinessDevelopment";
import BusinessCustomers from "@/pages/electrician/business-development/BusinessCustomers";
import BusinessTemplates from "@/pages/electrician/business-development/BusinessTemplates";
import BusinessStartup from "@/pages/electrician/business-development/BusinessStartup";
import BusinessApprentices from "@/pages/electrician/business-development/BusinessApprentices";
import BusinessElectricians from "@/pages/electrician/business-development/BusinessElectricians";
import BusinessGrowth from "@/pages/electrician/business-development/BusinessGrowth";
import ElectricianMentalHealth from "@/pages/electrician/ElectricianMentalHealth";
import WorkLifeBalance from "@/pages/electrician/mental-health/WorkLifeBalance";
import MentalHealthResources from "@/pages/electrician/mental-health/MentalHealthResources";

const ElectricianHubRoutes = () => (
  <Routes>
    {/* Default route - show Electrical Hub as the main page */}
    <Route index element={<ElectricalHub />} />
    <Route path="trade-essentials" element={<TradeEssentials />} />
    <Route path="chat" element={<Chat />} />
    <Route path="job-vacancies" element={<JobVacancies />} />
    <Route path="materials" element={<ElectricalMaterials />} />
    <Route path="tools" element={<ElectricalTools />} />
    <Route path="safety-shares" element={<SafetyShares />} />
    <Route path="safety-shares/projects" element={<MajorProjects />} />
    <Route path="live-pricing" element={<LivePricing />} />
    <Route path="mental-health" element={<ElectricianMentalHealth />} />
    <Route path="mental-health/work-life-balance" element={<WorkLifeBalance />} />
    <Route path="mental-health/resources" element={<MentalHealthResources />} />
    <Route path="mentor-connect" element={<ApprenticeMentor />} />
    <Route path="career-progression" element={<CareerProgression />} />
    
    {/* Business Development Routes */}
    <Route path="business-development" element={<BusinessDevelopment />} />
    <Route path="business-development/startup" element={<BusinessStartup />} />
    <Route path="business-development/apprentices" element={<BusinessApprentices />} />
    <Route path="business-development/electricians" element={<BusinessElectricians />} />
    <Route path="business-development/growth" element={<BusinessGrowth />} />
    <Route path="business-development/customers" element={<BusinessCustomers />} />
    <Route path="business-development/templates" element={<BusinessTemplates />} />
  </Routes>
);

export default ElectricianHubRoutes;
