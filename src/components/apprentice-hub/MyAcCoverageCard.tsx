import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { JobIdeasPanel } from '@/components/college/assessor/JobIdeasPanel';
import { UnifiedCaptureSheet, type CaptureSeed } from './UnifiedCaptureSheet';
import { useStudentQualification } from '@/hooks/useStudentQualification';

/* ==========================================================================
   MyAcCoverageCard — apprentice-side qualification progress. Buckets
   `student_ac_coverage` by status into a 5-stage funnel:

     not_started → in_progress → evidenced → assessed → confirmed

   Renders an editorial stacked progress bar (no rainbow), the headline
   "X of Y ACs confirmed", and a unit-level breakdown showing the units
   with the most outstanding work. Each gappy unit shows its uncovered AC
   codes and a one-tap "Capture for this unit" that seeds the capture sheet.

   Learners with NO college roll row (standalone) get a funnel-lite variant
   instead: claimed ACs across their own portfolio_items vs the
   qualification_requirements catalogue for their active qualification.

   Powers the "I can see myself getting somewhere" loop — apprentices need
   to feel the qualification shrinking as they evidence things.
   ========================================================================== */

type AcStatus = 'not_started' | 'in_progress' | 'evidenced' | 'assessed' | 'confirmed';

interface CoverageRow {
  unit_code: string;
  ac_code: string;
  status: AcStatus | string;
}

interface UnitBucket {
  unit_code: string;
  total: number;
  not_started: number;
  in_progress: number;
  evidenced: number;
  assessed: number;
  confirmed: number;
  /** AC codes still uncovered (not started / in progress), sorted. */
  gapAcs: string[];
}

interface StandaloneUnit {
  unit_code: string;
  total: number;
  claimed: number;
  gapAcs: string[];
}

const AC_REF_RE = /^(.+?)\s+AC\s+(.+)$/;

const codeSort = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });

const STATUS_TONE: Record<AcStatus, string> = {
  not_started: 'bg-white/[0.10]',
  in_progress: 'bg-white/[0.02]',
  evidenced: 'bg-white/[0.02]',
  assessed: 'bg-white/[0.02]',
  confirmed: 'bg-white/[0.02]',
};

const STATUS_LABEL: Record<AcStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  evidenced: 'Evidenced',
  assessed: 'Assessed',
  confirmed: 'Confirmed',
};

