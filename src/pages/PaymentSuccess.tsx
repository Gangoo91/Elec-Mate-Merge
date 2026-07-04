import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { trackCheckoutCompleted } from '@/lib/analytics-events';
import { downloadMateVCard } from '@/utils/mate-vcard';
import { MATE_PHONE_DISPLAY, MATE_WHATSAPP_LINK } from '@/constants/mate';

// ─── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

// ─── Editorial atoms ─────────────────────────────────────────────────────────
const Y = ({ children }: { children: React.ReactNode }) => (
  <span className="text-elec-yellow font-semibold">{children}</span>
);
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
    {children}
  </span>
);

// ─── Plan info ────────────────────────────────────────────────────────────────
interface NextStep {
  title: string;
  body: React.ReactNode;
}

interface PlanConfig {
  name: string;
  features: string[];
  /** Override the default headline noun. */
  liveNoun?: string;
  nextSteps: (helpers: { downloadVCard: () => void }) => NextStep[];
}

const DEFAULT_DASHBOARD_STEPS = (): NextStep[] => [
  {
    title: 'Open the dashboard',
    body: 'Land on your hub — every tool, every cert, every calculator. Tap the big yellow button below.',
  },
  {
    title: 'Add your first client or job',
    body: 'CRM, projects, photos and snagging all live in the same place. Import an existing client or create one fresh.',
  },
  {
    title: 'Use it on real work this week',
    body: 'The platform is at its best when you actually use it. Issue a cert. Send a quote. Log a receipt.',
  },
];

