
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, AlertTriangle, CheckCircle, Camera, Wrench, Shield } from 'lucide-react';
import { TestStep, TestResult } from '@/types/inspection-testing';
import { BS7671Validator } from './BS7671Validator';
import { useIsMobile } from '@/hooks/use-mobile';

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

  const handleRecordResult = () => {
    const numericValue = parseFloat(value);
    const resultData = {
      value: isNaN(numericValue) ? undefined : numericValue,
      unit,
      status: 'completed' as const,
      notes,
      isWithinLimits: true // This will be validated by BS7671Validator
    };
    
    onRecordResult(resultData);
    setStatus('completed');
  };

  const handleMarkFailed = () => {
    onRecordResult({
      status: 'failed',
      notes
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

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray shadow-md">
      <CardHeader className={isMobile ? "pb-4" : ""}>
        <div className="flex items-center justify-between">
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
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

          {/* Safety Notes */}
          {step.safetyNotes && step.safetyNotes.length > 0 && (
            <Alert className="mt-4 bg-amber-500/10 border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-200">
                <strong>⚠️ Safety Notes:</strong>
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

        {/* Result Recording - Mobile Optimized */}
        <div className="border-t pt-6 space-y-4">
          <h4 className="font-medium">📝 Record Test Result</h4>
          
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
            <div>
              <Label htmlFor="value" className="text-sm font-medium">Measured Value</Label>
              <Input
                id="value"
                type="number"
                step="0.001"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter measured value"
                className="bg-elec-dark border-elec-yellow/20 mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="unit" className="text-sm font-medium">Unit</Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g., Ω, V, A, MΩ, ms"
                className="bg-elec-dark border-elec-yellow/20 mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional observations or notes"
              className="bg-elec-dark border-elec-yellow/20 mt-1"
              rows={3}
            />
          </div>

          <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-3`}>
            <Button
              onClick={handleRecordResult}
              className="bg-green-600 hover:bg-green-700 flex-1"
              disabled={status === 'completed'}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Record Pass
            </Button>
            
            <Button
              onClick={handleMarkFailed}
              variant="destructive"
              className="flex-1"
              disabled={status === 'failed'}
            >
              Record Fail
            </Button>
            
            {mode === 'electrician' && (
              <Button variant="outline" className={isMobile ? 'w-full' : ''}>
                <Camera className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestStepDisplay;
