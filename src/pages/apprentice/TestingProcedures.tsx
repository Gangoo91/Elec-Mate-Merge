import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import TestingResources from '@/components/apprentice/testing-procedures/TestingResources';
import TestSequenceCard from '@/components/apprentice/testing-procedures/TestSequenceCard';
import { CALLOUT_INSET } from '@/components/ui/panel-recipe';
import { cn } from '@/lib/utils';
import R1R2TestingTab from '@/components/apprentice/testing-procedures/testing-tabs/R1R2Testing/R1R2TestingTab';
import IRTestingTab from '@/components/apprentice/testing-procedures/testing-tabs/InsulationResistance/IRTestingTab';
import ZsTestingTab from '@/components/apprentice/testing-procedures/testing-tabs/EarthFaultLoop/ZsTestingTab';
import PolarityTestingTab from '@/components/apprentice/testing-procedures/testing-tabs/Polarity/PolarityTestingTab';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  BookmarkCheck,
  HelpCircle,
  Zap,
  Activity,
  GitBranch,
  Check,
} from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

const TestingProcedures = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'r1r2';
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const [lastVisited, setLastVisited] = useState<string | null>(null);

  const testingOptions = [
    { value: 'r1r2', label: 'R₁+R₂ continuity', icon: Zap },
    { value: 'ir', label: 'Insulation resistance', icon: Activity },
    { value: 'zs', label: 'Earth fault loop (Zs)', icon: GitBranch },
    { value: 'polarity', label: 'Polarity', icon: Check },
  ];

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

  /* Derived from testingOptions rather than a second switch — the two lists
     had already drifted apart ("Zs Testing" against "Earth Fault Loop"). */
  const getTabName = (tabId: string) =>
    testingOptions.find((tab) => tab.value === tabId)?.label ?? tabId;

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
          and polarity are dead tests; earth fault loop impedance is carried out live. Reflects
          BS 7671:2018+A4:2026.
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
                You were last on{' '}
                <span className="font-medium">{getTabName(lastVisited)}</span>.
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

        <div className="w-full space-y-6">
          <div className="flex justify-center relative">
            <Select value={activeTab} onValueChange={handleTabChange}>
              <SelectTrigger className="w-[280px] md:w-[320px]">
                <SelectValue placeholder="Select testing procedure">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const currentTab = testingOptions.find((tab) => tab.value === activeTab);
                      const IconComponent = currentTab?.icon;
                      return (
                        <>
                          {IconComponent && <IconComponent className="h-4 w-4" />}
                          {currentTab?.label}
                        </>
                      );
                    })()}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {testingOptions.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <SelectItem key={tab.value} value={tab.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {tab.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <div className="absolute top-0 right-0">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full h-8 w-8 p-0"
                onClick={() =>
                  toast.info('Need help? Contact your supervisor or send us feedback.')
                }
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="w-full animate-fade-in">{renderTabContent()}</div>
        </div>

        <TestingResources />
      </HubBody>
    </HubPage>
  );
};

export default TestingProcedures;
