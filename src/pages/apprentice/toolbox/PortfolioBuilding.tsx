
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  FileText, 
  Target,
  CheckCircle,
  Download,
  Users,
  Building,
  Award
} from "lucide-react";
import BackButton from "@/components/common/BackButton";
import PortfolioIntroduction from "@/components/apprentice/portfolio/guide/PortfolioIntroduction";
import PortfolioStepByStepGuide from "@/components/apprentice/portfolio/guide/PortfolioStepByStepGuide";
import EvidenceCollectionGuide from "@/components/apprentice/portfolio/guide/EvidenceCollectionGuide";
import IndustrySpecificGuidance from "@/components/apprentice/portfolio/guide/IndustrySpecificGuidance";
import AssessmentPreparation from "@/components/apprentice/portfolio/guide/AssessmentPreparation";
import TemplatesAndExamples from "@/components/apprentice/portfolio/guide/TemplatesAndExamples";

const PortfolioBuilding = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio Building Guide</h1>
          <p className="text-muted-foreground mt-2">
            A comprehensive guide to building an exceptional electrical apprenticeship portfolio
          </p>
        </div>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Toolbox" />
      </div>

      {/* Key Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Learning Modules</p>
                <p className="text-2xl font-bold text-blue-400">6</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Target className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Key Competencies</p>
                <p className="text-2xl font-bold text-green-400">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/10 rounded-lg">
                <FileText className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Templates</p>
                <p className="text-2xl font-bold text-elec-yellow">15+</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Award className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-purple-400">95%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="introduction" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="introduction" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Introduction</span>
          </TabsTrigger>
          <TabsTrigger value="step-by-step" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Step-by-Step</span>
          </TabsTrigger>
          <TabsTrigger value="evidence" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Evidence</span>
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Industry</span>
          </TabsTrigger>
          <TabsTrigger value="assessment" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="introduction">
          <PortfolioIntroduction />
        </TabsContent>

        <TabsContent value="step-by-step">
          <PortfolioStepByStepGuide />
        </TabsContent>

        <TabsContent value="evidence">
          <EvidenceCollectionGuide />
        </TabsContent>

        <TabsContent value="industry">
          <IndustrySpecificGuidance />
        </TabsContent>

        <TabsContent value="assessment">
          <AssessmentPreparation />
        </TabsContent>

        <TabsContent value="templates">
          <TemplatesAndExamples />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioBuilding;
