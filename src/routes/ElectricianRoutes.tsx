
import { Route, Routes } from "react-router-dom";

// Pages
import AITooling from "@/pages/electrician-tools/AITooling";
import Admin from "@/pages/electrician-tools/Admin";
import BusinessManagement from "@/pages/electrician-tools/BusinessManagement";
import ComplianceManager from "@/pages/electrician-tools/ComplianceManager";
import Calculations from "@/pages/electrician-tools/Calculations";
import QuoteLibrary from "@/pages/electrician-tools/QuoteLibrary";
import ProjectManagement from "@/pages/electrician-tools/ProjectManagement";
import ProjectDetails from "@/components/project-management/ProjectDetails";
import CableSizingCalculator from "@/pages/electrician-tools/cable-sizing";
import DocumentTemplates from "@/pages/electrician-tools/DocumentTemplates";
import InstallPlanner from "@/pages/electrician-tools/InstallPlanner";
import InspectionTesting from "@/pages/electrician-tools/InspectionTesting";
// Add Staff Management page
import StaffManagement from "@/pages/electrician-tools/StaffManagement";
// Add Schedule Manager page
import ScheduleManager from "@/pages/electrician-tools/ScheduleManager";
// Add Business Analytics page
import BusinessAnalytics from "@/pages/electrician-tools/BusinessAnalytics";
// Add Financial Tools page
import FinancialTools from "@/pages/electrician-tools/FinancialTools";

const ElectricianRoutes = () => (
  <Routes>
    <Route index element={<ProjectManagement />} />
    <Route path="admin" element={<Admin />} />
    <Route path="ai-tooling" element={<AITooling />} />
    <Route path="business-management" element={<BusinessManagement />} />
    <Route path="compliance" element={<ComplianceManager />} />
    <Route path="calculations" element={<Calculations />} />
    <Route path="cable-sizing" element={<CableSizingCalculator />} />
    <Route path="quote-library" element={<QuoteLibrary />} />
    <Route path="document-templates" element={<DocumentTemplates />} />
    <Route path="project-management" element={<ProjectManagement />} />
    <Route path="project-management/project/:projectId" element={<ProjectDetails />} />
    <Route path="install-planner" element={<InstallPlanner />} />
    <Route path="inspection-testing" element={<InspectionTesting />} />
    {/* Add new routes */}
    <Route path="staff-management" element={<StaffManagement />} />
    <Route path="schedule" element={<ScheduleManager />} />
    <Route path="business-analytics" element={<BusinessAnalytics />} />
    <Route path="financial-tools" element={<FinancialTools />} />
  </Routes>
);

export default ElectricianRoutes;
