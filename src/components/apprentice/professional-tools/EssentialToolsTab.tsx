
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Zap, Shield, Eye, AlertTriangle, Info, Download, BookOpen } from "lucide-react";
import HandToolsTab from "@/components/apprentice/tools-guide/HandToolsTab";
import PowerToolsTab from "@/components/apprentice/tools-guide/PowerToolsTab";
import TestEquipmentTab from "@/components/apprentice/tools-guide/TestEquipmentTab";
import PPETab from "@/components/apprentice/tools-guide/PPETab";
import ToolSpecificationCard from "@/components/apprentice/tools-guide/ToolSpecificationCard";

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
      ],
      investment: "£200-400",
      timeframe: "Months 1-3"
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
      ],
      investment: "£300-800",
      timeframe: "Months 3-6"
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
      ],
      investment: "£400-1200",
      timeframe: "Months 6-12"
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
      ],
      investment: "£150-300",
      timeframe: "Month 1"
    }
  ];

  const maintenanceSchedule = [
    { item: "Hand Tools", frequency: "Monthly", task: "Clean, oil, check for damage" },
    { item: "Power Tools", frequency: "Weekly", task: "Battery check, cleaning, inspection" },
    { item: "Test Equipment", frequency: "Annual", task: "Professional calibration required" },
    { item: "PPE", frequency: "Daily", task: "Visual inspection before use" }
  ];

  const certificationRequirements = [
    { standard: "BS EN 60900", applies: "Hand tools for electrical work", requirement: "VDE certification mandatory" },
    { standard: "GS38", applies: "Test leads and voltage indicators", requirement: "Safety specification compliance" },
    { standard: "BS EN 397", applies: "Safety helmets", requirement: "Impact and electrical protection" },
    { standard: "BS EN ISO 20345", applies: "Safety footwear", requirement: "S3 rating minimum" }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <Info className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow/90">
          Essential tools form the foundation of your professional toolkit. This comprehensive guide covers specifications, maintenance, and strategic purchasing advice.
        </AlertDescription>
      </Alert>

      {/* Detailed Tool Category Tabs - Moved to Top */}
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

      {/* Tool Categories Overview - Now Below Detailed Tabs */}
      <div className="grid gap-6">
        {toolOverview.map((section, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-elec-yellow">
                  {section.icon}
                  {section.category}
                </CardTitle>
                <div className="text-right">
                  <Badge variant="outline" className="border-green-500/40 text-green-400 mb-1">
                    {section.investment}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{section.timeframe}</p>
                </div>
              </div>
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

      {/* Maintenance Schedule */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Tool Maintenance Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maintenanceSchedule.map((item, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{item.item}</h4>
                  <Badge variant="outline" className="border-green-500/40 text-green-400">
                    {item.frequency}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.task}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certification Requirements */}
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            UK Certification Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {certificationRequirements.map((cert, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                    {cert.standard}
                  </Badge>
                  <span className="font-medium text-white">{cert.applies}</span>
                </div>
                <p className="text-sm text-blue-200">{cert.requirement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Investment Timeline:</strong> Total essential toolkit cost: £1050-2700. Spread purchases over 12-18 months. Start with safety-critical items and basic hand tools first.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EssentialToolsTab;
