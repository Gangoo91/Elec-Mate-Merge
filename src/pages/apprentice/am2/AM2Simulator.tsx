/**
 * AM2Simulator
 *
 * Routes (via `?tab=` URL param):
 *   readiness      — landing (hub-style grid + readiness gauge)
 *   safe-isolation — 8-step procedure simulator
 *   testing        — testing-sequence simulator
 *   faults         — fault-finding simulator
 *   knowledge      — MCQ knowledge test (fixed bank + generated calculation questions)
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

import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HubPage } from '@/components/hub/HubPrimitives';
import { SectionBDrill } from '@/components/am2/SectionBDrill';
import { DRILLS, type DrillKind } from '@/data/am2/sectionBDrills';
import { AM2TopBar } from '@/components/am2/AM2TopBar';
import { cn } from '@/lib/utils';
import { AM2Home } from '@/components/am2/AM2Home';
import { SafeIsolationAssessment } from '@/components/am2/safe-isolation/SafeIsolationAssessment';
import { SafeWorkingPractices } from '@/components/am2/safe-working/SafeWorkingPractices';
import { FaultFindingSimulator } from '@/components/am2/fault-finding/FaultFindingSimulator';
import { TestingSimulator } from '@/components/am2/testing-simulator/TestingSimulator';
import { AM2KnowledgeQuiz } from '@/components/am2/AM2KnowledgeQuiz';
import { AM2HistoryTab } from '@/components/am2/AM2HistoryTab';
import { MockAM2Day } from '@/components/am2/MockAM2Day';
import { Bs7671RagQuiz } from '@/components/am2/Bs7671RagQuiz';
import { AM2DrillMode } from '@/components/am2/AM2DrillMode';

type TabId =
  | 'readiness'
  | 'safe-working'
  | 'safe-isolation'
  | 'testing'
  | 'faults'
  | 'knowledge'
  | 'bs7671'
  | 'drill'
  | 'history'
  | 'mock-day'
  | 'b-drill';

/** Tabs that use their own headers and need maximum vertical space.
 *  These render full-height with the page header suppressed. */
const TAB_TITLES: Record<TabId, string> = {
  readiness: 'AM2 practice',
  'safe-working': 'Safe working practices and planning',
  testing: 'Section B · Inspection and testing',
  'safe-isolation': 'Section C · Safe isolation',
  faults: 'Section D · Fault diagnosis',
  knowledge: 'Section E · Knowledge test',
  bs7671: 'BS 7671 spot check',
  drill: 'Weak-regs drill',
  history: 'Your runs',
  'mock-day': 'Mock AM2 day',
  'b-drill': 'Practice drill',
};

