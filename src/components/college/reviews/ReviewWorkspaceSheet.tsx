import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  cardCn,
  chipBase,
  chipOff,
  grid2Cn,
  fieldFullCn,
  infoPanelCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { otjActivityLabel } from '@/data/otjActivityTypes';
import {
  ATTENDANCE_LABEL,
  MODE_LABEL,
  OWNER_LABEL,
  PLAN_CHANGE_LABEL,
  PLAN_CHANGE_NEEDS_EMPLOYER,
  addReviewAction,
  checkEarlierAction,
  deleteReview,
  emailEmployer,
  ensureLearnerEmployer,
  fetchReview,
  fetchReviewActions,
  fetchReviewPrefill,
  fmtReviewDate,
  getEmployerReviewLink,
  londonDate,
  londonToday,
  logEmployerContact,
  fetchCollegeEmployers,
  linkLearnerEmployer,
  recordPaperLearnerSignature,
  setEmployerEmail,
  removeReviewAction,
  scheduleReview,
  signOffReview,
  updateReview,
  type ActionOwner,
  type ActionStatus,
  type EmployerAttendance,
  type PlanChange,
  type ReviewAction,
  type ReviewMode,
  type ReviewOutcomes,
  type ReviewPrefill,
  type TripartiteReview,
} from '@/hooks/useTripartiteReviews';
import { Chips, InputView, SectionTitle, SignatureLine, Stat, fmtHours } from './reviewUi';
import { ReviewAiDraftPanel, SummaryProvenance } from './ReviewAiDraftPanel';
import { UsesAi } from '@/components/college/ui/UsesAi';

/* ==========================================================================
   ReviewWorkspaceSheet — one tripartite progress review, start to finish.

   Funding rules 2025/26, paras 97–98. The steps follow para 98 in order:
     Prepare        who, when, how; the employer's link and both parties' views
     Since last     98.1 earlier actions + training delivered, 98.2 evidence
     Progress       98.3 progress against the plan, off-the-job slippage
     Plan & support 98.4 plan changes (98.4.1 employer re-sign), 98.5 concerns,
                    40.5 learning support (with consent), wellbeing, safeguarding
     Actions        98.6 agreed actions for the next review
     Sign off       attendance (97.2.1), summary (97.2.2), freeze + sign

   Everything the record already knows is pre-filled (get_tripartite_prefill).
   Outcomes save as you type. Once signed off the review is read-only.
   ========================================================================== */

type Step = 'prepare' | 'since' | 'progress' | 'plan' | 'actions' | 'signoff';
const STEPS: Array<{ key: Step; label: string }> = [
  { key: 'prepare', label: 'Prepare' },
  { key: 'since', label: 'Since last' },
  { key: 'progress', label: 'Progress' },
  { key: 'plan', label: 'Plan & support' },
  { key: 'actions', label: 'Actions' },
  { key: 'signoff', label: 'Sign off' },
];

const MODE_OPTIONS = (Object.keys(MODE_LABEL) as ReviewMode[]).map((v) => ({
  value: v,
  label: MODE_LABEL[v],
}));
const OWNER_OPTIONS = (Object.keys(OWNER_LABEL) as ActionOwner[]).map((v) => ({
  value: v,
  label: OWNER_LABEL[v],
}));
const ATTENDANCE_OPTIONS = (Object.keys(ATTENDANCE_LABEL) as EmployerAttendance[]).map((v) => ({
  value: v,
  label: ATTENDANCE_LABEL[v],
}));
const PLAN_OPTIONS = (Object.keys(PLAN_CHANGE_LABEL) as PlanChange[]).map((v) => ({
  value: v,
  label: PLAN_CHANGE_LABEL[v],
}));
const CHECK_OPTIONS: Array<{ value: ActionStatus; label: string }> = [
  { value: 'done', label: 'Done' },
  { value: 'not_done', label: 'Not done' },
  { value: 'dropped', label: 'No longer needed' },
];

const neutralCn =
  'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.10] disabled:opacity-60';

const toLocalInput = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};
const todayIso = londonToday;

export function ReviewWorkspaceSheet({
  open,
  onOpenChange,
  reviewId,
  studentId,
  studentName,
  collegeId,
  onChanged,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** null = schedule a new review for this learner */
  reviewId: string | null;
  studentId: string;
  studentName: string;
  collegeId: string;
  onChanged?: () => void;
}) {
  const { toast } = useToast();
  const [id, setId] = useState<string | null>(reviewId);
  const [review, setReview] = useState<TripartiteReview | null>(null);
  const [prefill, setPrefill] = useState<ReviewPrefill | null>(null);
  const [actions, setActions] = useState<ReviewAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>('prepare');
  const [dir, setDir] = useState<1 | -1>(1);
  const [outcomes, setOutcomes] = useState<ReviewOutcomes>({});
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveTimer = useRef<number | null>(null);
  // The latest outcomes and the review they belong to, for the autosave.
  const latest = useRef<{ id: string | null; outcomes: ReviewOutcomes }>({
    id: null,
    outcomes: {},
  });
  const pending = useRef(false);
  const currentId = useRef<string | null>(reviewId);

  useEffect(() => {
    if (open) {
      setId(reviewId);
      setStep('prepare');
    }
  }, [open, reviewId]);

  // A different review: start clean, never show (or save) one learner's notes
  // under another's review.
  useEffect(() => {
    currentId.current = id;
    setReview(null);
    setPrefill(null);
    setActions([]);
    setOutcomes({});
    latest.current = { id, outcomes: {} };
  }, [id]);

  const load = useCallback(async () => {
    if (!id) {
      setReview(null);
      return;
    }
    const forId = id;
    setLoading(true);
    try {
      const [r, p, a] = await Promise.all([
        fetchReview(forId),
        fetchReviewPrefill(forId),
        fetchReviewActions(forId),
      ]);
      if (currentId.current !== forId) return; // a later review was opened meanwhile
      setReview(r);
      setPrefill(r?.snapshot?.prefill ?? p);
      setActions(a);
      // Keep what the tutor is typing if it has not saved yet.
      if (!pending.current) {
        setOutcomes(r?.outcomes ?? {});
        latest.current = { id: forId, outcomes: r?.outcomes ?? {} };
      }
    } catch (e) {
      if (currentId.current === forId) {
        toast({
          title: 'Could not open the review',
          description: (e as Error).message,
          variant: 'destructive',
        });
      }
    } finally {
      if (currentId.current === forId) setLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  // Outcomes autosave — a review is written during a conversation.
  const saveNow = useCallback(async () => {
    if (saveTimer.current) {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    if (!pending.current || !latest.current.id) return;
    const { id: forId, outcomes: o } = latest.current;
    try {
      await updateReview(forId as string, { outcomes: o });
      if (latest.current.outcomes === o) pending.current = false;
      setSaveState('saved');
    } catch (e) {
      setSaveState('idle');
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
      throw e;
    }
  }, [toast]);

  const patchOutcomes = (patch: Partial<ReviewOutcomes>) => {
    setOutcomes((prev) => {
      const next = { ...prev, ...patch };
      latest.current = { id, outcomes: next };
      pending.current = true;
      setSaveState('saving');
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => void saveNow().catch(() => undefined), 700);
      return next;
    });
  };
  // Closing the sheet saves what was typed rather than dropping it.
  useEffect(
    () => () => {
      void saveNow().catch(() => undefined);
    },
    [saveNow]
  );

  const goto = (s: Step) => {
    const from = STEPS.findIndex((x) => x.key === step);
    const to = STEPS.findIndex((x) => x.key === s);
    setDir(to >= from ? 1 : -1);
    setStep(s);
  };
  const stepIndex = STEPS.findIndex((x) => x.key === step);

  const locked = !!review?.locked_at;
  const changed = () => {
    void load();
    onChanged?.();
  };

  /* ── New review: schedule ─────────────────────────────────────────────── */
  if (open && !id) {
    return (
      <ScheduleSheet
        open={open}
        onOpenChange={onOpenChange}
        studentId={studentId}
        studentName={studentName}
        collegeId={collegeId}
        onScheduled={(newId) => {
          setId(newId);
          onChanged?.();
        }}
      />
    );
  }

  const title = review
    ? locked
      ? `Review held ${fmtReviewDate(review.held_on)}`
      : review.scheduled_at
        ? `Review ${fmtReviewDate(review.scheduled_at, true)}`
        : 'Progress review'
    : 'Progress review';

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={`Progress review · ${studentName}`}
      title={title}
      headerTrailing={
        !locked && saveState !== 'idle' ? (
          <span className="text-[12px] font-medium text-white">
            {saveState === 'saving' ? 'Saving…' : 'Saved'}
          </span>
        ) : undefined
      }
      subheader={
        review && !locked ? (
          // Quiet text tabs with a yellow underline (10 Oct 2026), 48px tall.
          <div
            role="group"
            aria-label="Review steps"
            className="-mx-1 flex overflow-x-auto border-b border-white/[0.08] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {STEPS.map((s, i) => {
              const on = s.key === step;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => goto(s.key)}
                  aria-current={on}
                  className={cn(
                    'relative inline-flex h-12 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-[13.5px] text-white touch-manipulation transition-colors active:bg-white/[0.04]',
                    on ? 'font-semibold' : 'font-medium hover:text-elec-yellow'
                  )}
                >
                  <span className="tabular-nums">{i + 1}</span> {s.label}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-x-3 bottom-0 h-[2px] rounded-full',
                      on ? 'bg-elec-yellow' : 'bg-transparent'
                    )}
                  />
                </button>
              );
            })}
          </div>
        ) : undefined
      }
      footer={
        review && !locked ? (
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              className={buttonSecondaryCn}
              onClick={() =>
                stepIndex === 0 ? onOpenChange(false) : goto(STEPS[stepIndex - 1].key)
              }
            >
              {stepIndex === 0 ? 'Close' : 'Back'}
            </button>
            {stepIndex < STEPS.length - 1 ? (
              <button
                type="button"
                className={buttonPrimaryCn}
                onClick={() => goto(STEPS[stepIndex + 1].key)}
              >
                Next: {STEPS[stepIndex + 1].label}
              </button>
            ) : (
              <span />
            )}
          </div>
        ) : review && locked ? (
          <ReviewPdfButton reviewId={review.id} />
        ) : undefined
      }
    >
      {loading || !review || !prefill ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        </div>
      ) : locked ? (
        <div className="grid items-start gap-5 lg:grid-cols-2">
          <ReviewRecord review={review} prefill={prefill} actions={actions} onChanged={changed} />
        </div>
      ) : (
        <div
          key={step}
          className={cn(
            'grid items-start gap-5 lg:grid-cols-2',
            dir === 1 ? 'animate-mw-step-in' : 'animate-mw-step-back'
          )}
        >
          {step === 'prepare' && (
            <PrepareStep
              review={review}
              prefill={prefill}
              studentName={studentName}
              onChanged={changed}
            />
          )}
          {step === 'since' && (
            <SinceStep
              review={review}
              prefill={prefill}
              outcomes={outcomes}
              patch={patchOutcomes}
              onChanged={changed}
            />
          )}
          {step === 'progress' && (
            <ProgressStep prefill={prefill} outcomes={outcomes} patch={patchOutcomes} />
          )}
          {step === 'plan' && (
            <PlanStep prefill={prefill} outcomes={outcomes} patch={patchOutcomes} />
          )}
          {step === 'actions' && (
            <ActionsStep
              review={review}
              actions={actions}
              outcomes={outcomes}
              patch={patchOutcomes}
              flush={saveNow}
              onChanged={changed}
            />
          )}
          {step === 'signoff' && (
            <SignOffStep
              review={review}
              prefill={prefill}
              actions={actions}
              outcomes={outcomes}
              patch={patchOutcomes}
              studentName={studentName}
              goto={goto}
              flush={saveNow}
              onChanged={changed}
              onDeleted={() => {
                onChanged?.();
                onOpenChange(false);
              }}
            />
          )}
        </div>
      )}
    </FormSheet>
  );
}

