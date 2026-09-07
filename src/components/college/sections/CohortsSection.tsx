/**
 * CohortsSection — class groups, on the shared hub language.
 *
 * Content only. The grid of `bg-[hsl(…)]` tiles with an uppercase CAPACITY
 * label and a translucent volt bar became one list card: rule · name ·
 * tutor and dates · places · chevron. Tapping a row still opens the Students
 * section pre-filtered to that cohort (`?section=students&cohort=<id>`).
 *
 * Volt on the rule marks the one thing here with a real cost of delay — an
 * active cohort with no tutor assigned.
 */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { NewCohortDialog } from '@/components/college/dialogs/NewCohortDialog';
import { TakeAttendanceDialog } from '@/components/college/dialogs/TakeAttendanceDialog';
import { CohortMessageSheet } from '@/components/college/sheets/CohortMessageSheet';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[12.5px] transition-colors touch-manipulation';
const CHIP_ON = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const CHIP_OFF = 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:bg-white/[0.10]';
const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white placeholder:opacity-60 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] touch-manipulation sm:w-auto';
const TEXT_ACTION =
  'flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);

const norm = (s: string | null | undefined) => (s ?? '').trim().toLowerCase();

type StatusFilter = 'all' | 'active' | 'planning' | 'completed';

interface CohortsSectionProps {
  onNavigate?: (section: CollegeSection) => void;
}

