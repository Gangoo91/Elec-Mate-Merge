import { ArrowLeft, AlertTriangle, ClipboardCheck, LifeBuoy, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Common Hazards",
    icon: AlertTriangle,
    description: "Falls from height, tower collapse, electrocution, falling objects, manual handling",
  },
  {
    id: 2,
    title: "Risk Assessment",
    icon: ClipboardCheck,
    description: "HSE 5-step process, tower-specific hazards, likelihood x severity, control measures",
  },
  {
    id: 3,
    title: "Rescue Procedures",
    icon: LifeBuoy,
    description: "PASMA rescue hierarchy, written rescue plan, suspension trauma, first aid at height",
  },
  {
    id: 4,
    title: "Physical Fitness & Safe Working",
    icon: HeartPulse,
    description: "PASMA fitness requirements, 3-point contact, manual handling, adverse weather",
  },
];

export default function PasmaModule6() {
  useSEO({
    title: "Module 6: Safety, Hazards & Rescue | PASMA Towers for Users",
    description: "Common hazards, risk assessment, rescue procedures, and physical fitness requirements for safe mobile tower work.",
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
              <span className="text-elec-yellow text-xs font-semibold">MODULE 6</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">35 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Safety, Hazards & Rescue
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Identifying hazards, carrying out risk assessments, rescue planning, and maintaining physical fitness for safe tower work
            </p>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../pasma-module-6-section-${section.id}`}
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
