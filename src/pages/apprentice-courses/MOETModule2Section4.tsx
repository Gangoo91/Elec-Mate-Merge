import { ArrowLeft, Zap, Shield, AlertTriangle, Activity, Link2, Bolt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule2Section4 = () => {
  useSEO(
    "Circuit Protection and Earthing - MOET Module 2",
    "Fuses, breakers, RCDs, earthing systems, bonding and surge protection"
  );

  const subsections = [
    {
      number: "2.4.1",
      title: "Fuses and Circuit Breakers",
      description: "Overcurrent protection devices, selection and operation",
      icon: Zap,
      href: "../m-o-e-t-module2-section4-4-1"
    },
    {
      number: "2.4.2", 
      title: "RCDs and RCBOs",
      description: "Residual current devices and combined protection units",
      icon: Shield,
      href: "../m-o-e-t-module2-section4-4-2"
    },
    {
      number: "2.4.3",
      title: "Overcurrent and Short-Circuit Protection", 
      description: "Protection coordination and fault current calculations",
      icon: AlertTriangle,
      href: "../m-o-e-t-module2-section4-4-3"
    },
    {
      number: "2.4.4",
      title: "Earthing Systems (TN, TT, IT)",
      description: "Types of earthing arrangements and their applications",
      icon: Activity,
      href: "../m-o-e-t-module2-section4-4-4"
    },
    {
      number: "2.4.5",
      title: "Bonding Requirements",
      description: "Equipotential bonding principles and implementation",
      icon: Link2,
      href: "../m-o-e-t-module2-section4-4-5"
    },
    {
      number: "2.4.6",
      title: "Surge Protection Devices",
      description: "Lightning and surge protection systems",
      icon: Bolt,
      href: "../m-o-e-t-module2-section4-4-6"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module2">
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
            2.4 Circuit Protection and Earthing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Fuses, breakers, RCDs, earthing systems, bonding and surge protection.
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

export default MOETModule2Section4;