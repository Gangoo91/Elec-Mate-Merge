
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminLayout = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  // Check if user has admin privileges
  useEffect(() => {
    // In a real app, this would check against a roles table
    // For this example, we're using a simulated role in the profile
    if (!user || !profile || profile.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, profile, navigate]);
  
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
        </p>
      </div>
      
      <Outlet />
    </div>
  );
};

export default AdminLayout;
