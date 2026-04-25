/**
 * Dashboard
 *
 * Main dashboard page - the first thing users see.
 * Premium design with real personalized stats, glass morphism,
 * and best-in-class mobile experience.
 */

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardContainer } from '@/components/dashboard/DashboardContainer';
import { PremiumHero } from '@/components/dashboard/PremiumHero';
import { LiveStatsBar } from '@/components/dashboard/LiveStatsBar';
import { PremiumHubGrid } from '@/components/dashboard/PremiumHubGrid';
import { SmartActions } from '@/components/dashboard/SmartActions';
import TrialBanner from '@/components/dashboard/TrialBanner';
import ReferralBanner from '@/components/referrals/ReferralBanner';
import WelcomeModal from '@/components/onboarding/WelcomeModal';
import { DesignedCircuitsCard } from '@/components/dashboard/DesignedCircuitsCard';
import { DashboardDataProvider } from '@/hooks/useDashboardData';
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
      ? {
          cta: 'Open Study Centre',
          href: '/study-centre/apprentice',
        }
      : profile?.role === 'employer'
      ? {
          cta: 'Open Employer Hub',
          href: '/employer',
        }
      : {
          cta: 'Open Certificates',
          href: '/electrician/inspection-testing',
        };

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
      // Also check localStorage as fallback (in case profile update was slow)
      if (storageGetSync('elec-mate-onboarding-done')) return;
      const timer = setTimeout(() => setShowWelcome(true), 500);
      return () => clearTimeout(timer);
    }
  }, [profile, isLoading]);

  return (
    <DashboardContainer>
      <DashboardDataProvider>
      <div className="space-y-6 sm:space-y-8">
        {isFirstVisit && (
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={-0.5}
          >
            <div className="relative rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
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
                    Make the first{' '}
                    <span className="text-yellow-400">ten minutes</span> count.
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.55] text-white sm:text-[15px]">
                    Run one real task through the platform — the rest of the workflow unfolds
                    from there.
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

        {/* Premium Hero Welcome */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={0}>
          <PremiumHero />
        </motion.section>

        {/* Live Stats Bar - Real data, swipeable on mobile */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={1}>
          <LiveStatsBar />
        </motion.section>

        {/* Trial Banner (if applicable) */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={2}>
          <TrialBanner />
        </motion.section>

        {/* Referral Banner (first 7 days) */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={2.5}>
          <ReferralBanner />
        </motion.section>

        {/* Premium Hub Cards */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={3}>
          <PremiumHubGrid />
        </motion.section>

        {/* Smart Actions - Prioritized action queue */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={4}>
          <SmartActions />
        </motion.section>

        {/* Designed Circuits from Circuit Designer */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={5}>
          <DesignedCircuitsCard />
        </motion.section>

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
