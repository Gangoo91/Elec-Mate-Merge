
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Zap, Shield, Eye, AlertTriangle, Info } from "lucide-react";
import HandToolsTab from "@/components/apprentice/tools-guide/HandToolsTab";
import PowerToolsTab from "@/components/apprentice/tools-guide/PowerToolsTab";
import TestEquipmentTab from "@/components/apprentice/tools-guide/TestEquipmentTab";
import PPETab from "@/components/apprentice/tools-guide/PPETab";

const EssentialToolsTab = () => {
  const toolOverview = [
    {
      category: "Hand Tools",
      icon: <Wrench className="h-5 w-5" />,
      items: [
        "VDE insulated screwdrivers (essential sizes)",
        "Combination pliers and side cutters",
        "Wire strippers with crimping function",
        "Adjustable wrench and spanners",
        "Measuring tools and markers"
      ]
    },
    {
      category: "Power Tools",
      icon: <Zap className="h-5 w-5" />,
      items: [
        "18V cordless drill system with batteries",
        "LED inspection torch (rechargeable)",
        "Angle grinder for cutting work",
        "SDS drill for masonry work",
        "Cable fishing and access tools"
      ]
    },
    {
      category: "Test Equipment",
      icon: <Eye className="h-5 w-5" />,
      items: [
        "2-pole voltage indicator with proving unit",
        "Multifunction installation tester",
        "RCD tester for all types",
        "Insulation resistance tester",
        "Professional test lead sets"
      ]
    },
    {
      category: "PPE & Safety",
      icon: <Shield className="h-5 w-5" />,
      items: [
        "Safety boots (S3 rated) and hard hat",
        "Safety glasses and hi-vis clothing",
        "Work gloves and insulating gloves",
        "Ear defenders and dust masks",
        "Arc flash protection (when required)"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <Info className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow/90">
          Essential tools form the foundation of your professional toolkit. Invest in quality items that will serve you throughout your career.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {toolOverview.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-elec-yellow">
                {section.icon}
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                    <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

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

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Investment Timeline:</strong> Spread tool purchases over 12-18 months. Start with safety-critical items, then build your collection based on work requirements.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EssentialToolsTab;
