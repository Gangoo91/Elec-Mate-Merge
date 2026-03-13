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
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDashboardData } from '@/hooks/useDashboardData';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import { useAuth } from '@/contexts/AuthContext';
import { ElecIdBanner } from '@/components/elec-id/ElecIdBanner';
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
    <div className="relative overflow-hidden glass-premium rounded-2xl glow-yellow">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
      <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Zap className="h-7 w-7 text-elec-yellow" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-white mb-0.5">{getGreeting()}</p>
            <h1 className="text-xl sm:text-2xl font-bold text-elec-yellow tracking-tight">
              {firstName}
            </h1>
          </div>
        </div>
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
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="touch-manipulation cursor-pointer group w-full"
            aria-label={`View ${stat.label}`}
          >
            <div
              className={cn(
                'rounded-xl p-3 sm:p-4',
                'bg-white/[0.04] border border-white/[0.06]',
                'group-active:bg-white/[0.06]',
                'transition-colors duration-150'
              )}
            >
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon className={cn('h-3.5 w-3.5', accentColor)} />
                  <p className="text-[11px] sm:text-xs text-white">{stat.label}</p>
                </div>
                {stat.formatAsCurrency ? (
                  <span className={cn('text-xl sm:text-2xl font-bold tracking-tight', accentColor)}>
                    {business.formattedQuoteValue}
                  </span>
                ) : (
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    className={cn('text-xl sm:text-2xl font-bold tracking-tight', accentColor)}
                  />
                )}
              </div>
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

function PrimaryToolCard({
  title,
  description,
  icon: Icon,
  link,
  accent = 'yellow',
  badge,
}: PrimaryToolCardProps) {
  const iconBg =
    accent === 'purple'
      ? 'bg-purple-500/10'
      : accent === 'amber'
        ? 'bg-amber-500/10'
        : 'bg-elec-yellow/10';
  const iconColor =
    accent === 'purple'
      ? 'text-purple-400'
      : accent === 'amber'
        ? 'text-amber-400'
        : 'text-elec-yellow';
  const activeBg =
    accent === 'purple'
      ? 'group-active:bg-purple-500/20'
      : accent === 'amber'
        ? 'group-active:bg-amber-500/20'
        : 'group-active:bg-elec-yellow/20';

  return (
    <Link to={link} className="block group touch-manipulation active:opacity-90">
      <motion.div
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="glass-premium rounded-xl h-full min-h-[110px] active:bg-white/[0.02]"
      >
        <div className="p-4 flex flex-col items-center justify-center text-center h-full">
          <div
            className={cn('relative p-2.5 rounded-xl mb-2.5 transition-colors', iconBg, activeBg)}
          >
            <Icon className={cn('h-6 w-6', iconColor)} />
            {badge && (
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[hsl(240,5.9%,10%)]" />
            )}
          </div>
          <h3 className="text-sm font-semibold text-white mb-0.5 group-active:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="text-xs text-white leading-relaxed line-clamp-2">{description}</p>
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

function CompactToolCard({ title, description, icon: Icon, link }: ToolCardProps) {
  return (
    <Link to={link} className="block group touch-manipulation active:opacity-90">
      <motion.div
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="glass-premium rounded-xl h-full min-h-[110px] active:bg-white/[0.02]"
      >
        <div className="p-4 flex flex-col items-center justify-center text-center h-full">
          <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2 group-active:bg-elec-yellow/20 transition-colors">
            <Icon className="h-5 w-5 text-elec-yellow" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-0.5 group-active:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="text-xs text-white line-clamp-2 hidden sm:block">{description}</p>
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
    title: 'Build Partners',
    description: 'AI design & costing specialists',
    icon: Sparkles,
    link: '/electrician/agent-selector',
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

// ─── Main Page ──────────────────────────────────────────────────

const ElectricalHub = () => {
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const { isAgentActive } = useBusinessAIProfile();

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
                title="Mate"
                description="Your business AI agent"
                icon={Wrench}
                link="/electrician/business-ai"
                accent="amber"
                badge={isAgentActive}
              />
              <PrimaryToolCard
                title="AI Tools"
                description="Smart analysis & design"
                icon={Brain}
                link="/electrician-tools/ai-tooling"
                accent="purple"
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
