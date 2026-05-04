import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
} from '@/components/ui/responsive-dialog';
import TimeEntryForm from '../TimeEntryForm';

export interface TimeEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (duration: number, activity: string, notes: string) => void;
}

export const TimeEntryDialog = ({ isOpen, onClose, onSubmit }: TimeEntryDialogProps) => {
  return (
    <ResponsiveDialog open={isOpen} onOpenChange={onClose}>
      <ResponsiveDialogContent className="sm:max-w-2xl bg-background border-white/[0.06]">
        <ResponsiveDialogHeader className="pb-4 border-b border-white/[0.06]">
          <ResponsiveDialogTitle className="text-white">Log training hours</ResponsiveDialogTitle>
          <p className="text-[13px] text-white/70 mt-2 leading-relaxed">
            Record your off-the-job training activities and hours
          </p>
        </ResponsiveDialogHeader>
        <ResponsiveDialogBody>
          <TimeEntryForm onAddEntry={onSubmit} onCancel={onClose} />
        </ResponsiveDialogBody>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default TimeEntryDialog;
