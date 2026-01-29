import { ArrowLeft, FileCheck, Sun, Award, Leaf, Gauge, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule6 = () => {
  useSEO(
    "Sustainability & Environmental Engineering - HNC Module 6",
    "Master sustainable building services: Part L compliance, renewable integration, BREEAM assessment and carbon reduction strategies for net-zero buildings"
  );

  const sections = [
    {
      number: "Section 1",
      title: "Building Regulations Part L",
      description: "Part L compliance, SBEM calculations, notional building method, U-values, air permeability and commissioning requirements",
      icon: FileCheck,
      href: "../h-n-c-module6-section1"
    },
    {
      number: "Section 2",
      title: "Renewable Energy Systems",
      description: "Solar PV, heat pumps, biomass, wind power, CHP systems and grid integration for building services applications",
      icon: Sun,
      href: "../h-n-c-module6-section2"
    },
    {
      number: "Section 3",
      title: "BREEAM Assessment",
      description: "BREEAM categories, credit achievement, evidence requirements, pre-assessment and certification process",
      icon: Award,
      href: "../h-n-c-module6-section3"
    },
    {
      number: "Section 4",
      title: "Carbon Reduction Strategies",
      description: "Carbon hierarchy, operational vs embodied carbon, offsetting, science-based targets and net-zero pathways",
      icon: Leaf,
      href: "../h-n-c-module6-section4"
    },
    {
      number: "Section 5",
      title: "Energy Management",
      description: "Energy auditing, metering strategies, monitoring and targeting, ISO 50001 and building energy performance",
      icon: Gauge,
      href: "../h-n-c-module6-section5"
    },
    {
      number: "Section 6",
      title: "Sustainable Design Integration",
      description: "Passive design principles, building fabric first, system optimisation and whole-life carbon assessment",
      icon: Puzzle,
      href: "../h-n-c-module6-section6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../hnc">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to HNC
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Module 6: Sustainability & Environmental Engineering
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Master sustainable design principles, regulatory compliance and carbon reduction strategies for building services engineering in the transition to net-zero
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ModuleCard
              key={section.number}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HNCModule6;
