import { ArrowLeft, Flame, Heart, ArrowRight, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule1Section6 = () => {
  useSEO(
    "Emergency Procedures & First Aid - MOET Module 1", 
    "Fire safety, electrical first aid, evacuation and incident reporting"
  );

  const subsections = [
    {
      number: "1.6.1",
      title: "Fire Safety and Extinguishers",
      description: "Fire prevention, detection and appropriate extinguisher selection",
      icon: Flame,
      href: "../m-o-e-t-module1-section6-6-1"
    },
    {
      number: "1.6.2", 
      title: "First Aid for Electrical Incidents",
      description: "CPR, treatment of electrical burns and shock response",
      icon: Heart,
      href: "../m-o-e-t-module1-section6-6-2"
    },
    {
      number: "1.6.3",
      title: "Evacuation Procedures", 
      description: "Emergency evacuation plans and muster point procedures",
      icon: ArrowRight,
      href: "../m-o-e-t-module1-section6-6-3"
    },
    {
      number: "1.6.4",
      title: "Reporting Incidents, Accidents and Near Misses",
      description: "Incident reporting systems and investigation procedures",
      icon: FileText,
      href: "../m-o-e-t-module1-section6-6-4"
    },
    {
      number: "1.6.5",
      title: "Role of First Responders on Site",
      description: "First responder duties and coordination with emergency services",
      icon: Users,
      href: "../m-o-e-t-module1-section6-6-5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            1.6 Emergency Procedures & First Aid
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Fire safety, electrical first aid, evacuation and incident reporting.
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

export default MOETModule1Section6;