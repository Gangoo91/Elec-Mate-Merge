
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, Users, BookOpen, HelpCircle, Lightbulb, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import WorkplaceCultureOverviewTab from "@/components/apprentice/workplace-culture/WorkplaceCultureOverviewTab";
import CommunicationGuideTab from "@/components/apprentice/workplace-culture/CommunicationGuideTab";
import CultureModulesTab from "@/components/apprentice/workplace-culture/CultureModulesTab";
import InteractiveToolsTab from "@/components/apprentice/workplace-culture/InteractiveToolsTab";
import RegionalCultureTab from "@/components/apprentice/workplace-culture/RegionalCultureTab";
import ResourcesTab from "@/components/apprentice/workplace-culture/ResourcesTab";

const OnJobWorkplaceCulture = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Workplace Language & Culture</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Master workplace communication, understand UK electrical industry culture, and build professional relationships
        </p>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Communication
          </TabsTrigger>
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Modules
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Interactive Tools
          </TabsTrigger>
          <TabsTrigger value="regional" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Regional Culture
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <WorkplaceCultureOverviewTab />
        </TabsContent>

        <TabsContent value="communication">
          <CommunicationGuideTab />
        </TabsContent>

        <TabsContent value="modules">
          <CultureModulesTab />
        </TabsContent>

        <TabsContent value="tools">
          <InteractiveToolsTab />
        </TabsContent>

        <TabsContent value="regional">
          <RegionalCultureTab />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnJobWorkplaceCulture;
