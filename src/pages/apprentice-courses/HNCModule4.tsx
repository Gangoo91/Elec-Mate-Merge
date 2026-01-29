import { ArrowLeft, Calculator, Cable, Shield, Lightbulb, Zap, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule4 = () => {
  useSEO(
    "Design Principles for Building Services - HNC Module 4",
    "Master electrical design for building services: load assessment, cable sizing, protection systems, lighting design, power distribution and specification documentation"
  );

  const sections = [
    {
      number: "Section 1",
      title: "Electrical Load Assessment",
      description: "Maximum demand calculations, diversity factors, power factor, harmonics, future load allowances and building services load profiles",
      icon: Calculator,
      href: "../h-n-c-module4-section1"
    },
    {
      number: "Section 2",
      title: "Cable Selection and Sizing",
      description: "Current-carrying capacity, voltage drop calculations, thermal constraints, short-circuit withstand and cable installation methods",
      icon: Cable,
      href: "../h-n-c-module4-section2"
    },
    {
      number: "Section 3",
      title: "Protection and Discrimination",
      description: "Circuit protection principles, protective device selection, fault current calculations, discrimination and earth fault protection",
      icon: Shield,
      href: "../h-n-c-module4-section3"
    },
    {
      number: "Section 4",
      title: "Lighting Design",
      description: "Lighting design criteria, interior calculations, emergency lighting, controls, external lighting and energy efficiency",
      icon: Lightbulb,
      href: "../h-n-c-module4-section4"
    },
    {
      number: "Section 5",
      title: "Power Distribution Design",
      description: "LV switchgear selection, distribution boards, busbar systems, UPS and standby power, power quality and metering",
      icon: Zap,
      href: "../h-n-c-module4-section5"
    },
    {
      number: "Section 6",
      title: "Specification and Documentation",
      description: "NBS specifications, electrical drawings, schedules, design calculations, CDM risk registers and BIM digital delivery",
      icon: FileText,
      href: "../h-n-c-module4-section6"
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
          Module 4: Design Principles for Building Services
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Master the principles of electrical system design for building services, from load assessment through to specification and documentation
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

export default HNCModule4;
