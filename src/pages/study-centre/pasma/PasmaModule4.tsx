import { ArrowLeft, ArrowDownToLine, Move, PackageOpen, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Dismantling Procedure",
    icon: ArrowDownToLine,
    description: "Reverse of assembly, 3T and AGR dismantling, component lowering, common errors",
  },
  {
    id: 2,
    title: "Moving & Repositioning",
    icon: Move,
    description: "Pre-move conditions, push at base, post-move verification, zero-tolerance rules",
  },
  {
    id: 3,
    title: "Storage & Maintenance",
    icon: PackageOpen,
    description: "Clean before storage, indoor dry storage, component segregation, maintenance schedule",
  },
  {
    id: 4,
    title: "Post-Use Inspection",
    icon: Search,
    description: "Why it matters, what to check, defect reporting, tagging system, record keeping",
  },
];

export default function PasmaModule4() {
  useSEO({
    title: "Module 4: Dismantling, Moving & Storage | PASMA Towers for Users",
    description: "Safe dismantling procedures, moving and repositioning, storage and maintenance, and post-use inspection for mobile access towers.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../pasma-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to PASMA Course
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Module Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
              <span className="text-elec-yellow text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Dismantling, Moving & Storage
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Safe dismantling procedures, repositioning rules, correct storage practices, and post-use inspection requirements
            </p>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../pasma-module-4-section-${section.id}`}
                sectionNumber={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
