import { ArrowLeft, Book, AlertTriangle, Monitor, LinkIcon, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule6Section3 = () => {
  useSEO(
    "Section 6.3: Maintenance Records and Reporting - MOET Module 6",
    "Work recording, fault reports, digital reporting and maintenance management systems"
  );

  const subsections = [
    {
      number: "6.3.1",
      title: "Recording Work Completed (logbooks, CMMS)",
      description: "Work completion records, logbook entries and CMMS documentation",
      icon: Book,
      href: "../m-o-e-t-module6-section3-1"
    },
    {
      number: "6.3.2",
      title: "Fault Reports and Corrective Actions",
      description: "Fault reporting procedures, corrective action documentation and follow-up",
      icon: AlertTriangle,
      href: "../m-o-e-t-module6-section3-2"
    },
    {
      number: "6.3.3",
      title: "Digital vs Paper-Based Reporting",
      description: "Digital reporting systems, advantages and implementation considerations",
      icon: Monitor,
      href: "../m-o-e-t-module6-section3-3"
    },
    {
      number: "6.3.4",
      title: "Traceability and Compliance Requirements",
      description: "Audit trails, regulatory compliance and traceability documentation",
      icon: LinkIcon,
      href: "../m-o-e-t-module6-section3-4"
    },
    {
      number: "6.3.5",
      title: "Using Maintenance Management Systems",
      description: "CMMS operation, data entry and system utilisation",
      icon: Database,
      href: "../m-o-e-t-module6-section3-5"
    }
  ];

  return (
    <div className="bg-background">
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
            Section 6.3: Maintenance Records and Reporting
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Work recording, fault reports, digital reporting and maintenance management systems.
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

export default MOETModule6Section3;