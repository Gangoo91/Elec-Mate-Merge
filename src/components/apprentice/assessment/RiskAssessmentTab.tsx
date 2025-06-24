
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Calculator, Target } from "lucide-react";
import HazardIdentificationMatrix from "./risk-assessment/HazardIdentificationMatrix";
import RiskCalculationMatrix from "./risk-assessment/RiskCalculationMatrix";
import ControlMeasuresGenerator from "./risk-assessment/ControlMeasuresGenerator";
import RiskOutcomeGuidance from "./risk-assessment/RiskOutcomeGuidance";
import RiskDocumentation from "./risk-assessment/RiskDocumentation";

export interface RiskAssessment {
  id: string;
  hazard: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  riskLevel: string;
  controlMeasures: string[];
  residualRisk: number;
  status: 'pending' | 'in-progress' | 'completed';
  assessor: string;
  dateAssessed: string;
}

const RiskAssessmentTab = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [assessments, setAssessments] = useState<RiskAssessment[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<Partial<RiskAssessment>>({});

  const steps = [
    { id: 1, title: "Hazard Identification", icon: AlertTriangle },
    { id: 2, title: "Risk Calculation", icon: Calculator },
    { id: 3, title: "Control Measures", icon: Target },
    { id: 4, title: "Documentation", icon: FileText }
  ];

  const calculateRiskLevel = (likelihood: number, severity: number): string => {
    const score = likelihood * severity;
    if (score >= 15) return "Very High";
    if (score >= 10) return "High";
    if (score >= 6) return "Medium";
    if (score >= 3) return "Low";
    return "Very Low";
  };

  const getRiskColor = (level: string): string => {
    switch (level) {
      case "Very High": return "bg-red-600";
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      case "Very Low": return "bg-green-400";
      default: return "bg-gray-500";
    }
  };

  const handleHazardSelected = (hazard: string) => {
    setCurrentAssessment({ ...currentAssessment, hazard });
    setActiveStep(2);
  };

  const handleRiskCalculated = (likelihood: number, severity: number) => {
    const riskScore = likelihood * severity;
    const riskLevel = calculateRiskLevel(likelihood, severity);
    setCurrentAssessment({
      ...currentAssessment,
      likelihood,
      severity,
      riskScore,
      riskLevel
    });
    setActiveStep(3);
  };

  const handleControlMeasuresSelected = (measures: string[], residualRisk: number) => {
    setCurrentAssessment({
      ...currentAssessment,
      controlMeasures: measures,
      residualRisk
    });
    setActiveStep(4);
  };

  const handleAssessmentCompleted = (documentation: any) => {
    const newAssessment: RiskAssessment = {
      id: Date.now().toString(),
      hazard: currentAssessment.hazard || '',
      likelihood: currentAssessment.likelihood || 0,
      severity: currentAssessment.severity || 0,
      riskScore: currentAssessment.riskScore || 0,
      riskLevel: currentAssessment.riskLevel || '',
      controlMeasures: currentAssessment.controlMeasures || [],
      residualRisk: currentAssessment.residualRisk || 0,
      status: 'completed',
      assessor: documentation.assessor,
      dateAssessed: new Date().toISOString().split('T')[0]
    };

    setAssessments([...assessments, newAssessment]);
    setCurrentAssessment({});
    setActiveStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Risk Assessment Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  activeStep >= step.id 
                    ? 'bg-elec-yellow border-elec-yellow text-elec-dark' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    activeStep >= step.id ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    activeStep > step.id ? 'bg-elec-yellow' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Assessment Summary */}
      {Object.keys(currentAssessment).length > 0 && (
        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-300">Current Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {currentAssessment.hazard && (
                <div>
                  <p className="text-sm text-muted-foreground">Hazard</p>
                  <p className="font-medium">{currentAssessment.hazard}</p>
                </div>
              )}
              {currentAssessment.riskScore && (
                <div>
                  <p className="text-sm text-muted-foreground">Risk Score</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{currentAssessment.riskScore}</span>
                    <Badge className={getRiskColor(currentAssessment.riskLevel || '')}>
                      {currentAssessment.riskLevel}
                    </Badge>
                  </div>
                </div>
              )}
              {currentAssessment.controlMeasures && (
                <div>
                  <p className="text-sm text-muted-foreground">Control Measures</p>
                  <p className="font-medium">{currentAssessment.controlMeasures.length} selected</p>
                </div>
              )}
              {currentAssessment.residualRisk && (
                <div>
                  <p className="text-sm text-muted-foreground">Residual Risk</p>
                  <p className="font-medium">{currentAssessment.residualRisk}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step Content */}
      {activeStep === 1 && (
        <HazardIdentificationMatrix onHazardSelected={handleHazardSelected} />
      )}

      {activeStep === 2 && currentAssessment.hazard && (
        <RiskCalculationMatrix 
          hazard={currentAssessment.hazard}
          onRiskCalculated={handleRiskCalculated}
        />
      )}

      {activeStep === 3 && currentAssessment.riskLevel && (
        <div className="space-y-6">
          <ControlMeasuresGenerator 
            hazard={currentAssessment.hazard || ''}
            riskLevel={currentAssessment.riskLevel}
            onControlMeasuresSelected={handleControlMeasuresSelected}
          />
          <RiskOutcomeGuidance 
            riskLevel={currentAssessment.riskLevel}
            riskScore={currentAssessment.riskScore || 0}
          />
        </div>
      )}

      {activeStep === 4 && (
        <RiskDocumentation 
          assessment={currentAssessment}
          onCompleted={handleAssessmentCompleted}
        />
      )}

      {/* Completed Assessments */}
      {assessments.length > 0 && (
        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300">Completed Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-4 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge className={getRiskColor(assessment.riskLevel)}>
                      {assessment.riskLevel}
                    </Badge>
                    <div>
                      <p className="font-medium">{assessment.hazard}</p>
                      <p className="text-sm text-muted-foreground">
                        Score: {assessment.riskScore} | Residual: {assessment.residualRisk} | 
                        Assessed by: {assessment.assessor}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RiskAssessmentTab;
