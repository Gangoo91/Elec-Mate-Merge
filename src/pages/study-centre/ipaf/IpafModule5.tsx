import { ArrowLeft, AlertTriangle, TriangleAlert, ClipboardCheck, LifeBuoy, Move } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Common Hazards & Accident Causes",
    icon: TriangleAlert,
    description: "Falls from height, tower collapse, overturning, electrocution, falling objects, and fatigue-related errors",
  },
  {
    id: 2,
    title: "Risk Assessment for Tower Use",
    icon: ClipboardCheck,
    description: "HSE 5-step process, site-specific factors, hierarchy of control, method statements, and dynamic assessment",
  },
  {
    id: 3,
    title: "Rescue Procedures & Emergency Planning",
    icon: LifeBuoy,
    description: "PASMA rescue hierarchy, written rescue plans, communication methods, suspension trauma awareness",
  },
  {
    id: 4,
    title: "Moving & Repositioning Towers Safely",
    icon: Move,
    description: "Pre-move checks, wind limits, ground conditions, zero-tolerance rules, and post-move verification",
  },
];

export default function IpafModule5() {
  useSEO({
    title: "Module 5: Hazards, Risk Assessment & Rescue | IPAF Mobile Scaffold",
    description: "Common hazards, HSE 5-step risk assessment, rescue procedures, emergency planning, and safe tower repositioning for mobile access tower work.",
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
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/20">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20">
                <span className="text-elec-yellow text-xs font-semibold">MODULE 5</span>
                <span className="text-white/40 text-xs">&bull;</span>
                <span className="text-white/60 text-xs">4 Sections</span>
                <span className="text-white/40 text-xs">&bull;</span>
                <span className="text-white/60 text-xs">35 mins</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Hazards, Risk Assessment & Rescue
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Common hazards, 5-step risk assessment, rescue procedures, and safe tower repositioning for mobile access tower work
            </p>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../ipaf-module-5-section-${section.id}`}
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
