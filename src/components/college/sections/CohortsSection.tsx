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
import { ClipboardCheck, ListChecks, MessageSquare, Users } from 'lucide-react';
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
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import {
  PEOPLE_LIST,
  FilterChips,
  ListLoading,
  SEARCH_CN,
  ScopeSwitch,
  norm,
} from '@/components/college/people/peopleKit';
import { useMyScope } from '@/components/college/people/useMyScope';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { CohortCard, cohortFigures } from '@/components/college/people/CohortCard';
import {
  passedOf,
  useCollegePortfolioOverview,
} from '@/components/college/portfolio/useCollegePortfolioOverview';

type StatusFilter = 'all' | 'active' | 'planning' | 'completed';

interface CohortsSectionProps {
  onNavigate?: (section: CollegeSection) => void;
}

const HELP: PageHelpContent = {
  id: 'college-cohorts',
  title: 'Cohorts',
  what: 'Your class groups. Each card shows how many learners are in it against its places, their attendance, who is at risk, and how much of their qualification has been passed.',
  steps: [
    {
      title: 'Open a cohort',
      body: "Tap a card for the roster filtered to that cohort, with every learner's figures.",
    },
    {
      title: 'Take its register',
      body: 'Register on a card opens the register for that cohort, ready to mark.',
    },
    { title: 'Message everyone', body: 'Message sends one note to every learner in the cohort.' },
    {
      title: 'Compare',
      body: 'Compare cohorts puts up to three side by side: progress, attendance, off-the-job hours and EPA readiness.',
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-400',
      label: 'Orange',
      body: 'Below the attendance target, learners at risk, or no tutor assigned.',
    },
  ],
  notes: [
    {
      title: 'Of criteria passed',
      body: 'Assessment criteria an assessor has passed, across every learner in the cohort who has joined, out of all the criteria on their qualification. The same count each learner sees in their portfolio.',
    },
    {
      title: 'Adding a cohort',
      body: 'New cohort needs a course (set one up in Course setup first), a name, a code and a lead tutor. Learners join it with its join code, or you enrol them from Learners.',
    },
  ],
};

/* The card's actions: one quiet toolbar of equal cells, white with a line
   icon (10 Oct: no row of yellow text links on every card). */
const LINK =
  'flex h-12 min-w-0 items-center justify-center gap-1 px-1 text-[12.5px] font-semibold text-white sm:gap-1.5 sm:text-[13px] transition-colors touch-manipulation hover:bg-white/[0.04] hover:text-elec-yellow active:bg-white/[0.07]';
const ICON = 'h-4 w-4 shrink-0';

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

  // Criteria passed per cohort, from the one server-side criteria state.
  const { data: portfolio } = useCollegePortfolioOverview();
  const criteriaByCohort = useMemo(() => {
    const m = new Map<string, { passed: number; total: number }>();
    for (const l of portfolio?.learners ?? []) {
      if (!l.cohort_id || !l.criteria || l.criteria.total === 0 || norm(l.status) !== 'active')
        continue;
      const c = m.get(l.cohort_id) ?? { passed: 0, total: 0 };
      c.passed += passedOf(l.criteria);
      c.total += l.criteria.total;
      m.set(l.cohort_id, c);
    }
    return m;
  }, [portfolio]);

  // The counts the tiles used to carry, in the one sentence under the title.
  const summary =
    cohorts.length === 0
      ? scope === 'mine'
        ? 'You have no cohorts of your own yet.'
        : 'No class groups yet. A cohort is a group of learners on one course, with dates and a lead tutor.'
      : [
          `${activeCohorts.length} running with ${placed} learner${placed === 1 ? '' : 's'}${planningCount > 0 ? `, ${planningCount} in planning` : ''}`,
          avgAttendance === null
            ? 'no register marked yet'
            : `${avgAttendance}% attendance against a ${settings.low_attendance_threshold_percent}% target`,
          atRiskTotal > 0 ? `${atRiskTotal} at risk` : 'nobody at risk',
          withoutTutor > 0
            ? `${withoutTutor} without a tutor`
            : `${placesFree} place${placesFree === 1 ? '' : 's'} free`,
        ].join(', ') + '. Tap a cohort for its roster.';

  // Skeleton until we know which cohorts are mine, so the page never shows the
  // whole college and then flips to Mine when the assignments land.
  if (isLoading || !scopeInfo.ready) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <CollegePageHeader
          eyebrow="People"
          title="Cohorts"
          description="Loading your cohorts…"
          help={HELP}
        />
        <div className={PEOPLE_LIST}>
          <ListLoading label="Loading cohorts…" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      <CollegePageHeader
        eyebrow="People"
        title={scope === 'mine' ? 'Your cohorts' : 'Cohorts'}
        description={summary}
        help={HELP}
        actions={
          <>
            <button
              type="button"
              className={cn(COLLEGE_BTN, 'max-sm:flex-1')}
              onClick={() => navigate('/college/compare')}
            >
              Compare cohorts
            </button>
            {canMessage ? (
              <button
                type="button"
                className={cn(COLLEGE_BTN, 'max-sm:flex-1')}
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
              <button
                type="button"
                onClick={() => setNewCohortOpen(true)}
                className={cn(COLLEGE_BTN_PRIMARY, 'order-first max-sm:w-full lg:order-none')}
              >
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
        mineCount={
          allCohorts.filter((c) => myCohortIds.has(c.id) && norm(c.status) === 'active').length
        }
        collegeCount={allCohorts.filter((c) => norm(c.status) === 'active').length}
      />

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
      >
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search cohorts…"
          aria-label="Search cohorts"
          className={cn(SEARCH_CN, 'lg:max-w-md')}
        />
        <FilterChips<StatusFilter>
          label="Status"
          items={chips}
          value={filterStatus}
          onChange={setFilterStatus}
        />
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
            title={
              cohorts.length === 0
                ? scope === 'mine'
                  ? 'No cohorts of yours yet'
                  : 'No cohorts yet'
                : 'No cohorts match'
            }
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
                <button
                  type="button"
                  className={COLLEGE_BTN_PRIMARY}
                  onClick={() => setNewCohortOpen(true)}
                >
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
                criteria={criteriaByCohort.get(cohort.id) ?? null}
                actions={
                  <>
                    <button
                      type="button"
                      className={LINK}
                      onClick={() => openCohortStudents(cohort.id)}
                    >
                      <Users className={ICON} strokeWidth={1.5} aria-hidden />
                      Learners
                    </button>
                    <button
                      type="button"
                      className={LINK}
                      onClick={() =>
                        navigate(
                          `/college?section=criteriagaps&cohortId=${encodeURIComponent(cohort.id)}`
                        )
                      }
                    >
                      <ListChecks className={ICON} strokeWidth={1.5} aria-hidden />
                      Gaps
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
                        <ClipboardCheck className={ICON} strokeWidth={1.5} aria-hidden />
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
                        <MessageSquare className={ICON} strokeWidth={1.5} aria-hidden />
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
