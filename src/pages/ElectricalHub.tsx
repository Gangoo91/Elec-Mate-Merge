/**
 * ElectricianHub — the top-level hub, rebuilt on the shared hub primitives.
 *
 * This page was the third dialect of the same layout. HubPrimitives was
 * extracted precisely to stop that happening — its own header names the
 * pattern it absorbed: "numbered `01 · AT A GLANCE` eyebrows over flat cells in
 * a hairline grid". That was this file. So a user moving between the
 * Electrician Hub and the Business Hub, one tap apart, met two different
 * products: a 56px "Hello, ANDREW." over 240px editorial cells here, compact
 * KPIs over flat cards there.
 *
 * What went, and why:
 *
 *   The hero (~430px, the whole first screen). Its verdict line — "6 quotes
 *   live, £36.8k in motion, 8 invoices to chase" — was the stat strip
 *   immediately below it, rewritten as a sentence. The only load-bearing part
 *   was the chase-overdue prompt, which is now HubAlertLine and appears only
 *   when something is actually overdue.
 *
 *   The double numbering. Sections ran `01 · AT A GLANCE` … `05 · LATEST JOBS`
 *   while the cards inside section `02` were numbered `01`, `02`, `03` again.
 *   Neither order meant anything.
 *
 *   The greys. text-white/55, /60 and /90 throughout, plus elec-yellow/80 —
 *   all of it renders grey or muddy on this ground and none of it is allowed.
 *
 *   The volt wash on the CTA. `bg-elec-yellow/10` behind volt text goes brown.
 *   Volt is solid, or it is text.
 */

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import {
  DashboardDataProvider,
  useSharedDashboardData,
} from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { SetupWizard } from '@/components/onboarding/SetupWizard';
import { LatestJobsWidget } from '@/components/job-vacancies/LatestJobsWidget';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWorkerSeat } from '@/hooks/useWorkerSeat';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubQuickStart,
  HubToolGrid,
  HubSectionHeading,
  HubKpi,
  HubKpiRow,
  type HubTool,
  type HubQuickAction,
} from '@/components/hub/HubPrimitives';
import { MateBar } from '@/components/business-hub/MateBar';
import { Assistant } from '@/components/business-hub/Assistant';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import { ReferralRaceCard } from '@/components/referrals/ReferralRaceCard';

import DiaryPanel from '@/components/calendar/DiaryPanel';

// Exact — see Dashboard.tsx. Three pages were rounding this differently.
const money = (v: number) =>
  `£${Math.round(v).toLocaleString('en-GB')}`;


