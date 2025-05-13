
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewStats } from "@/components/admin/dashboard/overview/OverviewStats";
import { QuickTasks } from "@/components/admin/dashboard/overview/QuickTasks";
import { OverviewCards } from "@/components/admin/dashboard/overview/OverviewCards";
import { RecentActivity } from "@/components/admin/dashboard/overview/RecentActivity";
import { AdminHeader } from "@/components/admin/dashboard/AdminHeader";
import { AdminNotice } from "@/components/admin/dashboard/overview/AdminNotice";

const AdminDashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <AdminHeader />
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <OverviewCards />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Recent system activities and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
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
