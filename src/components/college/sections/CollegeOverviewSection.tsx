/**
 * CollegeOverviewSection — the College Hub home, redesigned tutor-first.
 *
 * Lands on /college and shows the tutor's morning workflow at the top
 * (greeting + KPIs + show-me search + classes/inbox/at-risk/this-week),
 * then a compliance pulse strip, then the navigation hubs as a smaller
 * secondary surface so they're discoverable but not in the way.
 *
 * Design rationale: the previous overview was admin-shaped — aggregate
 * counts (Students/Tutors/Pending/Gateway), four giant nav hubs, then
 * widgets. A tutor's actual morning is "what's happening today + what's
 * waiting for me + who needs help" — that's the Tutor Today body.  The
 * old admin metrics still exist but as smaller chips on the bottom hubs.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AtRiskPredictor } from '@/components/college/widgets/AtRiskPredictor';
import { EPACountdown } from '@/components/college/widgets/EPACountdown';
import { ActivityFeed } from '@/components/college/widgets/ActivityFeed';
import { MyComplianceWidget } from '@/components/college/widgets/MyComplianceWidget';
import { ComplianceLeadsWidget } from '@/components/college/widgets/ComplianceLeadsWidget';
import { VerifierInboxWidget } from '@/components/college/widgets/VerifierInboxWidget';
import { MyAcknowledgementsWidget } from '@/components/college/widgets/MyAcknowledgementsWidget';
import { TopExpiringWidget } from '@/components/college/widgets/TopExpiringWidget';
import { TutorTodayBody } from '@/pages/college/TutorTodayPage';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';

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
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {eyebrow}
        </div>
        <h2 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">
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
  const { students, getStaffByRole, getPendingGradesData, isLoading } = useCollegeSupabase();

  const activeTutors = getStaffByRole('tutor').length;
  const activeStudents = students.filter((s) => s.status?.toLowerCase() === 'active').length;
  const pendingAssessments = getPendingGradesData().length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
      </div>
    );
  }

  // Navigation hubs — kept as a secondary surface so tutors who need to
  // jump elsewhere have a clear path. Sized smaller than before; the
  // *primary* surface above is the Tutor Today body.
  const hubs: Array<{
    eyebrow: string;
    title: string;
    desc: string;
    section: CollegeSection;
    accent: string;
    meta: string;
  }> = [
    {
      eyebrow: 'Students & Staff',
      title: 'People',
      desc: 'Students, tutors, cohorts, support staff.',
      section: 'peoplehub',
      accent: 'from-blue-500/70 via-blue-400/70 to-cyan-400/70',
      meta: `${activeStudents} active · ${activeTutors} tutors`,
    },
    {
      eyebrow: 'Courses & Lessons',
      title: 'Curriculum',
      desc: 'Courses, lesson plans, teaching resources, notebook.',
      section: 'curriculumhub',
      accent: 'from-emerald-500/70 via-emerald-400/70 to-green-400/70',
      meta: 'Lesson planner ready',
    },
    {
      eyebrow: 'Grading & Progress',
      title: 'Assessment',
      desc: 'Grades, ILPs, EPA gateway, portfolio review, work queue.',
      section: 'assessmenthub',
      accent: 'from-amber-500/70 via-amber-400/70 to-yellow-400/70',
      meta: pendingAssessments > 0 ? `${pendingAssessments} pending` : 'All caught up',
    },
    {
      eyebrow: 'Docs & Settings',
      title: 'Resources',
      desc: 'Compliance docs, LTI, college configuration.',
      section: 'resourceshub',
      accent: 'from-purple-500/70 via-violet-400/70 to-indigo-400/70',
      meta: 'Settings & admin',
    },
  ];

  // Secondary tools row — discoverable workflows that don't fit a hub.
  const tools: Array<{
    eyebrow: string;
    title: string;
    desc: string;
    section: CollegeSection;
    accent: string;
  }> = [
    {
      eyebrow: 'OTJ',
      title: 'Off-the-job tracker',
      desc: 'ESFA 20% time tracker for apprentices.',
      section: 'otjtraining',
      accent: 'from-emerald-500/70 to-green-400/70',
    },
    {
      eyebrow: 'Quality',
      title: 'Quality dashboard',
      desc: 'Ofsted-aligned compliance metrics and reports.',
      section: 'qualitydashboard',
      accent: 'from-blue-500/70 to-cyan-400/70',
    },
    {
      eyebrow: 'AI',
      title: 'AI ILP generator',
      desc: 'SMART targets generated from learner data.',
      section: 'aiilpgenerator',
      accent: 'from-elec-yellow/80 to-amber-400/70',
    },
    {
      eyebrow: 'Schedule',
      title: 'Timetable',
      desc: 'Weekly lesson schedule across cohorts.',
      section: 'timetable',
      accent: 'from-purple-500/70 to-indigo-400/70',
    },
    {
      eyebrow: 'Live',
      title: 'Live lesson',
      desc: 'In-lesson register with built-in timer.',
      section: 'livelesson',
      accent: 'from-elec-yellow/80 to-orange-400/70',
    },
    {
      eyebrow: 'Batch',
      title: 'Batch operations',
      desc: 'Bulk grading and review workflows.',
      section: 'batchoperations',
      accent: 'from-amber-500/70 to-yellow-400/70',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl space-y-7 sm:space-y-12 lg:space-y-16"
    >
      {/* ──────────────── TODAY (PRIMARY — the morning workflow) ──────────────── */}
      {/* Embedded TutorTodayBody — same hook, same UI as /college/today. The
          embed mode swaps the giant H1 for a tighter heading + "Open full
          Today's view →" link for the standalone surface. */}
      <TutorTodayBody mode="embed" />

      {/* ──────────────── COMPLIANCE PULSE ──────────────── */}
      {/* Three widgets that need to live somewhere — kept as a single
          "pulse" strip so they're visible without dominating. */}
      <motion.section variants={itemVariants} className="space-y-4 sm:space-y-5">
        <SectionHeader
          eyebrow="Compliance pulse"
          title="Your records and the college's"
          action="Open hub"
          onAction={() => onNavigate('compliancedocs')}
        />
        <div className="space-y-3 sm:space-y-4">
          <MyAcknowledgementsWidget />
          <VerifierInboxWidget />
          <TopExpiringWidget />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-3 sm:gap-4">
          <MyComplianceWidget />
          <ComplianceLeadsWidget />
        </div>
      </motion.section>

      {/* ──────────────── PREDICTIVE ──────────────── */}
      <motion.section variants={itemVariants} className="space-y-4 sm:space-y-5">
        <SectionHeader eyebrow="Insights" title="Predictive analytics" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <AtRiskPredictor onNavigate={onNavigate} compact />
          <EPACountdown onNavigate={onNavigate} compact />
        </div>
      </motion.section>

      {/* ──────────────── OTHER AREAS (de-prominent navigation) ──────────────── */}
      {/* The 4 hubs were the hero of the old design.  Now they're a
          secondary "where to next" — smaller tiles, denser meta. */}
      <motion.section variants={itemVariants} className="space-y-4 sm:space-y-5">
        <SectionHeader eyebrow="Other areas" title="Navigate the college" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {hubs.map((hub) => (
            <button
              key={hub.title}
              onClick={() => onNavigate(hub.section)}
              className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-4 sm:p-5 text-left touch-manipulation flex flex-col min-h-[140px]"
            >
              <div
                className={cn(
                  'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity',
                  hub.accent
                )}
              />
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                {hub.eyebrow}
              </div>
              <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white tracking-tight">
                {hub.title}
              </h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white line-clamp-2">
                {hub.desc}
              </p>
              <div className="flex-grow" />
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <span className="text-[10.5px] text-white truncate">{hub.meta}</span>
                <span className="text-[12px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                  Open →
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ──────────────── TOOLS ──────────────── */}
      <motion.section variants={itemVariants} className="space-y-4 sm:space-y-5">
        <SectionHeader eyebrow="Tools" title="Workflows & utilities" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {tools.map((tool) => (
            <button
              key={tool.title}
              onClick={() => onNavigate(tool.section)}
              className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-3 sm:p-4 text-left touch-manipulation flex flex-col min-h-[110px]"
            >
              <div
                className={cn(
                  'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity',
                  tool.accent
                )}
              />
              <div className="text-[9.5px] font-medium uppercase tracking-[0.18em] text-white">
                {tool.eyebrow}
              </div>
              <div className="mt-1.5 text-[13px] font-semibold text-white tracking-tight leading-snug line-clamp-1">
                {tool.title}
              </div>
              <div className="mt-1 text-[11px] leading-snug text-white line-clamp-2">
                {tool.desc}
              </div>
              <div className="flex-grow" />
              <div className="mt-2 text-[11px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow transition-colors">
                Open →
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ──────────────── ACTIVITY FEED ──────────────── */}
      <motion.section variants={itemVariants} className="space-y-4 sm:space-y-5">
        <SectionHeader eyebrow="Recent activity" title="What's happening" />
        <ActivityFeed maxItems={8} iconless />
      </motion.section>
    </motion.div>
  );
}
