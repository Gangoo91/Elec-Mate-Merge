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

  // Sync URL with active tab - use replace: false to create history entries for back button
  useEffect(() => {
    if (activeTab === 'home') {
      searchParams.delete('tab');
    } else {
      searchParams.set('tab', activeTab);
    }
    setSearchParams(searchParams, { replace: false });
  }, [activeTab, searchParams, setSearchParams]);

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
        return <PortfolioGrid onCapture={handleCapture} />;
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
