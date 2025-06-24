
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import NotFound from './pages/NotFound';
import ApprenticeOJT from './pages/apprentice/ApprenticeOJT';
import MockExams from './pages/apprentice/MockExams';
import MockExamDetails from './pages/apprentice/MockExamDetails';
import ApprenticeHub from './pages/ApprenticeHub';
import ApprenticeMentalHealth from './pages/apprentice/ApprenticeMentalHealth';
import ApprenticeToolbox from './pages/apprentice/ApprenticeToolbox';
import OnJobTools from './pages/apprentice/OnJobTools';
import ProfessionalDevelopment from './pages/apprentice/ProfessionalDevelopment';
import AdvancedHelp from './pages/apprentice/AdvancedHelp';
import OnJobBS7671RunThrough from './pages/apprentice/OnJobBS7671RunThrough';
import OverviewTesting from './pages/apprentice/bs7671/OverviewTesting';

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

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
              <ApprenticeOJT />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock-tests"
          element={
            <ProtectedRoute>
              <MockExams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock-tests/:testId"
          element={
            <ProtectedRoute>
              <MockExamDetails />
            </ProtectedRoute>
          }
        />

          {/* Apprentice Routes */}
          <Route path="/apprentice" element={<ApprenticeHub />} />
          <Route path="/apprentice/bs7671-inspection-testing" element={<OnJobBS7671RunThrough />} />
          <Route path="/apprentice/bs7671-inspection-testing/overview" element={<OverviewTesting />} />
          <Route path="/apprentice/mental-health" element={<ApprenticeMentalHealth />} />
          <Route path="/apprentice/toolbox" element={<ApprenticeToolbox />} />
          <Route path="/apprentice/on-job-tools" element={<OnJobTools />} />
          <Route path="/apprentice/professional-development" element={<ProfessionalDevelopment />} />
          <Route path="/apprentice/advanced-help" element={<AdvancedHelp />} />
        <Route path="*" element={<NotFound />} />
        
      </Route>
    </Routes>
  );
}

export default AppRouter;
