import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkboxCn,
  checkRowCn,
  chipBase,
  chipOff,
  chipOnQuiet as chipOn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { Checkbox } from '@/components/ui/checkbox';
import { DictateButton } from '@/components/worker-tools/DictateButton';
import { LearnerPicker } from '@/components/college/observe/LearnerPicker';
import { CriteriaPicker, type PickedCriterion } from '@/components/college/observe/CriteriaPicker';
import {
  ObservationMedia,
  type ObservationFile,
} from '@/components/college/observe/ObservationMedia';
import type {
  ObservationKind,
  ObservationOutcome,
  ObservationLocationType,
} from '@/hooks/useCollegeObservations';

/* ==========================================================================
   RecordObservationSheet — observation and professional discussion as
   first-class evidence (ELE-1873), built for a phone in the workshop.

   Who → what you saw (dictated) → the criteria, ticked from the learner's own
   catalogue → photos, video or a recording → outcome and action points →
   Send. On a phone it is one column with Send in the thumb zone; on a desktop
   it is three columns. It autosaves as a draft while you write, and uploads
   media the moment it is taken, so a locked phone loses nothing.

   Send (save_college_observation) puts it in the learner's portfolio as
   evidence with "Observed by …", the criteria tied by the assessor, the
   content hash and an audit event, and alerts the learner to acknowledge it.
   Criteria are passed ONLY by a decision (record_ac_decisions, method
   observation / professional_discussion): here, if the assessor ticks
   "Pass these now", or later from Student 360 → Assess.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** college_students.id. Leave empty to pick the learner first. */
  studentId?: string | null;
  studentName?: string;
  onSaved?: () => void;
  kind?: ObservationKind;
  /** Carry on with a saved draft. */
  draftId?: string | null;
}

type Learner = { id: string; name: string; user_id: string | null };

interface FormState {
  id: string | null;
  kind: ObservationKind;
  activity_title: string;
  activity_summary: string;
  transcript: string;
  observed_at: string;
  duration_minutes: number | null;
  location_type: ObservationLocationType | '';
  location: string;
  criteria: PickedCriterion[];
  media: ObservationFile[];
  outcome: ObservationOutcome;
  feedback_strengths: string;
  feedback_areas: string;
  action_points_text: string;
  follow_up_required: boolean;
  follow_up_date: string;
  // Batch 2: questioning (kind = 'questioning').
  questions: QA[];
  question_mode: 'oral' | 'written';
  question_delivery: 'face_to_face' | 'remote';
}

type QA = { question: string; answer: string };
const blankQA = (): QA => ({ question: '', answer: '' });

const todayIso = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());

const blank = (kind: ObservationKind): FormState => ({
  id: null,
  kind,
  activity_title: '',
  activity_summary: '',
  transcript: '',
  observed_at: todayIso(),
  duration_minutes: null,
  location_type: kind === 'observation' ? 'workshop' : '',
  location: '',
  criteria: [],
  media: [],
  outcome: 'passed',
  feedback_strengths: '',
  feedback_areas: '',
  action_points_text: '',
  follow_up_required: false,
  follow_up_date: '',
  questions: kind === 'questioning' ? [blankQA()] : [],
  question_mode: 'oral',
  question_delivery: 'face_to_face',
});

const OUTCOMES: { value: ObservationOutcome; label: string }[] = [
  { value: 'passed', label: 'Competent' },
  { value: 'partial', label: 'Partly' },
  { value: 'not_yet', label: 'Not yet' },
];
const SETTINGS: { value: ObservationLocationType; label: string }[] = [
  { value: 'workshop', label: 'Workshop' },
  { value: 'employer_site', label: 'On site' },
  { value: 'classroom', label: 'Classroom' },
  { value: 'remote', label: 'Online' },
];
const DURATIONS = [15, 30, 45, 60, 90];

const lines = (s: string) =>
  s
    .split('\n')
    .map((t) => t.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);
const appendText = (prev: string, chunk: string) =>
  prev.trim() ? `${prev.trimEnd()} ${chunk}` : chunk;

