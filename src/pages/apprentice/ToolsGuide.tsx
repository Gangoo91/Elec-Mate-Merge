
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HandToolsTab from "@/components/apprentice/tools-guide/HandToolsTab";
import PowerToolsTab from "@/components/apprentice/tools-guide/PowerToolsTab";
import TestEquipmentTab from "@/components/apprentice/tools-guide/TestEquipmentTab";
import PPETab from "@/components/apprentice/tools-guide/PPETab";
import ToolStorage from "@/components/apprentice/tools-guide/ToolStorage";
import RecommendedBrands from "@/components/apprentice/tools-guide/RecommendedBrands";
import BuildingCollection from "@/components/apprentice/tools-guide/BuildingCollection";

const ToolsGuide = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Apprentice Tool Guide</h1>
          <p className="text-muted-foreground">
            Essential tools for UK electrical apprentices
          </p>
        </div>
        <Link to="/apprentice/toolbox">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="hand-tools" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hand-tools">Hand Tools</TabsTrigger>
          <TabsTrigger value="power-tools">Power Tools</TabsTrigger>
          <TabsTrigger value="test-equipment">Test Equipment</TabsTrigger>
          <TabsTrigger value="ppe">PPE & Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="hand-tools">
          <HandToolsTab />
        </TabsContent>

        <TabsContent value="power-tools">
          <PowerToolsTab />
        </TabsContent>

        <TabsContent value="test-equipment">
          <TestEquipmentTab />
        </TabsContent>

        <TabsContent value="ppe">
          <PPETab />
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />

      <ToolStorage />

      <RecommendedBrands />

      <BuildingCollection />
    </div>
  );
};

export default ToolsGuide;
