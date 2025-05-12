
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading, isTrialActive, isSubscribed, isDevelopmentMode } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if the current route is the subscription page
  const isSubscriptionPage = location.pathname === '/subscriptions';

  // Check if user can access the page based on subscription/trial or dev mode
  const canAccess = isSubscribed || isTrialActive || isDevelopmentMode || isSubscriptionPage;

  useEffect(() => {
    // If authenticated but trial expired and not subscribed, show message
    if (user && !isLoading && !canAccess) {
      toast({
        title: "Trial Expired",
        description: "Your free trial has ended. Please subscribe to continue using Elec-Mate.",
        variant: "destructive",
      });
      
      if (!isSubscriptionPage) {
        navigate('/subscriptions');
      }
    }
  }, [user, isLoading, isTrialActive, isSubscribed, isDevelopmentMode, isSubscriptionPage, navigate, toast]);

  // For development purposes, temporarily allow access regardless of auth status
  // Remove this in production
  return <>{children}</>;
  
  /*
  // Original protected route logic - uncomment when auth system is fully implemented
  // Redirect to sign in if not logged in
  if (!isLoading && !user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-elec-dark">
        <Loader2 className="h-12 w-12 text-elec-yellow animate-spin" />
        <p className="mt-4 text-elec-yellow">Loading...</p>
      </div>
    );
  }

  // Check if user can access based on trial/subscription status or dev mode
  if (user && !canAccess) {
    return <Navigate to="/subscriptions" replace />;
  }

  // Render the protected content if authenticated and can access
  return <>{children}</>;
  */
};

export default ProtectedRoute;
