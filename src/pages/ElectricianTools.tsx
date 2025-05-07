import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoltageDropCalculator from "@/components/electrician-tools/VoltageDropCalculator";
import LoadCalculator from "@/components/electrician-tools/LoadCalculator";
import AdditionalCalculators from "@/components/electrician-tools/AdditionalCalculators";
import DocumentTemplates from "@/components/electrician-tools/DocumentTemplates";
import ProjectManagement from "@/components/electrician-tools/ProjectManagement";
import FeaturedTool from "@/components/electrician-tools/FeaturedTool";

const ElectricianTools = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Electrician Tools</h1>
        <p className="text-muted-foreground">
          Professional resources to enhance your efficiency in the field.
        </p>
      </div>

      <Tabs defaultValue="calculators" className="space-y-4">
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="calculators">Calculators</TabsTrigger>
          <TabsTrigger value="documents">Document Templates</TabsTrigger>
          <TabsTrigger value="projects">Workstation</TabsTrigger>
        </TabsList>
        
        {/* Calculators Tab */}
        <TabsContent value="calculators" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <VoltageDropCalculator />
            <LoadCalculator />
          </div>
          <AdditionalCalculators />
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <DocumentTemplates />
        </TabsContent>
        
        {/* Projects Tab - renamed to Workstation */}
        <TabsContent value="projects" className="space-y-4">
          <ProjectManagement />
        </TabsContent>
      </Tabs>

      {/* Featured Tool */}
      <FeaturedTool />
    </div>
  );
};

export default ElectricianTools;
