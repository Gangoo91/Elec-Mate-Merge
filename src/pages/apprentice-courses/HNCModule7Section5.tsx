import { ArrowLeft, Lightbulb, Activity, Filter, Gauge, TrendingDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule7Section5 = () => {
  useSEO(
    "Energy Efficient Solutions - HNC Module 7 Section 5 | Power Systems",
    "Master energy efficiency: LED technology, power factor correction, harmonic mitigation, energy metering and demand management for commercial buildings."
  );

  const subsections = [
    {
      number: "5.1",
      title: "LED Technology",
      description: "LED fundamentals, driver types, thermal management, lifetime and specification considerations",
      icon: Lightbulb,
      href: "../h-n-c-module7-section5-1"
    },
    {
      number: "5.2",
      title: "Power Factor Correction",
      description: "Reactive power, capacitor banks, automatic PFC, harmonic filters and installation requirements",
      icon: Activity,
      href: "../h-n-c-module7-section5-2"
    },
    {
      number: "5.3",
      title: "Harmonic Mitigation",
      description: "Harmonic sources, effects, measurement, passive and active filters and design considerations",
      icon: Filter,
      href: "../h-n-c-module7-section5-3"
    },
    {
      number: "5.4",
      title: "Energy Metering",
      description: "Meter types, accuracy classes, CT connections, data communications and sub-metering strategies",
      icon: Gauge,
      href: "../h-n-c-module7-section5-4"
    },
    {
      number: "5.5",
      title: "Demand Management",
      description: "Load shedding, peak shaving, demand response, tariff optimisation and smart grid integration",
      icon: TrendingDown,
      href: "../h-n-c-module7-section5-5"
    },
    {
      number: "5.6",
      title: "Efficiency Retrofits",
      description: "Assessment methodology, business case development, implementation and verification of savings",
      icon: Settings,
      href: "../h-n-c-module7-section5-6"
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
          Section 5: Energy Efficient Solutions
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Implement energy-efficient power and lighting solutions for reduced operating costs
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers technologies and strategies for improving electrical energy efficiency in commercial buildings. You'll learn about LED lighting, power factor correction, harmonic mitigation, energy metering and demand management techniques.
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

export default HNCModule7Section5;
