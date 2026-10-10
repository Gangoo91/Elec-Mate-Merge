/**
 * IqaQualityRecords — three more tabs on /college/iqa (batch 2, 10 Oct 2026):
 *
 *   Strategy   the written IQA sampling strategy, per college or per
 *              qualification, versioned (college_iqa_strategies, append-only),
 *              shown with the sampling % plans it sits beside.
 *   Practice   the IQA observing an ASSESSOR at work: date, assessor,
 *              learner, activity, findings, actions
 *              (college_iqa_practice_observations, append-only).
 *   CPD        assessors' and IQAs' CPD (the existing staff_cpd_entries and
 *              LogCpdSheet), read across the college.
 *
 * IQA staff write (college_can 'iqa.sample'); EQA read only; RLS decides.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { CollegeEmpty } from '@/components/college/ui/CollegeUi';
import {
  QBTN as COLLEGE_BTN,
  QBTN_PRIMARY as COLLEGE_BTN_PRIMARY,
  QCARD,
  QLIST,
} from '@/components/college/quality/QualityHubKit';
import { LogCpdSheet } from '@/components/college/sheets/LogCpdSheet';
import type { IqaSamplingPlan } from '@/hooks/useIqaSamplingPlans';

const todayIso = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
const fmt = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

/**
 * Staff and learners at the college, read directly: /college/iqa sits outside
 * the College Hub provider, so its context lists are empty here.
 */
interface Person {
  id: string;
  user_id?: string | null;
  name: string;
  role?: string | null;
  archived_at?: string | null;
  status?: string | null;
}
function useCollegePeople(collegeId: string | null) {
  const [staff, setStaff] = useState<Person[]>([]);
  const [students, setStudents] = useState<Person[]>([]);
  useEffect(() => {
    if (!collegeId) return;
    let live = true;
    void Promise.all([
      supabase
        .from('college_staff')
        .select('id, name, role, archived_at, user_id')
        .eq('college_id', collegeId)
        .order('name'),
      supabase
        .from('college_students')
        .select('id, name, status')
        .eq('college_id', collegeId)
        .order('name')
        .limit(2000),
    ]).then(([st, sd]) => {
      if (!live) return;
      setStaff((st.data ?? []) as Person[]);
      setStudents((sd.data ?? []) as Person[]);
    });
    return () => {
      live = false;
    };
  }, [collegeId]);
  return { staff, students };
}

/** A small day block ("Wed / 14"), as on the College Hub home. */
function DayBlock({ iso }: { iso: string }) {
  const d = new Date(iso);
  return (
    <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-white/[0.14] text-white">
      <span className="text-[11px] font-medium leading-none">
        {d.toLocaleDateString('en-GB', { weekday: 'short' })}
      </span>
      <span className="mt-1 text-[17px] font-bold leading-none tabular-nums">{d.getDate()}</span>
    </span>
  );
}

/* ═══════════════════════════════ Strategy ═══════════════════════════════ */

export interface IqaStrategy {
  id: string;
  college_id: string;
  qualification_code: string | null;
  title: string;
  body: string;
  version: number;
  effective_from: string;
  author_name: string | null;
  created_at: string;
}

export function useIqaStrategies(collegeId: string | null) {
  const [rows, setRows] = useState<IqaStrategy[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    if (!collegeId) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('college_iqa_strategies' as never)
      .select(
        'id, college_id, qualification_code, title, body, version, effective_from, author_name, created_at'
      )
      .eq('college_id', collegeId)
      .order('version', { ascending: false })
      .limit(200);
    setRows((data ?? []) as unknown as IqaStrategy[]);
    setLoading(false);
  }, [collegeId]);
  useEffect(() => {
    void load();
  }, [load]);
  const add = useCallback(
    async (v: {
      qualification_code: string | null;
      title: string;
      body: string;
      effective_from: string;
    }) => {
      if (!collegeId) throw new Error('No college');
      const { error } = await supabase
        .from('college_iqa_strategies' as never)
        .insert({ college_id: collegeId, ...v } as never);
      if (error) throw new Error(error.message);
      await load();
    },
    [collegeId, load]
  );
  return { rows, loading, add, refresh: load };
}

