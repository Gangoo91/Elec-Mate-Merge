
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { TestStep, TestResult } from '@/types/inspection-testing';

interface TestStepDisplayProps {
  step: TestStep;
  result?: TestResult;
  onRecordResult: (result: Omit<TestResult, 'stepId' | 'timestamp'>) => void;
  mode: 'electrician' | 'apprentice';
}

const TestStepDisplay: React.FC<TestStepDisplayProps> = ({
  step,
  result,
  onRecordResult,
  mode
}) => {
  const [value, setValue] = useState<string>(result?.value?.toString() || '');
  const [notes, setNotes] = useState<string>(result?.notes || '');
  const [status, setStatus] = useState<TestResult['status']>(result?.status || 'pending');

  const handleRecordResult = (newStatus: TestResult['status']) => {
    const numericValue = value ? parseFloat(value) : undefined;
    const isWithinLimits = numericValue && step.acceptableLimits 
      ? checkLimits(numericValue, step.acceptableLimits)
      : undefined;

    onRecordResult({
      value: numericValue,
      unit: step.acceptableLimits?.unit,
      status: newStatus,
      notes,
      isWithinLimits
    });

    setStatus(newStatus);
  };

  const checkLimits = (testValue: number, limits: NonNullable<TestStep['acceptableLimits']>) => {
    if (limits.min !== undefined && testValue < limits.min) return false;
    if (limits.max !== undefined && testValue > limits.max) return false;
    return true;
  };

  const getStatusIcon = (stepStatus: TestResult['status']) => {
    switch (stepStatus) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (stepStatus: TestResult['status']) => {
    switch (stepStatus) {
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'in-progress':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon(status)}
            {step.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(status)}>
              {status.replace('-', ' ').toUpperCase()}
            </Badge>
            {step.estimatedTime && (
              <Badge variant="outline">
                {step.estimatedTime}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-muted-foreground mb-4">{step.description}</p>
          
          <div className="space-y-3">
            <h4 className="font-medium">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {step.instructions.map((instruction, index) => (
                <li key={index} className="text-muted-foreground">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {step.safetyWarnings && step.safetyWarnings.length > 0 && (
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">
              <div className="space-y-1">
                <strong>Safety Warnings:</strong>
                {step.safetyWarnings.map((warning, index) => (
                  <div key={index}>• {warning}</div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {step.acceptableLimits && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-2">Acceptable Limits</h4>
            <div className="text-sm text-blue-300">
              {step.acceptableLimits.min !== undefined && (
                <div>Minimum: {step.acceptableLimits.min} {step.acceptableLimits.unit}</div>
              )}
              {step.acceptableLimits.max !== undefined && (
                <div>Maximum: {step.acceptableLimits.max} {step.acceptableLimits.unit}</div>
              )}
            </div>
          </div>
        )}

        {mode === 'electrician' && (
          <div className="space-y-4 border-t border-gray-600 pt-4">
            <h4 className="font-medium">Record Results</h4>
            
            {step.acceptableLimits && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="value">Measured Value</Label>
                  <div className="flex gap-2">
                    <Input
                      id="value"
                      type="number"
                      step="0.01"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter value"
                      className="mt-1"
                    />
                    {step.acceptableLimits.unit && (
                      <div className="flex items-center px-3 bg-gray-700 rounded-md mt-1">
                        <span className="text-sm text-muted-foreground">
                          {step.acceptableLimits.unit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any observations or notes..."
                className="mt-1"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => handleRecordResult('completed')}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Pass
              </Button>
              
              <Button 
                onClick={() => handleRecordResult('failed')}
                className="bg-red-600 hover:bg-red-700"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Fail
              </Button>
              
              <Button 
                onClick={() => handleRecordResult('skipped')}
                variant="outline"
              >
                Skip
              </Button>
            </div>
          </div>
        )}

        {result && result.status !== 'pending' && (
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <h4 className="font-medium mb-2">Recorded Result</h4>
            <div className="space-y-1 text-sm">
              <div>Status: <Badge className={getStatusColor(result.status)}>{result.status}</Badge></div>
              {result.value !== undefined && (
                <div>Value: {result.value} {result.unit}</div>
              )}
              {result.notes && (
                <div>Notes: {result.notes}</div>
              )}
              <div>Recorded: {result.timestamp.toLocaleString()}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestStepDisplay;
