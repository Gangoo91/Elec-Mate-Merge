
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle, Camera, Save } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import UnitDropdown from './UnitDropdown';
import RealTimeValidator from './RealTimeValidator';
import CircuitQuickAdd from './CircuitQuickAdd';

interface ValidationMessage {
  type: 'success' | 'warning' | 'error';
  message: string;
  standard?: string;
}

interface EnhancedMeasurementResultProps {
  value: string;
  unit: string;
  notes: string;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
  onNotesChange: (notes: string) => void;
  onRecordPass: () => void;
  onRecordFail: () => void;
  onSaveDraft?: () => void;
  status: string;
  stepId: string;
  canAddPhoto?: boolean;
  stepType?: string;
  circuitType?: string;
}

const EnhancedMeasurementResult = ({ 
  value,
  unit,
  notes,
  onValueChange,
  onUnitChange,
  onNotesChange,
  onRecordPass,
  onRecordFail,
  onSaveDraft,
  status,
  stepId,
  canAddPhoto = false,
  stepType,
  circuitType = 'lighting'
}: EnhancedMeasurementResultProps) => {
  const isMobile = useIsMobile();
  const [isValid, setIsValid] = useState(true);
  const [validationMessages, setValidationMessages] = useState<ValidationMessage[]>([]);
  const [selectedCircuit, setSelectedCircuit] = useState<string>('');

  const getValueLabel = () => {
    switch (stepType) {
      case 'continuity':
        return 'Resistance Reading (R1+R2)';
      case 'insulation':
        return 'Insulation Resistance';
      case 'earth-fault-loop':
        return 'Earth Fault Loop Impedance (Zs)';
      case 'rcd':
        return 'RCD Trip Time';
      case 'polarity':
        return 'Polarity Test';
      default:
        return 'Measured Value';
    }
  };

  const getValuePlaceholder = () => {
    switch (stepType) {
      case 'continuity':
        return 'e.g., 0.05';
      case 'insulation':
        return 'e.g., 500';
      case 'earth-fault-loop':
        return 'e.g., 0.25';
      case 'rcd':
        return 'e.g., 28';
      default:
        return 'Enter measured value';
    }
  };

  const handleValidationChange = (valid: boolean, messages: ValidationMessage[]) => {
    setIsValid(valid);
    setValidationMessages(messages);
  };

  const canRecordPass = value && isValid && status !== 'completed';
  const canRecordFail = status !== 'failed';

  return (
    <div className="space-y-4">
      {/* Circuit Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Circuit Under Test</Label>
        <CircuitQuickAdd onCircuitAdded={setSelectedCircuit} />
        {selectedCircuit && (
          <div className="text-xs text-green-400">
            Testing circuit: {selectedCircuit}
          </div>
        )}
      </div>

      {/* Measurement Input */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
        <div>
          <Label htmlFor="value" className="text-sm font-medium">{getValueLabel()}</Label>
          <Input
            id="value"
            type="number"
            step="0.001"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={getValuePlaceholder()}
            className="bg-elec-dark border-elec-yellow/20 mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter the reading from your test instrument
          </p>
        </div>
        
        <UnitDropdown
          value={unit}
          onChange={onUnitChange}
        />
      </div>

      {/* Real-time Validation */}
      <RealTimeValidator
        stepId={stepId}
        value={value}
        unit={unit}
        circuitType={circuitType}
        onValidationChange={handleValidationChange}
      />

      {/* Notes Section */}
      <div>
        <Label htmlFor="notes" className="text-sm font-medium">Test Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Record test conditions, ambient temperature, observations..."
          className="bg-elec-dark border-elec-yellow/20 mt-1"
          rows={3}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Include any relevant observations or special conditions during testing
        </p>
      </div>

      {/* Action Buttons */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-3`}>
        <Button
          onClick={onRecordPass}
          className="bg-green-600 hover:bg-green-700 flex-1"
          disabled={!canRecordPass}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {isValid ? 'Record Pass' : 'Force Pass'}
        </Button>
        
        <Button
          onClick={onRecordFail}
          variant="destructive"
          className="flex-1"
          disabled={!canRecordFail}
        >
          Record Fail
        </Button>

        {onSaveDraft && (
          <Button
            onClick={onSaveDraft}
            variant="outline"
            className={isMobile ? 'w-full' : ''}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        )}
        
        {canAddPhoto && (
          <Button 
            variant="outline" 
            className={isMobile ? 'w-full' : ''}
          >
            <Camera className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
        )}
      </div>

      {/* Validation Summary */}
      {!isValid && validationMessages.length > 0 && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-sm text-amber-200 font-medium mb-1">
            ⚠️ Validation Issues Detected
          </p>
          <p className="text-xs text-amber-300">
            The reading may not comply with BS 7671 requirements. 
            Review the validation messages above and consider retesting or investigation.
          </p>
        </div>
      )}
    </div>
  );
};

export default EnhancedMeasurementResult;
