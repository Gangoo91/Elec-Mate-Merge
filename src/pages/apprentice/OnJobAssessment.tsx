
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClipboardCheck, Shield, HardHat, AlertTriangle, BookOpen,
  Sparkles, CheckCircle, FileText, Zap
} from "lucide-react";
import PreJobSafetyTab from "@/components/apprentice/assessment/PreJobSafetyTab";
import SiteConditionTab from "@/components/apprentice/assessment/SiteConditionTab";
import ElectricalInstallationTab from "@/components/apprentice/assessment/ElectricalInstallationTab";
import RiskAssessmentTab from "@/components/apprentice/assessment/RiskAssessmentTab";
import EducationalResourcesTab from "@/components/apprentice/assessment/EducationalResourcesTab";

const OnJobAssessment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/98 to-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-green-500/20 p-6 sm:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
                  <ClipboardCheck className="h-6 w-6 text-green-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Site <span className="text-green-400">Assessment</span> Tools
                </h1>
              </div>
              <p className="text-white/70 max-w-xl text-sm sm:text-base">
                Comprehensive checklists, educational guides and regulations for professional
                site evaluations and safety assessments.
              </p>
            </div>
            <SmartBackButton className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">5</div>
                  <div className="text-xs sm:text-sm text-white/60">Safety Categories</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">15+</div>
                  <div className="text-xs sm:text-sm text-white/60">Checklists</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-orange-400">Risk</div>
                  <div className="text-xs sm:text-sm text-white/60">Templates</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-elec-yellow">BS7671</div>
                  <div className="text-xs sm:text-sm text-white/60">Compliant</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Assessment Categories
          </h2>

          <Tabs defaultValue="pre-job-safety" className="w-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/3 border border-white/10 p-1">
              <TabsList className="flex w-full overflow-x-auto scrollbar-hide gap-1 bg-transparent">
                <TabsTrigger
                  value="pre-job-safety"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 transition-all"
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Pre-Job Safety</span>
                  <span className="sm:hidden">Safety</span>
                </TabsTrigger>
                <TabsTrigger
                  value="site-condition"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 transition-all"
                >
                  <HardHat className="h-4 w-4" />
                  <span className="hidden sm:inline">Site Conditions</span>
                  <span className="sm:hidden">Site</span>
                </TabsTrigger>
                <TabsTrigger
                  value="electrical"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow transition-all"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Electrical</span>
                  <span className="sm:hidden">Elec</span>
                </TabsTrigger>
                <TabsTrigger
                  value="risk-assessment"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 transition-all"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span className="hidden sm:inline">Risk</span>
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="pre-job-safety" className="mt-0">
                <PreJobSafetyTab />
              </TabsContent>

              <TabsContent value="site-condition" className="mt-0">
                <SiteConditionTab />
              </TabsContent>

              <TabsContent value="electrical" className="mt-0">
                <ElectricalInstallationTab />
              </TabsContent>

              <TabsContent value="risk-assessment" className="mt-0">
                <RiskAssessmentTab />
              </TabsContent>

              <TabsContent value="resources" className="mt-0">
                <EducationalResourcesTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Safety Banner */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-500/20 flex-shrink-0">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-300 mb-1">Safety First</h3>
                <p className="text-sm text-white/80">
                  Always complete a thorough site assessment before beginning any electrical work.
                  When in doubt about any condition or procedure, <span className="font-medium text-green-300">stop work and consult with your supervisor</span> or a qualified electrician. Your safety and the safety of others is paramount.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default OnJobAssessment;
