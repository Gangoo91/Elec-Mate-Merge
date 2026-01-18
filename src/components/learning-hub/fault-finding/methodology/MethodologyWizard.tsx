import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  User,
  Search,
  Lightbulb,
  Shield,
  Wrench,
  FileText,
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { methodologySteps, MethodologyStep } from '../data/faultFindingData';

interface MethodologyWizardProps {
  onComplete?: () => void;
}

const getCategoryIcon = (category: string, className: string = "h-6 w-6") => {
  switch (category) {
    case 'preparation':
      return <User className={className} />;
    case 'assessment':
      return <Search className={className} />;
    case 'inspection':
      return <Lightbulb className={className} />;
    case 'safety':
      return <Shield className={className} />;
    case 'testing':
      return <Wrench className={className} />;
    case 'documentation':
      return <FileText className={className} />;
    default:
      return <Wrench className={className} />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'preparation':
      return { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
    case 'assessment':
      return { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    case 'inspection':
      return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    case 'safety':
      return { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
    case 'testing':
      return { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
    case 'documentation':
      return { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' };
    default:
      return { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' };
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'high':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    default:
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  }
};

const MethodologyWizard = ({ onComplete }: MethodologyWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const totalSteps = methodologySteps.length;
  const step = methodologySteps[currentStep];
  const colors = getCategoryColor(step.category);
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-xs text-muted-foreground">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Navigation Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
        {methodologySteps.map((s, index) => {
          const stepColors = getCategoryColor(s.category);
          const isCompleted = completedSteps.has(index);
          const isCurrent = index === currentStep;

          return (
            <Button
              key={s.id}
              variant="outline"
              size="sm"
              className={`shrink-0 h-8 w-8 p-0 rounded-full ${
                isCurrent
                  ? `${stepColors.bg} ${stepColors.border} ${stepColors.text}`
                  : isCompleted
                  ? 'bg-green-500/20 border-green-500/30 text-green-400'
                  : 'text-muted-foreground'
              }`}
              onClick={() => handleStepClick(index)}
            >
              {isCompleted && !isCurrent ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Main Step Card */}
      <Card className={`${colors.border} border-l-4 ${colors.bg}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
              {getCategoryIcon(step.category, "h-8 w-8")}
            </div>
            <div className="flex-1">
              <CardTitle className={`text-lg sm:text-xl ${colors.text}`}>
                {step.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {step.description}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Points */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
            Key Points
          </h3>
          <ul className="space-y-2">
            {step.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-elec-yellow shrink-0">•</span>
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Detailed Steps */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Detailed Steps
          </h3>
          <div className="space-y-2">
            {step.detailedSteps.map((detailStep, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge
                  variant="outline"
                  className="text-xs min-w-[24px] h-5 flex items-center justify-center shrink-0"
                >
                  {index + 1}
                </Badge>
                <span className="text-sm text-foreground">{detailStep}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Note (if applicable) */}
      {step.safetyNote && (
        <Card className="border-orange-500/30 bg-orange-500/10">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-orange-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Safety Note
            </h3>
            <p className="text-sm text-foreground">{step.safetyNote}</p>
          </CardContent>
        </Card>
      )}

      {/* Testing Context (if applicable) */}
      {step.testingContext && (
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-blue-400 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Testing Context
            </h3>
            <p className="text-sm text-foreground">{step.testingContext}</p>
          </CardContent>
        </Card>
      )}

      {/* Footer Info */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-slate-500/20">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs">Estimated Time</span>
            </div>
            <p className="text-sm font-medium text-foreground">{step.estimatedTime}</p>
          </CardContent>
        </Card>

        <Card className={`${colors.border}`}>
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Shield className="h-3 w-3" />
              <span className="text-xs">Priority</span>
            </div>
            <Badge
              variant="outline"
              className={`text-xs uppercase ${getPriorityColor(step.priority)}`}
            >
              {step.priority}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Regulation Reference */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-xs text-blue-400 mb-1 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Regulatory Reference
          </h3>
          <p className="text-sm text-blue-300">{step.regulation}</p>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-2">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          {currentStep === totalSteps - 1 ? 'Complete' : 'Continue'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MethodologyWizard;
