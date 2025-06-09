
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  FileText, 
  Target, 
  Award, 
  BarChart3, 
  User, 
  Upload,
  Calendar,
  MessageSquare,
  Download,
  Eye,
  ChevronRight
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import BackButton from "@/components/common/BackButton";
import TrainingTimeTracker from "@/components/apprentice/ojt/enhanced/TrainingTimeTracker";
import AdvancedPortfolioBuilder from "@/components/apprentice/ojt/enhanced/AdvancedPortfolioBuilder";
import ComprehensiveEvidenceManager from "@/components/apprentice/ojt/enhanced/ComprehensiveEvidenceManager";
import TutorReviewSystem from "@/components/apprentice/ojt/enhanced/TutorReviewSystem";
import AssessmentComplianceTracker from "@/components/apprentice/ojt/enhanced/AssessmentComplianceTracker";
import ExportIntegrationHub from "@/components/apprentice/ojt/enhanced/ExportIntegrationHub";

const EnhancedOJT = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useIsMobile();

  // Mock data for the dashboard
  const trainingStats = {
    totalHours: 245,
    targetHours: 832,
    weeklyHours: 12.5,
    targetWeeklyHours: 16,
    portfolioItems: 15,
    evidenceUploads: 23,
    pendingReviews: 3,
    completedAssessments: 8,
    totalAssessments: 12
  };

  const progressPercentage = (trainingStats.totalHours / trainingStats.targetHours) * 100;
  const weeklyProgressPercentage = (trainingStats.weeklyHours / trainingStats.targetWeeklyHours) * 100;

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Training Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Total Hours</span>
                <span>{trainingStats.totalHours}h / {trainingStats.targetHours}h</span>
              </div>
              <Progress value={progressPercentage} className="mb-2" />
              <p className="text-xs opacity-90">{progressPercentage.toFixed(1)}% complete</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>This Week</span>
                <span>{trainingStats.weeklyHours}h / {trainingStats.targetWeeklyHours}h</span>
              </div>
              <Progress value={weeklyProgressPercentage} className="mb-2" />
              <p className="text-xs opacity-90">{weeklyProgressPercentage.toFixed(1)}% of weekly target</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Portfolio</p>
                <p className="text-2xl font-bold">{trainingStats.portfolioItems}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Evidence</p>
                <p className="text-2xl font-bold">{trainingStats.evidenceUploads}</p>
              </div>
              <Upload className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reviews</p>
                <p className="text-2xl font-bold">{trainingStats.pendingReviews}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assessments</p>
                <p className="text-2xl font-bold">{trainingStats.completedAssessments}/{trainingStats.totalAssessments}</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Portfolio item uploaded</p>
                  <p className="text-sm text-muted-foreground">Consumer Unit Installation - 2 hours ago</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Tutor feedback received</p>
                  <p className="text-sm text-muted-foreground">Cable sizing task - 5 hours ago</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Assessment completed</p>
                  <p className="text-sm text-muted-foreground">Health & Safety quiz - Yesterday</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={() => setActiveTab("time-tracking")} 
          className="h-16 flex flex-col items-center justify-center gap-2"
        >
          <Clock className="h-6 w-6" />
          Log Training Time
        </Button>
        
        <Button 
          onClick={() => setActiveTab("evidence")} 
          variant="outline"
          className="h-16 flex flex-col items-center justify-center gap-2"
        >
          <Upload className="h-6 w-6" />
          Upload Evidence
        </Button>
        
        <Button 
          onClick={() => setActiveTab("export")} 
          variant="outline"
          className="h-16 flex flex-col items-center justify-center gap-2"
        >
          <Download className="h-6 w-6" />
          Export Report
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Training Management System
            </h1>
            <p className="text-muted-foreground">
              Comprehensive off-the-job training tracking and portfolio management
            </p>
          </div>
          <div className="flex gap-2">
            <BackButton customUrl="/apprentice" label="Back to Hub" />
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-7'} mb-6`}>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {!isMobile && "Dashboard"}
            </TabsTrigger>
            <TabsTrigger value="time-tracking" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {!isMobile && "Time"}
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {!isMobile && "Portfolio"}
            </TabsTrigger>
            <TabsTrigger value="evidence" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {!isMobile && "Evidence"}
            </TabsTrigger>
            <TabsTrigger value="tutor-review" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {!isMobile && "Reviews"}
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              {!isMobile && "Assessments"}
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {!isMobile && "Export"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardView />
          </TabsContent>

          <TabsContent value="time-tracking">
            <TrainingTimeTracker />
          </TabsContent>

          <TabsContent value="portfolio">
            <AdvancedPortfolioBuilder />
          </TabsContent>

          <TabsContent value="evidence">
            <ComprehensiveEvidenceManager />
          </TabsContent>

          <TabsContent value="tutor-review">
            <TutorReviewSystem />
          </TabsContent>

          <TabsContent value="assessments">
            <AssessmentComplianceTracker />
          </TabsContent>

          <TabsContent value="export">
            <ExportIntegrationHub />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedOJT;
