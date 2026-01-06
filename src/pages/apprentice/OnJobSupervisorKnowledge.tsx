
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HelpCircle, MessageSquare, Users, Lightbulb, BookOpen, Phone,
  CheckCircle, Brain, Zap, Award
} from "lucide-react";
import QuestionsTab from "@/components/apprentice/supervisor-knowledge/QuestionsTab";
import SiteKnowledgeTab from "@/components/apprentice/supervisor-knowledge/SiteKnowledgeTab";
import CommunicationTab from "@/components/apprentice/supervisor-knowledge/CommunicationTab";
import InteractiveToolsTab from "@/components/apprentice/supervisor-knowledge/InteractiveToolsTab";
import ResourcesTab from "@/components/apprentice/supervisor-knowledge/ResourcesTab";

const OnJobSupervisorKnowledge = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-gray to-elec-card border border-blue-500/20 p-6 sm:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <HelpCircle className="h-6 w-6 text-blue-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Ask a <span className="text-blue-400">Supervisor</span>
                </h1>
              </div>
              <p className="text-white/70 max-w-xl text-sm sm:text-base">
                Comprehensive knowledge bank with expert guidance, communication strategies,
                and resources for building strong professional relationships.
              </p>
            </div>
            <SmartBackButton className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <HelpCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">FAQ</div>
                  <div className="text-xs sm:text-sm text-white/60">Question Bank</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">When</div>
                  <div className="text-xs sm:text-sm text-white/60">To Ask Help</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">Pro</div>
                  <div className="text-xs sm:text-sm text-white/60">Communication</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <Brain className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-elec-yellow">Site</div>
                  <div className="text-xs sm:text-sm text-white/60">Knowledge</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Knowledge Categories
          </h2>

          <Tabs defaultValue="questions" className="w-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-elec-gray/80 to-elec-card/50 border border-white/10 p-1">
              <TabsList className="flex w-full overflow-x-auto scrollbar-hide gap-1 bg-transparent">
                <TabsTrigger
                  value="questions"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 transition-all"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Common Questions</span>
                  <span className="sm:hidden">Questions</span>
                </TabsTrigger>
                <TabsTrigger
                  value="site"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow transition-all"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Site Knowledge</span>
                  <span className="sm:hidden">Site</span>
                </TabsTrigger>
                <TabsTrigger
                  value="communication"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Communication</span>
                  <span className="sm:hidden">Comms</span>
                </TabsTrigger>
                <TabsTrigger
                  value="tools"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 transition-all"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span className="hidden sm:inline">Interactive Tools</span>
                  <span className="sm:hidden">Tools</span>
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 transition-all"
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="questions" className="mt-0">
                <QuestionsTab />
              </TabsContent>

              <TabsContent value="site" className="mt-0">
                <SiteKnowledgeTab />
              </TabsContent>

              <TabsContent value="communication" className="mt-0">
                <CommunicationTab />
              </TabsContent>

              <TabsContent value="tools" className="mt-0">
                <InteractiveToolsTab />
              </TabsContent>

              <TabsContent value="resources" className="mt-0">
                <ResourcesTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Pro Tip Banner */}
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-300 mb-1">Know When to Ask</h3>
                <p className="text-sm text-white/80">
                  Asking questions is a sign of professionalism, not weakness. A good rule:
                  <span className="font-medium text-blue-300"> if you're unsure about safety or regulations, always ask</span>.
                  It shows you're committed to doing quality work.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default OnJobSupervisorKnowledge;
