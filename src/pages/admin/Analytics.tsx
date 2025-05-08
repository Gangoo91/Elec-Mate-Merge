
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { user, profile, isDevelopmentMode } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Check if the user is authorized to access the admin page
  // In a production app, you would check for a specific admin role
  // For now, we'll allow access in development mode only
  useEffect(() => {
    const checkAuth = async () => {
      if (isDevelopmentMode) {
        setIsAuthorized(true);
        return;
      }
      
      // Here you would check if the user has admin privileges
      // For example, checking a role in their profile
      // Placeholder for actual admin check logic
      const isAdmin = profile?.username === 'admin'; // Replace with actual admin check
      setIsAuthorized(isAdmin);
      
      if (!isAdmin && !isDevelopmentMode) {
        navigate('/');
      }
    };
    
    checkAuth();
  }, [user, profile, isDevelopmentMode, navigate]);

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Checking authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart className="h-6 w-6 text-elec-yellow" />
          <h1 className="text-2xl font-bold tracking-tight">Admin Analytics</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      
      <AnalyticsDashboard />
      
      <div className="text-xs text-muted-foreground mt-8 p-4 border border-elec-yellow/20 rounded-md bg-elec-dark">
        <p className="font-medium">Admin Access Notice</p>
        <p>This page is only visible to administrators or when development mode is enabled.</p>
        <p>Regular users cannot access this analytics dashboard.</p>
      </div>
    </div>
  );
};

export default AdminAnalytics;
