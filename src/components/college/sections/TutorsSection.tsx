/**
 * TutorsSection — teaching staff, on the shared hub language.
 *
 * Content only; the masthead is CollegeDashboard's. The PageHero, the pill
 * tab bar and the avatar rows with blue rings went. Rows now read rule ·
 * name · reason · figure · chevron, and tapping one opens the staff sheet
 * exactly as before.
 *
 * `college_staff.status` is stored both as 'Active' and 'active' in the same
 * college, so every status comparison here is case-insensitive — the old
 * strict compare painted four real tutors as a red "active".
 */
import { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddTutorDialog } from '@/components/college/dialogs/AddTutorDialog';
import { StaffOnboardingWizard } from '@/components/college/sheets/StaffOnboardingWizard';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StaffCardSkeletonList } from '@/components/college/ui/StaffCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { containerVariants, itemVariants } from '@/components/college/primitives';

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

export function TutorsSection() {
  const { staff, cohorts, students, isLoading } = useCollegeSupabase();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'tutor' | 'head_of_department'>('all');
  const [addTutorOpen, setAddTutorOpen] = useState(false);
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [openStaffId, setOpenStaffId] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleSelectStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setDetailOpen(true);
  };
  const handleEditStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setDetailOpen(false);
    setEditOpen(true);
  };

  const tutors = useMemo(
    () =>
      staff.filter(
        (s) =>
          (s.role === 'tutor' || s.role === 'head_of_department') && norm(s.status) !== 'archived'
      ),
    [staff]
  );

  const filteredTutors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tutors.filter((tutor) => {
      const matchesSearch =
        !q ||
        tutor.name.toLowerCase().includes(q) ||
        tutor.email.toLowerCase().includes(q) ||
        (tutor.department ?? '').toLowerCase().includes(q);
      const matchesFilter = filterRole === 'all' || tutor.role === filterRole;
      return matchesSearch && matchesFilter;
    });
  }, [tutors, searchQuery, filterRole]);

  const activeCohorts = useMemo(
    () => cohorts.filter((c) => norm(c.status) === 'active'),
    [cohorts]
  );
  const getCohortCount = (staffId: string): number =>
    activeCohorts.filter((c) => c.tutor_id === staffId).length;

  const tutorIds = useMemo(() => new Set(tutors.map((t) => t.id)), [tutors]);
  const cohortsWithoutTutor = activeCohorts.filter(
    (c) => !c.tutor_id || !tutorIds.has(c.tutor_id)
  ).length;
  const headCount = tutors.filter((t) => t.role === 'head_of_department').length;
  const activeLearners = students.filter((s) => norm(s.status) === 'active').length;
  const learnersPerTutor = tutors.length > 0 ? Math.round(activeLearners / tutors.length) : 0;
  const onLeave = tutors.filter((t) => norm(t.status) === 'on leave').length;

  // The context has no refetch; invalidating every active query is the
  // honest version of pull-to-refresh (the old handler only slept 800ms).
  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
  };

  const hasActiveFilters = !!searchQuery || filterRole !== 'all';

  const chips: { value: typeof filterRole; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: tutors.length },
    { value: 'tutor', label: 'Tutors', count: tutors.filter((t) => t.role === 'tutor').length },
    { value: 'head_of_department', label: 'Heads', count: headCount },
  ];

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
          label="Tutors"
          value={String(tutors.length)}
          verdict={tutors.length > 0 ? 'On the teaching team' : 'No tutors added yet'}
          context={onLeave > 0 ? `${onLeave} on leave` : undefined}
          onClick={() => setFilterRole('all')}
        />
        <HubKpi
          label="Heads of department"
          value={String(headCount)}
          verdict={headCount > 0 ? 'Leading the department' : 'No head of department set'}
          onClick={() => setFilterRole('head_of_department')}
        />
        <HubKpi
          label="Cohorts without a tutor"
          value={String(cohortsWithoutTutor)}
          verdict={
            cohortsWithoutTutor > 0 ? 'Assign a tutor before the class runs' : 'Every cohort covered'
          }
          context={`${activeCohorts.length} active cohort${activeCohorts.length === 1 ? '' : 's'}`}
          sentiment={cohortsWithoutTutor > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="Learners per tutor"
          value={String(learnersPerTutor)}
          verdict={tutors.length > 0 ? 'Active learners across the team' : 'Add a tutor first'}
          context={`${activeLearners} active learner${activeLearners === 1 ? '' : 's'}`}
        />
      </HubKpiRow>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <button type="button" onClick={() => setOnboardOpen(true)} className={PRIMARY}>
          Onboard a starter
        </button>
        <div className="-mx-2 flex items-center gap-1 sm:mx-0">
          <button type="button" onClick={() => setAddTutorOpen(true)} className={TEXT_ACTION}>
            Quick add
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-3">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name, email or department…"
          aria-label="Search tutors"
          className={SEARCH}
        />
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setFilterRole(chip.value)}
              className={cn(CHIP, filterRole === chip.value ? CHIP_ON : CHIP_OFF)}
            >
              {chip.label}
              <span className="tabular-nums opacity-70">{chip.count}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <HubSectionHeading>Teaching staff</HubSectionHeading>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {filteredTutors.length === tutors.length
              ? `${tutors.length} on the team`
              : `${filteredTutors.length} of ${tutors.length}`}
          </span>
        </div>

        {isLoading ? (
          <StaffCardSkeletonList count={3} />
        ) : (
          <PullToRefresh onRefresh={handleRefresh}>
            <div className={LIST_CARD}>
              {filteredTutors.length === 0 ? (
                <div className="px-4 py-5 sm:px-5">
                  <p className="text-[14px] font-semibold text-white">
                    {tutors.length === 0 ? 'No tutors yet' : hasActiveFilters ? 'No tutors match' : 'No tutors'}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-snug text-white">
                    {tutors.length === 0
                      ? 'Onboard a starter above, or quick add a tutor by name and email.'
                      : 'Clear the search or pick another chip.'}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-white/[0.10]">
                  {filteredTutors.map((tutor) => {
                    const cohortCount = getCohortCount(tutor.id);
                    const status = norm(tutor.status);
                    const quals = [tutor.teaching_qual, tutor.assessor_qual, tutor.iqa_qual].filter(
                      Boolean
                    );
                    const reason = [
                      tutor.role === 'head_of_department' ? 'Head of department' : null,
                      tutor.department,
                      quals.length > 0 ? quals.join(', ') : null,
                      tutor.max_teaching_hours ? `${tutor.max_teaching_hours}h/wk` : null,
                      status && status !== 'active' ? tutor.status : null,
                    ]
                      .filter(Boolean)
                      .join(' · ');

                    return (
                      <li key={tutor.id} className="flex items-center gap-2 pr-2 sm:pr-3">
                        <button
                          type="button"
                          onClick={() => handleSelectStaff(tutor)}
                          className="flex min-w-0 flex-1 items-center gap-3 py-3.5 pl-4 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:pl-5"
                        >
                          <span
                            aria-hidden
                            className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                              {tutor.name}
                            </span>
                            <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                              {reason || 'Tutor'}
                            </span>
                          </span>
                          <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                            {cohortCount} cohort{cohortCount === 1 ? '' : 's'}
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                        </button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label={`More actions for ${tutor.name}`}
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                            >
                              <span className="text-[15px] font-semibold tracking-[0.12em]">⋯</span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="min-w-[180px]">
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() => handleSelectStaff(tutor)}
                            >
                              Open profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              disabled={!tutor.phone}
                              onClick={() => {
                                if (tutor.phone) window.location.href = `tel:${tutor.phone}`;
                              }}
                            >
                              {tutor.phone ? `Call · ${tutor.phone}` : 'No phone on file'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() => {
                                window.location.href = `mailto:${tutor.email}`;
                              }}
                            >
                              Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </PullToRefresh>
        )}
      </motion.section>

      <AddTutorDialog open={addTutorOpen} onOpenChange={setAddTutorOpen} />
      <StaffOnboardingWizard
        open={onboardOpen}
        onOpenChange={setOnboardOpen}
        onComplete={(id) => setOpenStaffId(id)}
      />
      <StaffComplianceDrawer
        open={!!openStaffId}
        onOpenChange={(o) => {
          if (!o) setOpenStaffId(null);
        }}
        staffId={openStaffId}
      />
      <StaffDetailSheet
        staff={selectedStaff}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEditStaff}
      />
      <EditStaffSheet staff={selectedStaff} open={editOpen} onOpenChange={setEditOpen} />
    </motion.div>
  );
}
