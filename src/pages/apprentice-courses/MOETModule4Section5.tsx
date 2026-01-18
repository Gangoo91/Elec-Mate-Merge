import { ArrowLeft, Eye, Zap, Shield, RotateCcw, TestTube, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule4Section5 = () => {
  useSEO(
    "Section 4.5: Testing and Inspection - MOET Module 4",
    "Visual inspections, continuity, insulation resistance, earth fault testing and functional testing"
  );

  const subsections = [
    {
      number: "4.5.1",
      title: "Visual Inspections",
      description: "Systematic visual inspection procedures and safety checks",
      icon: Eye,
      href: "../m-o-e-t-module4-section5-1"
    },
    {
      number: "4.5.2",
      title: "Continuity and Polarity Testing",
      description: "Testing electrical continuity and verifying correct polarity",
      icon: Zap,
      href: "../m-o-e-t-module4-section5-2"
    },
    {
      number: "4.5.3",
      title: "Insulation Resistance",
      description: "Measuring and evaluating insulation resistance values",
      icon: Shield,
      href: "../m-o-e-t-module4-section5-3"
    },
    {
      number: "4.5.4",
      title: "Earth Fault Loop Impedance",
      description: "Testing earth fault loop impedance and protective conductor integrity",
      icon: RotateCcw,
      href: "../m-o-e-t-module4-section5-4"
    },
    {
      number: "4.5.5",
      title: "RCD Testing",
      description: "Testing residual current devices and protective systems",
      icon: TestTube,
      href: "../m-o-e-t-module4-section5-5"
    },
    {
      number: "4.5.6",
      title: "Functional Testing of Equipment",
      description: "Operational testing and performance verification procedures",
      icon: Settings,
      href: "../m-o-e-t-module4-section5-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 4.5: Testing and Inspection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Visual inspections, continuity, insulation resistance, earth fault testing and functional testing.
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

export default MOETModule4Section5;