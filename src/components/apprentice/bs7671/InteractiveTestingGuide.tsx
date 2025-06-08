
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  Wrench,
  BookOpen,
  Clock,
  Shield
} from "lucide-react";
import { BS7671Test } from "@/data/bs7671-testing/allBS7671Tests";

interface InteractiveTestingGuideProps {
  guide: BS7671Test;
  onComplete: () => void;
  onBack: () => void;
}

const InteractiveTestingGuide = ({ guide, onComplete, onBack }: InteractiveTestingGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const progress = (completedSteps.size / guide.steps.length) * 100;

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    onComplete();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const currentStepData = guide.steps[currentStep];
  const isLastStep = currentStep === guide.steps.length - 1;
  const isStepCompleted = completedSteps.has(currentStep);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-cyan-400 hover:bg-cyan-500/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tests
            </Button>
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(guide.difficulty)}>
                {guide.difficulty}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400">
                <Clock className="h-3 w-3 mr-1" />
                {guide.duration}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-cyan-400 text-xl">{guide.title}</CardTitle>
          <p className="text-muted-foreground">{guide.description}</p>
          <div className="text-sm text-cyan-300">{guide.regulationClause}</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-cyan-400">{completedSteps.size} of {guide.steps.length} steps</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Step {currentStep + 1} of {guide.steps.length}
              </span>
              <span className="text-cyan-400">
                {Math.round(progress)}% Complete
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <span className="bg-elec-yellow text-elec-dark rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {currentStep + 1}
              </span>
              {currentStepData.title}
            </CardTitle>
            {isStepCompleted && (
              <CheckCircle className="h-6 w-6 text-green-400" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step Instruction */}
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Instructions
            </h4>
            <p className="text-muted-foreground">{currentStepData.instruction}</p>
            {currentStepData.regulationReference && (
              <div className="mt-2 text-xs text-blue-400">
                Reference: {currentStepData.regulationReference}
              </div>
            )}
          </div>

          {/* Expected Result */}
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <h4 className="font-medium text-green-300 mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Expected Result
            </h4>
            <p className="text-muted-foreground">{currentStepData.expectedResult}</p>
          </div>

          {/* Safety Warning */}
          {currentStepData.safetyWarning && (
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <h4 className="font-medium text-red-300 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Safety Warning
              </h4>
              <p className="text-muted-foreground">{currentStepData.safetyWarning}</p>
            </div>
          )}

          {/* Equipment Required */}
          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
            <h4 className="font-medium text-purple-300 mb-2 flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Equipment Required
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentStepData.equipment.map((item, index) => (
                <Badge key={index} variant="outline" className="text-purple-400 border-purple-500/30">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tips */}
          {currentStepData.tips && currentStepData.tips.length > 0 && (
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <h4 className="font-medium text-amber-300 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Pro Tips
              </h4>
              <ul className="space-y-1">
                {currentStepData.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {!isStepCompleted && (
                <Button
                  onClick={handleStepComplete}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}

              {isLastStep ? (
                <Button
                  onClick={handleComplete}
                  disabled={!isStepCompleted}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  Complete Test
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Test Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
            <h4 className="font-medium text-blue-300 mb-2">Purpose</h4>
            <p className="text-sm text-muted-foreground">{guide.purpose}</p>
          </div>

          {guide.testLimits.length > 0 && (
            <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
              <h4 className="font-medium text-green-300 mb-2">Test Limits</h4>
              <div className="space-y-1">
                {guide.testLimits.map((limit, index) => (
                  <div key={index} className="text-sm text-muted-foreground flex justify-between">
                    <span>{limit.parameter}:</span>
                    <span className="font-mono">{limit.limit} {limit.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
            <h4 className="font-medium text-amber-300 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Common Issues
            </h4>
            <ul className="space-y-1">
              {guide.commonIssues.map((issue, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveTestingGuide;
