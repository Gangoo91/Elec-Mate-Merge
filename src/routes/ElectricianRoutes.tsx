
import { Route, Routes } from "react-router-dom";

// Pages
import AITooling from "@/pages/electrician-tools/AITooling";
import BusinessManagement from "@/pages/electrician-tools/BusinessManagement";
import ComplianceManager from "@/pages/electrician-tools/ComplianceManager";
import { Navigate } from "react-router-dom";

import ProjectManagement from "@/pages/electrician-tools/ProjectManagement";
import ProjectDetails from "@/components/project-management/ProjectDetails";
import CableSizingCalculator from "@/pages/electrician-tools/cable-sizing";
import StaffManagement from "@/pages/electrician-tools/StaffManagement";
import ScheduleManager from "@/pages/electrician-tools/ScheduleManager";
import BusinessAnalytics from "@/pages/electrician-tools/BusinessAnalytics";
import FinancialTools from "@/pages/electrician-tools/FinancialTools";
import CareerProgression from "@/pages/electrician/CareerProgression";
import AssistantPage from "@/pages/electrician-tools/ai-tools/AssistantPage";
import ComponentIdentifyPage from "@/pages/electrician-tools/ai-tools/ComponentIdentifyPage";
import WiringInstructionPage from "@/pages/electrician-tools/ai-tools/WiringInstructionPage";
import FaultDiagnosisPage from "@/pages/electrician-tools/ai-tools/FaultDiagnosisPage";
import InstallationVerifyPage from "@/pages/electrician-tools/ai-tools/InstallationVerifyPage";
import ReportWriterPage from "@/pages/electrician-tools/ai-tools/ReportWriterPage";
import RegulationsPage from "@/pages/electrician-tools/ai-tools/RegulationsPage";
import CircuitDesignerPage from "@/pages/electrician-tools/ai-tools/CircuitDesignerPage";
import ClientExplainerPage from "@/pages/electrician-tools/ai-tools/ClientExplainerPage";
import TestingProjects from "@/pages/electrician/testing-projects";
import SiteSafety from "@/pages/electrician-tools/SiteSafety";
import AIRAMSPage from "@/pages/electrician-tools/AIRAMSPage";

const ElectricianRoutes = () => (
  <Routes>
    <Route index element={<ProjectManagement />} />
    <Route path="testing-projects" element={<TestingProjects />} />
    <Route path="ai-tooling" element={<AITooling />} />
    <Route path="ai-tooling/assistant" element={<AssistantPage />} />
    <Route path="ai-tooling/component-identify" element={<ComponentIdentifyPage />} />
    <Route path="ai-tooling/wiring-instruction" element={<WiringInstructionPage />} />
    <Route path="ai-tooling/fault-diagnosis" element={<FaultDiagnosisPage />} />
    <Route path="ai-tooling/installation-verify" element={<InstallationVerifyPage />} />
    <Route path="ai-tooling/explainer" element={<ClientExplainerPage />} />
    <Route path="business-management" element={<BusinessManagement />} />
    <Route path="compliance" element={<ComplianceManager />} />
    <Route path="cable-sizing" element={<CableSizingCalculator />} />
    
    {/* Redirects to new canonical paths */}
    <Route path="calculations" element={<Navigate to="/electrician/calculations" replace />} />
    <Route path="install-planner" element={<Navigate to="/electrician/install-planner" replace />} />
    <Route path="inspection-testing" element={<Navigate to="/electrician/inspection-testing" replace />} />
    <Route path="site-safety" element={<SiteSafety />} />
    <Route path="site-safety/ai-rams" element={<AIRAMSPage />} />
    
    <Route path="project-management" element={<ProjectManagement />} />
    <Route path="project-management/project/:projectId" element={<ProjectDetails />} />
    <Route path="staff-management" element={<StaffManagement />} />
    <Route path="schedule" element={<ScheduleManager />} />
    <Route path="business-analytics" element={<BusinessAnalytics />} />
    <Route path="financial-tools" element={<FinancialTools />} />
     
    {/* Old route redirects for compatibility */}
    <Route path="admin" element={<Navigate to="/electrician/business-admin" replace />} />
    <Route path="document-templates" element={<Navigate to="/electrician" replace />} />
    <Route path="management/*" element={<Navigate to="/electrician" replace />} />
    <Route path="project-management/*" element={<Navigate to="/electrician" replace />} />
    
    {/* Trade Essentials redirect */}
    <Route path="trade-essentials" element={<Navigate to="/electrician" replace />} />
  </Routes>
);

export default ElectricianRoutes;
