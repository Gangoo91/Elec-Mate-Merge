import { ArrowLeft, Home, Layers, Workflow, Calculator, RefreshCcw, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule6Section6 = () => {
  useSEO(
    "Sustainable Design Integration - HNC Module 6 Section 6 | Sustainability",
    "Master sustainable design: passive principles, fabric first approach, system optimisation, whole-life carbon assessment and integrated design strategies."
  );

  const subsections = [
    {
      number: "6.1",
      title: "Passive Design Principles",
      description: "Solar orientation, natural ventilation, daylighting, thermal mass and passive cooling strategies",
      icon: Home,
      href: "../h-n-c-module6-section6-1"
    },
    {
      number: "6.2",
      title: "Fabric First Approach",
      description: "Building envelope optimisation, insulation strategies, thermal bridging reduction and airtightness",
      icon: Layers,
      href: "../h-n-c-module6-section6-2"
    },
    {
      number: "6.3",
      title: "Integrated Design Process",
      description: "Multi-disciplinary collaboration, early engagement, design workshops and value engineering",
      icon: Workflow,
      href: "../h-n-c-module6-section6-3"
    },
    {
      number: "6.4",
      title: "Whole Life Carbon Assessment",
      description: "RICS methodology, life cycle stages, data sources, benchmarking and reduction strategies",
      icon: Calculator,
      href: "../h-n-c-module6-section6-4"
    },
    {
      number: "6.5",
      title: "Circular Economy Principles",
      description: "Design for disassembly, material passports, reuse strategies and waste elimination",
      icon: RefreshCcw,
      href: "../h-n-c-module6-section6-5"
    },
    {
      number: "6.6",
      title: "Post-Occupancy Evaluation",
      description: "Performance monitoring, user satisfaction, lessons learned and continuous improvement",
      icon: CheckSquare,
      href: "../h-n-c-module6-section6-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 6: Sustainable Design Integration
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Integrate sustainable design principles throughout the building services engineering process
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers how sustainable design principles are integrated into building services engineering from concept through to operation. You'll learn about passive design, fabric first approach, whole life carbon assessment and how to deliver truly sustainable building services solutions.
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

export default HNCModule6Section6;
