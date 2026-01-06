import { ArrowLeft, Eye, CheckCircle, AlertCircle, ClipboardList } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "2.1",
    title: "Visual Inspection of Installations",
    description: "Comprehensive visual inspection of fabric, wiring systems and protective devices",
    icon: Eye,
    href: "../level3-module5-section2-2-1",
  },
  {
    number: "2.2", 
    title: "Checking for Compliance with Design and Regs",
    description: "Verifying installation compliance with design specifications and regulations",
    icon: CheckCircle,
    href: "../level3-module5-section2-2-2",
  },
  {
    number: "2.3",
    title: "Identification of Non-compliances and Defects",
    description: "Identifying and categorising non-compliances and defects in electrical installations",
    icon: AlertCircle,
    href: "../level3-module5-section2-2-3",
  },
  {
    number: "2.4",
    title: "Recording Inspection Observations (C1, C2, C3 codes)",
    description: "Proper recording of inspection findings using C1, C2 and C3 classification codes",
    icon: ClipboardList,
    href: "../level3-module5-section2-2-4",
  },
];

const Level3Module5Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 2 - Inspection Procedures
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Detailed visual inspection procedures for electrical installations and systems
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

export default Level3Module5Section2;