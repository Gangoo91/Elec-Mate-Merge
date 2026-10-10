/**
 * EmployerPortalSection — employer engagement, on the shared hub language.
 * Content only; the masthead is CollegeDashboard's.
 *
 * What went: the 48–60px hero, the numbered `01 · EMPLOYERS` KPI strip on
 * `bg-[hsl(…)]`, the blue/cyan hairline on each employer card, the blue
 * initials discs and the three-colour progress pills. What stayed: every
 * query and derivation (verified off-the-job minutes keyed on the AUTH uid,
 * attendance and ILPs keyed on the college row id), the share-link sheet and
 * the honest "no visit log yet" note.
 *
 * Learner rows now go to Student 360 — `ApprenticeRow.id` is
 * `college_students.id`, which is what that section expects.
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useCollegeEmployers } from '@/hooks/useCollegeEmployers';
import { useReviewBoard, londonToday, fmtReviewDate } from '@/hooks/useTripartiteReviews';
import { EmployerLinkSheet } from '@/components/college/sheets/EmployerLinkSheet';
import { DEFAULT_OTJ_STANDARD } from '@/data/otjStandards';
import {
  passedOf,
  useCollegePortfolioOverview,
} from '@/components/college/portfolio/useCollegePortfolioOverview';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { PEOPLE_LIST } from '@/components/college/people/peopleKit';
import {
  COLLEGE_BTN,
  COLLEGE_ROW,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';

const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white placeholder:opacity-60 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
const TEXT_ACTION =
  'flex h-11 shrink-0 items-center px-2 text-[13px] font-semibold text-elec-yellow transition-colors touch-manipulation';
const LIST_CARD = PEOPLE_LIST;
const ROW = COLLEGE_ROW;

const HELP: PageHelpContent = {
  id: 'college-employers',
  title: 'Employers',
  what: 'Every employer your apprentices work for, with how their apprentices are doing: attendance, criteria passed, off-the-job hours and reviews.',
  steps: [
    {
      title: 'Open an employer',
      body: 'Tap an employer to see their apprentices. Tap an apprentice for their Student 360.',
    },
    {
      title: 'Share a link with them',
      body: "Set up share link gives the employer a page with their apprentices' progress, no account needed.",
    },
    {
      title: 'Keep reviews moving',
      body: 'Apprentices due a review are listed. Progress reviews books and records the three-way review with the employer.',
    },
  ],
  notes: [
    {
      title: 'Off-the-job on track',
      body: 'An apprentice is on track when their verified hours are within 90% of where they should be by now.',
    },
    {
      title: 'Workplace visits',
      body: "Record a site visit as an observation on the learner's profile; it keeps the same evidence trail.",
    },
  ],
};

const norm = (s: string | null | undefined) => (s ?? '').trim().toLowerCase();

/* ------------------------------------------------------------------ */
/*  Derived types                                                     */
/* ------------------------------------------------------------------ */

interface ApprenticeRow {
  id: string;
  name: string;
  courseId: string | null;
  courseName: string;
  attendancePercent: number | null;
  epaStatus: string;
  otjCompleted: number;
  otjTarget: number;
  otjOnTrack: boolean;
  startDate: string | null;
  lastReviewDate: string | null;
  daysSinceReview: number | null;
}

