
import { Route, Routes } from "react-router-dom";

// Pages
import AITooling from "@/pages/electrician-tools/AITooling";
import Admin from "@/pages/electrician-tools/Admin";
import Calculations from "@/pages/electrician-tools/Calculations";
import QuoteLibrary from "@/pages/electrician-tools/QuoteLibrary";
import ProjectManagement from "@/pages/electrician-tools/ProjectManagement";
import ProjectDetails from "@/components/project-management/ProjectDetails";
import CableSizingCalculator from "@/pages/electrician-tools/cable-sizing";

const ElectricianRoutes = () => (
  <Routes>
    <Route index element={<ProjectManagement />} />
    <Route path="admin" element={<Admin />} />
    <Route path="ai-tooling" element={<AITooling />} />
    <Route path="calculations" element={<Calculations />} />
    <Route path="cable-sizing" element={<CableSizingCalculator />} />
    <Route path="quote-library" element={<QuoteLibrary />} />
    <Route path="project-management" element={<ProjectManagement />} />
    <Route path="project-management/project/:projectId" element={<ProjectDetails />} />
  </Routes>
);

export default ElectricianRoutes;
