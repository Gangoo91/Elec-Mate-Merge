import { ArrowLeft, Zap, Cog, Settings, Lightbulb, Battery, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule3 = () => {
  useSEO(
    "Module 3: Electrical Plant, Equipment and Systems - MOET Course",
    "Understanding electrical plant, equipment specifications, system operations and maintenance requirements"
  );

  const sections = [
    {
      number: "3.1",
      title: "Switchgear and Distribution Systems",
      description: "LV/HV switchgear, distribution boards, busbars, isolation and protection coordination",
      icon: Zap,
      href: "/study-centre/apprentice/m-o-e-t-module3-section1"
    },
    {
      number: "3.2", 
      title: "Motors, Drives and Starters",
      description: "Motor operation, DOL/star-delta starters, VSDs and motor maintenance",
      icon: Cog,
      href: "/study-centre/apprentice/m-o-e-t-module3-section2"
    },
    {
      number: "3.3",
      title: "Control Panels and Wiring Systems", 
      description: "Panel design, cable selection, terminations, containment and labelling",
      icon: Settings,
      href: "/study-centre/apprentice/m-o-e-t-module3-section3"
    },
    {
      number: "3.4",
      title: "Lighting and Power Installations",
      description: "General lighting, emergency systems, socket circuits and energy efficiency",
      icon: Lightbulb,
      href: "/study-centre/apprentice/m-o-e-t-module3-section4"
    },
    {
      number: "3.5",
      title: "Auxiliary Systems (UPS, Batteries, Emergency Supplies)",
      description: "UPS systems, battery technologies, generators and critical load management",
      icon: Battery,
      href: "/study-centre/apprentice/m-o-e-t-module3-section5"
    },
    {
      number: "3.6",
      title: "Emerging Technologies (Renewables, Smart Systems)",
      description: "Solar PV, renewables, energy storage, smart grids and EV charging",
      icon: Leaf,
      href: "/study-centre/apprentice/m-o-e-t-module3-section6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/moet">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to MOET Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 3: Electrical Plant, Equipment and Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Understanding electrical plant, equipment specifications, system operations and maintenance requirements.
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

export default MOETModule3;