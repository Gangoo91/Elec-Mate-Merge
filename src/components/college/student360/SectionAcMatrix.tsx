import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  useAcMatrix,
  type AcCellRow,
  type AcStatus,
  type EvidenceTypeCode,
} from '@/hooks/useAcMatrix';
import { AcEvidenceLockerSheet } from '@/components/college/sheets/AcEvidenceLockerSheet';

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

const STATUS_TONE: Record<AcStatus, { dot: string; text: string; chipBg: string }> = {
  not_started: {
    dot: 'bg-white/30',
    text: 'text-white',
    chipBg: 'bg-white/[0.04] border-white/[0.10]',
  },
  in_progress: {
    dot: 'bg-blue-400',
    text: 'text-blue-300',
    chipBg: 'bg-blue-500/[0.08] border-blue-500/30',
  },
  evidenced: {
    dot: 'bg-amber-400',
    text: 'text-amber-300',
    chipBg: 'bg-amber-500/[0.08] border-amber-500/30',
  },
  assessed: {
    dot: 'bg-emerald-400',
    text: 'text-emerald-300',
    chipBg: 'bg-emerald-500/[0.08] border-emerald-500/30',
  },
  confirmed: {
    dot: 'bg-elec-yellow',
    text: 'text-elec-yellow',
    chipBg: 'bg-elec-yellow/[0.08] border-elec-yellow/30',
  },
};

type ViewMode = 'matrix' | 'list';

type BulkTargetStatus = Extract<AcStatus, 'evidenced' | 'assessed' | 'confirmed'>;

const acKey = (cell: AcCellRow) => `${cell.unit_code}:${cell.ac_code}`;

interface Props {
  studentId: string;
  studentUserId: string | null;
  studentName: string;
}

