import { ArrowLeft, Zap, Calculator, BarChart3, Ruler, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule2Section1 = () => {
  useSEO(
    "Electrical Fundamentals - MOET Module 2",
    "Voltage, current, resistance, power, Ohm's and Watt's laws, units and symbols"
  );

  const subsections = [
    {
      number: "2.1.1",
      title: "Voltage, Current, Resistance, Power",
      description: "Understanding fundamental electrical quantities and relationships",
      icon: Zap,
      href: "../m-o-e-t-module2-section1-1-1"
    },
    {
      number: "2.1.2", 
      title: "Ohm's Law and Watt's Law",
      description: "Application of fundamental electrical laws and calculations",
      icon: Calculator,
      href: "../m-o-e-t-module2-section1-1-2"
    },
    {
      number: "2.1.3",
      title: "Energy and Efficiency", 
      description: "Energy calculations and efficiency considerations in electrical systems",
      icon: BarChart3,
      href: "../m-o-e-t-module2-section1-1-3"
    },
    {
      number: "2.1.4",
      title: "Units and Measurement",
      description: "Electrical units, prefixes and measurement principles",
      icon: Ruler,
      href: "../m-o-e-t-module2-section1-1-4"
    },
    {
      number: "2.1.5",
      title: "Electrical Symbols and Conventions",
      description: "Standard electrical symbols and schematic conventions",
      icon: FileText,
      href: "../m-o-e-t-module2-section1-1-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            2.1 Electrical Fundamentals
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Voltage, current, resistance, power, Ohm's and Watt's laws, units and symbols.
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

export default MOETModule2Section1;