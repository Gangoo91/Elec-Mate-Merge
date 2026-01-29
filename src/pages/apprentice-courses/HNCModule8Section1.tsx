import { ArrowLeft, Flame, ThermometerSun, Waves, Gauge, Radio, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule8Section1 = () => {
  useSEO(
    "Heating Systems - HNC Module 8 Section 1 | HVAC Systems",
    "Master heating systems: boiler systems, heat pump integration, underfloor heating, radiator circuits and heating controls for building services."
  );

  const subsections = [
    {
      number: "1.1",
      title: "Boiler Systems",
      description: "Boiler types, efficiency ratings, cascade systems, flue requirements and safety controls",
      icon: Flame,
      href: "../h-n-c-module8-section1-1"
    },
    {
      number: "1.2",
      title: "Heat Pump Integration",
      description: "Heat pump principles, system integration, buffer vessels, flow temperatures and hybrid systems",
      icon: ThermometerSun,
      href: "../h-n-c-module8-section1-2"
    },
    {
      number: "1.3",
      title: "Underfloor Heating",
      description: "UFH design, manifold systems, pipe layouts, zone control and screed requirements",
      icon: Waves,
      href: "../h-n-c-module8-section1-3"
    },
    {
      number: "1.4",
      title: "Radiator Systems",
      description: "Radiator sizing, pipe sizing, balancing, TRVs and system hydraulics",
      icon: Gauge,
      href: "../h-n-c-module8-section1-4"
    },
    {
      number: "1.5",
      title: "Heating Controls",
      description: "Compensated control, optimum start, zone control, BMS integration and energy efficiency",
      icon: Radio,
      href: "../h-n-c-module8-section1-5"
    },
    {
      number: "1.6",
      title: "System Commissioning",
      description: "Flushing, filling, pressurising, balancing, performance testing and handover documentation",
      icon: Settings,
      href: "../h-n-c-module8-section1-6"
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
          Section 1: Heating Systems
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understand heating system design and the electrical services that support modern heating installations
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers heating systems from an electrical services perspective. You'll learn about boiler systems, heat pump integration, underfloor heating, radiator circuits and the control systems that optimise heating system performance and energy efficiency.
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

export default HNCModule8Section1;
