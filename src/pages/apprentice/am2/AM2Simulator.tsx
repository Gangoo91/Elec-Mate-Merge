/**
 * AM2Simulator
 *
 * Tab layout: Readiness | Isolation | Testing | Faults | Knowledge | History
 * Main entry page for the AM2 Readiness Simulator feature.
 *
 * When immersive tabs (Testing, Isolation, Faults) are active,
 * the page header is hidden to maximise screen space.
 *
 * readinessKey forces the dashboard to re-fetch after any simulator
 * completes a session, so the score updates immediately.
 */

import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Lock, Search, BookOpen, Clock, Gauge } from 'lucide-react';
import { PageHero, itemVariants } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { AM2ReadinessDashboard } from '@/components/am2/AM2ReadinessDashboard';
import { SafeIsolationAssessment } from '@/components/am2/safe-isolation/SafeIsolationAssessment';
import { FaultFindingSimulator } from '@/components/am2/fault-finding/FaultFindingSimulator';
import { TestingSimulator } from '@/components/am2/testing-simulator/TestingSimulator';
import { AM2KnowledgeQuiz } from '@/components/am2/AM2KnowledgeQuiz';
import { AM2HistoryTab } from '@/components/am2/AM2HistoryTab';

type TabId = 'readiness' | 'safe-isolation' | 'testing' | 'faults' | 'knowledge' | 'history';

const TABS: { id: TabId; label: string; icon: typeof Target }[] = [
  { id: 'readiness', label: 'Readiness', icon: Target },
  { id: 'safe-isolation', label: 'Isolation', icon: Lock },
  { id: 'testing', label: 'Testing', icon: Gauge },
  { id: 'faults', label: 'Faults', icon: Search },
  { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
  { id: 'history', label: 'History', icon: Clock },
];

/** Tabs that use their own headers and need maximum vertical space */
const IMMERSIVE_TABS: TabId[] = ['testing', 'safe-isolation', 'faults'];

const AM2Simulator = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabId) || 'readiness';
  const setActiveTab = (tab: TabId) => setSearchParams({ tab }, { replace: false });

  // Incrementing key forces dashboard to re-mount and re-fetch after sessions complete
  const [readinessKey, setReadinessKey] = useState(0);
  const invalidateReadiness = useCallback(() => {
    setReadinessKey((k) => k + 1);
  }, []);

  const isImmersive = IMMERSIVE_TABS.includes(activeTab);

  return (
    <div
      className={cn(
        'max-w-2xl mx-auto animate-fade-in',
        isImmersive ? 'flex flex-col h-[100dvh]' : 'pb-20'
      )}
    >
      {/* Header — hidden for immersive tabs */}
      {!isImmersive && (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-2 space-y-6">
          <motion.div variants={itemVariants}>
            <Button
              variant="ghost"
              onClick={() => navigate('/apprentice')}
              className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <PageHero
              eyebrow="Apprentice · AM2"
              title="AM2 readiness"
              description="Six readiness modes — isolation, testing, fault-finding, knowledge and live history. Identify the practical gaps before you book your AM2."
              tone="yellow"
            />
          </motion.div>
        </div>
      )}

      {/* Tab Bar */}
      <div
        className={cn(
          'sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-white/5',
          isImmersive && 'shrink-0'
        )}
      >
        <div className="flex px-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium touch-manipulation transition-colors',
                activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-white'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className={cn(isImmersive ? 'flex-1 min-h-0 overflow-hidden' : 'min-h-[60vh]')}>
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

        {activeTab === 'knowledge' && <AM2KnowledgeQuiz onSessionComplete={invalidateReadiness} />}

        {activeTab === 'history' && <AM2HistoryTab onNavigateToTab={setActiveTab} />}
      </div>
    </div>
  );
};

export default AM2Simulator;
