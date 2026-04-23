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
  CollegeAttendance,
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

const HOURS_PER_SESSION = 6;
const HOURS_PER_WEEK = 30;
const OTJ_PERCENTAGE = 0.2;
const WEEKS_PER_MONTH = 4.33;

function calculateOTJData(
  student: CollegeStudent,
  courses: CollegeCourse[],
  attendance: CollegeAttendance[]
): StudentOTJData | null {
  const course = courses.find((c) => c.id === student.course_id);
  if (!course || !course.duration_months) return null;
  const workingWeeks = course.duration_months * WEEKS_PER_MONTH;
  const requiredHours = Math.round(workingWeeks * HOURS_PER_WEEK * OTJ_PERCENTAGE);
  const studentAttendance = attendance.filter(
    (a) => a.student_id === student.id && (a.status === 'Present' || a.status === 'Late')
  );
  const completedHours = studentAttendance.length * HOURS_PER_SESSION;
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
  const { students, courses, attendance, isLoading } = useCollegeSupabase();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const otjData = useMemo(() => {
    const activeStudents = students.filter((s) => s.status === 'Active' && s.course_id);
    return activeStudents
      .map((s) => calculateOTJData(s, courses, attendance))
      .filter((d): d is StudentOTJData => d !== null);
  }, [students, courses, attendance]);

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
            description="Track the 20% off-the-job time requirement for apprentices."
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
          description="The 20% off-the-job training time tracker for apprentices."
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
                      <div className="mt-0.5 text-[11.5px] text-white/75 truncate tabular-nums">
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
                      <div className="text-white/75 uppercase tracking-[0.12em]">Required</div>
                      <div className="mt-0.5 text-[14px] font-medium text-white tabular-nums">
                        {data.requiredHours}h
                      </div>
                    </div>
                    <div>
                      <div className="text-white/75 uppercase tracking-[0.12em]">Completed</div>
                      <div className="mt-0.5 text-[14px] font-medium text-emerald-400 tabular-nums">
                        {data.completedHours}h
                      </div>
                    </div>
                    <div>
                      <div className="text-white/75 uppercase tracking-[0.12em]">Remaining</div>
                      <div className="mt-0.5 text-[14px] font-medium text-amber-400 tabular-nums">
                        {data.remainingHours}h
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-baseline justify-between text-[11.5px]">
                      <span className="text-white/75 uppercase tracking-[0.12em]">OTJ</span>
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
            { label: 'Working hours per week', value: '30 hours' },
            { label: 'OTJ requirement', value: '20% of total' },
            { label: 'Hours per session', value: '6 hours' },
            { label: 'Weeks per month', value: '4.33 weeks' },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-5 sm:px-6 py-4"
            >
              <span className="text-[13px] text-white/60">{row.label}</span>
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
