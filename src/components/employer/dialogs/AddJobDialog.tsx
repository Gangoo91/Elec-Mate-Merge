import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { JobHoursFields } from '@/components/employer/jobs/JobHoursFields';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateJob } from '@/hooks/useJobs';
import { linkRecordToClient } from '@/services/employerClientService';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import type { Job, JobStatus } from '@/services/jobService';
import { cn } from '@/lib/utils';
import { autoCompleteOff } from '@/lib/textEntry';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import {
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  Eyebrow,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import {
  StepTabs,
  KeepDraftPrompt,
  readDraft,
  writeDraft,
  clearDraft,
  useDraftWriter,
  timeAgoShort,
} from '@/components/employer/dialogs/formSheetKit';
import {
  SiteAccessFields,
  siteAccessToJob,
  type SiteAccessValues,
} from '@/components/employer/jobs/JobSiteAccessFields';

/* ==========================================================================
   New job — an 85vh bottom sheet in three tabbed steps (ELE-1818).

   Sarah in the office, phone in one hand, three steps in: a thumb brushing
   the dark area above the sheet used to throw everything away. Now every
   keystroke is mirrored into a per-user draft, and dismissing a sheet with
   input in it asks "Keep this draft?" — it is never discarded silently.
   Opening the sheet again (from Jobs, a client, or the "Resume draft" chip)
   lands on the same step with the same text.
   ========================================================================== */

const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Pending', label: 'Pending' },
  { value: 'On Hold', label: 'On hold' },
];

export interface NewJobForm {
  title: string;
  client: string;
  location: string;
  status: JobStatus;
  value: string;
  startDate: string;
  endDate: string;
  workersCount: string;
  description: string;
  /** Site access (saved in the draft too): who to ask for, getting in, and
   *  whether the crew may see the customer's number. */
  siteContactName: string;
  siteContactPhone: string;
  accessNotes: string;
  shareClientContact: boolean;
  /** ELE-1824 */
  jobType: string;
  quotedHours: string;
}

const BLANK: NewJobForm = {
  title: '',
  client: '',
  location: '',
  status: 'Active',
  value: '',
  startDate: '',
  endDate: '',
  workersCount: '1',
  description: '',
  siteContactName: '',
  siteContactPhone: '',
  accessNotes: '',
  shareClientContact: true,
  jobType: '',
  quotedHours: '',
};

/** Real input, not just the defaults (or a client name we filled in). */
const hasInput = (f: NewJobForm, prefilledClient?: string) =>
  !!(
    f.title.trim() ||
    (f.client.trim() && f.client.trim() !== (prefilledClient ?? '').trim()) ||
    f.location.trim() ||
    f.value.trim() ||
    f.startDate ||
    f.endDate ||
    f.description.trim() ||
    f.siteContactName.trim() ||
    f.siteContactPhone.trim() ||
    f.accessNotes.trim() ||
    f.shareClientContact === false ||
    (f.workersCount.trim() && f.workersCount.trim() !== '1')
  );

const STEPS = ['Job', 'Site & dates', 'Scope'] as const;

interface AddJobDialogProps {
  /** Legacy prop — the sheet is always opened by its caller now. */
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** When created from a client, pre-fills + auto-links the job to them. */
  prefillClient?: string;
  /** Called with the new job once it is saved (e.g. to open its sheet). */
  onCreated?: (job: Job) => void;
  /**
   * A new firm's first job (ELE-1819): the same three steps, with sensible
   * defaults filled in and a short note on each step saying why it matters.
   * The caller books someone on the job afterwards.
   */
  guided?: boolean;
  /** Starting values for a fresh form (never over a saved draft). */
  defaults?: Partial<NewJobForm>;
}

