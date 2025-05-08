import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ElectricianDashboard from './pages/electrician/ElectricianDashboard';
import ApprenticeHub from './pages/apprentice/ApprenticeHub';
import ApprenticeToolbox from './pages/apprentice/ApprenticeToolbox';
import ElectricalCalculators from './pages/electrician/ElectricalCalculators';
import ElectricalChat from './pages/electrician/ElectricalChat';
import AIAssistantPage from './pages/electrician/AIAssistantPage';
import RegulationsAssistantPage from './pages/electrician/RegulationsAssistantPage';
import MessengerPage from './pages/Messenger';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './components/notifications/NotificationProvider';
import { useEffect, useState } from 'react';
import { supabase } from './integrations/supabase/client';
import AuthRoutes from './components/auth/AuthRoutes';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import Account from './pages/Account';
import PricingPage from './pages/Pricing';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import SubscriptionCancel from './pages/SubscriptionCancel';
import BasicToolsGuide from './pages/apprentice/BasicToolsGuide';
import SafetyFundamentals from './pages/apprentice/SafetyFundamentals';

// Import the new components
import ReferenceMaterials from "./pages/apprentice/reference-materials/ReferenceMaterials";
import PracticalTips from "./pages/apprentice/practical-tips/PracticalTips";
import InstallationTechniques from "./pages/apprentice/installation-techniques/InstallationTechniques";
import ApprenticeChat from "./pages/apprentice/chat/ApprenticeChat";

const App = () => {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/contact',
          element: <Contact />,
        },
		    {
          path: '/pricing',
          element: <PricingPage />,
        },
        {
          path: '/subscription-success',
          element: <SubscriptionSuccess />,
        },
        {
          path: '/subscription-cancel',
          element: <SubscriptionCancel />,
        },
        {
          path: '/account',
          element: (
            <ProtectedRoutes>
              <Account session={session} />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/electrician/dashboard',
          element: (
            <ProtectedRoutes>
              <ElectricianDashboard />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/electrician/calculators',
          element: (
            <ProtectedRoutes>
              <ElectricalCalculators />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/electrician/chat',
          element: (
            <ProtectedRoutes>
              <ElectricalChat />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/electrician/ai-assistant',
          element: (
            <ProtectedRoutes>
              <AIAssistantPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/electrician/regulations-assistant',
          element: (
            <ProtectedRoutes>
              <RegulationsAssistantPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/apprentice/hub',
          element: (
            <ProtectedRoutes>
              <ApprenticeHub />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/apprentice/toolbox',
          element: (
            <ProtectedRoutes>
              <ApprenticeToolbox />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/apprentice/tools-guide',
          element: (
            <ProtectedRoutes>
              <BasicToolsGuide />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/apprentice/safety-fundamentals',
          element: (
            <ProtectedRoutes>
              <SafetyFundamentals />
            </ProtectedRoutes>
          ),
        },
        {
          path: '/messenger',
          element: (
            <ProtectedRoutes>
              <MessengerPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/apprentice/reference-materials",
          element: <ReferenceMaterials />,
        },
        {
          path: "/apprentice/practical-tips",
          element: <PracticalTips />,
        },
        {
          path: "/apprentice/installation-techniques",
          element: <InstallationTechniques />,
        },
        {
          path: "/apprentice/chat",
          element: <ApprenticeChat />,
        },
      ],
    },
    {
      path: '/auth',
      element: <AuthRoutes />,
    },
  ]);

  return (
    <AuthProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
