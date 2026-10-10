import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_CARD, HomeCardHead } from '@/components/college/widgets/HomeDetailCards';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  useCurrentRiskForStudents,
  useRecomputeRisk,
  type RiskFactor,
} from '@/hooks/useStudentRisk';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

/* ==========================================================================
   AtRiskPredictor — who is drifting, and why.

   Hub card language: 15px volt title, a one-line severity breakdown, then
   HubWorkList rows (rule · learner · top factor · score · chevron).

   ELE-1909 (7 Oct 2026): this card used to run its own client-side scoring
   (attendance / progress / ILP / "engagement", fixed thresholds, its own
   recommended actions) and merge it with the server score. The two
   disagreed: a learner could be "critical" here and low on the risk flags,
   and the reasons did not match. It now shows ONLY the server risk score
   (student_risk_scores, written nightly by compute-student-risk with the
   college's own thresholds), the same row the risk flags, Student 360 and
   the tutor home read. "Recheck risk" reruns that same server job.
   ========================================================================== */

interface AtRiskPredictorProps {
  onNavigate?: (section: CollegeSection) => void;
  compact?: boolean;
}

type RiskLevel = 'critical' | 'high' | 'medium';

interface AtRiskStudent {
  id: string;
  name: string;
  cohort: string;
  riskScore: number;
  riskLevel: RiskLevel;
  factors: RiskFactor[];
}

const LEVEL_LABEL: Record<RiskLevel, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
};

const CARD = cn('overflow-hidden rounded-3xl border border-white/[0.08]', CARD_SURFACE);
const ROW =
  'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5';
const FOOT =
  'flex h-11 flex-1 items-center justify-center px-3 text-[12.5px] font-semibold transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]';

const sev = (f: RiskFactor) => f.severity ?? f.weight ?? 0;

