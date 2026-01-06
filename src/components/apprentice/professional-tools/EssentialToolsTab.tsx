import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Alert */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-elec-yellow/20">
            <Info className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <p className="font-medium text-elec-yellow mb-1">Essential Tools Guide</p>
            <p className="text-sm text-white/70">
              Essential tools form the foundation of your professional toolkit. This comprehensive guide covers specifications, maintenance, and strategic purchasing advice.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Tool Category Tabs */}
      <Tabs defaultValue="hand-tools" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/5 p-1 rounded-xl h-auto">
          <TabsTrigger value="hand-tools" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg h-10 touch-manipulation">Hand Tools</TabsTrigger>
          <TabsTrigger value="power-tools" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg h-10 touch-manipulation">Power Tools</TabsTrigger>
          <TabsTrigger value="test-equipment" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg h-10 touch-manipulation">Test Equipment</TabsTrigger>
          <TabsTrigger value="ppe" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg h-10 touch-manipulation">PPE & Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="hand-tools" className="mt-4">
          <HandToolsTab />
        </TabsContent>

        <TabsContent value="power-tools" className="mt-4">
          <PowerToolsTab />
        </TabsContent>

        <TabsContent value="test-equipment" className="mt-4">
          <TestEquipmentTab />
        </TabsContent>

        <TabsContent value="ppe" className="mt-4">
          <PPETab />
        </TabsContent>
      </Tabs>

      {/* Apprentice Progression Timeline */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <BookOpen className="h-5 w-5 text-blue-400" />
            </div>
            Apprentice Tool Progression Timeline
          </CardTitle>
          <p className="text-sm text-white/60">
            Strategic toolkit development aligned with your learning journey
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {progressionMilestones.map((milestone, index) => (
              <div key={index} className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{milestone.milestone}</h3>
                    <p className="text-sm text-white/60">{milestone.competency}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                    {milestone.cost}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/10 border border-white/10">
                    <h4 className="text-sm font-medium text-blue-400 mb-2">Key Items:</h4>
                    <ul className="text-sm text-white/60 space-y-1">
                      {milestone.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-white/10 border border-white/10">
                    <h4 className="text-sm font-medium text-blue-400 mb-2">Next Focus:</h4>
                    <p className="text-sm text-white/60">{milestone.nextStep}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Maintenance Schedule */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <Wrench className="h-5 w-5 text-green-400" />
            </div>
            Comprehensive Tool Maintenance Schedule
          </CardTitle>
          <p className="text-sm text-white/60">
            Proper maintenance extends tool life and ensures safety compliance
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maintenanceSchedule.map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{item.item}</h4>
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400">
                    {item.frequency}
                  </Badge>
                </div>
                <p className="text-sm text-white/60 mb-2">{item.task}</p>
                <div className="text-sm text-green-400">
                  <span className="font-medium">Annual Cost:</span> {item.cost}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Certification Requirements */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            UK Certification Requirements & Consequences
          </CardTitle>
          <p className="text-sm text-white/60">
            Understanding compliance requirements and the risks of non-compliance
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {certificationRequirements.map((cert, index) => (
              <div key={index} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
                    {cert.standard}
                  </Badge>
                  <span className="font-semibold text-white text-sm">{cert.applies}</span>
                </div>
                <p className="text-sm text-white/70 mb-3">{cert.requirement}</p>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <span className="text-xs font-medium text-red-400">Risk of Non-Compliance:</span>
                  <p className="text-sm text-red-200 mt-1">{cert.penalty}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Strategy Alert */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-orange-500/20">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <p className="font-medium text-orange-400 mb-1">Investment Strategy</p>
            <p className="text-sm text-white/70">
              Total essential toolkit cost: £1050-2700. Focus on quality over quantity, spread purchases strategically, and prioritise safety-critical items first. Your tools are an investment in your professional future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssentialToolsTab;
