/**
 * Dashboard
 *
 * The first page users see. Editorial layout — verdict over data, numbered
 * sections, hairline grids, role-aware copy. Composes from college editorial
 * primitives so the whole product feels like one designer's hand.
 *
 * Flow:
 *   ——   GREETING      — "Hello, Andrew." + verdict line + CTA pill
 *   01 · THIS MONTH    — calm monochrome stat strip (every cell clickable)
 *   02 · YOUR HUBS     — monochrome hub cards (incl. Mate teaser + Bring a Mate referral)
 *   03 · TODAY         — what to do today (overdue, drafts, expiring, etc.)
 *   04 · MOMENTUM      — newspaper-style closer
 *
 * Single accent: elec-yellow on arrows / one stat cell when relevant.
 * No multi-colour tone gradients — restraint is the whole point.
 * Apprentice and electrician roles each see their own variant.
 */

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { DashboardContainer } from '@/components/dashboard/DashboardContainer';
import TrialBanner from '@/components/dashboard/TrialBanner';
import TrialReceiptCard from '@/components/dashboard/TrialReceiptCard';
import WelcomeModal from '@/components/onboarding/WelcomeModal';

import { VerdictHero } from '@/components/dashboard/editorial/VerdictHero';
import { TodayQueue } from '@/components/dashboard/editorial/TodayQueue';
import { HeadlineStats } from '@/components/dashboard/editorial/HeadlineStats';
import { EditorialHubGrid } from '@/components/dashboard/editorial/EditorialHubGrid';
import { MomentumStrip } from '@/components/dashboard/editorial/MomentumStrip';
import { QuickAccessRow } from '@/components/dashboard/editorial/QuickAccessRow';

import { DashboardDataProvider } from '@/hooks/useDashboardData';
import { useDashboardVerdict } from '@/hooks/useDashboardVerdict';
import { useAuth } from '@/contexts/AuthContext';
import useSEO from '@/hooks/useSEO';
import { storageGetSync, storageSetSync } from '@/utils/storage';

const FIRST_STOP_DISMISSED_KEY = 'elec-mate-first-stop-dismissed';

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      delay: delay * 0.08,
    },
  }),
};

const Dashboard = () => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);
  const [firstStopDismissed, setFirstStopDismissed] = useState(
    () => storageGetSync(FIRST_STOP_DISMISSED_KEY) === '1'
  );
  const isFirstVisit =
    !isLoading && !!profile && !profile.onboarding_completed && !firstStopDismissed;

  const quickStart =
    profile?.role === 'apprentice'
      ? { cta: 'Open Study Centre', href: '/study-centre/apprentice' }
      : profile?.role === 'employer'
        ? { cta: 'Open Employer Hub', href: '/employer' }
        : // Electrical Hub, not certificates directly — the hub runs the
          // company-details SetupWizard on first visit, so quotes/invoices/
          // certs are pre-filled before they make their first one.
          { cta: 'Open Electrical Hub', href: '/electrician' };

  const dismissFirstStop = () => {
    storageSetSync(FIRST_STOP_DISMISSED_KEY, '1');
    setFirstStopDismissed(true);
  };

  // Safety net: redirect users with NULL role to complete their profile
  useEffect(() => {
    if (!isLoading && user && profile && !profile.role) {
      navigate('/auth/complete-profile');
    }
  }, [profile, isLoading, user, navigate]);

  // Private page - don't index
  useSEO({
    title: 'Dashboard',
    description: 'Your Elec-Mate dashboard - manage training, tools, and business',
    noindex: true,
  });

  // Show welcome modal for first-time users
  useEffect(() => {
    if (!isLoading && profile && !profile.onboarding_completed) {
      if (storageGetSync('elec-mate-onboarding-done')) return;
      const timer = setTimeout(() => setShowWelcome(true), 500);
      return () => clearTimeout(timer);
    }
  }, [profile, isLoading]);

  return (
    <DashboardContainer>
      <DashboardDataProvider>
        <div className="space-y-10 sm:space-y-14">
          {/* First-visit welcome banner — kept, single yellow accent only */}
          {isFirstVisit && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={-0.5}
            >
              <div className="relative rounded-2xl border border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/[0.06] via-amber-500/[0.02] to-transparent p-5 sm:p-6">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />
                <button
                  type="button"
                  onClick={dismissFirstStop}
                  className="absolute right-3 top-3 h-8 touch-manipulation rounded-xl border border-white/[0.12] bg-black/40 px-3 text-[12px] font-medium text-white transition-colors hover:bg-black/70 hover:text-yellow-400"
                  aria-label="Dismiss"
                >
                  Dismiss
                </button>
                <div className="flex flex-col gap-4 pr-20 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pr-24">
                  <div>
                    <h2 className="text-[1.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-[1.5rem]">
                      Make the first <span className="text-yellow-400">ten minutes</span> count.
                    </h2>
                    <p className="mt-2 text-[14px] leading-[1.55] text-white sm:text-[15px]">
                      Run one real task through the platform — the rest of the workflow unfolds from
                      there.
                    </p>
                  </div>
                  <Link
                    to={quickStart.href}
                    className="inline-flex h-11 flex-shrink-0 touch-manipulation items-center justify-center rounded-2xl bg-yellow-500 px-5 text-[14px] font-semibold text-black transition-colors hover:bg-yellow-400"
                  >
                    {quickStart.cta}
                  </Link>
                </div>
              </div>
            </motion.section>
          )}

          {/* Trial receipt — their own numbers ("3 certs, £4,200 quoted")
              while the trial runs; flips to an activation nudge when they
              haven't made anything yet. */}
          <TrialReceiptCard />

          {/* Editorial dashboard — single component so it can read the
              shared dashboard context the parent provider mounts. */}
          <EditorialDashboard />

          {/* Trial banner only — referral now lives inside the editorial flow
              as section 05 (BringAMate), gated to first 7 days. */}
          <TrialBanner />

          {/* Footer spacing for mobile nav */}
          <div className="h-4 sm:h-6" />
        </div>

        {/* Welcome modal for first-time users */}
        <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
      </DashboardDataProvider>
    </DashboardContainer>
  );
};

export default Dashboard;

/**
 * EditorialDashboard — the actual dashboard body. Extracted so it can call
 * `useDashboardVerdict` (which reads the DashboardDataProvider context
 * mounted by the parent). Renders the full numbered editorial flow:
 * Verdict → Today → This Month → Hubs → Momentum.
 */
function EditorialDashboard() {
  const { eyebrow, greeting, verdict, cta, queueItems, isLoading, role } = useDashboardVerdict();

  const todayLabel = role === 'apprentice' ? "TODAY'S TRAINING" : 'TODAY';
  const todayEmpty =
    role === 'apprentice'
      ? 'Nothing scheduled — pick up where you left off in Study Centre.'
      : "You're all caught up. Use the calm to push a quote out.";

  return (
    <div className="space-y-12 sm:space-y-16">
      <VerdictHero
        eyebrow={eyebrow}
        greeting={greeting}
        verdict={verdict}
        cta={cta}
        isLoading={isLoading}
      />
      <QuickAccessRow />
      <HeadlineStats number="01" label="THIS MONTH" />
      <EditorialHubGrid number="02" label="YOUR HUBS" />
      <TodayQueue number="03" label={todayLabel} items={queueItems} emptyMessage={todayEmpty} />
      <MomentumStrip number="04" label="MOMENTUM" />
    </div>
  );
}
