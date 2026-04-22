/**
 * CollegeOverviewSection — best-in-class editorial redesign.
 * Typography-led, hairline dividers, monochrome + elec-yellow accent.
 * No pictogram icons. Fully responsive from mobile → desktop.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AtRiskPredictor } from '@/components/college/widgets/AtRiskPredictor';
import { EPACountdown } from '@/components/college/widgets/EPACountdown';
import { ActivityFeed } from '@/components/college/widgets/ActivityFeed';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useSubmissionQueue } from '@/hooks/college/usePortfolioSubmissions';

interface CollegeOverviewSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

/* Shared tiny components to keep the JSX tidy */
function SectionHeader({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
          {eyebrow}
        </div>
        <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-[28px] font-semibold text-white tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {action && onAction && (
        <button
          onClick={onAction}
          className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors shrink-0 touch-manipulation"
        >
          {action} →
        </button>
      )}
    </div>
  );
}

export function CollegeOverviewSection({ onNavigate }: CollegeOverviewSectionProps) {
  const {
    students,
    epaRecords,
    isLoading,
    getStaffByRole,
    getPendingGradesData,
    getOverdueILPReviewsData,
    getUpcomingLessonsData,
  } = useCollegeSupabase();

  const { stats: submissionStats } = useSubmissionQueue();

  const activeTutors = getStaffByRole('tutor').length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const pendingAssessments = getPendingGradesData().length;
  const overdueILPReviews = getOverdueILPReviewsData().length;
  const upcomingLessons = getUpcomingLessonsData();
  const studentsAtGateway = epaRecords.filter(
    (e) => e.status === 'Pre-Gateway' || e.status === 'Gateway Ready'
  ).length;
  const epaInProgress = epaRecords.filter((e) => e.status === 'In Progress').length;
  const epaComplete = epaRecords.filter((e) => e.status === 'Complete').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
      </div>
    );
  }

  const kpis = [
    {
      value: activeStudents,
      label: 'Students',
      sub: 'Enrolled & active',
      onClick: () => onNavigate('students'),
    },
    {
      value: activeTutors,
      label: 'Tutors',
      sub: 'Teaching staff',
      onClick: () => onNavigate('tutors'),
    },
    {
      value: pendingAssessments,
      label: 'Pending',
      sub: 'Awaiting grading',
      onClick: () => onNavigate('grading'),
      accent: pendingAssessments > 0,
    },
    {
      value: studentsAtGateway,
      label: 'Gateway',
      sub: 'EPA ready',
      onClick: () => onNavigate('epatracking'),
    },
  ];

  const hubs = [
    {
      number: '01',
      eyebrow: 'Students & Staff',
      title: 'People',
      desc: 'Students, tutors, cohorts and support staff — all in one place.',
      section: 'peoplehub' as CollegeSection,
      accent: 'from-blue-500/70 via-blue-400/70 to-cyan-400/70',
      meta: `${activeStudents} active students`,
    },
    {
      number: '02',
      eyebrow: 'Courses & Lessons',
      title: 'Curriculum',
      desc: 'Courses, lesson plans, teaching resources and your notebook.',
      section: 'curriculumhub' as CollegeSection,
      accent: 'from-emerald-500/70 via-emerald-400/70 to-green-400/70',
      meta: 'Lesson planner ready',
    },
    {
      number: '03',
      eyebrow: 'Grading & Progress',
      title: 'Assessment',
      desc: 'Grades, ILPs, EPA gateway, portfolio review and work queue.',
      section: 'assessmenthub' as CollegeSection,
      accent: 'from-amber-500/70 via-amber-400/70 to-yellow-400/70',
      meta: pendingAssessments > 0 ? `${pendingAssessments} pending items` : 'All caught up',
    },
    {
      number: '04',
      eyebrow: 'Docs & Settings',
      title: 'Resources',
      desc: 'Compliance documentation, LTI settings and college configuration.',
      section: 'resourceshub' as CollegeSection,
      accent: 'from-purple-500/70 via-violet-400/70 to-indigo-400/70',
      meta: 'Settings & admin',
    },
  ];

  const quickActions = [
    { title: 'Grade work', desc: 'Record assessments', section: 'grading' as CollegeSection, badge: pendingAssessments },
    { title: 'Take register', desc: 'Record attendance', section: 'attendance' as CollegeSection },
    { title: 'ILP review', desc: 'Update learning plans', section: 'ilpmanagement' as CollegeSection, badge: overdueILPReviews },
    { title: 'EPA gateway', desc: 'Check readiness', section: 'epatracking' as CollegeSection },
  ];

  const tools = [
    { eyebrow: 'OTJ', title: 'Off-the-job training', desc: '20% off-the-job time tracker for apprentices.', section: 'otjtraining' as CollegeSection, accent: 'from-emerald-500/70 to-green-400/70' },
    { eyebrow: 'Quality', title: 'Quality dashboard', desc: 'Ofsted-aligned compliance metrics and reports.', section: 'qualitydashboard' as CollegeSection, accent: 'from-blue-500/70 to-cyan-400/70' },
    { eyebrow: 'AI', title: 'AI ILP generator', desc: 'Auto-generate SMART targets from learner data.', section: 'aiilpgenerator' as CollegeSection, accent: 'from-elec-yellow/80 to-amber-400/70' },
    { eyebrow: 'Schedule', title: 'Timetable', desc: 'Weekly lesson schedule across cohorts.', section: 'timetable' as CollegeSection, accent: 'from-purple-500/70 to-indigo-400/70' },
    { eyebrow: 'Live', title: 'Live lesson', desc: 'In-lesson register with built-in timer.', section: 'livelesson' as CollegeSection, accent: 'from-elec-yellow/80 to-orange-400/70' },
    { eyebrow: 'Batch', title: 'Batch operations', desc: 'Bulk grading and review workflows.', section: 'batchoperations' as CollegeSection, accent: 'from-amber-500/70 to-yellow-400/70' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl space-y-12 sm:space-y-16 lg:space-y-20"
    >
      {/* ──────────────── HERO KPI STRIP ──────────────── */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {kpis.map((stat, i) => (
            <button
              key={stat.label}
              onClick={stat.onClick}
              className="group flex flex-col items-start bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 text-left touch-manipulation"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                {String(i + 1).padStart(2, '0')} · {stat.label}
              </span>
              <span
                className={cn(
                  'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                  'text-5xl sm:text-6xl lg:text-7xl',
                  stat.accent ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {stat.value}
              </span>
              <span className="mt-3 text-[11px] text-white/50">{stat.sub}</span>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ──────────────── MAIN AREAS ──────────────── */}
      <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
        <SectionHeader eyebrow="Main Areas" title="Navigate the college" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {hubs.map((hub) => (
            <button
              key={hub.title}
              onClick={() => onNavigate(hub.section)}
              className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-6 sm:p-7 lg:p-8 text-left touch-manipulation flex flex-col min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]"
            >
              <div
                className={cn(
                  'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity',
                  hub.accent
                )}
              />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                {hub.number} · {hub.eyebrow}
              </span>
              <h3 className="mt-4 sm:mt-5 text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-white tracking-tight leading-[1.05]">
                {hub.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-white/55 max-w-[34ch]">
                {hub.desc}
              </p>
              <div className="flex-grow" />
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <span className="text-[11px] text-white/50">{hub.meta}</span>
                <span className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                  Open →
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ──────────────── PRIORITY ──────────────── */}
      {(overdueILPReviews > 0 || submissionStats.total > 0) && (
        <motion.section variants={itemVariants} className="space-y-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
            Priority
          </div>
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
            {overdueILPReviews > 0 && (
              <button
                onClick={() => onNavigate('ilpmanagement')}
                className="group w-full flex items-center gap-4 sm:gap-6 px-5 sm:px-6 py-5 sm:py-6 hover:bg-[hsl(0_0%_15%)] transition-colors text-left touch-manipulation"
              >
                <span className="w-[3px] h-10 sm:h-12 rounded-full bg-amber-400/70 group-hover:bg-amber-400 transition-colors shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-base font-medium text-white">Overdue ILP reviews</div>
                  <div className="mt-0.5 text-[12px] text-white/50">
                    {overdueILPReviews} review{overdueILPReviews > 1 ? 's' : ''} awaiting completion
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold tabular-nums text-amber-400 leading-none">
                    {overdueILPReviews}
                  </span>
                  <span className="text-white/40 text-lg group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </div>
              </button>
            )}
            {submissionStats.total > 0 && (
              <button
                onClick={() => onNavigate('portfolio')}
                className="group w-full flex items-center gap-4 sm:gap-6 px-5 sm:px-6 py-5 sm:py-6 hover:bg-[hsl(0_0%_15%)] transition-colors text-left touch-manipulation"
              >
                <span className="w-[3px] h-10 sm:h-12 rounded-full bg-purple-400/70 group-hover:bg-purple-400 transition-colors shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-base font-medium text-white">Portfolio reviews</div>
                  <div className="mt-0.5 text-[12px] text-white/50">
                    {submissionStats.highPriority > 0 ? `${submissionStats.highPriority} high priority · ` : ''}
                    {submissionStats.total} awaiting review
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold tabular-nums text-purple-400 leading-none">
                    {submissionStats.total}
                  </span>
                  <span className="text-white/40 text-lg group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </div>
              </button>
            )}
          </div>
        </motion.section>
      )}

      {/* ──────────────── INSIGHTS ──────────────── */}
      <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
        <SectionHeader eyebrow="Insights" title="Predictive analytics" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <AtRiskPredictor onNavigate={onNavigate} compact />
          <EPACountdown onNavigate={onNavigate} compact />
        </div>
      </motion.section>

      {/* ──────────────── QUICK ACTIONS ──────────────── */}
      <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
        <SectionHeader eyebrow="Quick Actions" title="Jump to work" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={() => onNavigate(action.section)}
              className="group bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 sm:p-6 text-left touch-manipulation flex flex-col min-h-[120px]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-semibold text-white group-hover:text-elec-yellow transition-colors">
                    {action.title}
                  </div>
                  <div className="mt-1 text-[12px] text-white/50">{action.desc}</div>
                </div>
                {action.badge !== undefined && action.badge > 0 && (
                  <span className="text-[11px] font-semibold tabular-nums text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded px-1.5 py-0.5 leading-none shrink-0">
                    {action.badge}
                  </span>
                )}
              </div>
              <div className="flex-grow" />
              <div className="mt-4 text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                Open →
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ──────────────── DETAIL PAIR ──────────────── */}
      <motion.section
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14"
      >
        {/* Upcoming Lessons */}
        <div className="space-y-5">
          <SectionHeader
            eyebrow="Schedule"
            title="Upcoming lessons"
            action="View all"
            onAction={() => onNavigate('lessonplans')}
          />
          {upcomingLessons.length > 0 ? (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
              {upcomingLessons.slice(0, 4).map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onNavigate('lessonplans')}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 hover:bg-[hsl(0_0%_15%)] transition-colors text-left touch-manipulation"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white truncate">{lesson.title}</div>
                    <div className="mt-0.5 text-[11px] text-white/50 truncate">{lesson.cohortName}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                      {new Date(lesson.scheduledDate).toLocaleDateString('en-GB', { weekday: 'short' })}
                    </div>
                    <div className="mt-0.5 text-[13px] font-medium tabular-nums text-white">
                      {new Date(lesson.scheduledDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-[12px] text-white/40 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl">
              No upcoming lessons this week
            </div>
          )}
        </div>

        {/* EPA Progress */}
        <div className="space-y-5">
          <SectionHeader
            eyebrow="Endpoint Assessment"
            title="EPA progress"
            action="Details"
            onAction={() => onNavigate('epatracking')}
          />
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
            {[
              { label: 'At Gateway', sub: 'Ready for assessment', value: studentsAtGateway, accent: 'text-green-400' },
              { label: 'In Progress', sub: 'Working toward gateway', value: epaInProgress, accent: 'text-white' },
              { label: 'Completed', sub: 'EPA passed', value: epaComplete, accent: 'text-elec-yellow' },
            ].map((row) => (
              <button
                key={row.label}
                onClick={() => onNavigate('epatracking')}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 hover:bg-[hsl(0_0%_15%)] transition-colors text-left touch-manipulation"
              >
                <div>
                  <div className="text-sm font-medium text-white">{row.label}</div>
                  <div className="mt-0.5 text-[11px] text-white/50">{row.sub}</div>
                </div>
                <span
                  className={cn(
                    'text-3xl sm:text-4xl font-semibold tabular-nums leading-none',
                    row.accent
                  )}
                >
                  {row.value}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ──────────────── TOOLS & COMPLIANCE ──────────────── */}
      <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
        <SectionHeader eyebrow="Tools & Compliance" title="Workflows & admin" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {tools.map((tool) => (
            <button
              key={tool.title}
              onClick={() => onNavigate(tool.section)}
              className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 sm:p-6 text-left touch-manipulation flex flex-col min-h-[160px] sm:min-h-[180px]"
            >
              <div
                className={cn(
                  'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity',
                  tool.accent
                )}
              />
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                {tool.eyebrow}
              </div>
              <div className="mt-3 text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
                {tool.title}
              </div>
              <div className="mt-1.5 text-[12px] leading-relaxed text-white/50">{tool.desc}</div>
              <div className="flex-grow" />
              <div className="mt-4 text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                Open →
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ──────────────── ACTIVITY FEED ──────────────── */}
      <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
        <SectionHeader eyebrow="Recent Activity" title="What's happening" />
        <ActivityFeed maxItems={8} iconless />
      </motion.section>
    </motion.div>
  );
}
