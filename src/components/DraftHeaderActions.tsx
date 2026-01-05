import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Play } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DraftHeaderActionsProps {
  hasDraft: boolean;
  draftTimestamp?: number;
  onLoadDraft: () => void;
  onStartNew: () => void;
  hasUnsavedChanges?: boolean;
}

const DraftHeaderActions: React.FC<DraftHeaderActionsProps> = ({
  hasDraft,
  draftTimestamp,
  onLoadDraft,
  onStartNew,
  hasUnsavedChanges = false
}) => {
  const isMobile = useIsMobile();
  
  if (!hasDraft) return null;

  if (isMobile) {
    return (
      <Card className="border-elec-yellow/20 bg-card/50">
        <div className="p-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onLoadDraft}
              className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium h-9 text-sm"
            >
              <FileText className="h-3 w-3 mr-2" />
              Continue Draft
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onStartNew}
              className="flex-1 border-elec-yellow/30 text-foreground hover:bg-elec-yellow/5 hover:border-elec-yellow/50 font-medium h-9 text-sm"
            >
              <Play className="h-3 w-3 mr-2" />
              Start New
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-card/50">
      <div className="flex items-center justify-center gap-2 p-3">
        <Button
          size="sm"
          onClick={onLoadDraft}
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium h-9 text-sm"
        >
          <FileText className="h-3 w-3 mr-2" />
          Continue Draft
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onStartNew}
          className="border-elec-yellow/30 text-foreground hover:bg-elec-yellow/5 hover:border-elec-yellow/50 font-medium h-9 text-sm"
        >
          <Play className="h-3 w-3 mr-2" />
          Start New
        </Button>
      </div>
    </Card>
  );
};

export default DraftHeaderActions;
