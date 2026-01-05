import { ArrowLeft, Zap, Scale, Calculator, Repeat, Search, Lightbulb } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "1.1",
    title: "What is Electricity?",
    description: "Fundamental understanding of electricity and electrical phenomena",
    icon: Lightbulb,
    href: "1-1"
  },
  {
    number: "1.2", 
    title: "Voltage, Current, and Resistance – Definitions and Relationships",
    description: "Core electrical quantities and how they relate to each other",
    icon: Zap,
    href: "1-2"
  },
  {
    number: "1.3",
    title: "Units of Measurement (Volts, Amps, Ohms, Watts, etc.)",
    description: "Standard units used in electrical measurements and calculations",
    icon: Scale,
    href: "1-3"
  },
  {
    number: "1.4",
    title: "SI Prefixes (milli-, kilo-, mega-) and Conversions",
    description: "Understanding and converting between different scale units",
    icon: Repeat,
    href: "1-4"
  },
  {
    number: "1.5",
    title: "Basic Measuring Instruments (Multimeter overview)",
    description: "Introduction to essential electrical measurement tools",
    icon: Search,
    href: "1-5"
  },
];

const Module2Section2_1 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
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
            Module 2, Section 1 – Electrical Quantities and Units
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Understanding fundamental electrical quantities: voltage, current, resistance, and their units
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

export default Module2Section2_1;