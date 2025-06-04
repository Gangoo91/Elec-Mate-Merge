
import { Route, Routes } from 'react-router-dom';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ApprenticeHub from "./pages/ApprenticeHub";
import ElectricalHub from "./pages/ElectricalHub";
import ElectricianTools from "./pages/ElectricianTools";
import StudyCentre from "./pages/apprentice/ApprenticeStudy";
import InspectionTesting from "./pages/apprentice/InspectionTesting";
import InstallPlanner from "./pages/electrician-tools/InstallPlanner";
import InspectionTestingTools from "./pages/electrician-tools/InspectionTesting";
import ProjectManagement from "./pages/electrician-tools/ProjectManagement";
import AITooling from "./pages/electrician-tools/AITooling";
import Calculations from "./pages/electrician-tools/Calculations";
import Admin from "./pages/electrician-tools/Admin";
import EICRReports from "./pages/electrician-tools/EICRReports";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/electrical-hub" element={<ElectricalHub />} />
      <Route path="/apprentice" element={<ApprenticeHub />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/chat" element={<Chat />} />

      {/* Apprentice Routes */}
      <Route path="/apprentice/study" element={<StudyCentre />} />
      <Route path="/apprentice/inspection-testing" element={<InspectionTesting />} />

      {/* Electrician Tools Routes */}
      <Route path="/electrician-tools" element={<ElectricianTools />} />
      <Route path="/electrician-tools/install-planner" element={<InstallPlanner />} />
      <Route path="/electrician-tools/inspection-testing" element={<InspectionTestingTools />} />
      <Route path="/electrician-tools/eicr-reports" element={<EICRReports />} />
      <Route path="/electrician-tools/project-management" element={<ProjectManagement />} />
      <Route path="/electrician-tools/ai-tooling" element={<AITooling />} />
      <Route path="/electrician-tools/calculations" element={<Calculations />} />
      <Route path="/electrician-tools/admin" element={<Admin />} />

      {/* Catch all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