type Rpc = (
  fn: string,
  args: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

export function RecordObservationSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  onSaved,
  kind: kindProp = 'observation',
  draftId = null,
}: Props) {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [learner, setLearner] = useState<Learner | null>(null);
  const [form, setForm] = useState<FormState>(() => blank(kindProp));
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [sending, setSending] = useState(false);
  const [passNow, setPassNow] = useState(false);
  const [sent, setSent] = useState<{
    itemId: string | null;
    passed: number;
    learnerJoined: boolean;
  } | null>(null);
  const dirty = useRef(false);
  const saveChain = useRef<Promise<string | null>>(Promise.resolve(null));
  const formRef = useRef(form);
  formRef.current = form;
  const learnerRef = useRef(learner);
  learnerRef.current = learner;

  /* ── Open: reset, preset the learner, or load a draft ─────────────── */
  useEffect(() => {
    if (!open) return;
    setForm(blank(kindProp));
    setSent(null);
    setPassNow(false);
    setSaveState('idle');
    dirty.current = false;
    saveChain.current = Promise.resolve(null);
    setLearner(null);
    let cancelled = false;
    (async () => {
      if (draftId) {
        const { data } = await supabase
          .from('college_observations')
          .select('*')
          .eq('id', draftId)
          .maybeSingle();
        const d = data as Record<string, unknown> | null;
        if (cancelled || !d) return;
        const { data: s } = await supabase
          .from('college_students')
          .select('id, name, user_id')
          .eq('id', d.college_student_id as string)
          .maybeSingle();
        if (cancelled) return;
        if (s)
          setLearner({
            id: s.id as string,
            name: (s.name as string) ?? 'Learner',
            user_id: (s.user_id as string) ?? null,
          });
        setForm({
          id: d.id as string,
          kind: (d.kind as ObservationKind) ?? 'observation',
          activity_title: (d.activity_title as string) ?? '',
          activity_summary: (d.activity_summary as string) ?? '',
          transcript: (d.transcript as string) ?? '',
          observed_at: (d.observed_at as string) ?? todayIso(),
          duration_minutes: (d.duration_minutes as number) ?? null,
          location_type: (d.location_type as ObservationLocationType) ?? '',
          location: (d.location as string) ?? '',
          criteria: Array.isArray(d.criteria) ? (d.criteria as PickedCriterion[]) : [],
          media: Array.isArray(d.media) ? (d.media as ObservationFile[]) : [],
          outcome: (d.outcome as ObservationOutcome) ?? 'passed',
          feedback_strengths: (d.feedback_strengths as string) ?? '',
          feedback_areas: (d.feedback_areas as string) ?? '',
          action_points_text: ((d.action_points as string[]) ?? []).join('\n'),
          follow_up_required: !!d.follow_up_required,
          follow_up_date: (d.follow_up_date as string) ?? '',
          questions:
            Array.isArray(d.questions) && (d.questions as QA[]).length
              ? (d.questions as QA[])
              : d.kind === 'questioning'
                ? [blankQA()]
                : [],
          question_mode: d.question_mode === 'written' ? 'written' : 'oral',
          question_delivery: d.question_delivery === 'remote' ? 'remote' : 'face_to_face',
        });
        return;
      }
      if (studentId) {
        const { data: s } = await supabase
          .from('college_students')
          .select('id, name, user_id')
          .eq('id', studentId)
          .maybeSingle();
        if (cancelled) return;
        setLearner({
          id: studentId,
          name: (s?.name as string) ?? studentName ?? 'Learner',
          user_id: (s?.user_id as string) ?? null,
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, studentId, studentName, kindProp, draftId]);

  const update = (patch: Partial<FormState>) => {
    dirty.current = true;
    setForm((p) => ({ ...p, ...patch }));
  };

  /* ── Draft autosave ────────────────────────────────────────────────── */
  const payload = (f: FormState, l: Learner) => ({
    id: f.id,
    college_student_id: l.id,
    kind: f.kind,
    activity_title: f.activity_title.trim(),
    activity_summary: f.activity_summary.trim(),
    transcript: f.transcript.trim(),
    observed_at: f.observed_at,
    duration_minutes: f.duration_minutes,
    location_type: f.location_type || null,
    location: f.location.trim(),
    criteria: f.criteria,
    media: f.media,
    outcome: f.outcome,
    feedback_strengths: f.feedback_strengths.trim(),
    feedback_areas: f.feedback_areas.trim(),
    action_points: lines(f.action_points_text),
    follow_up_required: f.follow_up_required,
    follow_up_date: f.follow_up_required ? f.follow_up_date || null : null,
    ...(f.kind === 'questioning'
      ? {
          questions: f.questions
            .map((q) => ({ question: q.question.trim(), answer: q.answer.trim() }))
            .filter((q) => q.question),
          question_mode: f.question_mode,
          question_delivery: f.question_delivery,
        }
      : {}),
  });

  /** Queue a save; each waits for the last so the id from the first insert is reused. */
  const saveDraft = useCallback((send = false): Promise<string | null> => {
    const run = async (): Promise<string | null> => {
      const l = learnerRef.current;
      const f = formRef.current;
      if (!l || !f.activity_title.trim()) return f.id;
      const { data, error } = await rpc('save_college_observation', {
        p: payload(f, l),
        p_send: send,
      });
      if (error) throw new Error(error.message);
      const res = (data ?? {}) as {
        id?: string;
        portfolio_item_id?: string | null;
        learner_joined?: boolean;
      };
      if (res.id && !formRef.current.id) {
        formRef.current = { ...formRef.current, id: res.id };
        setForm((p) => ({ ...p, id: res.id ?? p.id }));
      }
      if (send) {
        setSent({
          itemId: res.portfolio_item_id ?? null,
          passed: 0,
          learnerJoined: !!res.learner_joined,
        });
      }
      return send ? (res.portfolio_item_id ?? null) : (res.id ?? null);
    };
    const next = saveChain.current.catch(() => null).then(run);
    saveChain.current = next;
    return next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open || !learner || sent || !form.activity_title.trim() || !dirty.current) return;
    const t = window.setTimeout(() => {
      dirty.current = false;
      setSaveState('saving');
      saveDraft(false)
        .then(() => setSaveState('saved'))
        .catch(() => setSaveState('error'));
    }, 2500);
    return () => window.clearTimeout(t);
  }, [form, learner, open, sent, saveDraft]);

  /* ── Recent activity titles: one tap for the jobs you watch every week ─ */
  const { data: recentTitles = [] } = useQuery({
    queryKey: ['obs-recent-titles', user?.id, form.kind],
    enabled: open && !!user?.id,
    staleTime: 300_000,
    queryFn: async () => {
      const { data } = await supabase
        .from('college_observations')
        .select('activity_title')
        .eq('created_by', user!.id)
        .eq('kind' as never, form.kind as never)
        .order('created_at', { ascending: false })
        .limit(40);
      const seen = new Set<string>();
      return ((data ?? []) as { activity_title: string }[])
        .map((r) => r.activity_title?.trim())
        .filter(
          (t): t is string => !!t && !seen.has(t.toLowerCase()) && !!seen.add(t.toLowerCase())
        )
        .slice(0, 6);
    },
  });

  /* ── Send ──────────────────────────────────────────────────────────── */
  const first = learner?.name.split(' ')[0] || 'the learner';
  const isDiscussion = form.kind === 'professional_discussion';
  const isQuestioning = form.kind === 'questioning';
  const kindName = isQuestioning
    ? 'Questioning'
    : isDiscussion
      ? 'Professional discussion'
      : 'Observation';
  const answered = form.questions.some((q) => q.question.trim() && q.answer.trim());
  const joined = !!learner?.user_id;
  const missing = !learner
    ? 'Pick a learner'
    : !form.activity_title.trim()
      ? isQuestioning
        ? 'Add what you asked about'
        : isDiscussion
          ? 'Add what you discussed'
          : 'Add what they did'
      : isQuestioning && !answered
        ? 'Add a question and their answer'
        : joined && form.criteria.length === 0
          ? isQuestioning
            ? 'Tick the criteria covered'
            : isDiscussion
              ? 'Tick the criteria discussed'
              : 'Tick the criteria you saw'
          : form.follow_up_required && !form.follow_up_date
            ? 'Set the follow-up date'
            : form.observed_at > todayIso()
              ? 'The date is in the future'
              : null;

  const send = async () => {
    if (missing || !learner) {
      if (missing) toast({ title: missing });
      return;
    }
    setSending(true);
    try {
      const itemId = await saveDraft(true);
      let passed = 0;
      if (passNow && itemId && joined && form.outcome === 'passed' && form.criteria.length > 0) {
        const { error } = await rpc('record_ac_decisions', {
          p_learner_id: learner.user_id,
          p_criteria: form.criteria,
          p_decision: 'passed',
          p_feedback:
            form.feedback_strengths.trim() ||
            `${isQuestioning ? 'Questioned' : isDiscussion ? 'Discussed' : 'Observed'}: ${form.activity_title.trim()}`,
          p_evidence_item_ids: [itemId],
          p_submission_id: null,
          p_method: form.kind,
          p_feedback_source: 'assessor',
        });
        if (error) {
          toast({
            title: 'Sent, but the decision did not save',
            description: `${error.message}. Record it from Assess.`,
            variant: 'destructive',
          });
        } else {
          passed = form.criteria.length;
        }
      }
      setSent({ itemId, passed, learnerJoined: joined });
      window.dispatchEvent(new Event('elecmate:portfolio-changed'));
      onSaved?.();
    } catch (e) {
      toast({ title: 'Not sent', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const close = () => {
    // Keep what was written as a draft (it is already autosaved once it has a title).
    if (!sent && dirty.current && learner && form.activity_title.trim()) {
      void saveDraft(false)
        .then(() => onSaved?.())
        .catch(() => undefined);
    }
    onOpenChange(false);
  };

  const goDecide = () => {
    if (!learner || !sent?.itemId) return;
    onOpenChange(false);
    navigate(`/college?section=student360&studentId=${learner.id}&focus=${sent.itemId}#assess`);
  };

  /* ── Render ────────────────────────────────────────────────────────── */
  const kindSwitch = (
    // One joined control, like the register's morning/afternoon (10 Oct: two
    // full-width buttons, one solid yellow, shouted over the learner list).
    <div className="py-2.5">
      <div
        className="inline-flex w-full rounded-xl border border-white/[0.12] bg-white/[0.03] p-0.5 sm:w-auto"
        role="radiogroup"
        aria-label="What are you recording?"
      >
        {(['observation', 'professional_discussion', 'questioning'] as ObservationKind[]).map(
          (k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={form.kind === k}
              disabled={!!form.id || !!sent}
              onClick={() =>
                update({
                  kind: k,
                  location_type:
                    k === 'observation' ? form.location_type || 'workshop' : form.location_type,
                  questions:
                    k === 'questioning' && form.questions.length === 0
                      ? [blankQA()]
                      : form.questions,
                })
              }
              className={cn(
                'h-11 flex-1 rounded-[10px] px-3 text-[13.5px] font-semibold transition-colors touch-manipulation sm:flex-none sm:px-4',
                form.kind === k ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]',
                (form.id || sent) && form.kind !== k && 'opacity-40'
              )}
            >
              {k === 'observation' ? (
                'Observation'
              ) : k === 'questioning' ? (
                <>
                  <span className="sm:hidden">Questions</span>
                  <span className="hidden sm:inline">Questioning</span>
                </>
              ) : (
                <>
                  <span className="sm:hidden">Discussion</span>
                  <span className="hidden sm:inline">Professional discussion</span>
                </>
              )}
            </button>
          )
        )}
      </div>
    </div>
  );

  const saveWord =
    saveState === 'saving' ? (
      <span className="flex items-center gap-1.5 text-[12px] text-white">
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> Saving
      </span>
    ) : saveState === 'saved' ? (
      <span className="text-[12px] text-white">Draft saved</span>
    ) : saveState === 'error' ? (
      <span className="text-[12px] text-orange-300">Not saved</span>
    ) : null;

  // 1. Sent
  if (sent) {
    return (
      <FormSheet
        open={open}
        onOpenChange={(o) => (o ? null : onOpenChange(false))}
        width="wide"
        eyebrow={kindName}
        title={`Sent to ${first}`}
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" className={buttonSecondaryCn} onClick={() => onOpenChange(false)}>
              Done
            </button>
            {sent.itemId && sent.passed === 0 ? (
              <button type="button" className={buttonPrimaryCn} onClick={goDecide}>
                Record a decision
              </button>
            ) : (
              <button
                type="button"
                className={buttonPrimaryCn}
                onClick={() => {
                  setSent(null);
                  setForm(blank(form.kind));
                  setLearner(studentId ? learner : null);
                  setPassNow(false);
                  dirty.current = false;
                }}
              >
                Record another
              </button>
            )}
          </div>
        }
      >
        <div className="flex flex-col items-center py-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-black">
            <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
          </span>
          <p className="mt-5 max-w-md text-[16px] font-semibold text-white">
            {sent.learnerJoined
              ? `It is in ${first}'s portfolio as evidence, marked "${isQuestioning ? 'Questioned by' : isDiscussion ? 'Discussed with' : 'Observed by'}" you.`
              : `Saved and signed on ${first}'s college record.`}
          </p>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white">
            {sent.learnerJoined
              ? `${first} has been asked to read and acknowledge it. ${
                  sent.passed > 0
                    ? `You passed ${sent.passed} ${sent.passed === 1 ? 'criterion' : 'criteria'}; ${first} sees that too.`
                    : 'The criteria are waiting in Assess, ready for your decision.'
                }`
              : `${first} has not joined Elec-Mate yet, so it cannot go into their portfolio. Send them the cohort join code.`}
          </p>
        </div>
      </FormSheet>
    );
  }

  // 2. Pick the learner
  if (!learner) {
    return (
      <FormSheet
        open={open}
        onOpenChange={(o) => (o ? null : close())}
        width="wide"
        eyebrow={kindName}
        title="Who are you assessing?"
        subheader={kindSwitch}
      >
        {studentId || draftId ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" aria-label="Loading" />
          </div>
        ) : (
          <div className="w-full">
            <LearnerPicker
              autoFocus={false}
              onPick={(l) => setLearner({ id: l.id, name: l.name, user_id: l.user_id })}
            />
          </div>
        )}
      </FormSheet>
    );
  }

  // 3. The record
  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => (o ? null : close())}
      width="wide"
      eyebrow={`${kindName} · ${learner.name}`}
      title={
        isQuestioning ? 'What you asked' : isDiscussion ? 'What you discussed' : 'What you saw'
      }
      subheader={
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">{kindSwitch}</div>
          {!studentId && !form.id ? (
            <button
              type="button"
              onClick={() => setLearner(null)}
              className="h-11 shrink-0 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              Change learner
            </button>
          ) : (
            saveWord && <span className="shrink-0">{saveWord}</span>
          )}
        </div>
      }
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-3"
      footer={
        <div className="grid grid-cols-[auto_1fr] gap-2.5">
          <button type="button" onClick={close} className={cn(buttonSecondaryCn, 'px-5')}>
            {form.activity_title.trim() ? 'Later' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={() => void send()}
            disabled={sending || !!missing}
            className={buttonPrimaryCn}
          >
            {sending ? 'Sending…' : (missing ?? `Send to ${first}`)}
          </button>
        </div>
      }
    >
      {/* ── 1. What happened ── */}
      <div className="space-y-7">
        <Block title={isDiscussion || isQuestioning ? 'Topic' : 'Activity'}>
          <div>
            <label htmlFor="ro-title" className={labelCn}>
              {isQuestioning
                ? 'What you asked about'
                : isDiscussion
                  ? 'What you discussed'
                  : 'What they did'}
            </label>
            <input
              id="ro-title"
              value={form.activity_title}
              onChange={(e) => update({ activity_title: e.target.value })}
              className={inputCn}
              placeholder={
                isQuestioning
                  ? 'e.g. Proving dead and the order of tests'
                  : isDiscussion
                    ? 'e.g. Safe isolation and why each step matters'
                    : 'e.g. Wired and tested a ring final circuit'
              }
              enterKeyHint="next"
            />
          </div>
          {recentTitles.length > 0 && !form.activity_title.trim() && (
            <div className="flex flex-wrap gap-2">
              {recentTitles.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => update({ activity_title: t })}
                  className="h-11 max-w-full truncate rounded-full border border-white/[0.14] bg-white/[0.05] px-3.5 text-[13px] text-white touch-manipulation"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            <div>
              <label htmlFor="ro-date" className={labelCn}>
                Date
              </label>
              <input
                id="ro-date"
                type="date"
                value={form.observed_at}
                max={todayIso()}
                onChange={(e) => update({ observed_at: e.target.value })}
                className={inputCn}
              />
            </div>
            <div>
              <label htmlFor="ro-where" className={labelCn}>
                Where
              </label>
              <input
                id="ro-where"
                value={form.location}
                onChange={(e) => update({ location: e.target.value })}
                className={inputCn}
                placeholder="Bay 3"
              />
            </div>
          </div>
          {!isQuestioning && (
            <ChipRow label="Setting">
              {SETTINGS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  aria-pressed={form.location_type === s.value}
                  onClick={() =>
                    update({ location_type: form.location_type === s.value ? '' : s.value })
                  }
                  className={cn(
                    chipBase,
                    'px-3.5',
                    form.location_type === s.value ? chipOn : chipOff
                  )}
                >
                  {s.label}
                </button>
              ))}
            </ChipRow>
          )}
          {isQuestioning && (
            <>
              <JoinedToggle
                label="How you asked"
                value={form.question_mode}
                options={[
                  ['oral', 'Oral'],
                  ['written', 'Written'],
                ]}
                onChange={(v) => update({ question_mode: v as FormState['question_mode'] })}
              />
              <JoinedToggle
                label="Face to face or remote"
                value={form.question_delivery}
                options={[
                  ['face_to_face', 'Face to face'],
                  ['remote', 'Remote'],
                ]}
                onChange={(v) => update({ question_delivery: v as FormState['question_delivery'] })}
              />
            </>
          )}
          <ChipRow label="How long (minutes)">
            {DURATIONS.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={form.duration_minutes === m}
                onClick={() => update({ duration_minutes: form.duration_minutes === m ? null : m })}
                className={cn(
                  chipBase,
                  'min-w-[52px] px-3 tabular-nums',
                  form.duration_minutes === m ? chipOn : chipOff
                )}
              >
                {m}
              </button>
            ))}
          </ChipRow>
        </Block>

        {isQuestioning ? (
          <Block title="Questions and answers">
            <ol className="space-y-5">
              {form.questions.map((q, i) => (
                <li key={i} className="space-y-3 border-l border-white/[0.18] pl-3">
                  <div className="flex items-end justify-between gap-3">
                    <label htmlFor={`ro-q-${i}`} className={cn(labelCn, 'mb-0')}>
                      Question {i + 1}
                    </label>
                    {form.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          update({ questions: form.questions.filter((_, j) => j !== i) })
                        }
                        className="h-11 shrink-0 px-1 text-[13px] font-semibold text-white touch-manipulation"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <textarea
                    id={`ro-q-${i}`}
                    value={q.question}
                    onChange={(e) =>
                      update({
                        questions: form.questions.map((x, j) =>
                          j === i ? { ...x, question: e.target.value } : x
                        ),
                      })
                    }
                    rows={2}
                    className={cn(textareaCn, 'min-h-[60px]')}
                    placeholder="e.g. Why do you prove the tester before and after?"
                    autoCapitalize="sentences"
                  />
                  <NarrativeField
                    id={`ro-a-${i}`}
                    label="Their answer, summarised"
                    value={q.answer}
                    onChange={(v) =>
                      update({
                        questions: form.questions.map((x, j) =>
                          j === i ? { ...x, answer: v } : x
                        ),
                      })
                    }
                    placeholder="What they said, in their words where it matters."
                    rows={3}
                  />
                </li>
              ))}
            </ol>
            {form.questions.length < 40 && (
              <button
                type="button"
                onClick={() => update({ questions: [...form.questions, blankQA()] })}
                className={cn(buttonSecondaryCn, 'w-full sm:w-auto')}
              >
                Add a question
              </button>
            )}
          </Block>
        ) : isDiscussion ? (
          <Block title="The discussion">
            {joined && (
              <ObservationMedia
                learnerUserId={learner.user_id as string}
                files={form.media}
                onChange={(media) => update({ media })}
                recorderLabel="Record the discussion"
                showRecorderFirst
                onTranscript={(chunk) =>
                  setForm((p) => ({ ...p, transcript: appendText(p.transcript, chunk) }))
                }
                observationId={form.id}
                onServerTranscript={(text) => {
                  dirty.current = true;
                  setForm((p) => ({ ...p, transcript: appendText(p.transcript, text) }));
                }}
              />
            )}
            <div>
              <label htmlFor="ro-transcript" className={labelCn}>
                Transcript
              </label>
              <textarea
                id="ro-transcript"
                value={form.transcript}
                onChange={(e) => update({ transcript: e.target.value })}
                rows={6}
                className={cn(textareaCn, 'min-h-[140px]')}
                placeholder="Fills in as you record where your phone can transcribe, or tap Transcribe on the recording. Tidy it up or type the key answers."
              />
            </div>
            <NarrativeField
              id="ro-summary"
              label="Summary of the answers"
              value={form.activity_summary}
              onChange={(v) => update({ activity_summary: v })}
              placeholder="What they explained well, in their words and yours."
            />
          </Block>
        ) : (
          <Block title="What you saw">
            <NarrativeField
              id="ro-summary"
              label="Narrative"
              value={form.activity_summary}
              onChange={(v) => update({ activity_summary: v })}
              placeholder="Step by step what they did: isolation, tools, tests, how they dealt with problems. Tap Speak and talk it through."
              rows={7}
            />
          </Block>
        )}
      </div>

      {/* ── 2. Criteria ── */}
      <div className="space-y-7 border-t border-white/[0.1] pt-6 lg:border-t-0 lg:pt-0">
        <Block
          title={
            isQuestioning
              ? 'Criteria the questions covered'
              : isDiscussion
                ? 'Criteria discussed'
                : 'Criteria you saw'
          }
        >
          {joined ? (
            <CriteriaPicker
              learnerUserId={learner.user_id as string}
              value={form.criteria}
              onChange={(criteria) => update({ criteria })}
              verb={isQuestioning ? 'asked about' : isDiscussion ? 'discussed' : 'saw'}
            />
          ) : (
            <p className="rounded-2xl border border-dashed border-white/[0.2] p-4 text-[13px] leading-relaxed text-white">
              {first} has not joined Elec-Mate yet, so their criteria are not linked. You can still
              record and sign this on the college record. Send them the cohort join code so it
              counts as evidence next time.
            </p>
          )}
        </Block>
      </div>

      {/* ── 3. Evidence and outcome ── */}
      <div className="space-y-7 border-t border-white/[0.1] pt-6 lg:border-t-0 lg:pt-0">
        {!isDiscussion && joined && (
          <Block title="Photos, video, voice note">
            <ObservationMedia
              learnerUserId={learner.user_id as string}
              files={form.media}
              onChange={(media) => update({ media })}
              observationId={form.id}
              onServerTranscript={(text) => {
                dirty.current = true;
                setForm((p) => ({ ...p, transcript: appendText(p.transcript, text) }));
              }}
            />
            {form.transcript.trim() !== '' && (
              <div>
                <label htmlFor="ro-obs-transcript" className={labelCn}>
                  Transcript
                </label>
                <textarea
                  id="ro-obs-transcript"
                  value={form.transcript}
                  onChange={(e) => update({ transcript: e.target.value })}
                  rows={5}
                  className={cn(textareaCn, 'min-h-[120px]')}
                />
              </div>
            )}
          </Block>
        )}

        <Block title="Outcome">
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Outcome">
            {OUTCOMES.map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={form.outcome === o.value}
                onClick={() => update({ outcome: o.value })}
                className={cn(chipBase, 'px-2', form.outcome === o.value ? chipOn : chipOff)}
              >
                {o.label}
              </button>
            ))}
          </div>
          {joined && form.outcome === 'passed' && form.criteria.length > 0 && (
            <label className={checkRowCn}>
              <Checkbox
                checked={passNow}
                onCheckedChange={(v) => setPassNow(v === true)}
                className={checkboxCn}
              />
              <span className="text-[14px] text-white">
                Pass the {form.criteria.length} ticked{' '}
                {form.criteria.length === 1 ? 'criterion' : 'criteria'} now
                <span className="mt-0.5 block text-[12px] leading-snug text-white">
                  Records your assessment decision, method{' '}
                  {isQuestioning
                    ? 'questioning'
                    : isDiscussion
                      ? 'professional discussion'
                      : 'observation'}
                  . Leave it and decide later from Assess.
                </span>
              </span>
            </label>
          )}
          <NarrativeField
            id="ro-strengths"
            label="What went well"
            value={form.feedback_strengths}
            onChange={(v) => update({ feedback_strengths: v })}
            placeholder="Be specific, it is what they read first."
            rows={3}
          />
          <NarrativeField
            id="ro-areas"
            label="To work on"
            value={form.feedback_areas}
            onChange={(v) => update({ feedback_areas: v })}
            placeholder="What needs to improve before next time."
            rows={3}
          />
          <NarrativeField
            id="ro-actions"
            label="Action points, one per line"
            value={form.action_points_text}
            onChange={(v) => update({ action_points_text: v })}
            placeholder={'Label the board\nRe-read Regulation 643.2'}
            rows={3}
            joinWith={'\n'}
          />
          <label className={checkRowCn}>
            <Checkbox
              checked={form.follow_up_required}
              onCheckedChange={(v) => update({ follow_up_required: v === true })}
              className={checkboxCn}
            />
            <span className="text-[14px] text-white">Book a follow-up</span>
          </label>
          {form.follow_up_required && (
            <div>
              <label htmlFor="ro-followup" className={labelCn}>
                Follow-up date
              </label>
              <input
                id="ro-followup"
                type="date"
                value={form.follow_up_date}
                min={todayIso()}
                onChange={(e) => update({ follow_up_date: e.target.value })}
                className={inputCn}
              />
            </div>
          )}
        </Block>
      </div>
    </FormSheet>
  );
}

