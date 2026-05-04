import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from '@/components/ui/dialog';
import EvidenceForm from './EvidenceForm';
import { TrainingEvidenceItem } from '@/types/time-tracking';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EvidenceEmptyStateProps {
  onAddEvidence: (evidence: Omit<TrainingEvidenceItem, 'id'>) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

const EvidenceEmptyState = ({
  onAddEvidence,
  isUploading,
  setIsUploading,
}: EvidenceEmptyStateProps) => {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] flex flex-col items-center justify-center py-10 px-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
        No evidence found
      </span>
      <p className="text-[14px] text-white/70 leading-relaxed text-center max-w-md mb-4">
        Add evidence of your training activities to build a comprehensive record of your learning.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
            Add your first evidence
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh]">
          <DialogHeader>Add your first evidence</DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
            <EvidenceForm
              onAddEvidence={onAddEvidence}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EvidenceEmptyState;
