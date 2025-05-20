
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Clock, Heart, Users, WrenchIcon, Bot, ArrowLeft, Calculator, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ApprenticeHub = () => {
  const apprenticeResources = [
    {
      id: 1,
      title: "Study Centre",
      icon: Book,
      link: "/apprentice/study"
    },
    {
      id: 2,
      title: "Off the Job Time Tracking",
      icon: Clock,
      link: "/apprentice/time-tracking"
    },
    {
      id: 3,
      title: "Mental Health Hub",
      icon: Heart,
      link: "/mental-health"
    },
    {
      id: 4,
      title: "Mentor Connect",
      icon: Users,
      link: "/mentor"
    },
    {
      id: 5,
      title: "Toolbox Talk",
      icon: WrenchIcon,
      link: "/apprentice/toolbox"
    },
    {
      id: 6,
      title: "On the Job Tools",
      icon: Settings,
      link: "/apprentice/on-job-tools"
    }
  ];

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

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apprenticeResources.map((resource) => (
          <Link to={resource.link} key={resource.id} className="focus:outline-none">
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer">
              <CardHeader className="flex flex-col items-center justify-center text-center">
                <resource.icon className="h-8 w-8 text-elec-yellow mb-2" />
                <CardTitle className="text-xl">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* No descriptions for cleaner look */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeHub;
