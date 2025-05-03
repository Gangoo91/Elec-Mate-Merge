
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading, isTrialActive, isSubscribed } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if the current route is the subscription page
  const isSubscriptionPage = location.pathname === '/subscriptions';

  // Check if user can access the page based on subscription/trial
  const canAccess = isSubscribed || isTrialActive || isSubscriptionPage;

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
  }, [user, isLoading, isTrialActive, isSubscribed, isSubscriptionPage, navigate, toast]);

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

  // Check if user can access based on trial/subscription status
  if (user && !canAccess) {
    return <Navigate to="/subscriptions" replace />;
  }

  // Render the protected content if authenticated and can access
  return <>{children}</>;
};

export default ProtectedRoute;
