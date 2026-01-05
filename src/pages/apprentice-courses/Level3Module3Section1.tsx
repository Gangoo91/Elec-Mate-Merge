import { ArrowLeft, Calculator, Ruler, Gauge, Target, Scale } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "1.1",
    title: "Ohm's Law and Power Equations",
    description: "Understanding the relationship between voltage, current, resistance and power calculations",
    icon: Calculator,
    href: "../level3-module3-section1-1-1",
  },
  {
    number: "1.2", 
    title: "Electrical Quantities and Units",
    description: "Voltage, current, resistance, power and energy - their units and relationships",
    icon: Ruler,
    href: "../level3-module3-section1-1-2",
  },
  {
    number: "1.3",
    title: "Measurement Instruments",
    description: "Multimeters, clamp meters, insulation testers and their proper applications",
    icon: Gauge,
    href: "../level3-module3-section1-1-3",
  },
  {
    number: "1.4",
    title: "Accuracy, Tolerances and Errors",
    description: "Understanding measurement accuracy, instrument tolerances and sources of error",
    icon: Target,
    href: "../level3-module3-section1-1-4",
  },
  {
    number: "1.5",
    title: "SI Units and Conversions",
    description: "International System of Units and converting between different electrical units",
    icon: Scale,
    href: "../level3-module3-section1-1-5",
  },
];

const Level3Module3Section1 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 1 - Electrical Units and Measurements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Master the fundamental electrical quantities, measurement techniques and the mathematical relationships that underpin all electrical work
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

export default Level3Module3Section1;