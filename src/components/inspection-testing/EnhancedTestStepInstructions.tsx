
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, AlertTriangle, Info, BookOpen, Shield } from 'lucide-react';
import { TestStep } from '@/types/inspection-testing';

interface EnhancedTestStepInstructionsProps {
  step: TestStep;
  mode: 'electrician' | 'apprentice';
}

const EnhancedTestStepInstructions = ({ step, mode }: EnhancedTestStepInstructionsProps) => {
  const isSafetyStep = step.id.includes('isolation') || step.id.includes('safe') || step.safetyNotes?.length > 0;

  return (
    <div className="space-y-4">
      {/* Step Description */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            What You're Doing
          </CardTitle>
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

      {/* Apprentice Mode: Additional Learning Content */}
      {mode === 'apprentice' && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-blue-300">
              <Info className="h-5 w-5" />
              Why This Step Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-blue-200">
              {getEducationalContent(step)}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const getEducationalContent = (step: TestStep) => {
  const stepId = step.id.toLowerCase();
  
  if (stepId.includes('isolation') || stepId.includes('safe')) {
    return (
      <>
        <p>Safe isolation is the foundation of electrical safety. Without proper isolation:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>You risk electric shock, burns, or death</li>
          <li>Equipment could be damaged during testing</li>
          <li>Test results may be inaccurate or dangerous</li>
        </ul>
        <p>Always follow the "prove dead" principle - test the circuit is dead and then prove your tester is working.</p>
      </>
    );
  }
  
  if (stepId.includes('continuity')) {
    return (
      <>
        <p>Continuity testing verifies that protective conductors provide a complete path for fault current:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>High resistance = poor connections that may fail under fault conditions</li>
          <li>R1+R2 values help calculate earth fault loop impedance (Zs)</li>
          <li>Ring circuits require special testing to ensure they're complete</li>
        </ul>
        <p>Poor continuity means protective devices may not operate quickly enough to prevent dangerous voltages.</p>
      </>
    );
  }
  
  if (stepId.includes('insulation')) {
    return (
      <>
        <p>Insulation resistance testing finds deteriorated insulation between conductors:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Low readings indicate potential for electric shock or fire</li>
          <li>High test voltages reveal insulation weaknesses normal voltage won't show</li>
          <li>Electronic equipment must be disconnected to prevent damage</li>
        </ul>
        <p>Minimum 1MΩ ensures adequate safety margin under normal and fault conditions.</p>
      </>
    );
  }
  
  if (stepId.includes('polarity')) {
    return (
      <>
        <p>Polarity testing ensures electrical safety by verifying correct connections:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Switches must break the line conductor, not neutral</li>
          <li>Edison screw lampholders need line connected to center contact</li>
          <li>Incorrect polarity can cause shock even when switched "off"</li>
        </ul>
        <p>This test prevents situations where equipment appears safe but live parts remain accessible.</p>
      </>
    );
  }
  
  if (stepId.includes('rcd')) {
    return (
      <>
        <p>RCD testing verifies earth leakage protection operates correctly:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Test button only checks mechanical operation, not electrical sensitivity</li>
          <li>Proper testing verifies correct trip current and time</li>
          <li>RCDs save lives by detecting earth faults before they become dangerous</li>
        </ul>
        <p>Regular testing ensures this life-saving protection will work when needed.</p>
      </>
    );
  }
  
  if (stepId.includes('earth-fault-loop') || stepId.includes('zs')) {
    return (
      <>
        <p>Earth fault loop impedance (Zs) testing confirms protective devices will operate fast enough:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>High Zs = slower fault clearance = increased shock risk</li>
          <li>BS 7671 maximum values ensure 0.4s or 5s disconnection times</li>
          <li>Combines Ze (external) + R1+R2 (circuit) impedance</li>
        </ul>
        <p>This test proves the automatic disconnection of supply will protect against indirect contact.</p>
      </>
    );
  }
  
  return (
    <p>This step is part of the systematic testing process required by BS 7671 to ensure electrical safety and compliance.</p>
  );
};

export default EnhancedTestStepInstructions;
