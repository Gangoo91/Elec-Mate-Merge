
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, LayoutGrid, Heart, Users, Brain, GraduationCap } from "lucide-react";

const ElectricalHub = () => {
  const hubCards = [
    {
      id: 1,
      title: "Toolbox Talk",
      description: "Access practical guides and safety information for on-site work",
      icon: <Wrench className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/toolbox-talk"
    },
    {
      id: 2,
      title: "Project Management",
      description: "Organize and track your electrical projects efficiently",
      icon: <LayoutGrid className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician-tools"
    },
    {
      id: 3,
      title: "Mental Health Hub",
      description: "Resources and support for maintaining wellbeing during your career",
      icon: <Heart className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/apprentice/mental-health"
    },
    {
      id: 4,
      title: "Mentor Connect",
      description: "Connect with industry mentors for guidance and career advice",
      icon: <Users className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/apprentice/mentor"
    },
    {
      id: 5,
      title: "AI Tooling",
      description: "Leverage AI tools to enhance your learning and practical electrical skills",
      icon: <Brain className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/apprentice/ai-tools"
    },
    {
      id: 6,
      title: "Career Progression",
      description: "Resources and guidance for advancing your electrical career",
      icon: <GraduationCap className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/dashboard"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Electrical Hub</h1>
        <p className="text-muted-foreground">
          Essential tools and resources for electrical professionals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hubCards.map((card) => (
          <Link key={card.id} to={card.link} className="group">
            <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <CardDescription className="text-sm">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-6">
                <div className="transition-transform group-hover:scale-110">
                  {card.icon}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ElectricalHub;
