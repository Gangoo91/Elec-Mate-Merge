/**
 * EPAReadinessDashboard
 *
 * Editorial readiness view: monospace headline score + 4 component bars
 * + prioritised gaps + Weak ACs panel pulling from qualification ACs and
 * portfolio coverage. Single yellow accent. Red kept only for the genuine
 * "not gateway ready" warning.
 */

import { useEffect, useMemo, useState, useCallback } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  useEPAReadiness,
  type ReadinessComponent,
  type ReadinessStatus,
} from '@/hooks/epa/useEPAReadiness';

interface EPAReadinessDashboardProps {
  qualificationCode: string;
  qualificationId?: string | null;
  onStartDiscussion: () => void;
  onStartKnowledgeTest: () => void;
  onTargetAC?: (acRef: string, acText: string, unitCode?: string) => void;
}

const STATUS_LABELS: Record<ReadinessStatus, string> = {
  ready: 'Ready for EPA',
  nearly_ready: 'Nearly ready',
  needs_work: 'Needs work',
  not_ready: 'Not ready',
};

const PRIORITY_LABELS = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
} as const;

/* ──────────── Building blocks ─────────────────────────────────────── */

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'text-[10px] font-medium uppercase tracking-[0.18em] text-white/55',
        className
      )}
    >
      {children}
    </span>
  );
}

function ComponentBar({ component }: { component: ReadinessComponent }) {
  const score = component.score;
  const fillClass = score >= 70 ? 'bg-elec-yellow' : score >= 40 ? 'bg-white/55' : 'bg-white/30';

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow>{component.label}</Eyebrow>
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">
          {Math.round(component.weight * 100)}%
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[28px] sm:text-[32px] font-mono font-semibold text-white leading-none tabular-nums">
          {score}
        </span>
        {component.detail && (
          <span className="text-[12px] text-white/70 leading-snug text-right">
            {component.detail}
          </span>
        )}
      </div>
      <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-700', fillClass)}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
    </div>
  );
}

/* ──────────── Weak ACs panel — pulls qualification ACs vs portfolio ── */

interface WeakAC {
  acRef: string;
  acText: string;
  unitCode?: string;
  unitTitle?: string;
  status: 'no-evidence' | 'claimed-only';
}

function useWeakACs(qualificationCode: string | undefined) {
  const { user } = useAuth();
  const [weak, setWeak] = useState<WeakAC[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !qualificationCode) return;
    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const [{ data: allACs }, { data: items }] = await Promise.all([
          supabase.rpc('get_qualification_acs', { p_qualification_code: qualificationCode }),
          supabase
            .from('portfolio_items')
            .select('assessment_criteria_met, evidence_count, storage_urls, is_supervisor_verified')
            .eq('user_id', user.id),
        ]);

        if (cancelled) return;
        if (!allACs?.length) {
          setWeak([]);
          setLoading(false);
          return;
        }

        type PortfolioItemRow = {
          assessment_criteria_met?: string[] | null;
          evidence_count?: number | null;
          storage_urls?: unknown[] | null;
          is_supervisor_verified?: boolean | null;
        };
        type ACRow = {
          ac_ref?: string;
          criterion_ref?: string;
          ref?: string;
          ac_code?: string;
          ac_text?: string;
          criterion_text?: string;
          description?: string;
          unit_code?: string;
          unit_title?: string;
        };

        const claimed = new Set<string>();
        const evidenced = new Set<string>();
        (items as PortfolioItemRow[] | null)?.forEach((it) => {
          const acs: string[] = it.assessment_criteria_met || [];
          const hasFiles =
            (it.evidence_count ?? 0) > 0 ||
            (Array.isArray(it.storage_urls) && it.storage_urls.length > 0);
          const isVerified = it.is_supervisor_verified === true;
          acs.forEach((ac) => {
            claimed.add(ac);
            if (hasFiles || isVerified) evidenced.add(ac);
          });
        });

        const result: WeakAC[] = [];
        for (const ac of allACs as ACRow[]) {
          const ref: string = ac.ac_ref || ac.ac_code || ac.criterion_ref || ac.ref || '';
          const text: string = ac.ac_text || ac.criterion_text || ac.description || '';
          if (!ref) continue;
          if (evidenced.has(ref)) continue;
          result.push({
            acRef: ref,
            acText: text,
            unitCode: ac.unit_code,
            unitTitle: ac.unit_title,
            status: claimed.has(ref) ? 'claimed-only' : 'no-evidence',
          });
          if (result.length >= 5) break;
        }

        setWeak(result);
      } catch {
        if (!cancelled) setWeak([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, qualificationCode]);

  return { weak, loading };
}

