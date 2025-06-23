
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, Brain, Clock, Heart, Lightbulb, Users, TrendingUp } from "lucide-react";
import ExamStrategiesTab from "@/components/apprentice/study-tips/ExamStrategiesTab";
import RevisionTechniquesTab from "@/components/apprentice/study-tips/RevisionTechniquesTab";
import TimeManagementTab from "@/components/apprentice/study-tips/TimeManagementTab";
import ResourcesTab from "@/components/apprentice/study-tips/ResourcesTab";
import StudyFundamentalsTab from "@/components/apprentice/study-tips/StudyFundamentalsTab";
import StudyPsychologyTab from "@/components/apprentice/study-tips/StudyPsychologyTab";
import StudyGroupsTab from "@/components/apprentice/study-tips/StudyGroupsTab";
import ProgressTrackingTab from "@/components/apprentice/study-tips/ProgressTrackingTab";

const StudyTips = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Elec-Mate Study Hub</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Your complete study companion for electrical training success. Master 18th Edition, Level 3, and all electrical qualifications with Elec-Mate's comprehensive learning resources and proven study strategies.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-400">8</p>
            <p className="text-xs text-muted-foreground">Study Methods</p>
          </CardContent>
        </Card>
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-400">95%</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <p className="text-2xl font-bold text-elec-yellow">15+</p>
            <p className="text-xs text-muted-foreground">Techniques</p>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-400">30min</p>
            <p className="text-xs text-muted-foreground">Daily Study</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fundamentals" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="fundamentals" className="flex items-center gap-1 text-xs">
            <Lightbulb className="h-3 w-3" />
            <span className="hidden sm:inline">Fundamentals</span>
          </TabsTrigger>
          <TabsTrigger value="exam-strategies" className="flex items-center gap-1 text-xs">
            <Target className="h-3 w-3" />
            <span className="hidden sm:inline">Exams</span>
          </TabsTrigger>
          <TabsTrigger value="revision-techniques" className="flex items-center gap-1 text-xs">
            <Brain className="h-3 w-3" />
            <span className="hidden sm:inline">Learning</span>
          </TabsTrigger>
          <TabsTrigger value="time-management" className="flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            <span className="hidden sm:inline">Time</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1 text-xs">
            <BookOpen className="h-3 w-3" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="psychology" className="flex items-center gap-1 text-xs">
            <Heart className="h-3 w-3" />
            <span className="hidden sm:inline">Psychology</span>
          </TabsTrigger>
          <TabsTrigger value="study-groups" className="flex items-center gap-1 text-xs">
            <Users className="h-3 w-3" />
            <span className="hidden sm:inline">Groups</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3" />
            <span className="hidden sm:inline">Progress</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fundamentals">
          <StudyFundamentalsTab />
        </TabsContent>

        <TabsContent value="exam-strategies">
          <ExamStrategiesTab />
        </TabsContent>

        <TabsContent value="revision-techniques">
          <RevisionTechniquesTab />
        </TabsContent>

        <TabsContent value="time-management">
          <TimeManagementTab />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesTab />
        </TabsContent>

        <TabsContent value="psychology">
          <StudyPsychologyTab />
        </TabsContent>

        <TabsContent value="study-groups">
          <StudyGroupsTab />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTrackingTab />
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Elec-Mate Study Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Remember: Elec-Mate is designed to support your entire electrical learning journey. From basic concepts to advanced applications, 
            our integrated study tools, practice resources, and community support help you build a solid foundation and achieve exam success. 
            Consistent daily engagement with Elec-Mate - even just 30 minutes - is more effective than cramming sessions. 
            The electrical trade rewards methodical, steady progress - let Elec-Mate guide your path to qualification.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTips;
