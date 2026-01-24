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
import { SecondaryQuickAccess } from '@/components/dashboard/SecondaryQuickAccess';
import TrialBanner from '@/components/dashboard/TrialBanner';
import WelcomeModal from '@/components/onboarding/WelcomeModal';
import { DesignedCircuitsCard } from '@/components/dashboard/DesignedCircuitsCard';
import { useAuth } from '@/contexts/AuthContext';
import useSEO from '@/hooks/useSEO';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      delay: delay * 0.1,
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
      // Small delay to let the dashboard load first
      const timer = setTimeout(() => setShowWelcome(true), 500);
      return () => clearTimeout(timer);
    }
  }, [profile, isLoading]);

  return (
    <DashboardContainer>
      <div className="space-y-6 sm:space-y-8">
        {/* Premium Hero Welcome */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <PremiumHero />
        </motion.section>

        {/* Live Stats Bar - Real data, swipeable on mobile */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <LiveStatsBar />
        </motion.section>

        {/* Trial Banner (if applicable) */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <TrialBanner />
        </motion.section>

        {/* Premium Hub Cards */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h2 className="text-xs sm:text-sm font-medium text-white/70 uppercase tracking-wider mb-3 px-0.5">
            Your Hubs
          </h2>
          <PremiumHubGrid />
        </motion.section>

        {/* Smart Actions - Prioritized action queue */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <SmartActions />
        </motion.section>

        {/* Designed Circuits from Circuit Designer */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <DesignedCircuitsCard />
        </motion.section>

        {/* Secondary Quick Access */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          <SecondaryQuickAccess />
        </motion.section>

        {/* Footer spacing for mobile nav */}
        <div className="h-4 sm:h-6" />
      </div>

      {/* Welcome modal for first-time users */}
      <WelcomeModal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
      />
    </DashboardContainer>
  );
};

export default Dashboard;
