
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TimeEntryForm from "../TimeEntryForm";

export interface TimeEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (duration: number, activity: string, notes: string) => void;
}

export const TimeEntryDialog = ({ isOpen, onClose, onSubmit }: TimeEntryDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Training Hours</DialogTitle>
        </DialogHeader>
        <TimeEntryForm 
          onAddEntry={onSubmit} 
          onCancel={onClose} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default TimeEntryDialog;
