
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, FileText, Target, Award, BarChart3, Bell } from "lucide-react";
import TimeTrackingTab from "@/components/apprentice/ojt/TimeTrackingTab";
import PortfolioManagementTab from "@/components/apprentice/ojt/PortfolioManagementTab";
import EvidenceUploadTab from "@/components/apprentice/ojt/EvidenceUploadTab";
import AssessmentTrackingTab from "@/components/apprentice/ojt/AssessmentTrackingTab";
import ComplianceDashboardTab from "@/components/apprentice/ojt/ComplianceDashboardTab";
import NotificationsPanel from "@/components/apprentice/ojt/NotificationsPanel";

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
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
              <PortfolioManagementTab />
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

        {/* Sidebar with Notifications */}
        <div className="lg:col-span-1 space-y-6">
          <NotificationsPanel />
          
          <Card className="border-green-500/50 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Remember
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Your off-the-job training should constitute at least 20% of your working hours. Use this tool to track 
                your progress, build your portfolio, and ensure you meet all apprenticeship requirements for successful completion.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApprenticeOJT;
