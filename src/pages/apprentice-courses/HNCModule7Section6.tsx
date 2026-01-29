import { ArrowLeft, LayoutGrid, Shield, Grip, CircleDot, PlayCircle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule7Section6 = () => {
  useSEO(
    "System Integration - HNC Module 7 Section 6 | Power Systems",
    "Master system integration: distribution board design, circuit protection coordination, earthing systems and commissioning requirements for commercial installations."
  );

  const subsections = [
    {
      number: "6.1",
      title: "Distribution Board Design",
      description: "Board layouts, circuit groupings, labelling, IP ratings and installation considerations",
      icon: LayoutGrid,
      href: "../h-n-c-module7-section6-1"
    },
    {
      number: "6.2",
      title: "Circuit Protection",
      description: "Device selection, breaking capacity, let-through energy, selectivity and RCD coordination",
      icon: Shield,
      href: "../h-n-c-module7-section6-2"
    },
    {
      number: "6.3",
      title: "Earthing Systems",
      description: "TN-S, TN-C-S, TT systems, main earthing terminal, protective conductors and equipotential bonding",
      icon: Grip,
      href: "../h-n-c-module7-section6-3"
    },
    {
      number: "6.4",
      title: "Coordination Studies",
      description: "Short-circuit calculations, protective device coordination, software tools and documentation",
      icon: CircleDot,
      href: "../h-n-c-module7-section6-4"
    },
    {
      number: "6.5",
      title: "Commissioning Procedures",
      description: "Pre-commissioning checks, initial verification, functional testing and handover documentation",
      icon: PlayCircle,
      href: "../h-n-c-module7-section6-5"
    },
    {
      number: "6.6",
      title: "Documentation Requirements",
      description: "Single line diagrams, schedules, test certificates, O&M manuals and as-built drawings",
      icon: FileCheck,
      href: "../h-n-c-module7-section6-6"
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
          Section 6: System Integration
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Integrate power and lighting systems into complete, compliant electrical installations
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers how power and lighting systems are integrated into complete electrical installations. You'll learn about distribution board design, circuit protection coordination, earthing systems, commissioning procedures and the documentation required for project handover.
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

export default HNCModule7Section6;
