
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, FileText, Wrench, ArrowLeft } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RunThroughStepsTab from "@/components/apprentice/bs7671/RunThroughStepsTab";
import TestingGuidesTab from "@/components/apprentice/bs7671/TestingGuidesTab";
import DocumentationTab from "@/components/apprentice/bs7671/DocumentationTab";
import ResourcesTab from "@/components/apprentice/bs7671/ResourcesTab";

const OnJobBS7671RunThrough = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">BS7671 Inspection & Testing Run-Through</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Complete step-by-step inspection and testing procedures, guides, and documentation requirements
        </p>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to On-Job Tools" />
      </div>

      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="steps" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Run-Through Steps
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Testing Guides
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="steps">
          <RunThroughStepsTab />
        </TabsContent>

        <TabsContent value="guides">
          <TestingGuidesTab />
        </TabsContent>

        <TabsContent value="documentation">
          <DocumentationTab />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesTab />
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            BS7671 Compliance Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            All electrical installation work must comply with BS 7671 (18th Edition) requirements. 
            Follow the correct testing sequence, document all results accurately, and ensure safety 
            procedures are followed at all times.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobBS7671RunThrough;
