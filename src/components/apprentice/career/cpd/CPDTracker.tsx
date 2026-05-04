import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownTabs, DropdownTab } from '@/components/ui/dropdown-tabs';
import { Clock, Target, TrendingUp, Award, ArrowLeft } from 'lucide-react';
import CPDOverview from './CPDOverview';
import CPDEntryForm from './CPDEntryForm';
import CPDHistory from './CPDHistory';
import CPDGoals from './CPDGoals';
import CPDDashboard from './enhanced/CPDDashboard';
import MobileCPDTracker from './enhanced/MobileCPDTracker';
import { useCPDAutoTracking } from '@/hooks/cpd/useCPDAutoTracking';

const CPDTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);

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
    startTracking('CPD Management', 'CPD Tracker');

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

  if (isMobile) {
    return (
      <div className="min-h-screen bg-elec-dark animate-fade-in">
        <div className="sticky top-0 z-20 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06] p-4">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Professional development
            </span>
            <h1 className="text-[18px] font-semibold text-white leading-tight">CPD tracker</h1>
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'overview' && (
            <MobileCPDTracker
              onAddEntry={handleAddEntry}
              onViewEntry={handleViewEntry}
              onViewHistory={handleViewHistory}
            />
          )}
          {activeTab === 'log-activity' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-white">Add CPD entry</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('overview')}
                  className="h-10 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <CPDEntryForm />
            </div>
          )}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-white">CPD history</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('overview')}
                  className="h-10 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <CPDHistory />
            </div>
          )}
          {activeTab === 'goals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-white">CPD goals</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('overview')}
                  className="h-10 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <CPDGoals />
            </div>
          )}
        </div>
      </div>
    );
  }

  const cpdTabs: DropdownTab[] = [
    {
      value: 'overview',
      label: 'Overview',
      icon: TrendingUp,
      content: (
        <CPDDashboard
          onAddEntry={handleAddEntry}
          onViewHistory={handleViewHistory}
          onManageGoals={handleManageGoals}
        />
      ),
    },
    {
      value: 'log-activity',
      label: 'Log Activity',
      icon: Clock,
      content: <CPDEntryForm />,
    },
    {
      value: 'history',
      label: 'History',
      icon: Award,
      content: <CPDHistory />,
    },
    {
      value: 'goals',
      label: 'Goals',
      icon: Target,
      content: <CPDGoals />,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Professional development
        </span>
        <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
          CPD tracker
        </h1>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Track your Continuing Professional Development activities and maintain compliance with
          professional body requirements. Set goals, log activities and monitor your progress.
        </p>
      </div>

      <DropdownTabs
        tabs={cpdTabs}
        defaultValue={activeTab}
        placeholder="Select CPD section"
        onValueChange={setActiveTab}
        className="w-full"
      />
    </div>
  );
};

export default CPDTracker;
