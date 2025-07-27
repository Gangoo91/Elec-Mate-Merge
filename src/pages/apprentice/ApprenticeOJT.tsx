
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, FileText, Target, Award, BarChart3 } from "lucide-react";
import TimeTrackingTab from "@/components/apprentice/ojt/TimeTrackingTab";
import PortfolioBuildingTab from "@/components/apprentice/ojt/PortfolioBuildingTab";
import EvidenceUploadTab from "@/components/apprentice/ojt/EvidenceUploadTab";
import AssessmentTrackingTab from "@/components/apprentice/ojt/AssessmentTrackingTab";
import ComplianceDashboardTab from "@/components/apprentice/ojt/ComplianceDashboardTab";

const ApprenticeOJT = () => {
  console.log('ApprenticeOJT component rendering');
  const [activeTab, setActiveTab] = useState("time-tracking");

  const tabOptions = [
    { value: "time-tracking", label: "Time Tracking", icon: Clock },
    { value: "portfolio", label: "Portfolio", icon: FileText },
    { value: "evidence", label: "Evidence Assessment", icon: Target },
    { value: "assessments", label: "Assessments", icon: Award },
    { value: "compliance", label: "Goals & Progress", icon: BarChart3 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "time-tracking":
        return <TimeTrackingTab />;
      case "portfolio":
        return <PortfolioBuildingTab />;
      case "evidence":
        return <EvidenceUploadTab />;
      case "assessments":
        return <AssessmentTrackingTab />;
      case "compliance":
        return <ComplianceDashboardTab />;
      default:
        return <TimeTrackingTab />;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Off-the-Job Training Management</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Comprehensive tracking and management of your 20% off-the-job training requirements, portfolio building, and apprenticeship progression
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      <div className="w-full space-y-6">
        <div className="flex justify-center">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-[280px] md:w-[320px]">
              <SelectValue placeholder="Select a section">
                <div className="flex items-center gap-2">
                  {(() => {
                    const currentTab = tabOptions.find(tab => tab.value === activeTab);
                    const IconComponent = currentTab?.icon;
                    return (
                      <>
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        {currentTab?.label}
                      </>
                    );
                  })()}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {tabOptions.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <SelectItem key={tab.value} value={tab.value}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      {tab.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ApprenticeOJT;
