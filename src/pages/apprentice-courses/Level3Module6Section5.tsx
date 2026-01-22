import { ArrowLeft, PenTool, List, FileText, Monitor, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "5.1",
    title: "Preparing Design Drawings and Schematics",
    description: "Creating clear and accurate design drawings and electrical schematics",
    icon: PenTool,
    href: "../level3-module6-section5-1",
  },
  {
    number: "5.2",
    title: "Preparing Cable Schedules and Load Assessments",
    description: "Developing comprehensive cable schedules and electrical load assessments",
    icon: List,
    href: "../level3-module6-section5-2",
  },
  {
    number: "5.3",
    title: "Writing Design Specifications for Clients/Contractors",
    description: "Preparing detailed design specifications and requirements documents",
    icon: FileText,
    href: "../level3-module6-section5-3",
  },
  {
    number: "5.4",
    title: "Using Software Tools (CAD, electrical design software)",
    description: "Utilising CAD and electrical design software for professional documentation",
    icon: Monitor,
    href: "../level3-module6-section5-4",
  },
];

const Level3Module6Section5 = () => {
  useSEO(
    "Section 5: System Documentation and Drawings - Level 3 Module 6",
    "Creating comprehensive design documentation, drawings and specifications"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 gap-4">
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
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module6Section5;
