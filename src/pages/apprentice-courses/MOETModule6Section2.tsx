import { ArrowLeft, CircuitBoard, Minus, Settings, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule6Section2 = () => {
  useSEO(
    "Section 6.2: Electrical Schematics and Wiring Diagrams - MOET Module 6",
    "Circuit diagrams, single-line diagrams, control circuits and labelling standards"
  );

  const subsections = [
    {
      number: "6.2.1",
      title: "Circuit Diagrams and Symbols",
      description: "Standard electrical symbols, circuit representation and schematic conventions",
      icon: CircuitBoard,
      href: "../m-o-e-t-module6-section2-1"
    },
    {
      number: "6.2.2",
      title: "Single-Line Diagrams",
      description: "Power system representation, SLD conventions and system overviews",
      icon: Minus,
      href: "../m-o-e-t-module6-section2-2"
    },
    {
      number: "6.2.3",
      title: "Control Circuit Wiring Diagrams",
      description: "Control circuit layouts, wiring methods and connection diagrams",
      icon: Settings,
      href: "../m-o-e-t-module6-section2-3"
    },
    {
      number: "6.2.4",
      title: "Labelling and Numbering Standards",
      description: "Component labelling, wire numbering and identification standards",
      icon: Hash,
      href: "../m-o-e-t-module6-section2-4"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
            Section 6.2: Electrical Schematics and Wiring Diagrams
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Circuit diagrams, single-line diagrams, control circuits and labelling standards.
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

export default MOETModule6Section2;