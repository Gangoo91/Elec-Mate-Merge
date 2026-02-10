/**
 * UnifiedApprenticeHub
 *
 * Main page combining Portfolio, OJT, and Progress into one unified hub.
 * Routes:
 * - /apprentice/hub (default: home tab)
 * - /apprentice/hub?tab=work
 * - /apprentice/hub?tab=hours
 * - /apprentice/hub?tab=progress
 * - /apprentice/hub?tab=me
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ApprenticeHubShell } from '@/components/apprentice-hub/ApprenticeHubShell';
import { ApprenticeHubTab } from '@/components/apprentice-hub/ApprenticeHubNav';
import { UnifiedDashboard } from '@/components/apprentice-hub/UnifiedDashboard';
import { PortfolioGrid } from '@/components/apprentice-hub/PortfolioGrid';
import { OJTProgressSection } from '@/components/apprentice-hub/OJTProgressSection';
import { ProfileSection } from '@/components/apprentice-hub/ProfileSection';
import { UnifiedCaptureSheet } from '@/components/apprentice-hub/UnifiedCaptureSheet';
import { ProgressDashboard } from '@/components/apprentice/progress/ProgressDashboard';

export default function UnifiedApprenticeHub() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get tab from URL or default to 'home'
  const tabParam = searchParams.get('tab') as ApprenticeHubTab | null;
  const [activeTab, setActiveTab] = useState<ApprenticeHubTab>(
    tabParam && ['home', 'work', 'hours', 'progress', 'me'].includes(tabParam)
      ? tabParam
      : 'home'
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

  // Sync active tab with URL on mount
  useEffect(() => {
    if (tabParam && ['home', 'work', 'hours', 'progress', 'me'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  const handleTabChange = (tab: ApprenticeHubTab) => {
    setActiveTab(tab);
  };

  const handleCapture = () => {
    setShowCapture(true);
  };

  const handleCaptureClose = () => {
    setShowCapture(false);
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
    exit: { opacity: 0, y: -8 }
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <UnifiedDashboard
            onNavigate={handleTabChange}
            onCapture={handleCapture}
          />
        );
      case 'work':
        return <PortfolioGrid onCapture={handleCapture} />;
      case 'hours':
        return <OJTProgressSection />;
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
