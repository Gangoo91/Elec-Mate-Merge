import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  useAcMatrix,
  type AcCellRow,
  type AcStatus,
  type EvidenceTypeCode,
} from '@/hooks/useAcMatrix';
import { AcEvidenceLockerSheet } from '@/components/college/sheets/AcEvidenceLockerSheet';
import { ExportPackSheet } from '@/components/portfolio-export/ExportPackSheet';
import { UsesAi } from '@/components/college/ui/UsesAi';
import { AcDecisionSheet } from '@/components/assessment/AcDecisionSheet';
import {
  usePortfolioAcState,
  STATE_CHIP,
  STATE_LABEL,
  STATE_SWATCH,
  type AcState,
  type AcStateRow,
} from '@/hooks/portfolio/usePortfolioAcState';
import {
  occasionCounter,
  occasionKey,
  useAcOccasions,
  type AcOccasionRow,
} from '@/hooks/portfolio/useAcOccasions';
import { OccasionsGrid } from '@/components/portfolio/OccasionsGrid';

/* ==========================================================================
   SectionAcMatrix — premium AC coverage view on Student 360.

   Renders every AC for the apprentice's qualification grouped by unit and
   LO, with per-evidence-type counts, mandatory-requirement gap flags and a
   click-through to the per-AC Evidence Locker drawer.

   Two view modes:
     - "matrix" — heatmap grid: rows ACs × columns evidence types
     - "list"   — one row per AC with status + evidence count + gap warning

   ELE-942 / [Assessor pack 1].
   ========================================================================== */

const EVIDENCE_TYPE_LABEL: Record<EvidenceTypeCode, string> = {
  observation: 'Obs',
  photo: 'Photo',
  video: 'Video',
  witness: 'Witness',
  document: 'Doc',
  test_result: 'Test',
  work_log: 'Log',
  reflection: 'Refl',
  otj: 'OTJ',
  quiz: 'Quiz',
  certificate: 'Cert',
  drawing: 'Draw',
  calculation: 'Calc',
};

const STATUS_LABEL: Record<AcStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  evidenced: 'Evidenced',
  assessed: 'Assessed',
  confirmed: 'Confirmed',
};

/*
 * Status is TEXT. Not started and in progress are neutral (the learner's own
 * activity); evidenced is volt (something for an assessor to look at);
 * assessed and IQA-confirmed are emerald — the two genuinely good states.
 * The old blue/amber/emerald/volt washes were four colours for a scale.
 */
const STATUS_TONE: Record<AcStatus, { dot: string; text: string; chipBg: string }> = {
  not_started: {
    dot: 'bg-white/[0.3]',
    text: 'text-white',
    chipBg: 'bg-white/[0.06] border-white/[0.14]',
  },
  in_progress: {
    dot: 'bg-white/[0.6]',
    text: 'text-white',
    chipBg: 'bg-white/[0.06] border-white/[0.14]',
  },
  evidenced: {
    dot: 'bg-elec-yellow',
    text: 'text-elec-yellow',
    chipBg: 'border-elec-yellow/35',
  },
  assessed: {
    dot: 'bg-emerald-400/60',
    text: 'text-emerald-300',
    chipBg: 'bg-emerald-500/[0.08] border-emerald-400/30',
  },
  confirmed: {
    dot: 'bg-emerald-400',
    text: 'text-emerald-300',
    chipBg: 'bg-emerald-500/[0.08] border-emerald-400/30',
  },
};

const CARD = cn(
  'overflow-hidden -mx-4 border-y border-white/[0.08] sm:mx-0 sm:rounded-3xl sm:border-x',
  CARD_SURFACE
);

type ViewMode = 'matrix' | 'list' | 'grid';

const acKey = (cell: AcCellRow) => `${cell.unit_code}:${cell.ac_code}`;

/*
 * ELE-1917: for a learner with an account, every status on this matrix reads
 * get_portfolio_ac_state — the same state the learner, the assessor workspace
 * and the criteria list above read. student_ac_coverage still supplies the
 * evidence-type counts and requirement gaps, which the state function does
 * not carry. Null for a learner with no account (old coverage rows only).
 */
const AcStateCtx = createContext<Map<string, AcState> | null>(null);
/** Separate assessed occasions per criterion (C&G 5357 workplace units need two). */
const OccCtx = createContext<Map<string, AcOccasionRow> | null>(null);

