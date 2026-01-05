import { ArrowLeft, Clock, UserCheck, Users, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule6Section4 = () => {
  useSEO(
    "Section 6.4: Handovers and Stakeholder Communication - MOET Module 6",
    "Shift handovers, stakeholder communication, professional behaviour and teamwork"
  );

  const subsections = [
    {
      number: "6.4.1",
      title: "Shift Handover Procedures",
      description: "Shift handover protocols, information transfer and continuity procedures",
      icon: Clock,
      href: "../m-o-e-t-module6-section4-1"
    },
    {
      number: "6.4.2",
      title: "Communicating with Supervisors and Engineers",
      description: "Professional communication, reporting lines and technical discussions",
      icon: UserCheck,
      href: "../m-o-e-t-module6-section4-2"
    },
    {
      number: "6.4.3",
      title: "Liaising with Non-Technical Staff",
      description: "Communication with operations, management and non-technical personnel",
      icon: Users,
      href: "../m-o-e-t-module6-section4-3"
    },
    {
      number: "6.4.4",
      title: "Professional Behaviour and Teamwork",
      description: "Professional standards, teamwork principles and workplace behaviour",
      icon: Handshake,
      href: "../m-o-e-t-module6-section4-4"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 6.4: Handovers and Stakeholder Communication
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Shift handovers, stakeholder communication, professional behaviour and teamwork.
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

export default MOETModule6Section4;