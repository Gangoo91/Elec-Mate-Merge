/**
 * Dashboard
 *
 * Main dashboard page - the first thing users see.
 * Premium design with real personalized stats, glass morphism,
 * and best-in-class mobile experience.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '@/contexts/AuthContext';
import useSEO from '@/hooks/useSEO';
import { storageGetSync } from '@/utils/storage';

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
      <div className="space-y-6 sm:space-y-8">
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
    </DashboardContainer>
  );
};

export default Dashboard;
