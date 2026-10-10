/**
 * People Hub — learners, cohorts, staff, employers and the admin behind them
 * (College Hub kit, 7 Oct 2026).
 *
 *   header (with "?", the counts in one sentence) → set-up steps for a new
 *   college → at-risk list beside your cohorts →
 *   grouped link cards: Learners · Staff and partners · Courses and admin
 *
 * At-risk rows say WHY (the top risk factor) and open Student 360. Cohort
 * cards carry their own figures and open the roster filtered to them.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SmartSearchSheet } from '@/components/college/sheets/SmartSearchSheet';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent, CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { useCurrentRiskForStudents, useRecomputeRisk } from '@/hooks/useStudentRisk';
import { useCollegeEmployers } from '@/hooks/useCollegeEmployers';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
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
  NameBadge,
  PEOPLE_CARD,
  PEOPLE_LIST,
  PEOPLE_PANEL,
  PeopleLinks,
  PeopleRow,
  StatusChip,
  TOP_LINE,
  isSupportStaff,
  isTeachingStaff,
  norm,
  plural,
} from '@/components/college/people/peopleKit';
import { useMyScope } from '@/components/college/people/useMyScope';
import { cohortFigures } from '@/components/college/people/CohortCard';

interface CollegePeopleHubProps {
  onNavigate: (section: CollegeSection) => void;
}

const HELP: PageHelpContent = {
  id: 'college-people-hub',
  title: 'People',
  what: 'Everyone your college works with: learners and their cohorts, tutors and support staff, employers, and the courses they are enrolled on.',
  steps: [
    {
      title: 'Find someone fast',
      body: 'Find someone searches learners and staff together. The search in the top bar (⌘K on a keyboard) finds learners from any screen.',
    },
    {
      title: 'Start with who is at risk',
      body: 'The list says why each learner is flagged. Tap one to open their Student 360 and act on it.',
    },
    {
      title: 'Check your cohorts',
      body: 'Each cohort card shows its learners, attendance and who is at risk. Tap one for the roster filtered to that group.',
    },
    {
      title: 'Run the college',
      body: 'The cards at the bottom go to staff, workload, employers, courses, bulk jobs and settings.',
    },
  ],
  notes: [
    {
      title: 'Risk scores',
      body: 'Risk is worked out from attendance, progress, portfolio activity and observations. Refresh risk scores recalculates them for the learners listed.',
    },
  ],
};

export function CollegePeopleHub({ onNavigate }: CollegePeopleHubProps) {
  const navigate = useNavigate();
  const { staff, students, cohorts, courses, isLoading, getStudentsAtRiskData } =
    useCollegeSupabase();
  const { settings } = useCollegeSettings();
  const { employers } = useCollegeEmployers();

  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [staffDetailOpen, setStaffDetailOpen] = useState(false);
  const [staffEditOpen, setStaffEditOpen] = useState(false);

  const { attendance } = useCollegeSupabase();
  const scopeInfo = useMyScope({ staff, students, cohorts });
  // Same definition as the Tutors page (tutors + heads, not archived).
  const activeTutors = staff.filter(isTeachingStaff).length;
  const activeStudents = students.filter((s) => norm(s.status) === 'active').length;
  const activeCohortList = useMemo(
    () => cohorts.filter((c) => norm(c.status) === 'active'),
    [cohorts]
  );
  const activeCohorts = activeCohortList.length;
  // Mine first (ELE-1886): my cohorts lead, the rest follow.
  const orderedCohorts = useMemo(
    () =>
      [...activeCohortList].sort(
        (a, b) =>
          Number(scopeInfo.isMineCohort(b.id)) - Number(scopeInfo.isMineCohort(a.id)) ||
          a.name.localeCompare(b.name)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCohortList, scopeInfo.myCohortIds]
  );
  // Critical first BEFORE the list is cut to six, so a critical learner is
  // never pushed off the card by high ones.
  const atRiskStudents = useMemo(() => {
    const rank = (r: string | null | undefined) => (norm(r) === 'critical' ? 0 : 1);
    return [...getStudentsAtRiskData()].sort((a, b) => rank(a.risk_level) - rank(b.risk_level));
  }, [getStudentsAtRiskData]);
  const studentsAtRisk = atRiskStudents.length;

  /*
   * Same definition the Support Staff page uses (SupportStaffSection.tsx:44):
   * anyone who is not a tutor or head of department and is not archived.
   * This card used to count `role in ('admin','support','assessor') AND status
   * = 'Active'`, so it disagreed with the page it opened — IQA staff and
   * anyone with a status other than 'Active' were missing from the figure but
   * present in the list.
   */
  const supportStaffCount = staff.filter(isSupportStaff).length;

  // The computed risk rows for the visible list, so each row can say WHY the
  // learner is on it rather than just that they are.
  const atRiskIds = useMemo(() => atRiskStudents.slice(0, 6).map((s) => s.id), [atRiskStudents]);
  const { byStudent: riskById, refresh: refreshRisk } = useCurrentRiskForStudents(atRiskIds);
  const { recompute, running: recomputing } = useRecomputeRisk();

  const handleRefreshRisk = async () => {
    await recompute({ student_ids: atRiskIds });
    await refreshRisk();
  };

  const openStudent = (student: CollegeStudent) => {
    // Student 360 is a page, not a side sheet.
    navigate(`/college?section=student360&studentId=${student.id}`);
  };
  const openStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setStaffDetailOpen(true);
  };
  const editStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setStaffDetailOpen(false);
    setStaffEditOpen(true);
  };

  // The at-risk list is as long as the cohort list beside it (4 to 6 rows),
  // so the two columns end level on a wide screen; the rest are one tap on.
  const riskShown = Math.min(6, Math.max(4, orderedCohorts.length));
  const atRiskRows = useMemo(() => {
    return atRiskStudents
      .slice(0, riskShown)
      .map((student) => {
        const risk = riskById.get(student.id);
        const level = (risk?.level ?? student.risk_level ?? 'medium').toString().toLowerCase();
        const topFactor = risk?.factors?.[0]?.label;
        const extra = risk && risk.factors.length > 1 ? `+${risk.factors.length - 1} more` : null;
        return {
          student,
          level,
          reason: [topFactor ?? 'Open their Student 360 to see why', extra]
            .filter(Boolean)
            .join(' · '),
        };
      })
      .sort((a, b) => Number(b.level === 'critical') - Number(a.level === 'critical'));
  }, [atRiskStudents, riskById, riskShown]);
  const urgent = atRiskRows.some((r) => r.level === 'critical' || r.level === 'high');

  const go = (section: string) => navigate(`/college?section=${section}`);

  // A college with nobody on the roll gets the three set-up steps first.
  const isNewCollege = students.length === 0;
  const hasCourses = (courses?.length ?? 0) > 0;

  // The one sentence under the title carries the counts (no row of tiles).
  const summary =
    students.length === 0
      ? 'Nobody is on the roll yet. Start with a course and a cohort, then enrol your learners.'
      : [
          `${plural(activeStudents, 'learner')} in ${plural(activeCohorts, 'cohort')}`,
          studentsAtRisk > 0 ? `${studentsAtRisk} at risk` : 'nobody flagged at risk',
          `${plural(activeTutors, 'tutor')} and ${supportStaffCount} support staff`,
          `${plural(employers.length, 'employer')}`,
        ].join(', ') + '.';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-10"
    >
      <CollegePageHeader
        eyebrow="College"
        title="People"
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
            <button
              type="button"
              className={cn(COLLEGE_BTN, 'max-sm:flex-1')}
              onClick={() => onNavigate('attendance')}
            >
              Take a register
            </button>
            <button
              type="button"
              className={cn(COLLEGE_BTN_PRIMARY, 'order-first max-sm:w-full lg:order-none')}
              onClick={() => setSearchOpen(true)}
            >
              Find someone
            </button>
          </>
        }
      />

      {isNewCollege && (
        <motion.section variants={itemVariants} className={cn(PEOPLE_PANEL, 'space-y-4')}>
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight text-white">
              Get your people in
            </h2>
            <p className="mt-1 max-w-2xl text-[13.5px] leading-relaxed text-white">
              Nobody is on the roll yet. Three steps, in this order: a course, a cohort on that
              course, then the learners in the cohort. Each learner gets a join code so their
              account links to your college.
            </p>
          </div>
          <ol className="grid gap-3 md:grid-cols-3">
            {[
              {
                n: 1,
                title: 'Add a course',
                body: 'What learners enrol on, and the off-the-job hours it needs.',
                done: hasCourses,
                go: () => go('coursesetup'),
              },
              {
                n: 2,
                title: 'Create a cohort',
                body: 'A class group on one course, with dates and a lead tutor.',
                done: cohorts.length > 0,
                go: () => onNavigate('cohorts'),
              },
              {
                n: 3,
                title: 'Enrol learners',
                body: 'One at a time, paste your MIS list, or share the join code.',
                done: students.length > 0,
                go: () => onNavigate('students'),
              },
            ].map((step) => (
              <li key={step.n}>
                <button
                  type="button"
                  onClick={step.go}
                  className={cn(PEOPLE_CARD, 'mx-0 w-full !rounded-2xl !border p-4')}
                >
                  <span aria-hidden className={TOP_LINE} />
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-white">Step {step.n}</span>
                    {step.done ? (
                      <StatusChip tone="done">Done</StatusChip>
                    ) : (
                      <StatusChip>To do</StatusChip>
                    )}
                  </span>
                  <span className="mt-2 block text-[14.5px] font-semibold text-white">
                    {step.title}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-white">
                    {step.body}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <button type="button" className={COLLEGE_BTN} onClick={() => navigate('/college/setup')}>
            Open the full setup checklist
          </button>
        </motion.section>
      )}

      {!isNewCollege && (
        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:gap-6">
          <motion.section variants={itemVariants} className="min-w-0 space-y-3">
            <CollegeSectionTitle
              title="At risk"
              sub={
                studentsAtRisk > 0
                  ? `${plural(studentsAtRisk, 'learner')}, most urgent first`
                  : undefined
              }
              action={
                studentsAtRisk > 0 ? (
                  <button
                    type="button"
                    onClick={handleRefreshRisk}
                    disabled={recomputing}
                    className="flex h-11 items-center px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation disabled:text-white"
                  >
                    {recomputing ? 'Refreshing…' : 'Refresh scores'}
                  </button>
                ) : undefined
              }
            />
            {atRiskRows.length === 0 ? (
              <CollegeEmpty
                title="Nobody is flagged at risk"
                body="Risk is worked out from attendance, progress and portfolio activity. When a learner slips they appear here with the reason."
              />
            ) : (
              <div className={PEOPLE_LIST}>
                <ul className="divide-y divide-white/[0.06]">
                  {atRiskRows.map(({ student, level, reason }) => (
                    <PeopleRow
                      key={student.id}
                      title={student.name}
                      badge={
                        scopeInfo.isMineStudent(student.id) ? (
                          <NameBadge tone="mine">Yours</NameBadge>
                        ) : undefined
                      }
                      sub={reason}
                      tone={level === 'critical' ? 'critical' : 'warn'}
                      onOpen={() => openStudent(student)}
                      figures={[
                        {
                          label: 'risk',
                          value: level.charAt(0).toUpperCase() + level.slice(1),
                          warn: level !== 'critical',
                          critical: level === 'critical',
                        },
                      ]}
                    />
                  ))}
                </ul>
                {studentsAtRisk > atRiskRows.length && (
                  <button
                    type="button"
                    onClick={() => onNavigate('progresstracking')}
                    className="flex h-12 w-full items-center justify-center text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
                  >
                    {studentsAtRisk - atRiskRows.length} more in progress tracking
                  </button>
                )}
              </div>
            )}
          </motion.section>

          <motion.section variants={itemVariants} className="min-w-0 space-y-3">
            <CollegeSectionTitle
              title={scopeInfo.myCohortIds.size > 0 ? 'Cohorts, yours first' : 'Cohorts'}
              action={
                <button
                  type="button"
                  className="flex h-11 items-center px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                  onClick={() => onNavigate('cohorts')}
                >
                  All cohorts
                </button>
              }
            />
            {orderedCohorts.length === 0 ? (
              <CollegeEmpty
                title="No cohorts running"
                body="Create a cohort, then enrol learners into it."
              />
            ) : (
              <div className={PEOPLE_LIST}>
                <ul className="divide-y divide-white/[0.06]">
                  {orderedCohorts.slice(0, 6).map((c) => {
                    const f = cohortFigures(c, students, attendance);
                    const tutor = staff.find((st) => st.id === c.tutor_id)?.name ?? null;
                    return (
                      <PeopleRow
                        key={c.id}
                        title={c.name}
                        badge={
                          scopeInfo.isMineCohort(c.id) ? (
                            <NameBadge tone="mine">Yours</NameBadge>
                          ) : undefined
                        }
                        sub={[
                          tutor ? `Tutor ${tutor}` : 'No tutor assigned',
                          f.atRisk > 0 ? `${f.atRisk} at risk` : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                        tone={!tutor ? 'warn' : 'quiet'}
                        onOpen={() => navigate(`/college?section=students&cohort=${c.id}`)}
                        figures={[
                          { label: 'learners', value: `${f.learners}/${f.max}` },
                          {
                            label: 'attendance',
                            value: f.attendance === null ? '—' : `${f.attendance}%`,
                            warn:
                              f.attendance !== null &&
                              f.attendance < settings.low_attendance_threshold_percent,
                          },
                        ]}
                      />
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onClick={() => onNavigate('cohorts')}
                  className="flex h-12 w-full items-center justify-center text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
                >
                  {orderedCohorts.length > 6
                    ? `${orderedCohorts.length - 6} more cohorts`
                    : `All ${plural(cohorts.length, 'cohort')}, with registers and gaps`}
                </button>
              </div>
            )}
          </motion.section>
        </div>
      )}

      <section className="space-y-3">
        <CollegeSectionTitle title="Learners" />
        <PeopleLinks
          items={[
            {
              title: 'Learners',
              figure: String(activeStudents),
              body: 'The roster: risk, attendance, hours and progress.',
              onClick: () => onNavigate('students'),
            },
            {
              title: 'Cohorts',
              figure: String(activeCohorts),
              body: 'Class groups and how each one is doing.',
              onClick: () => onNavigate('cohorts'),
            },
            {
              title: 'Ready to start',
              body: 'Eligibility, ID, the agreement and contract, per learner.',
              onClick: () => navigate('/college/onboarding'),
            },
            {
              title: 'Attendance',
              body: 'Registers and attendance patterns.',
              onClick: () => onNavigate('attendance'),
            },
            {
              title: 'Progress tracking',
              figure: studentsAtRisk > 0 ? String(studentsAtRisk) : undefined,
              warn: studentsAtRisk > 0,
              body: studentsAtRisk > 0 ? 'Learners at risk.' : 'RAG ratings and at-risk flags.',
              onClick: () => onNavigate('progresstracking'),
            },
          ]}
        />
      </section>

      <section className="space-y-3">
        <CollegeSectionTitle title="Staff and partners" />
        <PeopleLinks
          items={[
            {
              title: 'Tutors',
              figure: activeTutors > 0 ? String(activeTutors) : undefined,
              body: 'Teaching staff, qualifications and cohorts.',
              onClick: () => onNavigate('tutors'),
            },
            {
              title: 'Support staff',
              figure: supportStaffCount > 0 ? String(supportStaffCount) : undefined,
              body: 'Assessors, IQA and the admin team.',
              onClick: () => onNavigate('supportstaff'),
            },
            {
              title: 'Workload',
              body: 'Cohorts, lessons, marking and observations per tutor.',
              onClick: () => onNavigate('tutorworkload'),
            },
            {
              title: 'Employers',
              figure: employers.length > 0 ? String(employers.length) : undefined,
              body: 'Placements, reviews and off-the-job hours by employer.',
              onClick: () => onNavigate('employerportal'),
            },
          ]}
        />
      </section>

      <section className="space-y-3">
        <CollegeSectionTitle title="Courses and admin" />
        <PeopleLinks
          items={[
            {
              title: 'Course setup',
              body: 'What learners enrol on, and the off-the-job hours each needs.',
              onClick: () => go('coursesetup'),
            },
            {
              title: 'Qualifications',
              body: 'Units and learning outcomes for every qualification.',
              onClick: () => go('courses'),
            },
            {
              title: 'Bulk jobs',
              body: 'Grades, ILP reviews or a message for a whole cohort.',
              onClick: () => go('batchoperations'),
            },
            {
              title: 'Settings',
              body: 'Thresholds, lesson plan settings and your VLE.',
              onClick: () => go('collegesettings'),
            },
          ]}
        />
      </section>

      <SmartSearchSheet
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelectStudent={openStudent}
        onSelectStaff={openStaff}
      />
      <StaffDetailSheet
        staff={selectedStaff}
        open={staffDetailOpen}
        onOpenChange={setStaffDetailOpen}
        onEdit={editStaff}
      />
      <EditStaffSheet staff={selectedStaff} open={staffEditOpen} onOpenChange={setStaffEditOpen} />
    </motion.div>
  );
}
