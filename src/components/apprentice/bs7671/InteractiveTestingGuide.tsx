
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Settings, 
  Cable, 
  Zap,
  Eye,
  Clock,
  BookOpen
} from "lucide-react";
import { EnhancedTestGuide } from "@/data/bs7671-testing/comprehensiveTestingGuides";
import TestingInstructions from "./TestingInstructions";
import WagoConnectionMethods from "./WagoConnectionMethods";

interface InteractiveTestingGuideProps {
  guide: EnhancedTestGuide;
  onComplete: () => void;
  onBack: () => void;
}

const InteractiveTestingGuide = ({ guide, onComplete, onBack }: InteractiveTestingGuideProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showWagoGuide, setShowWagoGuide] = useState(false);

  const currentStep = guide.steps[currentStepIndex];
  const progress = ((completedSteps.size) / guide.steps.length) * 100;

  const handleStepComplete = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStepIndex);
    setCompletedSteps(newCompleted);
    
    if (currentStepIndex < guide.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < guide.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleFinish = () => {
    onComplete();
  };

  const isStepCompleted = completedSteps.has(currentStepIndex);
  const allStepsCompleted = completedSteps.size === guide.steps.length;

  if (showWagoGuide) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-elec-yellow">Wago Connection Methods</h2>
            <p className="text-muted-foreground">for {guide.title}</p>
          </div>
          <Button variant="outline" onClick={() => setShowWagoGuide(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Testing Guide
          </Button>
        </div>
        <WagoConnectionMethods />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-elec-yellow">{guide.title}</h2>
          <p className="text-muted-foreground">{guide.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <Badge className="bg-blue-500/20 text-blue-400">
              <Clock className="h-3 w-3 mr-1" />
              {guide.duration}
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400">
              {guide.difficulty}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowWagoGuide(true)}>
            <Cable className="h-4 w-4 mr-2" />
            Wago Connections
          </Button>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Guides
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-300">Progress</span>
            <span className="text-sm text-green-200">{completedSteps.size} of {guide.steps.length} steps</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isStepCompleted ? 'bg-green-500' : 'bg-elec-yellow'
              }`}>
                {isStepCompleted ? (
                  <CheckCircle className="h-5 w-5 text-white" />
                ) : (
                  <span className="text-elec-dark font-medium">{currentStepIndex + 1}</span>
                )}
              </div>
              <div>
                <CardTitle className="text-white">{currentStep.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Step {currentStepIndex + 1} of {guide.steps.length}
                </p>
              </div>
            </div>
            <Badge variant={isStepCompleted ? "default" : "secondary"}>
              {isStepCompleted ? "Completed" : "In Progress"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step Description */}
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <h4 className="font-medium text-blue-300 mb-2">Step Instructions</h4>
            <p className="text-blue-100">{currentStep.description}</p>
          </div>

          {/* Wago Connection Instructions (if applicable) */}
          {currentStep.wagoInstructions && (
            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-300 flex items-center gap-2">
                  <Cable className="h-5 w-5" />
                  Wago Connector Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-orange-200 mb-2">Recommended Connector:</h5>
                    <p className="text-sm text-orange-100">{currentStep.wagoInstructions.connectorType}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-orange-200 mb-2">Connection Steps:</h5>
                    <ol className="space-y-2">
                      {currentStep.wagoInstructions.steps.map((step, index) => (
                        <li key={index} className="text-sm text-orange-100 flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {currentStep.wagoInstructions.safetyTips && (
                    <Alert className="border-red-500/30 bg-red-500/10">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-100">
                        <span className="font-medium">Safety Tips: </span>
                        {currentStep.wagoInstructions.safetyTips.join(" • ")}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Safety Warnings */}
          {currentStep.safetyWarnings && currentStep.safetyWarnings.length > 0 && (
            <Alert className="border-red-500/30 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-100">
                <span className="font-medium">Safety Warnings: </span>
                <ul className="mt-2 space-y-1">
                  {currentStep.safetyWarnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Equipment Required */}
          {currentStep.equipment && currentStep.equipment.length > 0 && (
            <Card className="border-cyan-500/30 bg-cyan-500/5">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2 text-sm">
                  <Settings className="h-4 w-4" />
                  Equipment Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentStep.equipment.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-cyan-400/30 text-cyan-200">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Troubleshooting Tips */}
          {currentStep.troubleshooting && currentStep.troubleshooting.length > 0 && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-amber-300 flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4" />
                  Troubleshooting Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentStep.troubleshooting.map((tip, index) => (
                    <li key={index} className="text-amber-100 text-sm flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-elec-yellow/20">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {!isStepCompleted && (
                <Button
                  onClick={handleStepComplete}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              
              {currentStepIndex < guide.steps.length - 1 ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleFinish}
                  disabled={!allStepsCompleted}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Finish Guide
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Step Navigation */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-sm text-elec-yellow">Quick Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-10 gap-2">
            {guide.steps.map((step, index) => (
              <Button
                key={index}
                variant={currentStepIndex === index ? "default" : "outline"}
                size="sm"
                className={`h-10 ${completedSteps.has(index) ? 'border-green-500 bg-green-500/20' : ''}`}
                onClick={() => setCurrentStepIndex(index)}
              >
                {completedSteps.has(index) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveTestingGuide;
