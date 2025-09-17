import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownTabs, DropdownTab } from "@/components/ui/dropdown-tabs";
import { Clock, Target, TrendingUp, Award, ClipboardList, History } from "lucide-react";
import ComplianceDashboard from "./enhanced/ComplianceDashboard";
import ActivityTemplates from "./enhanced/ActivityTemplates";
import AnalyticsDashboard from "./enhanced/AnalyticsDashboard";
import MobileEnhancedCPD from "./enhanced/MobileEnhancedCPD";
import CPDEntryForm from "../../../apprentice/career/cpd/CPDEntryForm";
import CPDHistory from "../../../apprentice/career/cpd/CPDHistory";
import CPDGoals from "../../../apprentice/career/cpd/CPDGoals";
import CPDDashboard from "../../../apprentice/career/cpd/enhanced/CPDDashboard";
import EnhancedCPDDashboard from "./EnhancedCPDDashboard";
import { useCPDAutoTracking } from "@/hooks/cpd/useCPDAutoTracking";
import { useUnifiedCPD } from "@/hooks/cpd/useUnifiedCPD";

const ElectricianCPDTracker = () => {
  const [activeTab, setActiveTab] = useState("compliance");
  const [isMobile, setIsMobile] = useState(false);
  const { generatePortfolio, loading } = useUnifiedCPD();
  
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
    startTracking('CPD Management', 'Electrician CPD Tracker');
    
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
        {/* Header */}
        <div className="bg-elec-dark border-b border-elec-yellow/20 p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <div>
              <h1 className="text-lg font-bold text-white">Electrician CPD Tracker</h1>
              <p className="text-xs text-muted-foreground">Professional Development</p>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4">
          {activeTab === "compliance" && (
            <EnhancedCPDDashboard 
              onAddEntry={handleAddEntry}
              onViewHistory={handleViewHistory}
              onManageGoals={handleManageGoals}
            />
          )}
          {activeTab === "log-activity" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Add CPD Entry</h2>
                <button 
                  onClick={() => setActiveTab("compliance")}
                  className="text-elec-yellow text-sm"
                >
                  Back
                </button>
              </div>
              <CPDEntryForm onSuccess={() => setActiveTab("compliance")} />
            </div>
          )}
          {activeTab === "history" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">CPD History</h2>
                <button 
                  onClick={() => setActiveTab("compliance")}
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
                  onClick={() => setActiveTab("compliance")}
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

  const cpdTabs: DropdownTab[] = [
    {
      value: "compliance",
      label: "Compliance",
      icon: TrendingUp,
      content: (
        <EnhancedCPDDashboard 
          onAddEntry={handleAddEntry}
          onViewHistory={handleViewHistory}
          onManageGoals={handleManageGoals}
        />
      )
    },
    {
      value: "log-activity",
      label: "Log Activity", 
      icon: ClipboardList,
      content: <CPDEntryForm onSuccess={() => setActiveTab("compliance")} />
    },
    {
      value: "history",
      label: "History",
      icon: History,
      content: <CPDHistory />
    },
    {
      value: "goals",
      label: "Goals",
      icon: Target,
      content: <CPDGoals />
    },
    {
      value: "templates", 
      label: "Templates",
      icon: Clock,
      content: <ActivityTemplates />
    },
    {
      value: "analytics",
      label: "Analytics",
      icon: Award,
      content: <AnalyticsDashboard />
    }
  ];

  // Desktop layout
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Clock className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl font-bold text-white">Enhanced CPD Tracker</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Professional-grade CPD tracking with compliance monitoring, evidence management, 
          and industry-specific templates for UK electricians.
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

export default ElectricianCPDTracker;