/**
 * ApprenticeHub
 *
 * Premium apprentice command centre with glass morphism styling,
 * real-time stats, and best-in-class mobile experience.
 * Yellow/gold theme throughout. Matches ElectricalHub layout.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import {
  GraduationCap,
  Heart,
  Calculator,
  BookOpen,
  Settings,
  WrenchIcon,
  ClipboardCheck,
  Sparkles,
  ArrowLeft,
  Flame,
  Target,
  Award,
  FileText,
  Video,
  BookMarked,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import { ElecIdBanner } from '@/components/elec-id/ElecIdBanner';
import { LearningVideosSection } from '@/components/apprentice/learning-videos/LearningVideosSection';
import { useVideoInsights } from '@/hooks/apprentice-stats/useVideoInsights';
import { useSiteDiaryEntries } from '@/hooks/site-diary/useSiteDiaryEntries';
import { VideosWatchedDetailSheet } from '@/components/apprentice/stats-detail/VideosWatchedDetailSheet';
import { DiaryEntriesDetailSheet } from '@/components/apprentice/stats-detail/DiaryEntriesDetailSheet';
import { StudyStreakDetailSheet } from '@/components/apprentice/stats-detail/StudyStreakDetailSheet';
import { ProgressDetailSheet } from '@/components/apprentice/stats-detail/ProgressDetailSheet';

// Animation variants — match ElectricalHub
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

// ─── Hero ────────────────────────────────────────────────────────
// Left-aligned, compact. Glass card with yellow glow. Matches ElectricalHub.

function ApprenticeHero() {
  const { user, stats } = useApprenticeData();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning,';
    if (hour < 18) return 'Good afternoon,';
    return 'Good evening,';
  };

  return (
    <div className="relative overflow-hidden glass-premium rounded-2xl">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow opacity-60" />

      <div className="relative z-10 px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-[13px] text-white mb-0.5">{getGreeting()}</p>
        <h1 className="text-xl sm:text-2xl font-bold text-elec-yellow tracking-tight">
          {user.firstName}
        </h1>
      </div>
    </div>
  );
}

// ─── Stats Bar ──────────────────────────────────────────────────
// Left-aligned values matching ElectricalHub stat cards.

function ApprenticeStatsBar() {
  const { stats, isLoading } = useApprenticeData();
  const { watchedCount, totalVideos } = useVideoInsights();
  const { entries } = useSiteDiaryEntries();
  const [streakSheetOpen, setStreakSheetOpen] = useState(false);
  const [progressSheetOpen, setProgressSheetOpen] = useState(false);
  const [videosSheetOpen, setVideosSheetOpen] = useState(false);
  const [diarySheetOpen, setDiarySheetOpen] = useState(false);

  const statItems = [
    {
      label: 'Study Streak',
      value: stats.learning.currentStreak,
      suffix: ' days',
      icon: Flame,
      accentColor: 'text-orange-400',
      onTap: () => setStreakSheetOpen(true),
    },
    {
      label: 'Progress',
      value: stats.progress.overallPercent,
      suffix: '%',
      icon: Target,
      accentColor: 'text-green-400',
      onTap: () => setProgressSheetOpen(true),
    },
    {
      label: 'Videos',
      value: watchedCount,
      suffix: `/${totalVideos}`,
      icon: Video,
      accentColor: 'text-purple-400',
      onTap: () => setVideosSheetOpen(true),
    },
    {
      label: 'Diary Entries',
      value: entries.length,
      suffix: '',
      icon: BookMarked,
      accentColor: 'text-elec-yellow',
      onTap: () => setDiarySheetOpen(true),
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[85px] rounded-xl bg-white/[0.04] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {statItems.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.button
              key={stat.label}
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={stat.onTap}
              className="touch-manipulation cursor-pointer group w-full text-left"
              aria-label={`View ${stat.label}`}
            >
              <div className="rounded-2xl px-4 py-3 sm:py-4 bg-white/[0.03] border border-white/[0.06] group-active:bg-white/[0.06] transition-colors duration-150">
                <p className="text-[11px] text-white mb-1 uppercase tracking-wider font-medium">{stat.label}</p>
                <div className="flex items-baseline">
                  <AnimatedCounter
                    value={stat.value}
                    className={cn('text-2xl sm:text-3xl font-bold tracking-tight', stat.accentColor)}
                  />
                  {stat.suffix && (
                    <span className="text-xs text-white ml-0.5">{stat.suffix}</span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Detail Sheets */}
      <StudyStreakDetailSheet open={streakSheetOpen} onOpenChange={setStreakSheetOpen} />
      <ProgressDetailSheet open={progressSheetOpen} onOpenChange={setProgressSheetOpen} />
      <VideosWatchedDetailSheet open={videosSheetOpen} onOpenChange={setVideosSheetOpen} />
      <DiaryEntriesDetailSheet
        open={diarySheetOpen}
        onOpenChange={setDiarySheetOpen}
        entries={entries}
      />
    </>
  );
}

// ─── Primary Tool Card ──────────────────────────────────────────
// Centred icon, title, description. Matches ElectricalHub PrimaryToolCard.

interface PrimaryToolCardProps {
  title: string;
  description: string;
  icon: typeof BookOpen;
  link: string;
  accent?: 'yellow' | 'purple' | 'cyan';
}

function PrimaryToolCard({
  title,
  description,
  icon: _Icon,
  link,
}: PrimaryToolCardProps) {
  return (
    <Link to={link} className="block group touch-manipulation">
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative overflow-hidden card-surface-interactive rounded-xl h-full min-h-[130px] active:scale-[0.98] transition-all duration-200"
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-30 group-hover:opacity-80 transition-opacity duration-200" />

        <div className="relative z-10 flex flex-col h-full p-3.5 sm:p-4">
          <h3 className="text-[13px] sm:text-sm font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="mt-0.5 text-[11px] sm:text-[12px] text-white leading-tight line-clamp-2">
            {description}
          </p>

          <div className="flex-grow" />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">Open</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Compact Tool Card ──────────────────────────────────────────
// Smaller card for secondary tools. Matches ElectricalHub CompactToolCard.

interface CompactToolCardProps {
  title: string;
  description: string;
  icon: typeof BookOpen;
  link: string;
}

function CompactToolCard({ title, description, icon: _Icon, link }: CompactToolCardProps) {
  return (
    <Link to={link} className="block group touch-manipulation">
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative overflow-hidden card-surface-interactive rounded-xl h-full min-h-[110px] active:scale-[0.98] transition-all duration-200"
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-30 group-hover:opacity-80 transition-opacity duration-200" />

        <div className="relative z-10 flex flex-col h-full p-3.5 sm:p-4">
          <h3 className="text-[13px] sm:text-sm font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="mt-0.5 text-[11px] sm:text-[12px] text-white leading-tight line-clamp-1">
            {description}
          </p>

          <div className="flex-grow" />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">Open</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Section Header ─────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
      <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
    </div>
  );
}

// ─── Tool Definitions ───────────────────────────────────────────

const toolsAndResources: CompactToolCardProps[] = [
  {
    title: 'AI Study Assistant',
    description: 'Instant help with theory and exams',
    icon: Sparkles,
    link: '/apprentice/advanced-help',
  },
  {
    title: 'Site Diary',
    description: 'Log daily site activities and hours',
    icon: BookMarked,
    link: '/apprentice/site-diary',
  },
  {
    title: 'Electrical Calculators',
    description: 'Cable sizing, voltage drop and more',
    icon: Calculator,
    link: '/apprentice/calculators',
  },
  {
    title: 'On the Job Tools',
    description: 'Quick references for daily work',
    icon: Settings,
    link: '/apprentice/on-job-tools',
  },
  {
    title: 'Mental Health Hub',
    description: 'Wellbeing resources and support',
    icon: Heart,
    link: '/apprentice/mental-health',
  },
  {
    title: 'Career Development',
    description: 'Plan your progression pathway',
    icon: GraduationCap,
    link: '/apprentice/professional-development',
  },
  {
    title: 'Guidance Area',
    description: 'Tips, guides and best practices',
    icon: WrenchIcon,
    link: '/apprentice/toolbox',
  },
];

// ─── Main Page ──────────────────────────────────────────────────

const ApprenticeHub = () => {
  useSEO({
    title: 'Apprentice Hub | Level 2 & 3 Electrical Training',
    description:
      'Complete electrical apprenticeship training platform. Level 2 and Level 3 courses, AM2 exam prep, 2,000+ practice questions, OJT tracking, and industry-recognised qualifications.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Electrical Apprentice Training Hub',
      description:
        'Training hub for UK electrical apprentices pursuing Level 2 and Level 3 qualifications',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
      },
    },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5 sm:space-y-6"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants} className="px-4 sm:px-0">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Hero — compact, left-aligned */}
        <motion.section variants={itemVariants} className="px-4 sm:px-0">
          <ApprenticeHero />
        </motion.section>

        {/* Stats Bar — left-aligned values */}
        <motion.section variants={itemVariants} className="px-4 sm:px-0">
          <ApprenticeStatsBar />
        </motion.section>

        {/* Core Learning — 2 featured cards */}
        <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
          <SectionHeader title="Core Learning" />
          <div className="grid grid-cols-2 gap-3">
            <PrimaryToolCard
              title="Study Centre"
              description="Level 2 & 3 courses, practice questions, and exam prep"
              icon={BookOpen}
              link="/study-centre/apprentice"
            />
            <PrimaryToolCard
              title="Inspection & Testing"
              description="Master I&T with comprehensive guides, quizzes, and BS 7671 regulations"
              icon={ClipboardCheck}
              link="/apprentice/inspection-testing-hub"
            />
          </div>
        </motion.section>

        {/* My Portfolio — single featured card */}
        <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
          <SectionHeader title="My Portfolio" />
          <PrimaryToolCard
            title="My Portfolio"
            description="Track evidence, assessment criteria, OJT hours, and build your apprenticeship portfolio"
            icon={FileText}
            link="/apprentice/hub"
          />
        </motion.section>

        {/* Exam Prep — EPA + AM2 merged into 2-card grid */}
        <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
          <SectionHeader title="Exam Prep" />
          <div className="grid grid-cols-2 gap-3">
            <PrimaryToolCard
              title="EPA Simulator"
              description="Mock Professional Discussions and Knowledge Tests with AI scoring"
              icon={Award}
              link="/apprentice/epa-simulator"
              accent="purple"
            />
            <PrimaryToolCard
              title="AM2 Simulator"
              description="Safe isolation, fault finding, and testing simulations"
              icon={ShieldAlert}
              link="/apprentice/am2-simulator"
              accent="cyan"
            />
          </div>
        </motion.section>

        {/* Elec-ID Banner */}
        <motion.section variants={itemVariants} className="px-4 sm:px-0">
          <ElecIdBanner variant="apprentice" />
        </motion.section>

        {/* Learning Videos */}
        <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
          <SectionHeader title="Learning Videos" />
          <LearningVideosSection />
        </motion.section>

        {/* Tools & Resources — compact grid */}
        <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
          <SectionHeader title="Tools & Resources" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {toolsAndResources.map((tool) => (
              <CompactToolCard key={tool.link} {...tool} />
            ))}
          </div>
        </motion.section>

        {/* Footer spacing for mobile nav */}
        <div className="h-6 sm:h-8" />
      </motion.div>
    </div>
  );
};

export default ApprenticeHub;
