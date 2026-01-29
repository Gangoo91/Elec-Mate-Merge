import { ArrowLeft, Calculator, BarChart3, Cpu, Monitor, Settings, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section6 = () => {
  useSEO(
    "Applied Building Services Science - HNC Module 2 Section 6 | Building Services Engineering",
    "Master applied building science: load estimation, energy analysis, building simulation, design software, system integration and compliance verification."
  );

  const subsections = [
    {
      number: "6.1",
      title: "Load Estimation Methods",
      description: "CIBSE methods, cooling loads, heating loads, diversity",
      icon: Calculator,
      href: "../h-n-c-module2-section6-1"
    },
    {
      number: "6.2",
      title: "Energy Analysis",
      description: "Energy balances, benchmarking, TM54, operational energy",
      icon: BarChart3,
      href: "../h-n-c-module2-section6-2"
    },
    {
      number: "6.3",
      title: "Building Simulation",
      description: "Dynamic simulation, software tools, validation, limitations",
      icon: Cpu,
      href: "../h-n-c-module2-section6-3"
    },
    {
      number: "6.4",
      title: "Design Tools and Software",
      description: "IES, TAS, EnergyPlus, compliance tools",
      icon: Monitor,
      href: "../h-n-c-module2-section6-4"
    },
    {
      number: "6.5",
      title: "System Integration",
      description: "Multi-service coordination, optimisation, commissioning",
      icon: Settings,
      href: "../h-n-c-module2-section6-5"
    },
    {
      number: "6.6",
      title: "Compliance and Verification",
      description: "Part L, BREEAM, NABERS, post-occupancy evaluation",
      icon: FileCheck,
      href: "../h-n-c-module2-section6-6"
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
          Section 6: Applied Building Services Science
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Apply scientific principles using industry-standard tools and methods to design and verify building services performance
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers practical application of building services science using CIBSE load estimation methods, dynamic simulation software, energy analysis techniques, and compliance verification against Part L, BREEAM and other standards.
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

export default HNCModule2Section6;
