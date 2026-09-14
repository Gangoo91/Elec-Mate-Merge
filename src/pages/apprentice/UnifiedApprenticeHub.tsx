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
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ApprenticeHubShell } from '@/components/apprentice-hub/ApprenticeHubShell';
import { ApprenticeHubTab } from '@/components/apprentice-hub/ApprenticeHubNav';
import { UnifiedDashboard } from '@/components/apprentice-hub/UnifiedDashboard';
import { PortfolioGrid } from '@/components/apprentice-hub/PortfolioGrid';
import { CourseRequirementsPanel } from '@/components/apprentice-hub/CourseRequirementsPanel';
import { PortfolioStartHere } from '@/components/apprentice-hub/PortfolioStartHere';
import { storageGetSync, storageSetSync } from '@/utils/storage';

/** Which side of My Work the learner was last on. */
const WORK_PANE_KEY = 'apprentice:work-pane';
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

  /*
   * Which side of My Work to show.
   *
   * Deliberately NOT derived from "does this learner have evidence yet", which
   * is the obvious implementation and the wrong one: `usePortfolioData` holds
   * plain state rather than a shared cache, so every caller runs its own query.
   * `PortfolioGrid` and `CourseRequirementsPanel` already call it on this tab;
   * asking again here would fetch the same rows a third time, and the answer
   * arrives too late anyway — the grid would paint first and then be replaced,
   * which reads as a glitch.
   *
   * Remembering the choice is better on both counts. A first-time visitor lands
   * on Start here; after that they get wherever they last were.
   */
  const [workPane, setWorkPane] = useState<'start' | 'evidence'>(
    () => (storageGetSync(WORK_PANE_KEY) as 'start' | 'evidence' | null) ?? 'start'
  );

  const chooseWorkPane = (pane: 'start' | 'evidence') => {
    setWorkPane(pane);
    storageSetSync(WORK_PANE_KEY, pane);
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

  /*
   * ELE-1728 — My Work has two sides: "Start here" and the evidence itself.
   *
   * Cole Humphreys went into the portfolio and got lost. The screen showed an
   * empty grid and a button; it never said which course he was being marked
   * against, how evidence becomes progress, or where the written guide was.
   * 92 learners have chosen a qualification and 7 have ever added an item.
   *
   * Start here leads for someone with nothing in yet, and steps aside the
   * moment they have evidence — at which point the requirements list is the
   * useful thing, not an introduction. An earlier attempt put those 2,581
   * assessment criteria at the top of this screen for everyone, which is a wall
   * rather than a welcome for anyone still working out what to do.
   */
  const renderWorkTab = () => {
    return (
      <div className="space-y-4">
        <div className="flex gap-2" role="tablist" aria-label="My Work">
          {(['start', 'evidence'] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={workPane === key}
              onClick={() => chooseWorkPane(key)}
              className={cn(
                'h-11 flex-1 touch-manipulation rounded-xl text-[13px] font-semibold transition-colors',
                workPane === key
                  ? 'bg-elec-yellow text-black'
                  : 'border border-white/[0.12] bg-white/[0.06] text-white'
              )}
            >
              {key === 'start' ? 'Start here' : 'My evidence'}
            </button>
          ))}
        </div>

        {workPane === 'start' ? (
          <>
            <PortfolioStartHere
              onChooseCourse={() => handleTabChange('home')}
              onCapture={handleCapture}
            />
            {/* The full criteria list sits under the explanation, for when
                they want it rather than before they can use it. */}
            <CourseRequirementsPanel onChangeCourse={() => handleTabChange('home')} />
          </>
        ) : (
          <PortfolioGrid onCapture={handleCapture} />
        )}
      </div>
    );
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <UnifiedDashboard onNavigate={handleTabChange} onCapture={handleCapture} />;
      case 'work':
        return renderWorkTab();
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
