import { ArrowLeft, Car, Thermometer, Zap, Atom, Lightbulb } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "4.1",
    title: "Electric Vehicle (EV) charging infrastructure",
    description: "EV charging point installation, types and electrical infrastructure requirements",
    icon: Car,
    href: "../level3-module2-section4-4-1",
  },
  {
    number: "4.2", 
    title: "Heat pumps (air source & ground source)",
    description: "Heat pump technology, electrical requirements and installation considerations",
    icon: Thermometer,
    href: "../level3-module2-section4-4-2",
  },
  {
    number: "4.3",
    title: "Combined Heat & Power (CHP) awareness", 
    description: "CHP systems overview and electrical integration requirements",
    icon: Zap,
    href: "../level3-module2-section4-4-3",
  },
  {
    number: "4.4",
    title: "Hydrogen and fuel cell technologies (overview)",
    description: "Introduction to hydrogen fuel cells and their electrical applications",
    icon: Atom,
    href: "../level3-module2-section4-4-4",
  },
  {
    number: "4.5",
    title: "Future emerging technologies in the sector",
    description: "Emerging low carbon technologies and their potential electrical applications",
    icon: Lightbulb,
    href: "../level3-module2-section4-4-5",
  },
];

const Level3Module2Section4 = () => {
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
            Section 4: Low Carbon Technologies
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Carbon reduction technologies and their integration in building services
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

export default Level3Module2Section4;