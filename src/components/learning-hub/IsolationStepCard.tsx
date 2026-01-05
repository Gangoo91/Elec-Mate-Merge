
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2 } from 'lucide-react';

interface IsolationStep {
  id: number;
  title: string;
  description: string;
  regulation: string;
  completed: boolean;
  critical: boolean;
}

interface IsolationStepCardProps {
  step: IsolationStep;
  onToggle: (stepId: number) => void;
}

const IsolationStepCard = ({ step, onToggle }: IsolationStepCardProps) => {
  return (
    <Card className={`border-2 ${step.critical ? 'border-red-500/30 bg-red-500/5' : 'border-border bg-card'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={step.completed}
            onCheckedChange={() => onToggle(step.id)}
            className="mt-1"
          />
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-foreground">Step {step.id}: {step.title}</h4>
              {step.critical && (
                <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                  Critical
                </span>
              )}
            </div>
            <p className="text-gray-300 text-sm mb-2">{step.description}</p>
            <p className="text-xs text-elec-yellow">{step.regulation}</p>
          </div>
          {step.completed && (
            <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IsolationStepCard;
