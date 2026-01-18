import { ArrowLeft, Users, Sun, Umbrella, Clock, Wind, Zap, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section5 = () => {
  useSEO(
    "Environmental Physics in Buildings - HNC Module 2",
    "Heat gains, solar radiation, thermal mass and air infiltration"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Internal heat gains (occupants, lighting, equipment)",
      description: "Heat sources within buildings and their impact",
      icon: Users,
      href: "../h-n-c-module2-section5-5-1"
    },
    {
      number: "Subsection 2", 
      title: "External heat gains (solar radiation, infiltration)",
      description: "External heat sources and building envelope performance",
      icon: Sun,
      href: "../h-n-c-module2-section5-5-2"
    },
    {
      number: "Subsection 3",
      title: "Solar gain reduction and shading strategies", 
      description: "Passive solar control and shading design",
      icon: Umbrella,
      href: "../h-n-c-module2-section5-5-3"
    },
    {
      number: "Subsection 4",
      title: "Thermal mass and time-lag in buildings",
      description: "Building thermal response and dynamic effects",
      icon: Clock,
      href: "../h-n-c-module2-section5-5-4"
    },
    {
      number: "Subsection 5",
      title: "Air infiltration and air tightness testing",
      description: "Uncontrolled air leakage and measurement methods",
      icon: Wind,
      href: "../h-n-c-module2-section5-5-5"
    },
    {
      number: "Subsection 6",
      title: "Impact on building energy performance",
      description: "Energy implications of environmental factors",
      icon: Zap,
      href: "../h-n-c-module2-section5-5-6"
    },
    {
      number: "Subsection 7",
      title: "Application in load estimation and design software",
      description: "Using simulation tools for load calculations",
      icon: Monitor,
      href: "../h-n-c-module2-section5-5-7"
    }
  ];

  return (
    <div className="bg-background">
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
            2.5 Environmental Physics in Buildings
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Heat gains, solar radiation, thermal mass and air infiltration in building performance.
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

export default HNCModule2Section5;