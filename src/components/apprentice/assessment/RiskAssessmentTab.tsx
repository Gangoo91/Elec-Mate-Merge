
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle, Shield, Calculator, FileText, Lightbulb, CheckCircle,
  ClipboardList, ArrowRight, Scale, Target
} from "lucide-react";
import HazardIdentificationMatrix from "./risk-assessment/HazardIdentificationMatrix";
import RiskCalculationMatrix from "./risk-assessment/RiskCalculationMatrix";
import ControlMeasuresGenerator from "./risk-assessment/ControlMeasuresGenerator";
import RiskOutcomeGuidance from "./risk-assessment/RiskOutcomeGuidance";
import RiskDocumentation from "./risk-assessment/RiskDocumentation";

interface RiskAssessment {
  id: string;
  hazard: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  riskLevel: string;
  controlMeasures: string[];
  timestamp: string;
  assessor: string;
  location: string;
}

const RiskAssessmentTab = () => {
  const [currentAssessment, setCurrentAssessment] = useState<RiskAssessment | null>(null);
  const [selectedHazard, setSelectedHazard] = useState<string>("");
  const [activeTab, setActiveTab] = useState("process");

  const calculateRiskLevel = (score: number): string => {
    if (score >= 15) return "Very High";
    if (score >= 10) return "High";
    if (score >= 6) return "Medium";
    if (score >= 3) return "Low";
    return "Very Low";
  };

  const handleHazardSelected = (hazard: string) => {
    setSelectedHazard(hazard);
    setCurrentAssessment(null);
  };

  const handleRiskCalculated = (likelihood: number, severity: number) => {
    if (!selectedHazard) return;

    const riskScore = likelihood * severity;
    const riskLevel = calculateRiskLevel(riskScore);

    const newAssessment: RiskAssessment = {
      id: `RA-${Date.now()}`,
      hazard: selectedHazard,
      likelihood,
      severity,
      riskScore,
      riskLevel,
      controlMeasures: [],
      timestamp: new Date().toISOString(),
      assessor: "Current User",
      location: "Site Location"
    };

    setCurrentAssessment(newAssessment);
    setActiveTab("guidance");
  };

  const handleControlMeasuresAdded = (controlMeasures: string[]) => {
    if (currentAssessment) {
      setCurrentAssessment({
        ...currentAssessment,
        controlMeasures
      });
      setActiveTab("documentation");
    }
  };

  const processSteps = [
    {
      step: 1,
      title: "Identify Hazards",
      description: "Systematically identify potential electrical hazards in the workplace",
      icon: AlertTriangle,
      color: "red"
    },
    {
      step: 2,
      title: "Assess Risk",
      description: "Calculate risk level using likelihood and severity matrix",
      icon: Calculator,
      color: "yellow"
    },
    {
      step: 3,
      title: "Control Measures",
      description: "Implement appropriate control measures following hierarchy of controls",
      icon: Shield,
      color: "blue"
    },
    {
      step: 4,
      title: "Document & Review",
      description: "Document findings and establish review procedures",
      icon: FileText,
      color: "green"
    }
  ];

  const legalRequirements = [
    { text: "Health and Safety at Work Act 1974", icon: Scale },
    { text: "Management of Health and Safety at Work Regulations 1999", icon: ClipboardList },
    { text: "Electricity at Work Regulations 1989", icon: AlertTriangle },
    { text: "BS EN ISO 31000:2018 Risk Management", icon: Target }
  ];

  const bestPractices = [
    "Involve competent persons in assessments",
    "Regular review and updates",
    "Document all findings and decisions",
    "Monitor effectiveness of controls"
  ];

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
      red: { bg: 'bg-red-500/10', text: 'text-red-400', iconBg: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30' },
      yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', iconBg: 'from-elec-yellow/20 to-elec-yellow/5', border: 'border-elec-yellow/30' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', iconBg: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30' },
      green: { bg: 'bg-green-500/10', text: 'text-green-400', iconBg: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', iconBg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' }
    };
    return configs[color] || configs.yellow;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30">
              <AlertTriangle className="h-7 w-7 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                Risk Assessment <span className="text-red-400">Tools</span>
              </CardTitle>
              <p className="text-sm text-white/60 mt-1">
                HSE Guidelines & BS EN ISO 31000 Compliant
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70">
            Comprehensive risk assessment tools following HSE guidelines and BS EN ISO 31000 standards.
            Identify hazards, calculate risk levels, and implement effective control measures.
          </p>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-full min-w-max bg-white/10 border border-white/10 p-1 rounded-xl">
            <TabsTrigger
              value="process"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-elec-yellow/20 data-[state=active]:to-elec-yellow/10 data-[state=active]:text-elec-yellow data-[state=active]:border-elec-yellow/30 rounded-lg border border-transparent transition-all"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Process
            </TabsTrigger>
            <TabsTrigger
              value="assessment"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-red-500/10 data-[state=active]:text-red-400 data-[state=active]:border-red-500/30 rounded-lg border border-transparent transition-all"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Assessment
            </TabsTrigger>
            <TabsTrigger
              value="guidance"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-500/10 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 rounded-lg border border-transparent transition-all"
            >
              <Shield className="h-4 w-4 mr-2" />
              Guidance
            </TabsTrigger>
            <TabsTrigger
              value="documentation"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-green-500/10 data-[state=active]:text-green-400 data-[state=active]:border-green-500/30 rounded-lg border border-transparent transition-all"
            >
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Process Tab */}
        <TabsContent value="process" className="space-y-6 mt-6">
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                  <Lightbulb className="h-5 w-5 text-elec-yellow" />
                </div>
                Risk Assessment Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {processSteps.map((step, index) => {
                  const colorConfig = getColorConfig(step.color);
                  const StepIcon = step.icon;
                  return (
                    <div key={step.step} className="relative group">
                      <Card className="bg-gradient-to-br from-elec-dark to-elec-gray border-white/10 hover:border-white/20 transition-all h-full">
                        <CardContent className="p-4 sm:p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-elec-yellow to-elec-yellow/80 text-black rounded-full flex items-center justify-center font-bold text-sm">
                              {step.step}
                            </div>
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${colorConfig.iconBg} border ${colorConfig.border}`}>
                              <StepIcon className={`h-4 w-4 ${colorConfig.text}`} />
                            </div>
                          </div>
                          <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                          <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                        </CardContent>
                      </Card>
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                          <ArrowRight className="h-4 w-4 text-elec-yellow" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                    <Scale className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-base sm:text-lg">Legal Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {legalRequirements.map((req, index) => {
                    const ReqIcon = req.icon;
                    return (
                      <li key={index} className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                        <div className="p-1.5 rounded-lg bg-blue-500/20">
                          <ReqIcon className="h-3.5 w-3.5 text-blue-400" />
                        </div>
                        <span className="text-sm text-white/80">{req.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-base sm:text-lg">Best Practices</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {bestPractices.map((practice, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                      <div className="p-1.5 rounded-lg bg-green-500/20">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                      </div>
                      <span className="text-sm text-white/80">{practice}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6 mt-6">
          <HazardIdentificationMatrix onHazardSelected={handleHazardSelected} />

          {selectedHazard && (
            <Card className="bg-gradient-to-r from-elec-yellow/10 via-elec-yellow/5 to-transparent border-elec-yellow/30">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-elec-yellow mb-1">Selected Hazard</h4>
                    <p className="text-sm text-white/80">{selectedHazard}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedHazard && (
            <RiskCalculationMatrix onRiskCalculated={handleRiskCalculated} />
          )}

          {currentAssessment && (
            <ControlMeasuresGenerator onControlMeasuresAdded={handleControlMeasuresAdded} />
          )}
        </TabsContent>

        {/* Guidance Tab */}
        <TabsContent value="guidance" className="space-y-6 mt-6">
          {currentAssessment ? (
            <RiskOutcomeGuidance
              riskLevel={currentAssessment.riskLevel}
              riskScore={currentAssessment.riskScore}
            />
          ) : (
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
              <CardContent className="text-center py-12">
                <div className="p-4 rounded-xl bg-white/5 inline-block mb-4">
                  <AlertTriangle className="h-12 w-12 text-white/30" />
                </div>
                <h3 className="text-lg font-semibold text-white/70 mb-2">No Assessment Data</h3>
                <p className="text-white/80 text-sm">
                  Complete a risk assessment in the Assessment tab to view guidance
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-6 mt-6">
          <RiskDocumentation assessment={currentAssessment} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskAssessmentTab;
