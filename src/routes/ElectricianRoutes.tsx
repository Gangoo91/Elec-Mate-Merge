import { lazyWithRetry } from '@/utils/lazyWithRetry';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LazyRoute } from '@/components/LazyRoute';

// Lazy-loaded pages
const AITooling = lazyWithRetry(() => import('@/pages/electrician-tools/AITooling'));
const BusinessManagement = lazyWithRetry(() => import('@/pages/electrician-tools/BusinessManagement'));
const ComplianceManager = lazyWithRetry(() => import('@/pages/electrician-tools/ComplianceManager'));
const CableSizingCalculator = lazyWithRetry(() => import('@/pages/electrician-tools/cable-sizing'));
const StaffManagement = lazyWithRetry(() => import('@/pages/electrician-tools/StaffManagement'));
const ScheduleManager = lazyWithRetry(() => import('@/pages/electrician-tools/ScheduleManager'));
const BusinessAnalytics = lazyWithRetry(() => import('@/pages/electrician-tools/BusinessAnalytics'));
const FinancialTools = lazyWithRetry(() => import('@/pages/electrician-tools/FinancialTools'));
const CareerProgression = lazyWithRetry(() => import('@/pages/electrician/CareerProgression'));
const AssistantPage = lazyWithRetry(() => import('@/pages/electrician-tools/ai-tools/AssistantPage'));
const ComponentIdentifyPage = lazyWithRetry(
  () => import('@/pages/electrician-tools/ai-tools/ComponentIdentifyPage')
);
const WiringInstructionPage = lazyWithRetry(
  () => import('@/pages/electrician-tools/ai-tools/WiringInstructionPage')
);
const FaultDiagnosisPage = lazyWithRetry(
  () => import('@/pages/electrician-tools/ai-tools/FaultDiagnosisPage')
);
const InstallationVerifyPage = lazyWithRetry(
  () => import('@/pages/electrician-tools/ai-tools/InstallationVerifyPage')
);
const ReportWriterPage = lazyWithRetry(() => import('@/pages/electrician-tools/ai-tools/ReportWriterPage'));
const RegulationsPage = lazyWithRetry(() => import('@/pages/electrician-tools/ai-tools/RegulationsPage'));
const CircuitDesignerPage = lazyWithRetry(
  () => import('@/pages/electrician-tools/ai-tools/CircuitDesignerPage')
);
const ClientExplainerPage = lazyWithRetry(
  () => import('@/pages/electrician-tools/ai-tools/ClientExplainerPage')
);
const TestingProjects = lazyWithRetry(() => import('@/pages/electrician/testing-projects'));
const SiteSafety = lazyWithRetry(() => import('@/pages/electrician-tools/SiteSafety'));
const AIRAMSPage = lazyWithRetry(() => import('@/pages/electrician-tools/AIRAMSPage'));
const RAMSResultsPage = lazyWithRetry(() => import('@/pages/electrician-tools/RAMSResultsPage'));

const ElectricianRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="/electrician/projects" replace />} />
    <Route
      path="testing-projects"
      element={
        <LazyRoute>
          <TestingProjects />
        </LazyRoute>
      }
    />
    <Route
      path="ai-tooling"
      element={
        <LazyRoute>
          <AITooling />
        </LazyRoute>
      }
    />
    <Route
      path="ai-tooling/assistant"
      element={
        <LazyRoute>
          <AssistantPage />
        </LazyRoute>
      }
    />
    <Route
      path="ai-tooling/component-identify"
      element={
        <LazyRoute>
          <ComponentIdentifyPage />
        </LazyRoute>
      }
    />
    <Route
      path="ai-tooling/wiring-instruction"
      element={
        <LazyRoute>
          <WiringInstructionPage />
        </LazyRoute>
      }
    />
    <Route
      path="ai-tooling/fault-diagnosis"
      element={
        <LazyRoute>
          <FaultDiagnosisPage />
        </LazyRoute>
      }
    />
    <Route
      path="ai-tooling/installation-verify"
      element={
        <LazyRoute>
          <InstallationVerifyPage />
        </LazyRoute>
      }
    />
    <Route
      path="ai-tooling/explainer"
      element={
        <LazyRoute>
          <ClientExplainerPage />
        </LazyRoute>
      }
    />
    <Route
      path="business-management"
      element={
        <LazyRoute>
          <BusinessManagement />
        </LazyRoute>
      }
    />
    <Route
      path="compliance"
      element={
        <LazyRoute>
          <ComplianceManager />
        </LazyRoute>
      }
    />
    <Route
      path="cable-sizing"
      element={
        <LazyRoute>
          <CableSizingCalculator />
        </LazyRoute>
      }
    />

    {/* Redirects to new canonical paths */}
    <Route path="calculations" element={<Navigate to="/electrician/calculations" replace />} />
    <Route
      path="inspection-testing"
      element={<Navigate to="/electrician/inspection-testing" replace />}
    />
    <Route
      path="site-safety"
      element={
        <LazyRoute>
          <SiteSafety />
        </LazyRoute>
      }
    />
    <Route
      path="site-safety/ai-rams"
      element={
        <LazyRoute>
          <AIRAMSPage />
        </LazyRoute>
      }
    />
    {/* Results live on their own route so a refresh, a shared link or Back
        doesn't discard the finished document. Must stay AFTER the bare
        `site-safety/ai-rams` route above so the generator still matches. */}
    <Route
      path="site-safety/ai-rams/:jobId"
      element={
        <LazyRoute>
          <RAMSResultsPage />
        </LazyRoute>
      }
    />

    <Route
      path="project-management"
      element={<Navigate to="/electrician/projects" replace />}
    />
    <Route
      path="project-management/project/:projectId"
      element={<Navigate to="/electrician/projects" replace />}
    />
    <Route
      path="staff-management"
      element={
        <LazyRoute>
          <StaffManagement />
        </LazyRoute>
      }
    />
    <Route
      path="schedule"
      element={
        <LazyRoute>
          <ScheduleManager />
        </LazyRoute>
      }
    />
    <Route
      path="business-analytics"
      element={
        <LazyRoute>
          <BusinessAnalytics />
        </LazyRoute>
      }
    />
    <Route
      path="financial-tools"
      element={
        <LazyRoute>
          <FinancialTools />
        </LazyRoute>
      }
    />

    {/* Old route redirects for compatibility */}
    <Route path="admin" element={<Navigate to="/electrician/business-admin" replace />} />
    <Route path="document-templates" element={<Navigate to="/electrician" replace />} />
    <Route path="management/*" element={<Navigate to="/electrician" replace />} />
    <Route path="project-management/*" element={<Navigate to="/electrician/projects" replace />} />

    {/* Trade Essentials redirect */}
    <Route path="trade-essentials" element={<Navigate to="/electrician" replace />} />
  </Routes>
);

export default ElectricianRoutes;
