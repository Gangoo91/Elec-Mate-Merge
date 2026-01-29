import { ArrowLeft, Layers, Zap, Workflow, PlayCircle, FileCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule8Section6 = () => {
  useSEO(
    "Services Coordination - HNC Module 8 Section 6 | HVAC Systems",
    "Master services coordination: HVAC electrical requirements, plant room design, interface coordination and commissioning procedures for building services."
  );

  const subsections = [
    {
      number: "6.1",
      title: "HVAC Electrical Requirements",
      description: "Electrical loads, power supplies, control wiring, cable containment and installation standards",
      icon: Zap,
      href: "../h-n-c-module8-section6-1"
    },
    {
      number: "6.2",
      title: "Plant Room Design",
      description: "Layout considerations, access requirements, ventilation, lighting and electrical infrastructure",
      icon: Layers,
      href: "../h-n-c-module8-section6-2"
    },
    {
      number: "6.3",
      title: "Interface Coordination",
      description: "MEP coordination, clash detection, installation sequencing and design coordination meetings",
      icon: Workflow,
      href: "../h-n-c-module8-section6-3"
    },
    {
      number: "6.4",
      title: "Commissioning Procedures",
      description: "CIBSE Code M, witness testing, seasonal commissioning and performance verification",
      icon: PlayCircle,
      href: "../h-n-c-module8-section6-4"
    },
    {
      number: "6.5",
      title: "Documentation",
      description: "O&M manuals, as-built drawings, testing records and building log book requirements",
      icon: FileCheck,
      href: "../h-n-c-module8-section6-5"
    },
    {
      number: "6.6",
      title: "Handover and Training",
      description: "Client training, operational handover, defects period and post-occupancy support",
      icon: Users,
      href: "../h-n-c-module8-section6-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 6: Services Coordination
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Coordinate HVAC and electrical services for successful project delivery
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the coordination of HVAC systems with electrical services and other building systems. You'll learn about electrical requirements for HVAC plant, plant room design, interface coordination, commissioning procedures and the documentation required for successful handover.
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

export default HNCModule8Section6;
