
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Clock, Heart, Users, WrenchIcon, Bot, ArrowLeft, Calculator, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OnTheJobToolsBox from "@/components/apprentice/OnTheJobToolsBox";

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
      id: 4,
      title: "Mentor Connect",
      icon: Users,
      link: "/apprentice/mentor"
    },
    {
      id: 5,
      title: "Toolbox Talk",
      icon: WrenchIcon,
      link: "/apprentice/toolbox"
    },
    {
      id: 6,
      title: "AI Tooling",
      icon: Bot,
      link: "/apprentice/ai-tools"
    }
  ];

  const onJobTools = [
    {
      id: 1,
      title: "Electrical Calculations",
      icon: Calculator,
      description: "Cable sizing, load calculations, voltage drop, and more",
      link: "/apprentice/on-job-tools/calculations"
    },
    {
      id: 2,
      title: "Documentation Templates",
      icon: FileText,
      description: "Forms, certificates, and reports for on-site documentation",
      link: "/apprentice/on-job-tools/documents"
    },
    {
      id: 3,
      title: "Site Assessment Tools",
      icon: Settings,
      description: "Checklists and guides for job site evaluations",
      link: "/apprentice/on-job-tools/assessment"
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
                {/* Removed descriptions for cleaner look */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* On the Job Tools Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">On the Job Tools</h2>
        <OnTheJobToolsBox tools={onJobTools} />
      </div>
    </div>
  );
};

export default ApprenticeHub;
