
import React from "react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle, BookOpen, Target, Users, Brain, Shield,
  HardHat, Zap, CheckCircle, Award
} from "lucide-react";
import InteractiveScenariosTab from "@/components/apprentice/safety-cases/InteractiveScenariosTab";
import SafetyKnowledgeTab from "@/components/apprentice/safety-cases/SafetyKnowledgeTab";
import CaseStudiesTab from "@/components/apprentice/safety-cases/CaseStudiesTab";
import AssessmentToolsTab from "@/components/apprentice/safety-cases/AssessmentToolsTab";

const OnJobSafetyCases = () => {
  return (
    <div className="bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-red-500/20 p-6 sm:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <HardHat className="h-6 w-6 text-red-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Safety <span className="text-red-400">Case Studies</span>
                </h1>
              </div>
              <p className="text-white/70 max-w-xl text-sm sm:text-base">
                Learn from real-world electrical safety scenarios through interactive case studies,
                comprehensive assessments, and detailed safety knowledge modules.
              </p>
            </div>
            <SmartBackButton className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-red-500/20 hover:border-red-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Target className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-red-400">25+</div>
                  <div className="text-xs sm:text-sm text-white/60">Scenarios</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <BookOpen className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-orange-400">Real</div>
                  <div className="text-xs sm:text-sm text-white/60">Incidents</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Brain className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">Interactive</div>
                  <div className="text-xs sm:text-sm text-white/60">Learning</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Award className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">Badges</div>
                  <div className="text-xs sm:text-sm text-white/60">Earn Awards</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Learning Categories
          </h2>

          <Tabs defaultValue="scenarios" className="w-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/3 border border-white/10 p-1">
              <TabsList className="flex w-full overflow-x-auto scrollbar-hide gap-1 bg-transparent">
                <TabsTrigger
                  value="scenarios"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 transition-all"
                >
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">Interactive Scenarios</span>
                  <span className="sm:hidden">Scenarios</span>
                </TabsTrigger>
                <TabsTrigger
                  value="knowledge"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 transition-all"
                >
                  <Brain className="h-4 w-4" />
                  <span className="hidden sm:inline">Safety Knowledge</span>
                  <span className="sm:hidden">Knowledge</span>
                </TabsTrigger>
                <TabsTrigger
                  value="case-studies"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Case Studies</span>
                  <span className="sm:hidden">Cases</span>
                </TabsTrigger>
                <TabsTrigger
                  value="assessments"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 transition-all"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Assessments</span>
                  <span className="sm:hidden">Tests</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="scenarios" className="mt-0">
                <InteractiveScenariosTab />
              </TabsContent>

              <TabsContent value="knowledge" className="mt-0">
                <SafetyKnowledgeTab />
              </TabsContent>

              <TabsContent value="case-studies" className="mt-0">
                <CaseStudiesTab />
              </TabsContent>

              <TabsContent value="assessments" className="mt-0">
                <AssessmentToolsTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Safety Warning Banner */}
        <Card className="border-red-500/30 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-500/20 flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-red-300 mb-1">Safety First - Learn From Experience</h3>
                <p className="text-sm text-white/80">
                  These safety scenarios are based on real incidents and near-misses in the electrical industry.
                  Always follow proper safety procedures and <span className="font-medium text-red-300">consult with qualified professionals</span> when uncertain.
                  Your safety and the safety of others is paramount in all electrical work.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default OnJobSafetyCases;
