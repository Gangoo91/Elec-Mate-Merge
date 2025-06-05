
import { Route, Routes } from "react-router-dom";
import TradeEssentials from "@/pages/electrician/TradeEssentials";
import SafetyShares from "@/pages/electrician/SafetyShares";
import MajorProjects from "@/pages/electrician/safety-shares/MajorProjects";
import Chat from "@/pages/Chat";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import JobVacancies from "@/pages/JobVacancies";
import Materials from "@/pages/Materials";
import ToolsGuide from "@/pages/ToolsGuide";
import LivePricing from "@/pages/LivePricing";
import ElectricalHub from "@/pages/ElectricalHub";

const ElectricianHubRoutes = () => (
  <Routes>
    {/* Default route - show Electrical Hub as the main page */}
    <Route index element={<ElectricalHub />} />
    <Route path="trade-essentials" element={<TradeEssentials />} />
    <Route path="chat" element={<Chat />} />
    <Route path="job-vacancies" element={<JobVacancies />} />
    <Route path="materials" element={<Materials />} />
    <Route path="tools" element={<ToolsGuide />} />
    <Route path="safety-shares" element={<SafetyShares />} />
    <Route path="safety-shares/projects" element={<MajorProjects />} />
    <Route path="live-pricing" element={<LivePricing />} />
    <Route path="mental-health" element={<ApprenticeMentalHealth />} />
    <Route path="mentor-connect" element={<ApprenticeMentor />} />
  </Routes>
);

export default ElectricianHubRoutes;
