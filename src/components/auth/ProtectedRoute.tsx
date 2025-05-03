
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

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

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
