import { ArrowLeft, Thermometer, Droplets, Wind, Lightbulb, Building, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2 = () => {
  useSEO(
    "Module 2: Building Services Science - HNC Course",
    "Heat transfer, fluid mechanics, psychrometrics, lighting, acoustics and environmental physics"
  );

  const sections = [
    {
      number: "Section 1",
      title: "Heat Transfer Principles",
      description: "Conduction, convection, radiation, thermal properties and comfort conditions",
      icon: Thermometer,
      href: "../h-n-c-module2-section1"
    },
    {
      number: "Section 2", 
      title: "Fluid Mechanics and Hydraulics",
      description: "Fluid pressure, flow, pumps, fans and pipe sizing methods",
      icon: Droplets,
      href: "../h-n-c-module2-section2"
    },
    {
      number: "Section 3",
      title: "Psychrometrics and Air Properties", 
      description: "Moist air properties, psychrometric charts and HVAC processes",
      icon: Wind,
      href: "../h-n-c-module2-section3"
    },
    {
      number: "Section 4",
      title: "Lighting and Acoustics Fundamentals",
      description: "Illumination, sound transmission and building performance standards",
      icon: Lightbulb,
      href: "../h-n-c-module2-section4"
    },
    {
      number: "Section 5",
      title: "Environmental Physics in Buildings",
      description: "Heat gains, solar radiation, thermal mass and air infiltration",
      icon: Building,
      href: "../h-n-c-module2-section5"
    },
    {
      number: "Section 6",
      title: "Applied Building Services Science",
      description: "Load estimation, energy analysis and modelling tools",
      icon: Cog,
      href: "../h-n-c-module2-section6"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../hnc">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to HNC Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 2: Building Services Science
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Heat transfer, fluid mechanics, psychrometrics, lighting, acoustics and environmental physics in building services applications.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HNCModule2;