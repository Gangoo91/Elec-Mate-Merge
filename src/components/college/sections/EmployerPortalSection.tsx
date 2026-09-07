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
import { EmployerLinkSheet } from '@/components/college/sheets/EmployerLinkSheet';
import { DEFAULT_OTJ_STANDARD } from '@/data/otjStandards';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { containerVariants, itemVariants } from '@/components/college/primitives';

const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white placeholder:opacity-60 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
const TEXT_ACTION =
  'flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);
const ROW =
  'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5';

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
  progressPercent: number;
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
  avgProgress: number;
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

      // Progress
      const progress = s.progress_percent ?? 0;

      // OTJ: fixed required total per apprenticeship standard (DfE Annex C),
      // inherited onto the course as otj_required_hours — NOT a % of duration.
      // Completed = real verified off-the-job minutes the learner has logged.
      const course = courses.find((c) => c.id === s.course_id);
      const otjTarget = course?.otj_required_hours ?? DEFAULT_OTJ_STANDARD.otjHours;
      const otjCompleted = s.user_id
        ? Math.round((verifiedMinutesByUser[s.user_id] ?? 0) / 60)
        : 0;
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
      const daysSinceReview = lastReviewDate
        ? daysBetween(new Date(lastReviewDate), now)
        : null;

      const row: ApprenticeRow = {
        id: s.id,
        name: s.name,
        courseId: s.course_id,
        courseName: course?.name ?? 'No course set',
        attendancePercent,
        progressPercent: progress,
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
      const avgProgress =
        apprentices.length > 0
          ? Math.round(
              apprentices.reduce((s, a) => s + a.progressPercent, 0) / apprentices.length
            )
          : 0;
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
        avgProgress,
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

  // Reviews due: no review ever, or 84+ days (12 weeks) since last review
  const reviewsDue = allApprentices.filter(
    (a) => a.daysSinceReview === null || a.daysSinceReview >= 84
  );
  const reviewsOverdue = reviewsDue.filter(
    (a) => a.daysSinceReview !== null && a.daysSinceReview > 84
  ).length;

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
      <HubKpiRow>
        <HubKpi
          accent
          label="Employers"
          value={String(totalEmployers)}
          verdict={totalEmployers > 0 ? 'With active apprentices' : 'No employers linked yet'}
          context={
            registeredEmployers.length > 0
              ? `${registeredEmployers.length} registered for the portal`
              : undefined
          }
        />
        <HubKpi
          label="Placed"
          value={String(totalPlaced)}
          verdict={totalPlaced > 0 ? 'Active apprentices with an employer' : 'Nobody placed yet'}
        />
        <HubKpi
          label="Off-the-job on track"
          value={allApprentices.length > 0 ? `${otjCompliancePercent}%` : '—'}
          verdict={
            allApprentices.length === 0
              ? 'No apprentices to measure'
              : otjCompliancePercent >= 80
                ? 'Most are keeping pace'
                : 'Chase the verified hours'
          }
          context={
            allApprentices.length > 0
              ? `${otjCompliantCount} of ${allApprentices.length} within 90% of expected`
              : undefined
          }
          sentiment={
            allApprentices.length === 0 ? 'neutral' : otjCompliancePercent >= 80 ? 'good' : 'bad'
          }
        />
        <HubKpi
          label="Reviews due"
          value={String(reviewsDue.length)}
          verdict={
            reviewsOverdue > 0
              ? `${reviewsOverdue} past the 12-week mark`
              : reviewsDue.length > 0
                ? 'Book the tri-partite reviews'
                : 'All reviews up to date'
          }
          sentiment={reviewsDue.length > 0 ? 'bad' : 'neutral'}
        />
      </HubKpiRow>

      <motion.div variants={itemVariants}>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search employers or apprentices…"
          aria-label="Search employers or apprentices"
          className={SEARCH}
        />
      </motion.div>

      {/* Employer directory — tap a row to open its apprentices in place. */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <HubSectionHeading>Employers</HubSectionHeading>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {plural(filteredEmployers.length, 'employer')}
          </span>
        </div>

        <div className={LIST_CARD}>
          {filteredEmployers.length === 0 ? (
            <div className="px-4 py-5 sm:px-5">
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
                      <span
                        aria-hidden
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          behind > 0 ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {employer.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {reason}
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                        {employer.avgProgress}%
                      </span>
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
                                `${a.progressPercent}% progress`,
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
                                    <span
                                      aria-hidden
                                      className={cn(
                                        'h-8 w-[3px] shrink-0 rounded-full',
                                        a.otjOnTrack ? 'bg-white/[0.25]' : 'bg-elec-yellow'
                                      )}
                                    />
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                                        {a.name}
                                      </span>
                                      <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                                        {detail}
                                      </span>
                                    </span>
                                    <span className="hidden shrink-0 text-[12px] font-semibold text-white sm:inline">
                                      EPA · {a.epaStatus}
                                    </span>
                                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
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

      {/* Tri-partite reviews */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <HubSectionHeading>Tri-partite reviews</HubSectionHeading>
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              reviewsOverdue > 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {plural(reviewsDue.length, 'review')} due
          </span>
        </div>
        <div className={LIST_CARD}>
          {reviewsDue.length === 0 ? (
            <div className="px-4 py-5 sm:px-5">
              <p className="text-[14px] font-semibold text-white">All reviews up to date</p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                No apprentice is past 12 weeks since their last ILP review.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {reviewsDue.slice(0, 10).map((a) => {
                const employer = employers.find((e) => e.apprentices.some((ap) => ap.id === a.id));
                const overdueDays = a.daysSinceReview !== null ? a.daysSinceReview - 84 : null;
                const overdue = overdueDays !== null && overdueDays > 0;
                return (
                  <li key={a.id}>
                    <button type="button" onClick={() => openLearner(a.id)} className={ROW}>
                      <span
                        aria-hidden
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          overdue ? 'bg-red-400' : 'bg-elec-yellow'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {a.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {employer?.label ?? 'No employer'} ·{' '}
                          {a.lastReviewDate ? `Last review ${a.lastReviewDate}` : 'Never reviewed'}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-[13px] font-semibold tabular-nums',
                          overdue ? 'text-red-300' : 'text-elec-yellow'
                        )}
                      >
                        {overdue ? `${overdueDays}d overdue` : 'Due now'}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </button>
                  </li>
                );
              })}
              {reviewsDue.length > 10 && (
                <li className="px-4 py-3 text-[12px] font-semibold text-white sm:px-5">
                  +{reviewsDue.length - 10} more due
                </li>
              )}
            </ul>
          )}
        </div>
      </motion.section>

      {/* Workplace visits — no visit log table or route exists yet, so say
          so rather than draw an empty tool. */}
      <motion.section variants={itemVariants} className="space-y-3">
        <HubSectionHeading>Workplace visits</HubSectionHeading>
        <div className={LIST_CARD}>
          <div className="px-4 py-5 sm:px-5">
            <p className="text-[14px] font-semibold text-white">No visit log yet</p>
            <p className="mt-1 text-[12.5px] leading-snug text-white">
              Record employer site visits as observations on the learner’s profile — the same
              audit chain (activity, criteria evidenced, assessor signature) covers a visit.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Off-the-job hours by employer */}
      <motion.section variants={itemVariants} className="space-y-3">
        <HubSectionHeading>Off-the-job hours by employer</HubSectionHeading>
        <div className={LIST_CARD}>
          {employers.length === 0 ? (
            <div className="px-4 py-5 sm:px-5">
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
                  <li key={employer.id} className="px-4 py-3.5 sm:px-5">
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {employer.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {employer.totalOtjCompleted}h verified of {employer.totalOtjRequired}h ·{' '}
                          {plural(employer.apprentices.length, 'apprentice')}
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                        {pct}%
                      </span>
                    </div>
                    <div className="ml-[15px] mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.10]">
                      <div
                        className="h-full rounded-full bg-white"
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
