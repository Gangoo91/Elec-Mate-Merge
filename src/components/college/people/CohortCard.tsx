import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import type { CollegeAttendance, CollegeCohort, CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import { NameBadge, norm } from './peopleKit';

/** Figures for one cohort from the rows the College context already holds. */
export function cohortFigures(cohort: CollegeCohort, students: CollegeStudent[], attendance: CollegeAttendance[]) {
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
  const progress = learners.length
    ? Math.round(learners.reduce((sum, s) => sum + (s.progress_percent ?? 0), 0) / learners.length)
    : null;
  return {
    learners: learners.length,
    max: cohort.max_students ?? 20,
    attendance: n > 0 ? Math.round((100 * attended) / n) : null,
    atRisk,
    progress,
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
      <dd className={cn('text-[22px] font-bold leading-none tabular-nums', warn ? 'text-orange-400' : 'text-white')}>{value}</dd>
      <dt className="mt-1 truncate text-[12px] text-white">{label}</dt>
    </div>
  );
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'flex h-full flex-col rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]',
        needsTutor && 'border-orange-400/40'
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${cohort.name}`}
        className="group flex flex-1 flex-col p-5 text-left touch-manipulation"
      >
        <span className="flex w-full items-start justify-between gap-3">
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-[15px] font-semibold leading-snug text-white">{cohort.name}</span>
              {mine && <NameBadge tone="mine">Yours</NameBadge>}
              {status && status !== 'active' && <NameBadge>{cohort.status}</NameBadge>}
            </span>
            <span className="mt-1 block text-[12.5px] leading-snug text-white">
              {[needsTutor ? 'No tutor assigned' : tutorName ? `Tutor ${tutorName}` : null, compact ? null : dates]
                .filter(Boolean)
                .join(' · ')}
            </span>
          </span>
          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow" aria-hidden />
        </span>
        <dl className={cn('mt-4 grid gap-3', compact ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4')}>
          {fig('learners', `${f.learners}/${f.max}`, full)}
          {fig('attendance', f.attendance === null ? '—' : `${f.attendance}%`, f.attendance !== null && f.attendance < lowAttendance)}
          {fig('at risk', String(f.atRisk), f.atRisk > 0)}
          {!compact && fig('avg progress', f.progress === null ? '—' : `${f.progress}%`)}
        </dl>
        <span className="mt-4 block h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
          <span
            className={cn('block h-full rounded-full', full ? 'bg-orange-400' : 'bg-elec-yellow')}
            style={{ width: `${Math.min(100, Math.round((100 * f.learners) / Math.max(1, f.max)))}%` }}
          />
        </span>
        <span className="mt-1.5 block text-[11.5px] text-white">
          {full ? 'Full' : `${f.max - f.learners} ${f.max - f.learners === 1 ? 'place' : 'places'} free`}
        </span>
      </button>
      {actions && <div className="flex flex-wrap gap-1 border-t border-white/[0.06] px-3 py-1.5">{actions}</div>}
    </motion.div>
  );
}
