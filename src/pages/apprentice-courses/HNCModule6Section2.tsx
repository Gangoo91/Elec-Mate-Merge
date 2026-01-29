import { ArrowLeft, Sun, Flame, Wind, Zap, Battery, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule6Section2 = () => {
  useSEO(
    "Renewable Energy Systems - HNC Module 6 Section 2 | Sustainability",
    "Master renewable technologies: solar PV, heat pumps, biomass, wind power, CHP systems and grid integration for building services applications."
  );

  const subsections = [
    {
      number: "2.1",
      title: "Solar Photovoltaic Systems",
      description: "PV technology, system sizing, installation requirements, G98/G99 connection and performance monitoring",
      icon: Sun,
      href: "../h-n-c-module6-section2-1"
    },
    {
      number: "2.2",
      title: "Heat Pump Technology",
      description: "ASHP and GSHP systems, COP and SCOP, system design, integration with heating systems and MCS requirements",
      icon: Flame,
      href: "../h-n-c-module6-section2-2"
    },
    {
      number: "2.3",
      title: "Biomass Systems",
      description: "Biomass boilers, fuel storage, handling systems, emissions control and integration with building services",
      icon: Wind,
      href: "../h-n-c-module6-section2-3"
    },
    {
      number: "2.4",
      title: "Small-Scale Wind",
      description: "Building-mounted and standalone turbines, site assessment, planning considerations and grid connection",
      icon: Zap,
      href: "../h-n-c-module6-section2-4"
    },
    {
      number: "2.5",
      title: "Battery Storage Systems",
      description: "Battery technologies, system sizing, charge controllers, safety requirements and grid services",
      icon: Battery,
      href: "../h-n-c-module6-section2-5"
    },
    {
      number: "2.6",
      title: "CHP and District Energy",
      description: "Combined heat and power, district heating networks, energy centres and system optimisation",
      icon: Network,
      href: "../h-n-c-module6-section2-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 2: Renewable Energy Systems
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design and integrate renewable energy technologies into building services installations
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the main renewable energy technologies used in buildings, from solar PV and heat pumps to biomass and CHP systems. You'll learn about system design, installation requirements, grid connection and how these technologies integrate with conventional building services.
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

export default HNCModule6Section2;