const planInfo: Record<string, PlanConfig> = {
  'electrician-monthly': {
    name: 'Electrician Pro',
    features: [
      '15 cert types — EICR, EIC, Minor Works, PAT, Solar, EV, Fire Alarm',
      '9 AI specialists — Designer, Cost Engineer, Installation, RAMS, Tutor',
      'CRM, projects, quotes, invoices, expenses, photos',
      '75 electrical calculators · 13 financial calculators',
      'Live material pricing · regional rates · marketplace',
    ],
    nextSteps: () => DEFAULT_DASHBOARD_STEPS(),
  },
  'electrician-annual': {
    name: 'Electrician Pro',
    features: [
      '15 cert types — EICR, EIC, Minor Works, PAT, Solar, EV, Fire Alarm',
      '9 AI specialists — Designer, Cost Engineer, Installation, RAMS, Tutor',
      'CRM, projects, quotes, invoices, expenses, photos',
      '75 electrical calculators · 13 financial calculators',
      'Live material pricing · regional rates · marketplace',
    ],
    nextSteps: () => DEFAULT_DASHBOARD_STEPS(),
  },
  'apprentice-monthly': {
    name: 'Apprentice',
    features: [
      'Study Centre — 24 in-depth courses',
      'Mock exams · 500+ practice questions · 75 videos',
      'AM2 and EPA simulators with gateway readiness',
      'Site diary, OJT logbook, portfolio builder',
      'Ask Dave — AI mentor with chat and image upload',
    ],
    nextSteps: () => [
      {
        title: 'Open your dashboard',
        body: 'Land on the apprentice hub — Study Centre, calculators, AM2 sim and the lot.',
      },
      {
        title: 'Pick your path',
        body: 'Level 2, Level 3, AM2, HNC, MOET or Functional Skills — choose where you are and we\u2019ll meet you there.',
      },
      {
        title: 'Build it daily',
        body: 'Streaks, XP, quiz history, portfolio evidence — small steps every day add up to gateway-ready.',
      },
    ],
  },
  'apprentice-annual': {
    name: 'Apprentice',
    features: [
      'Study Centre — 24 in-depth courses',
      'Mock exams · 500+ practice questions · 75 videos',
      'AM2 and EPA simulators with gateway readiness',
      'Site diary, OJT logbook, portfolio builder',
      'Ask Dave — AI mentor with chat and image upload',
    ],
    nextSteps: () => [
      {
        title: 'Open your dashboard',
        body: 'Land on the apprentice hub — Study Centre, calculators, AM2 sim and the lot.',
      },
      {
        title: 'Pick your path',
        body: 'Level 2, Level 3, AM2, HNC, MOET or Functional Skills — choose where you are and we\u2019ll meet you there.',
      },
      {
        title: 'Build it daily',
        body: 'Streaks, XP, quiz history, portfolio evidence — small steps every day add up to gateway-ready.',
      },
    ],
  },
  'business-ai-monthly': {
    name: 'Mate',
    liveNoun: 'Mate',
    features: [
      '197 tools wired up — quoting, invoicing, calendar, regs, RAMS, photo-to-quote',
      'Voice notes both ways — Mate listens and replies through your earbuds',
      'Plan my day · routing · weather · end-of-day summary',
      'Photo of receipt → expense logged · synced to Xero / QuickBooks',
      'Everything in Electrician, plus the full Mate stack on WhatsApp',
    ],
    nextSteps: ({ downloadVCard }) => [
      {
        title: 'Save Mate to your phone contacts',
        body: (
          <>
            Tap{' '}
            <button
              type="button"
              onClick={downloadVCard}
              className="text-elec-yellow underline underline-offset-4 decoration-elec-yellow/40 hover:decoration-elec-yellow touch-manipulation font-semibold"
            >
              download the contact card
            </button>{' '}
            so {MATE_PHONE_DISPLAY} sits in your address book — that way every call and message is
            instantly recognisable.
          </>
        ),
      },
      {
        title: 'Open WhatsApp',
        body: 'Hop into the chat app you already use. Mate lives there — no new app to download, no extra login to remember.',
      },
      {
        title: 'Tap the activation message',
        body: 'On the next screen we hand you a one-tap link. The activation code is already typed for you. Hit send.',
      },
      {
        title: "You're chatting in five seconds",
        body: 'Mate verifies the code, sets up your account, and replies. From here — voice, photo, plain English. Whatever\u2019s easiest.',
      },
    ],
  },
  'business-ai-yearly': {
    name: 'Mate',
    liveNoun: 'Mate',
    features: [
      '197 tools wired up — quoting, invoicing, calendar, regs, RAMS, photo-to-quote',
      'Voice notes both ways — Mate listens and replies through your earbuds',
      'Plan my day · routing · weather · end-of-day summary',
      'Photo of receipt → expense logged · synced to Xero / QuickBooks',
      'Everything in Electrician, plus the full Mate stack on WhatsApp',
    ],
    nextSteps: ({ downloadVCard }) => [
      {
        title: 'Save Mate to your phone contacts',
        body: (
          <>
            Tap{' '}
            <button
              type="button"
              onClick={downloadVCard}
              className="text-elec-yellow underline underline-offset-4 decoration-elec-yellow/40 hover:decoration-elec-yellow touch-manipulation font-semibold"
            >
              download the contact card
            </button>{' '}
            so {MATE_PHONE_DISPLAY} sits in your address book — that way every call and message is
            instantly recognisable.
          </>
        ),
      },
      {
        title: 'Open WhatsApp',
        body: 'Hop into the chat app you already use. Mate lives there — no new app to download, no extra login to remember.',
      },
      {
        title: 'Tap the activation message',
        body: 'On the next screen we hand you a one-tap link. The activation code is already typed for you. Hit send.',
      },
      {
        title: "You're chatting in five seconds",
        body: 'Mate verifies the code, sets up your account, and replies. From here — voice, photo, plain English. Whatever\u2019s easiest.',
      },
    ],
  },
  'employer-monthly': {
    name: 'Employer',
    features: [
      'People Hub — team, roles, timesheets, leave, chat',
      'Jobs Hub — kanban, Gantt, GPS tracking, client portal',
      'Finance Hub — multi-user quotes, P&L, price book, procurement',
      'Safety Hub — RAMS, incidents, hazards, training records',
      'AI Smart Docs — design specs, method statements, quotes',
    ],
    nextSteps: () => [
      {
        title: 'Open your dashboard',
        body: 'The Employer hub is your control room — team, jobs, finance and safety all in one view.',
      },
      {
        title: 'Set up your team',
        body: 'Invite colleagues, assign roles, configure timesheets and clock-in. Get the people side live first.',
      },
      {
        title: 'Configure branding and price book',
        body: 'Logo, colours, bank details, labour rates, material costs and markup rules — your firm, your numbers.',
      },
      {
        title: 'Run your first job through it',
        body: 'Create a kanban job, log progress, capture photos, sign off. The whole pipeline in one place.',
      },
    ],
  },
  'employer-yearly': {
    name: 'Employer',
    features: [
      'People Hub — team, roles, timesheets, leave, chat',
      'Jobs Hub — kanban, Gantt, GPS tracking, client portal',
      'Finance Hub — multi-user quotes, P&L, price book, procurement',
      'Safety Hub — RAMS, incidents, hazards, training records',
      'AI Smart Docs — design specs, method statements, quotes',
    ],
    nextSteps: () => [
      {
        title: 'Open your dashboard',
        body: 'The Employer hub is your control room — team, jobs, finance and safety all in one view.',
      },
      {
        title: 'Set up your team',
        body: 'Invite colleagues, assign roles, configure timesheets and clock-in. Get the people side live first.',
      },
      {
        title: 'Configure branding and price book',
        body: 'Logo, colours, bank details, labour rates, material costs and markup rules — your firm, your numbers.',
      },
      {
        title: 'Run your first job through it',
        body: 'Create a kanban job, log progress, capture photos, sign off. The whole pipeline in one place.',
      },
    ],
  },
};

