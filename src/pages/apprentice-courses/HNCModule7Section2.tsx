import { ArrowLeft, Lightbulb, Bell, Battery, Cpu, Flame, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule7Section2 = () => {
  useSEO(
    "Emergency Systems - HNC Module 7 Section 2 | Power Systems",
    "Master emergency systems: emergency lighting design, fire alarm systems, life safety power supplies, standby generators and UPS systems."
  );

  const subsections = [
    {
      number: "2.1",
      title: "Emergency Lighting Design",
      description: "BS 5266 requirements, lux levels, duration, escape routes, open areas and high-risk task areas",
      icon: Lightbulb,
      href: "../h-n-c-module7-section2-1"
    },
    {
      number: "2.2",
      title: "Fire Alarm Systems",
      description: "BS 5839 categories, detector types, zoning, cause and effect, voice alarm and system integration",
      icon: Bell,
      href: "../h-n-c-module7-section2-2"
    },
    {
      number: "2.3",
      title: "Life Safety Power",
      description: "Essential supplies, safety services, fire-rated cables, switchover systems and testing requirements",
      icon: Battery,
      href: "../h-n-c-module7-section2-3"
    },
    {
      number: "2.4",
      title: "Standby Generator Systems",
      description: "Generator sizing, fuel systems, starting sequences, AMF panels and maintenance requirements",
      icon: Cpu,
      href: "../h-n-c-module7-section2-4"
    },
    {
      number: "2.5",
      title: "UPS Systems",
      description: "UPS topologies, sizing calculations, battery systems, bypass arrangements and monitoring",
      icon: Flame,
      href: "../h-n-c-module7-section2-5"
    },
    {
      number: "2.6",
      title: "Testing and Compliance",
      description: "Periodic testing, documentation, fire risk assessment coordination and regulatory compliance",
      icon: FileCheck,
      href: "../h-n-c-module7-section2-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 2: Emergency Systems
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design life safety systems including emergency lighting, fire alarms and standby power
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers essential life safety systems in commercial buildings. You'll learn about emergency lighting design to BS 5266, fire alarm systems to BS 5839, standby generators, UPS systems and the testing and compliance requirements for these critical systems.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsections.map((subsection) => (
            <ModuleCard
              key={subsection.number}
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

export default HNCModule7Section2;
