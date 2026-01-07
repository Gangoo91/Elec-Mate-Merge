/**
 * UnifiedApprenticeHub
 *
 * Main page combining Portfolio and OJT functionality into one unified hub.
 * Routes:
 * - /apprentice/hub (default: home tab)
 * - /apprentice/hub?tab=work
 * - /apprentice/hub?tab=hours
 * - /apprentice/hub?tab=me
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ApprenticeHubShell } from '@/components/apprentice-hub/ApprenticeHubShell';
import { ApprenticeHubTab } from '@/components/apprentice-hub/ApprenticeHubNav';
import { UnifiedDashboard } from '@/components/apprentice-hub/UnifiedDashboard';
import { PortfolioGrid } from '@/components/apprentice-hub/PortfolioGrid';
import { OJTProgressSection } from '@/components/apprentice-hub/OJTProgressSection';
import { ProfileSection } from '@/components/apprentice-hub/ProfileSection';
import { UnifiedCaptureSheet } from '@/components/apprentice-hub/UnifiedCaptureSheet';

export default function UnifiedApprenticeHub() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get tab from URL or default to 'home'
  const tabParam = searchParams.get('tab') as ApprenticeHubTab | null;
  const [activeTab, setActiveTab] = useState<ApprenticeHubTab>(
    tabParam && ['home', 'work', 'hours', 'me'].includes(tabParam)
      ? tabParam
      : 'home'
  );

  // Capture sheet state
  const [showCapture, setShowCapture] = useState(false);

  // Sync URL with active tab
  useEffect(() => {
    if (activeTab === 'home') {
      searchParams.delete('tab');
    } else {
      searchParams.set('tab', activeTab);
    }
    setSearchParams(searchParams, { replace: true });
  }, [activeTab, searchParams, setSearchParams]);

  // Sync active tab with URL on mount
  useEffect(() => {
    if (tabParam && ['home', 'work', 'hours', 'me'].includes(tabParam)) {
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
        {renderTabContent()}
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