/* ── Pieces ──────────────────────────────────────────────────────────── */

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
      {children}
    </section>
  );
}

/** A choice of two, as one joined control (the register's morning/afternoon). */
function JoinedToggle({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className={labelCn}>{label}</span>
      <div
        role="radiogroup"
        aria-label={label}
        className="inline-flex w-full rounded-xl border border-white/[0.12] bg-white/[0.03] p-0.5 sm:w-auto"
      >
        {options.map(([v, l]) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            onClick={() => onChange(v)}
            className={cn(
              'h-11 flex-1 rounded-[10px] px-4 text-[13.5px] font-semibold touch-manipulation sm:flex-none',
              value === v ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]'
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChipRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className={labelCn}>{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

/** A textarea you can talk into: dictated phrases are appended. */
function NarrativeField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  joinWith = ' ',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  joinWith?: string;
}) {
  const valueRef = useRef(value);
  valueRef.current = value;
  return (
    <div>
      <div className="mb-1 flex items-end justify-between gap-3">
        <label htmlFor={id} className={cn(labelCn, 'mb-0 pb-1')}>
          {label}
        </label>
        <DictateButton
          className="-mb-1 h-11 shrink-0 px-3 text-[13px]"
          onText={(chunk) => {
            const prev = valueRef.current;
            const text = chunk.charAt(0).toUpperCase() + chunk.slice(1);
            onChange(prev.trim() ? `${prev.trimEnd()}${joinWith}${text}` : text);
          }}
        />
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={textareaCn}
        placeholder={placeholder}
        autoCapitalize="sentences"
      />
    </div>
  );
}

export default RecordObservationSheet;
