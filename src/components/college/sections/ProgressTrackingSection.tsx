import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollegeStudents, useStudentsAtRisk } from '@/hooks/college/useCollegeStudents';
import type { CollegeStudent } from '@/services/college/collegeStudentService';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { useCollegeAttendance } from '@/hooks/college/useCollegeAttendance';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import { ProgressUpdateSheet } from '@/components/college/sheets/ProgressUpdateSheet';
import { useToast } from '@/hooks/use-toast';
import { ProgressCardSkeletonList } from '@/components/college/ui/ProgressCardSkeleton';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useQueryClient } from '@tanstack/react-query';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  Pill,
  EmptyState,
  SectionHeader,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

export function ProgressTrackingSection() {
  const { data: students = [], isLoading: studentsLoading } = useCollegeStudents();
  const { data: studentsAtRisk = [] } = useStudentsAtRisk();
  const { data: cohorts = [] } = useCollegeCohorts();
  const { data: attendance = [] } = useCollegeAttendance();

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [progressSheetOpen, setProgressSheetOpen] = useState(false);

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-students'] });
    await queryClient.invalidateQueries({ queryKey: ['college-attendance'] });
  };

  const getAvatarInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getStudentAttendanceRate = (studentId: string): number => {
    const records = attendance.filter((a) => a.student_id === studentId);
    if (records.length === 0) return 100;
    const present = records.filter((a) => a.status === 'Present' || a.status === 'Late').length;
    return Math.round((present / records.length) * 100);
  };

  const progressData = students
    .filter((s) => s.status === 'Active')
    .map((student) => {
      const attendanceRate = getStudentAttendanceRate(student.id);
      const overallProgress = student.progress_percent ?? 0;
      const isAtRisk = student.risk_level === 'high' || student.risk_level === 'critical';
      return { ...student, attendanceRate, overallProgress, isAtRisk };
    });

  const filteredProgress = progressData.filter((data) => {
    const matchesSearch =
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (data.uln && data.uln.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'at-risk' && data.isAtRisk) ||
      (filterStatus === 'on-track' && !data.isAtRisk && data.overallProgress >= 70) ||
      (filterStatus === 'behind' && !data.isAtRisk && data.overallProgress < 70);
    const matchesCohort = filterCohort === 'all' || data.cohort_id === filterCohort;
    return matchesSearch && matchesStatus && matchesCohort;
  });

  const sortedProgress = [...filteredProgress].sort(
    (a, b) => a.overallProgress - b.overallProgress
  );

  const getCohortName = (cohortId?: string | null) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';

  const progressTone = (percent: number): Tone =>
    percent >= 80 ? 'green' : percent >= 60 ? 'amber' : 'red';

  const cohortAverages = cohorts
    .filter((c) => c.status === 'Active')
    .map((cohort) => {
      const cohortStudents = progressData.filter((p) => p.cohort_id === cohort.id);
      const avgProgress =
        cohortStudents.length > 0
          ? Math.round(
              cohortStudents.reduce((sum, s) => sum + s.overallProgress, 0) / cohortStudents.length
            )
          : 0;
      return {
        ...cohort,
        avgProgress,
        studentCount: cohortStudents.length,
        atRiskCount: cohortStudents.filter((s) => s.isAtRisk).length,
      };
    });

  const onTrackCount = progressData.filter((p) => p.overallProgress >= 80).length;
  const attentionCount = progressData.filter(
    (p) => p.overallProgress >= 60 && p.overallProgress < 80
  ).length;
  const avgProgressAll = Math.round(
    progressData.reduce((sum, p) => sum + p.overallProgress, 0) / (progressData.length || 1)
  );

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Assessment · Progress"
            title="Progress tracking"
            description={`${studentsAtRisk.length} student${studentsAtRisk.length === 1 ? '' : 's'} at risk of falling behind.`}
            tone="blue"
            actions={
              <button
                onClick={() =>
                  toast({
                    title: 'Export coming soon',
                    description: 'Progress report export is being developed.',
                  })
                }
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Export →
              </button>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatStrip
            columns={4}
            stats={[
              { value: onTrackCount, label: 'On Track', sub: '80%+ progress', tone: 'green' },
              { value: attentionCount, label: 'Attention', sub: '60–80% progress', tone: 'amber' },
              {
                value: studentsAtRisk.length,
                label: 'At Risk',
                sub: 'Requires action',
                tone: 'red',
                accent: studentsAtRisk.length > 0,
              },
              { value: `${avgProgressAll}%`, label: 'Avg Progress', sub: 'Across active' },
            ]}
          />
        </motion.div>

        {cohortAverages.length > 0 && (
          <motion.section variants={itemVariants} className="space-y-5">
            <SectionHeader eyebrow="Cohorts" title="Progress by cohort" />
            <ListCard>
              {cohortAverages.map((cohort) => (
                <div
                  key={cohort.id}
                  className="flex items-center gap-4 px-5 sm:px-6 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-medium text-white truncate">{cohort.name}</div>
                    <div className="mt-0.5 text-[11.5px] text-white/50 tabular-nums">
                      {cohort.studentCount} students
                    </div>
                  </div>
                  <div className="w-32 sm:w-48 h-1 bg-white/[0.06] rounded-full overflow-hidden shrink-0">
                    <div
                      className="h-full bg-elec-yellow/80 rounded-full transition-all"
                      style={{ width: `${cohort.avgProgress}%` }}
                    />
                  </div>
                  <div className="text-[13px] font-medium tabular-nums text-white w-10 text-right shrink-0">
                    {cohort.avgProgress}%
                  </div>
                  {cohort.atRiskCount > 0 && (
                    <Pill tone="red">{cohort.atRiskCount} at risk</Pill>
                  )}
                </div>
              ))}
            </ListCard>
          </motion.section>
        )}

        {studentsAtRisk.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex items-start gap-4">
              <span aria-hidden className="w-[3px] h-10 rounded-full bg-red-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                  Immediate attention
                </div>
                <div className="mt-1 text-[15px] font-medium text-white">
                  {studentsAtRisk.length} student{studentsAtRisk.length !== 1 ? 's' : ''} at risk
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {studentsAtRisk.slice(0, 8).map((student) => (
                    <Pill key={student.id} tone="red">
                      {student.name}
                    </Pill>
                  ))}
                  {studentsAtRisk.length > 8 && (
                    <span className="text-[11px] text-white/40 px-1.5 py-1">
                      +{studentsAtRisk.length - 8}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: progressData.length },
              { value: 'on-track', label: 'On Track', count: onTrackCount },
              { value: 'behind', label: 'Behind', count: attentionCount },
              { value: 'at-risk', label: 'At Risk', count: studentsAtRisk.length },
            ]}
            activeTab={filterStatus}
            onTabChange={setFilterStatus}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search name or ULN…"
            actions={
              <select
                value={filterCohort}
                onChange={(e) => setFilterCohort(e.target.value)}
                className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
              >
                <option value="all">All Cohorts</option>
                {cohorts
                  .filter((c) => c.status === 'Active')
                  .map((cohort) => (
                    <option key={cohort.id} value={cohort.id}>
                      {cohort.name}
                    </option>
                  ))}
              </select>
            }
          />
        </motion.div>

        {studentsLoading ? (
          <ProgressCardSkeletonList count={4} />
        ) : sortedProgress.length === 0 ? (
          <EmptyState title="No students found" description="Try adjusting filters." />
        ) : (
          <motion.div variants={itemVariants}>
            <ListCard>
              {sortedProgress.map((data) => (
                <SwipeableCard
                  key={data.id}
                  leftActions={[
                    {
                      label: 'Email',
                      onClick: () => {
                        if (data.email) window.location.href = 'mailto:' + data.email;
                      },
                      className: 'bg-blue-500/90 text-white',
                    },
                    {
                      label: 'Call',
                      onClick: () => {
                        if (data.phone) window.location.href = 'tel:' + data.phone;
                      },
                      className: 'bg-emerald-500/90 text-white',
                    },
                  ]}
                  rightActions={[
                    {
                      label: 'Flag',
                      onClick: () => {
                        setSelectedStudentId(data.id);
                        setProgressSheetOpen(true);
                      },
                      className: 'bg-amber-500/90 text-white',
                    },
                  ]}
                >
                  <div className="group flex items-start gap-4 px-5 sm:px-6 py-5 hover:bg-[hsl(0_0%_15%)] transition-colors">
                    <span
                      aria-hidden
                      className={cn(
                        'w-[3px] self-stretch rounded-full shrink-0',
                        data.isAtRisk ? 'bg-red-400' : 'bg-transparent'
                      )}
                    />
                    <Avatar className="h-10 w-10 shrink-0 ring-1 ring-white/[0.08]">
                      <AvatarImage src={data.photo_url ?? undefined} />
                      <AvatarFallback className="bg-blue-500/10 text-blue-400 text-xs font-semibold">
                        {getAvatarInitials(data.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="text-[15px] font-medium text-white truncate">
                              {data.name}
                            </div>
                            {data.isAtRisk && <Pill tone="red">At Risk</Pill>}
                          </div>
                          <div className="mt-0.5 text-[11.5px] text-white/50 truncate">
                            {getCohortName(data.cohort_id)}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="text-white/50 hover:text-white text-[18px] leading-none px-1 touch-manipulation shrink-0"
                              aria-label="Options"
                            >
                              ⋯
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="h-11"
                              onClick={() => {
                                setSelectedStudent(data);
                                setProfileSheetOpen(true);
                              }}
                            >
                              View profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11"
                              onClick={() => {
                                setSelectedStudentId(data.id);
                                setProgressSheetOpen(true);
                              }}
                            >
                              Update progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11"
                              onClick={() => {
                                if (data.email)
                                  window.location.href = 'mailto:' + data.email;
                              }}
                            >
                              Contact student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-baseline justify-between text-[11px]">
                            <span className="text-white/50 uppercase tracking-[0.12em]">
                              Progress
                            </span>
                            <Pill tone={progressTone(data.overallProgress)}>{data.overallProgress}%</Pill>
                          </div>
                          <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-elec-yellow/80 rounded-full"
                              style={{ width: `${data.overallProgress}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-baseline justify-between text-[11px]">
                            <span className="text-white/50 uppercase tracking-[0.12em]">
                              Attendance
                            </span>
                            <Pill tone={progressTone(data.attendanceRate)}>{data.attendanceRate}%</Pill>
                          </div>
                          <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-400/80 rounded-full"
                              style={{ width: `${data.attendanceRate}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {data.expected_end_date && (
                        <div className="mt-3 text-[11px] text-white/50 tabular-nums">
                          Due{' '}
                          {new Date(data.expected_end_date).toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </SwipeableCard>
              ))}
            </ListCard>
          </motion.div>
        )}

        <StudentDetailSheet
          student={selectedStudent}
          open={profileSheetOpen}
          onOpenChange={setProfileSheetOpen}
        />
        <ProgressUpdateSheet
          studentId={selectedStudentId}
          open={progressSheetOpen}
          onOpenChange={setProgressSheetOpen}
        />
      </PageFrame>
    </PullToRefresh>
  );
}
