
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewStats from "@/components/admin/dashboard/overview/OverviewStats";
import QuickTasks from "@/components/admin/dashboard/overview/QuickTasks";
import OverviewCards from "@/components/admin/dashboard/overview/OverviewCards";
import RecentActivity from "@/components/admin/dashboard/overview/RecentActivity";
import AdminHeader from "@/components/admin/dashboard/AdminHeader";
import AdminNotice from "@/components/admin/dashboard/overview/AdminNotice";
import { SystemEvent } from "@/components/admin/dashboard/types";

const AdminDashboard = () => {
  // Sample events for the RecentActivity component
  const events: SystemEvent[] = [
    {
      id: 1,
      event: "New user registered",
      date: "Just now",
      severity: "info"
    },
    {
      id: 2,
      event: "System update completed",
      date: "2h ago",
      severity: "success"
    },
    {
      id: 3,
      event: "Failed login attempt",
      date: "5h ago",
      severity: "warning"
    },
    {
      id: 4,
      event: "Database backup error",
      date: "1d ago",
      severity: "error"
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <AdminHeader isDevelopmentMode={true} isAdmin={true} />
      <AdminNotice />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewStats />
          <OverviewCards events={events} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Recent system activities and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity events={events} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Tasks</CardTitle>
                <CardDescription>
                  Pending actions and common tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuickTasks />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
