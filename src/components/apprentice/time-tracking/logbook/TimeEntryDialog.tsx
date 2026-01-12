
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
} from "@/components/ui/responsive-dialog";
import TimeEntryForm from "../TimeEntryForm";

export interface TimeEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (duration: number, activity: string, notes: string) => void;
}

export const TimeEntryDialog = ({ isOpen, onClose, onSubmit }: TimeEntryDialogProps) => {
  return (
    <ResponsiveDialog open={isOpen} onOpenChange={onClose}>
      <ResponsiveDialogContent className="sm:max-w-2xl bg-white/5 border-elec-yellow/20">
        <ResponsiveDialogHeader className="pb-4 border-b border-elec-yellow/20">
          <ResponsiveDialogTitle className="text-elec-light flex items-center gap-2">
            Log Training Hours
          </ResponsiveDialogTitle>
          <p className="text-sm text-elec-light/70 mt-2">
            Record your off-the-job training activities and hours
          </p>
        </ResponsiveDialogHeader>
        <ResponsiveDialogBody>
          <TimeEntryForm
            onAddEntry={onSubmit}
            onCancel={onClose}
          />
        </ResponsiveDialogBody>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default TimeEntryDialog;
