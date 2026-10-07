/**
 * CohortsSection — class groups as cards with their figures (College Hub
 * kit, 7 Oct 2026). Each card: learners against places, attendance, who is at
 * risk, average progress, tutor and dates. Tapping a card opens the roster
 * filtered to that cohort (`?section=students&cohort=<id>`); the card's own
 * buttons take a register for it or message it.
 *
 * Mine first (ELE-1886): a tutor sees their cohorts, one switch away from the
 * whole college. An active cohort with no tutor is the one thing outlined in
 * orange.
 */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NewCohortDialog } from '@/components/college/dialogs/NewCohortDialog';
import { TakeAttendanceDialog } from '@/components/college/dialogs/TakeAttendanceDialog';
import { CohortMessageSheet } from '@/components/college/sheets/CohortMessageSheet';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
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
import { FilterChips, ListLoading, SEARCH_CN, ScopeSwitch, norm } from '@/components/college/people/peopleKit';
import { useMyScope } from '@/components/college/people/useMyScope';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { CohortCard, cohortFigures } from '@/components/college/people/CohortCard';

type StatusFilter = 'all' | 'active' | 'planning' | 'completed';

interface CohortsSectionProps {
  onNavigate?: (section: CollegeSection) => void;
}

const HELP: PageHelpContent = {
  id: 'college-cohorts',
  title: 'Cohorts',
  what: 'Your class groups. Each card shows how many learners are in it against its places, their attendance, who is at risk and their average progress.',
  steps: [
    { title: 'Open a cohort', body: 'Tap a card for the roster filtered to that cohort, with every learner\'s figures.' },
    { title: 'Take its register', body: 'Register on a card opens the register for that cohort, ready to mark.' },
    { title: 'Message everyone', body: 'Message sends one note to every learner in the cohort.' },
    { title: 'Compare', body: 'Compare cohorts puts up to three side by side: progress, attendance, off-the-job hours and EPA readiness.' },
  ],
  legend: [
    { swatch: 'bg-orange-400', label: 'Orange', body: 'Below the attendance target, learners at risk, a full cohort, or no tutor assigned.' },
    { swatch: 'bg-elec-yellow', label: 'Yours', body: 'A cohort you teach, or one holding a learner assigned to you.' },
  ],
};

const LINK = 'flex h-11 items-center px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation';

