import { useState, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useCurrentRiskForStudents, useRecomputeRisk } from '@/hooks/useStudentRisk';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

/* ==========================================================================
   AtRiskPredictor — who is drifting, and why.

   Hub card language: 15px volt title, a one-line severity breakdown, then
   HubWorkList rows (rule · learner · top factor · score · chevron). Critical
   and high learners get the volt rule and figure; "critical" is the one
   word that stays red because it encodes a real state.

   Data fix (2026-09-04): the local heuristic read `attendancePercentage`,
   `progressPercentage`, `cohortId`, `studentId` and `lastReviewDate` from
   rows the context exposes in snake_case (`progress_percent`, `cohort_id`,
   `student_id`, `last_reviewed`) — and `college_students` has no attendance
   column at all. Every active learner therefore scored attendance 0 (+40),
   progress 0 (+30) and engagement 0 (+10) = 80 = "critical", cohort
   "Unknown". Attendance is now derived from the attendance records the
   widget already subscribed to, progress from `progress_percent`, and a
   signal with no data is skipped rather than scored as zero.
   ========================================================================== */

interface AtRiskPredictorProps {
  onNavigate?: (section: CollegeSection) => void;
  compact?: boolean;
}

interface RiskFactor {
  type: 'attendance' | 'progress' | 'grades' | 'ilp' | 'engagement';
  label: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

type RiskLevel = 'critical' | 'high' | 'medium' | 'watch';

interface AtRiskStudent {
  id: string;
  name: string;
  cohort: string;
  riskScore: number; // 0-100, higher = more at risk
  riskLevel: RiskLevel;
  riskFactors: RiskFactor[];
  /** null when no attendance has been recorded for the learner. */
  attendance: number | null;
  progressPercentage: number;
  lastILPReview?: string | null;
  recommendedActions: string[];
  /** Where this score came from. Server scoring includes signals the local
      calc can't see — AC velocity, portfolio staleness, grade trend. */
  source: 'server' | 'local';
}

const LEVEL_LABEL: Record<RiskLevel, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  watch: 'Watch',
};

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);
const ROW =
  'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5';
const FOOT =
  'flex h-11 flex-1 items-center justify-center px-3 text-[12.5px] font-semibold transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]';

