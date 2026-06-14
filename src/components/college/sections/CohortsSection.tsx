import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { NewCohortDialog } from '@/components/college/dialogs/NewCohortDialog';
import { TakeAttendanceDialog } from '@/components/college/dialogs/TakeAttendanceDialog';
import { CohortMessageSheet } from '@/components/college/sheets/CohortMessageSheet';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import {
  PageFrame,
  PageHero,
  FilterBar,
  EmptyState,
  Pill,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  type Tone,
  itemVariants,
} from '@/components/college/primitives';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CohortsSectionProps {
  onNavigate?: (section: CollegeSection) => void;
}

export function CohortsSection(_props: CohortsSectionProps) {
  const { cohorts, students, staff } = useCollegeSupabase();
  const [, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newCohortOpen, setNewCohortOpen] = useState(false);
  const [takeAttendanceOpen, setTakeAttendanceOpen] = useState(false);
  const [messageCohortId, setMessageCohortId] = useState<string | null>(null);
  const [messageCohortName, setMessageCohortName] = useState<string | null>(null);

  const filteredCohorts = cohorts.filter((cohort) => {
    const matchesSearch = cohort.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cohort.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStudentCount = (cohortId: string): number =>
    students.filter((s) => s.cohort_id === cohortId && s.status === 'Active').length;

  const getTutorName = (tutorId: string | null): string => {
    if (!tutorId) return 'Unassigned';
    return staff.find((s) => s.id === tutorId)?.name || 'Unknown';
  };

  // Open the Students section pre-filtered to this cohort. We drive the same
  // URL contract the dashboard uses (?section=students) plus a ?cohort hint
  // that StudentsSection reads on mount — no toast dead-end.
  const openCohortStudents = (cohortId: string) => {
    setSearchParams({ section: 'students', cohort: cohortId });
  };

  // Cohort status → tone (never elec-yellow — that's reserved for actions).
  const statusToneForCohort = (status: string): Tone =>
    status === 'Active'
      ? 'emerald'
      : status === 'Planning'
        ? 'blue'
        : status === 'Cancelled'
          ? 'red'
          : 'grey';

  const activeCount = cohorts.filter((c) => c.status === 'Active').length;

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="People · Cohorts"
          title="Class groups"
          description={`${activeCount} active cohort${activeCount === 1 ? '' : 's'} currently enrolled.`}
          tone="emerald"
          actions={
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <SecondaryButton
                onClick={() => {
                  // Empty string sentinel — sheet opens, learner picks cohort
                  setMessageCohortId('');
                  setMessageCohortName(null);
                }}
              >
                Message cohort
              </SecondaryButton>
              <PrimaryButton onClick={() => setNewCohortOpen(true)}>New cohort</PrimaryButton>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: cohorts.length },
            { value: 'Active', label: 'Active', count: activeCount },
            {
              value: 'Planning',
              label: 'Planning',
              count: cohorts.filter((c) => c.status === 'Planning').length,
            },
            {
              value: 'Completed',
              label: 'Completed',
              count: cohorts.filter((c) => c.status === 'Completed').length,
            },
          ]}
          activeTab={filterStatus}
          onTabChange={setFilterStatus}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search cohorts…"
        />
      </motion.div>

      {filteredCohorts.length === 0 ? (
        <EmptyState
          title="No cohorts found"
          description="Try adjusting filters, or create a new cohort."
          action="New cohort"
          onAction={() => setNewCohortOpen(true)}
        />
      ) : (
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {filteredCohorts.map((cohort) => {
              const currentStudents = getStudentCount(cohort.id);
              const maxStudents = cohort.max_students ?? 20;
              const capacityPercent = Math.min((currentStudents / maxStudents) * 100, 100);

              return (
                <div
                  key={cohort.id}
                  className="group relative bg-[hsl(0_0%_12%)] transition-colors flex flex-col min-h-[180px]"
                >
                  {/* Tappable card body — opens this cohort's students */}
                  <button
                    type="button"
                    onClick={() => openCohortStudents(cohort.id)}
                    className="flex flex-col flex-1 text-left p-5 sm:p-6 hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_16%)] transition-colors touch-manipulation"
                    aria-label={`View students in ${cohort.name}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                          Cohort
                        </div>
                        <h3 className="mt-1.5 text-lg font-semibold text-white tracking-tight truncate">
                          {cohort.name}
                        </h3>
                      </div>
                      {/* Status pill sits in flow; the ⋯ menu is overlaid
                          top-right so it isn't nested inside this button. */}
                      <div className="shrink-0 pr-9">
                        <Pill tone={statusToneForCohort(cohort.status)}>{cohort.status}</Pill>
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="mt-4">
                      <div className="flex items-baseline justify-between text-[11px]">
                        <span className="text-white uppercase tracking-[0.12em]">Capacity</span>
                        <span className="font-medium text-white tabular-nums">
                          {currentStudents}/{maxStudents}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-elec-yellow/80 rounded-full transition-all"
                          style={{ width: `${capacityPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex-grow" />

                    <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11.5px]">
                      <span className="text-white truncate">
                        Tutor · {getTutorName(cohort.tutor_id)}
                      </span>
                      <span className="text-white tabular-nums shrink-0 ml-3">
                        {formatUKDateShort(cohort.start_date)} → {formatUKDateShort(cohort.end_date)}
                      </span>
                    </div>
                  </button>

                  {/* Overflow menu — overlaid so it stays out of the card button */}
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <IconButton aria-label="Cohort options" className="h-9 w-9">
                          <span className="text-[15px] font-semibold tracking-[0.12em]">⋯</span>
                        </IconButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="h-11 touch-manipulation"
                          onClick={() => openCohortStudents(cohort.id)}
                        >
                          View students
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11 touch-manipulation"
                          onClick={() => setTakeAttendanceOpen(true)}
                        >
                          Take register
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

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
    </PageFrame>
  );
}
