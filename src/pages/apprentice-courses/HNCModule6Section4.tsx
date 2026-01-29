import { ArrowLeft, TrendingDown, Building2, Target, BarChart3, Leaf, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule6Section4 = () => {
  useSEO(
    "Carbon Reduction Strategies - HNC Module 6 Section 4 | Sustainability",
    "Master carbon reduction: carbon hierarchy, operational vs embodied carbon, offsetting, science-based targets and net-zero pathways for buildings."
  );

  const subsections = [
    {
      number: "4.1",
      title: "Carbon Fundamentals",
      description: "Carbon accounting, scopes 1-3, emission factors, carbon intensity and greenhouse gas protocols",
      icon: TrendingDown,
      href: "../h-n-c-module6-section4-1"
    },
    {
      number: "4.2",
      title: "Operational Carbon",
      description: "Energy-related emissions, regulated vs unregulated loads, benchmarking and reduction strategies",
      icon: Building2,
      href: "../h-n-c-module6-section4-2"
    },
    {
      number: "4.3",
      title: "Embodied Carbon",
      description: "Whole life carbon, material selection, product stage emissions, construction impacts and end of life",
      icon: Target,
      href: "../h-n-c-module6-section4-3"
    },
    {
      number: "4.4",
      title: "Science-Based Targets",
      description: "SBTi framework, 1.5°C alignment, target setting, progress tracking and reporting requirements",
      icon: BarChart3,
      href: "../h-n-c-module6-section4-4"
    },
    {
      number: "4.5",
      title: "Carbon Offsetting",
      description: "Offset types, quality standards, additionality, permanence and the role of offsetting in net-zero",
      icon: Leaf,
      href: "../h-n-c-module6-section4-5"
    },
    {
      number: "4.6",
      title: "Net-Zero Pathways",
      description: "Carbon hierarchy, reduction roadmaps, technology options, timeline planning and verification",
      icon: Route,
      href: "../h-n-c-module6-section4-6"
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
          Section 4: Carbon Reduction Strategies
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Develop carbon reduction strategies and net-zero pathways for building services engineering
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers carbon accounting, reduction strategies and the pathway to net-zero for buildings. You'll learn about operational and embodied carbon, science-based targets, offsetting and how to develop effective carbon reduction roadmaps for building services projects.
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

export default HNCModule6Section4;
