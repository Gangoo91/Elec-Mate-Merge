import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownTabs, DropdownTab } from '@/components/ui/dropdown-tabs';
import { Clock, Target, TrendingUp, Award, ClipboardList, History, Settings } from 'lucide-react';
import ComplianceDashboard from './enhanced/ComplianceDashboard';
import ActivityTemplates from './enhanced/ActivityTemplates';
import AnalyticsDashboard from './enhanced/AnalyticsDashboard';
import MobileEnhancedCPD from './enhanced/MobileEnhancedCPD';
import EnhancedCPDEntryForm from './enhanced/EnhancedCPDEntryForm';
import CPDHistory from '../../../apprentice/career/cpd/CPDHistory';
import CPDGoals from '../../../apprentice/career/cpd/CPDGoals';
import CPDDashboard from '../../../apprentice/career/cpd/enhanced/CPDDashboard';
import EnhancedCPDDashboard from './EnhancedCPDDashboard';
import { useCPDAutoTracking } from '@/hooks/cpd/useCPDAutoTracking';
import { useUnifiedCPD } from '@/hooks/cpd/useUnifiedCPD';
import ProfessionalBodyManager from './ProfessionalBodyManager';

const ElectricianCPDTracker = () => {
  const [activeTab, setActiveTab] = useState('compliance');
  const [isMobile, setIsMobile] = useState(false);
  const [showProfessionalBodyManager, setShowProfessionalBodyManager] = useState(false);
  const { generatePortfolio, loading } = useUnifiedCPD();

  // Initialize auto-tracking for the CPD tracker
  const { startTracking, stopTracking } = useCPDAutoTracking({
    enabled: true,
    minimumMinutes: 15,
    sources: ['CPD Management', 'Professional Development'],
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Start auto-tracking when component mounts
    startTracking('CPD Management', 'Electrician CPD Tracker');

    return () => {
      window.removeEventListener('resize', checkMobile);
      stopTracking();
    };
  }, [startTracking, stopTracking]);

  const handleAddEntry = () => {
    setActiveTab('log-activity');
  };

  const handleViewHistory = () => {
    setActiveTab('history');
  };

  const handleManageGoals = () => {
    setActiveTab('goals');
  };

  const handleViewEntry = (id: string) => {
    // Navigate to specific entry in history
    setActiveTab('history');
  };

  const handleExportPortfolio = async () => {
    const portfolio = await generatePortfolio(`CPD Portfolio - ${new Date().getFullYear()}`);
    if (portfolio) {
      // Portfolio created successfully - user will see toast notification
    }
  };

  // Mobile-first responsive design
  if (isMobile) {
    return (
      <div className="min-h-screen bg-elec-dark">
        {/* Editorial header */}
        <div className="px-4 pt-5 pb-4 border-b border-white/[0.08]">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              CPD
            </span>
            <button
              onClick={() => setActiveTab('settings')}
              className="text-[10.5px] uppercase tracking-[0.14em] text-white/85 hover:text-elec-yellow inline-flex items-center gap-1.5 border border-white/15 rounded-full px-2.5 py-1 min-h-[28px] touch-manipulation"
            >
              <Settings className="h-3 w-3" />
              Bodies
            </button>
          </div>
          <h2 className="mt-1 text-[28px] font-semibold tracking-tight leading-[1.05]">
            <span className="text-elec-yellow">Track</span>{' '}
            <span className="text-white">your hours.</span>
          </h2>
        </div>

        {/* Mobile Content */}
        <div className="p-4">
          {activeTab === 'compliance' && (
            <EnhancedCPDDashboard
              onAddEntry={handleAddEntry}
              onViewHistory={handleViewHistory}
              onManageGoals={handleManageGoals}
            />
          )}
          {activeTab === 'log-activity' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Add CPD Entry</h2>
                <button
                  onClick={() => setActiveTab('compliance')}
                  className="text-elec-yellow text-sm"
                >
                  Back
                </button>
              </div>
              <EnhancedCPDEntryForm onSuccess={() => setActiveTab('compliance')} />
            </div>
          )}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">CPD History</h2>
                <button
                  onClick={() => setActiveTab('compliance')}
                  className="text-elec-yellow text-sm"
                >
                  Back
                </button>
              </div>
              <CPDHistory />
            </div>
          )}
          {activeTab === 'goals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">CPD Goals</h2>
                <button
                  onClick={() => setActiveTab('compliance')}
                  className="text-elec-yellow text-sm"
                >
                  Back
                </button>
              </div>
              <CPDGoals />
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Professional Body Settings
                </h2>
                <button
                  onClick={() => setActiveTab('compliance')}
                  className="text-elec-yellow text-sm"
                >
                  Back
                </button>
              </div>
              <ProfessionalBodyManager />
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Professional Body Settings
                </h2>
                <button
                  onClick={() => setActiveTab('compliance')}
                  className="text-elec-yellow text-sm"
                >
                  Back
                </button>
              </div>
              <ProfessionalBodyManager />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show Professional Body Manager in modal if requested
  if (showProfessionalBodyManager && !isMobile) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-elec-gray rounded-lg border border-elec-yellow/20 w-full max-w-4xl max-h-[90vh] overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Professional Body Settings</h2>
              <button
                onClick={() => setShowProfessionalBodyManager(false)}
                className="text-white hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <ProfessionalBodyManager onClose={() => setShowProfessionalBodyManager(false)} />
          </div>
        </div>
      </div>
    );
  }

  const cpdTabs: DropdownTab[] = [
    {
      value: 'compliance',
      label: 'Compliance',
      icon: TrendingUp,
      content: (
        <EnhancedCPDDashboard
          onAddEntry={handleAddEntry}
          onViewHistory={handleViewHistory}
          onManageGoals={handleManageGoals}
        />
      ),
    },
    {
      value: 'log-activity',
      label: 'Log Activity',
      icon: ClipboardList,
      content: <EnhancedCPDEntryForm onSuccess={() => setActiveTab('compliance')} />,
    },
    {
      value: 'history',
      label: 'History',
      icon: History,
      content: <CPDHistory />,
    },
    {
      value: 'goals',
      label: 'Goals',
      icon: Target,
      content: <CPDGoals />,
    },
    {
      value: 'templates',
      label: 'Templates',
      icon: Clock,
      content: <ActivityTemplates />,
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: Award,
      content: <AnalyticsDashboard />,
    },
    {
      value: 'settings',
      label: 'Settings',
      icon: Settings,
      content: <ProfessionalBodyManager />,
    },
  ];

  // Desktop layout
  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Editorial header */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            CPD · CONTINUOUS PROFESSIONAL DEVELOPMENT
          </span>
          <button
            onClick={() => setShowProfessionalBodyManager(true)}
            className="text-[11px] uppercase tracking-[0.14em] text-white/85 hover:text-elec-yellow border border-white/15 hover:border-elec-yellow/40 rounded-full px-3 py-1 min-h-[32px] touch-manipulation transition-colors inline-flex items-center gap-1.5"
          >
            <Settings className="h-3.5 w-3.5" />
            Bodies
          </button>
        </div>
        <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-semibold tracking-tight leading-[1.05]">
          <span className="text-elec-yellow">Track</span>{' '}
          <span className="text-white">your hours.</span>
        </h2>
        <p className="text-[14px] sm:text-[15px] leading-relaxed text-white max-w-3xl">
          Log activities, manage evidence, hit your annual hour targets per professional body — IET
          30 hours / NICEIC 12 hours / ECA 30 hours / NAPIT 12 hours typical. Compliance dashboard,
          goal tracking, evidence library, analytics.
        </p>
      </section>

      {/* Main Content */}
      <DropdownTabs
        tabs={cpdTabs}
        defaultValue={activeTab}
        placeholder="Select CPD section"
        onValueChange={setActiveTab}
        className="w-full"
        key={activeTab} // Force re-render when activeTab changes
      />
    </div>
  );
};

export default ElectricianCPDTracker;
