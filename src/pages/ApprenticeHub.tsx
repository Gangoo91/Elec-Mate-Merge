/**
 * ApprenticeHub
 *
 * Editorial hub layout matching the College Hub design system —
 * PageHero / StatStrip / SectionHeader / HubGrid / HubCard. Same dark
 * cards, elec-yellow accents, tone gradients, numbered cards.
 *
 * Reuses primitives from `@/components/college/primitives` because they
 * are general-purpose editorial components that just happen to live
 * under the college folder. Naming is incidental — same theme.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { useMyIlp } from '@/hooks/useMyIlp';
import { useMyAssignedQuizzes } from '@/hooks/useMyAssignedQuizzes';
import { useVideoInsights } from '@/hooks/apprentice-stats/useVideoInsights';
import { useSiteDiaryEntries } from '@/hooks/site-diary/useSiteDiaryEntries';
import { LearningVideosSection } from '@/components/apprentice/learning-videos/LearningVideosSection';
import { ElecIdBanner } from '@/components/elec-id/ElecIdBanner';
import { VideosWatchedDetailSheet } from '@/components/apprentice/stats-detail/VideosWatchedDetailSheet';
import { DiaryEntriesDetailSheet } from '@/components/apprentice/stats-detail/DiaryEntriesDetailSheet';
import { StudyStreakDetailSheet } from '@/components/apprentice/stats-detail/StudyStreakDetailSheet';
import { ProgressDetailSheet } from '@/components/apprentice/stats-detail/ProgressDetailSheet';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  HubGrid,
  HubCard,
  Pill,
  itemVariants,
} from '@/components/college/primitives';

/* ──────────────────────────────────────────────────────────────────
   Greeting helpers
   ────────────────────────────────────────────────────────────────── */

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function getDescription(streak: number, progress: number, hasOverdue: boolean): string {
  if (hasOverdue) return 'Pick up where you left off — your tutor sent something that needs your attention.';
  if (streak >= 7) return `${streak} days on the trot — keep the streak alive.`;
  if (progress >= 75) return 'Final stretch — you’re close to the line. Keep going.';
  if (progress >= 25) return 'Steady progress. Pick a card below to keep building.';
  return 'Welcome back. Pick a card below to start your session.';
}

/* ──────────────────────────────────────────────────────────────────
   College plan — featured priority card with live ILP / quiz state
   ────────────────────────────────────────────────────────────────── */

