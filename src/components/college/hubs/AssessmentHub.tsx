import { useState } from 'react';
import { motion } from 'framer-motion';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { RecordGradeSheet } from '@/components/college/sheets/RecordGradeSheet';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { usePendingGrades } from '@/hooks/college/useCollegeGrades';
import { useOverdueILPReviews } from '@/hooks/college/useCollegeILP';
import { useCollegeEPAs } from '@/hooks/college/useCollegeEPA';
import { useCollegeAttendance } from '@/hooks/college/useCollegeAttendance';
import { useWorkQueue } from '@/hooks/college/useWorkQueue';
import { useQueryClient } from '@tanstack/react-query';
import {
  PageFrame,
  PageHero,
  StatStrip,
  SectionHeader,
  HubGrid,
  HubCard,
  Pill,
  itemVariants,
} from '@/components/college/primitives';

interface AssessmentHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function AssessmentHub({ onNavigate }: AssessmentHubProps) {
  const { data: pendingGrades = [] } = usePendingGrades();
  const { data: overdueILPs = [] } = useOverdueILPReviews();
  const { data: epaRecords = [] } = useCollegeEPAs();
  const { data: attendance = [] } = useCollegeAttendance();
  const { stats: workStats } = useWorkQueue();
  const queryClient = useQueryClient();
  const [gradeSheetOpen, setGradeSheetOpen] = useState(false);

  const handleRefresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['college-grades'] }),
      queryClient.invalidateQueries({ queryKey: ['college-ilps'] }),
      queryClient.invalidateQueries({ queryKey: ['college-epa'] }),
      queryClient.invalidateQueries({ queryKey: ['college-attendance'] }),
    ]);
  };

  const pendingAssessments = pendingGrades.length;
  const overdueILPReviews = overdueILPs.length;
  const studentsAtGateway = epaRecords.filter(
    (e) => e.status === 'Pre-Gateway' || e.status === 'Gateway Ready'
  ).length;
  const pendingWork = workStats.total;
  const avgAttendance =
    attendance.length > 0
      ? Math.round(
          (attendance.filter((a) => a.status === 'Present' || a.status === 'Late').length /
            attendance.length) *
            100
        )
      : 0;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        {/* HERO */}
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Assessment Hub"
            title="Grading, progress & EPA"
            description="Mark assessments, track attendance, run ILP reviews and drive learners to EPA gateway."
            tone="amber"
            actions={
              <button
                onClick={() => setGradeSheetOpen(true)}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Record grade →
              </button>
            }
          />
        </motion.div>

        {/* STATS */}
        <motion.div variants={itemVariants}>
          <StatStrip
            columns={4}
            stats={[
              {
                value: pendingAssessments,
                label: 'Pending',
                sub: 'Awaiting grading',
                onClick: () => onNavigate('grading'),
                accent: pendingAssessments > 0,
              },
              {
                value: `${avgAttendance}%`,
                label: 'Attendance',
                sub: 'Rolling average',
                onClick: () => onNavigate('attendance'),
                tone: avgAttendance >= 85 ? 'green' : avgAttendance >= 70 ? 'amber' : 'red',
              },
              {
                value: studentsAtGateway,
                label: 'Gateway',
                sub: 'Ready / pre-gateway',
                onClick: () => onNavigate('epatracking'),
              },
              {
                value: overdueILPReviews,
                label: 'Overdue ILPs',
                sub: 'Reviews outstanding',
                onClick: () => onNavigate('ilpmanagement'),
                accent: overdueILPReviews > 0,
              },
            ]}
          />
        </motion.div>

        {/* GRADING & ATTENDANCE */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Grading & Attendance" title="Capture assessment data" />
          <HubGrid columns={2}>
            <HubCard
              number="01"
              eyebrow="Marking & Grades"
              title="Grading"
              description="Mark assessments, record grades and review assessor feedback."
              tone="amber"
              meta={pendingAssessments > 0 ? `${pendingAssessments} pending` : 'All caught up'}
              badge={pendingAssessments > 0 ? <Pill tone="amber">{pendingAssessments}</Pill> : undefined}
              onClick={() => onNavigate('grading')}
            />
            <HubCard
              number="02"
              eyebrow="Registers & Records"
              title="Attendance"
              description="Take registers, view patterns and flag attendance concerns."
              tone="green"
              meta={`${avgAttendance}% average`}
              onClick={() => onNavigate('attendance')}
            />
          </HubGrid>
        </motion.section>

        {/* PROGRESS & ILP */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Progress & Learning Plans" title="Track learner journeys" />
          <HubGrid columns={3}>
            <HubCard
              number="03"
              eyebrow="Individual Plans"
              title="ILP Management"
              description="Learning plans, SMART targets and review cycles."
              tone="orange"
              meta={overdueILPReviews > 0 ? `${overdueILPReviews} overdue` : 'On schedule'}
              badge={overdueILPReviews > 0 ? <Pill tone="orange">{overdueILPReviews}</Pill> : undefined}
              onClick={() => onNavigate('ilpmanagement')}
            />
            <HubCard
              number="04"
              eyebrow="RAG Status"
              title="Progress Tracking"
              description="Learner RAG ratings, progress scores and at-risk flags."
              tone="blue"
              meta="Cohort progress"
              onClick={() => onNavigate('progresstracking')}
            />
            <HubCard
              number="05"
              eyebrow="Evidence & Submissions"
              title="Portfolios"
              description="Portfolio evidence, AI-assisted reviews and resubmissions."
              tone="purple"
              meta="AI-reviewed"
              badge={<Pill tone="yellow">AI</Pill>}
              onClick={() => onNavigate('portfolio')}
            />
          </HubGrid>
        </motion.section>

        {/* EPA */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="End Point Assessment" title="Gateway to EPA" />
          <HubGrid columns={2}>
            <HubCard
              number="06"
              eyebrow="Gateway Readiness"
              title="EPA Tracking"
              description="Gateway readiness checks, EPA scheduling and outcomes."
              tone="green"
              meta={studentsAtGateway > 0 ? `${studentsAtGateway} at gateway` : 'None ready'}
              onClick={() => onNavigate('epatracking')}
            />
            <HubCard
              number="07"
              eyebrow="Review Queue"
              title="Work Queue"
              description="Pending reviews, assignments and assessor tasks."
              tone="amber"
              meta={pendingWork > 0 ? `${pendingWork} items` : 'Clear'}
              badge={pendingWork > 0 ? <Pill tone="amber">{pendingWork}</Pill> : undefined}
              onClick={() => onNavigate('workqueue')}
            />
          </HubGrid>
        </motion.section>

        <RecordGradeSheet open={gradeSheetOpen} onOpenChange={setGradeSheetOpen} />
      </PageFrame>
    </PullToRefresh>
  );
}
