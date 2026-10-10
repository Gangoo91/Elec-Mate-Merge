/**
 * LearnerAssessmentView — one screen for the whole assessment loop (ELE-1867/1868/1871).
 *
 *   mode 'assessor'  filter → tap criteria → "Record decision" → Passed / Needs more / Not yet
 *   mode 'iqa'       as assessor, plus Confirm / Not confirmed on others' passed criteria
 *   mode 'learner'   read-only: every criterion's honest state and the assessor's feedback
 *
 * Reads the single state function (usePortfolioAcState), which updates live
 * when a decision lands (ELE-1868). Decisions are append-only server-side and
 * are recorded through AcDecisionSheet, the one way to pass a criterion
 * (ELE-1867). The learner's words match the portfolio home (LEARNER_STATE_LABEL),
 * AI-drafted feedback carries its provenance (ELE-1926), and a criterion that
 * needs more can be sent again from here.
 */
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeepLinkFocus } from '@/hooks/useDeepLinkFocus';
import { ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  usePortfolioAcState,
  aiProvenanceLine,
  acRowChip,
  acRowLabel,
  countersignDecisions,
  STATE_LABEL,
  LEARNER_STATE_LABEL,
  type AcState,
  type AcStateRow,
} from '@/hooks/portfolio/usePortfolioAcState';
import { StaffNoteSheet, StaffNotesList } from '@/components/assessment/StaffNotes';
import { staffNoteKey, useStaffNotes } from '@/hooks/portfolio/useStaffNotes';
import { AcDecisionSheet } from '@/components/assessment/AcDecisionSheet';
import { usePortfolio } from '@/hooks/portfolio/usePortfolio';
import {
  occasionCounter,
  occasionKey,
  occasionsCheck,
  useAcOccasions,
} from '@/hooks/portfolio/useAcOccasions';
import { OccasionsGrid } from '@/components/portfolio/OccasionsGrid';
import {
  useWitnessedCriteria,
  witnessCompetenceLine,
  witnessedByLine,
} from '@/hooks/portfolio/useWitnessedCriteria';
import { SubmitEvidenceSheet } from '@/components/apprentice-hub/portfolio2/SubmitEvidenceSheet';
import { assessorWithQualifications } from '@/lib/assessorQualifications';
import { supabase } from '@/integrations/supabase/client';

/**
 * ELE-1882: decisions made at a college the learner has since left, keyed by
 * decision id, so the new college reads "Assessed at Northgate".
 */
function usePreviousCollegeDecisions(learnerId: string) {
  const [map, setMap] = useState<Map<string, string>>(new Map());
  useEffect(() => {
    let active = true;
    void (
      supabase.rpc.bind(supabase) as unknown as (
        f: string,
        a: Record<string, unknown>
      ) => Promise<{
        data: { decision_id: string; college_name: string | null; is_previous: boolean }[] | null;
      }>
    )('get_decision_provenance', { p_user_id: learnerId }).then(({ data }) => {
      if (!active) return;
      setMap(
        new Map(
          (data ?? [])
            .filter((r) => r.is_previous && r.college_name)
            .map((r) => [r.decision_id, r.college_name as string])
        )
      );
    });
    return () => {
      active = false;
    };
  }, [learnerId]);
  return map;
}

type Mode = 'assessor' | 'iqa' | 'learner';

const APP_CARD =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';
/** Public pages (assessor workspace): rounded at every width, a quiet hairline edge
 *  (Andrew, 10 Oct: no gold edge on every card), lit surface. */
const PUBLIC_CARD = cn('rounded-2xl border border-white/[0.12]', CARD_SURFACE);
const textareaCn =
  'min-h-[110px] w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 ' +
  'text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow ' +
  'focus:outline-none focus:ring-0 touch-manipulation';

const key = (r: { unit_code: string; ac_code: string }) => `${r.unit_code}::${r.ac_code}`;

type Filter =
  'ready' | 'claimed' | 'submitted' | 'countersign' | 'to_confirm' | 'needs' | 'passed' | 'all';

