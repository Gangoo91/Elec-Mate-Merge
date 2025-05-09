
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
const AITooling = lazy(() => import("@/pages/electrician-tools/AITooling"));
const Admin = lazy(() => import("@/pages/electrician-tools/Admin"));
const Calculations = lazy(() => import("@/pages/electrician-tools/Calculations"));
const QuoteLibrary = lazy(() => import("@/pages/electrician-tools/QuoteLibrary"));
const ProjectManagement = lazy(() => import("@/pages/electrician-tools/ProjectManagement"));
const ProjectDetails = lazy(() => import("@/components/project-management/ProjectDetails"));

const ElectricianRoutes = () => (
  <Routes>
    <Route index element={<ProjectManagement />} />
    <Route path="admin" element={<Admin />} />
    <Route path="ai-tooling" element={<AITooling />} />
    <Route path="calculations" element={<Calculations />} />
    <Route path="quote-library" element={<QuoteLibrary />} />
    <Route path="project-management" element={<ProjectManagement />} />
    <Route path="project-management/project/:projectId" element={<ProjectDetails />} />
  </Routes>
);

export default ElectricianRoutes;