export function SectionAcMatrix({ studentId, studentUserId, studentName }: Props) {
  const { toast } = useToast();
  const { data, loading, error, evidenceTypes, refresh } = useAcMatrix(studentId, studentUserId);
  const [mode, setMode] = useState<ViewMode>('matrix');
  const [filterGapsOnly, setFilterGapsOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [openLocker, setOpenLocker] = useState<AcCellRow | null>(null);

  // Bulk sign-off state — assessor end-of-block review: tick a batch of ACs,
  // assign a target status, share one narrative, save in one go. Each AC
  // still gets its own ac_signoffs row so the audit trail stays per-AC.
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedAcs, setSelectedAcs] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<BulkTargetStatus>('assessed');
  const [bulkNarrative, setBulkNarrative] = useState('');
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkDrafting, setBulkDrafting] = useState(false);
  const [bulkDraftProgress, setBulkDraftProgress] = useState<{
    done: number;
    total: number;
  } | null>(null);

  // Persistent collapsed state, keyed per-student in localStorage so a
  // tutor returning to the same learner gets back their last layout.
  const collapseStorageKey = `acMatrix.collapsed.${studentId}`;
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
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(collapseStorageKey, JSON.stringify(Array.from(collapsed)));
    } catch {
      // ignore
    }
  }, [collapsed, collapseStorageKey]);

  // First-load collapse: when the data lands and there's NO stored
  // preference for this student, auto-collapse all units except the first
  // — avoids drowning the user in 200+ ACs.
  const initialisedRef = useRef(false);
  useEffect(() => {
    if (initialisedRef.current) return;
    if (!data || data.units.length === 0) return;
    let hadStored = false;
    if (typeof window !== 'undefined') {
      hadStored = window.localStorage.getItem(collapseStorageKey) !== null;
    }
    if (!hadStored) {
      const next = new Set(data.units.slice(1).map((u) => u.unit_code));
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
    setBulkNarrative('');
    setBulkDraftProgress(null);
  }, []);

  // Exit bulk mode → wipe selection so a stale set doesn't persist.
  useEffect(() => {
    if (!bulkMode) {
      setSelectedAcs(new Set());
      setBulkNarrative('');
      setBulkDraftProgress(null);
    }
  }, [bulkMode]);

  const handleBulkDraftAi = useCallback(async () => {
    if (selectedAcs.size === 0) return;
    setBulkDrafting(true);
    setBulkDraftProgress({ done: 0, total: selectedAcs.size });
    try {
      const targets = Array.from(selectedAcs)
        .map((k) => cellIndex.get(k))
        .filter((c): c is AcCellRow => Boolean(c));
      const drafts: string[] = [];
      let done = 0;
      // Sequential so the per-call OpenAI cost is visible and we don't
      // hammer rate limits with 50 concurrent invocations.
      for (const cell of targets) {
        try {
          const { data: resp, error: fnErr } = await supabase.functions.invoke(
            'ai-draft-judgement',
            {
              body: {
                student_id: studentId,
                qualification_code: cell.qualification_code,
                unit_code: cell.unit_code,
                ac_code: cell.ac_code,
              },
            }
          );
          if (!fnErr) {
            const out = (resp ?? {}) as { narrative?: string };
            if (out.narrative) drafts.push(`[${cell.ac_code}] ${out.narrative}`);
          }
        } catch {
          // skip — we still want progress on the rest
        }
        done += 1;
        setBulkDraftProgress({ done, total: targets.length });
      }
      if (drafts.length === 0) {
        toast({
          title: 'No drafts produced',
          description:
            'AI returned nothing — check evidence is attached, or draft per-AC from the locker.',
          variant: 'destructive',
        });
        return;
      }
      // For bulk we surface a combined draft. Assessor edits before saving.
      setBulkNarrative(drafts.join('\n\n'));
      toast({
        title: `Drafted ${drafts.length} narrative${drafts.length === 1 ? '' : 's'}`,
        description: 'Review the combined draft below, edit, then Save sign-off.',
      });
    } finally {
      setBulkDrafting(false);
    }
  }, [selectedAcs, cellIndex, studentId, toast]);

  const handleBulkSave = useCallback(async () => {
    if (selectedAcs.size === 0) return;
    setBulkSaving(true);
    try {
      const targets = Array.from(selectedAcs)
        .map((k) => cellIndex.get(k))
        .filter((c): c is AcCellRow => Boolean(c));

      // Resolve assessor identity once.
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes?.user?.id ?? null;
      const { data: staffRow } = userId
        ? await supabase
            .from('college_staff')
            .select('name')
            .eq('user_id', userId)
            .is('archived_at', null)
            .maybeSingle()
        : { data: null };
      const assessorName = (staffRow as { name?: string } | null)?.name ?? null;
      const stamp = new Date().toISOString();
      const trimmedNarrative = bulkNarrative.trim() || null;

      // Per-AC: signoff upsert + status update together, fail the AC if
      // either side errors. Reporting at AC level (not raw op count) is
      // what the assessor needs to retry — "5 of 10 operations" was
      // confusing for 5 ACs (each AC = 2 ops). Either-side failure
      // throws so the AC counts as failed even if one side persisted —
      // partial-row state is the worst possible outcome and we want it
      // surfaced loudly.
      const acResults = await Promise.allSettled(
        targets.map(async (cell) => {
          const [{ error: signoffErr }, { error: statusErr }] = await Promise.all([
            supabase.from('ac_signoffs').upsert(
              {
                student_id: studentId,
                qualification_code: cell.qualification_code,
                unit_code: cell.unit_code,
                ac_code: cell.ac_code,
                assessor_narrative: trimmedNarrative,
                assessor_signed_at: stamp,
                assessor_signed_by: userId,
                assessor_name_snapshot: assessorName,
              },
              { onConflict: 'student_id,qualification_code,unit_code,ac_code' }
            ),
            supabase
              .from('student_ac_coverage')
              .update({ status: bulkStatus })
              .eq('student_id', studentId)
              .eq('qualification_code', cell.qualification_code)
              .eq('unit_code', cell.unit_code)
              .eq('ac_code', cell.ac_code),
          ]);
          if (signoffErr) throw new Error(`signoff: ${signoffErr.message}`);
          if (statusErr) throw new Error(`status: ${statusErr.message}`);
          return cell.ac_code;
        })
      );
      const failedAcs = acResults.filter((r) => r.status === 'rejected').length;
      const totalAcs = targets.length;

      if (failedAcs === 0) {
        toast({
          title: `Signed off ${totalAcs} AC${totalAcs === 1 ? '' : 's'}`,
          description: `Status set to ${bulkStatus.replace('_', ' ')}.`,
        });
        clearSelection();
        setBulkMode(false);
      } else {
        toast({
          title: 'Partial save',
          description: `${totalAcs - failedAcs}/${totalAcs} AC${totalAcs === 1 ? '' : 's'} signed off. ${failedAcs} failed — refresh and re-try.`,
          variant: 'destructive',
        });
      }
      void refresh();
    } catch (e) {
      toast({
        title: 'Bulk sign-off failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBulkSaving(false);
    }
  }, [
    selectedAcs,
    cellIndex,
    bulkNarrative,
    bulkStatus,
    studentId,
    refresh,
    clearSelection,
    toast,
  ]);

  if (loading && !data) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 animate-pulse">
        <div className="h-3 w-24 bg-white/[0.06] rounded mb-3" />
        <div className="h-6 w-2/3 bg-white/[0.06] rounded" />
        <div className="mt-6 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/[0.04] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-rose-500/25 rounded-2xl p-5 text-rose-200 text-[13px]">
        {error}
        <button
          type="button"
          onClick={() => void refresh()}
          className="ml-3 text-rose-100 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.units.length === 0) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white">
          Coverage matrix
        </div>
        <div className="mt-1 text-[14px] font-semibold text-white">No qualification mapped</div>
        <p className="mt-2 text-[12.5px] text-white max-w-prose">
          This learner doesn't have a course assigned, or the qualification has no AC catalogue. Set
          their course on the identity strip to populate the matrix.
        </p>
      </div>
    );
  }

  const t = data.totals;
  const completionPct =
    t.total > 0 ? Math.round(((t.evidenced + t.assessed + t.confirmed) / t.total) * 100) : 0;

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
              Coverage matrix
            </div>
            <h3 className="mt-1 text-[18px] sm:text-[22px] font-semibold text-white tracking-tight leading-tight">
              {data.qualification_code} · {t.total} criteria
            </h3>
            <p className="mt-1 text-[12px] text-white">
              {completionPct}% complete · {t.confirmed} confirmed · {t.evidenced + t.assessed}{' '}
              evidenced · {t.in_progress} in progress ·{' '}
              <span className={t.gaps ? 'text-rose-300' : ''}>
                {t.gaps} gap{t.gaps === 1 ? '' : 's'}
              </span>
            </p>
            {/* Progress bar */}
            <div className="mt-3 h-1.5 w-full max-w-md rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-elec-yellow via-amber-300 to-elec-yellow rounded-full transition-all"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>

          {/* View mode + filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex h-9 rounded-lg border border-white/[0.10] overflow-hidden">
              <button
                type="button"
                onClick={() => setMode('matrix')}
                className={cn(
                  'px-3 text-[11.5px] font-medium touch-manipulation transition-colors',
                  mode === 'matrix'
                    ? 'bg-white/[0.10] text-white'
                    : 'bg-transparent text-white hover:text-white'
                )}
              >
                Matrix
              </button>
              <button
                type="button"
                onClick={() => setMode('list')}
                className={cn(
                  'px-3 text-[11.5px] font-medium touch-manipulation transition-colors',
                  mode === 'list'
                    ? 'bg-white/[0.10] text-white'
                    : 'bg-transparent text-white hover:text-white'
                )}
              >
                List
              </button>
            </div>
            <button
              type="button"
              onClick={() => setFilterGapsOnly((x) => !x)}
              className={cn(
                'h-9 px-3 rounded-lg border text-[11.5px] font-medium transition-colors touch-manipulation',
                filterGapsOnly
                  ? 'border-rose-500/40 bg-rose-500/[0.06] text-rose-200'
                  : 'border-white/[0.10] text-white hover:border-white/[0.20]'
              )}
            >
              {filterGapsOnly ? 'Showing gaps' : 'Gaps only'}
            </button>
            <button
              type="button"
              onClick={() => setBulkMode((x) => !x)}
              className={cn(
                'h-9 px-3 rounded-lg border text-[11.5px] font-medium transition-colors touch-manipulation',
                bulkMode
                  ? 'border-elec-yellow/40 bg-elec-yellow/[0.08] text-elec-yellow'
                  : 'border-white/[0.10] text-white hover:border-white/[0.20]'
              )}
              title="Tick a batch of ACs and sign them off in one go"
            >
              {bulkMode ? 'Bulk: on' : 'Bulk sign-off'}
            </button>
            <button
              type="button"
              onClick={() => {
                if (!data) return;
                const allCollapsed = data.units.every((u) => collapsed.has(u.unit_code));
                if (allCollapsed) setCollapsed(new Set());
                else setCollapsed(new Set(data.units.map((u) => u.unit_code)));
              }}
              className="h-9 px-3 rounded-lg border border-white/[0.10] text-[11.5px] font-medium text-white hover:border-white/[0.20] touch-manipulation"
            >
              {data && data.units.every((u) => collapsed.has(u.unit_code))
                ? 'Expand all'
                : 'Collapse all'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="h-9 px-3 rounded-lg border border-white/[0.10] text-[11.5px] font-medium text-white hover:border-white/[0.20] touch-manipulation"
              title="Print the matrix (Ofsted-day handy)"
            >
              Print
            </button>
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="h-9 px-3 rounded-lg border border-white/[0.10] text-[11.5px] font-medium text-white hover:border-white/[0.20] touch-manipulation disabled:opacity-50"
            >
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by AC code, criterion text or unit"
            className="w-full h-10 px-3 rounded-lg bg-[hsl(0_0%_8%)] border border-white/[0.10] text-[12.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 touch-manipulation"
          />
        </div>
      </div>

      {/* Body */}
      <div className="divide-y divide-white/[0.04]">
        {filteredUnits.length === 0 && (
          <div className="px-5 sm:px-6 py-8 text-center text-[12.5px] text-white">
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
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-[12px] font-semibold text-white">{unit.unit_code}</span>
                    <span className="text-[12.5px] text-white truncate">{unit.unit_title}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[10.5px] text-white">
                    <UnitMiniBar stats={unit.stats} total={unit.stats.total} />
                    {unit.stats.gaps > 0 && (
                      <span className="text-rose-300 tabular-nums">
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
                <div className="px-5 sm:px-6 pb-4">
                  {unit.los.map((lo) => (
                    <div key={lo.lo_number} className="mt-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white mb-2">
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
        <div className="border-t border-elec-yellow/20 bg-elec-yellow/[0.04] px-5 sm:px-6 py-2.5 flex items-center justify-between gap-3 flex-wrap text-[11.5px] text-white">
          <span>
            <strong className="text-elec-yellow">Bulk mode</strong> — tap rows to select. Each AC
            still gets its own audit row.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={selectAllVisible}
              className="h-7 px-2 rounded-md border border-white/[0.10] text-[11px] hover:border-white/[0.20] touch-manipulation"
            >
              Select all visible
            </button>
            <button
              type="button"
              onClick={clearSelection}
              disabled={selectedAcs.size === 0}
              className="h-7 px-2 rounded-md border border-white/[0.10] text-[11px] hover:border-white/[0.20] touch-manipulation disabled:opacity-40"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Sticky bulk action bar — only when ≥1 selected. Sits inside the
          card so it scrolls with the section, but the action group is
          sticky-bottom on mobile. */}
      {bulkMode && selectedAcs.size > 0 && (
        <div className="border-t border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 sm:px-6 py-4 space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[12.5px] font-semibold text-white">
                {selectedAcs.size} AC{selectedAcs.size === 1 ? '' : 's'} selected
              </span>
              <div className="inline-flex h-9 rounded-lg border border-white/[0.10] overflow-hidden text-[11.5px]">
                {(['evidenced', 'assessed', 'confirmed'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setBulkStatus(s)}
                    className={cn(
                      'px-3 font-medium transition-colors touch-manipulation',
                      bulkStatus === s
                        ? s === 'confirmed'
                          ? 'bg-elec-yellow/[0.12] text-elec-yellow'
                          : s === 'assessed'
                            ? 'bg-emerald-500/[0.12] text-emerald-200'
                            : 'bg-amber-500/[0.12] text-amber-200'
                        : 'bg-transparent text-white hover:text-white'
                    )}
                  >
                    {s === 'confirmed' ? 'IQA confirmed' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void handleBulkDraftAi()}
                disabled={bulkDrafting || bulkSaving}
                className={cn(
                  'h-9 px-3 rounded-lg border text-[11.5px] font-semibold transition-colors touch-manipulation',
                  bulkDrafting || bulkSaving
                    ? 'border-white/[0.06] text-white/45'
                    : 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow hover:bg-elec-yellow/[0.10]'
                )}
                title="Drafts a per-AC narrative for each selected row, then joins them. You edit before saving."
              >
                {bulkDrafting && bulkDraftProgress
                  ? `AI drafting ${bulkDraftProgress.done}/${bulkDraftProgress.total}…`
                  : 'AI draft for all'}
              </button>
              <button
                type="button"
                onClick={() => void handleBulkSave()}
                disabled={bulkSaving}
                className={cn(
                  'h-9 px-3.5 rounded-lg text-[11.5px] font-semibold transition-colors touch-manipulation',
                  bulkSaving
                    ? 'bg-white/[0.06] text-white/45'
                    : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                )}
              >
                {bulkSaving ? 'Saving…' : `Save sign-off for ${selectedAcs.size}`}
              </button>
            </div>
          </div>
          <textarea
            value={bulkNarrative}
            onChange={(e) => setBulkNarrative(e.target.value)}
            placeholder="One shared narrative across these ACs (optional but recommended). Tip: 'AI draft for all' fills this in from the evidence on each AC."
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.10] text-[12.5px] text-white placeholder:text-white/40 leading-relaxed focus:outline-none focus:border-elec-yellow/50 touch-manipulation resize-y"
          />
          <p className="text-[10.5px] text-white/55 italic">
            Saving stamps "signed by you, today" on each AC + flips status. The IQA will see the
            full list when sampling.
          </p>
        </div>
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
    </div>
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
      <table className="w-full border-collapse text-[11.5px] tabular-nums">
        <thead>
          <tr>
            {bulkMode && <th className="w-7 pb-1.5 align-bottom" aria-label="Select" />}
            <th className="text-left font-medium text-white pb-1.5 pr-3 align-bottom min-w-[80px] sticky left-0 bg-[hsl(0_0%_12%)]">
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
        <tbody className="divide-y divide-white/[0.04]">
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
                  'cursor-pointer hover:bg-white/[0.03] transition-colors',
                  cell.requirement?.is_mandatory && !cell.meets_requirement && 'bg-rose-500/[0.03]',
                  isSelected && 'bg-elec-yellow/[0.06]'
                )}
              >
                {bulkMode && (
                  <td className="py-2 pl-1 pr-1 align-middle">
                    <span
                      className={cn(
                        'inline-flex items-center justify-center h-5 w-5 rounded border text-[11px] font-bold',
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
                <td className="py-2 pr-3 sticky left-0 bg-[hsl(0_0%_12%)] group-hover:bg-transparent">
                  <div className="font-mono text-[12px] font-semibold text-white">
                    {cell.ac_code}
                  </div>
                </td>
                <td className="py-2 pr-3 text-[12px] text-white max-w-[300px]">
                  <div className="line-clamp-2">{cell.ac_text}</div>
                  {cell.requirement?.is_mandatory && cell.missing_types.length > 0 && (
                    <div className="mt-0.5 text-[10.5px] text-rose-300">
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
                  <StatusChip status={cell.status} />
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
          className="inline-flex items-center justify-center h-6 w-6 rounded border border-rose-500/40 bg-rose-500/[0.04] text-rose-300 text-[10px] font-semibold"
          title="Required type, no evidence"
        >
          ·
        </span>
      );
    }
    return <span className="text-white/25 text-[11px]">–</span>;
  }
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-6 min-w-[24px] px-1.5 rounded text-[11px] font-semibold tabular-nums',
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

function StatusChip({ status }: { status: AcStatus }) {
  const tone = STATUS_TONE[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2 rounded-full border text-[10.5px] font-semibold',
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
                  ? 'border-rose-500/25 hover:border-rose-500/40 bg-rose-500/[0.03]'
                  : 'border-white/[0.06] hover:border-white/[0.14] bg-[hsl(0_0%_10%)]',
                isSelected && 'border-elec-yellow/40 bg-elec-yellow/[0.06]'
              )}
            >
              {bulkMode && (
                <span
                  className={cn(
                    'mt-0.5 inline-flex items-center justify-center h-5 w-5 rounded border text-[11px] font-bold shrink-0',
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
                <div className="mt-1 flex items-center flex-wrap gap-2 text-[10.5px] text-white">
                  <StatusChip status={cell.status} />
                  <span className="text-white">·</span>
                  <span className="tabular-nums">{totalEvidence} evidence</span>
                  {cell.requirement?.is_mandatory && cell.missing_types.length > 0 && (
                    <>
                      <span className="text-white">·</span>
                      <span className="text-rose-300">
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
}: {
  stats: {
    not_started: number;
    in_progress: number;
    evidenced: number;
    assessed: number;
    confirmed: number;
  };
  total: number;
}) {
  if (total === 0) return null;
  const seg = (n: number) => `${(n / total) * 100}%`;
  return (
    <span className="inline-flex h-1.5 w-32 rounded-full bg-white/[0.06] overflow-hidden">
      <span style={{ width: seg(stats.confirmed) }} className="bg-elec-yellow" />
      <span style={{ width: seg(stats.assessed) }} className="bg-emerald-400" />
      <span style={{ width: seg(stats.evidenced) }} className="bg-amber-400" />
      <span style={{ width: seg(stats.in_progress) }} className="bg-blue-400" />
      <span style={{ width: seg(stats.not_started) }} className="bg-white/15" />
    </span>
  );
}
