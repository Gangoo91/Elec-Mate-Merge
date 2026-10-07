import { useState, useCallback } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useCollegeEPA, useUpdateEPA, useUpdateEPAStatus } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import type { EPAStatus } from '@/services/college';
import { LoadingState, SuccessCheckmark } from '@/components/college/primitives';

interface EPADetailSheetProps {
  epaId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EPA_STEPS: { status: EPAStatus; label: string }[] = [
  { status: 'Not Started', label: 'Not Started' },
  { status: 'In Progress', label: 'In Progress' },
  { status: 'Pre-Gateway', label: 'Pre-Gateway' },
  { status: 'Gateway Ready', label: 'Gateway Ready' },
  { status: 'Complete', label: 'Complete' },
];

const STATUS_ORDER: Record<EPAStatus, number> = {
  'Not Started': 0,
  'In Progress': 1,
  'Pre-Gateway': 2,
  'Gateway Ready': 3,
  Complete: 4,
};

export function EPADetailSheet({ epaId, open, onOpenChange }: EPADetailSheetProps) {
  const { data: epa, isLoading } = useCollegeEPA(epaId!);
  const { data: students } = useCollegeStudents();
  const updateEPA = useUpdateEPA();
  const updateEPAStatus = useUpdateEPAStatus();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editStatus, setEditStatus] = useState<EPAStatus | null>(null);
  const [editGatewayDate, setEditGatewayDate] = useState('');
  const [editEpaDate, setEditEpaDate] = useState('');

  const [notesText, setNotesText] = useState('');
  const [notesInitialised, setNotesInitialised] = useState(false);

  const studentName = students?.find((s) => s.id === epa?.student_id)?.name ?? 'Unknown Student';