const IMMERSIVE_TABS: TabId[] = ['safe-working', 'testing', 'safe-isolation', 'faults', 'mock-day'];

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

  // The immersive frame has to end at the bottom of the screen, not 100dvh
  // below wherever the app shell happens to start it (that overflowed by the
  // height of the top bar plus page padding, ~90px on desktop). Measure where
  // it starts and size it to the rest of the viewport.
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameHeight, setFrameHeight] = useState<number | null>(null);
  useLayoutEffect(() => {
    if (!isImmersive) return;
    const fit = () => {
      const el = frameRef.current;
      const top = el?.getBoundingClientRect().top ?? 0;
      // Fill from where the frame starts to the bottom of the screen, less the
      // padding the app shell puts BELOW it (16px on desktop) — without that
      // the whole page scrolled a few pixels and showed a second scroll bar
      // beside the frame's own. (A pass that trimmed by document scrollHeight
      // was removed earlier: hidden shell elements inflated it.)
      let below = 0;
      for (let a = el?.parentElement; a && a !== document.body; a = a.parentElement) {
        const cs = getComputedStyle(a);
        below +=
          parseFloat(cs.paddingBottom) +
          parseFloat(cs.borderBottomWidth) +
          parseFloat(cs.marginBottom);
      }
      setFrameHeight(Math.max(420, window.innerHeight - Math.max(0, top + window.scrollY) - below));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [isImmersive, activeTab]);
  const isReadiness = activeTab === 'readiness';
  // Mock day under way: Back asks before throwing the day away.
  const [mockInProgress, setMockInProgress] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const afterGuard = useRef<(() => void) | null>(null);
  // While the day is under way, the browser's (or Android's) back asks too:
  // the extra history entry is re-pushed and the sheet shown instead.
  useEffect(() => {
    if (!mockInProgress) return;
    window.history.pushState({ am2MockGuard: true }, '');
    const onPop = () => {
      window.history.pushState({ am2MockGuard: true }, '');
      setConfirmLeave(true);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setConfirmLeave(false);
    window.addEventListener('popstate', onPop);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('keydown', onKey);
      // Step back over the guard entry, or Back later lands on it and does
      // nothing. Whatever was waiting (Leave's tab change) runs once it's gone.
      const after = afterGuard.current;
      afterGuard.current = null;
      if ((window.history.state as { am2MockGuard?: boolean } | null)?.am2MockGuard) {
        if (after) window.addEventListener('popstate', () => after(), { once: true });
        window.history.back();
      } else after?.();
    };
  }, [mockInProgress]);
  // While the leave sheet is open, keys mustn't reach the section behind it
  // (digits answering, Enter confirming). Caught first, at the window.
  useEffect(() => {
    if (!confirmLeave) return;
    const block = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setConfirmLeave(false);
      e.stopPropagation();
    };
    window.addEventListener('keydown', block, true);
    return () => window.removeEventListener('keydown', block, true);
  }, [confirmLeave]);
  const leaveSheet = confirmLeave && (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label="Leave the mock day?"
      onClick={() => setConfirmLeave(false)}
    >
      <div
        className="w-full rounded-t-2xl border-t border-white/[0.12] bg-[hsl(0_0%_9%)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:mx-auto sm:mb-6 sm:max-w-lg sm:rounded-2xl sm:border"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[17px] font-bold text-white">Leave the mock day?</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
          Each section you’ve finished is saved as its own run, but the mock day itself — the
          full-day result — is only saved once the last section is done.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            autoFocus
            onClick={() => setConfirmLeave(false)}
            className="h-12 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation"
          >
            Stay
          </button>
          <button
            type="button"
            onClick={() => {
              setConfirmLeave(false);
              afterGuard.current = () => setActiveTab('readiness');
              setMockInProgress(false);
            }}
            className="h-12 rounded-xl border border-white/[0.22] text-[15px] font-semibold text-white touch-manipulation"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );

  const content = (
    <div className={cn(isImmersive ? 'flex h-full w-full flex-col' : 'w-full')}>
      {activeTab === 'readiness' && (
        <AM2Home
          key={readinessKey}
          onNavigateToTab={(tab, mode) =>
            mode ? setSearchParams({ tab, mode }) : setActiveTab(tab as TabId)
          }
          onOpenDrill={(kinds) => setSearchParams({ tab: 'b-drill', kinds: kinds.join(',') })}
          onOpenTopic={(topic) => setSearchParams({ tab: 'knowledge', topic })}
        />
      )}

      {activeTab === 'safe-working' && (
        <SafeWorkingPractices onSessionComplete={invalidateReadiness} />
      )}

      {activeTab === 'safe-isolation' && (
        <SafeIsolationAssessment
          onSessionComplete={invalidateReadiness}
          startIn={searchParams.get('mode') === 'learn' ? 'learn' : undefined}
        />
      )}

      {activeTab === 'testing' && <TestingSimulator onSessionComplete={invalidateReadiness} />}

      {activeTab === 'faults' && <FaultFindingSimulator onSessionComplete={invalidateReadiness} />}

      {activeTab === 'knowledge' && (
        <AM2KnowledgeQuiz
          key={searchParams.get('topic') ?? 'all'}
          onSessionComplete={invalidateReadiness}
          initialTopic={searchParams.get('topic') ?? undefined}
        />
      )}

      {activeTab === 'history' && <AM2HistoryTab onNavigateToTab={setActiveTab} />}

      {activeTab === 'mock-day' && (
        <MockAM2Day
          onExit={() => setActiveTab('readiness')}
          onInProgressChange={setMockInProgress}
          onSessionComplete={invalidateReadiness}
          onPractise={setActiveTab}
        />
      )}

      {activeTab === 'bs7671' && (
        <Bs7671RagQuiz
          onExit={() => setActiveTab('readiness')}
          onSessionComplete={invalidateReadiness}
        />
      )}

      {activeTab === 'b-drill' && (
        <SectionBDrill
          kinds={(searchParams.get('kinds') ?? 'limits')
            .split(',')
            .filter((k): k is DrillKind => k in DRILLS)}
          onExit={() => setActiveTab('readiness')}
          onOpenRig={() =>
            setActiveTab(
              (searchParams.get('kinds') ?? '').startsWith('iso')
                ? 'safe-isolation'
                : (searchParams.get('kinds') ?? '').startsWith('fault')
                  ? 'faults'
                  : 'testing'
            )
          }
        />
      )}

      {activeTab === 'drill' && (
        <AM2DrillMode
          onExit={() => setActiveTab('readiness')}
          onOpenSpotCheck={() => setActiveTab('bs7671')}
          onSessionComplete={invalidateReadiness}
        />
      )}
    </div>
  );

  const bar = (
    <AM2TopBar
      backLabel={isReadiness ? 'Apprentice hub' : 'AM2'}
      onBack={
        isReadiness
          ? () => navigate('/apprentice')
          : activeTab === 'mock-day' && mockInProgress
            ? () => setConfirmLeave(true)
            : () => setActiveTab('readiness')
      }
      current={isReadiness ? undefined : TAB_TITLES[activeTab]}
    />
  );

  // The immersive simulators fill the rest of the viewport under the bar;
  // everything else scrolls as a normal page. Both sit on the 13% "reading"
  // ground so every AM2 screen is the same grey.
  if (isImmersive) {
    return (
      <div
        ref={frameRef}
        className="flex flex-col animate-fade-in bg-[hsl(0_0%_13%)]"
        style={{ height: frameHeight ? `${frameHeight}px` : '100dvh' }}
      >
        {bar}
        <div className="min-h-0 flex-1 overflow-hidden">{content}</div>
        {leaveSheet}
      </div>
    );
  }

  return (
    <HubPage ground="reading">
      {bar}
      <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
        <div className="min-h-[60vh]">{content}</div>
      </div>
    </HubPage>
  );
};

export default AM2Simulator;
