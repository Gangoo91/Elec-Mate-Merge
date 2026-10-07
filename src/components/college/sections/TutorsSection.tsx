/**
 * TutorsSection — the teaching team (College Hub kit, 7 Oct 2026).
 *
 * Header with "?" → four figures → search and role chips → one row per tutor
 * with their cohorts, learners, marking waiting and load. Tapping a row opens
 * the staff sheet exactly as before; "Onboard a starter" runs the wizard.
 *
 * `college_staff.status` is stored both as 'Active' and 'active', so every
 * status comparison here is case-insensitive.
 */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AddTutorDialog } from '@/components/college/dialogs/AddTutorDialog';
import { StaffRosterSheet } from '@/components/college/setup/StaffRosterSheet';
import { StaffOnboardingWizard } from '@/components/college/sheets/StaffOnboardingWizard';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StaffCardSkeletonList } from '@/components/college/ui/StaffCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { useTutorWorkload } from '@/hooks/useTutorWorkload';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import { FilterChips, NameBadge, PeopleListHead, PeopleRow, SEARCH_CN, isTeachingStaff, norm } from '@/components/college/people/peopleKit';

const HELP: PageHelpContent = {
  id: 'college-tutors',
  title: 'Tutors',
  what: 'Your teaching team: who teaches which cohorts, how many learners each has, and how much marking is waiting with them.',
  steps: [
    { title: 'Onboard a starter', body: 'Walks you through a new tutor: details, qualifications, then their compliance checks (DBS, CPD, qualifications on file).' },
    { title: 'Quick add', body: 'Just a name and email when you need someone on the list now and will finish their record later.' },
    { title: 'Open a tutor', body: 'Tap a row for their profile, qualifications and contact details. Edit from there.' },
    { title: 'Balance the load', body: 'Workload shows every tutor\'s cohorts, lessons this week and marking side by side.' },
  ],
  legend: [
    { swatch: 'bg-orange-400', label: 'Heavy load', body: 'More than 4 cohorts or more than 3 pieces of marking waiting.' },
    { swatch: 'bg-red-400', label: 'Overloaded', body: 'More than 6 cohorts or more than 10 waiting.' },
  ],
};

