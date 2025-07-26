
import { Route, Routes } from "react-router-dom";

// Pages
import AITooling from "@/pages/electrician-tools/AITooling";
import Admin from "@/pages/electrician-tools/Admin";
import BusinessManagement from "@/pages/electrician-tools/BusinessManagement";
import ComplianceManager from "@/pages/electrician-tools/ComplianceManager";
import Calculations from "@/pages/electrician-tools/Calculations";

import ProjectManagement from "@/pages/electrician-tools/ProjectManagement";
import ProjectDetails from "@/components/project-management/ProjectDetails";
import CableSizingCalculator from "@/pages/electrician-tools/cable-sizing";
import DocumentTemplates from "@/pages/electrician-tools/DocumentTemplates";
import InstallPlanner from "@/pages/electrician-tools/InstallPlanner";
import InspectionTesting from "@/pages/electrician-tools/InspectionTesting";
import EICRReports from "@/pages/electrician-tools/EICRReports";
import EICRInstallationDetails from "@/pages/electrician-tools/eicr/EICRInstallationDetails";
import EICRInspectorDetails from "@/pages/electrician-tools/eicr/EICRInspectorDetails";
import EICRCircuits from "@/pages/electrician-tools/eicr/EICRCircuits";
import EICRInspection from "@/pages/electrician-tools/eicr/EICRInspection";
import EICRTesting from "@/pages/electrician-tools/eicr/EICRTesting";
import EICRSummary from "@/pages/electrician-tools/eicr/EICRSummary";
import StaffManagement from "@/pages/electrician-tools/StaffManagement";
import ScheduleManager from "@/pages/electrician-tools/ScheduleManager";
import BusinessAnalytics from "@/pages/electrician-tools/BusinessAnalytics";
import FinancialTools from "@/pages/electrician-tools/FinancialTools";
import CareerProgression from "@/pages/electrician/CareerProgression";
import SiteSafety from "@/pages/electrician-tools/SiteSafety";
import EnhancedTestingGrid from "@/components/inspection-testing/schedule-of-results/EnhancedTestingGrid";

const ElectricianRoutes = () => (
  <Routes>
    <Route index element={<ProjectManagement />} />
    <Route path="admin" element={<Admin />} />
    <Route path="ai-tooling" element={<AITooling />} />
    <Route path="business-management" element={<BusinessManagement />} />
    <Route path="compliance" element={<ComplianceManager />} />
    <Route path="calculations" element={<Calculations />} />
    <Route path="cable-sizing" element={<CableSizingCalculator />} />
    
    <Route path="document-templates" element={<DocumentTemplates />} />
    <Route path="project-management" element={<ProjectManagement />} />
    <Route path="project-management/project/:projectId" element={<ProjectDetails />} />
    <Route path="install-planner" element={<InstallPlanner />} />
    <Route path="inspection-testing" element={<InspectionTesting />} />
    <Route path="inspection-testing/enhanced-testing-grid" element={<EnhancedTestingGrid />} />
    <Route path="eicr-reports" element={<EICRReports />} />
    <Route path="eicr/installation-details" element={<EICRInstallationDetails />} />
    <Route path="eicr/inspector-details" element={<EICRInspectorDetails />} />
    <Route path="eicr/circuits" element={<EICRCircuits />} />
    <Route path="eicr/inspection" element={<EICRInspection />} />
    <Route path="eicr/testing" element={<EICRTesting />} />
    <Route path="eicr/summary" element={<EICRSummary />} />
    <Route path="staff-management" element={<StaffManagement />} />
    <Route path="schedule" element={<ScheduleManager />} />
    <Route path="business-analytics" element={<BusinessAnalytics />} />
    <Route path="financial-tools" element={<FinancialTools />} />
    <Route path="career-progression" element={<CareerProgression />} />
    <Route path="site-safety" element={<SiteSafety />} />
  </Routes>
);

export default ElectricianRoutes;
