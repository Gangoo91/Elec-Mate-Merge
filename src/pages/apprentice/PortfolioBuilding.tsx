
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderOpen, Lightbulb, Camera, FileText, CheckCircle, AlertTriangle, Zap, BookOpen } from "lucide-react";
import PortfolioTemplateSelector from "@/components/apprentice/portfolio/PortfolioTemplateSelector";
import DocumentationGuide from "@/components/apprentice/portfolio/DocumentationGuide";
import DigitalToolsIntegration from "@/components/apprentice/portfolio/DigitalToolsIntegration";
import QualityAssessmentTool from "@/components/apprentice/portfolio/QualityAssessmentTool";
import IndustrySpecificSections from "@/components/apprentice/portfolio/IndustrySpecificSections";
import InteractiveLearningFeatures from "@/components/apprentice/portfolio/InteractiveLearningFeatures";

const PortfolioBuilding = () => {
  const portfolioSections = [
    {
      title: "Work Evidence Documentation",
      description: "How to properly document your practical work",
      items: [
        "Take clear before/after photos of installations",
        "Document materials used and quantities",
        "Record any problems encountered and solutions",
        "Note safety considerations and precautions taken"
      ]
    },
    {
      title: "Assessment Requirements",
      description: "What assessors look for in your portfolio",
      items: [
        "Evidence of planning and preparation",
        "Demonstration of safe working practices",
        "Quality of workmanship and attention to detail",
        "Understanding of regulations and standards"
      ]
    },
    {
      title: "Common Portfolio Mistakes",
      description: "Pitfalls to avoid when building your portfolio",
      items: [
        "Poor quality or unclear photographs",
        "Insufficient detail in work descriptions",
        "Missing safety documentation",
        "Not showing your individual contribution to team projects"
      ]
    }
  ];

  const documentationTips = [
    "Use a consistent format for all entries",
    "Include dates, locations, and supervisor details",
    "Explain your role in team projects clearly",
    "Link practical work to theoretical knowledge",
    "Show progression in complexity over time",
    "Include feedback from supervisors"
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Enhanced Portfolio Builder</h1>
        <p className="text-muted-foreground text-center max-w-3xl mb-4">
          Build a professional portfolio that showcases your skills, meets assessment standards, and impresses employers. 
          Our comprehensive toolkit guides you through every step of the process.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="digital-tools">Digital Tools</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="industry">Industry Focus</TabsTrigger>
          <TabsTrigger value="learning">Interactive Learning</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FolderOpen className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Portfolio Essentials</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {portfolioSections.map((section, index) => (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{section.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Documentation Best Practices</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Essential Tips</h4>
                  <ul className="space-y-2">
                    {documentationTips.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-elec-yellow/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Pro Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Start documenting from day one! It's much harder to reconstruct your portfolio 
                    later than to maintain it as you go. Set aside 10 minutes each day to update 
                    your records.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/50 bg-orange-500/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                <CardTitle className="text-orange-300">Remember</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your portfolio is more than just a collection of photos - it's proof of your learning 
                journey and professional development. Quality documentation now will make your 
                end-point assessment much smoother.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <PortfolioTemplateSelector />
        </TabsContent>

        <TabsContent value="documentation">
          <DocumentationGuide />
        </TabsContent>

        <TabsContent value="digital-tools">
          <DigitalToolsIntegration />
        </TabsContent>

        <TabsContent value="assessment">
          <QualityAssessmentTool />
        </TabsContent>

        <TabsContent value="industry">
          <IndustrySpecificSections />
        </TabsContent>

        <TabsContent value="learning">
          <InteractiveLearningFeatures />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-400">Advanced Portfolio Techniques</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Digital Enhancement Techniques</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Use QR codes to link physical documentation to digital evidence
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Create video walkthroughs of completed installations
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Include time-lapse photography for complex projects
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Develop a personal brand and consistent visual identity
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Professional Presentation</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Create executive summaries for major projects
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Include technical drawings and schematic diagrams
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Document problem-solving methodologies
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Show evidence of continuous professional development
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-cyan-400" />
                <CardTitle className="text-cyan-400">Legal and Compliance Considerations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <h5 className="font-medium text-yellow-400 mb-2">Important Legal Considerations</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Always obtain permission before photographing client premises</li>
                    <li>• Respect data protection laws when documenting work</li>
                    <li>• Ensure you have rights to use all images and content</li>
                    <li>• Follow your employer's policies on documentation</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-elec-gray/50 rounded border border-cyan-500/20">
                    <h5 className="font-medium text-white mb-2">Privacy Protection</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Blur or crop out personal information</li>
                      <li>• Avoid showing house numbers or addresses</li>
                      <li>• Don't include client names without permission</li>
                      <li>• Be mindful of sensitive commercial information</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-elec-gray/50 rounded border border-cyan-500/20">
                    <h5 className="font-medium text-white mb-2">Professional Standards</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Follow industry codes of conduct</li>
                      <li>• Maintain accurate and honest documentation</li>
                      <li>• Respect intellectual property rights</li>
                      <li>• Keep sensitive technical details secure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioBuilding;
