
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  CheckCircle,
  FileText,
  Building
} from "lucide-react";
import BackButton from "@/components/common/BackButton";
import PortfolioIntroduction from "@/components/apprentice/portfolio/guide/PortfolioIntroduction";
import PortfolioStepByStepGuide from "@/components/apprentice/portfolio/guide/PortfolioStepByStepGuide";
import EvidenceCollectionGuide from "@/components/apprentice/portfolio/guide/EvidenceCollectionGuide";
import IndustrySpecificGuidance from "@/components/apprentice/portfolio/guide/IndustrySpecificGuidance";

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

      {/* Main Content Tabs */}
      <Tabs defaultValue="introduction" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
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
      </Tabs>
    </div>
  );
};

export default PortfolioBuilding;
