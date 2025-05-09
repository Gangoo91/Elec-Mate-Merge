import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  // For mobile devices, use accordions instead of tabs
  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="overview">
        <AccordionItem value="overview" className="border rounded-md bg-elec-card shadow-sm">
          <AccordionTrigger className="font-medium text-elec-yellow px-4 py-3 hover:no-underline">
            Overview
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {overviewContent}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="users" className="border rounded-md bg-elec-card shadow-sm">
          <AccordionTrigger className="font-medium text-elec-light px-4 py-3 hover:no-underline">
            Users
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {usersContent}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="content" className="border rounded-md bg-elec-card shadow-sm">
          <AccordionTrigger className="font-medium text-elec-light px-4 py-3 hover:no-underline">
            Content
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {contentManagerContent}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="analytics" className="border rounded-md bg-elec-card shadow-sm">
          <AccordionTrigger className="font-medium text-elec-light px-4 py-3 hover:no-underline">
            Analytics
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {analyticsContent}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="system" className="border rounded-md bg-elec-card shadow-sm">
          <AccordionTrigger className="font-medium text-elec-light px-4 py-3 hover:no-underline">
            System
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {systemContent}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
  
  // For desktop, keep the tabs interface
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="overflow-x-auto w-full flex justify-start">
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
