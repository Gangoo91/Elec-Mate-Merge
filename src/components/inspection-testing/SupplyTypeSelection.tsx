
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SupplyTypeSelectionProps {
  supplyType: string;
  notes: string;
  status: string;
  onSupplyTypeChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onRecordPass: () => void;
  onRecordFail: () => void;
  canAddPhoto?: boolean;
}

const SupplyTypeSelection = ({
  supplyType,
  notes,
  status,
  onSupplyTypeChange,
  onNotesChange,
  onRecordPass,
  onRecordFail,
  canAddPhoto = false
}: SupplyTypeSelectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Select Supply Type</Label>
      <RadioGroup value={supplyType} onValueChange={onSupplyTypeChange}>
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
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add any additional supply details or observations..."
          className="bg-elec-dark border-elec-yellow/20 mt-1"
          rows={2}
        />
      </div>
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-3`}>
        <Button
          onClick={onRecordPass}
          className="bg-red-600 hover:bg-red-700 flex-1"
          disabled={status === 'completed'}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirm Step Complete
        </Button>
        
        <Button
          onClick={onRecordFail}
          variant="destructive"
          className="flex-1"
          disabled={status === 'failed'}
        >
          Record Issue/Failure
        </Button>
        
        {canAddPhoto && (
          <Button variant="outline" className={isMobile ? 'w-full' : ''}>
            📷 Add Photo
          </Button>
        )}
      </div>
    </div>
  );
};

export default SupplyTypeSelection;
