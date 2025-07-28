
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MessageSquare, Briefcase, Package, Wrench, Shield, PoundSterling, ChevronLeft, Briefcase as BriefcaseIcon } from "lucide-react";

const TradeEssentials = () => {
  // Main essential services - 2x2 grid
  const mainEssentials = [
    {
      id: 1,
      title: "Chat",
      icon: MessageSquare,
      link: "/electrician/chat"
    },
    {
      id: 2,
      title: "Job Vacancies",
      icon: Briefcase,
      link: "/electrician/job-vacancies"
    },
    {
      id: 3,
      title: "Materials",
      icon: Package,
      link: "/electrician/materials"
    },
    {
      id: 4,
      title: "Tools",
      icon: Wrench,
      link: "/electrician/tools"
    }
  ];

  // Additional services
  const additionalEssentials = [
    {
      id: 5,
      title: "Safety & Industry Updates",
      icon: Shield,
      link: "/electrician/safety-shares"
    },
    {
      id: 6,
      title: "Live Pricing",
      icon: PoundSterling,
      link: "/electrician/live-pricing"
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 md:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left flex items-center gap-3 justify-center sm:justify-start">
            <BriefcaseIcon className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
            Trade Essentials
          </h1>
          <p className="text-muted-foreground text-center sm:text-left">
            Essential services and resources for electrical professionals
          </p>
        </div>
        <Link to="/electrical-hub" className="flex-shrink-0 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Electrical Hub
          </Button>
        </Link>
      </div>

      {/* Main 2x2 Grid - Essential Services */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-center">Essential Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {mainEssentials.map((essential) => (
            <Link to={essential.link} key={essential.id} className="focus:outline-none hover-scale">
              <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-all duration-200 cursor-pointer">
                <CardHeader className="flex flex-col items-center justify-center text-center py-6 md:py-8">
                  <essential.icon className="h-10 w-10 sm:h-12 sm:w-12 mb-3 text-elec-yellow" />
                  <CardTitle className="text-base sm:text-lg leading-tight">{essential.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-center">Additional Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
          {additionalEssentials.map((essential) => (
            <Link to={essential.link} key={essential.id} className="focus:outline-none hover-scale">
              <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-all duration-200 cursor-pointer">
                <CardHeader className="flex flex-col items-center justify-center text-center py-4 md:py-6 px-2 md:px-6">
                  <essential.icon className="h-6 w-6 sm:h-8 sm:w-8 mb-2 text-elec-yellow" />
                  <CardTitle className="text-xs sm:text-sm md:text-base leading-tight text-center">
                    {essential.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-elec-gray/30 border-elec-yellow/20">
        <CardContent className="p-4 md:p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Professional Trade Services</h3>
            <p className="text-sm text-muted-foreground">
              Access essential trade services, job opportunities, and resources 
              designed specifically for electrical professionals in the UK.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeEssentials;
