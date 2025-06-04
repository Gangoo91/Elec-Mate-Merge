
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Wrench } from 'lucide-react';
import { TestStep } from '@/types/inspection-testing';

interface TestStepInstructionsProps {
  step: TestStep;
  isSafeIsolationStep: boolean;
}

const TestStepInstructions = ({ step, isSafeIsolationStep }: TestStepInstructionsProps) => {
  return (
    <div>
      <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
      
      {/* Instructions */}
      <div className="space-y-2">
        <h4 className="font-medium flex items-center gap-2">
          📋 Instructions:
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-sm bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
          {step.instructions.map((instruction, index) => (
            <li key={index} className="leading-relaxed">{instruction}</li>
          ))}
        </ol>
      </div>

      {/* Expected Result */}
      {step.expectedResult && (
        <Alert className="mt-4 bg-blue-500/10 border-blue-500/30">
          <CheckCircle className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>Expected Result:</strong> {step.expectedResult}
          </AlertDescription>
        </Alert>
      )}

      {/* Safety Notes - Enhanced for Safe Isolation */}
      {step.safetyNotes && step.safetyNotes.length > 0 && (
        <Alert className={`mt-4 ${isSafeIsolationStep ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
          <AlertTriangle className={`h-4 w-4 ${isSafeIsolationStep ? 'text-red-400' : 'text-amber-400'}`} />
          <AlertDescription className={isSafeIsolationStep ? 'text-red-200' : 'text-amber-200'}>
            <strong>⚠️ {isSafeIsolationStep ? 'CRITICAL SAFETY REQUIREMENTS:' : 'Safety Notes:'}</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {step.safetyNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Tools Required */}
      {step.tools && step.tools.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="h-4 w-4 text-elec-yellow" />
            <span className="font-medium">Tools Required:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {step.tools.map((tool, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestStepInstructions;