interface EmployerGroup {
  id: string;
  label: string;
  apprentices: ApprenticeRow[];
  avgAttendance: number | null;
  totalOtjRequired: number;
  totalOtjCompleted: number;
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor(Math.abs(b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function EmployerPortalSection() {
  const { students, courses, attendance, epaRecords, ilps, isLoading } = useCollegeSupabase();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEmployer, setExpandedEmployer] = useState<string | null>(null);
  const [linkSheetEmployerId, setLinkSheetEmployerId] = useState<string | null>(null);

  const { employers: registeredEmployers } = useCollegeEmployers();
  const registeredMap = useMemo(
    () => new Map(registeredEmployers.map((e) => [e.id, e])),
    [registeredEmployers]
  );

  const now = useMemo(() => new Date(), []);

  // Verified off-the-job minutes per learner — keyed by AUTH uid
  // (college_otj_entries.student_id = profiles.id = college_students.user_id).
  const userIds = useMemo(
    () => students.filter((s) => s.user_id).map((s) => s.user_id as string),
    [students]
  );
  const { data: verifiedMinutesByUser = {} } = useQuery({
    queryKey: ['employer-otj-verified-minutes', userIds],
    enabled: userIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('college_otj_entries')
        .select('student_id, duration_minutes')
        .in('student_id', userIds)
        .eq('verification_status', 'verified');
      if (error) throw error;
      const m: Record<string, number> = {};
      (data ?? []).forEach((r) => {
        m[r.student_id] = (m[r.student_id] ?? 0) + (r.duration_minutes ?? 0);
      });
      return m;
    },
  });

  /* ---------- build employer groups from student data ---------- */

  const employers = useMemo((): EmployerGroup[] => {
    const map = new Map<string, ApprenticeRow[]>();

    students.forEach((s) => {
      if (norm(s.status) !== 'active' || !s.employer_id) return;

      // Attendance: college_attendance.student_id is the college row id.
      // Null when no register has been marked — the old code reported 0%,
      // which read as "never turned up".
      const studentAtt = attendance.filter((a) => a.student_id === s.id);
      const presentCount = studentAtt.filter((a) => {
        const st = norm(a.status);
        return st === 'present' || st === 'late';
      }).length;
      const attendancePercent =
        studentAtt.length > 0 ? Math.round((presentCount / studentAtt.length) * 100) : null;

      // EPA
      const epa = epaRecords.find((e) => e.student_id === s.id);
      const epaStatus = epa?.status ?? 'Not started';

      // OTJ: fixed required total per apprenticeship standard (DfE Annex C),
      // inherited onto the course as otj_required_hours — NOT a % of duration.
      // Completed = real verified off-the-job minutes the learner has logged.
      const course = courses.find((c) => c.id === s.course_id);
      const otjTarget = course?.otj_required_hours ?? DEFAULT_OTJ_STANDARD.otjHours;
      const otjCompleted = s.user_id ? Math.round((verifiedMinutesByUser[s.user_id] ?? 0) / 60) : 0;
      const expectedOtjAtThisPoint =
        s.start_date && s.expected_end_date
          ? (() => {
              const start = new Date(s.start_date);
              const end = new Date(s.expected_end_date);
              const totalDays = daysBetween(start, end);
              const elapsed = daysBetween(start, now);
              if (totalDays <= 0) return otjTarget;
              return Math.round((elapsed / totalDays) * otjTarget);
            })()
          : Math.round(otjTarget * 0.5);
      const otjOnTrack = otjCompleted >= expectedOtjAtThisPoint * 0.9;

      // Last ILP review as proxy for tri-partite review
      const studentIlp = ilps.find((i) => i.student_id === s.id);
      const lastReviewDate = studentIlp?.last_reviewed ?? null;
      const daysSinceReview = lastReviewDate ? daysBetween(new Date(lastReviewDate), now) : null;

      const row: ApprenticeRow = {
        id: s.id,
        name: s.name,
        courseId: s.course_id,
        courseName: course?.name ?? 'No course set',
        attendancePercent,
        epaStatus,
        otjCompleted,
        otjTarget,
        otjOnTrack,
        startDate: s.start_date,
        lastReviewDate,
        daysSinceReview,
      };

      const existing = map.get(s.employer_id) ?? [];
      existing.push(row);
      map.set(s.employer_id, existing);
    });

    const groups: EmployerGroup[] = [];
    map.forEach((apprentices, id) => {
      const withAttendance = apprentices.filter((a) => a.attendancePercent !== null);
      const avgAttendance =
        withAttendance.length > 0
          ? Math.round(
              withAttendance.reduce((s, a) => s + (a.attendancePercent ?? 0), 0) /
                withAttendance.length
            )
          : null;
      const totalOtjRequired = apprentices.reduce((s, a) => s + a.otjTarget, 0);
      const totalOtjCompleted = apprentices.reduce((s, a) => s + a.otjCompleted, 0);
      const registered = registeredMap.get(id);
      const label =
        registered?.company_name ??
        (id.length > 8 ? `Employer ${id.slice(0, 8)}` : `Employer ${id}`);

      groups.push({
        id,
        label,
        apprentices,
        avgAttendance,
        totalOtjRequired,
        totalOtjCompleted,
      });
    });

    return groups.sort((a, b) => b.apprentices.length - a.apprentices.length);
  }, [students, courses, attendance, epaRecords, ilps, now, registeredMap, verifiedMinutesByUser]);

  /* ---------- KPI calculations ---------- */

  const totalEmployers = employers.length;
  const totalPlaced = employers.reduce((s, e) => s + e.apprentices.length, 0);

  const allApprentices = employers.flatMap((e) => e.apprentices);
  const otjCompliantCount = allApprentices.filter((a) => a.otjOnTrack).length;
  const otjCompliancePercent =
    allApprentices.length > 0 ? Math.round((otjCompliantCount / allApprentices.length) * 100) : 0;

  // Reviews due: the same rule as the progress reviews board (funding rules
  // para 97: by the end of the third calendar month after the last review),
  // read from get_review_board, not a separate 12-week count from the ILP.
  const { rows: boardRows, loading: boardLoading, error: boardError } = useReviewBoard(null);
  // When the board is still loading or the RPC refuses this person, we do not
  // know who is due, so say so instead of "All up to date".
  const boardUnknown = boardLoading || !!boardError;
  const dueByStudent = useMemo(
    () => new Map(boardRows.map((r) => [r.student_id, r.due_by])),
    [boardRows]
  );
  const today = londonToday();
  // 14 days ahead on the UK calendar (noon UTC avoids any clock-change edge).
  const soon = (() => {
    const d = new Date(`${today}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + 14);
    return d.toISOString().slice(0, 10);
  })();
  const reviewDue = (id: string) => dueByStudent.get(id) ?? null;
  const reviewsDue = allApprentices
    .filter((a) => {
      const d = reviewDue(a.id);
      return d !== null && d <= soon;
    })
    .sort((a, b) => (reviewDue(a.id) ?? '').localeCompare(reviewDue(b.id) ?? ''));
  const reviewsOverdue = reviewsDue.filter((a) => (reviewDue(a.id) ?? '9999') < today).length;

  // Criteria passed, from college_portfolio_overview (get_portfolio_ac_state):
  // the same count the learner sees. Replaces progress_percent, a typed-in
  // number with no definition. null for a learner with no account yet.
  const { data: portfolio } = useCollegePortfolioOverview();
  const criteriaById = useMemo(() => {
    const m = new Map<string, { passed: number; total: number }>();
    for (const l of portfolio?.learners ?? []) {
      if (l.criteria && l.criteria.total > 0)
        m.set(l.student_id, { passed: passedOf(l.criteria), total: l.criteria.total });
    }
    return m;
  }, [portfolio]);
  const criteriaForEmployer = (ids: string[]) => {
    let passed = 0;
    let total = 0;
    for (const id of ids) {
      const c = criteriaById.get(id);
      if (!c) continue;
      passed += c.passed;
      total += c.total;
    }
    return total > 0 ? { passed, total } : null;
  };

  /* ---------- search filter ---------- */

  const filteredEmployers = useMemo(() => {
    if (!searchQuery.trim()) return employers;
    const q = searchQuery.toLowerCase();
    return employers.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.apprentices.some(
          (a) => a.name.toLowerCase().includes(q) || a.courseName.toLowerCase().includes(q)
        )
    );
  }, [employers, searchQuery]);

  const openLearner = (id: string) =>
    navigate(`/college?section=student360&studentId=${encodeURIComponent(id)}`);

  /* ---------- render ---------- */

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
      className="space-y-6 sm:space-y-8"
    >
      <CollegePageHeader
        eyebrow="Staff and partners"
        title="Employers"
        description={
          totalEmployers === 0
            ? "Who your apprentices work for. Nobody is linked to an employer yet: set the employer on a learner's record and they appear here."
            : `${plural(totalEmployers, 'employer')} with ${plural(totalPlaced, 'apprentice')} placed. ` +
              `${otjCompliantCount} of ${allApprentices.length} on pace with off-the-job hours. ` +
              (boardUnknown
                ? ''
                : reviewsDue.length === 0
                  ? 'No progress reviews due in the next two weeks.'
                  : `${plural(reviewsDue.length, 'review')} due in the next two weeks${reviewsOverdue > 0 ? `, ${reviewsOverdue} overdue` : ''}.`)
        }
        help={HELP}
        actions={
          <button
            type="button"
            className={COLLEGE_BTN}
            onClick={() => navigate('/college/reviews')}
          >
            Progress reviews
          </button>
        }
      />
      <motion.div variants={itemVariants}>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search employers or apprentices…"
          aria-label="Search employers or apprentices"
          className={cn(SEARCH, 'lg:max-w-xl')}
        />
      </motion.div>

      {/* Employer directory — tap a row to open its apprentices in place. */}
      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle
          title="Employers"
          sub={`${plural(filteredEmployers.length, 'employer')}. Tap one for their apprentices.`}
        />

        <div className={LIST_CARD}>
          {filteredEmployers.length === 0 ? (
            <div className="px-5 py-6 sm:px-6">
              <p className="text-[14px] font-semibold text-white">
                {searchQuery ? 'No employers match' : 'No employers with active apprentices'}
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                {searchQuery
                  ? 'Clear the search to see every employer.'
                  : 'Set an employer on a learner’s record and they appear here.'}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filteredEmployers.map((employer) => {
                const isExpanded = expandedEmployer === employer.id;
                const behind = employer.apprentices.filter((a) => !a.otjOnTrack).length;
                const reason = [
                  plural(employer.apprentices.length, 'apprentice'),
                  employer.avgAttendance !== null
                    ? `${employer.avgAttendance}% attendance`
                    : 'No register yet',
                  behind > 0 ? `${behind} behind on off-the-job` : null,
                ]
                  .filter(Boolean)
                  .join(' · ');

                return (
                  <li key={employer.id}>
                    <button
                      type="button"
                      onClick={() => setExpandedEmployer(isExpanded ? null : employer.id)}
                      aria-expanded={isExpanded}
                      className={ROW}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block break-words text-[15px] font-semibold leading-snug text-white md:truncate md:text-[14px]">
                          {employer.label}
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-white md:line-clamp-1 md:text-[12.5px]">
                          {reason}
                        </span>
                      </span>
                      {(() => {
                        const c = criteriaForEmployer(employer.apprentices.map((a) => a.id));
                        return (
                          <span className="flex shrink-0 flex-col items-end">
                            <span className="text-[14px] font-semibold tabular-nums text-white">
                              {c ? `${Math.round((100 * c.passed) / c.total)}%` : '—'}
                            </span>
                            <span className="text-[12px] text-white">of criteria passed</span>
                          </span>
                        );
                      })()}
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 shrink-0 text-white transition-transform',
                          isExpanded && 'rotate-90'
                        )}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          className="overflow-hidden"
                        >
                          <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
                            {employer.apprentices.map((a) => {
                              const detail = [
                                a.courseName,
                                a.attendancePercent !== null
                                  ? `${a.attendancePercent}% attendance`
                                  : null,
                                criteriaById.get(a.id)
                                  ? `${criteriaById.get(a.id)!.passed} of ${criteriaById.get(a.id)!.total} criteria passed`
                                  : 'Not joined yet',
                                `${a.otjCompleted}/${a.otjTarget}h off-the-job${a.otjOnTrack ? '' : ' · behind'}`,
                              ]
                                .filter(Boolean)
                                .join(' · ');
                              return (
                                <li key={a.id}>
                                  <button
                                    type="button"
                                    onClick={() => openLearner(a.id)}
                                    className={cn(ROW, 'pl-8 sm:pl-10')}
                                  >
                                    <span className="min-w-0 flex-1">
                                      <span className="block break-words text-[15px] font-semibold leading-snug text-white md:truncate md:text-[14px]">
                                        {a.name}
                                      </span>
                                      <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-white md:line-clamp-1 md:text-[12.5px]">
                                        {detail}
                                      </span>
                                    </span>
                                    <span className="hidden shrink-0 text-[12px] font-semibold text-white sm:inline">
                                      EPA · {a.epaStatus}
                                    </span>
                                    <ChevronRight
                                      className="h-4 w-4 shrink-0 text-white"
                                      aria-hidden
                                    />
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                          <div className="flex justify-end border-t border-white/[0.10] px-2 sm:px-3">
                            <button
                              type="button"
                              onClick={() => setLinkSheetEmployerId(employer.id)}
                              className={TEXT_ACTION}
                            >
                              {registeredMap.has(employer.id)
                                ? 'Manage share link'
                                : 'Set up share link'}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </motion.section>

      <div className="grid items-start gap-6 xl:grid-cols-2">
        {/* Tri-partite reviews */}
        <motion.section variants={itemVariants} className="min-w-0 space-y-3">
          <CollegeSectionTitle
            title="Reviews due"
            sub={
              boardUnknown
                ? undefined
                : `${plural(reviewsDue.length, 'apprentice')} due in the next two weeks or overdue`
            }
            action={
              <button
                type="button"
                className={TEXT_ACTION}
                onClick={() => navigate('/college/reviews')}
              >
                Progress reviews
              </button>
            }
          />
          <div className={LIST_CARD}>
            {boardUnknown ? (
              <div className="px-5 py-6 sm:px-6">
                <p className="text-[14px] font-semibold text-white">
                  {boardError ? 'Reviews could not be loaded' : 'Loading reviews…'}
                </p>
                {boardError && (
                  <p className="mt-1 text-[12.5px] leading-snug text-white">
                    Your account cannot read the progress review board here. Open Progress reviews,
                    or ask a college admin to check your access.
                  </p>
                )}
              </div>
            ) : reviewsDue.length === 0 ? (
              <div className="px-5 py-6 sm:px-6">
                <p className="text-[14px] font-semibold text-white">All reviews up to date</p>
                <p className="mt-1 text-[12.5px] leading-snug text-white">
                  No apprentice has a progress review due in the next two weeks.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.10]">
                {reviewsDue.slice(0, 10).map((a) => {
                  const employer = employers.find((e) =>
                    e.apprentices.some((ap) => ap.id === a.id)
                  );
                  const due = reviewDue(a.id);
                  const overdueDays = due
                    ? Math.round(
                        (Date.parse(`${today}T12:00`) - Date.parse(`${due}T12:00`)) / 86_400_000
                      )
                    : null;
                  const overdue = overdueDays !== null && overdueDays > 0;
                  return (
                    <li key={a.id}>
                      <button type="button" onClick={() => openLearner(a.id)} className={ROW}>
                        <span className="min-w-0 flex-1">
                          <span className="block break-words text-[15px] font-semibold leading-snug text-white md:truncate md:text-[14px]">
                            {a.name}
                          </span>
                          <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-white md:line-clamp-1 md:text-[12.5px]">
                            {employer?.label ?? 'No employer'} ·{' '}
                            {reviewDue(a.id)
                              ? `Due by ${fmtReviewDate(reviewDue(a.id)!)}`
                              : 'No review history'}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'shrink-0 text-[13px] font-semibold tabular-nums',
                            overdue ? 'text-red-300' : 'text-orange-400'
                          )}
                        >
                          {overdue ? `${overdueDays}d overdue` : 'Due soon'}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                      </button>
                    </li>
                  );
                })}
                {reviewsDue.length > 10 && (
                  <li className="px-5 py-3 text-[12.5px] font-semibold text-white sm:px-6">
                    +{reviewsDue.length - 10} more due
                  </li>
                )}
              </ul>
            )}
          </div>
        </motion.section>

        {/* Off-the-job hours by employer */}
        <motion.section variants={itemVariants} className="min-w-0 space-y-3">
          <CollegeSectionTitle
            title="Off-the-job hours by employer"
            sub="Verified hours against what their apprentices need"
          />
          <div className={LIST_CARD}>
            {employers.length === 0 ? (
              <div className="px-5 py-6 sm:px-6">
                <p className="text-[14px] font-semibold text-white">Nothing to total yet</p>
                <p className="mt-1 text-[12.5px] leading-snug text-white">
                  Verified off-the-job hours roll up here once apprentices are linked to employers.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.10]">
                {employers.map((employer) => {
                  const pct =
                    employer.totalOtjRequired > 0
                      ? Math.round((employer.totalOtjCompleted / employer.totalOtjRequired) * 100)
                      : 0;
                  return (
                    <li key={employer.id} className="px-5 py-3.5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span className="min-w-0 flex-1">
                          <span className="block break-words text-[15px] font-semibold leading-snug text-white md:truncate md:text-[14px]">
                            {employer.label}
                          </span>
                          <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-white md:line-clamp-1 md:text-[12.5px]">
                            {employer.totalOtjCompleted}h verified of {employer.totalOtjRequired}h ·{' '}
                            {plural(employer.apprentices.length, 'apprentice')}
                          </span>
                        </span>
                        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                          {pct}%
                        </span>
                      </div>
                      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.10]">
                        <div
                          className="h-full rounded-full bg-elec-yellow"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </motion.section>
      </div>

      <CollegeEmpty
        title="Workplace visits"
        body="There is no separate visit log. Record an employer site visit as an observation on the learner's profile: the same evidence trail (activity, criteria evidenced, assessor signature) covers a visit."
      />

      <EmployerLinkSheet
        open={linkSheetEmployerId !== null}
        onOpenChange={(o) => {
          if (!o) setLinkSheetEmployerId(null);
        }}
        employerId={linkSheetEmployerId ?? ''}
        presumedLabel={
          linkSheetEmployerId
            ? employers.find((e) => e.id === linkSheetEmployerId)?.label
            : undefined
        }
        apprenticeCount={
          linkSheetEmployerId
            ? employers.find((e) => e.id === linkSheetEmployerId)?.apprentices.length
            : undefined
        }
      />
    </motion.div>
  );
}

export default EmployerPortalSection;