// ═════════ COMPONENT ═════════════════════════════════════════════════════════
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get('plan') || 'electrician-monthly';
  const isTrial = searchParams.get('trial') === 'true';
  const { fetchProfile, profile, user } = useAuth();
  const [showContent, setShowContent] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [activationSlow, setActivationSlow] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoNavRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Funnel: client-side end of the acquisition funnel. Fires once per visit.
  const trackedCompletionRef = useRef(false);
  useEffect(() => {
    if (trackedCompletionRef.current) return;
    trackedCompletionRef.current = true;
    trackCheckoutCompleted({ plan: planId, trial: isTrial });
  }, [planId, isTrial]);

  const plan = planInfo[planId] || planInfo['electrician-monthly'];
  const liveNoun = plan.liveNoun ?? `${plan.name} `;
  // Per-plan trial duration must match create-checkout's trialDaysFor():
  // Mate (business-ai) = 3 days, electrician/apprentice = 7, employer = 0.
  const trialDays = planId.startsWith('business-ai') ? 3 : 7;
  const trialEndDate = new Date(Date.now() + trialDays * 86400000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const roleFromPlan = planId.startsWith('apprentice')
    ? 'apprentice'
    : planId.startsWith('employer')
      ? 'employer'
      : 'electrician';

  const ensureRole = useCallback(
    async (freshProfile: unknown) => {
      const typedProfile = freshProfile as { role?: string } | null;
      if (!user?.id || typedProfile?.role) return;
      try {
        await supabase
          .from('profiles')
          .update({ role: roleFromPlan, updated_at: new Date().toISOString() })
          .eq('id', user.id);
        await fetchProfile(user.id);
      } catch {
        return;
      }
    },
    [fetchProfile, roleFromPlan, user?.id]
  );

  const isBusinessAIPlan = planId.startsWith('business-ai') || planId.startsWith('employer');
  const isMatePlan = planId.startsWith('business-ai');

  const handleGoToDashboard = useCallback(() => {
    if (autoNavRef.current) clearTimeout(autoNavRef.current);
    navigate(isBusinessAIPlan ? '/electrician/business-ai' : '/dashboard');
  }, [isBusinessAIPlan, navigate]);

  const handleOpenWhatsApp = useCallback(() => {
    window.open(MATE_WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    let attempts = 0;
    const maxAttempts = 30;

    pollRef.current = setInterval(async () => {
      attempts++;
      const freshProfile = await fetchProfile(user.id);

      if (freshProfile?.subscribed) {
        if (pollRef.current) clearInterval(pollRef.current);
        await ensureRole(freshProfile);
        setActivationSlow(false);
        setIsReady(true);
        autoNavRef.current = setTimeout(() => {
          navigate(isBusinessAIPlan ? '/electrician/business-ai' : '/dashboard');
        }, 8000);
        return;
      }

      if (attempts >= maxAttempts) {
        if (pollRef.current) clearInterval(pollRef.current);
        await ensureRole(freshProfile);
        setActivationSlow(true);
        setIsReady(true);
      }
    }, 2000);

    const earlyReadyTimer = setTimeout(() => {
      setIsReady(true);
    }, 10000);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 200);

    return () => {
      clearTimeout(earlyReadyTimer);
      clearTimeout(contentTimer);
      if (pollRef.current) clearInterval(pollRef.current);
      if (autoNavRef.current) clearTimeout(autoNavRef.current);
    };
  }, [ensureRole, fetchProfile, isBusinessAIPlan, navigate, user?.id]);

  useEffect(() => {
    if (profile?.subscribed && !isReady) {
      setIsReady(true);
      if (pollRef.current) clearInterval(pollRef.current);
    }
  }, [isReady, profile?.subscribed]);

  const nextSteps = plan.nextSteps({ downloadVCard: downloadMateVCard });
  const ctaLabel = isMatePlan
    ? 'Activate Mate on WhatsApp'
    : isBusinessAIPlan
      ? 'Open Business AI'
      : 'Go to Dashboard';
  const ctaAction = isMatePlan ? handleGoToDashboard : handleGoToDashboard;
  // Note: Mate plan still routes to /electrician/business-ai which contains the
  // DeepLinkActivationStep that handles the actual WhatsApp activation. The
  // CTA label above just sets expectation.

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showContent ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-white pb-[calc(env(safe-area-inset-bottom)+24px)]"
    >
      {/* Top nav with logo */}
      <div className="px-4 sm:px-6 pt-3 pb-1 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2.5 touch-manipulation">
          <img src="/logo.jpg" alt="Elec-Mate" className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-[18px] font-bold tracking-tight text-white">
            Elec-<span className="text-elec-yellow">Mate</span>
          </span>
        </Link>
      </div>

      {/* ═════════ HERO ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-elec-yellow/[0.06] blur-[120px]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-20 pb-12 sm:pb-20 text-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-7 sm:mb-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-elec-yellow animate-ping opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-elec-yellow" />
            </span>
            <Eyebrow>Welcome aboard</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[44px] sm:text-[88px] lg:text-[120px] xl:text-[136px] font-bold tracking-[-0.04em] leading-[0.9] text-white"
          >
            {isTrial ? (
              <>
                Your trial is
                <br />
                <Y>live.</Y>
              </>
            ) : (
              <>
                {liveNoun.trim()} is
                <br />
                <Y>live.</Y>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 sm:mt-9 text-lg sm:text-2xl lg:text-[26px] text-white max-w-3xl mx-auto leading-[1.4]"
          >
            {isTrial ? (
              <>
                You&apos;re on the {plan.name} {trialDays}-day trial. We won&apos;t charge a penny
                until <Y>{trialEndDate}</Y>. Cancel or change plan any time in{' '}
                <Link
                  to="/subscriptions"
                  className="underline underline-offset-4 decoration-elec-yellow/40 hover:decoration-elec-yellow text-white hover:text-elec-yellow touch-manipulation"
                >
                  Subscriptions
                </Link>
                .
              </>
            ) : (
              <>
                You&apos;re on <Y>{plan.name}</Y>. Everything below is unlocked, right now.
              </>
            )}
          </motion.p>
        </motion.div>
      </section>

      {/* ═════════ WHAT'S LIVE ═════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20"
        >
          <motion.div variants={fadeUp} className="mb-10 sm:mb-14 max-w-2xl">
            <Eyebrow>What&apos;s live now</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-white">
              {plan.name},
              <br />
              <Y>fully unlocked.</Y>
            </h2>
          </motion.div>

          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-5">
            {plan.features.map((feature) => (
              <motion.li
                key={feature}
                variants={fadeUp}
                className="text-lg sm:text-xl font-semibold tracking-[-0.01em] leading-[1.3] text-white flex items-start gap-3"
              >
                <span className="mt-2.5 h-1 w-4 rounded-full bg-elec-yellow shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ═════════ WHAT NOW — plan-specific steps ═════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-24"
        >
          <motion.div variants={fadeUp} className="max-w-2xl mb-12 sm:mb-16">
            <Eyebrow>What now</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-white">
              {isMatePlan ? (
                <>
                  Four taps to <Y>chatting with Mate.</Y>
                </>
              ) : (
                <>
                  Three steps to <Y>using it on real work.</Y>
                </>
              )}
            </h2>
          </motion.div>

          <div className="divide-y divide-white/[0.06]">
            {nextSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 py-7 sm:py-10 items-start"
              >
                <span className="text-3xl sm:text-5xl font-bold text-elec-yellow/60 tracking-tight tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="space-y-2 pt-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-base text-white/80 leading-relaxed max-w-2xl">
                    {step.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═════════ CTA ═══════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-elec-yellow/[0.05] blur-[120px]" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20 text-center"
        >
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-7">
            <Button
              onClick={ctaAction}
              disabled={!isReady}
              className={cn(
                'h-16 sm:h-[72px] px-9 sm:px-14 text-[17px] sm:text-lg font-bold rounded-full',
                'transition-all touch-manipulation relative ring-1',
                isReady
                  ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90 hover:scale-[1.02] active:scale-[0.98] shadow-[0_25px_80px_-15px_rgba(250,204,21,0.55)] ring-elec-yellow/40'
                  : 'bg-white/10 text-white ring-white/10'
              )}
            >
              {!isReady ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Finishing setup...
                </>
              ) : (
                <>
                  {ctaLabel}
                  <ArrowRight className="ml-2.5 h-5 w-5 sm:h-6 sm:w-6" />
                </>
              )}
            </Button>

            {isMatePlan && isReady && (
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="text-sm text-white/65 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 touch-manipulation"
              >
                Or open WhatsApp directly
              </button>
            )}

            {activationSlow && (
              <p className="text-[13px] text-amber-400 max-w-md leading-relaxed">
                Activation is taking longer than usual — but you can still proceed and we&apos;ll
                catch up in the background.
              </p>
            )}

            <p className="text-[13px] text-white/55 max-w-md leading-relaxed">
              Cancel or change plan any time in{' '}
              <Link
                to="/subscriptions"
                className="underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white touch-manipulation"
              >
                Subscriptions
              </Link>
              . Need a hand?{' '}
              <a
                href="mailto:info@elec-mate.com"
                className="underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white touch-manipulation"
              >
                info@elec-mate.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default PaymentSuccess;
