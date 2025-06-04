
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface VisualInspectionResultProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  onRecordPass: () => void;
  onRecordFail: () => void;
  status: string;
  canAddPhoto?: boolean;
}

const VisualInspectionResult = ({ 
  notes, 
  onNotesChange, 
  onRecordPass, 
  onRecordFail, 
  status,
  canAddPhoto = false
}: VisualInspectionResultProps) => {
  const [inspectionResult, setInspectionResult] = useState<'pass' | 'fail' | ''>('');
  const isMobile = useIsMobile();

  const handleResultChange = (value: string) => {
    setInspectionResult(value as 'pass' | 'fail');
  };

  const handleRecordResult = () => {
    if (inspectionResult === 'pass') {
      onRecordPass();
    } else if (inspectionResult === 'fail') {
      onRecordFail();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium mb-3 block">Inspection Result</Label>
        <RadioGroup value={inspectionResult} onValueChange={handleResultChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pass" id="pass" />
            <Label htmlFor="pass" className="text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Pass - All items satisfactory
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fail" id="fail" />
            <Label htmlFor="fail" className="text-sm flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400" />
              Fail - Issues identified requiring attention
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="inspection-notes" className="text-sm font-medium">
          Comments & Observations
        </Label>
        <Textarea
          id="inspection-notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder={inspectionResult === 'fail' 
            ? "Describe the issues found and any immediate actions required..."
            : "Add any observations, notes, or additional details..."
          }
          className="bg-elec-dark border-elec-yellow/20 mt-1"
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {inspectionResult === 'fail' 
            ? "Required: Describe defects and remedial actions needed"
            : "Optional: Record any relevant observations"
          }
        </p>
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-3`}>
        <Button
          onClick={handleRecordResult}
          className={`${
            inspectionResult === 'pass' ? 'bg-green-600 hover:bg-green-700' : 
            inspectionResult === 'fail' ? 'bg-red-600 hover:bg-red-700' : 
            'bg-gray-600'
          } flex-1`}
          disabled={!inspectionResult || status === 'completed' || status === 'failed'}
        >
          {inspectionResult === 'pass' && <CheckCircle className="h-4 w-4 mr-2" />}
          {inspectionResult === 'fail' && <XCircle className="h-4 w-4 mr-2" />}
          Record {inspectionResult ? inspectionResult.charAt(0).toUpperCase() + inspectionResult.slice(1) : 'Result'}
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

export default VisualInspectionResult;
