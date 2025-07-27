
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Download, ExternalLink } from "lucide-react";

const PortfolioDocumentationContent = () => {
  const documentationSections = [
    {
      title: "Portfolio Building Guide",
      description: "Complete guide to building an effective electrical apprenticeship portfolio",
      type: "guide",
      icon: BookOpen
    },
    {
      title: "Evidence Collection Templates",
      description: "Templates and examples for collecting and presenting your work evidence",
      type: "template",
      icon: FileText
    },
    {
      title: "Assessment Criteria",
      description: "Understanding what assessors look for in your portfolio submissions",
      type: "guide",
      icon: FileText
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for portfolio development",
      type: "video",
      icon: Video
    }
  ];

  const learningObjectives = [
    "Understand the purpose and structure of an apprenticeship portfolio",
    "Learn how to collect and organise evidence effectively",
    "Discover best practices for documenting your learning journey",
    "Prepare for portfolio-based assessments and reviews"
  ];

  return (
    <div className="space-y-4">
      {/* Getting Started Section */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-400 flex items-center gap-2 text-base sm:text-lg">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Your portfolio demonstrates your learning, skills development, and competency progression throughout your training.
            </p>
            
            <div className="bg-black/20 rounded-lg p-3 border border-blue-500/20">
              <h4 className="font-medium text-white mb-2 text-sm">Learning Objectives</h4>
              <ul className="space-y-1">
                {learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {documentationSections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-elec-yellow" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-xs sm:text-sm mb-3">
                  {section.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="border-elec-yellow/30 text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  {section.type === "template" && (
                    <Button variant="outline" size="sm" className="border-elec-yellow/30 text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Best Practices Card */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-400 text-base sm:text-lg">Portfolio Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-black/20 rounded-lg p-3 border border-green-500/20">
              <h4 className="font-medium text-white mb-2 text-sm">Documentation Tips</h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Keep evidence current and relevant</li>
                <li>• Include photos and diagrams</li>
                <li>• Write clear, reflective commentary</li>
                <li>• Cross-reference with learning outcomes</li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-3 border border-green-500/20">
              <h4 className="font-medium text-white mb-2 text-sm">Organisation</h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Use consistent file naming</li>
                <li>• Create logical folder structures</li>
                <li>• Maintain regular backup copies</li>
                <li>• Keep physical and digital evidence aligned</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioDocumentationContent;
