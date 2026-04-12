/**
 * ElectricalHub
 *
 * Premium electrician command centre with glass morphism styling,
 * real-time business stats, and best-in-class mobile experience.
 * Yellow/gold theme throughout. Tools-first layout.
 */

import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDashboardData } from '@/hooks/useDashboardData';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import { useAuth } from '@/contexts/AuthContext';
import { ElecIdBanner } from '@/components/elec-id/ElecIdBanner';
import { ElecAiBanner } from '@/components/elec-ai/ElecAiBanner';
import { SetupWizard } from '@/components/onboarding/SetupWizard';
import { SetupIncompleteBanner } from '@/components/onboarding/SetupIncompleteBanner';
import { LatestJobsWidget } from '@/components/job-vacancies/LatestJobsWidget';
import { useBusinessAIProfile } from '@/components/business-ai/useBusinessAIProfile';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';

const EMPLOYER_ALLOWED_EMAILS = ['founder@elec-mate.com', 'andrewgangoo91@gmail.com'];

// Animation variants
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
// Left-aligned, compact. Glass card with yellow glow.

function ElectricalHero() {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(' ')[0] || 'Electrician';

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
          {firstName}
        </h1>
      </div>
    </div>
  );
}

// ─── Stats Bar ──────────────────────────────────────────────────

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
      navigateTo:
        business.overdueInvoices > 0
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
        const accentColor = isSuccess
          ? 'text-green-500'
          : isDanger
            ? 'text-red-500'
            : 'text-elec-yellow';

        return (
          <motion.button
            key={stat.label}
            onClick={() => navigate(stat.navigateTo)}
            variants={itemVariants}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="touch-manipulation cursor-pointer group w-full text-left"
            aria-label={`View ${stat.label}`}
          >
            <div className="rounded-2xl px-4 py-3 sm:py-4 bg-white/[0.03] border border-white/[0.06] group-active:bg-white/[0.06] transition-colors duration-150">
              <p className="text-[11px] text-white mb-1 uppercase tracking-wider font-medium">{stat.label}</p>
              {stat.formatAsCurrency ? (
                <span className={cn('text-2xl sm:text-3xl font-bold tracking-tight', accentColor)}>
                  {business.formattedQuoteValue}
                </span>
              ) : (
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  className={cn('text-2xl sm:text-3xl font-bold tracking-tight', accentColor)}
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

// ─── Primary Tool Card (2-col grid) ─────────────────────────────

interface PrimaryToolCardProps {
  title: string;
  description: string;
  icon: typeof Zap;
  link: string;
  accent?: 'yellow' | 'amber' | 'purple';
  badge?: boolean;
}

function PrimaryToolCard({ title, description, link }: PrimaryToolCardProps) {
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

// ─── Compact Tool Card (secondary section) ──────────────────────

interface ToolCardProps {
  title: string;
  description: string;
  icon: typeof Zap;
  link: string;
}

function CompactToolCard({ title, description, link }: ToolCardProps) {
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

const secondaryTools: ToolCardProps[] = [
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

// ─── Main Page ──────────────────────────────────────────────────

const ElectricalHub = () => {
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  // WhatsApp Mate AI hidden for launch — re-enable when ready
  // const { isAgentActive, businessAiEnabled } = useBusinessAIProfile();

  useSEO({
    title: 'Electrician Tools & Certificates | BS 7671 Compliant',
    description:
      'Professional tools for UK electricians: cable calculators, voltage drop, EICR/EIC/Minor Works certificates, 5 AI specialists, cost engineering, and 60+ electrical calculators. BS 7671 18th Edition compliant.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Electrician Professional Tools',
      description:
        'Suite of professional electrical tools and certification software for UK electricians',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
      },
    },
  });

  const { data: profileData } = useQuery({
    queryKey: ['onboarding-check-with-email'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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

  const { data: employeeRecord } = useMyEmployeeRecord();
  const showWorkerTools = employeeRecord || isWhitelistedEmail;

  useEffect(() => {
    if (!profile || profile.onboarding_completed) return;
    // Only show the setup wizard once the user actually has access — paying
    // subscribers, RevenueCat-entitled users, or internal free-access accounts.
    // This prevents a trial-escape user from being able to complete the wizard
    // and flip `onboarding_completed = true` before they have paid.
    const hasAccess = profile.subscribed || profile.free_access_granted;
    if (!hasAccess) return;
    const hasSeenWizard = sessionStorage.getItem('setup_wizard_shown');
    if (!hasSeenWizard) {
      setShowSetupWizard(true);
      sessionStorage.setItem('setup_wizard_shown', 'true');
    }
  }, [profile]);

  return (
    <div className="bg-background">
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
            <ElectricalHero />
          </motion.section>

          {/* Primary Tools — 2-col grid, tools visible in first screenful */}
          <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
            <SectionHeader title="Core Tools" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <PrimaryToolCard
                title="Certificates"
                description="EICR, EIC & Minor Works"
                icon={Zap}
                link="/electrician/inspection-testing"
              />
              <PrimaryToolCard
                title="Business"
                description="Quotes, invoices & customers"
                icon={Briefcase}
                link="/electrician/business"
              />
              <PrimaryToolCard
                title="Calculations"
                description="Cable sizing, voltage drop"
                icon={Calculator}
                link="/electrician/calculations"
              />
              <PrimaryToolCard
                title="Site Safety"
                description="Risk assessments & RAMS"
                icon={Shield}
                link="/electrician/site-safety"
              />
              <PrimaryToolCard
                title="Build Partners"
                description="AI design & costing"
                icon={Sparkles}
                link="/electrician/agent-selector"
              />
              <PrimaryToolCard
                title="AI Tools"
                description="Smart analysis & design"
                icon={Brain}
                link="/electrician-tools/ai-tooling"
              />
            </div>
          </motion.section>

          {/* Stats — moved below tools */}
          <motion.section variants={itemVariants} className="px-4 sm:px-0">
            <ElectricalStatsBar />
          </motion.section>

          {/* Banners — below tools, not blocking access */}
          <motion.section variants={itemVariants} className="px-4 sm:px-0">
            <ElecIdBanner variant="electrician" />
          </motion.section>

          <motion.section variants={itemVariants} className="px-4 sm:px-0">
            <SetupIncompleteBanner />
          </motion.section>

          {/* Elec-AI Chat Assistant */}
          <motion.section variants={itemVariants} className="px-4 sm:px-0">
            <ElecAiBanner />
          </motion.section>

          {/* Secondary Tools */}
          <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
            <SectionHeader title="More Tools" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {secondaryTools.map((tool) => (
                <CompactToolCard key={tool.link} {...tool} />
              ))}
              {showWorkerTools && (
                <CompactToolCard
                  title="Worker Tools"
                  description="Status, timesheets & leave"
                  icon={Users}
                  link="/electrician/worker-tools"
                />
              )}
            </div>
          </motion.section>

          {/* Career Opportunities */}
          <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
            <SectionHeader title="Career Opportunities" />
            <LatestJobsWidget />
          </motion.section>

          <div className="h-6 sm:h-8" />
        </motion.div>
      </div>

      <SetupWizard
        isOpen={showSetupWizard}
        onComplete={() => setShowSetupWizard(false)}
        onSkip={() => setShowSetupWizard(false)}
      />
    </div>
  );
};

export default ElectricalHub;