  if (epa && !notesInitialised) {
    setNotesText(epa.notes ?? '');
    setEditStatus(epa.status ?? 'Not Started');
    setEditGatewayDate(epa.gateway_date ?? '');
    setEditEpaDate(epa.epa_date ?? '');
    setNotesInitialised(true);
  }

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!value) {
        setNotesInitialised(false);
        setShowSuccess(false);
      }
      onOpenChange(value);
    },
    [onOpenChange]
  );

  const handleStatusUpdate = async (newStatus: EPAStatus) => {
    if (!epa) return;
    setIsSaving(true);
    try {
      await updateEPAStatus.mutateAsync({
        id: epa.id,
        status: newStatus,
        updatedBy: epa.updated_by ?? 'staff',
      });
      setEditStatus(newStatus);
      triggerSuccess();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 700);
      toast({ title: 'Status updated', description: `EPA status → ${newStatus}` });
    } catch {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDetailsSave = async () => {
    if (!epa) return;
    setIsSaving(true);
    try {
      await updateEPA.mutateAsync({
        id: epa.id,
        updates: { gateway_date: editGatewayDate || null, epa_date: editEpaDate || null },
      });
      triggerSuccess();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 700);
      toast({ title: 'Details saved', description: 'EPA details have been updated' });
    } catch {
      toast({ title: 'Error', description: 'Failed to save details', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotesSave = async () => {
    if (!epa) return;
    setIsSaving(true);
    try {
      await updateEPA.mutateAsync({ id: epa.id, updates: { notes: notesText } });
      triggerSuccess();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 700);
      toast({ title: 'Notes saved', description: 'EPA notes have been updated' });
    } catch {
      toast({ title: 'Error', description: 'Failed to save notes', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const currentStatusIndex = STATUS_ORDER[epa?.status ?? 'Not Started'];

  if (!epaId) return null;

  const nextStep = EPA_STEPS[(STATUS_ORDER[epa?.status ?? 'Not Started'] ?? 0) + 1];
  const sectionTitleCn = 'text-[15px] font-semibold text-white';

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={handleOpenChange}
        width="wide"
        eyebrow="End-point assessment"
        title={isLoading ? 'Loading…' : studentName}
        description={
          epa
            ? `Stage: ${epa.status ?? 'Not Started'}${epa.result ? ` · Result: ${epa.result}` : ''}`
            : undefined
        }
        bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-2"
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className={buttonSecondaryCn}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                if (epa?.status) {
                  const nextIndex = STATUS_ORDER[epa.status] + 1;
                  const step = EPA_STEPS[nextIndex];
                  if (step) handleStatusUpdate(step.status);
                }
              }}
              disabled={isSaving || !epa || epa.status === 'Complete'}
              className={buttonPrimaryCn}
            >
              {isSaving
                ? 'Saving…'
                : epa?.status === 'Complete'
                  ? 'EPA complete'
                  : `Move to ${nextStep?.label ?? 'next'}`}
            </button>
          </div>
        }
      >
        {isLoading && <LoadingState className="lg:col-span-2" />}
        {!isLoading && epa && (
          <>
            {/* Left: where they are, and moving them on */}
            <div className="space-y-8">
              <section>
                <h3 className={sectionTitleCn}>EPA journey</h3>
                <ol className="relative mt-4 space-y-5 pl-6 before:absolute before:bottom-1 before:left-[5px] before:top-1 before:w-px before:bg-white/[0.1] before:content-['']">
                  {EPA_STEPS.map((step, index) => {
                    const isCompleted = index < currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    let dateLabel: string | null = null;
                    if (step.status === 'Not Started' && epa?.created_at)
                      dateLabel = formatUKDateShort(epa.created_at);
                    if (step.status === 'Gateway Ready' && epa?.gateway_date)
                      dateLabel = formatUKDateShort(epa.gateway_date);
                    if (step.status === 'Complete' && epa?.epa_date)
                      dateLabel = formatUKDateShort(epa.epa_date);

                    return (
                      <li key={step.status} className="relative">
                        <div
                          className={cn(
                            'absolute -left-6 top-1 h-2.5 w-2.5 rounded-full',
                            isCompleted && 'bg-emerald-400',
                            isCurrent && 'bg-elec-yellow ring-4 ring-elec-yellow/20',
                            !isCompleted && !isCurrent && 'bg-white/20'
                          )}
                        />
                        <div className="flex items-baseline justify-between gap-3">
                          <div
                            className={cn(
                              'text-[14px] font-medium',
                              isCompleted ? 'text-emerald-400' : 'text-white',
                              isCurrent && 'font-semibold'
                            )}
                          >
                            {step.label}
                            {isCurrent && (
                              <span className="ml-2 text-[12px] font-medium text-elec-yellow">
                                Current stage
                              </span>
                            )}
                          </div>
                          {dateLabel && (
                            <span className="text-[12px] tabular-nums text-white">{dateLabel}</span>
                          )}
                        </div>
                        {step.status === 'Complete' && epa?.result && isCompleted && (
                          <div className="mt-1 text-[13px] font-medium text-emerald-400">
                            Result: {epa.result}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </section>

              <section className="border-t border-white/[0.08] pt-6">
                <p className={labelCn} id="epa-status-label">
                  Set the stage
                </p>
                <p className="mb-2.5 text-[12px] text-white">Saves as soon as you tap.</p>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="epa-status-label">
                  {EPA_STEPS.map((s) => {
                    const on = (editStatus ?? 'Not Started') === s.status;
                    return (
                      <button
                        key={s.status}
                        type="button"
                        aria-pressed={on}
                        disabled={isSaving}
                        onClick={() => {
                          if (!on) handleStatusUpdate(s.status);
                        }}
                        className={cn(chipCn(on), 'h-10 disabled:opacity-60')}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="border-t border-white/[0.08] pt-6">
                <h3 className={sectionTitleCn}>Record</h3>
                <dl className="mt-2 divide-y divide-white/[0.06] text-[13px]">
                  {(
                    [
                      ['Updated by', epa?.updated_by ?? '—'],
                      ['Updated', formatUKDateShort(epa?.updated_at)],
                      ['Created', formatUKDateShort(epa?.created_at)],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-2">
                      <dt className="text-white">{k}</dt>
                      <dd className="min-w-0 truncate text-right font-medium tabular-nums text-white">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            {/* Right: dates and notes */}
            <div className="space-y-8 border-t border-white/[0.08] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <section className="space-y-4">
                <h3 className={sectionTitleCn}>Key dates</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className={labelCn} htmlFor="epa-gateway-date">
                      Gateway date
                    </label>
                    <input
                      id="epa-gateway-date"
                      type="date"
                      value={editGatewayDate}
                      onChange={(e) => setEditGatewayDate(e.target.value)}
                      className={`${inputCn} tabular-nums`}
                    />
                  </div>
                  <div>
                    <label className={labelCn} htmlFor="epa-date">
                      EPA date
                    </label>
                    <input
                      id="epa-date"
                      type="date"
                      value={editEpaDate}
                      onChange={(e) => setEditEpaDate(e.target.value)}
                      className={`${inputCn} tabular-nums`}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDetailsSave}
                  disabled={isSaving}
                  className={cn(buttonSecondaryCn, 'h-11 px-5')}
                >
                  {isSaving ? 'Saving…' : 'Save dates'}
                </button>
              </section>

              <section className="space-y-4 border-t border-white/[0.08] pt-6">
                <h3 className={sectionTitleCn}>Notes</h3>
                {epa?.notes && (
                  <div className="border-l-2 border-white/[0.15] pl-3">
                    <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-white">
                      {epa.notes}
                    </p>
                    <p className="mt-1.5 text-[12px] tabular-nums text-white">
                      Last updated {formatUKDateShort(epa.updated_at)}
                    </p>
                  </div>
                )}
                <div>
                  <label className={labelCn} htmlFor="epa-notes">
                    {epa?.notes ? 'Update notes' : 'Add notes'}
                  </label>
                  <textarea
                    id="epa-notes"
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    placeholder="EPA notes, observations or follow-up actions"
                    className={`${textareaCn} min-h-[140px]`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNotesSave}
                  disabled={isSaving}
                  className={cn(buttonSecondaryCn, 'h-11 px-5')}
                >
                  {isSaving ? 'Saving…' : 'Save notes'}
                </button>
              </section>
            </div>
          </>
        )}
      </FormSheet>
      <SuccessCheckmark show={showSuccess} />
    </>
  );
}
