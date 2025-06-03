
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, AlertTriangle, CheckCircle, Camera, Wrench } from 'lucide-react';
import { TestStep, TestResult } from '@/types/inspection-testing';

interface TestStepDisplayProps {
  step: TestStep;
  result?: TestResult;
  onRecordResult: (result: Omit<TestResult, 'stepId' | 'timestamp'>) => void;
  mode: 'electrician' | 'apprentice';
}

const TestStepDisplay = ({ step, result, onRecordResult, mode }: TestStepDisplayProps) => {
  const [value, setValue] = useState<string>(result?.value?.toString() || '');
  const [unit, setUnit] = useState<string>(result?.unit || 'Ω');
  const [notes, setNotes] = useState<string>(result?.notes || '');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped'>(
    result?.status || 'pending'
  );

  const handleRecordResult = () => {
    const numericValue = parseFloat(value);
    onRecordResult({
      value: isNaN(numericValue) ? undefined : numericValue,
      unit,
      status: 'completed',
      notes,
      isWithinLimits: true // This would be calculated based on expected values
    });
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
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
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
          <p className="text-muted-foreground mb-4">{step.description}</p>
          
          {/* Instructions */}
          <div className="space-y-2">
            <h4 className="font-medium">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              {step.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
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
                <strong>Safety Notes:</strong>
                <ul className="list-disc list-inside mt-1">
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
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium">Tools Required:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {step.tools.map((tool, index) => (
                  <Badge key={index} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result Recording */}
        <div className="border-t pt-4 space-y-4">
          <h4 className="font-medium">Record Test Result</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">Measured Value</Label>
              <Input
                id="value"
                type="number"
                step="0.001"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter measured value"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g., Ω, V, A"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional observations or notes"
              className="bg-elec-dark border-elec-yellow/20"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleRecordResult}
              className="bg-green-600 hover:bg-green-700"
              disabled={status === 'completed'}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Record Pass
            </Button>
            
            <Button
              onClick={handleMarkFailed}
              variant="destructive"
              disabled={status === 'failed'}
            >
              Record Fail
            </Button>
            
            {mode === 'electrician' && (
              <Button variant="outline">
                <Camera className="h-4 w-4 mr-1" />
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
