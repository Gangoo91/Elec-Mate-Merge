import { ArrowLeft, Sun, Flame, Clock, Wind, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section5 = () => {
  useSEO(
    "Environmental Physics in Buildings - HNC Module 2 Section 5 | Building Services Engineering",
    "Master environmental physics: solar radiation, heat gains, thermal mass, air infiltration, thermal comfort and building fabric performance analysis."
  );

  const subsections = [
    {
      number: "5.1",
      title: "Solar Radiation",
      description: "Solar geometry, irradiance, shading, solar gains",
      icon: Sun,
      href: "../h-n-c-module2-section5-1"
    },
    {
      number: "5.2",
      title: "Heat Gains and Losses",
      description: "Internal gains, external gains, steady state, dynamic",
      icon: Flame,
      href: "../h-n-c-module2-section5-2"
    },
    {
      number: "5.3",
      title: "Thermal Mass and Time Lag",
      description: "Admittance, decrement factor, heavyweight vs lightweight",
      icon: Clock,
      href: "../h-n-c-module2-section5-3"
    },
    {
      number: "5.4",
      title: "Air Infiltration and Ventilation",
      description: "Air changes, air tightness, natural ventilation",
      icon: Wind,
      href: "../h-n-c-module2-section5-4"
    },
    {
      number: "5.5",
      title: "Thermal Comfort",
      description: "Fanger's PMV/PPD, CIBSE comfort criteria, adaptive comfort",
      icon: Users,
      href: "../h-n-c-module2-section5-5"
    },
    {
      number: "5.6",
      title: "Building Fabric Performance",
      description: "Condensation analysis, moisture movement, Part L",
      icon: Building,
      href: "../h-n-c-module2-section5-6"
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
          Section 5: Environmental Physics in Buildings
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Analyse the environmental factors that influence building energy performance and occupant comfort
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers solar geometry and gains, internal and external heat sources, thermal mass effects, air movement, and thermal comfort assessment - the physical principles that underpin energy-efficient building design and HVAC system sizing.
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

export default HNCModule2Section5;
