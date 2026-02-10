import { ArrowLeft, Layers, Settings, Shield, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    id: 1,
    title: "Hierarchy of Control",
    icon: Layers,
    description: "Elimination, substitution, engineering controls, administrative controls, and PPE as the last line of defence",
  },
  {
    id: 2,
    title: "Engineering Controls",
    icon: Settings,
    description: "Local exhaust ventilation systems, general ventilation, enclosure, segregation, and automated processes",
  },
  {
    id: 3,
    title: "RPE & PPE Selection",
    icon: Shield,
    description: "RPE types, assigned protection factors, face-fit testing, chemical-resistant gloves, goggles, and overalls",
  },
  {
    id: 4,
    title: "Storage, Handling & Disposal",
    icon: Package,
    description: "DSEAR requirements, chemical storage best practice, segregation rules, spill kits, and hazardous waste disposal",
  },
];

export default function CoshhAwarenessModule4() {
  useSEO({
    title: "Module 4: Control Measures & PPE | COSHH Awareness",
    description: "Learn the hierarchy of control for hazardous substances, engineering controls, RPE and PPE selection, and safe storage, handling, and disposal procedures.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../coshh-awareness-course">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to COSHH Awareness
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3">
              <span className="text-violet-400 text-xs font-semibold">MODULE 4</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">4 Sections</span>
              <span className="text-white/40 text-xs">&bull;</span>
              <span className="text-white/60 text-xs">30 mins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Control Measures & PPE
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              How to control exposure to hazardous substances using the hierarchy of control — from elimination through to RPE and PPE, plus safe storage and disposal
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={`../coshh-awareness-module-4-section-${section.id}`}
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
