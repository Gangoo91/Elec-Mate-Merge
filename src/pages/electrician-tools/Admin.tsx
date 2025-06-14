
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, BarChart4, Users, Heart } from "lucide-react";
import BusinessManagementTab from "@/components/electrician-tools/admin/BusinessManagementTab";
import DocumentationTab from "@/components/electrician-tools/admin/DocumentationTab";
import AnalyticsTab from "@/components/electrician-tools/admin/AnalyticsTab";
import StaffManagementTab from "@/components/electrician-tools/admin/StaffManagementTab";

const Admin = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Business Administration Hub</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Streamline your electrical business operations with professional tools designed for the trade. 
          Manage projects, staff, compliance, and finances all in one place.
        </p>
        <BackButton customUrl="/electrician-tools" label="Back to Electrical Workshop" />
      </div>

      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Business
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Staff
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business">
          <BusinessManagementTab />
        </TabsContent>

        <TabsContent value="documentation">
          <DocumentationTab />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="staff">
          <StaffManagementTab />
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Built for Electricians
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Every tool in this hub is designed specifically for electrical contractors. From compliance tracking 
            to client management, we understand the unique challenges of running an electrical business. 
            Spend less time on paperwork and more time doing what you do best.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
