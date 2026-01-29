import { ArrowLeft, Shield, ToggleRight, Zap, Layers, CircleDot, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule4Section3 = () => {
  useSEO(
    "Protection and Discrimination - HNC Module 4 Section 3 | Building Services Design",
    "Master circuit protection: protective device selection, fault current calculations, discrimination coordination and earth fault protection systems."
  );

  const subsections = [
    {
      number: "3.1",
      title: "Circuit Protection Principles",
      description: "Overload protection, short-circuit protection, earth fault protection and protection coordination",
      icon: Shield,
      href: "../h-n-c-module4-section3-1"
    },
    {
      number: "3.2",
      title: "Protective Device Selection",
      description: "MCBs, MCCBs, fuses, time-current characteristics and device ratings",
      icon: ToggleRight,
      href: "../h-n-c-module4-section3-2"
    },
    {
      number: "3.3",
      title: "Fault Current Calculations",
      description: "Prospective fault current, breaking capacity, fault level studies and network impedance",
      icon: Zap,
      href: "../h-n-c-module4-section3-3"
    },
    {
      number: "3.4",
      title: "Discrimination and Coordination",
      description: "Time/current grading, energy let-through coordination and cascade arrangements",
      icon: Layers,
      href: "../h-n-c-module4-section3-4"
    },
    {
      number: "3.5",
      title: "Earth Fault Protection",
      description: "RCDs, TN/TT system requirements, Zs verification and automatic disconnection times",
      icon: CircleDot,
      href: "../h-n-c-module4-section3-5"
    },
    {
      number: "3.6",
      title: "Arc Fault Detection",
      description: "AFDDs, applications, BS 7671 requirements and fire risk reduction",
      icon: Flame,
      href: "../h-n-c-module4-section3-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 3: Protection and Discrimination
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design effective protection systems that ensure safety whilst maintaining continuity of supply through proper discrimination
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the selection and coordination of protective devices for building services installations. Proper protection design is essential for safety, but equally important is achieving discrimination to minimise disruption when faults occur.
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

export default HNCModule4Section3;
