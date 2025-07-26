
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

// Admin Dashboard Components
import AdminHeader from "@/components/admin/dashboard/AdminHeader";
import AdminDashboardTabs from "@/components/admin/dashboard/AdminDashboardTabs";
import OverviewStats from "@/components/admin/dashboard/overview/OverviewStats";
import OverviewCards from "@/components/admin/dashboard/overview/OverviewCards";
import AdminNotice from "@/components/admin/dashboard/overview/AdminNotice";
import UserManagement from "@/components/admin/dashboard/users/UserManagement";
import ContentManagement from "@/components/admin/dashboard/content/ContentManagement";
import AnalyticsDashboard from "@/components/admin/dashboard/analytics/AnalyticsDashboard";
import SystemSettings from "@/components/admin/dashboard/system/SystemSettings";

// Types
import { MockUser, ContentItem, SystemEvent } from "@/components/admin/dashboard/types";

// Mock data for the admin dashboard
const mockUsers: MockUser[] = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "electrician", lastActive: "2025-05-08" },
  { id: 2, name: "Sarah Wilson", email: "sarah@example.com", role: "apprentice", lastActive: "2025-05-09" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "employer", lastActive: "2025-05-07" },
  { id: 4, name: "Emma Brown", email: "emma@example.com", role: "apprentice", lastActive: "2025-05-09" },
];

const mockContent: ContentItem[] = [
  { id: 1, title: "Electrical Installation Fundamentals", type: "Course", author: "Admin", lastUpdated: "2025-05-05", status: "Published" },
  { id: 2, title: "Circuit Design & Analysis", type: "Course", author: "Admin", lastUpdated: "2025-05-02", status: "Published" },
  { id: 3, title: "Safety First Blog Post", type: "Article", author: "John Smith", lastUpdated: "2025-05-09", status: "Draft" },
  { id: 4, title: "Weekly Quiz: Electrical Regulations", type: "Quiz", author: "Admin", lastUpdated: "2025-05-07", status: "Published" },
];

const mockSystemEvents: SystemEvent[] = [
  { id: 1, event: "New user registration", date: "2025-05-09 14:32", severity: "info" },
  { id: 2, event: "Failed login attempt", date: "2025-05-09 10:15", severity: "warning" },
  { id: 3, event: "Course content updated", date: "2025-05-08 16:45", severity: "info" },
  { id: 4, event: "Database backup completed", date: "2025-05-08 03:00", severity: "success" },
  { id: 5, event: "API rate limit exceeded", date: "2025-05-07 11:23", severity: "error" },
];

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
    return null; // This will be handled by AdminLayout
  }
  
  return (
    <div className="space-y-6">
      <AdminHeader isDevelopmentMode={isDevelopmentMode} isAdmin={!!profile?.role} />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-gray-400">Manage your application settings, users, and content.</p>
        
        <div className="flex flex-wrap gap-2">
          <p className="text-sm text-muted-foreground">Admin dashboard tools coming soon</p>
        </div>
      </div>
      
      <AdminDashboardTabs
        overviewContent={
          <>
            <OverviewStats />
            <OverviewCards events={mockSystemEvents} />
            <AdminNotice />
          </>
        }
        usersContent={<UserManagement users={mockUsers} />}
        contentManagerContent={<ContentManagement contentItems={mockContent} />}
        analyticsContent={<AnalyticsDashboard />}
        systemContent={<SystemSettings events={mockSystemEvents} />}
      />
    </div>
  );
};

export default AdminDashboard;
