/**
 * UnifiedApprenticeHub
 *
 * Apprentice portfolio workspace. Hours/OJT moved out — now lives at
 * /apprentice/ojt-hub as its own surface.
 * Routes:
 * - /apprentice/hub (default: portfolio dashboard)
 * - /apprentice/hub?tab=work
 * - /apprentice/hub?tab=progress
 * - /apprentice/hub?tab=me
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import { ApprenticeHubShell } from '@/components/apprentice-hub/ApprenticeHubShell';
import { ApprenticeHubTab } from '@/components/apprentice-hub/ApprenticeHubNav';
import { UnifiedDashboard } from '@/components/apprentice-hub/UnifiedDashboard';
import { PortfolioGrid } from '@/components/apprentice-hub/PortfolioGrid';
import { CourseRequirementsPanel } from '@/components/apprentice-hub/CourseRequirementsPanel';
import { ProfileSection } from '@/components/apprentice-hub/ProfileSection';
import { UnifiedCaptureSheet } from '@/components/apprentice-hub/UnifiedCaptureSheet';
import { ProgressDashboard } from '@/components/apprentice/progress/ProgressDashboard';

const VALID_TABS: ApprenticeHubTab[] = ['home', 'work', 'progress', 'me'];
const isValidTab = (t: string | null): t is ApprenticeHubTab =>
  !!t && (VALID_TABS as string[]).includes(t);

export default function UnifiedApprenticeHub() {
  useSEO({
    title: 'Apprentice Portfolio',
    description: 'Your apprenticeship portfolio — AC coverage, evidence, EPA gateway readiness.',
    noindex: true,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  // Get tab from URL or default to 'home'. Old ?tab=hours redirects to ojt-hub.
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<ApprenticeHubTab>(
    isValidTab(tabParam) ? tabParam : 'home'
  );

  // Capture sheet state
  const [showCapture, setShowCapture] = useState(false);

  // Sync URL with active tab. Clone the params (never mutate the live
  // URLSearchParams in place) and replace the entry rather than pushing, so
  // tab switches don't spam browser history or trap the back button.
  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (activeTab === 'home') {
          next.delete('tab');
        } else {
          next.set('tab', activeTab);
        }
        return next;
      },
      { replace: true }
    );
  }, [activeTab, setSearchParams]);

  // Sync active tab with URL on mount; deep-links with ?tab=hours redirect to OJT.
  useEffect(() => {
    if (tabParam === 'hours') {
      window.location.replace('/apprentice/ojt-hub');
      return;
    }
    if (isValidTab(tabParam)) {
      setActiveTab(tabParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab: ApprenticeHubTab) => {
    setActiveTab(tab);
  };

  const handleCapture = () => {
    setShowCapture(true);
  };

  const handleCaptureComplete = () => {
    setShowCapture(false);
    // Optionally switch to My Work tab to show new evidence
    // setActiveTab('work');
  };

  // Tab content animation variants
  const tabContentVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <UnifiedDashboard onNavigate={handleTabChange} onCapture={handleCapture} />;
      case 'work':
        /*
         * ELE-1728 — what you have to do, above what you have done.
         *
         * `CourseRequirementsPanel` was built, worked, and was rendered
         * NOWHERE: its only other home was `PortfolioOverview`, which sits
         * behind the retired `/apprentice/portfolio-hub` redirect. So the app
         * held 2,581 assessment criteria and showed a learner none of them.
         * 92 people chose a qualification; 7 ever added a portfolio item.
         *
         * Cole Humphreys, redoing his NVQ 3: "i've choose my qualification on
         * the app, but it doesn't seem straight forward on what i've got to do
         * for my portfolio." He was right — nothing told him.
         */
        return (
          <div className="space-y-4">
            <CourseRequirementsPanel onChangeCourse={() => handleTabChange('home')} />
            <PortfolioGrid onCapture={handleCapture} />
          </div>
        );
      case 'progress':
        return <ProgressDashboard />;
      case 'me':
        return <ProfileSection />;
      default:
        return null;
    }
  };

  return (
    <>
      <ApprenticeHubShell
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCapture={handleCapture}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </ApprenticeHubShell>

      {/* Unified Capture Sheet */}
      <UnifiedCaptureSheet
        open={showCapture}
        onOpenChange={setShowCapture}
        onComplete={handleCaptureComplete}
      />
    </>
  );
}
