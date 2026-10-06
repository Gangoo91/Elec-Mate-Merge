/**
 * LearnerAssessmentView — one screen for the whole assessment loop (ELE-1867/1868/1871).
 *
 *   mode 'assessor'  filter → tap criteria → "Record decision" → Passed / Needs more / Not yet
 *   mode 'iqa'       as assessor, plus Confirm / Not confirmed on others' passed criteria
 *   mode 'learner'   read-only: every criterion's honest state and the assessor's feedback
 *
 * Reads the single state function (usePortfolioAcState). Decisions are
 * append-only server-side; a new decision supersedes the last. The decision
 * sheet shows the evidence itself (description, files, signed witness
 * statements) so an assessor never decides on a title alone.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { openEvidence } from '@/lib/evidenceUrl';
import {
  usePortfolioAcState,
  STATE_CHIP,
  STATE_LABEL,
  type AcState,
  type AcStateRow,
} from '@/hooks/portfolio/usePortfolioAcState';

type Mode = 'assessor' | 'iqa' | 'learner';

interface EvidenceFile {
  name?: string;
  type?: string;
  url?: string;
}
interface EvidenceItem {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  file_url: string | null;
  storage_urls: EvidenceFile[] | null;
  assessment_criteria_met: string[] | null;
}
interface WitnessRow {
  id: string;
  portfolio_item_id: string | null;
  witness_name: string | null;
  witness_role: string | null;
  witness_company: string | null;
  statement: string | null;
  signed_at: string | null;
}

const APP_CARD =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';
/** Landing-page card (public pages): rounded at every width, gold edge, lit surface. */
const PUBLIC_CARD = cn('rounded-2xl border border-elec-yellow/35', CARD_SURFACE);
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const textareaCn =
  'min-h-[110px] w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 ' +
  'text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow ' +
  'focus:outline-none focus:ring-0 touch-manipulation';

const DECISIONS: { key: 'passed' | 'referred' | 'not_yet'; label: string }[] = [
  { key: 'passed', label: 'Passed' },
  { key: 'referred', label: 'Needs more' },
  { key: 'not_yet', label: 'Not yet' },
];

const METHODS: { key: string; label: string }[] = [
  { key: 'evidence_review', label: 'Evidence' },
  { key: 'observation', label: 'Observed' },
  { key: 'professional_discussion', label: 'Discussion' },
  { key: 'questioning', label: 'Questions' },
  { key: 'witness', label: 'Witness' },
];
/** A pass on these methods can stand without a portfolio item ticked. */
const NO_ITEM_NEEDED = new Set(['observation', 'professional_discussion', 'questioning', 'witness']);

const key = (r: { unit_code: string; ac_code: string }) => `${r.unit_code}::${r.ac_code}`;

type Filter = 'ready' | 'to_confirm' | 'needs' | 'passed' | 'all';