function WeakACsPanel({
  qualificationCode,
  onTargetAC,
}: {
  qualificationCode: string;
  onTargetAC?: (acRef: string, acText: string, unitCode?: string) => void;
}) {
  const { weak, loading } = useWeakACs(qualificationCode);

  if (loading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 flex items-center gap-3">
        <Loader2 className="h-4 w-4 animate-spin text-white/55" />
        <Eyebrow>Loading weak ACs…</Eyebrow>
      </div>
    );
  }

  if (!weak.length) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
        <Eyebrow>Where to focus</Eyebrow>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Every assessment criterion in your course has at least one piece of evidence — strong
          coverage. Keep adding depth and quality.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow>Where to focus · top {weak.length}</Eyebrow>
        <span className="text-[11px] text-white/40 font-mono">
          weakest ACs · uncovered or claimed-only
        </span>
      </div>
      <ul className="space-y-2">
        {weak.map((w, i) => (
          <li
            key={w.acRef}
            className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-5 sm:py-4 space-y-2"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] font-mono text-elec-yellow/85 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[11px] font-mono text-white/85">{w.acRef}</span>
                  {w.unitCode && (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                      Unit {w.unitCode}
                    </span>
                  )}
                  <span
                    className={cn(
                      'text-[10px] font-medium uppercase tracking-[0.14em] px-1.5 py-0 rounded-md border',
                      w.status === 'no-evidence'
                        ? 'border-white/[0.08] text-white/55'
                        : 'border-elec-yellow/30 text-elec-yellow'
                    )}
                  >
                    {w.status === 'no-evidence' ? 'No evidence' : 'Claimed only'}
                  </span>
                </div>
                <p className="text-[13px] text-white/85 leading-snug">{w.acText}</p>
              </div>
            </div>
            {onTargetAC && (
              <div className="pl-7">
                <button
                  type="button"
                  onClick={() => onTargetAC(w.acRef, w.acText, w.unitCode)}
                  className="inline-flex items-center h-8 px-3 rounded-md bg-elec-yellow text-black text-[11.5px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                >
                  Drill this AC →
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ──────────── Main dashboard ──────────────────────────────────────── */

export function EPAReadinessDashboard({
  qualificationCode,
  qualificationId,
  onStartDiscussion,
  onStartKnowledgeTest,
  onTargetAC,
}: EPAReadinessDashboardProps) {
  const { data, isLoading, recalculate } = useEPAReadiness(qualificationCode, qualificationId);

  const allGood = useMemo(
    () => data && Object.values(data.components).every((c) => c.score >= 70),
    [data]
  );

  const [recalcing, setRecalcing] = useState(false);
  const handleRecalc = useCallback(async () => {
    setRecalcing(true);
    try {
      await recalculate();
    } finally {
      setRecalcing(false);
    }
  }, [recalculate]);

  if (isLoading && !data) {
    return (
      <div className="px-4 sm:px-6 py-12 flex items-center gap-3">
        <Loader2 className="h-4 w-4 animate-spin text-white/55" />
        <Eyebrow>Calculating readiness — analysing portfolio &amp; mocks</Eyebrow>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="px-4 sm:px-6 py-12 space-y-4">
        <Eyebrow>EPA readiness</Eyebrow>
        <p className="text-[14px] text-white/85 leading-relaxed max-w-md">
          Start building your portfolio and taking mock assessments to see your readiness score.
        </p>
        <button
          onClick={handleRecalc}
          className="h-11 px-4 rounded-lg bg-elec-yellow text-black font-semibold text-[13px] hover:bg-elec-yellow/90 transition-colors touch-manipulation"
        >
          Calculate readiness
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 py-6">
      {/* Hero — editorial score */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <Eyebrow>Readiness · {STATUS_LABELS[data.overallStatus]}</Eyebrow>
          <button
            onClick={handleRecalc}
            disabled={recalcing}
            className="inline-flex items-center gap-1.5 h-7 px-2 rounded-md text-[11px] text-white/55 hover:text-white/85 hover:bg-white/[0.04] transition-colors touch-manipulation disabled:opacity-50"
          >
            <RefreshCw className={cn('h-3 w-3', recalcing && 'animate-spin')} />
            Recalculate
          </button>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[64px] sm:text-[80px] font-mono font-semibold text-white leading-none tabular-nums">
            {data.overallScore}
          </span>
          <span className="text-[20px] text-white/40 font-mono">/ 100</span>
        </div>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-xl">
          {data.overallScore >= 70
            ? 'You meet the gateway threshold across the weighted components. Keep momentum on the areas below 70 to push toward distinction.'
            : 'Some components are below the 70 % gateway threshold. Use the focus list and drill the weakest areas before requesting your gateway review.'}
        </p>

        {/* Gateway state — only red when genuinely not ready */}
        {!allGood && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-1.5">
            <Eyebrow className="text-red-300">Not gateway ready yet</Eyebrow>
            <p className="text-[14px] text-white/85 leading-relaxed">
              At least one component is below 70 %. The component bars below show where you stand
              and the focus list is sorted by impact.
            </p>
          </div>
        )}
        {allGood && (
          <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5">
            <Eyebrow className="text-elec-yellow">Gateway ready</Eyebrow>
            <p className="text-[14px] text-white/85 leading-relaxed">
              Every component sits at 70 % or above. You meet the gateway threshold — talk to your
              tutor about booking your EPA.
            </p>
          </div>
        )}
      </section>

      {/* Component bars */}
      <section className="space-y-3">
        <Eyebrow>Components</Eyebrow>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {Object.entries(data.components).map(([key, comp]) => (
            <ComponentBar key={key} component={comp} />
          ))}
        </div>
      </section>

      {/* Gaps — prioritised */}
      {data.gaps.length > 0 && (
        <section className="space-y-3">
          <Eyebrow>Gaps · prioritised</Eyebrow>
          <ul className="space-y-2">
            {data.gaps.map((gap, i) => (
              <li
                key={i}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-5 sm:py-4"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] font-mono text-elec-yellow/85 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-[14px] font-medium text-white">{gap.area}</span>
                      <span
                        className={cn(
                          'text-[10px] font-medium uppercase tracking-[0.14em] px-1.5 py-0 rounded-md border',
                          gap.priority === 'high'
                            ? 'border-red-500/30 text-red-300 bg-red-500/[0.05]'
                            : gap.priority === 'medium'
                              ? 'border-elec-yellow/30 text-elec-yellow bg-elec-yellow/[0.05]'
                              : 'border-white/[0.08] text-white/55'
                        )}
                      >
                        {PRIORITY_LABELS[gap.priority]}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/85 leading-relaxed">{gap.description}</p>
                    <p className="text-[13px] text-white/85 leading-relaxed">{gap.action}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Weak ACs panel — pulls from get_qualification_acs */}
      <section>
        <WeakACsPanel qualificationCode={qualificationCode} onTargetAC={onTargetAC} />
      </section>

      {/* CTAs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
        <button
          onClick={onStartDiscussion}
          className="h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation"
        >
          Start mock discussion
        </button>
        <button
          onClick={onStartKnowledgeTest}
          className="h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-[14px] font-semibold hover:bg-white/[0.04] transition-colors touch-manipulation"
        >
          Take knowledge test
        </button>
      </section>

      <p className="text-[10px] text-white/40 font-mono">
        Last calculated{' '}
        {data.calculatedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  );
}

export default EPAReadinessDashboard;
