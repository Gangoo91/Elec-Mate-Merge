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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import { ElecIdBanner } from '@/components/elec-id/ElecIdBanner';

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

// Premium Hero Component
function ApprenticeHero() {
  const { user, stats, isLoading } = useApprenticeData();

  return (
    <div className="relative overflow-hidden glass-premium rounded-2xl glow-yellow">
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 p-4 sm:p-5">
        {/* Header label */}
        <div className="flex items-center gap-1.5 text-elec-yellow mb-3">
          <Sparkles className="h-3 w-3" />
          <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">
            Apprentice Hub
          </span>
        </div>

        {/* Main content row - icon and text aligned */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-elec-yellow" />
          </div>

          {/* Text - vertically centered with icon */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h1 className="text-xl sm:text-2xl font-bold text-elec-yellow leading-tight">
              {user.firstName.toUpperCase()}
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-0.5">
              Your command center for apprenticeship success
            </p>
          </div>
        </div>

        {/* Status badges - aligned below */}
        <div className="flex items-center gap-2 mt-4 pl-20">
          {user.apprenticeYear && (
            <Badge
              variant="outline"
              className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow text-[10px] sm:text-xs"
            >
              Year {user.apprenticeYear}
            </Badge>
          )}
          {stats.learning.currentStreak > 0 && (
            <Badge
              variant="outline"
              className="bg-orange-500/10 border-orange-500/30 text-orange-400 text-[10px] sm:text-xs"
            >
              <Flame className="w-3 h-3 mr-1" />
              {stats.learning.currentStreak} day streak
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

// Stats Bar Component
function ApprenticeStatsBar() {
  const { stats, isLoading } = useApprenticeData();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const statItems = [
    {
      label: 'OJT Hours',
      value: stats.ojtHours.logged,
      suffix: ` / ${stats.ojtHours.target}`,
      icon: Clock,
      progress: stats.ojtHours.percentComplete,
    },
    {
      label: 'Study Streak',
      value: stats.learning.currentStreak,
      suffix: ' days',
      icon: Flame,
    },
    {
      label: 'Portfolio',
      value: stats.portfolio.evidenceCount,
      suffix: ' items',
      icon: FileText,
    },
    {
      label: 'Progress',
      value: stats.progress.overallPercent,
      suffix: '%',
      icon: Target,
      progress: stats.progress.overallPercent,
    },
  ];

  // Track scroll position for pagination dots
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 140 + 12; // width + gap
    const newIndex = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(newIndex, statItems.length - 1)));
  };

  if (isLoading) {
    return (
      <div className="px-4 sm:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[100px] rounded-xl glass-premium animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.div
        ref={scrollRef}
        onScroll={handleScroll}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          // Mobile: horizontal scroll carousel
          'flex gap-3 overflow-x-auto pb-2 -mx-4 px-4',
          'snap-x snap-mandatory scrollbar-hide momentum-scroll-x',
          // Desktop: grid layout
          'sm:grid sm:grid-cols-4 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0'
        )}
      >
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'flex-shrink-0 w-[140px] snap-start touch-manipulation',
              index === statItems.length - 1 && 'mr-4 sm:mr-0',
              'sm:w-full'
            )}
          >
            <div className="glass-premium rounded-xl p-4 h-[100px]">
              <div className="flex flex-col h-full">
                {/* Icon row */}
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-elec-yellow/10">
                    <stat.icon className="h-4 w-4 text-elec-yellow" />
                  </div>
                </div>
                {/* Value and label - left aligned */}
                <div className="flex-1 flex flex-col justify-end">
                  <div className="flex items-baseline">
                    <AnimatedCounter
                      value={stat.value}
                      className="text-xl sm:text-2xl font-bold text-elec-yellow"
                    />
                    {stat.suffix && (
                      <span className="text-xs text-white/50 ml-1">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
                </div>
                {/* Progress bar */}
                {stat.progress !== undefined && (
                  <div className="mt-2 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(stat.progress, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full bg-elec-yellow rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination dots - mobile only */}
      <div className="flex justify-center gap-0.5 mt-3 sm:hidden">
        {statItems.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (el) {
                const cardWidth = 140 + 12;
                el.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
              }
            }}
            className="min-h-11 min-w-8 flex items-center justify-center touch-manipulation active:scale-95"
            aria-label={`View ${statItems[i].label}`}
          >
            <span
              className={cn(
                'transition-all duration-200',
                i === activeIndex
                  ? 'w-5 h-2 rounded-full bg-elec-yellow'
                  : 'w-2 h-2 rounded-full bg-white/20'
              )}
            />
          </button>
        ))}
      </div>
    </div>
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
    title: 'Electrical Calculators',
    description: 'Cable sizing, voltage drop, fault current and more',
    icon: Calculator,
    link: '/apprentice/calculators',
  },
  {
    title: 'Portfolio & OJT',
    description: 'Track hours, log evidence, manage your apprenticeship',
    icon: Clock,
    link: '/apprentice/hub',
    featured: true,
    badges: ['Portfolio', 'OJT Hours', 'Goals'],
    comingSoon: true,
  },
  {
    title: 'Mental Health Hub',
    description: 'Wellbeing resources, support networks and guidance',
    icon: Heart,
    link: '/apprentice/mental-health',
  },
  {
    title: 'Inspection & Testing',
    description: 'Master I&T with comprehensive guides, quizzes, and BS 7671 regulations',
    icon: ClipboardCheck,
    link: '/apprentice/inspection-testing-hub',
    featured: true,
    badges: ['8 Topics', 'Interactive', 'Exam Ready'],
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
    title: 'Guidance Area',
    description: 'Tips, guides and best practices',
    icon: WrenchIcon,
    link: '/apprentice/toolbox',
  },
  {
    title: 'Career Development',
    description: 'Plan your progression pathway',
    icon: GraduationCap,
    link: '/apprentice/professional-development',
  },
  {
    title: 'Study Centre',
    description: 'Training materials and quizzes',
    icon: BookOpen,
    link: '/study-centre/apprentice',
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

            {/* Essential Tools */}
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <SectionHeader title="Essential Tools" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 touch-grid">
                {mainResources.map((resource) => (
                  <ToolCard key={resource.link} {...resource} />
                ))}
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
