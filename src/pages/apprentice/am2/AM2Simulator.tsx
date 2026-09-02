/**
 * AM2Simulator
 *
 * Routes (via `?tab=` URL param):
 *   readiness      — landing (hub-style grid + readiness gauge)
 *   safe-isolation — 8-step procedure simulator
 *   testing        — testing-sequence simulator
 *   faults         — fault-finding simulator
 *   knowledge      — 400-question MCQ knowledge test
 *   history        — past session list
 *
 * The page used to expose every mode as a sticky icon-row of tabs at the
 * top. Replaced May 2026 with a hub-and-spoke layout: the readiness page
 * has 4 mode cards in a connected grid (matching /apprentice/hub), each
 * routing to its mode via `?tab=…`. Removed the cyan top-bar entirely —
 * navigation now lives in the cards (and in the per-mode "Back" affordance
 * that already existed inside each simulator).
 *
 * `readinessKey` forces the dashboard to re-fetch after any simulator
 * completes a session, so the score updates immediately.
 */

import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { cn } from '@/lib/utils';
import { AM2ReadinessDashboard } from '@/components/am2/AM2ReadinessDashboard';
import { SafeIsolationAssessment } from '@/components/am2/safe-isolation/SafeIsolationAssessment';
import { FaultFindingSimulator } from '@/components/am2/fault-finding/FaultFindingSimulator';
import { TestingSimulator } from '@/components/am2/testing-simulator/TestingSimulator';
import { AM2KnowledgeQuiz } from '@/components/am2/AM2KnowledgeQuiz';
import { AM2HistoryTab } from '@/components/am2/AM2HistoryTab';
import { MockAM2Day } from '@/components/am2/MockAM2Day';
import { Bs7671RagQuiz } from '@/components/am2/Bs7671RagQuiz';
import { AM2DrillMode } from '@/components/am2/AM2DrillMode';

type TabId =
  | 'readiness'
  | 'safe-isolation'
  | 'testing'
  | 'faults'
  | 'knowledge'
  | 'bs7671'
  | 'drill'
  | 'history'
  | 'mock-day';

/** Tabs that use their own headers and need maximum vertical space.
 *  These render full-height with the page header suppressed. */
const IMMERSIVE_TABS: TabId[] = ['testing', 'safe-isolation', 'faults', 'mock-day'];

const AM2Simulator = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabId) || 'readiness';
  const setActiveTab = (tab: TabId) => setSearchParams({ tab }, { replace: false });

  // Incrementing key forces the readiness dashboard to re-mount and
  // re-fetch after any simulator completes a session.
  const [readinessKey, setReadinessKey] = useState(0);
  const invalidateReadiness = useCallback(() => {
    setReadinessKey((k) => k + 1);
  }, []);

  const isImmersive = IMMERSIVE_TABS.includes(activeTab);
  const isReadiness = activeTab === 'readiness';

  const content = (
    <div
      className={cn(
        isImmersive ? 'mx-auto flex h-full w-full max-w-4xl flex-col xl:max-w-5xl' : 'w-full'
      )}
    >
      {activeTab === 'readiness' && (
        <AM2ReadinessDashboard key={readinessKey} onNavigateToTab={setActiveTab} />
      )}

      {activeTab === 'safe-isolation' && (
        <SafeIsolationAssessment onSessionComplete={invalidateReadiness} />
      )}

      {activeTab === 'testing' && <TestingSimulator onSessionComplete={invalidateReadiness} />}

      {activeTab === 'faults' && <FaultFindingSimulator onSessionComplete={invalidateReadiness} />}

      {activeTab === 'knowledge' && <AM2KnowledgeQuiz onSessionComplete={invalidateReadiness} />}

      {activeTab === 'history' && <AM2HistoryTab onNavigateToTab={setActiveTab} />}

      {activeTab === 'mock-day' && (
        <MockAM2Day
          onExit={() => setActiveTab('readiness')}
          onSessionComplete={invalidateReadiness}
        />
      )}

      {activeTab === 'bs7671' && (
        <Bs7671RagQuiz
          onExit={() => setActiveTab('readiness')}
          onSessionComplete={invalidateReadiness}
        />
      )}

      {activeTab === 'drill' && (
        <AM2DrillMode
          onExit={() => setActiveTab('readiness')}
          onSessionComplete={invalidateReadiness}
        />
      )}
    </div>
  );

  // The immersive simulators own the whole viewport and carry their own
  // headers; everything else sits in the shared hub frame, where Back steps
  // to the readiness landing first and only then out to the hub.
  if (isImmersive) {
    return (
      <div className="flex h-[100dvh] flex-col animate-fade-in">
        <div className="min-h-0 flex-1 overflow-hidden">{content}</div>
      </div>
    );
  }

  return (
    <HubSubPage
      title="AM2 readiness"
      backTo="/apprentice"
      onBack={isReadiness ? undefined : () => setActiveTab('readiness')}
      description={
        isReadiness
          ? 'Practical simulator and knowledge test for the four AM2 components. Find the gaps before you book.'
          : undefined
      }
    >
      <div className="min-h-[60vh]">{content}</div>
    </HubSubPage>
  );
};

export default AM2Simulator;
