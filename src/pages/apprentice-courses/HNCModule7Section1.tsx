import { ArrowLeft, Box, Cable, Calculator, Activity, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule7Section1 = () => {
  useSEO(
    "LV Distribution Design - HNC Module 7 Section 1 | Power Systems",
    "Master LV distribution: switchgear selection, busbar systems, cable sizing, discrimination studies and power quality for commercial electrical installations."
  );

  const subsections = [
    {
      number: "1.1",
      title: "Switchgear Selection",
      description: "LV switchboards, MCCB vs ACB, rated currents, short-circuit ratings and type-tested assemblies",
      icon: Box,
      href: "../h-n-c-module7-section1-1"
    },
    {
      number: "1.2",
      title: "Busbar Systems",
      description: "Busbar trunking, rising mains, tap-off units, ratings and installation requirements",
      icon: Cable,
      href: "../h-n-c-module7-section1-2"
    },
    {
      number: "1.3",
      title: "Cable Sizing Calculations",
      description: "Current-carrying capacity, voltage drop, grouping factors, thermal constraints and BS 7671 methods",
      icon: Calculator,
      href: "../h-n-c-module7-section1-3"
    },
    {
      number: "1.4",
      title: "Discrimination Studies",
      description: "Time-current curves, discrimination margins, cascading, backup protection and coordination software",
      icon: Activity,
      href: "../h-n-c-module7-section1-4"
    },
    {
      number: "1.5",
      title: "Power Quality",
      description: "Harmonics, voltage dip/swell, flicker, power factor and mitigation measures",
      icon: Shield,
      href: "../h-n-c-module7-section1-5"
    },
    {
      number: "1.6",
      title: "Load Assessment",
      description: "Maximum demand, diversity factors, future expansion, load growth and supply capacity",
      icon: Zap,
      href: "../h-n-c-module7-section1-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 1: LV Distribution Design
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design low voltage distribution systems for commercial and industrial installations
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the design of LV distribution systems, from incoming supply through switchgear, busbars and cables to final circuits. You'll learn about equipment selection, cable sizing, discrimination studies and power quality management for commercial electrical installations.
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

export default HNCModule7Section1;
