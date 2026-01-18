import { ArrowLeft, Droplets, Calculator, BarChart, Settings, Zap, AlertTriangle, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section2 = () => {
  useSEO(
    "Fluid Mechanics and Hydraulics - HNC Module 2",
    "Fluid pressure, flow, pumps, fans and pipe sizing methods"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Principles of fluid pressure and flow",
      description: "Fundamental fluid mechanics principles and flow behaviour",
      icon: Droplets,
      href: "../h-n-c-module2-section2-2-1"
    },
    {
      number: "Subsection 2", 
      title: "Bernoulli's equation and applications in services",
      description: "Energy conservation in fluid flow systems",
      icon: Calculator,
      href: "../h-n-c-module2-section2-2-2"
    },
    {
      number: "Subsection 3",
      title: "Flow rates and pressure drop calculations", 
      description: "System pressure losses and flow rate determination",
      icon: BarChart,
      href: "../h-n-c-module2-section2-2-3"
    },
    {
      number: "Subsection 4",
      title: "Pipe sizing methods and fittings allowances",
      description: "Pipe selection and fitting pressure loss calculations",
      icon: Settings,
      href: "../h-n-c-module2-section2-2-4"
    },
    {
      number: "Subsection 5",
      title: "Pump and fan performance curves",
      description: "Equipment selection using performance characteristics",
      icon: Zap,
      href: "../h-n-c-module2-section2-2-5"
    },
    {
      number: "Subsection 6",
      title: "Cavitation and efficiency in pumps/fans",
      description: "Equipment efficiency and cavitation prevention",
      icon: AlertTriangle,
      href: "../h-n-c-module2-section2-2-6"
    },
    {
      number: "Subsection 7",
      title: "Applications in water distribution and duct systems",
      description: "Practical applications in building services systems",
      icon: Network,
      href: "../h-n-c-module2-section2-2-7"
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
            2.2 Fluid Mechanics and Hydraulics
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Fluid pressure, flow, pumps, fans and pipe sizing methods in building services.
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

export default HNCModule2Section2;