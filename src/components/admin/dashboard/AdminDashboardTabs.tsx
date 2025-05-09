
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminDashboardTabsProps {
  overviewContent: ReactNode;
  usersContent: ReactNode;
  contentManagerContent: ReactNode;
  analyticsContent: ReactNode;
  systemContent: ReactNode;
}

const AdminDashboardTabs = ({ 
  overviewContent, 
  usersContent, 
  contentManagerContent, 
  analyticsContent, 
  systemContent 
}: AdminDashboardTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="overflow-x-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="system">System</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="users" className="space-y-4">
        {usersContent}
      </TabsContent>
      
      <TabsContent value="content" className="space-y-4">
        {contentManagerContent}
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-4">
        {analyticsContent}
      </TabsContent>
      
      <TabsContent value="system" className="space-y-4">
        {systemContent}
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboardTabs;
