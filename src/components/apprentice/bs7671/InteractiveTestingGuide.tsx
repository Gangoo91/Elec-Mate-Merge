
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Book,
  Lightbulb,
  Wrench
} from "lucide-react";
import { EnhancedTestGuide, TestStep } from "@/data/bs7671-testing/comprehensiveTestingGuides";

interface InteractiveTestingGuideProps {
  guide: EnhancedTestGuide;
  onComplete: () => void;
  onBack: () => void;
}

const InteractiveTestingGuide = ({ guide, onComplete, onBack }: InteractiveTestingGuideProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Safety check to ensure guide and steps exist
  if (!guide || !guide.steps || guide.steps.length === 0) {
    console.error('InteractiveTestingGuide: Invalid guide data', guide);
    return (
      <div className="space-y-6">
        <Card className="border-red-500/30 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-400">Error Loading Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Unable to load the testing guide. Please try again or select a different guide.
            </p>
            <Button onClick={onBack} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Guides
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStep = guide.steps[currentStepIndex];
  const isLastStep = currentStepIndex === guide.steps.length - 1;
  const isStepCompleted = completedSteps.has(currentStepIndex);

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStepIndex]));
    
    if (isLastStep) {
      // All steps completed
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < guide.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const getStepIcon = (step: TestStep) => {
    switch (step.category) {
      case 'safety':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'preparation':
        return <Wrench className="h-5 w-5 text-blue-400" />;
      case 'testing':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'recording':
        return <Book className="h-5 w-5 text-purple-400" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'preparation':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'testing':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'recording':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/10 to-blue-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-elec-yellow hover:text-elec-yellow/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Guides
            </Button>
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              <Clock className="h-3 w-3 mr-1" />
              {guide.duration}
            </Badge>
          </div>
          <CardTitle className="text-elec-yellow text-xl">{guide.title}</CardTitle>
          <p className="text-muted-foreground">{guide.description}</p>
        </CardHeader>
      </Card>

      {/* Progress Indicator */}
      <Card className="border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-blue-300">Progress</h3>
            <span className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {guide.steps.length}
            </span>
          </div>
          
          <div className="grid grid-cols-10 gap-2 mb-4">
            {guide.steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-colors ${
                  completedSteps.has(index)
                    ? 'bg-green-500'
                    : index === currentStepIndex
                    ? 'bg-elec-yellow'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground">
            {completedSteps.size} of {guide.steps.length} steps completed
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            {getStepIcon(currentStep)}
            <div>
              <CardTitle className="text-white">{currentStep.title}</CardTitle>
              <Badge className={getCategoryColor(currentStep.category)}>
                {currentStep.category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step Description */}
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <p className="text-muted-foreground">{currentStep.description}</p>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-300">Instructions</h4>
            <ol className="space-y-3">
              {currentStep.instructions && currentStep.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Safety Warning */}
          {currentStep.safetyWarning && (
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-amber-300 mb-2">Safety Warning</h5>
                  <p className="text-sm text-muted-foreground">{currentStep.safetyWarning}</p>
                </div>
              </div>
            </div>
          )}

          {/* Expected Results */}
          {currentStep.expectedResults && currentStep.expectedResults.length > 0 && (
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <h5 className="font-semibold text-green-300 mb-2">Expected Results</h5>
              <ul className="space-y-1">
                {currentStep.expectedResults.map((result, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Troubleshooting */}
          {currentStep.troubleshooting && currentStep.troubleshooting.length > 0 && (
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-start gap-3 mb-3">
                <Lightbulb className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <h5 className="font-semibold text-purple-300">Troubleshooting Tips</h5>
              </div>
              <ul className="space-y-2">
                {currentStep.troubleshooting.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation and Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStepIndex === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Step
            </Button>

            <div className="flex gap-3">
              {!isStepCompleted && (
                <Button
                  onClick={handleStepComplete}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}

              {isStepCompleted && !isLastStep && (
                <Button
                  onClick={handleNextStep}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}

              {isStepCompleted && isLastStep && (
                <Button
                  onClick={onComplete}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Guide
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveTestingGuide;
