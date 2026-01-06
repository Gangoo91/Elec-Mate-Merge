
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, AlertTriangle, Shield, Lightbulb, Scale, FileText, HardHat, CheckCircle
} from "lucide-react";

const EducationalContent = () => {
  const regulations = {
    bs7671: [
      { section: "132", title: "Design requirements" },
      { section: "411", title: "Protection against electric shock" },
      { section: "531", title: "Devices for protection against overcurrent" },
      { section: "611", title: "Common rules for initial verification" }
    ],
    healthSafety: [
      "Health and Safety at Work Act 1974",
      "Electricity at Work Regulations 1989",
      "CDM Regulations 2015",
      "PPE at Work Regulations 1992"
    ]
  };

  const highRiskHazards = [
    "Live electrical conductors",
    "Overhead power lines",
    "Underground cables",
    "Arc flash potential",
    "Stored electrical energy"
  ];

  const mediumRiskHazards = [
    "Damaged electrical equipment",
    "Poor environmental conditions",
    "Inadequate lighting",
    "Unstable access equipment",
    "Chemical hazards (COSHH)"
  ];

  const essentialPPE = [
    { item: "Hard hat", spec: "BS EN 397 with electrical protection" },
    { item: "Safety glasses", spec: "BS EN 166 impact resistant" },
    { item: "Insulated gloves", spec: "Voltage rated for task" },
    { item: "Safety boots", spec: "BS EN ISO 20345" }
  ];

  const ppeInspectionTips = [
    "Check for visible damage before use",
    "Verify certification dates",
    "Ensure proper fit and comfort",
    "Replace if damaged or expired"
  ];

  const assessmentTips = [
    "Always assess the site before starting any work",
    "Take photos to document conditions and concerns",
    "Involve the whole team in safety discussions",
    "Don't proceed if conditions are unsafe",
    "Regular reassessment as work progresses"
  ];

  const documentationTips = [
    "Use clear, specific language in reports",
    "Include measurements where relevant",
    "Note weather and environmental conditions",
    "Record any deviations from normal procedures",
    "Keep digital copies of all assessments"
  ];

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          Learn While You Assess
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <Tabs defaultValue="regulations" className="w-full">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
            <TabsList className="w-full min-w-max bg-white/10 border border-white/10 p-1 rounded-xl">
              <TabsTrigger
                value="regulations"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-elec-yellow/20 data-[state=active]:to-elec-yellow/10 data-[state=active]:text-elec-yellow rounded-lg transition-all"
              >
                <Scale className="h-4 w-4 mr-2" />
                Regulations
              </TabsTrigger>
              <TabsTrigger
                value="hazards"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-red-500/10 data-[state=active]:text-red-400 rounded-lg transition-all"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Hazards
              </TabsTrigger>
              <TabsTrigger
                value="ppe"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-green-500/10 data-[state=active]:text-green-400 rounded-lg transition-all"
              >
                <HardHat className="h-4 w-4 mr-2" />
                PPE
              </TabsTrigger>
              <TabsTrigger
                value="tips"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-purple-500/10 data-[state=active]:text-purple-400 rounded-lg transition-all"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Tips
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Regulations Tab */}
          <TabsContent value="regulations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                    <FileText className="h-3.5 w-3.5 text-elec-yellow" />
                  </div>
                  BS 7671 Requirements
                </h4>
                <ul className="space-y-2">
                  {regulations.bs7671.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-white/70">
                      <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs">
                        {item.section}
                      </Badge>
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/20">
                    <Scale className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  Health & Safety Regulations
                </h4>
                <ul className="space-y-2">
                  {regulations.healthSafety.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Hazards Tab */}
          <TabsContent value="hazards" className="space-y-4">
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-500/20 flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-3">High Risk Hazards</h4>
                  <ul className="space-y-2">
                    {highRiskHazards.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow mb-3">Medium Risk Hazards</h4>
                  <ul className="space-y-2">
                    {mediumRiskHazards.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* PPE Tab */}
          <TabsContent value="ppe" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-green-500/20">
                    <Shield className="h-3.5 w-3.5 text-green-400" />
                  </div>
                  Essential PPE
                </h4>
                <ul className="space-y-3">
                  {essentialPPE.map((item, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium text-white">{item.item}:</span>
                      <span className="text-white/60 ml-1">{item.spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/20">
                    <CheckCircle className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  PPE Inspection
                </h4>
                <ul className="space-y-2">
                  {ppeInspectionTips.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                  <Lightbulb className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">Assessment Best Practices</h4>
                  <ul className="space-y-2">
                    {assessmentTips.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-500/20 flex-shrink-0">
                  <FileText className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Documentation Tips</h4>
                  <ul className="space-y-2">
                    {documentationTips.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EducationalContent;