export function StrategyTab({
  collegeId,
  plans,
  canWrite,
}: {
  collegeId: string | null;
  plans: IqaSamplingPlan[];
  canWrite: boolean;
}) {
  const { rows, loading, add } = useIqaStrategies(collegeId);
  const [editing, setEditing] = useState<{
    qualification_code: string | null;
    from?: IqaStrategy;
  } | null>(null);
  const [openHistory, setOpenHistory] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // The latest version per qualification ("" = the whole college).
  const groups = useMemo(() => {
    const m = new Map<string, IqaStrategy[]>();
    for (const r of rows) {
      const k = r.qualification_code ?? '';
      m.set(k, [...(m.get(k) ?? []), r]);
    }
    return [...m.entries()]
      .map(([k, list]) => ({ key: k, current: list[0], earlier: list.slice(1) }))
      .sort((a, b) => (a.key === '' ? -1 : b.key === '' ? 1 : a.key.localeCompare(b.key)));
  }, [rows]);

  const plansFor = (q: string) =>
    plans.filter((p) =>
      q === '' ? true : (p.qualification_code ?? '') === q || !p.qualification_code
    );

  if (loading && rows.length === 0) {
    return <div className={cn(QCARD, 'h-40 animate-pulse')} aria-label="Loading" />;
  }

  return (
    <div className="space-y-4">
      {groups.length === 0 ? (
        <CollegeEmpty
          title="No written sampling strategy yet"
          body="Write down how you sample: who, how much (the % in each plan), which methods and units, new and trainee assessors, and how often. The EQA asks to see it. Every change is kept as a new version."
          action={
            canWrite ? (
              <button
                type="button"
                className={COLLEGE_BTN_PRIMARY}
                onClick={() => setEditing({ qualification_code: null })}
              >
                Write the strategy
              </button>
            ) : undefined
          }
        />
      ) : (
        <>
          {canWrite && (
            <div className="flex flex-wrap gap-2">
              {!groups.some((g) => g.key === '') && (
                <button
                  type="button"
                  className={COLLEGE_BTN_PRIMARY}
                  onClick={() => setEditing({ qualification_code: null })}
                >
                  Write the college strategy
                </button>
              )}
              <button
                type="button"
                className={COLLEGE_BTN}
                onClick={() => setEditing({ qualification_code: '' })}
              >
                Add one for a qualification
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4">
            {groups.map((g) => {
              const c = g.current;
              const long = c.body.length > 600;
              const isOpen = expanded.has(c.id);
              const ps = plansFor(g.key);
              return (
                <article
                  key={g.key || 'all'}
                  className={cn(
                    QCARD,
                    'grid grid-cols-1 items-start gap-x-10 gap-y-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'
                  )}
                  data-testid="iqa-strategy"
                >
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-medium text-white">
                          {g.key ? `Qualification ${g.key}` : 'Whole college'}
                        </p>
                        <h3 className="text-[16px] font-semibold leading-snug text-white">
                          {c.title}
                        </h3>
                        <p className="mt-0.5 text-[12.5px] text-white">
                          Version {c.version} · in force from {fmt(c.effective_from)} ·{' '}
                          {c.author_name ?? 'IQA'}
                        </p>
                      </div>
                      {canWrite && (
                        <button
                          type="button"
                          className={COLLEGE_BTN}
                          onClick={() =>
                            setEditing({ qualification_code: c.qualification_code, from: c })
                          }
                        >
                          New version
                        </button>
                      )}
                    </div>
                    <p
                      className={cn(
                        'whitespace-pre-line text-[14px] leading-relaxed text-white',
                        long && !isOpen && 'line-clamp-[8]'
                      )}
                    >
                      {c.body}
                    </p>
                    {long && (
                      <button
                        type="button"
                        className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                        onClick={() =>
                          setExpanded((p) => {
                            const n = new Set(p);
                            if (n.has(c.id)) n.delete(c.id);
                            else n.add(c.id);
                            return n;
                          })
                        }
                      >
                        {isOpen ? 'Show less' : 'Read all of it'}
                      </button>
                    )}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="border-t border-white/[0.08] pt-3 lg:border-t-0 lg:pt-0">
                      <p className="text-[13px] font-semibold text-white">
                        Sampling plans alongside it
                      </p>
                      {ps.length === 0 ? (
                        <p className="mt-1 text-[13px] text-white">No sampling plans set yet.</p>
                      ) : (
                        <ul className="mt-1.5 space-y-1">
                          {ps.slice(0, 6).map((p) => (
                            <li
                              key={p.id}
                              className="flex items-baseline justify-between gap-3 text-[13px] text-white"
                            >
                              <span className="min-w-0">
                                {p.qualification_code ?? 'All qualifications'}
                                {p.unit_code ? ` · ${p.unit_code}` : ''} · {fmt(p.period_start)} to{' '}
                                {fmt(p.period_end)}
                              </span>
                              <span className="shrink-0 font-semibold tabular-nums">
                                {p.target_sample_percent ?? 0}%
                              </span>
                            </li>
                          ))}
                          {ps.length > 6 && (
                            <li className="text-[12.5px] text-white">
                              and {ps.length - 6} more plans
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                    {g.earlier.length > 0 && (
                      <div className="border-t border-white/[0.08] pt-2">
                        <button
                          type="button"
                          aria-expanded={openHistory === g.key}
                          onClick={() => setOpenHistory(openHistory === g.key ? null : g.key)}
                          className="flex h-11 w-full items-center justify-between text-[13px] font-semibold text-white touch-manipulation"
                        >
                          {g.earlier.length} earlier version{g.earlier.length === 1 ? '' : 's'}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform',
                              openHistory === g.key && 'rotate-180'
                            )}
                            strokeWidth={1.5}
                          />
                        </button>
                        {openHistory === g.key && (
                          <ol className="space-y-3 pb-1">
                            {g.earlier.map((e) => (
                              <li key={e.id} className="border-l border-white/[0.18] pl-3">
                                <p className="text-[13px] font-semibold text-white">
                                  Version {e.version}: {e.title}
                                </p>
                                <p className="text-[12px] text-white">
                                  From {fmt(e.effective_from)} · {e.author_name ?? 'IQA'} · read
                                  only
                                </p>
                                <p className="mt-1 line-clamp-4 whitespace-pre-line text-[13px] text-white">
                                  {e.body}
                                </p>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
      <StrategySheet
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        start={editing}
        qualificationOptions={[
          ...new Set(plans.map((p) => p.qualification_code).filter((q): q is string => !!q)),
        ]}
        onSave={add}
      />
    </div>
  );
}

function StrategySheet({
  open,
  onOpenChange,
  start,
  qualificationOptions,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  start: { qualification_code: string | null; from?: IqaStrategy } | null;
  qualificationOptions: string[];
  onSave: (v: {
    qualification_code: string | null;
    title: string;
    body: string;
    effective_from: string;
  }) => Promise<void>;
}) {
  const { toast } = useToast();
  const [q, setQ] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [from, setFrom] = useState(todayIso());
  const [saving, setSaving] = useState(false);
  const askQual = start?.qualification_code === '';
  useEffect(() => {
    if (!open) return;
    setQ(start?.qualification_code ?? '');
    setTitle(start?.from?.title ?? 'IQA sampling strategy');
    setBody(start?.from?.body ?? '');
    setFrom(todayIso());
  }, [open, start]);
  const save = async () => {
    if (!title.trim() || !body.trim() || saving) return;
    setSaving(true);
    try {
      await onSave({
        qualification_code: q.trim() || null,
        title: title.trim(),
        body: body.trim(),
        effective_from: from,
      });
      toast({
        title: 'Strategy saved',
        description: 'Kept as a new version. Earlier versions stay readable.',
      });
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="IQA · Sampling strategy"
      title={start?.from ? `New version of “${start.from.title}”` : 'Write the sampling strategy'}
      description="Saved as a new version with today's date. Nothing earlier is overwritten."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
      footer={
        <div className="grid grid-cols-[auto_1fr] gap-2.5">
          <button
            type="button"
            className={cn(buttonSecondaryCn, 'px-5')}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={buttonPrimaryCn}
            disabled={!title.trim() || !body.trim() || saving}
            onClick={() => void save()}
          >
            {saving ? 'Saving…' : 'Save this version'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        {askQual && (
          <div>
            <label htmlFor="cis-q" className={labelCn}>
              Qualification code
            </label>
            <input
              id="cis-q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              list="cis-q-list"
              className={inputCn}
              placeholder="e.g. 5357"
            />
            <datalist id="cis-q-list">
              {qualificationOptions.map((o) => (
                <option key={o} value={o} />
              ))}
            </datalist>
          </div>
        )}
        <div>
          <label htmlFor="cis-title" className={labelCn}>
            Title
          </label>
          <input
            id="cis-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputCn}
          />
        </div>
        <div>
          <label htmlFor="cis-from" className={labelCn}>
            In force from
          </label>
          <input
            id="cis-from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={inputCn}
          />
        </div>
        <p className="text-[13px] leading-relaxed text-white">
          The sampling percentage for each assessor and unit stays in the sampling plans. This is
          the reasoning behind them.
        </p>
      </div>
      <div>
        <label htmlFor="cis-body" className={labelCn}>
          The strategy
        </label>
        <textarea
          id="cis-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={14}
          className={cn(textareaCn, 'min-h-[320px]')}
          placeholder={
            'Who is sampled and how often.\nHow much: 100% of a new or trainee assessor’s first decisions, then the % in each plan.\nAcross every method (observation, questioning, witness, product) and every unit.\nInterim and summative sampling.\nHow findings are fed back and closed.'
          }
        />
      </div>
    </FormSheet>
  );
}

/* ═══════════════════════════ Assessor practice ═══════════════════════════ */

export interface PracticeObservation {
  id: string;
  assessor_staff_id: string;
  assessor_name: string | null;
  college_student_id: string | null;
  learner_name: string | null;
  observed_on: string;
  activity: string;
  findings: string;
  actions: string | null;
  outcome: 'meets_standard' | 'development_needed' | 'not_met' | null;
  iqa_name: string | null;
  created_at: string;
}

const OUTCOME: Record<
  NonNullable<PracticeObservation['outcome']>,
  { label: string; cls: string }
> = {
  meets_standard: { label: 'Meets the standard', cls: 'border-emerald-400/40 text-emerald-300' },
  development_needed: { label: 'Development needed', cls: 'border-orange-500/40 text-orange-300' },
  not_met: { label: 'Not met', cls: 'border-red-500/40 text-red-300' },
};

export function usePracticeObservations(collegeId: string | null) {
  const [rows, setRows] = useState<PracticeObservation[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    if (!collegeId) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('college_iqa_practice_observations' as never)
      .select(
        'id, assessor_staff_id, assessor_name, college_student_id, learner_name, observed_on, activity, findings, actions, outcome, iqa_name, created_at'
      )
      .eq('college_id', collegeId)
      .order('observed_on', { ascending: false })
      .limit(300);
    setRows((data ?? []) as unknown as PracticeObservation[]);
    setLoading(false);
  }, [collegeId]);
  useEffect(() => {
    void load();
  }, [load]);
  const add = useCallback(
    async (
      v: Omit<
        PracticeObservation,
        'id' | 'assessor_name' | 'learner_name' | 'iqa_name' | 'created_at'
      >
    ) => {
      if (!collegeId) throw new Error('No college');
      const { error } = await supabase
        .from('college_iqa_practice_observations' as never)
        .insert({ college_id: collegeId, ...v } as never);
      if (error) throw new Error(error.message);
      await load();
    },
    [collegeId, load]
  );
  return { rows, loading, add, refresh: load };
}

export function PracticeTab({
  collegeId,
  canWrite,
}: {
  collegeId: string | null;
  canWrite: boolean;
}) {
  const { rows, loading, add } = usePracticeObservations(collegeId);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  if (loading && rows.length === 0) {
    return <div className={cn(QCARD, 'h-40 animate-pulse')} aria-label="Loading" />;
  }
  return (
    <div className="space-y-4">
      {rows.length === 0 ? (
        <CollegeEmpty
          title="No observations of assessor practice yet"
          body="Watch an assessor assess a learner (an observation, questioning, a review of evidence) and record what you saw, your findings and any actions. This is about the assessor's practice, not the learner's work."
          action={
            canWrite ? (
              <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={() => setOpen(true)}>
                Record an observation of practice
              </button>
            ) : undefined
          }
        />
      ) : (
        <>
          {canWrite && (
            <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={() => setOpen(true)}>
              Record an observation of practice
            </button>
          )}
          <ul className={QLIST}>
            {rows.map((r) => {
              const isOpen = expanded === r.id;
              return (
                <li key={r.id} data-testid="iqa-practice-row">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : r.id)}
                    className="flex w-full items-start gap-3 px-4 py-3.5 text-left touch-manipulation active:bg-white/[0.06] sm:px-5"
                  >
                    <DayBlock iso={r.observed_on} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug text-white">
                        {r.assessor_name ?? 'Assessor'}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-white">
                        {r.activity}
                        {r.learner_name ? ` · with ${r.learner_name}` : ''}
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-2">
                        {r.outcome && (
                          <span
                            className={cn(
                              'rounded-full border px-2 py-px text-[12px] font-semibold',
                              OUTCOME[r.outcome].cls
                            )}
                          >
                            {OUTCOME[r.outcome].label}
                          </span>
                        )}
                        <span className="text-[12.5px] text-white">
                          {fmt(r.observed_on)} · IQA {r.iqa_name ?? ''}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'mt-2 block whitespace-pre-line text-[13px] leading-snug text-white',
                          !isOpen && 'line-clamp-2'
                        )}
                      >
                        {r.findings}
                      </span>
                      {isOpen && r.actions && (
                        <span className="mt-2 block whitespace-pre-line text-[13px] leading-snug text-white">
                          <span className="font-semibold">Actions: </span>
                          {r.actions}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={cn(
                        'mt-1 h-4 w-4 shrink-0 text-white transition-transform',
                        isOpen && 'rotate-180'
                      )}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <PracticeSheet open={open} onOpenChange={setOpen} onSave={add} collegeId={collegeId} />
    </div>
  );
}

function PracticeSheet({
  open,
  onOpenChange,
  onSave,
  collegeId,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSave: ReturnType<typeof usePracticeObservations>['add'];
  collegeId: string | null;
}) {
  const { toast } = useToast();
  const { staff, students } = useCollegePeople(collegeId);
  const [assessor, setAssessor] = useState('');
  const [learner, setLearner] = useState('');
  const [date, setDate] = useState(todayIso());
  const [activity, setActivity] = useState('');
  const [findings, setFindings] = useState('');
  const [actions, setActions] = useState('');
  const [outcome, setOutcome] = useState<PracticeObservation['outcome']>('meets_standard');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!open) return;
    setAssessor('');
    setLearner('');
    setDate(todayIso());
    setActivity('');
    setFindings('');
    setActions('');
    setOutcome('meets_standard');
  }, [open]);
  const assessors = useMemo(
    () =>
      staff
        .filter(
          (s) =>
            !s.archived_at &&
            ['assessor', 'tutor', 'iqa', 'head_of_department', 'admin'].includes(s.role ?? '')
        )
        .map((s) => ({ value: s.id, label: s.name }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [staff]
  );
  const learners = useMemo(
    () =>
      [{ value: '', label: 'No learner named' }].concat(
        students
          .filter((s) => (s.status ?? 'active').toLowerCase() !== 'withdrawn')
          .map((s) => ({ value: s.id, label: s.name }))
          .sort((a, b) => a.label.localeCompare(b.label))
      ),
    [students]
  );
  const missing = !assessor
    ? 'Pick the assessor'
    : !activity.trim()
      ? 'Say what they were assessing'
      : !findings.trim()
        ? 'Add your findings'
        : null;
  const save = async () => {
    if (missing || saving) return;
    setSaving(true);
    try {
      await onSave({
        assessor_staff_id: assessor,
        college_student_id: learner || null,
        observed_on: date,
        activity: activity.trim(),
        findings: findings.trim(),
        actions: actions.trim() || null,
        outcome,
      });
      toast({
        title: 'Observation of practice recorded',
        description: 'The assessor can read it.',
      });
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="IQA · Assessor practice"
      title="Observation of assessor practice"
      description="You watched an assessor assess. Kept as written; add another record to follow up."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
      footer={
        <div className="grid grid-cols-[auto_1fr] gap-2.5">
          <button
            type="button"
            className={cn(buttonSecondaryCn, 'px-5')}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={buttonPrimaryCn}
            disabled={!!missing || saving}
            onClick={() => void save()}
          >
            {saving ? 'Saving…' : (missing ?? 'Save the record')}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <span className={labelCn}>Assessor observed</span>
          <MobileSelectPicker
            value={assessor}
            onValueChange={setAssessor}
            options={assessors}
            placeholder="Choose the assessor"
            title="Assessor observed"
            triggerClassName={selectTriggerCn}
          />
        </div>
        <div>
          <span className={labelCn}>Learner being assessed</span>
          <MobileSelectPicker
            value={learner}
            onValueChange={setLearner}
            options={learners}
            placeholder="Choose the learner (optional)"
            title="Learner"
            triggerClassName={selectTriggerCn}
          />
        </div>
        <div>
          <label htmlFor="ipo-date" className={labelCn}>
            Date
          </label>
          <input
            id="ipo-date"
            type="date"
            max={todayIso()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputCn}
          />
        </div>
        <div>
          <label htmlFor="ipo-activity" className={labelCn}>
            What they were assessing
          </label>
          <input
            id="ipo-activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className={inputCn}
            placeholder="e.g. Observation of safe isolation, unit 102"
          />
        </div>
        <div>
          <span className={labelCn}>Outcome</span>
          <div
            role="radiogroup"
            aria-label="Outcome"
            className="flex w-full rounded-xl border border-white/[0.12] bg-white/[0.03] p-0.5"
          >
            {(Object.keys(OUTCOME) as NonNullable<PracticeObservation['outcome']>[]).map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={outcome === k}
                onClick={() => setOutcome(k)}
                className={cn(
                  'h-11 flex-1 rounded-[10px] px-2 text-[13px] font-semibold leading-tight touch-manipulation',
                  outcome === k ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]'
                )}
              >
                {OUTCOME[k].label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <label htmlFor="ipo-findings" className={labelCn}>
            Findings
          </label>
          <textarea
            id="ipo-findings"
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            rows={7}
            className={cn(textareaCn, 'min-h-[160px]')}
            placeholder="Planning, questioning, the decision against the criteria, feedback to the learner, recording."
          />
        </div>
        <div>
          <label htmlFor="ipo-actions" className={labelCn}>
            Actions for the assessor
          </label>
          <textarea
            id="ipo-actions"
            value={actions}
            onChange={(e) => setActions(e.target.value)}
            rows={4}
            className={cn(textareaCn, 'min-h-[100px]')}
            placeholder="What they should do, and by when."
          />
        </div>
      </div>
    </FormSheet>
  );
}

/* ═════════════════════════════════ CPD ═════════════════════════════════ */

interface CpdRow {
  id: string;
  college_staff_id: string;
  staff_name_snapshot: string | null;
  activity_date: string;
  activity_type: string;
  hours: number;
  title: string;
  reflection: string | null;
}

const CPD_TARGET = 30;
const ROLE_WORD: Record<string, string> = {
  assessor: 'Assessor',
  iqa: 'IQA',
  tutor: 'Tutor',
  head_of_department: 'Head of department',
};

export function CpdTab({
  collegeId,
  myStaffId,
  readOnly,
}: {
  collegeId: string | null;
  myStaffId: string | null;
  readOnly: boolean;
}) {
  const { staff } = useCollegePeople(collegeId);
  const [rows, setRows] = useState<CpdRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [logOpen, setLogOpen] = useState(false);
  const year = new Date().getFullYear();
  const load = useCallback(async () => {
    if (!collegeId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('staff_cpd_entries')
      .select(
        'id, college_staff_id, staff_name_snapshot, activity_date, activity_type, hours, title, reflection'
      )
      .eq('college_id_snapshot', collegeId)
      .gte('activity_date', `${year - 1}-01-01`)
      .order('activity_date', { ascending: false })
      .limit(500);
    setRows((data ?? []) as unknown as CpdRow[]);
    setLoading(false);
  }, [collegeId, year]);
  useEffect(() => {
    void load();
  }, [load]);

  // Assessors and IQAs first: they are who the EQA asks about.
  const people = useMemo(() => {
    const assessing = staff.filter(
      (s) =>
        !s.archived_at && ['assessor', 'iqa', 'tutor', 'head_of_department'].includes(s.role ?? '')
    );
    return assessing
      .map((s) => {
        const mine = rows.filter((r) => r.college_staff_id === s.id);
        const thisYear = mine.filter((r) => r.activity_date.startsWith(String(year)));
        return {
          id: s.id,
          name: s.name,
          role: s.role,
          hours: thisYear.reduce((n, r) => n + Number(r.hours || 0), 0),
          entries: mine,
        };
      })
      .sort(
        (a, b) =>
          (a.role === 'iqa' ? -1 : 0) - (b.role === 'iqa' ? -1 : 0) || a.name.localeCompare(b.name)
      );
  }, [staff, rows, year]);
  const myName = staff.find((s) => s.id === myStaffId)?.name ?? 'You';

  if (loading && rows.length === 0) {
    return <div className={cn(QCARD, 'h-40 animate-pulse')} aria-label="Loading" />;
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13.5px] text-white">
          CPD hours in {year} for everyone who assesses or quality assures, against a {CPD_TARGET}{' '}
          hour year.
        </p>
        {!readOnly && myStaffId && (
          <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={() => setLogOpen(true)}>
            Log my CPD
          </button>
        )}
      </div>
      {people.length === 0 ? (
        <CollegeEmpty title="No assessors yet" body="Add staff to see their CPD here." />
      ) : (
        <ul className={QLIST}>
          {people.map((p) => (
            <li key={p.id} className="px-4 py-3.5 sm:px-5" data-testid="iqa-cpd-person">
              <div className="flex items-baseline justify-between gap-3">
                <p className="min-w-0 text-[15px] font-semibold text-white">
                  {p.name}
                  <span className="ml-2 text-[12.5px] font-medium">
                    {ROLE_WORD[p.role ?? ''] ?? p.role}
                  </span>
                </p>
                <p
                  className={cn(
                    'shrink-0 text-[15px] font-bold tabular-nums',
                    p.hours < CPD_TARGET ? 'text-orange-300' : 'text-white'
                  )}
                >
                  {p.hours.toLocaleString('en-GB', { maximumFractionDigits: 1 })} h
                </p>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className={cn(
                    'h-full',
                    p.hours >= CPD_TARGET ? 'bg-emerald-400' : 'bg-orange-400'
                  )}
                  style={{ width: `${Math.min(100, (p.hours / CPD_TARGET) * 100)}%` }}
                />
              </div>
              {p.entries.length === 0 ? (
                <p className="mt-1.5 text-[12.5px] text-white">
                  Nothing logged in the last two years.
                </p>
              ) : (
                <ul className="mt-2 space-y-1.5">
                  {p.entries.slice(0, 3).map((e) => (
                    <li key={e.id} className="text-[13px] leading-snug text-white">
                      <span className="font-semibold">{e.title}</span> · {fmt(e.activity_date)} ·{' '}
                      {Number(e.hours).toLocaleString('en-GB', { maximumFractionDigits: 1 })} h
                      {e.reflection && (
                        <span className="mt-0.5 block line-clamp-2">{e.reflection}</span>
                      )}
                    </li>
                  ))}
                  {p.entries.length > 3 && (
                    <li className="text-[12.5px] text-white">and {p.entries.length - 3} more</li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
      <LogCpdSheet
        open={logOpen}
        onOpenChange={(o) => {
          setLogOpen(o);
          if (!o) void load();
        }}
        staffId={myStaffId}
        staffName={myName}
        onSaved={() => void load()}
      />
    </div>
  );
}
