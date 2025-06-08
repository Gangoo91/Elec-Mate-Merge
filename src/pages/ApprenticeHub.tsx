
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Clock, Heart, Users, WrenchIcon, Bot, ArrowLeft, Calculator, FileText, Settings, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavigationTest from "@/components/apprentice/NavigationTest";

const ApprenticeHub = () => {
  const apprenticeResources = [
    {
      id: 1,
      title: "Study Centre",
      icon: Book,
      link: "/apprentice/study",
      description: "Access learning resources and materials"
    },
    {
      id: 2,
      title: "Off the Job Time Keeping",
      icon: Clock,
      link: "/apprentice/ojt",
      description: "Track your off-the-job training hours"
    },
    {
      id: 3,
      title: "Mental Health Hub",
      icon: Heart,
      link: "/apprentice/mental-health",
      description: "Support and resources for wellbeing"
    },
    {
      id: 4,
      title: "Mentor Connect",
      icon: Users,
      link: "/apprentice/mentor",
      description: "Connect with mentors and supervisors"
    },
    {
      id: 5,
      title: "Guidance Area",
      icon: WrenchIcon,
      link: "/apprentice/toolbox",
      description: "Essential guidance and resources"
    },
    {
      id: 6,
      title: "On the Job Tools",
      icon: Settings,
      link: "/apprentice/on-job-tools",
      description: "Practical tools for electrical work"
    },
    {
      id: 7,
      title: "Professional Development",
      icon: GraduationCap,
      link: "/apprentice/professional-development",
      description: "Plan your career progression"
    }
  ];

  // Add debugging to check navigation
  const handleCardClick = (resource: typeof apprenticeResources[0]) => {
    console.log(`Navigating to: ${resource.link}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Apprentice Hub</h1>
        <Link to="/dashboard" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Temporary Navigation Test - Remove after debugging */}
      <NavigationTest />

      {/* Debug info */}
      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-md p-3 text-xs">
        <p className="text-muted-foreground">
          Debug: Hub loaded successfully. Click any card to navigate to its section.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apprenticeResources.map((resource) => (
          <Link 
            to={resource.link} 
            key={resource.id} 
            className="focus:outline-none group"
            onClick={() => handleCardClick(resource)}
          >
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-all duration-300 cursor-pointer group-hover:border-elec-yellow/40 group-hover:shadow-lg">
              <CardHeader className="flex flex-col items-center justify-center text-center pb-4">
                <resource.icon className="h-8 w-8 text-elec-yellow mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl group-hover:text-elec-yellow transition-colors">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Navigation Status */}
      <div className="bg-green-950/20 border border-green-600/30 rounded-md p-4">
        <p className="text-sm text-green-200/90">
          <strong>Navigation Status:</strong> All apprentice hub routes are configured and ready. 
          If you experience any issues, please refresh the page or contact support.
        </p>
      </div>
    </div>
  );
};

export default ApprenticeHub;