export function AtRiskPredictor({ onNavigate, compact = false }: AtRiskPredictorProps) {
  const { students, cohorts, ilps, attendance: attendanceRecords } = useCollegeSupabase();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'high' | 'medium'>(
    'all'
  );

  // Pull server-side risk scores for all active learners. The edge fn
  // computes signals the local heuristic can't see (AC velocity, portfolio
  // staleness, grade trend). When a server row exists for a student, we
  // prefer it over the local calc.
  const activeStudentIds = useMemo(
    () => students.filter((s) => s.status === 'Active').map((s) => s.id),
    [students]
  );
  const { byStudent: serverRisk, refresh: refreshServerRisk } =
    useCurrentRiskForStudents(activeStudentIds);
  const { recompute, running: recomputing } = useRecomputeRisk();

  const handleRefreshAi = async () => {
    await recompute({ student_ids: activeStudentIds });
    await refreshServerRisk();
  };

  // Attendance rate per learner from the records on hand. Present and Late
  // count as attended; Absent and Authorised do not.
  const attendanceByStudent = useMemo(() => {
    const map = new Map<string, { present: number; total: number }>();
    for (const r of attendanceRecords) {
      if (!r.student_id) continue;
      const entry = map.get(r.student_id) ?? { present: 0, total: 0 };
      entry.total += 1;
      if (r.status === 'Present' || r.status === 'Late') entry.present += 1;
      map.set(r.student_id, entry);
    }
    return map;
  }, [attendanceRecords]);

  const atRiskStudents = useMemo(() => {
    const calculateRiskScore = (studentId: string): AtRiskStudent | null => {
      const student = students.find((s) => s.id === studentId);
      if (!student || student.status !== 'Active') return null;

      const riskFactors: RiskFactor[] = [];
      let riskScore = 0;

      const cohort = cohorts.find((c) => c.id === student.cohort_id);
      const studentILP = ilps.find((i) => i.student_id === studentId);

      // 1. Attendance (40% weight) — only when something has been recorded.
      const attendanceWeight = 40;
      const att = attendanceByStudent.get(studentId);
      const attendance = att && att.total > 0 ? Math.round((att.present / att.total) * 100) : null;
      if (attendance !== null) {
        if (attendance < 70) {
          riskScore += attendanceWeight;
          riskFactors.push({
            type: 'attendance',
            label: 'Critical attendance',
            severity: 'high',
            description: `Attendance at ${attendance}% (below 70% threshold)`,
          });
        } else if (attendance < 85) {
          riskScore += attendanceWeight * 0.6;
          riskFactors.push({
            type: 'attendance',
            label: 'Low attendance',
            severity: 'medium',
            description: `Attendance at ${attendance}% (below 85% target)`,
          });
        } else if (attendance < 90) {
          riskScore += attendanceWeight * 0.3;
          riskFactors.push({
            type: 'attendance',
            label: 'Attendance watch',
            severity: 'low',
            description: `Attendance at ${attendance}% (monitor closely)`,
          });
        }
      }

      // 2. Progress (30% weight)
      const progressWeight = 30;
      const progress = student.progress_percent ?? 0;
      const expectedProgress = 65; // Expected at this point in year
      const progressDelta = expectedProgress - progress;

      if (progressDelta > 20) {
        riskScore += progressWeight;
        riskFactors.push({
          type: 'progress',
          label: 'Behind schedule',
          severity: 'high',
          description: `${progressDelta}% behind expected progress`,
        });
      } else if (progressDelta > 10) {
        riskScore += progressWeight * 0.5;
        riskFactors.push({
          type: 'progress',
          label: 'Progress concern',
          severity: 'medium',
          description: `${progressDelta}% below target progress`,
        });
      }

      // 3. ILP review (20% weight)
      const ilpWeight = 20;
      if (studentILP) {
        const lastReview = studentILP.last_reviewed ? new Date(studentILP.last_reviewed) : null;
        const daysSinceReview = lastReview
          ? Math.floor((Date.now() - lastReview.getTime()) / (1000 * 60 * 60 * 24))
          : null;

        if (daysSinceReview === null || daysSinceReview > 42) {
          // More than 6 weeks, or never reviewed
          riskScore += ilpWeight;
          riskFactors.push({
            type: 'ilp',
            label: 'Overdue ILP review',
            severity: 'high',
            description:
              daysSinceReview === null
                ? 'No ILP review recorded'
                : `Last ILP review ${daysSinceReview} days ago`,
          });
        } else if (daysSinceReview > 28) {
          // More than 4 weeks
          riskScore += ilpWeight * 0.5;
          riskFactors.push({
            type: 'ilp',
            label: 'ILP review due',
            severity: 'medium',
            description: `ILP review due (${daysSinceReview} days since last)`,
          });
        }
      }

      // 4. Engagement (10% weight) — needs both signals to say anything.
      const engagementWeight = 10;
      if (attendance !== null) {
        const engagementScore = attendance * 0.4 + progress * 0.6;
        if (engagementScore < 50) {
          riskScore += engagementWeight;
          riskFactors.push({
            type: 'engagement',
            label: 'Low engagement',
            severity: 'medium',
            description: 'Pattern indicates reduced engagement',
          });
        }
      }

      if (riskFactors.length === 0) return null;

      let riskLevel: RiskLevel;
      if (riskScore >= 70) riskLevel = 'critical';
      else if (riskScore >= 50) riskLevel = 'high';
      else if (riskScore >= 30) riskLevel = 'medium';
      else riskLevel = 'watch';

      const recommendedActions: string[] = [];

      if (riskFactors.some((f) => f.type === 'attendance' && f.severity === 'high')) {
        recommendedActions.push('Schedule attendance intervention meeting');
        recommendedActions.push('Contact employer to discuss attendance support');
      } else if (riskFactors.some((f) => f.type === 'attendance')) {
        recommendedActions.push('Monitor attendance in next 2 weeks');
      }

      if (riskFactors.some((f) => f.type === 'progress')) {
        recommendedActions.push('Create catch-up plan with additional support sessions');
        recommendedActions.push('Review workload and identify barriers');
      }

      if (riskFactors.some((f) => f.type === 'ilp')) {
        recommendedActions.push('Book urgent ILP review meeting');
        recommendedActions.push('Update SMART targets');
      }

      if (riskFactors.some((f) => f.type === 'engagement')) {
        recommendedActions.push('One-to-one check-in with student');
        recommendedActions.push('Consider pastoral support referral');
      }

      return {
        id: student.id,
        name: student.name,
        cohort: cohort?.name || 'Unknown',
        riskScore: Math.round(riskScore),
        riskLevel,
        riskFactors,
        attendance,
        progressPercentage: progress,
        lastILPReview: studentILP?.last_reviewed,
        recommendedActions,
        source: 'local',
      };
    };

    // Merge server data on top of the local calc. Server scoring carries
    // signals the local heuristic can't see (AC velocity, portfolio
    // staleness, grade trend) so when a server row exists we override
    // level + factors + score with it.
    return students
      .map((s) => {
        const local = calculateRiskScore(s.id);
        const server = serverRisk.get(s.id);
        if (!server) return local;

        const widgetLevel: RiskLevel =
          server.level === 'critical'
            ? 'critical'
            : server.level === 'high'
              ? 'high'
              : server.level === 'medium'
                ? 'medium'
                : 'watch';

        // Server JSONB factor shape varies by edge-fn version: newer rows
        // carry { key, label, severity, detail }, older rows carry
        // { label, detail, weight }. Normalise here so the widget never
        // touches an undefined field — was the source of an "undefined
        // is not a function" crash on legacy rows.
        const serverFactors: RiskFactor[] = (server.factors ?? []).map((raw) => {
          const f = raw as {
            key?: string | null;
            label?: string | null;
            severity?: number | null;
            weight?: number | null;
            detail?: string | null;
          };
          const key = (f.key ?? '').toLowerCase();
          const label = f.label ?? 'Risk factor';
          const sev =
            typeof f.severity === 'number'
              ? f.severity
              : typeof f.weight === 'number'
                ? f.weight
                : 0;
          const haystack = key || label.toLowerCase();
          const type: RiskFactor['type'] = haystack.includes('attend')
            ? 'attendance'
            : haystack.includes('progress') ||
                haystack.startsWith('ac_') ||
                haystack.includes('grade') ||
                haystack.includes('portfolio')
              ? 'progress'
              : haystack.includes('ilp') || haystack.includes('review')
                ? 'ilp'
                : 'engagement';
          return {
            type,
            label,
            severity: sev >= 0.7 ? 'high' : sev >= 0.4 ? 'medium' : 'low',
            description: f.detail ?? label,
          };
        });

        const cohort = cohorts.find((c) => c.id === s.cohort_id);
        return {
          id: s.id,
          name: s.name,
          cohort: cohort?.name || local?.cohort || 'Unknown',
          riskScore: Math.round(server.score),
          riskLevel: widgetLevel,
          riskFactors: serverFactors.length > 0 ? serverFactors : (local?.riskFactors ?? []),
          attendance: local?.attendance ?? null,
          progressPercentage: local?.progressPercentage ?? s.progress_percent ?? 0,
          lastILPReview: local?.lastILPReview,
          recommendedActions: local?.recommendedActions ?? [],
          source: 'server' as const,
        };
      })
      .filter((s): s is AtRiskStudent => s !== null && s.riskFactors.length > 0)
      .sort((a, b) => b.riskScore - a.riskScore);
  }, [students, cohorts, ilps, attendanceByStudent, serverRisk]);

  const filteredStudents =
    selectedFilter === 'all'
      ? atRiskStudents
      : atRiskStudents.filter((s) => s.riskLevel === selectedFilter);

  const riskCounts = {
    critical: atRiskStudents.filter((s) => s.riskLevel === 'critical').length,
    high: atRiskStudents.filter((s) => s.riskLevel === 'high').length,
    medium: atRiskStudents.filter((s) => s.riskLevel === 'medium').length,
    watch: atRiskStudents.filter((s) => s.riskLevel === 'watch').length,
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
      riskCounts.watch > 0 ? <span key="w">{riskCounts.watch} to watch</span> : null,
    ] as Array<JSX.Element | null>
  ).filter((n): n is JSX.Element => n !== null);

  const Row = ({ student }: { student: AtRiskStudent }) => {
    const urgent = student.riskLevel === 'critical' || student.riskLevel === 'high';
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
            {student.riskFactors[0]?.label ?? student.cohort}
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
      <section className={CARD}>
        <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
          <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">At risk</h3>
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              urgentCount > 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {flagged} flagged
          </span>
        </div>

        {flagged > 0 ? (
          <>
            {breakdown.length > 0 && (
              <p className="px-4 pb-3 text-[12px] leading-snug text-white sm:px-5">
                {breakdown.map((node, i) => (
                  <span key={node.key}>
                    {i > 0 ? ' · ' : ''}
                    {node}
                  </span>
                ))}
              </p>
            )}
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {filteredStudents.slice(0, 3).map((student) => (
                <li key={student.id}>
                  <Row student={student} />
                </li>
              ))}
            </ul>
            <div className="flex border-t border-white/[0.10]">
              <button
                type="button"
                onClick={handleRefreshAi}
                disabled={recomputing}
                className={cn(FOOT, 'text-elec-yellow disabled:opacity-60')}
              >
                {recomputing ? 'Refreshing…' : 'Refresh AI signals'}
              </button>
              <span aria-hidden="true" className="w-px bg-white/[0.10]" />
              <button
                type="button"
                onClick={() => onNavigate?.('progresstracking')}
                className={cn(FOOT, 'text-white')}
              >
                View all {flagged}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              Nothing flagged. All learners on track.
            </p>
            <button
              type="button"
              onClick={handleRefreshAi}
              disabled={recomputing}
              className={cn(
                FOOT,
                'w-full border-t border-white/[0.10] text-elec-yellow disabled:opacity-60'
              )}
            >
              {recomputing ? 'Refreshing…' : 'Refresh AI signals'}
            </button>
          </>
        )}
      </section>
    );
  }

  return (
    <section className={CARD}>
      <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">At risk</h3>
        <button
          type="button"
          onClick={handleRefreshAi}
          disabled={recomputing}
          className="-my-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation disabled:opacity-60"
        >
          {recomputing ? 'Refreshing…' : 'Refresh AI signals'}
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
              <div className="mt-1 text-[11px] text-white">{f.label}</div>
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
                <p className="text-[12px] leading-snug text-white">
                  {student.cohort}
                  {student.riskFactors.length > 0
                    ? ` · ${student.riskFactors.map((f) => f.label).join(' · ')}`
                    : ''}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-4">
                  <Meter label="Attendance" value={student.attendance} />
                  <Meter label="Progress" value={student.progressPercentage} />
                </div>

                {student.recommendedActions.length > 0 && (
                  <ul className="mt-3 space-y-1 text-[12px] leading-snug text-white">
                    {student.recommendedActions.slice(0, 2).map((action, idx) => (
                      <li key={idx}>— {action}</li>
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

/** A labelled bar. `null` means no data, which is said rather than drawn as 0. */
function Meter({ label, value }: { label: string; value: number | null }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[11px] text-white">
        <span>{label}</span>
        <span className="font-semibold tabular-nums">
          {value === null ? 'No data' : `${Math.round(value)}%`}
        </span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.10]">
        {value !== null && (
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          />
        )}
      </div>
    </div>
  );
}
