
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, HelpCircle, MessageSquare, Users, Lightbulb, BookOpen, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import QuestionsTab from "@/components/apprentice/supervisor-knowledge/QuestionsTab";
import SiteKnowledgeTab from "@/components/apprentice/supervisor-knowledge/SiteKnowledgeTab";
import CommunicationTab from "@/components/apprentice/supervisor-knowledge/CommunicationTab";
import InteractiveToolsTab from "@/components/apprentice/supervisor-knowledge/InteractiveToolsTab";
import ResourcesTab from "@/components/apprentice/supervisor-knowledge/ResourcesTab";

const OnJobSupervisorKnowledge = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Ask a Supervisor</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Comprehensive knowledge bank with expert guidance, communication strategies, and resources 
          for building strong professional relationships with supervisors and colleagues
        </p>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Questions Bank
          </TabsTrigger>
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Site Knowledge
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Communication
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Interactive Tools
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <QuestionsTab />
        </TabsContent>

        <TabsContent value="site">
          <SiteKnowledgeTab />
        </TabsContent>

        <TabsContent value="communication">
          <CommunicationTab />
        </TabsContent>

        <TabsContent value="tools">
          <InteractiveToolsTab />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnJobSupervisorKnowledge;
