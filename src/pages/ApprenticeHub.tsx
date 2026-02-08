/**
 * ApprenticeHub
 *
 * Premium apprentice command center with glass morphism styling,
 * real-time stats, and best-in-class mobile experience.
 * Yellow/gold theme throughout.
 */

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import {
  GraduationCap,
  Clock,
  Heart,
  Calculator,
  BookOpen,
  Settings,
  WrenchIcon,
  ClipboardCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Flame,
  Target,
  Award,
  ChevronRight,
  Brain,
  FileText,
  Video,
  BookMarked,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import { ElecIdBanner } from '@/components/elec-id/ElecIdBanner';
import { LearningVideosSection } from '@/components/apprentice/learning-videos/LearningVideosSection';
import { DiaryDashboardWidget } from '@/components/apprentice/site-diary/DiaryDashboardWidget';
import { useVideoInsights } from '@/hooks/apprentice-stats/useVideoInsights';
import { useSiteDiaryEntries } from '@/hooks/site-diary/useSiteDiaryEntries';
import { VideosWatchedDetailSheet } from '@/components/apprentice/stats-detail/VideosWatchedDetailSheet';
import { DiaryEntriesDetailSheet } from '@/components/apprentice/stats-detail/DiaryEntriesDetailSheet';
import { StudyStreakDetailSheet } from '@/components/apprentice/stats-detail/StudyStreakDetailSheet';
import { ProgressDetailSheet } from '@/components/apprentice/stats-detail/ProgressDetailSheet';

// Animation variants - Smooth, fast entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// Premium Hero Component - Centered layout matching main dashboard
function ApprenticeHero() {
  const { user, stats, isLoading } = useApprenticeData();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="relative overflow-hidden glass-premium rounded-2xl glow-yellow">
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      {/* Content - centered layout */}
      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-elec-yellow/10 border-2 border-elec-yellow/20 flex items-center justify-center mb-3">
            <GraduationCap className="h-10 w-10 text-elec-yellow" />
          </div>

          {/* Greeting and Name */}
          <p className="text-sm text-white/50 mb-0.5">
            {getGreeting()}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {user.firstName}
          </h1>

          {/* Status badges - horizontal row */}
          <div className="flex items-center gap-2 mt-3">
            {user.apprenticeYear && (
              <Badge
                variant="outline"
                className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow text-[11px]"
              >
                Year {user.apprenticeYear}
              </Badge>
            )}
            {stats.learning.currentStreak > 0 && (
              <Badge
                variant="outline"
                className="bg-orange-500/10 border-orange-500/30 text-orange-400 text-[11px]"
              >
                <Flame className="w-3 h-3 mr-1" />
                {stats.learning.currentStreak} day streak
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Bar Component - 4 tappable stat cards with detail sheets
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
      variant: 'orange' as const,
      onTap: () => setStreakSheetOpen(true),
    },
    {
      label: 'Progress',
      value: stats.progress.overallPercent,
      suffix: '%',
      icon: Target,
      variant: 'green' as const,
      onTap: () => setProgressSheetOpen(true),
    },
    {
      label: 'Videos',
      value: watchedCount,
      suffix: `/${totalVideos}`,
      icon: Video,
      variant: 'purple' as const,
      onTap: () => setVideosSheetOpen(true),
    },
    {
      label: 'Diary Entries',
      value: entries.length,
      suffix: '',
      icon: BookMarked,
      variant: 'yellow' as const,
      onTap: () => setDiarySheetOpen(true),
    },
  ];

  const variantClasses = {
    yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
    green: { bg: 'bg-green-500/10', text: 'text-green-400' },
  };

  if (isLoading) {
    return (
      <div className="px-4 sm:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[90px] rounded-xl glass-premium animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 sm:px-0"
      >
        {statItems.map((stat) => {
          const colors = variantClasses[stat.variant];
          return (
            <motion.button
              key={stat.label}
              variants={itemVariants}
              whileTap={{ scale: 0.96 }}
              onClick={stat.onTap}
              className="touch-manipulation cursor-pointer w-full"
            >
              <div className="glass-premium rounded-xl p-4 h-[100px] hover:bg-white/[0.04] active:bg-white/[0.02] transition-all">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className={cn('p-2 rounded-lg mb-2', colors.bg)}>
                    <stat.icon className={cn('h-5 w-5', colors.text)} />
                  </div>
                  <div className="flex items-baseline justify-center">
                    <AnimatedCounter
                      value={stat.value}
                      className={cn('text-xl font-bold', colors.text)}
                    />
                    {stat.suffix && (
                      <span className="text-xs text-white/50 ml-0.5">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/60 mt-0.5">{stat.label}</p>
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
      <DiaryEntriesDetailSheet open={diarySheetOpen} onOpenChange={setDiarySheetOpen} entries={entries} />
    </>
  );
}

// Featured Card Component
function FeaturedCard() {
  return (
    <Link to="/apprentice/advanced-help" className="block group touch-manipulation">
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden glass-premium rounded-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-elec-yellow/[0.08] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-6 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-elec-yellow/10 mb-4 group-hover:bg-elec-yellow/20 group-active:bg-elec-yellow/25 transition-colors">
            <Sparkles className="h-8 w-8 text-elec-yellow" />
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
            AI Study Assistant
          </h3>
          <p className="text-sm text-white/70 max-w-md mx-auto mb-4">
            Get instant help with electrical theory, regulations, and exam preparation
          </p>

          <div className="inline-flex items-center gap-2 text-elec-yellow font-medium text-sm group-hover:gap-3 group-active:gap-3 transition-all">
            <span>Start Learning</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Tool Card Component
interface ToolCardProps {
  title: string;
  description: string;
  icon: typeof Clock;
  link: string;
  featured?: boolean;
  badges?: string[];
  comingSoon?: boolean;
}

function ToolCard({ title, description, icon: Icon, link, featured, badges, comingSoon }: ToolCardProps) {
  const cardContent = (
    <motion.div
      whileHover={comingSoon ? {} : { y: -2, scale: 1.01 }}
      whileTap={comingSoon ? {} : { scale: 0.98 }}
      className={cn(
        'relative overflow-hidden glass-premium rounded-xl h-full min-h-[140px]',
        featured && !comingSoon && 'bg-gradient-to-br from-elec-yellow/[0.08] to-transparent',
        comingSoon && 'opacity-60 cursor-not-allowed'
      )}
    >
      {featured && !comingSoon && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
      )}

      {/* Coming Soon banner */}
      {comingSoon && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />
      )}

      <div className="p-4 sm:p-5 flex items-start gap-4">
        <div
          className={cn(
            'flex-shrink-0 p-2.5 rounded-lg transition-colors',
            comingSoon
              ? 'bg-white/10'
              : featured
                ? 'bg-elec-yellow/20 group-hover:bg-elec-yellow/30 group-active:bg-elec-yellow/35 ring-1 ring-elec-yellow/30'
                : 'bg-elec-yellow/10 group-hover:bg-elec-yellow/20 group-active:bg-elec-yellow/25'
          )}
        >
          <Icon className={cn('h-6 w-6 sm:h-7 sm:w-7', comingSoon ? 'text-white/50' : 'text-elec-yellow')} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              'text-base sm:text-lg font-semibold transition-colors',
              comingSoon ? 'text-white/70' : 'text-white group-hover:text-elec-yellow group-active:text-elec-yellow'
            )}>
              {title}
            </h3>
            {comingSoon && (
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">
                Coming Soon
              </Badge>
            )}
          </div>
          <p className={cn('text-sm leading-relaxed line-clamp-2', comingSoon ? 'text-white/50' : 'text-white/70')}>
            {description}
          </p>
          {badges && !comingSoon && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {badges.map((badge, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-[10px] bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {!comingSoon && (
          <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-elec-yellow group-hover:translate-x-1 group-active:text-elec-yellow group-active:translate-x-1 transition-all flex-shrink-0" />
        )}
      </div>
    </motion.div>
  );

  if (comingSoon) {
    return <div className="block touch-manipulation">{cardContent}</div>;
  }

  return (
    <Link to={link} className="block group touch-manipulation">
      {cardContent}
    </Link>
  );
}

// Compact Tool Card for More Resources
function CompactToolCard({ title, description, icon: Icon, link }: ToolCardProps) {
  return (
    <Link to={link} className="block group touch-manipulation">
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glass-premium rounded-xl h-full min-h-[120px] sm:min-h-[130px]"
      >
        <div className="p-4 flex flex-col items-center justify-center text-center h-full">
          <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 group-active:bg-elec-yellow/25 transition-colors">
            <Icon className="h-6 w-6 text-elec-yellow" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-elec-yellow group-active:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="text-xs text-white/60 line-clamp-2 hidden sm:block">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

// Section Header
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
      <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
    </div>
  );
}

// Main resources
const mainResources: ToolCardProps[] = [
  {
    title: 'Study Centre',
    description: 'Level 2 & 3 courses, practice questions, and exam prep',
    icon: BookOpen,
    link: '/study-centre/apprentice',
    featured: true,
    badges: ['2,000+ Questions', 'AM2 Prep'],
  },
  {
    title: 'Inspection & Testing',
    description: 'Master I&T with comprehensive guides, quizzes, and BS 7671 regulations',
    icon: ClipboardCheck,
    link: '/apprentice/inspection-testing-hub',
    featured: true,
    badges: ['8 Topics', 'Interactive', 'Exam Ready'],
  },
  {
    title: 'Electrical Calculators',
    description: 'Cable sizing, voltage drop, fault current and more',
    icon: Calculator,
    link: '/apprentice/calculators',
  },
  {
    title: 'Mental Health Hub',
    description: 'Wellbeing resources, support networks and guidance',
    icon: Heart,
    link: '/apprentice/mental-health',
  },
];

// Additional resources
const additionalResources: ToolCardProps[] = [
  {
    title: 'On the Job Tools',
    description: 'Quick references for daily work',
    icon: Settings,
    link: '/apprentice/on-job-tools',
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
  {
    title: 'Portfolio & OJT',
    description: 'Track hours and evidence',
    icon: Clock,
    link: '/apprentice/hub',
  },
  {
    title: 'Learning Videos',
    description: 'Watch curated electrical content',
    icon: Video,
    link: '/apprentice/learning-videos',
  },
];

const ApprenticeHub = () => {
  // SEO for apprentice hub - high priority for Google ranking
  useSEO({
    title: 'Apprentice Hub | Level 2 & 3 Electrical Training',
    description: 'Complete electrical apprenticeship training platform. Level 2 and Level 3 courses, AM2 exam prep, 2,000+ practice questions, OJT tracking, and industry-recognised qualifications.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Electrical Apprentice Training Hub',
      description: 'Training hub for UK electrical apprentices pursuing Level 2 and Level 3 qualifications',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
      },
    },
  });

  return (
    <div className="bg-[hsl(240,5.9%,10%)]">
        <div className="mx-auto max-w-6xl py-4 md:py-6 lg:py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-8"
          >
            {/* Back Button - Larger touch target */}
            <motion.div variants={itemVariants} className="px-4 sm:px-0">
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Hero */}
            <motion.section variants={itemVariants} className="px-4 sm:px-0">
              <ApprenticeHero />
            </motion.section>

            {/* Stats Bar - Now visible on mobile as carousel */}
            <motion.section variants={itemVariants} className="sm:px-0">
              <ApprenticeStatsBar />
            </motion.section>

            {/* Elec-ID Banner */}
            <motion.section variants={itemVariants} className="px-4 sm:px-0">
              <ElecIdBanner variant="apprentice" />
            </motion.section>

            {/* Featured AI Card */}
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <SectionHeader title="AI-Powered Learning" />
              <FeaturedCard />
            </motion.section>

            {/* Learning Videos - Above Essential Tools */}
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <SectionHeader title="Learning Videos" />
              <LearningVideosSection />
            </motion.section>

            {/* Essential Tools - includes Site Diary as a card */}
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <SectionHeader title="Essential Tools" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 touch-grid">
                {mainResources.map((resource) => (
                  <ToolCard key={resource.link} {...resource} />
                ))}
                <ToolCard
                  title="Site Diary"
                  description="Log daily site activities, track hours and build evidence"
                  icon={BookMarked}
                  link="/apprentice/site-diary"
                />
              </div>
            </motion.section>

            {/* More Resources */}
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <SectionHeader title="More Resources" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 touch-grid">
                {additionalResources.map((resource) => (
                  <CompactToolCard key={resource.link} {...resource} />
                ))}
              </div>
            </motion.section>

            {/* Footer spacing for mobile nav */}
            <div className="h-6 sm:h-8" />
          </motion.div>
        </div>
    </div>
  );
};

export default ApprenticeHub;
