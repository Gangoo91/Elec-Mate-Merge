
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Shield, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  Search
} from "lucide-react";
import HazardIdentificationMatrix from "./risk-assessment/HazardIdentificationMatrix";
import RiskCalculationMatrix from "./risk-assessment/RiskCalculationMatrix";
import ControlMeasuresGenerator from "./risk-assessment/ControlMeasuresGenerator";
import RiskOutcomeGuidance from "./risk-assessment/RiskOutcomeGuidance";
import RiskDocumentation from "./risk-assessment/RiskDocumentation";

interface RiskAssessment {
  hazard: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  riskLevel: string;
  controlMeasures: string[];
}

const RiskAssessmentTab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedHazards, setSelectedHazards] = useState<string[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<RiskAssessment | null>(null);

  const steps = [
    { id: 1, title: "Identify", description: "Find hazards", icon: Search },
    { id: 2, title: "Assess", description: "Calculate risk", icon: AlertTriangle },
    { id: 3, title: "Control", description: "Add measures", icon: Shield },
    { id: 4, title: "Review", description: "Check outcome", icon: CheckCircle },
    { id: 5, title: "Document", description: "Record results", icon: FileText }
  ];

  const handleHazardSelected = (hazard: string) => {
    if (!selectedHazards.includes(hazard)) {
      setSelectedHazards([...selectedHazards, hazard]);
    }
  };

  const handleRiskCalculated = (assessment: RiskAssessment) => {
    setCurrentAssessment(assessment);
  };

  const handleControlMeasuresAdded = (controlMeasures: string[]) => {
    if (currentAssessment) {
      const updatedAssessment = {
        ...currentAssessment,
        controlMeasures
      };
      setRiskAssessments([...riskAssessments, updatedAssessment]);
      setCurrentAssessment(null);
      setCurrentStep(4);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <HazardIdentificationMatrix onHazardSelected={handleHazardSelected} />
        );
      case 2:
        return selectedHazards.length > 0 ? (
          <RiskCalculationMatrix 
            hazards={selectedHazards}
            onRiskCalculated={handleRiskCalculated}
          />
        ) : (
          <Card className="border-yellow-500/20 bg-yellow-500/10">
            <CardContent className="p-6">
              <p className="text-yellow-300">Please identify at least one hazard before proceeding to risk assessment.</p>
            </CardContent>
          </Card>
        );
      case 3:
        return currentAssessment ? (
          <ControlMeasuresGenerator 
            riskAssessment={currentAssessment}
            onControlMeasuresAdded={handleControlMeasuresAdded}
          />
        ) : (
          <Card className="border-yellow-500/20 bg-yellow-500/10">
            <CardContent className="p-6">
              <p className="text-yellow-300">Please complete risk calculation before adding control measures.</p>
            </CardContent>
          </Card>
        );
      case 4:
        return riskAssessments.length > 0 ? (
          <div className="space-y-4">
            {riskAssessments.map((assessment, index) => (
              <RiskOutcomeGuidance 
                key={index}
                riskLevel={assessment.riskLevel}
                riskScore={assessment.riskScore}
              />
            ))}
          </div>
        ) : (
          <Card className="border-yellow-500/20 bg-yellow-500/10">
            <CardContent className="p-6">
              <p className="text-yellow-300">Complete the risk assessment process to view guidance.</p>
            </CardContent>
          </Card>
        );
      case 5:
        return riskAssessments.length > 0 ? (
          <RiskDocumentation riskAssessments={riskAssessments} />
        ) : (
          <Card className="border-yellow-500/20 bg-yellow-500/10">
            <CardContent className="p-6">
              <p className="text-yellow-300">Complete risk assessments to generate documentation.</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Assessment Process Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Assessment Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Follow this systematic approach to identify, assess, and control workplace hazards. 
            Each step builds upon the previous one to create comprehensive risk management.
          </p>

          {/* Progress Steps - Responsive Layout */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-2">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                const isAccessible = step.id <= Math.max(currentStep, 1);

                return (
                  <div key={step.id} className="flex items-center flex-1 min-w-0">
                    {/* Step Item */}
                    <div 
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer flex-1 min-w-0 ${
                        isActive 
                          ? 'border-elec-yellow bg-elec-yellow/10' 
                          : isCompleted 
                            ? 'border-green-500 bg-green-500/10' 
                            : isAccessible
                              ? 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                              : 'border-gray-700 bg-gray-800/30 opacity-50'
                      }`}
                      onClick={() => isAccessible && setCurrentStep(step.id)}
                    >
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive 
                          ? 'bg-elec-yellow text-black' 
                          : isCompleted 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-600 text-gray-300'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <StepIcon className="h-4 w-4" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm ${
                          isActive ? 'text-elec-yellow' : isCompleted ? 'text-green-300' : 'text-gray-300'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {step.description}
                        </div>
                      </div>
                    </div>

                    {/* Connector Arrow - Hidden on mobile, shown on large screens */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center w-8 flex-shrink-0">
                        <ArrowRight className={`h-4 w-4 ${
                          currentStep > step.id ? 'text-green-500' : 'text-gray-600'
                        }`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
              </div>
              <Progress value={(currentStep / steps.length) * 100} className="h-2" />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Previous
            </Button>
            <Button 
              onClick={handleNextStep}
              disabled={currentStep === steps.length}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Selected Hazards Summary */}
      {selectedHazards.length > 0 && (
        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-300 text-lg">Selected Hazards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedHazards.map((hazard, index) => (
                <Badge key={index} variant="outline" className="border-blue-500/50 text-blue-300">
                  {hazard}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step Content */}
      {renderStepContent()}

      {/* Risk Assessment Guidelines */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Assessment Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                When to Conduct
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Before starting any electrical work</li>
                <li>• When workplace conditions change</li>
                <li>• After incidents or near misses</li>
                <li>• During regular safety reviews</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Who Should Be Involved
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Site supervisor or competent person</li>
                <li>• Workers performing the task</li>
                <li>• Safety representatives</li>
                <li>• Subject matter experts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentTab;
