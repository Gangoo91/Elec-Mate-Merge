import { ArrowLeft, Users, MessageCircle, Clock, Lightbulb, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule7Section4 = () => {
  useSEO(
    "Section 7.4: Professional Behaviours and Soft Skills - MOET Module 7",
    "Teamwork, communication, time management and professional conduct"
  );

  const subsections = [
    {
      number: "7.4.1",
      title: "Teamwork and Collaboration",
      description: "Working effectively in teams and collaborative problem-solving",
      icon: Users,
      href: "/study-centre/apprentice/m-o-e-t-module7-section4-1"
    },
    {
      number: "7.4.2",
      title: "Communication and Reporting Skills",
      description: "Effective communication techniques and professional reporting",
      icon: MessageCircle,
      href: "/study-centre/apprentice/m-o-e-t-module7-section4-2"
    },
    {
      number: "7.4.3",
      title: "Time Management and Organisation",
      description: "Priority setting, planning and efficient work organisation",
      icon: Clock,
      href: "/study-centre/apprentice/m-o-e-t-module7-section4-3"
    },
    {
      number: "7.4.4",
      title: "Initiative and Problem-Solving",
      description: "Demonstrating initiative and systematic problem-solving approaches",
      icon: Lightbulb,
      href: "/study-centre/apprentice/m-o-e-t-module7-section4-4"
    },
    {
      number: "7.4.5",
      title: "Professional Conduct and Attitude",
      description: "Professional standards, work ethics and positive workplace attitude",
      icon: UserCheck,
      href: "/study-centre/apprentice/m-o-e-t-module7-section4-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 7.4: Professional Behaviours and Soft Skills
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Teamwork, communication, time management and professional conduct.
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subsections.map((subsection, index) => (
            <ModuleCard
              key={index}
              number={subsection.number}
              title={subsection.title}
              description={subsection.description}
              icon={subsection.icon}
              href={subsection.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MOETModule7Section4;