/**
 * SectionAssessmentPlan — Student 360's assessment plan (ELE-1874).
 *
 * The tutor or assessor sets what the learner should evidence next: which
 * criteria, how (observation, product evidence, witness…), by when, and a
 * suggested activity. The learner gets a push and sees it as a to-do in their
 * portfolio with a button straight into capture, criteria ticked. An item
 * closes itself when evidence claiming all its criteria is sent, or the
 * criteria are passed; staff can also mark it done, cancel or reopen it.
 *
 *   SectionAssessmentPlan   the list on the "Criteria and assessment" page (#plan)
 *   AssessmentPlanSheet     the wide FormSheet that sets or edits one item
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { useToast } from '@/hooks/use-toast';
import {
  STATE_CHIP,
  STATE_LABEL,
  type AcState,
  type AcStateRow,
} from '@/hooks/portfolio/usePortfolioAcState';
import {
  CLOSE_REASON_LABEL,
  PLAN_METHODS,
  type AssessmentPlanItem,
  type PlanMethod,
  type useAssessmentPlans,
} from '@/hooks/portfolio/useAssessmentPlans';

type Plans = ReturnType<typeof useAssessmentPlans>;

export const PLAN_HELP: PageHelpContent = {
  id: 'college-student360-assessment-plan',
  title: 'Assessment plan',
  what: 'What you have asked this learner to evidence next. Each item names the criteria, how to show them, a suggested activity and a date. The learner sees it as a to-do with a button straight into capture.',
  steps: [
    {
      title: 'Set a plan item',
      body: 'Pick the criteria (those that need more and those not started come first), choose how they should be evidenced, write the activity in plain words and set a date.',
    },
    {
      title: 'The learner is told',
      body: 'They get a notification that opens the item. Their capture sheet starts with your criteria ticked.',
    },
    {
      title: 'It closes itself',
      body: 'When they send evidence claiming every criterion on the item, or you pass those criteria, the item is marked done and you are told.',
    },
    {
      title: 'Overdue items',
      body: 'An item past its date shows on your home and inbox as a check-in, urgent after a week.',
    },
  ],
  notes: [
    {
      title: 'You can still close it yourself',
      body: 'Mark done if the evidence came another way, cancel if it no longer applies, or reopen a closed item.',
    },
  ],
};

function todayLondon(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}
function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
function shortDate(iso: string | null | undefined): string {
  if (!iso) return '';
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

/* ── The list ─────────────────────────────────────────────────────────── */