export function MyAcCoverageCard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<CoverageRow[]>([]);
  const [loading, setLoading] = useState(true);
  // undefined = not resolved yet; null = resolved, no college roll row.
  const [studentId, setStudentId] = useState<string | null | undefined>(undefined);
  const [ideasOpen, setIdeasOpen] = useState(false);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [captureSeed, setCaptureSeed] = useState<CaptureSeed | null>(null);

  // Standalone variant (no college roll row) — claimed ACs vs the
  // qualification catalogue. null = not loaded yet.
  const { qualificationCode, isLoading: qualLoading } = useStudentQualification();
  const [saUnits, setSaUnits] = useState<StandaloneUnit[] | null>(null);

  const fetchAll = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }
    const { data: cs } = await supabase
      .from('college_students')
      .select('id')
      .eq('user_id', uid)
      .maybeSingle();
    const csId = (cs?.id as string | undefined) ?? null;
    setStudentId(csId);
    if (!csId) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('student_ac_coverage')
      .select('unit_code, ac_code, status')
      .eq('student_id', csId);
    setRows((data ?? []) as CoverageRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Standalone path — per-unit claimed-AC counts from the learner's own
  // portfolio_items vs qualification_requirements totals for their active
  // qualification. Only runs once we know there's no college roll row.
  const fetchStandalone = useCallback(async () => {
    if (!qualificationCode) {
      setSaUnits([]);
      return;
    }
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setSaUnits([]);
      return;
    }
    const [reqsRes, itemsRes] = await Promise.all([
      supabase
        .from('qualification_requirements')
        .select('unit_code, ac_code')
        .eq('qualification_code', qualificationCode),
      supabase.from('portfolio_items').select('assessment_criteria_met').eq('user_id', uid),
    ]);
    if (reqsRes.error || itemsRes.error) {
      setSaUnits([]);
      return;
    }
    // Catalogue: distinct AC codes per unit.
    const catalogue = new Map<string, Set<string>>();
    for (const r of reqsRes.data ?? []) {
      const set = catalogue.get(r.unit_code) ?? new Set<string>();
      set.add(r.ac_code);
      catalogue.set(r.unit_code, set);
    }
    // Claimed: distinct AC refs across the portfolio, parsed by unit prefix
    // and intersected with the catalogue so claims never exceed totals.
    const claimed = new Map<string, Set<string>>();
    for (const item of itemsRes.data ?? []) {
      for (const ref of item.assessment_criteria_met ?? []) {
        const m = AC_REF_RE.exec(ref);
        if (!m) continue;
        if (!catalogue.get(m[1])?.has(m[2])) continue;
        const set = claimed.get(m[1]) ?? new Set<string>();
        set.add(m[2]);
        claimed.set(m[1], set);
      }
    }
    const units: StandaloneUnit[] = Array.from(catalogue.entries()).map(([unit, acs]) => {
      const got = claimed.get(unit) ?? new Set<string>();
      return {
        unit_code: unit,
        total: acs.size,
        claimed: got.size,
        gapAcs: Array.from(acs)
          .filter((ac) => !got.has(ac))
          .sort(codeSort),
      };
    });
    units.sort(
      (a, b) => b.total - b.claimed - (a.total - a.claimed) || codeSort(a.unit_code, b.unit_code)
    );
    setSaUnits(units);
  }, [qualificationCode]);

  useEffect(() => {
    if (studentId === null && !qualLoading) fetchStandalone();
  }, [studentId, qualLoading, fetchStandalone]);

  // Realtime — when a tutor signs off an AC, this card should update live.
  useEffect(() => {
    let chan: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return;
      const { data: cs } = await supabase
        .from('college_students')
        .select('id')
        .eq('user_id', uid)
        .maybeSingle();
      const csId = (cs?.id as string | undefined) ?? null;
      if (!csId) return;
      chan = supabase
        .channel(realtimeChannelName(`my_ac_coverage:${csId}`))
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'student_ac_coverage',
            filter: `student_id=eq.${csId}`,
          },
          () => fetchAll()
        )
        .subscribe();
    })();
    return () => {
      if (chan) supabase.removeChannel(chan);
    };
  }, [fetchAll]);

  const summary = useMemo(() => {
    const buckets = {
      not_started: 0,
      in_progress: 0,
      evidenced: 0,
      assessed: 0,
      confirmed: 0,
    };
    const byUnit = new Map<string, UnitBucket>();
    for (const row of rows) {
      const s =
        (row.status as AcStatus) in buckets
          ? (row.status as AcStatus)
          : ('not_started' as AcStatus);
      buckets[s] += 1;
      let u = byUnit.get(row.unit_code);
      if (!u) {
        u = {
          unit_code: row.unit_code,
          total: 0,
          not_started: 0,
          in_progress: 0,
          evidenced: 0,
          assessed: 0,
          confirmed: 0,
          gapAcs: [],
        };
        byUnit.set(row.unit_code, u);
      }
      u.total += 1;
      u[s] += 1;
      if ((s === 'not_started' || s === 'in_progress') && row.ac_code) {
        u.gapAcs.push(row.ac_code);
      }
    }
    for (const u of byUnit.values()) u.gapAcs.sort(codeSort);
    const total = rows.length;
    const completedish = buckets.evidenced + buckets.assessed + buckets.confirmed;
    const pct = total > 0 ? Math.round((completedish / total) * 100) : 0;
    const units = Array.from(byUnit.values()).sort((a, b) => {
      // Show units with the most work outstanding first.
      const aOut = a.not_started + a.in_progress;
      const bOut = b.not_started + b.in_progress;
      if (aOut !== bOut) return bOut - aOut;
      return a.unit_code.localeCompare(b.unit_code);
    });
    return { buckets, total, pct, completedish, units };
  }, [rows]);

  // One-tap "Capture for this unit" — seeds the capture sheet with up to
  // three of the unit's uncovered ACs (shown as toggleable chips in the
  // sheet, so nothing is claimed invisibly).
  const captureForUnit = (unitCode: string, gapAcs: string[]) => {
    setCaptureSeed({
      acRefs: gapAcs.slice(0, 3).map((ac) => `${unitCode} AC ${ac}`),
    });
    setCaptureOpen(true);
  };

  const handleCaptureComplete = () => {
    setCaptureOpen(false);
    setCaptureSeed(null);
    if (studentId) fetchAll();
    else fetchStandalone();
  };

  if (loading) return <Skeleton />;

  // ── Standalone variant — no college roll row ─────────────────────────
  if (studentId === null) {
    if (qualLoading || (qualificationCode && saUnits === null)) return <Skeleton />;
    // No active qualification selection either — nothing to measure against.
    if (!qualificationCode) return null;

    const units = saUnits ?? [];
    const totalAcs = units.reduce((s, x) => s + x.total, 0);
    if (totalAcs === 0) return null;
    const totalClaimed = units.reduce((s, x) => s + x.claimed, 0);
    const pct = Math.round((totalClaimed / totalAcs) * 100);
    const gapUnits = units.filter((x) => x.claimed < x.total).slice(0, 3);

    return (
      <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-purple-300/85">
              Qualification progress
            </div>
            <span className="text-[10.5px] tabular-nums text-white/85">
              {totalClaimed} / {totalAcs} ACs evidenced
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-[28px] sm:text-[32px] font-semibold tabular-nums text-white leading-none">
              {pct}%
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-white/95">
              of your course has evidence
            </span>
          </div>

          <div className="mt-4 h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className="h-full rounded-full bg-white/[0.20]"
              style={{ width: `${totalClaimed > 0 ? Math.max(2, pct) : 0}%` }}
            />
          </div>

          {gapUnits.length > 0 && (
            <div className="mt-5 -mx-1">
              <div className="px-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/95">
                Biggest gaps
              </div>
              <ul className="mt-2 space-y-2">
                {gapUnits.map((u) => (
                  <UnitGapRow
                    key={u.unit_code}
                    unitCode={u.unit_code}
                    done={u.claimed}
                    total={u.total}
                    gapAcs={u.gapAcs}
                    onCapture={() => captureForUnit(u.unit_code, u.gapAcs)}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Capture pre-loaded for a gappy unit — closes the loop */}
        <UnifiedCaptureSheet
          open={captureOpen}
          onOpenChange={setCaptureOpen}
          seed={captureSeed}
          onComplete={handleCaptureComplete}
        />
      </section>
    );
  }

  if (summary.total === 0) {
    return (
      <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-purple-300/85">
            Qualification progress
          </div>
          <p className="mt-3 text-[12.5px] text-white/85 leading-snug">
            Your qualification's AC catalogue isn't loaded yet. Once your tutor seeds it, this card
            shows your live progress through every assessment criterion.
          </p>
        </div>
      </section>
    );
  }

  // Build the stacked bar widths
  const segments: Array<{ status: AcStatus; pct: number }> = [
    { status: 'confirmed', pct: (summary.buckets.confirmed / summary.total) * 100 },
    { status: 'assessed', pct: (summary.buckets.assessed / summary.total) * 100 },
    { status: 'evidenced', pct: (summary.buckets.evidenced / summary.total) * 100 },
    { status: 'in_progress', pct: (summary.buckets.in_progress / summary.total) * 100 },
  ];

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-purple-300/85">
            Qualification progress
          </div>
          <span className="text-[10.5px] tabular-nums text-white/85">
            {summary.completedish} / {summary.total} ACs covered
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2.5">
          <span className="text-[28px] sm:text-[32px] font-semibold tabular-nums text-white leading-none">
            {summary.pct}%
          </span>
          <span className="text-[11px] uppercase tracking-[0.14em] text-white/95">
            of your course evidenced or beyond
          </span>
        </div>

        {/* Deep link into the workspace AC heatmap */}
        <button
          type="button"
          onClick={() => navigate('/apprentice/hub#ac-heatmap')}
          className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-semibold text-elec-yellow hover:text-elec-yellow/85 transition-colors touch-manipulation"
        >
          Open the full coverage map →
        </button>

        {/* Stacked progress bar */}
        <div className="mt-4 h-2.5 rounded-full bg-white/[0.05] overflow-hidden flex">
          {segments.map(
            (s, i) =>
              s.pct > 0 && (
                <div
                  key={s.status}
                  className={cn('h-full',
                    STATUS_TONE[s.status],
                    i === 0 ? 'rounded-l-full' : '', i === segments.length - 1 ?'' : ''
                  )}
                  style={{ width: `${s.pct}%` }}
                  title={`${STATUS_LABEL[s.status]} · ${summary.buckets[s.status]}`}
                />
              )
          )}
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center flex-wrap gap-x-4 gap-y-1.5">
          {(['confirmed', 'assessed', 'evidenced', 'in_progress', 'not_started'] as AcStatus[]).map(
            (s) => (
              <div key={s} className="flex items-center gap-1.5">
                <span className={cn('h-2 w-2 rounded-full', STATUS_TONE[s])} />
                <span className="text-[10.5px] text-white/90 tabular-nums">
                  {STATUS_LABEL[s]} {summary.buckets[s]}
                </span>
              </div>
            )
          )}
        </div>

        {/* Unit-level breakdown — top 4 with most outstanding */}
        {summary.units.length > 0 && (
          <div className="mt-5 -mx-1">
            <div className="px-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/95">
              By unit
            </div>
            <ul className="mt-2 space-y-2">
              {summary.units.slice(0, 4).map((u) => (
                <UnitGapRow
                  key={u.unit_code}
                  unitCode={u.unit_code}
                  done={u.evidenced + u.assessed + u.confirmed}
                  total={u.total}
                  gapAcs={u.gapAcs}
                  onCapture={() => captureForUnit(u.unit_code, u.gapAcs)}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Job ideas CTA — opens a dialog with AI-generated suggestions
            tailored to the apprentice's current gaps. Only show when the
            student has unfinished ACs. */}
        {studentId && summary.buckets.not_started + summary.buckets.in_progress > 0 && (
          <div className="mt-5 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] px-4 py-3.5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  What can I do next?
                </div>
                <div className="mt-1 text-[13px] font-medium text-white">
                  Get AI-suggested jobs that hit your current gaps
                </div>
                <p className="mt-1 text-[11.5px] text-white/85 leading-snug">
                  Real on-site work — each idea covers multiple criteria efficiently and tells you
                  exactly what photos and witness statements to capture.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIdeasOpen(true)}
                className="shrink-0 h-10 px-4 rounded-lg bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
              >
                Get ideas →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Job ideas dialog */}
      <Dialog open={ideasOpen} onOpenChange={setIdeasOpen}>
        <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_10%)] border-white/[0.08] text-white">
          <DialogTitle className="text-[16px] font-semibold tracking-tight text-white">
            Job ideas for your gaps
          </DialogTitle>
          {studentId && (
            <JobIdeasPanel
              studentId={studentId}
              variant="card"
              onUseIdea={(idea) => {
                const acRefs = idea.ac_coverage
                  .filter((a) => a.unit_code && a.ac_code)
                  .map((a) => `${a.unit_code} AC ${a.ac_code}`);
                setCaptureSeed({
                  title: idea.title,
                  acRefs,
                  brief: idea.evidence_checklist.map((c) => ({
                    label: c.label,
                    type: c.type,
                    required: c.required,
                  })),
                  context: idea.scenario,
                });
                setIdeasOpen(false);
                setCaptureOpen(true);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Capture pre-loaded from a chosen job idea or a gappy unit — closes the loop */}
      <UnifiedCaptureSheet
        open={captureOpen}
        onOpenChange={setCaptureOpen}
        seed={captureSeed}
        onComplete={handleCaptureComplete}
      />
    </section>
  );
}

/* Per-unit row shared by the college funnel and the standalone variant —
   "X of Y evidenced", a quiet progress bar, up to three uncovered AC codes
   as mono chips, and a one-tap capture seeded for the unit. */
function UnitGapRow({
  unitCode,
  done,
  total,
  gapAcs,
  onCapture,
}: {
  unitCode: string;
  done: number;
  total: number;
  gapAcs: string[];
  onCapture: () => void;
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <li className="px-1 py-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12px] font-medium text-white">{unitCode}</span>
        <span className="text-[10.5px] tabular-nums text-white/85">
          {done} / {total} evidenced
        </span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <div
          className={cn('h-full rounded-full', pct >= 25 ? 'bg-white/[0.02]' : 'bg-white/[0.20]')}
          style={{ width: `${Math.max(2, pct)}%` }}
        />
      </div>
      {gapAcs.length > 0 && (
        <div className="mt-0.5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            {gapAcs.slice(0, 3).map((ac) => (
              <span
                key={ac}
                className="text-[10px] font-mono text-white/45 px-1.5 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.02]"
              >
                {ac}
              </span>
            ))}
            {gapAcs.length > 3 && (
              <span className="text-[10px] font-mono text-white/35">+{gapAcs.length - 3}</span>
            )}
          </div>
          <button
            type="button"
            onClick={onCapture}
            className="inline-flex items-center h-11 text-[11.5px] font-semibold text-elec-yellow hover:text-elec-yellow/85 transition-colors touch-manipulation"
          >
            Capture for this unit →
          </button>
        </div>
      )}
    </li>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
        <div className="h-3 w-32 rounded-full bg-white/[0.05]" />
        <div className="h-8 w-20 rounded-md bg-white/[0.05]" />
        <div className="h-2.5 rounded-full bg-white/[0.04]" />
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 rounded-md bg-white/[0.04]" />
          ))}
        </div>
      </div>
    </section>
  );
}
