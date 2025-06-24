
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Heart, WrenchIcon, Bot, ArrowLeft, Settings, GraduationCap, Zap, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ApprenticeHub = () => {
  const apprenticeResources = [
    {
      id: 8,
      title: "Advanced Help Box",
      icon: Zap,
      link: "/apprentice/advanced-help",
      featured: true,
      description: "AI & AR powered support"
    },
    {
      id: 9,
      title: "BS7671 Inspection & Testing",
      icon: CheckSquare,
      link: "/apprentice/bs7671-inspection-testing",
      featured: true,
      description: "Complete step-by-step inspection and testing process"
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
      id: 5,
      title: "Guidance Area",
      icon: WrenchIcon,
      link: "/apprentice/toolbox"
    },
    {
      id: 6,
      title: "On the Job Tools",
      icon: Settings,
      link: "/apprentice/on-job-tools"
    },
    {
      id: 7,
      title: "Professional Development",
      icon: GraduationCap,
      link: "/apprentice/professional-development"
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
            <Card className={`border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer ${
              resource.featured ? 'ring-2 ring-elec-yellow/50 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10' : ''
            }`}>
              <CardHeader className="flex flex-col items-center justify-center text-center">
                <resource.icon className={`h-8 w-8 mb-2 ${resource.featured ? 'text-elec-yellow' : 'text-elec-yellow'}`} />
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                {resource.featured && (
                  <div className="flex items-center gap-1 mt-2">
                    <Bot className="h-4 w-4 text-elec-yellow" />
                    <span className="text-xs text-elec-yellow font-semibold">
                      {resource.description || "AI & AR Powered"}
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {/* Removed descriptions for cleaner look */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeHub;
