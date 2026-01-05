import { ArrowLeft, Cable, Zap, Thermometer, Shield, Settings } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "6.1",
    title: "Conductor Materials and Properties",
    description: "Copper, aluminium and other conductor materials - properties and applications",
    icon: Cable,
    href: "../level3-module3-section6-6-1",
  },
  {
    number: "6.2", 
    title: "Resistance and Voltage Drop",
    description: "Calculating conductor resistance and voltage drop in electrical circuits",
    icon: Zap,
    href: "../level3-module3-section6-6-2",
  },
  {
    number: "6.3",
    title: "Current-Carrying Capacity",
    description: "Factors affecting cable current ratings and derating calculations",
    icon: Settings,
    href: "../level3-module3-section6-6-3",
  },
  {
    number: "6.4",
    title: "Thermal Effects on Cables",
    description: "Temperature effects on cable performance and thermal protection",
    icon: Thermometer,
    href: "../level3-module3-section6-6-4",
  },
  {
    number: "6.5",
    title: "Insulation Types and Environmental Effects",
    description: "Cable insulation materials, environmental conditions and protection methods",
    icon: Shield,
    href: "../level3-module3-section6-6-5",
  },
];

const Level3Module3Section6 = () => {
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
            Section 6 - Cables and Conductors
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Understand conductor properties, cable selection, current-carrying capacity and environmental considerations
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

export default Level3Module3Section6;