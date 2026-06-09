/**
 * ElectricalHub — composed from the same editorial primitives as the main
 * Dashboard (VerdictHero + HeadlineStats + hairline-grid hub cards).
 *
 * Structure mirrors EditorialDashboard:
 *   ——   VerdictHero       — greeting + verdict + CTA
 *   01   AT A GLANCE       — HeadlineStats (live business KPIs)
 *   02   CORE TOOLS        — hairline grid of tool cards
 *   03   IDENTITY          — Elec-ID + Elec-AI cards
 *   04   STAY CURRENT      — Industry / Career / Worker tools
 *   05   LATEST JOBS       — LatestJobsWidget (matching grid)
 *
 * Hairline grid: gap-px + bg-white/[0.06] background + bg-[hsl(0_0%_10%)]
 * cells + yellow hairline along the top. One yellow accent per row max.
 */

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { useDashboardData, DashboardDataProvider, useSharedDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { HeadlineStats } from '@/components/dashboard/editorial/HeadlineStats';
import { SetupWizard } from '@/components/onboarding/SetupWizard';
import { LatestJobsWidget } from '@/components/job-vacancies/LatestJobsWidget';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// ────────────────────────────────────────────────────────────────────────
// EditorialToolGrid — same hairline-grid DNA as EditorialHubGrid, smaller.
// Each cell: index + eyebrow + title + description + meta + Open arrow.
// ────────────────────────────────────────────────────────────────────────

interface ToolCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  meta?: string;
  comingSoon?: boolean;
}

// ────────────────────────────────────────────────────────────────────────
// Date eyebrow — same shape as CollegeOverviewSection
// ────────────────────────────────────────────────────────────────────────

const partOfDay = (): 'MORNING' | 'AFTERNOON' | 'EVENING' => {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 18) return 'AFTERNOON';
  return 'EVENING';
};

const dateEyebrow = (): string => {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();
  return `${weekday} · ${day} ${month} · ${partOfDay()}`;
};

// ────────────────────────────────────────────────────────────────────────
// Page masthead — sticky text-only nav, exact pattern from CollegeDashboard
// ────────────────────────────────────────────────────────────────────────

const PageMasthead = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center h-12 gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
          >
            ← Back
          </button>
          <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
              Electrician
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
            <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
              Electrician Hub
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Hero — exact pattern from CollegeOverviewSection
// ────────────────────────────────────────────────────────────────────────

const Hero = ({
  firstName,
  verdict,
  cta,
}: {
  firstName: string;
  verdict: string;
  cta?: { label: string; href: string };
}) => (
  <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="relative pt-2 sm:pt-4"
  >
    <motion.div variants={itemVariants}>
      <Eyebrow>{dateEyebrow()}</Eyebrow>
    </motion.div>

    <motion.h1
      variants={itemVariants}
      className="mt-3 font-semibold tracking-tight leading-[1.05] text-[34px] sm:text-[44px] lg:text-[56px]"
    >
      <span className="text-elec-yellow">Hello, </span>
      <span className="text-white uppercase">{firstName}.</span>
    </motion.h1>

    <motion.p
      variants={itemVariants}
      className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
    >
      {verdict}
    </motion.p>

    {cta && (
      <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
        <Link
          to={cta.href}
          className={cn(
            'group inline-flex items-center gap-2 h-10 px-4 rounded-full',
            'border border-elec-yellow/25 bg-elec-yellow/10 hover:bg-elec-yellow/20',
            'text-[13px] font-medium text-elec-yellow touch-manipulation transition-colors'
          )}
        >
          <span>{cta.label}</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>
    )}
  </motion.section>
);

