
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, AlertTriangle, Info, BookOpen, Shield, Zap, Timer } from 'lucide-react';
import { TestStep } from '@/types/inspection-testing';
import TestStepEducationalContent from './TestStepEducationalContent';

interface EnhancedTestStepInstructionsProps {
  step: TestStep;
  mode: 'electrician' | 'apprentice';
}

const EnhancedTestStepInstructions = ({ step, mode }: EnhancedTestStepInstructionsProps) => {
  const isSafetyStep = step.id.includes('isolation') || step.id.includes('safe') || step.safetyNotes?.length > 0;

  return (
    <div className="space-y-4">
      {/* Step Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              What You're Doing
            </CardTitle>
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{step.estimatedTime} min</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{step.description}</p>
        </CardContent>
      </Card>

      {/* Safety Critical Notice */}
      {isSafetyStep && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <Shield className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200">
            <strong>SAFETY CRITICAL STEP:</strong> This procedure is essential for safety. 
            Follow each instruction exactly and do not skip any steps.
          </AlertDescription>
        </Alert>
      )}

      {/* Educational Content for Apprentices */}
      <TestStepEducationalContent step={step} mode={mode} />

      {/* Tools Required */}
      {step.tools && step.tools.length > 0 && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-blue-300">
              <Zap className="h-5 w-5" />
              Required Tools & Equipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {step.tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="text-xs border-blue-500/30 text-blue-200">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step-by-Step Instructions */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckSquare className="h-5 w-5 text-green-400" />
            Step-by-Step Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {step.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed">{instruction}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Safety Notes */}
      {step.safetyNotes && step.safetyNotes.length > 0 && (
        <Alert className="bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            <strong>Safety Notes:</strong>
            <ul className="mt-2 space-y-1">
              {step.safetyNotes.map((note, index) => (
                <li key={index} className="text-sm">⚠️ {note}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Expected Result */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-green-300">
            <CheckSquare className="h-5 w-5" />
            Expected Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-200">{step.expectedResult}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTestStepInstructions;
