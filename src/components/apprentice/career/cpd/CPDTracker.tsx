
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownTabs, DropdownTab } from "@/components/ui/dropdown-tabs";
import { Clock, Target, TrendingUp, Award, Construction, ArrowLeft } from "lucide-react";
import CPDOverview from "./CPDOverview";
import CPDEntryForm from "./CPDEntryForm";
import CPDHistory from "./CPDHistory";
import CPDGoals from "./CPDGoals";
import CPDDashboard from "./enhanced/CPDDashboard";
import MobileCPDTracker from "./enhanced/MobileCPDTracker";
import { useCPDAutoTracking } from "@/hooks/cpd/useCPDAutoTracking";

const CPDTracker = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [showComingSoonBanner, setShowComingSoonBanner] = useState(true);

  // Initialize auto-tracking for the CPD tracker
  const { startTracking, stopTracking } = useCPDAutoTracking({
    enabled: true,
    minimumMinutes: 15,
    sources: ['CPD Management', 'Professional Development']
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
    setActiveTab("log-activity");
  };

  const handleViewHistory = () => {
    setActiveTab("history");
  };

  const handleManageGoals = () => {
    setActiveTab("goals");
  };

  const handleViewEntry = (id: string) => {
    // Navigate to specific entry in history
    setActiveTab("history");
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
              <p className="text-xs text-white/70">Professional Development</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Banner */}
        {showComingSoonBanner && (
          <div className="mx-4 mt-4 relative bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/30 rounded-xl p-4 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <button
              onClick={() => setShowComingSoonBanner(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors p-1"
              aria-label="Dismiss banner"
            >
              ✕
            </button>
            <div className="flex items-start gap-3 pr-6 relative">
              <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                <Construction className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-400 mb-1">
                  Coming Soon
                </h3>
                <p className="text-sm text-white/80">
                  Enhanced CPD features are currently in development. All existing functionality remains fully accessible below.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Content */}
        <div className="p-4">
          {activeTab === "overview" && (
            <MobileCPDTracker
              onAddEntry={handleAddEntry}
              onViewEntry={handleViewEntry}
              onViewHistory={handleViewHistory}
            />
          )}
          {activeTab === "log-activity" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Add CPD Entry</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("overview")}
                  className="h-10 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <CPDEntryForm />
            </div>
          )}
          {activeTab === "history" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">CPD History</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("overview")}
                  className="h-10 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <CPDHistory />
            </div>
          )}
          {activeTab === "goals" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">CPD Goals</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("overview")}
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
      value: "overview",
      label: "Overview",
      icon: TrendingUp,
      content: (
        <CPDDashboard 
          onAddEntry={handleAddEntry}
          onViewHistory={handleViewHistory}
          onManageGoals={handleManageGoals}
        />
      )
    },
    {
      value: "log-activity",
      label: "Log Activity",
      icon: Clock,
      content: <CPDEntryForm />
    },
    {
      value: "history",
      label: "History",
      icon: Award,
      content: <CPDHistory />
    },
    {
      value: "goals",
      label: "Goals",
      icon: Target,
      content: <CPDGoals />
    }
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
        <p className="text-white/80 max-w-2xl mx-auto">
          Track your Continuing Professional Development activities and maintain compliance
          with professional body requirements. Set goals, log activities, and monitor your progress.
        </p>
      </div>

      {/* Coming Soon Banner */}
      {showComingSoonBanner && (
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6 relative">
            <button
              onClick={() => setShowComingSoonBanner(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-1"
              aria-label="Dismiss banner"
            >
              ✕
            </button>
            <div className="flex items-start gap-4 pr-8">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30">
                <Construction className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-1">
                  Coming Soon
                </h3>
                <p className="text-base text-white/80">
                  Enhanced CPD features are currently in development. All existing functionality remains fully accessible below.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
