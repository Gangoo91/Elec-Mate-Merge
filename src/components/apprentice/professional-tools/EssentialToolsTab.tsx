
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Zap, Shield, Eye } from "lucide-react";
import HandToolsTab from "@/components/apprentice/tools-guide/HandToolsTab";
import PowerToolsTab from "@/components/apprentice/tools-guide/PowerToolsTab";
import TestEquipmentTab from "@/components/apprentice/tools-guide/TestEquipmentTab";
import PPETab from "@/components/apprentice/tools-guide/PPETab";

const EssentialToolsTab = () => {
  const toolCategories = [
    { name: "Hand Tools", count: "15-20 essential items", priority: "High", cost: "£200-400" },
    { name: "Power Tools", count: "5-8 key tools", priority: "Medium", cost: "£300-800" },
    { name: "Test Equipment", count: "3-5 instruments", priority: "Critical", cost: "£400-1200" },
    { name: "PPE & Safety", count: "Complete safety kit", priority: "Critical", cost: "£150-300" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Professional Tool Categories</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolCategories.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-white mb-2">{category.name}</h4>
                <div className="text-sm text-elec-yellow mb-1">{category.count}</div>
                <Badge 
                  variant="outline" 
                  className={`mb-2 ${
                    category.priority === 'Critical' ? 'border-red-500/40 text-red-400' :
                    category.priority === 'High' ? 'border-orange-500/40 text-orange-400' :
                    'border-blue-500/40 text-blue-400'
                  }`}
                >
                  {category.priority} Priority
                </Badge>
                <p className="text-xs text-muted-foreground">{category.cost}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="hand-tools" className="w-full">
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
    </div>
  );
};

export default EssentialToolsTab;
