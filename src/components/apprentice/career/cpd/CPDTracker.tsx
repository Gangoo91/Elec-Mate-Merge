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

  // Mobile-first responsive design
  if (isMobile) {
    return (
      <div className="min-h-screen bg-elec-dark animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-elec-gray to-elec-card backdrop-blur-sm border-b border-elec-yellow/20 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Clock className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CPD Tracker</h1>
              <p className="text-xs text-white">Professional Development</p>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
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
                <h2 className="text-lg font-semibold text-white">Add CPD Entry</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('overview')}
                  className="h-10 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
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
                <h2 className="text-lg font-semibold text-white">CPD History</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('overview')}
                  className="h-10 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
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
                <h2 className="text-lg font-semibold text-white">CPD Goals</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('overview')}
                  className="h-10 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
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

  // Desktop layout
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Clock className="h-7 w-7 text-elec-yellow" />
          </div>
          <h1 className="text-3xl font-bold text-white">CPD Tracker</h1>
        </div>
        <p className="text-white max-w-2xl mx-auto">
          Track your Continuing Professional Development activities and maintain compliance with
          professional body requirements. Set goals, log activities, and monitor your progress.
        </p>
      </div>

      {/* Main Content */}
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
