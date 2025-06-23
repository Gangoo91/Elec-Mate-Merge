
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
    <div className="space-y-6">
      {/* Getting Started Section */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Getting Started with Portfolio Building
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Your portfolio is a crucial part of your electrical apprenticeship journey. It demonstrates 
              your learning, skills development, and competency progression throughout your training.
            </p>
            
            <div className="bg-elec-gray/50 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Learning Objectives</h4>
              <ul className="space-y-2">
                {learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documentationSections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <Card key={index} className="border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <IconComponent className="h-5 w-5 text-elec-yellow" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {section.description}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-elec-yellow/30">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  {section.type === "template" && (
                    <Button variant="outline" size="sm" className="border-elec-yellow/30">
                      <Download className="h-4 w-4 mr-2" />
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
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Portfolio Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-white mb-2">Documentation Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep evidence current and relevant</li>
                <li>• Include photos and diagrams where appropriate</li>
                <li>• Write clear, reflective commentary</li>
                <li>• Cross-reference with learning outcomes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Organisation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use consistent file naming conventions</li>
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
