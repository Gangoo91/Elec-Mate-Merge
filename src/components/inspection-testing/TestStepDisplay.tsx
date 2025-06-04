
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, CheckCircle, Wrench, Shield } from 'lucide-react';
import { TestStep, TestResult } from '@/types/inspection-testing';
import { BS7671Validator } from './BS7671Validator';
import { useIsMobile } from '@/hooks/use-mobile';
import VisualInspectionResult from './VisualInspectionResult';
import MeasurementResult from './MeasurementResult';

interface TestStepDisplayProps {
  step: TestStep;
  result?: TestResult;
  onRecordResult: (result: Omit<TestResult, 'stepId' | 'timestamp'>) => void;
  mode: 'electrician' | 'apprentice';
}

const TestStepDisplay = ({ step, result, onRecordResult, mode }: TestStepDisplayProps) => {
  const [value, setValue] = useState<string>(result?.value?.toString() || '');
  const [unit, setUnit] = useState<string>(result?.unit || getDefaultUnit(step.id));
  const [notes, setNotes] = useState<string>(result?.notes || '');
  const [supplyType, setSupplyType] = useState<string>(result?.notes || '');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped'>(
    result?.status || 'pending'
  );
  
  const isMobile = useIsMobile();

  // Get validation for current result
  const validation = result ? BS7671Validator.validateTestStep(step, result) : null;

  function getDefaultUnit(stepId: string): string {
    switch (stepId) {
      case 'continuity-measurement':
      case 'zs-measurement':
        return 'Ω';
      case 'insulation-test':
        return 'MΩ';
      case 'rcd-trip-test':
        return 'ms';
      default:
        return '';
    }
  }

  // Enhanced test step detection logic
  const getStepType = () => {
    const stepId = step.id.toLowerCase();
    const stepTitle = step.title.toLowerCase();
    
    // Visual inspection steps
    if (stepId.includes('visual') || stepTitle.includes('visual') || 
        stepId.includes('inspection') || stepTitle.includes('inspection')) {
      return 'visual-inspection';
    }
    
    // Safe isolation and procedural steps
    if (stepId.includes('isolation') || stepId.includes('proving') || 
        stepId.includes('dead-testing') || stepId.includes('planning') ||
        stepId.includes('execution') || stepId.includes('secure') ||
        stepId.includes('precautions')) {
      return 'procedural';
    }
    
    // Supply type selection
    if (stepId === 'safe-isolation-selection' || stepId === 'supply-type-identification') {
      return 'supply-selection';
    }
    
    // Measurement-based tests
    if (stepId.includes('continuity') || stepId.includes('measurement')) {
      return 'continuity';
    }
    if (stepId.includes('insulation') || stepId.includes('resistance')) {
      return 'insulation';
    }
    if (stepId.includes('earth-fault-loop') || stepId.includes('zs')) {
      return 'earth-fault-loop';
    }
    if (stepId.includes('rcd') || stepId.includes('trip')) {
      return 'rcd';
    }
    if (stepId.includes('polarity')) {
      return 'polarity';
    }
    
    // Default to measurement for unknown types
    return 'measurement';
  };

  const stepType = getStepType();
  const isVisualInspection = stepType === 'visual-inspection';
  const isSupplySelection = stepType === 'supply-selection';
  const isProcedural = stepType === 'procedural';
  const isMeasurement = !isVisualInspection && !isSupplySelection && !isProcedural;

  const handleRecordPass = () => {
    const resultData = {
      value: isMeasurement && value ? parseFloat(value) : undefined,
      unit: isMeasurement ? unit : undefined,
      status: 'completed' as const,
      notes: isSupplySelection ? supplyType : notes,
      isWithinLimits: true
    };
    
    onRecordResult(resultData);
    setStatus('completed');
  };

  const handleRecordFail = () => {
    onRecordResult({
      value: isMeasurement && value ? parseFloat(value) : undefined,
      unit: isMeasurement ? unit : undefined,
      status: 'failed',
      notes: isSupplySelection ? supplyType : notes,
      isWithinLimits: false
    });
    setStatus('failed');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'skipped': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  // Check if this is a safe isolation step
  const isSafeIsolationStep = step.id.startsWith('safe-isolation') || step.id.includes('isolation') || 
                               step.id.includes('proving') || step.id === 'supply-type-identification' || 
                               step.id === 'dead-testing' || step.id === 'additional-precautions';

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray shadow-md">
      <CardHeader className={isMobile ? "pb-4" : ""}>
        <div className="flex items-center justify-between">
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
            {isSafeIsolationStep && <Shield className="h-5 w-5 text-red-400" />}
            {step.title}
            <Badge className={getStatusColor(status)}>
              {status}
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {step.estimatedTime}min
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
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

        {/* BS 7671 Validation Results */}
        {validation && (
          <Alert className={`${
            validation.severity === 'error' ? 'bg-red-500/10 border-red-500/30' :
            validation.severity === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
            'bg-green-500/10 border-green-500/30'
          }`}>
            <Shield className={`h-4 w-4 ${
              validation.severity === 'error' ? 'text-red-400' :
              validation.severity === 'warning' ? 'text-yellow-400' :
              'text-green-400'
            }`} />
            <AlertDescription className={
              validation.severity === 'error' ? 'text-red-200' :
              validation.severity === 'warning' ? 'text-yellow-200' :
              'text-green-200'
            }>
              <strong>BS 7671 Validation:</strong> {validation.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Result Recording Section */}
        <div className="border-t pt-6 space-y-4">
          <h4 className="font-medium">📝 Record Test Result</h4>
          
          {/* Supply Type Selection */}
          {isSupplySelection && (
            <div className="space-y-4">
              <Label className="text-sm font-medium">Select Supply Type</Label>
              <RadioGroup value={supplyType} onValueChange={setSupplyType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single-phase" id="single-phase" />
                  <Label htmlFor="single-phase" className="text-sm">
                    Single Phase (230V L-N-E)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="three-phase" id="three-phase" />
                  <Label htmlFor="three-phase" className="text-sm">
                    Three Phase (400V L1-L2-L3-N-E)
                  </Label>
                </div>
              </RadioGroup>
              <div>
                <Label htmlFor="supply-notes" className="text-sm font-medium">Notes (Optional)</Label>
                <Textarea
                  id="supply-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional supply details or observations..."
                  className="bg-elec-dark border-elec-yellow/20 mt-1"
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Visual Inspection Mode */}
          {isVisualInspection && (
            <VisualInspectionResult
              notes={notes}
              onNotesChange={setNotes}
              onRecordPass={handleRecordPass}
              onRecordFail={handleRecordFail}
              status={status}
              canAddPhoto={mode === 'electrician'}
            />
          )}

          {/* Measurement Mode */}
          {isMeasurement && (
            <MeasurementResult
              value={value}
              unit={unit}
              notes={notes}
              onValueChange={setValue}
              onUnitChange={setUnit}
              onNotesChange={setNotes}
              onRecordPass={handleRecordPass}
              onRecordFail={handleRecordFail}
              status={status}
              canAddPhoto={mode === 'electrician'}
              stepType={stepType}
            />
          )}

          {/* Procedural Steps */}
          {isProcedural && !isSupplySelection && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="procedural-notes" className="text-sm font-medium">
                  Completion Notes & Observations
                </Label>
                <Textarea
                  id="procedural-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record completion details, any issues encountered, or additional observations..."
                  className="bg-elec-dark border-elec-yellow/20 mt-1"
                  rows={3}
                />
              </div>
              
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-3`}>
                <Button
                  onClick={handleRecordPass}
                  className="bg-red-600 hover:bg-red-700 flex-1"
                  disabled={status === 'completed'}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Step Complete
                </Button>
                
                <Button
                  onClick={handleRecordFail}
                  variant="destructive"
                  className="flex-1"
                  disabled={status === 'failed'}
                >
                  Record Issue/Failure
                </Button>
                
                {mode === 'electrician' && (
                  <Button variant="outline" className={isMobile ? 'w-full' : ''}>
                    📷 Add Photo
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestStepDisplay;