export function CohortsSection(_props: CohortsSectionProps) {
  const { cohorts, students, staff } = useCollegeSupabase();
  const [, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('all');
  const [newCohortOpen, setNewCohortOpen] = useState(false);
  const [takeAttendanceOpen, setTakeAttendanceOpen] = useState(false);
  const [messageCohortId, setMessageCohortId] = useState<string | null>(null);
  const [messageCohortName, setMessageCohortName] = useState<string | null>(null);

  const filteredCohorts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return cohorts.filter((cohort) => {
      const matchesSearch = !q || cohort.name.toLowerCase().includes(q);
      const matchesStatus = filterStatus === 'all' || norm(cohort.status) === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [cohorts, searchQuery, filterStatus]);

  // Active learners per cohort — `college_students.status` is Capitalised.
  const activeCountByCohort = useMemo(() => {
    const m = new Map<string, number>();
    for (const s of students) {
      if (norm(s.status) !== 'active' || !s.cohort_id) continue;
      m.set(s.cohort_id, (m.get(s.cohort_id) ?? 0) + 1);
    }
    return m;
  }, [students]);
  const getStudentCount = (cohortId: string): number => activeCountByCohort.get(cohortId) ?? 0;

  const getTutorName = (tutorId: string | null): string | null => {
    if (!tutorId) return null;
    return staff.find((s) => s.id === tutorId)?.name ?? null;
  };

  // Open the Students section pre-filtered to this cohort. Same URL contract
  // the dashboard uses (?section=students) plus a ?cohort hint that
  // StudentsSection reads on mount.
  const openCohortStudents = (cohortId: string) => {
    setSearchParams({ section: 'students', cohort: cohortId });
  };

  const activeCohorts = cohorts.filter((c) => norm(c.status) === 'active');
  const planningCount = cohorts.filter((c) => norm(c.status) === 'planning').length;
  const completedCount = cohorts.filter((c) => norm(c.status) === 'completed').length;
  const placed = activeCohorts.reduce((sum, c) => sum + getStudentCount(c.id), 0);
  const placesFree = activeCohorts.reduce(
    (sum, c) => sum + Math.max(0, (c.max_students ?? 20) - getStudentCount(c.id)),
    0
  );
  const withoutTutor = activeCohorts.filter((c) => !getTutorName(c.tutor_id)).length;

  const chips: { value: StatusFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: cohorts.length },
    { value: 'active', label: 'Active', count: activeCohorts.length },
    { value: 'planning', label: 'Planning', count: planningCount },
    { value: 'completed', label: 'Completed', count: completedCount },
  ];

  const hasActiveFilters = !!searchQuery || filterStatus !== 'all';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      <HubKpiRow>
        <HubKpi
          accent
          label="Active cohorts"
          value={String(activeCohorts.length)}
          verdict={activeCohorts.length > 0 ? 'Running now' : 'No cohorts running yet'}
          context={planningCount > 0 ? `${planningCount} in planning` : undefined}
          onClick={() => setFilterStatus('active')}
        />
        <HubKpi
          label="Learners placed"
          value={String(placed)}
          verdict={placed > 0 ? 'In an active cohort' : 'Nobody placed yet'}
        />
        <HubKpi
          label="Places free"
          value={String(placesFree)}
          verdict={placesFree > 0 ? 'Room to enrol' : 'Every active cohort is full'}
          context={activeCohorts.length > 0 ? 'Against each cohort’s maximum' : undefined}
        />
        <HubKpi
          label="Without a tutor"
          value={String(withoutTutor)}
          verdict={withoutTutor > 0 ? 'Assign a tutor before the class runs' : 'Every cohort covered'}
          sentiment={withoutTutor > 0 ? 'bad' : 'neutral'}
        />
      </HubKpiRow>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <button type="button" onClick={() => setNewCohortOpen(true)} className={PRIMARY}>
          New cohort
        </button>
        <div className="-mx-2 flex items-center gap-1 sm:mx-0">
          <button
            type="button"
            onClick={() => {
              // Empty string sentinel — the sheet opens and the tutor picks a cohort
              setMessageCohortId('');
              setMessageCohortName(null);
            }}
            className={TEXT_ACTION}
          >
            Message a cohort
          </button>
          <button type="button" onClick={() => setTakeAttendanceOpen(true)} className={TEXT_ACTION}>
            Take a register
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-3">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search cohorts…"
          aria-label="Search cohorts"
          className={SEARCH}
        />
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setFilterStatus(chip.value)}
              className={cn(CHIP, filterStatus === chip.value ? CHIP_ON : CHIP_OFF)}
            >
              {chip.label}
              <span className="tabular-nums opacity-70">{chip.count}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <HubSectionHeading>Cohorts</HubSectionHeading>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {filteredCohorts.length === cohorts.length
              ? `${cohorts.length} in total`
              : `${filteredCohorts.length} of ${cohorts.length}`}
          </span>
        </div>

        <div className={LIST_CARD}>
          {filteredCohorts.length === 0 ? (
            <div className="px-4 py-5 sm:px-5">
              <p className="text-[14px] font-semibold text-white">
                {cohorts.length === 0
                  ? 'No cohorts yet'
                  : hasActiveFilters
                    ? 'No cohorts match'
                    : 'No cohorts'}
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                {cohorts.length === 0
                  ? 'Create the first cohort above, then enrol learners into it.'
                  : 'Clear the search or pick another chip.'}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filteredCohorts.map((cohort) => {
                const currentStudents = getStudentCount(cohort.id);
                const maxStudents = cohort.max_students ?? 20;
                const tutorName = getTutorName(cohort.tutor_id);
                const status = norm(cohort.status);
                const needsTutor = status === 'active' && !tutorName;
                const dates =
                  cohort.start_date || cohort.end_date
                    ? `${formatUKDateShort(cohort.start_date)} → ${formatUKDateShort(cohort.end_date)}`
                    : null;
                const reason = [
                  tutorName ? `Tutor · ${tutorName}` : 'No tutor assigned',
                  status !== 'active' ? cohort.status : null,
                  dates,
                ]
                  .filter(Boolean)
                  .join(' · ');

                return (
                  <li key={cohort.id} className="flex items-center gap-2 pr-2 sm:pr-3">
                    <button
                      type="button"
                      onClick={() => openCohortStudents(cohort.id)}
                      aria-label={`View learners in ${cohort.name}`}
                      className="flex min-w-0 flex-1 items-center gap-3 py-3.5 pl-4 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:pl-5"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          needsTutor ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {cohort.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {reason}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-[13px] font-semibold tabular-nums',
                          needsTutor ? 'text-elec-yellow' : 'text-white'
                        )}
                      >
                        {currentStudents}/{maxStudents}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label={`Options for ${cohort.name}`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                        >
                          <span className="text-[15px] font-semibold tracking-[0.12em]">⋯</span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[180px]">
                        <DropdownMenuItem
                          className="h-11 touch-manipulation"
                          onClick={() => openCohortStudents(cohort.id)}
                        >
                          View learners
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11 touch-manipulation"
                          onClick={() => setTakeAttendanceOpen(true)}
                        >
                          Take register
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11 touch-manipulation"
                          onClick={() => {
                            setMessageCohortId(cohort.id);
                            setMessageCohortName(cohort.name);
                          }}
                        >
                          Message cohort
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </motion.section>

      <NewCohortDialog open={newCohortOpen} onOpenChange={setNewCohortOpen} />
      <TakeAttendanceDialog open={takeAttendanceOpen} onOpenChange={setTakeAttendanceOpen} />
      <CohortMessageSheet
        open={messageCohortId !== null || messageCohortName !== null}
        onOpenChange={(o) => {
          if (!o) {
            setMessageCohortId(null);
            setMessageCohortName(null);
          }
        }}
        defaultCohortId={messageCohortId}
        defaultCohortName={messageCohortName}
      />
    </motion.div>
  );
}