export function SectionAssessmentPlan({
  id,
  studentName,
  userId,
  plans,
  onSet,
}: {
  id?: string;
  studentName: string;
  userId: string | null;
  plans: Plans;
  onSet: (item?: AssessmentPlanItem) => void;
}) {
  const first = studentName.split(' ')[0] || 'This learner';
  const { toast } = useToast();
  const [showClosed, setShowClosed] = useState(false);
  // `&focus=<plan id>` ("has evidenced a plan item"): a done item sits in
  // the closed list, so open it to show the row.
  const [searchParams] = useSearchParams();
  const focusPlan = searchParams.get('focus');
  useEffect(() => {
    if (focusPlan && plans.closed.some((p) => p.id === focusPlan)) setShowClosed(true);
  }, [focusPlan, plans.closed]);
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const act = async (item: AssessmentPlanItem, status: 'done' | 'cancelled' | 'open') => {
    setBusy(item.id);
    try {
      await plans.setStatus(item.id, status);
      toast({
        title:
          status === 'done'
            ? 'Marked done'
            : status === 'cancelled'
              ? 'Plan item cancelled'
              : 'Plan item reopened',
      });
    } catch (e) {
      toast({
        title: 'Could not change the plan',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
      setConfirmCancel(null);
    }
  };

  return (
    <section id={id} className="scroll-mt-24 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[17px] font-semibold tracking-tight text-white">Assessment plan</h2>
            <PageHelpButton help={PLAN_HELP} />
          </div>
          <p className="mt-0.5 text-[13px] leading-snug text-white">
            What {first} should evidence next. It closes itself when they send evidence for every
            criterion on it.
          </p>
        </div>
        {userId && (
          <button
            type="button"
            className={cn(COLLEGE_BTN_PRIMARY, 'shrink-0')}
            onClick={() => onSet()}
          >
            Set a plan item
          </button>
        )}
      </div>

      {!userId ? (
        <div className={COLLEGE_CARD}>
          <p className="text-[14.5px] font-semibold text-white">{first} hasn't joined yet</p>
          <p className="mt-1 text-[13px] text-white">
            A plan goes to the learner's own app. Send them the cohort join code and you can set one
            as soon as they join.
          </p>
        </div>
      ) : plans.loading ? (
        <div className="h-28 animate-pulse rounded-3xl bg-white/[0.04]" />
      ) : plans.error ? (
        <div className={COLLEGE_CARD}>
          <p className="text-[13.5px] text-white">Couldn't load the plan: {plans.error}</p>
        </div>
      ) : plans.open.length === 0 ? (
        <div
          className={cn(
            COLLEGE_CARD,
            'flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between'
          )}
        >
          <div>
            <p className="text-[15px] font-semibold text-white">Nothing planned</p>
            <p className="mt-1 max-w-2xl text-[13.5px] text-white">
              Set {first} the next criteria to evidence, how and by when. They see it as a to-do and
              get a notification.
            </p>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
          {plans.open.map((p) => {
            const met = p.criteria.filter((c) => c.met_at).length;
            return (
              <li
                key={p.id}
                data-focus-id={p.id}
                className={cn(COLLEGE_CARD, 'flex h-full flex-col gap-3')}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 text-[15px] font-semibold leading-snug text-white">
                    {p.activity}
                  </p>
                  <span
                    className={cn(
                      'shrink-0 text-[12.5px] font-semibold tabular-nums',
                      p.overdue ? 'text-orange-300' : 'text-white'
                    )}
                  >
                    {p.due_date
                      ? `${p.overdue ? 'Was due ' : 'By '}${shortDate(p.due_date)}`
                      : 'No date'}
                  </span>
                </div>
                <p className="text-[12.5px] text-white">
                  {p.method_label} · {met} of {p.criteria.length} criteria in
                  {p.set_by_name ? ` · set by ${p.set_by_name}` : ''}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.criteria.map((c) => (
                    <span
                      key={`${c.unit_code}-${c.ac_code}`}
                      title={c.ac_text ?? undefined}
                      className={cn(
                        'inline-flex h-7 items-center gap-1 rounded-full border px-2.5 font-mono text-[12px]',
                        c.met_at
                          ? 'border-emerald-400/40 bg-emerald-500/[0.12] text-emerald-300'
                          : 'border-white/[0.14] bg-white/[0.04] text-white'
                      )}
                    >
                      {c.met_at && <Check className="h-3 w-3" aria-hidden />}
                      {c.unit_code} AC {c.ac_code}
                    </span>
                  ))}
                </div>
                {p.notes && <p className="text-[13px] leading-snug text-white">{p.notes}</p>}
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    className={COLLEGE_BTN}
                    onClick={() => onSet(p)}
                    disabled={busy === p.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={COLLEGE_BTN}
                    onClick={() => void act(p, 'done')}
                    disabled={busy === p.id}
                  >
                    Mark done
                  </button>
                  {confirmCancel === p.id ? (
                    <button
                      type="button"
                      className={cn(COLLEGE_BTN, 'border-orange-500/40 text-orange-300')}
                      onClick={() => void act(p, 'cancelled')}
                      disabled={busy === p.id}
                    >
                      Yes, cancel it
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={COLLEGE_BTN}
                      onClick={() => setConfirmCancel(p.id)}
                      disabled={busy === p.id}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {userId && plans.closed.length > 0 && (
        <div className="space-y-2">
          <button
            type="button"
            className={chipCn(showClosed)}
            onClick={() => setShowClosed((s) => !s)}
          >
            {showClosed ? 'Hide closed' : `Closed (${plans.closed.length})`}
          </button>
          {showClosed && (
            <ul className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.08] sm:mx-0 sm:rounded-3xl sm:border-x">
              {plans.closed.map((p) => (
                <li
                  key={p.id}
                  data-focus-id={p.id}
                  className="flex min-h-[60px] items-center gap-3 px-5 py-3 sm:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[14px] font-semibold text-white">
                      {p.activity}
                    </p>
                    <p className="mt-0.5 text-[12px] text-white">
                      {p.close_reason ? CLOSE_REASON_LABEL[p.close_reason] : p.status}
                      {p.closed_at ? ` · ${shortDate(p.closed_at)}` : ''} ·{' '}
                      {p.criteria.map((c) => `${c.unit_code} AC ${c.ac_code}`).join(', ')}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={cn(COLLEGE_BTN, 'shrink-0')}
                    onClick={() => void act(p, 'open')}
                    disabled={busy === p.id}
                  >
                    Reopen
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

/* ── The sheet ────────────────────────────────────────────────────────── */

/** Order the picker shows criteria in: what needs more first, then not started. */
const PICK_RANK: Record<AcState, number> = {
  referred: 0,
  not_yet: 0,
  iqa_rejected: 0,
  not_started: 1,
  suggested: 2,
  claimed: 3,
  submitted: 4,
  passed: 9,
  iqa_confirmed: 9,
};
type PickFilter = 'gaps' | 'needs' | 'all';

const ACTIVITY_STARTERS: Record<PlanMethod, string> = {
  observation: 'I will observe you ',
  product: 'Photos and the paperwork from ',
  witness: 'Ask your supervisor to sign a witness statement for ',
  professional_discussion: 'Be ready to talk me through ',
  questioning: 'Answer the questions on ',
  simulation: 'In the workshop, ',
  other: '',
};

const refKey = (c: { unit_code: string; ac_code: string }) => `${c.unit_code}|${c.ac_code}`;

export function AssessmentPlanSheet({
  open,
  onOpenChange,
  studentName,
  plans,
  acRows,
  acLoading,
  editing,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentName: string;
  plans: Plans;
  acRows: AcStateRow[];
  acLoading: boolean;
  editing: AssessmentPlanItem | null;
}) {
  const first = studentName.split(' ')[0] || 'the learner';
  const { toast } = useToast();
  const today = todayLondon();
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<PickFilter>('gaps');
  const [query, setQuery] = useState('');
  const [method, setMethod] = useState<PlanMethod>('observation');
  const [activity, setActivity] = useState('');
  const [due, setDue] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  // Reset to the item being edited (or a blank plan) each time it opens.
  useEffect(() => {
    if (!open) return;
    setPicked(new Set((editing?.criteria ?? []).map(refKey)));
    setMethod(editing?.method ?? 'observation');
    setActivity(editing?.activity ?? '');
    setDue(editing?.due_date ?? addDays(today, 14));
    setNotes(editing?.notes ?? '');
    setFilter('gaps');
    setQuery('');
  }, [open, editing, today]);

  const rowByKey = useMemo(() => new Map(acRows.map((r) => [refKey(r), r])), [acRows]);

  const units = useMemo(() => {
    const q = query.trim().toLowerCase();
    const keep = (r: AcStateRow) => {
      if (picked.has(refKey(r))) return true;
      if (filter === 'needs' && PICK_RANK[r.state] !== 0) return false;
      if (filter === 'gaps' && PICK_RANK[r.state] > 2) return false;
      if (filter === 'all' && PICK_RANK[r.state] >= 9) return false;
      if (!q) return true;
      return `${r.unit_code} ${r.unit_title ?? ''} ${r.ac_code} ${r.ac_text ?? ''}`
        .toLowerCase()
        .includes(q);
    };
    const map = new Map<
      string,
      { unit_code: string; unit_title: string; rows: AcStateRow[]; rank: number }
    >();
    for (const r of acRows) {
      if (!keep(r)) continue;
      let g = map.get(r.unit_code);
      if (!g) {
        g = {
          unit_code: r.unit_code,
          unit_title: r.unit_title ?? `Unit ${r.unit_code}`,
          rows: [],
          rank: 9,
        };
        map.set(r.unit_code, g);
      }
      g.rows.push(r);
      g.rank = Math.min(g.rank, PICK_RANK[r.state]);
    }
    const out = [...map.values()];
    for (const g of out)
      g.rows.sort(
        (a, b) =>
          PICK_RANK[a.state] - PICK_RANK[b.state] ||
          a.ac_code.localeCompare(b.ac_code, undefined, { numeric: true })
      );
    // Units with something sent back come first, then by unit code.
    return out.sort(
      (a, b) =>
        a.rank - b.rank || a.unit_code.localeCompare(b.unit_code, undefined, { numeric: true })
    );
  }, [acRows, filter, query, picked]);

  const needsCount = acRows.filter((r) => PICK_RANK[r.state] === 0).length;

  /*
   * ELE-1874: a suggested next item, worked out from the learner's own
   * criteria (no AI). Anything sent back comes first; otherwise the unit
   * nearest to finished, with its next few criteria not yet passed. The tutor
   * sees it, can take it, and still edits and saves it themselves.
   */
  const suggestion = useMemo(() => {
    if (editing || acRows.length === 0) return null;
    const back = acRows.filter((r) => PICK_RANK[r.state] === 0).slice(0, 6);
    if (back.length) {
      const fb = back.find((r) => r.decision_feedback)?.decision_feedback?.trim();
      return {
        why: `${back.length} ${back.length === 1 ? 'criterion was' : 'criteria were'} sent back for more`,
        rows: back,
        method: 'product' as PlanMethod,
        activity: `Add what was missing for ${back.map((r) => `${r.unit_code} AC ${r.ac_code}`).join(', ')}${fb ? `: ${fb.replace(/[.\s]+$/, '')}.` : '.'}`,
      };
    }
    const byUnit = new Map<string, AcStateRow[]>();
    for (const r of acRows) byUnit.set(r.unit_code, [...(byUnit.get(r.unit_code) ?? []), r]);
    let best: { rows: AcStateRow[]; left: AcStateRow[]; score: number } | null = null;
    for (const rows of byUnit.values()) {
      const left = rows.filter((r) => PICK_RANK[r.state] <= 2);
      if (!left.length) continue;
      const done = rows.filter((r) => PICK_RANK[r.state] >= 4).length;
      const score = done / rows.length - left.length / 1000;
      if (!best || score > best.score) best = { rows, left, score };
    }
    if (!best) return null;
    const pick = best.left.slice(0, 4);
    const unit = pick[0].unit_title ?? `Unit ${pick[0].unit_code}`;
    const task = (pick[0].ac_text ?? '')
      .trim()
      .replace(/^[A-Z]/, (c) => c.toLowerCase())
      .replace(/[.\s]+$/, '');
    return {
      why: `${unit} is the unit nearest to finished: ${best.rows.length - best.left.length} of ${best.rows.length} criteria sent or passed`,
      rows: pick,
      method: 'observation' as PlanMethod,
      activity: task
        ? `I will observe you ${task}, on a real job.`
        : `I will observe you on a real job for ${unit}.`,
    };
  }, [acRows, editing]);
  const takeSuggestion = () => {
    if (!suggestion) return;
    setPicked(new Set(suggestion.rows.map(refKey)));
    setMethod(suggestion.method);
    setActivity(suggestion.activity);
  };
  const toggle = (k: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  const pickedRows = [...picked].map((k) => {
    const [unit_code, ac_code] = k.split('|');
    return (
      rowByKey.get(k) ??
      ({ unit_code, ac_code, ac_text: null, state: 'not_started' } as unknown as AcStateRow)
    );
  });

  const canSave = picked.size > 0 && activity.trim().length > 0 && picked.size <= 30 && !saving;

  const save = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const res = await plans.save({
        id: editing?.id ?? null,
        criteria: pickedRows.map((r) => ({ unit_code: r.unit_code, ac_code: r.ac_code })),
        activity: activity.trim(),
        method,
        dueDate: due || null,
        notes: notes.trim() || null,
      });
      toast({
        title: editing ? 'Plan item updated' : `Plan set, ${first} has been told`,
        description: res.already_passed
          ? `${res.already_passed} of those criteria are already passed, so they count as met.`
          : undefined,
      });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not save the plan',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const fieldCn =
    'input-underline w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark] touch-manipulation';

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Assessment plan"
      title={editing ? 'Change plan item' : `Set ${first} what to evidence next`}
      description={`${first} sees this as a to-do with a button straight into capture, criteria ticked.`}
      width="wide"
      bodyClassName="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
      footer={
        <button
          type="button"
          className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}
          disabled={!canSave}
          onClick={() => void save()}
        >
          {saving
            ? 'Saving…'
            : editing
              ? 'Save changes'
              : picked.size === 0
                ? 'Choose criteria first'
                : `Set plan and tell ${first}`}
        </button>
      }
    >
      {/* Left: criteria */}
      <div className="min-w-0 space-y-3">
        {suggestion && picked.size === 0 && (
          <div className="rounded-2xl border border-white/[0.14] bg-white/[0.04] p-4">
            <p className="text-[12.5px] font-semibold text-white">Suggested next</p>
            <p className="mt-1 text-[14px] font-semibold leading-snug text-white">
              {suggestion.activity}
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-white">
              {suggestion.rows.map((r) => `${r.unit_code} AC ${r.ac_code}`).join(', ')}. Why:{' '}
              {suggestion.why}.
            </p>
            <button
              type="button"
              className={cn(chipCn(true), 'mt-3 h-11')}
              onClick={takeSuggestion}
            >
              Use this, then change it
            </button>
          </div>
        )}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-white">Criteria</h3>
          <span className="text-[12.5px] font-semibold tabular-nums text-white">
            {picked.size} chosen{picked.size > 30 ? ' (30 at most)' : ''}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={chipCn(filter === 'gaps')}
            onClick={() => setFilter('gaps')}
          >
            Still to evidence
          </button>
          <button
            type="button"
            className={chipCn(filter === 'needs')}
            onClick={() => setFilter('needs')}
          >
            Needs more{needsCount ? ` (${needsCount})` : ''}
          </button>
          <button
            type="button"
            className={chipCn(filter === 'all')}
            onClick={() => setFilter('all')}
          >
            All not passed
          </button>
        </div>
        <label className="relative block">
          <Search
            className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
            aria-hidden
          />
          <input
            className={cn(fieldCn, 'h-11 pl-7')}
            placeholder="Search criteria or units"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        {acLoading ? (
          <div className="h-48 animate-pulse rounded-2xl bg-white/[0.04]" />
        ) : acRows.length === 0 ? (
          <p className="text-[13.5px] text-white">
            {first} has no qualification set yet, so there are no criteria to plan. Set their course
            first.
          </p>
        ) : units.length === 0 ? (
          <p className="text-[13.5px] text-white">Nothing matches. Try "All not passed".</p>
        ) : (
          <div className="max-h-none space-y-3 lg:max-h-[56vh] lg:overflow-y-auto lg:pr-2">
            {units.map((g) => {
              const openRows = g.rows.filter((r) => PICK_RANK[r.state] <= 2);
              const allOn = openRows.length > 0 && openRows.every((r) => picked.has(refKey(r)));
              return (
                <div
                  key={g.unit_code}
                  className="overflow-hidden rounded-2xl border border-white/[0.08]"
                >
                  <div className="flex items-center justify-between gap-3 bg-white/[0.04] px-3 py-2">
                    <p className="min-w-0 line-clamp-2 text-[13px] font-semibold text-white">
                      <span className="font-mono text-elec-yellow">{g.unit_code}</span>{' '}
                      {g.unit_title}
                    </p>
                    {openRows.length > 1 && (
                      <button
                        type="button"
                        className="h-11 shrink-0 px-2 text-[12px] font-semibold text-elec-yellow touch-manipulation"
                        onClick={() =>
                          setPicked((prev) => {
                            const next = new Set(prev);
                            for (const r of openRows) {
                              if (allOn) next.delete(refKey(r));
                              else next.add(refKey(r));
                            }
                            return next;
                          })
                        }
                      >
                        {allOn ? 'Clear unit' : `All ${openRows.length} open`}
                      </button>
                    )}
                  </div>
                  <ul className="divide-y divide-white/[0.06]">
                    {g.rows.map((r) => {
                      const k = refKey(r);
                      const on = picked.has(k);
                      return (
                        <li key={k}>
                          <button
                            type="button"
                            onClick={() => toggle(k)}
                            aria-pressed={on}
                            className="flex min-h-[52px] w-full items-start gap-3 px-3 py-2.5 text-left touch-manipulation hover:bg-white/[0.04]"
                          >
                            <span
                              className={cn(
                                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border',
                                on
                                  ? 'border-elec-yellow bg-elec-yellow text-black'
                                  : 'border-white/[0.3]'
                              )}
                              aria-hidden
                            >
                              {on && <Check className="h-3.5 w-3.5" />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[12.5px] text-elec-yellow">
                                  AC {r.ac_code}
                                </span>
                                <span
                                  className={cn(
                                    'inline-flex items-center rounded-full border px-2 py-0.5 text-[12px] font-semibold',
                                    STATE_CHIP[r.state]
                                  )}
                                >
                                  {STATE_LABEL[r.state]}
                                </span>
                              </span>
                              {r.ac_text && (
                                <span className="mt-0.5 block text-[13px] leading-snug text-white">
                                  {r.ac_text}
                                </span>
                              )}
                              {r.decision_feedback && PICK_RANK[r.state] === 0 && (
                                <span className="mt-0.5 block text-[12px] text-orange-300">
                                  "{r.decision_feedback}"
                                </span>
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right: how, what, when */}
      <div className="min-w-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-[15px] font-semibold text-white">How</h3>
          <div className="flex flex-wrap gap-2">
            {PLAN_METHODS.map((m) => (
              <button
                key={m.key}
                type="button"
                className={chipCn(method === m.key)}
                onClick={() => setMethod(m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="text-[12.5px] text-white">
            {PLAN_METHODS.find((m) => m.key === method)?.hint}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-white">What to do</h3>
            {!activity.trim() && ACTIVITY_STARTERS[method] && (
              <button
                type="button"
                className="h-11 px-1 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                onClick={() => setActivity(ACTIVITY_STARTERS[method])}
              >
                Start it for me
              </button>
            )}
          </div>
          <textarea
            className={cn(fieldCn, 'min-h-[88px] resize-y py-2')}
            maxLength={500}
            placeholder="e.g. Ring final test on a real job, photos of the test sheet"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <p className="text-[12px] text-white">
            Plain words. This is the line {first} sees on their to-do.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-[15px] font-semibold text-white">By when</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '1 week', d: addDays(today, 7) },
              { label: '2 weeks', d: addDays(today, 14) },
              { label: '1 month', d: addDays(today, 30) },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                className={chipCn(due === o.d)}
                onClick={() => setDue(o.d)}
              >
                {o.label}
              </button>
            ))}
            <button type="button" className={chipCn(due === '')} onClick={() => setDue('')}>
              No date
            </button>
          </div>
          <input
            type="date"
            className={cn(fieldCn, 'h-11')}
            min={editing ? undefined : today}
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-[15px] font-semibold text-white">Note for {first}</h3>
          <textarea
            className={cn(fieldCn, 'min-h-[64px] resize-y py-2')}
            maxLength={2000}
            placeholder="Optional: what good looks like, what to bring"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {pickedRows.length > 0 && (
          <div className="space-y-1.5 border-t border-white/[0.1] pt-4">
            <h3 className="text-[13px] font-semibold text-white">On this item</h3>
            <ul className="space-y-1">
              {pickedRows.map((r) => (
                <li key={refKey(r)} className="flex items-start gap-2 text-[13px] text-white">
                  <span className="shrink-0 font-mono text-elec-yellow">
                    {r.unit_code} AC {r.ac_code}
                  </span>
                  <span className="min-w-0 flex-1 leading-snug">{r.ac_text}</span>
                  <button
                    type="button"
                    className="h-11 shrink-0 px-1 text-[12px] font-semibold text-elec-yellow touch-manipulation"
                    onClick={() => toggle(refKey(r))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </FormSheet>
  );
}
