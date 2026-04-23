import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useEPAGateway, GatewayStatus } from '@/hooks/college/useEPAGateway';
import {
  SectionHeader,
  ListCard,
  Pill,
  EmptyState,
  LoadingState,
  type Tone,
} from '@/components/college/primitives';

interface EPAGatewayChecklistProps {
  studentId: string;
  qualificationId: string;
  readOnly?: boolean;
}

const EPAGatewayChecklist: React.FC<EPAGatewayChecklistProps> = ({
  studentId,
  qualificationId,
  readOnly = false,
}) => {
  const {
    gatewayStatus,
    checklistItems,
    isLoading,
    updateChecklistItem,
    updateOJTHours,
    bookEPA,
  } = useEPAGateway(studentId, qualificationId);

  const [showBookEPA, setShowBookEPA] = useState(false);
  const [epaDate, setEpaDate] = useState('');
  const [ojtHoursInput, setOjtHoursInput] = useState('');
  const [showOJTSheet, setShowOJTSheet] = useState(false);

  if (isLoading) {
    return <LoadingState />;
  }

  const status = gatewayStatus as GatewayStatus;
  if (!status) {
    return (
      <EmptyState
        title="No gateway data available"
        description="Gateway data will appear once this apprentice has progress to report."
      />
    );
  }

  const getReadinessTone = (readiness: string): Tone => {
    switch (readiness) {
      case 'gateway_passed':
        return 'green';
      case 'ready':
        return 'blue';
      case 'nearly_ready':
        return 'amber';
      default:
        return 'red';
    }
  };

  const getReadinessLabel = (readiness: string) => {
    switch (readiness) {
      case 'gateway_passed':
        return 'Gateway Passed';
      case 'ready':
        return 'Ready for Gateway';
      case 'nearly_ready':
        return 'Nearly Ready';
      default:
        return 'Not Ready';
    }
  };

  const handleChecklistUpdate = async (key: string, completed: boolean) => {
    await updateChecklistItem.mutateAsync({
      studentId,
      qualificationId,
      field: key,
      value: completed,
    });
  };

  const handleOJTUpdate = async () => {
    const hours = parseInt(ojtHoursInput);
    if (!isNaN(hours) && hours >= 0) {
      await updateOJTHours.mutateAsync({
        studentId,
        qualificationId,
        hours,
      });
      setShowOJTSheet(false);
      setOjtHoursInput('');
    }
  };

  const handleBookEPA = async () => {
    if (epaDate) {
      await bookEPA.mutateAsync({
        studentId,
        qualificationId,
        epaDate,
      });
      setShowBookEPA(false);
      setEpaDate('');
    }
  };

  const ojtProgress = Math.round((status.ojtHoursCompleted / status.ojtHoursRequired) * 100);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              EPA Gateway Checklist
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Gateway Progress
            </h3>
            <p className="mt-1 text-[12.5px] text-white/55">
              {status.studentName} · {status.qualificationTitle}
            </p>
          </div>
          <Pill tone={getReadinessTone(status.readinessStatus)}>
            {getReadinessLabel(status.readinessStatus)}
          </Pill>
        </div>

        <div className="flex items-center justify-between text-[12.5px] mb-2">
          <span className="text-white/55">Gateway Progress</span>
          <span className="font-semibold text-white tabular-nums">{status.overallProgress}%</span>
        </div>
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow/80 rounded-full transition-all"
            style={{ width: `${status.overallProgress}%` }}
          />
        </div>
      </div>

      {/* OJT Hours */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Off-the-Job Training Hours
            </div>
            <h4 className="mt-1 text-lg font-semibold text-white">OJT Progress</h4>
          </div>
          {!readOnly && (
            <button
              onClick={() => setShowOJTSheet(true)}
              className="h-10 px-4 rounded-full text-[12.5px] font-medium text-white/70 border border-white/[0.08] hover:bg-white/5 hover:text-white transition-colors touch-manipulation"
            >
              Update hours
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-[13px] mb-2">
          <span className="text-white/70 tabular-nums">
            {status.ojtHoursCompleted} / {status.ojtHoursRequired} hours
          </span>
          <span className="text-white/55 tabular-nums">{ojtProgress}%</span>
        </div>
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow/80 rounded-full transition-all"
            style={{ width: `${Math.min(ojtProgress, 100)}%` }}
          />
        </div>

        {status.ojtHoursVerified && (
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
            <span className="text-[12.5px] text-green-400">Hours verified</span>
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Requirements" title="Gateway Requirements" />
        <p className="text-[13px] text-white/55">All items must be completed before EPA</p>

        <ListCard>
          {checklistItems.map((item) => (
            <div
              key={item.key}
              className={cn(
                'px-5 sm:px-6 py-4 sm:py-5 flex items-center gap-4',
                item.completed && 'bg-green-500/[0.03]'
              )}
            >
              {readOnly ? (
                <div
                  className={cn(
                    'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0',
                    item.completed
                      ? 'bg-green-500/20 border-green-500'
                      : 'bg-transparent border-white/20'
                  )}
                >
                  {item.completed && (
                    <span className="text-green-400 text-[11px] font-bold">✓</span>
                  )}
                </div>
              ) : (
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={(checked) =>
                    handleChecklistUpdate(item.key, checked as boolean)
                  }
                  className="h-5 w-5 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      'text-[14px] font-medium',
                      item.completed ? 'text-green-400' : 'text-white'
                    )}
                  >
                    {item.label}
                  </span>
                  {item.required && <Pill tone="amber">Required</Pill>}
                </div>
                <p className="mt-0.5 text-[12.5px] text-white/55 leading-relaxed">
                  {item.description}
                </p>
              </div>
              {item.completedDate && (
                <div className="text-right shrink-0">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">
                    Completed
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-white/70 tabular-nums">
                    {new Date(item.completedDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </ListCard>
      </div>

      {/* EPA Booking */}
      {status.gatewayPassed && (
        <div
          className={cn(
            'bg-[hsl(0_0%_12%)] border rounded-2xl p-5 sm:p-6',
            status.epaBookedDate ? 'border-green-500/20' : 'border-blue-500/20'
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className={cn(
                'inline-block h-1.5 w-1.5 rounded-full',
                status.epaBookedDate ? 'bg-green-400' : 'bg-blue-400'
              )}
            />
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              End Point Assessment
            </div>
          </div>

          {status.epaBookedDate ? (
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[15px] font-medium text-white">EPA Scheduled</div>
                <div className="mt-1 text-[12.5px] text-white/55">
                  {new Date(status.epaBookedDate).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
              <Pill tone="green">Confirmed</Pill>
            </div>
          ) : (
            <button
              onClick={() => setShowBookEPA(true)}
              className="w-full h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity touch-manipulation"
            >
              Book EPA
            </button>
          )}
        </div>
      )}

      {/* Not Ready Message */}
      {!status.gatewayPassed && status.readinessStatus !== 'ready' && (
        <div className="bg-[hsl(0_0%_12%)] border border-amber-500/20 rounded-2xl p-5 flex items-start gap-4">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
          <div>
            <p className="text-[14px] font-medium text-amber-300">
              Gateway Requirements Incomplete
            </p>
            <p className="mt-1 text-[12.5px] text-white/55 leading-relaxed">
              Complete all required checklist items before the apprentice can progress to EPA.
            </p>
          </div>
        </div>
      )}

      {/* Update OJT Hours Sheet */}
      <Sheet open={showOJTSheet} onOpenChange={setShowOJTSheet}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[50vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
        >
          <div className="flex flex-col">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <SheetHeader className="px-5 pb-4">
              <SheetTitle className="text-base text-white">Update OJT Hours</SheetTitle>
              <p className="text-[12.5px] text-white/55 mt-1">
                Enter the total verified off-the-job training hours
              </p>
            </SheetHeader>
            <div className="px-5 pb-4 space-y-3">
              <div className="space-y-2">
                <Label className="text-[12.5px] text-white/70">Hours Completed</Label>
                <Input
                  type="number"
                  value={ojtHoursInput}
                  onChange={(e) => setOjtHoursInput(e.target.value)}
                  placeholder={String(status.ojtHoursCompleted)}
                  className="h-11 bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/65 focus:border-elec-yellow/60 rounded-xl touch-manipulation text-base"
                />
              </div>
              <p className="text-[12.5px] text-white/75">
                Required: {status.ojtHoursRequired} hours
              </p>
            </div>
            <SheetFooter className="border-t border-white/[0.06] p-5">
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowOJTSheet(false)}
                  className="flex-1 h-11 px-5 rounded-full text-[13px] font-medium text-white/70 border border-white/[0.08] hover:bg-white/5 transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOJTUpdate}
                  className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity touch-manipulation"
                >
                  Update
                </button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Book EPA Sheet */}
      <Sheet open={showBookEPA} onOpenChange={setShowBookEPA}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[50vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
        >
          <div className="flex flex-col">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <SheetHeader className="px-5 pb-4">
              <SheetTitle className="text-base text-white">Book End Point Assessment</SheetTitle>
              <p className="text-[12.5px] text-white/55 mt-1">
                Schedule the EPA date for this apprentice
              </p>
            </SheetHeader>
            <div className="px-5 pb-4 space-y-2">
              <Label className="text-[12.5px] text-white/70">EPA Date</Label>
              <Input
                type="date"
                value={epaDate}
                onChange={(e) => setEpaDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="h-11 bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/65 focus:border-elec-yellow/60 rounded-xl touch-manipulation text-base"
              />
            </div>
            <SheetFooter className="border-t border-white/[0.06] p-5">
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowBookEPA(false)}
                  className="flex-1 h-11 px-5 rounded-full text-[13px] font-medium text-white/70 border border-white/[0.08] hover:bg-white/5 transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookEPA}
                  disabled={!epaDate}
                  className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                >
                  Confirm Booking
                </button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EPAGatewayChecklist;
