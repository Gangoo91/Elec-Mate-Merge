import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Wrench, Zap, Shield, Eye, AlertTriangle, Info, BookOpen } from "lucide-react";
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
    { item: "Hand Tools", frequency: "Monthly", task: "Clean, oil, check for damage", cost: "£5-10/year" },
    { item: "Power Tools", frequency: "Weekly", task: "Battery check, cleaning, inspection", cost: "£20-40/year" },
    { item: "Test Equipment", frequency: "Annual", task: "Professional calibration required", cost: "£100-200/year" },
    { item: "PPE", frequency: "Daily", task: "Visual inspection before use", cost: "£50-100/year replacement" }
  ];

  const certificationRequirements = [
    { standard: "BS EN 60900", applies: "Hand tools for electrical work", requirement: "VDE certification mandatory", penalty: "HSE prosecution risk" },
    { standard: "GS38", applies: "Test leads and voltage indicators", requirement: "Safety specification compliance", penalty: "Invalid test results" },
    { standard: "BS EN 397", applies: "Safety helmets", requirement: "Impact and electrical protection", penalty: "Site access denied" },
    { standard: "BS EN ISO 20345", applies: "Safety footwear", requirement: "S3 rating minimum", penalty: "Insurance claims rejected" }
  ];

  const progressionMilestones = [
    {
      milestone: "Month 1-3: Foundation Kit",
      cost: "£300-500",
      items: ["Basic PPE", "Essential hand tools", "Simple continuity tester"],
      competency: "Safe to work under close supervision",
      nextStep: "Learn proper tool usage and maintenance"
    },
    {
      milestone: "Month 4-8: Building Skills",
      cost: "£400-700",
      items: ["Cordless drill system", "Advanced hand tools", "Basic test equipment"],
      competency: "Independent basic installations",
      nextStep: "Develop testing and fault-finding skills"
    },
    {
      milestone: "Month 9-18: Professional Level",
      cost: "£800-1500",
      items: ["Multifunction tester", "Specialist tools", "Advanced PPE"],
      competency: "Testing and certification work",
      nextStep: "Specialisation and advanced techniques"
    },
    {
      milestone: "Year 2+: Specialist Equipment",
      cost: "£500-1000",
      items: ["Thermal imaging", "Advanced test equipment", "Specialist tools"],
      competency: "Complex installations and fault diagnosis",
      nextStep: "Mentoring and advanced qualifications"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <Info className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow/90">
          Essential tools form the foundation of your professional toolkit. This comprehensive guide covers specifications, maintenance, and strategic purchasing advice.
        </AlertDescription>
      </Alert>

      {/* Tool Category Dropdown */}
      <DropdownTabs
        tabs={[
          {
            value: "hand-tools",
            label: "Hand Tools",
            icon: Wrench,
            content: <HandToolsTab />
          },
          {
            value: "power-tools", 
            label: "Power Tools",
            icon: Zap,
            content: <PowerToolsTab />
          },
          {
            value: "test-equipment",
            label: "Test Equipment", 
            icon: Eye,
            content: <TestEquipmentTab />
          },
          {
            value: "ppe",
            label: "PPE & Safety",
            icon: Shield,
            content: <PPETab />
          }
        ]}
        defaultValue="hand-tools"
        placeholder="Select tool category"
        triggerClassName="w-full mx-1 sm:max-w-sm sm:mx-auto"
      />

      {/* Apprentice Progression Timeline */}
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Apprentice Tool Progression Timeline
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Strategic toolkit development aligned with your learning journey
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressionMilestones.map((milestone, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-blue-200">{milestone.milestone}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.competency}</p>
                  </div>
                  <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                    {milestone.cost}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-blue-300 mb-1">Key Items:</h4>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {milestone.items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-300 mb-1">Next Focus:</h4>
                    <p className="text-xs text-muted-foreground">{milestone.nextStep}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Maintenance Schedule */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Comprehensive Tool Maintenance Schedule
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Proper maintenance extends tool life and ensures safety compliance
          </p>
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
                <p className="text-sm text-muted-foreground mb-2">{item.task}</p>
                <div className="text-xs text-green-300">
                  <span className="font-medium">Annual Cost:</span> {item.cost}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Certification Requirements */}
      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            UK Certification Requirements & Consequences
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Understanding compliance requirements and the risks of non-compliance
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {certificationRequirements.map((cert, index) => (
              <div key={index} className="border border-purple-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-purple-500/40 text-purple-400">
                    {cert.standard}
                  </Badge>
                  <span className="font-medium text-white text-sm">{cert.applies}</span>
                </div>
                <p className="text-sm text-purple-200 mb-2">{cert.requirement}</p>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                  <span className="text-xs font-medium text-red-300">Risk of Non-Compliance:</span>
                  <p className="text-xs text-red-200">{cert.penalty}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Investment Strategy:</strong> Total essential toolkit cost: £1050-2700. Focus on quality over quantity, spread purchases strategically, and prioritise safety-critical items first. Your tools are an investment in your professional future.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EssentialToolsTab;
