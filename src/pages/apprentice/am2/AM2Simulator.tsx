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
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
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

  // For non-immersive non-readiness tabs (knowledge, history) we still
  // show a back-to-readiness affordance + an editorial header.
  return (
    <div
      className={cn(
        'animate-fade-in',
        isImmersive
          ? 'flex flex-col h-[100dvh]'
          : 'mx-auto max-w-7xl 2xl:max-w-[1440px] pb-20 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6'
      )}
    >
      {!isImmersive && (
        <motion.div variants={itemVariants} className="mb-4">
          <button
            type="button"
            onClick={() => (isReadiness ? navigate('/apprentice') : setActiveTab('readiness'))}
            className="inline-flex items-center gap-1.5 h-9 px-2 -ml-2 text-[13px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            {isReadiness ? 'Back' : 'AM2 readiness'}
          </button>
        </motion.div>
      )}

      {/* Editorial header — only on the readiness landing. The immersive
          simulators have their own headers; knowledge + history get a
          smaller eyebrow row inside their component. */}
      {isReadiness && (
        <motion.div variants={itemVariants} className="space-y-1.5 mb-2">
          <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            Apprentice · AM2
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white">
            AM2 readiness
          </h1>
          <p className="text-[13px] sm:text-sm text-white/70 max-w-2xl leading-relaxed">
            Practical simulator and knowledge test for the four AM2 components. Identify the gaps
            before you book.
          </p>
        </motion.div>
      )}

      {/* Tab Content — immersive simulators get a bounded centred column
          on desktop so the controls don't span 1920px and look forlorn. */}
      <div className={cn(isImmersive ? 'flex-1 min-h-0 overflow-hidden' : 'min-h-[60vh]')}>
        <div
          className={cn(
            isImmersive ? 'mx-auto w-full max-w-4xl xl:max-w-5xl h-full flex flex-col' : 'w-full'
          )}
        >
          {activeTab === 'readiness' && (
            <AM2ReadinessDashboard key={readinessKey} onNavigateToTab={setActiveTab} />
          )}

          {activeTab === 'safe-isolation' && (
            <SafeIsolationAssessment onSessionComplete={invalidateReadiness} />
          )}

          {activeTab === 'testing' && <TestingSimulator onSessionComplete={invalidateReadiness} />}

          {activeTab === 'faults' && (
            <FaultFindingSimulator onSessionComplete={invalidateReadiness} />
          )}

          {activeTab === 'knowledge' && (
            <AM2KnowledgeQuiz onSessionComplete={invalidateReadiness} />
          )}

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
      </div>
    </div>
  );
};

export default AM2Simulator;
