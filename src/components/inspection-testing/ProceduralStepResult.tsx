
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProceduralStepResultProps {
  notes: string;
  status: string;
  onNotesChange: (value: string) => void;
  onRecordPass: () => void;
  onRecordFail: () => void;
  canAddPhoto?: boolean;
}

const ProceduralStepResult = ({
  notes,
  status,
  onNotesChange,
  onRecordPass,
  onRecordFail,
  canAddPhoto = false
}: ProceduralStepResultProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="procedural-notes" className="text-sm font-medium">
          Completion Notes & Observations
        </Label>
        <Textarea
          id="procedural-notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Record completion details, any issues encountered, or additional observations..."
          className="bg-elec-dark border-elec-yellow/20 mt-1"
          rows={3}
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

export default ProceduralStepResult;
