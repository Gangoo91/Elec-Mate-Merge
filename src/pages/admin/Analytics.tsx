
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { supabase } from "@/integrations/supabase/client";

// Import refactored components
import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import AnalyticsNotices from "@/components/admin/analytics/AnalyticsNotices";
import AnalyticsTabs from "@/components/admin/analytics/AnalyticsTabs";
import AnalyticsContent from "@/components/admin/analytics/AnalyticsContent";
import AnalyticsFooter from "@/components/admin/analytics/AnalyticsFooter";
import AnalyticsDialog from "@/components/admin/analytics/AnalyticsDialog";

const ANALYTICS_CHANNEL = 'admin-analytics-updates';

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { user, profile, isDevelopmentMode } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { addNotification } = useNotifications();
  const [showGaSetup, setShowGaSetup] = useState(false);
  const [gaInitialized, setGaInitialized] = useState(false);
  
  // Initialize Google Analytics
  const { isInitialized, trackPageView } = useGoogleAnalytics();
  
  useEffect(() => {
    setGaInitialized(isInitialized);
    
    // Track page view on component mount and when analytics is initialized
    if (isInitialized) {
      trackPageView('/admin/analytics', 'Admin Analytics');
    }
  }, [isInitialized]);
  
  // Check if the user is authorized to access the admin page
  useEffect(() => {
    const checkAuth = async () => {
      if (isDevelopmentMode) {
        setIsAuthorized(true);
        return;
      }
      
      // Here you would check if the user has admin privileges
      // For example, checking a role in their profile
      const isAdmin = profile?.username === 'admin'; // Replace with actual admin check
      setIsAuthorized(isAdmin);
      
      if (!isAdmin && !isDevelopmentMode) {
        navigate('/');
      }
    };
    
    checkAuth();
  }, [user, profile, isDevelopmentMode, navigate]);

  // Set up realtime subscription for analytics updates
  useEffect(() => {
    if (!isAuthorized) return;

    const channel = supabase
      .channel(ANALYTICS_CHANNEL)
      .on('broadcast', { event: 'analytics-update' }, (payload) => {
        toast({
          title: "Analytics Updated",
          description: `New data available: ${payload.payload.message}`,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthorized]);

  // Track tab changes
  useEffect(() => {
    if (isInitialized) {
      trackPageView(`/admin/analytics/${activeTab}`, `Admin Analytics - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`);
    }
  }, [activeTab, isInitialized]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate analytics refresh
    setTimeout(() => {
      setRefreshing(false);
      addNotification({
        title: "Analytics Refreshed",
        message: `Data updated as of ${format(new Date(), 'PPpp')}`,
        type: "success"
      });
      
      // Track refresh event if GA is initialized
      if (isInitialized) {
        trackPageView('/admin/analytics', 'Admin Analytics - Data Refresh');
      }
    }, 1500);
  };

  const handleExport = () => {
    // In a real implementation, this would generate an export file
    toast({
      title: "Export Started",
      description: "Your analytics export is being prepared and will download shortly.",
    });
    
    // Simulate download after delay
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
        JSON.stringify({
          exportDate: new Date(),
          timeRange: timeRange,
          data: "Analytics data would be here in a real implementation"
        })
      );
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `elecmate-analytics-${format(new Date(), 'yyyy-MM-dd')}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      // Track export event if GA is initialized
      if (isInitialized) {
        trackPageView('/admin/analytics/export', 'Admin Analytics - Data Export');
      }
    }, 1500);
  };

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
      <AnalyticsHeader 
        gaInitialized={gaInitialized}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        handleExport={handleExport}
        showGaSetup={showGaSetup}
        setShowGaSetup={setShowGaSetup}
      />
      
      <AnalyticsNotices 
        isDevelopmentMode={isDevelopmentMode}
        gaInitialized={gaInitialized}
        setShowGaSetup={setShowGaSetup}
      />
      
      <AnalyticsTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      
      <AnalyticsContent
        activeTab={activeTab}
        timeRange={timeRange}
      />
      
      <AnalyticsFooter gaInitialized={gaInitialized} />
      
      <Dialog open={showGaSetup} onOpenChange={setShowGaSetup}>
        <AnalyticsDialog />
      </Dialog>
    </div>
  );
};

export default AdminAnalytics;
