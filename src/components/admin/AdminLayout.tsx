
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Shield, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
  const { user, profile, isDevelopmentMode } = useAuth();
  const navigate = useNavigate();
  
  // Check if user has admin privileges or development mode is enabled
  useEffect(() => {
    // Allow access if user is admin or development mode is enabled
    const hasAccess = profile?.role === "admin" || isDevelopmentMode;
    
    if (!hasAccess) {
      navigate("/dashboard");
    }
  }, [user, profile, isDevelopmentMode, navigate]);
  
  // Show authentication required message if no user
  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-400">Please sign in to access the admin panel.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="border border-yellow-500/30 bg-yellow-950/20 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-medium text-yellow-500">Admin Area</h2>
        </div>
        <p className="text-sm text-yellow-300/70">
          You are currently in the administration area. Changes made here will affect all users.
          {isDevelopmentMode && (
            <span className="ml-1 font-semibold">Development mode enabled - admin access granted.</span>
          )}
        </p>
      </div>
      
      <Outlet />
    </div>
  );
};

export default AdminLayout;
