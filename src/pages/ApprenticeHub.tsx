
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Heart, WrenchIcon, Settings, GraduationCap, Zap, CheckSquare, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ApprenticeHub = () => {
  // Main 2x2 grid - 4 most essential tools (reordered by importance)
  const mainResources = [
    {
      id: 1,
      title: "Electrical Calculators",
      icon: Calculator,
      link: "/apprentice/calculators"
    },
    {
      id: 2,
      title: "Off the Job Time Keeping",
      icon: Clock,
      link: "/apprentice/ojt"
    },
    {
      id: 3,
      title: "Mental Health Hub",
      icon: Heart,
      link: "/apprentice/mental-health"
    },
    {
      id: 9,
      title: "Inspection and Testing",
      icon: CheckSquare,
      link: "/apprentice/bs7671-inspection-testing"
    }
  ];

  // Additional tools section (reordered by importance)
  const additionalResources = [
    {
      id: 8,
      title: "Advanced Help Box",
      icon: Zap,
      link: "/apprentice/advanced-help"
    },
    {
      id: 6,
      title: "On the Job Tools",
      icon: Settings,
      link: "/apprentice/on-job-tools"
    },
    {
      id: 5,
      title: "Guidance Area",
      icon: WrenchIcon,
      link: "/apprentice/toolbox"
    },
    {
      id: 7,
      title: "Professional Development",
      icon: GraduationCap,
      link: "/apprentice/professional-development"
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 md:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
          Apprentice Hub
        </h1>
        <Link to="/dashboard" className="flex-shrink-0 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Main 2x2 Grid - Essential Tools */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-center">Essential Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {mainResources.map((resource) => (
            <Link to={resource.link} key={resource.id} className="focus:outline-none hover-scale">
              <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-all duration-200 cursor-pointer">
                <CardHeader className="flex flex-col items-center justify-center text-center py-6 md:py-8">
                  <resource.icon className="h-10 w-10 sm:h-12 sm:w-12 mb-3 text-elec-yellow" />
                  <CardTitle className="text-base sm:text-lg leading-tight">{resource.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* More Tools Section */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-center">Additional Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {additionalResources.map((resource) => (
            <Link to={resource.link} key={resource.id} className="focus:outline-none hover-scale">
              <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-all duration-200 cursor-pointer">
                <CardHeader className="flex flex-col items-center justify-center text-center py-4 md:py-6 px-2 md:px-6">
                  <resource.icon className="h-6 w-6 sm:h-8 sm:w-8 mb-2 text-elec-yellow" />
                  <CardTitle className="text-xs sm:text-sm md:text-base leading-tight text-center">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprenticeHub;