const FILTER_MATCH: Record<Filter, (st: AcState, r: AcStateRow) => boolean> = {
  // Evidence the learner has put forward that nobody has decided on yet.
  // A trainee's pass waiting for countersignature is not "ready": it has a decision.
  ready: (st, r) => (st === 'submitted' && !r.countersign_pending) || st === 'claimed',
  // The learner's own words split "ready" in two, as the portfolio home does.
  claimed: (st) => st === 'claimed',
  submitted: (st) => st === 'submitted',
  // Batch 2: trainee passes waiting for a qualified assessor's countersignature.
  countersign: (_st, r) => !!r.countersign_pending,
  // Passed by an assessor, not yet sampled by IQA.
  to_confirm: (st, r) => st === 'passed' && !r.iqa_verdict,
  needs: (st) => st === 'referred' || st === 'not_yet' || st === 'iqa_rejected',
  passed: (st) => st === 'passed' || st === 'iqa_confirmed',
  all: () => true,
};

function when(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function LearnerAssessmentView({
  learnerId,
  mode,
  learnerName,
  appSidebar = true,
  focus = null,
}: {
  learnerId: string;
  mode: Mode;
  learnerName?: string;
  /** Inside the app shell the desktop bar shifts right to clear the sidebar; public pages have none. */
  appSidebar?: boolean;
  /**
   * A notification named these criteria (`UNIT:AC`) or this piece of evidence:
   * their units open, the rows are ringed and the first is scrolled to. An
   * assessor arriving for evidence gets its undecided criteria ticked, ready
   * to record a decision.
   */
  focus?: { acs?: string[]; itemId?: string | null } | null;
}) {
  const { toast } = useToast();
  const { user } = useAuth();
  const {
    rows: acRows,
    units,
    totals,
    loading,
    refreshing,
    error,
    recordDecisions,
    setIqaVerdict,
    refresh,
  } = usePortfolioAcState(learnerId);
  // Separate read: assessed occasions per criterion (C&G 5357 workplace units
  // need two). Never changes the states or the "passed" figures above.
  const occasions = useAcOccasions(learnerId, acRows);
  const occ = occasionsCheck(acRows, occasions.byKey);
  const [showGrid, setShowGrid] = useState(false);
  // ELE-1869: "Witnessed by …" against each criterion a signed statement backs up.
  const witnessed = useWitnessedCriteria(learnerId);
  const previousCollege = usePreviousCollegeDecisions(learnerId);
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>(mode === 'learner' ? 'all' : 'ready');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sheet, setSheet] = useState(false);
  const [saving, setSaving] = useState(false);
  // Learner: "Send again" on a criterion that needs more (ELE-1868).
  const [resendFor, setResendFor] = useState<AcStateRow | null>(null);
  const [iqaTarget, setIqaTarget] = useState<AcStateRow | null>(null);
  const [iqaReason, setIqaReason] = useState('');
  const canDecide = mode === 'assessor' || mode === 'iqa';
  // Batch 2: staff-only notes (RLS keeps them from the learner), countersigning.
  const staffNotes = useStaffNotes(learnerId, canDecide);
  const [noteOpen, setNoteOpen] = useState(false);
  const [iAmTrainee, setIAmTrainee] = useState(false);
  const [countersigning, setCountersigning] = useState<string | null>(null);
  useEffect(() => {
    if (!canDecide || !user?.id) return;
    let live = true;
    void supabase
      .rpc('_is_trainee_assessor' as never, { p_user: user.id, p_learner: learnerId } as never)
      .then(({ data }) => {
        if (live) setIAmTrainee(data === true);
      });
    return () => {
      live = false;
    };
  }, [canDecide, user?.id, learnerId]);
  const first = learnerName?.split(' ')[0] ?? 'This learner';
  const cardCn = appSidebar ? APP_CARD : PUBLIC_CARD;
  // One wording everywhere (ELE-1868): the learner reads the portfolio home's words.
  const labels = mode === 'learner' ? LEARNER_STATE_LABEL : STATE_LABEL;

  const allRows = useMemo(() => units.flatMap((u) => u.rows), [units]);

  // Deep-linked criteria (see `focus`).
  const focusAcKey = (focus?.acs ?? []).join(',');
  const focusItem = focus?.itemId ?? null;
  const focusKeys = useMemo(() => {
    const wanted = new Set(
      focusAcKey
        .split(',')
        .filter(Boolean)
        .map((pair) => {
          const i = pair.lastIndexOf(':');
          return i > 0 ? `${pair.slice(0, i)}::${pair.slice(i + 1)}` : pair;
        })
    );
    return new Set(
      allRows
        .filter(
          (r) => wanted.has(key(r)) || (!!focusItem && r.evidence_item_ids.includes(focusItem))
        )
        .map(key)
    );
  }, [allRows, focusAcKey, focusItem]);
  const focusUnits = useMemo(
    () => new Set(allRows.filter((r) => focusKeys.has(key(r))).map((r) => r.unit_code)),
    [allRows, focusKeys]
  );
  const firstFocus = useMemo(() => {
    for (const u of units) for (const r of u.rows) if (focusKeys.has(key(r))) return `ac:${key(r)}`;
    return null;
  }, [units, focusKeys]);
  const [focusApplied, setFocusApplied] = useState(false);
  useEffect(() => {
    if (focusApplied || focusKeys.size === 0) return;
    setFocusApplied(true);
    // Every focused row must be visible, whatever the default filter.
    setFilter('all');
    setQuery('');
    if (canDecide && focusItem) {
      setSelected(
        new Set(
          allRows
            .filter(
              (r) =>
                focusKeys.has(key(r)) && !['passed', 'iqa_confirmed'].includes(r.state as string)
            )
            .map(key)
        )
      );
    }
  }, [focusApplied, focusKeys, canDecide, focusItem, allRows]);
  useDeepLinkFocus(focusApplied ? firstFocus : null, !loading);
  const selectedRows = useMemo(
    () => allRows.filter((r) => selected.has(key(r))),
    [allRows, selected]
  );

  const q = query.trim().toLowerCase();
  const narrowing = filter !== 'all' || q.length > 0;
  const visibleUnits = useMemo(
    () =>
      units
        .map((u) => ({
          ...u,
          shown: u.rows.filter(
            (r) =>
              FILTER_MATCH[filter](r.state as AcState, r) &&
              (!q ||
                `${u.unit_code} ${u.unit_title} ac ${r.ac_code} ${r.ac_text ?? ''}`
                  .toLowerCase()
                  .includes(q))
          ),
        }))
        .filter((u) => u.shown.length > 0),
    [units, filter, q]
  );
  const filterCounts = useMemo(() => {
    const n = (f: Filter) => allRows.filter((r) => FILTER_MATCH[f](r.state as AcState, r)).length;
    return {
      ready: n('ready'),
      claimed: n('claimed'),
      submitted: n('submitted'),
      countersign: n('countersign'),
      to_confirm: n('to_confirm'),
      needs: n('needs'),
      passed: n('passed'),
      all: allRows.length,
    };
  }, [allRows]);
  const filterChips: { key: Filter; label: string }[] =
    mode === 'learner'
      ? [
          { key: 'all', label: 'All' },
          { key: 'needs', label: 'Needs more' },
          { key: 'submitted', label: LEARNER_STATE_LABEL.submitted },
          { key: 'claimed', label: LEARNER_STATE_LABEL.claimed },
          { key: 'passed', label: 'Passed' },
        ]
      : [
          { key: 'ready', label: 'Ready to assess' },
          ...(filterCounts.countersign > 0
            ? [{ key: 'countersign' as Filter, label: 'To countersign' }]
            : []),
          { key: 'needs', label: 'Needs more' },
          ...(mode === 'iqa' ? [{ key: 'to_confirm' as Filter, label: 'To confirm' }] : []),
          { key: 'passed', label: 'Passed' },
          { key: 'all', label: 'All' },
        ];

  const openSheet = () => setSheet(true);

  // Desktop: R records a decision for the ticked criteria, Escape clears them.
  useEffect(() => {
    if (!canDecide) return;
    const onKey = (e: KeyboardEvent) => {
      if (sheet || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (selected.size === 0) return;
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        setSheet(true);
      } else if (e.key === 'Escape') {
        setSelected(new Set());
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [canDecide, sheet, selected.size]);

  const toggle = (r: AcStateRow) => {
    if (!canDecide) return;
    setSelected((prev) => {
      const next = new Set(prev);
      const k = key(r);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const selectAllIn = (rows: AcStateRow[]) =>
    setSelected((prev) => {
      const next = new Set(prev);
      const allOn = rows.every((r) => next.has(key(r)));
      rows.forEach((r) => (allOn ? next.delete(key(r)) : next.add(key(r))));
      return next;
    });

  const countersign = async (r: AcStateRow) => {
    if (!r.decision_id || countersigning) return;
    setCountersigning(r.decision_id);
    try {
      const n = await countersignDecisions([r.decision_id]);
      toast({
        title: n ? 'Countersigned' : 'Nothing to countersign',
        description: n
          ? `${r.unit_code} AC ${r.ac_code} now counts as passed. ${first} has been told.`
          : 'A newer decision has replaced it.',
      });
      await refresh();
    } catch (e) {
      toast({
        title: 'Not countersigned',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setCountersigning(null);
    }
  };

  const iqaConfirm = async (r: AcStateRow) => {
    if (!r.decision_id) return;
    try {
      await setIqaVerdict(r.decision_id, 'confirmed');
      toast({ title: 'Confirmed', description: `${r.unit_code} AC ${r.ac_code}` });
    } catch (e) {
      toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' });
    }
  };
  const iqaReject = async () => {
    if (!iqaTarget?.decision_id) return;
    if (!iqaReason.trim()) {
      toast({
        title: 'Give a reason',
        description: 'The assessor needs to know what to look at again.',
      });
      return;
    }
    setSaving(true);
    try {
      await setIqaVerdict(iqaTarget.decision_id, 'not_confirmed', iqaReason);
      toast({ title: 'Marked not confirmed', description: 'The assessor will see your reason.' });
      setIqaTarget(null);
      setIqaReason('');
    } catch (e) {
      toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-6 text-[14px] text-white">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading criteria…
      </div>
    );
  }
  if (error && units.length === 0) {
    return (
      <div className={cn(cardCn, 'p-4 text-[14px] text-white sm:p-5')}>
        {error === 'not allowed'
          ? `You don't have access to ${first}'s criteria.`
          : `Couldn't load the criteria. Check your connection and try again.`}
      </div>
    );
  }
  if (units.length === 0) {
    return (
      <div className={cn(cardCn, 'p-4 sm:p-5')}>
        <p className="text-[15px] font-semibold text-white">No qualification set yet</p>
        <p className="mt-1 text-[14px] text-white">
          {mode === 'learner'
            ? 'Choose your qualification, or join your college, and your criteria appear here.'
            : `${first} has no qualification on record, so there are no criteria to assess yet.`}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', canDecide && 'pb-24')}>
      {/* Summary */}
      <div className={cn(cardCn, 'grid grid-cols-2 gap-x-2 gap-y-4 p-4 sm:grid-cols-4 sm:p-5')}>
        {[
          { label: 'Passed', value: totals.passedAll },
          { label: labels.submitted, value: totals.submitted },
          { label: 'Needs more', value: totals.referred + totals.not_yet + totals.iqa_rejected },
          { label: labels.claimed, value: totals.claimed },
        ].map((k) => (
          <div key={k.label}>
            <p className="font-mono text-[20px] font-bold tabular-nums text-white">{k.value}</p>
            <p className="text-[12px] text-white">{k.label}</p>
          </div>
        ))}
        <p className="col-span-2 flex items-center gap-2 text-[12px] text-white sm:col-span-4">
          {totals.not_started} of {totals.total} criteria not started yet.
          {mode === 'learner' ? ' Only your assessor can mark a criterion passed.' : ''}
          {refreshing && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-label="Updating" />}
        </p>
      </div>

      {/* Gap grid: unit by unit, with "n of 2" where two occasions are needed */}
      <button
        type="button"
        aria-expanded={showGrid}
        onClick={() => setShowGrid((v) => !v)}
        className="flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-white/[0.14] px-4 text-left text-[13.5px] font-semibold text-white touch-manipulation active:bg-white/[0.06] sm:w-auto"
      >
        <span>
          {showGrid ? 'Hide gap grid' : 'Gap grid'}
          {occ.needing > 0 && (
            <span className="font-medium">
              {' '}
              · {occ.met} of {occ.needing} at two occasions
            </span>
          )}
        </span>
      </button>
      {showGrid && (
        <OccasionsGrid
          rows={acRows}
          occasions={occasions.byKey}
          audience={mode === 'learner' ? 'learner' : 'staff'}
          onOpenCriterion={(unit) => {
            setShowGrid(false);
            setFilter('all');
            setOpen(unit);
          }}
        />
      )}

      {/* Filter + search */}
      <div className="space-y-3">
        {/* Quiet text tabs with counts and a yellow underline, as on the
            College Hub home. A rail that scrolls sideways on a phone. */}
        <div className="-mx-4 flex overflow-x-auto border-b border-white/[0.08] px-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {filterChips.map((c) => {
            const on = filter === c.key;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(c.key)}
                className={cn(
                  'relative inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-[13.5px] text-white touch-manipulation transition-colors hover:bg-white/[0.04]',
                  on ? 'font-semibold' : 'font-medium'
                )}
              >
                {c.label}
                <span className="tabular-nums">{filterCounts[c.key]}</span>
                {on && (
                  <span
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-elec-yellow"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search criteria, e.g. ring final, 022, isolation"
          aria-label="Search criteria"
          className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
        />
      </div>

      {/* Units */}
      {visibleUnits.length === 0 ? (
        <div className={cn(cardCn, 'p-4 sm:p-5')}>
          <p className="text-[14.5px] font-semibold text-white">
            {filter === 'ready' && !q
              ? mode === 'learner'
                ? 'No evidence against a criterion yet'
                : `Nothing waiting from ${first}`
              : 'No criteria match'}
          </p>
          <p className="mt-1 text-[13px] text-white">
            {filter === 'ready' && !q
              ? mode === 'learner'
                ? 'Add evidence and tag the criteria it shows. It appears here for your assessor.'
                : `When ${first} adds evidence against a criterion it appears here, ready for your decision.`
              : 'Try another filter, or clear the search.'}
          </p>
        </div>
      ) : (
        <div className={cn(cardCn, 'overflow-hidden')}>
          <ul className="divide-y divide-white/[0.08]">
            {visibleUnits.map((u) => {
              const isOpen = narrowing || open === u.unit_code || focusUnits.has(u.unit_code);
              const attention = u.counts.submitted + u.counts.referred + u.counts.not_yet;
              const allOn = u.shown.every((r) => selected.has(key(r)));
              return (
                <li key={u.unit_code}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(open === u.unit_code ? null : u.unit_code)}
                    className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation sm:px-5"
                  >
                    {/* The unit code sits in its own column from sm: up and above
                        the title on a phone, where a fixed column cramped it. */}
                    <span className="hidden w-16 shrink-0 font-mono text-[13px] font-bold text-white [overflow-wrap:anywhere] sm:block">
                      {u.unit_code}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[12px] font-bold text-white sm:hidden">
                        Unit {u.unit_code}
                      </span>
                      <span className="line-clamp-2 block text-[14px] font-semibold leading-snug text-white sm:line-clamp-1">
                        {u.unit_title}
                      </span>
                      <span className="block text-[12px] text-white">
                        {u.passed} of {u.total} passed
                        {canDecide && u.counts.submitted + u.counts.claimed > 0
                          ? ` · ${u.counts.submitted + u.counts.claimed} ready for you`
                          : ''}
                        {!canDecide && attention > 0
                          ? ` · ${attention} with your assessor or needing more`
                          : ''}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 shrink-0 text-white transition-transform',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/[0.08] bg-black/20">
                      {canDecide && u.shown.length > 1 && (
                        <div className="flex justify-end px-4 pt-1 sm:px-5">
                          <button
                            type="button"
                            onClick={() => selectAllIn(u.shown)}
                            className="h-11 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                          >
                            {allOn ? 'Clear these' : `Select all ${u.shown.length}`}
                          </button>
                        </div>
                      )}
                      <ul>
                        {u.shown.map((r) => {
                          const sel = selected.has(key(r));
                          const ownDecision = !!user && r.assessor_id === user.id;
                          const needsMore = r.state === 'referred' || r.state === 'not_yet';
                          return (
                            <li
                              key={key(r)}
                              data-focus-id={`ac:${key(r)}`}
                              className="border-b border-white/[0.05] last:border-0"
                            >
                              <button
                                type="button"
                                onClick={() => toggle(r)}
                                disabled={!canDecide}
                                aria-pressed={canDecide ? sel : undefined}
                                className={cn(
                                  'flex w-full items-start gap-3 px-4 py-3 text-left sm:px-5',
                                  canDecide && 'touch-manipulation',
                                  sel && 'bg-white/[0.08]'
                                )}
                              >
                                {canDecide && (
                                  <span
                                    aria-hidden
                                    className={cn(
                                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold',
                                      sel
                                        ? 'border-elec-yellow bg-elec-yellow text-black'
                                        : 'border-white/[0.3] text-transparent'
                                    )}
                                  >
                                    ✓
                                  </span>
                                )}
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[13.5px] text-white">
                                    <span className="font-mono font-semibold">AC {r.ac_code}</span>{' '}
                                    {r.ac_text}
                                  </span>
                                  {(witnessed.get(`${r.unit_code}|${r.ac_code}`) ?? []).map((w) => (
                                    <span
                                      key={w.id}
                                      className="mt-1 block text-[12.5px] font-medium text-white"
                                    >
                                      {witnessedByLine(w)}
                                      <span className="block font-normal">
                                        {witnessCompetenceLine(w)}
                                      </span>
                                    </span>
                                  ))}
                                  {r.decision_feedback && (
                                    <span className="mt-1 block text-[12.5px] text-white">
                                      {r.decision_id && previousCollege.get(r.decision_id)
                                        ? `Assessed at ${previousCollege.get(r.decision_id)} by `
                                        : ''}
                                      {assessorWithQualifications(
                                        r.assessor_name ?? 'Assessor',
                                        r.assessor_qualifications
                                      )}
                                      , {when(r.decided_at)}: “{r.decision_feedback}”
                                    </span>
                                  )}
                                  {!r.decision_feedback &&
                                    r.decision_id &&
                                    previousCollege.get(r.decision_id) && (
                                      <span className="mt-1 block text-[12.5px] text-white">
                                        Assessed at {previousCollege.get(r.decision_id)} by{' '}
                                        {assessorWithQualifications(
                                          r.assessor_name ?? 'Assessor',
                                          r.assessor_qualifications
                                        )}
                                        , {when(r.decided_at)}
                                      </span>
                                    )}
                                  {r.decision_feedback &&
                                    aiProvenanceLine(
                                      r.decision_feedback_source,
                                      r.assessor_name,
                                      r.decision_feedback_confirmed_at ?? r.decided_at
                                    ) && (
                                      <span className="mt-0.5 block text-[11.5px] text-white">
                                        {aiProvenanceLine(
                                          r.decision_feedback_source,
                                          r.assessor_name,
                                          r.decision_feedback_confirmed_at ?? r.decided_at
                                        )}
                                      </span>
                                    )}
                                  {r.iqa_feedback && (
                                    <span className="mt-1 block text-[12.5px] text-orange-300">
                                      IQA: “{r.iqa_feedback}”
                                    </span>
                                  )}
                                  {r.evidence_item_ids.length > 0 && (
                                    <span className="mt-0.5 block text-[12px] text-white">
                                      {r.evidence_item_ids.length} piece
                                      {r.evidence_item_ids.length === 1 ? '' : 's'} of evidence
                                    </span>
                                  )}
                                  {occasionCounter(
                                    occasions.byKey.get(occasionKey(r.unit_code, r.ac_code))
                                  ) && (
                                    <span className="mt-0.5 block text-[12px] font-semibold text-white">
                                      {occasionCounter(
                                        occasions.byKey.get(occasionKey(r.unit_code, r.ac_code))
                                      )}{' '}
                                      assessed occasions
                                    </span>
                                  )}
                                  {r.countersigned_at && (
                                    <span className="mt-0.5 block text-[12px] text-white">
                                      Countersigned by{' '}
                                      {r.countersigned_by_name ?? 'a qualified assessor'},{' '}
                                      {when(r.countersigned_at)}
                                    </span>
                                  )}
                                  {r.countersign_pending && (
                                    <span className="mt-0.5 block text-[12px] text-white">
                                      {mode === 'learner'
                                        ? 'Your assessor is in training. It counts once a qualified assessor countersigns it.'
                                        : `Trainee pass by ${r.assessor_name ?? 'the assessor'}. It counts once a qualified assessor countersigns it.`}
                                    </span>
                                  )}
                                </span>
                                <span
                                  className={cn(
                                    'shrink-0 rounded-full border px-2 py-0.5 text-[12px] font-semibold',
                                    r.countersign_pending &&
                                      'max-w-[9.5rem] text-center leading-tight',
                                    acRowChip(r)
                                  )}
                                >
                                  {acRowLabel(r, labels)}
                                </span>
                              </button>
                              {mode === 'learner' && needsMore && (
                                <div className="flex flex-wrap gap-2 px-4 pb-3 sm:px-5">
                                  <Link
                                    to={`/apprentice/hub?capture=1&ac=${encodeURIComponent(`${r.unit_code}:${r.ac_code}`)}`}
                                    className={cn(
                                      'inline-flex h-11 items-center rounded-xl px-4 text-[13px] font-semibold touch-manipulation',
                                      focusKeys.has(key(r))
                                        ? 'bg-elec-yellow text-black'
                                        : 'border border-white/[0.2] text-white'
                                    )}
                                  >
                                    Add what was missing
                                  </Link>
                                  {r.evidence_item_ids.length > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => setResendFor(r)}
                                      className="inline-flex h-11 items-center rounded-xl border border-white/[0.2] px-4 text-[13px] font-semibold text-white touch-manipulation"
                                    >
                                      Send again
                                    </button>
                                  )}
                                </div>
                              )}
                              {mode === 'iqa' &&
                                r.state === 'passed' &&
                                r.decision_id &&
                                !ownDecision && (
                                  <div className="flex gap-2 px-4 pb-3 sm:px-5">
                                    <button
                                      type="button"
                                      onClick={() => iqaConfirm(r)}
                                      className="h-11 flex-1 rounded-xl border border-emerald-400/40 text-[13px] font-semibold text-emerald-300 touch-manipulation"
                                    >
                                      IQA confirm
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIqaReason('');
                                        setIqaTarget(r);
                                      }}
                                      className="h-11 flex-1 rounded-xl border border-orange-500/40 text-[13px] font-semibold text-orange-300 touch-manipulation"
                                    >
                                      Not confirmed
                                    </button>
                                  </div>
                                )}
                              {canDecide &&
                                r.countersign_pending &&
                                r.decision_id &&
                                !ownDecision &&
                                !iAmTrainee && (
                                  <div className="px-4 pb-3 sm:px-5">
                                    <button
                                      type="button"
                                      data-testid="countersign-row"
                                      disabled={countersigning === r.decision_id}
                                      onClick={() => void countersign(r)}
                                      className="h-11 w-full rounded-xl border border-white/[0.2] px-4 text-[13.5px] font-semibold text-white touch-manipulation active:bg-white/[0.06] disabled:opacity-50 sm:w-auto"
                                    >
                                      {countersigning === r.decision_id
                                        ? 'Countersigning…'
                                        : `Countersign ${r.assessor_name?.split(' ')[0] ?? 'the trainee'}'s pass`}
                                    </button>
                                  </div>
                                )}
                              {canDecide &&
                                (
                                  staffNotes.byCriterion.get(
                                    staffNoteKey(r.unit_code, r.ac_code)
                                  ) ?? []
                                ).length > 0 && (
                                  <div className="px-4 pb-3 sm:px-5">
                                    <StaffNotesList
                                      notes={
                                        staffNotes.byCriterion.get(
                                          staffNoteKey(r.unit_code, r.ac_code)
                                        ) ?? []
                                      }
                                      limit={2}
                                    />
                                  </div>
                                )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Sticky action */}
      {canDecide && selected.size > 0 && (
        <div
          className={cn(
            'fixed inset-x-0 z-[55] border-t border-white/[0.14] bg-background/95 p-3 backdrop-blur',
            // Wide screens: a floating bar, so it never runs under the sidebar.
            'lg:inset-x-auto lg:bottom-6 lg:left-1/2 lg:rounded-2xl lg:border lg:pb-3 lg:shadow-2xl',
            appSidebar
              ? 'lg:w-[min(720px,calc(100vw-22rem))] lg:translate-x-[calc(-50%+8rem)]'
              : 'lg:w-[min(720px,calc(100vw-4rem))] lg:-translate-x-1/2',
            'bottom-0 pb-[calc(env(safe-area-inset-bottom)+12px)]'
          )}
        >
          <div className="mx-auto flex max-w-3xl gap-2">
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="h-11 rounded-xl border border-white/[0.2] px-4 text-[14px] font-semibold text-white touch-manipulation"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setNoteOpen(true)}
              className="h-11 rounded-xl border border-white/[0.2] px-4 text-[14px] font-semibold text-white touch-manipulation"
            >
              Note
            </button>
            <button
              type="button"
              onClick={openSheet}
              className="h-11 flex-1 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation"
            >
              Record decision for {selected.size}
              <span className="ml-2 hidden text-[12px] font-medium lg:inline">(R)</span>
            </button>
          </div>
        </div>
      )}

      {/* Decision sheet: the one way to pass a criterion (ELE-1867) */}
      {canDecide && (
        <AcDecisionSheet
          open={sheet}
          onOpenChange={setSheet}
          learnerId={learnerId}
          learnerName={learnerName}
          rows={selectedRows}
          record={recordDecisions}
          onRecorded={() => setSelected(new Set())}
        />
      )}

      {/* Staff-only note on the ticked criteria (batch 2) */}
      {canDecide && (
        <StaffNoteSheet
          open={noteOpen}
          onOpenChange={setNoteOpen}
          learnerName={learnerName}
          scopeLabel={
            selectedRows
              .slice(0, 6)
              .map((r) => `${r.unit_code} AC ${r.ac_code}`)
              .join(', ') + (selectedRows.length > 6 ? ` and ${selectedRows.length - 6} more` : '')
          }
          existing={staffNotes.notes.filter((n) =>
            selectedRows.some((r) =>
              (n.criteria ?? []).includes(staffNoteKey(r.unit_code, r.ac_code))
            )
          )}
          onAdd={async (body) => {
            await staffNotes.add({
              body,
              criteria: selectedRows.map((r) => staffNoteKey(r.unit_code, r.ac_code)),
            });
          }}
        />
      )}

      {/* Learner: send the evidence on a criterion that needs more (ELE-1868) */}
      {mode === 'learner' && resendFor && (
        <LearnerResend row={resendFor} learnerId={learnerId} onClose={() => setResendFor(null)} />
      )}

      {/* IQA "not confirmed" reason */}
      <Sheet open={!!iqaTarget} onOpenChange={(v) => !v && setIqaTarget(null)}>
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          <div className="flex h-full flex-col bg-background">
            <div className="border-b border-white/[0.1] px-4 py-4">
              <SheetTitle className="text-[16px] font-semibold text-white">
                Not confirmed
              </SheetTitle>
              <p className="mt-0.5 text-[12.5px] text-white">
                {iqaTarget
                  ? `${iqaTarget.unit_code} AC ${iqaTarget.ac_code}, passed by ${iqaTarget.assessor_name ?? 'the assessor'}`
                  : ''}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <label htmlFor="iqa-reason" className="mb-1 block text-[12px] font-medium text-white">
                What should the assessor look at again? (required)
              </label>
              <textarea
                id="iqa-reason"
                value={iqaReason}
                onChange={(e) => setIqaReason(e.target.value)}
                placeholder="e.g. The evidence covers the ring final but not the radial circuit in 2.1."
                className={textareaCn}
              />
            </div>
            <div className="border-t border-white/[0.1] p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              <button
                type="button"
                disabled={saving}
                onClick={iqaReject}
                className="h-11 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black disabled:opacity-50 touch-manipulation"
              >
                {saving ? 'Saving…' : 'Record not confirmed'}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

/**
 * "Send again" from the progress screen a decision push opens: the evidence
 * cited on that criterion, ticked, through the same signed declaration as the
 * evidence detail (submit_portfolio_evidence allows the resend once a newer
 * decision exists).
 */
function LearnerResend({
  row,
  learnerId,
  onClose,
}: {
  row: AcStateRow;
  learnerId: string;
  onClose: () => void;
}) {
  const { items, loading } = usePortfolio(learnerId);
  const chosen = useMemo(
    () => items.filter((i) => row.evidence_item_ids.includes(i.id)),
    [items, row]
  );
  const none = !loading && chosen.length === 0;
  useEffect(() => {
    if (none) onClose();
  }, [none, onClose]);
  if (loading) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-center gap-2 border-t border-white/[0.14] bg-background/95 p-4 text-[14px] text-white">
        <Loader2 className="h-4 w-4 animate-spin" /> Getting your evidence…
      </div>
    );
  }
  if (chosen.length === 0) {
    return null;
  }
  return (
    <SubmitEvidenceSheet
      items={chosen}
      open
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
      resend
      selectable={chosen.length > 1}
    />
  );
}

export default LearnerAssessmentView;
