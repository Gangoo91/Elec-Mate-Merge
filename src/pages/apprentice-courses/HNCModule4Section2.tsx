import { ArrowLeft, Gauge, TrendingDown, Thermometer, Zap, Cable, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule4Section2 = () => {
  useSEO(
    "Cable Selection and Sizing - HNC Module 4 Section 2 | Building Services Design",
    "Master cable selection and sizing: current-carrying capacity, voltage drop calculations, thermal constraints, short-circuit withstand and installation methods."
  );

  const subsections = [
    {
      number: "2.1",
      title: "Current-Carrying Capacity",
      description: "BS 7671 tables, installation methods, correction factors and tabulated current ratings",
      icon: Gauge,
      href: "../h-n-c-module4-section2-1"
    },
    {
      number: "2.2",
      title: "Voltage Drop Calculations",
      description: "Permissible limits, mV/A/m method, three-phase calculations and long cable runs",
      icon: TrendingDown,
      href: "../h-n-c-module4-section2-2"
    },
    {
      number: "2.3",
      title: "Thermal Constraints",
      description: "Ambient temperature derating, grouping factors, insulation types and thermal resistivity",
      icon: Thermometer,
      href: "../h-n-c-module4-section2-3"
    },
    {
      number: "2.4",
      title: "Short-Circuit Withstand",
      description: "Adiabatic equation, let-through energy (I²t), fault duration and conductor thermal limits",
      icon: Zap,
      href: "../h-n-c-module4-section2-4"
    },
    {
      number: "2.5",
      title: "Cable Types and Selection",
      description: "XLPE, LSF, SWA, FP cables, armoured cables and specification for different applications",
      icon: Cable,
      href: "../h-n-c-module4-section2-5"
    },
    {
      number: "2.6",
      title: "Cable Installation Methods",
      description: "Containment systems, cable supports, bending radii, segregation and routing considerations",
      icon: Wrench,
      href: "../h-n-c-module4-section2-6"
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
          Section 2: Cable Selection and Sizing
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Select and size cables correctly to ensure safe operation, compliance with BS 7671 and optimal system performance
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the complete cable selection process from determining current-carrying capacity through to installation methods. Understanding these principles is essential for designing safe, compliant and cost-effective building services installations.
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

export default HNCModule4Section2;
