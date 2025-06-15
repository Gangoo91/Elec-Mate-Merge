
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Shield, Phone, Lightbulb, Heart } from "lucide-react";
import BusinessPlanningTab from "./BusinessPlanningTab";
import LegalComplianceTab from "./LegalComplianceTab";
import SupportResourcesTab from "./SupportResourcesTab";
import ToolsGuidanceTab from "./ToolsGuidanceTab";

const EnhancedStartupTabs = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Starting an Electrical Business</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Your complete guide to establishing and growing a successful electrical contracting business in the UK
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <Tabs defaultValue="planning" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="planning" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Business Planning
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Legal & Compliance
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Support & Resources
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Tools & Operations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planning">
          <BusinessPlanningTab />
        </TabsContent>

        <TabsContent value="legal">
          <LegalComplianceTab />
        </TabsContent>

        <TabsContent value="support">
          <SupportResourcesTab />
        </TabsContent>

        <TabsContent value="tools">
          <ToolsGuidanceTab />
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Starting a business is a significant step that requires careful planning and preparation. 
            While the journey can be challenging, with the right guidance and resources, you can build 
            a successful electrical contracting business. Take your time, seek advice when needed, 
            and remember that every successful business started with a single step.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedStartupTabs;
