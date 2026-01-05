
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield } from 'lucide-react';
import IsolationStepCard from './IsolationStepCard';

interface IsolationStep {
  id: number;
  title: string;
  description: string;
  regulation: string;
  completed: boolean;
  critical: boolean;
}

interface ProcedurePhaseProps {
  isolationSteps: IsolationStep[];
  onStepToggle: (stepId: number) => void;
  onProceed: () => void;
}

const ProcedurePhase = ({ isolationSteps, onStepToggle, onProceed }: ProcedurePhaseProps) => {
  const completedSteps = isolationSteps.filter(step => step.completed).length;
  const totalSteps = isolationSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;
  
  const criticalStepsCompleted = isolationSteps.filter(step => step.critical && step.completed).length;
  const totalCriticalSteps = isolationSteps.filter(step => step.critical).length;
  const canProceedToTesting = criticalStepsCompleted === totalCriticalSteps;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safe Isolation Procedure
          </CardTitle>
          <CardDescription className="text-white">
            Follow the 10-step safe isolation procedure in accordance with BS 7671
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground">Progress: {completedSteps}/{totalSteps} steps</span>
              <span className="text-elec-yellow">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
          
          <div className="space-y-4">
            {isolationSteps.map((step) => (
              <IsolationStepCard
                key={step.id}
                step={step}
                onToggle={onStepToggle}
              />
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-orange-400">Critical Steps Status</span>
            </div>
            <p className="text-white text-sm">
              {criticalStepsCompleted}/{totalCriticalSteps} critical steps completed. 
              All critical steps must be completed before proceeding to testing phase.
            </p>
          </div>

          <Button 
            onClick={onProceed}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 mt-4"
            disabled={!canProceedToTesting}
          >
            Proceed to Testing Phase
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcedurePhase;
