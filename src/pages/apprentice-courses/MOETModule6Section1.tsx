import { ArrowLeft, PenTool, Zap, Wrench, Ruler, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule6Section1 = () => {
  useSEO(
    "Section 6.1: Reading and Producing Technical Drawings - MOET Module 6",
    "Engineering conventions, electrical schematics, mechanical drawings and revision control"
  );

  const subsections = [
    {
      number: "6.1.1",
      title: "Engineering Drawing Conventions",
      description: "Standard conventions, line types, projection methods and drawing layouts",
      icon: PenTool,
      href: "../m-o-e-t-module6-section1-1"
    },
    {
      number: "6.1.2",
      title: "Legal and Safety Reasons (EAWR, BS 7671 Principles)",
      description: "Legal requirements under EAWR 1989, BS 7671 compliance, personal responsibility and consequences of non-compliance",
      icon: Zap,
      href: "../m-o-e-t-module6-section1-2"
    },
    {
      number: "6.1.3",
      title: "Mechanical Drawings (for context)",
      description: "Understanding mechanical drawings and their relationship to electrical systems",
      icon: Wrench,
      href: "../m-o-e-t-module6-section1-3"
    },
    {
      number: "6.1.4",
      title: "Tolerances and Dimensions",
      description: "Dimensional tolerancing, geometric tolerances and measurement standards",
      icon: Ruler,
      href: "../m-o-e-t-module6-section1-4"
    },
    {
      number: "6.1.5",
      title: "Revision Control of Drawings",
      description: "Version control, change management and drawing approval processes",
      icon: GitBranch,
      href: "../m-o-e-t-module6-section1-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 6.1: Reading and Producing Technical Drawings
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Engineering conventions, electrical schematics, mechanical drawings and revision control.
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

export default MOETModule6Section1;