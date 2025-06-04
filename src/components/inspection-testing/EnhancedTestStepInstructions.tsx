
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, AlertTriangle, Info, BookOpen, Shield, Zap, Timer, FileText, Calculator } from 'lucide-react';
import { TestStep } from '@/types/inspection-testing';
import TestStepEducationalContent from './TestStepEducationalContent';

interface EnhancedTestStepInstructionsProps {
  step: TestStep;
  mode: 'electrician' | 'apprentice';
}

const EnhancedTestStepInstructions = ({ step, mode }: EnhancedTestStepInstructionsProps) => {
  const isSafetyStep = step.id.includes('isolation') || step.id.includes('safe') || step.safetyNotes?.length > 0;
  const isMeasurementStep = step.id.includes('measurement') || step.id.includes('testing') || step.id.includes('zs') || 
                           step.id.includes('continuity') || step.id.includes('insulation') || step.id.includes('rcd');

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
          
          {/* Professional Context for Electricians */}
          {mode === 'electrician' && (
            <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Professional Context</span>
              </div>
              <p className="text-xs text-blue-200">
                {isSafetyStep && "This is a safety-critical procedure that must be executed precisely to ensure personal safety and legal compliance."}
                {isMeasurementStep && !isSafetyStep && "Accurate measurements are essential for BS 7671 compliance and installation safety certification."}
                {!isSafetyStep && !isMeasurementStep && "This procedure contributes to overall installation verification and professional documentation requirements."}
              </p>
            </div>
          )}
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

      {/* Regulatory Standards */}
      {step.id.includes('zs') || step.id.includes('earth-fault-loop') && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-amber-300">
              <FileText className="h-5 w-5" />
              Regulatory Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-xs text-amber-200">
                <strong>BS 7671 Section 612.7:</strong> Earth fault loop impedance must be measured or calculated for every circuit.
              </p>
              <p className="text-xs text-amber-200">
                <strong>Maximum Zs Values:</strong> See BS 7671 Appendix 3 for maximum values based on protective device type.
              </p>
              <p className="text-xs text-amber-200">
                <strong>Temperature Correction:</strong> Conductor resistance increases with temperature - apply correction factors where necessary.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Measurement Guidance */}
      {isMeasurementStep && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-green-300">
              <Calculator className="h-5 w-5" />
              Measurement Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {step.id.includes('continuity') && (
                <div className="space-y-1">
                  <p className="text-xs text-green-200">
                    <strong>Expected R1+R2 values:</strong> 2.5mm² T&E cable ≈ 7.41mΩ/m, 1.5mm² T&E cable ≈ 12.02mΩ/m
                  </p>
                  <p className="text-xs text-green-200">
                    <strong>High readings indicate:</strong> Poor connections, cable damage, or incorrect circuit configuration
                  </p>
                </div>
              )}
              {step.id.includes('insulation') && (
                <div className="space-y-1">
                  <p className="text-xs text-green-200">
                    <strong>Minimum values:</strong> ≥1MΩ for circuits up to 500V, ≥0.5MΩ for SELV/PELV circuits
                  </p>
                  <p className="text-xs text-green-200">
                    <strong>Low readings indicate:</strong> Moisture ingress, damaged insulation, or contamination
                  </p>
                </div>
              )}
              {step.id.includes('rcd') && (
                <div className="space-y-1">
                  <p className="text-xs text-green-200">
                    <strong>Test requirements:</strong> 50% (no trip), 100% (≤300ms), 500% (≤40ms)
                  </p>
                  <p className="text-xs text-green-200">
                    <strong>Failed tests indicate:</strong> Worn contacts, incorrect sensitivity, or mechanical failure
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {step.tools.map((tool, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-blue-500/30 text-blue-200">
                    {tool}
                  </Badge>
                ))}
              </div>
              
              {/* Equipment-specific guidance */}
              {step.tools.some(tool => tool.toLowerCase().includes('tester')) && (
                <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                  <p className="text-xs text-blue-200">
                    <strong>Equipment Note:</strong> Ensure all test equipment is calibrated and within certification date. 
                    Check equipment operation before use and verify readings are stable.
                  </p>
                </div>
              )}
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
          <ol className="space-y-4">
            {step.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <span className="text-sm leading-relaxed">{instruction}</span>
                  
                  {/* Add contextual tips for key steps */}
                  {mode === 'apprentice' && instruction.toLowerCase().includes('test') && (
                    <p className="text-xs text-muted-foreground italic">
                      💡 Take your time with this measurement - accuracy is more important than speed
                    </p>
                  )}
                  {instruction.toLowerCase().includes('lock') && (
                    <p className="text-xs text-amber-300 italic">
                      ⚠️ Lock-off devices prevent accidental re-energization - never skip this step
                    </p>
                  )}
                  {instruction.toLowerCase().includes('record') && (
                    <p className="text-xs text-blue-300 italic">
                      📝 Clear documentation is essential for professional compliance and future reference
                    </p>
                  )}
                </div>
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
          
          {/* Result interpretation guidance */}
          {isMeasurementStep && mode === 'apprentice' && (
            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
              <p className="text-xs text-green-200">
                <strong>Understanding Results:</strong> Compare your measurements with expected values and regulatory limits. 
                Unusual readings may indicate installation problems that require investigation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Professional Tips for Electricians */}
      {mode === 'electrician' && (
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-purple-300">
              <Lightbulb className="h-5 w-5" />
              Professional Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs text-purple-200">
              {isSafetyStep && (
                <p>• Document isolation procedure and lock-off arrangements for compliance records</p>
              )}
              {step.id.includes('continuity') && (
                <p>• Use calculated values to verify measured results and identify potential issues</p>
              )}
              {step.id.includes('insulation') && (
                <p>• Environmental conditions significantly affect readings - note temperature and humidity</p>
              )}
              {step.id.includes('rcd') && (
                <p>• Test RCD discrimination in installations with multiple RCDs</p>
              )}
              <p>• Maintain detailed test records for professional liability and future reference</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedTestStepInstructions;
