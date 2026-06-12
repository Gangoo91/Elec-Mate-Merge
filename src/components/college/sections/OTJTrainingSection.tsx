/**
 * OTJTrainingSection — Off-the-Job Training Calculator
 * Editorial redesign: typography-led, no icons.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import type {
  CollegeStudent,
  CollegeCourse,
} from '@/contexts/CollegeSupabaseContext';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  SectionHeader,
  Pill,
  EmptyState,
  LoadingState,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_OTJ_STANDARD } from '@/data/otjStandards';

interface OTJTrainingSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type OTJStatus = 'On Track' | 'Behind' | 'At Risk';
type FilterOption = 'all' | 'ontrack' | 'behind' | 'atrisk';

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

// OTJ hours are a FIXED total per apprenticeship standard (DfE Annex C, post
// Aug-2025) — NOT 20% of working hours. The required total comes from the
// course (college_courses.otj_required_hours, inherited by learners), and the
// completed total is the learner's VERIFIED off-the-job entries.
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
  const progressPercent =
    requiredHours > 0 ? Math.min(100, (completedHours / requiredHours) * 100) : 0;

  const startDate = student.start_date ? new Date(student.start_date) : null;
  let expectedPercent = 0;
  if (startDate) {
    const now = new Date();
    const monthsElapsed =
      (now.getFullYear() - startDate.getFullYear()) * 12 +
      (now.getMonth() - startDate.getMonth());
    const totalMonths = course.duration_months;
    expectedPercent = totalMonths > 0 ? Math.min(100, (monthsElapsed / totalMonths) * 100) : 0;
  } else {
    expectedPercent = student.progress_percent ?? 0;
  }

  const gap = expectedPercent - progressPercent;
  const status: OTJStatus = gap <= 10 ? 'On Track' : gap <= 20 ? 'Behind' : 'At Risk';
  return {
    student,
    course,
    requiredHours,
    completedHours,
    remainingHours,
    progressPercent,
    expectedPercent,
    status,
  };
}

const statusTone = (status: OTJStatus): Tone =>
  status === 'On Track' ? 'emerald' : status === 'Behind' ? 'amber' : 'red';

export function OTJTrainingSection({ onNavigate }: OTJTrainingSectionProps) {
  const { students, courses, isLoading } = useCollegeSupabase();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Verified off-the-job minutes per learner. OTJ entries are keyed by the
  // learner's auth uid (college_otj_entries.student_id = profiles.id =
  // college_students.user_id), NOT college_students.id.
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const r of (data ?? []) as any[]) {
        m[r.student_id] = (m[r.student_id] ?? 0) + (r.duration_minutes ?? 0);
      }
      return m;
    },
  });

  const otjData = useMemo(() => {
    const activeStudents = students.filter((s) => s.status === 'Active' && s.course_id);
    return activeStudents
      .map((s) => calculateOTJData(s, courses, verifiedMinutesByUser))
      .filter((d): d is StudentOTJData => d !== null);
  }, [students, courses, verifiedMinutesByUser]);

  const kpis = useMemo(() => {
    const total = otjData.length;
    const onTrack = otjData.filter((d) => d.status === 'On Track').length;
    const behind = otjData.filter((d) => d.status === 'Behind').length;
    const atRisk = otjData.filter((d) => d.status === 'At Risk').length;
    const avgOTJ =
      total > 0
        ? Math.round(otjData.reduce((sum, d) => sum + d.progressPercent, 0) / total)
        : 0;
    return { total, onTrack, behind, atRisk, avgOTJ };
  }, [otjData]);

  const filteredData = useMemo(() => {
    switch (activeFilter) {
      case 'ontrack':
        return otjData.filter((d) => d.status === 'On Track');
      case 'behind':
        return otjData.filter((d) => d.status === 'Behind');
      case 'atrisk':
        return otjData.filter((d) => d.status === 'At Risk');
      default:
        return otjData;
    }
  }, [otjData, activeFilter]);

  if (isLoading) return <LoadingState />;

  if (otjData.length === 0) {
    return (
      <PageFrame>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Tools · OTJ Training"
            title="Off-the-job training"
            description="Track each apprentice's off-the-job training hours against their required total."
            tone="emerald"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <EmptyState
            title="No apprentices found"
            description="Add active students with assigned courses to see OTJ calculations."
            action="View students"
            onAction={() => onNavigate('students')}
          />
        </motion.div>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Tools · OTJ Training"
          title="Off-the-job training"
          description="Off-the-job training hours logged against each apprentice's required total."
          tone="emerald"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatStrip
          columns={4}
          stats={[
            { value: kpis.total, label: 'Apprentices', sub: 'Active', tone: 'blue' },
            {
              value: `${Math.round((kpis.onTrack / kpis.total) * 100)}%`,
              label: 'On Track',
              sub: `${kpis.onTrack} learners`,
              tone: 'green',
            },
            {
              value: `${Math.round(((kpis.behind + kpis.atRisk) / kpis.total) * 100)}%`,
              label: 'Behind',
              sub: `${kpis.behind + kpis.atRisk} learners`,
              tone: 'amber',
              accent: kpis.behind + kpis.atRisk > 0,
            },
            { value: `${kpis.avgOTJ}%`, label: 'Avg OTJ', sub: 'Across cohort', tone: 'purple' },
          ]}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: kpis.total },
            { value: 'ontrack', label: 'On Track', count: kpis.onTrack },
            { value: 'behind', label: 'Behind', count: kpis.behind },
            { value: 'atrisk', label: 'At Risk', count: kpis.atRisk },
          ]}
          activeTab={activeFilter}
          onTabChange={(v) => setActiveFilter(v as FilterOption)}
        />
      </motion.div>

      {filteredData.length === 0 ? (
        <EmptyState title="No apprentices match this filter" />
      ) : (
        <motion.div variants={itemVariants}>
          <ListCard>
            {filteredData.map((data) => (
              <div
                key={data.student.id}
                className="flex items-start gap-4 px-5 sm:px-6 py-5 hover:bg-[hsl(0_0%_15%)] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[15px] font-medium text-white truncate">
                        {data.student.name}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-white truncate tabular-nums">
                        {data.course?.name ?? 'Unknown programme'}
                        {data.course?.duration_months
                          ? ` · ${data.course.duration_months} months`
                          : ''}
                      </div>
                    </div>
                    <Pill tone={statusTone(data.status)}>{data.status}</Pill>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-4 text-[11px]">
                    <div>
                      <div className="text-white uppercase tracking-[0.12em]">Required</div>
                      <div className="mt-0.5 text-[14px] font-medium text-white tabular-nums">
                        {data.requiredHours}h
                      </div>
                    </div>
                    <div>
                      <div className="text-white uppercase tracking-[0.12em]">Completed</div>
                      <div className="mt-0.5 text-[14px] font-medium text-emerald-400 tabular-nums">
                        {data.completedHours}h
                      </div>
                    </div>
                    <div>
                      <div className="text-white uppercase tracking-[0.12em]">Remaining</div>
                      <div className="mt-0.5 text-[14px] font-medium text-amber-400 tabular-nums">
                        {data.remainingHours}h
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-baseline justify-between text-[11.5px]">
                      <span className="text-white uppercase tracking-[0.12em]">OTJ</span>
                      <span className="font-medium text-white tabular-nums">
                        {Math.round(data.progressPercent)}%
                      </span>
                    </div>
                    <div className="mt-1.5 relative h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          data.status === 'On Track'
                            ? 'bg-emerald-400/80'
                            : data.status === 'Behind'
                              ? 'bg-amber-400/80'
                              : 'bg-red-400/80'
                        )}
                        style={{ width: `${Math.min(100, data.progressPercent)}%` }}
                      />
                    </div>
                    {data.expectedPercent > 0 && (
                      <div className="relative h-0 mt-[-6px]">
                        <div
                          className="absolute top-0 w-0.5 h-2 bg-white/60 rounded-full"
                          style={{ left: `${Math.min(100, data.expectedPercent)}%` }}
                          title={`Expected: ${Math.round(data.expectedPercent)}%`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ListCard>
        </motion.div>
      )}

      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Calculation Basis" title="How OTJ is calculated" />
        <ListCard>
          {[
            { label: 'Required hours', value: "Per apprenticeship standard" },
            { label: 'Source of completed hours', value: 'Verified off-the-job entries' },
            { label: 'Funding rules', value: 'Fixed total (DfE Annex C, 2025/26)' },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-5 sm:px-6 py-4"
            >
              <span className="text-[13px] text-white">{row.label}</span>
              <span className="text-[13px] font-medium text-white tabular-nums">
                {row.value}
              </span>
            </div>
          ))}
        </ListCard>
      </motion.section>
    </PageFrame>
  );
}
