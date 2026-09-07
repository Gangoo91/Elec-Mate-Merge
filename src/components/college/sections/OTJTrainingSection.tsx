/**
 * OTJTrainingSection — each apprentice's verified off-the-job hours against
 * the fixed total their standard requires.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   KPI row → filters → apprentices → how it is calculated
 *
 * What went: the PageHero, the four-cell blue/green/amber/purple StatStrip,
 * the emerald/amber/red figure colours and the `text-white/70` meta lines.
 * Colour encodes state only: red on an apprentice at risk of missing their
 * hours, volt on one behind.
 *
 * Data unchanged. OTJ hours are a FIXED total per apprenticeship standard
 * (DfE Annex C, post Aug-2025) — NOT 20% of working hours. The required total
 * comes from the course (college_courses.otj_required_hours) and the
 * completed total is the learner's VERIFIED off-the-job entries, keyed by the
 * learner's auth uid (college_otj_entries.student_id = college_students.user_id),
 * not the college row id. The learner link still lands on Student 360's
 * off-the-job panel.
 */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent, CollegeCourse } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { DEFAULT_OTJ_STANDARD } from '@/data/otjStandards';

interface OTJTrainingSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type OTJStatus = 'On track' | 'Behind' | 'At risk';
type FilterOption = 'all' | OTJStatus;

interface StudentOTJData {
  student: CollegeStudent;
  course: CollegeCourse | undefined;
  requiredHours: number;
  completedHours: number;
  remainingHours: number;
  progressPercent: number;
  expectedPercent: number;
  status: OTJStatus;
}

