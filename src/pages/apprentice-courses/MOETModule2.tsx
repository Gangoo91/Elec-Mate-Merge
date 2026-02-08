import { ArrowLeft, Zap, Activity, Cog, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule2 = () => {
  useSEO(
    "Module 2: Engineering Principles and Electrical Theory - MOET Course",
    "Fundamental engineering principles, electrical theory and mathematical applications for maintenance engineering"
  );

  const sections = [
    {
      number: "2.1",
      title: "Electrical Fundamentals",
      description: "Voltage, current, resistance, power, Ohm's and Watt's laws, units and symbols",
      icon: Zap,
      href: "/study-centre/apprentice/m-o-e-t-module2-section1"
    },
    {
      number: "2.2", 
      title: "AC/DC Systems and Components",
      description: "DC and AC principles, single/three-phase systems, reactance and power factor",
      icon: Activity,
      href: "/study-centre/apprentice/m-o-e-t-module2-section2"
    },
    {
      number: "2.3",
      title: "Electrical Machines", 
      description: "Transformers, induction motors, synchronous machines and motor starting",
      icon: Cog,
      href: "/study-centre/apprentice/m-o-e-t-module2-section3"
    },
    {
      number: "2.4",
      title: "Circuit Protection and Earthing",
      description: "Fuses, breakers, RCDs, earthing systems, bonding and surge protection",
      icon: Shield,
      href: "/study-centre/apprentice/m-o-e-t-module2-section4"
    },
    {
      number: "2.5",
      title: "Materials, Tools and Test Equipment",
      description: "Conductors, insulation, hand tools, power tools and test equipment",
      icon: Wrench,
      href: "/study-centre/apprentice/m-o-e-t-module2-section5"
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
            Module 2: Engineering Principles and Electrical Theory
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Fundamental engineering principles, electrical theory and mathematical applications for maintenance engineering.
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

export default MOETModule2;