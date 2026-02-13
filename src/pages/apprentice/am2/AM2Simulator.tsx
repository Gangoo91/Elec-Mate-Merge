/**
 * AM2Simulator
 *
 * Tab layout: Readiness | Isolation | Testing | Faults | Knowledge | History
 * Main entry page for the AM2 Readiness Simulator feature.
 *
 * When immersive tabs (Testing, Isolation, Faults) are active,
 * the page header is hidden to maximise screen space.
 */

import { useSearchParams } from 'react-router-dom';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Target, Lock, Search, BookOpen, Clock, ShieldAlert, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AM2ReadinessDashboard } from '@/components/am2/AM2ReadinessDashboard';
import { SafeIsolationAssessment } from '@/components/am2/safe-isolation/SafeIsolationAssessment';
import { FaultFindingSimulator } from '@/components/am2/fault-finding/FaultFindingSimulator';
import { TestingSimulator } from '@/components/am2/testing-simulator/TestingSimulator';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabId) || 'readiness';
  const setActiveTab = (tab: TabId) => setSearchParams({ tab }, { replace: false });

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
        <div className="px-4 pt-4 pb-2">
          <div className="mb-3">
            <SmartBackButton />
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/20 rounded-xl shrink-0">
              <ShieldAlert className="h-7 w-7 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">AM2 Readiness</h1>
              <p className="text-white text-sm">
                Identify practical gaps before you book your AM2
              </p>
            </div>
          </div>
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
        {activeTab === 'readiness' && <AM2ReadinessDashboard onNavigateToTab={setActiveTab} />}

        {activeTab === 'safe-isolation' && <SafeIsolationAssessment />}

        {activeTab === 'testing' && <TestingSimulator />}

        {activeTab === 'faults' && <FaultFindingSimulator />}

        {activeTab === 'knowledge' && (
          <PlaceholderTab
            icon={BookOpen}
            title="Knowledge Test"
            description="30 multiple-choice questions covering BS 7671, health & safety, building regulations, and installation techniques. Coming soon."
          />
        )}

        {activeTab === 'history' && (
          <PlaceholderTab
            icon={Clock}
            title="Session History"
            description="Your past simulation attempts, scores, and progress over time will appear here."
          />
        )}
      </div>
    </div>
  );
};

function PlaceholderTab({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Target;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 space-y-3">
      <div className="h-14 w-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
        <Icon className="h-7 w-7 text-white/20" />
      </div>
      <p className="text-sm font-medium text-white text-center">{title}</p>
      <p className="text-xs text-white text-center max-w-xs">{description}</p>
    </div>
  );
}

export default AM2Simulator;
