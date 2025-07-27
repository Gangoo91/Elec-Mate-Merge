
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Download, ExternalLink } from "lucide-react";

const PortfolioDocumentationContent = () => {
const cityGuildsResources = [
    {
      title: "Level 3 Electrical Installation Portfolio Guide",
      description: "Official City & Guilds portfolio guidance for Level 3 electrical installation apprentices",
      type: "guide",
      icon: BookOpen,
      url: "https://www.cityandguilds.com/qualifications-and-apprenticeships/electrical/electrical-installation/2365-level-3-electrical-installations"
    },
    {
      title: "Assessment Portfolio Templates",
      description: "City & Guilds templates for recording practical assessments and workplace evidence",
      type: "template",
      icon: FileText,
      url: "https://www.cityandguilds.com/help/help-for-learners-and-apprentices/portfolio-guidance"
    },
    {
      title: "SmartScreen Portfolio Resources",
      description: "Access City & Guilds SmartScreen for portfolio templates and guidance materials",
      type: "guide",
      icon: FileText,
      url: "https://www.smartscreen.co.uk/"
    }
  ];

  const ealResources = [
    {
      title: "EAL Electrical Installation Portfolio Guidelines",
      description: "Official EAL portfolio building guidance for electrical installation qualifications",
      type: "guide",
      icon: BookOpen,
      url: "https://www.eal.org.uk/qualifications/electrical-installation/"
    },
    {
      title: "EAL Portfolio Evidence Requirements",
      description: "Detailed requirements for portfolio evidence collection and presentation",
      type: "template",
      icon: FileText,
      url: "https://www.eal.org.uk/centres/centre-support/assessment-guidance/"
    },
    {
      title: "EAL Online Portfolio System",
      description: "Access EAL's online portfolio submission and tracking system",
      type: "guide",
      icon: Video,
      url: "https://www.eal.org.uk/learners/portfolio-system/"
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

      {/* City & Guilds Resources */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-400 flex items-center gap-2 text-base sm:text-lg">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            City & Guilds Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-3">
            {cityGuildsResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="border-elec-yellow/20 bg-black/10 hover:border-elec-yellow/40 transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-elec-yellow" />
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3">
                      {resource.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-elec-yellow/30 text-xs"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Resource
                      </Button>
                      {resource.type === "template" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-elec-yellow/30 text-xs"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Access Templates
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* EAL Resources */}
      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-purple-400 flex items-center gap-2 text-base sm:text-lg">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
            EAL Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-3">
            {ealResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="border-elec-yellow/20 bg-black/10 hover:border-elec-yellow/40 transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-elec-yellow" />
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3">
                      {resource.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-elec-yellow/30 text-xs"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Resource
                      </Button>
                      {resource.type === "template" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-elec-yellow/30 text-xs"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Access Templates
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

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
