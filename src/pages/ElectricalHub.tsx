
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Heart, Brain, GraduationCap, Briefcase, ArrowLeft, Calculator, Zap, MapPin, Shield } from "lucide-react";

const ElectricalHub = () => {
  // Main 2x2 grid - 4 most frequently used tools for daily electrical work
  const mainResources = [
    {
      id: 1,
      title: "Electrical Calculations",
      icon: Calculator,
      link: "/electrician/calculations"
    },
    {
      id: 2,
      title: "Inspection & Testing",
      icon: Zap,
      link: "/electrician/inspection-testing"
    },
    {
      id: 3,
      title: "Install Planner",
      icon: MapPin,
      link: "/electrician/install-planner"
    },
    {
      id: 4,
      title: "Site Safety & RAMS",
      icon: Shield,
      link: "/electrician/site-safety"
    }
  ];

  // Additional tools - business, development, and reference resources  
  const additionalResources = [
    {
      id: 5,
      title: "Business Hub",
      icon: Briefcase,
      link: "/electrician/business"
    },
    {
      id: 6,
      title: "AI Tooling",
      icon: Brain,
      link: "/electrician-tools/ai-tooling"
    },
    {
      id: 7,
      title: "Industry Updates",
      icon: Wrench,
      link: "/electrician/safety-shares/news"
    },
    {
      id: 8,
      title: "Mental Health Hub",
      icon: Heart,
      link: "/electrician/mental-health"
    },
    {
      id: 9,
      title: "Career Progression", 
      icon: GraduationCap,
      link: "/electrician/career-progression"
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 md:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
          Electrical Hub
        </h1>
        <Link to="/dashboard" className="flex-shrink-0 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Main 2x2 Grid - Core Daily Tools */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-center">Core Daily Tools</h2>
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

      {/* Additional Resources Section */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-center">Business & Development</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
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
}

export default ElectricalHub;
