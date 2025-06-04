import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ElectricalHub from "./pages/ElectricalHub";
import ElectricianTools from "./pages/ElectricianTools";
import ApprenticeCorner from "./pages/ApprenticeCorner";
import StudyCentre from "./pages/apprentice/StudyCentre";
import InspectionTesting from "./pages/apprentice/InspectionTesting";
import SafeIsolation from "./pages/apprentice/SafeIsolation";
import InitialVerification from "./pages/apprentice/InitialVerification";
import Certification from "./pages/apprentice/Certification";
import ElectricianToolsPage from "./pages/ElectricianTools";
import InstallPlanner from "./pages/electrician-tools/InstallPlanner";
import InspectionTestingTools from "./pages/electrician-tools/InspectionTesting";
import ProjectManagement from "./pages/electrician-tools/ProjectManagement";
import AITooling from "./pages/electrician-tools/AITooling";
import Calculations from "./pages/electrician-tools/Calculations";
import Admin from "./pages/electrician-tools/Admin";
import EICRReports from "./pages/electrician-tools/EICRReports";

const AppRouter = () => {
  return (
    <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/electrical-hub" element={<ElectricalHub />} />
          <Route path="/apprentice" element={<ApprenticeCorner />} />

          {/* Apprentice Routes */}
          <Route path="/apprentice/study" element={<StudyCentre />} />
          <Route path="/apprentice/inspection-testing" element={<InspectionTesting />} />
          <Route path="/apprentice/safe-isolation" element={<SafeIsolation />} />
          <Route path="/apprentice/initial-verification" element={<InitialVerification />} />
          <Route path="/apprentice/certification" element={<Certification />} />

          {/* Electrician Tools Routes */}
          <Route path="/electrician-tools" element={<ElectricianTools />} />
          <Route path="/electrician-tools/install-planner" element={<InstallPlanner />} />
          <Route path="/electrician-tools/inspection-testing" element={<InspectionTestingTools />} />
          <Route path="/electrician-tools/eicr-reports" element={<EICRReports />} />
          <Route path="/electrician-tools/project-management" element={<ProjectManagement />} />
          <Route path="/electrician-tools/ai-tooling" element={<AITooling />} />
          <Route path="/electrician-tools/calculations" element={<Calculations />} />
          <Route path="/electrician-tools/admin" element={<Admin />} />
        </Routes>
    </Router>
  );
};

export default AppRouter;
