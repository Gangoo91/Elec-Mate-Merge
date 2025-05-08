
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import ElectricalChat from './pages/electrician/ElectricalChat';
import ApprenticeChat from './pages/apprentice/ApprenticeChat';
import SettingsPage from './pages/Settings';
import SubscriptionsPage from './pages/Subscriptions';
import PaymentSuccess from './pages/PaymentSuccess';
import NotFound from './pages/NotFound';
import ElectricianTools from './pages/ElectricianTools';
import Admin from './pages/electrician-tools/Admin';
import { AdminAnalytics } from './pages/admin/index';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './components/notifications/NotificationProvider';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-elec-dark text-white">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              {/* Auth routes */}
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              
              {/* Protected routes */}
              <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/electrical-chat" element={<ElectricalChat />} />
                <Route path="/apprentice-chat" element={<ApprenticeChat />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route path="/electrician-tools" element={<ElectricianTools />} />
                <Route path="/electrician-tools/admin" element={<Admin />} />
                
                {/* Admin routes */}
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
              </Route>

              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
