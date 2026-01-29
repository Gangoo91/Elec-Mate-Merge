import { ArrowLeft, Scale, Zap, HardHat, Beaker, Wrench, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule1Section1 = () => {
  useSEO(
    "Legislation and Standards - HNC Module 1 Section 1 | Building Services Engineering",
    "Master UK health and safety legislation for building services: HASAWA 1974, EAWR 1989, CDM 2015, COSHH, PUWER, and environmental regulations."
  );

  const subsections = [
    {
      number: "1.1",
      title: "Health and Safety at Work Act 1974",
      description: "Duties of employers, employees, self-employed, enforcement and the role of the HSE",
      icon: Scale,
      href: "../h-n-c-module1-section1-1"
    },
    {
      number: "1.2",
      title: "Electricity at Work Regulations 1989",
      description: "Duties, competence requirements, safe systems, equipment standards and work activities",
      icon: Zap,
      href: "../h-n-c-module1-section1-2"
    },
    {
      number: "1.3",
      title: "CDM Regulations 2015",
      description: "Duty holders, principal designer, principal contractor responsibilities and F10 notification",
      icon: HardHat,
      href: "../h-n-c-module1-section1-3"
    },
    {
      number: "1.4",
      title: "COSHH and Hazardous Substances",
      description: "Assessment, control measures, monitoring requirements and health surveillance procedures",
      icon: Beaker,
      href: "../h-n-c-module1-section1-4"
    },
    {
      number: "1.5",
      title: "PUWER and Work Equipment",
      description: "Selection, maintenance, training requirements and inspection regimes for work equipment",
      icon: Wrench,
      href: "../h-n-c-module1-section1-5"
    },
    {
      number: "1.6",
      title: "Environmental and Building Regulations",
      description: "Environmental legislation, Part P requirements, building control procedures and compliance",
      icon: Building,
      href: "../h-n-c-module1-section1-6"
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
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 1: Legislation and Standards
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understand the legal framework governing health, safety and welfare in the building services engineering industry
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the essential UK legislation that building services engineers must understand and comply with - from the overarching Health and Safety at Work Act to specific regulations governing electrical work, construction projects, hazardous substances, and work equipment.
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

export default HNCModule1Section1;
