
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import TrialExpiredPaywall from './TrialExpiredPaywall';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading, isTrialActive, isSubscribed, isCheckingStatus } = useAuth();
  const location = useLocation();

  // Development mode - full access during development only
  // This is automatically false in production builds
  const isDevelopment = import.meta.env.DEV === true;

  // Check if the current route is the subscription page
  const isSubscriptionPage = location.pathname === '/subscriptions';

  // Check if user can access the page based on subscription/trial status
  // In development mode, always allow access for testing
  const canAccess = isDevelopment || isSubscribed || isTrialActive || isSubscriptionPage;

  // Redirect to sign in if not logged in
  if (!isLoading && !user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Show loading indicator only while checking initial authentication
  // Subscription check now runs in background - we use profile.subscribed for instant access
  // This prevents mobile from hanging on slow serverless function calls
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <Loader2 className="h-12 w-12 text-yellow-400 animate-spin" />
        <p className="mt-4 text-yellow-400">Loading...</p>
      </div>
    );
  }

  // Check if user can access based on trial/subscription status
  // Show paywall instead of hard redirect for better UX
  if (user && !canAccess) {
    return <TrialExpiredPaywall />;
  }

  // Render the protected content if authenticated and can access
  return <>{children}</>;
};

export default ProtectedRoute;
