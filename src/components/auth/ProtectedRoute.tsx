import { ReactNode, useRef, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRevenueCat } from '@/hooks/useRevenueCat';
import { Loader2 } from 'lucide-react';
import TrialExpiredPaywall from './TrialExpiredPaywall';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, profile, isLoading, isSubscribed, hasCompletedInitialCheck } = useAuth();
  const { isProEntitled, isNative } = useRevenueCat(user?.id);
  const location = useLocation();
  const isMounted = useRef(true);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  // Development mode - full access during development only
  const isDevelopment = import.meta.env.DEV === true;

  // Pages that authenticated users can always access (even without subscription)
  const isSubscriptionPage = location.pathname === '/subscriptions';
  const isCheckoutPage = location.pathname === '/checkout-trial';
  const isPaymentPage = location.pathname === '/payment-success';

  // Check profile directly as fallback - this prevents flash during refresh.
  // Trust `subscribed` — it is set by Stripe/RevenueCat webhooks (ELE-432).
  const hasProfileAccess = profile?.subscribed || profile?.free_access_granted;

  // ELE-509: On native, also check RevenueCat entitlements directly — this is the
  // source of truth right after an IAP purchase (before the webhook updates Supabase)
  const canAccess =
    isDevelopment ||
    isSubscribed ||
    hasProfileAccess ||
    isProEntitled ||
    isSubscriptionPage ||
    isCheckoutPage ||
    isPaymentPage;

  // Redirect to sign in if not logged in (skip during exit animations to prevent frozen UI)
  if (!isLoading && !user) {
    if (!isMounted.current) return null;
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Show loading indicator during initial authentication and first subscription check
  if (
    isLoading ||
    (user && !profile) ||
    (profile && !hasCompletedInitialCheck && !hasProfileAccess)
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <Loader2 className="h-12 w-12 text-yellow-400 animate-spin" />
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
