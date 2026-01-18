import { ArrowLeft, FileText, Zap, ClipboardList, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule6 = () => {
  useSEO(
    "Module 6: Technical Documentation and Communication - MOET Course",
    "Technical drawings, electrical schematics, maintenance records and stakeholder communication"
  );

  const sections = [
    {
      number: "6.1",
      title: "Reading and Producing Technical Drawings",
      description: "Engineering conventions, electrical schematics, mechanical drawings and revision control",
      icon: FileText,
      href: "../m-o-e-t-module6-section1"
    },
    {
      number: "6.2", 
      title: "Electrical Schematics and Wiring Diagrams",
      description: "Circuit diagrams, single-line diagrams, control circuits and labelling standards",
      icon: Zap,
      href: "../m-o-e-t-module6-section2"
    },
    {
      number: "6.3",
      title: "Maintenance Records and Reporting", 
      description: "Work recording, fault reports, digital reporting and maintenance management systems",
      icon: ClipboardList,
      href: "../m-o-e-t-module6-section3"
    },
    {
      number: "6.4",
      title: "Handovers and Stakeholder Communication",
      description: "Shift handovers, stakeholder communication, professional behaviour and teamwork",
      icon: Users,
      href: "../m-o-e-t-module6-section4"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to MOET Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 6: Technical Documentation and Communication
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Technical drawings, electrical schematics, maintenance records and stakeholder communication.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
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

export default MOETModule6;