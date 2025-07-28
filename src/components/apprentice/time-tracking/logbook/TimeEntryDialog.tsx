
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
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] bg-elec-gray border-elec-yellow/20">
        <DialogHeader className="pb-4 border-b border-elec-yellow/20">
          <DialogTitle className="text-elec-light flex items-center gap-2">
            Log Training Hours
          </DialogTitle>
          <p className="text-sm text-elec-light/70 mt-2">
            Record your off-the-job training activities and hours
          </p>
        </DialogHeader>
        <div className="pt-4">
          <TimeEntryForm 
            onAddEntry={onSubmit} 
            onCancel={onClose} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeEntryDialog;
