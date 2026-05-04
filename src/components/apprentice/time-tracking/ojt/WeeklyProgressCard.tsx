import { Button } from '@/components/ui/button';
import { PlusCircle, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TimeEntryForm from '../TimeEntryForm';
import { TimeEntryTotal } from '@/types/time-tracking';

interface WeeklyProgressCardProps {
  weeklyHours: number;
  targetHours: number;
  courseHours: number;
  totalTime: TimeEntryTotal;
  addTimeEntry: (duration: number, activity: string, notes: string) => void;
  handleUploadEvidence: () => void;
}

const WeeklyProgressCard = ({
  weeklyHours,
  targetHours,
  courseHours,
  totalTime,
  addTimeEntry,
  handleUploadEvidence,
}: WeeklyProgressCardProps) => {
  const progress = Math.min((weeklyHours / targetHours) * 100, 100);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4 lg:col-span-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Weekly progress
      </span>

      <div className="space-y-2">
        <div className="flex justify-between text-[12px]">
          <span className="text-white/55">This week</span>
          <span className="text-white/85 font-mono">
            {weeklyHours} / {targetHours} hours
          </span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-[13px]">
          <span className="text-white/85">Course learning</span>
          <span className="text-white font-mono">{courseHours} hours</span>
        </div>
        <p className="text-[11px] text-white/55">
          Time automatically tracked from online learning
        </p>
      </div>

      <div className="flex justify-between text-[13px]">
        <span className="text-white/85">Total recorded time</span>
        <span className="text-white font-mono">
          {totalTime.hours}h {totalTime.minutes}m
        </span>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
              <PlusCircle className="h-4 w-4 mr-2" />
              Log manual hours
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Log training hours</DialogTitle>
            </DialogHeader>
            <TimeEntryForm onAddEntry={addTimeEntry} />
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          className="w-full h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          onClick={handleUploadEvidence}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload evidence
        </Button>
      </div>
    </div>
  );
};

export default WeeklyProgressCard;
