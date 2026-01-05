
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Lightbulb, BookOpen, Zap } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TestingStep {
  id: number;
  title: string;
  description: string;
  regulation: string;
  completed: boolean;
  critical: boolean;
  practicalGuidance: string[];
  safetyNotes: string[];
  commonMistakes: string[];
  testMethod?: 'R1+R2' | 'R2' | 'main-bonding' | 'supplementary-bonding';
}

interface ContinuityTestingStepsCardProps {
  step: TestingStep;
  onToggle: (stepId: number) => void;
}

const ContinuityTestingStepsCard = ({ step, onToggle }: ContinuityTestingStepsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTestMethodIcon = (method?: string) => {
    switch (method) {
      case 'R1+R2': return <Zap className="h-4 w-4 text-blue-400" />;
      case 'main-bonding': return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'supplementary-bonding': return <CheckCircle2 className="h-4 w-4 text-yellow-400" />;
      default: return <BookOpen className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTestMethodLabel = (method?: string) => {
    switch (method) {
      case 'R1+R2': return 'R1+R2 Method';
      case 'main-bonding': return 'Main Bonding';
      case 'supplementary-bonding': return 'Supplementary Bonding';
      default: return null;
    }
  };

  return (
    <Card className={`border-2 ${step.completed ? 'border-green-500/30 bg-green-500/5' : step.critical ? 'border-orange-500/30 bg-orange-500/5' : 'border-border bg-card'}`}>
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={step.completed}
            onCheckedChange={() => onToggle(step.id)}
            className="mt-1"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-foreground text-lg">{step.title}</CardTitle>
              {step.critical && (
                <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                  Critical
                </Badge>
              )}
              {step.testMethod && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-1">
                  {getTestMethodIcon(step.testMethod)}
                  {getTestMethodLabel(step.testMethod)}
                </Badge>
              )}
              {step.completed && <CheckCircle2 className="h-5 w-5 text-green-400" />}
            </div>
            <CardDescription className="text-gray-300 mb-2">
              {step.description}
            </CardDescription>
            <div className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded inline-block">
              {step.regulation}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-foreground"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-6">
            {/* Practical Guidance */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <h4 className="font-semibold text-yellow-400">Practical Guidance</h4>
              </div>
              <div className="space-y-2 ml-6">
                {step.practicalGuidance.map((guidance, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1 text-sm">•</span>
                    <span className="text-gray-300 text-sm">{guidance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Notes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <h4 className="font-semibold text-red-400">Safety Notes</h4>
              </div>
              <div className="space-y-2 ml-6">
                {step.safetyNotes.map((note, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1 text-sm">⚠</span>
                    <span className="text-gray-300 text-sm">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <h4 className="font-semibold text-orange-400">Common Mistakes to Avoid</h4>
              </div>
              <div className="space-y-2 ml-6">
                {step.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 text-sm">×</span>
                    <span className="text-gray-300 text-sm">{mistake}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ContinuityTestingStepsCard;
