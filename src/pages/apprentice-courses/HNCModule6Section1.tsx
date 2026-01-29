import { ArrowLeft, BookOpen, Calculator, Thermometer, Wind, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule6Section1 = () => {
  useSEO(
    "Building Regulations Part L - HNC Module 6 Section 1 | Sustainability",
    "Master Part L compliance: SBEM calculations, notional building method, U-values, air permeability testing and commissioning requirements for building services."
  );

  const subsections = [
    {
      number: "1.1",
      title: "Introduction to Part L",
      description: "Part L structure, 2021 amendments, conservation of fuel and power, compliance routes and building types",
      icon: BookOpen,
      href: "../h-n-c-module6-section1-1"
    },
    {
      number: "1.2",
      title: "SBEM Calculations",
      description: "Simplified Building Energy Model, inputs and outputs, NCM methodology and compliance demonstration",
      icon: Calculator,
      href: "../h-n-c-module6-section1-2"
    },
    {
      number: "1.3",
      title: "Fabric Performance",
      description: "U-value calculations, thermal bridging, limiting fabric parameters and construction specifications",
      icon: Thermometer,
      href: "../h-n-c-module6-section1-3"
    },
    {
      number: "1.4",
      title: "Air Permeability",
      description: "Air tightness testing, design air permeability, testing procedures and achieving targets",
      icon: Wind,
      href: "../h-n-c-module6-section1-4"
    },
    {
      number: "1.5",
      title: "Building Services Compliance",
      description: "Minimum efficiencies, controls requirements, metering, lighting and HVAC system specifications",
      icon: CheckCircle,
      href: "../h-n-c-module6-section1-5"
    },
    {
      number: "1.6",
      title: "Documentation and Handover",
      description: "EPCs, commissioning certificates, building log book, as-built documentation and Part L evidence",
      icon: FileText,
      href: "../h-n-c-module6-section1-6"
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
          Section 1: Building Regulations Part L
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understand Part L requirements for conservation of fuel and power in new and existing buildings
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the Building Regulations Approved Document Part L, which sets energy efficiency requirements for buildings. You'll learn about compliance routes, fabric standards, services requirements and the documentation needed to demonstrate compliance.
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

export default HNCModule6Section1;
