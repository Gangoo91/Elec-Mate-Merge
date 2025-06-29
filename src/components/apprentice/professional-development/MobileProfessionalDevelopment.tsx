
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award, 
  Target,
  Lightbulb,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import CareerPathwaysTab from "./CareerPathwaysTab";
import CertificationsTab from "./CertificationsTab";
import ContinuingEducationTab from "./ContinuingEducationTab";
import IndustryNetworkingTab from "./IndustryNetworkingTab";
import ProfessionalSkillsTab from "./ProfessionalSkillsTab";

const MobileProfessionalDevelopment = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "pathways",
      title: "Career Paths",
      description: "Explore different career trajectories in the electrical industry",
      icon: TrendingUp,
      color: "text-blue-400"
    },
    {
      id: "certifications",
      title: "Certifications",
      description: "Required qualifications and professional certifications",
      icon: Award,
      color: "text-yellow-400"
    },
    {
      id: "education",
      title: "Education",
      description: "Further education opportunities and courses",
      icon: BookOpen,
      color: "text-green-400"
    },
    {
      id: "skills",
      title: "Skills",
      description: "Professional skills development and training",
      icon: Lightbulb,
      color: "text-purple-400"
    },
    {
      id: "networking",
      title: "Networking",
      description: "Industry connections and professional relationships",
      icon: Users,
      color: "text-pink-400"
    }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "pathways":
        return <CareerPathwaysTab />;
      case "certifications":
        return <CertificationsTab />;
      case "education":
        return <ContinuingEducationTab />;
      case "skills":
        return <ProfessionalSkillsTab />;
      case "networking":
        return <IndustryNetworkingTab />;
      default:
        return null;
    }
  };

  if (activeSection) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {sections.find(s => s.id === activeSection)?.title}
            </h2>
          </div>
        </div>
        {renderSectionContent()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Professional Development Hub
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Explore career advancement opportunities and build your professional development pathway.
          </p>
        </CardContent>
      </Card>

      {/* Section Cards */}
      <div className="space-y-3">
        {sections.map((section) => (
          <Card 
            key={section.id}
            className="border-elec-yellow/20 bg-elec-gray cursor-pointer hover:bg-elec-gray/80 transition-colors"
            onClick={() => setActiveSection(section.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 rounded-md bg-elec-dark/50">
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm">
                      {section.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {section.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-elec-yellow">12+</div>
            <div className="text-xs text-muted-foreground">Career Paths</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-elec-yellow">50+</div>
            <div className="text-xs text-muted-foreground">Courses</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-elec-yellow">£25k-£80k+</div>
            <div className="text-xs text-muted-foreground">Salary Range</div>
          </CardContent>
        </Card>
      </div>

      {/* Journey Card */}
      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base">
            <Target className="h-4 w-4" />
            Your Development Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            Professional development is a continuous process. Use this hub to explore career pathways, 
            understand certifications, discover education opportunities, and build industry connections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileProfessionalDevelopment;
