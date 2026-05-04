import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TimeEntryForm from '../TimeEntryForm';

interface LogbookEmptyStateProps {
  onAddEntry: (duration: number, activity: string, notes: string) => void;
}

const LogbookEmptyState = ({ onAddEntry }: LogbookEmptyStateProps) => {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] flex flex-col items-center justify-center py-10 px-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
        No entries found
      </span>
      <p className="text-[14px] text-white/70 leading-relaxed text-center max-w-md mb-4">
        No training entries found for the selected period. Start by adding your first training
        activity.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
            <Plus className="h-4 w-4" />
            Log your first training activity
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log training hours</DialogTitle>
          </DialogHeader>
          <TimeEntryForm onAddEntry={onAddEntry} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogbookEmptyState;
