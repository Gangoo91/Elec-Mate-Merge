
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './components/notifications/NotificationProvider';
import { useEffect, useState } from 'react';
import { supabase } from './integrations/supabase/client';

// Import the new components
import ReferenceMaterials from "./pages/apprentice/reference-materials/ReferenceMaterials";
import PracticalTips from "./pages/apprentice/practical-tips/PracticalTips";
import InstallationTechniques from "./pages/apprentice/installation-techniques/InstallationTechniques";
import ApprenticeChat from "./pages/apprentice/chat/ApprenticeChat";
import ElectricalChat from "./pages/electrician/ElectricalChat";

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
      element: <div>Layout</div>,
      children: [
        {
          path: '/',
          element: <div>Home</div>,
        },
        {
          path: '/about',
          element: <div>About</div>,
        },
        {
          path: '/contact',
          element: <div>Contact</div>,
        },
        {
          path: '/pricing',
          element: <div>PricingPage</div>,
        },
        {
          path: '/subscription-success',
          element: <div>SubscriptionSuccess</div>,
        },
        {
          path: '/subscription-cancel',
          element: <div>SubscriptionCancel</div>,
        },
        {
          path: '/account',
          element: <div>Account</div>,
        },
        {
          path: '/electrician/dashboard',
          element: <div>ElectricianDashboard</div>,
        },
        {
          path: '/electrician/calculators',
          element: <div>ElectricalCalculators</div>,
        },
        {
          path: '/electrician/chat',
          element: <ElectricalChat />,
        },
        {
          path: '/electrician/ai-assistant',
          element: <div>AIAssistantPage</div>,
        },
        {
          path: '/electrician/regulations-assistant',
          element: <div>RegulationsAssistantPage</div>,
        },
        {
          path: '/apprentice/hub',
          element: <div>ApprenticeHub</div>,
        },
        {
          path: '/apprentice/toolbox',
          element: <div>ApprenticeToolbox</div>,
        },
        {
          path: '/apprentice/tools-guide',
          element: <div>BasicToolsGuide</div>,
        },
        {
          path: '/apprentice/safety-fundamentals',
          element: <div>SafetyFundamentals</div>,
        },
        {
          path: '/messenger',
          element: <div>MessengerPage</div>,
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
      element: <div>AuthRoutes</div>,
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
