import { ArrowLeft, PenTool, List, FileText, Monitor } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "5.1",
    title: "Preparing Design Drawings and Schematics",
    description: "Creating clear and accurate design drawings and electrical schematics",
    icon: PenTool,
    href: "../level3-module6-section5-5-1",
  },
  {
    number: "5.2", 
    title: "Preparing Cable Schedules and Load Assessments",
    description: "Developing comprehensive cable schedules and electrical load assessments",
    icon: List,
    href: "../level3-module6-section5-5-2",
  },
  {
    number: "5.3",
    title: "Writing Design Specifications for Clients/Contractors",
    description: "Preparing detailed design specifications and requirements documents",
    icon: FileText,
    href: "../level3-module6-section5-5-3",
  },
  {
    number: "5.4",
    title: "Using Software Tools (CAD, electrical design software)",
    description: "Utilising CAD and electrical design software for professional documentation",
    icon: Monitor,
    href: "../level3-module6-section5-5-4",
  },
];

const Level3Module6Section5 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 5 - System Documentation and Drawings
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Creating comprehensive design documentation, drawings and specifications
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

export default Level3Module6Section5;