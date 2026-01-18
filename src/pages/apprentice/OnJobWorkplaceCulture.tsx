
import { useState } from "react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare, Users, BookOpen, HelpCircle, Lightbulb, Globe,
  Award, Sparkles, Coffee, Handshake
} from "lucide-react";
import WorkplaceCultureOverviewTab from "@/components/apprentice/workplace-culture/WorkplaceCultureOverviewTab";
import CommunicationGuideTab from "@/components/apprentice/workplace-culture/CommunicationGuideTab";
import CultureModulesTab from "@/components/apprentice/workplace-culture/CultureModulesTab";
import InteractiveToolsTab from "@/components/apprentice/workplace-culture/InteractiveToolsTab";
import RegionalCultureTab from "@/components/apprentice/workplace-culture/RegionalCultureTab";
import ResourcesTab from "@/components/apprentice/workplace-culture/ResourcesTab";

const OnJobWorkplaceCulture = () => {
  return (
    <div className="bg-gradient-to-br from-background via-background/98 to-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-purple-500/20 p-6 sm:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <MessageSquare className="h-6 w-6 text-purple-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Workplace <span className="text-purple-400">Culture</span>
                </h1>
              </div>
              <p className="text-white/70 max-w-xl text-sm sm:text-base">
                Master workplace communication, understand UK electrical industry culture,
                and build professional relationships that last.
              </p>
            </div>
            <SmartBackButton className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">6</div>
                  <div className="text-xs sm:text-sm text-white/60">Modules</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">Team</div>
                  <div className="text-xs sm:text-sm text-white/60">Skills</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Globe className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">UK</div>
                  <div className="text-xs sm:text-sm text-white/60">Regional</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Handshake className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-orange-400">Pro</div>
                  <div className="text-xs sm:text-sm text-white/60">Relationships</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Culture & Communication
          </h2>

          <Tabs defaultValue="overview" className="w-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/3 border border-white/10 p-1">
              <TabsList className="flex w-full overflow-x-auto scrollbar-hide gap-1 bg-transparent">
                <TabsTrigger
                  value="overview"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 transition-all touch-manipulation"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="communication"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 transition-all touch-manipulation"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Communication</span>
                  <span className="sm:hidden">Comms</span>
                </TabsTrigger>
                <TabsTrigger
                  value="modules"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow transition-all touch-manipulation"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Modules</span>
                </TabsTrigger>
                <TabsTrigger
                  value="tools"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 transition-all touch-manipulation"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span className="hidden sm:inline">Interactive</span>
                </TabsTrigger>
                <TabsTrigger
                  value="regional"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 transition-all touch-manipulation"
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">Regional</span>
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 transition-all touch-manipulation"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="overview" className="mt-0">
                <WorkplaceCultureOverviewTab />
              </TabsContent>

              <TabsContent value="communication" className="mt-0">
                <CommunicationGuideTab />
              </TabsContent>

              <TabsContent value="modules" className="mt-0">
                <CultureModulesTab />
              </TabsContent>

              <TabsContent value="tools" className="mt-0">
                <InteractiveToolsTab />
              </TabsContent>

              <TabsContent value="regional" className="mt-0">
                <RegionalCultureTab />
              </TabsContent>

              <TabsContent value="resources" className="mt-0">
                <ResourcesTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Pro Tip Banner */}
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 flex-shrink-0">
                <Coffee className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-300 mb-1">Pro Tip: Tea Round Etiquette</h3>
                <p className="text-sm text-white/80">
                  One of the easiest ways to fit into any UK site is to <span className="font-medium text-purple-300">offer to make the tea</span>.
                  It's not just about the drink - it's about showing you're part of the team. Learn everyone's preferences early!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default OnJobWorkplaceCulture;
