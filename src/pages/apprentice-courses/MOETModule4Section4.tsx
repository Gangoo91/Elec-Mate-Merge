import { ArrowLeft, Shield, Wrench, Cable, Package, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule4Section4 = () => {
  useSEO(
    "Section 4.4: Repair and Replacement Procedures - MOET Module 4",
    "Safe isolation, component replacement, cable jointing, spare parts and recommissioning"
  );

  const subsections = [
    {
      number: "4.4.1",
      title: "Safe Isolation and Verification",
      description: "Proper isolation procedures and verification of safe working conditions",
      icon: Shield,
      href: "/study-centre/apprentice/m-o-e-t-module4-section4-1"
    },
    {
      number: "4.4.2",
      title: "Component Removal and Replacement",
      description: "Techniques for safely removing and replacing electrical components",
      icon: Wrench,
      href: "/study-centre/apprentice/m-o-e-t-module4-section4-2"
    },
    {
      number: "4.4.3",
      title: "Cable Jointing and Termination",
      description: "Proper cable jointing techniques and termination procedures",
      icon: Cable,
      href: "/study-centre/apprentice/m-o-e-t-module4-section4-3"
    },
    {
      number: "4.4.4",
      title: "Use of Approved Spare Parts",
      description: "Selection and use of appropriate spare parts and materials",
      icon: Package,
      href: "/study-centre/apprentice/m-o-e-t-module4-section4-4"
    },
    {
      number: "4.4.5",
      title: "Recommissioning Procedures",
      description: "Testing and commissioning procedures after repair work",
      icon: Power,
      href: "/study-centre/apprentice/m-o-e-t-module4-section4-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 4.4: Repair and Replacement Procedures
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Safe isolation, component replacement, cable jointing, spare parts and recommissioning.
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

export default MOETModule4Section4;