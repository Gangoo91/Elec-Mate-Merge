import { ArrowLeft, Sun, Wind, Battery, Zap, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule3Section6 = () => {
  useSEO(
    "Emerging Technologies (Renewables, Smart Systems) - MOET Module 3",
    "Solar PV, renewables, energy storage, smart grids and EV charging"
  );

  const subsections = [
    {
      number: "3.6.1",
      title: "Solar PV Integration",
      description: "Solar photovoltaic systems, installation and grid connection",
      icon: Sun,
      href: "/study-centre/apprentice/m-o-e-t-module3-section6-1"
    },
    {
      number: "3.6.2", 
      title: "Wind and Other Renewables (overview)",
      description: "Wind power, hydro and other renewable energy technologies",
      icon: Wind,
      href: "/study-centre/apprentice/m-o-e-t-module3-section6-2"
    },
    {
      number: "3.6.3",
      title: "Energy Storage Systems", 
      description: "Battery storage, grid-scale storage and integration methods",
      icon: Battery,
      href: "/study-centre/apprentice/m-o-e-t-module3-section6-3"
    },
    {
      number: "3.6.4",
      title: "Smart Grids and Smart Meters",
      description: "Smart grid technology, smart metering and demand management",
      icon: Zap,
      href: "/study-centre/apprentice/m-o-e-t-module3-section6-4"
    },
    {
      number: "3.6.5",
      title: "Electric Vehicle Charging Infrastructure",
      description: "EV charging systems, installation and grid integration",
      icon: Car,
      href: "/study-centre/apprentice/m-o-e-t-module3-section6-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3">
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
            3.6 Emerging Technologies (Renewables, Smart Systems)
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Solar PV, renewables, energy storage, smart grids and EV charging.
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

export default MOETModule3Section6;