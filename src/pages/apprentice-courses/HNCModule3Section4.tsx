import { ArrowLeft, Star, Triangle, Scale, Calculator, Cable, Shield, Radio, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section4 = () => {
  useSEO(
    "Three-Phase Systems and Distribution - HNC Module 3 Section 4",
    "Understanding three-phase electrical systems, load calculations, distribution methods and power quality in building services"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Star and delta configurations",
      description: "Three-phase connection methods and their electrical characteristics",
      icon: Star,
      href: "../h-n-c-module3-section4-4-1"
    },
    {
      number: "Subsection 2",
      title: "Line and phase voltage/current relationships",
      description: "Mathematical relationships between line and phase quantities in three-phase systems",
      icon: Triangle,
      href: "../h-n-c-module3-section4-4-2"
    },
    {
      number: "Subsection 3",
      title: "Balanced and unbalanced loads",
      description: "Analysis of symmetrical and asymmetrical loading conditions in three-phase systems",
      icon: Scale,
      href: "../h-n-c-module3-section4-4-3"
    },
    {
      number: "Subsection 4",
      title: "Calculations of three-phase power (kW, kVA, PF)",
      description: "Power calculations and measurement techniques for three-phase electrical systems",
      icon: Calculator,
      href: "../h-n-c-module3-section4-4-4"
    },
    {
      number: "Subsection 5",
      title: "Cable sizing and voltage drop in three-phase systems",
      description: "Design considerations for three-phase cable selection and voltage regulation",
      icon: Cable,
      href: "../h-n-c-module3-section4-4-5"
    },
    {
      number: "Subsection 6",
      title: "Earthing and protective devices in distribution",
      description: "Safety systems and protection coordination in three-phase distribution networks",
      icon: Shield,
      href: "../h-n-c-module3-section4-4-6"
    },
    {
      number: "Subsection 7",
      title: "Harmonics and power quality issues",
      description: "Power quality problems and mitigation techniques in three-phase installations",
      icon: Radio,
      href: "../h-n-c-module3-section4-4-7"
    },
    {
      number: "Subsection 8",
      title: "Applications in building distribution boards",
      description: "Practical design and installation of three-phase distribution systems in buildings",
      icon: Building,
      href: "../h-n-c-module3-section4-4-8"
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
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.4 Three-Phase Systems and Distribution
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Master three-phase electrical theory, power calculations and distribution system design for building services
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

export default HNCModule3Section4;