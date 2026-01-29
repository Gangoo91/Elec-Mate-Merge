import { ArrowLeft, Droplets, Waves, Gauge, PipetteIcon, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section2 = () => {
  useSEO(
    "Fluid Mechanics and Hydraulics - HNC Module 2 Section 2 | Building Services Engineering",
    "Master fluid mechanics: properties, flow characteristics, Bernoulli's equation, pipe sizing, pump curves and system operating points for building services."
  );

  const subsections = [
    {
      number: "2.1",
      title: "Fluid Properties and Pressure",
      description: "Density, viscosity, pressure types, Pascal's law",
      icon: Droplets,
      href: "../h-n-c-module2-section2-1"
    },
    {
      number: "2.2",
      title: "Flow Characteristics",
      description: "Laminar and turbulent flow, Reynolds number, flow patterns",
      icon: Waves,
      href: "../h-n-c-module2-section2-2"
    },
    {
      number: "2.3",
      title: "Bernoulli's Equation",
      description: "Energy conservation, pressure-velocity relationship, applications",
      icon: Gauge,
      href: "../h-n-c-module2-section2-3"
    },
    {
      number: "2.4",
      title: "Pipe Sizing and Pressure Drop",
      description: "Darcy-Weisbach equation, friction factors, fitting losses",
      icon: PipetteIcon,
      href: "../h-n-c-module2-section2-4"
    },
    {
      number: "2.5",
      title: "Pump Characteristics",
      description: "Pump curves, types, efficiency, NPSH requirements",
      icon: Activity,
      href: "../h-n-c-module2-section2-5"
    },
    {
      number: "2.6",
      title: "System Curves and Operating Points",
      description: "System resistance, pump selection, parallel/series operation",
      icon: TrendingUp,
      href: "../h-n-c-module2-section2-6"
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
          Section 2: Fluid Mechanics and Hydraulics
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Apply fluid mechanics principles to the design and analysis of pipework systems and pump selection
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the fundamental principles of fluid behaviour, pressure drop calculations using Darcy-Weisbach, and the matching of pump characteristics to system curves - essential skills for designing heating, chilled water and domestic water systems.
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

export default HNCModule2Section2;
