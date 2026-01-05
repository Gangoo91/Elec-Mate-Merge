import { ArrowLeft, Wind, BarChart3, Snowflake, Calculator, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section3 = () => {
  useSEO(
    "Psychrometrics and Air Properties - HNC Module 2",
    "Moist air properties, psychrometric charts and HVAC processes"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Properties of moist air (dry bulb, wet bulb, dew point, RH)",
      description: "Fundamental air properties and measurement",
      icon: Wind,
      href: "../h-n-c-module2-section3-3-1"
    },
    {
      number: "Subsection 2", 
      title: "Psychrometric charts – interpretation and use",
      description: "Using psychrometric charts for air conditioning calculations",
      icon: BarChart3,
      href: "../h-n-c-module2-section3-3-2"
    },
    {
      number: "Subsection 3",
      title: "Heating, cooling, humidification and dehumidification processes", 
      description: "Air conditioning processes and equipment selection",
      icon: Snowflake,
      href: "../h-n-c-module2-section3-3-3"
    },
    {
      number: "Subsection 4",
      title: "Air density and specific volume calculations",
      description: "Air property calculations for system design",
      icon: Calculator,
      href: "../h-n-c-module2-section3-3-4"
    },
    {
      number: "Subsection 5",
      title: "Ventilation requirements for occupancy",
      description: "Fresh air requirements and indoor air quality standards",
      icon: Users,
      href: "../h-n-c-module2-section3-3-5"
    },
    {
      number: "Subsection 6",
      title: "Applications to air-conditioning and HVAC load calcs",
      description: "Practical applications in HVAC system design",
      icon: Settings,
      href: "../h-n-c-module2-section3-3-6"
    }
  ];

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
            2.3 Psychrometrics and Air Properties
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Moist air properties, psychrometric charts and HVAC processes in building services.
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

export default HNCModule2Section3;