/** Bar order, done first. */
const STATE_ORDER: AcState[] = [
  'iqa_confirmed',
  'passed',
  'submitted',
  'referred',
  'not_yet',
  'iqa_rejected',
  'claimed',
  'suggested',
];

interface Props {
  studentId: string;
  studentUserId: string | null;
  studentName: string;
}

export function SectionAcMatrix({ studentId, studentUserId, studentName }: Props) {
  const { toast } = useToast();
  const { data, loading, error, evidenceTypes, refresh } = useAcMatrix(studentId, studentUserId);
  const acState = usePortfolioAcState(studentUserId);
  // Reloads with every decision (acState.rows updates live).
  const occasions = useAcOccasions(studentUserId, acState.rows);
  const stateMap = useMemo(() => {
    if (!studentUserId || acState.rows.length === 0) return null;
    // Only overlay the state onto the same qualification's grid: a learner
    // with coverage rows for two qualifications must not borrow states.
    const stateCode = acState.rows[0]?.qualification_code;
    if (data?.qualification_code && stateCode && data.qualification_code !== stateCode) return null;
    return new Map(acState.rows.map((r) => [`${r.unit_code}:${r.ac_code}`, r.state] as const));
  }, [studentUserId, acState.rows, data?.qualification_code]);
  // Default to the list view on phones — the matrix heatmap needs horizontal
  // scroll that doesn't belong on a small screen; desktop still opens the grid.
  const [mode, setMode] = useState<ViewMode>(() =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? 'list' : 'matrix'
  );
  const [filterGapsOnly, setFilterGapsOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [openLocker, setOpenLocker] = useState<AcCellRow | null>(null);

  // Decide several (ELE-1867): tick a batch of ACs and record ONE decision
  // for them through the decision sheet (record_ac_decisions). The old bulk
  // sign-off wrote ac_signoffs + student_ac_coverage with no verdict; the
  // server now mirrors every real decision into both.
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedAcs, setSelectedAcs] = useState<Set<string>>(new Set());
  const [deciding, setDeciding] = useState(false);
  // ELE-2017: the matrix PDF is the evidence pack's "Criteria with evidence
  // or a decision" pages, made by PDFMonkey, not a browser print.
  const [packOpen, setPackOpen] = useState(false);

  // Persistent collapsed state, keyed per-student in localStorage so a
  // tutor returning to the same learner gets back their last layout.
  // `.v2`: the old key had been written by the previous Student 360 page for
  // every learner a tutor had opened, with an EMPTY set (all expanded) — so
  // the new collapsed-by-default rule never fired for anyone with history.
  // A new key gives everybody the new default exactly once.
  const collapseStorageKey = `acMatrix.collapsed.v2.${studentId}`;
  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = window.localStorage.getItem(collapseStorageKey);
      if (raw) return new Set(JSON.parse(raw) as string[]);
    } catch {
      // ignore
    }
    return new Set();
  });
  // Declared BEFORE the persistence effect on purpose: that effect used to
  // write the initial empty set to storage on mount, before the data had
  // arrived — so by the time the first-load rule below ran, a "stored
  // preference" always existed and every unit opened expanded.
  const initialisedRef = useRef(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!initialisedRef.current) return;
    try {
      window.localStorage.setItem(collapseStorageKey, JSON.stringify(Array.from(collapsed)));
    } catch {
      // ignore
    }
  }, [collapsed, collapseStorageKey]);

  // First-load collapse: when the data lands and there's NO stored
  // preference for this student, auto-collapse EVERY unit. It used to leave
  // the first one open, but on the 5357 standard the "first unit" is the
  // whole qualification — 340 criteria — so the page opened as a wall of
  // "Not started" rows that swallowed everything beneath it (portfolio,
  // quizzes, observations, EPA). A tutor opens a unit on purpose.
  useEffect(() => {
    if (initialisedRef.current) return;
    if (!data || data.units.length === 0) return;
    let hadStored = false;
    if (typeof window !== 'undefined') {
      hadStored = window.localStorage.getItem(collapseStorageKey) !== null;
    }
    if (!hadStored) {
      const next = new Set(data.units.map((u) => u.unit_code));
      setCollapsed(next);
    }
    initialisedRef.current = true;
  }, [data, collapseStorageKey]);

  const visibleEvidenceTypes = evidenceTypes;

  const filteredUnits = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    return data.units
      .map((u) => ({
        ...u,
        los: u.los
          .map((lo) => ({
            ...lo,
            acs: lo.acs.filter((cell) => {
              if (filterGapsOnly && (!cell.requirement?.is_mandatory || cell.meets_requirement)) {
                return false;
              }
              if (!q) return true;
              return (
                cell.ac_code.toLowerCase().includes(q) ||
                cell.ac_text.toLowerCase().includes(q) ||
                cell.unit_code.toLowerCase().includes(q)
              );
            }),
          }))
          .filter((lo) => lo.acs.length > 0),
      }))
      .filter((u) => u.los.length > 0);
  }, [data, search, filterGapsOnly]);

  const toggleUnit = (unitCode: string) => {
    setCollapsed((s) => {
      const next = new Set(s);
      if (next.has(unitCode)) next.delete(unitCode);
      else next.add(unitCode);
      return next;
    });
  };

  // Index every cell by `${unit}:${ac}` so bulk handlers can resolve from
  // a key Set back to the source row (with qualification_code etc).
  const cellIndex = useMemo(() => {
    const m = new Map<string, AcCellRow>();
    if (!data) return m;
    for (const u of data.units) {
      for (const lo of u.los) {
        for (const ac of lo.acs) m.set(acKey(ac), ac);
      }
    }
    return m;
  }, [data]);

  const toggleAcSelected = useCallback((cell: AcCellRow) => {
    setSelectedAcs((s) => {
      const next = new Set(s);
      const k = acKey(cell);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }, []);

  const selectAllVisible = useCallback(() => {
    const next = new Set<string>();
    for (const u of filteredUnits) {
      for (const lo of u.los) {
        for (const ac of lo.acs) next.add(acKey(ac));
      }
    }
    setSelectedAcs(next);
  }, [filteredUnits]);

  const clearSelection = useCallback(() => {
    setSelectedAcs(new Set());
  }, []);

  // Exit bulk mode → wipe selection so a stale set doesn't persist.
  useEffect(() => {
    if (!bulkMode) setSelectedAcs(new Set());
  }, [bulkMode]);

  // The per-criterion judgement draft for each ticked AC, joined, offered as
  // an AI draft in the decision sheet (never applied without a tick).
  const draftWithAi = useCallback(
    async (rows: AcStateRow[]) => {
      const drafts: string[] = [];
      // Sequential so rate limits are not hit with many calls at once.
      for (const r of rows) {
        const cell = cellIndex.get(`${r.unit_code}:${r.ac_code}`);
        try {
          const { data: resp, error: fnErr } = await supabase.functions.invoke(
            'ai-draft-judgement',
            {
              body: {
                student_id: studentId,
                qualification_code: cell?.qualification_code ?? r.qualification_code,
                unit_code: r.unit_code,
                ac_code: r.ac_code,
              },
            }
          );
          const out = (resp ?? {}) as { narrative?: string };
          if (!fnErr && out.narrative)
            drafts.push(`${r.unit_code} AC ${r.ac_code}: ${out.narrative}`);
        } catch {
          // skip: still draft the rest
        }
      }
      if (drafts.length === 0) {
        toast({
          title: 'Nothing drafted',
          description:
            'Check evidence is attached, or draft one criterion at a time from the locker.',
          variant: 'destructive',
        });
        return null;
      }
      return { text: drafts.join('\n\n') };
    },
    [cellIndex, studentId, toast]
  );

  if (loading && !data) {
    return (
      <section className="space-y-3">
        <CollegeHeading>AC coverage</CollegeHeading>
        <div className={cn(CARD, 'p-4 animate-pulse sm:p-5')}>
          <div className="mb-3 h-3 w-24 rounded bg-white/[0.08]" />
          <div className="h-6 w-2/3 rounded bg-white/[0.08]" />
          <div className="mt-6 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-white/[0.05]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-3">
        <CollegeHeading>AC coverage</CollegeHeading>
        <div className={cn(CARD, 'flex items-center gap-3 border-red-400/30 px-4 py-3 sm:px-5')}>
          <p className="min-w-0 flex-1 text-[13px] text-white">{error}</p>
          <button
            type="button"
            onClick={() => void refresh()}
            className="flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow touch-manipulation"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (!data || data.units.length === 0) {
    return (
      <section className="space-y-3">
        <CollegeHeading>AC coverage</CollegeHeading>
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <div className="text-[14px] font-semibold text-white">No qualification mapped</div>
          <p className="mt-1.5 max-w-prose text-[12.5px] leading-relaxed text-white">
            This learner doesn't have a course assigned, or the qualification has no AC catalogue.
            Set their course to populate the matrix.
          </p>
        </div>
      </section>
    );
  }

  const t = data.totals;
  const st = acState.totals;
  const completionPct = stateMap
    ? st.total > 0
      ? Math.round((st.passedAll / st.total) * 100)
      : 0
    : t.total > 0
      ? Math.round(((t.evidenced + t.assessed + t.confirmed) / t.total) * 100)
      : 0;
  const needMore = st.referred + st.not_yet + st.iqa_rejected;

  return (
    <AcStateCtx.Provider value={stateMap}>
      <OccCtx.Provider value={stateMap ? occasions.byKey : null}>
        <section className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <CollegeHeading>AC coverage</CollegeHeading>
            <span
              className={cn(
                'text-[12px] font-semibold tabular-nums',
                t.gaps > 0 ? 'text-orange-300' : 'text-white'
              )}
            >
              {t.gaps > 0
                ? `${t.gaps} gap${t.gaps === 1 ? '' : 's'}`
                : stateMap
                  ? `${st.passedAll} of ${st.total} passed`
                  : `${completionPct}% complete`}
            </span>
          </div>
          <div className={CARD}>
            {/* Header */}
            <div className="px-4 sm:px-5 pt-4 pb-4 border-b border-white/[0.10]">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <h3 className="text-[13px] font-semibold text-white">
                    {data.qualification_code ? `Qualification ${data.qualification_code} · ` : ''}
                    {t.total} criteria
                  </h3>
                  <p className="mt-1 text-[12px] text-white">
                    {stateMap ? (
                      <>
                        {st.passedAll} of {st.total} passed · {st.iqa_confirmed} IQA confirmed ·{' '}
                        {st.submitted} submitted · {needMore} need more · {st.claimed} claimed
                        ·{' '}
                      </>
                    ) : (
                      <>
                        {completionPct}% complete · {t.confirmed} confirmed ·{' '}
                        {t.evidenced + t.assessed} evidenced · {t.in_progress} in progress ·{' '}
                      </>
                    )}
                    <span className={t.gaps ? 'text-red-300' : ''}>
                      {t.gaps} gap{t.gaps === 1 ? '' : 's'}
                    </span>
                  </p>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 w-full max-w-md rounded-full bg-white/[0.08] overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        stateMap ? 'bg-emerald-400' : 'bg-elec-yellow'
                      )}
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>

                {/* View mode + filters */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Matrix or list: one joined toggle, the chosen view white. */}
                  <div
                    role="radiogroup"
                    aria-label="View"
                    className="inline-flex rounded-xl border border-white/[0.12] p-0.5"
                  >
                    {(
                      [
                        ['matrix', 'Matrix'],
                        ['list', 'List'],
                        ...(stateMap ? ([['grid', 'Gap grid']] as const) : []),
                      ] as const
                    ).map(([v, label]) => (
                      <button
                        key={v}
                        type="button"
                        role="radio"
                        aria-checked={mode === v}
                        onClick={() => setMode(v)}
                        className={cn(
                          'h-11 rounded-[10px] px-4 text-[13px] font-semibold transition-colors touch-manipulation',
                          mode === v ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setFilterGapsOnly((x) => !x)}
                    className={cn(
                      'h-11 px-3 rounded-lg border text-[12px] font-medium transition-colors touch-manipulation',
                      filterGapsOnly
                        ? 'border-red-400/40 bg-red-500/[0.06] text-red-300'
                        : 'border-white/[0.10] text-white hover:border-white/[0.20]'
                    )}
                  >
                    {filterGapsOnly ? 'Showing gaps' : 'Gaps only'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBulkMode((x) => !x)}
                    className={cn(
                      'h-11 px-3 rounded-lg border text-[12px] font-medium transition-colors touch-manipulation',
                      bulkMode
                        ? 'border-elec-yellow text-elec-yellow'
                        : 'border-white/[0.10] text-white hover:border-white/[0.20]'
                    )}
                    title="Tick several criteria and record one decision for them"
                  >
                    {bulkMode ? 'Deciding several: on' : 'Decide several'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!data) return;
                      const allCollapsed = data.units.every((u) => collapsed.has(u.unit_code));
                      if (allCollapsed) setCollapsed(new Set());
                      else setCollapsed(new Set(data.units.map((u) => u.unit_code)));
                    }}
                    className="h-11 px-3 rounded-lg border border-white/[0.10] text-[12px] font-medium text-white hover:border-white/[0.20] touch-manipulation"
                  >
                    {data && data.units.every((u) => collapsed.has(u.unit_code))
                      ? 'Expand all'
                      : 'Collapse all'}
                  </button>
                  {studentUserId ? (
                    <button
                      type="button"
                      onClick={() => setPackOpen(true)}
                      className="h-11 px-3 rounded-lg border border-white/[0.10] text-[12px] font-medium text-white hover:border-white/[0.20] touch-manipulation"
                      title="Evidence pack PDF: every criterion with its evidence and decision"
                    >
                      PDF
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => void refresh()}
                    disabled={loading}
                    className="h-11 px-3 rounded-lg border border-white/[0.10] text-[12px] font-medium text-white hover:border-white/[0.20] touch-manipulation disabled:opacity-50"
                  >
                    {loading ? 'Refreshing…' : 'Refresh'}
                  </button>
                </div>
              </div>

              {/* Search (the gap grid has its own unit list) */}
              <div className={cn('mt-4', mode === 'grid' && stateMap && 'hidden')}>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by AC code, criterion text or unit"
                  className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-[14px] font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
                />
              </div>
            </div>

            {/* Gap grid: every criterion by unit, with occasions (separate read). */}
            {mode === 'grid' && stateMap && (
              <div className="px-4 py-4 sm:px-5">
                <OccasionsGrid
                  rows={acState.rows}
                  occasions={occasions.byKey}
                  className="!mx-0 rounded-2xl border-x"
                  onOpenCriterion={(unit, ac) => {
                    const cell = cellIndex.get(`${unit}:${ac}`);
                    if (cell) setOpenLocker(cell);
                  }}
                />
              </div>
            )}

            {/* Body */}
            <div
              className={cn(
                'divide-y divide-white/[0.10]',
                mode === 'grid' && stateMap && 'hidden'
              )}
            >
              {filteredUnits.length === 0 && (
                <div className="px-4 sm:px-5 py-8 text-center text-[12.5px] text-white">
                  No criteria match the current filter.
                </div>
              )}
              {filteredUnits.map((unit) => {
                const isCollapsed = collapsed.has(unit.unit_code);
                return (
                  <div key={unit.unit_code}>
                    {/* Unit header */}
                    <button
                      type="button"
                      onClick={() => toggleUnit(unit.unit_code)}
                      className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 text-left hover:bg-white/[0.06] transition-colors touch-manipulation"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-[12px] font-semibold text-white">
                            {unit.unit_code}
                          </span>
                          <span className="text-[12.5px] text-white line-clamp-2">
                            {unit.unit_title}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-[12px] text-white">
                          <UnitMiniBar
                            stats={unit.stats}
                            total={unit.stats.total}
                            unitCode={unit.unit_code}
                          />
                          {unit.stats.gaps > 0 && (
                            <span className="text-red-300 tabular-nums">
                              {unit.stats.gaps} gap{unit.stats.gaps === 1 ? '' : 's'}
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 text-white text-[14px] transition-transform',
                          isCollapsed ? '' : 'rotate-180'
                        )}
                        aria-hidden
                      >
                        ▾
                      </span>
                    </button>

                    {!isCollapsed && (
                      <div className="px-4 sm:px-5 pb-4">
                        {unit.los.map((lo) => (
                          <div key={lo.lo_number} className="mt-3">
                            <div className="mb-2 text-[12px] font-semibold text-white">
                              LO {lo.lo_number} · {lo.lo_text}
                            </div>
                            {mode === 'matrix' ? (
                              <MatrixGrid
                                rows={lo.acs}
                                evidenceTypes={visibleEvidenceTypes}
                                bulkMode={bulkMode}
                                selectedAcs={selectedAcs}
                                onToggleSelect={toggleAcSelected}
                                onOpenAc={(ac) => setOpenLocker(ac)}
                              />
                            ) : (
                              <ListView
                                rows={lo.acs}
                                bulkMode={bulkMode}
                                selectedAcs={selectedAcs}
                                onToggleSelect={toggleAcSelected}
                                onOpenAc={(ac) => setOpenLocker(ac)}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bulk mode helper strip — visible whenever bulk mode is on */}
            {bulkMode && (
              <div className="border-t border-white/[0.10] px-4 sm:px-5 py-2.5 flex items-center justify-between gap-3 flex-wrap text-[12px] text-white">
                <span>
                  Tap rows to tick them, then record one decision. Each criterion still gets its own
                  decision on the record.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={selectAllVisible}
                    className="h-11 px-3 rounded-lg border border-white/[0.10] text-[12px] hover:border-white/[0.20] touch-manipulation"
                  >
                    Select all visible
                  </button>
                  <button
                    type="button"
                    onClick={clearSelection}
                    disabled={selectedAcs.size === 0}
                    className="h-11 px-3 rounded-lg border border-white/[0.10] text-[12px] hover:border-white/[0.20] touch-manipulation disabled:opacity-40"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Ticked criteria → the one decision sheet */}
            {bulkMode && selectedAcs.size > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.10] bg-white/[0.04] px-4 py-3 sm:px-5">
                <span className="text-[12.5px] font-semibold text-white">
                  {selectedAcs.size} criteri{selectedAcs.size === 1 ? 'on' : 'a'} ticked
                </span>
                <button
                  type="button"
                  onClick={() => setDeciding(true)}
                  disabled={!studentUserId}
                  className="h-11 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation disabled:bg-white/[0.08] disabled:text-white"
                >
                  Record decision for {selectedAcs.size}
                </button>
              </div>
            )}
            {deciding && studentUserId && (
              <MatrixDecision
                learnerId={studentUserId}
                learnerName={studentName}
                keys={selectedAcs}
                draftWithAi={draftWithAi}
                onClose={() => setDeciding(false)}
                onRecorded={() => {
                  clearSelection();
                  setBulkMode(false);
                  void refresh();
                }}
              />
            )}

            {/* Evidence locker drawer */}
            <AcEvidenceLockerSheet
              open={openLocker != null}
              onOpenChange={(o) => {
                if (!o) setOpenLocker(null);
              }}
              cell={openLocker}
              studentId={studentId}
              studentUserId={studentUserId}
              studentName={studentName}
              onChanged={() => void refresh()}
            />
            {studentUserId ? (
              <ExportPackSheet
                open={packOpen}
                onOpenChange={setPackOpen}
                learnerUserId={studentUserId}
                learnerName={studentName ?? undefined}
                mode="staff"
                focus="evidence_pack"
              />
            ) : null}
          </div>
        </section>
      </OccCtx.Provider>
    </AcStateCtx.Provider>
  );
}

/* ───────────────── matrix grid ───────────────── */

function MatrixGrid({
  rows,
  evidenceTypes,
  bulkMode,
  selectedAcs,
  onToggleSelect,
  onOpenAc,
}: {
  rows: AcCellRow[];
  evidenceTypes: EvidenceTypeCode[];
  bulkMode: boolean;
  selectedAcs: Set<string>;
  onToggleSelect: (cell: AcCellRow) => void;
  onOpenAc: (ac: AcCellRow) => void;
}) {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full border-collapse text-[12px] tabular-nums">
        <thead>
          <tr>
            {bulkMode && <th className="w-7 pb-1.5 align-bottom" aria-label="Select" />}
            <th className="text-left font-medium text-white pb-1.5 pr-3 align-bottom min-w-[80px]">
              AC
            </th>
            <th className="text-left font-medium text-white pb-1.5 pr-3 align-bottom min-w-[200px]">
              Criterion
            </th>
            {evidenceTypes.map((t) => (
              <th
                key={t}
                className="text-center font-medium text-white pb-1.5 px-1 align-bottom whitespace-nowrap"
              >
                {EVIDENCE_TYPE_LABEL[t] ?? t}
              </th>
            ))}
            <th className="text-center font-medium text-white pb-1.5 pl-2 align-bottom">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.10]">
          {rows.map((cell) => {
            const k = `${cell.unit_code}:${cell.ac_code}`;
            const isSelected = selectedAcs.has(k);
            return (
              <tr
                key={k}
                role="button"
                tabIndex={0}
                onClick={() => (bulkMode ? onToggleSelect(cell) : onOpenAc(cell))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (bulkMode) onToggleSelect(cell);
                    else onOpenAc(cell);
                  }
                }}
                className={cn(
                  'cursor-pointer hover:bg-white/[0.06] transition-colors',
                  cell.requirement?.is_mandatory && !cell.meets_requirement && '',
                  isSelected && 'bg-white/[0.08]'
                )}
              >
                {bulkMode && (
                  <td className="py-2 pl-1 pr-1 align-middle">
                    <span
                      className={cn(
                        'inline-flex items-center justify-center h-5 w-5 rounded border text-[12px] font-bold',
                        isSelected
                          ? 'bg-elec-yellow border-elec-yellow text-black'
                          : 'border-white/30 bg-transparent text-transparent'
                      )}
                      aria-hidden
                    >
                      ✓
                    </span>
                  </td>
                )}
                <td className="py-2 pr-3 ">
                  <div className="font-mono text-[12px] font-semibold text-white">
                    {cell.ac_code}
                  </div>
                </td>
                <td className="py-2 pr-3 text-[12px] text-white max-w-[300px]">
                  <div className="line-clamp-2">{cell.ac_text}</div>
                  {cell.requirement?.is_mandatory && cell.missing_types.length > 0 && (
                    <div className="mt-0.5 text-[12px] text-red-300">
                      Missing:{' '}
                      {cell.missing_types.map((m) => EVIDENCE_TYPE_LABEL[m] ?? m).join(', ')}
                    </div>
                  )}
                </td>
                {evidenceTypes.map((t) => {
                  const count = cell.by_type[t] ?? 0;
                  const isRequired = cell.requirement?.required_codes.includes(t) ?? false;
                  return (
                    <td key={t} className="text-center px-1 py-2">
                      <CountCell
                        count={count}
                        isRequired={isRequired}
                        isMandatoryAc={cell.requirement?.is_mandatory ?? false}
                      />
                    </td>
                  );
                })}
                <td className="text-center pl-2 py-2">
                  <StatusChip cell={cell} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CountCell({
  count,
  isRequired,
  isMandatoryAc,
}: {
  count: number;
  isRequired: boolean;
  isMandatoryAc: boolean;
}) {
  // Visual encoding:
  //  - count = 0, not required: muted dash
  //  - count = 0, required + mandatory: red empty box (gap)
  //  - count > 0, required: green tick number
  //  - count > 0, not required: white number
  if (count === 0) {
    if (isRequired && isMandatoryAc) {
      return (
        <span
          className="inline-flex items-center justify-center h-6 w-6 rounded border border-red-400/40 bg-red-500/[0.06] text-red-300 text-[12px] font-semibold"
          title="Required type, no evidence"
        >
          ·
        </span>
      );
    }
    return <span className="text-white/[0.35] text-[12px]">–</span>;
  }
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-6 min-w-[24px] px-1.5 rounded text-[12px] font-semibold tabular-nums',
        isRequired
          ? 'bg-emerald-500/[0.12] text-emerald-200 border border-emerald-500/30'
          : 'bg-white/[0.04] text-white border border-white/[0.08]'
      )}
      title={`${count} ${count === 1 ? 'piece' : 'pieces'}`}
    >
      {count}
    </span>
  );
}

function StatusChip({ cell }: { cell: AcCellRow }) {
  const states = useContext(AcStateCtx);
  const occ = useContext(OccCtx);
  const state = states?.get(acKey(cell));
  if (state) {
    const counter = occasionCounter(occ?.get(occasionKey(cell.unit_code, cell.ac_code)));
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <span
          className={cn(
            'inline-flex items-center h-6 px-2 rounded-full border text-[12px] font-semibold whitespace-nowrap',
            STATE_CHIP[state]
          )}
        >
          {STATE_LABEL[state]}
        </span>
        {counter && (
          <span
            className="text-[12px] font-semibold tabular-nums text-white"
            title="Separate assessed occasions"
          >
            {counter}
          </span>
        )}
      </span>
    );
  }
  const status: AcStatus = cell.status;
  const tone = STATUS_TONE[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2 rounded-full border text-[12px] font-semibold',
        tone.chipBg,
        tone.text
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
}

/* ───────────────── list view ───────────────── */

function ListView({
  rows,
  bulkMode,
  selectedAcs,
  onToggleSelect,
  onOpenAc,
}: {
  rows: AcCellRow[];
  bulkMode: boolean;
  selectedAcs: Set<string>;
  onToggleSelect: (cell: AcCellRow) => void;
  onOpenAc: (ac: AcCellRow) => void;
}) {
  return (
    <ul className="space-y-1.5">
      {rows.map((cell) => {
        const totalEvidence = Object.values(cell.by_type).reduce((a, b) => a + b, 0);
        const k = `${cell.unit_code}:${cell.ac_code}`;
        const isSelected = selectedAcs.has(k);
        return (
          <li key={k}>
            <button
              type="button"
              onClick={() => (bulkMode ? onToggleSelect(cell) : onOpenAc(cell))}
              className={cn(
                'w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-colors touch-manipulation',
                cell.requirement?.is_mandatory && !cell.meets_requirement
                  ? 'border-red-400/30 bg-white/[0.04] hover:border-red-400/50'
                  : 'border-white/[0.10] bg-white/[0.04] hover:border-white/[0.20]',
                isSelected && 'border-elec-yellow/60 bg-white/[0.08]'
              )}
            >
              {bulkMode && (
                <span
                  className={cn(
                    'mt-0.5 inline-flex items-center justify-center h-5 w-5 rounded border text-[12px] font-bold shrink-0',
                    isSelected
                      ? 'bg-elec-yellow border-elec-yellow text-black'
                      : 'border-white/30 bg-transparent text-transparent'
                  )}
                  aria-hidden
                >
                  ✓
                </span>
              )}
              <div className="font-mono text-[12px] font-semibold text-white shrink-0 w-14 pt-0.5">
                {cell.ac_code}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] text-white leading-snug">{cell.ac_text}</div>
                <div className="mt-1 flex items-center flex-wrap gap-2 text-[12px] text-white">
                  <StatusChip cell={cell} />
                  <span className="text-white">·</span>
                  <span className="tabular-nums">{totalEvidence} evidence</span>
                  {cell.requirement?.is_mandatory && cell.missing_types.length > 0 && (
                    <>
                      <span className="text-white">·</span>
                      <span className="text-red-300">
                        Missing{' '}
                        {cell.missing_types.map((m) => EVIDENCE_TYPE_LABEL[m] ?? m).join(', ')}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <span className="shrink-0 text-white text-[14px] pt-0.5" aria-hidden>
                →
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* ───────────────── unit mini progress bar ───────────────── */

function UnitMiniBar({
  stats,
  total,
  unitCode,
}: {
  unitCode: string;
  stats: {
    not_started: number;
    in_progress: number;
    evidenced: number;
    assessed: number;
    confirmed: number;
  };
  total: number;
}) {
  const states = useContext(AcStateCtx);
  if (total === 0) return null;
  const seg = (n: number) => `${(n / total) * 100}%`;
  if (states) {
    const counts = new Map<AcState, number>();
    for (const [k, v] of states)
      if (k.startsWith(`${unitCode}:`)) counts.set(v, (counts.get(v) ?? 0) + 1);
    return (
      <span className="inline-flex h-1.5 w-32 rounded-full bg-white/[0.08] overflow-hidden">
        {STATE_ORDER.map((s) =>
          counts.get(s) ? (
            <span key={s} style={{ width: seg(counts.get(s) ?? 0) }} className={STATE_SWATCH[s]} />
          ) : null
        )}
      </span>
    );
  }
  return (
    <span className="inline-flex h-1.5 w-32 rounded-full bg-white/[0.08] overflow-hidden">
      <span style={{ width: seg(stats.confirmed) }} className="bg-emerald-400" />
      <span style={{ width: seg(stats.assessed) }} className="bg-emerald-400/60" />
      <span style={{ width: seg(stats.evidenced) }} className="bg-elec-yellow" />
      <span style={{ width: seg(stats.in_progress) }} className="bg-white/[0.4]" />
      <span style={{ width: seg(stats.not_started) }} className="bg-white/[0.12]" />
    </span>
  );
}

/** Mounted only while deciding: reads the criteria state and opens the sheet. */
function MatrixDecision({
  learnerId,
  learnerName,
  keys,
  draftWithAi,
  onClose,
  onRecorded,
}: {
  learnerId: string;
  learnerName: string;
  keys: Set<string>;
  draftWithAi: (rows: AcStateRow[]) => Promise<{ text: string } | null>;
  onClose: () => void;
  onRecorded: () => void;
}) {
  const { rows, loading, recordDecisions } = usePortfolioAcState(learnerId);
  const chosen = useMemo(
    () => rows.filter((r) => keys.has(`${r.unit_code}:${r.ac_code}`)),
    [rows, keys]
  );
  return (
    <AcDecisionSheet
      open={!loading}
      onOpenChange={(o) => !o && onClose()}
      learnerId={learnerId}
      learnerName={learnerName}
      rows={chosen}
      record={recordDecisions}
      draftWithAi={draftWithAi}
      onRecorded={onRecorded}
    />
  );
}
