
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Users, FileText, Activity, Code } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const { user, profile, isDevelopmentMode } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // Check if the user has admin privileges
  useEffect(() => {
    // Allow access if user is admin or development mode is enabled
    const hasAccess = profile?.role === "admin" || isDevelopmentMode;
    
    if (hasAccess) {
      setIsAdmin(true);
    } else {
      // Redirect non-admin users
      navigate("/dashboard");
    }
  }, [user, profile, isDevelopmentMode, navigate]);
  
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        {isDevelopmentMode && !profile?.role && (
          <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-500/30 flex items-center gap-1">
            <Code className="h-3.5 w-3.5" />
            Dev Mode Access
          </Badge>
        )}
      </div>
      <p className="text-gray-400">Manage your application settings and users.</p>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-medium">Total Users</h3>
              </div>
              <p className="text-2xl font-bold">2,431</p>
              <p className="text-xs text-gray-400 mt-1">+12% from last month</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-medium">Active Sessions</h3>
              </div>
              <p className="text-2xl font-bold">143</p>
              <p className="text-xs text-gray-400 mt-1">Current active users</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-medium">Content Items</h3>
              </div>
              <p className="text-2xl font-bold">872</p>
              <p className="text-xs text-gray-400 mt-1">Across all categories</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <h3 className="text-sm font-medium">Issues</h3>
              </div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-gray-400 mt-1">Require attention</p>
            </Card>
          </div>
          
          <div>
            <Alert className="bg-yellow-900/20 text-yellow-500 border-yellow-500/30">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Admin Portal Notice</AlertTitle>
              <AlertDescription>
                This is a preview of the admin dashboard. In a real implementation, 
                you would connect this to your database to display actual statistics.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">User Management</h3>
            <p className="text-gray-400">
              This section would contain user management functionality, including listing users, 
              editing user details, managing permissions, and more.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Content Management</h3>
            <p className="text-gray-400">
              This section would provide tools for managing site content, like courses, 
              articles, videos, and other educational resources.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Analytics Dashboard</h3>
            <p className="text-gray-400">
              Here you would find analytics data showing user engagement, 
              popular content, learning progress statistics, and other metrics.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
