import { ArrowLeft, Cpu, Cable, Grid, Clock, Monitor, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule5Section2 = () => {
  useSEO(
    "Section 5.2: PLCs and Control Systems - MOET Module 5",
    "PLC hardware, I/O devices, ladder logic, programming software and troubleshooting"
  );

  const subsections = [
    {
      number: "5.2.1",
      title: "PLC Hardware and Architecture",
      description: "CPU modules, memory types, power supplies and system architecture",
      icon: Cpu,
      href: "../m-o-e-t-module5-section2-1"
    },
    {
      number: "5.2.2",
      title: "Input/Output Devices",
      description: "Digital and analogue I/O modules, wiring and interfacing",
      icon: Cable,
      href: "../m-o-e-t-module5-section2-2"
    },
    {
      number: "5.2.3",
      title: "Ladder Logic Basics",
      description: "Relay logic concepts, contacts, coils and basic programming elements",
      icon: Grid,
      href: "../m-o-e-t-module5-section2-3"
    },
    {
      number: "5.2.4",
      title: "Timers, Counters and Sequencing",
      description: "Programming timers, counters and sequential control operations",
      icon: Clock,
      href: "../m-o-e-t-module5-section2-4"
    },
    {
      number: "5.2.5",
      title: "PLC Programming Software (overview)",
      description: "Software packages, development environments and programming methods",
      icon: Monitor,
      href: "../m-o-e-t-module5-section2-5"
    },
    {
      number: "5.2.6",
      title: "Troubleshooting PLC Systems",
      description: "Diagnostic tools, fault finding and system maintenance",
      icon: Wrench,
      href: "../m-o-e-t-module5-section2-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 5.2: PLCs and Control Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            PLC hardware, I/O devices, ladder logic, programming software and troubleshooting.
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

export default MOETModule5Section2;