const ElectricalHubInner = () => {
  const navigate = useNavigate();
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const { profile } = useAuth();
  const data = useSharedDashboardData();
  // Drives the Worker Tools card — an active employer seat is what grants it.
  const { data: hasWorkerSeat = false } = useWorkerSeat(profile?.id);
  const { tasks, saveTask, updateTask, deleteTask, markDone } = useSparkTasks('all');

  const [mateOpen, setMateOpen] = useState(false);
  const openMate = () => setMateOpen(true);

  // ⌘K / Ctrl+K opens Mate from anywhere on the page — same binding as the
  // Business Hub, so the shortcut doesn't change meaning between two pages
  // one tap apart.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMateOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
        .select('onboarding_completed, subscribed, free_access_granted, role, apprentice_course')
        .eq('id', user.id)
        .single();
      // Wizard gate is data-based: has this user ever saved company details?
      // (profiles.onboarding_completed can't be used — the dashboard
      // WelcomeModal sets it on dismiss, which used to suppress this wizard
      // for everyone.)
      const { data: companyRow } = await supabase
        .from('company_profiles')
        .select('id, company_name')
        .eq('user_id', user.id)
        .maybeSingle();
      return {
        profile: row,
        email: user.email,
        // Row existence, not company_name — a partially-saved profile (e.g.
        // empty-string name) still means they've been through the wizard.
        hasCompanyProfile: Boolean(companyRow),
      };
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
      // Business roles: fire only after they're on trial / subscribed (no
      // VAT/banking questions for window-shoppers), and only while they have
      // no saved company details. Gating on data instead of
      // onboarding_completed — the WelcomeModal sets that flag on dismiss,
      // which used to permanently suppress this wizard.
      if (profileData?.hasCompanyProfile) return;
      const hasAccess = onboardingProfile.subscribed || onboardingProfile.free_access_granted;
      if (!hasAccess) return;
    }

    // localStorage, not sessionStorage — "Skip for now" must survive
    // re-login, otherwise the wizard re-prompts on every session.
    const hasSeenWizard = localStorage.getItem('setup_wizard_shown');
    if (!hasSeenWizard) {
      setShowSetupWizard(true);
      localStorage.setItem('setup_wizard_shown', 'true');
    }
  }, [onboardingProfile, profileData?.hasCompanyProfile]);

  // Renewables is in private preview — named accounts only, not a launch. The
  // Heat Pump certificate and Solar Design Suite are still outstanding, so the
  // hub stays gated for everyone else until both land.
  const RENEWABLES_ALLOWLIST = [
    'b0113c59-8611-4c5e-8503-1797a75bb64f', // Andrew Moore
    '6f8bf099-f81b-446d-aa99-ed48f23f8329', // Alex Gibbons
    'fbda6c7c-0d26-41a3-b49c-f37e2e7d9c07', // Sean Mulcahy — 70% EV, 25% solar/battery
  ];
  const canSeeRenewables = RENEWABLES_ALLOWLIST.includes(profile?.id ?? '');

  // Worker Tools — visible to anyone holding an active employer seat, plus the
  // original beta accounts. Seat-based rather than a UUID list because a list
  // cannot pre-authorise a worker who has not signed up yet: an invited team
  // member would accept, land on Worker Tools, and have no way back to it.
  const WORKER_TOOLS_ALLOWLIST = [
    'b0113c59-8611-4c5e-8503-1797a75bb64f', // Andrew Gangoo
    'aa69361d-dad9-4841-84e4-25ee41568594', // founder
    'e2945660-a8e0-4099-8e50-a70d71d3dca4', // Craig Soper
  ];
  const canSeeWorkerTools =
    hasWorkerSeat || WORKER_TOOLS_ALLOWLIST.includes(profile?.id ?? '');

  const { business, certificates } = data;

  /*
   * `certificates.expiringSoon` is a repurposed field — reports carry no
   * expiry, so the hook fills it with drafts/in-progress (see its comment).
   * That is the number worth leading with: "140 on file" is a total that only
   * ever goes up and that you would never act on.
   */
  const certsInProgress = certificates.expiringSoon;

  // ── Start something ──────────────────────────────────────────────────
  const quickStart: HubQuickAction[] = [
    {
      title: 'New certificate',
      description: 'EICR, EIC or Minor Works',
      onClick: () => navigate('/electrician/inspection-testing'),
      primary: true,
    },
    {
      title: 'New quote',
      description: 'Price up a job',
      onClick: () => navigate('/electrician/quotes'),
    },
    {
      title: 'New job',
      description: 'Open a project',
      onClick: () => navigate('/electrician/projects'),
    },
    {
      title: 'Run a calculation',
      description: 'Cable, Zs, volt drop',
      onClick: () => navigate('/electrician/calculations'),
    },
  ];

  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   *
   * Three or four cards each, never five to seven. The grid is auto-fit at
   * four tracks, and auto-fit collapses tracks that are empty for the whole
   * grid but not for a single row — so the old eight-card "CORE TOOLS" block
   * wrapped and left a hole. Splitting it into two fours also survives the
   * renewables gate, which removes a card for everyone not on the allowlist:
   * "Specialist" is four with it and three without, and both fill the row.
   */
  /*
   * Core tools carry NO figures, and that is the opposite of the rule the
   * Business Hub follows — deliberately, because the two pages are answering
   * different questions.
   *
   * The Business Hub's cards cover twenty-one areas its four KPIs never touch,
   * so a card reporting a number is a card earning its slot. Here, Core tools
   * maps almost one-to-one onto the KPI row 200px above it: certs in progress,
   * open jobs, quotes to send. Printing those again turns four live figures
   * into eight, and the whole reason the old hero came out is that saying the
   * same number twice makes neither of them feel urgent.
   *
   * So the KPI row owns the numbers and the verdicts; these say what is
   * inside. It also makes the group uniform — four cards, one shape.
   */
  const coreTools: HubTool[] = [
    {
      id: 'certificates',
      title: 'Certificates',
      to: '/electrician/inspection-testing',
      description: 'EICR, EIC and Minor Works.',
    },
    {
      id: 'business',
      title: 'Business',
      to: '/electrician/business',
      description: 'Quotes, invoices and customers.',
    },
    {
      id: 'projects',
      title: 'Jobs',
      to: '/electrician/projects',
      description: 'Every job — quotes, certs and invoices in one place.',
    },
    {
      // No "BS 7671" eyebrow. It was the only card in the group carrying one,
      // which dropped its title a line below its three siblings — and the
      // description already says cable sizing, Zs and fault current, which
      // could not be anything else.
      id: 'calculations',
      title: 'Calculations',
      description: 'Cable sizing, voltage drop, Zs and fault current.',
      to: '/electrician/calculations',
    },
  ];

  const specialistTools: HubTool[] = [
    {
      id: 'site-safety',
      title: 'Site safety',
      description: 'Risk assessments and RAMS.',
      to: '/electrician/site-safety',
    },
    {
      id: 'ai-tools',
      title: 'AI tools',
      description: 'Smart analysis, design and report writing.',
      to: '/electrician-tools/ai-tooling',
    },
    {
      id: 'build-partners',
      title: 'Build partners',
      description: 'Cost engineering and circuit design.',
      to: '/electrician/agent-selector',
    },
    {
      id: 'renewables',
      title: 'Renewables',
      description: 'Solar, battery, EV and heat pump — design to certificate.',
      to: '/electrician/renewables',
    },
  ].filter((c) => c.id !== 'renewables' || canSeeRenewables);

  const yourAccount: HubTool[] = [
    {
      id: 'worker-tools',
      title: 'Worker Tools',
      description: 'Your jobs, tasks, clock-in, timesheets and sign-offs.',
      to: '/electrician/worker-tools',
    },
    {
      id: 'elec-id',
      title: 'My Elec-ID',
      description: 'Worker-owned trade card with QR share.',
      to: '/elec-id',
    },
    {
      id: 'elec-ai',
      title: 'Elec-AI',
      description: 'Your personal electrical advisor.',
      to: '/electrician-tools/ai-tooling/assistant',
    },
  ].filter((c) => c.id !== 'worker-tools' || canSeeWorkerTools);

  const stayCurrent: HubTool[] = [
    {
      id: 'industry-updates',
      title: 'Industry updates',
      description: 'Standards changes and trade news.',
      to: '/electrician/safety-shares/news',
    },
    {
      id: 'career',
      title: 'Career progression',
      description: 'Plan your pathway from Level 2 to AM2.',
      to: '/electrician/career-progression',
    },
  ];

  return (
    <>
      <HubMasthead title="Electrician Hub" backTo="/dashboard" />

      <HubBody>
        {/* August Referral Race — everyone, whole campaign, not dismissible.
            Self-hides after 31 Aug. */}
        <ReferralRaceCard />

        {/* Mate first, exactly as on the Business Hub — same row, same ⌘K.
            The overdue alert line that used to sit here has gone: it printed
            "£6.1k out" directly above an Overdue KPI reading £6.1k, which is
            the duplication the old hero was deleted for. The KPI says it once,
            with the verdict and the invoice count attached. */}
        <MateBar onOpen={openMate} />

        {/* Start something FIRST. These pages opened with state — how much you
            are owed, what is unfinished — and put the handful of things you might
            actually begin below all of it. Someone opening the app on a van seat is
            far more often here to start a cert than to read a figure, and the
            figures are still one scroll away. */}
        <HubQuickStart label="Start something" items={quickStart} />

        <HubKpiRow>
          <HubKpi
            accent
            label="Certs in progress"
            value={String(certsInProgress)}
            verdict={certsInProgress > 0 ? 'Finish and issue these' : 'Nothing part-written'}
            context={certificates.total > 0 ? `${certificates.total} on file` : undefined}
            sentiment="neutral"
            onClick={() => navigate('/electrician/inspection-testing')}
          />
          <HubKpi
            label="Open jobs"
            value={String(business.activeProjects)}
            verdict={business.activeProjects > 0 ? 'On the go right now' : 'Nothing open'}
            onClick={() => navigate('/electrician/projects')}
          />
          <HubKpi
            label="Pipeline"
            value={money(business.quoteValue)}
            verdict={
              business.activeQuotes > 0
                ? `${business.activeQuotes} quote${business.activeQuotes === 1 ? '' : 's'} with clients`
                : 'Nothing out with a client'
            }
            // When the pipeline is empty, the useful thing is not the zero —
            // it is that there are quotes sitting in drafts that would fill it.
            context={
              business.activeQuotes === 0 && business.draftQuotes > 0
                ? `${business.draftQuotes} priced up, not sent`
                : undefined
            }
            onClick={() => navigate('/electrician/quotes')}
          />
          <HubKpi
            label="Overdue"
            value={money(business.overdueValue)}
            sentiment={business.overdueInvoices > 0 ? 'bad' : 'neutral'}
            direction={business.overdueInvoices > 0 ? 'up' : 'flat'}
            verdict={
              business.overdueInvoices > 0 ? 'Chase the oldest first' : 'Nothing overdue'
            }
            context={
              business.overdueInvoices > 0
                ? `${business.overdueInvoices} invoice${business.overdueInvoices === 1 ? '' : 's'}`
                : 'All invoices within terms'
            }
            onClick={() => navigate('/electrician/invoices?filter=overdue')}
          />
        </HubKpiRow>

        {/*
          The diary, not a backlog list.
          "Needs you" listed every unfinished certificate by age, which on a
          real account meant 35 rows all reading "Untouched for 206 days" — a
          wall of identical text that says the same thing 35 times and is
          impossible to act on. The certificate backlog is still reachable, and
          better presented, from the certificates KPI above.
          What this page was missing is what an electrician actually opens it
          for: what is on today. DiaryPanel is the same panel the Dashboard and
          Business Hub already use, so this is one calendar in three places
          rather than a fourth thing to maintain.
        */}
        <DiaryPanel />

        <HubToolGrid label="Core tools" cards={coreTools} columns="four" />

        <HubToolGrid label="Specialist" cards={specialistTools} columns="four" />

        <HubToolGrid label="Your account" cards={yourAccount} columns="four" />

        <HubToolGrid label="Stay current" cards={stayCurrent} columns="four" />

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
            <HubSectionHeading>Latest jobs</HubSectionHeading>
            {/* h-11 + negative margin: a full 44px target that still sits flush
                with the heading. An 11px bare text link measured 13px tall,
                which is a miss on a phone and against house rules. */}
            <Link
              to="/electrician/job-vacancies"
              className="-my-2 -mr-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-semibold text-elec-yellow touch-manipulation"
            >
              See all →
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <LatestJobsWidget />
          </motion.div>
        </motion.section>
      </HubBody>

      <Assistant
        isOpen={mateOpen}
        onClose={() => setMateOpen(false)}
        currentTasks={tasks}
        onSave={saveTask}
        onUpdate={updateTask}
        onMarkDone={markDone}
        onDelete={deleteTask}
      />

      <SetupWizard
        isOpen={showSetupWizard}
        role={onboardingProfile?.role ?? profile?.role ?? null}
        onComplete={() => setShowSetupWizard(false)}
        onSkip={() => setShowSetupWizard(false)}
      />
    </>
  );
};

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
    <HubPage>
      <DashboardDataProvider>
        <ElectricalHubInner />
      </DashboardDataProvider>
    </HubPage>
  );
};

export default ElectricalHub;
