import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useEPAGateway, GatewayStatus } from '@/hooks/college/useEPAGateway';
import {
  SectionHeader,
  ListCard,
  Pill,
  EmptyState,
  LoadingState,
  Eyebrow,
  Field,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  inputClass,
  checkboxClass,
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
            <Eyebrow>EPA Gateway Checklist</Eyebrow>
            <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Gateway Progress
            </h3>
            <p className="mt-1 text-[12.5px] text-white">
              {status.studentName} · {status.qualificationTitle}
            </p>
          </div>
          <Pill tone={getReadinessTone(status.readinessStatus)}>
            {getReadinessLabel(status.readinessStatus)}
          </Pill>
        </div>

        <div className="flex items-center justify-between text-[12.5px] mb-2">
          <span className="text-white">Gateway Progress</span>
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
            <Eyebrow>Off-the-Job Training Hours</Eyebrow>
            <h4 className="mt-1 text-lg font-semibold text-white">OJT Progress</h4>
          </div>
          {!readOnly && (
            <SecondaryButton size="sm" onClick={() => setShowOJTSheet(true)}>
              Update hours
            </SecondaryButton>
          )}
        </div>

        <div className="flex items-center justify-between text-[13px] mb-2">
          <span className="text-white tabular-nums">
            {status.ojtHoursCompleted} / {status.ojtHoursRequired} hours
          </span>
          <span className="text-white tabular-nums">{ojtProgress}%</span>
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
        <p className="text-[13px] text-white">All items must be completed before EPA</p>

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
                  className={cn(checkboxClass, 'shrink-0')}
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
                <p className="mt-0.5 text-[12.5px] text-white leading-relaxed">
                  {item.description}
                </p>
              </div>
              {item.completedDate && (
                <div className="text-right shrink-0">
                  <Eyebrow>Completed</Eyebrow>
                  <div className="mt-0.5 text-[12.5px] text-white tabular-nums">
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
            <Eyebrow>End Point Assessment</Eyebrow>
          </div>

          {status.epaBookedDate ? (
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[15px] font-medium text-white">EPA Scheduled</div>
                <div className="mt-1 text-[12.5px] text-white">
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
            <PrimaryButton fullWidth onClick={() => setShowBookEPA(true)}>
              Book EPA
            </PrimaryButton>
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
            <p className="mt-1 text-[12.5px] text-white leading-relaxed">
              Complete all required checklist items before the apprentice can progress to EPA.
            </p>
          </div>
        </div>
      )}

      {/* Update OJT Hours Sheet */}
      <Sheet open={showOJTSheet} onOpenChange={setShowOJTSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          <SheetShell
            eyebrow="OJT Hours"
            title="Update OJT Hours"
            description="Enter the total verified off-the-job training hours"
            footer={
              <>
                <SecondaryButton fullWidth onClick={() => setShowOJTSheet(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton fullWidth onClick={handleOJTUpdate}>
                  Update
                </PrimaryButton>
              </>
            }
          >
            <Field label="Hours Completed">
              <Input
                type="number"
                value={ojtHoursInput}
                onChange={(e) => setOjtHoursInput(e.target.value)}
                placeholder={String(status.ojtHoursCompleted)}
                className={inputClass}
              />
            </Field>
            <p className="text-[12.5px] text-white">
              Required: {status.ojtHoursRequired} hours
            </p>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* Book EPA Sheet */}
      <Sheet open={showBookEPA} onOpenChange={setShowBookEPA}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          <SheetShell
            eyebrow="EPA"
            title="Book End Point Assessment"
            description="Schedule the EPA date for this apprentice"
            footer={
              <>
                <SecondaryButton fullWidth onClick={() => setShowBookEPA(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton fullWidth disabled={!epaDate} onClick={handleBookEPA}>
                  Confirm Booking
                </PrimaryButton>
              </>
            }
          >
            <Field label="EPA Date">
              <Input
                type="date"
                value={epaDate}
                onChange={(e) => setEpaDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={inputClass}
              />
            </Field>
          </SheetShell>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EPAGatewayChecklist;
