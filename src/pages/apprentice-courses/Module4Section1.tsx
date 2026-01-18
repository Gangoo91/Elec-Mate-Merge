import { ArrowLeft, HardHat, FileText, Wrench, Package, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Reading Installation Drawings and Specifications",
    description: "Understanding technical drawings and installation specifications",
    icon: HardHat,
    href: "1-1"
  },
  {
    number: "Subsection 2",
    title: "Identifying Cable Routes and Fixing Points",
    description: "Planning cable routing and identifying fixing positions",
    icon: FileText,
    href: "1-2"
  },
  {
    number: "Subsection 3",
    title: "Selecting Materials, Tools, and PPE",
    description: "Choosing appropriate materials, tools and personal protective equipment",
    icon: Wrench,
    href: "1-3"
  },
  {
    number: "Subsection 4",
    title: "Planning Workflow and Sequencing Tasks",
    description: "Organising work sequence for efficient installation",
    icon: Package,
    href: "1-4"
  },
  {
    number: "Subsection 5",
    title: "Preparing the Work Area (Access, Safety, Lighting)",
    description: "Setting up safe and accessible working conditions",
    icon: CheckCircle,
    href: "1-5"
  }
];

const Section1 = () => {
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Preparing to Install Wiring Systems
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Planning and preparation for electrical installation work
            </p>
          </header>

          {/* Subsections Grid */}
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
        </div>
      </div>
    </div>
  );
};

export default Section1;
