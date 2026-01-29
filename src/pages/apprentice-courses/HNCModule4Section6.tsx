import { ArrowLeft, FileText, PenTool, Table, Calculator, AlertTriangle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule4Section6 = () => {
  useSEO(
    "Specification and Documentation - HNC Module 4 Section 6 | Building Services Design",
    "Master electrical documentation: NBS specifications, drawings, schedules, design calculations, CDM risk registers and BIM digital delivery."
  );

  const subsections = [
    {
      number: "6.1",
      title: "NBS Specifications",
      description: "Clause structure, performance vs prescriptive specifications and coordination with drawings",
      icon: FileText,
      href: "../h-n-c-module4-section6-1"
    },
    {
      number: "6.2",
      title: "Electrical Drawings",
      description: "Single line diagrams, schematics, layout drawings and CAD standards",
      icon: PenTool,
      href: "../h-n-c-module4-section6-2"
    },
    {
      number: "6.3",
      title: "Schedules and Data Sheets",
      description: "Equipment schedules, cable schedules, luminaire schedules and data sheet requirements",
      icon: Table,
      href: "../h-n-c-module4-section6-3"
    },
    {
      number: "6.4",
      title: "Design Calculations",
      description: "Calculation reports, verification methods and design approval processes",
      icon: Calculator,
      href: "../h-n-c-module4-section6-4"
    },
    {
      number: "6.5",
      title: "CDM Design Risk Register",
      description: "Designer duties, hazard identification, residual risk communication and design decisions",
      icon: AlertTriangle,
      href: "../h-n-c-module4-section6-5"
    },
    {
      number: "6.6",
      title: "BIM and Digital Delivery",
      description: "Level of Development (LOD), COBie data, digital handover and information management",
      icon: Database,
      href: "../h-n-c-module4-section6-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 6: Specification and Documentation
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Produce comprehensive specifications and documentation that effectively communicate design intent and support project delivery
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the documentation and specification requirements for building services electrical design. Clear, comprehensive documentation is essential for successful project delivery, ensuring designs are correctly interpreted and constructed.
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

export default HNCModule4Section6;