function calculateOTJData(
  student: CollegeStudent,
  courses: CollegeCourse[],
  verifiedMinutesByUser: Record<string, number>
): StudentOTJData | null {
  const course = courses.find((c) => c.id === student.course_id);
  if (!course) return null;
  const requiredHours = course.otj_required_hours ?? DEFAULT_OTJ_STANDARD.otjHours;
  const completedMinutes = student.user_id ? (verifiedMinutesByUser[student.user_id] ?? 0) : 0;
  const completedHours = Math.round(completedMinutes / 60);
  const remainingHours = Math.max(0, requiredHours - completedHours);
  const progressPercent = requiredHours > 0 ? Math.min(100, (completedHours / requiredHours) * 100) : 0;

  const startDate = student.start_date ? new Date(student.start_date) : null;
  let expectedPercent = 0;
  if (startDate) {
    const now = new Date();
    const monthsElapsed =
      (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
    const totalMonths = course.duration_months ?? 0;
    expectedPercent = totalMonths > 0 ? Math.min(100, (monthsElapsed / totalMonths) * 100) : 0;
  } else {
    expectedPercent = student.progress_percent ?? 0;
  }

  const gap = expectedPercent - progressPercent;
  const status: OTJStatus = gap <= 10 ? 'On track' : gap <= 20 ? 'Behind' : 'At risk';
  return { student, course, requiredHours, completedHours, remainingHours, progressPercent, expectedPercent, status };
}

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

const statusChipCn = (status: OTJStatus) =>
  cn(
    'inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[11px] font-medium',
    status === 'At risk'
      ? 'border-red-400/40 text-red-300'
      : status === 'Behind'
        ? 'border-elec-yellow/40 text-elec-yellow'
        : 'border-white/[0.15] text-white'
  );

export function OTJTrainingSection({ onNavigate }: OTJTrainingSectionProps) {
  const navigate = useNavigate();
  const { students, courses, isLoading } = useCollegeSupabase();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Verified off-the-job minutes per learner, keyed by auth uid.
  const userIds = useMemo(
    () => students.filter((s) => s.user_id).map((s) => s.user_id as string),
    [students]
  );
  const { data: verifiedMinutesByUser = {} } = useQuery({
    queryKey: ['otj-verified-minutes', userIds],
    enabled: userIds.length > 0,
    queryFn: async () => {
      const { data } = await supabase
        .from('college_otj_entries')
        .select('student_id, duration_minutes')
        .in('student_id', userIds)
        .eq('verification_status', 'verified');
      const m: Record<string, number> = {};
      for (const r of (data ?? []) as Array<{ student_id: string; duration_minutes: number | null }>) {
        m[r.student_id] = (m[r.student_id] ?? 0) + (r.duration_minutes ?? 0);
      }
      return m;
    },
  });

  const otjData = useMemo(() => {
    const activeStudents = students.filter(
      (s) => (s.status ?? '').toLowerCase() === 'active' && s.course_id
    );
    return activeStudents
      .map((s) => calculateOTJData(s, courses, verifiedMinutesByUser))
      .filter((d): d is StudentOTJData => d !== null)
      // Furthest behind first.
      .sort((a, b) => b.expectedPercent - b.progressPercent - (a.expectedPercent - a.progressPercent));
  }, [students, courses, verifiedMinutesByUser]);

  const kpis = useMemo(() => {
    const total = otjData.length;
    const onTrack = otjData.filter((d) => d.status === 'On track').length;
    const behind = otjData.filter((d) => d.status === 'Behind').length;
    const atRisk = otjData.filter((d) => d.status === 'At risk').length;
    const avgPct = total > 0 ? Math.round(otjData.reduce((s, d) => s + d.progressPercent, 0) / total) : null;
    const verifiedHours = otjData.reduce((s, d) => s + d.completedHours, 0);
    return { total, onTrack, behind, atRisk, avgPct, verifiedHours };
  }, [otjData]);

  const filteredData = useMemo(
    () => (activeFilter === 'all' ? otjData : otjData.filter((d) => d.status === activeFilter)),
    [otjData, activeFilter]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  const cardCn = cn(
    '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
    CARD_SURFACE
  );

  return (
    <>
      <HubKpiRow>
        <HubKpi
          accent
          label="Behind on hours"
          value={String(kpis.behind + kpis.atRisk)}
          verdict={
            kpis.atRisk > 0
              ? `${kpis.atRisk} at risk of missing the total`
              : kpis.behind > 0
                ? 'More than 10 points behind where they should be'
                : kpis.total > 0
                  ? 'Everyone within reach of their total'
                  : 'No apprentices with a course yet'
          }
          sentiment={kpis.behind + kpis.atRisk > 0 ? 'bad' : 'neutral'}
          onClick={() => setActiveFilter(kpis.atRisk > 0 ? 'At risk' : 'Behind')}
        />
        <HubKpi
          label="On track"
          value={String(kpis.onTrack)}
          verdict={kpis.onTrack > 0 ? 'Within 10 points of expected' : 'Nobody on track yet'}
          context={kpis.total > 0 ? `${kpis.total} active apprentice${kpis.total === 1 ? '' : 's'}` : undefined}
          onClick={() => setActiveFilter('On track')}
        />
        <HubKpi
          label="Average completion"
          value={kpis.avgPct === null ? '—' : `${kpis.avgPct}%`}
          verdict={kpis.avgPct === null ? 'Nothing to average yet' : 'Of each required total, verified'}
        />
        <HubKpi
          label="Verified hours"
          value={String(kpis.verifiedHours)}
          verdict={kpis.verifiedHours > 0 ? 'Across every active apprentice' : 'No verified entries yet'}
        />
      </HubKpiRow>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Apprentices</HubSectionHeading>

        {otjData.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {(
              [
                ['all', `All · ${kpis.total}`],
                ['On track', `On track · ${kpis.onTrack}`],
                ['Behind', `Behind · ${kpis.behind}`],
                ['At risk', `At risk · ${kpis.atRisk}`],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setActiveFilter(value)}
                className={chipCn(activeFilter === value)}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className={cardCn}>
          {otjData.length === 0 ? (
            <div className="flex flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-[13px] text-white">
                No active apprentices with a course assigned yet — hours are tracked per course.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('students')}
                className="-mx-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
              >
                View learners
              </button>
            </div>
          ) : filteredData.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-white sm:px-5">No apprentices in this band.</p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filteredData.map((data) => {
                const pct = Math.round(data.progressPercent);
                const expected = Math.round(data.expectedPercent);
                const reason = [
                  data.course?.name ?? 'Unknown programme',
                  `${data.completedHours}h of ${data.requiredHours}h verified`,
                  expected > 0 ? `expected ${expected}% by now` : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <li key={data.student.id}>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/college?section=student360&studentId=${encodeURIComponent(data.student.id)}#otj`)
                      }
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          data.status === 'At risk'
                            ? 'bg-red-400'
                            : data.status === 'Behind'
                              ? 'bg-elec-yellow'
                              : 'bg-white/[0.25]'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-[14px] font-semibold leading-tight text-white">
                            {data.student.name}
                          </span>
                          <span className={statusChipCn(data.status)}>{data.status}</span>
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {reason}
                        </span>
                        {/* Verified against expected. The marker is where the
                            apprentice should be by now. */}
                        <span className="relative mt-2 block h-1 overflow-hidden rounded-full bg-white/[0.10]">
                          <span
                            className={cn(
                              'block h-full rounded-full',
                              data.status === 'At risk' ? 'bg-red-400' : 'bg-white/[0.6]'
                            )}
                            style={{ width: `${Math.min(100, data.progressPercent)}%` }}
                          />
                          {expected > 0 && (
                            <span
                              aria-hidden
                              className="absolute inset-y-0 w-0.5 bg-white"
                              style={{ left: `${Math.min(100, expected)}%` }}
                            />
                          )}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-[13px] font-semibold tabular-nums',
                          data.status === 'At risk'
                            ? 'text-red-300'
                            : data.status === 'Behind'
                              ? 'text-elec-yellow'
                              : 'text-white'
                        )}
                      >
                        {pct}%
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>How this is calculated</HubSectionHeading>
        <motion.div variants={itemVariants} className={cardCn}>
          <ul className="divide-y divide-white/[0.10]">
            {[
              ['Required hours', 'Fixed total per apprenticeship standard (DfE Annex C, 2025/26)'],
              ['Completed hours', 'Verified off-the-job entries only'],
              ['Expected by now', 'Months since start against the course length'],
              ['Behind / at risk', 'More than 10 / 20 points below expected'],
            ].map(([label, value]) => (
              <li
                key={label}
                className="flex min-h-11 items-center justify-between gap-4 px-4 py-3 sm:px-5"
              >
                <span className="shrink-0 text-[13px] font-semibold text-white">{label}</span>
                <span className="text-right text-[12.5px] text-white">{value}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.section>
    </>
  );
}
