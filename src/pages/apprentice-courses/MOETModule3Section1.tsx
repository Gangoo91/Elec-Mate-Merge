import { ArrowLeft, Zap, AlertTriangle, CircuitBoard, Cable, Power, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule3Section1 = () => {
  useSEO(
    "Switchgear and Distribution Systems - MOET Module 3",
    "LV/HV switchgear, distribution boards, busbars, isolation and protection coordination"
  );

  const subsections = [
    {
      number: "3.1.1",
      title: "Low Voltage Switchgear (MCBs, MCCBs)",
      description: "LV switchgear types, operation and selection criteria",
      icon: Zap,
      href: "../m-o-e-t-module3-section1-1-1"
    },
    {
      number: "3.1.2", 
      title: "High Voltage Switchgear (overview for awareness)",
      description: "HV switchgear principles and safety considerations",
      icon: AlertTriangle,
      href: "../m-o-e-t-module3-section1-1-2"
    },
    {
      number: "3.1.3",
      title: "Distribution Boards and Consumer Units", 
      description: "Design, installation and maintenance of distribution equipment",
      icon: CircuitBoard,
      href: "../m-o-e-t-module3-section1-1-3"
    },
    {
      number: "3.1.4",
      title: "Busbars and Cabling Systems",
      description: "Busbar systems, cable routing and installation methods",
      icon: Cable,
      href: "../m-o-e-t-module3-section1-1-4"
    },
    {
      number: "3.1.5",
      title: "Isolation and Switching Devices",
      description: "Isolator types, operation and switching procedures",
      icon: Power,
      href: "../m-o-e-t-module3-section1-1-5"
    },
    {
      number: "3.1.6",
      title: "Protection Coordination (discrimination, selectivity)",
      description: "Coordinating protective devices for selective operation",
      icon: Shield,
      href: "../m-o-e-t-module3-section1-1-6"
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
            3.1 Switchgear and Distribution Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            LV/HV switchgear, distribution boards, busbars, isolation and protection coordination.
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

export default MOETModule3Section1;