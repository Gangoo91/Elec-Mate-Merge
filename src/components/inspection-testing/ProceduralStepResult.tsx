
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle } from 'lucide-react';
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

  const handleConfirmComplete = () => {
    console.log('Confirming step as complete - button clicked');
    console.log('Current status:', status);
    onRecordPass();
  };

  const handleRecordIssue = () => {
    console.log('Recording step as failed/issue');
    onRecordFail();
  };

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
          onClick={handleConfirmComplete}
          className="bg-green-600 hover:bg-green-700 text-white flex-1"
          disabled={status === 'completed'}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {status === 'completed' ? 'Step Completed' : 'Confirm Step Complete'}
        </Button>
        
        <Button
          onClick={handleRecordIssue}
          variant="destructive"
          className="flex-1"
          disabled={status === 'failed'}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Record Issue/Failure
        </Button>
        
        {canAddPhoto && (
          <Button variant="outline" className={isMobile ? 'w-full' : ''}>
            📷 Add Photo
          </Button>
        )}
      </div>

      {status === 'completed' && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Step marked as complete. You can now proceed to the next step.
          </p>
        </div>
      )}

      {status === 'failed' && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Step marked as failed. Review and address the issue before proceeding.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProceduralStepResult;
