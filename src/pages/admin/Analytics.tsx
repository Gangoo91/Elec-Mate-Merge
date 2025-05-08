
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  BarChart, 
  Users, 
  Filter,
  Download,
  RefreshCw,
  Settings
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import RealTimeUsers from "@/components/admin/RealTimeUsers";
import UserRetentionChart from "@/components/admin/UserRetentionChart";
import UserSegments from "@/components/admin/UserSegments";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import GoogleAnalyticsSetup from "@/components/admin/GoogleAnalyticsSetup";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart className="h-6 w-6 text-elec-yellow" />
          <h1 className="text-2xl font-bold tracking-tight">Admin Analytics</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showGaSetup} onOpenChange={setShowGaSetup}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Configure GA
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Google Analytics Configuration</DialogTitle>
                <DialogDescription>
                  Set up and configure Google Analytics for enhanced tracking capabilities
                </DialogDescription>
              </DialogHeader>
              <GoogleAnalyticsSetup />
            </DialogContent>
          </Dialog>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
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
      </div>
      
      {isDevelopmentMode && (
        <Alert className="bg-amber-500/10 border-amber-500/20 mb-6">
          <Shield className="h-4 w-4 text-amber-500" />
          <AlertTitle>Development Mode</AlertTitle>
          <AlertDescription>
            You are viewing this page in development mode. In production, this would only be accessible to admin users.
            <br />
            You can find the Admin Analytics page in the sidebar when development mode is enabled.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-[400px]" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Time Range:</span>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {activeTab === "overview" && (
        <AnalyticsDashboard timeRange={timeRange} />
      )}
      
      {activeTab === "users" && (
        <div className="space-y-6">
          <UserSegments />
          <RealTimeUsers />
        </div>
      )}
      
      {activeTab === "retention" && (
        <UserRetentionChart timeRange={timeRange} />
      )}
      
      {activeTab === "content" && (
        <div className="space-y-6">
          <Alert>
            <AlertTitle>Content Analytics</AlertTitle>
            <AlertDescription>
              The content analytics module is currently being enhanced. 
              Check back soon for detailed insights on your app's content performance.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-8 p-4 border border-elec-yellow/20 rounded-md bg-elec-dark">
        <p className="font-medium">Admin Access Notice</p>
        <p>This page is only visible to administrators or when development mode is enabled.</p>
        <p>Regular users cannot access this analytics dashboard.</p>
        <p className="mt-2 text-elec-yellow">Google Analytics integration is available. Click the "Configure GA" button to set up your Google Analytics credentials.</p>
      </div>
    </div>
  );
};

export default AdminAnalytics;
