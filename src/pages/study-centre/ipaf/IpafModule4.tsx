import { ArrowLeft, ClipboardCheck, Eye, FileSearch, Wrench, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Pre-Use Visual Checks",
    icon: Eye,
    description: "Daily checks before each use — component damage, missing parts, castor brakes, stabilisers, guardrails, and ground conditions",
  },
  {
    id: 2,
    title: "Formal Inspections",
    icon: FileSearch,
    description: "7-day statutory inspections under WAHR Schedule 7, competent person requirements, and written report obligations",
  },
  {
    id: 3,
    title: "Common Defects & Component Care",
    icon: Wrench,
    description: "Identifying bent frames, cracked welds, worn castors, cleaning procedures, storage, transport, and condemning equipment",
  },
  {
    id: 4,
    title: "Documentation & Record Keeping",
    icon: FolderOpen,
    description: "Tower Inspection Records, retention periods, PASMA TowerSure app, handover procedures, and RIDDOR reporting",
  },
];

export default function IpafModule4() {
  useSEO({
    title: "Module 4: Inspection & Maintenance | IPAF Mobile Scaffold",
    description: "Pre-use checks, formal inspections, common defects, component care, and documentation requirements for mobile access towers.",
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
              <Link to="../ipaf-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to IPAF Course
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
              Inspection & Maintenance
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Pre-use checks, formal inspections, common defects, and documentation requirements for mobile access towers
            </p>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../ipaf-module-4-section-${section.id}`}
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
