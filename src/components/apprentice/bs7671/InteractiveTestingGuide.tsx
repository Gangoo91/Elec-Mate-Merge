
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Info, Wrench, Clock, BookOpen, Target } from "lucide-react";
import { EnhancedTestGuide } from "@/data/bs7671-testing/comprehensiveTestingGuides";

interface InteractiveTestingGuideProps {
  guide: EnhancedTestGuide;
  onComplete: () => void;
  onBack: () => void;
}

const InteractiveTestingGuide = ({ guide, onComplete, onBack }: InteractiveTestingGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isLastStep = currentStep === guide.steps.length - 1;
  const allStepsCompleted = completedSteps.size === guide.steps.length;
  const currentStepData = guide.steps[currentStep];
  const progressPercentage = ((currentStep + 1) / guide.steps.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400';
      case 'Advanced': return 'bg-red-500/10 text-red-400';
      default: return 'bg-blue-500/10 text-blue-400';
    }
  };

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-400">{guide.title}</CardTitle>
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Guides
          </Button>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap">
          <Badge className={getDifficultyColor(guide.difficulty)}>
            {guide.difficulty}
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400">
            <Clock className="h-3 w-3 mr-1" />
            {guide.duration}
          </Badge>
          {currentStepData.estimatedTime && (
            <Badge className="bg-purple-500/20 text-purple-400">
              Step: {currentStepData.estimatedTime}
            </Badge>
          )}
          {currentStepData.difficulty && (
            <Badge className={getDifficultyColor(currentStepData.difficulty)}>
              {currentStepData.difficulty}
            </Badge>
          )}
        </div>
        
        <p className="text-muted-foreground">{guide.description}</p>
        
        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
          <h4 className="font-medium text-blue-300 mb-1 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Purpose
          </h4>
          <p className="text-sm text-muted-foreground">{guide.purpose}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Step {currentStep + 1} of {guide.steps.length}</span>
            <span className="text-cyan-400">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Current Step */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                completedSteps.has(currentStep) 
                  ? 'bg-green-500 text-black' 
                  : 'bg-cyan-500 text-black'
              }`}>
                {completedSteps.has(currentStep) ? 
                  <CheckCircle className="h-4 w-4" /> : 
                  currentStep + 1
                }
              </div>
              <h3 className="text-lg font-medium text-white">{currentStepData.title}</h3>
            </div>

            <div className="bg-elec-gray/50 rounded-lg p-4 border border-cyan-500/20">
              <h4 className="font-medium text-cyan-300 mb-2">Instructions</h4>
              <p className="text-muted-foreground">{currentStepData.instruction}</p>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <h4 className="font-medium text-green-300 mb-2">Expected Result</h4>
              <p className="text-muted-foreground">{currentStepData.expectedResult}</p>
            </div>

            {currentStepData.safetyWarning && (
              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Safety Warning
                </h4>
                <p className="text-muted-foreground">{currentStepData.safetyWarning}</p>
              </div>
            )}

            {currentStepData.technicalNotes && (
              <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
                <h4 className="font-medium text-cyan-400 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Technical Notes
                </h4>
                <p className="text-sm text-muted-foreground">{currentStepData.technicalNotes}</p>
              </div>
            )}

            {currentStepData.tips && currentStepData.tips.length > 0 && (
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Pro Tips
                </h4>
                <ul className="space-y-1">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentStepData.troubleshooting && currentStepData.troubleshooting.length > 0 && (
              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
                <h4 className="font-medium text-amber-400 mb-2 flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Troubleshooting
                </h4>
                <ul className="space-y-1">
                  {currentStepData.troubleshooting.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="font-medium text-purple-400 mb-2">Required Equipment</h4>
              <div className="flex flex-wrap gap-2">
                {currentStepData.equipment.map((item, index) => (
                  <Badge key={index} variant="outline" className="border-purple-500/40 text-purple-300">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {currentStepData.regulationReferences && currentStepData.regulationReferences.length > 0 && (
              <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                <h4 className="font-medium text-orange-400 mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Regulation References
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentStepData.regulationReferences.map((ref, index) => (
                    <Badge key={index} variant="outline" className="border-orange-500/40 text-orange-300 text-xs">
                      {ref}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {!completedSteps.has(currentStep) && (
                <Button onClick={handleStepComplete}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              
              {isLastStep ? (
                <Button 
                  onClick={onComplete}
                  disabled={!allStepsCompleted}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Finish Guide
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveTestingGuide;
