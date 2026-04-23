import { useState } from 'react';
import { motion } from 'framer-motion';
import { NewCohortDialog } from '@/components/college/dialogs/NewCohortDialog';
import { TakeAttendanceDialog } from '@/components/college/dialogs/TakeAttendanceDialog';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import {
  PageFrame,
  PageHero,
  FilterBar,
  EmptyState,
  Pill,
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

export function CohortsSection({ onNavigate }: CohortsSectionProps) {
  const { cohorts, students, staff } = useCollegeSupabase();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newCohortOpen, setNewCohortOpen] = useState(false);
  const [takeAttendanceOpen, setTakeAttendanceOpen] = useState(false);

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
            <button
              onClick={() => setNewCohortOpen(true)}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              New cohort →
            </button>
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
              const toneForStatus =
                cohort.status === 'Active'
                  ? 'emerald'
                  : cohort.status === 'Planning'
                    ? 'blue'
                    : cohort.status === 'Cancelled'
                      ? 'red'
                      : 'yellow';

              return (
                <div
                  key={cohort.id}
                  className="group bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 sm:p-6 flex flex-col min-h-[180px]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                        Cohort
                      </div>
                      <h3 className="mt-1.5 text-lg font-semibold text-white tracking-tight truncate">
                        {cohort.name}
                      </h3>
                    </div>
                    <div className="flex items-start gap-1.5 shrink-0">
                      <Pill tone={toneForStatus}>{cohort.status}</Pill>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="text-white/75 hover:text-white text-[18px] leading-none px-1 touch-manipulation"
                            aria-label="Options"
                          >
                            ⋯
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() =>
                              toast({
                                title: cohort.name,
                                description: `${currentStudents} students · Tutor: ${getTutorName(cohort.tutor_id)}`,
                              })
                            }
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() => onNavigate?.('students')}
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

                  {/* Capacity */}
                  <div className="mt-4">
                    <div className="flex items-baseline justify-between text-[11px]">
                      <span className="text-white/75 uppercase tracking-[0.12em]">Capacity</span>
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
                    <span className="text-white/60 truncate">
                      Tutor · {getTutorName(cohort.tutor_id)}
                    </span>
                    <span className="text-white/75 tabular-nums shrink-0 ml-3">
                      {formatUKDateShort(cohort.start_date)} → {formatUKDateShort(cohort.end_date)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <NewCohortDialog open={newCohortOpen} onOpenChange={setNewCohortOpen} />
      <TakeAttendanceDialog open={takeAttendanceOpen} onOpenChange={setTakeAttendanceOpen} />
    </PageFrame>
  );
}