/* Coach marks for the guided first job: one plain sentence per step. */
const COACH: { title: string; body: string }[] = [
  {
    title: 'Name it the way you would on the phone',
    body: 'The title and client are what your crew sees in Worker Tools, and the client goes into your customer list so quotes and invoices link up.',
  },
  {
    title: 'Where and when',
    body: 'The address gives your crew directions and puts the job on the map. We have pencilled in the next working day; change it if you need to.',
  },
  {
    title: 'What the job is',
    body: 'A line or two is enough. It goes on the job pack and RAMS later, so you only write it once. Next you book someone on it.',
  },
];

export function AddJobDialog({
  open: controlledOpen,
  onOpenChange,
  prefillClient,
  onCreated,
  guided = false,
  defaults,
}: AddJobDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const { user } = useAuth();
  const userId = user?.id ?? null;
  const createJob = useCreateJob();
  // Job value is money: owner and admins only (ELE-1831).
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;

  const [form, setForm] = useState<NewJobForm>(BLANK);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'fwd' | 'back'>('fwd');
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [restoredAt, setRestoredAt] = useState<number | null>(null);
  const [clash, setClash] = useState<{ title: string; client: string } | null>(null);
  const [confirmClose, setConfirmClose] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  // What a fresh form starts as. Prefilled defaults are not "input": closing
  // an untouched guided sheet must not ask to keep a draft.
  const fresh = useMemo<NewJobForm>(
    () => ({ ...BLANK, ...(defaults ?? {}), client: prefillClient ?? defaults?.client ?? '' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefillClient, JSON.stringify(defaults ?? {})]
  );

  const set = useCallback(
    <K extends keyof NewJobForm>(key: K, value: NewJobForm[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  // On open: restore the saved draft (same step, same text). Opened from a
  // client with a draft for someone else → ask, never overwrite silently.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!open) {
      wasOpen.current = false;
      return;
    }
    if (wasOpen.current) return;
    wasOpen.current = true;
    setConfirmClose(false);
    setShowErrors(false);
    const saved = readDraft<NewJobForm>('new-job', userId);
    const savedHasInput = saved ? hasInput({ ...BLANK, ...saved.v }) : false;
    if (saved && savedHasInput) {
      const draftClient = (saved.v.client ?? '').trim();
      if (prefillClient && draftClient && draftClient !== prefillClient.trim()) {
        setClash({ title: saved.v.title || 'Untitled job', client: draftClient });
        setForm({ ...BLANK, client: prefillClient });
        setStep(0);
        setVisited(new Set([0]));
        setRestoredAt(null);
        return;
      }
      setForm({ ...BLANK, ...saved.v, client: saved.v.client || prefillClient || '' });
      const s = Math.min(Math.max(saved.step ?? 0, 0), STEPS.length - 1);
      setStep(s);
      setVisited(new Set(Array.from({ length: s + 1 }, (_, i) => i)));
      setRestoredAt(saved.savedAt);
      setClash(null);
      return;
    }
    setForm(fresh);
    setStep(0);
    setVisited(new Set([0]));
    setRestoredAt(null);
    setClash(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userId, prefillClient]);

  const dirty =
    hasInput(form, prefillClient) && (!guided || JSON.stringify(form) !== JSON.stringify(fresh));
  // While a clash is unresolved, writing would overwrite the other draft.
  const { savedAt, reset: resetSaved } = useDraftWriter(
    'new-job',
    userId,
    form,
    step,
    open && dirty && !clash
  );

  // Voice form registration (unchanged contract).
  const voiceContext = useOptionalVoiceFormContext();
  useEffect(() => {
    if (!open || !voiceContext) return;
    voiceContext.registerForm({
      formId: 'create-job',
      formName: 'Create Job',
      fields: [
        { name: 'title', label: 'Job Title', type: 'text', required: true },
        { name: 'client', label: 'Client', type: 'text', required: true },
        { name: 'location', label: 'Location', type: 'text', required: true },
        { name: 'status', label: 'Status', type: 'text' },
        { name: 'value', label: 'Job Value', type: 'text' },
        { name: 'startDate', label: 'Start Date', type: 'text' },
        { name: 'endDate', label: 'End Date', type: 'text' },
        { name: 'workersCount', label: 'Workers Required', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
      ],
      onFillField: (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
      },
      onSubmit: () => {
        void handleCreate();
      },
      onCancel: () => requestClose(),
    });
    return () => voiceContext.unregisterForm('create-job');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, voiceContext]);

  const datesBackwards = !!(form.startDate && form.endDate && form.endDate < form.startDate);
  const stepDone = useMemo(
    () => [
      !!(form.title.trim() && form.client.trim()),
      !!form.location.trim() && !datesBackwards,
      visited.has(2) && !!(form.description.trim() || form.value.trim()),
    ],
    [form, visited, datesBackwards]
  );
  const firstMissing = !form.title.trim() || !form.client.trim() ? 0 : !form.location.trim() || datesBackwards ? 1 : -1;

  const goTo = (next: number) => {
    if (next === step) return;
    setDirection(next > step ? 'fwd' : 'back');
    setStep(next);
    setVisited((v) => new Set(v).add(next));
    bodyRef.current?.scrollTo({ top: 0 });
  };

  const resetAll = () => {
    setForm(fresh);
    setStep(0);
    setVisited(new Set([0]));
    setRestoredAt(null);
    setShowErrors(false);
    resetSaved();
  };

  const closeNow = (keepDraft = true) => {
    // Flush now: the debounced writer is cancelled the moment the sheet closes,
    // and the last few keystrokes must not be the ones that go missing.
    if (keepDraft && dirty && !clash && userId) writeDraft('new-job', userId, form, step);
    setConfirmClose(false);
    setOpen(false);
  };

  // Every dismissal path (outside tap, Escape, Android back, Cancel) comes
  // through here: a form with input is never thrown away without asking.
  function requestClose() {
    if (dirty && !clash) {
      setConfirmClose(true);
      return;
    }
    closeNow(false);
  }

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setOpen(true);
      return;
    }
    requestClose();
  };

  async function handleCreate() {
    if (firstMissing !== -1) {
      setShowErrors(true);
      goTo(firstMissing);
      toast({
        title: firstMissing === 0 ? 'Add a job title and client' : datesBackwards ? 'Check the dates' : 'Add the site address',
        description:
          firstMissing === 1 && datesBackwards
            ? 'The end date is before the start date.'
            : 'Your draft is saved. Nothing is lost.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const job = await createJob.mutateAsync({
        title: form.title.trim(),
        client: form.client.trim(),
        location: form.location.trim(),
        status: form.status,
        value: form.value ? parseFloat(form.value) || 0 : 0,
        start_date: form.startDate || null,
        end_date: form.endDate || null,
        workers_count: parseInt(form.workersCount) || 1,
        description: form.description.trim() || null,
        job_type: form.jobType || null,
        quoted_hours:
          form.quotedHours.trim() !== '' && Number.isFinite(parseFloat(form.quotedHours))
            ? Math.max(0, parseFloat(form.quotedHours))
            : null,
        client_email: null,
        client_phone: null,
        progress: 0,
        lat: null,
        lng: null,
        ...siteAccessToJob(form),
      });

      // Auto-link into the CRM so the client record builds itself (non-fatal).
      if (job?.id) {
        linkRecordToClient('employer_jobs', job.id, form.client.trim()).catch(() => {});
      }

      toast({ title: 'Job created', description: `${form.title.trim()} is on the board.` });
      clearDraft('new-job', userId);
      resetAll();
      setOpen(false);
      if (job) onCreated?.(job);
    } catch {
      toast({
        title: 'Could not create the job',
        description: 'Your draft is still saved. Check your connection and try again.',
        variant: 'destructive',
      });
    }
  }

  const err = (cond: boolean) => showErrors && cond;
  const stepAnim = direction === 'fwd' ? 'animate-mw-step-in' : 'animate-mw-step-back';
  const draftWord = savedAt
    ? `Draft saved ${timeAgoShort(savedAt)}`
    : restoredAt
      ? `Draft from ${timeAgoShort(restoredAt)}`
      : null;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08] bg-[hsl(0_0%_8%)]"
      >
        <SheetTitle className="sr-only">New job</SheetTitle>
        <div className="relative flex h-full flex-col">
          {/* Header */}
          <div className="flex justify-center pt-2.5 pb-1 shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="shrink-0 border-b border-white/[0.06] px-4 sm:px-5 pb-3">
            <div className="mx-auto w-full max-w-2xl">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Eyebrow>{guided ? `Your first job · step ${step + 1} of 4` : 'New job'}</Eyebrow>
                  <p className="mt-0.5 text-[19px] font-semibold text-white leading-tight truncate">
                    {form.title.trim() || 'Untitled job'}
                  </p>
                </div>
                {draftWord && (
                  <span className="mt-1 shrink-0 text-[11.5px] text-white tabular-nums">{draftWord}</span>
                )}
              </div>
              <div className="mt-3" data-help="jobs.new-steps">
                <StepTabs
                  steps={STEPS.map((label, i) => ({ label, done: stepDone[i] }))}
                  current={step}
                  onSelect={goTo}
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4">
            <div className="mx-auto w-full max-w-2xl space-y-4">
              {clash && (
                <div className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-elec-yellow/40 bg-white/[0.03] p-4 space-y-3">
                  <p className="text-[13.5px] text-white leading-snug">
                    You have an unsaved draft, <span className="font-semibold">{clash.title}</span> for{' '}
                    {clash.client}. Starting a job for {prefillClient} will replace it.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <SecondaryButton
                      fullWidth
                      onClick={() => {
                        const saved = readDraft<NewJobForm>('new-job', userId);
                        if (saved) {
                          setForm({ ...BLANK, ...saved.v });
                          const s = Math.min(Math.max(saved.step ?? 0, 0), STEPS.length - 1);
                          setStep(s);
                          setVisited(new Set(Array.from({ length: s + 1 }, (_, i) => i)));
                          setRestoredAt(saved.savedAt);
                        }
                        setClash(null);
                      }}
                    >
                      Resume draft
                    </SecondaryButton>
                    <PrimaryButton fullWidth onClick={() => setClash(null)}>
                      Start new
                    </PrimaryButton>
                  </div>
                </div>
              )}

              <div key={step} className={cn('space-y-4', stepAnim)}>
                {guided && (
                  <div className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.12] border-l-[3px] border-l-elec-yellow sm:border-l-[3px] sm:border-l-elec-yellow bg-white/[0.03] px-4 py-3.5">
                    <p className="text-[14px] font-semibold text-white">{COACH[step].title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-white">{COACH[step].body}</p>
                  </div>
                )}
                {step === 0 && (
                  <FormCard bleed eyebrow="The job">
                    <Field label="Job title" required>
                      <Input
                        value={form.title}
                        onChange={(e) => set('title', e.target.value)}
                        placeholder="e.g. Full rewire, 14 Orchard Close"
                        className={cn(inputClass, err(!form.title.trim()) && 'border-red-400')}
                        autoComplete={autoCompleteOff}
                        enterKeyHint="next"
                      />
                    </Field>
                    <Field label="Client" required>
                      <Input
                        value={form.client}
                        onChange={(e) => set('client', e.target.value)}
                        placeholder="e.g. Mrs Patel"
                        className={cn(inputClass, err(!form.client.trim()) && 'border-red-400')}
                        autoComplete={autoCompleteOff}
                        enterKeyHint="next"
                      />
                    </Field>
                    <Field label="Status">
                      <div className="grid grid-cols-3 gap-2">
                        {STATUS_OPTIONS.map((o) => (
                          <button
                            key={o.value}
                            type="button"
                            onClick={() => set('status', o.value)}
                            aria-pressed={form.status === o.value}
                            className={cn(
                              'h-11 rounded-full border text-[13px] touch-manipulation transition-colors',
                              form.status === o.value
                                ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                                : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                            )}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </FormCard>
                )}

                {step === 1 && (
                  <FormCard bleed eyebrow="Site & dates">
                    <Field label="Site address" required hint="Used for directions and the live map.">
                      <Input
                        value={form.location}
                        onChange={(e) => set('location', e.target.value)}
                        placeholder="e.g. 14 Orchard Close, Leeds LS6 2AB"
                        className={cn(inputClass, err(!form.location.trim()) && 'border-red-400')}
                        autoComplete={autoCompleteOff}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Start date">
                        <Input
                          type="date"
                          value={form.startDate}
                          onChange={(e) => set('startDate', e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="End date">
                        <Input
                          type="date"
                          value={form.endDate}
                          min={form.startDate || undefined}
                          onChange={(e) => set('endDate', e.target.value)}
                          className={cn(inputClass, datesBackwards && 'border-red-400')}
                        />
                      </Field>
                    </div>
                    {datesBackwards && (
                      <p className="text-[12px] text-red-300">The end date is before the start date.</p>
                    )}
                  </FormCard>
                )}

                {step === 1 && (
                  <FormCard bleed eyebrow="On site">
                    <SiteAccessFields
                      value={form as SiteAccessValues}
                      onChange={(k, v) => set(k, v as NewJobForm[typeof k])}
                    />
                  </FormCard>
                )}

                {step === 2 && (
                  <FormCard bleed eyebrow="Scope & value">
                    <Field label="Scope of work">
                      <Textarea
                        value={form.description}
                        onChange={(e) => set('description', e.target.value)}
                        placeholder="What's being done and anything else the crew should know"
                        rows={5}
                        className={textareaClass}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      {canSeeMoney && (
                        <Field label="Job value (£)">
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={form.value}
                            onChange={(e) => set('value', e.target.value)}
                            placeholder="e.g. 4500"
                            className={inputClass}
                            autoComplete={autoCompleteOff}
                          />
                        </Field>
                      )}
                      <Field label="People needed">
                        <Input
                          type="number"
                          inputMode="numeric"
                          min="1"
                          value={form.workersCount}
                          onChange={(e) => set('workersCount', e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                    <div className="border-t border-white/[0.1] pt-4">
                      <JobHoursFields
                        jobType={form.jobType}
                        onJobTypeChange={(v) => set('jobType', v)}
                        quotedHours={form.quotedHours}
                        onQuotedHoursChange={(v) => set('quotedHours', v)}
                      />
                    </div>
                  </FormCard>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-white/[0.06] px-4 sm:px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto flex w-full max-w-2xl gap-2">
              {step === 0 ? (
                <SecondaryButton fullWidth onClick={requestClose}>
                  Cancel
                </SecondaryButton>
              ) : (
                <SecondaryButton fullWidth onClick={() => goTo(step - 1)}>
                  Back
                </SecondaryButton>
              )}
              {step < STEPS.length - 1 ? (
                <PrimaryButton fullWidth onClick={() => goTo(step + 1)}>
                  Next
                </PrimaryButton>
              ) : (
                <PrimaryButton fullWidth onClick={() => void handleCreate()} disabled={createJob.isPending}>
                  {createJob.isPending ? 'Creating…' : guided ? 'Create and book' : 'Create job'}
                </PrimaryButton>
              )}
            </div>
          </div>

          <KeepDraftPrompt
            open={confirmClose}
            what={form.title.trim() ? `“${form.title.trim()}”` : 'a new job'}
            onKeep={() => closeNow(true)}
            onCancel={() => setConfirmClose(false)}
            onDiscard={() => {
              clearDraft('new-job', userId);
              resetAll();
              closeNow(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