const EditorialToolGrid = ({
  number,
  label,
  cards,
  columns = 'three',
  trailing,
}: {
  number: string;
  label: string;
  cards: ToolCard[];
  columns?: 'two' | 'three';
  trailing?: React.ReactNode;
}) => {
  const navigate = useNavigate();
  if (cards.length === 0) return null;

  const colClass =
    columns === 'two'
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
        <Eyebrow>
          {number} · {label}
        </Eyebrow>
        {trailing}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          'relative grid auto-rows-[220px] sm:auto-rows-[240px] gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden',
          colClass
        )}
      >
        {/* Yellow hairline ceiling */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

        {cards.map((card, i) => (
          <button
            key={card.id}
            type="button"
            onClick={() => navigate(card.to)}
            className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors p-5 sm:p-6 lg:p-7 text-left touch-manipulation flex flex-col h-full"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  · {card.eyebrow}
                </span>
              </div>
              {card.comingSoon && (
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/10 px-1.5 py-0.5 rounded">
                  Soon
                </span>
              )}
            </div>

            <h3 className="mt-3 sm:mt-4 text-[20px] sm:text-[22px] lg:text-[24px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
              {card.title}
            </h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/60 max-w-[34ch]">
              {card.description}
            </p>

            <div className="flex-grow" />

            <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
              <span className="text-[11px] text-white/55 truncate tabular-nums">
                {card.meta ?? 'Open'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow shrink-0">
                Open
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Inner page — must be inside DashboardDataProvider
// ────────────────────────────────────────────────────────────────────────

const ElectricalHubInner = () => {
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const { profile } = useAuth();
  const data = useSharedDashboardData();

  const firstName = profile?.full_name?.split(' ')[0] || 'Electrician';

  // Editorial verdict: short, business-aware, ends with a full stop.
  const { verdict, cta } = useMemo(() => {
    const parts: string[] = [];
    if (data.business.activeQuotes > 0) {
      parts.push(
        `${data.business.activeQuotes} ${data.business.activeQuotes === 1 ? 'quote' : 'quotes'} live`
      );
    }
    if (data.business.quoteValue > 0) {
      parts.push(`${data.business.formattedQuoteValue} in motion`);
    }
    if (data.business.overdueInvoices > 0) {
      parts.push(
        `${data.business.overdueInvoices} ${data.business.overdueInvoices === 1 ? 'invoice' : 'invoices'} to chase`
      );
    }
    const verdict =
      parts.length > 0
        ? `${parts.join(', ')}.`
        : 'Quiet day. Use the calm to push a quote out or finish a draft cert.';

    // CTA points to the most useful next thing
    const cta =
      data.business.overdueInvoices > 0
        ? { label: 'Chase overdue', href: '/electrician/invoices?filter=overdue' }
        : data.business.activeQuotes > 0
          ? { label: 'Open quotes', href: '/electrician/quotes' }
          : { label: 'Open certificates', href: '/electrician/inspection-testing' };

    return { verdict, cta };
  }, [data]);

  // Onboarding gate
  const { data: profileData } = useQuery({
    queryKey: ['onboarding-check-with-email'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: row } = await supabase
        .from('profiles')
        .select(
          'onboarding_completed, subscribed, free_access_granted, role, apprentice_course'
        )
        .eq('id', user.id)
        .single();
      return { profile: row, email: user.email };
    },
  });

  const onboardingProfile = profileData?.profile as
    | {
        onboarding_completed?: boolean | null;
        subscribed?: boolean | null;
        free_access_granted?: boolean | null;
        role?: string | null;
        apprentice_course?: string | null;
      }
    | null
    | undefined;

  useEffect(() => {
    if (!onboardingProfile) return;
    const isApprentice = onboardingProfile.role === 'apprentice';

    // Apprentices: trigger if they haven't picked a course yet, regardless
    // of subscribed state — the course question gates Study Centre targeting
    // and we want it captured on day 1, not when they finally subscribe.
    if (isApprentice) {
      if (onboardingProfile.apprentice_course) return;
    } else {
      // Business roles: keep the existing gate — only fire after they're
      // on trial / subscribed, so we're not asking for VAT/banking from a
      // window-shopper.
      if (onboardingProfile.onboarding_completed) return;
      const hasAccess =
        onboardingProfile.subscribed || onboardingProfile.free_access_granted;
      if (!hasAccess) return;
    }

    const hasSeenWizard = sessionStorage.getItem('setup_wizard_shown');
    if (!hasSeenWizard) {
      setShowSetupWizard(true);
      sessionStorage.setItem('setup_wizard_shown', 'true');
    }
  }, [onboardingProfile]);

  // Renewables is in private preview — only visible to Andrew Moore and Alex Gibbons.
  const RENEWABLES_ALLOWLIST = [
    'b0113c59-8611-4c5e-8503-1797a75bb64f', // Andrew Moore
    '6f8bf099-f81b-446d-aa99-ed48f23f8329', // Alex Gibbons
  ];
  const canSeeRenewables = RENEWABLES_ALLOWLIST.includes(profile?.id ?? '');

  const coreTools: ToolCard[] = [
    {
      id: 'certificates',
      eyebrow: 'Certs',
      title: 'Certificates',
      description: 'EICR, EIC and Minor Works.',
      to: '/electrician/inspection-testing',
      meta:
        data.certificates.total > 0
          ? `${data.certificates.total} on file`
          : 'Start your first cert',
    },
    {
      id: 'business',
      eyebrow: 'Money',
      title: 'Business',
      description: 'Quotes, invoices and customers.',
      to: '/electrician/business',
      meta:
        data.business.activeQuotes > 0
          ? `${data.business.activeQuotes} active · ${data.business.formattedQuoteValue}`
          : 'Send your first quote',
    },
    {
      id: 'calculations',
      eyebrow: 'BS 7671',
      title: 'Calculations',
      description: 'Cable sizing, voltage drop, Zs, fault current.',
      to: '/electrician/calculations',
      meta: '60+ calculators',
    },
    {
      id: 'renewables',
      eyebrow: 'Green',
      title: 'Renewables',
      description: 'Solar, battery, EV and heat pump — design to certificate.',
      to: '/electrician/renewables',
      meta: 'New',
    },
    {
      id: 'site-safety',
      eyebrow: 'Safety',
      title: 'Site safety',
      description: 'Risk assessments and RAMS.',
      to: '/electrician/site-safety',
      meta: 'Generate a RAMS',
    },
    {
      id: 'ai-tools',
      eyebrow: 'AI',
      title: 'AI tools',
      description: 'Smart analysis, design and report writing.',
      to: '/electrician-tools/ai-tooling',
      meta: '5 specialists',
    },
    {
      id: 'build-partners',
      eyebrow: 'Design',
      title: 'Build partners',
      description: 'Cost engineering and circuit design.',
      to: '/electrician/agent-selector',
      meta: 'AI-led',
    },
  ].filter((c) => c.id !== 'renewables' || canSeeRenewables);

  const identityTools: ToolCard[] = [
    {
      id: 'elec-id',
      eyebrow: 'Profile',
      title: 'My Elec-ID',
      description: 'Worker-owned trade card with QR share.',
      to: '/elec-id',
      meta: 'Share your card',
    },
    {
      id: 'elec-ai',
      eyebrow: 'Assistant',
      title: 'Elec-AI',
      description: 'Your personal electrical advisor.',
      to: '/electrician-tools/ai-tooling/assistant',
      meta: 'Open chat',
    },
  ];

  const moreTools: ToolCard[] = [
    {
      id: 'industry-updates',
      eyebrow: 'News',
      title: 'Industry updates',
      description: 'Standards changes and trade news.',
      to: '/electrician/safety-shares/news',
      meta: 'Updated daily',
    },
    {
      id: 'career',
      eyebrow: 'Career',
      title: 'Career progression',
      description: 'Plan your pathway from Level 2 to AM2.',
      to: '/electrician/career-progression',
      meta: 'Build your route',
    },
  ];

  return (
    <>
      <PageMasthead />

      <div className="px-4 py-4 space-y-12 sm:space-y-16 max-w-7xl mx-auto">
        <Hero firstName={firstName} verdict={verdict} cta={cta} />

        <HeadlineStats number="01" label="AT A GLANCE" />

        <EditorialToolGrid number="02" label="CORE TOOLS" cards={coreTools} />

        <EditorialToolGrid
          number="03"
          label="IDENTITY"
          cards={identityTools}
          columns="two"
        />

        <EditorialToolGrid number="04" label="STAY CURRENT" cards={moreTools} columns="two" />

        {/* 05 · LATEST JOBS — section header + widget below */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <Eyebrow>05 · LATEST JOBS</Eyebrow>
            <Link
              to="/electrician/job-vacancies"
              className="text-[11px] font-medium text-elec-yellow/80 hover:text-elec-yellow transition-colors touch-manipulation"
            >
              See all →
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <LatestJobsWidget />
          </motion.div>
        </motion.section>
      </div>

      <SetupWizard
        isOpen={showSetupWizard}
        role={onboardingProfile?.role ?? profile?.role ?? null}
        onComplete={() => setShowSetupWizard(false)}
        onSkip={() => setShowSetupWizard(false)}
      />
    </>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Outer wrapper — provides SEO + DashboardDataProvider context
// ────────────────────────────────────────────────────────────────────────

const ElectricalHub = () => {
  useSEO({
    title: 'Electrician Tools & Certificates | BS 7671 Compliant',
    description:
      'Professional tools for UK electricians: cable calculators, voltage drop, EICR/EIC/Minor Works certificates, AI specialists, cost engineering and 60+ electrical calculators. BS 7671 18th Edition compliant.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Electrician Professional Tools',
      description:
        'Suite of professional electrical tools and certification software for UK electricians',
      provider: { '@type': 'Organization', name: 'Elec-Mate' },
    },
  });

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      <DashboardDataProvider>
        <ElectricalHubInner />
      </DashboardDataProvider>
    </div>
  );
};

export default ElectricalHub;
