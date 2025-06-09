
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, FileText, Target, Award, BarChart3, User, TrendingUp, BookOpen } from "lucide-react";
import SmartAnalyticsTab from "@/components/apprentice/ojt/enhanced/SmartAnalyticsTab";
import IntelligentPortfolioTab from "@/components/apprentice/ojt/enhanced/IntelligentPortfolioTab";
import AssessmentPrepTab from "@/components/apprentice/ojt/enhanced/AssessmentPrepTab";
import ProgressInsightsTab from "@/components/apprentice/ojt/enhanced/ProgressInsightsTab";
import ComplianceTrackingTab from "@/components/apprentice/ojt/enhanced/ComplianceTrackingTab";
import CareerGuidanceTab from "@/components/apprentice/ojt/enhanced/CareerGuidanceTab";

const EnhancedOJT = () => {
  console.log('EnhancedOJT component rendering');
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Enhanced OJT Management</h1>
        <p className="text-xl text-elec-yellow font-semibold mb-2">AI-Powered Training Excellence</p>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Next-generation off-the-job training management with intelligent analytics, automated compliance tracking, 
          and personalised career guidance powered by advanced AI insights
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">AI Learning Score</p>
                <p className="text-2xl font-bold text-green-400">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border-blue-500/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Progress Velocity</p>
                <p className="text-2xl font-bold text-blue-400">+23%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 border-purple-500/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Goals on Track</p>
                <p className="text-2xl font-bold text-purple-400">8/10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Smart Analytics
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            AI Portfolio
          </TabsTrigger>
          <TabsTrigger value="assessment" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Assessment Prep
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progress Insights
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="career" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Career Guidance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <SmartAnalyticsTab />
        </TabsContent>

        <TabsContent value="portfolio">
          <IntelligentPortfolioTab />
        </TabsContent>

        <TabsContent value="assessment">
          <AssessmentPrepTab />
        </TabsContent>

        <TabsContent value="insights">
          <ProgressInsightsTab />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceTrackingTab />
        </TabsContent>

        <TabsContent value="career">
          <CareerGuidanceTab />
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/50 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Excellence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your enhanced OJT system now features intelligent progress tracking, automated compliance monitoring, 
            and personalised learning recommendations. The AI continuously analyses your performance patterns to 
            optimise your training journey and ensure successful apprenticeship completion.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedOJT;
