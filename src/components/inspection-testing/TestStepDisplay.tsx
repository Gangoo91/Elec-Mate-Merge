import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TestStep, TestResult } from '@/types/inspection-testing';
import { BS7671Validator } from './BS7671Validator';
import TestStepHeader from './TestStepHeader';
import TestStepInstructions from './TestStepInstructions';
import TestStepValidation from './TestStepValidation';
import SupplyTypeSelection from './SupplyTypeSelection';
import VisualInspectionResult from './VisualInspectionResult';
import MeasurementResult from './MeasurementResult';
import ProceduralStepResult from './ProceduralStepResult';
import { useEICR } from '@/contexts/EICRContext';

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

  const { populateFromTestResult } = useEICR();

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
        stepId.includes('precautions') || stepId.includes('preparation') ||
        stepId.includes('notification') || stepId.includes('documentation')) {
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

    // Integrate with EICR
    populateFromTestResult(step.id, {
      ...resultData,
      stepId: step.id,
      timestamp: new Date()
    });
  };

  const handleRecordFail = () => {
    const resultData = {
      value: isMeasurement && value ? parseFloat(value) : undefined,
      unit: isMeasurement ? unit : undefined,
      status: 'failed' as const,
      notes: isSupplySelection ? supplyType : notes,
      isWithinLimits: false
    };

    onRecordResult(resultData);
    setStatus('failed');

    // Integrate with EICR
    populateFromTestResult(step.id, {
      ...resultData,
      stepId: step.id,
      timestamp: new Date()
    });
  };

  // Check if this is a safe isolation step
  const isSafeIsolationStep = step.id.startsWith('safe-isolation') || step.id.includes('isolation') || 
                               step.id.includes('proving') || step.id === 'supply-type-identification' || 
                               step.id === 'dead-testing' || step.id === 'additional-precautions';

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray shadow-md">
      <TestStepHeader
        title={step.title}
        status={status}
        estimatedTime={step.estimatedTime}
        isSafeIsolationStep={isSafeIsolationStep}
      />
      
      <CardContent className="space-y-6">
        <TestStepInstructions
          step={step}
          isSafeIsolationStep={isSafeIsolationStep}
          mode={mode}
        />

        <TestStepValidation validation={validation} />

        {/* Result Recording Section */}
        <div className="border-t pt-6 space-y-4">
          <h4 className="font-medium">📝 Record Test Result</h4>
          
          {/* Supply Type Selection */}
          {isSupplySelection && (
            <SupplyTypeSelection
              supplyType={supplyType}
              notes={notes}
              status={status}
              onSupplyTypeChange={setSupplyType}
              onNotesChange={setNotes}
              onRecordPass={handleRecordPass}
              onRecordFail={handleRecordFail}
              canAddPhoto={mode === 'electrician'}
            />
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
            <ProceduralStepResult
              notes={notes}
              status={status}
              onNotesChange={setNotes}
              onRecordPass={handleRecordPass}
              onRecordFail={handleRecordFail}
              canAddPhoto={mode === 'electrician'}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestStepDisplay;
