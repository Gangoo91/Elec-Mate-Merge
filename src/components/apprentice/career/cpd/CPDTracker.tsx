
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Target, TrendingUp, Award } from "lucide-react";
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
      <div className="min-h-screen bg-elec-dark">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-elec-dark/95 backdrop-blur-sm border-b border-elec-yellow/20 p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <div>
              <h1 className="text-lg font-bold text-white">CPD Tracker</h1>
              <p className="text-xs text-muted-foreground">Professional Development</p>
            </div>
          </div>
        </div>

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
                <button 
                  onClick={() => setActiveTab("overview")}
                  className="text-elec-yellow text-sm"
                >
                  Back
                </button>
              </div>
              <CPDEntryForm />
            </div>
          )}
          {activeTab === "history" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">CPD History</h2>
                <button 
                  onClick={() => setActiveTab("overview")}
                  className="text-elec-yellow text-sm"
                >
                  Back
                </button>
              </div>
              <CPDHistory />
            </div>
          )}
          {activeTab === "goals" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">CPD Goals</h2>
                <button 
                  onClick={() => setActiveTab("overview")}
                  className="text-elec-yellow text-sm"
                >
                  Back
                </button>
              </div>
              <CPDGoals />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Clock className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl font-bold text-white">CPD Tracker</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your Continuing Professional Development activities and maintain compliance 
          with professional body requirements. Set goals, log activities, and monitor your progress.
        </p>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-elec-gray">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="log-activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Log Activity
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <CPDDashboard 
            onAddEntry={handleAddEntry}
            onViewHistory={handleViewHistory}
            onManageGoals={handleManageGoals}
          />
        </TabsContent>

        <TabsContent value="log-activity" className="space-y-6">
          <CPDEntryForm />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <CPDHistory />
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <CPDGoals />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CPDTracker;
