import { ArrowLeft, Eye, CheckCircle, AlertCircle, ClipboardList, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "2.1",
    title: "Visual Inspection of Installations",
    description: "Comprehensive visual inspection of fabric, wiring systems and protective devices",
    icon: Eye,
    href: "../level3-module5-section2-1",
  },
  {
    number: "2.2",
    title: "Checking for Compliance with Design and Regs",
    description: "Verifying installation compliance with design specifications and regulations",
    icon: CheckCircle,
    href: "../level3-module5-section2-2",
  },
  {
    number: "2.3",
    title: "Identification of Non-compliances and Defects",
    description: "Identifying and categorising non-compliances and defects in electrical installations",
    icon: AlertCircle,
    href: "../level3-module5-section2-3",
  },
  {
    number: "2.4",
    title: "Recording Inspection Observations (C1, C2, C3 codes)",
    description: "Proper recording of inspection findings using C1, C2 and C3 classification codes",
    icon: ClipboardList,
    href: "../level3-module5-section2-4",
  },
];

const Level3Module5Section2 = () => {
  useSEO(
    "Section 2: Inspection Procedures - Level 3 Module 5",
    "Detailed visual inspection procedures for electrical installations and systems"
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Inspection Procedures
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Detailed visual inspection procedures for electrical installations and systems
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers inspection procedures including visual inspection techniques,
              compliance checking, identification of non-compliances and defects,
              and proper recording using observation codes.
            </p>
          </div>
        </section>

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

export default Level3Module5Section2;
