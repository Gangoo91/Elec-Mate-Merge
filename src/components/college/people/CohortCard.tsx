import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import type {
  CollegeAttendance,
  CollegeCohort,
  CollegeStudent,
} from '@/contexts/CollegeSupabaseContext';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import { NameBadge, PEOPLE_CARD, TOP_LINE, StatusChip, norm } from './peopleKit';
import { keyLabel } from '@/lib/college/labels';

/** Figures for one cohort from the rows the College context already holds. */
export function cohortFigures(
  cohort: CollegeCohort,
  students: CollegeStudent[],
  attendance: CollegeAttendance[]
) {
  const learners = students.filter((s) => s.cohort_id === cohort.id && norm(s.status) === 'active');
  const ids = new Set(learners.map((s) => s.id));
  let n = 0;
  let attended = 0;
  for (const a of attendance) {
    if (!a.student_id || !ids.has(a.student_id)) continue;
    n += 1;
    const st = norm(a.status);
    if (st === 'present' || st === 'late') attended += 1;
  }
  const atRisk = learners.filter((s) => ['high', 'critical'].includes(norm(s.risk_level))).length;
  return {
    learners: learners.length,
    max: cohort.max_students ?? 20,
    attendance: n > 0 ? Math.round((100 * attended) / n) : null,
    atRisk,
  };
}

/**
 * One cohort as a card: name, tutor and dates, then its figures. Used on the
 * People hub (compact) and the Cohorts page (with actions).
 */
export function CohortCard({
  cohort,
  students,
  attendance,
  tutorName,
  mine,
  onOpen,
  compact,
  actions,
  lowAttendance = 80,
  criteria,
}: {
  cohort: CollegeCohort;
  students: CollegeStudent[];
  attendance: CollegeAttendance[];
  tutorName: string | null;
  mine?: boolean;
  onOpen: () => void;
  compact?: boolean;
  actions?: ReactNode;
  lowAttendance?: number;
  /**
   * Criteria passed across the cohort's learners who have joined, from
   * college_portfolio_overview (get_portfolio_ac_state). Replaces the old
   * "avg progress", an average of a typed-in percentage. null = nobody has
   * a portfolio to count yet.
   */
  criteria?: { passed: number; total: number } | null;
}) {
  const f = cohortFigures(cohort, students, attendance);
  const status = norm(cohort.status);
  const needsTutor = status === 'active' && !tutorName;
  const full = f.learners >= f.max;
  const dates =
    cohort.start_date || cohort.end_date
      ? `${formatUKDateShort(cohort.start_date)} to ${formatUKDateShort(cohort.end_date)}`
      : null;
  const fig = (label: string, value: string, warn?: boolean) => (
    <div key={label} className="min-w-0">
      <dd
        className={cn(
          'text-[22px] font-bold leading-none tabular-nums',
          warn ? 'text-orange-400' : 'text-white'
        )}
      >
        {value}
      </dd>
      <dt className="mt-1 truncate text-[12px] text-white">{label}</dt>
    </div>
  );
  return (
    <motion.div variants={itemVariants} className={PEOPLE_CARD}>
      <span aria-hidden className={TOP_LINE} />
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${cohort.name}`}
        className="flex flex-1 flex-col p-4 text-left touch-manipulation sm:p-5"
      >
        <span className="flex w-full items-start justify-between gap-3">
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-[15px] font-semibold leading-snug text-white">
                {cohort.name}
              </span>
              {mine && <NameBadge tone="mine">Yours</NameBadge>}
              {status && status !== 'active' && <NameBadge>{keyLabel(cohort.status)}</NameBadge>}
              {needsTutor && <StatusChip tone="action">No tutor</StatusChip>}
              {full && status === 'active' && <StatusChip>Full</StatusChip>}
            </span>
            <span className="mt-1 block text-[12.5px] leading-snug text-white">
              {[
                needsTutor
                  ? 'Assign a tutor before the class runs'
                  : tutorName
                    ? `Tutor ${tutorName}`
                    : null,
                compact ? null : dates,
              ]
                .filter(Boolean)
                .join(' · ')}
            </span>
          </span>
          <ChevronRight
            className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow"
            aria-hidden
          />
        </span>
        <dl
          className={cn('mt-4 grid gap-3', compact ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4')}
        >
          {fig('learners', `${f.learners}/${f.max}`, full)}
          {fig(
            'attendance',
            f.attendance === null ? '—' : `${f.attendance}%`,
            f.attendance !== null && f.attendance < lowAttendance
          )}
          {fig('at risk', String(f.atRisk), f.atRisk > 0)}
          {!compact &&
            fig(
              'of criteria passed',
              criteria && criteria.total > 0
                ? `${Math.round((100 * criteria.passed) / criteria.total)}%`
                : '—'
            )}
        </dl>
        <span className="mt-4 block text-[12.5px] text-white">
          {full
            ? `Full: ${f.learners} of ${f.max} places taken`
            : `${f.max - f.learners} ${f.max - f.learners === 1 ? 'place' : 'places'} free of ${f.max}`}
        </span>
      </button>
      {actions && (
        <div className="grid grid-flow-col auto-cols-fr divide-x divide-white/[0.06] border-t border-white/[0.06]">
          {actions}
        </div>
      )}
    </motion.div>
  );
}
