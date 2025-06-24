
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, Calculator, FileText, Lightbulb, CheckCircle } from "lucide-react";
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
    // Reset current assessment when new hazard is selected
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
      assessor: "Current User", // This could be dynamic
      location: "Site Location" // This could be dynamic
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

  // Risk Assessment Process Steps
  const processSteps = [
    {
      step: 1,
      title: "Identify Hazards",
      description: "Systematically identify potential electrical hazards in the workplace",
      icon: AlertTriangle,
      color: "text-red-400"
    },
    {
      step: 2,
      title: "Assess Risk",
      description: "Calculate risk level using likelihood and severity matrix",
      icon: Calculator,
      color: "text-amber-400"
    },
    {
      step: 3,
      title: "Control Measures",
      description: "Implement appropriate control measures following hierarchy of controls",
      icon: Shield,
      color: "text-blue-400"
    },
    {
      step: 4,
      title: "Document & Review",
      description: "Document findings and establish review procedures",
      icon: FileText,
      color: "text-green-400"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Risk Assessment Tools</h2>
        <p className="text-muted-foreground">
          Comprehensive risk assessment tools following HSE guidelines and BS EN ISO 31000
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="guidance">Guidance</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="process" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Risk Assessment Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {processSteps.map((step, index) => (
                  <div key={step.step} className="relative">
                    <Card className="border-gray-700 bg-elec-dark h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center font-bold text-sm">
                            {step.step}
                          </div>
                          <step.icon className={`h-5 w-5 ${step.color}`} />
                        </div>
                        <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                    {index < processSteps.length - 1 && (
                      <div className="hidden xl:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                        <div className="w-4 h-0.5 bg-elec-yellow"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-500/20 bg-blue-500/10">
              <CardHeader>
                <CardTitle className="text-blue-300 text-lg">Legal Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Health and Safety at Work Act 1974
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Management of Health and Safety at Work Regulations 1999
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Electricity at Work Regulations 1989
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    BS EN ISO 31000:2018 Risk Management
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/10">
              <CardHeader>
                <CardTitle className="text-green-300 text-lg">Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Involve competent persons in assessments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Regular review and updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Document all findings and decisions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Monitor effectiveness of controls
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <HazardIdentificationMatrix onHazardSelected={handleHazardSelected} />
          
          {selectedHazard && (
            <div className="p-4 border border-elec-yellow/30 rounded-lg bg-elec-yellow/5">
              <h4 className="font-semibold text-elec-yellow mb-2">Selected Hazard</h4>
              <p className="text-sm">{selectedHazard}</p>
            </div>
          )}

          {selectedHazard && (
            <RiskCalculationMatrix onRiskCalculated={handleRiskCalculated} />
          )}

          {currentAssessment && (
            <ControlMeasuresGenerator onControlMeasuresAdded={handleControlMeasuresAdded} />
          )}
        </TabsContent>

        <TabsContent value="guidance" className="space-y-6">
          {currentAssessment ? (
            <RiskOutcomeGuidance 
              riskLevel={currentAssessment.riskLevel} 
              riskScore={currentAssessment.riskScore} 
            />
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400">Complete a risk assessment to view guidance</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <RiskDocumentation assessment={currentAssessment} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskAssessmentTab;
