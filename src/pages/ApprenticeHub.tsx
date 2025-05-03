
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Clock, Heart, Users, WrenchIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ApprenticeHub = () => {
  const apprenticeResources = [
    {
      id: 1,
      title: "Study Centre",
      description: "Access structured learning paths and study materials designed for electrical apprentices.",
      icon: Book,
      link: "/apprentice/study"
    },
    {
      id: 2,
      title: "Off the Job Time Keeping",
      description: "Track your 20% off-the-job training hours and access EAL compliant resources.",
      icon: Clock,
      link: "/apprentice/ojt"
    },
    {
      id: 3,
      title: "Mental Health Hub",
      description: "Resources and support for maintaining wellbeing during your apprenticeship journey.",
      icon: Heart,
      link: "/apprentice/mental-health"
    },
    {
      id: 4,
      title: "Mentor Connect",
      description: "Connect with industry mentors and experienced professionals for guidance.",
      icon: Users,
      link: "/apprentice/mentor"
    },
    {
      id: 5,
      title: "Toolbox Talk",
      description: "Access practical guides and safety information for on-site work.",
      icon: WrenchIcon,
      link: "/apprentice/toolbox"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Apprentice Hub</h1>
        <p className="text-muted-foreground">
          EAL-compliant training resources and time tracking for electrical apprentices.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apprenticeResources.map((resource) => (
          <Link to={resource.link} key={resource.id} className="focus:outline-none">
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <resource.icon className="h-6 w-6 text-elec-yellow" />
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {resource.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* EAL Integration Note */}
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-semibold">EAL Integration</h3>
          <p className="text-sm text-muted-foreground">ElecMate is designed to align with EAL's 20% off-the-job training requirements.</p>
        </div>
      </div>
    </div>
  );
};

export default ApprenticeHub;
