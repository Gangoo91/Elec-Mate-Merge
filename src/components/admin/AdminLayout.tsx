
import { useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Shield, AlertTriangle, Menu, ToggleRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { user, profile, isDevelopmentMode, toggleDevelopmentMode } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
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
    <div className="space-y-4 sm:space-y-6">
      <div className="border border-yellow-500/30 bg-yellow-950/20 p-3 sm:p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-medium text-yellow-500">Admin Area</h2>
          
          <div className="ml-auto flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className={`h-7 ${isDevelopmentMode ? 'bg-yellow-950/50 border-yellow-500/50' : ''}`}
              onClick={toggleDevelopmentMode}
            >
              <ToggleRight className={`h-4 w-4 mr-1 ${isDevelopmentMode ? 'text-yellow-500' : ''}`} />
              <span className="text-xs">
                {isDevelopmentMode ? 'Dev Mode: ON' : 'Dev Mode: OFF'}
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7" asChild>
              <Link to="/dashboard" className="text-xs">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
        <p className="text-sm text-yellow-300/70">
          You are currently in the administration area.
          {!isMobile && " Changes made here will affect all users."}
          {isDevelopmentMode && (
            <span className="ml-1 font-semibold block sm:inline-block">Development mode enabled</span>
          )}
        </p>
      </div>
      
      <Outlet />
    </div>
  );
};

export default AdminLayout;