function CollegePlanCard() {
  const { ilp, rollUp, hasCollegeLink } = useMyIlp();
  const { quizzes } = useMyAssignedQuizzes();

  const pendingQuizzes = quizzes.filter((q) => q.status !== 'completed');
  const overdueQuizzes = pendingQuizzes.filter((q) => q.status === 'overdue');
  const notStartedQuizzes = pendingQuizzes.filter((q) => q.status === 'not_started');
  const inProgressQuizzes = pendingQuizzes.filter((q) => q.status === 'in_progress');

  const description = !hasCollegeLink
    ? 'Connect with your college to see goals from your tutor and tick them off here.'
    : pendingQuizzes.length > 0
      ? overdueQuizzes.length > 0
        ? `${overdueQuizzes.length} overdue · ${notStartedQuizzes.length + inProgressQuizzes.length} more pending`
        : notStartedQuizzes.length === 1 && inProgressQuizzes.length === 0
          ? `New from your tutor: ${notStartedQuizzes[0].title}`
          : `${pendingQuizzes.length} ${pendingQuizzes.length === 1 ? 'item' : 'items'} from your tutor — tap to start.`
      : ilp
        ? (ilp.headline_focus ??
          `${rollUp.completed}/${rollUp.total_goals} goals complete · set by your tutor`)
        : 'Your tutor will set goals here you can tick off and reply to.';

  const newCount =
    notStartedQuizzes.length + rollUp.unread_tutor_comments + (rollUp.needs_acknowledgement || 0);
  const hasOverdue = overdueQuizzes.length > 0;
  const meta = ilp ? `${rollUp.completed}/${rollUp.total_goals} goals complete` : 'Tap to open';
  const navigate = useNavigate();

  return (
    <HubGrid columns={1}>
      <HubCard
        eyebrow="My College Plan"
        title={hasCollegeLink ? 'Your goals & quizzes from college' : 'Connect with your college'}
        description={description}
        meta={meta}
        tone="blue"
        onClick={() => navigate('/apprentice/college-plan')}
        cta={ilp ? 'Open plan' : 'Open'}
        badge={
          hasOverdue ? (
            <Pill tone="red">{overdueQuizzes.length} overdue</Pill>
          ) : newCount > 0 ? (
            <Pill tone="yellow">{newCount} new</Pill>
          ) : undefined
        }
      />
    </HubGrid>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Stat strip — editorial values with detail-sheet drill-in
   ────────────────────────────────────────────────────────────────── */

/* Custom stat strip — grey cells with subtle yellow tints, white values.
   The college StatStrip primitive uses full tone-coloured values which
   was too loud; this keeps the hairline grid + numbered eyebrow style
   but tones the cells down to the editorial dashboard look. */
interface ApprenticeStat {
  number: string;
  label: string;
  value: string | number;
  sub: string;
  onClick: () => void;
}

function ApprenticeStatStrip() {
  const { stats } = useApprenticeData();
  const { watchedCount, totalVideos } = useVideoInsights();
  const { entries } = useSiteDiaryEntries();
  const [streakOpen, setStreakOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [videosOpen, setVideosOpen] = useState(false);
  const [diaryOpen, setDiaryOpen] = useState(false);

  const cells: ApprenticeStat[] = [
    {
      number: '01',
      label: 'Streak',
      value:
        stats.learning.currentStreak === 1
          ? '1 day'
          : `${stats.learning.currentStreak} days`,
      sub: stats.learning.currentStreak >= 7 ? 'On a roll' : 'Keep it going',
      onClick: () => setStreakOpen(true),
    },
    {
      number: '02',
      label: 'Progress',
      value: `${stats.progress.overallPercent}%`,
      sub: 'Course completion',
      onClick: () => setProgressOpen(true),
    },
    {
      number: '03',
      label: 'Videos',
      value: totalVideos > 0 ? `${watchedCount}/${totalVideos}` : `${watchedCount}`,
      sub: 'Watched this term',
      onClick: () => setVideosOpen(true),
    },
    {
      number: '04',
      label: 'Diary',
      value: entries.length,
      sub: 'Site logbook',
      onClick: () => setDiaryOpen(true),
    },
  ];

  return (
    <>
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden">
        {/* Single subtle yellow hairline ceiling — the only colour accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/50 to-elec-yellow/0 pointer-events-none z-10" />

        {cells.map((stat) => {
          const valueStr = String(stat.value);
          const isNumericish =
            typeof stat.value === 'number' || /^[\d.,+\-/%hkm\s]+$/i.test(valueStr);
          const sizeClass =
            isNumericish && valueStr.length <= 6
              ? 'text-4xl sm:text-5xl lg:text-[56px]'
              : valueStr.length <= 10
                ? 'text-3xl sm:text-4xl lg:text-5xl'
                : 'text-2xl sm:text-3xl lg:text-4xl';

          return (
            <button
              key={stat.number}
              type="button"
              onClick={stat.onClick}
              className={cn(
                'group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors',
                'px-5 py-6 sm:px-7 sm:py-8 flex flex-col text-left touch-manipulation'
              )}
            >
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                  {stat.number}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 truncate">
                  · {stat.label}
                </span>
              </div>
              <span
                className={cn(
                  'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none text-white',
                  sizeClass
                )}
              >
                {stat.value}
              </span>
              <span className="mt-3 text-[11.5px] text-white/55 group-hover:text-white/75 transition-colors">
                {stat.sub}
              </span>
            </button>
          );
        })}
      </div>

      <StudyStreakDetailSheet open={streakOpen} onOpenChange={setStreakOpen} />
      <ProgressDetailSheet open={progressOpen} onOpenChange={setProgressOpen} />
      <VideosWatchedDetailSheet open={videosOpen} onOpenChange={setVideosOpen} />
      <DiaryEntriesDetailSheet
        open={diaryOpen}
        onOpenChange={setDiaryOpen}
        entries={entries}
      />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Tools & references catalogue — small numbered cards
   ────────────────────────────────────────────────────────────────── */

const QUICK_TOOLS: Array<{
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  link: string;
  tone: 'blue' | 'emerald' | 'amber' | 'cyan' | 'purple' | 'indigo' | 'yellow';
}> = [
  {
    number: '01',
    eyebrow: 'AI tutor',
    title: 'Study assistant',
    description: 'Instant help with theory and exams.',
    link: '/apprentice/advanced-help',
    tone: 'yellow',
  },
  {
    number: '02',
    eyebrow: 'Logbook',
    title: 'Site diary',
    description: 'Log daily site activities and hours.',
    link: '/apprentice/site-diary',
    tone: 'amber',
  },
  {
    number: '03',
    eyebrow: 'Calculations',
    title: 'Calculators',
    description: 'Cable sizing, voltage drop, and more.',
    link: '/apprentice/calculators',
    tone: 'blue',
  },
  {
    number: '04',
    eyebrow: 'Daily work',
    title: 'On-the-job tools',
    description: 'Quick references for site tasks.',
    link: '/apprentice/on-job-tools',
    tone: 'emerald',
  },
  {
    number: '05',
    eyebrow: 'Wellbeing',
    title: 'Mental health',
    description: 'Wellbeing resources and support.',
    link: '/apprentice/mental-health',
    tone: 'indigo',
  },
  {
    number: '06',
    eyebrow: 'Career',
    title: 'Progression',
    description: 'Plan your career pathway.',
    link: '/apprentice/professional-development',
    tone: 'purple',
  },
  {
    number: '07',
    eyebrow: 'Reference',
    title: 'Guidance area',
    description: 'Tips, guides and best practices.',
    link: '/apprentice/toolbox',
    tone: 'cyan',
  },
  {
    number: '08',
    eyebrow: 'Account',
    title: 'Settings',
    description: 'Subscription, notifications and accessibility.',
    link: '/settings',
    tone: 'yellow',
  },
];

/* ──────────────────────────────────────────────────────────────────
   Main page
   ────────────────────────────────────────────────────────────────── */

export default function ApprenticeHub() {
  useSEO({
    title: 'Apprentice Hub | Level 2 & 3 Electrical Training',
    description:
      'Complete electrical apprenticeship training platform. Level 2 and Level 3 courses, AM2 exam prep, 2,000+ practice questions, OJT tracking, and industry-recognised qualifications.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Electrical Apprentice Training Hub',
      description:
        'Training hub for UK electrical apprentices pursuing Level 2 and Level 3 qualifications',
      provider: { '@type': 'Organization', name: 'Elec-Mate' },
    },
  });

  const navigate = useNavigate();
  const { user, stats } = useApprenticeData();
  const { quizzes } = useMyAssignedQuizzes();
  const hasOverdue = quizzes.some((q) => q.status === 'overdue');
  const greeting = getGreeting();
  const description = getDescription(
    stats.learning.currentStreak,
    stats.progress.overallPercent,
    hasOverdue
  );

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      {/* Back navigation */}
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Button>
      </motion.div>

      {/* HERO — editorial */}
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Welcome back"
          title={`${greeting}, ${user.firstName}`}
          description={description}
          tone="yellow"
        />
      </motion.div>

      {/* AT A GLANCE — stat strip */}
      <motion.div variants={itemVariants}>
        <ApprenticeStatStrip />
      </motion.div>

      {/* PRIORITY — College plan */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Priority" title="From your college" />
        <CollegePlanCard />
      </motion.section>

      {/* CORE LEARNING */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Core Learning" title="Study & exam prep" />
        <HubGrid columns={2}>
          <HubCard
            number="01"
            eyebrow="Apprenticeship"
            title="Study Centre"
            description="Level 2 & 3 courses, practice questions and exam prep — at your own pace."
            meta="Active course"
            tone="emerald"
            onClick={() => navigate('/study-centre/apprentice')}
          />
          <HubCard
            number="02"
            eyebrow="BS 7671"
            title="Inspection & Testing"
            description="Comprehensive guides, quizzes and BS 7671 regulations."
            meta="6 modules"
            tone="amber"
            onClick={() => navigate('/apprentice/inspection-testing-hub')}
          />
        </HubGrid>
      </motion.section>

      {/* EXAM PREP */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Exam Prep" title="Mock the real thing" />
        <HubGrid columns={2}>
          <HubCard
            number="03"
            eyebrow="EPA"
            title="EPA Simulator"
            description="Mock professional discussions and knowledge tests with AI scoring."
            meta="AI-scored"
            tone="purple"
            onClick={() => navigate('/apprentice/epa-simulator')}
            badge={<Pill tone="purple">AI</Pill>}
          />
          <HubCard
            number="04"
            eyebrow="AM2"
            title="AM2 Simulator"
            description="Safe isolation, fault finding and testing simulations."
            meta="Practice tasks"
            tone="cyan"
            onClick={() => navigate('/apprentice/am2-simulator')}
          />
        </HubGrid>
      </motion.section>

      {/* PORTFOLIO */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Evidence" title="Your portfolio" />
        <HubGrid columns={1}>
          <HubCard
            number="05"
            eyebrow="Apprenticeship portfolio"
            title="Track your evidence & OJT"
            description="Build your apprenticeship portfolio — assessment criteria, OJT hours, evidence and reflections."
            meta="Open portfolio"
            tone="indigo"
            onClick={() => navigate('/apprentice/hub')}
          />
        </HubGrid>
      </motion.section>

      {/* ELEC-ID BANNER */}
      <motion.section variants={itemVariants}>
        <ElecIdBanner variant="apprentice" />
      </motion.section>

      {/* LEARNING VIDEOS */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="On Demand" title="Learning videos" />
        <LearningVideosSection />
      </motion.section>

      {/* TOOLS & REFERENCES */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Tools & References" title="Quick access" />
        <HubGrid columns={4}>
          {QUICK_TOOLS.map((t) => (
            <HubCard
              key={t.link}
              size="sm"
              number={t.number}
              eyebrow={t.eyebrow}
              title={t.title}
              description={t.description}
              tone={t.tone}
              onClick={() => navigate(t.link)}
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
}
