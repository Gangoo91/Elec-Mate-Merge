
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, CheckCircle, Store, Calculator, FileText, Heart, Users } from "lucide-react";
import EssentialToolsTab from "@/components/apprentice/professional-tools/EssentialToolsTab";
import ToolSelectionTab from "@/components/apprentice/professional-tools/ToolSelectionTab";
import SuppliersAndCostsTab from "@/components/apprentice/professional-tools/SuppliersAndCostsTab";
import InteractiveToolsTab from "@/components/apprentice/professional-tools/InteractiveToolsTab";

const ProfessionalToolGuide = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Professional Tool Guide</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Complete guidance for building your professional electrician toolkit - from essential tools to smart purchasing decisions
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Tabs defaultValue="essential" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="essential" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Essential Tools
          </TabsTrigger>
          <TabsTrigger value="selection" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Tool Selection
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Suppliers & Costs
          </TabsTrigger>
          <TabsTrigger value="interactive" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Interactive Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="essential">
          <EssentialToolsTab />
        </TabsContent>

        <TabsContent value="selection">
          <ToolSelectionTab />
        </TabsContent>

        <TabsContent value="suppliers">
          <SuppliersAndCostsTab />
        </TabsContent>

        <TabsContent value="interactive">
          <InteractiveToolsTab />
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
            Building a professional toolkit is an investment in your career. Focus on quality over quantity, 
            and build your collection gradually. A well-maintained set of quality tools will serve you throughout 
            your entire electrical career.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalToolGuide;
