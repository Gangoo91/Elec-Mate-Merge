
import { Route, Routes } from "react-router-dom";

// Pages
import AITooling from "@/pages/electrician-tools/AITooling";
import BusinessManagement from "@/pages/electrician-tools/BusinessManagement";
import ComplianceManager from "@/pages/electrician-tools/ComplianceManager";
import { Navigate } from "react-router-dom";

import ProjectManagement from "@/pages/electrician-tools/ProjectManagement";
import ProjectDetails from "@/components/project-management/ProjectDetails";
import CableSizingCalculator from "@/pages/electrician-tools/cable-sizing";
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
import EnhancedTestingGrid from "@/components/inspection-testing/schedule-of-results/EnhancedTestingGrid";
import AssistantPage from "@/pages/electrician-tools/ai-tools/AssistantPage";
import VisualAnalysisPage from "@/pages/electrician-tools/ai-tools/VisualAnalysisPage";
import ReportWriterPage from "@/pages/electrician-tools/ai-tools/ReportWriterPage";
import RegulationsPage from "@/pages/electrician-tools/ai-tools/RegulationsPage";
import CircuitDesignerPage from "@/pages/electrician-tools/ai-tools/CircuitDesignerPage";
import QuotesPage from "@/pages/electrician/QuotesPage";


const ElectricianRoutes = () => (
  <Routes>
    <Route index element={<ProjectManagement />} />
    <Route path="ai-tooling" element={<AITooling />} />
    <Route path="ai-tooling/assistant" element={<AssistantPage />} />
    <Route path="ai-tooling/visual" element={<VisualAnalysisPage />} />
    <Route path="ai-tooling/reports" element={<ReportWriterPage />} />
    <Route path="ai-tooling/regulations" element={<RegulationsPage />} />
    <Route path="ai-tooling/circuit" element={<CircuitDesignerPage />} />
    <Route path="business-management" element={<BusinessManagement />} />
    <Route path="compliance" element={<ComplianceManager />} />
    <Route path="cable-sizing" element={<CableSizingCalculator />} />
    <Route path="quotes" element={<QuotesPage />} />
    
    {/* Redirects to new canonical paths */}
    <Route path="calculations" element={<Navigate to="/electrician/calculations" replace />} />
    <Route path="install-planner" element={<Navigate to="/electrician/install-planner" replace />} />
    <Route path="inspection-testing" element={<Navigate to="/electrician/inspection-testing" replace />} />
    <Route path="site-safety" element={<Navigate to="/electrician/site-safety" replace />} />
    
    <Route path="project-management" element={<ProjectManagement />} />
    <Route path="project-management/project/:projectId" element={<ProjectDetails />} />
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
