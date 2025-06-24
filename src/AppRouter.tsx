import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import OJTTimeSheet from './pages/OJTTimeSheet';
import MockTests from './pages/MockTests';
import MockTest from './pages/MockTest';
import ApprenticeHub from './pages/ApprenticeHub';
import MentalHealthHub from './pages/MentalHealthHub';
import Toolbox from './pages/Toolbox';
import OnJobTools from './pages/OnJobTools';
import ProfessionalDevelopment from './pages/ProfessionalDevelopment';
import AdvancedHelp from './pages/AdvancedHelp';
import OnJobBS7671RunThrough from './pages/apprentice/OnJobBS7671RunThrough';
import OverviewTesting from './pages/apprentice/bs7671/OverviewTesting';

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ojt"
          element={
            <ProtectedRoute>
              <OJTTimeSheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock-tests"
          element={
            <ProtectedRoute>
              <MockTests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock-tests/:testId"
          element={
            <ProtectedRoute>
              <MockTest />
            </ProtectedRoute>
          }
        />

          {/* Apprentice Routes */}
          <Route path="/apprentice" element={<ApprenticeHub />} />
          <Route path="/apprentice/bs7671-inspection-testing" element={<OnJobBS7671RunThrough />} />
          <Route path="/apprentice/bs7671-inspection-testing/overview" element={<OverviewTesting />} />
          <Route path="/apprentice/mental-health" element={<MentalHealthHub />} />
          <Route path="/apprentice/toolbox" element={<Toolbox />} />
          <Route path="/apprentice/on-job-tools" element={<OnJobTools />} />
          <Route path="/apprentice/professional-development" element={<ProfessionalDevelopment />} />
          <Route path="/apprentice/advanced-help" element={<AdvancedHelp />} />
        <Route path="*" element={<NotFound />} />
        
      </Route>
    </Routes>
  );
}

export default AppRouter;
