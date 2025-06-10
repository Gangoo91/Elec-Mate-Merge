
import React from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, BookOpen, Target, Users, Brain, Shield } from "lucide-react";
import InteractiveScenariosTab from "@/components/apprentice/safety-cases/InteractiveScenariosTab";
import SafetyKnowledgeTab from "@/components/apprentice/safety-cases/SafetyKnowledgeTab";
import CaseStudiesTab from "@/components/apprentice/safety-cases/CaseStudiesTab";
import AssessmentToolsTab from "@/components/apprentice/safety-cases/AssessmentToolsTab";

const OnJobSafetyCases = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Interactive Safety Case Studies</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Learn from real-world electrical safety scenarios through interactive case studies, comprehensive assessments, and detailed safety knowledge modules
        </p>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to On-Job Tools" />
      </div>

      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Interactive Scenarios
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Safety Knowledge
          </TabsTrigger>
          <TabsTrigger value="case-studies" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Case Studies
          </TabsTrigger>
          <TabsTrigger value="assessments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Assessments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios">
          <InteractiveScenariosTab />
        </TabsContent>

        <TabsContent value="knowledge">
          <SafetyKnowledgeTab />
        </TabsContent>

        <TabsContent value="case-studies">
          <CaseStudiesTab />
        </TabsContent>

        <TabsContent value="assessments">
          <AssessmentToolsTab />
        </TabsContent>
      </Tabs>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Safety First
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            These safety scenarios are based on real incidents and near-misses in the electrical industry. 
            Always follow proper safety procedures and consult with qualified professionals when uncertain. 
            Your safety and the safety of others is paramount in all electrical work.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobSafetyCases;
