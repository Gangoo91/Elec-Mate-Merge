
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Camera, CheckCircle, BookOpen, Settings, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import PortfolioTemplateSelector from "@/components/apprentice/portfolio/PortfolioTemplateSelector";
import DocumentationGuide from "@/components/apprentice/portfolio/DocumentationGuide";
import DigitalToolsIntegration from "@/components/apprentice/portfolio/DigitalToolsIntegration";
import QualityAssessmentTool from "@/components/apprentice/portfolio/QualityAssessmentTool";
import IndustrySpecificSections from "@/components/apprentice/portfolio/IndustrySpecificSections";
import InteractiveLearningFeatures from "@/components/apprentice/portfolio/InteractiveLearningFeatures";

const PortfolioBuilding = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Building</h1>
          <p className="text-muted-foreground">Build a professional portfolio that showcases your electrical expertise</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Camera className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Documentation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/80 mb-4">
              Learn professional techniques for documenting your electrical work effectively.
            </p>
            <ul className="text-sm space-y-1 text-elec-light/80">
              <li>• Photo documentation tips</li>
              <li>• Written evidence structure</li>
              <li>• Video and audio guidance</li>
              <li>• Safety considerations</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Templates & Tools</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/80 mb-4">
              Access professional templates and digital tools to streamline your portfolio creation.
            </p>
            <ul className="text-sm space-y-1 text-elec-light/80">
              <li>• Industry-specific templates</li>
              <li>• Digital organisation tools</li>
              <li>• Quality assessment guides</li>
              <li>• Professional standards</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Assessment Ready</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-elec-light/80 mb-4">
              Ensure your portfolio meets all assessment criteria and industry standards.
            </p>
            <ul className="text-sm space-y-1 text-elec-light/80">
              <li>• Quality scoring system</li>
              <li>• Assessment preparation</li>
              <li>• Interactive learning</li>
              <li>• Progress tracking</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Main Portfolio Builder Interface */}
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Documentation</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Tools</span>
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Industry</span>
          </TabsTrigger>
          <TabsTrigger value="assessment" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Learning</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <PortfolioTemplateSelector />
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <DocumentationGuide />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <DigitalToolsIntegration />
        </TabsContent>

        <TabsContent value="industry" className="space-y-6">
          <IndustrySpecificSections />
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <QualityAssessmentTool />
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <InteractiveLearningFeatures />
        </TabsContent>
      </Tabs>

      {/* Getting Started Section */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Getting Started Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Step-by-Step Process</h4>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</span>
                  Choose a portfolio template that matches your specialisation
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</span>
                  Learn documentation best practices for your work
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</span>
                  Set up digital tools for organisation and presentation
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">4</span>
                  Add industry-specific sections relevant to your work
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">5</span>
                  Regularly assess quality and prepare for evaluation
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Quick Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Start documenting work from day one of your apprenticeship
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Take photos before, during, and after each job
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Write reflections immediately after completing tasks
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Get regular feedback from supervisors and mentors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Keep your portfolio updated and organised regularly
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioBuilding;
