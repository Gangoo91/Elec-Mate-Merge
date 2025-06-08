
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Clock,
  Zap,
  Shield,
  BookOpen,
  Camera,
  FileText,
  Lightbulb
} from "lucide-react";
import { EnhancedTestGuide, TestStep, SafetyWarning } from "@/data/bs7671-testing/comprehensiveTestingGuides";

interface InteractiveTestingGuideProps {
  guide: EnhancedTestGuide;
  onComplete: () => void;
  onBack: () => void;
}

const InteractiveTestingGuide = ({ guide, onComplete, onBack }: InteractiveTestingGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [stepNotes, setStepNotes] = useState<Record<number, string>>({});
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGuideComplete = () => {
    if (completedSteps.size === guide.steps.length) {
      onComplete();
    }
  };

  const currentStepData = guide.steps[currentStep];
  const progressPercentage = (completedSteps.size / guide.steps.length) * 100;

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'HIGH': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'MEDIUM': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'LOW': return <Info className="h-4 w-4 text-blue-400" />;
      default: return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  const getSafetyBorderColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'border-red-500/50';
      case 'MEDIUM': return 'border-yellow-500/50';
      case 'LOW': return 'border-blue-500/50';
      default: return 'border-blue-500/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Guides
        </Button>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {guide.steps.length}
          </p>
          <p className="text-xs text-muted-foreground">
            {completedSteps.size} completed
          </p>
        </div>
      </div>

      {/* Progress */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-green-300">{guide.title}</h3>
            <Badge className="bg-green-500/20 text-green-400">
              <Clock className="h-3 w-3 mr-1" />
              {guide.duration}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            {Math.round(progressPercentage)}% Complete
          </p>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              {completedSteps.has(currentStep) ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <span className="w-5 h-5 rounded-full bg-elec-yellow text-elec-dark text-xs flex items-center justify-center font-bold">
                  {currentStep + 1}
                </span>
              )}
              {currentStepData.title}
            </CardTitle>
            <Badge className="bg-blue-500/20 text-blue-400">
              {guide.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step Instruction */}
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <h4 className="font-medium text-blue-300 mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Instructions
            </h4>
            <p className="text-blue-100">{currentStepData.instruction}</p>
          </div>

          {/* Expected Result */}
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <h4 className="font-medium text-green-300 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Expected Result
            </h4>
            <p className="text-green-100">{currentStepData.expectedResult}</p>
          </div>

          {/* Safety Warnings */}
          {currentStepData.safetyWarnings && currentStepData.safetyWarnings.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-red-300 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Safety Warnings
              </h4>
              {currentStepData.safetyWarnings.map((warning, index) => (
                <Alert key={index} className={`${getSafetyBorderColor(warning.level)} bg-red-500/10`}>
                  <div className="flex items-center gap-2">
                    {getSafetyIcon(warning.level)}
                    <Badge variant="outline" className="text-xs">
                      {warning.level}
                    </Badge>
                  </div>
                  <AlertDescription className="mt-2 text-red-100">
                    {warning.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {/* Tips */}
          {currentStepData.tips && currentStepData.tips.length > 0 && (
            <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
              <h4 className="font-medium text-yellow-300 mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Professional Tips
              </h4>
              <ul className="space-y-2">
                {currentStepData.tips.map((tip, index) => (
                  <li key={index} className="text-yellow-100 flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Troubleshooting */}
          {currentStepData.troubleshooting && currentStepData.troubleshooting.length > 0 && (
            <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                className="mb-3 border-orange-500/30 text-orange-300"
              >
                <Zap className="h-4 w-4 mr-2" />
                {showTroubleshooting ? 'Hide' : 'Show'} Troubleshooting
              </Button>
              {showTroubleshooting && (
                <div>
                  <h4 className="font-medium text-orange-300 mb-3">Common Issues</h4>
                  <ul className="space-y-2">
                    {currentStepData.troubleshooting.map((issue, index) => (
                      <li key={index} className="text-orange-100 flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Regulation Reference */}
          {currentStepData.regulationReference && (
            <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
              <p className="text-purple-300 text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <strong>Regulation Reference:</strong> {currentStepData.regulationReference}
              </p>
            </div>
          )}

          {/* Step Notes */}
          <div className="bg-gray-500/10 rounded-lg p-4 border border-gray-500/20">
            <h4 className="font-medium text-gray-300 mb-3 flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Step Notes & Observations
            </h4>
            <textarea
              value={stepNotes[currentStep] || ''}
              onChange={(e) => setStepNotes(prev => ({ ...prev, [currentStep]: e.target.value }))}
              placeholder="Record your observations, measurements, or any issues encountered..."
              className="w-full bg-gray-800/50 border border-gray-600/30 rounded p-3 text-gray-100 placeholder-gray-400 min-h-[100px]"
            />
          </div>

          {/* Step Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="border-gray-600/30 text-gray-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-3">
              {!completedSteps.has(currentStep) && (
                <Button
                  onClick={handleStepComplete}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}

              {currentStep < guide.steps.length - 1 ? (
                <Button
                  onClick={handleNextStep}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleGuideComplete}
                  disabled={completedSteps.size !== guide.steps.length}
                  className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                >
                  Complete Guide
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Navigator */}
      <Card className="border-gray-600/30 bg-gray-800/50">
        <CardHeader>
          <CardTitle className="text-gray-300 text-lg">Step Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {guide.steps.map((step, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(index)}
                className={`justify-start text-left ${
                  index === currentStep 
                    ? 'border-elec-yellow/50 bg-elec-yellow/10 text-elec-yellow' 
                    : completedSteps.has(index)
                    ? 'border-green-500/50 bg-green-500/10 text-green-400'
                    : 'border-gray-600/30 text-gray-300'
                }`}
              >
                <span className="mr-2">
                  {completedSteps.has(index) ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-current text-xs flex items-center justify-center font-bold opacity-60">
                      {index + 1}
                    </span>
                  )}
                </span>
                <span className="truncate text-xs">{step.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveTestingGuide;
