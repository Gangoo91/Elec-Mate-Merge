import { ArrowLeft, Wind, Droplets, BarChart3, Thermometer, Snowflake, Fan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section3 = () => {
  useSEO(
    "Psychrometrics and Air Properties - HNC Module 2 Section 3 | Building Services Engineering",
    "Master psychrometrics: air composition, humidity, psychrometric charts, air conditioning processes and HVAC system applications for building services."
  );

  const subsections = [
    {
      number: "3.1",
      title: "Air Composition and Properties",
      description: "Dry air, water vapour, gas laws, density",
      icon: Wind,
      href: "../h-n-c-module2-section3-1"
    },
    {
      number: "3.2",
      title: "Humidity and Moisture Content",
      description: "Relative humidity, specific humidity, dew point",
      icon: Droplets,
      href: "../h-n-c-module2-section3-2"
    },
    {
      number: "3.3",
      title: "Psychrometric Charts",
      description: "Chart construction, property relationships, reading charts",
      icon: BarChart3,
      href: "../h-n-c-module2-section3-3"
    },
    {
      number: "3.4",
      title: "Air Conditioning Processes",
      description: "Heating, cooling, humidification, dehumidification",
      icon: Thermometer,
      href: "../h-n-c-module2-section3-4"
    },
    {
      number: "3.5",
      title: "Cooling and Heating Coils",
      description: "Sensible and latent loads, coil selection, ADP",
      icon: Snowflake,
      href: "../h-n-c-module2-section3-5"
    },
    {
      number: "3.6",
      title: "HVAC System Applications",
      description: "AHU processes, mixed air, economiser cycles",
      icon: Fan,
      href: "../h-n-c-module2-section3-6"
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
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 3: Psychrometrics and Air Properties
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understand the properties of moist air and apply psychrometric analysis to HVAC system design
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the thermodynamic properties of air-water vapour mixtures, the use of psychrometric charts, and the analysis of air conditioning processes - fundamental knowledge for designing and commissioning HVAC systems.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsections.map((subsection) => (
            <ModuleCard
              key={subsection.number}
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
