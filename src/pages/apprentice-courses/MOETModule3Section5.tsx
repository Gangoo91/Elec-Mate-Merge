import { ArrowLeft, Shield, Battery, Zap, RefreshCw, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule3Section5 = () => {
  useSEO(
    "Auxiliary Systems (UPS, Batteries, Emergency Supplies) - MOET Module 3",
    "UPS systems, battery technologies, generators and critical load management"
  );

  const subsections = [
    {
      number: "3.5.1",
      title: "Uninterruptible Power Supply (UPS)",
      description: "UPS types, operation principles and system configurations",
      icon: Shield,
      href: "../m-o-e-t-module3-section5-5-1"
    },
    {
      number: "3.5.2", 
      title: "Battery Technologies and Maintenance",
      description: "Battery types, characteristics and maintenance procedures",
      icon: Battery,
      href: "../m-o-e-t-module3-section5-5-2"
    },
    {
      number: "3.5.3",
      title: "Emergency Generators", 
      description: "Generator types, installation and maintenance requirements",
      icon: Zap,
      href: "../m-o-e-t-module3-section5-5-3"
    },
    {
      number: "3.5.4",
      title: "Transfer Switches and Changeover Systems",
      description: "Automatic transfer switches and changeover procedures",
      icon: RefreshCw,
      href: "../m-o-e-t-module3-section5-5-4"
    },
    {
      number: "3.5.5",
      title: "Critical Load Management",
      description: "Load prioritisation and management during emergency conditions",
      icon: BarChart3,
      href: "../m-o-e-t-module3-section5-5-5"
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
            3.5 Auxiliary Systems (UPS, Batteries, Emergency Supplies)
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            UPS systems, battery technologies, generators and critical load management.
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

export default MOETModule3Section5;