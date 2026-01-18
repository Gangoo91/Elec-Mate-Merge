import { ArrowLeft, Calendar, FileText, Settings, CheckSquare, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule4Section1 = () => {
  useSEO(
    "Section 4.1: Planned Preventive Maintenance (PPM) - MOET Module 4",
    "Principles of PPM, maintenance scheduling, records, lubrication, inspection routines and regulatory compliance"
  );

  const subsections = [
    {
      number: "4.1.1",
      title: "Principles of PPM",
      description: "Understanding preventive maintenance philosophy, benefits and implementation strategies",
      icon: Calendar,
      href: "../m-o-e-t-module4-section1-1"
    },
    {
      number: "4.1.2",
      title: "Maintenance Scheduling and Records",
      description: "Creating maintenance schedules, record keeping and documentation systems",
      icon: FileText,
      href: "../m-o-e-t-module4-section1-2"
    },
    {
      number: "4.1.3",
      title: "Lubrication, Cleaning and Adjustments",
      description: "Routine maintenance tasks including lubrication schedules and equipment adjustments",
      icon: Settings,
      href: "../m-o-e-t-module4-section1-3"
    },
    {
      number: "4.1.4",
      title: "Electrical Inspection Routines",
      description: "Systematic electrical inspection procedures and safety checks",
      icon: CheckSquare,
      href: "../m-o-e-t-module4-section1-4"
    },
    {
      number: "4.1.5",
      title: "Legal and Regulatory Compliance in PPM",
      description: "Regulatory requirements, standards compliance and legal obligations",
      icon: Scale,
      href: "../m-o-e-t-module4-section1-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module4">
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
            Section 4.1: Planned Preventive Maintenance (PPM)
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Principles of PPM, maintenance scheduling, records, lubrication, inspection routines and regulatory compliance.
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

export default MOETModule4Section1;