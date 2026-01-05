import { ArrowLeft, Sun, Wind, Waves, Battery, Plug } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "3.1",
    title: "Solar PV principles, components, and installation considerations",
    description: "Photovoltaic technology fundamentals, system components and installation requirements",
    icon: Sun,
    href: "../level3-module2-section3-3-1",
  },
  {
    number: "3.2", 
    title: "Wind generation (small-scale systems)",
    description: "Small-scale wind turbine systems for residential and commercial applications",
    icon: Wind,
    href: "../level3-module2-section3-3-2",
  },
  {
    number: "3.3",
    title: "Hydro and microgeneration awareness", 
    description: "Small-scale hydroelectric systems and microgeneration technologies",
    icon: Waves,
    href: "../level3-module2-section3-3-3",
  },
  {
    number: "3.4",
    title: "Battery storage technologies",
    description: "Energy storage systems, battery technologies and integration with renewable sources",
    icon: Battery,
    href: "../level3-module2-section3-3-4",
  },
  {
    number: "3.5",
    title: "Inverters and grid connection requirements",
    description: "Power inverter technology and grid connection standards for renewable systems",
    icon: Plug,
    href: "../level3-module2-section3-3-5",
  },
];

const Level3Module2Section3 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
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
            Section 3: Renewable Energy Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Solar, wind and other renewable energy technologies and their applications
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

export default Level3Module2Section3;