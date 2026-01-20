import React from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { formatForSpeech } from '@/utils/voiceLibrary';

interface RemarksCellProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const RemarksCellComponent: React.FC<RemarksCellProps> = ({ result, onUpdate }) => {
  const { speak, isSpeaking } = useTextToSpeech();

  const handleReadBack = () => {
    if (result.notes) {
      const spokenText = formatForSpeech(result.notes);
      speak(spokenText, { interrupt: true });
    }
  };

  return (
    <TableCell className="p-0 h-8 align-middle w-40 min-w-[150px]">
      <div className="flex items-center gap-1 px-1">
        <Input
          value={result.notes || ''}
          onChange={(e) => onUpdate(result.id, 'notes', e.target.value)}
          className="h-7 text-sm px-2 border-0 rounded-md bg-transparent hover:bg-muted/20 focus:bg-muted/30 focus-visible:ring-1 focus-visible:ring-elec-yellow/30 flex-1"
          placeholder="Remarks"
        />
        {result.notes && (
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 shrink-0"
            onClick={handleReadBack}
            disabled={isSpeaking}
            title="Read remark aloud"
          >
            <Volume2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    </TableCell>
  );
};

export const RemarksCell = React.memo(RemarksCellComponent);
