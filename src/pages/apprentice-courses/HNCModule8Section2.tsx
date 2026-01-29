import { ArrowLeft, Wind, Box, Fan, RefreshCcw, Thermometer, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule8Section2 = () => {
  useSEO(
    "Ventilation Systems - HNC Module 8 Section 2 | HVAC Systems",
    "Master ventilation systems: supply and extract, heat recovery, ductwork design, air handling units and fan selection for building services."
  );

  const subsections = [
    {
      number: "2.1",
      title: "Ventilation Principles",
      description: "Air change rates, fresh air requirements, contaminant control and ventilation standards",
      icon: Wind,
      href: "../h-n-c-module8-section2-1"
    },
    {
      number: "2.2",
      title: "Air Handling Units",
      description: "AHU components, configurations, coil selection, filtration and acoustic considerations",
      icon: Box,
      href: "../h-n-c-module8-section2-2"
    },
    {
      number: "2.3",
      title: "Fan Selection",
      description: "Fan types, characteristics, system curves, duty point selection and efficiency considerations",
      icon: Fan,
      href: "../h-n-c-module8-section2-3"
    },
    {
      number: "2.4",
      title: "Heat Recovery Systems",
      description: "Plate heat exchangers, thermal wheels, run-around coils, efficiency and control strategies",
      icon: RefreshCcw,
      href: "../h-n-c-module8-section2-4"
    },
    {
      number: "2.5",
      title: "Ductwork Design",
      description: "Sizing methods, pressure drop, materials, acoustic attenuation and fire dampers",
      icon: Thermometer,
      href: "../h-n-c-module8-section2-5"
    },
    {
      number: "2.6",
      title: "System Balancing",
      description: "Air balancing procedures, commissioning, performance verification and documentation",
      icon: Settings,
      href: "../h-n-c-module8-section2-6"
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
          Section 2: Ventilation Systems
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design and specify ventilation systems with appropriate electrical services support
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers mechanical ventilation systems from an electrical services perspective. You'll learn about air handling units, fan selection, heat recovery systems, ductwork design and the commissioning procedures required to achieve compliant, efficient ventilation.
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

export default HNCModule8Section2;
