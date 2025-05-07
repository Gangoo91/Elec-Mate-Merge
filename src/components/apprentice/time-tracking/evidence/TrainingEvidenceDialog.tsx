
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EvidenceForm from "./EvidenceForm";
import { TrainingEvidenceItem } from "@/types/time-tracking";

interface TrainingEvidenceDialogProps {
  trigger: React.ReactNode;
  title: string;
  onAddEvidence: (evidence: Omit<TrainingEvidenceItem, 'id'>) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

const TrainingEvidenceDialog = ({ 
  trigger, 
  title, 
  onAddEvidence, 
  isUploading, 
  setIsUploading 
}: TrainingEvidenceDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleAddEvidence = (evidence: Omit<TrainingEvidenceItem, 'id'>) => {
    onAddEvidence(evidence);
    // Close dialog after successful submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <EvidenceForm 
            onAddEvidence={handleAddEvidence}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TrainingEvidenceDialog;
