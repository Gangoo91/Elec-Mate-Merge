
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, FileText, Zap, Shield, ClipboardCheck, Award } from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import RunThroughStepsTab from "@/components/apprentice/bs7671/RunThroughStepsTab";
import DocumentationTab from "@/components/apprentice/bs7671/DocumentationTab";
import ResourcesTab from "@/components/apprentice/bs7671/ResourcesTab";

const OnJobBS7671RunThrough = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-gray to-elec-card border border-elec-yellow/20 p-6 sm:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Zap className="h-6 w-6 text-elec-yellow" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  BS7671 <span className="text-elec-yellow">Run-Through</span>
                </h1>
              </div>
              <p className="text-white/70 max-w-xl text-sm sm:text-base">
                Complete step-by-step 18th Edition inspection and testing procedures,
                guides, and documentation requirements.
              </p>
            </div>
            <SmartBackButton className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-elec-yellow">18th</div>
                  <div className="text-xs sm:text-sm text-white/60">Edition</div>
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
                  <div className="text-xl sm:text-2xl font-bold text-green-400">Step</div>
                  <div className="text-xs sm:text-sm text-white/60">By Step</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">Docs</div>
                  <div className="text-xs sm:text-sm text-white/60">Templates</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Award className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">Full</div>
                  <div className="text-xs sm:text-sm text-white/60">Guide</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
            Inspection & Testing
          </h2>

          <Tabs defaultValue="steps" className="w-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-elec-gray/80 to-elec-card/50 border border-white/10 p-1">
              <TabsList className="flex w-full overflow-x-auto scrollbar-hide gap-1 bg-transparent">
                <TabsTrigger
                  value="steps"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow transition-all"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Complete Testing Guide</span>
                  <span className="sm:hidden">Testing</span>
                </TabsTrigger>
                <TabsTrigger
                  value="documentation"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 transition-all"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Documentation</span>
                  <span className="sm:hidden">Docs</span>
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="steps" className="mt-0">
                <RunThroughStepsTab />
              </TabsContent>

              <TabsContent value="documentation" className="mt-0">
                <DocumentationTab />
              </TabsContent>

              <TabsContent value="resources" className="mt-0">
                <ResourcesTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Compliance Banner */}
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/10 via-elec-yellow/5 to-transparent overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
                <Shield className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-elec-yellow mb-1">BS7671 Compliance Reminder</h3>
                <p className="text-sm text-white/80">
                  All electrical installation work must comply with BS 7671 (18th Edition) requirements.
                  <span className="font-medium text-elec-yellow"> Follow the correct testing sequence</span>, document all results accurately,
                  and ensure safety procedures are followed at all times.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default OnJobBS7671RunThrough;
