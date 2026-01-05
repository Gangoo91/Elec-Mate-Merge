import { ArrowLeft, Cog, Play, RotateCw, Settings, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule3Section2 = () => {
  useSEO(
    "Motors, Drives and Starters - MOET Module 3",
    "Motor operation, DOL/star-delta starters, VSDs and motor maintenance"
  );

  const subsections = [
    {
      number: "3.2.1",
      title: "Motor Construction and Operation",
      description: "Motor types, construction principles and operating characteristics",
      icon: Cog,
      href: "../m-o-e-t-module3-section2-2-1"
    },
    {
      number: "3.2.2", 
      title: "Direct-On-Line (DOL) Starters",
      description: "DOL starter operation, components and applications",
      icon: Play,
      href: "../m-o-e-t-module3-section2-2-2"
    },
    {
      number: "3.2.3",
      title: "Star/Delta Starters", 
      description: "Star-delta starting principles, wiring and operation",
      icon: RotateCw,
      href: "../m-o-e-t-module3-section2-2-3"
    },
    {
      number: "3.2.4",
      title: "Variable Speed Drives (VSDs) and Soft Starters",
      description: "VSD technology, soft starters and speed control methods",
      icon: Settings,
      href: "../m-o-e-t-module3-section2-2-4"
    },
    {
      number: "3.2.5",
      title: "Motor Maintenance and Testing",
      description: "Preventive maintenance, testing procedures and fault diagnosis",
      icon: Wrench,
      href: "../m-o-e-t-module3-section2-2-5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module3">
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
            3.2 Motors, Drives and Starters
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Motor operation, DOL/star-delta starters, VSDs and motor maintenance.
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

export default MOETModule3Section2;