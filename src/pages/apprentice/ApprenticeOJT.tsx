
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Clock, FileText, Target, Award, BarChart3 } from "lucide-react";
import TimeTrackingTab from "@/components/apprentice/ojt/TimeTrackingTab";
import PortfolioBuildingTab from "@/components/apprentice/ojt/PortfolioBuildingTab";
import EvidenceUploadTab from "@/components/apprentice/ojt/EvidenceUploadTab";
import AssessmentTrackingTab from "@/components/apprentice/ojt/AssessmentTrackingTab";
import ComplianceDashboardTab from "@/components/apprentice/ojt/ComplianceDashboardTab";

const ApprenticeOJT = () => {
  console.log('ApprenticeOJT component rendering');

  const tabs = [
    { value: "portfolio", label: "Portfolio", icon: FileText, content: <PortfolioBuildingTab /> },
    { value: "time-tracking", label: "Time Tracking", icon: Clock, content: <TimeTrackingTab /> },
    { value: "evidence", label: "Evidence Assessment", icon: Target, content: <EvidenceUploadTab /> },
    { value: "assessments", label: "Assessments", icon: Award, content: <AssessmentTrackingTab /> },
    { value: "compliance", label: "Goals & Progress", icon: BarChart3, content: <ComplianceDashboardTab /> }
  ];

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
        <DropdownTabs
          tabs={tabs}
          defaultValue="portfolio"
          placeholder="Select a training section"
          className="mx-auto"
          triggerClassName="w-full sm:w-[280px] md:w-[320px]"
        />
      </div>
    </div>
  );
};

export default ApprenticeOJT;
