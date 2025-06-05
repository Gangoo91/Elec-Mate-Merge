import { Routes, Route } from "react-router-dom";
import SafetyShares from "@/pages/electrician/SafetyShares";
import SafetyAlerts from "@/pages/electrician/safety-shares/SafetyAlerts";
import IndustryNews from "@/pages/electrician/safety-shares/IndustryNews";
import MajorProjects from "@/pages/electrician/safety-shares/MajorProjects";
import LearningFromExperience from "@/pages/electrician/safety-shares/LearningFromExperience";
import SafetyResources from "@/pages/electrician/safety-shares/SafetyResources";
import SafetyAlertsEnhanced from "@/pages/electrician/safety-shares/SafetyAlertsEnhanced";
import IndustryNewsEnhanced from "@/pages/electrician/safety-shares/IndustryNewsEnhanced";
import SafetyResourcesEnhanced from "@/pages/electrician/safety-shares/SafetyResourcesEnhanced";

const ElectricianHubRoutes = () => {
  return (
    <Routes>
      {/* Safety Shares Routes */}
      <Route path="safety-shares" element={<SafetyShares />} />
      <Route path="safety-shares/alerts" element={<SafetyAlerts />} />
      <Route path="safety-shares/alerts-enhanced" element={<SafetyAlertsEnhanced />} />
      <Route path="safety-shares/news" element={<IndustryNews />} />
      <Route path="safety-shares/news-enhanced" element={<IndustryNewsEnhanced />} />
      <Route path="safety-shares/projects" element={<MajorProjects />} />
      <Route path="safety-shares/lfe" element={<LearningFromExperience />} />
      <Route path="safety-shares/resources" element={<SafetyResources />} />
      <Route path="safety-shares/resources-enhanced" element={<SafetyResourcesEnhanced />} />
    </Routes>
  );
};

export default ElectricianHubRoutes;
