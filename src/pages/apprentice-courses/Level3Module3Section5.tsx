import { ArrowLeft, Calculator, TrendingDown, Zap, Leaf } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "5.1",
    title: "Power Equations",
    description: "Understanding P = VI, P = I²R, P = V²/R and their practical applications",
    icon: Calculator,
    href: "../level3-module3-section5-5-1",
  },
  {
    number: "5.2", 
    title: "Efficiency and Losses",
    description: "Calculating efficiency in electrical circuits and understanding different types of losses",
    icon: TrendingDown,
    href: "../level3-module3-section5-5-2",
  },
  {
    number: "5.3",
    title: "Energy Consumption and kWh",
    description: "Energy calculations, kilowatt-hours and practical energy consumption analysis",
    icon: Zap,
    href: "../level3-module3-section5-5-3",
  },
  {
    number: "5.4",
    title: "Energy Efficiency in Installations",
    description: "Improving energy efficiency in electrical installations and sustainable practices",
    icon: Leaf,
    href: "../level3-module3-section5-5-4",
  },
];

const Level3Module3Section5 = () => {
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
            Section 5 - Electrical Power and Energy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Learn power calculations, efficiency analysis and energy consumption principles for electrical installations
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

export default Level3Module3Section5;