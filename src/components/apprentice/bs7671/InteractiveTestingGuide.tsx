
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
  Tool, 
  BookOpen,
  Clock,
  Target
} from "lucide-react";
import { EnhancedTestGuide } from "@/data/bs7671-testing/comprehensiveTestingGuides";

interface InteractiveTestingGuideProps {
  guide: EnhancedTestGuide;
  onComplete: () => void;
  onBack: () => void;
}

const InteractiveTestingGuide = ({ guide, onComplete, onBack }: InteractiveTestingGuideProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const currentStep = guide.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === guide.steps.length - 1;
  const progress = ((currentStepIndex + 1) / guide.steps.length) * 100;

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }
    
    if (isLastStep) {
      onComplete();
    } else {
      handleNextStep();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-cyan-400 text-xl">{guide.title}</CardTitle>
              <p className="text-muted-foreground mt-2">{guide.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge className={getDifficultyColor(guide.difficulty)}>
                  {guide.difficulty}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {guide.duration}
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400">
                  Step {currentStepIndex + 1} of {guide.steps.length}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Guides
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Progress: {Math.round(progress)}% Complete
          </p>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            {currentStep.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <h4 className="font-medium text-blue-300 mb-3">Instructions</h4>
            <p className="text-muted-foreground">{currentStep.instruction}</p>
          </div>

          {/* Expected Result */}
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <h4 className="font-medium text-green-300 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Expected Result
            </h4>
            <p className="text-muted-foreground">{currentStep.expectedResult}</p>
          </div>

          {/* Safety Warning */}
          {currentStep.safetyWarning && (
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <h4 className="font-medium text-red-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Safety Warning
              </h4>
              <p className="text-muted-foreground">{currentStep.safetyWarning}</p>
            </div>
          )}

          {/* Equipment Required */}
          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
            <h4 className="font-medium text-purple-300 mb-3 flex items-center gap-2">
              <Tool className="h-4 w-4" />
              Equipment Required
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {currentStep.equipment.map((item, index) => (
                <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          {currentStep.tips && currentStep.tips.length > 0 && (
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <h4 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Professional Tips
              </h4>
              <ul className="space-y-2">
                {currentStep.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Troubleshooting */}
          {currentStep.troubleshooting && currentStep.troubleshooting.length > 0 && (
            <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
              <h4 className="font-medium text-orange-300 mb-3">Troubleshooting</h4>
              <ul className="space-y-2">
                {currentStep.troubleshooting.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Regulation Note */}
          {currentStep.regulationNote && (
            <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
              <h4 className="font-medium text-cyan-300 mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Regulation Reference
              </h4>
              <p className="text-muted-foreground">{currentStep.regulationNote}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-elec-yellow/20">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={isFirstStep}
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Step
            </Button>

            <div className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {guide.steps.length}
            </div>

            <Button
              onClick={handleStepComplete}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              {isLastStep ? (
                <>
                  Complete Guide
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Guide Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-400">Purpose & Regulations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-green-300 mb-2">Purpose</h4>
              <p className="text-sm text-muted-foreground">{guide.purpose}</p>
            </div>
            <div>
              <h4 className="font-medium text-green-300 mb-2">Regulation References</h4>
              <ul className="space-y-1">
                {guide.regulationReferences.map((ref, index) => (
                  <li key={index} className="text-xs text-muted-foreground">• {ref}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-amber-500/10">
          <CardHeader>
            <CardTitle className="text-amber-400">Prerequisites & Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-amber-300 mb-2">Prerequisites</h4>
              <ul className="space-y-1">
                {guide.prerequisites.map((prereq, index) => (
                  <li key={index} className="text-xs text-muted-foreground">• {prereq}</li>
                ))}
              </ul>
            </div>
            {guide.testLimits.length > 0 && (
              <div>
                <h4 className="font-medium text-amber-300 mb-2">Test Limits</h4>
                <div className="space-y-1">
                  {guide.testLimits.map((limit, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex justify-between">
                      <span>{limit.parameter}:</span>
                      <span className="font-mono">{limit.limit} {limit.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveTestingGuide;