export function AtRiskPredictor({ onNavigate, compact = false }: AtRiskPredictorProps) {
  const navigate = useNavigate();
  const { students, cohorts } = useCollegeSupabase();
  const [selectedFilter, setSelectedFilter] = useState<'all' | RiskLevel>('all');

  const activeStudentIds = useMemo(
    () => students.filter((s) => s.status === 'Active').map((s) => s.id),
    [students]
  );
  const { byStudent: serverRisk, refresh: refreshServerRisk } =
    useCurrentRiskForStudents(activeStudentIds);
  const { recompute, running: recomputing } = useRecomputeRisk();

  const handleRecheck = async () => {
    try {
      await recompute({ student_ids: activeStudentIds });
    } catch {
      return; // the hook has already said what went wrong
    }
    await refreshServerRisk();
  };

  const atRiskStudents = useMemo(() => {
    const out: AtRiskStudent[] = [];
    for (const s of students) {
      if (s.status !== 'Active') continue;
      const r = serverRisk.get(s.id);
      if (!r || r.level === 'low') continue;
      out.push({
        id: s.id,
        name: s.name,
        cohort: cohorts.find((c) => c.id === s.cohort_id)?.name ?? 'No cohort',
        riskScore: Math.round(Number(r.score) || 0),
        riskLevel: r.level,
        factors: [...(r.factors ?? [])].filter((f) => f && f.label).sort((a, b) => sev(b) - sev(a)),
      });
    }
    return out.sort((a, b) => b.riskScore - a.riskScore);
  }, [students, cohorts, serverRisk]);

  const filteredStudents =
    selectedFilter === 'all'
      ? atRiskStudents
      : atRiskStudents.filter((s) => s.riskLevel === selectedFilter);

  const riskCounts = {
    critical: atRiskStudents.filter((s) => s.riskLevel === 'critical').length,
    high: atRiskStudents.filter((s) => s.riskLevel === 'high').length,
    medium: atRiskStudents.filter((s) => s.riskLevel === 'medium').length,
  };

  const flagged = atRiskStudents.length;
  const urgentCount = riskCounts.critical + riskCounts.high;

  // "2 critical · 3 high · 1 medium" — critical is the one word that stays
  // red, because it encodes a real state rather than a category.
  const breakdown = (
    [
      riskCounts.critical > 0 ? (
        <span key="c" className="font-semibold text-red-300">
          {riskCounts.critical} critical
        </span>
      ) : null,
      riskCounts.high > 0 ? <span key="h">{riskCounts.high} high</span> : null,
      riskCounts.medium > 0 ? <span key="m">{riskCounts.medium} medium</span> : null,
    ] as Array<JSX.Element | null>
  ).filter((n): n is JSX.Element => n !== null);

  const Row = ({ student }: { student: AtRiskStudent }) => {
    const urgent = student.riskLevel === 'critical' || student.riskLevel === 'high';
    // Compact (home): the learner's own page, and the level in words rather
    // than a bare score nobody can read.
    if (compact) {
      return (
        <button
          type="button"
          onClick={() => navigate(`/college?section=student360&studentId=${student.id}#risk`)}
          className="flex min-h-[56px] w-full items-center gap-3 px-5 py-2.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-semibold text-white">
              {student.name}
            </span>
            <span className="line-clamp-2 block text-[12.5px] leading-snug text-white">
              {student.factors[0]?.label ?? student.cohort}
            </span>
          </span>
          <span
            className={cn(
              'shrink-0 rounded-full border px-2 py-0.5 text-[12px] font-semibold',
              student.riskLevel === 'critical'
                ? 'border-red-400/40 text-red-300'
                : student.riskLevel === 'high'
                  ? 'border-orange-500/40 text-orange-300'
                  : 'border-white/[0.2] text-white'
            )}
          >
            {LEVEL_LABEL[student.riskLevel]}
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
        </button>
      );
    }
    return (
      <button type="button" onClick={() => onNavigate?.('progresstracking')} className={ROW}>
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {student.name}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {student.riskLevel === 'critical' ? (
              <span className="font-semibold text-red-300">Critical</span>
            ) : (
              LEVEL_LABEL[student.riskLevel]
            )}
            {' · '}
            {student.factors[0]?.label ?? student.cohort}
          </span>
        </span>
        <span
          className={cn(
            'shrink-0 text-[13px] font-semibold tabular-nums',
            urgent ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {student.riskScore}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    );
  };

  if (compact) {
    return (
      <section className={HOME_CARD}>
        <HomeCardHead
          title="At risk"
          meta={flagged ? `${flagged} flagged` : 'None flagged'}
          warn={riskCounts.critical > 0}
        />
        {flagged > 0 ? (
          <>
            {breakdown.length > 0 && (
              <p className="-mt-1 px-5 pb-3 text-[12.5px] leading-snug text-white">
                {breakdown.map((node, i) => (
                  <span key={node.key}>
                    {i > 0 ? ' · ' : ''}
                    {node}
                  </span>
                ))}
              </p>
            )}
            <ul className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
              {filteredStudents.slice(0, 4).map((student) => (
                <li key={student.id}>
                  <Row student={student} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="px-5 pb-4 text-[13px] text-white">
            Nothing flagged. Every learner is on track.
          </p>
        )}
        <div className="mt-auto flex border-t border-white/[0.08]">
          <button
            type="button"
            onClick={handleRecheck}
            disabled={recomputing}
            className={cn(FOOT, 'text-white disabled:opacity-60')}
          >
            {recomputing ? 'Rechecking…' : 'Recheck now'}
          </button>
          {flagged > 0 && (
            <>
              <span aria-hidden="true" className="w-px bg-white/[0.08]" />
              <button
                type="button"
                onClick={() => onNavigate?.('progresstracking')}
                className={cn(FOOT, 'text-white')}
              >
                All {flagged}
              </button>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={CARD}>
      <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">At risk</h3>
        <button
          type="button"
          onClick={handleRecheck}
          disabled={recomputing}
          className="-my-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation disabled:opacity-60"
        >
          {recomputing ? 'Rechecking…' : 'Recheck risk'}
        </button>
      </div>

      {/* Filter — four counts, the selected one in volt. */}
      <div className="grid grid-cols-4 divide-x divide-white/[0.10] border-t border-white/[0.10]">
        {(
          [
            { key: 'critical', value: riskCounts.critical, label: 'Critical' },
            { key: 'high', value: riskCounts.high, label: 'High' },
            { key: 'medium', value: riskCounts.medium, label: 'Medium' },
            { key: 'all', value: flagged, label: 'All' },
          ] as const
        ).map((f) => {
          const selected = selectedFilter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setSelectedFilter(selected ? 'all' : f.key)}
              className="min-h-11 py-2.5 text-center transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
            >
              <div
                className={cn(
                  'text-[20px] font-semibold leading-none tabular-nums',
                  selected ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {f.value}
              </div>
              <div className="mt-1 text-[12px] text-white">{f.label}</div>
            </button>
          );
        })}
      </div>

      {filteredStudents.length === 0 ? (
        <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
          Nothing flagged. All learners on track.
        </p>
      ) : (
        <ul className="max-h-[520px] divide-y divide-white/[0.10] overflow-y-auto border-t border-white/[0.10]">
          {filteredStudents.map((student) => (
            <li key={student.id}>
              <Row student={student} />
              <div className="px-4 pb-4 pl-[31px] sm:px-5 sm:pl-[35px]">
                <p className="text-[12px] leading-snug text-white">{student.cohort}</p>
                {student.factors.length > 0 && (
                  <ul className="mt-2 space-y-1.5 text-[12px] leading-snug text-white">
                    {student.factors.slice(0, 3).map((f, idx) => (
                      <li key={`${f.key ?? f.label}-${idx}`}>
                        <span className="font-semibold">{f.label}</span>
                        {f.detail ? `. ${f.detail}` : ''}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
