/**
 * TimesheetSheet
 *
 * Bottom sheet for workers to manage timesheets:
 * - Clock in/out
 * - Manual time entry
 *
 * Multi-step flow with smooth transitions.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
  Clock,
  X,
  ChevronLeft,
  Loader2,
  Play,
  Square,
  PenLine,
  Timer,
  Calendar,
  Coffee,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { useActiveJobs } from '@/hooks/useJobs';
import { useCreateTimesheet } from '@/hooks/useTimesheets';

type TimesheetStep = 'choose' | 'clock-in' | 'clock-out' | 'manual';

interface TimesheetSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TimesheetSheet({ open, onOpenChange }: TimesheetSheetProps) {
  const {
    employee,
    employeeId,
    employeeName,
    isClockedIn,
    clockState,
    duration,
    clockIn,
    clockOut,
    isClockingOut,
  } = useWorkerSelfService();

  const { data: jobs, isLoading: jobsLoading } = useActiveJobs();
  const createTimesheet = useCreateTimesheet();

  const [step, setStep] = useState<TimesheetStep>('choose');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [breakMinutes, setBreakMinutes] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manual entry state
  const [manualData, setManualData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '17:00',
    breakMins: 30,
    notes: '',
  });

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after animation
    setTimeout(() => {
      setStep('choose');
      setSelectedJobId('');
      setBreakMinutes(0);
      setManualData({
        date: new Date().toISOString().split('T')[0],
        startTime: '08:00',
        endTime: '17:00',
        breakMins: 30,
        notes: '',
      });
    }, 300);
  };

  const handleClockIn = () => {
    if (!selectedJobId || !employeeId || !employeeName) {
      toast.error('Please select a job');
      return;
    }

    const job = jobs?.find(j => j.id === selectedJobId);
    if (!job) {
      toast.error('Job not found');
      return;
    }

    clockIn(employeeId, employeeName, selectedJobId, job.title);
    toast.success(`Clocked in to ${job.title}`);
    handleClose();
  };

  const handleClockOut = async () => {
    setIsSubmitting(true);
    const success = await clockOut(breakMinutes);
    setIsSubmitting(false);

    if (success) {
      handleClose();
    }
  };

  const handleManualSubmit = async () => {
    if (!selectedJobId || !employeeId) {
      toast.error('Please select a job');
      return;
    }

    const startDateTime = `${manualData.date}T${manualData.startTime}:00`;
    const endDateTime = `${manualData.date}T${manualData.endTime}:00`;

    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    if (endDate <= startDate) {
      toast.error('End time must be after start time');
      return;
    }

    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const totalHours = Math.max(0, diffHours - (manualData.breakMins / 60));

    setIsSubmitting(true);

    try {
      await createTimesheet.mutateAsync({
        employee_id: employeeId,
        job_id: selectedJobId,
        date: manualData.date,
        clock_in: startDateTime,
        clock_out: endDateTime,
        break_minutes: manualData.breakMins,
        total_hours: parseFloat(totalHours.toFixed(2)),
        status: 'Pending',
        notes: manualData.notes || null,
        approved_by: null,
        approved_at: null,
      });

      toast.success(`${totalHours.toFixed(1)} hours logged successfully`);
      handleClose();
    } catch {
      toast.error('Failed to submit timesheet');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'choose':
        return 'Timesheets';
      case 'clock-in':
        return 'Clock In';
      case 'clock-out':
        return 'Clock Out';
      case 'manual':
        return 'Manual Entry';
      default:
        return 'Timesheets';
    }
  };

  const canGoBack = step !== 'choose';

  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              {canGoBack ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep('choose')}
                  className="h-10 w-10 touch-manipulation"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              ) : (
                <div className="w-10" />
              )}
              <SheetTitle className="text-lg font-semibold flex-1 text-center">
                {getStepTitle()}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Manage your work timesheets
              </SheetDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Step: Choose */}
              {step === 'choose' && (
                <motion.div
                  key="choose"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-6"
                >
                  {/* Current clock state */}
                  {isClockedIn && clockState && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-green-500/20">
                          <Timer className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-400">Currently Clocked In</p>
                          <p className="text-xs text-white/60">{clockState.jobTitle}</p>
                        </div>
                      </div>
                      <div className="text-center py-3">
                        <p className="text-4xl font-bold text-green-400 font-mono">{duration}</p>
                        <p className="text-xs text-white/50 mt-1">
                          Since {format(new Date(clockState.clockInTime), 'HH:mm')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="space-y-3">
                    {!isClockedIn && (
                      <button
                        onClick={() => setStep('clock-in')}
                        className="w-full p-4 rounded-2xl bg-gradient-to-br from-green-500/15 to-emerald-500/10 border border-green-500/30 hover:border-green-500/50 transition-all touch-manipulation active:scale-[0.98] group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                            <Play className="h-7 w-7 text-green-400" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-foreground">Clock In</p>
                            <p className="text-sm text-muted-foreground">
                              Start tracking time on a job
                            </p>
                          </div>
                        </div>
                      </button>
                    )}

                    {isClockedIn && (
                      <button
                        onClick={() => setStep('clock-out')}
                        className="w-full p-4 rounded-2xl bg-gradient-to-br from-red-500/15 to-rose-500/10 border border-red-500/30 hover:border-red-500/50 transition-all touch-manipulation active:scale-[0.98] group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                            <Square className="h-7 w-7 text-red-400" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-foreground">Clock Out</p>
                            <p className="text-sm text-muted-foreground">
                              End your current session
                            </p>
                          </div>
                        </div>
                      </button>
                    )}

                    <button
                      onClick={() => setStep('manual')}
                      className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all touch-manipulation active:scale-[0.98] group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.12] transition-colors">
                          <PenLine className="h-7 w-7 text-white/80" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-foreground">Manual Entry</p>
                          <p className="text-sm text-muted-foreground">
                            Log hours for a past date
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step: Clock In */}
              {step === 'clock-in' && (
                <motion.div
                  key="clock-in"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-6"
                >
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Start Working</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select the job you're working on
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Select Job</Label>
                    <Select
                      value={selectedJobId}
                      onValueChange={setSelectedJobId}
                      disabled={jobsLoading}
                    >
                      <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 text-white focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Choose a job..." />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-gray border-white/10">
                        {jobs?.map((job) => (
                          <SelectItem
                            key={job.id}
                            value={job.id}
                            className="text-white focus:bg-white/10 focus:text-white"
                          >
                            {job.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-3 text-white/60">
                      <Clock className="h-4 w-4" />
                      <p className="text-sm">
                        Start time: {format(new Date(), 'HH:mm')} today
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step: Clock Out */}
              {step === 'clock-out' && clockState && (
                <motion.div
                  key="clock-out"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-6"
                >
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                      <Square className="h-8 w-8 text-red-400" />
                    </div>
                    <p className="text-4xl font-bold text-white font-mono">{duration}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {clockState.jobTitle}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      Break Time (minutes)
                    </Label>
                    <div className="grid grid-cols-5 gap-2">
                      {[0, 15, 30, 45, 60].map((mins) => (
                        <button
                          key={mins}
                          onClick={() => setBreakMinutes(mins)}
                          className={cn(
                            'h-12 rounded-xl border transition-all touch-manipulation',
                            breakMinutes === mins
                              ? 'bg-elec-yellow/10 border-elec-yellow/50 text-elec-yellow'
                              : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06]'
                          )}
                        >
                          {mins}
                        </button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      min="0"
                      max="480"
                      value={breakMinutes}
                      onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 0)}
                      className="h-11 touch-manipulation"
                      placeholder="Or enter custom..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Step: Manual Entry */}
              {step === 'manual' && (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-4"
                >
                  <div className="space-y-3">
                    <Label>Job</Label>
                    <Select
                      value={selectedJobId}
                      onValueChange={setSelectedJobId}
                      disabled={jobsLoading}
                    >
                      <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 text-white focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Choose a job..." />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-gray border-white/10">
                        {jobs?.map((job) => (
                          <SelectItem
                            key={job.id}
                            value={job.id}
                            className="text-white focus:bg-white/10 focus:text-white"
                          >
                            {job.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date
                    </Label>
                    <Input
                      type="date"
                      value={manualData.date}
                      onChange={(e) => setManualData(prev => ({ ...prev, date: e.target.value }))}
                      className="h-11 touch-manipulation"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={manualData.startTime}
                        onChange={(e) => setManualData(prev => ({ ...prev, startTime: e.target.value }))}
                        className="h-11 touch-manipulation"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={manualData.endTime}
                        onChange={(e) => setManualData(prev => ({ ...prev, endTime: e.target.value }))}
                        className="h-11 touch-manipulation"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      Break (minutes)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      max="480"
                      value={manualData.breakMins}
                      onChange={(e) => setManualData(prev => ({ ...prev, breakMins: parseInt(e.target.value) || 0 }))}
                      className="h-11 touch-manipulation"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Notes (optional)</Label>
                    <Textarea
                      value={manualData.notes}
                      onChange={(e) => setManualData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="What did you work on?"
                      className="touch-manipulation min-h-[80px]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {step === 'clock-in' && (
            <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
              <Button
                onClick={handleClockIn}
                disabled={!selectedJobId}
                className="w-full h-12 bg-green-500 hover:bg-green-500/90 text-elec-dark font-semibold touch-manipulation"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Clock
              </Button>
            </div>
          )}

          {step === 'clock-out' && (
            <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
              <Button
                onClick={handleClockOut}
                disabled={isSubmitting || isClockingOut}
                className="w-full h-12 bg-red-500 hover:bg-red-500/90 text-elec-dark font-semibold touch-manipulation"
              >
                {isSubmitting || isClockingOut ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Square className="h-5 w-5 mr-2" />
                    Clock Out
                  </>
                )}
              </Button>
            </div>
          )}

          {step === 'manual' && (
            <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
              <Button
                onClick={handleManualSubmit}
                disabled={!selectedJobId || isSubmitting}
                className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Clock className="h-5 w-5 mr-2" />
                    Submit Timesheet
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