export function TutorsSection() {
  const { staff, cohorts, students, isLoading } = useCollegeSupabase();
  const navigate = useNavigate();
  const { rows: workload } = useTutorWorkload();
  // ELE-1898: adding staff shows only for people the database lets add staff.
  const { can } = useCollegeCan();
  const canManageStaff = can('staff.manage');
  const loadById = useMemo(() => new Map(workload.map((w) => [w.tutor_staff_id, w])), [workload]);
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'tutor' | 'head_of_department'>('all');
  const [addTutorOpen, setAddTutorOpen] = useState(false);
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [rosterOpen, setRosterOpen] = useState(false);
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
      staff.filter(isTeachingStaff),
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
  const getLearnerCount = (staffId: string): number => {
    const ids = new Set(activeCohorts.filter((c) => c.tutor_id === staffId).map((c) => c.id));
    return students.filter((s) => s.cohort_id && ids.has(s.cohort_id) && norm(s.status) === 'active').length;
  };
  const toMark = workload.reduce((sum, w) => sum + w.pending_grading, 0);
  const overloaded = workload.filter((w) => w.load_band === 'red').length;

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8">
      <CollegePageHeader
        eyebrow="People"
        title="Tutors"
        description="Your teaching team, the cohorts they teach and the marking waiting with them."
        help={HELP}
        actions={
          <>
            <button type="button" className={COLLEGE_BTN} onClick={() => navigate('/college?section=tutorworkload')}>
              Workload
            </button>
            {canManageStaff ? (
              <>
                <button type="button" onClick={() => setAddTutorOpen(true)} className={COLLEGE_BTN}>
                  Quick add
                </button>
                <button type="button" onClick={() => setRosterOpen(true)} className={COLLEGE_BTN}>
                  Add several with logins
                </button>
                <button type="button" onClick={() => setOnboardOpen(true)} className={cn(COLLEGE_BTN_PRIMARY, 'order-first lg:order-none')}>
                  Onboard a starter
                </button>
              </>
            ) : null}
          </>
        }
      />

      <CollegeStats
        items={[
          {
            label: 'Tutors',
            value: String(tutors.length),
            sub: [headCount > 0 ? `${headCount} head${headCount === 1 ? '' : 's'} of department` : null, onLeave > 0 ? `${onLeave} on leave` : null].filter(Boolean).join(' · ') || 'On the teaching team',
            onClick: () => setFilterRole('all'),
          },
          {
            label: 'Learners per tutor',
            value: String(learnersPerTutor),
            sub: `${activeLearners} active learner${activeLearners === 1 ? '' : 's'}`,
          },
          {
            label: 'Cohorts without a tutor',
            value: String(cohortsWithoutTutor),
            sub: cohortsWithoutTutor > 0 ? 'Assign one before the class runs' : `All ${activeCohorts.length} covered`,
            warn: cohortsWithoutTutor > 0,
            onClick: () => navigate('/college?section=cohorts'),
          },
          {
            label: 'Marking waiting',
            value: String(toMark),
            sub: overloaded > 0 ? `${overloaded} tutor${overloaded === 1 ? '' : 's'} overloaded` : 'Across the team',
            warn: overloaded > 0,
            onClick: () => navigate('/college?section=tutorworkload'),
          },
        ]}
      />

      <motion.div variants={itemVariants} className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name, email or department…"
          aria-label="Search tutors"
          className={cn(SEARCH_CN, 'lg:max-w-md')}
        />
        <FilterChips<typeof filterRole> label="Role" items={chips} value={filterRole} onChange={setFilterRole} />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle
          title="Teaching staff"
          sub={filteredTutors.length === tutors.length ? `${tutors.length} on the team` : `${filteredTutors.length} of ${tutors.length} shown`}
        />
        {isLoading ? (
          <StaffCardSkeletonList count={3} />
        ) : filteredTutors.length === 0 ? (
          <CollegeEmpty
            title={tutors.length === 0 ? 'No tutors yet' : hasActiveFilters ? 'No tutors match' : 'No tutors'}
            body={tutors.length === 0 ? 'Onboard a starter, or quick add a tutor by name and email.' : 'Clear the search or pick another chip.'}
            action={
              tutors.length === 0 && canManageStaff ? (
                <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={() => setOnboardOpen(true)}>
                  Onboard a starter
                </button>
              ) : undefined
            }
          />
        ) : (
          <PullToRefresh onRefresh={handleRefresh}>
            <div className={COLLEGE_LIST}>
              <PeopleListHead title="Tutor" figures={['Cohorts', 'Learners', 'To mark']} />
              <ul className="divide-y divide-white/[0.06]">
                {filteredTutors.map((tutor) => {
                  const status = norm(tutor.status);
                  const load = loadById.get(tutor.id);
                  const quals = [tutor.teaching_qual, tutor.assessor_qual, tutor.iqa_qual].filter(Boolean);
                  const sub = [
                    tutor.role === 'head_of_department' ? 'Head of department' : null,
                    tutor.department,
                    quals.length > 0 ? quals.join(', ') : null,
                    tutor.max_teaching_hours ? `${tutor.max_teaching_hours}h a week` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <PeopleRow
                      key={tutor.id}
                      headed
                      title={tutor.name}
                      badge={
                        status && status !== 'active' ? (
                          <NameBadge>{tutor.status}</NameBadge>
                        ) : load?.load_band === 'red' ? (
                          <NameBadge tone="warn">Overloaded</NameBadge>
                        ) : load?.load_band === 'amber' ? (
                          <NameBadge tone="warn">Heavy</NameBadge>
                        ) : undefined
                      }
                      sub={sub || 'Tutor'}
                      tone={load?.load_band === 'red' ? 'critical' : load?.load_band === 'amber' ? 'warn' : 'quiet'}
                      onOpen={() => handleSelectStaff(tutor)}
                      figures={[
                        { label: 'cohorts', value: String(getCohortCount(tutor.id)) },
                        { label: 'learners', value: String(getLearnerCount(tutor.id)) },
                        { label: 'to mark', value: load ? String(load.pending_grading) : '—', warn: (load?.pending_grading ?? 0) > 3 },
                      ]}
                      menu={[
                        { label: 'Open profile', onClick: () => handleSelectStaff(tutor) },
                        {
                          label: tutor.phone ? `Call · ${tutor.phone}` : 'No phone on file',
                          disabled: !tutor.phone,
                          separated: true,
                          onClick: () => {
                            if (tutor.phone) window.location.href = `tel:${tutor.phone}`;
                          },
                        },
                        { label: 'Email', onClick: () => (window.location.href = `mailto:${tutor.email}`) },
                        { label: 'Compliance checks', separated: true, onClick: () => setOpenStaffId(tutor.id) },
                      ]}
                    />
                  );
                })}
              </ul>
            </div>
          </PullToRefresh>
        )}
      </motion.section>

      <AddTutorDialog open={addTutorOpen} onOpenChange={setAddTutorOpen} />
      {/* ELE-1900: bulk staff with logins and join links (admin / head of department; the function enforces it). */}
      <StaffRosterSheet open={rosterOpen} onOpenChange={setRosterOpen} />
      <StaffOnboardingWizard open={onboardOpen} onOpenChange={setOnboardOpen} onComplete={(id) => setOpenStaffId(id)} />
      <StaffComplianceDrawer
        open={!!openStaffId}
        onOpenChange={(o) => {
          if (!o) setOpenStaffId(null);
        }}
        staffId={openStaffId}
      />
      <StaffDetailSheet staff={selectedStaff} open={detailOpen} onOpenChange={setDetailOpen} onEdit={handleEditStaff} />
      <EditStaffSheet staff={selectedStaff} open={editOpen} onOpenChange={setEditOpen} />
    </motion.div>
  );
}
