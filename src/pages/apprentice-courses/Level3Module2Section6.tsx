import { ArrowLeft, Recycle, AlertTriangle, Leaf, Footprints, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "6.1",
    title: "Waste management and recycling of materials",
    description: "Proper disposal and recycling procedures for electrical materials and components",
    icon: Recycle,
    href: "../level3-module2-section6-6-1",
  },
  {
    number: "6.2", 
    title: "Safe disposal of hazardous components (batteries, lamps)",
    description: "Handling and disposal procedures for hazardous electrical components",
    icon: AlertTriangle,
    href: "../level3-module2-section6-6-2",
  },
  {
    number: "6.3",
    title: "Life-cycle thinking in material selection", 
    description: "Considering environmental impact throughout the lifecycle of electrical materials",
    icon: Leaf,
    href: "../level3-module2-section6-6-3",
  },
  {
    number: "6.4",
    title: "Reducing carbon footprint on site (transport, energy use)",
    description: "Minimising environmental impact through efficient site operations and transport",
    icon: Footprints,
    href: "../level3-module2-section6-6-4",
  },
  {
    number: "6.5",
    title: "Promoting a culture of sustainability within teams",
    description: "Building environmental awareness and sustainable practices within work teams",
    icon: Users,
    href: "../level3-module2-section6-6-5",
  },
];

const Level3Module2Section6 = () => {
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
            Section 6: Sustainable Working Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Environmentally responsible working methods and waste management practices
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

export default Level3Module2Section6;