
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, Brain, Clock, Heart, Lightbulb } from "lucide-react";
import ExamStrategiesTab from "@/components/apprentice/study-tips/ExamStrategiesTab";
import RevisionTechniquesTab from "@/components/apprentice/study-tips/RevisionTechniquesTab";
import TimeManagementTab from "@/components/apprentice/study-tips/TimeManagementTab";
import ResourcesTab from "@/components/apprentice/study-tips/ResourcesTab";
import StudyFundamentalsTab from "@/components/apprentice/study-tips/StudyFundamentalsTab";
import StudyPsychologyTab from "@/components/apprentice/study-tips/StudyPsychologyTab";

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

      <Tabs defaultValue="fundamentals" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="fundamentals" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Fundamentals
          </TabsTrigger>
          <TabsTrigger value="exam-strategies" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Exam Strategies
          </TabsTrigger>
          <TabsTrigger value="revision-techniques" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Learning Techniques
          </TabsTrigger>
          <TabsTrigger value="time-management" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Time Management
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="psychology" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Study Psychology
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
