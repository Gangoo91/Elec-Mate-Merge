import { ArrowLeft, RotateCcw, Zap, Activity, Shield, Gauge, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule8Section4 = () => {
  useSEO(
    "Motor Control - HNC Module 8 Section 4 | HVAC Systems",
    "Master motor control: DOL and star-delta starters, VSDs, soft starters, motor protection and energy-efficient drives for HVAC applications."
  );

  const subsections = [
    {
      number: "4.1",
      title: "Motor Fundamentals",
      description: "Induction motors, motor characteristics, efficiency classes, IE ratings and selection criteria",
      icon: RotateCcw,
      href: "../h-n-c-module8-section4-1"
    },
    {
      number: "4.2",
      title: "Starting Methods",
      description: "DOL, star-delta, autotransformer, soft starters and starting current considerations",
      icon: Zap,
      href: "../h-n-c-module8-section4-2"
    },
    {
      number: "4.3",
      title: "Variable Speed Drives",
      description: "VSD principles, PWM technology, V/f control, energy savings and harmonic considerations",
      icon: Activity,
      href: "../h-n-c-module8-section4-3"
    },
    {
      number: "4.4",
      title: "Motor Protection",
      description: "Overload protection, phase failure, earth fault protection and motor protection relays",
      icon: Shield,
      href: "../h-n-c-module8-section4-4"
    },
    {
      number: "4.5",
      title: "Energy Efficiency",
      description: "Affinity laws, pump and fan control, energy savings calculations and payback analysis",
      icon: Gauge,
      href: "../h-n-c-module8-section4-5"
    },
    {
      number: "4.6",
      title: "Installation and Commissioning",
      description: "Cable requirements, EMC considerations, drive setup, commissioning and fault finding",
      icon: Settings,
      href: "../h-n-c-module8-section4-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 4: Motor Control
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design motor control systems for efficient operation of HVAC plant and equipment
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers motor control systems used in HVAC applications. You'll learn about motor fundamentals, starting methods, variable speed drives, motor protection and the energy efficiency benefits of modern motor control in building services.
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

export default HNCModule8Section4;