/** The employer's review link, fetched ahead of the tap that uses it. */
function useEmployerLink(reviewId: string) {
  const [link, setLink] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    getEmployerReviewLink(reviewId)
      .then((l) => live && setLink(l))
      .catch(() => live && setLink(null));
    return () => {
      live = false;
    };
  }, [reviewId]);
  return link;
}

/* ── Schedule ───────────────────────────────────────────────────────────── */

function ScheduleSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  collegeId,
  onScheduled,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentId: string;
  studentName: string;
  collegeId: string;
  onScheduled: (id: string) => void;
}) {
  const { toast } = useToast();
  const [day, setDay] = useState('');
  const [time, setTime] = useState('10:00');
  const [mode, setMode] = useState<ReviewMode>('in_person');
  const [place, setPlace] = useState('');
  const [employer, setEmployer] = useState<{
    id: string;
    company_name: string;
    contact_name: string | null;
    contact_email: string | null;
  } | null>(null);
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [dueBy, setDueBy] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [known, setKnown] = useState<
    Array<{
      id: string;
      company_name: string;
      contact_name: string | null;
      contact_email: string | null;
    }>
  >([]);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Every field starts fresh for this learner: nothing carries over from
    // the last booking (a new employer typed for one learner used to pre-fill
    // the next), and a slow load for an earlier learner is ignored.
    let live = true;
    {
      const d = new Date();
      do d.setDate(d.getDate() + 1);
      while (d.getDay() === 0 || d.getDay() === 6);
      setDay(d.toLocaleDateString('en-CA'));
    }
    setTime('10:00');
    setMode('in_person');
    setPlace('');
    setPickedId(null);
    setAddingNew(false);
    setCompany('');
    setContact('');
    setEmail('');
    setEmployer(null);
    setDueBy(null);
    setKnown([]);
    void (async () => {
      const { data: s } = await supabase
        .from('college_students')
        .select('employer_id')
        .eq('id', studentId)
        .maybeSingle();
      if (!live) return;
      const empId = (s as { employer_id: string | null } | null)?.employer_id;
      if (empId) {
        const { data: e } = await supabase
          .from('college_employers')
          .select('id, company_name, contact_name, contact_email')
          .eq('id', empId)
          .maybeSingle();
        if (!live) return;
        setEmployer((e as never) ?? null);
      }
      const { data: due } = await supabase.rpc(
        'tripartite_due_by' as never,
        { p_student: studentId } as never
      );
      if (!live) return;
      setDueBy((due as unknown as string) ?? null);
      if (!empId) {
        const list = await fetchCollegeEmployers(collegeId).catch(() => []);
        if (!live) return;
        setKnown(list);
        setAddingNew(list.length === 0);
      }
    })();
    return () => {
      live = false;
    };
  }, [open, studentId, collegeId]);

  // Three working weeks from this Monday, so the due date can be seen
  // against the days on offer. Past days stay visible but can't be picked.
  const weeks = useMemo(() => {
    const start = new Date();
    start.setHours(12, 0, 0, 0);
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    const out: Array<Array<{ iso: string; wd: string; dayNum: string; month: string }>> = [];
    for (let w = 0; w < 3; w++) {
      const row = [];
      for (let i = 0; i < 5; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + w * 7 + i);
        row.push({
          iso: d.toLocaleDateString('en-CA'),
          wd: d.toLocaleDateString('en-GB', { weekday: 'short' }),
          dayNum: String(d.getDate()),
          month: d.toLocaleDateString('en-GB', { month: 'short' }),
        });
      }
      out.push(row);
    }
    return out;
  }, []);
  const TIMES = ['08:30', '09:30', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  const when = day && time ? `${day}T${time}` : '';
  const today = todayIso();
  const overdue = !!dueBy && dueBy < today;
  const afterDue = !!dueBy && !!day && day > dueBy;
  const needEmployer = !employer;
  const picked = known.find((k) => k.id === pickedId) ?? null;
  const urlOk = mode !== 'video' || !place.trim() || /^https:\/\//i.test(place.trim());
  const newOk = company.trim().length >= 2 && /\S+@\S+\.\S+/.test(email.trim());
  const pastTime =
    day === today &&
    time <=
      new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/London',
      });
  const valid = !!when && !pastTime && urlOk && (!needEmployer || !!picked || (addingNew && newOk));

  const save = async () => {
    if (!valid || saving) return;
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const { data: st } = await supabase
        .from('college_staff')
        .select('id')
        .eq('user_id', u.user?.id ?? '')
        .eq('college_id', collegeId)
        .is('archived_at', null)
        .maybeSingle();
      let empId = employer?.id ?? null;
      let contactName = employer?.contact_name ?? null;
      let contactEmail = employer?.contact_email ?? null;
      if (needEmployer && picked) {
        await linkLearnerEmployer(studentId, picked.id);
        empId = picked.id;
        contactName = picked.contact_name;
        contactEmail = picked.contact_email;
      } else if (needEmployer) {
        empId = await ensureLearnerEmployer(collegeId, studentId, company, contact, email);
        contactName = contact.trim() || null;
        contactEmail = email.trim();
      }
      const newId = await scheduleReview({
        college_id: collegeId,
        student_id: studentId,
        tutor_staff_id: (st as { id: string } | null)?.id ?? null,
        employer_id: empId,
        employer_contact_name: contactName,
        employer_contact_email: contactEmail,
        scheduled_at: new Date(when).toISOString(),
        mode,
        location: mode === 'video' ? null : place.trim() || null,
        meeting_url: mode === 'video' ? place.trim() || null : null,
      });
      toast({
        title: 'Review booked',
        description: `${studentName} has been told. Next, send the employer their link.`,
      });
      onScheduled(newId);
    } catch (e) {
      toast({ title: 'Not booked', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const panel =
    'rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:p-6';
  const chosen = employer ?? picked;
  const first = studentName.split(' ')[0];
  const nowHm = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/London',
  });
  const inGrid = weeks.some((w) => w.some((d) => d.iso === day));
  const dayLong = day
    ? new Date(`${day}T12:00`).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : null;
  const WEEK_LABEL = ['This week', 'Next week', 'Week after'];
  const MODE_HINT: Record<ReviewMode, string> = {
    in_person: 'At the workplace or college',
    video: 'Teams, Zoom or Meet',
    phone: 'A three-way call',
    email: 'Each adds their view in writing',
  };
  const missing = !day
    ? 'Pick a day'
    : !time
      ? 'Pick a time'
      : day === today && time <= nowHm
        ? 'Pick a later time'
        : !urlOk
          ? 'Fix the meeting link'
          : needEmployer && !picked && !(addingNew && newOk)
            ? 'Add the employer'
            : null;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="space-y-5"
      eyebrow={`Progress review · ${studentName}`}
      title="Book a progress review"
      description="Three-way: you, the apprentice and their employer, at least every 3 calendar months."
      footerClassName="lg:hidden"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!valid || saving}
            className={buttonPrimaryCn}
          >
            {saving ? 'Booking…' : (missing ?? 'Book review')}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        {/* ── Left: the choices, in order ── */}
        <div className="space-y-5">
          <section className={panel}>
            <StepHead
              n={1}
              title="Pick a day"
              aside={
                dueBy ? (
                  <span
                    className={cn(
                      'text-[12.5px] font-semibold',
                      overdue ? 'text-orange-300 lg:hidden' : 'text-white'
                    )}
                  >
                    {overdue
                      ? `Overdue since ${fmtReviewDate(dueBy)}`
                      : `Due by ${fmtReviewDate(dueBy)}`}
                  </span>
                ) : null
              }
            />
            <div className="mt-4 space-y-3">
              {weeks.map((row, wi) => (
                <div key={wi}>
                  <p className="mb-1.5 text-[12px] font-medium text-white">{WEEK_LABEL[wi]}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {row.map((d) => {
                      const past = d.iso < today;
                      const on = day === d.iso;
                      const isDue = d.iso === dueBy;
                      const late = !!dueBy && d.iso > dueBy && !past;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          disabled={past}
                          aria-pressed={on}
                          onClick={() => setDay(d.iso)}
                          className={cn(
                            'relative flex h-16 flex-col items-center justify-center rounded-2xl border text-center touch-manipulation transition-colors',
                            on
                              ? 'border-white bg-white text-black'
                              : past
                                ? 'border-transparent text-white opacity-30'
                                : 'border-white/[0.12] bg-white/[0.03] text-white hover:border-white/[0.3]',
                            isDue && !on && 'border-orange-400/70'
                          )}
                        >
                          <span className="text-[12px] font-semibold">{d.wd}</span>
                          <span className="text-[19px] font-bold leading-tight tabular-nums">
                            {d.dayNum}
                          </span>
                          <span className="text-[12px]">{isDue ? 'Due' : d.month}</span>
                          {late && !on && !overdue && (
                            <span
                              aria-hidden
                              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-400"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4">
              <div className="min-w-[180px] flex-1">
                <label className={labelCn} htmlFor="rv-day">
                  A later date
                </label>
                <input
                  id="rv-day"
                  type="date"
                  min={today}
                  value={inGrid ? '' : day}
                  onChange={(e) => setDay(e.target.value)}
                  className={inputCn}
                />
              </div>
              {afterDue && !overdue && (
                <p className="pb-3 text-[12.5px] text-orange-300">
                  After the due date of {fmtReviewDate(dueBy)}
                </p>
              )}
            </div>
          </section>

          <section className={panel}>
            <StepHead n={2} title="Pick a time" />
            <div className="mt-4 grid grid-cols-4 gap-2">
              {TIMES.map((t) => {
                const gone = day === today && t <= nowHm;
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={gone}
                    aria-pressed={time === t}
                    onClick={() => setTime(t)}
                    className={cn(
                      chipBase,
                      'px-1 text-[13.5px] tabular-nums disabled:opacity-30',
                      time === t ? 'border-white bg-white font-semibold text-black' : chipOff
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 max-w-[220px]">
              <label className={labelCn} htmlFor="rv-time">
                Another time
              </label>
              <input
                id="rv-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputCn}
              />
            </div>
          </section>

          <section className={panel}>
            <StepHead n={3} title="How you'll meet" />
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {MODE_OPTIONS.map((m) => {
                const on = mode === m.value;
                return (
                  <button
                    key={m.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setMode(m.value)}
                    className={cn(
                      'flex min-h-[72px] flex-col justify-center rounded-2xl border px-3.5 py-3 text-left touch-manipulation transition-colors',
                      on
                        ? 'border-white bg-white text-black'
                        : 'border-white/[0.12] bg-white/[0.03] text-white hover:border-white/[0.3]'
                    )}
                  >
                    <span className="text-[14px] font-semibold">{m.label}</span>
                    <span className="mt-0.5 text-[12px] leading-snug">{MODE_HINT[m.value]}</span>
                  </button>
                );
              })}
            </div>
            {(mode === 'in_person' || mode === 'video') && (
              <div className="mt-5">
                <label className={labelCn} htmlFor="rv-place">
                  {mode === 'video' ? 'Meeting link' : 'Where'}
                </label>
                <input
                  id="rv-place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder={
                    mode === 'video'
                      ? 'https://… Teams or Zoom link'
                      : 'The workplace, college or site'
                  }
                  className={inputCn}
                />
                {!urlOk && (
                  <p className="mt-2 text-[13px] text-orange-300">
                    Paste the full link, starting https://
                  </p>
                )}
              </div>
            )}
            {mode === 'email' && (
              <p className="mt-4 text-[13px] leading-relaxed text-white">
                The funding rules allow a review by email. Each of you adds your view, then you
                write it up and everyone signs.
              </p>
            )}
          </section>

          {!employer && (
            <section className={panel}>
              <StepHead
                n={4}
                title="Employer"
                aside={<span className="text-[12px] font-medium text-white">Para 97.2</span>}
              />
              {picked ? (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-elec-yellow/60 bg-background p-4">
                  <span className="min-w-0">
                    <span className="block break-words text-[15px] font-semibold text-white">
                      {picked.company_name}
                    </span>
                    <span className="block text-[12.5px] text-white [overflow-wrap:anywhere]">
                      {[picked.contact_name, picked.contact_email].filter(Boolean).join(' · ') ||
                        'No contact recorded yet'}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setPickedId(null)}
                    className="h-11 shrink-0 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <>
                  <p className="mt-2 text-[13px] leading-relaxed text-white">
                    No employer is recorded for {first} yet. Add them once and every review after
                    this uses it.
                  </p>
                  {known.length > 0 && !addingNew && (
                    <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {known.slice(0, 8).map((k) => (
                        <li key={k.id}>
                          <button
                            type="button"
                            onClick={() => setPickedId(k.id)}
                            className="flex min-h-[60px] w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 text-left touch-manipulation hover:border-white/[0.3]"
                          >
                            <span className="min-w-0">
                              <span className="block break-words text-[14px] font-semibold text-white">
                                {k.company_name}
                              </span>
                              <span className="block text-[12.5px] text-white [overflow-wrap:anywhere]">
                                {k.contact_email ?? 'No email yet'}
                              </span>
                            </span>
                            <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">
                              Use
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {addingNew ? (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className={labelCn} htmlFor="rv-co">
                          Company
                        </label>
                        <input
                          id="rv-co"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className={inputCn}
                          autoComplete="organization"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                        <div>
                          <label className={labelCn} htmlFor="rv-cn">
                            Contact name
                          </label>
                          <input
                            id="rv-cn"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className={inputCn}
                          />
                        </div>
                        <div>
                          <label className={labelCn} htmlFor="rv-ce">
                            Contact email
                          </label>
                          <input
                            id="rv-ce"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputCn}
                          />
                        </div>
                      </div>
                      {known.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setAddingNew(false)}
                          className="h-11 text-[13px] font-semibold text-elec-yellow"
                        >
                          Pick an existing employer instead
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAddingNew(true)}
                      className="mt-3 h-11 w-full rounded-2xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white touch-manipulation hover:border-white/[0.4]"
                    >
                      + New employer
                    </button>
                  )}
                </>
              )}
            </section>
          )}
        </div>

        {/* ── Right: the booking, as it will be sent ── */}
        <aside className="space-y-4 lg:sticky lg:top-0">
          <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.09] to-white/[0.03]">
            <div className="border-b border-white/[0.08] px-5 py-5 sm:px-6">
              <p className="text-[13px] font-semibold text-white">Your booking</p>
              <p className="mt-2 text-[22px] font-bold leading-tight tracking-tight text-white">
                {dayLong ?? 'Pick a day'}
              </p>
              <p className="mt-1 text-[15px] font-semibold tabular-nums text-white">
                {time}
                <span className="font-medium"> · {MODE_LABEL[mode]}</span>
              </p>
              {dueBy && (
                <p
                  className={cn(
                    'mt-3 text-[12.5px] font-medium',
                    overdue || afterDue ? 'text-orange-300' : 'text-white'
                  )}
                >
                  {overdue
                    ? `Overdue since ${fmtReviewDate(dueBy)}, so book the earliest day you can`
                    : afterDue
                      ? `After the due date of ${fmtReviewDate(dueBy)}`
                      : `Inside the due date of ${fmtReviewDate(dueBy)}`}
                </p>
              )}
            </div>
            <dl className="divide-y divide-white/[0.06] px-5 sm:px-6">
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-[12.5px] text-white">Apprentice</dt>
                <dd className="min-w-0 break-words text-right text-[13.5px] font-semibold text-white">
                  {studentName}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-[12.5px] text-white">Employer</dt>
                <dd className="min-w-0 text-right text-[13.5px] font-semibold text-white [overflow-wrap:anywhere]">
                  {chosen ? (
                    chosen.company_name
                  ) : addingNew && company.trim() ? (
                    company.trim()
                  ) : (
                    <span className="text-orange-300">Not chosen yet</span>
                  )}
                </dd>
              </div>
              {(mode === 'in_person' || mode === 'video') && (
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-[12.5px] text-white">
                    {mode === 'video' ? 'Link' : 'Where'}
                  </dt>
                  <dd className="min-w-0 text-right text-[13.5px] font-semibold text-white [overflow-wrap:anywhere]">
                    {place.trim() || 'Add it when you know'}
                  </dd>
                </div>
              )}
            </dl>
            <div className="hidden gap-2.5 px-5 pb-5 pt-2 sm:px-6 lg:grid lg:grid-cols-[auto_1fr]">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(buttonSecondaryCn, 'px-5')}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={!valid || saving}
                className={buttonPrimaryCn}
              >
                {saving ? 'Booking…' : (missing ?? 'Book review')}
              </button>
            </div>
          </div>

          <section className="rounded-3xl border border-white/[0.08] p-5 sm:p-6">
            <p className="text-[15px] font-semibold text-white">What happens next</p>
            <ol className="mt-3 space-y-3 text-[13px] leading-relaxed text-white">
              <li className="flex gap-3">
                <span className="font-bold text-white">1</span>
                {first} is told and can add their view before you meet.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-white">2</span>
                You send the employer their link: three questions, no account. Sending it is your
                evidence they were asked.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-white">3</span>
                On the day, the review opens filled in from the record: hours, attendance, evidence
                and last time's actions.
              </li>
            </ol>
          </section>
        </aside>
      </div>
    </FormSheet>
  );
}

function StepHead({ n, title, aside }: { n: number; title: string; aside?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="flex items-baseline gap-2.5 text-[15px] font-semibold text-white">
        <span className="text-[12px] font-bold tabular-nums text-elec-yellow">{n}</span>
        {title}
      </h3>
      {aside}
    </div>
  );
}

/* ── 1. Prepare ─────────────────────────────────────────────────────────── */

function PrepareStep({
  review,
  prefill,
  studentName,
  onChanged,
}: {
  review: TripartiteReview;
  prefill: ReviewPrefill;
  studentName: string;
  onChanged: () => void;
}) {
  const { toast } = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [when, setWhen] = useState(toLocalInput(review.scheduled_at));
  const [place, setPlace] = useState(
    review.mode === 'video' ? (review.meeting_url ?? '') : (review.location ?? '')
  );

  const saveWhenHow = async (patch: Parameters<typeof updateReview>[1]) => {
    try {
      await updateReview(review.id, patch);
      onChanged();
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const email = review.employer_contact_email;
  const link = useEmployerLink(review.id);
  const [newEmail, setNewEmail] = useState('');
  const sendEmail = async (kind: 'invite' | 'reminder') => {
    setBusy(kind);
    const res = await emailEmployer(review.id, kind);
    setBusy(null);
    if (res.error || !res.success) {
      toast({ title: 'Not sent', description: res.error ?? 'Try again.', variant: 'destructive' });
      return;
    }
    toast({ title: kind === 'invite' ? 'Link sent to the employer' : 'Reminder sent' });
    onChanged();
  };
  // Copy and open run synchronously in the tap (Safari drops the gesture
  // after an await), with the link fetched when the step opened.
  const share = (how: 'copy' | 'whatsapp') => {
    if (!link) {
      toast({ title: 'Getting the link', description: 'Try again in a moment.' });
      return;
    }
    if (how === 'copy') {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          toast({
            title: 'Link copied',
            description: 'Send it to the employer. Sharing it is recorded as an invitation.',
          });
          void logEmployerContact(review.id, 'shared_link', 'Link copied').then(onChanged);
        })
        .catch(() => toast({ title: 'Could not copy', description: link, variant: 'destructive' }));
    } else {
      const text = `${studentName}'s apprenticeship progress review${review.scheduled_at ? ` is on ${fmtReviewDate(review.scheduled_at, true)}` : ''}. Add your view and sign here, no account needed: ${link}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      void logEmployerContact(review.id, 'shared_link', 'WhatsApp').then(onChanged);
    }
  };
  const saveEmail = async () => {
    const e = newEmail.trim();
    if (!/^\S+@\S+\.\S+$/.test(e)) {
      toast({ title: 'Check the email address', variant: 'destructive' });
      return;
    }
    try {
      await setEmployerEmail(review.id, review.employer_id, e);
      setNewEmail('');
      onChanged();
    } catch (err) {
      toast({ title: 'Not saved', description: (err as Error).message, variant: 'destructive' });
    }
  };

  const otj = prefill.otj;
  return (
    <>
      <section className={cardCn}>
        <SectionTitle>When and how</SectionTitle>
        <div className={grid2Cn}>
          <div className={fieldFullCn}>
            <label className={labelCn} htmlFor="pw-when">
              Date and time
            </label>
            <input
              id="pw-when"
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              onBlur={() =>
                when && void saveWhenHow({ scheduled_at: new Date(when).toISOString() })
              }
              className={inputCn}
            />
          </div>
          <div className={fieldFullCn}>
            <Chips
              value={review.mode}
              options={MODE_OPTIONS}
              onChange={(m) => void saveWhenHow({ mode: m })}
              cols={2}
            />
          </div>
          {review.mode !== 'email' && review.mode !== 'phone' && (
            <div className={fieldFullCn}>
              <label className={labelCn} htmlFor="pw-place">
                {review.mode === 'video' ? 'Meeting link' : 'Where'}
              </label>
              <input
                id="pw-place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                onBlur={() => {
                  if (
                    review.mode === 'video' &&
                    place.trim() &&
                    !/^https:\/\//i.test(place.trim())
                  ) {
                    toast({
                      title: 'Use the full meeting link',
                      description: 'It starts with https://',
                      variant: 'destructive',
                    });
                    return;
                  }
                  void saveWhenHow(
                    review.mode === 'video'
                      ? { meeting_url: place.trim() || null }
                      : { location: place.trim() || null }
                  );
                }}
                className={inputCn}
              />
            </div>
          )}
        </div>
        {prefill.due_by && (
          <p className="text-[13px] text-white">
            Due by {fmtReviewDate(prefill.due_by)}
            {review.scheduled_at && (londonDate(review.scheduled_at) ?? '') > prefill.due_by ? (
              <span className="text-orange-300"> · this date is after it</span>
            ) : null}
          </p>
        )}
      </section>

      <section className={cardCn}>
        <SectionTitle rule="Para 97.2.1">Employer</SectionTitle>
        <p className="text-[14px] leading-relaxed text-white">
          {prefill.learner.employer ?? 'Employer'}
          {review.employer_contact_name ? `, ${review.employer_contact_name}` : ''}. Their link lets
          them add their view before the review and sign the summary after it. No account, nothing
          to learn.
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
          {email && (
            <button
              type="button"
              disabled={!!busy}
              onClick={() => void sendEmail(review.employer_invited_at ? 'reminder' : 'invite')}
              className={cn(buttonPrimaryCn, 'col-span-2 h-11 px-5 text-[13px] sm:w-auto')}
            >
              {busy === 'invite' || busy === 'reminder'
                ? 'Sending…'
                : review.employer_invited_at
                  ? `Send a reminder to ${email}`
                  : `Email the link to ${email}`}
            </button>
          )}
          <button
            type="button"
            disabled={!!busy}
            onClick={() => share('copy')}
            className={neutralCn}
          >
            Copy link
          </button>
          <button
            type="button"
            disabled={!!busy}
            onClick={() => share('whatsapp')}
            className={neutralCn}
          >
            WhatsApp
          </button>
        </div>
        {!email && (
          <div className="flex items-end gap-2.5">
            <div className="min-w-0 flex-1">
              <label className={labelCn} htmlFor="pw-email">
                Employer's email, to send the link for you
              </label>
              <input
                id="pw-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className={inputCn}
              />
            </div>
            <button type="button" onClick={() => void saveEmail()} className={neutralCn}>
              Save
            </button>
          </div>
        )}
        <ContactTimeline review={review} />
        {review.employer_input ? (
          <div className={infoPanelCn}>
            <InputView input={review.employer_input} who="Employer's view" />
          </div>
        ) : (
          <p className="text-[13px] text-white">The employer has not added their view yet.</p>
        )}
      </section>

      <section className={cardCn}>
        <SectionTitle>{studentName}'s view</SectionTitle>
        {review.learner_input ? (
          <InputView input={review.learner_input} who="Apprentice" />
        ) : (
          <p className="text-[13px] leading-relaxed text-white">
            Not added yet. {studentName} sees the review on their My college page and can answer the
            same three questions before you meet.
          </p>
        )}
      </section>

      <section className={cardCn}>
        <SectionTitle>From the record</SectionTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat
            label="Off-the-job"
            value={otj ? fmtHours(otj.counted_hours) : '—'}
            note={otj?.required_hours ? `of ${fmtHours(otj.required_hours)}` : undefined}
          />
          <Stat
            label="Planned by now"
            value={otj?.planned_to_date_hours != null ? fmtHours(otj.planned_to_date_hours) : '—'}
            note={
              otj && otj.slippage_hours > 0 ? `${fmtHours(otj.slippage_hours)} behind` : 'on plan'
            }
          />
          <Stat
            label="Attendance"
            value={
              prefill.attendance_since?.percent != null
                ? `${prefill.attendance_since.percent}%`
                : '—'
            }
            note={`since ${fmtReviewDate(prefill.since)}`}
          />
          <Stat
            label="Evidence signed off"
            value={String(prefill.evidence_since.signed_off)}
            note={`${prefill.evidence_since.awaiting_assessment} waiting`}
          />
        </div>
      </section>
    </>
  );
}

function ContactTimeline({ review }: { review: TripartiteReview }) {
  const items: Array<{ at: string; text: string }> = [];
  for (const c of review.employer_contact_log ?? []) {
    const what =
      c.kind === 'invite'
        ? 'Link emailed'
        : c.kind === 'reminder'
          ? 'Reminder emailed'
          : c.kind === 'summary'
            ? 'Summary sent'
            : 'Link shared';
    items.push({ at: c.at, text: `${what}${c.to ? ` · ${c.to}` : ''}${c.by ? ` · ${c.by}` : ''}` });
  }
  if (review.employer_viewed_at)
    items.push({ at: review.employer_viewed_at, text: 'Employer opened the link' });
  if (review.employer_input?.at)
    items.push({ at: review.employer_input.at, text: 'Employer added their view' });
  if (items.length === 0) return null;
  items.sort((a, b) => a.at.localeCompare(b.at));
  return (
    <ol className="space-y-1.5 border-l border-white/[0.18] pl-3">
      {items.map((i, n) => (
        <li key={n} className="text-[12.5px] leading-snug text-white">
          <span className="font-semibold tabular-nums">
            {new Date(i.at).toLocaleString('en-GB', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>{' '}
          {i.text}
        </li>
      ))}
    </ol>
  );
}

/* ── 2. Since the last review ───────────────────────────────────────────── */

function SinceStep({
  review,
  prefill,
  outcomes,
  patch,
  onChanged,
}: {
  review: TripartiteReview;
  prefill: ReviewPrefill;
  outcomes: ReviewOutcomes;
  patch: (p: Partial<ReviewOutcomes>) => void;
  onChanged: () => void;
}) {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Record<string, string>>(() =>
    Object.fromEntries(prefill.open_actions.map((a) => [a.id, a.outcome_note ?? '']))
  );
  const setCheck = async (actionId: string, status: ActionStatus) => {
    try {
      await checkEarlierAction(actionId, review.id, status, notes[actionId]?.trim() || null);
      onChanged();
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    }
  };

  return (
    <>
      <section className={cardCn}>
        <SectionTitle rule="Para 98.1">Actions from the last review</SectionTitle>
        {prefill.open_actions.length === 0 ? (
          <p className="text-[13px] text-white">
            {prefill.previous_review_id
              ? 'Every earlier action is already closed.'
              : 'This is the first review.'}
          </p>
        ) : (
          <ul className="space-y-5">
            {prefill.open_actions.map((a) => {
              const decided = a.closed_in_review_id === review.id ? a.status : null;
              return (
                <li key={a.id} className="space-y-2.5">
                  <p className="text-[15px] font-semibold leading-snug text-white">{a.action}</p>
                  <p className="text-[12px] text-white">
                    {OWNER_LABEL[a.owner_party]}
                    {a.due_date ? ` · by ${fmtReviewDate(a.due_date)}` : ''}
                  </p>
                  <Chips
                    value={decided}
                    options={CHECK_OPTIONS}
                    onChange={(s) => void setCheck(a.id, s)}
                    cols={3}
                  />
                  <input
                    value={notes[a.id] ?? ''}
                    onChange={(e) => setNotes((n) => ({ ...n, [a.id]: e.target.value }))}
                    onBlur={() => decided && void setCheck(a.id, decided)}
                    placeholder="What happened (optional)"
                    className={inputCn}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className={cardCn}>
        <SectionTitle rule="Para 98.1">Training since {fmtReviewDate(prefill.since)}</SectionTitle>
        {prefill.training_since.length === 0 ? (
          <p className="text-[13px] text-white">
            No verified off-the-job training recorded since then.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.1]">
            {prefill.training_since.map((t) => (
              <li
                key={t.type}
                className="flex items-center justify-between py-2.5 text-[14px] text-white"
              >
                <span>{otjActivityLabel(t.type)}</span>
                <span className="font-semibold tabular-nums">{fmtHours(t.hours)}</span>
              </li>
            ))}
            <li className="flex items-center justify-between py-2.5 text-[14px] font-semibold text-white">
              <span>Total verified</span>
              <span className="tabular-nums">{fmtHours(prefill.hours_since)}</span>
            </li>
          </ul>
        )}
        <div>
          <label className={labelCn} htmlFor="rv-training">
            Training discussed
          </label>
          <textarea
            id="rv-training"
            rows={3}
            value={outcomes.training_notes ?? ''}
            onChange={(e) => patch({ training_notes: e.target.value })}
            className={textareaCn}
          />
        </div>
      </section>

      <section className={cardCn}>
        <SectionTitle rule="Para 98.2">Evidence</SectionTitle>
        <p className="text-[13px] leading-relaxed text-white">
          Since {fmtReviewDate(prefill.since)}: {prefill.evidence_since.signed_off} portfolio items
          signed off, {prefill.evidence_since.awaiting_assessment} waiting for assessment,{' '}
          {prefill.evidence_since.witness_statements} witness statements signed.
        </p>
        <div>
          <label className={labelCn} htmlFor="rv-evidence">
            Evidence discussed or collected, especially training outside the college
          </label>
          <textarea
            id="rv-evidence"
            rows={3}
            value={outcomes.evidence_notes ?? ''}
            onChange={(e) => patch({ evidence_notes: e.target.value })}
            className={textareaCn}
          />
        </div>
      </section>
    </>
  );
}

/* ── 3. Progress ────────────────────────────────────────────────────────── */

function ProgressStep({
  prefill,
  outcomes,
  patch,
}: {
  prefill: ReviewPrefill;
  outcomes: ReviewOutcomes;
  patch: (p: Partial<ReviewOutcomes>) => void;
}) {
  const otj = prefill.otj;
  const behind = (otj?.slippage_hours ?? 0) > 0;
  return (
    <>
      <section className={cardCn}>
        <SectionTitle rule="Para 98.3">Off-the-job hours against the plan</SectionTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Counted" value={otj ? fmtHours(otj.counted_hours) : '—'} />
          <Stat
            label="Planned by now"
            value={otj?.planned_to_date_hours != null ? fmtHours(otj.planned_to_date_hours) : '—'}
          />
          <Stat
            label="Slippage"
            value={otj ? fmtHours(otj.slippage_hours) : '—'}
            note={behind ? 'must be documented' : 'none'}
          />
          <Stat
            label="Needed a week"
            value={otj?.weekly_needed_hours != null ? fmtHours(otj.weekly_needed_hours) : '—'}
            note={otj?.required_hours ? `to reach ${fmtHours(otj.required_hours)}` : undefined}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="rv-otj">
            {behind ? 'Why hours slipped and how they will be made up' : 'Off-the-job hours: notes'}
          </label>
          <textarea
            id="rv-otj"
            rows={3}
            value={outcomes.otj_review ?? ''}
            onChange={(e) => patch({ otj_review: e.target.value })}
            className={textareaCn}
          />
          {behind && !(outcomes.otj_review ?? '').trim() && (
            <p className="mt-2 text-[13px] text-orange-300">
              {fmtHours(otj?.slippage_hours)} behind the plan. The funding rules ask for slippage to
              be documented.
            </p>
          )}
        </div>
      </section>

      <section className={cardCn}>
        <SectionTitle rule="Para 98.3">Progress against the training plan</SectionTitle>
        {prefill.goals.length > 0 && (
          <ul className="divide-y divide-white/[0.1]">
            {prefill.goals.map((g, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-2.5">
                <span className="min-w-0 text-[14px] text-white">{g.title}</span>
                <span className="shrink-0 text-[12px] font-semibold capitalize text-white">
                  {g.status.replace(/_/g, ' ')}
                </span>
              </li>
            ))}
          </ul>
        )}
        {(prefill.learner.criteria?.total || prefill.learner.expected_end_date) && (
          <p className="text-[13px] text-white">
            {[
              prefill.learner.criteria?.total
                ? `${prefill.learner.criteria.passed} of ${prefill.learner.criteria.total} criteria passed`
                : null,
              prefill.learner.expected_end_date
                ? `planned end ${fmtReviewDate(prefill.learner.expected_end_date)}`
                : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
        <div>
          <label className={labelCn} htmlFor="rv-progress">
            Progress discussed
          </label>
          <textarea
            id="rv-progress"
            rows={4}
            value={outcomes.progress_notes ?? ''}
            onChange={(e) => patch({ progress_notes: e.target.value })}
            className={textareaCn}
          />
        </div>
      </section>
    </>
  );
}

/* ── 4. Plan and support ────────────────────────────────────────────────── */

function PlanStep({
  prefill,
  outcomes,
  patch,
}: {
  prefill: ReviewPrefill;
  outcomes: ReviewOutcomes;
  patch: (p: Partial<ReviewOutcomes>) => void;
}) {
  const ls = outcomes.learning_support ?? {};
  const lsApplies = ls.applies ?? prefill.support_needs;
  const needsEmployer =
    outcomes.plan_change && PLAN_CHANGE_NEEDS_EMPLOYER.includes(outcomes.plan_change);
  return (
    <>
      <section className={cardCn}>
        <SectionTitle rule="Para 98.4">Training plan</SectionTitle>
        <Chips
          value={outcomes.plan_change}
          options={PLAN_OPTIONS}
          onChange={(v) => patch({ plan_change: v })}
        />
        {needsEmployer && (
          <p className="text-[13px] leading-relaxed text-orange-300">
            The employer needs to re-sign the training plan for this change. They are asked to sign
            the review summary through their link.
          </p>
        )}
        {outcomes.plan_change && outcomes.plan_change !== 'none' && (
          <div>
            <label className={labelCn} htmlFor="rv-plan">
              What changed
            </label>
            <textarea
              id="rv-plan"
              rows={3}
              value={outcomes.ilp_updates ?? ''}
              onChange={(e) => patch({ ilp_updates: e.target.value })}
              className={textareaCn}
            />
          </div>
        )}
      </section>

      <section className={cardCn}>
        <SectionTitle rule="Para 98.5">Concerns and new information</SectionTitle>
        <p className="text-[13px] leading-relaxed text-white">
          Changes of circumstance, prior learning, and anything else that has come up since the
          start. Shared with the employer and apprentice: record learning difficulties, disability
          and support needs under Learning support, where the apprentice decides whether the
          employer sees them.
        </p>
        <textarea
          aria-label="Concerns and new information"
          rows={3}
          value={outcomes.concerns ?? ''}
          onChange={(e) => patch({ concerns: e.target.value })}
          className={textareaCn}
        />
      </section>

      <section className={cardCn}>
        <SectionTitle rule="Paras 40.5, 97.3">Learning support</SectionTitle>
        <Chips
          value={lsApplies ? 'yes' : 'no'}
          options={[
            { value: 'yes', label: 'Receives learning support' },
            { value: 'no', label: 'No learning support' },
          ]}
          onChange={(v) => patch({ learning_support: { ...ls, applies: v === 'yes' } })}
          cols={2}
        />
        {lsApplies && (
          <>
            <Chips
              value={ls.employer_consent ? 'yes' : 'no'}
              options={[
                { value: 'yes', label: 'Apprentice agrees the employer can know' },
                { value: 'no', label: 'Keep it from the employer' },
              ]}
              onChange={(v) =>
                patch({ learning_support: { ...ls, applies: true, employer_consent: v === 'yes' } })
              }
              cols={2}
            />
            <div>
              <label className={labelCn} htmlFor="rv-ls">
                Learning support reviewed
              </label>
              <textarea
                id="rv-ls"
                rows={3}
                value={ls.note ?? ''}
                onChange={(e) =>
                  patch({
                    learning_support: {
                      ...ls,
                      applies: true,
                      discussed: e.target.value.trim().length > 0,
                      note: e.target.value,
                    },
                  })
                }
                className={textareaCn}
              />
              <p className="mt-2 text-[12px] leading-relaxed text-white">
                Kept as a separate record of the learning support check. The employer only sees it
                if the apprentice agrees.
              </p>
            </div>
          </>
        )}
      </section>

      <section className={cardCn}>
        <SectionTitle>Wellbeing and safeguarding</SectionTitle>
        <p className="text-[12px] text-white">College only. Never shared with the employer.</p>
        <div>
          <label className={labelCn} htmlFor="rv-wb">
            Wellbeing
          </label>
          <textarea
            id="rv-wb"
            rows={2}
            value={outcomes.wellbeing_check ?? ''}
            onChange={(e) => patch({ wellbeing_check: e.target.value })}
            className={textareaCn}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="rv-sg">
            Safeguarding, Prevent and safe working
          </label>
          <textarea
            id="rv-sg"
            rows={2}
            value={outcomes.safeguarding_check ?? ''}
            onChange={(e) => patch({ safeguarding_check: e.target.value })}
            className={textareaCn}
          />
        </div>
      </section>
    </>
  );
}

/* ── 5. Actions ─────────────────────────────────────────────────────────── */

function ActionsStep({
  review,
  actions,
  outcomes,
  patch,
  flush,
  onChanged,
}: {
  review: TripartiteReview;
  actions: ReviewAction[];
  outcomes: ReviewOutcomes;
  patch: (p: Partial<ReviewOutcomes>) => void;
  flush: () => Promise<void>;
  onChanged: () => void;
}) {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [owner, setOwner] = useState<ActionOwner>('apprentice');
  const [due, setDue] = useState('');
  const [busy, setBusy] = useState(false);

  const add = async () => {
    if (text.trim().length < 3 || busy) return;
    setBusy(true);
    try {
      await addReviewAction(review, text, owner, due || null, actions.length);
      setText('');
      setDue('');
      onChanged();
    } catch (e) {
      toast({ title: 'Not added', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* ELE-2051: an AI draft of the summary and SMART targets, used only when the tutor confirms it. */}
      <ReviewAiDraftPanel
        review={review}
        actions={actions}
        outcomes={outcomes}
        patch={patch}
        flush={flush}
        onChanged={onChanged}
      />
      <section className={cardCn}>
        <SectionTitle rule="Para 98.6">Actions for the next review</SectionTitle>
        {actions.length > 0 && (
          <ul className="divide-y divide-white/[0.1]">
            {actions.map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-snug text-white">{a.action}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[12px] text-white">
                    <span>
                      {OWNER_LABEL[a.owner_party]}
                      {a.due_date ? ` · by ${fmtReviewDate(a.due_date)}` : ''}
                    </span>
                    {a.source === 'ai_draft_confirmed' && (
                      <span>· from an AI draft you confirmed</span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    void removeReviewAction(a.id)
                      .then(onChanged)
                      .catch((e) =>
                        toast({
                          title: 'Not removed',
                          description: (e as Error).message,
                          variant: 'destructive',
                        })
                      )
                  }
                  className="h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="space-y-4 border-t border-white/[0.1] pt-4">
          <div>
            <label className={labelCn} htmlFor="rv-act">
              New action
            </label>
            <input
              id="rv-act"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void add()}
              placeholder="e.g. Complete three supervised safe isolations and log them"
              className={inputCn}
            />
          </div>
          <div>
            <p className={labelCn}>Who</p>
            <Chips<ActionOwner>
              value={owner}
              options={OWNER_OPTIONS}
              onChange={setOwner}
              cols={3}
            />
          </div>
          <div className={grid2Cn}>
            <div>
              <label className={labelCn} htmlFor="rv-due">
                By
              </label>
              <input
                id="rv-due"
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className={inputCn}
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => void add()}
                disabled={text.trim().length < 3 || busy}
                className={cn(buttonPrimaryCn, 'h-11 w-full text-[13px]')}
              >
                Add action
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── 6. Sign off ────────────────────────────────────────────────────────── */

function SignOffStep({
  review,
  prefill,
  actions,
  outcomes,
  patch,
  studentName,
  goto,
  flush,
  onChanged,
  onDeleted,
}: {
  review: TripartiteReview;
  prefill: ReviewPrefill;
  actions: ReviewAction[];
  outcomes: ReviewOutcomes;
  patch: (p: Partial<ReviewOutcomes>) => void;
  studentName: string;
  goto: (s: Step) => void;
  flush: () => Promise<void>;
  onChanged: () => void;
  onDeleted: () => void;
}) {
  const { toast } = useToast();
  // Held on: the booked date in the UK, or today if it was held early.
  const booked = londonDate(review.scheduled_at);
  const [heldOn, setHeldOn] = useState(booked && booked < todayIso() ? booked : todayIso());
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const setAttendance = async (a: EmployerAttendance) => {
    try {
      await updateReview(review.id, { employer_attendance: a });
      onChanged();
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    }
  };

  // The same checks the database makes, shown before the button.
  const checks = useMemo(
    () => [
      { ok: !!review.mode, text: 'How it was held', step: 'prepare' as Step },
      {
        ok: review.employer_attendance === 'attended' || !!review.employer_invited_at,
        text: 'Employer asked to contribute (link sent)',
        step: 'prepare' as Step,
      },
      {
        ok: prefill.open_actions.every((a) => a.closed_in_review_id === review.id),
        text: 'Every action from the last review checked',
        step: 'since' as Step,
      },
      { ok: !!outcomes.plan_change, text: 'Training plan question answered', step: 'plan' as Step },
      { ok: actions.length > 0, text: 'At least one action agreed', step: 'actions' as Step },
      {
        ok: !!review.employer_attendance,
        text: 'Employer attendance recorded',
        step: 'signoff' as Step,
      },
      {
        ok: (outcomes.summary ?? '').trim().length >= 20,
        text: 'Summary written',
        step: 'signoff' as Step,
      },
      { ok: heldOn <= todayIso(), text: 'Date held is today or earlier', step: 'signoff' as Step },
    ],
    [review, prefill, outcomes, actions]
  );
  const ready = checks.every((c) => c.ok);

  const signOff = async () => {
    if (!ready || busy) return;
    setBusy(true);
    try {
      // The summary typed in the last second must be in what is frozen.
      await flush();
      const res = await signOffReview(review.id, heldOn);
      if (res.error || !res.success) {
        toast({
          title: 'Not signed off',
          description: res.error ?? 'Try again.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Signed off',
        description: `${studentName} has been asked to sign. Send the employer the summary next.`,
      });
      onChanged();
    } catch (e) {
      toast({ title: 'Not signed off', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <section className={cardCn}>
        <SectionTitle rule="Para 97.2.1">Did the employer attend?</SectionTitle>
        <Chips
          value={review.employer_attendance}
          options={ATTENDANCE_OPTIONS}
          onChange={(v) => void setAttendance(v)}
          cols={3}
        />
        <p className="text-[12px] leading-relaxed text-white">
          The employer must attend, in person or by video, in most of each apprentice's reviews.
          When they cannot, the link they were sent is the evidence they were given the chance to
          contribute.
        </p>
      </section>

      <section className={cardCn}>
        <div className="flex items-start justify-between gap-3">
          <SectionTitle rule="Para 97.2.2">Summary of the discussion</SectionTitle>
          <button
            type="button"
            onClick={() => {
              const draft = draftSummary(studentName, prefill, outcomes, actions, review);
              if (!draft) return;
              const current = (outcomes.summary ?? '').trim();
              patch({ summary: current ? `${current}\n\n${draft}` : draft });
            }}
            className="-mt-2 h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Draft from your notes
          </button>
        </div>
        <textarea
          aria-label="Summary of the discussion"
          rows={5}
          value={outcomes.summary ?? ''}
          onChange={(e) => patch({ summary: e.target.value })}
          placeholder="What was discussed and agreed, in plain words. The apprentice and employer both receive this."
          className={textareaCn}
        />
        <SummaryProvenance outcomes={outcomes} />
        <div>
          <label className={labelCn} htmlFor="rv-held">
            Held on
          </label>
          <input
            id="rv-held"
            type="date"
            max={todayIso()}
            value={heldOn}
            onChange={(e) => setHeldOn(e.target.value)}
            className={inputCn}
          />
        </div>
      </section>

      <section className={cardCn}>
        <SectionTitle>Ready to sign off</SectionTitle>
        <ul className="space-y-1">
          {checks.map((c) => (
            <li key={c.text}>
              <button
                type="button"
                onClick={() => !c.ok && goto(c.step)}
                className="flex min-h-11 w-full items-center gap-3 text-left touch-manipulation"
              >
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] font-bold',
                    c.ok ? 'bg-emerald-500 text-black' : 'border border-white/40 text-white'
                  )}
                >
                  {c.ok ? '✓' : ''}
                </span>
                <span className="text-[14px] text-white">{c.text}</span>
                {!c.ok && c.step !== 'signoff' && (
                  <span className="ml-auto text-[12px] font-semibold text-elec-yellow">Go</span>
                )}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={signOff}
          disabled={!ready || busy}
          className={cn(buttonPrimaryCn, 'w-full')}
        >
          {busy ? 'Signing off…' : `Sign off and send to ${studentName.split(' ')[0]}`}
        </button>
        <p className="text-[12px] leading-relaxed text-white">
          Signing off records your signature, freezes the review as it stands and asks the
          apprentice to sign. It cannot be edited afterwards.
        </p>
      </section>

      <button
        type="button"
        onClick={() => {
          if (!confirmDelete) {
            setConfirmDelete(true);
            window.setTimeout(() => setConfirmDelete(false), 5000);
            return;
          }
          void deleteReview(review.id)
            .then(onDeleted)
            .catch((e) =>
              toast({
                title: 'Not removed',
                description: (e as Error).message,
                variant: 'destructive',
              })
            );
        }}
        className={cn(
          'h-11 w-full rounded-xl text-[13px] font-semibold touch-manipulation',
          confirmDelete ? 'bg-red-500 text-white' : 'text-white hover:bg-white/[0.06]'
        )}
      >
        {confirmDelete
          ? 'Tap again to delete it, with any employer view and invitation record'
          : 'Delete this review (it did not happen)'}
      </button>
    </>
  );
}

/* ── After sign-off: the record ─────────────────────────────────────────── */

function ReviewRecord({
  review,
  prefill,
  actions,
  onChanged,
}: {
  review: TripartiteReview;
  prefill: ReviewPrefill;
  actions: ReviewAction[];
  onChanged: () => void;
}) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const o = review.outcomes ?? {};
  const s = review.signatures ?? {};
  const mustSign = !!review.snapshot?.employer_must_sign;
  const checked = (
    review.snapshot as {
      checked_actions?: Array<{
        action: string;
        status: ActionStatus;
        outcome_note: string | null;
      }>;
    } | null
  )?.checked_actions;

  const link = useEmployerLink(review.id);
  const sendSummary = async () => {
    if (!review.employer_contact_email) {
      // Copy in the tap itself (Safari), with the link fetched on open.
      if (!link) return;
      try {
        await navigator.clipboard.writeText(link);
        await logEmployerContact(review.id, 'summary', 'Link copied');
        toast({
          title: 'Link copied',
          description: 'Send it to the employer so they can read and sign.',
        });
        onChanged();
      } catch (e) {
        toast({
          title: 'Could not copy',
          description: (e as Error).message,
          variant: 'destructive',
        });
      }
      return;
    }
    setBusy(true);
    try {
      const res = await emailEmployer(review.id, 'summary');
      if (res.error || !res.success) throw new Error(res.error ?? 'Try again.');
      toast({ title: 'Summary sent to the employer' });
      onChanged();
    } catch (e) {
      toast({ title: 'Not sent', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  // A learner with no Elec-Mate account signs a paper copy (para 311–312).
  const noAccount = prefill.learner.has_account === false;
  const [paperOn, setPaperOn] = useState(londonToday());
  const [paperNote, setPaperNote] = useState('');
  const recordPaper = async () => {
    try {
      const res = await recordPaperLearnerSignature(review.id, paperOn, paperNote);
      if (res.error || !res.success) throw new Error(res.error ?? 'Try again.');
      toast({ title: 'Paper signature recorded' });
      onChanged();
    } catch (e) {
      toast({ title: 'Not recorded', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const rows: Array<[string, string | undefined]> = [
    ['Summary', o.summary],
    ['Training since the last review', o.training_notes],
    ['Evidence', o.evidence_notes],
    ['Progress', o.progress_notes],
    ['Off-the-job hours', o.otj_review],
    [
      'Training plan',
      o.plan_change
        ? `${PLAN_CHANGE_LABEL[o.plan_change]}${o.ilp_updates ? `. ${o.ilp_updates}` : ''}`
        : undefined,
    ],
    ['Concerns and new information', o.concerns],
    ['Learning support', o.learning_support?.note],
    ['Wellbeing (college only)', o.wellbeing_check],
    ['Safeguarding (college only)', o.safeguarding_check],
  ];

  return (
    <>
      <section className={cardCn}>
        <SectionTitle>Signatures</SectionTitle>
        <div className="divide-y divide-white/[0.1]">
          <SignatureLine
            party="College"
            name={s.tutor_name}
            at={s.tutor_signed_at}
            waiting="Not signed"
          />
          <SignatureLine
            party={s.student_signed_via === 'paper' ? 'Apprentice (paper copy)' : 'Apprentice'}
            name={s.student_name}
            at={s.student_signed_at}
            waiting={noAccount ? 'No account: sign on paper' : 'Asked to sign'}
          />
          <SignatureLine
            party={mustSign ? 'Employer (plan changed, must sign)' : 'Employer'}
            name={
              s.employer_name
                ? `${s.employer_name}${s.employer_role ? `, ${s.employer_role}` : ''}`
                : null
            }
            at={s.employer_signed_at}
            waiting={review.shared_at ? 'Summary sent' : 'Send them the summary'}
          />
        </div>
        {noAccount && !s.student_signed_at && (
          <div className="space-y-3 rounded-xl border border-white/[0.14] p-3.5">
            <p className="text-[13px] leading-relaxed text-white">
              The apprentice has no Elec-Mate account. Print the copy below, have them sign it, and
              record it here.
            </p>
            <div className={grid2Cn}>
              <div>
                <label className={labelCn} htmlFor="pp-on">
                  Signed on
                </label>
                <input
                  id="pp-on"
                  type="date"
                  value={paperOn}
                  max={londonToday()}
                  onChange={(e) => setPaperOn(e.target.value)}
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="pp-note">
                  Where the signed copy is kept
                </label>
                <input
                  id="pp-note"
                  value={paperNote}
                  onChange={(e) => setPaperNote(e.target.value)}
                  placeholder="e.g. Learner file, scanned"
                  className={inputCn}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => void recordPaper()}
              disabled={paperNote.trim().length < 5}
              className={cn(buttonPrimaryCn, 'h-11 w-full text-[13px]')}
            >
              Record the paper signature
            </button>
          </div>
        )}
        {!s.employer_signed_at && (
          <button
            type="button"
            onClick={sendSummary}
            disabled={busy}
            className={cn(buttonPrimaryCn, 'w-full')}
          >
            {busy
              ? 'Sending…'
              : review.employer_contact_email
                ? review.shared_at
                  ? 'Send the summary again'
                  : `Send the summary to ${review.employer_contact_email}`
                : 'Copy the employer’s link'}
          </button>
        )}
        <p className="text-[12px] leading-relaxed text-white">
          Held {fmtReviewDate(review.held_on)} · {review.mode ? MODE_LABEL[review.mode] : ''} ·
          Employer{' '}
          {review.employer_attendance
            ? ATTENDANCE_LABEL[review.employer_attendance].toLowerCase()
            : 'not recorded'}
        </p>
        <ContactTimeline review={review} />
        <button
          type="button"
          disabled={!link}
          onClick={() =>
            link &&
            window.open(
              window.location.origin.startsWith('http')
                ? link.replace('https://elec-mate.com', window.location.origin)
                : link,
              '_blank',
              'noopener'
            )
          }
          className={cn(neutralCn, 'w-full')}
        >
          Printable copy for the evidence pack
        </button>
        <p className="text-[12px] leading-relaxed text-white">
          The shared summary, as the apprentice and employer see it. Opening it yourself is not
          recorded as the employer viewing it. Wellbeing and safeguarding notes stay here.
        </p>
      </section>

      <section className={cardCn}>
        <SectionTitle>What was discussed</SectionTitle>
        <dl className="space-y-4">
          {rows
            .filter(([, v]) => v && v.trim())
            .map(([l, v]) => (
              <div key={l}>
                <dt className="text-[12px] font-medium text-white">{l}</dt>
                <dd className="mt-0.5 whitespace-pre-wrap text-[14px] leading-relaxed text-white">
                  {v}
                </dd>
                {l === 'Summary' && <SummaryProvenance outcomes={o} />}
              </div>
            ))}
        </dl>
      </section>

      {checked && checked.length > 0 && (
        <section className={cardCn}>
          <SectionTitle>Actions from the last review</SectionTitle>
          <ul className="divide-y divide-white/[0.1]">
            {checked.map((a, i) => (
              <li key={i} className="py-2.5">
                <p className="text-[14px] text-white">{a.action}</p>
                <p className="text-[12px] font-semibold text-white">
                  {CHECK_OPTIONS.find((c) => c.value === a.status)?.label ?? a.status}
                  {a.outcome_note ? ` · ${a.outcome_note}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={cardCn}>
        <SectionTitle>Agreed for the next review</SectionTitle>
        <ul className="divide-y divide-white/[0.1]">
          {actions.map((a) => (
            <li key={a.id} className="py-2.5">
              <p className="text-[14px] font-semibold text-white">{a.action}</p>
              <p className="text-[12px] text-white">
                {a.source === 'ai_draft_confirmed' && (
                  <>
                    <UsesAi className="mr-1.5" />
                    AI draft, confirmed ·{' '}
                  </>
                )}
                {OWNER_LABEL[a.owner_party]}
                {a.due_date ? ` · by ${fmtReviewDate(a.due_date)}` : ''}
                {a.status !== 'open'
                  ? ` · ${CHECK_OPTIONS.find((c) => c.value === a.status)?.label}`
                  : ''}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={cardCn}>
        <SectionTitle>The record at the time</SectionTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat
            label="Off-the-job"
            value={prefill.otj ? fmtHours(prefill.otj.counted_hours) : '—'}
          />
          <Stat
            label="Planned by then"
            value={
              prefill.otj?.planned_to_date_hours != null
                ? fmtHours(prefill.otj.planned_to_date_hours)
                : '—'
            }
          />
          <Stat
            label="Attendance"
            value={
              prefill.attendance_since?.percent != null
                ? `${prefill.attendance_since.percent}%`
                : '—'
            }
          />
          {prefill.learner.criteria?.total ? (
            <Stat
              label="Criteria passed"
              value={`${prefill.learner.criteria.passed} of ${prefill.learner.criteria.total}`}
            />
          ) : null}
        </div>
        {review.employer_input && (
          <div className={infoPanelCn}>
            <InputView input={review.employer_input} who="Employer's view" />
          </div>
        )}
        {review.learner_input && (
          <div className={infoPanelCn}>
            <InputView input={review.learner_input} who="Apprentice's view" />
          </div>
        )}
      </section>
    </>
  );
}

/** A first draft of the shared summary from what the tutor already wrote.
 *  Leaves out wellbeing and safeguarding (college only) and learning support
 *  unless the apprentice agreed the employer can know (para 40.5.2). */
function draftSummary(
  name: string,
  prefill: ReviewPrefill,
  o: ReviewOutcomes,
  actions: ReviewAction[],
  review: TripartiteReview
): string {
  const first = name.split(' ')[0];
  const parts: string[] = [];
  const otj = prefill.otj;
  if (otj) {
    const slip =
      otj.slippage_hours > 0
        ? `, ${fmtHours(otj.slippage_hours)} behind the plan to date`
        : ', on plan';
    parts.push(
      `${first} has ${fmtHours(otj.counted_hours)} of off-the-job training${otj.required_hours ? ` of ${fmtHours(otj.required_hours)}` : ''}${slip}.`
    );
  }
  if (o.otj_review?.trim()) parts.push(o.otj_review.trim());
  if (o.progress_notes?.trim()) parts.push(o.progress_notes.trim());
  if (o.training_notes?.trim()) parts.push(o.training_notes.trim());
  if (review.employer_input) {
    const p =
      review.employer_input.progress === 'behind'
        ? 'behind'
        : review.employer_input.progress === 'ahead'
          ? 'ahead'
          : 'on track';
    parts.push(`The employer sees ${first} as ${p} at work.`);
  }
  if (o.plan_change) {
    parts.push(
      o.plan_change === 'none'
        ? 'No change to the training plan.'
        : `Training plan: ${PLAN_CHANGE_LABEL[o.plan_change].toLowerCase()}${o.ilp_updates?.trim() ? `. ${o.ilp_updates.trim()}` : '.'}`
    );
  }
  if (o.concerns?.trim()) parts.push(`Concerns raised: ${o.concerns.trim()}`);
  if (o.learning_support?.employer_consent && o.learning_support.note?.trim()) {
    parts.push(`Learning support: ${o.learning_support.note.trim()}`);
  }
  if (actions.length) {
    parts.push(
      `Agreed: ${actions.map((a) => `${a.action} (${OWNER_LABEL[a.owner_party].toLowerCase()}${a.due_date ? `, by ${fmtReviewDate(a.due_date)}` : ''})`).join('; ')}.`
    );
  }
  return parts.join(' ');
}

/** The signed-off record as a PDFMonkey document for the evidence pack (ELE-2017). */
function ReviewPdfButton({ reviewId }: { reviewId: string }) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const download = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await downloadLearnerDocument({ kind: 'review_record', reviewId });
    } catch (e) {
      toast({
        title: 'Could not make the PDF',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };
  return (
    <button
      type="button"
      className={cn(buttonSecondaryCn, 'w-full')}
      onClick={download}
      disabled={busy}
    >
      {busy ? 'Making the PDF…' : 'Download the review record (PDF)'}
    </button>
  );
}
