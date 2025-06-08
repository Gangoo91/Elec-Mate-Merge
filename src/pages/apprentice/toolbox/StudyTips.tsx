
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, Brain, Clock, Heart } from "lucide-react";
import ExamStrategiesTab from "@/components/apprentice/study-tips/ExamStrategiesTab";
import RevisionTechniquesTab from "@/components/apprentice/study-tips/RevisionTechniquesTab";
import ResourcesTab from "@/components/apprentice/study-tips/ResourcesTab";
import TimeManagementTab from "@/components/apprentice/study-tips/TimeManagementTab";

const StudyTips = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Study Tips for Electrical Apprentices</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Proven revision strategies for 18th Edition and Level 3 exams, plus free resources to help you succeed
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Tabs defaultValue="exam-strategies" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="exam-strategies" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Exam Strategies
          </TabsTrigger>
          <TabsTrigger value="revision-techniques" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Revision Techniques
          </TabsTrigger>
          <TabsTrigger value="time-management" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Time Management
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

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
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Remember: consistent daily study beats cramming every time. 30 minutes every day 
            for 3 months is better than 8-hour sessions the week before your exam. 
            The electrical trade rewards methodical, steady progress - apply that same 
            approach to your studies.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTips;
