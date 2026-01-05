
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, ChevronDown, ChevronUp, AlertTriangle, Lightbulb, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IsolationStep {
  id: number;
  title: string;
  description: string;
  regulation: string;
  completed: boolean;
  critical: boolean;
  practicalGuidance: string[];
  safetyNotes: string[];
  testingRequired?: boolean;
  testingInstructions?: string;
}

interface PracticalIsolationStepCardProps {
  step: IsolationStep;
  onToggle: (stepId: number) => void;
}

const PracticalIsolationStepCard = ({ step, onToggle }: PracticalIsolationStepCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
              {step.testingRequired && (
                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30 flex items-center gap-1">
                  <TestTube className="h-3 w-3" />
                  Testing Required
                </span>
              )}
            </div>
            <p className="text-white text-sm mb-2">{step.description}</p>
            <p className="text-xs text-elec-yellow mb-3">{step.regulation}</p>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0 h-auto"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide Practical Guidance
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show Practical Guidance
                </>
              )}
            </Button>

            {isExpanded && (
              <div className="mt-4 space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-blue-400">Practical Guidance</span>
                  </div>
                  <ul className="space-y-1">
                    {step.practicalGuidance.map((guidance, index) => (
                      <li key={index} className="text-white text-sm flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{guidance}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <span className="font-medium text-orange-400">Safety Notes</span>
                  </div>
                  <ul className="space-y-1">
                    {step.safetyNotes.map((note, index) => (
                      <li key={index} className="text-white text-sm flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {step.testingRequired && step.testingInstructions && (
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TestTube className="h-4 w-4 text-purple-400" />
                      <span className="font-medium text-purple-400">Testing Instructions</span>
                    </div>
                    <p className="text-white text-sm">{step.testingInstructions}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {step.completed && (
            <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticalIsolationStepCard;
