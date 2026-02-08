
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import TrialExpiredPaywall from './TrialExpiredPaywall';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, profile, isLoading, isSubscribed, hasCompletedInitialCheck } = useAuth();
  const location = useLocation();

  // Development mode - full access during development only
  const isDevelopment = import.meta.env.DEV === true;

  // Pages that authenticated users can always access (even without subscription)
  const isSubscriptionPage = location.pathname === '/subscriptions';
  const isCheckoutPage = location.pathname === '/checkout-trial';
  const isPaymentPage = location.pathname === '/payment-success';

  // Check profile directly as fallback - this prevents flash during refresh
  const hasProfileAccess = profile?.subscribed || profile?.free_access_granted;

  // User can access if they have an active subscription (including Stripe trialing)
  const canAccess = isDevelopment
    || isSubscribed
    || hasProfileAccess
    || isSubscriptionPage
    || isCheckoutPage
    || isPaymentPage;

  // Redirect to sign in if not logged in
  if (!isLoading && !user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Show loading indicator during initial authentication and first subscription check
  if (isLoading || (user && !profile) || (profile && !hasCompletedInitialCheck)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <Loader2 className="h-12 w-12 text-yellow-400 animate-spin" />
        <p className="mt-4 text-yellow-400">Loading...</p>
      </div>
    );
  }

  // User signed up but never completed checkout — redirect to checkout
  if (user && !canAccess && profile?.onboarding_completed === false) {
    return <Navigate to="/checkout-trial" replace />;
  }

  // User had a subscription that expired — show paywall
  if (user && !canAccess) {
    return <TrialExpiredPaywall />;
  }

  // Render the protected content if authenticated and can access
  return <>{children}</>;
};

export default ProtectedRoute;
