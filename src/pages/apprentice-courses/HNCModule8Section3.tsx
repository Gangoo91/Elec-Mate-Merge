import { ArrowLeft, Snowflake, Droplets, Gauge, Network, ThermometerSnowflake, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule8Section3 = () => {
  useSEO(
    "Air Conditioning Systems - HNC Module 8 Section 3 | HVAC Systems",
    "Master air conditioning: DX systems, chilled water, VRF/VRV technology, refrigeration principles and system selection for building services."
  );

  const subsections = [
    {
      number: "3.1",
      title: "Refrigeration Fundamentals",
      description: "Refrigeration cycle, refrigerants, compressor types, F-gas regulations and environmental impact",
      icon: Snowflake,
      href: "../h-n-c-module8-section3-1"
    },
    {
      number: "3.2",
      title: "DX Systems",
      description: "Split systems, multi-split, VRF/VRV technology, system design and electrical requirements",
      icon: Droplets,
      href: "../h-n-c-module8-section3-2"
    },
    {
      number: "3.3",
      title: "Chilled Water Systems",
      description: "Chillers, cooling towers, primary/secondary pumping, pipe sizing and system hydraulics",
      icon: Gauge,
      href: "../h-n-c-module8-section3-3"
    },
    {
      number: "3.4",
      title: "Terminal Units",
      description: "Fan coil units, chilled beams, cassettes, unit selection and control strategies",
      icon: Network,
      href: "../h-n-c-module8-section3-4"
    },
    {
      number: "3.5",
      title: "System Selection",
      description: "Load calculations, system comparison, life cycle costs, sustainability and selection criteria",
      icon: ThermometerSnowflake,
      href: "../h-n-c-module8-section3-5"
    },
    {
      number: "3.6",
      title: "Commissioning and Testing",
      description: "Refrigerant charging, system testing, performance verification and handover requirements",
      icon: Settings,
      href: "../h-n-c-module8-section3-6"
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
          Section 3: Air Conditioning Systems
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design and specify air conditioning systems with appropriate electrical services support
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers air conditioning and cooling systems from an electrical services perspective. You'll learn about refrigeration principles, DX and chilled water systems, VRF technology, terminal units and the commissioning procedures for cooling systems.
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

export default HNCModule8Section3;
