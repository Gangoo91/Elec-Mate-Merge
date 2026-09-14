import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import TestingResources from '@/components/apprentice/testing-procedures/TestingResources';
import TestSequenceCard from '@/components/apprentice/testing-procedures/TestSequenceCard';
import TestPickerCards from '@/components/apprentice/testing-procedures/TestPickerCards';
import { TEST_OPTIONS } from '@/components/apprentice/testing-procedures/data/testOptions';
import { CALLOUT_INSET } from '@/components/ui/panel-recipe';
import { cn } from '@/lib/utils';
import R1R2TestingTab from '@/components/apprentice/testing-procedures/testing-tabs/R1R2Testing/R1R2TestingTab';
import IRTestingTab from '@/components/apprentice/testing-procedures/testing-tabs/InsulationResistance/IRTestingTab';
import ZsTestingTab from '@/components/apprentice/testing-procedures/testing-tabs/EarthFaultLoop/ZsTestingTab';
import PolarityTestingTab from '@/components/apprentice/testing-procedures/testing-tabs/Polarity/PolarityTestingTab';
import { Button } from '@/components/ui/button';
import { BookmarkCheck } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

const TestingProcedures = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'r1r2';
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const [lastVisited, setLastVisited] = useState<string | null>(null);

  // Track active tab for persistence
  useEffect(() => {
    const savedTab = storageGetSync('lastTestingTab');
    if (savedTab) {
      setLastVisited(savedTab);
    }
  }, []);

  /*
   * No toast on tab change. It used to fire one saying "your progress is
   * automatically saved" — nothing of the sort happens. The only thing stored
   * is which tab you were last on; the step you had reached inside a tab is
   * lost the moment you switch. Switching is its own feedback anyway.
   */
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    storageSetSync('lastTestingTab', value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'r1r2':
        return <R1R2TestingTab />;
      case 'ir':
        return <IRTestingTab />;
      case 'zs':
        return <ZsTestingTab />;
      case 'polarity':
        return <PolarityTestingTab />;
      default:
        return <R1R2TestingTab />;
    }
  };

  /* Derived from TEST_OPTIONS rather than a second switch — the two lists had
     already drifted apart once ("Zs Testing" against "Earth Fault Loop"), and
     that list now lives with the cards that render it. */
  const getTabName = (tabId: string) => TEST_OPTIONS.find((t) => t.value === tabId)?.label ?? tabId;

  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Testing"
        title="Testing procedures"
        backTo="/apprentice/on-job-tools"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Step-by-step guides for four core BS 7671 tests — R₁+R₂ continuity, insulation resistance
          and polarity are dead tests; earth fault loop impedance is carried out live. Reflects BS
          7671:2018+A4:2026.
        </p>

        {lastVisited && activeTab !== lastVisited && (
          /* Was blue, then briefly a volt wash — which is the muddy-brown rule
             again. Neutral lit surface, accent on the edge and the icon. */
          <div
            className={cn(
              CALLOUT_INSET,
              'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'
            )}
          >
            <div className="flex items-center gap-2">
              <BookmarkCheck className="h-4 w-4 shrink-0 text-elec-yellow" />
              <span className="text-[14px] text-white">
                You were last on <span className="font-medium">{getTabName(lastVisited)}</span>.
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-11 shrink-0 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
              onClick={() => setActiveTab(lastVisited)}
            >
              Go back to it
            </Button>
          </div>
        )}

        <TestSequenceCard />

        <div className="w-full space-y-5">
          {/* 🔴 Four cards, not a dropdown.
              The tests used to sit inside a 280px centred Select, so you could
              not see that there were four — or which are done dead — without
              opening it. Beside it was a "?" whose only action was a toast
              reading "Contact your supervisor or send us feedback", which
              answers nothing. Both are gone. */}
          <TestPickerCards active={activeTab} onSelect={handleTabChange} />

          <div className="w-full animate-fade-in">{renderTabContent()}</div>
        </div>

        <TestingResources />
      </HubBody>
    </HubPage>
  );
};

export default TestingProcedures;
