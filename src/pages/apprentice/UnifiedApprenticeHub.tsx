/**
 * UnifiedApprenticeHub — /apprentice/hub
 *
 * ELE-1892: one portfolio home. The old Portfolio and My work tabs are now
 * one screen (PortfolioHome: Evidence · Coverage · Readiness); Progress is the
 * learning tracker; Me is the account page. Hours/OJT live at /apprentice/ojt-hub.
 *
 * Routes:
 * - /apprentice/hub                      portfolio home (evidence list)
 * - /apprentice/hub?view=coverage        every criterion, six-state legend
 * - /apprentice/hub?view=readiness       EPA gateway and readiness checks
 * - /apprentice/hub?item=<id>            opens one piece of evidence
 * - /apprentice/hub?tab=progress | me
 * - ?tab=work (old links) lands on the evidence list
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import { ApprenticeHubShell } from '@/components/apprentice-hub/ApprenticeHubShell';
import { ApprenticeHubTab } from '@/components/apprentice-hub/ApprenticeHubNav';
import { PortfolioHome } from '@/components/apprentice-hub/portfolio2/PortfolioHome';
import { ProfileSection } from '@/components/apprentice-hub/ProfileSection';
import {
  UnifiedCaptureSheet,
  type CaptureSeed,
} from '@/components/apprentice-hub/UnifiedCaptureSheet';
import { LearningHome } from '@/components/apprentice/progress/LearningHome';

const VALID_TABS: ApprenticeHubTab[] = ['home', 'progress', 'me'];
const isValidTab = (t: string | null): t is ApprenticeHubTab =>
  !!t && (VALID_TABS as string[]).includes(t);

export default function UnifiedApprenticeHub() {
  useSEO({
    title: 'Apprentice Portfolio',
    description: 'Your apprenticeship portfolio: evidence, criteria, assessment and EPA gateway readiness.',
    noindex: true,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  // Old ?tab=work links land on the evidence list; ?tab=hours goes to OJT.
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<ApprenticeHubTab>(
    isValidTab(tabParam) ? tabParam : 'home'
  );

  const [showCapture, setShowCapture] = useState(false);
  const [captureSeed, setCaptureSeed] = useState<CaptureSeed | null>(null);

  // Keep the URL in step with the tab. Clone the params and replace the entry
  // rather than pushing, so tab switches don't trap the back button.
  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (activeTab === 'home') next.delete('tab');
        else next.set('tab', activeTab);
        return next;
      },
      { replace: true }
    );
  }, [activeTab, setSearchParams]);

  useEffect(() => {
    if (tabParam === 'hours') {
      window.location.replace('/apprentice/ojt-hub');
      return;
    }
    if (isValidTab(tabParam)) setActiveTab(tabParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = (seed?: CaptureSeed | null) => {
    setCaptureSeed(seed ?? null);
    setShowCapture(true);
  };

  // From the Me tab: open a portfolio view (Coverage, Readiness) on the
  // Portfolio tab. The view param is set before PortfolioHome mounts, so it
  // opens on that view.
  const openPortfolioView = (view: 'evidence' | 'coverage' | 'readiness') => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('tab');
        if (view === 'evidence') next.delete('view');
        else next.set('view', view);
        return next;
      },
      { replace: true }
    );
    setActiveTab('home');
    window.scrollTo({ top: 0 });
  };

  const tabContentVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
      case 'work':
        return <PortfolioHome onCapture={handleCapture} />;
      case 'progress':
        return <LearningHome />;
      case 'me':
        return <ProfileSection onOpenView={openPortfolioView} onOpenTab={setActiveTab} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ApprenticeHubShell
        activeTab={activeTab === 'work' ? 'home' : activeTab}
        onTabChange={setActiveTab}
        onCapture={() => handleCapture(null)}
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

      <UnifiedCaptureSheet
        open={showCapture}
        onOpenChange={(o) => {
          setShowCapture(o);
          if (!o) setCaptureSeed(null);
        }}
        onComplete={() => {
          setShowCapture(false);
          setCaptureSeed(null);
        }}
        seed={captureSeed}
      />
    </>
  );
}
