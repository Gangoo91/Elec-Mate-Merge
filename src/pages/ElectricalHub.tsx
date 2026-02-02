/**
 * ElectricalHub
 *
 * Premium electrician command center with glass morphism styling,
 * real-time business stats, and best-in-class mobile experience.
 * Yellow/gold theme throughout.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import {
  Zap,
  Brain,
  Shield,
  Calculator,
  FileText,
  PoundSterling,
  Briefcase,
  Wrench,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle,
  Receipt,
  MessageSquare,
  BadgeCheck,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDashboardData } from '@/hooks/useDashboardData';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import { useAuth } from '@/contexts/AuthContext';
import { ElecIdBanner } from '@/components/elec-id/ElecIdBanner';
import { ElecAiBanner } from '@/components/elec-ai/ElecAiBanner';
import { SetupWizard } from '@/components/onboarding/SetupWizard';
import { SetupIncompleteBanner } from '@/components/onboarding/SetupIncompleteBanner';
import { LatestJobsWidget } from '@/components/job-vacancies/LatestJobsWidget';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { Users } from 'lucide-react';

// Email whitelist for Worker Tools (beta testing)
const EMPLOYER_ALLOWED_EMAILS = [
  'founder@elec-mate.com',
  'andrewgangoo91@gmail.com',
];

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
function ElectricalHero() {
  const { profile } = useAuth();
  const { business } = useDashboardData();

  const firstName = profile?.full_name?.split(' ')[0] || 'Electrician';

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
            <Zap className="h-10 w-10 text-elec-yellow" />
          </div>

          {/* Greeting and Name */}
          <p className="text-sm text-white/50 mb-0.5">
            {getGreeting()}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {firstName}
          </h1>

          {/* Status badges - horizontal row */}
          <div className="flex items-center gap-2 mt-3">
            {business.activeQuotes > 0 && (
              <Badge
                variant="outline"
                className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow text-[11px]"
              >
                <FileText className="w-3 h-3 mr-1" />
                {business.activeQuotes} quotes
              </Badge>
            )}
            {business.overdueInvoices > 0 ? (
              <Badge
                variant="outline"
                className="bg-red-500/10 border-red-500/30 text-red-400 text-[11px]"
              >
                <AlertCircle className="w-3 h-3 mr-1" />
                {business.overdueInvoices} overdue
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-green-500/10 border-green-500/30 text-green-400 text-[11px]"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                All paid
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Bar Component
function ElectricalStatsBar() {
  const { business, certificates, isLoading } = useDashboardData();
  const navigate = useNavigate();

  const statItems = [
    {
      label: 'Active Quotes',
      value: business.activeQuotes,
      icon: FileText,
      navigateTo: '/electrician/quotes',
    },
    {
      label: 'Quote Value',
      value: business.quoteValue,
      prefix: '£',
      formatAsCurrency: true,
      icon: PoundSterling,
      navigateTo: '/electrician/quotes',
    },
    {
      label: 'Certificates',
      value: certificates.total,
      icon: Zap,
      navigateTo: '/electrician/inspection-testing',
    },
    {
      label: 'Overdue',
      value: business.overdueInvoices,
      icon: business.overdueInvoices === 0 ? CheckCircle : AlertCircle,
      variant: business.overdueInvoices === 0 ? 'success' : 'danger',
      navigateTo: business.overdueInvoices > 0
        ? '/electrician/invoices?filter=overdue'
        : '/electrician/invoices',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[85px] rounded-xl glass-premium animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-4 gap-3"
    >
      {statItems.map((stat) => {
        const Icon = stat.icon;
        const isSuccess = stat.variant === 'success';
        const isDanger = stat.variant === 'danger';

        return (
          <motion.button
            key={stat.label}
            onClick={() => navigate(stat.navigateTo)}
            variants={itemVariants}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="touch-manipulation cursor-pointer group w-full"
            aria-label={`View ${stat.label}`}
          >
            <div className={cn(
              'glass-premium rounded-xl p-4 h-[100px]',
              'group-hover:bg-white/[0.04] group-active:bg-white/[0.02]',
              'transition-all duration-200',
              'group-hover:shadow-lg group-hover:shadow-elec-yellow/5'
            )}>
              <div className="flex flex-col items-center justify-center h-full text-center">
                {/* Icon */}
                <div className={cn(
                  'p-2 rounded-lg mb-2 transition-colors',
                  isSuccess ? 'bg-green-500/10 group-hover:bg-green-500/20' : isDanger ? 'bg-red-500/10 group-hover:bg-red-500/20' : 'bg-elec-yellow/10 group-hover:bg-elec-yellow/20'
                )}>
                  <Icon className={cn(
                    'h-5 w-5',
                    isSuccess ? 'text-green-500' : isDanger ? 'text-red-500' : 'text-elec-yellow'
                  )} />
                </div>
                {/* Value and label - centered */}
                {stat.formatAsCurrency ? (
                  <span className={cn(
                    'text-xl font-bold',
                    isSuccess ? 'text-green-500' : isDanger ? 'text-red-500' : 'text-elec-yellow'
                  )}>
                    {business.formattedQuoteValue}
                  </span>
                ) : (
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    className={cn(
                      'text-xl font-bold',
                      isSuccess ? 'text-green-500' : isDanger ? 'text-red-500' : 'text-elec-yellow'
                    )}
                  />
                )}
                <p className="text-[11px] text-white/60 mt-0.5">
                  {stat.label}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

// Featured Card Component
function FeaturedCard() {
  return (
    <Link to="/electrician/agent-selector" className="block group touch-manipulation active:opacity-90">
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative overflow-hidden glass-premium rounded-2xl active:bg-white/[0.02]"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-elec-yellow/[0.08] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-6 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-elec-yellow/10 mb-4 group-hover:bg-elec-yellow/20 group-active:bg-elec-yellow/25 transition-colors">
            <Sparkles className="h-8 w-8 text-elec-yellow" />
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Build Partners
          </h3>
          <p className="text-sm text-white/70 max-w-md mx-auto mb-4">
            AI specialists for circuit design, costing, installation, safety, testing & project management
          </p>

          <div className="inline-flex items-center gap-2 text-elec-yellow font-medium text-sm group-hover:gap-3 group-active:gap-3 transition-all">
            <span>Choose Partner</span>
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
  icon: typeof Zap;
  link: string;
}

function ToolCard({ title, description, icon: Icon, link }: ToolCardProps) {
  return (
    <Link to={link} className="block group touch-manipulation active:opacity-90">
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="glass-premium rounded-xl h-full min-h-[140px] active:bg-white/[0.02]"
      >
        <div className="p-4 sm:p-5 flex items-start gap-4">
          <div className="flex-shrink-0 p-2.5 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 group-active:bg-elec-yellow/25 transition-colors">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-elec-yellow group-active:text-elec-yellow transition-colors">
              {title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-elec-yellow group-hover:translate-x-1 group-active:text-elec-yellow group-active:translate-x-1 transition-all flex-shrink-0" />
        </div>
      </motion.div>
    </Link>
  );
}

// Compact Tool Card
function CompactToolCard({ title, description, icon: Icon, link }: ToolCardProps) {
  return (
    <Link to={link} className="block group touch-manipulation active:opacity-90">
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="glass-premium rounded-xl h-full min-h-[120px] sm:min-h-[130px] active:bg-white/[0.02]"
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

// Main resources - Core Daily Tools
const mainResources: ToolCardProps[] = [
  {
    title: 'Inspection & Testing',
    description: 'EICR, EIC & Minor Works certificates',
    icon: Zap,
    link: '/electrician/inspection-testing',
  },
  {
    title: 'Quote Builder',
    description: 'Create professional quotes',
    icon: FileText,
    link: '/electrician/quotes',
  },
  {
    title: 'AI Tooling',
    description: 'Smart analysis and design tools',
    icon: Brain,
    link: '/electrician-tools/ai-tooling',
  },
  {
    title: 'Invoices',
    description: 'Manage billing & payments',
    icon: PoundSterling,
    link: '/electrician/invoices',
  },
  {
    title: 'Expenses',
    description: 'Track receipts & mileage',
    icon: Receipt,
    link: '/electrician/expenses',
  },
  {
    title: 'Site Safety & RAMS',
    description: 'Risk assessments and method statements',
    icon: Shield,
    link: '/electrician/site-safety',
  },
  {
    title: 'Electrical Calculations',
    description: 'Cable sizing, voltage drop and more',
    icon: Calculator,
    link: '/electrician/calculations',
  },
];

// Company resources - employer integration features (Hidden until employer area launches)
// const companyResources: ToolCardProps[] = [
//   {
//     title: 'My Expenses',
//     description: 'Submit & track claims',
//     icon: Receipt,
//     link: '/employer?section=expenses',
//   },
//   {
//     title: 'Timesheets',
//     description: 'Log work hours',
//     icon: Clock,
//     link: '/employer?section=timesheets',
//   },
//   {
//     title: 'Team Comms',
//     description: 'Messages & updates',
//     icon: MessageSquare,
//     link: '/employer?section=comms',
//   },
//   {
//     title: 'My Elec-ID',
//     description: 'Professional profile',
//     icon: BadgeCheck,
//     link: '/employer?section=elecid',
//   },
// ];

// Additional resources - business development (Quote Builder & Invoices moved to Core Daily Tools)
const additionalResources: ToolCardProps[] = [
  {
    title: 'Business Hub',
    description: 'Business management',
    icon: Briefcase,
    link: '/electrician/business',
  },
  {
    title: 'Live Pricing',
    description: 'Market rates',
    icon: PoundSterling,
    link: '/electrician/live-pricing',
  },
  {
    title: 'Industry Updates',
    description: 'News and changes',
    icon: Wrench,
    link: '/electrician/safety-shares/news',
  },
  {
    title: 'Career Progression',
    description: 'Plan your pathway',
    icon: GraduationCap,
    link: '/electrician/career-progression',
  },
];

const ElectricalHub = () => {
  const [showSetupWizard, setShowSetupWizard] = useState(false);

  // SEO for electrician hub - high priority for Google ranking
  useSEO({
    title: 'Electrician Tools & Certificates | BS 7671 Compliant',
    description: 'Professional tools for UK electricians: cable calculators, voltage drop, EICR/EIC/Minor Works certificates, 5 AI specialists, cost engineering, and 60+ electrical calculators. BS 7671 18th Edition compliant.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Electrician Professional Tools',
      description: 'Suite of professional electrical tools and certification software for UK electricians',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
      },
    },
  });

  // Check if onboarding is complete and get user email
  const { data: profileData } = useQuery({
    queryKey: ['onboarding-check-with-email'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single();

      return { profile: data, email: user.email };
    },
  });

  const profile = profileData?.profile;
  const userEmail = profileData?.email;
  const isWhitelistedEmail = userEmail && EMPLOYER_ALLOWED_EMAILS.includes(userEmail);

  // Check if user has an employee record (for Worker Tools)
  // Also show for whitelisted emails for testing
  const { data: employeeRecord } = useMyEmployeeRecord();
  const showWorkerTools = employeeRecord || isWhitelistedEmail;

  useEffect(() => {
    // Show wizard if onboarding not complete and not already shown this session
    if (profile && !profile.onboarding_completed) {
      const hasSeenWizard = sessionStorage.getItem('setup_wizard_shown');
      if (!hasSeenWizard) {
        setShowSetupWizard(true);
        sessionStorage.setItem('setup_wizard_shown', 'true');
      }
    }
  }, [profile]);

  return (
    <div className="bg-[hsl(240,5.9%,10%)]">
      <div className="mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-6"
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
              <ElectricalHero />
            </motion.section>

            {/* Stats Bar - Now visible on mobile as carousel */}
            <motion.section variants={itemVariants} className="sm:px-0">
              <ElectricalStatsBar />
            </motion.section>

            {/* Elec-ID Banner */}
            <motion.section variants={itemVariants} className="px-4 sm:px-0">
              <ElecIdBanner variant="electrician" />
            </motion.section>

            {/* Elec-AI Banner */}
            <motion.section variants={itemVariants} className="px-4 sm:px-0">
              <ElecAiBanner />
            </motion.section>

            {/* Setup Incomplete Banner */}
            <motion.section variants={itemVariants} className="px-4 sm:px-0">
              <SetupIncompleteBanner />
            </motion.section>

            {/* Featured AI Card */}
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <SectionHeader title="AI-Powered Tools" />
              <FeaturedCard />
            </motion.section>

            {/* Core Daily Tools */}
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <SectionHeader title="Core Daily Tools" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 touch-grid">
                {mainResources.map((resource) => (
                  <ToolCard key={resource.link} {...resource} />
                ))}
                {/* Worker Tools - visible when user has employee record or is whitelisted */}
                {showWorkerTools && (
                  <ToolCard
                    title="Worker Tools"
                    description="Status, timesheets, leave & comms"
                    icon={Users}
                    link="/electrician/worker-tools"
                  />
                )}
              </div>
            </motion.section>

            {/* Company - Employer Integration (Hidden until employer area launches)
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <div className="flex items-center gap-2 px-1">
                <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Company</h2>
                <span className="text-xs text-white/50 ml-1">Employer tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 touch-grid">
                {companyResources.map((resource) => (
                  <CompactToolCard key={resource.link} {...resource} />
                ))}
              </div>
            </motion.section>
            */}

            {/* Business & Development */}
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <SectionHeader title="Business & Development" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 touch-grid">
                {additionalResources.map((resource) => (
                  <CompactToolCard key={resource.link} {...resource} />
                ))}
              </div>
            </motion.section>

            {/* Latest Jobs */}
            <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
              <SectionHeader title="Career Opportunities" />
              <LatestJobsWidget />
            </motion.section>

            {/* Footer spacing for mobile nav */}
            <div className="h-6 sm:h-8" />
          </motion.div>
      </div>

      {/* Setup Wizard */}
      <SetupWizard
        isOpen={showSetupWizard}
        onComplete={() => setShowSetupWizard(false)}
        onSkip={() => setShowSetupWizard(false)}
      />
    </div>
  );
};

export default ElectricalHub;
