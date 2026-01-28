
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import TrialExpiredPaywall from './TrialExpiredPaywall';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, profile, isLoading, isTrialActive, isSubscribed, isCheckingStatus, hasCompletedInitialCheck } = useAuth();
  const location = useLocation();

  // Development mode - full access during development only
  // This is automatically false in production builds
  const isDevelopment = import.meta.env.DEV === true;

  // Check if the current route is the subscription page
  const isSubscriptionPage = location.pathname === '/subscriptions';

  // Check profile directly as fallback - this prevents flash during refresh
  // when derived state (isSubscribed) hasn't updated yet from the new profile
  const hasProfileAccess = profile?.subscribed || profile?.free_access_granted;

  // Check if user can access the page based on subscription/trial status
  // In development mode, always allow access for testing
  const canAccess = isDevelopment || isSubscribed || isTrialActive || hasProfileAccess || isSubscriptionPage;

  // Redirect to sign in if not logged in
  if (!isLoading && !user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Show loading indicator during initial authentication and first subscription check
  // IMPORTANT: Do NOT include isCheckingStatus in loading condition!
  // When isCheckingStatus causes loading state, it unmounts all children (Layout, routes),
  // which loses navigation state and can cause infinite loops on pages like
  // /electrician/live-pricing (components remount, re-fetch data, trigger more checks).
  // Instead, wait only for: auth load, profile fetch, and first subscription check completion.
  // After initial check completes, the app stays stable during any background re-checks.
  if (isLoading || (user && !profile) || (profile && !hasCompletedInitialCheck)) {
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
