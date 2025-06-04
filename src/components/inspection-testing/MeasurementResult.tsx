
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle, Camera } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import UnitDropdown from './UnitDropdown';

interface MeasurementResultProps {
  value: string;
  unit: string;
  notes: string;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
  onNotesChange: (notes: string) => void;
  onRecordPass: () => void;
  onRecordFail: () => void;
  status: string;
  canAddPhoto?: boolean;
  stepType?: string;
}

const MeasurementResult = ({ 
  value,
  unit,
  notes,
  onValueChange,
  onUnitChange,
  onNotesChange,
  onRecordPass,
  onRecordFail,
  status,
  canAddPhoto = false,
  stepType
}: MeasurementResultProps) => {
  const isMobile = useIsMobile();

  const getValueLabel = () => {
    switch (stepType) {
      case 'continuity':
        return 'Resistance Reading';
      case 'insulation':
        return 'Insulation Resistance';
      case 'earth-fault-loop':
        return 'Loop Impedance (Zs)';
      case 'rcd':
        return 'Trip Time';
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

  return (
    <div className="space-y-4">
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

      <div>
        <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add any additional observations, test conditions, or notes..."
          className="bg-elec-dark border-elec-yellow/20 mt-1"
          rows={3}
        />
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-3`}>
        <Button
          onClick={onRecordPass}
          className="bg-green-600 hover:bg-green-700 flex-1"
          disabled={status === 'completed' || !value}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Record Pass
        </Button>
        
        <Button
          onClick={onRecordFail}
          variant="destructive"
          className="flex-1"
          disabled={status === 'failed'}
        >
          Record Fail
        </Button>
        
        {canAddPhoto && (
          <Button variant="outline" className={isMobile ? 'w-full' : ''}>
            <Camera className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
        )}
      </div>
    </div>
  );
};

export default MeasurementResult;
