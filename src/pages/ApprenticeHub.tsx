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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

// Premium Hero Component
function ApprenticeHero() {
  const { user, stats, isLoading } = useApprenticeData();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden glass-premium rounded-2xl glow-yellow"
    >
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <GraduationCap className="h-8 w-8 text-elec-yellow" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-elec-yellow mb-1">
              <Sparkles className="h-3 w-3" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">
                Apprentice Hub
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
              <span className="hidden sm:inline">{getGreeting()}, </span>
              <span className="text-elec-yellow">{user.firstName}</span>
            </h1>

            <p className="text-sm text-white/70 mt-1">
              Your command center for apprenticeship success
            </p>

            {/* Status badges */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
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
      </div>
    </motion.div>
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
              <div className="flex items-start justify-between gap-2">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <stat.icon className="h-4 w-4 text-elec-yellow" />
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end">
                    <AnimatedCounter
                      value={stat.value}
                      className="text-xl font-bold text-elec-yellow"
                    />
                    {stat.suffix && (
                      <span className="text-xs text-white/50 ml-0.5">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
                </div>
              </div>
              {stat.progress !== undefined && (
                <div className="mt-3 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(stat.progress, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full bg-elec-yellow rounded-full"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination dots - mobile only */}
      <div className="flex justify-center gap-1.5 mt-3 sm:hidden">
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
            className={cn(
              'transition-all duration-200',
              i === activeIndex
                ? 'w-4 h-1.5 rounded-full bg-elec-yellow'
                : 'w-1.5 h-1.5 rounded-full bg-white/20'
            )}
            aria-label={`View ${statItems[i].label}`}
          />
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
          <div className="inline-flex p-3 rounded-2xl bg-elec-yellow/10 mb-4 group-hover:bg-elec-yellow/20 transition-colors">
            <Sparkles className="h-8 w-8 text-elec-yellow" />
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
            AI Study Assistant
          </h3>
          <p className="text-sm text-white/70 max-w-md mx-auto mb-4">
            Get instant help with electrical theory, regulations, and exam preparation
          </p>

          <div className="inline-flex items-center gap-2 text-elec-yellow font-medium text-sm group-hover:gap-3 transition-all">
            <span>Start Learning</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
}

function ToolCard({ title, description, icon: Icon, link, featured, badges }: ToolCardProps) {
  return (
    <Link to={link} className="block group touch-manipulation">
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative overflow-hidden glass-premium rounded-xl h-full min-h-[140px]',
          featured && 'bg-gradient-to-br from-elec-yellow/[0.08] to-transparent'
        )}
      >
        {featured && (
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
        )}

        <div className="p-4 sm:p-5 flex items-start gap-4">
          <div
            className={cn(
              'flex-shrink-0 p-2.5 rounded-lg transition-colors',
              featured
                ? 'bg-elec-yellow/20 group-hover:bg-elec-yellow/30 ring-1 ring-elec-yellow/30'
                : 'bg-elec-yellow/10 group-hover:bg-elec-yellow/20'
            )}
          >
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors">
              {title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
              {description}
            </p>
            {badges && (
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

          <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all flex-shrink-0" />
        </div>
      </motion.div>
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
          <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors">
            <Icon className="h-6 w-6 text-elec-yellow" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors">
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
  const { refetch } = useApprenticeData();

  const handleRefresh = async () => {
    await refetch?.();
    // Small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  return (
    <div className="min-h-screen bg-[hsl(240,5.9%,10%)] flex flex-col">
      {/* Pull-to-refresh container */}
      <div className="flex-1 overflow-y-auto momentum-scroll-y">
        <div className="mx-auto max-w-6xl py-4 md:py-6 lg:py-8 pb-safe">
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
                  className="text-white/70 hover:text-white hover:bg-white/[0.05] -ml-2 h-11 touch-manipulation"
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
    </div>
  );
};

export default ApprenticeHub;
