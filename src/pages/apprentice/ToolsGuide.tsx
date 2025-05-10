
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import HandToolsTab from "@/components/apprentice/tools-guide/HandToolsTab";
import PowerToolsTab from "@/components/apprentice/tools-guide/PowerToolsTab";
import TestEquipmentTab from "@/components/apprentice/tools-guide/TestEquipmentTab";
import PPETab from "@/components/apprentice/tools-guide/PPETab";
import ToolStorage from "@/components/apprentice/tools-guide/ToolStorage";
import RecommendedBrands from "@/components/apprentice/tools-guide/RecommendedBrands";
import BuildingCollection from "@/components/apprentice/tools-guide/BuildingCollection";
import SupplierFinder from "@/components/apprentice/tools-guide/SupplierFinder";

const ToolsGuide = () => {
  const [activeTab, setActiveTab] = useState("hand-tools");
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-4">
          Apprentice Tool Guide
        </h1>
        <Link to="/apprentice/toolbox" className="w-full max-w-xs">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          <Select value={activeTab} onValueChange={handleTabChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select tool category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hand-tools">Hand Tools</SelectItem>
              <SelectItem value="power-tools">Power Tools</SelectItem>
              <SelectItem value="test-equipment">Test Equipment</SelectItem>
              <SelectItem value="ppe">PPE & Safety</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          <Button 
            variant={activeTab === "hand-tools" ? "default" : "outline"}
            onClick={() => handleTabChange("hand-tools")}
            className="w-full"
          >
            Hand Tools
          </Button>
          <Button 
            variant={activeTab === "power-tools" ? "default" : "outline"}
            onClick={() => handleTabChange("power-tools")}
            className="w-full"
          >
            Power Tools
          </Button>
          <Button 
            variant={activeTab === "test-equipment" ? "default" : "outline"}
            onClick={() => handleTabChange("test-equipment")}
            className="w-full"
          >
            Test Equipment
          </Button>
          <Button 
            variant={activeTab === "ppe" ? "default" : "outline"}
            onClick={() => handleTabChange("ppe")}
            className="w-full"
          >
            PPE & Safety
          </Button>
        </div>
      )}

      <Tabs value={activeTab} className="space-y-4">
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

      <SupplierFinder />

      <Separator className="my-6" />

      <ToolStorage />

      <RecommendedBrands />

      <BuildingCollection />
    </div>
  );
};

export default ToolsGuide;