const FILTER_MATCH: Record<Filter, (st: AcState, r: AcStateRow) => boolean> = {
  // Evidence the learner has put forward that nobody has decided on yet.
  ready: (st) => st === 'submitted' || st === 'claimed',
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

function filesOf(e: EvidenceItem): EvidenceFile[] {
  const list = Array.isArray(e.storage_urls) ? e.storage_urls.filter((f) => f?.url) : [];
  if (list.length === 0 && e.file_url) list.push({ name: 'Attachment', url: e.file_url });
  return list;
}

// The declared type wins; the file name is only a fallback when no type was stored.
const isImage = (f: EvidenceFile) =>
  f.type ? f.type.startsWith('image') : /\.(jpe?g|png|webp|heic|gif)(\?|$)/i.test(f.url ?? '');

export function LearnerAssessmentView({
  learnerId,
  mode,
  learnerName,
  aboveBottomNav = false,
  appSidebar = true,
}: {
  learnerId: string;
  mode: Mode;
  learnerName?: string;
  /** Inside the College Hub on a phone the section nav is fixed to the bottom; sit above it. */
  aboveBottomNav?: boolean;
  /** Inside the app shell the desktop bar shifts right to clear the sidebar; public pages have none. */
  appSidebar?: boolean;
}) {
  const { toast } = useToast();
  const { user } = useAuth();
  const { units, totals, loading, refreshing, error, recordDecisions, setIqaVerdict } =
    usePortfolioAcState(learnerId);
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>(mode === 'learner' ? 'all' : 'ready');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sheet, setSheet] = useState(false);
  const [decision, setDecision] = useState<'passed' | 'referred' | 'not_yet'>('passed');
  const [method, setMethod] = useState('evidence_review');
  const [feedback, setFeedback] = useState('');
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [witnesses, setWitnesses] = useState<WitnessRow[]>([]);
  const [evidenceError, setEvidenceError] = useState<string | null>(null);
  const [chosenEvidence, setChosenEvidence] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [iqaTarget, setIqaTarget] = useState<AcStateRow | null>(null);
  const [iqaReason, setIqaReason] = useState('');
  const canDecide = mode === 'assessor' || mode === 'iqa';
  const first = learnerName?.split(' ')[0] ?? 'This learner';
  const cardCn = appSidebar ? APP_CARD : PUBLIC_CARD;

  const loadEvidence = useCallback(async () => {
    if (!canDecide) return;
    const [items, wit] = await Promise.all([
      supabase
        .from('portfolio_items')
        .select('id, title, description, created_at, file_url, storage_urls, assessment_criteria_met')
        .eq('user_id', learnerId)
        .order('created_at', { ascending: false })
        .limit(200),
      supabase
        .from('portfolio_witness_statements' as never)
        .select('id, portfolio_item_id, witness_name, witness_role, witness_company, statement, signed_at')
        .eq('learner_id', learnerId)
        .eq('status', 'signed'),
    ]);
    if (items.error) {
      setEvidenceError(items.error.message);
      return;
    }
    setEvidenceError(null);
    setEvidence(((items.data ?? []) as unknown) as EvidenceItem[]);
    setWitnesses(((wit.data ?? []) as unknown) as WitnessRow[]);
  }, [learnerId, canDecide]);

  useEffect(() => {
    void loadEvidence();
  }, [loadEvidence]);

  const allRows = useMemo(() => units.flatMap((u) => u.rows), [units]);
  const selectedRows = useMemo(() => allRows.filter((r) => selected.has(key(r))), [allRows, selected]);

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
                `${u.unit_code} ${u.unit_title} ac ${r.ac_code} ${r.ac_text ?? ''}`.toLowerCase().includes(q))
          ),
        }))
        .filter((u) => u.shown.length > 0),
    [units, filter, q]
  );
  const filterCounts = useMemo(() => {
    const n = (f: Filter) => allRows.filter((r) => FILTER_MATCH[f](r.state as AcState, r)).length;
    return { ready: n('ready'), to_confirm: n('to_confirm'), needs: n('needs'), passed: n('passed'), all: allRows.length };
  }, [allRows]);
  const filterChips: { key: Filter; label: string }[] =
    mode === 'learner'
      ? [
          { key: 'all', label: 'All' },
          { key: 'needs', label: 'Needs more' },
          { key: 'ready', label: 'Evidence added' },
          { key: 'passed', label: 'Passed' },
        ]
      : [
          { key: 'ready', label: 'Ready to assess' },
          { key: 'needs', label: 'Needs more' },
          ...(mode === 'iqa' ? [{ key: 'to_confirm' as Filter, label: 'To confirm' }] : []),
          { key: 'passed', label: 'Passed' },
          { key: 'all', label: 'All' },
        ];

  // Evidence for the sheet: items cited on the selected criteria first, then the rest.
  const citedIds = useMemo(() => {
    const ids = new Set<string>();
    selectedRows.forEach((r) => r.evidence_item_ids.forEach((i) => ids.add(i)));
    return ids;
  }, [selectedRows]);
  const sheetEvidence = useMemo(
    () => [...evidence.filter((e) => citedIds.has(e.id)), ...evidence.filter((e) => !citedIds.has(e.id))],
    [evidence, citedIds]
  );
  const witnessByItem = useMemo(() => {
    const m = new Map<string, WitnessRow[]>();
    witnesses.forEach((w) => {
      if (!w.portfolio_item_id) return;
      m.set(w.portfolio_item_id, [...(m.get(w.portfolio_item_id) ?? []), w]);
    });
    return m;
  }, [witnesses]);

  const openSheet = () => {
    setChosenEvidence(new Set(citedIds));
    setFeedback('');
    setDecision('passed');
    setMethod('evidence_review');
    setExpanded(null);
    void loadEvidence();
    setSheet(true);
  };

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

  const passNeedsItem = decision === 'passed' && !NO_ITEM_NEEDED.has(method) && chosenEvidence.size === 0;

  const save = async () => {
    if (decision !== 'passed' && !feedback.trim()) {
      toast({ title: 'Say what is needed', description: 'Feedback is required when it is not a pass.' });
      return;
    }
    if (passNeedsItem) {
      toast({
        title: 'Tick the evidence',
        description: 'A pass on evidence needs at least one item. If you saw it done, choose Observed.',
      });
      return;
    }
    setSaving(true);
    try {
      await recordDecisions({
        criteria: selectedRows.map((r) => ({ unit_code: r.unit_code, ac_code: r.ac_code })),
        decision,
        feedback,
        evidenceItemIds: [...chosenEvidence],
        method,
      });
      toast({
        title: `${selectedRows.length} decision${selectedRows.length === 1 ? '' : 's'} recorded`,
        description: `${first} has been told.`,
      });
      setSelected(new Set());
      setSheet(false);
    } catch (e) {
      toast({ title: 'Could not record', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
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
      toast({ title: 'Give a reason', description: 'The assessor needs to know what to look at again.' });
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
    <div className={cn('space-y-4', canDecide && (aboveBottomNav ? 'pb-40 lg:pb-24' : 'pb-24'))}>
      {/* Summary */}
      <div className={cn(cardCn, 'grid grid-cols-2 gap-x-2 gap-y-4 p-4 sm:grid-cols-4 sm:p-5')}>
        {[
          { label: 'Passed', value: totals.passedAll },
          { label: mode === 'learner' ? 'With your assessor' : 'Submitted', value: totals.submitted },
          { label: 'Needs more', value: totals.referred + totals.not_yet + totals.iqa_rejected },
          { label: 'Evidence added', value: totals.claimed },
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

      {/* Filter + search */}
      <div className="space-y-3">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {filterChips.map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={filter === c.key}
              onClick={() => setFilter(c.key)}
              className={cn(
                'h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-[13px] touch-manipulation',
                filter === c.key ? chipOn : chipOff
              )}
            >
              {c.label}
              <span className="ml-1.5 font-mono tabular-nums">{filterCounts[c.key]}</span>
            </button>
          ))}
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
              const isOpen = narrowing || open === u.unit_code;
              const pct = u.total ? Math.round((100 * u.passed) / u.total) : 0;
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
                    <span className="w-12 shrink-0 font-mono text-[13px] font-bold text-white">{u.unit_code}</span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 block text-[14px] font-semibold leading-snug text-white sm:line-clamp-1">
                        {u.unit_title}
                      </span>
                      <span className="block text-[12px] text-white">
                        {u.passed} of {u.total} passed
                        {canDecide && u.counts.submitted + u.counts.claimed > 0
                          ? ` · ${u.counts.submitted + u.counts.claimed} ready for you`
                          : ''}
                        {!canDecide && attention > 0 ? ` · ${attention} with your assessor or needing more` : ''}
                      </span>
                    </span>
                    <span className="w-10 shrink-0 text-right font-mono text-[13px] tabular-nums text-white">{pct}%</span>
                    <ChevronDown className={cn('h-4 w-4 shrink-0 text-white transition-transform', isOpen && 'rotate-180')} />
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
                          return (
                            <li key={key(r)} className="border-b border-white/[0.05] last:border-0">
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
                                      sel ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.3] text-transparent'
                                    )}
                                  >
                                    ✓
                                  </span>
                                )}
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[13.5px] text-white">
                                    <span className="font-mono font-semibold">AC {r.ac_code}</span> {r.ac_text}
                                  </span>
                                  {r.decision_feedback && (
                                    <span className="mt-1 block text-[12.5px] text-white">
                                      {r.assessor_name ?? 'Assessor'}, {when(r.decided_at)}: “{r.decision_feedback}”
                                    </span>
                                  )}
                                  {r.iqa_feedback && (
                                    <span className="mt-1 block text-[12.5px] text-orange-300">
                                      IQA: “{r.iqa_feedback}”
                                    </span>
                                  )}
                                  {r.evidence_item_ids.length > 0 && (
                                    <span className="mt-0.5 block text-[12px] text-white">
                                      {r.evidence_item_ids.length} piece{r.evidence_item_ids.length === 1 ? '' : 's'} of evidence
                                    </span>
                                  )}
                                </span>
                                <span className={cn('shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold', STATE_CHIP[r.state as AcState])}>
                                  {STATE_LABEL[r.state as AcState]}
                                </span>
                              </button>
                              {mode === 'iqa' && r.state === 'passed' && r.decision_id && !ownDecision && (
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
            aboveBottomNav
              ? 'bottom-[calc(3.5rem+env(safe-area-inset-bottom))]'
              : 'bottom-0 pb-[calc(env(safe-area-inset-bottom)+12px)]'
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
              onClick={openSheet}
              className="h-11 flex-1 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation"
            >
              Record decision for {selected.size}
            </button>
          </div>
        </div>
      )}

      {/* Decision sheet */}
      <Sheet open={sheet} onOpenChange={setSheet}>
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          <div className="flex h-full flex-col bg-background">
            <div className="border-b border-white/[0.1] px-4 py-4">
              <SheetTitle className="text-[16px] font-semibold text-white">
                {selectedRows.length} criteri{selectedRows.length === 1 ? 'on' : 'a'} for {first}
              </SheetTitle>
              <p className="mt-0.5 text-[12.5px] text-white">
                {selectedRows.slice(0, 4).map((r) => `${r.unit_code} AC ${r.ac_code}`).join(', ')}
                {selectedRows.length > 4 ? ` and ${selectedRows.length - 4} more` : ''}
              </p>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
              <fieldset>
                <legend className="mb-2 text-[12px] font-medium text-white">Decision</legend>
                <div className="grid grid-cols-3 gap-2">
                  {DECISIONS.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      aria-pressed={decision === d.key}
                      onClick={() => setDecision(d.key)}
                      className={cn('h-11 rounded-xl border text-[14px] touch-manipulation', decision === d.key ? chipOn : chipOff)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-[12px] font-medium text-white">How you assessed it</legend>
                <div className="flex flex-wrap gap-2">
                  {METHODS.map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      aria-pressed={method === m.key}
                      onClick={() => setMethod(m.key)}
                      className={cn('h-11 rounded-full border px-4 text-[13px] touch-manipulation', method === m.key ? chipOn : chipOff)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="decision-feedback" className="mb-1 block text-[12px] font-medium text-white">
                  Feedback for {first}
                  {decision !== 'passed' ? ' (required)' : ''}
                </label>
                <textarea
                  id="decision-feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={
                    decision === 'passed'
                      ? 'What was good about this evidence?'
                      : 'Exactly what is missing and how to get it.'
                  }
                  className={textareaCn}
                />
              </div>

              <div>
                <p className="mb-2 text-[12px] font-medium text-white">
                  Evidence this decision is based on
                  {decision === 'passed' && !NO_ITEM_NEEDED.has(method) ? ' (at least one)' : ''}
                </p>
                {evidenceError ? (
                  <p className="text-[13px] text-white">Couldn't load {first}'s evidence. Close and try again.</p>
                ) : sheetEvidence.length === 0 ? (
                  <p className="text-[13px] text-white">
                    {first} has no evidence yet. Choose Observed, Discussion or Questions if you assessed it directly.
                  </p>
                ) : (
                  <ul className="divide-y divide-white/[0.08] rounded-xl border border-white/[0.12]">
                    {sheetEvidence.map((e) => {
                      const on = chosenEvidence.has(e.id);
                      const isOpen = expanded === e.id;
                      const files = filesOf(e);
                      const wits = witnessByItem.get(e.id) ?? [];
                      return (
                        <li key={e.id}>
                          <div className="flex items-center gap-1 pr-1">
                            <button
                              type="button"
                              aria-pressed={on}
                              onClick={() =>
                                setChosenEvidence((p) => {
                                  const n = new Set(p);
                                  if (n.has(e.id)) n.delete(e.id);
                                  else n.add(e.id);
                                  return n;
                                })
                              }
                              className="flex min-h-11 min-w-0 flex-1 items-center gap-3 px-3 py-2 text-left touch-manipulation"
                            >
                              <span
                                aria-hidden
                                className={cn(
                                  'flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold',
                                  on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.3] text-transparent'
                                )}
                              >
                                ✓
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[13.5px] text-white">{e.title}</span>
                                <span className="block text-[11.5px] text-white">
                                  {when(e.created_at)}
                                  {citedIds.has(e.id) ? ' · cited on these criteria' : ''}
                                  {files.length ? ` · ${files.length} file${files.length === 1 ? '' : 's'}` : ''}
                                  {wits.length ? ' · witnessed' : ''}
                                </span>
                              </span>
                            </button>
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              aria-label={isOpen ? 'Hide evidence' : 'View evidence'}
                              onClick={() => setExpanded(isOpen ? null : e.id)}
                              className="h-11 shrink-0 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                            >
                              {isOpen ? 'Hide' : 'View'}
                            </button>
                          </div>
                          {isOpen && (
                            <div className="space-y-3 border-t border-white/[0.08] px-3 py-3">
                              {e.description && (
                                <p className="whitespace-pre-line text-[13px] text-white">{e.description}</p>
                              )}
                              {files.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                                  {files.map((f, i) =>
                                    isImage(f) ? (
                                      <button
                                        key={i}
                                        type="button"
                                        onClick={() => void openEvidence(f.url)}
                                        aria-label={`Open ${f.name ?? 'photo'}`}
                                        className="block aspect-square overflow-hidden rounded-lg border border-white/[0.12] touch-manipulation"
                                      >
                                        <EvidenceImage src={f.url} alt={f.name ?? 'Evidence photo'} loading="lazy" className="h-full w-full object-cover" />
                                      </button>
                                    ) : (
                                      <button
                                        key={i}
                                        type="button"
                                        onClick={() => void openEvidence(f.url)}
                                        className="col-span-3 flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.12] px-3 text-left text-[13px] text-white touch-manipulation sm:col-span-4"
                                      >
                                        <ExternalLink className="h-4 w-4 shrink-0" />
                                        <span className="truncate">{f.name ?? 'Open file'}</span>
                                      </button>
                                    )
                                  )}
                                </div>
                              )}
                              {wits.map((w) => (
                                <div key={w.id} className="rounded-lg border border-emerald-400/30 bg-emerald-500/[0.08] p-3">
                                  <p className="text-[12.5px] font-semibold text-emerald-300">
                                    Witness statement, signed {when(w.signed_at)}
                                  </p>
                                  <p className="mt-1 whitespace-pre-line text-[13px] text-white">“{w.statement}”</p>
                                  <p className="mt-1 text-[12px] text-white">
                                    {w.witness_name}
                                    {w.witness_role ? `, ${w.witness_role}` : ''}
                                    {w.witness_company ? `, ${w.witness_company}` : ''}
                                  </p>
                                </div>
                              ))}
                              {!e.description && files.length === 0 && wits.length === 0 && (
                                <p className="text-[13px] text-white">No description or files on this item.</p>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
            <div className="border-t border-white/[0.1] p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              {passNeedsItem && (
                <p className="mb-2 text-center text-[12.5px] text-white">
                  Tick at least one piece of evidence, or choose how you saw it done.
                </p>
              )}
              <button
                type="button"
                disabled={saving}
                onClick={save}
                className="h-11 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black disabled:opacity-50 touch-manipulation"
              >
                {saving ? 'Recording…' : `Record ${DECISIONS.find((d) => d.key === decision)?.label.toLowerCase()}`}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* IQA "not confirmed" reason */}
      <Sheet open={!!iqaTarget} onOpenChange={(v) => !v && setIqaTarget(null)}>
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          <div className="flex h-full flex-col bg-background">
            <div className="border-b border-white/[0.1] px-4 py-4">
              <SheetTitle className="text-[16px] font-semibold text-white">Not confirmed</SheetTitle>
              <p className="mt-0.5 text-[12.5px] text-white">
                {iqaTarget ? `${iqaTarget.unit_code} AC ${iqaTarget.ac_code}, passed by ${iqaTarget.assessor_name ?? 'the assessor'}` : ''}
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

export default LearnerAssessmentView;
