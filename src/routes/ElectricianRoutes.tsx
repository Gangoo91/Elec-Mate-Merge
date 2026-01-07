
import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LazyRoute } from "@/components/LazyRoute";

// Lazy-loaded pages
const AITooling = lazy(() => import("@/pages/electrician-tools/AITooling"));
const BusinessManagement = lazy(() => import("@/pages/electrician-tools/BusinessManagement"));
const ComplianceManager = lazy(() => import("@/pages/electrician-tools/ComplianceManager"));
const ProjectManagement = lazy(() => import("@/pages/electrician-tools/ProjectManagement"));
const ProjectDetails = lazy(() => import("@/components/project-management/ProjectDetails"));
const CableSizingCalculator = lazy(() => import("@/pages/electrician-tools/cable-sizing"));
const StaffManagement = lazy(() => import("@/pages/electrician-tools/StaffManagement"));
const ScheduleManager = lazy(() => import("@/pages/electrician-tools/ScheduleManager"));
const BusinessAnalytics = lazy(() => import("@/pages/electrician-tools/BusinessAnalytics"));
const FinancialTools = lazy(() => import("@/pages/electrician-tools/FinancialTools"));
const CareerProgression = lazy(() => import("@/pages/electrician/CareerProgression"));
const AssistantPage = lazy(() => import("@/pages/electrician-tools/ai-tools/AssistantPage"));
const ComponentIdentifyPage = lazy(() => import("@/pages/electrician-tools/ai-tools/ComponentIdentifyPage"));
const WiringInstructionPage = lazy(() => import("@/pages/electrician-tools/ai-tools/WiringInstructionPage"));
const FaultDiagnosisPage = lazy(() => import("@/pages/electrician-tools/ai-tools/FaultDiagnosisPage"));
const InstallationVerifyPage = lazy(() => import("@/pages/electrician-tools/ai-tools/InstallationVerifyPage"));
const ReportWriterPage = lazy(() => import("@/pages/electrician-tools/ai-tools/ReportWriterPage"));
const RegulationsPage = lazy(() => import("@/pages/electrician-tools/ai-tools/RegulationsPage"));
const CircuitDesignerPage = lazy(() => import("@/pages/electrician-tools/ai-tools/CircuitDesignerPage"));
const ClientExplainerPage = lazy(() => import("@/pages/electrician-tools/ai-tools/ClientExplainerPage"));
const TestingProjects = lazy(() => import("@/pages/electrician/testing-projects"));
const SiteSafety = lazy(() => import("@/pages/electrician-tools/SiteSafety"));
const AIRAMSPage = lazy(() => import("@/pages/electrician-tools/AIRAMSPage"));

const ElectricianRoutes = () => (
  <Routes>
    <Route index element={<LazyRoute><ProjectManagement /></LazyRoute>} />
    <Route path="testing-projects" element={<LazyRoute><TestingProjects /></LazyRoute>} />
    <Route path="ai-tooling" element={<LazyRoute><AITooling /></LazyRoute>} />
    <Route path="ai-tooling/assistant" element={<LazyRoute><AssistantPage /></LazyRoute>} />
    <Route path="ai-tooling/component-identify" element={<LazyRoute><ComponentIdentifyPage /></LazyRoute>} />
    <Route path="ai-tooling/wiring-instruction" element={<LazyRoute><WiringInstructionPage /></LazyRoute>} />
    <Route path="ai-tooling/fault-diagnosis" element={<LazyRoute><FaultDiagnosisPage /></LazyRoute>} />
    <Route path="ai-tooling/installation-verify" element={<LazyRoute><InstallationVerifyPage /></LazyRoute>} />
    <Route path="ai-tooling/explainer" element={<LazyRoute><ClientExplainerPage /></LazyRoute>} />
    <Route path="business-management" element={<LazyRoute><BusinessManagement /></LazyRoute>} />
    <Route path="compliance" element={<LazyRoute><ComplianceManager /></LazyRoute>} />
    <Route path="cable-sizing" element={<LazyRoute><CableSizingCalculator /></LazyRoute>} />

    {/* Redirects to new canonical paths */}
    <Route path="calculations" element={<Navigate to="/electrician/calculations" replace />} />
    <Route path="install-planner" element={<Navigate to="/electrician/install-planner" replace />} />
    <Route path="inspection-testing" element={<Navigate to="/electrician/inspection-testing" replace />} />
    <Route path="site-safety" element={<LazyRoute><SiteSafety /></LazyRoute>} />
    <Route path="site-safety/ai-rams" element={<LazyRoute><AIRAMSPage /></LazyRoute>} />

    <Route path="project-management" element={<LazyRoute><ProjectManagement /></LazyRoute>} />
    <Route path="project-management/project/:projectId" element={<LazyRoute><ProjectDetails /></LazyRoute>} />
    <Route path="staff-management" element={<LazyRoute><StaffManagement /></LazyRoute>} />
    <Route path="schedule" element={<LazyRoute><ScheduleManager /></LazyRoute>} />
    <Route path="business-analytics" element={<LazyRoute><BusinessAnalytics /></LazyRoute>} />
    <Route path="financial-tools" element={<LazyRoute><FinancialTools /></LazyRoute>} />

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
