import { ArrowLeft, Flame, Wind, Snowflake, RotateCcw, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule8 = () => {
  useSEO(
    "HVAC Systems - HNC Module 8",
    "Master HVAC system design: heating, ventilation, air conditioning, motor control, BMS integration and electrical services coordination for building services"
  );

  const sections = [
    {
      number: "Section 1",
      title: "Heating Systems",
      description: "Boiler systems, heat pump integration, underfloor heating, radiator circuits and heating controls",
      icon: Flame,
      href: "../h-n-c-module8-section1"
    },
    {
      number: "Section 2",
      title: "Ventilation Systems",
      description: "Supply and extract systems, heat recovery, ductwork design, air handling units and fan selection",
      icon: Wind,
      href: "../h-n-c-module8-section2"
    },
    {
      number: "Section 3",
      title: "Air Conditioning Systems",
      description: "DX systems, chilled water, VRF/VRV technology, refrigeration principles and system selection",
      icon: Snowflake,
      href: "../h-n-c-module8-section3"
    },
    {
      number: "Section 4",
      title: "Motor Control",
      description: "DOL and star-delta starters, VSDs, soft starters, motor protection and energy-efficient drives",
      icon: RotateCcw,
      href: "../h-n-c-module8-section4"
    },
    {
      number: "Section 5",
      title: "BMS Integration",
      description: "Building management systems, control strategies, sensors, actuators, protocols and system optimisation",
      icon: Cpu,
      href: "../h-n-c-module8-section5"
    },
    {
      number: "Section 6",
      title: "Services Coordination",
      description: "HVAC electrical requirements, plant room design, interface coordination and commissioning procedures",
      icon: Layers,
      href: "../h-n-c-module8-section6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../hnc">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to HNC
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Module 8: HVAC Systems
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Understand HVAC system design and the electrical services that support heating, ventilation and air conditioning in modern commercial buildings
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ModuleCard
              key={section.number}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HNCModule8;
