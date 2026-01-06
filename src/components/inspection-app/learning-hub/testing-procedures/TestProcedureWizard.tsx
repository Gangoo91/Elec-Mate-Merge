
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { TestingProcedure } from './TestingProcedureData';
import InteractiveTestStep from './InteractiveTestStep';

interface TestProcedureWizardProps {
  procedure: TestingProcedure;
  onBack: () => void;
}

const TestProcedureWizard = ({ procedure, onBack }: TestProcedureWizardProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    
    // Auto-advance to next step
    if (stepIndex < procedure.steps.length - 1) {
      setActiveStep(stepIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleStepActivate = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  const progress = (completedSteps.length / procedure.steps.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Critical': return 'text-red-400 bg-red-400/10';
      case 'Essential': return 'text-orange-400 bg-orange-400/10';
      case 'Required': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-white/80 bg-white/5';
    }
  };

  if (showSummary) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="border-elec-yellow text-elec-yellow">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Procedures
          </Button>
        </div>

        <Card className="bg-card border-green-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400 flex items-center gap-2">
              <CheckCircle className="h-6 w-6" />
              Procedure Completed!
            </CardTitle>
            <p className="text-white">
              You have successfully completed all steps for {procedure.title}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Acceptance Criteria</h3>
                <div className="space-y-2">
                  {procedure.acceptanceCriteria.map((criteria, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-foreground">{criteria.parameter}</p>
                      <p className="text-sm text-white">{criteria.requirement}</p>
                      <Badge className="mt-1 bg-blue-500/20 text-blue-400 text-xs">
                        {criteria.regulation}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Key Reminders</h3>
                <div className="space-y-2">
                  {procedure.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-green-500/5 rounded">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <p className="text-sm text-white">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => {
                  setActiveStep(0);
                  setCompletedSteps([]);
                  setShowSummary(false);
                }}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Practice Again
              </Button>
              <Button variant="outline" onClick={onBack}>
                Choose Another Procedure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="border-elec-yellow text-elec-yellow">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Procedures
        </Button>
      </div>

      {/* Procedure Header */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-foreground">{procedure.title}</CardTitle>
              <p className="text-white mt-2">{procedure.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={getDifficultyColor(procedure.difficulty)}>
                {procedure.difficulty}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400">
                {procedure.regulation}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-white">
              <Clock className="h-4 w-4" />
              <span>{procedure.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FileText className="h-4 w-4" />
              <span>{procedure.steps.length} steps</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Progress</span>
              <span className="text-elec-yellow">{completedSteps.length}/{procedure.steps.length} steps</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Safety Requirements */}
      <Card className="bg-red-500/5 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Safety Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {procedure.safetyRequirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-white">{requirement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Steps */}
      <div className="space-y-4">
        {procedure.steps.map((step, index) => (
          <InteractiveTestStep
            key={step.id}
            step={step}
            stepNumber={index + 1}
            isActive={activeStep === index}
            isCompleted={completedSteps.includes(index)}
            onComplete={() => handleStepComplete(index)}
            onActivate={() => handleStepActivate(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestProcedureWizard;