export function CohortsSection(_props: CohortsSectionProps) {
  const { cohorts: allCohorts, students, staff, attendance, isLoading } = useCollegeSupabase();
  const { settings } = useCollegeSettings();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const scopeInfo = useMyScope({ staff, students, cohorts: allCohorts });
  const { scope, setScope, hasMine, myCohortIds } = scopeInfo;
  // ELE-1898: each action shows only when the database will accept it.
  const { can } = useCollegeCan();
  const canManageCohorts = can('cohorts.manage');
  const canRegister = can('register.take');
  const canMessage = can('messages.send');
  const cohorts = useMemo(
    () => (scope === 'mine' ? allCohorts.filter((c) => myCohortIds.has(c.id)) : allCohorts),
    [allCohorts, scope, myCohortIds]
  );
  const [registerCohort, setRegisterCohort] = useState<string | undefined>(undefined);
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
  const figs = activeCohorts.map((c) => cohortFigures(c, students, attendance));
  const measured = figs.filter((f) => f.attendance !== null);
  const avgAttendance = measured.length
    ? Math.round(measured.reduce((sum, f) => sum + (f.attendance ?? 0), 0) / measured.length)
    : null;
  const atRiskTotal = figs.reduce((sum, f) => sum + f.atRisk, 0);

  const chips: { value: StatusFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: cohorts.length },
    { value: 'active', label: 'Active', count: activeCohorts.length },
    { value: 'planning', label: 'Planning', count: planningCount },
    { value: 'completed', label: 'Completed', count: completedCount },
  ];

  const hasActiveFilters = !!searchQuery || filterStatus !== 'all';

  // Skeleton until we know which cohorts are mine, so the page never shows the
  // whole college and then flips to Mine when the assignments land.
  if (isLoading || !scopeInfo.ready) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <CollegePageHeader eyebrow="People" title="Cohorts" description="Loading your cohorts…" help={HELP} />
        <div className={COLLEGE_LIST}>
          <ListLoading label="Loading cohorts…" />
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8">
      <CollegePageHeader
        eyebrow="People"
        title={scope === 'mine' ? 'Your cohorts' : 'Cohorts'}
        description="Every class group with its learners, attendance and who is at risk. Tap a cohort for its roster."
        help={HELP}
        actions={
          <>
            <button type="button" className={COLLEGE_BTN} onClick={() => navigate('/college/compare')}>
              Compare cohorts
            </button>
            {canMessage ? (
              <button
                type="button"
                className={COLLEGE_BTN}
                onClick={() => {
                  // Empty string sentinel: the sheet opens and the tutor picks a cohort.
                  setMessageCohortId('');
                  setMessageCohortName(null);
                }}
              >
                Message a cohort
              </button>
            ) : null}
            {canManageCohorts ? (
              <button type="button" onClick={() => setNewCohortOpen(true)} className={cn(COLLEGE_BTN_PRIMARY, 'order-first lg:order-none')}>
                New cohort
              </button>
            ) : null}
          </>
        }
      />

      <ScopeSwitch
        scope={scope}
        onChange={setScope}
        hasMine={hasMine}
        mineLabel="My cohorts"
        mineCount={allCohorts.filter((c) => myCohortIds.has(c.id) && norm(c.status) === 'active').length}
        collegeCount={allCohorts.filter((c) => norm(c.status) === 'active').length}
      />

      <CollegeStats
        items={[
          {
            label: 'Active cohorts',
            value: String(activeCohorts.length),
            sub: planningCount > 0 ? `${planningCount} in planning` : `${placed} learners placed`,
            onClick: () => setFilterStatus('active'),
          },
          {
            label: 'Attendance',
            value: avgAttendance === null ? '—' : `${avgAttendance}%`,
            sub: avgAttendance === null ? 'No register marked yet' : `Average across cohorts, target ${settings.low_attendance_threshold_percent}%`,
            warn: avgAttendance !== null && avgAttendance < settings.low_attendance_threshold_percent,
          },
          {
            label: 'At risk',
            value: String(atRiskTotal),
            sub: atRiskTotal > 0 ? 'High or critical, across cohorts' : 'Nothing flagged',
            warn: atRiskTotal > 0,
          },
          {
            label: withoutTutor > 0 ? 'Without a tutor' : 'Places free',
            value: String(withoutTutor > 0 ? withoutTutor : placesFree),
            sub: withoutTutor > 0 ? 'Assign one before the class runs' : 'Against each cohort\'s maximum',
            warn: withoutTutor > 0,
          },
        ]}
      />

      <motion.div variants={itemVariants} className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search cohorts…"
          aria-label="Search cohorts"
          className={cn(SEARCH_CN, 'lg:max-w-md')}
        />
        <FilterChips<StatusFilter> label="Status" items={chips} value={filterStatus} onChange={setFilterStatus} />
      </motion.div>

      <section className="space-y-3">
        <CollegeSectionTitle
          title="Cohorts"
          sub={
            filteredCohorts.length === cohorts.length
              ? `${cohorts.length} in total`
              : `${filteredCohorts.length} of ${cohorts.length} shown`
          }
        />
        {filteredCohorts.length === 0 ? (
          <CollegeEmpty
            title={cohorts.length === 0 ? (scope === 'mine' ? 'No cohorts of yours yet' : 'No cohorts yet') : 'No cohorts match'}
            body={
              cohorts.length === 0
                ? scope === 'mine'
                  ? 'Switch to the whole college, or ask for a cohort to be assigned to you.'
                  : 'Create the first cohort, then enrol learners into it.'
                : hasActiveFilters
                  ? 'Clear the search or pick another chip.'
                  : undefined
            }
            action={
              cohorts.length === 0 && scope === 'college' && canManageCohorts ? (
                <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={() => setNewCohortOpen(true)}>
                  New cohort
                </button>
              ) : undefined
            }
          />
        ) : (
          <div className="grid items-stretch gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {filteredCohorts.map((cohort) => (
              <CohortCard
                key={cohort.id}
                cohort={cohort}
                students={students}
                attendance={attendance}
                tutorName={getTutorName(cohort.tutor_id)}
                mine={scope === 'college' && myCohortIds.has(cohort.id)}
                lowAttendance={settings.low_attendance_threshold_percent}
                onOpen={() => openCohortStudents(cohort.id)}
                actions={
                  <>
                    <button type="button" className={LINK} onClick={() => openCohortStudents(cohort.id)}>
                      Learners
                    </button>
                    {canRegister ? (
                      <button
                        type="button"
                        className={LINK}
                        onClick={() => {
                          setRegisterCohort(cohort.id);
                          setTakeAttendanceOpen(true);
                        }}
                      >
                        Register
                      </button>
                    ) : null}
                    {canMessage ? (
                      <button
                        type="button"
                        className={LINK}
                        onClick={() => {
                          setMessageCohortId(cohort.id);
                          setMessageCohortName(cohort.name);
                        }}
                      >
                        Message
                      </button>
                    ) : null}
                  </>
                }
              />
            ))}
          </div>
        )}
      </section>

      <NewCohortDialog open={newCohortOpen} onOpenChange={setNewCohortOpen} />
      <TakeAttendanceDialog
        open={takeAttendanceOpen}
        onOpenChange={(o) => {
          setTakeAttendanceOpen(o);
          if (!o) setRegisterCohort(undefined);
        }}
        cohortId={registerCohort}
      />
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
