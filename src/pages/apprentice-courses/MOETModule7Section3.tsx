import { ArrowLeft, Briefcase, FileText, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule7Section3 = () => {
  useSEO(
    "Section 7.3: Portfolio Development and Evidence Gathering - MOET Module 7",
    "Work-based portfolio, witness statements and evidence mapping"
  );

  const subsections = [
    {
      number: "7.3.1",
      title: "Building a Work-Based Portfolio",
      description: "Structuring and organising a comprehensive work-based evidence portfolio",
      icon: Briefcase,
      href: "../m-o-e-t-module7-section3-1"
    },
    {
      number: "7.3.2",
      title: "Collecting Witness Statements",
      description: "Obtaining and formatting witness statements from supervisors and colleagues",
      icon: FileText,
      href: "../m-o-e-t-module7-section3-2"
    },
    {
      number: "7.3.3",
      title: "Logging On-the-Job Activities",
      description: "Recording work activities, projects and learning experiences",
      icon: Calendar,
      href: "../m-o-e-t-module7-section3-3"
    },
    {
      number: "7.3.4",
      title: "Mapping Evidence to Standards",
      description: "Linking portfolio evidence to apprenticeship standards and learning outcomes",
      icon: MapPin,
      href: "../m-o-e-t-module7-section3-4"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 7.3: Portfolio Development and Evidence Gathering
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Work-based portfolio, witness statements and evidence mapping.
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

export default MOETModule7Section3;