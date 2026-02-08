import { ArrowLeft, Layout, Cable, Link2, Box, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule3Section3 = () => {
  useSEO(
    "Control Panels and Wiring Systems - MOET Module 3",
    "Panel design, cable selection, terminations, containment and labelling"
  );

  const subsections = [
    {
      number: "3.3.1",
      title: "Layout and Design of Control Panels",
      description: "Control panel design principles, layout and component arrangement",
      icon: Layout,
      href: "/study-centre/apprentice/m-o-e-t-module3-section3-1"
    },
    {
      number: "3.3.2", 
      title: "Cable Types and Selection",
      description: "Cable specifications, selection criteria and application guidelines",
      icon: Cable,
      href: "/study-centre/apprentice/m-o-e-t-module3-section3-2"
    },
    {
      number: "3.3.3",
      title: "Terminations and Connectors", 
      description: "Termination techniques, connector types and installation methods",
      icon: Link2,
      href: "/study-centre/apprentice/m-o-e-t-module3-section3-3"
    },
    {
      number: "3.3.4",
      title: "Trunking, Conduits and Cable Management",
      description: "Cable containment systems, routing and management practices",
      icon: Box,
      href: "/study-centre/apprentice/m-o-e-t-module3-section3-4"
    },
    {
      number: "3.3.5",
      title: "Labelling and Identification Standards",
      description: "Identification systems, labelling standards and documentation",
      icon: Tag,
      href: "/study-centre/apprentice/m-o-e-t-module3-section3-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            3.3 Control Panels and Wiring Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Panel design, cable selection, terminations, containment and labelling.
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

export default MOETModule3Section3;