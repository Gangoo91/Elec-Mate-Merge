
import BackButton from "@/components/common/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, FileText, Target, Award, BarChart3 } from "lucide-react";
import TimeTrackingTab from "@/components/apprentice/ojt/TimeTrackingTab";
import PortfolioBuildingTab from "@/components/apprentice/ojt/PortfolioBuildingTab";
import EvidenceUploadTab from "@/components/apprentice/ojt/EvidenceUploadTab";
import AssessmentTrackingTab from "@/components/apprentice/ojt/AssessmentTrackingTab";
import ComplianceDashboardTab from "@/components/apprentice/ojt/ComplianceDashboardTab";

const ApprenticeOJT = () => {
  console.log('ApprenticeOJT component rendering');
  
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Off-the-Job Training Management</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Comprehensive tracking and management of your 20% off-the-job training requirements, portfolio building, and apprenticeship progression
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      <Tabs defaultValue="time-tracking" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="time-tracking" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Time Tracking
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="evidence" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Evidence
          </TabsTrigger>
          <TabsTrigger value="assessments" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Assessments
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Goals & Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="time-tracking">
          <TimeTrackingTab />
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioBuildingTab />
        </TabsContent>

        <TabsContent value="evidence">
          <EvidenceUploadTab />
        </TabsContent>

        <TabsContent value="assessments">
          <AssessmentTrackingTab />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceDashboardTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApprenticeOJT;
